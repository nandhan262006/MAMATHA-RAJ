"use client";

import { useActionState } from "react";
import {
  setPhotoFeatured,
  type PortfolioActionState,
} from "@/app/admin/portfolio-actions";

const idle: PortfolioActionState = { status: "idle" };

export default function PhotoToggleCard({
  id,
  src,
  thumb,
  featured,
}: {
  id: number;
  src: string;
  thumb?: string | null;
  featured: boolean;
}) {
  const [state, action, pending] = useActionState(setPhotoFeatured, idle);

  const currentFeatured =
    state.status === "success" && state.id === id ? state.featured : featured;

  return (
    <div className="overflow-hidden rounded-xl border border-[#1A1714]/10 bg-white">
      <div className="relative aspect-[3/4] bg-[#2C2824]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb || src}
          alt={`Portfolio photo ${id}`}
          loading="lazy"
          className={`h-full w-full object-cover transition ${
            currentFeatured ? "" : "opacity-50 grayscale"
          }`}
        />
        <span
          className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${
            currentFeatured
              ? "bg-[#C4552D] text-white"
              : "bg-black/55 text-white/80"
          }`}
        >
          {currentFeatured ? "On homepage" : "Hidden"}
        </span>
      </div>

      <div className="p-3">
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <input
            type="hidden"
            name="featured"
            value={currentFeatured ? "0" : "1"}
          />
          <button
            type="submit"
            disabled={pending}
            role="switch"
            aria-checked={currentFeatured}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-60 ${
              currentFeatured
                ? "bg-[#C4552D] text-[#FFF9F2] hover:bg-[#A3431F]"
                : "border border-[#1A1714]/15 bg-white text-[#6B6259] hover:border-[#C4552D] hover:text-[#C4552D]"
            }`}
          >
            <span>{currentFeatured ? "On homepage" : "Not on homepage"}</span>
            <span
              className={`relative inline-block h-4 w-8 rounded-full transition ${
                currentFeatured ? "bg-white/40" : "bg-[#1A1714]/15"
              }`}
            >
              <span
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-all ${
                  currentFeatured ? "left-4" : "left-0.5"
                }`}
              />
            </span>
          </button>
        </form>

        {state.status === "error" ? (
          <p className="mt-2 text-xs text-[#A3431F]">{state.message}</p>
        ) : null}
      </div>
    </div>
  );
}
