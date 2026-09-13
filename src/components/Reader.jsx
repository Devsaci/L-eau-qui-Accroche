import React, { useState, useMemo, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import 'katex/dist/katex.min.css';
import {
  BookOpen,
  Printer,
  FileDown,
  Compass,
  Quote,
  Minus,
  Plus,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookMarked,
  Activity,
  Radio
} from 'lucide-react';
import chapters from '../content/chapters.js';

// Fonction de slugification robuste partagée gérant les accents, apostrophes et ponctuation
export const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Extraction récursive du texte brut depuis les enfants React
const getNodeText = (node) => {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (node.props && node.props.children) return getNodeText(node.props.children);
  return '';
};

export default function Reader() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg' | 'xl'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans'
  const [readingProgress, setReadingProgress] = useState(0);
  
  const readerRef = useRef(null);
  const articleRef = useRef(null);

  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  // Tailles de police et interlignages calibrés pour le confort de lecture prolongée
  const fontSizes = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    lg: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  // Suivi en temps réel de la progression de lecture dans le chapitre
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height - windowHeight;
      
      if (totalHeight <= 0) {
        setReadingProgress(100);
        return;
      }
      
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(100, Math.round((currentScroll / totalHeight) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapterIndex]);

  // Extraction automatique des titres Markdown h2 pour le sommaire
  const headings = useMemo(() => {
    if (!currentChapter?.content) return [];
    const h2Regex = /^##\s+(.+)$/gm;
    const items = [];
    let match;
    while ((match = h2Regex.exec(currentChapter.content)) !== null) {
      const rawText = match[1].trim();
      const id = slugify(rawText);
      items.push({ text: rawText, id });
    }
    return items;
  }, [currentChapter]);

  // Changement de chapitre avec défilement fluide vers le haut
  const handleChapterChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < chapters.length) {
      setCurrentChapterIndex(newIndex);
      setIsTocOpen(false);
      setReadingProgress(0);
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
      setTimeout(() => {
        readerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  // Action au clic sur une section du sommaire
  const handleSectionClick = (e, slug) => {
    e.preventDefault();

    // a) Mise à jour de l'URL avec l'ancre sans rechargement
    window.history.pushState(null, '', `#${slug}`);

    // d) Fermeture du panneau
    setIsTocOpen(false);

    // b) & c) Recherche et défilement fluide avec marge d'évitement
    setTimeout(() => {
      const targetEl = document.getElementById(slug) || document.querySelector(`[id="${slug}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Synchronisation initiale : si l'URL contient un hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const slug = decodeURIComponent(hash.substring(1));
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(slug) || document.querySelector(`[id="${slug}"]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentChapterIndex]);

  // Écoute de la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsTocOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="lecture"
      ref={readerRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-brick/15 scroll-mt-6"
    >
      {/* Barre de progression de lecture supérieure en rouge brique */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-paper-muted/80 z-50 pointer-events-none">
        <div
          className="h-full bg-brick transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">

        {/* En-tête du lecteur & barre d'outils avec cibles tactiles calibrées (min 44px) */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brick/15">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brick-50 border border-brick/20 flex items-center justify-center text-brick shadow-paper">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-brick uppercase tracking-wider block font-semibold">
                Extrait officiel // Chapitre {currentChapter.number} : {currentChapter.title}
              </span>
              <span className="text-ink-muted text-xs font-sans">
                {currentChapter.subtitle} {currentChapter.readTime ? `• ~${currentChapter.readTime}` : ''}
              </span>
            </div>
          </div>

          {/* Outils de lecture & bouton Sommaire */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Indicateur télémétrique de progression de lecture */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-paper-card border border-brick/15 text-xs font-mono text-ink min-h-[44px] shadow-paper">
              <Activity className="w-3.5 h-3.5 text-rust" />
              <span className="text-ink-muted">Progression :</span>
              <span className="font-bold text-brick">{readingProgress}%</span>
            </div>

            {/* Bouton Panneau Sommaire */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono transition-all min-h-[44px] shadow-paper ${
                isTocOpen
                  ? 'bg-brick text-white border-brick font-bold shadow-brick-soft'
                  : 'bg-paper-card border-brick/20 text-ink hover:text-brick hover:border-brick'
              }`}
              title="Ouvrir le sommaire du roman et les sections du chapitre"
              aria-label="Ouvrir le sommaire"
            >
              <List className="w-4 h-4" />
              <span>Sommaire</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                isTocOpen ? 'bg-white/20 text-white' : 'bg-brick-50 text-brick'
              }`}>
                {headings.length}
              </span>
            </button>

            {/* Bascule Serif / Sans */}
            <div className="inline-flex rounded-lg bg-paper-card border border-brick/20 p-1 text-xs font-mono min-h-[44px] items-center shadow-paper">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-3 py-1.5 rounded-md transition-colors min-h-[36px] ${
                  fontFamily === 'serif'
                    ? 'bg-brick-50 text-brick font-serif font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
                title="Typographie roman avec empattement"
              >
                Roman
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-3 py-1.5 rounded-md transition-colors min-h-[36px] ${
                  fontFamily === 'sans'
                    ? 'bg-brick-50 text-brick font-sans font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
                title="Typographie moderne sans-serif"
              >
                Moderne
              </button>
            </div>

            {/* Ajustement taille de police */}
            <div className="inline-flex items-center gap-1 rounded-lg bg-paper-card border border-brick/20 px-2 py-1 text-xs font-mono text-ink min-h-[44px] shadow-paper">
              <button
                onClick={() => {
                  if (fontSize === 'xl') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('sm');
                }}
                disabled={fontSize === 'sm'}
                className="hover:text-brick text-ink disabled:opacity-30 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Diminuer la taille du texte"
                aria-label="Diminuer la taille"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-bold text-ink">A</span>
              <button
                onClick={() => {
                  if (fontSize === 'sm') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('xl');
                }}
                disabled={fontSize === 'xl'}
                className="hover:text-brick text-ink disabled:opacity-30 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Augmenter la taille du texte"
                aria-label="Augmenter la taille"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Panneau rétractable "Sommaire" avec transitions fluides */}
        <div
          className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            isTocOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Arrière-plan doux avec flou d'ambiance */}
          <div
            onClick={() => setIsTocOpen(false)}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm"
          />

          {/* Tiroir latéral coulissant façon carnet */}
          <aside
            className={`relative w-full max-w-md bg-paper border-l border-brick/20 shadow-2xl p-6 flex flex-col h-full z-10 overflow-y-auto transform transition-transform duration-300 ease-out ${
              isTocOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* En-tête du Sommaire */}
            <div className="flex items-center justify-between pb-4 border-b border-brick/15">
              <div className="flex items-center gap-2 text-ink font-serif font-bold text-base tracking-wide">
                <BookMarked className="w-4 h-4 text-brick" />
                <span>SOMMAIRE DU MANUSCRIT</span>
              </div>
              <button
                onClick={() => setIsTocOpen(false)}
                className="p-2.5 rounded-xl bg-paper-card text-ink hover:text-brick hover:bg-white border border-brick/15 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-paper"
                aria-label="Fermer le sommaire"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sélection des chapitres */}
            <div className="mt-6">
              <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block mb-3 font-semibold">
                Chapitres disponibles ({chapters.length})
              </span>
              <div className="space-y-2.5">
                {chapters.map((chap, idx) => {
                  const isActive = idx === currentChapterIndex;
                  return (
                    <button
                      key={chap.id}
                      onClick={() => handleChapterChange(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 min-h-[48px] ${
                        isActive
                          ? 'bg-brick text-white border-brick shadow-brick-soft'
                          : 'bg-paper-card border-brick/15 text-ink hover:border-brick/30 hover:bg-white shadow-paper'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            isActive ? 'bg-white/20 text-white' : 'bg-paper text-ink-muted'
                          }`}>
                            {chap.isEpilogue ? 'Épilogue' : `Chapitre ${chap.number}`}
                          </span>
                          <span className={`text-xs font-semibold font-serif ${isActive ? 'text-white' : 'text-ink'}`}>
                            {chap.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className={`text-[11px] line-clamp-1 font-sans ${isActive ? 'text-brick-100' : 'text-ink-muted'}`}>
                            {chap.subtitle}
                          </p>
                          {chap.readTime && (
                            <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-white/80' : 'text-brick font-medium'}`}>
                              • {chap.readTime}
                            </span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sections h2 extraites du chapitre actif (cibles tactiles min 48px) */}
            <div className="mt-8 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider font-semibold">
                  {currentChapter.isEpilogue ? 'Sections de l’Épilogue' : `Sections du Chapitre ${currentChapter.number}`} ({headings.length})
                </span>
                <span className="text-[10px] text-brick font-mono font-medium">
                  Navigation directe
                </span>
              </div>

              {headings.length === 0 ? (
                <p className="text-xs text-ink-muted font-sans py-4 italic">
                  Aucune sous-section h2 détectée dans ce chapitre.
                </p>
              ) : (
                <ul className="space-y-2">
                  {headings.map((h, i) => (
                    <li key={h.id || i}>
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => handleSectionClick(e, h.id)}
                        className="w-full text-left p-3 rounded-xl bg-paper-card hover:bg-white border border-brick/15 hover:border-brick/30 text-xs text-ink-light hover:text-brick transition-all flex items-start gap-3 group min-h-[48px] shadow-paper"
                      >
                        <span className="text-[11px] font-mono text-brick font-semibold mt-0.5 shrink-0">
                          § {currentChapter.isEpilogue ? `E.${i + 1}` : `${currentChapter.number}.${i + 1}`}
                        </span>
                        <span className="flex-1 font-serif leading-snug text-ink group-hover:text-brick">
                          {h.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pied de tiroir : raccourci de fermeture */}
            <div className="pt-4 mt-6 border-t border-brick/15 text-center">
              <button
                onClick={() => setIsTocOpen(false)}
                className="w-full py-3 rounded-xl bg-paper-card hover:bg-white border border-brick/20 text-xs font-mono text-ink hover:text-brick transition-colors min-h-[44px] shadow-paper"
              >
                Fermer le sommaire
              </button>
            </div>

          </aside>
        </div>

        {/* Corps du roman / Lecteur Markdown interactif façon livre relié avec typographie optimale 68ch et KaTeX */}
        <article
          ref={articleRef}
          className={`reader-container card-carnet rounded-3xl p-6 sm:p-12 lg:p-16 border border-brick/20 bg-paper-card shadow-paper-lg relative ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          }`}
        >
          {/* Conteneur de prose optimisé pour le confort de lecture (~68ch max) */}
          <div className={`reader-prose max-w-[68ch] mx-auto ${fontSizes[fontSize]} relative z-10 text-ink`}>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeSlug]}
              components={{
                h1: ({ node, ...props }) => (
                  <header className="mb-10 pb-6 border-b border-brick/15">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brick-50 border border-brick/20 text-[11px] font-mono text-brick mb-4">
                      <Radio className="w-3.5 h-3.5 text-brick" />
                      <span>MANUSCRIT // CARNET D'OBSERVATION : PORT-MYSTRAL</span>
                    </div>
                    <h1
                      id={props.id}
                      className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-tight scroll-mt-24"
                      {...props}
                    />
                  </header>
                ),
                h2: ({ node, children, ...props }) => {
                  const text = getNodeText(children);
                  const id = slugify(text);
                  const { id: _ignoredId, ...restProps } = props;
                  return (
                    <h2
                      id={id}
                      className="scroll-mt-24 text-2xl sm:text-3xl font-bold text-ink mt-12 mb-5 pb-3 border-b border-brick/15 font-serif flex items-center gap-3 group"
                      {...restProps}
                    >
                      <span className="w-1.5 h-6 rounded-full bg-brick inline-block shadow-sm group-hover:scale-y-110 transition-transform" />
                      <span className="flex-1 text-ink group-hover:text-brick transition-colors">
                        {children}
                      </span>
                    </h2>
                  );
                },
                h3: ({ node, ...props }) => (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-paper border border-brick/20 text-brick text-xs font-mono my-5 shadow-paper">
                    <Compass className="w-3.5 h-3.5 text-rust" />
                    <span {...props} />
                  </div>
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="my-8 p-5 sm:p-6 rounded-2xl bg-paper border-l-4 border-gold text-ink font-serif italic shadow-paper relative"
                  >
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div className="flex-1 font-serif text-sm sm:text-base text-ink-light leading-relaxed">
                        {props.children}
                      </div>
                    </div>
                  </blockquote>
                ),
                p: ({ node, ...props }) => (
                  <p className="my-6 text-ink-light font-normal leading-relaxed sm:leading-loose">
                    {props.children}
                  </p>
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-ink font-semibold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="text-ink italic" {...props} />
                ),
                hr: () => (
                  <div className="my-12 flex items-center justify-center gap-3">
                    <div className="h-px bg-brick/15 flex-1" />
                    <span className="w-2 h-2 rounded-full bg-brick/50" />
                    <div className="h-px bg-brick/15 flex-1" />
                  </div>
                ),
              }}
            >
              {currentChapter.content}
            </ReactMarkdown>
          </div>

          {/* Séparateur de fin de chapitre */}
          <div className="mt-14 pt-8 border-t border-brick/15 flex items-center justify-between text-xs font-mono text-ink-muted">
            <span>{currentChapter.isEpilogue ? 'FIN DU MANUSCRIT // ÉPILOGUE' : `FIN DU CHAPITRE ${currentChapter.number}`}</span>
            <span className="text-brick font-semibold">PORT-MYSTRAL // ARCHIMÈDE LAB</span>
          </div>

          {/* Pagination en bas de page (cibles tactiles min 48px) */}
          <div className="no-print mt-8 pt-6 border-t border-brick/15 flex items-center justify-between gap-4">
            <button
              onClick={() => handleChapterChange(currentChapterIndex - 1)}
              disabled={currentChapterIndex === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-brick/20 bg-paper hover:bg-white text-ink disabled:opacity-30 disabled:pointer-events-none transition-all font-mono text-xs sm:text-sm min-h-[48px] shadow-paper"
              title="Lire le chapitre précédent"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chapitre précédent</span>
            </button>

            <div className="text-center font-mono text-xs text-ink-muted">
              <span className="text-brick font-bold">{currentChapter.isEpilogue ? 'Épilogue' : `Chapitre ${currentChapter.number}`}</span> sur {chapters.length}
            </div>

            <button
              onClick={() => handleChapterChange(currentChapterIndex + 1)}
              disabled={currentChapterIndex === chapters.length - 1}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-brick bg-brick hover:bg-rust text-white disabled:opacity-30 disabled:pointer-events-none transition-all font-mono text-xs sm:text-sm font-semibold min-h-[48px] shadow-brick-soft"
              title="Lire le chapitre suivant"
            >
              <span>{chapters[currentChapterIndex + 1]?.isEpilogue ? 'Lire l’Épilogue' : 'Chapitre suivant'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pied du composant avec boutons d'export (cibles tactiles min 48px) */}
          <div className="no-print mt-8 pt-6 border-t border-brick/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Bouton 1 : Télécharger le PDF complet */}
            <a
              href="/roman-extrait.pdf"
              download="Leau-qui-accroche-Extrait-Roman.pdf"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-serif text-base font-bold text-white bg-brick hover:bg-rust shadow-brick-soft transition-all transform hover:-translate-y-0.5 min-h-[48px]"
            >
              <FileDown className="w-4 h-4" />
              <span>Télécharger le PDF complet</span>
            </a>

            {/* Bouton 2 : Imprimer / Sauvegarder ce chapitre */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-medium text-ink bg-paper hover:bg-white border border-brick/20 hover:border-gold transition-all shadow-paper min-h-[48px]"
              title="Ouvre la boîte d'impression ou d'enregistrement PDF du navigateur"
            >
              <Printer className="w-4 h-4 text-rust" />
              <span>Imprimer / Sauvegarder ce chapitre</span>
            </button>

          </div>
        </article>

      </div>
    </section>
  );
}
