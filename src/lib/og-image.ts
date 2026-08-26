import "server-only";
import { getDb, ensureSchema } from "@/lib/db";

export const OG_IMAGE_DEFAULT = "/og-image.jpg";

export type OgImage = {
  url: string;
  isCustom: boolean;
};

export async function getOgImage(): Promise<OgImage> {
  try {
    await ensureSchema();
    const res = await getDb().execute(
      "SELECT value FROM site_content WHERE key = 'og_image_url'"
    );
    if (res.rows.length > 0) {
      const v = String(res.rows[0].value).trim();
      if (v) return { url: v, isCustom: true };
    }
  } catch (e) {
    console.error("og_image read failed, using default:", e);
  }
  return { url: OG_IMAGE_DEFAULT, isCustom: false };
}
