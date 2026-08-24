import { getAboutContent } from "@/lib/about";
import AboutEditor from "@/components/admin/AboutEditor";

export const metadata = { title: "About Section" };

export default async function AboutAdminPage() {
  const content = await getAboutContent();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
        Homepage
      </p>
      <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
        About section
      </h1>
      <p className="mt-3 max-w-xl text-[#6B6259]">
        Edit the portrait image, heading, paragraphs and the three animated
        stats. Changes go live immediately after saving.
      </p>

      <div className="mt-10">
        <AboutEditor content={content} />
      </div>
    </div>
  );
}
