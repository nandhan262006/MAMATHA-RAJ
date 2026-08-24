"use client";

import { useState } from "react";

export type GalleryPhoto = { src: string; thumb?: string | null };

export default function PortfolioGallery({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            onClick={() => setLightbox(photo.src)}
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              cursor: "pointer",
              background: "#1a1714",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.thumb || photo.src}
              alt={`Photograph ${i + 1}`}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease, filter 0.3s ease",
                filter: "grayscale(10%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.filter = "grayscale(0%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "grayscale(10%)";
              }}
            />
          </div>
        ))}
      </div>

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Full view"
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
          />
        </div>
      )}
    </>
  );
}
