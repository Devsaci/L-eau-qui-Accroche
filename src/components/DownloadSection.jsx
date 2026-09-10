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
    <section id="telechargement" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-cyan-500/20 bg-slate-950/60">
      <div className="max-w-5xl mx-auto">
        
        <div className="card-abyssal rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-slate-900/60 relative overflow-hidden shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)]">
          {/* Lueur d'ambiance */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Colonne d'information */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-tech mb-4">
                <BookOpenCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>EXTRAIT OFFICIEL DISPONIBLE</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                PLONGEZ DANS L'ANOMALIE DE PORT-MYSTRAL
              </h2>

              <p className="mt-4 text-slate-200 font-sans text-base leading-relaxed">
                Téléchargez gratuitement les premières pages du roman <strong className="text-white">« L'eau qui accroche »</strong>. Découvrez la première observation de Luna sur la jetée nord et le calcul de contrainte cinématique de Théo.
              </p>

              {/* Badges fonctionnalités PWA */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-tech text-slate-300">
                <div className="flex items-center gap-2">
                  <WifiOff className="w-4 h-4 text-emerald-400" />
                  <span>Lecture 100% hors-ligne</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span>PDF pré-mis en cache</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  <span>Format mobile PWA autonome</span>
                </div>
              </div>

              {/* Boutons d'action (Cibles tactiles min 48px) */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/roman-extrait.pdf"
                  download="Leau-qui-accroche-Extrait-Roman.pdf"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-display text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 hover:brightness-110 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all transform hover:-translate-y-0.5 min-h-[48px]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>TÉLÉCHARGER LE PDF (OFFICIEL)</span>
                </a>

                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-tech text-xs font-semibold bg-slate-900/90 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-emerald-400/50 transition-all shadow-sm min-h-[48px]"
                >
                  {isInstalled ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>APPLICATION INSTALLÉE</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>INSTALLER SUR L'ÉCRAN D'ACCUEIL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Aperçu visuel fiche technique */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/90 rounded-2xl p-6 border border-cyan-500/20 text-left font-tech shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
                  <span>METADATA_MANIFEST.JSON</span>
                  <span className="text-emerald-400 font-bold">PWA OK</span>
                </div>
                
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400">Titre de l'œuvre :</span>
                    <p className="text-white font-semibold font-display">L'eau qui accroche</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Genre littéraire :</span>
                    <p className="text-cyan-300">Hard Sci-Fi / Young Adult</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Public visé :</span>
                    <p className="text-slate-200">12 ans et + // Tout public curieux de science</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Thématique centrale :</span>
                    <p className="text-emerald-300">Observation empirique vs Récit médiatique</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                    <span>Statut : Extrait validé</span>
                    <span className="text-cyan-400">Station Archimède</span>
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
