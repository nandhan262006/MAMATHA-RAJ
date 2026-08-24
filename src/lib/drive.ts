import "server-only";

export type DriveImage = { id: string; name: string };

export function parseDriveFolderId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  const m1 = s.match(/\/folders\/([a-zA-Z0-9_-]{10,})/);
  if (m1) return m1[1];
  const m2 = s.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (m2) return m2[1];
  if (/^[a-zA-Z0-9_-]{15,}$/.test(s)) return s;
  return null;
}

function requireApiKey(): string {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  if (!key || !key.trim()) {
    throw new Error(
      "GOOGLE_DRIVE_API_KEY is not set. Add it to .env.local and restart the server."
    );
  }
  return key.trim();
}

export async function listDriveImages(folderId: string): Promise<DriveImage[]> {
  const key = requireApiKey();
  const out: DriveImage[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      pageSize: "1000",
      fields: "nextPageToken, files(id, name, mimeType)",
      key,
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 404)
        throw new Error("Folder not found. Check the link and that it's shared publicly.");
      if (res.status === 403)
        throw new Error(
          "Access denied by Google. Make sure the folder is shared as 'Anyone with the link' and the Drive API key is valid."
        );
      throw new Error(`Google Drive error (${res.status}): ${body.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      nextPageToken?: string;
      files?: { id: string; name?: string; mimeType?: string }[];
    };
    for (const f of data.files ?? []) {
      if ((f.mimeType ?? "").startsWith("image/")) {
        out.push({ id: f.id, name: f.name || f.id });
      }
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return out;
}

export async function downloadDriveImage(id: string): Promise<File> {
  const key = requireApiKey();
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${key}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Download failed for a file (${res.status}).`);
  const blob = await res.blob();
  return new File([blob], id, { type: blob.type || "image/jpeg" });
}
