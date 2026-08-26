import type { Metadata } from "next";
import Contact from "@/components/Contact";
import {
  SITE_URL,
  SITE_NAME,
  PHONE_TEL,
  PHONE_DISPLAY,
  EMAIL,
  ADDRESS,
  buildBreadcrumbSchema,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Mamatharaj Photography | Book Best Photographer in Khammam",
  description:
    "Book Khammam's best photographer. Call +91 90106 27571 or reach us on WhatsApp to enquire about wedding, pre-wedding and portrait photography in Khammam, Telangana. Mamatharaj Photography — Pumping Well Road, Khammam.",
  keywords: [
    "contact Mamatharaj Photography",
    "book photographer Khammam",
    "photographer phone number Khammam",
    "wedding photographer contact Khammam",
    "best photographer in Khammam contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Mamatharaj Photography | Book Best Photographer in Khammam",
    description:
      "Book Khammam's best photographer. Call +91 90106 27571 or reach us on WhatsApp.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  description:
    "Contact Mamatharaj Photography, Khammam's best wedding and portrait photographer. Call +91 90106 27571.",
  about: {
    "@type": "LocalBusiness",
    name: SITE_NAME,
    telephone: PHONE_TEL,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...ADDRESS },
    priceRange: "₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  },
};

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section
        style={{
          padding: "clamp(6rem, 12vw, 10rem) clamp(1rem, 4vw, 3rem) 2rem",
          background: "var(--color-charcoal)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--color-accent-light)",
            marginBottom: "1rem",
          }}
        >
          Get in Touch
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "var(--color-cream)",
          }}
        >
          Contact{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
            Mamatharaj
          </em>{" "}
          Photography
        </h1>
        <p
          style={{
            color: "rgba(255,249,242,0.55)",
            maxWidth: 500,
            lineHeight: 1.75,
            margin: "1.25rem auto 0",
          }}
        >
          Khammam&apos;s best photographer — call {PHONE_DISPLAY} or visit our
          studio on Pumping Well Road, Khammam.
        </p>
      </section>

      <Contact />
    </main>
  );
}
