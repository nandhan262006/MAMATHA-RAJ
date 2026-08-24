"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type AboutActionState =
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

async function setKey(key: string, value: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO about_content (key, value, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value,
            updated_at = excluded.updated_at`,
    args: [key, value, Date.now()],
  });
}

export async function saveAboutContent(
  _prev: AboutActionState,
  formData: FormData
): Promise<AboutActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const get = (name: string) => String(formData.get(name) ?? "").trim();

  const updates: [string, string][] = [
    ["label", get("label")],
    ["heading", get("heading")],
    ["paragraph_1", get("paragraph1")],
    ["paragraph_2", get("paragraph2")],
    ["stat_1_value", get("stat1Value")],
    ["stat_1_label", get("stat1Label")],
    ["stat_2_value", get("stat2Value")],
    ["stat_2_label", get("stat2Label")],
    ["stat_3_value", get("stat3Value")],
    ["stat_3_label", get("stat3Label")],
  ];

  try {
    await ensureSchema();
    for (const [key, value] of updates) await setKey(key, value);
  } catch (e) {
    console.error("about_content write failed:", e);
    return { status: "error", message: "Saving failed. Check the database." };
  }

  revalidatePath("/");
  return { status: "success", message: "About section saved." };
}

export async function replaceAboutImage(
  _prev: AboutActionState,
  formData: FormData
): Promise<AboutActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { status: "error", message: "No file selected." };
  }

  const uploaded = await uploadImage(file, "about");
  if (!uploaded.ok) return { status: "error", message: uploaded.error };

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute(
      "SELECT value FROM about_content WHERE key = 'image_url'"
    );
    const oldUrl =
      existing.rows.length > 0 ? String(existing.rows[0].value) : null;

    await setKey("image_url", uploaded.url);

    if (oldUrl) {
      const oldKey = parseKey(oldUrl);
      if (oldKey && oldKey !== uploaded.key) await deleteImage(oldKey);
    }
  } catch (e) {
    console.error("about_content image write failed:", e);
    await deleteImage(uploaded.key).catch(() => {});
    return {
      status: "error",
      message:
        "Image uploaded to storage but saving failed. Check the database connection.",
    };
  }

  revalidatePath("/");
  return { status: "success", message: "About image updated." };
}

export async function resetAboutImage(): Promise<void> {
  if (!(await isAuthenticated())) return;

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute(
      "SELECT value FROM about_content WHERE key = 'image_url'"
    );
    if (existing.rows.length === 0) return;

    const oldUrl = String(existing.rows[0].value);
    await db.execute("DELETE FROM about_content WHERE key = 'image_url'");

    const oldKey = parseKey(oldUrl);
    if (oldKey) await deleteImage(oldKey);
  } catch (e) {
    console.error("about_content image reset failed:", e);
  }

  revalidatePath("/");
}
