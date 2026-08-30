"use client";

export type ClientUploadResult =
  | { ok: true; key: string }
  | { ok: false; error: string };

const MAX_BYTES = 40 * 1024 * 1024;

function putWithProgress(
  uploadUrl: string,
  file: File,
  contentType: string,
  onProgress?: (loaded: number, total: number) => void
): Promise<{ ok: boolean; status: number; body: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl, true);
    xhr.setRequestHeader("Content-Type", contentType);
    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(e.loaded, e.total);
      };
    }
    xhr.onload = () =>
      resolve({
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        body: xhr.responseText,
      });
    xhr.onerror = () =>
      resolve({ ok: false, status: 0, body: "Network error" });
    xhr.onabort = () => resolve({ ok: false, status: 0, body: "Aborted" });
    xhr.send(file);
  });
}

export async function uploadToR2(
  file: File,
  onProgress?: (loaded: number, total: number) => void
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
      return { ok: false, error: j?.error || `Could not start upload (${presignRes.status}).` };
    }

    const { uploadUrl, key } = await presignRes.json();

    const put = await putWithProgress(
      uploadUrl,
      file,
      file.type || "image/jpeg",
      onProgress
    );

    if (!put.ok) {
      if (put.status === 0) {
        return {
          ok: false,
          error: "Upload blocked — check the R2 bucket CORS policy (network/CORS error).",
        };
      }
      return {
        ok: false,
        error: `Upload to storage failed (${put.status}) ${put.body.slice(0, 200)}`,
      };
    }

    return { ok: true, key };
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    console.error("uploadToR2 failed:", e);
    return { ok: false, error: `Upload failed: ${reason}` };
  }
}
