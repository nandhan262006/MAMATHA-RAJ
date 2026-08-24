"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import type { AboutContent } from "@/lib/about";

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

function HeadingWithAccent({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return <>{text}</>;
  const last = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");
  return (
    <>
      {rest}{" "}
      <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
        {last}
      </em>
    </>
  );
}

export default function About({ content }: { content: AboutContent }) {
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
              src={content.imageUrl}
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
              {content.label}
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
              <HeadingWithAccent text={content.heading} />
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
              {content.paragraph1}
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
              {content.paragraph2}
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
              {content.stats.map((stat, i) => (
                <Stat key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
