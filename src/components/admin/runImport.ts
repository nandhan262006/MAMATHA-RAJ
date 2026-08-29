"use client";

import { uploadToR2 } from "@/lib/upload-client";

export type Progress = {
  phase: "working" | "error" | "done";
  percent: number;
  done: number;
  total: number;
  name: string;
  message?: string;
};

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

export async function runLocalImport(
  target: "photos" | "story",
  files: File[],
  onProgress: (p: Partial<Progress>) => void
): Promise<void> {
  const total = files.length;
  const keys: string[] = [];
  let failed = 0;

  onProgress({ phase: "working", percent: 0, total, done: 0 });

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress({
      name: file.name,
      done: i,
      total,
      percent: Math.round((i / total) * 100),
    });

    const res = await uploadToR2(file);
    if (res.ok) keys.push(res.key);
    else failed++;

    onProgress({
      done: i + 1,
      total,
      percent: Math.round(((i + 1) / total) * 100),
    });
  }

  const fd = new FormData();
  fd.set("target", target);
  fd.set("keys", JSON.stringify(keys));
  fd.set("failed", String(failed));

  await streamImport(fd, onProgress);
}
