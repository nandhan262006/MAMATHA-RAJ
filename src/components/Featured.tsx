"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import type { StoryContent } from "@/lib/story";

export default function Featured({ content }: { content: StoryContent }) {
  const DETAILS = content.details;
  return (
    <section
      id="featured"
      style={{
        background: "var(--color-charcoal)",
        overflow: "hidden",
      }}
    >
      {/* ── Top: Full-width hero image ── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(400px, 60vw, 700px)", overflow: "hidden" }}>
        <img
          src={content.imageUrl}
          alt={content.label}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 30%, rgba(44,40,36,1) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)",
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
              {content.label}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--color-cream)",
              }}
            >
              {content.headingPlain}{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
                {content.headingAccent}
              </em>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Bottom: Content + small images ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "start",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <div>
          <Reveal>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,249,242,0.6)",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
                maxWidth: 480,
              }}
            >
              {content.description}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,249,242,0.08)",
              }}
            >
              {DETAILS.map((d) => (
                <div key={d.label}>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "rgba(255,249,242,0.35)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {d.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.15rem",
                      color: "var(--color-cream)",
                    }}
                  >
                    {d.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={2}>
            <Link
              href="/story"
              className="btn-primary"
              style={{ marginTop: "2.5rem" }}
            >
              <span>{content.buttonText}</span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            <div style={{ overflow: "hidden", aspectRatio: "3/4", marginTop: "3rem" }}>
              <img
                src={content.small1Url}
                alt="Wedding details"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
            <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
              <img
                src={content.small2Url}
                alt="Wedding moments"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
