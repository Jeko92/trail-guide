export interface Region {
  id: number;
  name: string;
  slug: string;
  country: string;
  description: string;
}

export type Difficulty = 'easy' | 'moderate' | 'hard';

export interface Trail {
  id: number;
  region_id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  distance_km: number;
  description: string;
  image_url: string;
  created_at: number;
}

export interface TrailWithRegion extends Trail {
  region_name: string;
  region_country: string;
}
