"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

export type TestimonialSlide = {
  img: string;
  ratio: string;
  quote: string;
  author: string;
  role: string;
};

const FALLBACK_SLIDES: TestimonialSlide[] = [
  {
    img: "/downloads/2026-07-20_07-34-52_UTC_2.jpg",
    ratio: "2743/1837",
    quote:
      "Mamatha Raj didn't just photograph our wedding — they captured our souls. Every time we look at the album, we relive those magical moments. The attention to detail and the emotional depth in their work is unmatched.",
    author: "Ananya & Rohit",
    role: "Udaipur Wedding · December 2024",
  },
  {
    img: "/downloads/2026-07-30_13-29-10_UTC_2.jpg",
    ratio: "3072/4096",
    quote:
      "From the first consultation to the final delivery, the experience was nothing short of extraordinary. Their ability to find beauty in candid moments is what sets them apart. Truly artists at heart.",
    author: "Priya & Arjun",
    role: "Jaipur Pre-Wedding · March 2025",
  },
  {
    img: "/downloads/2026-06-18_06-13-07_UTC_3.jpg",
    ratio: "3391/4096",
    quote:
      "We were nervous about our destination wedding in Goa, but the Mamatha Raj team made everything seamless. The photos are breathtaking — they turned our celebration into a work of art that we'll treasure forever.",
    author: "Meera & Vikram",
    role: "Goa Wedding · October 2024",
  },
];

export default function Testimonials({
  slides = FALLBACK_SLIDES,
}: {
  slides?: TestimonialSlide[];
}) {
  const [current, setCurrent] = useState(0);
  const total = Math.max(slides.length, 1);

  const goToSlide = (index: number) => {
    setCurrent(((index % total) + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(() => goToSlide(current + 1), 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = slides[current] ?? FALLBACK_SLIDES[0];

  return (
    <section
      className="section testimonials"
      id="testimonials"
      style={{ padding: "clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)", background: "var(--color-bg-warm)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
            Kind Words
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
              marginBottom: "4rem",
            }}
          >
            What Our{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              Clients
            </em>{" "}
            Say
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div
              className="testimonial-card"
              style={{
                minWidth: "100%",
                padding: "0 2rem",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "4rem",
                alignItems: "center",
                opacity: 0,
                animation: "testimonialFade 0.6s ease forwards",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 320,
                  aspectRatio: slide.ratio || "3/4",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.author}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <blockquote
                  className="testimonial-quote"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                    color: "var(--color-fg)",
                    marginBottom: "2rem",
                    paddingLeft: "2rem",
                    borderLeft: "2px solid var(--color-accent)",
                  }}
                >
                  &ldquo;{slide.quote}&rdquo;
                </blockquote>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {slide.author}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-fg-muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {slide.role}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "3rem",
                justifyContent: "center",
              }}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "1px solid var(--color-fg-muted)",
                    background:
                      i === current ? "var(--color-accent)" : "transparent",
                    borderColor:
                      i === current ? "var(--color-accent)" : undefined,
                    transform: i === current ? "scale(1.2)" : undefined,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "2rem",
                justifyContent: "center",
              }}
            >
              <button
                className="arrow-btn"
                aria-label="Previous"
                onClick={() => goToSlide(current - 1)}
                style={{
                  width: 48,
                  height: 48,
                  border: "1px solid rgba(26,23,20,0.15)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="18"
                  height="18"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="arrow-btn"
                aria-label="Next"
                onClick={() => goToSlide(current + 1)}
                style={{
                  width: 48,
                  height: 48,
                  border: "1px solid rgba(26,23,20,0.15)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="18"
                  height="18"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
