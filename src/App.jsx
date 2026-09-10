import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Reader from './components/Reader';
import Protagonists from './components/Protagonists';
import ProofCost from './components/ProofCost';
import DownloadSection from './components/DownloadSection';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink relative selection:bg-amberAccent/20 selection:text-ink">
      {/* Grille carnet et repères bathymétriques en filigrane subtil */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(31, 78, 95, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
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

        {/* Footer Carnet de recherche Port-Mystral */}
        <footer className="border-t border-stone-200/80 bg-stone-100/70 py-10 px-4 text-center font-sans text-xs text-ink/70">
          <div className="max-w-4xl mx-auto space-y-3">
            <p className="font-serif text-sm text-bay font-semibold tracking-wide">
              « L’EAU QUI ACCROCHE » // ROMAN HARD SCI-FI YOUNG ADULT // BAIE DE PORT-MYSTRAL
            </p>
            <p className="italic font-serif text-ink/80">
              « Une observation sans mesure n'est qu'une histoire. La science est une patience. »
            </p>
            <div className="pt-4 border-t border-stone-200/60 flex flex-wrap justify-center gap-6 text-[11px] text-ink/60 font-mono">
              <span>Station Archimède</span>
              <span>•</span>
              <span>Progressive Web App (PWA) Offline-Ready</span>
              <span>•</span>
              <a href="/roman-extrait.pdf" download="Leau-qui-accroche-Extrait-Roman.pdf" className="text-bay hover:text-amberAccent transition-colors underline">
                Extrait PDF disponible
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
