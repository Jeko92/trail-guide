import type { Region } from '../types/types.ts';
import { getDB } from '../db/database.ts';
import type { Database } from 'sqlite';

export async function getAllRegions (): Promise<Region[]> {
  const db: Database = getDB();
  return db.all<Region[]>('SELECT * FROM regions ORDER BY name');
}

export async function getRegionBySlug(slug: string): Promise<Region | undefined> {
  const db: Database = getDB();
  return db.get<Region>(`SELECT * FROM regions WHERE slug = ?`, slug);
}
