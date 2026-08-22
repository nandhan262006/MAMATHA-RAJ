"use client";

import Reveal from "./Reveal";

const SERVICES = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Portrait Session",
  "Cinematic Film",
  "Event Coverage",
  "Destination Shoot",
];

const WHATSAPP = "919010627571";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        style={{
          background: "var(--color-charcoal)",
          overflow: "hidden",
        }}
      >
        {/* ── Top banner ── */}
        <div
          style={{
            textAlign: "center",
            padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 4vw, 3rem)",
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
              Get in Touch
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
              Let&apos;s Create Something{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
                Beautiful
              </em>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,249,242,0.55)",
                maxWidth: 500,
                lineHeight: 1.75,
                margin: "1.5rem auto 0",
              }}
            >
              Whether it&apos;s a grand wedding or an intimate portrait session,
              we&apos;d love to hear about your vision.
            </p>
          </Reveal>
        </div>

        {/* ── Content grid ── */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          }}
        >
          {/* ── Info side ── */}
          <Reveal>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "3rem" }}>
                <InfoCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                  label="Studio"
                  value="3-5-80/B, Pumping Well Rd, Khammam"
                  href="https://maps.app.goo.gl/3qw42se3NcCPctWEA"
                />
                <InfoCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                  label="Phone"
                  value="090106 27571"
                  href="tel:+919010627571"
                />
                <InfoCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                  label="Email"
                  value="hello@mamatharaj.in"
                  href="mailto:hello@mamatharaj.in"
                />
                <InfoCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  }
                  label="Instagram"
                  value="@mamatharaj.studio"
                  href="https://instagram.com/mamatharaj.studio"
                />
              </div>

              {/* ── WhatsApp CTA ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,249,242,0.06)",
                }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FBBC04" />
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-cream)" }}>5.0</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,249,242,0.4)" }}>21 Google Reviews</div>
                </div>
                <a
                  href="https://maps.app.goo.gl/3qw42se3NcCPctWEA"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-accent-light)",
                    textDecoration: "none",
                  }}
                >
                  Directions →
                </a>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'm interested in your photography services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 2rem",
                  background: "#25D366",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1da851"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* ── Form side ── */}
          <Reveal delay={1}>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const lines = [
                  "New enquiry from mamatharaj.in",
                  `Name: ${data.get("name")}`,
                  `Email: ${data.get("email") || "—"}`,
                  `Phone: ${data.get("phone") || "—"}`,
                  `Service: ${data.get("service") || "—"}`,
                  `Message: ${data.get("message") || "—"}`,
                ];
                window.open(
                  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    lines.join("\n")
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <InputField label="Your Name" htmlFor="name" placeholder="Enter your name" required />
                <InputField label="Email" htmlFor="email" type="email" placeholder="your@email.com" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <InputField label="Phone" htmlFor="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label
                    htmlFor="service"
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "rgba(255,249,242,0.5)",
                    }}
                  >
                    Service
                  </label>
                  <select
                    id="service"
                    defaultValue=""
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      padding: "0.9rem 1rem",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,249,242,0.1)",
                      color: "var(--color-cream)",
                      outline: "none",
                      borderRadius: 0,
                      transition: "border-color 0.3s",
                      width: "100%",
                      appearance: "none" as const,
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,249,242,0.1)"; }}
                  >
                    <option value="" style={{ background: "#2C2824" }}>Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} style={{ background: "#2C2824" }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label
                  htmlFor="message"
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(255,249,242,0.5)",
                  }}
                >
                  Tell Us Your Story
                </label>
                <textarea
                  id="message"
                  placeholder="Share details about your celebration, date, location..."
                  rows={4}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    padding: "0.9rem 1rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,249,242,0.1)",
                    color: "var(--color-cream)",
                    outline: "none",
                    borderRadius: 0,
                    resize: "vertical" as const,
                    minHeight: 100,
                    width: "100%",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,249,242,0.1)"; }}
                />
              </div>
              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  padding: "1rem 2.5rem",
                  background: "var(--color-accent)",
                  color: "var(--color-cream)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  border: "none",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; }}
              >
                <span>Send Message</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── Floating WhatsApp Button ── */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'm interested in your photography services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
          zIndex: 900,
          transition: "all 0.3s",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37, 211, 102, 0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37, 211, 102, 0.4)"; }}
      >
        <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1.25rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,249,242,0.06)",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(196,85,45,0.3)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,249,242,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <div style={{ color: "var(--color-accent-light)" }}>{icon}</div>
      <div>
        <div
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(255,249,242,0.35)",
            marginBottom: "0.25rem",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.05rem",
            color: "var(--color-cream)",
            lineHeight: 1.4,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {content}
      </a>
    );
  }
  return content;
}

function InputField({
  label,
  htmlFor,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  htmlFor: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(255,249,242,0.5)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        id={htmlFor}
        placeholder={placeholder}
        required={required}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9rem",
          padding: "0.9rem 1rem",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,249,242,0.1)",
          color: "var(--color-cream)",
          outline: "none",
          borderRadius: 0,
          width: "100%",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,249,242,0.1)"; }}
      />
    </div>
  );
}
