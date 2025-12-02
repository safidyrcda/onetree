'use client';

import { useParams } from 'next/navigation';
import type { Tree } from '@/lib/types/tree';
import { AlertCircle, Leaf, MapPin, Ruler, Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface TreeComponentProps {
  tree?: Tree;
}

export const TreeComponent = ({ tree }: TreeComponentProps) => {
  const params = useParams();
  const treeId = params.id;

  if (!tree) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sage-50 to-cream-50">
        <Card className="p-8 max-w-md">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <p className="text-sage-700">
              {`Chargement des informations de l'arbre ${treeId}...`}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const healthStatusMap = {
    Excellent: 'bg-emerald-100 text-emerald-800',
    Bon: 'bg-lime-100 text-lime-800',
    Moyen: 'bg-amber-100 text-amber-800',
    Faible: 'bg-orange-100 text-orange-800',
  } as const;

  const healthStatusColor: string =
    healthStatusMap[tree.healthStatus as keyof typeof healthStatusMap] ||
    'bg-sage-100 text-sage-800';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-cream-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-sage-900">
              {tree.speciesScientific}
            </h1>
          </div>
          {tree.speciesVernacular && (
            <p className="text-lg text-sage-600 italic">
              {` "${tree.speciesVernacular}"`}
            </p>
          )}
        </div>

        <Card className="overflow-hidden shadow-lg border-0 mb-6 bg-white">
          {tree.photos && tree.photos.length > 0 && (
            <div className="bg-sage-100 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tree.photos.map((url: string | null, idx: number) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={url || '/placeholder.svg'}
                      alt={`Photo ${idx + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tree.planterName && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sage-600 font-medium">
                      Parrainé par
                    </p>
                    <p className="text-lg text-sage-900">{tree.planterName}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-sage-600 font-medium">Planté le</p>
                  <p className="text-lg text-sage-900">
                    {new Date(tree.plantationDate).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {tree.area && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sage-600 font-medium">
                      Emplacement
                    </p>
                    <p className="text-lg text-sage-900">{tree.area}</p>
                  </div>
                </div>
              )}

              {tree.heightCm && (
                <div className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sage-600 font-medium">Hauteur</p>
                    <p className="text-lg text-sage-900">{tree.heightCm} cm</p>
                  </div>
                </div>
              )}

              {tree.longitude && tree.latitude && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sage-600 font-medium">
                      Localisation
                    </p>
                    <p className="text-sm text-sage-900">
                      Longitude: {tree.longitude}
                    </p>
                    <p className="text-sm text-sage-900">
                      Latitude: {tree.latitude}
                    </p>
                  </div>
                </div>
              )}

              {tree.healthStatus && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div className="w-full">
                    <p className="text-sm text-sage-600 font-medium mb-2">
                      État de santé
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${healthStatusColor}`}
                    >
                      {tree.healthStatus}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {tree.notes && (
              <div className="mt-8 pt-8 border-t border-sage-200">
                <h3 className="text-sm font-semibold text-sage-600 mb-3">
                  Notes
                </h3>
                <p className="text-sage-700 leading-relaxed">{tree.notes}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
