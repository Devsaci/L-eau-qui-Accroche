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

  // Tailles de police et interlignages calibrés pour la mise en page "Beau Livre"
  const fontSizes = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed sm:leading-loose',
    lg: 'text-xl leading-relaxed sm:leading-loose',
    xl: 'text-2xl leading-loose',
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
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-stone-200/80 scroll-mt-6"
    >
      {/* Barre de progression de lecture supérieure discrète */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200/80 z-50 pointer-events-none">
        <div
          className="h-full bg-amberAccent shadow-xs transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">

        {/* En-tête du lecteur & barre d'outils avec cibles tactiles calibrées (min 44px) */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/90 border border-stone-200/80 flex items-center justify-center text-bay shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-bay uppercase tracking-wider block font-semibold">
                Extrait officiel // Chapitre {currentChapter.number} : {currentChapter.title}
              </span>
              <span className="text-ink/65 text-xs font-sans">
                {currentChapter.subtitle} // Roman Hard Sci-Fi YA
              </span>
            </div>
          </div>

          {/* Outils de lecture & bouton Sommaire */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Indicateur télémétrique de progression de lecture */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 border border-stone-200/80 text-xs font-mono text-ink/75 min-h-[44px] shadow-xs">
              <Activity className="w-3.5 h-3.5 text-amberAccent animate-pulse" />
              <span className="text-ink/60">Progression :</span>
              <span className="font-bold text-bay">{readingProgress}%</span>
            </div>

            {/* Bouton Panneau Sommaire */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-sans font-medium transition-all min-h-[44px] shadow-xs ${
                isTocOpen
                  ? 'bg-bay text-white border-bay font-bold'
                  : 'bg-white/90 border-stone-200/80 text-bay hover:bg-stone-50 hover:border-bay/40'
              }`}
              title="Ouvrir le sommaire du roman et les sections du chapitre"
              aria-label="Ouvrir le sommaire"
            >
              <List className={`w-4 h-4 ${isTocOpen ? 'text-white' : 'text-amberAccent'}`} />
              <span>Sommaire</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                isTocOpen ? 'bg-white/20 text-white' : 'bg-amberAccent text-white'
              }`}>
                {headings.length}
              </span>
            </button>

            {/* Bascule Serif / Sans */}
            <div className="inline-flex rounded-xl bg-white/90 border border-stone-200/80 p-1 text-xs font-sans min-h-[44px] items-center shadow-xs">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                  fontFamily === 'serif'
                    ? 'bg-bay text-white font-bold'
                    : 'text-ink/65 hover:text-bay'
                }`}
                title="Typographie roman avec empattement"
              >
                Roman
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                  fontFamily === 'sans'
                    ? 'bg-bay text-white font-bold'
                    : 'text-ink/65 hover:text-bay'
                }`}
                title="Typographie moderne sans-serif"
              >
                Moderne
              </button>
            </div>

            {/* Ajustement taille de police */}
            <div className="inline-flex items-center gap-1 rounded-xl bg-white/90 border border-stone-200/80 px-2 py-1 text-xs font-mono text-ink/75 min-h-[44px] shadow-xs">
              <button
                onClick={() => {
                  if (fontSize === 'xl') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('sm');
                }}
                disabled={fontSize === 'sm'}
                className="hover:text-bay disabled:opacity-30 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-bay"
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
                className="hover:text-bay disabled:opacity-30 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-bay"
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
          {/* Arrière-plan estompé */}
          <div
            onClick={() => setIsTocOpen(false)}
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-xs"
          />

          {/* Tiroir latéral coulissant */}
          <aside
            className={`relative w-full max-w-md bg-paper border-l border-stone-200/80 shadow-2xl p-6 flex flex-col h-full z-10 overflow-y-auto transform transition-transform duration-300 ease-out ${
              isTocOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* En-tête du Sommaire */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
              <div className="flex items-center gap-2 text-bay font-serif font-bold text-base tracking-wide">
                <BookMarked className="w-4 h-4 text-amberAccent" />
                <span>SOMMAIRE DU MANUSCRIT</span>
              </div>
              <button
                onClick={() => setIsTocOpen(false)}
                className="p-2.5 rounded-xl bg-white border border-stone-200/80 text-ink/70 hover:text-ink hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                aria-label="Fermer le sommaire"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sélection des chapitres */}
            <div className="mt-6">
              <span className="text-[11px] font-mono text-ink/60 uppercase tracking-wider block mb-3 font-semibold">
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
                          ? 'bg-bay/10 border-bay/60 text-bay shadow-xs'
                          : 'bg-white/90 border-stone-200/80 text-ink/80 hover:border-bay/40 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            isActive ? 'bg-bay text-white' : 'bg-stone-100 text-ink/70'
                          }`}>
                            Chapitre {chap.number}
                          </span>
                          <span className="text-xs font-semibold text-bay font-serif">
                            {chap.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-ink/60 mt-1 line-clamp-1 font-sans">
                          {chap.subtitle}
                        </p>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sections h2 extraites du chapitre actif (cibles tactiles min 48px) */}
            <div className="mt-8 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-ink/60 uppercase tracking-wider font-semibold">
                  Sections du Chapitre {currentChapter.number} ({headings.length})
                </span>
                <span className="text-[10px] text-dataBlue font-mono">
                  Navigation directe
                </span>
              </div>

              {headings.length === 0 ? (
                <p className="text-xs text-ink/50 font-sans py-4 italic">
                  Aucune sous-section h2 détectée dans ce chapitre.
                </p>
              ) : (
                <ul className="space-y-2">
                  {headings.map((h, i) => (
                    <li key={h.id || i}>
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => handleSectionClick(e, h.id)}
                        className="w-full text-left p-3 rounded-xl bg-white/80 hover:bg-amberAccent/5 border border-stone-200/70 hover:border-amberAccent/40 text-xs text-ink/80 hover:text-bay transition-all flex items-start gap-3 group min-h-[48px]"
                      >
                        <span className="text-[11px] font-mono text-dataBlue group-hover:text-bay mt-0.5 shrink-0">
                          § {currentChapter.number}.{i + 1}
                        </span>
                        <span className="flex-1 font-serif leading-snug text-ink/80 group-hover:text-bay">
                          {h.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pied de tiroir : raccourci de fermeture */}
            <div className="pt-4 mt-6 border-t border-stone-200/80 text-center">
              <button
                onClick={() => setIsTocOpen(false)}
                className="w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-xs font-sans font-medium text-ink/80 hover:text-ink transition-colors min-h-[44px]"
              >
                Fermer le sommaire
              </button>
            </div>

          </aside>
        </div>

        {/* Corps du roman / Lecteur Markdown interactif avec mise en page "Beau Livre" (max-w-prose) */}
        <article
          ref={articleRef}
          className={`reader-container bg-white/95 sm:bg-white rounded-3xl p-6 sm:p-12 lg:p-16 border border-stone-200/80 shadow-sm relative ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          }`}
        >
          {/* Colonne de lecture centrée max-w-prose avec fond blanc naturel / papier chaud */}
          <div className={`reader-prose max-w-prose mx-auto ${fontSizes[fontSize]} relative z-10 text-ink/90`}>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeSlug]}
              components={{
                h1: ({ node, ...props }) => (
                  <header className="mb-10 pb-6 border-b border-stone-200">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200/80 text-[11px] font-mono text-bay mb-4">
                      <Radio className="w-3.5 h-3.5 text-dataBlue" />
                      <span>MANUSCRIT // TRANSMISSION SOURCE : PORT-MYSTRAL</span>
                    </div>
                    <h1
                      id={props.id}
                      className="font-serif font-bold text-2xl sm:text-4xl text-bay tracking-wide leading-tight scroll-mt-24"
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
                      className="scroll-mt-24 font-serif font-semibold text-bay text-xl sm:text-2xl border-b border-stone-200 pb-2 mt-12 mb-5 flex items-center gap-3 group"
                      {...restProps}
                    >
                      <span className="w-1.5 h-6 rounded-full bg-amberAccent inline-block group-hover:scale-y-125 transition-transform" />
                      <span className="flex-1 text-bay group-hover:text-amberAccent transition-colors">
                        {children}
                      </span>
                    </h2>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const text = getNodeText(children);
                  const id = slugify(text);
                  const { id: _ignoredId, ...restProps } = props;
                  return (
                    <h3
                      id={id}
                      className="scroll-mt-24 font-serif font-semibold text-bay text-base sm:text-lg border-b border-stone-200 pb-2 mt-8 mb-4 flex items-center gap-2.5"
                      {...restProps}
                    >
                      <Compass className="w-4 h-4 text-dataBlue shrink-0" />
                      <span className="flex-1 text-bay">{children}</span>
                    </h3>
                  );
                },
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="my-8 p-5 sm:p-6 rounded-2xl bg-stone-50/90 border-l-4 border-amberAccent text-ink/85 font-serif italic shadow-xs relative"
                  >
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-amberAccent shrink-0 mt-0.5" />
                      <div className="flex-1 font-serif text-sm sm:text-base text-ink/85 leading-relaxed">
                        {props.children}
                      </div>
                    </div>
                  </blockquote>
                ),
                p: ({ node, ...props }) => (
                  <p className="my-6 text-ink/90 font-serif leading-relaxed text-lg">
                    {props.children}
                  </p>
                ),
                pre: ({ node, ...props }) => (
                  <pre className="my-6 p-4 rounded-xl bg-stone-50 border border-stone-300 overflow-x-auto text-xs sm:text-sm font-mono text-dataBlue" {...props} />
                ),
                code: ({ node, inline, ...props }) => (
                  inline ? (
                    <code className="px-1.5 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-bay" {...props} />
                  ) : (
                    <div className="overflow-x-auto my-4">
                      <code className="font-mono text-sm" {...props} />
                    </div>
                  )
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-ink font-semibold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="text-ink/90 italic" {...props} />
                ),
                hr: () => (
                  <div className="my-12 flex items-center justify-center gap-3">
                    <div className="h-px bg-stone-200/80 flex-1" />
                    <span className="w-2 h-2 rounded-full bg-amberAccent" />
                    <div className="h-px bg-stone-200/80 flex-1" />
                  </div>
                ),
              }}
            >
              {currentChapter.content}
            </ReactMarkdown>
          </div>

          {/* Séparateur de fin de chapitre */}
          <div className="mt-14 pt-8 border-t border-stone-200/80 flex items-center justify-between text-xs font-mono text-ink/65">
            <span>FIN DU CHAPITRE {currentChapter.number}</span>
            <span className="text-bay font-semibold">PORT-MYSTRAL // ARCHIMÈDE LAB</span>
          </div>

          {/* Pagination en bas de page (cibles tactiles min 48px) */}
          <div className="no-print mt-10 pt-6 border-t border-stone-200/80 flex items-center justify-between gap-4">
            <button
              onClick={() => handleChapterChange(currentChapterIndex - 1)}
              disabled={currentChapterIndex === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-stone-200/80 bg-white/90 hover:bg-stone-100 hover:border-bay/40 text-bay disabled:opacity-30 disabled:pointer-events-none transition-all font-sans text-xs sm:text-sm font-semibold min-h-[48px] shadow-xs"
              title="Lire le chapitre précédent"
            >
              <ChevronLeft className="w-4 h-4 text-bay" />
              <span>Chapitre précédent</span>
            </button>

            <div className="text-center font-mono text-xs text-ink/70">
              <span className="text-bay font-bold">Chapitre {currentChapter.number}</span> sur {chapters.length}
            </div>

            <button
              onClick={() => handleChapterChange(currentChapterIndex + 1)}
              disabled={currentChapterIndex === chapters.length - 1}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amberAccent text-white hover:opacity-95 disabled:opacity-30 disabled:pointer-events-none transition-all font-sans text-xs sm:text-sm font-semibold shadow-md min-h-[48px]"
              title="Lire le chapitre suivant"
            >
              <span>Chapitre suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pied du composant avec boutons d'export (cibles tactiles min 48px) */}
          <div className="no-print mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Bouton 1 : Télécharger le PDF complet */}
            <a
              href="/roman-extrait.pdf"
              download="Leau-qui-accroche-Extrait-Roman.pdf"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-bold text-white bg-amberAccent hover:opacity-95 shadow-md transition-all transform hover:-translate-y-0.5 min-h-[48px]"
            >
              <FileDown className="w-4 h-4" />
              <span>Télécharger le PDF complet</span>
            </a>

            {/* Bouton 2 : Imprimer / Sauvegarder ce chapitre */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-semibold text-bay bg-white/90 hover:bg-stone-50 border border-stone-200/80 hover:border-bay/40 transition-all shadow-sm min-h-[48px]"
              title="Ouvre la boîte d'impression ou d'enregistrement PDF du navigateur"
            >
              <Printer className="w-4 h-4 text-bay" />
              <span>Imprimer / Sauvegarder ce chapitre</span>
            </button>

          </div>
        </article>

      </div>
    </section>
  );
}
