import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { SITE_URL, SITE_NAME, PHONE_TEL, EMAIL, ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Mamatharaj Photography | Book a Photographer in Khammam",
  description:
    "Book Khammam's best photographer. Call +91 90106 27571 or reach us on WhatsApp to enquire about wedding, pre-wedding and portrait photography in Khammam.",
  alternates: {
    canonical: "/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  about: {
    "@type": "LocalBusiness",
    name: SITE_NAME,
    telephone: PHONE_TEL,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...ADDRESS },
  },
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
      </section>

      <Contact />
    </main>
  );
}
