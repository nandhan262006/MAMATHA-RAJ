"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const INSTAGRAM_URL = "https://www.instagram.com/mamatha__raj.photography/";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const hidden = isHome && !scrolled && !open;
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", onClick as EventListener)
    );
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.removeEventListener("click", onClick as EventListener)
      );
    };
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: open ? "1rem clamp(1rem, 4vw, 3rem)" : scrolled ? "1rem clamp(1rem, 4vw, 3rem)" : "1.5rem clamp(1rem, 4vw, 3rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(250, 246, 241, 0.98)",
        boxShadow: "0 1px 0 rgba(26,23,20,0.06)",
        transition: "padding 0.4s ease, opacity 0.4s ease, transform 0.4s ease",
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <a
        href={isHome ? "#home" : "/"}
        className="nav-logo"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.6rem",
          letterSpacing: "0.08em",
          color: "var(--color-fg)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <img
          src="/logo.png"
          alt="Mamatharaj logo"
          style={{ height: 40, width: "auto", display: "block" }}
        />
        Mamatharaj
      </a>

      <ul
        className={`nav-links ${open ? "open" : ""}`}
        style={{
          display: "flex",
          gap: "2.5rem",
          listStyle: "none",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={resolveHref(link.href)}
              className="nav-link-item"
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-fg-muted)",
                textDecoration: "none",
                transition: "color 0.3s",
                position: "relative",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="nav-insta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid rgba(26,23,20,0.15)",
              color: "var(--color-fg)",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,23,20,0.15)";
              e.currentTarget.style.color = "var(--color-fg)";
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="17" height="17">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="nav-cta"
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-cream)",
              background: "var(--color-accent)",
              padding: "0.7rem 1.6rem",
              textDecoration: "none",
              transition: "background 0.3s",
            }}
          >
            Book Now
          </a>
        </li>
      </ul>

      <button
        className={`hamburger ${open ? "active" : ""}`}
        aria-label="Menu"
        onClick={() => setOpen(!open)}
        style={{
          display: "none",
          flexDirection: "column",
          gap: 5,
          cursor: "pointer",
          zIndex: 1001,
          background: "none",
          border: "none",
        }}
      >
        <span style={{ width: 24, height: 1.5, background: "var(--color-fg)", transition: "all 0.3s" }} />
        <span style={{ width: 24, height: 1.5, background: "var(--color-fg)", transition: "all 0.3s" }} />
        <span style={{ width: 24, height: 1.5, background: "var(--color-fg)", transition: "all 0.3s" }} />
      </button>
    </nav>
  );
}
