import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'node:path';

const db_path = path.join(process.cwd(), 'data', 'trail-guide.db');

let db: Database | null = null;

export async function connectDB() {
  db = await open({ filename: db_path, driver: sqlite3.Database });
  const testRegion = await db.get('SELECT * FROM regions LIMIT 1');

  console.log(`$Database connected and tables initialized.`);
  console.log(JSON.stringify(testRegion, null, 2));
  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export async function closeDB() {
  if (db) {
    await db.close();
    db = null;
  }
}
