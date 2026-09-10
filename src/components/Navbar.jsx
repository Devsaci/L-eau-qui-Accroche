import React from 'react';
import { Waves, Download, FileDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-cyan-500/20 shadow-lg shadow-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Badge Roman YA */}
        <a href="#anomalie" className="flex items-center gap-3 group min-h-[44px]">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)] group-hover:border-cyan-400 transition-colors">
            <Waves className="w-5 h-5 animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <div>
            <span className="font-display font-bold tracking-wider text-white text-base sm:text-lg block group-hover:text-cyan-300 transition-colors">
              L’EAU QUI <span className="text-cyan-400">ACCROCHE</span>
            </span>
            <span className="font-tech text-[10px] text-emerald-400 tracking-tight block font-medium">
              PORT-MYSTRAL // ANOMALIE DE LA BAIE
            </span>
          </div>
        </a>

        {/* Liens de navigation */}
        <nav className="hidden md:flex items-center gap-6 font-tech text-xs tracking-wider text-slate-300">
          <a href="#lecture" className="hover:text-cyan-400 transition-colors py-2">
            // L'ANOMALIE (LECTURE)
          </a>
          <a href="#protagonistes" className="hover:text-cyan-400 transition-colors py-2">
            // PROTAGONISTES
          </a>
          <a href="#preuve" className="hover:text-cyan-400 transition-colors py-2">
            // LE COÛT DE LA PREUVE
          </a>
          <a href="#telechargement" className="hover:text-cyan-400 transition-colors py-2">
            // EXTRAIT PDF
          </a>
        </nav>

        {/* Actions rapides avec cibles tactiles min 44px */}
        <div className="flex items-center gap-3">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-tech font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all min-h-[44px]"
          >
            <FileDown className="w-4 h-4" />
            <span>PDF EXTRAIT</span>
          </a>

          <a
            href="#telechargement"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-tech font-medium bg-slate-900 border border-cyan-500/30 text-slate-200 hover:border-emerald-400/50 hover:text-emerald-300 transition-all min-h-[44px]"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>PWA</span>
          </a>
        </div>

      </div>
    </header>
  );
}
