"use client";

import { useActionState, useRef } from "react";
import {
  saveAboutContent,
  replaceAboutImage,
  resetAboutImage,
  type AboutActionState,
} from "@/app/admin/about-actions";
import { useR2Upload } from "./useR2Upload";
import type { AboutContent } from "@/lib/about";

const idle: AboutActionState = { status: "idle" };

function Field({
  label,
  name,
  defaultValue,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-[#6B6259]">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm text-[#1A1714] outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
        />
      ) : (
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-3 py-2 text-sm text-[#1A1714] outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
        />
      )}
    </label>
  );
}

export default function AboutEditor({ content }: { content: AboutContent }) {
  const [saveState, saveAction, savePending] = useActionState(
    saveAboutContent,
    idle
  );
  const [imgState, imgAction, imgPending] = useActionState(
    replaceAboutImage,
    idle
  );
  const { uploading, uploadError, keyRef, handleFile } = useR2Upload();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="space-y-10">
      {/* ── Image ── */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-light text-[#1A1714]">
          Portrait image
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative w-full max-w-[220px] overflow-hidden rounded-xl border border-[#1A1714]/10 bg-[#2C2824] aspect-[3/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.imageUrl}
              alt="About portrait"
              className="h-full w-full object-cover"
            />
            {content.imageIsCustom ? (
              <span className="absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-xs font-medium text-[#E8764D]">
                Custom
              </span>
            ) : null}
          </div>

          <div className="space-y-3">
            <form ref={formRef} action={imgAction}>
              <input type="hidden" name="key" ref={keyRef} />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                id="about-file"
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
                disabled={imgPending || uploading}
                onClick={() => document.getElementById("about-file")?.click()}
                className="rounded-lg bg-[#C4552D] px-4 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
              >
                {imgPending || uploading ? "Uploading…" : "Replace image"}
              </button>
            </form>
            {content.imageIsCustom ? (
              <form action={resetAboutImage}>
                <button
                  type="submit"
                  disabled={imgPending || uploading}
                  className="text-xs text-[#6B6259] underline-offset-2 transition hover:text-[#C4552D] hover:underline disabled:opacity-60"
                >
                  Reset to original
                </button>
              </form>
            ) : (
              <p className="text-xs text-[#6B6259]">Original image in use</p>
            )}
            {uploadError ? (
              <p className="text-xs text-[#A3431F]">{uploadError}</p>
            ) : null}
            {imgState.status === "error" ? (
              <p className="text-xs text-[#A3431F]">{imgState.message}</p>
            ) : null}
            {imgState.status === "success" ? (
              <p className="text-xs text-green-700">{imgState.message}</p>
            ) : null}
            <p className="max-w-xs text-xs leading-relaxed text-[#6B6259]/80">
              Shown at 3:4 ratio next to the about text. JPG, PNG, WebP or AVIF,
              up to 40 MB.
            </p>
          </div>
        </div>
      </section>

      {/* ── Texts & stats ── */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-light text-[#1A1714]">
          Text &amp; stats
        </h2>

        <form action={saveAction} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Small label" name="label" defaultValue={content.label} />
            <Field label="Heading" name="heading" defaultValue={content.heading} />
          </div>

          <Field
            label="Paragraph 1"
            name="paragraph1"
            defaultValue={content.paragraph1}
            textarea
          />
          <Field
            label="Paragraph 2"
            name="paragraph2"
            defaultValue={content.paragraph2}
            textarea
          />

          <div className="grid gap-5 sm:grid-cols-3">
            {content.stats.map((stat, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-[#1A1714]/10 bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6259]">
                  Stat {i + 1}
                </p>
                <Field
                  label={`Value (${stat.value})`}
                  name={`stat${i + 1}Value`}
                  defaultValue={stat.value}
                />
                <Field
                  label="Label"
                  name={`stat${i + 1}Label`}
                  defaultValue={stat.label}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={savePending}
              className="rounded-lg bg-[#C4552D] px-6 py-2.5 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
            >
              {savePending ? "Saving…" : "Save changes"}
            </button>
            {saveState.status === "success" ? (
              <p className="text-sm text-green-700">{saveState.message}</p>
            ) : null}
            {saveState.status === "error" ? (
              <p className="text-sm text-[#A3431F]">{saveState.message}</p>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}
