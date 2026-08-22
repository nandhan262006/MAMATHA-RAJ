const ITEMS = [
  "Wedding Photography",
  "Pre-Wedding Shoots",
  "Portrait Sessions",
  "Cinematic Films",
  "Event Coverage",
  "Destination Shoots",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      style={{
        padding: "3rem 0",
        background: "var(--color-charcoal)",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 300,
              color: "rgba(255,249,242,0.15)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "4rem",
            }}
          >
            {item}
            <span
              className="dot"
              style={{
                width: 6,
                height: 6,
                background: "var(--color-accent)",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
