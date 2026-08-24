"use client";

import Link from "next/link";
import Reveal from "./Reveal";

export default function Gallery({
  photos,
}: {
  photos: { src: string; thumb?: string | null }[];
}) {
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
          {photos.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className="gallery-item"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                breakInside: "avoid",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.thumb || photo.src}
                alt={`Photograph ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <Link href="/portfolio" className="btn-primary">
            <span>View Full Portfolio</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
