'use client';

import type React from 'react';

import { useState } from 'react';
import type { Tree } from '@/lib/types/tree';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TreeFormProps {
  initialTree?: Tree;
  onSubmit: (tree: Tree) => void;
  isLoading?: boolean;
  isModal?: boolean;
}

export const TreeForm = ({
  initialTree,
  onSubmit,
  isLoading,
  isModal,
}: TreeFormProps) => {
  const [formData, setFormData] = useState<Partial<Tree>>(
    initialTree || {
      id: '',
      speciesScientific: '',
      speciesVernacular: '',
      planterName: '',
      plantationDate: '',
      area: '',
      heightCm: undefined,
      healthStatus: '',
      notes: '',
      photos: [],
      latitude: undefined,
      longitude: undefined,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['heightCm', 'latitude', 'longitude'].includes(name)
        ? value
          ? Number.parseFloat(value)
          : undefined
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData as Tree);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Espèce scientifique *
          </label>
          <Input
            type="text"
            name="speciesScientific"
            value={formData.speciesScientific || ''}
            onChange={handleChange}
            required
            placeholder="Ex: Quercus robur"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Nom vernaculaire
          </label>
          <Input
            type="text"
            name="speciesVernacular"
            value={formData.speciesVernacular || ''}
            onChange={handleChange}
            placeholder="Ex: Chêne pédonculé"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Nom du planteur
          </label>
          <Input
            type="text"
            name="planterName"
            value={formData.planterName || ''}
            onChange={handleChange}
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date de plantation *
          </label>
          <Input
            type="date"
            name="plantationDate"
            value={formData.plantationDate || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Localisation</label>
          <Input
            type="text"
            name="area"
            value={formData.area || ''}
            onChange={handleChange}
            placeholder="Ex: Andasibe Mantadia"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <Input
              type="number"
              name="latitude"
              value={formData.latitude ?? ''}
              onChange={handleChange}
              placeholder="Ex: -19.2415"
              step="0.0001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <Input
              type="number"
              name="longitude"
              value={formData.longitude ?? ''}
              onChange={handleChange}
              placeholder="Ex: 47.5250"
              step="0.0001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hauteur (cm)</label>
          <Input
            type="number"
            name="heightCm"
            value={formData.heightCm || ''}
            onChange={handleChange}
            placeholder="Ex: 280"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            État de santé
          </label>
          <select
            name="healthStatus"
            value={formData.healthStatus || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Sélectionner</option>
            <option value="Excellent">Excellent</option>
            <option value="Très bon">Très bon</option>
            <option value="Bon">Bon</option>
            <option value="Moyen">Moyen</option>
            <option value="Faible">Faible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            placeholder="Ajouter des notes..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-24"
          />
        </div>

        <div className={`flex gap-2 pt-4${isModal ? ' justify-end' : ''}`}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          {!isModal && (
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Annuler
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
