"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept4() {
  const previewPhotos = photos.slice(0, 3);

  return (
    <section className="section" style={{ padding: "4rem 0" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "4rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Concept 4: Void Portals</span>
          <h2 className="section-title">Chronicle Orbs</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", maxWidth: "960px", margin: "0 auto" }}>
          {previewPhotos.map((photo) => (
            <div
              key={photo.id}
              className="elec-target"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                cursor: "pointer",
                width: "250px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".portal-orb").style.transform = "scale(1.08)";
                e.currentTarget.querySelector(".portal-orb").style.boxShadow = "0 0 30px rgba(0,229,255,0.6), inset 0 0 20px rgba(0,229,255,0.4)";
                e.currentTarget.querySelector(".portal-text").style.opacity = "1";
                e.currentTarget.querySelector(".portal-text").style.transform = "translateY(0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".portal-orb").style.transform = "scale(1)";
                e.currentTarget.querySelector(".portal-orb").style.boxShadow = "0 0 15px rgba(0,229,255,0.2), inset 0 0 10px rgba(0,229,255,0.1)";
                e.currentTarget.querySelector(".portal-text").style.opacity = "0.6";
                e.currentTarget.querySelector(".portal-text").style.transform = "translateY(5px)";
              }}
            >
              <div
                className="portal-orb"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 15px rgba(0,229,255,0.2), inset 0 0 10px rgba(0,229,255,0.1)",
                  transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  border: "2px solid rgba(0,229,255,0.3)"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: photo.gradient,
                    objectFit: "cover"
                  }}
                  dangerouslySetInnerHTML={{ __html: photo.svg }}
                />
              </div>
              <div
                className="portal-text"
                style={{
                  textAlign: "center",
                  opacity: 0.6,
                  transform: "translateY(5px)",
                  transition: "all 0.4s ease",
                  fontFamily: "Georgia, serif", 
                  color: "#e0d8c8"
                }}
              >
                <div style={{ fontSize: "1.1rem", fontStyle: "italic", marginBottom: "0.3rem" }}>{photo.title}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--mana)" }}>
                  {photo.exif.aperture} • {photo.exif.iso}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
