import "server-only";
import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL ?? "",
      authToken: process.env.TURSO_AUTH_TOKEN ?? "",
    });
  }
  return client;
}

let schemaPromise: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const db = getDb();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS hero_images (
          slot INTEGER PRIMARY KEY,
          url TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS about_content (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS services (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          position INTEGER NOT NULL,
          category TEXT NOT NULL DEFAULT '',
          title TEXT NOT NULL DEFAULT '',
          description TEXT NOT NULL DEFAULT '',
          image_url TEXT NOT NULL DEFAULT ''
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS site_content (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS story_photos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          src TEXT UNIQUE NOT NULL,
          position INTEGER NOT NULL DEFAULT 0
        )
      `);
    })();
    schemaPromise.catch(() => {
      schemaPromise = null;
    });
  }
  return schemaPromise;
}
