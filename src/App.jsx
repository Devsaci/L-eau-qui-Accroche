import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Reader from './components/Reader';
import Protagonists from './components/Protagonists';
import ProofCost from './components/ProofCost';
import DownloadSection from './components/DownloadSection';

export default function App() {
  return (
    <div className="min-h-screen bg-abyssal-gradient text-slate-100 relative selection:bg-biolum-cyan selection:text-abyss-950">
      {/* Grille bathymétrique et sonar en filigrane */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
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

        {/* Footer Hard Sci-Fi Port-Mystral */}
        <footer className="border-t border-abyss-800 bg-abyss-950/90 py-10 px-4 text-center font-tech text-xs text-slate-500">
          <div className="max-w-4xl mx-auto space-y-3">
            <p className="text-slate-400">
              « L’EAU QUI ACCROCHE » // ROMAN HARD SCI-FI YOUNG ADULT // BAIE DE PORT-MYSTRAL
            </p>
            <p className="text-slate-400">
              « Une observation sans mesure n'est qu'une histoire. La science est une patience. »
            </p>
            <div className="pt-4 border-t border-abyss-800/60 flex flex-wrap justify-center gap-6 text-[11px] text-slate-400">
              <span>Station Archimède</span>
              <span>•</span>
              <span>Progressive Web App (PWA) Offline-Ready</span>
              <span>•</span>
              <a href="/roman-extrait.pdf" download="Leau-qui-accroche-Extrait-Roman.pdf" className="hover:text-biolum-cyan transition-colors underline">
                Extrait PDF disponible
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
