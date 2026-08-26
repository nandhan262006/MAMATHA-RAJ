import "server-only";
import { getDb, ensureSchema } from "@/lib/db";

export const ABOUT_DEFAULTS = {
  imageUrl: "/ABOUT.jpeg",
  label: "About the Studio",
  heading: 'Where Light Meets Emotion',
  paragraph1:
    "Founded in Khammam, Telangana, Mamatharaj Photography was born from a deep passion for visual storytelling. We believe that every celebration — every laugh, every tear, every stolen glance — deserves to be immortalized with cinematic precision.",
  paragraph2:
    "With over a decade of experience and hundreds of weddings captured across Khammam, Telangana and the rest of India, our team brings an editorial eye and a documentary soul to every project. We don't just take photographs; we craft visual narratives that resonate for generations.",
  stats: [
    { value: "500+", label: "Weddings Captured" },
    { value: "12+", label: "Years of Craft" },
    { value: "35+", label: "Cities Covered" },
  ],
} as const;

export type AboutContent = {
  imageUrl: string;
  imageIsCustom: boolean;
  label: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  stats: { value: string; label: string }[];
};

function text(v: string | null | undefined, fallback: string): string {
  return v && v.trim().length > 0 ? v : fallback;
}

export async function getAboutContent(): Promise<AboutContent> {
  const content: AboutContent = {
    imageUrl: ABOUT_DEFAULTS.imageUrl,
    imageIsCustom: false,
    label: ABOUT_DEFAULTS.label,
    heading: ABOUT_DEFAULTS.heading,
    paragraph1: ABOUT_DEFAULTS.paragraph1,
    paragraph2: ABOUT_DEFAULTS.paragraph2,
    stats: ABOUT_DEFAULTS.stats.map((s) => ({ ...s })),
  };

  try {
    await ensureSchema();
    const res = await getDb().execute("SELECT key, value FROM about_content");
    const map = new Map<string, string>();
    for (const row of res.rows) {
      map.set(String(row.key), String(row.value));
    }

    const imageUrl = map.get("image_url");
    if (imageUrl && imageUrl.trim()) {
      content.imageUrl = imageUrl;
      content.imageIsCustom = true;
    }
    content.label = text(map.get("label"), content.label);
    content.heading = text(map.get("heading"), content.heading);
    content.paragraph1 = text(map.get("paragraph_1"), content.paragraph1);
    content.paragraph2 = text(map.get("paragraph_2"), content.paragraph2);

    content.stats = content.stats.map((s, i) => ({
      value: text(map.get(`stat_${i + 1}_value`), s.value),
      label: text(map.get(`stat_${i + 1}_label`), s.label),
    }));
  } catch (e) {
    console.error("about_content read failed, using defaults:", e);
  }

  return content;
}
