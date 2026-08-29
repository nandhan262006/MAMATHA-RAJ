"use client";

import { useState } from "react";
import { runDriveImport, type Progress } from "./runImport";

export default function DriveImportForm({ target }: { target: "photos" | "story" }) {
  const [url, setUrl] = useState("");
  const [prog, setProg] = useState<Progress | null>(null);
  const busy = prog?.phase === "working";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || busy) return;
    const link = url.trim();
    setProg({
      phase: "working",
      percent: 0,
      done: 0,
      total: 0,
      name: "Reading Drive folder…",
    });
    runDriveImport(target, link, (p) =>
      setProg((prev) => ({
        ...(prev ?? {
          phase: "working",
          percent: 0,
          done: 0,
          total: 0,
          name: "",
        }),
        ...p,
      }))
    );
  }

  return (
    <div className="space-y-2">
      <form
        onSubmit={submit}
        className="flex flex-wrap items-center gap-3 rounded-xl border border-[#1A1714]/10 bg-white p-4"
      >
        <div className="min-w-0 flex-1">
          <label
            htmlFor={`drive-url-${target}`}
            className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]"
          >
            Google Drive folder link (shared as “Anyone with the link”)
          </label>
          <input
            type="url"
            name="url"
            required
            value={url}
            disabled={busy}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://drive.google.com/drive/folders/…"
            className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm text-[#1A1714] outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 self-end rounded-lg bg-[#C4552D] px-4 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
        >
          {busy ? "Importing…" : "Import"}
        </button>
      </form>

      {prog && prog.phase === "working" ? (
        <div className="rounded-xl border border-[#1A1714]/10 bg-white p-3">
          <div className="mb-1 flex justify-between text-xs font-medium text-[#6B6259]">
            <span className="truncate pr-3">
              {prog.name.startsWith("Reading") || !prog.total
                ? prog.name || "Working…"
                : `${prog.name}`}
            </span>
            <span className="shrink-0">
              {prog.total > 0
                ? `${prog.done} / ${prog.total} — ${prog.percent}%`
                : ""}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#1A1714]/10">
            <div
              className="h-full rounded-full bg-[#C4552D] transition-all duration-300"
              style={{ width: `${Math.max(prog.percent, 3)}%` }}
            />
          </div>
        </div>
      ) : null}
      {prog?.phase === "error" ? (
        <p className="text-xs text-[#A3431F]">{prog.message}</p>
      ) : null}
      {prog?.phase === "done" ? (
        <p className="text-xs font-medium text-green-700">{prog.message}</p>
      ) : null}

      <p className="max-w-xl text-xs leading-relaxed text-[#6B6259]/80">
        Every image in the folder is copied into your own storage — up to 500
        per import, five at a time.
      </p>
    </div>
  );
}
