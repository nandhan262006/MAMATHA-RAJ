"use server";

import { revalidatePath } from "next/cache";
import { getDb, ensureSchema } from "@/lib/db";
import { deleteImageAndThumbFromUrl } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export type PortfolioActionState =
  | { status: "idle" }
  | { status: "success"; message: string; id: number; featured: boolean }
  | { status: "error"; message: string };

function revalidatePortfolio() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

export async function setPhotoFeatured(
  _prev: PortfolioActionState,
  formData: FormData
): Promise<PortfolioActionState> {
  if (!(await isAuthenticated())) {
    return { status: "error", message: "Not signed in." };
  }

  const id = Number(formData.get("id"));
  const featured = String(formData.get("featured")) === "1";

  if (!Number.isInteger(id) || id < 1) {
    return { status: "error", message: "Invalid photo." };
  }

  try {
    await ensureSchema();
    await getDb().execute({
      sql: "UPDATE photos SET featured = ? WHERE id = ?",
      args: [featured ? 1 : 0, id],
    });
  } catch (e) {
    console.error("photos update failed:", e);
    return { status: "error", message: "Update failed. Check the database." };
  }

  revalidatePortfolio();
  return {
    status: "success",
    message: featured ? "Added to homepage" : "Removed from homepage",
    id,
    featured,
  };
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

export async function deleteSelectedPhotos(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const ids = parseIds(formData);
  if (ids.length === 0) return;

  try {
    await ensureSchema();
    const db = getDb();
    const placeholders = ids.map(() => "?").join(", ");
    const existing = await db.execute({
      sql: `SELECT id, src FROM photos WHERE id IN (${placeholders})`,
      args: ids,
    });

    await db.batch(
      ids.map((id) => ({
        sql: "DELETE FROM photos WHERE id = ?",
        args: [id],
      })),
      "write"
    );

    await Promise.all(
      existing.rows.map((r) => deleteImageAndThumbFromUrl(String(r.src)))
    );
  } catch (e) {
    console.error("photos batch delete failed:", e);
  }

  revalidatePortfolio();
}
