import React from 'react';
import { Scale, Tv, Binary, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProofCost() {
  return (
    <section id="preuve" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-brick/15 bg-paper/50">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold/30 text-gold-dark text-xs font-mono mb-4 shadow-paper">
            <Scale className="w-3.5 h-3.5" />
            <span>CONFLIT ÉPISTÉMOLOGIQUE // AXE NARRATIF MAJEUR</span>
          </div>
          
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-ink tracking-tight">
            LE COÛT DE LA PREUVE
          </h2>
          
          <p className="mt-4 text-ink-light font-sans text-base sm:text-lg leading-relaxed">
            La confrontation entre <span className="text-brick font-semibold">l'observation empirique rigoureuse</span> de deux adolescents et la <span className="text-rust font-semibold">parole médiatique recevable</span> des adultes.
          </p>
        </div>

        {/* Tableau comparatif / Dualité */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Côté 1 : Le Discours Officiel & Médiatique */}
          <div className="card-carnet rounded-2xl p-8 border border-rust/30 bg-paper-card relative flex flex-col justify-between shadow-paper">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brick/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rust-50 border border-rust/30 flex items-center justify-center text-rust">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-ink">
                      LA PAROLE MÉDIATIQUE
                    </h3>
                    <p className="text-xs font-mono text-rust">
                      Élise Tamar & Les Autorités de Port-Mystral
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rust-50 text-rust-dark border border-rust/25 font-medium">
                  DISCOURS INSTITUTIONNEL
                </span>
              </div>

              <div className="my-6 space-y-4 font-sans text-sm text-ink-light">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rust shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-ink">Le confort du déni :</strong> Traiter l'eau anormale de simple phénomène biologique marin saisonnier pour préserver l'activité portuaire et touristique.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rust shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-ink">L'illusion de la certitude :</strong> Un discours policé sur les plateaux télévisés qui élimine les anomalies mesurées pour ne pas effrayer la population.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rust shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-ink">L'argument d'autorité :</strong> Rejeter les mesures adolescentes car elles n'émanent pas des canaux académiques et gouvernementaux agréés.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rust-50/80 border border-rust/25 text-xs font-mono text-rust-dark">
              Verdict : L'apaisement par le mensonge rationnalisé.
            </div>
          </div>

          {/* Côté 2 : La Méthode Empirique & Scientifique */}
          <div className="card-carnet rounded-2xl p-8 border border-brick/35 bg-paper-card relative flex flex-col justify-between shadow-paper">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brick/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brick-50 border border-brick/30 flex items-center justify-center text-brick">
                    <Binary className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-ink">
                      LA PREUVE PAR LA MESURE
                    </h3>
                    <p className="text-xs font-mono text-gold-dark font-medium">
                      Luna Mercier, Théo Delmas & Archimède
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brick-50 text-brick border border-brick/25 font-medium">
                  MÉTHODE EMPIRIQUE
                </span>
              </div>

              <div className="my-6 space-y-4 font-sans text-sm text-ink-light">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-ink">L'épreuve des faits :</strong> Échantillonnage physique direct sur le quai nord, densimètre, thermomètre sous vide et chronophotographie.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-ink">L'incorruptibilité des chiffres :</strong> Calcul cinématique démontrant une masse volumique de 1382 kg/m³ incompatible avec l'eau de mer standard.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-ink">Le courage de l'inconnu :</strong> Accepter que les lois physiques connues vacillent plutôt que de falsifier l'observation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brick-50/80 border border-brick/25 text-xs font-mono text-brick font-semibold">
              Verdict : La vérité physique brute, quel qu'en soit le prix.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
