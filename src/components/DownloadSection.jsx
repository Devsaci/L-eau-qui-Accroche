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
    <section id="telechargement" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-brick/15 bg-paper/60">
      <div className="max-w-5xl mx-auto">
        
        <div className="card-carnet rounded-3xl p-8 sm:p-12 border border-brick/20 bg-paper-card relative overflow-hidden shadow-paper">
          {/* Lueur d'ambiance discrète */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brick-50/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Colonne d'information */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brick-50 border border-brick/20 text-brick text-xs font-mono mb-4">
                <BookOpenCheck className="w-3.5 h-3.5 text-brick" />
                <span>EXTRAIT OFFICIEL & ARCHIVE DISPONIBLE</span>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ink tracking-tight leading-tight">
                PLONGEZ DANS L'ANOMALIE DE PORT-MYSTRAL
              </h2>

              <p className="mt-4 text-ink-light font-sans text-base leading-relaxed">
                Téléchargez gratuitement les premières pages du roman <strong className="text-ink">« L'eau qui accroche »</strong>. Découvrez la première observation de Luna sur la jetée nord et le calcul de contrainte cinématique de Théo.
              </p>

              {/* Badges fonctionnalités PWA */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-ink-muted">
                <div className="flex items-center gap-2">
                  <WifiOff className="w-4 h-4 text-rust" />
                  <span>Lecture 100% hors-ligne</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-brick" />
                  <span>PDF pré-mis en cache</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gold-dark" />
                  <span>Format mobile PWA autonome</span>
                </div>
              </div>

              {/* Boutons d'action (Cibles tactiles min 48px) */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/roman-extrait.pdf"
                  download="Leau-qui-accroche-Extrait-Roman.pdf"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-serif text-base font-bold text-white bg-brick hover:bg-rust shadow-brick-soft transition-all transform hover:-translate-y-0.5 min-h-[48px]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>TÉLÉCHARGER LE PDF (OFFICIEL)</span>
                </a>

                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-semibold bg-paper text-ink hover:bg-white border border-brick/25 hover:border-brick transition-all shadow-paper min-h-[48px]"
                >
                  {isInstalled ? (
                    <>
                      <Check className="w-4 h-4 text-rust" />
                      <span>APPLICATION INSTALLÉE</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-gold-dark" />
                      <span>INSTALLER SUR L'ÉCRAN D'ACCUEIL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Aperçu visuel fiche technique façon carnet de laboratoire */}
            <div className="lg:col-span-5">
              <div className="bg-paper rounded-2xl p-6 border border-brick/20 text-left font-mono shadow-paper">
                <div className="flex items-center justify-between pb-4 border-b border-brick/10 text-xs text-ink-muted">
                  <span>METADATA_ARCHIVE.JSON</span>
                  <span className="text-rust font-bold">PWA VALIDÉE</span>
                </div>
                
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="text-ink-muted">Titre de l'œuvre :</span>
                    <p className="text-ink font-serif font-bold text-base mt-0.5">L'eau qui accroche</p>
                  </div>
                  <div>
                    <span className="text-ink-muted">Genre littéraire :</span>
                    <p className="text-brick font-semibold">Hard Sci-Fi / Young Adult</p>
                  </div>
                  <div>
                    <span className="text-ink-muted">Public visé :</span>
                    <p className="text-ink-light">12 ans et + // Tout public curieux de science</p>
                  </div>
                  <div>
                    <span className="text-ink-muted">Thématique centrale :</span>
                    <p className="text-rust font-medium">Observation empirique vs Récit officiel</p>
                  </div>
                  <div className="pt-2 border-t border-brick/10 flex justify-between text-[11px] text-ink-muted">
                    <span>Statut : Extrait validé</span>
                    <span className="text-brick font-semibold">Station Archimède</span>
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
