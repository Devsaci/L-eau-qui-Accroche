import chapter1Raw from './chapitre1.md?raw';
import chapter2Raw from './chapitre2.md?raw';

export const chapters = [
  {
    id: 'chapitre-1',
    slug: 'chapitre-1',
    number: 1,
    title: "Ouverture sensible",
    subtitle: "L'Anomalie du Quai & Le Comportement Non Conforme",
    synopsis: "Arrivée de Luna Mercier à Port-Mystral, première détection d'une adhérence anormale de l'eau sur la rampe des Terre-Neuvas et confrontation empirique avec Théo Delmas.",
    readTime: "7 min",
    content: chapter1Raw,
  },
  {
    id: 'chapitre-2',
    slug: 'chapitre-2',
    number: 2,
    title: "Ce n’était pas pareil hier",
    subtitle: "Pointe de la Vigie & Le Protocole (Acte II)",
    synopsis: "Dans le silence nocturne de Port-Mystral, Luna affronte le doute avant de prélever un échantillon à la Pointe de la Vigie. Rejointe par Théo Delmas, ils décident de contrer le discours officiel par un protocole expérimental irréfutable.",
    readTime: "6 min",
    content: chapter2Raw,
  }
];

export default chapters;
