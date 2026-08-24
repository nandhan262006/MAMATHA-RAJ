import "server-only";
import { getDb, ensureSchema } from "@/lib/db";

export const STORY_DEFAULTS = {
  imageUrl: "/downloads/2026-07-08_11-13-43_UTC_2.jpg",
  small1Url: "/downloads/2026-07-08_11-13-43_UTC_3.jpg",
  small2Url: "/downloads/2026-07-08_11-19-45_UTC_2.jpg",
  label: "Featured Story",
  headingPlain: "A Royal Affair in",
  headingAccent: "Udaipur",
  description:
    "The grandeur of a Rajasthani palace wedding — where centuries of tradition met modern elegance. Every corner held a story, every moment was pure magic.",
  buttonText: "View Full Gallery",
  details: [
    { value: "Ananya & Rohit", label: "Couple" },
    { value: "Udaipur, Rajasthan", label: "Location" },
    { value: "3 Days", label: "Duration" },
    { value: "1,200+", label: "Photos Delivered" },
  ],
} as const;

export type StoryContent = {
  imageUrl: string;
  imageIsCustom: boolean;
  small1Url: string;
  small1IsCustom: boolean;
  small2Url: string;
  small2IsCustom: boolean;
  label: string;
  headingPlain: string;
  headingAccent: string;
  description: string;
  buttonText: string;
  details: { value: string; label: string }[];
};

function text(v: string | null | undefined, fallback: string): string {
  return v && v.trim().length > 0 ? v : fallback;
}

export async function getStoryContent(): Promise<StoryContent> {
  const content: StoryContent = {
    imageUrl: STORY_DEFAULTS.imageUrl,
    imageIsCustom: false,
    small1Url: STORY_DEFAULTS.small1Url,
    small1IsCustom: false,
    small2Url: STORY_DEFAULTS.small2Url,
    small2IsCustom: false,
    label: STORY_DEFAULTS.label,
    headingPlain: STORY_DEFAULTS.headingPlain,
    headingAccent: STORY_DEFAULTS.headingAccent,
    description: STORY_DEFAULTS.description,
    buttonText: STORY_DEFAULTS.buttonText,
    details: STORY_DEFAULTS.details.map((d) => ({ ...d })),
  };

  try {
    await ensureSchema();
    const res = await getDb().execute("SELECT key, value FROM site_content");
    const map = new Map<string, string>();
    for (const row of res.rows) {
      map.set(String(row.key), String(row.value));
    }

    const img = map.get("story_image");
    if (img && img.trim()) {
      content.imageUrl = img;
      content.imageIsCustom = true;
    }
    const s1 = map.get("story_small_image_1");
    if (s1 && s1.trim()) {
      content.small1Url = s1;
      content.small1IsCustom = true;
    }
    const s2 = map.get("story_small_image_2");
    if (s2 && s2.trim()) {
      content.small2Url = s2;
      content.small2IsCustom = true;
    }

    content.label = text(map.get("story_label"), content.label);
    content.headingPlain = text(
      map.get("story_heading_plain"),
      content.headingPlain
    );
    content.headingAccent = text(
      map.get("story_heading_accent"),
      content.headingAccent
    );
    content.description = text(
      map.get("story_description"),
      content.description
    );
    content.buttonText = text(map.get("story_button"), content.buttonText);

    content.details = content.details.map((d, i) => ({
      value: text(map.get(`story_detail_${i + 1}_value`), d.value),
      label: text(map.get(`story_detail_${i + 1}_label`), d.label),
    }));
  } catch (e) {
    console.error("site_content read failed, using defaults:", e);
  }

  return content;
}

export async function getStoryKey(key: string): Promise<string | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: "SELECT value FROM site_content WHERE key = ?",
    args: [key],
  });
  return res.rows.length > 0 ? String(res.rows[0].value) : null;
}
