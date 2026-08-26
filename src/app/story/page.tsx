import type { Metadata } from "next";
import Link from "next/link";
import { getStoryContent } from "@/lib/story";
import { getStoryPhotos } from "@/lib/story-photos";
import PortfolioGallery from "@/components/PortfolioGallery";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Featured Wedding Story — Best Wedding Photography in Khammam",
  description:
    "A complete featured wedding gallery by Mamatharaj Photography — Khammam's top-rated wedding and portrait photographer. Candid storytelling and cinematic precision.",
  keywords: [
    "wedding story Khammam",
    "featured wedding photography Khammam",
    "best wedding photographer Khammam gallery",
    "Mamatharaj Photography wedding",
  ],
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "Featured Wedding Story — Best Wedding Photography in Khammam",
    description:
      "A complete featured wedding gallery by Mamatharaj Photography, Khammam's top-rated wedding and portrait photographer.",
    url: `${SITE_URL}/story`,
    type: "website",
  },
};

export default async function StoryPage() {
  const [content, photos] = await Promise.all([
    getStoryContent(),
    getStoryPhotos(),
  ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Featured Story", url: "/story" },
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
          <p
            className="section-label"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "var(--color-accent)",
              marginBottom: "1rem",
            }}
          >
            {content.label}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            {content.headingPlain}{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              {content.headingAccent}
            </em>
          </h1>
          <p style={{ marginTop: "1rem", color: "var(--color-fg-muted)", maxWidth: 520 }}>
            {content.description}
          </p>
          <p style={{ marginTop: "0.5rem", color: "var(--color-fg-muted)", fontSize: "0.9rem" }}>
            Mamatharaj Photography — Khammam&apos;s best wedding photographer.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/" className="text-sm underline underline-offset-4 hover:text-[#C4552D]">
              ← Back to home
            </Link>
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "1rem clamp(1rem, 4vw, 3rem) 6rem",
          background: "var(--color-bg)",
        }}
      >
        <PortfolioGallery photos={photos.map((p) => ({ src: p.src, thumb: p.thumb }))} />
      </section>
    </main>
  );
}
