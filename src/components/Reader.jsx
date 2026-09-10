import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { BookOpen, Printer, FileDown, Compass, Quote, Minus, Plus } from 'lucide-react';
import content from '../content/chapitre1.md?raw';

export default function Reader() {
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg' | 'xl'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans'

  const handlePrint = () => {
    window.print();
  };

  // Tailles de police dynamiques
  const fontSizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    lg: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  return (
    <section id="lecture" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-abyss-800">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête du composant avec mention officielle */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-abyss-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-abyss-850 border border-biolum-cyan/30 flex items-center justify-center text-biolum-cyan shadow-biolum-cyan">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-tech text-xs text-biolum-teal uppercase tracking-wider block font-semibold">
                Extrait officiel — Chapitre 1 : L'eau qui accroche
              </span>
              <span className="text-slate-400 text-xs font-tech">
                Lecture intégrale du manuscrit // Roman Hard Sci-Fi YA
              </span>
            </div>
          </div>

          {/* Outils de confort de lecture */}
          <div className="flex items-center gap-3">
            {/* Bascule Serif / Sans */}
            <div className="inline-flex rounded-lg bg-abyss-900 border border-abyss-700 p-0.5 text-xs font-tech">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  fontFamily === 'serif' ? 'bg-biolum-cyan/20 text-biolum-cyan font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="Typographie roman avec empattement"
              >
                Roman
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  fontFamily === 'sans' ? 'bg-biolum-cyan/20 text-biolum-cyan font-semibold' : 'text-slate-400 hover:text-white'
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

        {/* Corps du roman / Lecteur Markdown interactif avec support KaTeX */}
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
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight pb-4 border-b border-abyss-700/80 mt-2 mb-6"
                    {...props}
                  />
                ),
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
              {content}
            </ReactMarkdown>
          </div>

          {/* Séparateur de fin de chapitre */}
          <div className="mt-14 pt-8 border-t border-abyss-800 flex items-center justify-between text-xs font-tech text-slate-400">
            <span>FIN DU CHAPITRE 1</span>
            <span className="text-biolum-cyan">PORT-MYSTRAL // CODEC ARCHIMÈDE</span>
          </div>

          {/* Pied du composant avec les deux boutons d'action exigés */}
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
