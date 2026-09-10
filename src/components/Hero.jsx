import React from 'react';
import { FileDown, Sparkles, ChevronRight, Waves } from 'lucide-react';
import TelemetryHUD from './TelemetryHUD';

export default function Hero() {
  return (
    <section id="anomalie" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
      {/* Halos subtils très doux façon lumière côtière */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-amberAccent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-bay/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge Univers */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/80 text-bay text-xs font-mono mb-6 shadow-sm">
          <Waves className="w-3.5 h-3.5 text-bay" />
          <span className="tracking-wider">ANOMALIE DE PORT-MYSTRAL // HARD SCI-FI YOUNG ADULT</span>
        </div>

        {/* Titre Principal */}
        <h1 className="font-serif font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-bay leading-tight">
          L’EAU QUI <br />
          <span className="text-amberAccent font-serif">
            ACCROCHE
          </span>
        </h1>

        {/* Sous-titre officiel */}
        <p className="mt-5 font-serif italic text-ink/85 text-xl sm:text-2xl font-medium tracking-wide">
          « À Port-Mystral, le réel a cessé d’être fluide. »
        </p>

        {/* Accroche officielle du roman (WCAG AAA vérifié) */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-ink/80 max-w-3xl mx-auto font-sans leading-relaxed">
          Dans la baie de Port-Mystral, l'eau présente une résistance mécanique anormale : objets déviés, bouée flottant à l'envers et lois de la physique qui vacillent. Face au discours officiel et rassurant de l'océanographe <span className="text-bay font-semibold underline decoration-amberAccent/70">Élise Tamar</span>, deux jeunes esprits refusent le confort de la panique ou de l'illusion.
        </p>

        {/* Métriques du tableau de bord (Télémétrie scientifique réelle) */}
        <TelemetryHUD />

        {/* Actions principales (CTA avec cibles tactiles min 48px) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-sans text-sm font-bold text-white bg-amberAccent hover:opacity-95 shadow-md transition-all transform hover:-translate-y-0.5 min-h-[48px]"
          >
            <FileDown className="w-5 h-5" />
            <span>TÉLÉCHARGER L'EXTRAIT DU ROMAN (PDF)</span>
          </a>

          <a
            href="#lecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-semibold text-bay bg-white/90 hover:bg-stone-50 border border-stone-200/80 hover:border-bay/40 transition-all shadow-sm min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 text-amberAccent" />
            <span>LIRE LE PREMIER CHAPITRE</span>
          </a>
          
          <a
            href="#protagonistes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-sans text-xs font-medium text-ink/80 bg-stone-100/80 hover:bg-stone-100 border border-stone-200/80 hover:text-bay transition-all shadow-sm min-h-[48px]"
          >
            <span>PROTAGONISTES</span>
            <ChevronRight className="w-4 h-4 text-ink/50" />
          </a>
        </div>

        {/* Note PWA & Cache Offline */}
        <div className="mt-8 text-xs font-mono text-ink/65 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kelp" />
            <span className="text-bay font-medium">PWA INSTALLABLE & FONCTIONNELLE HORS-LIGNE</span>
          </div>
          <span className="hidden sm:inline text-stone-400">•</span>
          <span className="text-dataBlue">Extrait PDF automatiquement pré-mis en cache</span>
        </div>

      </div>
    </section>
  );
}
