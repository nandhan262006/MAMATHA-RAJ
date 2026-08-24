import Reveal from "./Reveal";

const MAPS_URL = "https://maps.app.goo.gl/Ni1ogCMpSQ1qbjw9A";
const EMBED_SRC =
  "https://www.google.com/maps?q=17.2419046,80.1315073&z=16&output=embed";

export default function Map() {
  return (
    <section
      id="location"
      className="map-section"
      style={{
        background: "var(--color-bg)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
      }}
    >
      <Reveal>
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--color-accent-light)",
            marginBottom: "1rem",
          }}
        >
          Visit the Studio
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--color-cream)",
          }}
        >
          Find Us in{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
            Khammam
          </em>
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <div
          className="map-frame"
          style={{
            maxWidth: 1100,
            margin: "clamp(2rem, 4vw, 3.5rem) auto 0",
            border: "1px solid rgba(255,249,242,0.08)",
            padding: 10,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <iframe
            src={EMBED_SRC}
            title="Mamatharaj Photography on Google Maps"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              display: "block",
              width: "100%",
              height: "clamp(320px, 42vw, 460px)",
              border: "none",
            }}
          />
        </div>
      </Reveal>

      <Reveal delay={2}>
        <div
          style={{
            maxWidth: 1100,
            margin: "1.5rem auto 0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.05rem",
              color: "rgba(255,249,242,0.65)",
              lineHeight: 1.6,
            }}
          >
            Mamatharaj Photography — Pumping Well Road, Khammam, Telangana
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent-light)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Open in Google Maps →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
