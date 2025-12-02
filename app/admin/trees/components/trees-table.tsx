'use client';

import { Button } from '@/components/ui/button';
import type { Tree } from '@/lib/types/tree';

interface TreesTableProps {
  trees: Tree[];
  onEdit: (tree: Tree) => void;
  onDelete: (id: string) => void;
}

export function TreesTable({ trees, onEdit, onDelete }: TreesTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted">
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Nom vernaculaire
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Espèce scientifique
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Planteur
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Zone</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Coordonnées
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Hauteur (cm)
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              État de santé
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Date plantation
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {trees.map((tree, index) => (
            <tr
              key={tree.id}
              className={
                index % 2 === 0 ? 'bg-background' : 'bg-muted/30 border-b'
              }
            >
              <td className="px-4 py-3 text-sm font-medium">
                {tree.speciesVernacular || '-'}
              </td>
              <td className="px-4 py-3 text-sm italic text-muted-foreground">
                {tree.speciesScientific}
              </td>
              <td className="px-4 py-3 text-sm">{tree.planterName || '-'}</td>
              <td className="px-4 py-3 text-sm">{tree.area || '-'}</td>
              <td className="px-4 py-3 text-sm text-xs">
                {tree.latitude && tree.longitude
                  ? `${tree.latitude.toFixed(4)}, ${tree.longitude.toFixed(4)}`
                  : '-'}
              </td>
              <td className="px-4 py-3 text-sm">{tree.heightCm || '-'}</td>
              <td className="px-4 py-3 text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {tree.healthStatus || '-'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                {new Date(tree.plantationDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => onEdit(tree)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(tree.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
