"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { photos } from "../data/photos";

export default function EchoesConcept1() {
  const previewPhotos = photos.slice(0, 3);

  return (
    <section className="section section-alt" style={{ padding: "4rem 0" }}>
      <ScrollReveal>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--mana)" }}>:: Concept 1: Memory Shards</span>
          <h2 className="section-title">Fragmented Echoes</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: "960px", margin: "0 auto" }}>
          {previewPhotos.map((photo, i) => {
            const clipPaths = [
              "polygon(10% 0, 100% 15%, 90% 100%, 0 85%)",
              "polygon(0 10%, 85% 0, 100% 90%, 15% 100%)",
              "polygon(5% 5%, 95% 0, 100% 95%, 0 90%)"
            ];
            const clip = clipPaths[i % clipPaths.length];

            return (
              <div
                key={photo.id}
                className="elec-target"
                style={{
                  position: "relative",
                  cursor: "crosshair",
                  transition: "all 0.5s ease",
                  filter: "drop-shadow(0 0 10px rgba(0,229,255,0.1))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "drop-shadow(0 0 25px rgba(0,229,255,0.4))";
                  e.currentTarget.querySelector(".shard-img").style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
                  e.currentTarget.querySelector(".shard-img").style.transform = "scale(1.05)";
                  e.currentTarget.querySelector(".shard-meta").style.opacity = "1";
                  e.currentTarget.querySelector(".shard-meta").style.transform = "translateY(0)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(0,229,255,0.1))";
                  e.currentTarget.querySelector(".shard-img").style.clipPath = clip;
                  e.currentTarget.querySelector(".shard-img").style.transform = "scale(1)";
                  e.currentTarget.querySelector(".shard-meta").style.opacity = "0.5";
                  e.currentTarget.querySelector(".shard-meta").style.transform = "translateY(10px)";
                }}
              >
                <div
                  className="shard-img"
                  style={{
                    width: "100%",
                    aspectRatio: photo.aspect,
                    background: photo.gradient,
                    clipPath: clip,
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  dangerouslySetInnerHTML={{ __html: photo.svg }}
                />
                <div
                  className="shard-meta"
                  style={{
                    marginTop: "1rem",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.7rem",
                    color: "var(--mana)",
                    opacity: 0.5,
                    transform: "translateY(10px)",
                    transition: "all 0.4s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}
                >
                  <div>[ID: {photo.id}] {photo.title}</div>
                  <div style={{ fontSize: "0.6rem", opacity: 0.7, marginTop: "0.2rem" }}>
                    EXTRCT_METRICS: {photo.exif.aperture} | {photo.exif.shutter} | {photo.exif.iso}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
