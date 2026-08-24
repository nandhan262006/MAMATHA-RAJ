import "server-only";
import { getDb, ensureSchema } from "@/lib/db";

export const DEFAULT_STORY_PHOTOS = [
  "/downloads/2026-07-08_11-13-43_UTC_2.jpg",
  "/downloads/2026-07-08_11-13-43_UTC_3.jpg",
  "/downloads/2026-07-08_11-19-45_UTC_2.jpg",
];

export type StoryPhoto = { id: number; src: string; thumb: string | null };

let seedPromise: Promise<void> | null = null;

function ensureStoryPhotos(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      await ensureSchema();
      const db = getDb();
      const count = await db.execute("SELECT COUNT(*) AS n FROM story_photos");
      if (Number(count.rows[0].n) === 0) {
        for (let i = 0; i < DEFAULT_STORY_PHOTOS.length; i++) {
          await db.execute({
            sql: `INSERT OR IGNORE INTO story_photos (src, position)
                  VALUES (?, ?)`,
            args: [DEFAULT_STORY_PHOTOS[i], i],
          });
        }
      }

      const cols = await db.execute("PRAGMA table_info(story_photos)");
      if (!cols.rows.some((r) => String(r.name) === "thumb")) {
        await db.execute("ALTER TABLE story_photos ADD COLUMN thumb TEXT");
      }
    })();
    seedPromise.catch(() => {
      seedPromise = null;
    });
  }
  return seedPromise;
}

export async function getStoryPhotos(): Promise<StoryPhoto[]> {
  try {
    await ensureStoryPhotos();
    const res = await getDb().execute(
      "SELECT id, src, thumb FROM story_photos ORDER BY position, id"
    );
    return res.rows.map((row) => ({
      id: Number(row.id),
      src: String(row.src),
      thumb: row.thumb ? String(row.thumb) : null,
    }));
  } catch (e) {
    console.error("story_photos read failed, using defaults:", e);
    return DEFAULT_STORY_PHOTOS.map((src, i) => ({
      id: i + 1,
      src,
      thumb: null,
    }));
  }
}
