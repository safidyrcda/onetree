'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTreeById } from '@/lib/trees-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMemo } from 'react';
import Image from 'next/image';

export default function TreeDetailPage() {
  const params = useParams();
  const treeId = params.id as string;
  const tree = useMemo(() => getTreeById(treeId), [treeId]);

  if (!tree) {
    return (
      <main className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-lg text-foreground mb-4">Arbre introuvable</p>
          <Link href="/trees">
            <Button>Retour à la liste</Button>
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {tree.speciesVernacular || tree.speciesScientific}
            </h1>
            <p className="text-muted-foreground italic">
              {tree.speciesScientific}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/trees/${tree.id}/edit`}>
              <Button>Modifier</Button>
            </Link>
            <Link href="/trees">
              <Button variant="outline">Retour</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tree.photos && tree.photos.length > 0 && (
            <div className="lg:col-span-2">
              <Card className="p-4">
                <Image
                  src={'/placeholder.svg'}
                  alt={`Photo`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {tree.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {tree.photos.slice(1).map((url: string, idx: number) => (
                      <Image
                        key={idx}
                        src={url || '/placeholder.svg'}
                        alt={`Photo ${idx + 1}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="font-semibold text-foreground mb-3">
                Informations
              </h2>
              <div className="space-y-2 text-sm">
                {tree.planterName && (
                  <div>
                    <p className="text-muted-foreground">Planteur</p>
                    <p className="font-medium text-foreground">
                      {tree.planterName}
                    </p>
                  </div>
                )}
                {tree.plantationDate && (
                  <div>
                    <p className="text-muted-foreground">Date de plantation</p>
                    <p className="font-medium text-foreground">
                      {new Date(tree.plantationDate).toLocaleDateString(
                        'fr-FR'
                      )}
                    </p>
                  </div>
                )}
                {tree.area && (
                  <div>
                    <p className="text-muted-foreground">Localisation</p>
                    <p className="font-medium text-foreground">{tree.area}</p>
                  </div>
                )}
                {tree.heightCm && (
                  <div>
                    <p className="text-muted-foreground">Hauteur</p>
                    <p className="font-medium text-foreground">
                      {tree.heightCm} cm
                    </p>
                  </div>
                )}
                {tree.healthStatus && (
                  <div>
                    <p className="text-muted-foreground">État de santé</p>
                    <p className="font-medium text-foreground">
                      {tree.healthStatus}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {tree.notes && (
          <Card className="p-4 mt-6">
            <h2 className="font-semibold text-foreground mb-2">Notes</h2>
            <p className="text-foreground">{tree.notes}</p>
          </Card>
        )}
      </div>
    </main>
  );
}
