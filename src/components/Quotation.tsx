import Reveal from "./Reveal";

const ESTIMATOR_URL = "https://estimator-chi-gilt.vercel.app/";

const FEATURES = [
  {
    title: "Choose Your Event",
    desc: "Wedding, pre-wedding, portrait, film or event coverage.",
  },
  {
    title: "Set Your Coverage",
    desc: "Pick hours, team size and add-ons that fit your day.",
  },
  {
    title: "Get an Instant Quote",
    desc: "A transparent estimate in minutes — no calls, no waiting.",
  },
  {
    title: "Confirm With Us",
    desc: "Share your quote and we'll lock in your date right away.",
  },
];

export default function Quotation() {
  return (
    <section
      className="section quotation"
      style={{
        padding: "clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)",
        background: "var(--color-bg-warm)",
      }}
    >
      <div
        className="quotation-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
        }}
      >
        <div>
          <Reveal>
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
              Build Your Event
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="section-title"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Plan Your Celebration,{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                Get a Quote
              </em>{" "}
              in Minutes
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p
              className="section-desc"
              style={{
                fontSize: "1.05rem",
                color: "var(--color-fg-muted)",
                maxWidth: 520,
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              Tell us about your event and our estimator will build a
              transparent, personalised quotation for you — instantly. Choose
              your event type, coverage hours and add-ons, and get a clear
              starting price before you even reach out.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <a
              href={ESTIMATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Build My Quotation</span>
            </a>
          </Reveal>
        </div>

        <div
          className="quotation-features"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}
        >
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) as 1 | 2 | 3}>
              <div
                style={{
                  padding: "1.75rem 1.5rem",
                  background: "var(--color-bg)",
                  border: "1px solid rgba(26,23,20,0.06)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    color: "var(--color-cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
