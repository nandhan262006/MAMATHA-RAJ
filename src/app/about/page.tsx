import type { Metadata } from "next";
import About from "@/components/About";
import { getAboutContent } from "@/lib/about";
import { SITE_URL, SITE_NAME, PHOTOGRAPHER_NAME, ADDRESS, GEO } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Mamatharaj Photography | Khammam's Best Photographer",
  description:
    "Mamatharaj Photography is Khammam's top-rated wedding and portrait studio, led by Mamatha Raj. 500+ weddings, 12+ years of craft and a 5.0-star Google rating.",
  alternates: {
    canonical: "/about",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${SITE_NAME}`,
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Person",
    name: PHOTOGRAPHER_NAME,
    jobTitle: "Wedding & Portrait Photographer",
    description:
      "Mamatha Raj is a professional wedding and portrait photographer based in Khammam, Telangana, with over a decade of experience.",
    address: { "@type": "PostalAddress", ...ADDRESS },
    geo: { "@type": "GeoCoordinates", ...GEO },
  },
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <section
        style={{
          padding: "clamp(6rem, 12vw, 10rem) clamp(1rem, 4vw, 3rem) 0",
          background: "var(--color-bg)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--color-accent)",
            marginBottom: "1rem",
          }}
        >
          Our Story
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "var(--color-charcoal)",
          }}
        >
          About{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
            Mamatharaj
          </em>{" "}
          Photography
        </h1>
      </section>

      <About content={content} />

      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--color-charcoal)",
              marginBottom: "1.5rem",
            }}
          >
            Why Couples in Khammam{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              Choose Us
            </em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>
                Candid, not staged
              </h3>
              <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.8 }}>
                We document your day as it actually unfolds — real tears, real
                laughter, real moments — with an unobtrusive, documentary
                approach and a cinematic finish.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>
                Editorial finish
              </h3>
              <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.8 }}>
                Every image is individually colour-graded and retouched to an
                editorial standard, so your gallery looks like a magazine
                spread, not a batch export.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>
                Local, trusted, 5.0 stars
              </h3>
              <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.8 }}>
                Based on Pumping Well Road in Khammam, we are a local studio with
                a 5.0-star Google rating and hundreds of happy couples across
                Telangana.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>
                Photos + films, one team
              </h3>
              <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.8 }}>
                We offer photography and cinematography together, so your
                wedding story is captured cohesively — one team, one vision,
                one seamless deliverable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
