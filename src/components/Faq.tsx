import Reveal from "./Reveal";
import { FAQS } from "@/lib/site";

export default function Faq() {
  return (
    <section
      id="faq"
      style={{
        background: "var(--color-bg-warm)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--color-accent)",
                marginBottom: "1rem",
              }}
            >
              Frequently Asked Questions
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "var(--color-charcoal)",
              }}
            >
              Booking a Photographer in{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                Khammam
              </em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) as 1 | 2 | 3}>
              <details
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      color: "var(--color-accent)",
                      fontSize: "1.5rem",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: "1rem",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                    maxWidth: "60ch",
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
