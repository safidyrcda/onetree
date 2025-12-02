'use client';
import { useState } from 'react';
import type { Tree } from '@/lib/types/tree';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TreeForm } from './tree-form';

interface TreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tree: Tree) => void;
  initialTree?: Tree;
  mode: 'create' | 'edit';
}

export const TreeModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialTree,
  mode,
}: TreeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (tree: Tree) => {
    setIsLoading(true);
    try {
      onSubmit(tree);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error('Erreur:', error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Ajouter un nouvel arbre' : "Modifier l'arbre"}
          </DialogTitle>
          {mode === 'create' && (
            <DialogDescription>
              Remplissez le formulaire pour ajouter un arbre à votre collection
            </DialogDescription>
          )}
        </DialogHeader>
        <TreeForm
          initialTree={initialTree}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isModal
        />
      </DialogContent>
    </Dialog>
  );
};
