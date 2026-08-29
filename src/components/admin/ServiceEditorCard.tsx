"use client";

import { useActionState, useRef } from "react";
import {
  saveService,
  replaceServiceImage,
  type ServiceActionState,
} from "@/app/admin/services-actions";
import { DeleteServiceButton } from "@/components/admin/ServiceCardButtons";
import { useR2Upload } from "./useR2Upload";
import type { ServiceCard } from "@/lib/services";

const idle: ServiceActionState = { status: "idle" };

export default function ServiceEditorCard({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const [saveState, saveAction, savePending] = useActionState(saveService, idle);
  const [imgState, imgAction, imgPending] = useActionState(
    replaceServiceImage,
    idle
  );
  const { uploading, uploadError, keyRef, handleFile } = useR2Upload();
  const formRef = useRef<HTMLFormElement>(null);
  const busy = imgPending || uploading || savePending;

  return (
    <div className="rounded-2xl border border-[#1A1714]/10 bg-white p-5">
      <p className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#C4552D]">
        <span>Card {String(index + 1).padStart(2, "0")}</span>
        <DeleteServiceButton id={service.id} />
      </p>

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Image */}
        <div className="shrink-0">
          <div className="relative w-full max-w-[160px] overflow-hidden rounded-xl bg-[#2C2824] aspect-[3/4]">
            {service.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={service.imageUrl}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  document.getElementById(`svc-file-${service.id}`)?.click()
                }
                className="flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-[#FFF9F2]/25 text-[#FFF9F2]/60 transition hover:border-[#C4552D] hover:text-[#C4552D] disabled:opacity-60"
              >
                <span className="text-2xl leading-none" aria-hidden>
                  +
                </span>
                <span className="px-2 text-center text-[10px] uppercase tracking-wider">
                  {imgPending || uploading ? "Uploading…" : "No image"}
                </span>
              </button>
            )}
          </div>
          <form ref={formRef} action={imgAction} className="mt-2">
            <input type="hidden" name="id" value={service.id} />
            <input type="hidden" name="key" ref={keyRef} />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              id={`svc-file-${service.id}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                handleFile(file).then((ok) => {
                  if (ok) formRef.current?.requestSubmit();
                });
              }}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                document.getElementById(`svc-file-${service.id}`)?.click()
              }
              className="w-full rounded-lg border border-[#1A1714]/15 px-3 py-1.5 text-xs text-[#6B6259] transition hover:border-[#C4552D] hover:text-[#C4552D] disabled:opacity-60"
            >
              {imgPending || uploading
                ? "Uploading…"
                : service.imageUrl
                  ? "Replace image"
                  : "Upload image"}
            </button>
          </form>
          {uploadError ? (
            <p className="mt-2 text-xs text-[#A3431F]">{uploadError}</p>
          ) : null}
          {imgState.status === "error" ? (
            <p className="mt-2 text-xs text-[#A3431F]">{imgState.message}</p>
          ) : null}
          {imgState.status === "success" ? (
            <p className="mt-2 text-xs text-green-700">{imgState.message}</p>
          ) : null}
        </div>

        {/* Fields */}
        <form action={saveAction} className="min-w-0 flex-1 space-y-3">
          <input type="hidden" name="id" value={service.id} />

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
                Category
              </span>
              <input
                type="text"
                name="category"
                defaultValue={service.category}
                maxLength={80}
                className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
                Title
              </span>
              <input
                type="text"
                name="title"
                defaultValue={service.title}
                required
                maxLength={120}
                className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
              Description
            </span>
            <textarea
              name="description"
              defaultValue={service.description}
              rows={3}
              maxLength={600}
              className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-[#C4552D] px-4 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
            >
              {savePending ? "Saving…" : "Save card"}
            </button>
            {saveState.status === "success" ? (
              <span className="text-xs text-green-700">{saveState.message}</span>
            ) : null}
            {saveState.status === "error" ? (
              <span className="text-xs text-[#A3431F]">{saveState.message}</span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
