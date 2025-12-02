export interface Tree {
  id: string;
  speciesScientific: string;
  speciesVernacular?: string;
  planterName?: string;
  plantationDate: string;
  area?: string;
  heightCm?: number;
  healthStatus?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  photos?: string[];
}
