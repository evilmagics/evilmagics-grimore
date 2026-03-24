"use client";
import React from "react";

export default function PhotoCard({ photo, onClick, containerStyle = {} }) {
  if (!photo) return null;

  return (
    <div
      className="elec-target photo-card"
      onClick={onClick}
      style={{
        position: "relative",
        cursor: "pointer",
        // Hologram transparent background
        background: "rgba(0, 25, 40, 0.3)",
        backdropFilter: "blur(6px)",
        // Angled corners typical of sci-fi UIs
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        overflow: "hidden",
        transition: "all 0.4s",
        ...containerStyle
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0, 35, 50, 0.6)";
        e.currentTarget.querySelector(".cb-border").style.borderColor = "var(--mana)";
        e.currentTarget.querySelector(".cb-img").style.transform = "scale(1.05)";
        e.currentTarget.querySelector(".cb-img").style.filter = "none";
        e.currentTarget.querySelector(".cb-img").style.opacity = "1";
        e.currentTarget.querySelector(".cb-noise").style.opacity = "0";
        e.currentTarget.querySelector(".cb-encrypt").style.opacity = "0";
        e.currentTarget.querySelector(".cb-hologram-lines").style.opacity = "0";
        e.currentTarget.querySelector(".cb-overlay").style.background = "linear-gradient(to top, rgba(0,25,35,0.9), transparent 60%)";
        e.currentTarget.querySelector(".cb-content").style.transform = "translateY(0)";
        e.currentTarget.querySelector(".cb-content").style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 25, 40, 0.3)";
        e.currentTarget.querySelector(".cb-border").style.borderColor = "rgba(0,229,255,0.15)";
        e.currentTarget.querySelector(".cb-img").style.transform = "scale(1)";
        e.currentTarget.querySelector(".cb-img").style.filter = "contrast(1.5) grayscale(1) brightness(0.4)";
        e.currentTarget.querySelector(".cb-img").style.opacity = "0.4"; // Hologram semi-transparency
        e.currentTarget.querySelector(".cb-noise").style.opacity = "0.2";
        e.currentTarget.querySelector(".cb-encrypt").style.opacity = "1";
        e.currentTarget.querySelector(".cb-hologram-lines").style.opacity = "1";
        e.currentTarget.querySelector(".cb-overlay").style.background = "linear-gradient(to top, rgba(0,0,0,0.6), transparent 40%)";
        e.currentTarget.querySelector(".cb-content").style.transform = "translateY(10px)";
        e.currentTarget.querySelector(".cb-content").style.opacity = "0";
      }}
    >
      {/* Fake border to respect clipPath */}
      <div
        className="cb-border"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid rgba(0,229,255,0.15)",
          transition: "border-color 0.4s",
          zIndex: 2,
          pointerEvents: "none",
          boxSizing: "border-box"
        }}
      />

      {/* Hologram Scanlines Effect for Default State */}
      <div
        className="cb-hologram-lines"
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,229,255,0.05) 2px, rgba(0,229,255,0.05) 4px)",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <div
        className="cb-img"
        style={{
          width: "100%",
          height: "100%",
          background: photo.gradient,
          opacity: 0.4, // Make it transparent by default
          filter: "contrast(1.5) grayscale(1) brightness(0.4)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          objectFit: "cover",
          zIndex: 0
        }}
        dangerouslySetInnerHTML={{ __html: photo.svg }}
      />

      {/* Noise / Encrypted Overlay */}
      <div
        className="cb-noise"
        style={{
          position: "absolute",
          inset: 0,
          background: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\" opacity=\"0.15\"/></svg>')",
          mixBlendMode: "screen",
          opacity: 0.2,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      {/* Encrypted Text in the middle */}
      <div
        className="cb-encrypt"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Courier New', monospace",
          fontSize: "0.75rem",
          color: "rgba(0,229,255,0.5)", // Cyan color for hologram
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "opacity 0.4s ease",
          zIndex: 3,
          pointerEvents: "none",
          textAlign: "center",
          padding: "0 10px"
        }}
      >
        // ENCRYPT_FILE_{photo.id}
      </div>

      {/* Bottom Dark Gradient from Memory Mosaic */}
      <div
        className="cb-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 40%)",
          transition: "background 0.4s",
          pointerEvents: "none",
          zIndex: 4
        }}
      />

      {/* Memory Mosaic Layout Details */}
      <div
        className="cb-content"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.2rem",
          transform: "translateY(10px)",
          opacity: 0,
          transition: "all 0.4s ease",
          pointerEvents: "none",
          zIndex: 5
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--mana)", marginBottom: "0.2rem", letterSpacing: "2px" }}>
          {photo.category?.toUpperCase()} // ID:{photo.id}
        </div>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
          {photo.title}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.55rem", fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>
          {photo.exif_data?.aperture && <span>{photo.exif_data.aperture}</span>}
          {photo.exif_data?.shutter && <span>{photo.exif_data.shutter}</span>}
          {photo.exif_data?.iso && <span>{photo.exif_data.iso}</span>}
        </div>
      </div>
    </div>
  );
}
