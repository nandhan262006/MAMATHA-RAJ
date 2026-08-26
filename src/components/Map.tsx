import Reveal from "./Reveal";
import { SITE_NAME } from "@/lib/site";

const MAPS_URL = "https://maps.app.goo.gl/Ni1ogCMpSQ1qbjw9A";
const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.0!2d80.1514!3d17.2473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMamatharaj%20Photography%20Pumping%20Well%20Road%20Khammam%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

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
            color: "var(--color-accent)",
            marginBottom: "1rem",
          }}
        >
          Visit Our Studio
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--color-charcoal)",
          }}
        >
          Mamatharaj{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
            Photography
          </em>
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <div
          className="map-frame"
          style={{
            maxWidth: 1100,
            margin: "clamp(2rem, 4vw, 3.5rem) auto 0",
            border: "1px solid rgba(44,40,36,0.12)",
            padding: 10,
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <iframe
            src={EMBED_SRC}
            title={`${SITE_NAME} on Google Maps — Pumping Well Road, Khammam`}
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
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.05rem",
                color: "rgba(44,40,36,0.7)",
                lineHeight: 1.6,
              }}
            >
              Mamatharaj Photography — Pumping Well Road, Khammam, Telangana
              507001
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(44,40,36,0.5)",
                marginTop: "0.25rem",
              }}
            >
              Open daily 10:00 AM – 7:00 PM · +91 90106 27571
            </p>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
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
