"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept5() {
  const previewPhotos = photos.slice(0, 3);

  return (
    <section className="section section-alt" style={{ padding: "4rem 0" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Concept 5: Cyber-Glassmorphism</span>
          <h2 className="section-title">Suspended Fragments</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: "960px", margin: "0 auto" }}>
          {previewPhotos.map((photo) => (
            <div
              key={photo.id}
              className="elec-target"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "1rem",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "var(--mana)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,229,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: photo.aspect,
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: photo.gradient,
                  marginBottom: "1rem"
                }}
                dangerouslySetInnerHTML={{ __html: photo.svg }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ margin: "0 0 0.2rem", fontSize: "0.9rem", color: "#ececec" }}>{photo.title}</h4>
                  <span style={{ fontSize: "0.65rem", color: "var(--mana)", background: "rgba(0,229,255,0.1)", padding: "0.1rem 0.4rem", borderRadius: "10px" }}>
                    {photo.category}
                  </span>
                </div>
                <div style={{ textAlign: "right", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                  <div>{photo.exif.aperture}</div>
                  <div>{photo.exif.iso}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
