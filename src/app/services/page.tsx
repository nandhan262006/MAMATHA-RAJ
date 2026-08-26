import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photography Services in Khammam | Mamatharaj Photography",
  description:
    "Wedding photography, pre-wedding shoots, portrait sessions, cinematic films, event coverage and destination shoots in Khammam, Telangana.",
  alternates: {
    canonical: "/services",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Photography Services in Khammam",
  itemListElement: SERVICE_PAGES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}/services/${s.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section
        style={{
          padding: "clamp(6rem, 12vw, 10rem) clamp(1rem, 4vw, 3rem) 3rem",
          background: "var(--color-bg)",
          textAlign: "center",
        }}
      >
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
          What We Offer
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "var(--color-charcoal)",
          }}
        >
          Photography Services in{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
            Khammam
          </em>
        </h1>
        <p
          style={{
            marginTop: "1.25rem",
            color: "var(--color-fg-muted)",
            maxWidth: 620,
            lineHeight: 1.8,
            margin: "1.25rem auto 0",
          }}
        >
          From grand weddings to intimate portraits, Mamatharaj Photography
          offers a complete range of professional photography services across
          Khammam, Telangana and India.
        </p>
      </section>

      <section
        style={{
          padding: "2rem clamp(1rem, 4vw, 3rem) 6rem",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {SERVICE_PAGES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                background: "var(--color-bg-warm)",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={`${s.title} in Khammam`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.7s ease",
                  }}
                />
              </div>
              <div style={{ padding: "1.75rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {s.intro}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "1.25rem",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-accent)",
                  }}
                >
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
