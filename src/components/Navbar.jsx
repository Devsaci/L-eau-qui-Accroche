import React from 'react';
import { Waves, Download, FileDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/90 border-b border-stone-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Badge Roman YA */}
        <a href="#anomalie" className="flex items-center gap-3 group min-h-[44px]">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 border border-stone-200/80 text-bay shadow-sm group-hover:border-bay transition-colors">
            <Waves className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberAccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-kelp"></span>
            </span>
          </div>
          <div>
            <span className="font-serif font-bold tracking-wide text-bay text-base sm:text-lg block group-hover:text-amberAccent transition-colors">
              L’EAU QUI <span className="text-amberAccent">ACCROCHE</span>
            </span>
            <span className="font-mono text-[10px] text-dataBlue tracking-tight block font-medium">
              PORT-MYSTRAL // ANOMALIE DE LA BAIE
            </span>
          </div>
        </a>

        {/* Liens de navigation */}
        <nav className="hidden md:flex items-center gap-6 font-sans text-xs tracking-wider text-ink/75 font-medium">
          <a href="#lecture" className="hover:text-bay transition-colors py-2">
            // L'ANOMALIE (LECTURE)
          </a>
          <a href="#protagonistes" className="hover:text-bay transition-colors py-2">
            // PROTAGONISTES
          </a>
          <a href="#preuve" className="hover:text-bay transition-colors py-2">
            // LE COÛT DE LA PREUVE
          </a>
          <a href="#telechargement" className="hover:text-bay transition-colors py-2">
            // EXTRAIT PDF
          </a>
        </nav>

        {/* Actions rapides avec cibles tactiles min 44px */}
        <div className="flex items-center gap-3">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-medium bg-white/90 text-bay border border-stone-200/80 hover:bg-stone-100 hover:border-bay/40 transition-all min-h-[44px]"
          >
            <FileDown className="w-4 h-4 text-dataBlue" />
            <span>PDF EXTRAIT</span>
          </a>

          <a
            href="#telechargement"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold bg-amberAccent text-white hover:opacity-95 shadow-sm transition-all min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>PWA</span>
          </a>
        </div>

      </div>
    </header>
  );
}
