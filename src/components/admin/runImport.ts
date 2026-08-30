"use client";

import { uploadToR2 } from "@/lib/upload-client";

export type Progress = {
  phase: "working" | "error" | "done";
  percent: number;
  done: number;
  total: number;
  name: string;
  message?: string;
  bytesUploaded?: number;
  bytesTotal?: number;
};

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export const initialProgress: Progress = {
  phase: "working",
  percent: 0,
  done: 0,
  total: 0,
  name: "",
};

async function streamImport(
  fd: FormData,
  onProgress: (p: Partial<Progress>) => void
): Promise<void> {
  onProgress({ bytesUploaded: undefined, bytesTotal: undefined });
  try {
    const res = await fetch("/api/admin/import", { method: "POST", body: fd });
    if (!res.ok || !res.body) {
      let msg = `Import failed (${res.status}).`;
      try {
        const j = await res.json();
        if (j?.error) msg = String(j.error);
      } catch {}
      onProgress({ phase: "error", message: msg });
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const evt = JSON.parse(line);
          if (evt.type === "start") {
            onProgress({ total: evt.total, done: 0, percent: 0 });
          } else if (evt.type === "progress") {
            onProgress({
              done: evt.done,
              total: evt.total,
              percent: Math.round((evt.done / Math.max(evt.total, 1)) * 100),
              name: evt.name,
            });
          } else if (evt.type === "done") {
            onProgress({ phase: "done", percent: 100, message: evt.message });
          } else if (evt.type === "error") {
            onProgress({ phase: "error", message: evt.message });
          }
        } catch {}
      }
    }

    if (buffer.trim()) {
      try {
        const evt = JSON.parse(buffer);
        if (evt.type === "done")
          onProgress({ phase: "done", percent: 100, message: evt.message });
        if (evt.type === "error")
          onProgress({ phase: "error", message: evt.message });
      } catch {}
    }
  } catch {
    onProgress({ phase: "error", message: "Connection lost during import." });
  }
}

export async function runDriveImport(
  target: "photos" | "story",
  url: string,
  onProgress: (p: Partial<Progress>) => void
): Promise<void> {
  const fd = new FormData();
  fd.set("target", target);
  fd.set("url", url);

  onProgress({ phase: "working", percent: 0, message: undefined });
  await streamImport(fd, onProgress);
}

const UPLOAD_CONCURRENCY = 4;

export async function runLocalImport(
  target: "photos" | "story",
  files: File[],
  onProgress: (p: Partial<Progress>) => void
): Promise<void> {
  const total = files.length;
  const results: (string | null)[] = new Array(total).fill(null);
  const bytes: number[] = new Array(total).fill(0);
  const totalBytes = files.reduce((s, f) => s + f.size, 0);
  let failed = 0;
  let done = 0;

  onProgress({
    phase: "working",
    percent: 0,
    total,
    done: 0,
    bytesTotal: totalBytes,
    bytesUploaded: 0,
  });

  let idx = 0;
  const workers = Array.from(
    { length: Math.min(UPLOAD_CONCURRENCY, total) },
    async () => {
      while (true) {
        const i = idx++;
        if (i >= total) break;
        const file = files[i];
        const res = await uploadToR2(file, (loaded) => {
          bytes[i] = loaded;
          const uploadedBytes = bytes.reduce((s, b) => s + b, 0);
          onProgress({
            name: file.name,
            done,
            total,
            bytesUploaded: uploadedBytes,
            bytesTotal: totalBytes,
            percent:
              totalBytes > 0
                ? Math.round((uploadedBytes / totalBytes) * 100)
                : Math.round((done / total) * 100),
          });
        });
        if (res.ok) results[i] = res.key;
        else failed++;
        done++;
        onProgress({
          done,
          total,
          name: file.name,
        });
      }
    }
  );
  await Promise.all(workers);

  const keys = results.filter((k): k is string => k !== null);

  const fd = new FormData();
  fd.set("target", target);
  fd.set("keys", JSON.stringify(keys));
  fd.set("failed", String(failed));

  await streamImport(fd, onProgress);
}
