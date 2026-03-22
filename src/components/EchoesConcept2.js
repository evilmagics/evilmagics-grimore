"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept2() {
  const previewPhotos = photos.slice(0, 3);

  return (
    <section className="section" style={{ padding: "4rem 0", background: "rgba(0,10,15,0.3)" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Concept 2: Holographic Databanks</span>
          <h2 className="section-title">Neural Archive</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          {previewPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="elec-target"
              style={{
                position: "relative",
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                padding: "1rem",
                border: "1px solid rgba(0,229,255,0.1)",
                background: "rgba(0,229,255,0.02)",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,229,255,0.08)";
                e.currentTarget.querySelector(".holo-img").style.filter = "none";
                e.currentTarget.querySelector(".holo-overlay").style.opacity = "0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,229,255,0.02)";
                e.currentTarget.querySelector(".holo-img").style.filter = "contrast(1.2) sepia(1) hue-rotate(150deg) saturate(2)";
                e.currentTarget.querySelector(".holo-overlay").style.opacity = "0.3";
              }}
            >
              <div style={{ position: "relative", width: "40%", flexShrink: 0 }}>
                <div
                  className="holo-img"
                  style={{
                    width: "100%",
                    aspectRatio: photo.aspect,
                    background: photo.gradient,
                    filter: "contrast(1.2) sepia(1) hue-rotate(150deg) saturate(2)",
                    transition: "filter 0.4s",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  dangerouslySetInnerHTML={{ __html: photo.svg }}
                />
                <div
                  className="holo-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,229,255,0.1) 2px, rgba(0,229,255,0.1) 4px)",
                    pointerEvents: "none",
                    opacity: 0.3,
                    transition: "opacity 0.4s"
                  }}
                />
              </div>
              <div style={{ flex: 1, fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,0.7)" }}>
                <h3 style={{ color: "var(--mana)", fontSize: "1rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "2px" }}>
                  {photo.title}
                </h3>
                <div style={{ fontSize: "0.75rem", lineHeight: 1.6 }}>
                  <div>[CATEGORY]: {photo.category}</div>
                  <div>[APERTURE]: {photo.exif.aperture}</div>
                  <div>[SHUTTER_SPEED]: {photo.exif.shutter}</div>
                  <div>[SENSOR_ISO]: {photo.exif.iso}</div>
                  <div>[LENS_FOCAL]: {photo.exif.focal}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
