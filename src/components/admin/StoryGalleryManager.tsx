"use client";

import { useRef, useState } from "react";
import {
  deleteStoryPhoto,
  deleteSelectedStoryPhotos,
  deleteAllStoryPhotos,
} from "@/app/admin/story-actions";
import type { StoryPhoto } from "@/lib/story-photos";
import {
  runLocalImport,
  initialProgress,
  type Progress,
} from "./runImport";
import {
  SelectCheckbox,
  SelectionDeleteBar,
  useBatchDelete,
} from "./selection";

export default function StoryGalleryManager({
  photos,
}: {
  photos: StoryPhoto[];
}) {
  const [prog, setProg] = useState<Progress | null>(null);
  const busy = prog?.phase === "working";
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [deletingAll, setDeletingAll] = useState(false);
  const { pending: deleting, remove } = useBatchDelete(async (ids) => {
    const fd = new FormData();
    fd.set("ids", JSON.stringify(ids));
    await deleteSelectedStoryPhotos(fd);
  }, () => setSelected(new Set()));

  async function handleDeleteAll() {
    if (!window.confirm(`Delete all ${photos.length} photos permanently? This cannot be undone.`)) return;
    setDeletingAll(true);
    try {
      await deleteAllStoryPhotos();
    } finally {
      setDeletingAll(false);
    }
  }

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function start(files: FileList | File[]) {
    if (!files.length) return;
    setProg({ ...initialProgress });
    runLocalImport("story", Array.from(files), (p) =>
      setProg((prev) => ({ ...(prev ?? initialProgress), ...p }))
    );
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (busy) return;
          if (e.dataTransfer.files.length) start(e.dataTransfer.files);
        }}
        className={`flex flex-wrap items-center gap-3 rounded-xl border border-[#1A1714]/10 bg-white p-4 ${
          busy ? "border-[#C4552D]" : ""
        }`}
      >
        {busy ? (
          <div className="w-full">
            <div className="mb-1 flex justify-between text-xs font-medium text-[#6B6259]">
              <span className="truncate pr-3">{prog.name || "Uploading…"}</span>
              <span>
                {prog.total > 0 ? `${prog.done} / ${prog.total} — ${prog.percent}%` : ""}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#1A1714]/10">
              <div
                className="h-full rounded-full bg-[#C4552D] transition-all duration-300"
                style={{ width: `${Math.max(prog.percent, 3)}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <span className="text-xs text-[#6B6259]/70">
              Choose files or drag &amp; drop them here
            </span>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="text-sm text-[#6B6259]"
              onChange={(e) => {
                if (e.target.files?.length) start(e.target.files);
                e.target.value = "";
              }}
            />
          </>
        )}
        {prog?.phase === "error" ? (
          <p className="w-full text-xs text-[#A3431F]">{prog.message}</p>
        ) : null}
        {prog?.phase === "done" ? (
          <p className="w-full text-xs font-medium text-green-700">
            {prog.message}
          </p>
        ) : null}
      </div>

      <SelectionDeleteBar
        count={selected.size}
        total={photos.length}
        pending={deleting}
        onDelete={() => remove([...selected], "photo")}
        onClear={() => setSelected(new Set())}
        onSelectAll={() => setSelected(new Set(photos.map((p) => p.id)))}
      />

      {photos.length > 0 && selected.size === 0 ? (
        <div className="flex items-center justify-between rounded-xl border border-[#A3431F]/20 bg-white px-4 py-2.5">
          <span className="text-xs text-[#6B6259]">{photos.length} photo{photos.length === 1 ? "" : "s"} in gallery</span>
          <button
            type="button"
            onClick={handleDeleteAll}
            disabled={deletingAll || busy}
            className="rounded-lg bg-[#A3431F] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#8a3719] disabled:opacity-60"
          >
            {deletingAll ? "Deleting…" : "Delete all"}
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((p, i) => (
          <div
            key={p.id}
            className={`group relative overflow-hidden rounded-xl border bg-[#2C2824] ${
              selected.has(p.id)
                ? "border-[#C4552D]"
                : "border-[#1A1714]/10"
            }`}
            style={{ aspectRatio: "3/4" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.thumb || p.src}
              alt={`Wedding photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover ${
                selected.size > 0 ? "opacity-80" : ""
              }`}
            />
            <SelectCheckbox
              checked={selected.has(p.id)}
              onChange={() => toggle(p.id)}
              label={`Select wedding photo ${i + 1}`}
            />
            {!selected.size ? (
              <form action={deleteStoryPhoto} className="absolute right-2 top-2 z-10">
                <input type="hidden" name="id" value={p.id} />
                <button
                  type="submit"
                  className="rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white transition hover:bg-[#A3431F]"
                >
                  Remove
                </button>
              </form>
            ) : null}
          </div>
        ))}
      </div>
      <p className="max-w-md text-xs leading-relaxed text-[#6B6259]/80">
        These photos appear on the /story wedding gallery page, shown when
        visitors click “View Full Gallery” in the featured story section.
        Click the checkbox on photos to select several for deletion.
      </p>
    </div>
  );
}
