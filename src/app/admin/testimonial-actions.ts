"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type TestimonialActionState =
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

export async function saveTestimonial(
  _prev: TestimonialActionState,
  formData: FormData
): Promise<TestimonialActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const id = Number(formData.get("id"));
  const quote = String(formData.get("quote") ?? "").trim().slice(0, 800);
  const author = String(formData.get("author") ?? "").trim().slice(0, 120);
  const role = String(formData.get("role") ?? "").trim().slice(0, 120);
  const ratioRaw = String(formData.get("ratio") ?? "").trim().slice(0, 20);

  if (!Number.isInteger(id) || id < 1) {
    return { status: "error", message: "Invalid testimonial." };
  }
  if (!quote) return { status: "error", message: "Quote cannot be empty." };
  if (!author) return { status: "error", message: "Author cannot be empty." };

  const ratio =
    /^\d+\s*\/\s*\d+$/.test(ratioRaw)
      ? ratioRaw.replace(/\s+/g, "")
      : "";

  try {
    await ensureSchema();
    await getDb().execute({
      sql: "UPDATE testimonials SET quote = ?, author = ?, role = ?, ratio = ? WHERE id = ?",
      args: [quote, author, role, ratio, id],
    });
  } catch (e) {
    console.error("testimonials update failed:", e);
    return { status: "error", message: "Saving failed. Check the database." };
  }

  revalidatePath("/");
  return { status: "success", message: "Testimonial saved." };
}

export async function replaceTestimonialImage(
  _prev: TestimonialActionState,
  formData: FormData
): Promise<TestimonialActionState> {
  const denied = await requireAuth();
  if (denied) return denied;

  const id = Number(formData.get("id"));
  const file = formData.get("file");

  if (!Number.isInteger(id) || id < 1) {
    return { status: "error", message: "Invalid testimonial." };
  }
  if (!(file instanceof File)) {
    return { status: "error", message: "No file selected." };
  }

  const uploaded = await uploadImage(file, "testimonials", { maxWidth: 900 });
  if (!uploaded.ok) return { status: "error", message: uploaded.error };

  try {
    await ensureSchema();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT image_url FROM testimonials WHERE id = ?",
      args: [id],
    });
    if (existing.rows.length === 0) {
      await deleteImage(uploaded.key).catch(() => {});
      return { status: "error", message: "Testimonial not found." };
    }

    const oldUrl = String(existing.rows[0].image_url);
    await db.execute({
      sql: "UPDATE testimonials SET image_url = ?, ratio = '' WHERE id = ?",
      args: [uploaded.url, id],
    });

    if (oldUrl) {
      const oldKey = parseKey(oldUrl);
      if (oldKey && oldKey !== uploaded.key) await deleteImage(oldKey);
    }
  } catch (e) {
    console.error("testimonials image write failed:", e);
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

export async function addTestimonial(): Promise<void> {
  if (!(await isAuthenticated())) return;

  try {
    await ensureSchema();
    const db = getDb();

    // Clean up any existing blank entries first
    await db.execute(
      `DELETE FROM testimonials
       WHERE quote = 'New testimonial' AND author = ''
         AND role = '' AND image_url = ''`
    );

    const existingBlank = await db.execute(
      `SELECT id FROM testimonials
       WHERE quote = 'New testimonial' AND author = ''
         AND role = '' AND image_url = ''
       LIMIT 1`
    );
    if (existingBlank.rows.length === 0) {
      await db.batch(
        [
          "UPDATE testimonials SET position = position + 1",
          {
            sql: `INSERT INTO testimonials (position, image_url, ratio, quote, author, role)
                  VALUES (
                    (SELECT COALESCE(MIN(position), 1) - 1 FROM testimonials),
                    '', '', 'New testimonial', '', ''
                  )`,
          },
        ],
        "write"
      );
    }
  } catch (e) {
    console.error("testimonials insert failed:", e);
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) return;

  try {
    await ensureSchema();

    const existing = await getDb().execute({
      sql: "SELECT image_url FROM testimonials WHERE id = ?",
      args: [id],
    });

    await getDb().execute({
      sql: "DELETE FROM testimonials WHERE id = ?",
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
    console.error("testimonials delete failed:", e);
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
