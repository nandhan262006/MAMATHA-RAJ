"use client";

import { useState } from "react";
import { deleteSelectedPhotos } from "@/app/admin/portfolio-actions";
import type { Photo } from "@/lib/photos";
import PhotoToggleCard from "./PhotoToggleCard";
import AddPhotoCard from "./AddPhotoCard";
import {
  SelectCheckbox,
  SelectionDeleteBar,
  useBatchDelete,
} from "./selection";

export default function PhotoLibrary({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const { pending, remove } = useBatchDelete(async (ids) => {
    const fd = new FormData();
    fd.set("ids", JSON.stringify(ids));
    await deleteSelectedPhotos(fd);
  }, () => setSelected(new Set()));

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <SelectionDeleteBar
        count={selected.size}
        total={photos.length}
        pending={pending}
        onDelete={() => remove([...selected])}
        onClear={() => setSelected(new Set())}
        onSelectAll={() => setSelected(new Set(photos.map((p) => p.id)))}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AddPhotoCard />
        {photos.map((p) => (
          <div key={p.id} className="relative">
            <SelectCheckbox
              checked={selected.has(p.id)}
              onChange={() => toggle(p.id)}
              label={`Select photo ${p.id}`}
            />
            <PhotoToggleCard
              id={p.id}
              src={p.src}
              thumb={p.thumb}
              featured={p.featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
