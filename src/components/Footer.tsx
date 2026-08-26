const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/story", label: "Featured Story" },
  { href: "/contact", label: "Contact" },
];

const SERVICES = [
  { href: "/services/wedding-photography", label: "Wedding Photography" },
  { href: "/services/pre-wedding-shoot", label: "Pre-Wedding" },
  { href: "/services/portrait-sessions", label: "Portraits" },
  { href: "/services/cinematic-films", label: "Cinematic Films" },
  { href: "/services/event-coverage", label: "Events" },
  { href: "/services/destination-shoot", label: "Destination" },
];

const CONTACTS = [
  { href: "tel:+919010627571", label: "+91 90106 27571" },
  { href: "mailto:hello@mamatharaj.in", label: "hello@mamatharaj.in" },
  {
    href: "https://instagram.com/mamatharaj.studio",
    label: "Instagram",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        background: "var(--color-charcoal)",
        color: "rgba(255,249,242,0.6)",
        padding: "clamp(3rem, 5vw, 5rem) clamp(1rem, 4vw, 3rem) 2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div>
          <div
            className="footer-brand"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.8rem",
              color: "var(--color-cream)",
              fontWeight: 300,
              marginBottom: "1rem",
            }}
          >
            Mamatha{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
              Raj
            </em>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 300 }}>
            Capturing light, emotion, and the beauty of every fleeting moment.
            Based in Khammam, available worldwide.
          </p>
        </div>

        <div>
          <h4
            className="footer-heading"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--color-cream)",
              marginBottom: "1.5rem",
            }}
          >
            Pages
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", margin: 0, padding: 0 }}>
            {PAGES.map((p) => (
              <li key={p.label}>
                <a href={p.href} className="footer-link" style={footerLinkStyle}>
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="footer-heading"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--color-cream)",
              marginBottom: "1.5rem",
            }}
          >
            Services
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", margin: 0, padding: 0 }}>
            {SERVICES.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="footer-link" style={footerLinkStyle}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="footer-heading"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--color-cream)",
              marginBottom: "1.5rem",
            }}
          >
            Contact
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", margin: 0, padding: 0 }}>
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="footer-link"
                  style={footerLinkStyle}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,249,242,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "0.75rem",
        }}
      >
        <span>&copy; 2026 Mamatha Raj. All rights reserved.</span>
        <span>Designed with light & love in Khammam</span>
      </div>
    </footer>
  );
}

const footerLinkStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "rgba(255, 249, 242, 0.5)",
  textDecoration: "none",
  transition: "color 0.3s",
};
