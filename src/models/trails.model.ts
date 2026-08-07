import type { TrailWithRegion } from '../types/types.ts';
import { getDB } from '../db/database.ts';
import type { Database } from 'sqlite';

export async function getAllTrails(): Promise<TrailWithRegion[]> {
  const db: Database = getDB();
  return db.all<TrailWithRegion[]>(`
    SELECT
      trails.*,
      regions.name AS region_name,
      regions.country AS region_country
    FROM trails
    INNER JOIN regions ON trails.region_id = regions.id
  `);
}

export async function getTrailBySlug(slug: string): Promise<TrailWithRegion | undefined> {
  const db: Database = getDB();
  return db.get<TrailWithRegion>(`
    SELECT
      trails.*,
      regions.name AS region_name,
      regions.country AS region_country
    FROM trails
           INNER JOIN regions ON trails.region_id = regions.id
    WHERE trails.slug = ?
  `, slug);
}

export async function getTrailsByRegionId(regionId: number): Promise<TrailWithRegion[]> {
  const db: Database = getDB();
  return db.all<TrailWithRegion[]>(`
    SELECT
      trails.*,
      regions.name AS region_name,
      regions.country AS region_country
    FROM trails
    INNER JOIN regions
    ON trails.region_id = regions.id
    WHERE trails.region_id = ?`, regionId);
}

// Admin handlers
export async function getTrailId(): Promise<void> {}

export async function addTrail(): Promise<void> {}

export async function updateTrail(): Promise<void> {}

export async function deleteTrail(): Promise<void> {}

export interface TrailViewModel extends TrailWithRegion {
  createdAt: string;
}
