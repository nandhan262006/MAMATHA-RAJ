"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { finalizeUpload, deleteImage } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type OgImageActionState =
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

export async function replaceOgImage(
  _prev: OgImageActionState,
  formData: FormData
): Promise<OgImageActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const key = String(formData.get("key") ?? "").trim();
  if (!key) {
    return { status: "error", message: "No file selected." };
  }

  const uploaded = await finalizeUpload(key, "og", { maxWidth: 1200 });
  if (!uploaded.ok) return { status: "error", message: uploaded.error };

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute(
      "SELECT value FROM site_content WHERE key = 'og_image_url'"
    );
    const oldUrl =
      existing.rows.length > 0 ? String(existing.rows[0].value) : null;

    await db.execute({
      sql: `INSERT INTO site_content (key, value, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value,
              updated_at = excluded.updated_at`,
      args: ["og_image_url", uploaded.url, Date.now()],
    });

    if (oldUrl) {
      const oldKey = parseKey(oldUrl);
      if (oldKey && oldKey !== uploaded.key) await deleteImage(oldKey);
    }
  } catch (e) {
    console.error("og_image write failed:", e);
    await deleteImage(uploaded.key).catch(() => {});
    return {
      status: "error",
      message:
        "Image uploaded to storage but saving failed. Check the database connection.",
    };
  }

  revalidatePath("/");
  revalidatePath("/og-image");
  return { status: "success", message: "Social share image updated." };
}

export async function resetOgImage(): Promise<void> {
  if (!(await isAuthenticated())) return;

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute(
      "SELECT value FROM site_content WHERE key = 'og_image_url'"
    );
    if (existing.rows.length === 0) return;

    const oldUrl = String(existing.rows[0].value);
    await db.execute("DELETE FROM site_content WHERE key = 'og_image_url'");

    const oldKey = parseKey(oldUrl);
    if (oldKey) await deleteImage(oldKey);
  } catch (e) {
    console.error("og_image reset failed:", e);
  }

  revalidatePath("/");
  revalidatePath("/og-image");
}
