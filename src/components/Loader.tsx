"use client";

import { useEffect, useState } from "react";

const LETTERS = "Mamatha Raj".split("");

function hasShownBefore(): boolean {
  try {
    return sessionStorage.getItem("loaderShown") !== null;
  } catch {
    return false;
  }
}

export default function Loader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!hasShownBefore()) {
      try {
        sessionStorage.setItem("loaderShown", "1");
      } catch {}
    }
    const t = setTimeout(() => setFading(true), hasShownBefore() ? 150 : 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => setGone(true), 850);
    return () => clearTimeout(t);
  }, [fading]);

  useEffect(() => {
    if (gone) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div className={`loader ${fading ? "hidden" : ""}`} aria-hidden={fading || undefined}>
      <div className="loader-text" aria-hidden="true">
        {LETTERS.map((ch, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
      <div className="loader-bar"></div>
    </div>
  );
}
