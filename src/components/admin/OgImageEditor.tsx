"use client";

import { useActionState, useRef } from "react";
import {
  replaceOgImage,
  resetOgImage,
  type OgImageActionState,
} from "@/app/admin/og-image-actions";
import { useR2Upload } from "./useR2Upload";
import { UploadProgressBar } from "./UploadProgressBar";

const idle: OgImageActionState = { status: "idle" };

export default function OgImageEditor({
  url,
  isCustom,
}: {
  url: string;
  isCustom: boolean;
}) {
  const [state, action, pending] = useActionState(replaceOgImage, idle);
  const { uploading, uploadError, progress, keyRef, handleFile } = useR2Upload();
  const formRef = useRef<HTMLFormElement>(null);
  const busy = pending || uploading;

  return (
    <section className="rounded-2xl border border-[#1A1714]/10 bg-white p-6">
      <h2 className="font-serif text-2xl font-light text-[#1A1714]">
        Social share image
      </h2>
      <p className="mt-1 max-w-lg text-sm text-[#6B6259]">
        The preview shown when the site link is shared on social media,
        WhatsApp and messaging apps (Open Graph / og:image).
      </p>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative w-full max-w-[360px] overflow-hidden rounded-xl border border-[#1A1714]/10 bg-[#2C2824] aspect-[1200/630]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Social share image preview"
            className="h-full w-full object-cover"
          />
          {isCustom ? (
            <span className="absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-xs font-medium text-[#E8764D]">
              Custom
            </span>
          ) : null}
        </div>

        <div className="space-y-3">
          <form ref={formRef} action={action}>
            <input type="hidden" name="key" ref={keyRef} />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              id="og-file"
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
              onClick={() => document.getElementById("og-file")?.click()}
              className="rounded-lg bg-[#C4552D] px-4 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
            >
              {busy ? "Uploading…" : "Replace image"}
            </button>
          </form>
          {isCustom ? (
            <form action={resetOgImage}>
              <button
                type="submit"
                disabled={busy}
                className="text-xs text-[#6B6259] underline-offset-2 transition hover:text-[#C4552D] hover:underline disabled:opacity-60"
              >
                Reset to original
              </button>
            </form>
          ) : (
            <p className="text-xs text-[#6B6259]">Original image in use</p>
          )}
          {uploading && progress ? (
            <UploadProgressBar
              percent={progress.percent}
              bytesUploaded={progress.bytesUploaded}
              bytesTotal={progress.bytesTotal}
            />
          ) : null}
          {uploadError ? (
            <p className="text-xs text-[#A3431F]">{uploadError}</p>
          ) : null}
          {state.status === "error" ? (
            <p className="text-xs text-[#A3431F]">{state.message}</p>
          ) : null}
          {state.status === "success" ? (
            <p className="text-xs text-green-700">{state.message}</p>
          ) : null}
          <p className="max-w-xs text-xs leading-relaxed text-[#6B6259]/80">
            Recommended 1200×630 px. JPG, PNG, WebP or AVIF, up to 40 MB.
          </p>
        </div>
      </div>
    </section>
  );
}
