"use client";

import { useActionState, useRef } from "react";
import {
  saveTestimonial,
  replaceTestimonialImage,
  type TestimonialActionState,
} from "@/app/admin/testimonial-actions";
import { DeleteTestimonialButton } from "@/components/admin/TestimonialButtons";
import type { Testimonial } from "@/lib/testimonials";

const idle: TestimonialActionState = { status: "idle" };

export default function TestimonialEditorCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const [saveState, saveAction, savePending] = useActionState(
    saveTestimonial,
    idle
  );
  const [imgState, imgAction, imgPending] = useActionState(
    replaceTestimonialImage,
    idle
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="rounded-2xl border border-[#1A1714]/10 bg-white p-5">
      <p className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#C4552D]">
        <span>Slide {String(index + 1).padStart(2, "0")}</span>
        <DeleteTestimonialButton id={testimonial.id} />
      </p>

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Image */}
        <div className="shrink-0">
          <div className="relative w-full max-w-[160px] overflow-hidden rounded-xl bg-[#2C2824] aspect-[3/4]">
            {testimonial.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={testimonial.imageUrl}
                alt={testimonial.author}
                className="h-full w-full object-cover"
              />
            ) : (
              <button
                type="button"
                disabled={imgPending || savePending}
                onClick={() =>
                  document.getElementById(`tst-file-${testimonial.id}`)?.click()
                }
                className="flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-[#FFF9F2]/25 text-[#FFF9F2]/60 transition hover:border-[#C4552D] hover:text-[#C4552D] disabled:opacity-60"
              >
                <span className="text-2xl leading-none" aria-hidden>
                  +
                </span>
                <span className="px-2 text-center text-[10px] uppercase tracking-wider">
                  {imgPending ? "Uploading…" : "No image"}
                </span>
              </button>
            )}
          </div>
          <form ref={formRef} action={imgAction} className="mt-2">
            <input type="hidden" name="id" value={testimonial.id} />
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              id={`tst-file-${testimonial.id}`}
              onChange={(e) => {
                if (e.target.files?.length) formRef.current?.requestSubmit();
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={imgPending || savePending}
              onClick={() =>
                document.getElementById(`tst-file-${testimonial.id}`)?.click()
              }
              className="w-full rounded-lg border border-[#1A1714]/15 px-3 py-1.5 text-xs text-[#6B6259] transition hover:border-[#C4552D] hover:text-[#C4552D] disabled:opacity-60"
            >
              {imgPending
                ? "Uploading…"
                : testimonial.imageUrl
                  ? "Replace image"
                  : "Upload image"}
            </button>
          </form>
          {imgState.status === "error" ? (
            <p className="mt-2 text-xs text-[#A3431F]">{imgState.message}</p>
          ) : null}
          {imgState.status === "success" ? (
            <p className="mt-2 text-xs text-green-700">{imgState.message}</p>
          ) : null}
        </div>

        {/* Fields */}
        <form action={saveAction} className="min-w-0 flex-1 space-y-3">
          <input type="hidden" name="id" value={testimonial.id} />

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
              Quote
            </span>
            <textarea
              name="quote"
              defaultValue={testimonial.quote}
              required
              rows={4}
              maxLength={800}
              className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
                Author
              </span>
              <input
                type="text"
                name="author"
                defaultValue={testimonial.author}
                required
                maxLength={120}
                placeholder="Ananya & Rohit"
                className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
                Role / Event
              </span>
              <input
                type="text"
                name="role"
                defaultValue={testimonial.role}
                maxLength={120}
                placeholder="Udaipur Wedding · December 2024"
                className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
              Image aspect ratio <span className="normal-case">(optional, e.g. 2743/1837)</span>
            </span>
            <input
              type="text"
              name="ratio"
              defaultValue={testimonial.ratio}
              maxLength={20}
              placeholder="Auto from upload"
              className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20 sm:max-w-56"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={savePending || imgPending}
              className="rounded-lg bg-[#C4552D] px-4 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
            >
              {savePending ? "Saving…" : "Save testimonial"}
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
