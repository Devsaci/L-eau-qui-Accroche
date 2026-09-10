import React, { useState, useEffect } from 'react';
import { FileDown, Download, Smartphone, Check, HardDrive, WifiOff, BookOpenCheck } from 'lucide-react';

export default function DownloadSection() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("L'application est déjà installée ou prête à être ajoutée à votre écran d'accueil via le menu de votre navigateur.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <section id="telechargement" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-abyss-800 bg-abyss-900/30">
      <div className="max-w-5xl mx-auto">
        
        <div className="card-abyssal rounded-3xl p-8 sm:p-12 border border-biolum-cyan/30 relative overflow-hidden shadow-biolum-cyan">
          {/* Lueur d'ambiance */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-biolum-cyan/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Colonne d'information */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-biolum-cyan/10 border border-biolum-cyan/30 text-biolum-cyan text-xs font-tech mb-4">
                <BookOpenCheck className="w-3.5 h-3.5" />
                <span>CHAPITRE 1 : LA BOUÉE INVERSÉE</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                PLONGEZ DANS L'ANOMALIE DE PORT-MYSTRAL
              </h2>

              <p className="mt-4 text-slate-300 font-sans text-base leading-relaxed">
                Téléchargez gratuitement les premières pages du roman <strong className="text-white">« L'eau qui accroche »</strong>. Découvrez la première observation de Luna sur la jetée nord et le calcul de contrainte cinématique de Théo.
              </p>

              {/* Badges techniques de l'extrait */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-tech text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-biolum-teal" />
                  <span>Document PDF complet</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <WifiOff className="w-4 h-4 text-biolum-cyan" />
                  <span>Mis en cache pour lecture hors-ligne</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-biolum-blue" />
                  <span>Taille optimisée</span>
                </div>
              </div>

              {/* Bouton de Téléchargement Principal */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/roman-extrait.pdf"
                  download="Leau-qui-accroche-Extrait-Roman.pdf"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display text-sm font-bold text-abyss-950 bg-gradient-to-r from-biolum-cyan via-biolum-teal to-biolum-blue hover:brightness-110 shadow-biolum-cyan transition-all transform hover:-translate-y-0.5"
                >
                  <FileDown className="w-5 h-5" />
                  <span>TÉLÉCHARGER L'EXTRAIT DU ROMAN (PDF)</span>
                </a>
              </div>
            </div>

            {/* Colonne PWA & Installation Hors-ligne */}
            <div className="lg:col-span-5">
              <div className="bg-abyss-950/90 border border-abyss-700/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-biolum-teal" />
                    <span className="font-display font-bold text-sm text-white">APPLICATION PWA</span>
                  </div>
                  <span className="text-[10px] font-tech text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                    STANDALONE
                  </span>
                </div>

                <p className="text-xs font-sans text-slate-300 leading-relaxed">
                  Installez la Progressive Web App sur votre smartphone ou ordinateur. Le Service Worker Workbox pré-charge automatiquement l'extrait PDF pour une lecture sans connexion internet.
                </p>

                <div className="mt-5 pt-4 border-t border-abyss-800">
                  <button
                    onClick={handleInstallClick}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-tech text-xs font-semibold text-biolum-cyan bg-biolum-cyan/10 hover:bg-biolum-cyan/20 border border-biolum-cyan/40 hover:border-biolum-cyan transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isInstalled ? "APPLICATION DÉJÀ INSTALLÉE" : "INSTALLER L'APPLICATION PWA"}</span>
                  </button>
                  <div className="mt-2 text-center text-[10px] font-tech text-slate-500">
                    Compatible iOS, Android, macOS & Windows
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
