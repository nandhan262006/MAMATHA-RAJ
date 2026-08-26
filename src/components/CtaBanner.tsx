import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section
      className="cta-banner"
      style={{
        width: "100%",
        aspectRatio: "16/9",
        maxHeight: "100vh",
        background: "var(--color-bg-deep)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <video
        className="cta-video"
        src="/downloads/cta-bg-rotated.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        className="cta-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(26, 23, 20, 0.6)",
        }}
      />
      <Reveal>
        <h2
          className="section-title"
          style={{
            position: "relative",
            zIndex: 2,
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--color-cream)",
            margin: "0 2rem",
          }}
        >
          Ready to Tell{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
            Your Story
          </em>
          ?
        </h2>
      </Reveal>
      <Reveal delay={1}>
        <p
          className="section-desc"
          style={{
            position: "relative",
            zIndex: 2,
            fontSize: "1.05rem",
            color: "rgba(255, 249, 242, 0.75)",
            maxWidth: 520,
            lineHeight: 1.75,
            margin: "1rem auto 2.5rem",
            padding: "0 2rem",
          }}
        >
          Let&apos;s create something extraordinary together. Your celebration
          deserves to be remembered forever. Book Khammam&apos;s best
          photographer today.
        </p>
      </Reveal>
      <Reveal delay={2}>
        <a
          href="#contact"
          className="btn-primary"
          style={{ position: "relative", zIndex: 2 }}
        >
          <span>Start Planning</span>
        </a>
      </Reveal>
    </section>
  );
}
