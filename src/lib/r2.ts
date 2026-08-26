import "server-only";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

function getS3(): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
    },
  });
}

const BUCKET = "mamatharaj";
const MAX_BYTES = 15 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export type UploadResult =
  | { ok: true; url: string; key: string; thumbUrl?: string }
  | { ok: false; error: string };

const THUMB_WIDTH = 800;

async function uploadThumb(body: Buffer, key: string): Promise<string | undefined> {
  try {
    const thumbBody = await sharp(body)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toBuffer();
    const thumbKey = `${key}.webp`;
    await getS3().send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: thumbKey,
        Body: thumbBody,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "") ?? "";
    return `${base}/${thumbKey}`;
  } catch (e) {
    console.error("R2 thumb upload failed:", e);
    return undefined;
  }
}

export type UploadOptions = { thumb?: boolean; maxWidth?: number };

const ENCODE_QUALITY: Record<string, number> = {
  jpg: 82,
  webp: 82,
  avif: 65,
};

async function optimizeBody(
  body: Buffer,
  ext: string,
  maxWidth: number
): Promise<Buffer> {
  try {
    const img = sharp(body).rotate();
    const meta = await img.metadata();
    if (meta.width && meta.width <= maxWidth) return body;

    const resized = img.resize({ width: maxWidth, withoutEnlargement: true });
    if (ext === "png") {
      return await resized.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
    }
    if (ext === "jpg") {
      return await resized.jpeg({ quality: ENCODE_QUALITY.jpg, mozjpeg: true }).toBuffer();
    }
    if (ext === "webp") {
      return await resized.webp({ quality: ENCODE_QUALITY.webp }).toBuffer();
    }
    if (ext === "avif") {
      return await resized.avif({ quality: ENCODE_QUALITY.avif }).toBuffer();
    }
    return await resized.toBuffer();
  } catch (e) {
    console.error("image optimization failed, using original:", e);
    return body;
  }
}

export async function uploadImage(
  file: File,
  folder: string,
  opts?: UploadOptions
): Promise<UploadResult> {
  if (file.size === 0) return { ok: false, error: "Empty file." };
  if (file.size > MAX_BYTES)
    return { ok: false, error: "File too large (max 15 MB)." };

  const ext = ALLOWED_TYPES[file.type];
  if (!ext)
    return {
      ok: false,
      error: `Unsupported format (${file.type || "unknown"}). Use JPG, PNG, WebP or AVIF.`,
    };

  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const raw = Buffer.from(await file.arrayBuffer());
    const body = opts?.maxWidth
      ? await optimizeBody(raw, ext, opts.maxWidth)
      : raw;
    await getS3().send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "") ?? "";
    const thumbUrl = opts?.thumb ? await uploadThumb(body, key) : undefined;
    return { ok: true, url: `${base}/${key}`, key, thumbUrl };
  } catch (e) {
    console.error("R2 upload failed:", e);
    return { ok: false, error: "Upload to storage failed. Try again." };
  }
}

export async function deleteImage(key: string): Promise<void> {
  try {
    await getS3().send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (e) {
    console.error("R2 delete failed:", e);
  }
}

export async function deleteImageFromUrl(url: string): Promise<void> {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!base || !url.startsWith(`${base}/`)) return;
  await deleteImage(url.slice(base.length + 1));
}

export async function deleteImageAndThumbFromUrl(url: string): Promise<void> {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!base || !url.startsWith(`${base}/`)) return;
  const key = url.slice(base.length + 1);
  await deleteImage(key);
  await deleteImage(`${key}.webp`);
}
