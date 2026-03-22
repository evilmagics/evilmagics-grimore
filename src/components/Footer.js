export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid rgba(0,229,255,0.05)",
        padding: "1.1rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div
        style={{
          fontSize: "0.52rem",
          letterSpacing: "0.22em",
          color: "rgba(224,224,224,0.25)",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#28ca41",
            display: "inline-block",
            animation: "pulseDot 2s infinite",
          }}
        />
        All runes operational
      </div>
      <div
        style={{
          fontSize: "0.52rem",
          letterSpacing: "0.22em",
          color: "rgba(224,224,224,0.25)",
          textTransform: "uppercase",
        }}
      >
        Backend · Node · PostgreSQL · Cloud
      </div>
      <div
        style={{
          fontSize: "0.52rem",
          letterSpacing: "0.22em",
          color: "rgba(224,224,224,0.25)",
          textTransform: "uppercase",
        }}
      >
        © The Silent Architect · MMXXV
      </div>
    </footer>
  );
}
