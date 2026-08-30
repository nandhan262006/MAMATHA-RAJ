"use client";

import { formatBytes } from "./runImport";

export function UploadProgressBar({
  percent,
  bytesUploaded,
  bytesTotal,
}: {
  percent: number;
  bytesUploaded: number;
  bytesTotal: number;
}) {
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between gap-3 text-xs font-medium text-[#6B6259]">
        <span>Uploading…</span>
        <span className="shrink-0">
          {formatBytes(bytesUploaded)} / {formatBytes(bytesTotal)} — {percent}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#1A1714]/10">
        <div
          className="h-full rounded-full bg-[#C4552D] transition-all duration-200"
          style={{ width: `${Math.max(percent, 3)}%` }}
        />
      </div>
    </div>
  );
}
