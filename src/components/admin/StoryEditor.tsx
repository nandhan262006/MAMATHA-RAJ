"use client";

import { useActionState, useRef } from "react";
import {
  saveStoryContent,
  replaceStoryImage,
  resetStoryImage,
  type StoryActionState,
} from "@/app/admin/story-actions";
import type { StoryContent } from "@/lib/story";

const idle: StoryActionState = { status: "idle" };

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

function ImageSlot({
  title,
  hint,
  imageKey,
  url,
  isCustom,
}: {
  title: string;
  hint: string;
  imageKey: string;
  url: string;
  isCustom: boolean;
}) {
  const [imgState, imgAction, imgPending] = useActionState(
    replaceStoryImage,
    idle
  );
  const formRef = useRef<HTMLFormElement>(null);
  const inputId = `story-file-${imageKey}`;

  return (
    <div className="space-y-3 rounded-xl border border-[#1A1714]/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6259]">
        {title}
      </p>
      <div className="relative overflow-hidden rounded-lg border border-[#1A1714]/10 bg-[#2C2824] aspect-[16/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={title}
          className="h-full w-full object-cover"
        />
        {isCustom ? (
          <span className="absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-xs font-medium text-[#E8764D]">
            Custom
          </span>
        ) : null}
      </div>

      <form ref={formRef} action={imgAction}>
        <input type="hidden" name="imageKey" value={imageKey} />
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          id={inputId}
          onChange={(e) => {
            if (e.target.files?.length) formRef.current?.requestSubmit();
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={imgPending}
          onClick={() => document.getElementById(inputId)?.click()}
          className="rounded-lg bg-[#C4552D] px-4 py-2 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
        >
          {imgPending ? "Uploading…" : "Replace image"}
        </button>
      </form>

      {isCustom ? (
        <form action={resetStoryImage}>
          <input type="hidden" name="imageKey" value={imageKey} />
          <button
            type="submit"
            disabled={imgPending}
            className="text-xs text-[#6B6259] underline-offset-2 transition hover:text-[#C4552D] hover:underline disabled:opacity-60"
          >
            Reset to original
          </button>
        </form>
      ) : (
        <p className="text-xs text-[#6B6259]">Original image in use</p>
      )}
      {imgState.status === "error" ? (
        <p className="text-xs text-[#A3431F]">{imgState.message}</p>
      ) : null}
      {imgState.status === "success" ? (
        <p className="text-xs text-green-700">{imgState.message}</p>
      ) : null}
      <p className="text-xs leading-relaxed text-[#6B6259]/80">{hint}</p>
    </div>
  );
}

export default function StoryEditor({ content }: { content: StoryContent }) {
  const [saveState, saveAction, savePending] = useActionState(
    saveStoryContent,
    idle
  );

  return (
    <div className="space-y-10">
      {/* ── Images ── */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-light text-[#1A1714]">
          Images
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          <ImageSlot
            title="Main banner"
            hint="Full-width image at the top of the section."
            imageKey="story_image"
            url={content.imageUrl}
            isCustom={content.imageIsCustom}
          />
          <ImageSlot
            title="Small image (left)"
            hint="Left photo in the bottom-right pair."
            imageKey="story_small_image_1"
            url={content.small1Url}
            isCustom={content.small1IsCustom}
          />
          <ImageSlot
            title="Small image (right)"
            hint="Right photo in the bottom-right pair."
            imageKey="story_small_image_2"
            url={content.small2Url}
            isCustom={content.small2IsCustom}
          />
        </div>
      </section>

      {/* ── Texts ── */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-light text-[#1A1714]">
          Text &amp; details
        </h2>

        <form action={saveAction} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Label" name="label" defaultValue={content.label} />
            <Field
              label="Heading"
              name="headingPlain"
              defaultValue={content.headingPlain}
            />
            <Field
              label="Accent word (italic)"
              name="headingAccent"
              defaultValue={content.headingAccent}
            />
          </div>

          <Field
            label="Description"
            name="description"
            defaultValue={content.description}
            textarea
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.details.map((d, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-[#1A1714]/10 bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6259]">
                  Detail {i + 1}
                </p>
                <Field
                  label={`Value (${d.label})`}
                  name={`detail${i + 1}Value`}
                  defaultValue={d.value}
                />
                <Field
                  label="Caption"
                  name={`detail${i + 1}Label`}
                  defaultValue={d.label}
                />
              </div>
            ))}
          </div>

          <Field
            label="Button text"
            name="buttonText"
            defaultValue={content.buttonText}
          />

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
