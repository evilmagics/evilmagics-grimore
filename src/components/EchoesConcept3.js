"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept3() {
  const previewPhotos = photos.slice(0, 3);

  return (
    <section className="section section-alt" style={{ padding: "4rem 0" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Concept 3: Classified Memory</span>
          <h2 className="section-title">Encrypted Runes</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: "960px", margin: "0 auto" }}>
          {previewPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="elec-target"
              style={{
                position: "relative",
                cursor: "pointer",
                padding: "0.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#050505",
                transition: "all 0.4s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--mana)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0,229,255,0.2)";
                e.currentTarget.querySelector(".enc-overlay").style.opacity = "0";
                e.currentTarget.querySelector(".enc-img").style.filter = "none";
                e.currentTarget.querySelector(".enc-text").innerText = `DECRYPTED: ${photo.title}`;
                e.currentTarget.querySelector(".enc-text").style.color = "var(--mana)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.querySelector(".enc-overlay").style.opacity = "1";
                e.currentTarget.querySelector(".enc-img").style.filter = "contrast(1.5) grayscale(1) brightness(0.6)";
                e.currentTarget.querySelector(".enc-text").innerText = `ENCRYPTED_FILE_${photo.id}`;
                e.currentTarget.querySelector(".enc-text").style.color = "rgba(255,255,255,0.5)";
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: photo.aspect }}>
                <div
                  className="enc-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: photo.gradient,
                    filter: "contrast(1.5) grayscale(1) brightness(0.6)",
                    transition: "filter 0.5s ease"
                  }}
                  dangerouslySetInnerHTML={{ __html: photo.svg }}
                />
                <div
                  className="enc-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\" opacity=\"0.15\"/></svg>')",
                    mixBlendMode: "screen",
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none"
                  }}
                />
              </div>
              <div
                className="enc-text"
                style={{
                  marginTop: "0.8rem",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  transition: "color 0.4s",
                  letterSpacing: "0.1em",
                  textAlign: "center"
                }}
              >
                ENCRYPTED_FILE_{photo.id}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
