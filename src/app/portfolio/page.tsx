import type { Metadata } from "next";
import Link from "next/link";
import { getAllPhotos } from "@/lib/photos";
import PortfolioGallery from "@/components/PortfolioGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio — Wedding & Portrait Photography in Khammam",
  description:
    "The complete photography portfolio of Mamatharaj Photography — weddings, pre-weddings and portraits captured in Khammam and across Telangana.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default async function PortfolioPage() {
  const photos = await getAllPhotos();

  return (
    <main className="flex flex-1 flex-col">
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
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.1,
          }}>
            The <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Portfolio</em>
          </h2>
          <p style={{ marginTop: "1rem", color: "var(--color-fg-muted)", maxWidth: 520 }}>
            Every frame from the archive — {photos.length} photographs and counting.
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
