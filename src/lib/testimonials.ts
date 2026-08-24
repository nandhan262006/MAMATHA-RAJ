import "server-only";
import { getDb, ensureSchema } from "@/lib/db";

export type Testimonial = {
  id: number;
  imageUrl: string;
  ratio: string;
  quote: string;
  author: string;
  role: string;
};

export const DEFAULT_TESTIMONIALS: Omit<Testimonial, "id">[] = [
  {
    imageUrl: "/downloads/2026-07-20_07-34-52_UTC_2.jpg",
    ratio: "2743/1837",
    quote:
      "Mamatha Raj didn't just photograph our wedding — they captured our souls. Every time we look at the album, we relive those magical moments. The attention to detail and the emotional depth in their work is unmatched.",
    author: "Ananya & Rohit",
    role: "Udaipur Wedding · December 2024",
  },
  {
    imageUrl: "/downloads/2026-07-30_13-29-10_UTC_2.jpg",
    ratio: "3072/4096",
    quote:
      "From the first consultation to the final delivery, the experience was nothing short of extraordinary. Their ability to find beauty in candid moments is what sets them apart. Truly artists at heart.",
    author: "Priya & Arjun",
    role: "Jaipur Pre-Wedding · March 2025",
  },
  {
    imageUrl: "/downloads/2026-06-18_06-13-07_UTC_3.jpg",
    ratio: "3391/4096",
    quote:
      "We were nervous about our destination wedding in Goa, but the Mamatha Raj team made everything seamless. The photos are breathtaking — they turned our celebration into a work of art that we'll treasure forever.",
    author: "Meera & Vikram",
    role: "Goa Wedding · October 2024",
  },
];

let seedPromise: Promise<void> | null = null;

export function ensureTestimonialsSchema(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const db = getDb();
      await ensureSchema();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          position INTEGER NOT NULL DEFAULT 0,
          image_url TEXT NOT NULL DEFAULT '',
          ratio TEXT NOT NULL DEFAULT '',
          quote TEXT NOT NULL DEFAULT '',
          author TEXT NOT NULL DEFAULT '',
          role TEXT NOT NULL DEFAULT ''
        )
      `);

      const count = await db.execute("SELECT COUNT(*) AS n FROM testimonials");
      if (Number(count.rows[0].n) === 0) {
        for (let i = 0; i < DEFAULT_TESTIMONIALS.length; i++) {
          const t = DEFAULT_TESTIMONIALS[i];
          await db.execute({
            sql: `INSERT INTO testimonials (position, image_url, ratio, quote, author, role)
                  VALUES (?, ?, ?, ?, ?, ?)`,
            args: [i, t.imageUrl, t.ratio, t.quote, t.author, t.role],
          });
        }
      }
    })();
    seedPromise.catch(() => {
      seedPromise = null;
    });
  }
  return seedPromise;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    await ensureTestimonialsSchema();
    const res = await getDb().execute(
      "SELECT id, image_url, ratio, quote, author, role FROM testimonials ORDER BY position, id"
    );
    return res.rows.map((row) => ({
      id: Number(row.id),
      imageUrl: String(row.image_url),
      ratio: String(row.ratio),
      quote: String(row.quote),
      author: String(row.author),
      role: String(row.role),
    }));
  } catch (e) {
    console.error("testimonials read failed, using defaults:", e);
    return DEFAULT_TESTIMONIALS.map((t, i) => ({ ...t, id: i + 1 }));
  }
}
