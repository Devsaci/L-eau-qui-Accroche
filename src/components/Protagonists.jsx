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
      badgeBg: "bg-sky-50 text-bay border-sky-200/70",
      icon: BookOpen,
      iconColor: "text-bay",
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
      badgeBg: "bg-emerald-50 text-kelp border-emerald-200/70",
      icon: Calculator,
      iconColor: "text-kelp",
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
      badgeBg: "bg-amber-50 text-amber-800 border-amber-200/70",
      icon: Compass,
      iconColor: "text-amberAccent",
      description: "Retranché sur son île atelier à l'écart de Port-Mystral, il dispense un mentorat scientifique rigoureux. Loin du cirque médiatique et de la complaisance académique, il pousse le duo vers l'exactitude absolue.",
      attributes: [
        { label: "Laboratoire", value: "Île atelier de Port-Mystral" },
        { label: "Principe", value: "Incorruptibilité de la méthode" },
        { label: "Poste", value: "Vérification sous vide & spectrographie" },
      ]
    }
  ];

  return (
    <section id="protagonistes" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-stone-200/80 bg-stone-100/50">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/80 text-bay text-xs font-mono mb-4 shadow-sm">
            <UserCheck className="w-3.5 h-3.5 text-bay" />
            <span>TRIO DE CHERCHEURS // CEUX QUI REGARDENT VRAIMENT</span>
          </div>
          
          <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-bay tracking-wide">
            LES PROTAGONISTES
          </h2>
          
          <p className="mt-4 text-ink/80 font-sans text-base sm:text-lg leading-relaxed">
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
                className="bg-white/90 rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm relative overflow-hidden group flex flex-col justify-between hover:border-stone-300 transition-all"
              >
                <div>
                  {/* Badge de rôle & icône */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`text-[11px] font-mono font-semibold tracking-wider px-3 py-1 rounded-full border ${char.badgeBg}`}>
                      {char.badge}
                    </span>
                    <div className={`w-9 h-9 rounded-xl bg-stone-100 border border-stone-200/80 flex items-center justify-center ${char.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Nom & Rôle */}
                  <h3 className="font-serif font-bold text-2xl text-bay tracking-wide">
                    {char.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-ink/65 mt-1 mb-4">
                    <span>{char.age}</span>
                    <span>•</span>
                    <span className="text-amberAccent font-medium">{char.role}</span>
                  </div>

                  {/* Citation */}
                  <blockquote className="my-4 p-4 rounded-xl bg-stone-50/90 border-l-2 border-amberAccent text-ink/85 text-xs sm:text-sm font-serif italic shadow-sm">
                    <Quote className="w-3.5 h-3.5 text-amberAccent inline-block mr-1.5 -mt-1 opacity-80" />
                    « {char.quote} »
                  </blockquote>

                  {/* Description biographique */}
                  <p className="text-ink/80 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {char.description}
                  </p>
                </div>

                {/* Attributs & caractéristiques avec retour à la ligne sans troncature */}
                <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
                  {char.attributes.map((attr, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-sans gap-1 sm:gap-2">
                      <span className="text-ink/60 font-mono text-[11px] shrink-0">{attr.label}</span>
                      <span className="text-ink/80 font-medium whitespace-normal text-xs sm:text-right">{attr.value}</span>
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
