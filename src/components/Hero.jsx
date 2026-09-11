import React from 'react';
import { FileDown, BookOpen, ChevronRight, Waves } from 'lucide-react';
import TelemetryHUD from './TelemetryHUD';

export default function Hero() {
  return (
    <section id="anomalie" className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Légère nuance chaude d'automne en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-brick-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gold-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge Univers & Station d'observation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-card border border-brick/20 text-brick text-xs font-mono mb-6 shadow-paper">
          <Waves className="w-3.5 h-3.5 text-brick" />
          <span className="tracking-wider font-semibold">ANOMALIE DE PORT-MYSTRAL // CARNET D'OBSERVATION SCIENTIFIQUE</span>
        </div>

        {/* Titre Principal avec dégradé subtil brique vers or patiné */}
        <h1 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink leading-tight drop-shadow-sm">
          L’EAU QUI <br />
          <span className="bg-gradient-to-r from-brick via-rust to-gold bg-clip-text text-transparent italic">
            ACCROCHE
          </span>
        </h1>

        {/* Sous-titre officiel */}
        <p className="mt-4 font-serif italic text-xl sm:text-2xl md:text-3xl text-brick font-normal tracking-wide">
          « À Port-Mystral, le réel a cessé d’être fluide. »
        </p>

        {/* Accroche du roman (WCAG AAA vérifié) */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-ink-light max-w-3xl mx-auto font-sans leading-relaxed">
          Dans la baie de Port-Mystral, l'eau présente une résistance mécanique anormale : objets déviés, bouée flottant à l'envers et lois de la physique qui vacillent. Face au discours officiel et rassurant de l'océanographe <span className="text-ink font-semibold underline decoration-gold/70">Élise Tamar</span>, deux jeunes esprits refusent le confort de la panique ou de l'illusion.
        </p>

        {/* Métriques du carnet de terrain (Télémétrie scientifique) */}
        <TelemetryHUD />

        {/* Actions principales (CTA avec cibles tactiles min 48px) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-serif text-base font-bold text-white bg-brick hover:bg-rust shadow-brick-soft transition-all transform hover:-translate-y-0.5 min-h-[48px]"
          >
            <FileDown className="w-5 h-5" />
            <span>TÉLÉCHARGER L'EXTRAIT DU ROMAN (PDF)</span>
          </a>

          <a
            href="#lecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-semibold text-brick bg-paper-card hover:bg-white border border-brick/30 hover:border-brick transition-all shadow-paper min-h-[48px]"
          >
            <BookOpen className="w-4 h-4 text-brick" />
            <span>LIRE LE PREMIER CHAPITRE</span>
          </a>
          
          <a
            href="#protagonistes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-medium text-ink-muted bg-paper-card hover:bg-white border border-brick/20 hover:border-brick/40 transition-all shadow-paper min-h-[48px]"
          >
            <span>PROTAGONISTES</span>
            <ChevronRight className="w-4 h-4 text-ink-muted" />
          </a>
        </div>

        {/* Note PWA & Cache Offline */}
        <div className="mt-8 text-xs font-mono text-ink-muted flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-gold-dark font-medium">PWA INSTALLABLE & LECTURE HORS-LIGNE</span>
          </div>
          <span className="hidden sm:inline text-ink-faint">•</span>
          <span className="text-ink-light">Extrait PDF disponible pour relevés de terrain</span>
        </div>

      </div>
    </section>
  );
}
