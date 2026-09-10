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
  BookMarked
} from 'lucide-react';
import chapters from '../content/chapters.js';

// Fonction de slugification robuste partagée gérant les accents, apostrophes et caractères spéciaux
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
  const readerRef = useRef(null);

  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  // Tailles de police dynamiques
  const fontSizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    lg: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  // Extraction automatique des titres Markdown h2 pour le sommaire avec slugification harmonisée
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
      // Nettoyage du hash si on change de chapitre
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

    // a) Mise à jour de l'URL avec l'ancre sans recharger la page
    window.history.pushState(null, '', `#${slug}`);

    // d) Fermeture du panneau du sommaire
    setIsTocOpen(false);

    // b) & c) Recherche de l'élément cible et défilement fluide
    setTimeout(() => {
      const targetEl = document.getElementById(slug) || document.querySelector(`[id="${slug}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Synchronisation initiale : si l'URL contient déjà un hash lors de l'affichage
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

  // Écoute de la touche Échap pour refermer le sommaire
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
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-abyss-800 scroll-mt-6"
    >
      <div className="max-w-4xl mx-auto">

        {/* En-tête du lecteur avec informations et barre d'outils */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-abyss-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-abyss-850 border border-biolum-cyan/30 flex items-center justify-center text-biolum-cyan shadow-biolum-cyan">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-tech text-xs text-biolum-teal uppercase tracking-wider block font-semibold">
                Extrait officiel — Chapitre {currentChapter.number} : {currentChapter.title}
              </span>
              <span className="text-slate-400 text-xs font-tech">
                {currentChapter.subtitle} // Roman Hard Sci-Fi YA
              </span>
            </div>
          </div>

          {/* Outils de lecture & bouton Sommaire */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Bouton Panneau Sommaire */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-tech transition-all ${
                isTocOpen
                  ? 'bg-biolum-cyan text-abyss-950 border-biolum-cyan font-bold shadow-biolum-cyan'
                  : 'bg-abyss-900 border-abyss-700 text-slate-300 hover:text-biolum-cyan hover:border-biolum-cyan/40'
              }`}
              title="Ouvrir le sommaire du roman et les sections du chapitre"
              aria-label="Ouvrir le sommaire"
            >
              <List className="w-4 h-4" />
              <span>Sommaire</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                isTocOpen ? 'bg-abyss-950 text-biolum-cyan' : 'bg-biolum-cyan/20 text-biolum-cyan'
              }`}>
                {headings.length}
              </span>
            </button>

            {/* Bascule Serif / Sans */}
            <div className="inline-flex rounded-lg bg-abyss-900 border border-abyss-700 p-0.5 text-xs font-tech">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  fontFamily === 'serif'
                    ? 'bg-biolum-cyan/20 text-biolum-cyan font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Typographie roman avec empattement"
              >
                Roman
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  fontFamily === 'sans'
                    ? 'bg-biolum-cyan/20 text-biolum-cyan font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Typographie moderne sans-serif"
              >
                Moderne
              </button>
            </div>

            {/* Ajustement taille de police */}
            <div className="inline-flex items-center gap-1 rounded-lg bg-abyss-900 border border-abyss-700 px-2 py-1 text-xs font-tech text-slate-300">
              <button
                onClick={() => {
                  if (fontSize === 'xl') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('sm');
                }}
                disabled={fontSize === 'sm'}
                className="hover:text-biolum-cyan disabled:opacity-40 p-1"
                title="Diminuer la taille"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-[11px] font-bold">A</span>
              <button
                onClick={() => {
                  if (fontSize === 'sm') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('xl');
                }}
                disabled={fontSize === 'xl'}
                className="hover:text-biolum-cyan disabled:opacity-40 p-1"
                title="Augmenter la taille"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Panneau rétractable "Sommaire" */}
        {isTocOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Arrière-plan flou et sombre */}
            <div
              onClick={() => setIsTocOpen(false)}
              className="fixed inset-0 bg-abyss-950/80 backdrop-blur-sm transition-opacity"
            />

            {/* Tiroir latéral coulissant */}
            <aside className="relative w-full max-w-md bg-abyss-900 border-l border-abyss-700/80 shadow-2xl p-6 flex flex-col h-full z-10 overflow-y-auto">
              
              {/* En-tête du Sommaire */}
              <div className="flex items-center justify-between pb-4 border-b border-abyss-800">
                <div className="flex items-center gap-2 text-biolum-cyan font-display font-bold text-sm tracking-wide">
                  <BookMarked className="w-4 h-4" />
                  <span>SOMMAIRE DU MANUSCRIT</span>
                </div>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="p-1.5 rounded-lg bg-abyss-800/80 text-slate-400 hover:text-white hover:bg-abyss-700 transition-colors"
                  aria-label="Fermer le sommaire"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sélection des chapitres */}
              <div className="mt-6">
                <span className="text-[11px] font-tech text-slate-400 uppercase tracking-wider block mb-3">
                  Chapitres du roman ({chapters.length})
                </span>
                <div className="space-y-2">
                  {chapters.map((chap, idx) => {
                    const isActive = idx === currentChapterIndex;
                    return (
                      <button
                        key={chap.id}
                        onClick={() => handleChapterChange(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          isActive
                            ? 'bg-biolum-cyan/10 border-biolum-cyan/50 text-white shadow-sm'
                            : 'bg-abyss-850 border-abyss-800 text-slate-300 hover:border-abyss-700 hover:bg-abyss-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-tech font-bold uppercase px-1.5 py-0.5 rounded ${
                              isActive ? 'bg-biolum-cyan text-abyss-950' : 'bg-abyss-700 text-slate-300'
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
                          <CheckCircle2 className="w-4 h-4 text-biolum-cyan shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sections h2 extraites du chapitre actif */}
              <div className="mt-8 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-tech text-slate-400 uppercase tracking-wider">
                    Sections du Chapitre {currentChapter.number} ({headings.length})
                  </span>
                  <span className="text-[10px] text-biolum-teal font-mono">
                    Navigation instantanée
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
                          className="w-full text-left p-2.5 rounded-lg bg-abyss-850/60 hover:bg-abyss-800 border border-transparent hover:border-biolum-cyan/30 text-xs text-slate-300 hover:text-biolum-cyan transition-all flex items-start gap-2.5 group block"
                        >
                          <span className="text-[10px] font-mono text-biolum-teal/70 group-hover:text-biolum-teal mt-0.5">
                            § {currentChapter.number}.{i + 1}
                          </span>
                          <span className="flex-1 font-serif leading-snug">
                            {h.text}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pied de tiroir : raccourci de fermeture */}
              <div className="pt-4 mt-6 border-t border-abyss-800 text-center">
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-abyss-800 hover:bg-abyss-700 text-xs font-tech text-slate-300 hover:text-white transition-colors"
                >
                  Fermer le sommaire
                </button>
              </div>

            </aside>
          </div>
        )}

        {/* Corps du roman / Lecteur Markdown interactif avec support KaTeX et rehype-slug */}
        <article
          className={`reader-container card-abyssal rounded-3xl p-6 sm:p-12 lg:p-16 border border-abyss-700/80 bg-abyss-900/95 shadow-2xl relative ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          }`}
        >
          {/* Halo lumineux d'ambiance en arrière-plan */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-biolum-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className={`reader-prose ${fontSizes[fontSize]} relative z-10`}>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeSlug]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    id={props.id}
                    className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight pb-4 border-b border-abyss-700/80 mt-2 mb-8 scroll-mt-24"
                    {...props}
                  />
                ),
                h2: ({ node, children, ...props }) => {
                  const text = getNodeText(children);
                  const id = slugify(text);
                  const { id: _ignoredId, ...restProps } = props;
                  return (
                    <h2
                      id={id}
                      className="scroll-mt-24 text-xl sm:text-2xl font-bold text-cyan-200 mt-10 mb-4 border-b border-cyan-900/50 pb-2 font-display flex items-center gap-3 group"
                      {...restProps}
                    >
                      <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-biolum-cyan to-biolum-teal inline-block shadow-biolum-cyan group-hover:scale-y-125 transition-transform" />
                      <span className="flex-1">{children}</span>
                    </h2>
                  );
                },
                h3: ({ node, ...props }) => (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-abyss-850 border border-biolum-teal/30 text-biolum-teal text-xs font-tech my-4">
                    <Compass className="w-3.5 h-3.5 animate-pulse text-biolum-teal" />
                    <span {...props} />
                  </div>
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="my-7 p-5 sm:p-6 rounded-xl bg-abyss-950/90 border-l-4 border-biolum-cyan text-slate-100 font-sans italic shadow-sm relative"
                  >
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-biolum-cyan shrink-0 mt-0.5" />
                      <div className="flex-1 font-serif text-sm sm:text-base text-slate-100">
                        {props.children}
                      </div>
                    </div>
                  </blockquote>
                ),
                p: ({ node, ...props }) => (
                  <p className="my-5 text-slate-100 sm:text-slate-200 font-normal leading-relaxed sm:leading-loose">
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
                  <div className="my-10 flex items-center justify-center gap-3">
                    <div className="h-px bg-abyss-800 flex-1" />
                    <span className="w-2.5 h-2.5 rounded-full bg-biolum-cyan/70 animate-pulse" />
                    <div className="h-px bg-abyss-800 flex-1" />
                  </div>
                ),
              }}
            >
              {currentChapter.content}
            </ReactMarkdown>
          </div>

          {/* Séparateur de fin de chapitre */}
          <div className="mt-14 pt-8 border-t border-abyss-800 flex items-center justify-between text-xs font-tech text-slate-400">
            <span>FIN DU CHAPITRE {currentChapter.number}</span>
            <span className="text-biolum-cyan">PORT-MYSTRAL // CODEC ARCHIMÈDE</span>
          </div>

          {/* Pagination en bas de page (Boutons Chapitre précédent / Chapitre suivant) */}
          <div className="no-print mt-8 pt-6 border-t border-abyss-800 flex items-center justify-between gap-4">
            <button
              onClick={() => handleChapterChange(currentChapterIndex - 1)}
              disabled={currentChapterIndex === 0}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-abyss-700 bg-abyss-850 hover:bg-abyss-800 text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all font-tech text-xs sm:text-sm"
              title="Lire le chapitre précédent"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chapitre précédent</span>
            </button>

            <div className="text-center font-tech text-xs text-slate-400">
              <span className="text-biolum-cyan font-bold">Chapitre {currentChapter.number}</span> sur {chapters.length}
            </div>

            <button
              onClick={() => handleChapterChange(currentChapterIndex + 1)}
              disabled={currentChapterIndex === chapters.length - 1}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-biolum-cyan/50 bg-biolum-cyan/10 hover:bg-biolum-cyan/20 text-biolum-cyan disabled:opacity-30 disabled:pointer-events-none transition-all font-tech text-xs sm:text-sm font-semibold"
              title="Lire le chapitre suivant"
            >
              <span>Chapitre suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pied du composant avec les deux boutons d'action d'export */}
          <div className="no-print mt-8 pt-6 border-t border-abyss-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Bouton 1 : Télécharger le PDF complet */}
            <a
              href="/roman-extrait.pdf"
              download="Leau-qui-accroche-Extrait-Roman.pdf"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold text-abyss-950 bg-gradient-to-r from-biolum-cyan via-biolum-teal to-biolum-blue hover:brightness-110 shadow-biolum-cyan transition-all transform hover:-translate-y-0.5"
            >
              <FileDown className="w-4 h-4" />
              <span>Télécharger le PDF complet</span>
            </a>

            {/* Bouton 2 : Imprimer / Sauvegarder ce chapitre */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-tech text-xs font-medium text-slate-200 bg-abyss-850 hover:bg-abyss-800 border border-abyss-700 hover:border-biolum-teal/40 transition-all shadow-sm"
              title="Ouvre la boîte d'impression ou d'enregistrement PDF du navigateur avec mise en page optimisée"
            >
              <Printer className="w-4 h-4 text-biolum-teal" />
              <span>Imprimer / Sauvegarder ce chapitre</span>
            </button>

          </div>
        </article>

      </div>
    </section>
  );
}
