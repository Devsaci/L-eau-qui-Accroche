import chapter1Raw from './chapitre1.md?raw';
import chapter2Raw from './chapitre2.md?raw';

export const chapters = [
  {
    id: 'chapitre-1',
    number: 1,
    title: "L'eau qui accroche",
    subtitle: "Quai Nord de Port-Mystral — 07h14",
    synopsis: "Premières observations d'un fluide non-newtonien dans la baie de Port-Mystral par Luna Mercier et mesures de Théo Delmas.",
    content: chapter1Raw,
  },
  {
    id: 'chapitre-2',
    number: 2,
    title: "La Fosse des Sables",
    subtitle: "Dérive bathymétrique & transmission Archimède",
    synopsis: "Incursion nocturne à bord de l'Orque-3 vers la faille bathymétrique et interception du message du Dr Archimède.",
    content: chapter2Raw,
  }
];

export default chapters;
