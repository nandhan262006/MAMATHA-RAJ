import { createClient } from "@libsql/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });
const s3 = new S3Client({
  region: "auto",
  endpoint: env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});
const BASE = env.R2_PUBLIC_URL.replace(/\/$/, "");
const BUCKET = "mamatharaj";
const WIDTH = 800;

async function backfill(table) {
  const cols = await db.execute(`PRAGMA table_info(${table})`);
  if (!cols.rows.some((r) => String(r.name) === "thumb")) {
    await db.execute(`ALTER TABLE ${table} ADD COLUMN thumb TEXT`);
  }
  const res = await db.execute(
    `SELECT id, src FROM ${table} WHERE thumb IS NULL AND src LIKE '${BASE}/%'`
  );
  console.log(`${table}: ${res.rows.length} photos need thumbs`);
  let idx = 0;
  let ok = 0;

  async function worker() {
    while (idx < res.rows.length) {
      const row = res.rows[idx++];
      const key = String(row.src).slice(BASE.length + 1);
      try {
        const r = await fetch(String(row.src));
        if (!r.ok) throw new Error(`fetch ${r.status}`);
        const body = Buffer.from(await r.arrayBuffer());
        const thumbBody = await sharp(body)
          .rotate()
          .resize({ width: WIDTH, withoutEnlargement: true })
          .webp({ quality: 72 })
          .toBuffer();
        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: `${key}.webp`,
            Body: thumbBody,
            ContentType: "image/webp",
            CacheControl: "public, max-age=31536000, immutable",
          })
        );
        await db.execute({
          sql: `UPDATE ${table} SET thumb = ? WHERE id = ?`,
          args: [`${BASE}/${key}.webp`, row.id],
        });
        ok++;
      } catch (e) {
        console.error(`failed ${table}#${row.id}:`, e.message);
      }
    }
  }

  await Promise.all(Array.from({ length: 5 }, worker));
  console.log(`${table}: ${ok}/${res.rows.length} done`);
}

await backfill("story_photos");
await backfill("photos");
console.log("backfill complete");
process.exit(0);
