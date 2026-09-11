import React from 'react';
import { Waves, Download, FileDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/90 border-b border-brick/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Sceau de la Station Archimède */}
        <a href="#anomalie" className="flex items-center gap-3 group min-h-[44px]">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brick-50 border border-brick/25 text-brick shadow-paper group-hover:border-brick transition-colors">
            <Waves className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
            </span>
          </div>
          <div>
            <span className="font-serif font-bold tracking-tight text-ink text-lg sm:text-xl block group-hover:text-brick transition-colors leading-none">
              L’EAU QUI <span className="text-brick font-semibold">ACCROCHE</span>
            </span>
            <span className="font-mono text-[10px] text-ink-muted tracking-tight block font-medium mt-1">
              PORT-MYSTRAL // CARNET D'OBSERVATION
            </span>
          </div>
        </a>

        {/* Liens de navigation du manuscrit */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider text-ink-muted">
          <a href="#lecture" className="hover:text-brick transition-colors py-2">
            // LECTURE DU MANUSCRIT
          </a>
          <a href="#protagonistes" className="hover:text-brick transition-colors py-2">
            // CHERCHEURS
          </a>
          <a href="#preuve" className="hover:text-brick transition-colors py-2">
            // LE COÛT DE LA PREUVE
          </a>
          <a href="#telechargement" className="hover:text-brick transition-colors py-2">
            // ARCHIVE PDF
          </a>
        </nav>

        {/* Actions rapides avec cibles tactiles min 44px */}
        <div className="flex items-center gap-3">
          <a
            href="/roman-extrait.pdf"
            download="Leau-qui-accroche-Extrait-Roman.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-semibold bg-brick-50 text-brick border border-brick/25 hover:bg-brick hover:text-white transition-all shadow-paper min-h-[44px]"
          >
            <FileDown className="w-4 h-4" />
            <span>EXTRAIT PDF</span>
          </a>

          <a
            href="#telechargement"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium bg-paper-card border border-brick/20 text-ink hover:border-gold hover:text-gold-dark transition-all shadow-paper min-h-[44px]"
          >
            <Download className="w-4 h-4 text-gold-dark" />
            <span>PWA HORS-LIGNE</span>
          </a>
        </div>

      </div>
    </header>
  );
}
