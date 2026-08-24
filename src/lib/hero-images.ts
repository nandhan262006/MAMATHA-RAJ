import "server-only";
import { getDb } from "@/lib/db";

export const HERO_SLOTS = 24;

export const DEFAULT_HERO_IMAGES: string[] = [
  "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
  "/downloads/2026-07-08_11-13-43_UTC_2.jpg",
  "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
  "/downloads/2026-07-20_07-34-52_UTC_1.jpg",
  "/downloads/2026-07-30_13-29-10_UTC_1.jpg",
  "/downloads/2026-06-19_06-12-31_UTC_2.jpg",
  "/downloads/2026-07-08_11-19-45_UTC_1.jpg",
  "/downloads/2026-06-18_06-13-07_UTC_3.jpg",
  "/downloads/2026-07-08_11-13-43_UTC_3.jpg",
  "/downloads/2026-07-20_07-34-52_UTC_2.jpg",
  "/downloads/2026-07-30_13-29-10_UTC_2.jpg",
  "/downloads/2026-06-19_06-12-31_UTC_3.jpg",
  "/downloads/2026-07-08_11-13-43_UTC_4.jpg",
  "/downloads/2026-07-08_11-19-45_UTC_2.jpg",
  "/downloads/2026-06-18_06-13-07_UTC_1.jpg",
  "/downloads/2026-07-30_13-29-10_UTC_3.jpg",
  "/downloads/2026-07-08_11-13-43_UTC_5.jpg",
  "/downloads/2026-07-20_07-34-52_UTC_3.jpg",
  "/downloads/2026-06-19_06-12-31_UTC_1.jpg",
  "/downloads/2026-07-08_11-19-45_UTC_3.jpg",
  "/downloads/2026-07-30_13-29-10_UTC_4.jpg",
  "/downloads/2023-11-22_08-28-05_UTC.jpg",
  "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
  "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
];

export type HeroSlot = {
  slot: number;
  url: string;
  isCustom: boolean;
};

export async function getHeroImages(): Promise<HeroSlot[]> {
  const slots: HeroSlot[] = DEFAULT_HERO_IMAGES.map((url, i) => ({
    slot: i + 1,
    url,
    isCustom: false,
  }));

  try {
    const res = await getDb().execute("SELECT slot, url FROM hero_images");
    const overrides = new Map<number, string>();
    for (const row of res.rows) {
      const slot = Number(row.slot);
      const url = String(row.url);
      if (slot >= 1 && slot <= HERO_SLOTS && url) overrides.set(slot, url);
    }
    for (const s of slots) {
      const override = overrides.get(s.slot);
      if (override) {
        s.url = override;
        s.isCustom = true;
      }
    }
  } catch (e) {
    console.error("hero_images read failed, using defaults:", e);
  }

  return slots;
}
