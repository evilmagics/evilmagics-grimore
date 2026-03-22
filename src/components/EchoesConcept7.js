"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept7() {
  const feedPhotos = photos.slice(0, 6);

  // Advanced Bento Layout for a Sci-Fi / Arcane terminal feel
  const gridStyles = [
    { gridColumn: "span 2", gridRow: "span 2" }, // 0
    { gridColumn: "span 1", gridRow: "span 1" }, // 1
    { gridColumn: "span 1", gridRow: "span 2" }, // 2
    { gridColumn: "span 1", gridRow: "span 1" }, // 3
    { gridColumn: "span 2", gridRow: "span 1" }, // 4
    { gridColumn: "span 2", gridRow: "span 1" }, // 5
  ];

  return (
    <section className="section section-alt" style={{ padding: "4rem 0", background: "linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.02) 50%, transparent)" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Highly Recommended Concept A</span>
          <h2 className="section-title">Cyber-Bento Archive</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, 1fr)", 
            gridAutoRows: "180px", 
            gap: "0.8rem", 
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
                background: "rgba(0,0,0,0.6)",
                // Angled corners typical of sci-fi UIs
                clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                border: "1px solid rgba(0,229,255,0.15)", // Note: clip-path removes actual border, we simulate it via pseudo-element or inner shadow in CSS, but using box-shadow here
                overflow: "hidden",
                transition: "all 0.4s",
                ...gridStyles[i]
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".cb-img").style.transform = "scale(1.05)";
                e.currentTarget.querySelector(".cb-img").style.opacity = "1";
                e.currentTarget.querySelector(".cb-overlay").style.opacity = "1";
                e.currentTarget.querySelector(".cb-hud").style.opacity = "1";
                e.currentTarget.querySelector(".cb-border").style.borderColor = "var(--mana)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".cb-img").style.transform = "scale(1)";
                e.currentTarget.querySelector(".cb-img").style.opacity = "0.6";
                e.currentTarget.querySelector(".cb-overlay").style.opacity = "0";
                e.currentTarget.querySelector(".cb-hud").style.opacity = "0";
                e.currentTarget.querySelector(".cb-border").style.borderColor = "rgba(0,229,255,0.15)";
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
              
              <div
                className="cb-img"
                style={{
                  width: "100%",
                  height: "100%",
                  background: photo.gradient,
                  opacity: 0.6,
                  transition: "all 0.4s ease-out",
                  objectFit: "cover"
                }}
                dangerouslySetInnerHTML={{ __html: photo.svg }}
              />

              {/* Targeting crosshairs / Grid overlay */}
              <div 
                className="cb-overlay"
                style={{
                  position: "absolute",
                  inset: "10%",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                  background: "linear-gradient(90deg, transparent 50%, rgba(0,229,255,0.02) 50%), linear-gradient(transparent 50%, rgba(0,229,255,0.02) 50%)",
                  backgroundSize: "20px 20px",
                  opacity: 0,
                  transition: "opacity 0.4s",
                  pointerEvents: "none",
                  zIndex: 3
                }}
              >
                <div style={{ position: "absolute", top: "-3px", left: "-3px", width: "10px", height: "10px", borderTop: "2px solid var(--mana)", borderLeft: "2px solid var(--mana)" }}/>
                <div style={{ position: "absolute", bottom: "-3px", right: "-3px", width: "10px", height: "10px", borderBottom: "2px solid var(--mana)", borderRight: "2px solid var(--mana)" }}/>
              </div>

              {/* HUD Content */}
              <div
                className="cb-hud"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  opacity: 0,
                  transition: "opacity 0.4s",
                  zIndex: 4,
                  pointerEvents: "none"
                }}
              >
                <div style={{ padding: "0.5rem", background: "rgba(0,10,15,0.8)", borderLeft: "2px solid var(--mana)", backdropFilter: "blur(4px)" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--mana)", letterSpacing: "1px" }}>
                    // LOG_{photo.id} / TYPE: {photo.category.toUpperCase()}
                  </div>
                  <h3 style={{ margin: "0.2rem 0", fontSize: "1rem", color: "#ececec" }}>
                    {photo.title}
                  </h3>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.55rem", fontFamily: "monospace", color: "rgba(255,255,255,0.6)", marginTop: "0.4rem" }}>
                    <span>APT_{photo.exif.aperture}</span>
                    <span>SHT_{photo.exif.shutter}</span>
                    <span>ISO_{photo.exif.iso}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 200px !important;
          }
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
