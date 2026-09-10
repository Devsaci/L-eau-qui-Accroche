import React from 'react';
import { Scale, Tv, Binary, AlertCircle, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export default function ProofCost() {
  return (
    <section id="preuve" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-abyss-800 bg-abyss-950/60">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-depth-warning/10 border border-depth-warning/30 text-depth-warning text-xs font-tech mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>CONFLIT ÉPISTÉMOLOGIQUE // AXE NARRATIF MAJEUR</span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            LE COÛT DE LA PREUVE
          </h2>
          
          <p className="mt-4 text-slate-300 font-sans text-base sm:text-xl leading-relaxed">
            La confrontation impitoyable entre <span className="text-biolum-cyan font-semibold">l'observation empirique rigoureuse</span> de deux adolescents et la <span className="text-rose-400 font-semibold">parole médiatique recevable</span> des adultes.
          </p>
        </div>

        {/* Tableau comparatif / Dualité */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Côté 1 : Le Discours Officiel & Médiatique */}
          <div className="card-abyssal rounded-2xl p-8 border border-rose-500/25 bg-abyss-900/60 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-abyss-800">
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
                <span className="text-[10px] font-tech px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  DISCOURS INSTITUTIONNEL
                </span>
              </div>

              <div className="my-6 space-y-4 font-sans text-sm text-slate-300">
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
                    <strong className="text-white">L'autorité d'âge :</strong> Balayer les observations de Luna et Théo sous prétexte de leur jeunesse (« Vous avez trop d'imagination »).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-abyss-950/80 border border-rose-500/20 font-tech text-xs text-rose-300 italic">
              « Une vérité qui dérange l'économie du port est immédiatement qualifiée d'illusion d'optique. »
            </div>
          </div>

          {/* Côté 2 : L'Observation Empirique Indépendante */}
          <div className="card-abyssal rounded-2xl p-8 border border-biolum-cyan/30 bg-abyss-900/60 relative flex flex-col justify-between shadow-hud">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-abyss-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-biolum-cyan/10 border border-biolum-cyan/30 flex items-center justify-center text-biolum-cyan">
                    <Binary className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      L'OBSERVATION EMPIRIQUE
                    </h3>
                    <p className="text-xs font-tech text-biolum-cyan">
                      Luna, Théo & L'Île Atelier du Dr Archimède
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-tech px-2 py-1 rounded bg-biolum-cyan/10 text-biolum-cyan border border-biolum-cyan/30">
                  RÉALITÉ MESURÉE
                </span>
              </div>

              <div className="my-6 space-y-4 font-sans text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-biolum-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Incorruptibilité des chiffres :</strong> ρ = m/V et P = F/S ne négocient pas. Si la bouée flotte à l'envers, c'est que la physique de la baie a muté.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-biolum-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Le protocole de l'atelier :</strong> Répétabilité des mesures, échantillons scellés, résistance à la pression testée en caisson sous vide.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-biolum-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Le prix de la dissidence :</strong> Tenir bon quand personne ne veut vous écouter, et accepter la solitude du chercheur rigoureux.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-abyss-950/80 border border-biolum-cyan/20 font-tech text-xs text-biolum-cyan italic">
              « Mesurer le réel quand le monde préfère se rendormir : voilà le véritable courage scientifique. »
            </div>
          </div>

        </div>

        {/* Citation thématique de conclusion */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-abyss-900 via-abyss-850 to-abyss-900 border border-abyss-700 text-center">
          <p className="font-display text-lg sm:text-xl text-white font-semibold tracking-wide">
            « Deux adolescents de douze ans peuvent-ils forcer une communauté d'adultes à regarder ce qui fait peur ? »
          </p>
          <div className="mt-3 text-xs font-tech text-biolum-teal tracking-wider uppercase">
            // Extrait des carnets de recherche de Port-Mystral
          </div>
        </div>

      </div>
    </section>
  );
}
