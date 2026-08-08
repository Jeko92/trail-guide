import type { Tag } from '../types/types.ts';
import { getDB } from '../db/database.ts';
import type { Database } from 'sqlite';

export async function getAllTags (): Promise<Tag[]> {
  const db: Database = getDB();
  return db.all<Tag[]>('SELECT * FROM tags ORDER BY name');
}

export async function getTagsForTrail ( trailId: number ): Promise<Tag[]> {
  const db: Database = getDB();
  return db.all<Tag[]>(
    `
      SELECT tags.*
      FROM tags
             INNER JOIN trail_tags ON trail_tags.tag_id = tags.id
      WHERE trail_tags.trail_id = ?
      ORDER BY tags.name
    `,
    trailId,
  );
}

export async function setTagsForTrail ( trailId: number, tagIds: number[] ): Promise<void> {
  const db: Database = getDB();
  await db.run('DELETE FROM trail_tags WHERE trail_id = ?', trailId);

  for ( const tagId of tagIds ) {
    await db.run('INSERT INTO trail_tags (trail_id, tag_id) VALUES (?, ?)', trailId, tagId);
  }
}
