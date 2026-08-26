import type { Metadata } from "next";
import Link from "next/link";
import { getAllPhotos } from "@/lib/photos";
import PortfolioGallery from "@/components/PortfolioGallery";
import { SITE_URL, SITE_NAME, buildBreadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio — Best Wedding & Portrait Photography in Khammam",
  description:
    "The complete photography portfolio of Mamatharaj Photography — Khammam's best photographer. Weddings, pre-weddings and portraits captured in Khammam and across Telangana.",
  keywords: [
    "photography portfolio Khammam",
    "wedding photos Khammam",
    "best photographer in Khammam portfolio",
    "Mamatharaj Photography gallery",
    "Khammam wedding photographer work",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio — Best Wedding & Portrait Photography in Khammam",
    description:
      "The complete photography portfolio of Mamatharaj Photography — Khammam's best photographer.",
    url: `${SITE_URL}/portfolio`,
    type: "website",
  },
};

export default async function PortfolioPage() {
  const photos = await getAllPhotos();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section
        style={{
          padding: "clamp(5rem, 10vw, 9rem) clamp(1rem, 4vw, 3rem) 2rem",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label" style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--color-accent)",
            marginBottom: "1rem",
          }}>
            Complete Collection
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.1,
          }}>
            The{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              Portfolio
            </em>
          </h1>
          <p style={{ marginTop: "1rem", color: "var(--color-fg-muted)", maxWidth: 520 }}>
            Every frame from the archive — {photos.length} photographs and
            counting. Mamatharaj Photography — Khammam&apos;s best wedding and
            portrait photographer.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/" className="text-sm underline underline-offset-4 hover:text-[#C4552D]">
              ← Back to home
            </Link>
          </p>
        </div>
      </section>

      <section style={{
        padding: "1rem clamp(1rem, 4vw, 3rem) 6rem",
        background: "var(--color-bg)",
      }}>
        <PortfolioGallery photos={photos.map((p) => ({ src: p.src, thumb: p.thumb }))} />
      </section>
    </main>
  );
}
