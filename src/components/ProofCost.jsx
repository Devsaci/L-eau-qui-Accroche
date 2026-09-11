import React from 'react';
import { Scale, Tv, Binary, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProofCost() {
  return (
    <section id="preuve" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-cyan-500/20 bg-slate-950/80">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-tech mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>CONFLIT ÉPISTÉMOLOGIQUE // AXE NARRATIF MAJEUR</span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            LE COÛT DE LA PREUVE
          </h2>
          
          <p className="mt-4 text-slate-200 font-sans text-base sm:text-lg leading-relaxed">
            La confrontation impitoyable entre <span className="text-cyan-400 font-semibold">l'observation empirique rigoureuse</span> de deux adolescents et la <span className="text-rose-400 font-semibold">parole médiatique recevable</span> des adultes.
          </p>
        </div>

        {/* Tableau comparatif / Dualité */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Côté 1 : Le Discours Officiel & Médiatique */}
          <div className="card-abyssal rounded-2xl p-8 border border-rose-500/25 bg-slate-900/60 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      LA PAROLE MÉDIATIQUE
                    </h3>
                    <p className="text-xs font-tech text-rose-400">
                      Élise Tamar & Les Autorités de Port-Mystral
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-tech px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                  DISCOURS INSTITUTIONNEL
                </span>
              </div>

              <div className="my-6 space-y-4 font-sans text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Le confort du déni :</strong> Traiter l'eau anormale de simple phénomène biologique marin saisonnier pour préserver l'activité portuaire et touristique.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">L'illusion de la certitude :</strong> Un discours policé sur les plateaux télévisés qui élimine les anomalies mesurées pour ne pas effrayer la population.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">L'argument d'autorité :</strong> Rejeter les mesures adolescentes car elles n'émanent pas des canaux académiques et gouvernementaux agréés.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/20 text-xs font-tech text-rose-300/90">
              Verdict : L'apaisement par le mensonge rationnalisé.
            </div>
          </div>

          {/* Côté 2 : La Méthode Empirique & Scientifique */}
          <div className="card-abyssal rounded-2xl p-8 border border-cyan-500/25 bg-slate-900/60 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Binary className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      LA PREUVE PAR LA MESURE
                    </h3>
                    <p className="text-xs font-tech text-emerald-400">
                      Luna Mercier, Théo Delmas & Archimède
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-tech px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                  MÉTHODE EMPIRIQUE
                </span>
              </div>

              <div className="my-6 space-y-4 font-sans text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">L'épreuve des faits :</strong> Échantillonnage physique direct sur le quai nord, densimètre, thermomètre sous vide et chronophotographie.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">L'incorruptibilité des chiffres :</strong> Calcul cinématique démontrant une masse volumique de 1382 kg/m³ incompatible avec l'eau de mer standard.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Le courage de l'inconnu :</strong> Accepter que les lois physiques connues vacillent plutôt que de falsifier l'observation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs font-tech text-emerald-300/90">
              Verdict : La vérité physique brute, quel qu'en soit le prix.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
