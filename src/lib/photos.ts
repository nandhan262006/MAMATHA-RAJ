import "server-only";
import { getDb } from "@/lib/db";

export type Photo = {
  id: number;
  src: string;
  thumb: string | null;
  featured: boolean;
};

const LIBRARY: { src: string; featured: boolean }[] = [
  { src: "/downloads/2026-06-18_06-13-07_UTC_1.jpg", featured: true },
  { src: "/downloads/2026-06-18_06-13-07_UTC_2.jpg", featured: true },
  { src: "/downloads/2026-06-18_06-13-07_UTC_3.jpg", featured: true },
  { src: "/downloads/2026-06-19_06-12-31_UTC_1.jpg", featured: true },
  { src: "/downloads/2026-06-19_06-12-31_UTC_2.jpg", featured: true },
  { src: "/downloads/2026-06-19_06-12-31_UTC_3.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-13-43_UTC_1.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-13-43_UTC_2.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-13-43_UTC_3.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-13-43_UTC_4.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-13-43_UTC_5.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-19-45_UTC_1.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-19-45_UTC_2.jpg", featured: true },
  { src: "/downloads/2026-07-08_11-19-45_UTC_3.jpg", featured: true },
  { src: "/downloads/2026-07-20_07-34-52_UTC_1.jpg", featured: true },
  { src: "/downloads/2026-07-20_07-34-52_UTC_2.jpg", featured: true },
  { src: "/downloads/2026-07-20_07-34-52_UTC_3.jpg", featured: true },
  { src: "/downloads/2026-07-30_13-29-10_UTC_1.jpg", featured: true },
  { src: "/downloads/2026-07-30_13-29-10_UTC_2.jpg", featured: true },
  { src: "/downloads/2026-07-30_13-29-10_UTC_3.jpg", featured: true },
  { src: "/downloads/2026-07-30_13-29-10_UTC_4.jpg", featured: true },
  { src: "/downloads/2023-11-22_08-28-05_UTC.jpg", featured: true },
];

let seedPromise: Promise<void> | null = null;

export function ensurePhotosSchema(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const db = getDb();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS photos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          src TEXT UNIQUE NOT NULL,
          featured INTEGER NOT NULL DEFAULT 0,
          position INTEGER NOT NULL DEFAULT 0
        )
      `);

      const count = await db.execute("SELECT COUNT(*) AS n FROM photos");
      if (Number(count.rows[0].n) === 0) {
        for (let i = 0; i < LIBRARY.length; i++) {
          const item = LIBRARY[i];
          await db.execute({
            sql: `INSERT INTO photos (src, featured, position)
                  VALUES (?, ?, ?)
                  ON CONFLICT(src) DO NOTHING`,
            args: [item.src, item.featured ? 1 : 0, i],
          });
        }
      }

      const cols = await db.execute("PRAGMA table_info(photos)");
      if (!cols.rows.some((r) => String(r.name) === "thumb")) {
        await db.execute("ALTER TABLE photos ADD COLUMN thumb TEXT");
      }
    })();
    seedPromise.catch(() => {
      seedPromise = null;
    });
  }
  return seedPromise;
}

export async function getAllPhotos(): Promise<Photo[]> {
  try {
    await ensurePhotosSchema();
    const res = await getDb().execute(
      "SELECT id, src, thumb, featured FROM photos ORDER BY position, id"
    );
    return res.rows.map((row) => ({
      id: Number(row.id),
      src: String(row.src),
      thumb: row.thumb ? String(row.thumb) : null,
      featured: Number(row.featured) === 1,
    }));
  } catch (e) {
    console.error("photos read failed, using library defaults:", e);
    return LIBRARY.map((item, i) => ({
      id: i + 1,
      src: item.src,
      thumb: null,
      featured: item.featured,
    }));
  }
}

export async function getFeaturedPhotos(): Promise<Photo[]> {
  const photos = await getAllPhotos();
  return photos.filter((p) => p.featured);
}
