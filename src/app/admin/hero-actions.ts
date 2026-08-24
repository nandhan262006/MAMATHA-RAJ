"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { HERO_SLOTS } from "@/lib/hero-images";
import { uploadImage, deleteImage } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type HeroActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function parseKey(url: string): string | null {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!base || !url.startsWith(`${base}/`)) return null;
  return url.slice(base.length + 1);
}

async function requireAuth() {
  if (!(await isAuthenticated())) {
    return { status: "error" as const, message: "Not signed in." };
  }
  return null;
}

export async function replaceHeroImage(
  _prev: HeroActionState,
  formData: FormData
): Promise<HeroActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const slot = Number(formData.get("slot"));
  const file = formData.get("file");

  if (!Number.isInteger(slot) || slot < 1 || slot > HERO_SLOTS) {
    return { status: "error", message: "Invalid slot." };
  }
  if (!(file instanceof File)) {
    return { status: "error", message: "No file selected." };
  }

  const uploaded = await uploadImage(file, "hero");
  if (!uploaded.ok) return { status: "error", message: uploaded.error };

  try {
    await ensureSchema();
    const db = getDb();

    const existing = await db.execute({
      sql: "SELECT url FROM hero_images WHERE slot = ?",
      args: [slot],
    });
    const oldUrl =
      existing.rows.length > 0 ? String(existing.rows[0].url) : null;

    await db.execute({
      sql: `INSERT INTO hero_images (slot, url, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(slot) DO UPDATE SET url = excluded.url,
              updated_at = excluded.updated_at`,
      args: [slot, uploaded.url, Date.now()],
    });

    if (oldUrl) {
      const oldKey = parseKey(oldUrl);
      if (oldKey && oldKey !== uploaded.key) await deleteImage(oldKey);
    }
  } catch (e) {
    console.error("hero_images write failed:", e);
    await deleteImage(uploaded.key).catch(() => {});
    return {
      status: "error",
      message:
        "Image uploaded to storage but saving failed. Check the database connection.",
    };
  }

  revalidatePath("/");
  return { status: "success", message: `Slot ${slot} updated.` };
}

export async function resetHeroImage(
  _prev: HeroActionState,
  formData: FormData
): Promise<HeroActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const slot = Number(formData.get("slot"));
  if (!Number.isInteger(slot) || slot < 1 || slot > HERO_SLOTS) {
    return { status: "error", message: "Invalid slot." };
  }

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT url FROM hero_images WHERE slot = ?",
      args: [slot],
    });

    if (existing.rows.length === 0) {
      return { status: "success", message: `Slot ${slot} is already original.` };
    }

    const oldUrl = String(existing.rows[0].url);
    await db.execute({
      sql: "DELETE FROM hero_images WHERE slot = ?",
      args: [slot],
    });

    const oldKey = parseKey(oldUrl);
    if (oldKey) await deleteImage(oldKey);
  } catch (e) {
    console.error("hero_images reset failed:", e);
    return { status: "error", message: "Reset failed. Check the database." };
  }

  revalidatePath("/");
  return { status: "success", message: `Slot ${slot} restored to original.` };
}
