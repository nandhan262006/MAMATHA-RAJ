import "server-only";
import { getDb, ensureSchema } from "@/lib/db";

export type ServiceCard = {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const DEFAULT_SERVICES: Omit<ServiceCard, "id">[] = [
  {
    category: "Wedding",
    title: "Wedding Photography",
    description:
      "From the mehendi to the vidai, we capture every emotion of your big day with a blend of candid storytelling and editorial precision.",
    imageUrl: "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
  },
  {
    category: "Pre-Wedding",
    title: "Pre-Wedding Shoots",
    description:
      "Dreamy, cinematic pre-wedding films and photographs at breathtaking locations across India. Your love story, beautifully framed.",
    imageUrl: "/downloads/2026-07-08_11-19-45_UTC_1.jpg",
  },
  {
    category: "Portrait",
    title: "Portrait Sessions",
    description:
      "Studio and outdoor portraits that capture your authentic self. Individual, couple, or family — timeless images for timeless memories.",
    imageUrl: "/downloads/2026-07-30_13-29-10_UTC_1.jpg",
  },
  {
    category: "Films",
    title: "Cinematic Films",
    description:
      "Short films and highlight reels that bring your celebration to life. Professional-grade video with a documentary soul.",
    imageUrl: "/downloads/2026-07-20_07-34-52_UTC_1.jpg",
  },
  {
    category: "Events",
    title: "Event Coverage",
    description:
      "Corporate events, cultural celebrations, and milestone moments — captured with discretion and artistic flair.",
    imageUrl: "/downloads/2026-06-19_06-12-31_UTC_2.jpg",
  },
  {
    category: "Destination",
    title: "Destination Shoots",
    description:
      "We travel anywhere your story takes us. From the palaces of Rajasthan to the beaches of Kerala — your vision, our lens.",
    imageUrl: "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
  },
];

let seedPromise: Promise<void> | null = null;

export function ensureServicesSchema(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const db = getDb();
      await ensureSchema();

      const count = await db.execute("SELECT COUNT(*) AS n FROM services");
      if (Number(count.rows[0].n) === 0) {
        for (let i = 0; i < DEFAULT_SERVICES.length; i++) {
          const s = DEFAULT_SERVICES[i];
          await db.execute({
            sql: `INSERT INTO services (position, category, title, description, image_url)
                  VALUES (?, ?, ?, ?, ?)`,
            args: [i, s.category, s.title, s.description, s.imageUrl],
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

export async function getServices(): Promise<ServiceCard[]> {
  try {
    await ensureServicesSchema();
    const res = await getDb().execute(
      "SELECT id, category, title, description, image_url FROM services ORDER BY position, id"
    );
    return res.rows.map((row) => ({
      id: Number(row.id),
      category: String(row.category),
      title: String(row.title),
      description: String(row.description),
      imageUrl: String(row.image_url),
    }));
  } catch (e) {
    console.error("services read failed, using defaults:", e);
    return DEFAULT_SERVICES.map((s, i) => ({ ...s, id: i + 1 }));
  }
}
