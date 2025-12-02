'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  mockTrees,
  deleteTree,
  addTree,
  updateTree,
  searchTreesByPlanter,
} from '@/lib/trees-data';
import { TreeModal } from './components/tree-modal';
import { TreesTable } from './components/trees-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Tree } from '@/lib/types/tree';
import Image from 'next/image';

export default function TreesPage() {
  const [trees, setTrees] = useState(mockTrees);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedTree, setSelectedTree] = useState<Tree | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [searchTerm, setSearchTerm] = useState('');

  const isModalOpen = modalMode !== null;

  const filteredTrees = searchTerm.trim()
    ? searchTreesByPlanter(searchTerm)
    : trees;

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedTree(undefined);
  };

  const openEditModal = (tree: Tree) => {
    setModalMode('edit');
    setSelectedTree(tree);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedTree(undefined);
  };

  const handleCreateTree = (newTree: Tree) => {
    addTree(newTree);
    setTrees([...mockTrees]);
    closeModal();
  };

  const handleUpdateTree = (updatedTree: Tree) => {
    updateTree(selectedTree!.id, updatedTree);
    setTrees([...mockTrees]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet arbre ?')) {
      deleteTree(id);
      setTrees(trees.filter((tree) => tree.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestion des Arbres
            </h1>
            <p className="text-muted-foreground mt-1">
              {"Gérez votre collection d'arbres"}
            </p>
          </div>
          <Button onClick={openCreateModal}>+ Ajouter un arbre</Button>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Rechercher par nom de planteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-sm"
          />
        </div>

        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? '' : 'bg-transparent'}
          >
            Grille
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? '' : 'bg-transparent'}
          >
            Tableau
          </Button>
        </div>

        {filteredTrees.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? 'Aucun arbre ne correspond à votre recherche'
                : "Aucun arbre n'a été ajouté pour le moment"}
            </p>
            <Button onClick={openCreateModal}>
              {searchTerm ? 'Effacer la recherche' : 'Ajouter le premier arbre'}
            </Button>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrees.map((tree) => (
              <Card key={tree.id} className="p-4 flex flex-col">
                {tree.photos && tree.photos.length > 0 && (
                  <Image
                    src={tree.photos[0] || '/placeholder.svg'}
                    alt={`Photo ${
                      tree.speciesVernacular || tree.speciesScientific
                    }`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    {tree.speciesVernacular || tree.speciesScientific}
                  </h2>
                  <p className="text-sm text-muted-foreground italic">
                    {tree.speciesScientific}
                  </p>

                  <div className="mt-3 space-y-1 text-sm">
                    {tree.planterName && (
                      <p className="text-muted-foreground">
                        Planteur: {tree.planterName}
                      </p>
                    )}
                    {tree.area && (
                      <p className="text-muted-foreground">Zone: {tree.area}</p>
                    )}
                    {tree.healthStatus && (
                      <p className="text-muted-foreground">
                        État:{' '}
                        <span className="font-medium">{tree.healthStatus}</span>
                      </p>
                    )}
                    {tree.latitude && tree.longitude && (
                      <p className="text-muted-foreground text-xs">
                        Coordonnées: {tree.latitude.toFixed(4)},{' '}
                        {tree.longitude.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/trees/${tree.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Voir
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => openEditModal(tree)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(tree.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <TreesTable
            trees={filteredTrees}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      <TreeModal
        isOpen={isModalOpen && modalMode === 'create'}
        onClose={closeModal}
        onSubmit={handleCreateTree}
        mode="create"
      />
      <TreeModal
        isOpen={isModalOpen && modalMode === 'edit'}
        onClose={closeModal}
        onSubmit={handleUpdateTree}
        initialTree={selectedTree}
        mode="edit"
      />
    </main>
  );
}
