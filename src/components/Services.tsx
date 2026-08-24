"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import type { ServiceCard } from "@/lib/services";

const ROTATE_MS = 5000;

const CARD_W = "min(300px, 65vw)";
const CARD_H = "min(400px, 87vw)";

export default function Services({ services }: { services: ServiceCard[] }) {
  const visible = services.filter((s) => s.imageUrl);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);
  const n = Math.max(visible.length, 1);

  const go = useCallback(
    (i: number) => setActive(((i % n) + n) % n),
    [n]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1), ROTATE_MS);
    return () => clearInterval(id);
  }, [active, paused, go]);

  return (
    <section
      id="services"
      style={{
        padding: "clamp(4rem, 8vw, 8rem) 0",
        background: "var(--color-bg)",
        overflow: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--color-accent)",
              }}
            >
              What We Offer
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                marginTop: "0.75rem",
              }}
            >
              Tailored{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                Experiences
              </em>
            </h2>
          </div>
        </Reveal>

        {/* ── 3D Carousel ── */}
        <div
          style={{
            position: "relative",
            height: CARD_H,
            marginTop: "3.5rem",
            overflow: "hidden",
            perspective: 1400,
            touchAction: "pan-y",
          }}
          onPointerDown={(e) => { dragX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (dragX.current === null) return;
            const dx = e.clientX - dragX.current;
            if (dx < -40) go(active + 1);
            if (dx > 40) go(active - 1);
            dragX.current = null;
          }}
          onPointerCancel={() => { dragX.current = null; }}
        >
          {visible.map((service, i) => {
            const diff = ((i - active) % n + n) % n;
            const offset = diff > n / 2 ? diff - n : diff;
            const abs = Math.abs(offset);
            const hidden = abs > 2;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`View ${service.title}`}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  transform: `translateX(calc(-50% + ${offset * 62}%)) rotateY(${offset * -32}deg) scale(${1 - abs * 0.14})`,
                  opacity: hidden ? 0 : 1 - abs * 0.35,
                  zIndex: 20 - abs * 5,
                  transition: "all 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: hidden ? "default" : "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: 16,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "clamp(1.25rem, 3vw, 1.75rem)",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {service.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                        fontWeight: 700,
                        color: "#fff",
                        marginTop: "0.5rem",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.65)",
                        marginTop: "0.5rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Navigation ── */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              marginTop: "3rem",
            }}
          >
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(26,23,20,0.15)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,23,20,0.15)";
                e.currentTarget.style.color = "inherit";
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {visible.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    height: 8,
                    width: i === active ? 32 : 8,
                    borderRadius: 4,
                    border: "none",
                    background: i === active ? "var(--color-accent)" : "rgba(26,23,20,0.15)",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(26,23,20,0.15)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,23,20,0.15)";
                e.currentTarget.style.color = "inherit";
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
