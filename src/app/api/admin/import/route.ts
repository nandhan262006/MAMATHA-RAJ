import { NextRequest } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";
import { uploadImage, finalizeUpload } from "@/lib/r2";
import {
  listDriveImages,
  downloadDriveImage,
  parseDriveFolderId,
} from "@/lib/drive";
import { isAuthenticated } from "@/lib/session";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const CONCURRENCY = 5;
const DRIVE_IMPORT_CAP = 500;

type Line =
  | { type: "start"; total: number }
  | {
      type: "progress";
      done: number;
      total: number;
      added: number;
      failed: number;
      name: string;
    }
  | { type: "done"; message: string }
  | { type: "error"; message: string };

function sse(line: Line): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(line) + "\n");
}

async function runPool<T>(
  items: T[],
  fn: (item: T, index: number) => Promise<void>
): Promise<void> {
  let idx = 0;
  const workers = Array.from(
    { length: Math.min(CONCURRENCY, items.length) },
    async () => {
      while (idx < items.length) {
        const i = idx++;
        await fn(items[i], i);
      }
    }
  );
  await Promise.all(workers);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const formData = await req.formData();
  const target = String(formData.get("target") ?? "");
  if (target !== "photos" && target !== "story") {
    return Response.json({ error: "Invalid target." }, { status: 400 });
  }

  const keysRaw = String(formData.get("keys") ?? "").trim();
  const clientFailed = Number(formData.get("failed") ?? 0) || 0;

  let keys: string[] = [];
  if (keysRaw) {
    try {
      const parsed = JSON.parse(keysRaw);
      if (Array.isArray(parsed)) {
        keys = parsed.filter((k): k is string => typeof k === "string");
      }
    } catch {
      keys = [];
    }
  }

  const driveUrl = String(formData.get("url") ?? "").trim();

  if (keys.length === 0 && !driveUrl) {
    return Response.json({ error: "Nothing to import." }, { status: 400 });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const push = (line: Line) => controller.enqueue(sse(line));
      try {
        await ensureSchema();
        const db = getDb();

        let items: { name: string; load: () => Promise<File> }[] = [];

        if (keys.length > 0) {
          items = keys.map((k) => ({
            name: k,
            load: () => Promise.reject(new Error("unused")),
          }));
        } else {
          const folderId = parseDriveFolderId(driveUrl);
          if (!folderId) throw new Error("Paste a valid Google Drive folder link.");

          let images;
          try {
            images = await listDriveImages(folderId);
          } catch (e) {
            throw new Error(
              e instanceof Error ? e.message : "Could not read that Drive folder."
            );
          }
          if (images.length === 0) throw new Error("That folder has no images in it.");

          items = images.slice(0, DRIVE_IMPORT_CAP).map((img) => ({
            name: img.name,
            load: () => downloadDriveImage(img.id),
          }));
        }

        const total = items.length;
        push({ type: "start", total });

        const table = target === "photos" ? "photos" : "story_photos";
        const folder = target === "photos" ? "gallery" : "story/gallery";

        const maxPos = await db.execute(
          `SELECT COALESCE(MAX(position), -1) AS p FROM ${table}`
        );
        const basePos = Number(maxPos.rows[0].p) + 1;

        const rows: { src: string; thumb: string | null; position: number }[] =
          [];
        let done = 0;
        let failed = 0;

        await runPool(items, async (item, i) => {
          try {
            let uploaded;
            if (keys.length > 0) {
              uploaded = await finalizeUpload(item.name, folder, { thumb: true });
            } else {
              const file = await item.load();
              uploaded = await uploadImage(file, folder, { thumb: true });
            }
            if (!uploaded.ok) {
              failed++;
            } else {
              rows.push({
                src: uploaded.url,
                thumb: uploaded.thumbUrl ?? null,
                position: basePos + i,
              });
            }
          } catch (e) {
            console.error("import item failed:", item.name, e);
            failed++;
          }
          done++;
          push({
            type: "progress",
            done,
            total,
            added: rows.length,
            failed,
            name: item.name,
          });
        });

        for (let i = 0; i < rows.length; i += 50) {
          const chunk = rows.slice(i, i + 50);
          await db.batch(
            chunk.map((r) => ({
              sql:
                target === "photos"
                  ? `INSERT INTO photos (src, thumb, featured, position) VALUES (?, ?, 0, ?)`
                  : `INSERT INTO story_photos (src, thumb, position) VALUES (?, ?, ?)`,
              args:
                target === "photos"
                  ? [r.src, r.thumb, r.position]
                  : [r.src, r.thumb, r.position],
            })),
            "write"
          );
        }

        const { revalidatePath } = await import("next/cache");
        revalidatePath("/");
        revalidatePath(target === "photos" ? "/portfolio" : "/story");
        revalidatePath(target === "photos" ? "/admin/portfolio" : "/admin/story");

        const skipped = total - rows.length - failed;
        const parts = [
          `Imported ${rows.length} photo${rows.length === 1 ? "" : "s"}.`,
        ];
        if (skipped > 0) parts.push(`${skipped} skipped.`);
        const totalFailed = failed + clientFailed;
        if (totalFailed > 0) parts.push(`${totalFailed} failed.`);
        push({
          type: "done",
          message: parts.join(" "),
        });
      } catch (e) {
        console.error("import stream failed:", e);
        push({
          type: "error",
          message:
            e instanceof Error ? e.message : "Import failed. Try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
