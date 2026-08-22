"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loaderShown");
    const delay = alreadyShown ? 100 : 2400;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      className="hero"
      id="home"
      style={{
        height: "100vh",
        minHeight: 700,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2rem",
        overflow: "hidden",
      }}
    >
      {/* ── Background Grid ── */}
      <div
        className="hero-grid"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 3,
        }}
      >
        {[
          "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
          "/downloads/2026-07-08_11-13-43_UTC_2.jpg",
          "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
          "/downloads/2026-07-20_07-34-52_UTC_1.jpg",
          "/downloads/2026-07-30_13-29-10_UTC_1.jpg",
          "/downloads/2026-06-19_06-12-31_UTC_2.jpg",
          "/downloads/2026-07-08_11-19-45_UTC_1.jpg",
          "/downloads/2026-06-18_06-13-07_UTC_3.jpg",
          "/downloads/2026-07-08_11-13-43_UTC_3.jpg",
          "/downloads/2026-07-20_07-34-52_UTC_2.jpg",
          "/downloads/2026-07-30_13-29-10_UTC_2.jpg",
          "/downloads/2026-06-19_06-12-31_UTC_3.jpg",
          "/downloads/2026-07-08_11-13-43_UTC_4.jpg",
          "/downloads/2026-07-08_11-19-45_UTC_2.jpg",
          "/downloads/2026-06-18_06-13-07_UTC_1.jpg",
          "/downloads/2026-07-30_13-29-10_UTC_3.jpg",
          "/downloads/2026-07-08_11-13-43_UTC_5.jpg",
          "/downloads/2026-07-20_07-34-52_UTC_3.jpg",
          "/downloads/2026-06-19_06-12-31_UTC_1.jpg",
          "/downloads/2026-07-08_11-19-45_UTC_3.jpg",
          "/downloads/2026-07-30_13-29-10_UTC_4.jpg",
          "/downloads/2023-11-22_08-28-05_UTC.jpg",
          "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
          "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
        ].map((src, i) => (
          <div key={i} style={{ overflow: "hidden", background: "#1a1714", aspectRatio: "3/4" }}>
            <img
              src={src}
              alt=""
              loading="eager"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.6)" }}
            />
          </div>
        ))}

      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {/* Tagline */}
        <p
          style={{
            ...reveal(0),
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "#E8764D",
            marginBottom: "2rem",
          }}
        >
          Photography & Visual Storytelling
        </p>

        {/* Thin decorative line */}
        <div
          style={{
            ...reveal(80),
            width: 60,
            height: 1,
            background: "var(--color-accent)",
            marginBottom: "2.5rem",
          }}
        />

        {/* Main Heading */}
        <h1
          style={{
            ...reveal(160),
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}
        >
          Mamatha
        </h1>
        <h1
          style={{
            ...reveal(240),
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 0.95,
            color: "#E8764D",
            letterSpacing: "-0.02em",
            marginBottom: "2rem",
          }}
        >
          Raj
        </h1>

        {/* Subtitle */}
        <p
          style={{
            ...reveal(360),
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: 480,
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          Capturing light, emotion, and the beauty of every fleeting moment —
          one frame at a time.
        </p>

        {/* CTAs */}
        <div
          style={{
            ...reveal(480),
            display: "flex",
            gap: "1.25rem",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a href="#gallery" className="btn-primary">
            <span>View Portfolio</span>
          </a>
          <a href="#contact" className="btn-outline">
            Book Now
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        className="hero-scroll"
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "3rem",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(255,249,242,0.5)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          writingMode: "vertical-lr",
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: 1,
            height: 60,
            background: "rgba(255,249,242,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100%",
              left: 0,
              width: "100%",
              height: "100%",
              background: "var(--color-accent-light)",
              animation: "scrollDown 2s ease infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
