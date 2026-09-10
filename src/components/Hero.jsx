import React from 'react';
import { FileDown, Sparkles, ChevronRight, Waves, AlertOctagon } from 'lucide-react';
import TelemetryHUD from './TelemetryHUD';

export default function Hero() {
  return (
    <section id="anomalie" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
      {/* Halos bioluminescents & courants anormaux */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-biolum-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-biolum-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge Univers */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-abyss-850 border border-biolum-cyan/30 text-biolum-cyan text-xs font-tech mb-6 shadow-hud">
          <Waves className="w-3.5 h-3.5 animate-pulse" />
          <span className="tracking-wider">ANOMALIE DE PORT-MYSTRAL // HARD SCI-FI YOUNG ADULT</span>
        </div>

        {/* Titre Principal */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none">
          L’EAU QUI <br />
          <span className="bg-gradient-to-r from-biolum-cyan via-biolum-teal to-biolum-blue bg-clip-text text-transparent text-glow-cyan">
            ACCROCHE
          </span>
        </h1>

        {/* Sous-titre officiel */}
        <p className="mt-5 font-display text-lg sm:text-2xl text-biolum-teal font-medium tracking-wide">
          « À Port-Mystral, le réel a cessé d’être fluide. »
        </p>

        {/* Accroche officielle du roman */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
          Dans la baie de Port-Mystral, l'eau présente une résistance mécanique anormale : objets déviés, bouée flottant à l'envers et lois de la physique qui vacillent. Face au discours officiel et rassurant de l'océanographe <span className="text-slate-100 font-semibold underline decoration-depth-warning/60">Élise Tamar</span>, deux jeunes esprits refusent le confort de la panique ou de l'illusion.
        </p>

        {/* Métriques du tableau de bord (Télémétrie scientifique réelle) */}
        <TelemetryHUD />

        {/* Actions principales (CTA) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-display text-sm font-bold text-abyss-950 bg-gradient-to-r from-biolum-cyan via-biolum-teal to-biolum-blue hover:brightness-110 shadow-biolum-cyan transition-all transform hover:-translate-y-0.5"
          >
            <FileDown className="w-5 h-5" />
            <span>TÉLÉCHARGER L'EXTRAIT DU ROMAN (PDF)</span>
          </a>

          <a
            href="#lecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-display text-xs sm:text-sm font-semibold text-biolum-cyan bg-abyss-850 hover:bg-abyss-800 border border-biolum-cyan/50 hover:border-biolum-cyan transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-biolum-cyan" />
            <span>LIRE LE PREMIER CHAPITRE</span>
          </a>
          
          <a
            href="#protagonistes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-tech text-xs font-medium text-slate-300 bg-abyss-900/80 hover:bg-abyss-800 border border-abyss-700 hover:border-biolum-teal/40 transition-all shadow-sm"
          >
            <span>PROTAGONISTES</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Note PWA & Cache Offline */}
        <div className="mt-8 text-xs font-tech text-slate-400 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PWA INSTALLABLE & FONCTIONNELLE HORS-LIGNE</span>
          </div>
          <span className="hidden sm:inline text-abyss-700">•</span>
          <span className="text-biolum-cyan/80">Extrait PDF automatiquement pré-mis en cache</span>
        </div>

      </div>
    </section>
  );
}
