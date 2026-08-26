import Link from "next/link";
import { getOgImage } from "@/lib/og-image";
import OgImageEditor from "@/components/admin/OgImageEditor";

export const metadata = { title: "Overview" };

const SECTIONS = [
  {
    href: "/admin/homepage",
    title: "Homepage images",
    desc: "The 24-slot hero collage.",
  },
  {
    href: "/admin/about",
    title: "About section",
    desc: "Portrait image, heading, paragraphs and stats.",
  },
  {
    href: "/admin/portfolio",
    title: "Portfolio",
    desc: "Toggle which photos appear on the homepage grid.",
  },
  {
    href: "/admin/story",
    title: "Featured story",
    desc: "Banner, details and the wedding gallery.",
  },
  {
    href: "/admin/services",
    title: "Services",
    desc: "The homepage services carousel.",
  },
  {
    href: "/admin/testimonials",
    title: "Testimonials",
    desc: "Client reviews carousel.",
  },
];

export default async function AdminOverviewPage() {
  const og = await getOgImage();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
        Dashboard
      </p>
      <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
        Overview
      </h1>
      <p className="mt-3 max-w-xl text-[#6B6259]">
        Jump into any section to edit content, or update the social share image
        below. Changes go live immediately.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-2xl border border-[#1A1714]/10 bg-white p-6 transition hover:border-[#C4552D]/40 hover:bg-white/80"
          >
            <h2 className="font-serif text-xl text-[#1A1714]">{s.title}</h2>
            <p className="mt-2 text-sm text-[#6B6259]">{s.desc}</p>
            <span className="mt-3 inline-block text-sm font-medium text-[#C4552D] transition group-hover:underline">
              Open →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <OgImageEditor url={og.url} isCustom={og.isCustom} />
      </div>
    </div>
  );
}
