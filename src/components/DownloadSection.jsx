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
    <section id="telechargement" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-stone-200/80 bg-stone-100/40">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-white/90 rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-md relative overflow-hidden">
          {/* Lueur d'ambiance chaude très discrète */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amberAccent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Colonne d'information */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200/80 text-bay text-xs font-mono mb-4">
                <BookOpenCheck className="w-3.5 h-3.5 text-amberAccent" />
                <span>EXTRAIT OFFICIEL DISPONIBLE</span>
              </div>

              <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-bay tracking-wide leading-tight">
                PLONGEZ DANS L'ANOMALIE DE PORT-MYSTRAL
              </h2>

              <p className="mt-4 text-ink/80 font-sans text-base leading-relaxed">
                Téléchargez gratuitement les premières pages du roman <strong className="text-ink font-semibold">« L'eau qui accroche »</strong>. Découvrez la première observation de Luna sur la jetée nord et le calcul de contrainte cinématique de Théo.
              </p>

              {/* Badges fonctionnalités PWA */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-ink/75">
                <div className="flex items-center gap-2">
                  <WifiOff className="w-4 h-4 text-kelp" />
                  <span>Lecture 100% hors-ligne</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-dataBlue" />
                  <span>PDF pré-mis en cache</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amberAccent" />
                  <span>Format mobile PWA autonome</span>
                </div>
              </div>

              {/* Boutons d'action (Cibles tactiles min 48px) */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/roman-extrait.pdf"
                  download="Leau-qui-accroche-Extrait-Roman.pdf"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-sans text-sm font-bold text-white bg-amberAccent hover:opacity-95 shadow-md transition-all transform hover:-translate-y-0.5 min-h-[48px]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>TÉLÉCHARGER LE PDF (OFFICIEL)</span>
                </a>

                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-sans text-xs sm:text-sm font-semibold bg-stone-100 text-bay hover:bg-stone-200/70 border border-stone-200/80 transition-all shadow-sm min-h-[48px]"
                >
                  {isInstalled ? (
                    <>
                      <Check className="w-4 h-4 text-kelp" />
                      <span>APPLICATION INSTALLÉE</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-bay" />
                      <span>INSTALLER SUR L'ÉCRAN D'ACCUEIL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Aperçu visuel fiche technique */}
            <div className="lg:col-span-5">
              <div className="bg-stone-50/90 rounded-2xl p-6 border border-stone-200/80 text-left font-mono shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 text-xs text-ink/65">
                  <span>METADATA_MANIFEST.JSON</span>
                  <span className="text-kelp font-bold">PWA OK</span>
                </div>
                
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="text-ink/60 font-sans text-xs block">Titre de l'œuvre :</span>
                    <p className="text-bay font-bold font-serif text-base">L'eau qui accroche</p>
                  </div>
                  <div>
                    <span className="text-ink/60 font-sans text-xs block">Genre littéraire :</span>
                    <p className="text-dataBlue font-semibold">Hard Sci-Fi / Young Adult</p>
                  </div>
                  <div>
                    <span className="text-ink/60 font-sans text-xs block">Public visé :</span>
                    <p className="text-ink/80 font-sans">12 ans et + // Tout public curieux de science</p>
                  </div>
                  <div>
                    <span className="text-ink/60 font-sans text-xs block">Thématique centrale :</span>
                    <p className="text-kelp font-sans font-medium">Observation empirique vs Récit médiatique</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200/80 flex justify-between text-[11px] text-ink/60">
                    <span>Statut : Extrait validé</span>
                    <span className="text-bay font-semibold">Station Archimède</span>
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
