"use client";

import Reveal from "./Reveal";

const ITEMS = [
  {
    src: "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
    category: "wedding",
    title: "Ananya & Rohit",
    cat: "Wedding · Udaipur",
  },
  {
    src: "/downloads/2026-07-08_11-19-45_UTC_1.jpg",
    category: "prewedding",
    title: "Priya & Arjun",
    cat: "Pre-Wedding · Jaipur",
  },
  {
    src: "/downloads/2026-07-20_07-34-52_UTC_1.jpg",
    category: "wedding",
    title: "Meera & Vikram",
    cat: "Wedding · Goa",
  },
  {
    src: "/downloads/2026-07-30_13-29-10_UTC_1.jpg",
    category: "portrait",
    title: "Kavya Solo",
    cat: "Portrait · Studio",
  },
  {
    src: "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
    category: "prewedding",
    title: "Nisha & Karthik",
    cat: "Pre-Wedding · Ooty",
  },
  {
    src: "/downloads/2026-06-19_06-12-31_UTC_2.jpg",
    category: "wedding",
    title: "Divya & Suresh",
    cat: "Wedding · Hyderabad",
  },
];

export default function Gallery() {
  return (
    <section
      className="section gallery"
      id="gallery"
      style={{ padding: "clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)", background: "var(--color-bg-warm)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "4rem",
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
                marginBottom: 0,
                }}
              >
                Selected Works
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
                }}
              >
                Portfolio{" "}
                <em
                  style={{ fontStyle: "italic", color: "var(--color-accent)" }}
                >
                  Highlights
                </em>
              </h2>
            </Reveal>
          </div>
        </div>

        <div
          className="gallery-columns"
          style={{
            columns: 3,
            rowGap: 0,
            transition: "opacity 0.3s",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.src}
              className="gallery-item"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                breakInside: "avoid",
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div
                className="gallery-item-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(26,23,20,0.7) 100%)",
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      color: "var(--color-cream)",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      opacity: 0.7,
                      color: "var(--color-cream)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {item.cat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
