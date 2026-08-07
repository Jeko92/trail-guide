import type { Difficulty, Trail, TrailWithRegion } from '../types/types.ts';
import { getDB } from '../db/database.ts';
import type { Database } from 'sqlite';
import { sanitizePostContent, slugify } from '../utils/utils.ts';

export async function getAllTrails (): Promise<TrailWithRegion[]> {
  const db: Database = getDB();
  return db.all<TrailWithRegion[]>(`
    SELECT trails.*,
           regions.name    AS region_name,
           regions.country AS region_country
    FROM trails
           INNER JOIN regions ON trails.region_id = regions.id
    ORDER BY trails.created_at DESC;
  `);
}

export async function getTrailBySlug (
  slug: string,
): Promise<TrailWithRegion | undefined> {
  const db: Database = getDB();
  return db.get<TrailWithRegion>(
    `
      SELECT trails.*,
             regions.name    AS region_name,
             regions.country AS region_country
      FROM trails
             INNER JOIN regions ON trails.region_id = regions.id
      WHERE trails.slug = ?
    `,
    slug,
  );
}

export async function getTrailsByRegionId (
  regionId: number,
): Promise<TrailWithRegion[]> {
  const db: Database = getDB();
  return db.all<TrailWithRegion[]>(
    `
      SELECT trails.*,
             regions.name    AS region_name,
             regions.country AS region_country
      FROM trails
             INNER JOIN regions
                        ON trails.region_id = regions.id
      WHERE trails.region_id = ?`,
    regionId,
  );
}

// Admin handlers
export async function getTrailById(): Promise<void> {}

export async function addTrail (
  regionId: number,
  title: string,
  difficulty: Difficulty,
  distance: number,
  description: string,
  image_url: string
): Promise<void> {
  const db: Database = getDB();
  const slug = slugify(title);

  const trailExists = await db.get<Trail>('SELECT * FROM trails WHERE slug = ?', slug);
  if ( trailExists ) {
    throw new Error(`Trail with slug ${slug} already exists`);
  }

  // sanitized here, not in the controller, since this fn is also the intended write path for the future API
  const sanitizedDescription = sanitizePostContent(description);
  const createdAt = Math.floor(Date.now() / 1000);

  await db.run(
    `INSERT INTO trails (title, slug, region_id, difficulty, distance_km, description, image_url, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    title, slug, regionId, difficulty, distance, sanitizedDescription, image_url, createdAt
  );
}

export async function updateTrail (): Promise<void> {
}

export async function deleteTrail (): Promise<void> {
}

