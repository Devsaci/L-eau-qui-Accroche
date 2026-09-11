import chapter1Raw from './chapitre1.md?raw';
import chapter2Raw from './chapitre2.md?raw';
import chapter3Raw from './chapitre3.md?raw';
import chapter4Raw from './chapitre4.md?raw';

export const chapters = [
  {
    id: 'chapitre-1',
    slug: 'chapitre-1',
    number: 1,
    title: "Ouverture sensible",
    subtitle: "L'Anomalie du Quai & Le Comportement Non Conforme",
    act: "I",
    actTitle: "L'Anomalie",
    readTime: "7 min",
    readingTime: "7 min",
    path: "./chapitre1.md",
    synopsis: "Arrivée de Luna Mercier à Port-Mystral, première détection d'une adhérence anormale de l'eau sur la rampe des Terre-Neuvas et confrontation empirique avec Théo Delmas.",
    content: chapter1Raw,
  },
  {
    id: 'chapitre-2',
    slug: 'chapitre-2',
    number: 2,
    title: "Ce n’était pas pareil hier",
    subtitle: "Pointe de la Vigie & Le Protocole",
    act: "II",
    actTitle: "Enquête",
    readTime: "6 min",
    readingTime: "6 min",
    path: "./chapitre2.md",
    synopsis: "Dans le silence nocturne de Port-Mystral, Luna affronte le doute avant de prélever un échantillon à la Pointe de la Vigie. Rejointe par Théo Delmas, ils décident de contrer le discours officiel par un protocole expérimental irréfutable.",
    content: chapter2Raw,
  },
  {
    id: 'chapitre-3',
    slug: 'chapitre-3',
    number: 3,
    title: "Théo compte autrement",
    subtitle: "Vélocité terminale & L'épreuve d'Archimède",
    act: "II",
    actTitle: "Enquête",
    readTime: "6 min",
    readingTime: "6 min",
    path: "./chapitre3.md",
    synopsis: "Dans son atelier d'appentis, Théo met à l'épreuve l'échantillon de Luna : à 240 images par seconde, une bille d'acier accuse 0,32 seconde de retard. Face à l'aberration de la loi de Stokes, ils bravent le silence officiel pour porter leur mesure chez le Dr Archimède.",
    content: chapter3Raw,
  },
  {
    id: 'chapitre-4',
    slug: 'chapitre-4',
    number: 4,
    title: "Le bruit sous les mots",
    subtitle: "L'avis d'Archimède & La parole médiatique",
    act: "II",
    actTitle: "Enquête",
    readTime: "6 min",
    readingTime: "6 min",
    path: "./chapitre4.md",
    synopsis: "Dans son laboratoire, le Dr Archimède valide l'anomalie des 0,32 s mais prévient : face à Élise Tamar, un chiffre sans explication sera balayé. Sur le port et devant le Bar de la Marine, le mot « limon » anesthésie déjà la ville : le combat se joue désormais dans le langage.",
    content: chapter4Raw,
  }
];

export default chapters;
