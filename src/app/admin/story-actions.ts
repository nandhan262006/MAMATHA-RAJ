"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { finalizeUpload, deleteImage, deleteImageAndThumbFromUrl } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type StoryActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const IMAGE_KEYS = ["story_image", "story_small_image_1", "story_small_image_2"] as const;
export type StoryImageKey = (typeof IMAGE_KEYS)[number];

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

function isStoryImageKey(v: unknown): v is StoryImageKey {
  return typeof v === "string" && (IMAGE_KEYS as readonly string[]).includes(v);
}

async function setKey(key: string, value: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO site_content (key, value, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value,
            updated_at = excluded.updated_at`,
    args: [key, value, Date.now()],
  });
}

export async function saveStoryContent(
  _prev: StoryActionState,
  formData: FormData
): Promise<StoryActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const get = (name: string) => String(formData.get(name) ?? "").trim();

  const updates: [string, string][] = [
    ["story_label", get("label")],
    ["story_heading_plain", get("headingPlain")],
    ["story_heading_accent", get("headingAccent")],
    ["story_description", get("description")],
    ["story_button", get("buttonText")],
    ["story_detail_1_value", get("detail1Value")],
    ["story_detail_1_label", get("detail1Label")],
    ["story_detail_2_value", get("detail2Value")],
    ["story_detail_2_label", get("detail2Label")],
    ["story_detail_3_value", get("detail3Value")],
    ["story_detail_3_label", get("detail3Label")],
    ["story_detail_4_value", get("detail4Value")],
    ["story_detail_4_label", get("detail4Label")],
  ];

  try {
    await ensureSchema();
    const db = getDb();
    await db.batch(
      updates.map(([key, value]) => ({
        sql: `INSERT INTO site_content (key, value, updated_at)
              VALUES (?, ?, ?)
              ON CONFLICT(key) DO UPDATE SET value = excluded.value,
                updated_at = excluded.updated_at`,
        args: [key, value, Date.now()],
      })),
      "write"
    );
  } catch (e) {
    console.error("site_content write failed:", e);
    return { status: "error", message: "Saving failed. Check the database." };
  }

  revalidatePath("/");
  return { status: "success", message: "Featured story saved." };
}

export async function replaceStoryImage(
  _prev: StoryActionState,
  formData: FormData
): Promise<StoryActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const key = formData.get("imageKey");
  if (!isStoryImageKey(key)) {
    return { status: "error", message: "Unknown image slot." };
  }

  const rawKey = String(formData.get("key") ?? "").trim();
  if (!rawKey) {
    return { status: "error", message: "No file selected." };
  }

  const uploaded = await finalizeUpload(rawKey, "story", { maxWidth: 1600 });
  if (!uploaded.ok) return { status: "error", message: uploaded.error };

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT value FROM site_content WHERE key = ?",
      args: [key],
    });
    const oldUrl =
      existing.rows.length > 0 ? String(existing.rows[0].value) : null;

    await setKey(key, uploaded.url);

    if (oldUrl) {
      const oldKey = parseKey(oldUrl);
      if (oldKey && oldKey !== uploaded.key) await deleteImage(oldKey);
    }
  } catch (e) {
    console.error("site_content image write failed:", e);
    await deleteImage(uploaded.key).catch(() => {});
    return {
      status: "error",
      message:
        "Image uploaded to storage but saving failed. Check the database connection.",
    };
  }

  revalidatePath("/");
  return { status: "success", message: "Image updated." };
}

export async function resetStoryImage(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const key = formData.get("imageKey");
  if (!isStoryImageKey(key)) return;

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT value FROM site_content WHERE key = ?",
      args: [key],
    });
    if (existing.rows.length === 0) return;

    const oldUrl = String(existing.rows[0].value);
    await db.execute({
      sql: "DELETE FROM site_content WHERE key = ?",
      args: [key],
    });

    const oldKey = parseKey(oldUrl);
    if (oldKey) await deleteImage(oldKey);
  } catch (e) {
    console.error("site_content image reset failed:", e);
  }

  revalidatePath("/");
}

export async function deleteStoryPhoto(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) return;

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT src FROM story_photos WHERE id = ?",
      args: [id],
    });

    await db.execute({
      sql: "DELETE FROM story_photos WHERE id = ?",
      args: [id],
    });

    if (existing.rows.length > 0) {
      const oldKey = parseKey(String(existing.rows[0].src));
      if (oldKey) {
        await deleteImage(oldKey);
        await deleteImage(`${oldKey}.webp`);
      }
    }
  } catch (e) {
    console.error("story_photos delete failed:", e);
  }

  revalidateStoryPaths();
}

function parseIds(formData: FormData): number[] {
  try {
    const raw = JSON.parse(String(formData.get("ids") ?? "[]"));
    if (!Array.isArray(raw)) return [];
    return raw
      .map(Number)
      .filter((n) => Number.isInteger(n) && n > 0)
      .slice(0, 1000);
  } catch {
    return [];
  }
}

export async function deleteSelectedStoryPhotos(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const ids = parseIds(formData);
  if (ids.length === 0) return;

  try {
    await ensureSchema();
    const db = getDb();
    const placeholders = ids.map(() => "?").join(", ");
    const existing = await db.execute({
      sql: `SELECT id, src FROM story_photos WHERE id IN (${placeholders})`,
      args: ids,
    });

    await db.batch(
      ids.map((id) => ({
        sql: "DELETE FROM story_photos WHERE id = ?",
        args: [id],
      })),
      "write"
    );

    await Promise.all(
      existing.rows.map((r) => deleteImageAndThumbFromUrl(String(r.src)))
    );
  } catch (e) {
    console.error("story_photos batch delete failed:", e);
  }

  revalidateStoryPaths();
}

function revalidateStoryPaths() {
  revalidatePath("/");
  revalidatePath("/story");
}

export async function deleteAllStoryPhotos(): Promise<void> {
  if (!(await isAuthenticated())) return;

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute("SELECT src FROM story_photos");

    await db.execute("DELETE FROM story_photos");

    await Promise.all(
      existing.rows.map((r) => deleteImageAndThumbFromUrl(String(r.src)))
    );
  } catch (e) {
    console.error("story_photos delete all failed:", e);
  }

  revalidateStoryPaths();
}
