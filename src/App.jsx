import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Reader from './components/Reader';
import Protagonists from './components/Protagonists';
import ProofCost from './components/ProofCost';
import DownloadSection from './components/DownloadSection';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink relative selection:bg-gold/25 selection:text-ink">
      {/* Grille de carnet de terrain en filigrane discret brique */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(140, 45, 25, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          <Navbar />
          <main>
            <Hero />
            <Reader />
            <Protagonists />
            <ProofCost />
            <DownloadSection />
          </main>
        </div>

        {/* Footer Carnet de Recherche Port-Mystral / Station Archimède */}
        <footer className="border-t border-brick/15 bg-paper-card/90 py-12 px-4 text-center font-mono text-xs text-ink-muted">
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="font-serif font-bold tracking-wide text-base text-brick">
              « L’EAU QUI ACCROCHE » // ROMAN HARD SCI-FI YOUNG ADULT // BAIE DE PORT-MYSTRAL
            </p>
            <p className="font-serif italic text-sm text-ink-light max-w-xl mx-auto">
              « Une observation sans mesure n'est qu'une histoire. La science est une patience. »
            </p>
            <div className="pt-4 border-t border-brick/10 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[11px] text-ink-muted">
              <span className="font-medium text-brick">Station Archimède — Île atelier</span>
              <span>•</span>
              <span className="text-rust font-medium">Progressive Web App (PWA) Hors-Ligne</span>
              <span>•</span>
              <a 
                href="/roman-extrait.pdf" 
                download="Leau-qui-accroche-Extrait-Roman.pdf" 
                className="text-brick hover:text-rust transition-colors underline underline-offset-4 decoration-brick/30 hover:decoration-rust"
              >
                Extrait PDF du manuscrit
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
