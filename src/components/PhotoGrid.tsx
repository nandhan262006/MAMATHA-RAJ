"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const IMAGES = [
  { src: "/downloads/2026-06-18_06-13-07_UTC_1.jpg", span: "col2 row2" },
  { src: "/downloads/2026-06-18_06-13-07_UTC_2.jpg", span: "" },
  { src: "/downloads/2026-06-18_06-13-07_UTC_3.jpg", span: "" },
  { src: "/downloads/2026-06-19_06-12-31_UTC_1.jpg", span: "" },
  { src: "/downloads/2026-06-19_06-12-31_UTC_2.jpg", span: "col2" },
  { src: "/downloads/2026-06-19_06-12-31_UTC_3.jpg", span: "" },
  { src: "/downloads/2026-07-08_11-13-43_UTC_1.jpg", span: "" },
  { src: "/downloads/2026-07-08_11-13-43_UTC_2.jpg", span: "col2 row2" },
  { src: "/downloads/2026-07-08_11-13-43_UTC_3.jpg", span: "" },
  { src: "/downloads/2026-07-08_11-13-43_UTC_4.jpg", span: "" },
  { src: "/downloads/2026-07-08_11-13-43_UTC_5.jpg", span: "" },
  { src: "/downloads/2026-07-08_11-19-45_UTC_1.jpg", span: "col2" },
  { src: "/downloads/2026-07-08_11-19-45_UTC_2.jpg", span: "" },
  { src: "/downloads/2026-07-08_11-19-45_UTC_3.jpg", span: "" },
  { src: "/downloads/2026-07-20_07-34-52_UTC_1.jpg", span: "" },
  { src: "/downloads/2026-07-20_07-34-52_UTC_2.jpg", span: "col2 row2" },
  { src: "/downloads/2026-07-20_07-34-52_UTC_3.jpg", span: "" },
  { src: "/downloads/2026-07-30_13-29-10_UTC_1.jpg", span: "" },
  { src: "/downloads/2026-07-30_13-29-10_UTC_2.jpg", span: "" },
  { src: "/downloads/2026-07-30_13-29-10_UTC_3.jpg", span: "col2" },
  { src: "/downloads/2026-07-30_13-29-10_UTC_4.jpg", span: "" },
  { src: "/downloads/2023-11-22_08-28-05_UTC.jpg", span: "" },
];

export default function PhotoGrid() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section
        style={{
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem) 3rem",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", marginBottom: "2.5rem" }}>
          <Reveal>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--color-accent)",
                marginBottom: "1rem",
              }}
            >
              All Works
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Every{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                Frame
              </em>
            </h2>
          </Reveal>
        </div>

        <div className="photo-grid">
          {IMAGES.map((img, i) => (
            <Reveal key={i} className={`photo-grid-item ${img.span}`}>
              <div
                onClick={() => setLightbox(img.src)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={img.src}
                  alt="Photo"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease, filter 0.4s ease",
                    filter: "grayscale(15%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.filter = "grayscale(0%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "grayscale(15%)";
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "pointer",
            padding: "2rem",
          }}
        >
          <img
            src={lightbox}
            alt="Full view"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </>
  );
}
