import React from 'react';
import { Waves, Download, FileDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-abyss-950/85 border-b border-abyss-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Badge Roman YA */}
        <a href="#anomalie" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-abyss-850 border border-biolum-cyan/30 text-biolum-cyan shadow-biolum-cyan group-hover:border-biolum-cyan transition-colors">
            <Waves className="w-5 h-5 animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-biolum-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-biolum-teal"></span>
            </span>
          </div>
          <div>
            <span className="font-display font-bold tracking-wider text-white text-base sm:text-lg block group-hover:text-biolum-cyan transition-colors">
              L’EAU QUI <span className="text-biolum-cyan">ACCROCHE</span>
            </span>
            <span className="font-tech text-[10px] text-biolum-teal tracking-tight block">
              PORT-MYSTRAL // ANOMALIE DE LA BAIE
            </span>
          </div>
        </a>

        {/* Liens de navigation */}
        <nav className="hidden md:flex items-center gap-6 font-tech text-xs tracking-wider text-slate-300">
          <a href="#lecture" className="hover:text-biolum-cyan transition-colors">
            // L'ANOMALIE (CHAPITRE 1)
          </a>
          <a href="#protagonistes" className="hover:text-biolum-cyan transition-colors">
            // PROTAGONISTES
          </a>
          <a href="#preuve" className="hover:text-biolum-cyan transition-colors">
            // LE COÛT DE LA PREUVE
          </a>
          <a href="#telechargement" className="hover:text-biolum-cyan transition-colors">
            // EXTRAIT PDF
          </a>
        </nav>

        {/* Actions rapides */}
        <div className="flex items-center gap-3">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-tech font-medium bg-biolum-cyan/10 text-biolum-cyan border border-biolum-cyan/40 hover:bg-biolum-cyan/20 hover:border-biolum-cyan transition-all duration-200"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>PDF EXTRAIT</span>
          </a>

          <a
            href="#telechargement"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-tech font-medium bg-abyss-800 text-slate-200 border border-abyss-700 hover:border-biolum-teal/40 hover:text-white transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5 text-biolum-teal" />
            <span>PWA</span>
          </a>
        </div>

      </div>
    </header>
  );
}
