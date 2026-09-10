import React from 'react';
import { BookOpen, Calculator, Compass, Sparkles, Quote, UserCheck } from 'lucide-react';

export default function Protagonists() {
  const characters = [
    {
      name: "Luna Mercier",
      age: "12 ans",
      role: "L'obstination perceptive",
      quote: "Mon carnet ne ment pas. L'eau ne se courbe plus comme avant.",
      badge: "OBSERVATION DE TERRAIN",
      borderColor: "border-biolum-cyan/40",
      glowColor: "group-hover:border-biolum-cyan",
      badgeBg: "bg-biolum-cyan/10 text-biolum-cyan border-biolum-cyan/30",
      icon: BookOpen,
      iconColor: "text-biolum-cyan",
      description: "Armée de son carnet et guidée par l'héritage d'un grand-père marin disparu, elle refuse de plier devant les récits de complaisance. Sa sensibilité aux infimes variations de la baie décèle l'impossible avant tout le monde.",
      attributes: [
        { label: "Outil fétiche", value: "Carnet d'échantillonnage marin" },
        { label: "Moteur", value: "Héritage du grand-père disparu" },
        { label: "Rapport au réel", value: "Refus des récits officiels" },
      ]
    },
    {
      name: "Théo Dubois / Delmas",
      age: "12 ans",
      role: "La rigueur mathématique",
      quote: "Une observation sans mesure n'est qu'une histoire.",
      badge: "CALCUL CINÉMATIQUE",
      borderColor: "border-biolum-teal/40",
      glowColor: "group-hover:border-biolum-teal",
      badgeBg: "bg-biolum-teal/10 text-biolum-teal border-biolum-teal/30",
      icon: Calculator,
      iconColor: "text-biolum-teal",
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
      borderColor: "border-biolum-violet/40",
      glowColor: "group-hover:border-biolum-violet",
      badgeBg: "bg-biolum-violet/10 text-biolum-violet border-biolum-violet/30",
      icon: Compass,
      iconColor: "text-biolum-violet",
      description: "Retranché sur son île atelier à l'écart de Port-Mystral, il dispense un mentorat scientifique rigoureux. Loin du cirque médiatique et de la complaisance académique, il pousse le duo vers l'exactitude absolue.",
      attributes: [
        { label: "Laboratoire", value: "Île atelier de Port-Mystral" },
        { label: "Principe", value: "Incorruptibilité de la méthode" },
        { label: "Poste", value: "Vérification sous vide & spectrographie" },
      ]
    }
  ];

  return (
    <section id="protagonistes" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-abyss-800/80 bg-abyss-900/40">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-abyss-800 border border-biolum-teal/30 text-biolum-teal text-xs font-tech mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            <span>TRIO DE CHERCHEURS // CEUX QUI REGARDENT VRAIMENT</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            LES PROTAGONISTES
          </h2>
          <p className="mt-4 text-slate-400 font-sans text-base sm:text-lg">
            Face au déni des adultes et à la parole institutionnelle qui rassure les foules, trois esprits s'accrochent à la vérité empirique des faits.
          </p>
        </div>

        {/* Grille des personnages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char, index) => {
            const IconComponent = char.icon;
            return (
              <div
                key={index}
                className={`card-abyssal rounded-2xl p-7 flex flex-col justify-between border ${char.borderColor} ${char.glowColor} transition-all duration-300 group hover:-translate-y-1 relative`}
              >
                {/* Entête de carte */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-tech font-semibold px-2.5 py-1 rounded border ${char.badgeBg}`}>
                      {char.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-abyss-850 border border-abyss-700 flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${char.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-biolum-cyan transition-colors">
                    {char.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-tech text-biolum-teal font-medium">
                      {char.age}
                    </span>
                    <span className="text-abyss-600 text-xs">•</span>
                    <span className="text-xs font-tech text-slate-300">
                      {char.role}
                    </span>
                  </div>

                  {/* Citation marquante */}
                  <div className="my-5 p-3.5 rounded-lg bg-abyss-950/70 border-l-2 border-biolum-cyan text-slate-200 font-tech text-xs italic flex gap-2.5 items-start">
                    <Quote className="w-4 h-4 text-biolum-cyan shrink-0 mt-0.5" />
                    <span>« {char.quote} »</span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                    {char.description}
                  </p>
                </div>

                {/* Caractéristiques techniques */}
                <div className="pt-5 border-t border-abyss-800/80 space-y-2.5 text-xs font-tech">
                  {char.attributes.map((attr, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-400">
                      <span className="text-slate-400">{attr.label} :</span>
                      <span className="text-slate-200 font-medium text-right max-w-[60%] truncate">
                        {attr.value}
                      </span>
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
