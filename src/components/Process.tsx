import Reveal from "./Reveal";

const STEPS = [
  {
    num: "1",
    title: "Discovery",
    desc: "We learn your vision, understand your story, and plan every detail together.",
  },
  {
    num: "2",
    title: "Concept",
    desc: "Mood boards, shot lists, and creative direction tailored to your celebration.",
  },
  {
    num: "3",
    title: "Capture",
    desc: "The big day — we're there, unobtrusive yet present, catching every fleeting moment.",
  },
  {
    num: "4",
    title: "Deliver",
    desc: "Professionally edited gallery and cinematic film, delivered within 4–6 weeks.",
  },
];

export default function Process() {
  return (
    <section
      className="section process"
      id="process"
      style={{ padding: "clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)", background: "var(--color-bg)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
              textAlign: "center",
            }}
          >
            How We Work
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="section-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: "4rem",
              textAlign: "center",
            }}
          >
            Our{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              Process
            </em>
          </h2>
        </Reveal>

        <div
          className="process-steps"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            position: "relative",
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={(i % 4) as 1 | 2 | 3}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div
                  className="step-number"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--color-cream)",
                    border: "1px solid rgba(26,23,20,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    color: "var(--color-accent)",
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s",
                  }}
                >
                  {s.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
