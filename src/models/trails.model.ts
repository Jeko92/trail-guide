import type { Trail, TrailWithRegion } from '../types/types.ts';
import { getDB } from '../db/database.ts';
import type { Database } from 'sqlite';
import { slugify } from '../utils/utils.ts';

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

export async function addTrail ( title: string ):Promise<void>{
  const db:Database = getDB();
  const slug = slugify(title);

  const trailExists = await db.get<Trail>('SELECT * FROM trails WHERE slug = ?', slug);
  if(trailExists){
    throw new Error(`Trail with slug ${slug} already exists`);
  }

  // TODO(3.6): region_id, difficulty, and distance_km are hardcoded —
  // description/image_url are left out entirely since they're nullable —
  // until those form fields are uncommented and wired through.
  // See IMPLEMENTATION_PLAN.md 3.5 step 7.
  const createdAt = Math.floor(Date.now() / 1000);
  const regionId = 1;
  const difficulty = 'easy';
  const distanceKm = 0;

  await db.run(
    `INSERT INTO trails (title, slug, region_id, difficulty, distance_km, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    title, slug, regionId, difficulty, distanceKm, createdAt
  );

  console.log(`Trail with title: ${title} and slug:${slug} successfully created!`);
}
export async function updateTrail(): Promise<void> {}

export async function deleteTrail(): Promise<void> {}

