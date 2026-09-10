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
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-cyan-500/20 scroll-mt-6"
    >
      {/* Barre de progression de lecture supérieure (discrète & luminescente) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/60 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">

        {/* En-tête du lecteur & barre d'outils avec cibles tactiles calibrées (min 44px) */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-tech text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                Extrait officiel // Chapitre {currentChapter.number} : {currentChapter.title}
              </span>
              <span className="text-slate-400 text-xs font-tech">
                {currentChapter.subtitle} // Roman Hard Sci-Fi YA
              </span>
            </div>
          </div>

          {/* Outils de lecture & bouton Sommaire */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Indicateur télémétrique de progression de lecture */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/70 border border-cyan-500/20 text-xs font-tech text-slate-300 min-h-[44px]">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-slate-400">Progression :</span>
              <span className="font-bold text-cyan-300">{readingProgress}%</span>
            </div>

            {/* Bouton Panneau Sommaire */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-tech transition-all min-h-[44px] ${
                isTocOpen
                  ? 'bg-cyan-400 text-slate-950 border-cyan-400 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'bg-slate-900/80 border-cyan-500/30 text-slate-200 hover:text-cyan-300 hover:border-cyan-400'
              }`}
              title="Ouvrir le sommaire du roman et les sections du chapitre"
              aria-label="Ouvrir le sommaire"
            >
              <List className="w-4 h-4" />
              <span>Sommaire</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                isTocOpen ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/20 text-cyan-300'
              }`}>
                {headings.length}
              </span>
            </button>

            {/* Bascule Serif / Sans */}
            <div className="inline-flex rounded-lg bg-slate-900/80 border border-cyan-500/20 p-1 text-xs font-tech min-h-[44px] items-center">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-3 py-1.5 rounded-md transition-colors min-h-[36px] ${
                  fontFamily === 'serif'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Typographie roman avec empattement"
              >
                Roman
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-3 py-1.5 rounded-md transition-colors min-h-[36px] ${
                  fontFamily === 'sans'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Typographie moderne sans-serif"
              >
                Moderne
              </button>
            </div>

            {/* Ajustement taille de police */}
            <div className="inline-flex items-center gap-1 rounded-lg bg-slate-900/80 border border-cyan-500/20 px-2 py-1 text-xs font-tech text-slate-300 min-h-[44px]">
              <button
                onClick={() => {
                  if (fontSize === 'xl') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('sm');
                }}
                disabled={fontSize === 'sm'}
                className="hover:text-cyan-300 disabled:opacity-30 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Diminuer la taille du texte"
                aria-label="Diminuer la taille"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-bold text-white">A</span>
              <button
                onClick={() => {
                  if (fontSize === 'sm') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('xl');
                }}
                disabled={fontSize === 'xl'}
                className="hover:text-cyan-300 disabled:opacity-30 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
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
          {/* Arrière-plan sombre avec flou d'ambiance */}
          <div
            onClick={() => setIsTocOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Tiroir latéral coulissant */}
          <aside
            className={`relative w-full max-w-md bg-slate-900/95 border-l border-cyan-500/30 shadow-2xl p-6 flex flex-col h-full z-10 overflow-y-auto transform transition-transform duration-300 ease-out ${
              isTocOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* En-tête du Sommaire */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-300 font-display font-bold text-sm tracking-wide">
                <BookMarked className="w-4 h-4 text-cyan-400" />
                <span>SOMMAIRE DU MANUSCRIT</span>
              </div>
              <button
                onClick={() => setIsTocOpen(false)}
                className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Fermer le sommaire"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sélection des chapitres */}
            <div className="mt-6">
              <span className="text-[11px] font-tech text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
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
                          ? 'bg-cyan-500/10 border-cyan-400/60 text-white shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-cyan-500/30 hover:bg-slate-800/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-tech font-bold uppercase px-2 py-0.5 rounded ${
                            isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}>
                            Chapitre {chap.number}
                          </span>
                          <span className="text-xs font-semibold text-white font-display">
                            {chap.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 font-tech">
                          {chap.subtitle}
                        </p>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sections h2 extraites du chapitre actif (cibles tactiles min 48px) */}
            <div className="mt-8 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-tech text-slate-400 uppercase tracking-wider font-semibold">
                  Sections du Chapitre {currentChapter.number} ({headings.length})
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Navigation directe
                </span>
              </div>

              {headings.length === 0 ? (
                <p className="text-xs text-slate-500 font-tech py-4 italic">
                  Aucune sous-section h2 détectée dans ce chapitre.
                </p>
              ) : (
                <ul className="space-y-2">
                  {headings.map((h, i) => (
                    <li key={h.id || i}>
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => handleSectionClick(e, h.id)}
                        className="w-full text-left p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/30 text-xs text-slate-200 hover:text-cyan-300 transition-all flex items-start gap-3 group min-h-[48px]"
                      >
                        <span className="text-[11px] font-mono text-emerald-400/80 group-hover:text-emerald-300 mt-0.5 shrink-0">
                          § {currentChapter.number}.{i + 1}
                        </span>
                        <span className="flex-1 font-serif leading-snug text-slate-200 group-hover:text-white">
                          {h.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pied de tiroir : raccourci de fermeture */}
            <div className="pt-4 mt-6 border-t border-cyan-500/20 text-center">
              <button
                onClick={() => setIsTocOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-tech text-slate-200 hover:text-white transition-colors min-h-[44px]"
              >
                Fermer le sommaire
              </button>
            </div>

          </aside>
        </div>

        {/* Corps du roman / Lecteur Markdown interactif avec typographie optimale 68ch et console KaTeX */}
        <article
          ref={articleRef}
          className={`reader-container card-abyssal rounded-3xl p-6 sm:p-12 lg:p-16 border border-cyan-500/20 bg-slate-900/60 shadow-2xl relative ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          }`}
        >
          {/* Halo d'ambiance bioluminescent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Conteneur de prose optimisé pour le confort de lecture (~68ch max) */}
          <div className={`reader-prose max-w-[68ch] mx-auto ${fontSizes[fontSize]} relative z-10 text-slate-100`}>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeSlug]}
              components={{
                h1: ({ node, ...props }) => (
                  <header className="mb-10 pb-6 border-b border-cyan-500/25">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-tech text-cyan-300 mb-4">
                      <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                      <span>MANUSCRIT // TRANSMISSION SOURCE : PORT-MYSTRAL</span>
                    </div>
                    <h1
                      id={props.id}
                      className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight scroll-mt-24"
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
                      className="scroll-mt-24 text-xl sm:text-2xl font-bold text-white mt-12 mb-5 pb-3 border-b border-cyan-500/20 font-display flex items-center gap-3 group"
                      {...restProps}
                    >
                      <span className="w-2 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-emerald-400 inline-block shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:scale-y-125 transition-transform" />
                      <span className="flex-1 text-slate-100 group-hover:text-cyan-200 transition-colors">
                        {children}
                      </span>
                    </h2>
                  );
                },
                h3: ({ node, ...props }) => (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-tech my-5 shadow-sm">
                    <Compass className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    <span {...props} />
                  </div>
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="my-8 p-5 sm:p-6 rounded-2xl bg-slate-950/80 border-l-4 border-cyan-400 text-slate-100 font-sans italic shadow-sm relative"
                  >
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="flex-1 font-serif text-sm sm:text-base text-slate-200 leading-relaxed">
                        {props.children}
                      </div>
                    </div>
                  </blockquote>
                ),
                p: ({ node, ...props }) => (
                  <p className="my-6 text-slate-200 font-normal leading-relaxed sm:leading-loose">
                    {props.children}
                  </p>
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-white font-semibold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="text-slate-100 italic" {...props} />
                ),
                hr: () => (
                  <div className="my-12 flex items-center justify-center gap-3">
                    <div className="h-px bg-cyan-500/20 flex-1" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <div className="h-px bg-cyan-500/20 flex-1" />
                  </div>
                ),
              }}
            >
              {currentChapter.content}
            </ReactMarkdown>
          </div>

          {/* Séparateur de fin de chapitre */}
          <div className="mt-14 pt-8 border-t border-cyan-500/20 flex items-center justify-between text-xs font-tech text-slate-400">
            <span>FIN DU CHAPITRE {currentChapter.number}</span>
            <span className="text-cyan-400">PORT-MYSTRAL // ARCHIMÈDE LAB</span>
          </div>

          {/* Pagination en bas de page (cibles tactiles min 48px) */}
          <div className="no-print mt-8 pt-6 border-t border-cyan-500/20 flex items-center justify-between gap-4">
            <button
              onClick={() => handleChapterChange(currentChapterIndex - 1)}
              disabled={currentChapterIndex === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/20 bg-slate-900/80 hover:bg-slate-800 text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all font-tech text-xs sm:text-sm min-h-[48px]"
              title="Lire le chapitre précédent"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chapitre précédent</span>
            </button>

            <div className="text-center font-tech text-xs text-slate-400">
              <span className="text-cyan-400 font-bold">Chapitre {currentChapter.number}</span> sur {chapters.length}
            </div>

            <button
              onClick={() => handleChapterChange(currentChapterIndex + 1)}
              disabled={currentChapterIndex === chapters.length - 1}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 disabled:opacity-30 disabled:pointer-events-none transition-all font-tech text-xs sm:text-sm font-semibold min-h-[48px]"
              title="Lire le chapitre suivant"
            >
              <span>Chapitre suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pied du composant avec boutons d'export (cibles tactiles min 48px) */}
          <div className="no-print mt-8 pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Bouton 1 : Télécharger le PDF complet */}
            <a
              href="/roman-extrait.pdf"
              download="Leau-qui-accroche-Extrait-Roman.pdf"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 hover:brightness-110 shadow-[0_0_18px_rgba(34,211,238,0.4)] transition-all transform hover:-translate-y-0.5 min-h-[48px]"
            >
              <FileDown className="w-4 h-4" />
              <span>Télécharger le PDF complet</span>
            </a>

            {/* Bouton 2 : Imprimer / Sauvegarder ce chapitre */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-tech text-xs font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-emerald-400/40 transition-all shadow-sm min-h-[48px]"
              title="Ouvre la boîte d'impression ou d'enregistrement PDF du navigateur"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Imprimer / Sauvegarder ce chapitre</span>
            </button>

          </div>
        </article>

      </div>
    </section>
  );
}
