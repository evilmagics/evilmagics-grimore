"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept8() {
  // 5 photos for a perfect zig-zag constellation
  const feedPhotos = photos.slice(0, 5);

  const nodeStyles = [
    { alignSelf: "flex-start", marginLeft: "5%" },
    { alignSelf: "center", marginTop: "-80px", marginLeft: "30%" },
    { alignSelf: "flex-end", marginTop: "-120px", marginRight: "5%" },
    { alignSelf: "flex-start", marginTop: "-40px", marginLeft: "15%" },
    { alignSelf: "center", marginTop: "-60px", marginLeft: "10%" },
  ];

  return (
    <section className="section" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      {/* SVG Network Background */}
      <svg 
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        preserveAspectRatio="none"
      >
        <polyline 
          points="15%,15% 65%,35% 85%,55% 35%,75% 55%,90%" 
          fill="none" 
          stroke="rgba(0,229,255,0.15)" 
          strokeWidth="1.5" 
          strokeDasharray="5 5"
        />
        <circle cx="15%" cy="15%" r="4" fill="var(--mana)" opacity="0.5"/>
        <circle cx="65%" cy="35%" r="4" fill="var(--mana)" opacity="0.5"/>
        <circle cx="85%" cy="55%" r="4" fill="var(--mana)" opacity="0.5"/>
        <circle cx="35%" cy="75%" r="4" fill="var(--mana)" opacity="0.5"/>
        <circle cx="55%" cy="90%" r="4" fill="var(--mana)" opacity="0.5"/>
      </svg>

      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "5rem", position: "relative", zIndex: 1 }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Highly Recommended Concept B</span>
          <h2 className="section-title">Void Constellation</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div 
          className="constellation-container"
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "2rem", 
            maxWidth: "1000px", 
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
            zIndex: 1
          }}
        >
          {feedPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="elec-target"
              style={{
                position: "relative",
                width: "280px",
                height: "200px",
                cursor: "pointer",
                borderRadius: "12px",
                border: "1px solid rgba(0,229,255,0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,229,255,0.05)",
                overflow: "hidden",
                transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                background: "#01080c",
                ...nodeStyles[i]
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,229,255,0.2)";
                e.currentTarget.style.borderColor = "var(--mana)";
                e.currentTarget.style.zIndex = "10";
                e.currentTarget.querySelector(".node-img").style.opacity = "1";
                e.currentTarget.querySelector(".node-img").style.transform = "scale(1.05)";
                e.currentTarget.querySelector(".node-hud").style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,229,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)";
                e.currentTarget.style.zIndex = "1";
                e.currentTarget.querySelector(".node-img").style.opacity = "0.7";
                e.currentTarget.querySelector(".node-img").style.transform = "scale(1)";
                e.currentTarget.querySelector(".node-hud").style.opacity = "0";
              }}
            >
              <div
                className="node-img"
                style={{
                  width: "100%",
                  height: "100%",
                  background: photo.gradient,
                  opacity: 0.7,
                  transition: "all 0.5s ease",
                  objectFit: "cover",
                  mixBlendMode: "screen" // mystical effect
                }}
                dangerouslySetInnerHTML={{ __html: photo.svg }}
              />

              <div
                className="node-hud"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem",
                  background: "linear-gradient(to top, rgba(0,10,15,0.9), transparent)",
                  opacity: 0,
                  transition: "opacity 0.4s",
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "none"
                }}
              >
                <div style={{ color: "var(--mana)", fontSize: "0.6rem", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "0.3rem" }}>
                  NODE // {photo.id} // {photo.category.toUpperCase()}
                </div>
                <h4 style={{ margin: 0, fontSize: "1rem", color: "#ececec" }}>{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .constellation-container > div {
            align-self: center !important;
            margin: 0 !important;
            width: 100% !important;
            height: 220px !important;
          }
          svg {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
