import React from 'react';
import { BookOpen, Calculator, Compass, Quote, UserCheck } from 'lucide-react';

export default function Protagonists() {
  const characters = [
    {
      name: "Luna Mercier",
      age: "12 ans",
      role: "L'obstination perceptive",
      quote: "Mon carnet ne ment pas. L'eau ne se courbe plus comme avant.",
      badge: "OBSERVATION DE TERRAIN",
      borderColor: "border-cyan-400/40",
      glowColor: "group-hover:border-cyan-400",
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      icon: BookOpen,
      iconColor: "text-cyan-400",
      description: "Armée de son carnet et guidée par l'héritage d'un grand-père marin disparu, elle refuse de plier devant les récits de complaisance. Sa sensibilité aux infimes variations de la baie décèle l'impossible avant tout le monde.",
      attributes: [
        { label: "Outil fétiche", value: "Carnet d'échantillonnage marin" },
        { label: "Moteur", value: "Héritage du grand-père disparu" },
        { label: "Rapport au réel", value: "Refus des récits officiels" },
      ]
    },
    {
      name: "Théo Delmas",
      age: "12 ans",
      role: "La rigueur mathématique",
      quote: "Une observation sans mesure n'est qu'une histoire.",
      badge: "CALCUL CINÉMATIQUE",
      borderColor: "border-emerald-400/40",
      glowColor: "group-hover:border-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      icon: Calculator,
      iconColor: "text-emerald-400",
      description: "Il transforme l'intuition en preuves irréfutables. Face aux anomalies d'écoulement et aux déviations de trajectoire, il modélise les équations différentielles et les tenseurs de viscosité pour forcer le réel à parler.",
      attributes: [
        { label: "Méthode", value: "Mesures & équations hydrodynamiques" },
        { label: "Axiome", value: "Recherche de la preuve chiffrée" },
        { label: "Complémentarité", value: "Donne une voix mathématique à Luna" },
      ]
    },
    {
      name: "Le Dr Archimède",
      age: "Chercheur indépendant",
      role: "Mentorat scientifique exigeant",
      quote: "La science est une patience.",
      badge: "ÎLE ATELIER",
      borderColor: "border-indigo-400/40",
      glowColor: "group-hover:border-indigo-400",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
      icon: Compass,
      iconColor: "text-indigo-400",
      description: "Retranché sur son île atelier à l'écart de Port-Mystral, il dispense un mentorat scientifique rigoureux. Loin du cirque médiatique et de la complaisance académique, il pousse le duo vers l'exactitude absolue.",
      attributes: [
        { label: "Laboratoire", value: "Île atelier de Port-Mystral" },
        { label: "Principe", value: "Incorruptibilité de la méthode" },
        { label: "Poste", value: "Vérification sous vide & spectrographie" },
      ]
    }
  ];

  return (
    <section id="protagonistes" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-cyan-500/20 bg-slate-950/60">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-tech mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            <span>TRIO DE CHERCHEURS // CEUX QUI REGARDENT VRAIMENT</span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            LES PROTAGONISTES
          </h2>
          
          <p className="mt-4 text-slate-200 font-sans text-base sm:text-lg leading-relaxed">
            Pas d'élus mystiques ni de prophéties : des adolescents ordinaires armés de curiosité, de méthode et d'outils de mesure pour affronter la falsification du réel.
          </p>
        </div>

        {/* Grille des personnages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, index) => {
            const Icon = char.icon;
            return (
              <div
                key={index}
                className={`card-abyssal rounded-2xl p-6 sm:p-8 border border-cyan-500/20 bg-slate-900/60 relative overflow-hidden group flex flex-col justify-between`}
              >
                <div>
                  {/* Badge de rôle & icône */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`text-[11px] font-tech font-semibold tracking-wider px-2.5 py-1 rounded-full border ${char.badgeBg}`}>
                      {char.badge}
                    </span>
                    <div className={`w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center ${char.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Nom & Rôle */}
                  <h3 className="font-display font-bold text-2xl text-white">
                    {char.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-tech text-slate-400 mt-1 mb-4">
                    <span>{char.age}</span>
                    <span>•</span>
                    <span className="text-cyan-300 font-medium">{char.role}</span>
                  </div>

                  {/* Citation */}
                  <blockquote className="my-4 p-3.5 rounded-xl bg-slate-950/80 border-l-2 border-cyan-400 text-slate-200 text-xs sm:text-sm font-sans italic">
                    <Quote className="w-3.5 h-3.5 text-cyan-400 inline-block mr-1.5 -mt-1 opacity-70" />
                    « {char.quote} »
                  </blockquote>

                  {/* Description biographique (WCAG AAA) */}
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {char.description}
                  </p>
                </div>

                {/* Attributs & caractéristiques */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  {char.attributes.map((attr, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-tech">
                      <span className="text-slate-400">{attr.label}</span>
                      <span className="text-slate-200 font-medium text-right">{attr.value}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
