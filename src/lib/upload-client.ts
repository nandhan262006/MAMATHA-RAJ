"use client";

export type ClientUploadResult =
  | { ok: true; key: string }
  | { ok: false; error: string };

const MAX_BYTES = 40 * 1024 * 1024;

export async function uploadToR2(
  file: File
): Promise<ClientUploadResult> {
  if (file.size === 0) return { ok: false, error: "Empty file." };
  if (file.size > MAX_BYTES)
    return { ok: false, error: "File too large (max 40 MB)." };

  try {
    const presignRes = await fetch("/api/admin/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type || "image/jpeg" }),
    });
    if (!presignRes.ok) {
      const j = await presignRes.json().catch(() => ({}));
      return { ok: false, error: j?.error || "Could not start upload." };
    }

    const { uploadUrl, key } = await presignRes.json();

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "image/jpeg" },
      body: file,
    });
    if (!putRes.ok) {
      return { ok: false, error: "Upload to storage failed. Try again." };
    }

    return { ok: true, key };
  } catch {
    return { ok: false, error: "Connection lost during upload." };
  }
}
