import type { Tree } from './types/tree';

export const mockTrees: Tree[] = [
  {
    id: '1',
    speciesScientific: 'Quercus robur',
    speciesVernacular: 'Chêne pédonculé',
    planterName: 'Rabemorasata Heriniaina Safidy',
    plantationDate: '2024-03-15',
    area: 'Andasibe Mantadia',
    heightCm: 280,
    healthStatus: 'Excellent',
    notes:
      'Arbre bien établi avec une belle croissance. Suivi régulier recommandé.',
    photos: ['/oak-tree.jpg'],
    latitude: -19.2415,
    longitude: 47.525,
  },
  {
    id: '2',
    speciesScientific: 'Mangifera indica',
    speciesVernacular: 'Manguier',
    planterName: 'Jean Dupont',
    plantationDate: '2023-06-20',
    area: 'Fianarantsoa',
    heightCm: 450,
    healthStatus: 'Très bon',
    notes: 'Fruitier productif',
    photos: ['/mango-tree.jpg'],
    latitude: -21.4531,
    longitude: 47.0822,
  },
  {
    id: '3',
    speciesScientific: 'Ficus benjamina',
    speciesVernacular: 'Figuier',
    planterName: 'Rabemorasata Heriniaina Safidy',
    plantationDate: '2024-01-10',
    area: 'Antananarivo',
    heightCm: 350,
    healthStatus: 'Bon',
    notes: 'Croissance normale',
    photos: ['/mango-tree.jpg'],
    latitude: -18.8792,
    longitude: 47.5079,
  },
];

export function getTreeById(id: string): Tree | undefined {
  return mockTrees.find((tree) => tree.id === id);
}

export function updateTree(id: string, updatedTree: Tree): void {
  const index = mockTrees.findIndex((tree) => tree.id === id);
  if (index !== -1) {
    mockTrees[index] = updatedTree;
  }
}

export function deleteTree(id: string): void {
  const index = mockTrees.findIndex((tree) => tree.id === id);
  if (index !== -1) {
    mockTrees.splice(index, 1);
  }
}

export function addTree(tree: Tree): void {
  mockTrees.push(tree);
}

export function searchTreesByPlanter(plantingName: string): Tree[] {
  const searchTerm = plantingName.toLowerCase().trim();
  if (!searchTerm) return mockTrees;
  return mockTrees.filter((tree) =>
    tree.planterName?.toLowerCase().includes(searchTerm)
  );
}
