import { TreeComponent } from './components/tree.component';
import { Tree } from '@/lib/types/tree';

const mockTree: Tree = {
  id: '1',
  speciesScientific: 'Quercus robur',
  speciesVernacular: 'Chêne pédonculé',
  planterName: 'Rabemorasata Heriniaina Safidy',
  plantationDate: '2024-03-15',
  area: 'Andasibe Mantadia',
  heightCm: 280,
  healthStatus: 'Excellent',
  longitude: 48.4567,
  latitude: -18.9333,
  notes:
    'Arbre bien établi avec une belle croissance. Suivi régulier recommandé.',
  photos: ['/arbre-1.png', '/arbre-2.jpg'],
};

export default function TreeDetailPage() {
  return <TreeComponent tree={mockTree} />;
}
