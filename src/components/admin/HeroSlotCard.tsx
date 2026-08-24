"use client";

import { useActionState, useRef } from "react";
import {
  replaceHeroImage,
  resetHeroImage,
  type HeroActionState,
} from "@/app/admin/hero-actions";

const idle: HeroActionState = { status: "idle" };

export default function HeroSlotCard({
  slot,
  url,
  isCustom,
}: {
  slot: number;
  url: string;
  isCustom: boolean;
}) {
  const [replaceState, replaceAction, replacePending] = useActionState(
    replaceHeroImage,
    idle
  );
  const [resetState, resetAction, resetPending] = useActionState(
    resetHeroImage,
    idle
  );
  const formRef = useRef<HTMLFormElement>(null);

  const state =
    replaceState.status !== "idle"
      ? replaceState
      : resetState.status !== "idle"
        ? resetState
        : null;

  return (
    <div className="overflow-hidden rounded-xl border border-[#1A1714]/10 bg-white">
      <div className="relative aspect-[3/4] bg-[#2C2824]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={`Hero slot ${slot}`}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-xs font-medium text-white">
          #{slot}
          {isCustom ? (
            <span className="ml-1 text-[#E8764D]" title="Custom image">
              •
            </span>
          ) : null}
        </span>
      </div>

      <div className="space-y-2 p-3">
        <form ref={formRef} action={replaceAction}>
          <input type="hidden" name="slot" value={slot} />
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            id={`file-${slot}`}
            onChange={(e) => {
              if (e.target.files?.length) formRef.current?.requestSubmit();
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={replacePending || resetPending}
            onClick={() => document.getElementById(`file-${slot}`)?.click()}
            className="w-full rounded-lg bg-[#C4552D] px-3 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
          >
            {replacePending ? "Uploading…" : "Replace"}
          </button>
        </form>

        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs text-[#6B6259]" title={url}>
            {isCustom ? "Custom upload" : "Original image"}
          </span>
          {isCustom ? (
            <form action={resetAction}>
              <input type="hidden" name="slot" value={slot} />
              <button
                type="submit"
                disabled={replacePending || resetPending}
                className="text-xs text-[#6B6259] underline-offset-2 transition hover:text-[#C4552D] hover:underline disabled:opacity-60"
              >
                Reset
              </button>
            </form>
          ) : null}
        </div>

        {state?.status === "error" ? (
          <p className="text-xs text-[#A3431F]">{state.message}</p>
        ) : null}
        {state?.status === "success" ? (
          <p className="text-xs text-green-700">{state.message}</p>
        ) : null}
      </div>
    </div>
  );
}
