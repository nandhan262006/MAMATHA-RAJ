"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type ServiceActionState =
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

export async function saveService(
  _prev: ServiceActionState,
  formData: FormData
): Promise<ServiceActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const id = Number(formData.get("id"));
  const category = String(formData.get("category") ?? "").trim().slice(0, 80);
  const title = String(formData.get("title") ?? "").trim().slice(0, 120);
  const description = String(formData.get("description") ?? "").trim().slice(0, 600);

  if (!Number.isInteger(id) || id < 1) {
    return { status: "error", message: "Invalid service card." };
  }
  if (!title) return { status: "error", message: "Title cannot be empty." };

  try {
    await ensureSchema();
    await getDb().execute({
      sql: "UPDATE services SET category = ?, title = ?, description = ? WHERE id = ?",
      args: [category, title, description, id],
    });
  } catch (e) {
    console.error("services update failed:", e);
    return { status: "error", message: "Saving failed. Check the database." };
  }

  revalidatePath("/");
  return { status: "success", message: "Card saved." };
}

export async function replaceServiceImage(
  _prev: ServiceActionState,
  formData: FormData
): Promise<ServiceActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const id = Number(formData.get("id"));
  const file = formData.get("file");

  if (!Number.isInteger(id) || id < 1) {
    return { status: "error", message: "Invalid service card." };
  }
  if (!(file instanceof File)) {
    return { status: "error", message: "No file selected." };
  }

  const uploaded = await uploadImage(file, "services");
  if (!uploaded.ok) return { status: "error", message: uploaded.error };

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT image_url FROM services WHERE id = ?",
      args: [id],
    });
    if (existing.rows.length === 0) {
      await deleteImage(uploaded.key).catch(() => {});
      return { status: "error", message: "Service card not found." };
    }

    const oldUrl = String(existing.rows[0].image_url);
    await db.execute({
      sql: "UPDATE services SET image_url = ? WHERE id = ?",
      args: [uploaded.url, id],
    });

    if (oldUrl) {
      const oldKey = parseKey(oldUrl);
      if (oldKey && oldKey !== uploaded.key) await deleteImage(oldKey);
    }
  } catch (e) {
    console.error("services image write failed:", e);
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

export async function addService(): Promise<void> {
  if (!(await isAuthenticated())) return;

  try {
    await ensureSchema();
    const db = getDb();

    const existingBlank = await db.execute(
      `SELECT id FROM services
       WHERE title = 'New Service' AND category = ''
         AND description = '' AND image_url = ''
       LIMIT 1`
    );
    if (existingBlank.rows.length === 0) {
      await db.batch(
        [
          "UPDATE services SET position = position + 1",
          {
            sql: `INSERT INTO services (position, category, title, description, image_url)
                  VALUES (
                    (SELECT COALESCE(MIN(position), 1) - 1 FROM services),
                    '', 'New Service', '', ''
                  )`,
          },
        ],
        "write"
      );
    }
  } catch (e) {
    console.error("services insert failed:", e);
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) return;

  try {
    await ensureSchema();

    const existing = await getDb().execute({
      sql: "SELECT image_url FROM services WHERE id = ?",
      args: [id],
    });

    await getDb().execute({
      sql: "DELETE FROM services WHERE id = ?",
      args: [id],
    });

    if (existing.rows.length > 0) {
      const oldUrl = String(existing.rows[0].image_url);
      const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
      if (base && oldUrl.startsWith(`${base}/`)) {
        await deleteImage(oldUrl.slice(base.length + 1));
      }
    }
  } catch (e) {
    console.error("services delete failed:", e);
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
}
