import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, type ServicePage } from "@/lib/service-pages";
import {
  SITE_URL,
  SITE_NAME,
  PHONE_TEL,
  PHONE_DISPLAY,
  buildBreadcrumbSchema,
} from "@/lib/site";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [
      `${service.title.toLowerCase()} Khammam`,
      `best ${service.title.toLowerCase()} Khammam`,
      `book ${service.title.toLowerCase()} Khammam`,
      `Mamatharaj Photography ${service.title.toLowerCase()}`,
      `photographer Khammam ${service.title.toLowerCase()}`,
    ],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} in Khammam — Mamatharaj Photography`,
        },
      ],
    },
  };
}

function serviceSchema(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in Khammam`,
    description: service.metaDescription,
    serviceType: service.title,
    url: `${SITE_URL}/services/${service.slug}`,
    image: new URL(service.image, SITE_URL).toString(),
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      telephone: PHONE_TEL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "3-5-80/B, Pumping Well Road",
        addressLocality: "Khammam",
        addressRegion: "Telangana",
        postalCode: "507001",
        addressCountry: "IN",
      },
      areaServed: ["Khammam", "Telangana", "India"],
    },
    areaServed: [
      { "@type": "City", name: "Khammam" },
      { "@type": "State", name: "Telangana" },
    ],
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/services/${service.slug}`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.features.map((f) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f,
        },
      })),
    },
  };
}

function breadcrumbSchema(service: ServicePage) {
  return buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ]);
}

function faqSchema(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICE_PAGES.filter((s) => s.slug !== slug);

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service)) }}
      />

      <section
        style={{
          padding: "clamp(6rem, 12vw, 10rem) clamp(1rem, 4vw, 3rem) 3rem",
          background: "var(--color-bg)",
          textAlign: "center",
        }}
      >
        <nav
          aria-label="Breadcrumb"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: "var(--color-fg-muted)",
            marginBottom: "2rem",
          }}
        >
          <Link href="/" style={{ color: "var(--color-fg-muted)", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/services" style={{ color: "var(--color-fg-muted)", textDecoration: "none" }}>
            Services
          </Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--color-accent)" }}>{service.title}</span>
        </nav>

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
          Khammam · Telangana
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
          {service.heading}{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
            {service.headingAccent}
          </em>
        </h1>
        <p
          style={{
            maxWidth: 640,
            margin: "1.5rem auto 0",
            color: "var(--color-fg-muted)",
            lineHeight: 1.8,
            fontSize: "1.05rem",
          }}
        >
          {service.intro}
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 3rem) 4rem",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={`${service.title} in Khammam, Telangana — Mamatharaj Photography`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div>
          {service.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              style={{
                color: "var(--color-fg-muted)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              {p}
            </p>
          ))}
          <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem 0 0" }}>
            {service.features.map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 0",
                  borderBottom: "1px solid rgba(26,23,20,0.06)",
                  fontSize: "0.95rem",
                  color: "var(--color-charcoal)",
                }}
              >
                <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>—</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--color-charcoal)",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            {service.title} in Khammam{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              — FAQ
            </em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {service.faqs.map((f) => (
              <details
                key={f.question}
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid rgba(26,23,20,0.08)",
                  padding: "1.5rem 1.75rem",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {f.question}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--color-accent)", fontSize: "1.4rem", flexShrink: 0 }}
                  >
                    +
                  </span>
                </summary>
                <p style={{ marginTop: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.8 }}>
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--color-charcoal)",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "var(--color-cream)",
          }}
        >
          Book Your {service.title}{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
            in Khammam
          </em>
        </h2>
        <p
          style={{
            color: "rgba(255,249,242,0.6)",
            maxWidth: 480,
            margin: "1rem auto 2rem",
            lineHeight: 1.7,
          }}
        >
          Call {PHONE_DISPLAY} or reach us on WhatsApp to check availability for
          your date. Mamatharaj Photography — Khammam&apos;s best photographer.
        </p>
        <Link href="/contact" className="btn-primary">
          <span>Enquire Now</span>
        </Link>
      </section>

      <section
        style={{
          padding: "clamp(3rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "var(--color-charcoal)",
              marginBottom: "1.5rem",
            }}
          >
            Explore Other Services in Khammam
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                style={{
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  color: "var(--color-charcoal)",
                  padding: "0.6rem 1.25rem",
                  border: "1px solid rgba(26,23,20,0.12)",
                  transition: "all 0.3s",
                }}
              >
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
