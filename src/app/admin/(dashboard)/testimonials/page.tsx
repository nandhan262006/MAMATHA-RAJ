import { getTestimonials } from "@/lib/testimonials";
import TestimonialEditorCard from "@/components/admin/TestimonialEditorCard";
import { AddTestimonialButton } from "@/components/admin/TestimonialButtons";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
            Homepage
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
            Testimonials
          </h1>
          <p className="mt-3 max-w-xl text-[#6B6259]">
            Edit the client reviews carousel on the homepage — quote, author,
            event details and image. Changes go live immediately after saving.
          </p>
        </div>
        <div className="w-full sm:w-auto sm:min-w-56">
          <AddTestimonialButton />
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {testimonials.map((t, i) => (
          <TestimonialEditorCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>
    </div>
  );
}
