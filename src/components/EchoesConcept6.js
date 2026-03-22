"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept6() {
  // Use all 6 photos to demonstrate a full feed/collage
  const feedPhotos = photos.slice(0, 6);

  // We define a 4-column layout that looks scattered but fits perfectly.
  // Row 1: [0][0][1][2]
  // Row 2: [0][0][3][2]
  // Row 3: [4][4][5][5]
  const gridStyles = [
    { gridColumn: "span 2", gridRow: "span 2" }, // Photo 0: Large square
    { gridColumn: "span 1", gridRow: "span 1" }, // Photo 1: Small square
    { gridColumn: "span 1", gridRow: "span 2" }, // Photo 2: Tall portrait
    { gridColumn: "span 1", gridRow: "span 1" }, // Photo 3: Small square
    { gridColumn: "span 2", gridRow: "span 1" }, // Photo 4: Wide landscape
    { gridColumn: "span 2", gridRow: "span 1" }, // Photo 5: Wide landscape
  ];

  return (
    <section className="section section-alt" style={{ padding: "4rem 0" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Concept 6: Asymmetric Grid</span>
          <h2 className="section-title">Memory Mosaic</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, 1fr)", 
            gridAutoRows: "180px", // Base height for one unit
            gap: "0.5rem", 
            maxWidth: "1080px", 
            margin: "0 auto",
            padding: "0 1rem"
          }}
        >
          {feedPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="elec-target"
              style={{
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.05)",
                ...gridStyles[i]
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".mosaic-img").style.transform = "scale(1.05)";
                e.currentTarget.querySelector(".mosaic-img").style.filter = "brightness(1) contrast(1.1)";
                e.currentTarget.querySelector(".mosaic-overlay").style.background = "linear-gradient(to top, rgba(0,25,35,0.9), transparent 60%)";
                e.currentTarget.querySelector(".mosaic-content").style.transform = "translateY(0)";
                e.currentTarget.querySelector(".mosaic-content").style.opacity = "1";
                e.currentTarget.style.borderColor = "var(--mana)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".mosaic-img").style.transform = "scale(1)";
                e.currentTarget.querySelector(".mosaic-img").style.filter = "brightness(0.7) contrast(1)";
                e.currentTarget.querySelector(".mosaic-overlay").style.background = "linear-gradient(to top, rgba(0,0,0,0.6), transparent 40%)";
                e.currentTarget.querySelector(".mosaic-content").style.transform = "translateY(10px)";
                e.currentTarget.querySelector(".mosaic-content").style.opacity = "0";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              <div
                className="mosaic-img"
                style={{
                  width: "100%",
                  height: "100%",
                  background: photo.gradient,
                  filter: "brightness(0.7) contrast(1)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  objectFit: "cover"
                }}
                dangerouslySetInnerHTML={{ __html: photo.svg }}
              />
              
              <div 
                className="mosaic-overlay" 
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 40%)",
                  transition: "background 0.4s",
                  pointerEvents: "none"
                }}
              />

              <div
                className="mosaic-content"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.2rem",
                  transform: "translateY(10px)",
                  opacity: 0,
                  transition: "all 0.4s ease",
                  pointerEvents: "none"
                }}
              >
                <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--mana)", marginBottom: "0.2rem", letterSpacing: "2px" }}>
                  {photo.category.toUpperCase()} // ID:{photo.id}
                </div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                  {photo.title}
                </h3>
                <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.55rem", fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>
                  <span>{photo.exif.aperture}</span>
                  <span>{photo.exif.shutter}</span>
                  <span>{photo.exif.iso}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      
      {/* Responsive adjustments for phones */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 200px !important;
          }
          /* Override spans for mobile to just standard squares or 2-col full width */
          div[style*="grid-column: span 2"] {
            grid-column: span 2 !important;
          }
          div[style*="grid-row: span 2"] {
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
