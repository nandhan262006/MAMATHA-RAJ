"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const num = parseInt(value);
            const suffix = value.replace(/[0-9]/g, "");
            let current = 0;
            const step = Math.ceil(num / 40);
            const timer = setInterval(() => {
              current += step;
              if (current >= num) {
                current = num;
                clearInterval(timer);
              }
              setDisplay(current + suffix);
            }, 30);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div>
      <div
        ref={ref}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.5rem",
          fontWeight: 300,
          color: "var(--color-accent)",
          lineHeight: 1,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-fg-muted)",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      className="section about"
      id="about"
      style={{ padding: "clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)", background: "var(--color-bg)" }}
    >
      <div
        className="about-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              position: "relative",
              maxWidth: 500,
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
            }}
          >
            <img
              src="/ABOUT.jpeg"
              alt="Photographer at work"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 140,
                height: 140,
                border: "1px solid var(--color-accent)",
                opacity: 0.3,
              }}
            />
          </div>
        </Reveal>

        <div style={{ textAlign: "center", maxWidth: 600 }}>
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
              About the Studio
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
                marginBottom: "1.5rem",
              }}
            >
              Where Light Meets{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                Emotion
              </em>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p
              style={{
                color: "var(--color-fg-muted)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
                fontSize: "1rem",
              }}
            >
              Founded in the heart of India, Mamatha Raj was born from a deep
              passion for visual storytelling. We believe that every celebration
              — every laugh, every tear, every stolen glance — deserves to be
              immortalized with cinematic precision.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <p
              style={{
                color: "var(--color-fg-muted)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
                fontSize: "1rem",
              }}
            >
              With over a decade of experience and hundreds of weddings captured
              across India, our team brings an editorial eye and a documentary
              soul to every project. We don&apos;t just take photographs; we
              craft visual narratives that resonate for generations.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div
              style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              marginTop: "3rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(26,23,20,0.08)",
              }}
            >
              <Stat value="500+" label="Weddings Captured" />
              <Stat value="12+" label="Years of Craft" />
              <Stat value="35+" label="Cities Covered" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
