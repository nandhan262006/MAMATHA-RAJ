"use client";

import { useTransition } from "react";

export function SelectCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-md border transition ${
        checked
          ? "border-[#C4552D] bg-[#C4552D] text-white"
          : "border-white/70 bg-black/45 text-transparent hover:bg-black/65"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
        <path
          d="M3 8.5 6.5 12 13 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export type DeleteBarProps = {
  count: number;
  total: number;
  pending: boolean;
  onDelete: () => void;
  onClear: () => void;
  onSelectAll?: () => void;
};

export function SelectionDeleteBar({
  count,
  total,
  pending,
  onDelete,
  onClear,
  onSelectAll,
}: DeleteBarProps) {
  if (count === 0) return null;
  const allSelected = total > 0 && count >= total;
  return (
    <div className="sticky top-3 z-20 mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#A3431F]/30 bg-[#FFF9F2]/95 px-4 py-2.5 shadow-sm backdrop-blur">
      <span className="text-sm font-medium text-[#1A1714]">
        {count} selected
      </span>
      {onSelectAll && !allSelected ? (
        <button
          type="button"
          onClick={onSelectAll}
          disabled={pending}
          className="rounded-lg border border-[#1A1714]/15 bg-white px-3 py-1.5 text-sm font-medium text-[#1A1714] transition hover:border-[#C4552D] hover:text-[#C4552D] disabled:opacity-60"
        >
          Select all ({total})
        </button>
      ) : null}
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="rounded-lg bg-[#A3431F] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#8a3719] disabled:opacity-60"
      >
        {pending ? "Deleting…" : `Delete ${count}`}
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={pending}
        className="text-sm text-[#6B6259] underline-offset-2 hover:underline disabled:opacity-60"
      >
        Clear selection
      </button>
    </div>
  );
}

export function useBatchDelete(
  run: (ids: number[]) => Promise<void>,
  clearSelection: () => void
) {
  const [pending, startTransition] = useTransition();

  function remove(ids: number[], noun = "photo") {
    const unique = [...new Set(ids)].filter((n) => Number.isInteger(n) && n > 0);
    if (unique.length === 0) return;
    if (
      !window.confirm(
        `Delete ${unique.length} ${noun}${unique.length === 1 ? "" : "s"} permanently? This cannot be undone.`
      )
    )
      return;

    startTransition(async () => {
      await run(unique);
      clearSelection();
    });
  }

  return { pending, remove };
}
