"use client";

import { useFormStatus } from "react-dom";
import {
  addTestimonial,
  deleteTestimonial,
} from "@/app/admin/testimonial-actions";

function SubmitAdd() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-[#C4552D] px-6 py-2.5 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:opacity-60"
    >
      {pending ? "Adding…" : "+ Add new testimonial"}
    </button>
  );
}

export function AddTestimonialButton() {
  return (
    <form action={addTestimonial}>
      <SubmitAdd />
    </form>
  );
}

function SubmitDelete() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-xs text-[#6B6259]/70 underline-offset-2 transition hover:text-[#A3431F] hover:underline disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete testimonial"}
    </button>
  );
}

export function DeleteTestimonialButton({ id }: { id: number }) {
  return (
    <form
      action={deleteTestimonial}
      onSubmit={(e) => {
        if (!confirm("Delete this testimonial? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitDelete />
    </form>
  );
}
