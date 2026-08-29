"use client";

import { useRef, useState } from "react";
import {
  runLocalImport,
  initialProgress,
  type Progress,
} from "./runImport";

export default function AddPhotoCard() {
  const [prog, setProg] = useState<Progress | null>(null);
  const busy = prog?.phase === "working";
  const inputRef = useRef<HTMLInputElement>(null);

  function start(files: FileList | File[]) {
    if (!files.length) return;
    setProg({ ...initialProgress });
    runLocalImport("photos", Array.from(files), (p) =>
      setProg((prev) => ({ ...(prev ?? initialProgress), ...p }))
    );
  }

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (busy) return;
          if (e.dataTransfer.files.length) start(e.dataTransfer.files);
        }}
        className={`flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-white/50 transition hover:border-[#C4552D] hover:bg-white ${
          busy ? "border-[#C4552D]" : "border-[#1A1714]/20"
        }`}
        onClick={() => !busy && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          multiple
          disabled={busy}
          onChange={(e) => {
            if (e.target.files?.length) start(e.target.files);
            e.target.value = "";
          }}
        />
        <span className="text-3xl text-[#C4552D]" aria-hidden>
          {busy ? "" : "+"}
        </span>
        {prog === null || prog.phase === "done" ? (
          <span className="px-4 text-center text-xs font-medium uppercase tracking-wider text-[#6B6259]">
            Add new photo
          </span>
        ) : null}
        {prog?.phase === "working" ? (
          <div className="w-full px-3">
            <div className="mb-1 text-center text-xs font-medium text-[#6B6259]">
              {prog.total > 0
                ? `${prog.done} / ${prog.total} — ${prog.percent}%`
                : "Uploading…"}
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
          <span className="px-4 text-center text-xs text-[#A3431F]">
            {prog.message}
          </span>
        ) : null}
        {prog?.phase === "done" ? (
          <span className="px-4 text-center text-xs font-medium text-green-700">
            {prog.message}
          </span>
        ) : null}
      </div>
    </>
  );
}
