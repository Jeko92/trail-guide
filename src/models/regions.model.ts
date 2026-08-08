import type { Region } from '../types/types.ts';
import { getDB } from '../db/database.ts';
import type { Database } from 'sqlite';
import { sanitizePostContent, slugify } from '../utils/utils.ts';

export async function getAllRegions (): Promise<Region[]> {
  const db: Database = getDB();
  return db.all<Region[]>('SELECT * FROM regions ORDER BY name');
}

export async function getRegionBySlug (
  slug: string,
): Promise<Region | undefined> {
  const db: Database = getDB();
  return db.get<Region>(`SELECT * FROM regions WHERE slug = ?`, slug);
}

// sanitized here, not in the controller, since this fn is also the intended write path for the future API
export async function addRegion ( name: string, country: string, description: string ): Promise<number> {
  const slug = slugify(name);
  const sanitizedDescription = sanitizePostContent(description);
  const db: Database = getDB();

  const lastId = (await db.run(
    `INSERT INTO regions (name, slug, country, description) VALUES (?, ?, ?, ?)`,
    name, slug, country, sanitizedDescription
  )).lastID;

  if ( lastId ) {
    return lastId
  }

  return 0;
}

export async function deleteRegion ( id: number ): Promise<void> {
  const db: Database = getDB();
  await db.run('DELETE FROM regions WHERE id = ?', id);
}
