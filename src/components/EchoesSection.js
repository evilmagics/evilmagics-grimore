"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function EchoesSection({ photos = [] }) {
  const feedPhotos = photos.slice(0, 6);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

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
    <>
      <section id="echoes" className="section section-alt" style={{ padding: "4rem 0", background: "linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.015) 50%, transparent)" }}>
        <ScrollReveal>
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <span className="section-label" style={{ color: "var(--mana)" }}>:: Echoes.gallery</span>
            <h2 className="section-title">Fading Memories</h2>
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
                onClick={() => setSelectedPhoto(photo)}
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
                  ...gridStyles[i]
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
                    {photo.category.toUpperCase()} // ID:{photo.id}
                  </div>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                    {photo.title}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.55rem", fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>
                    <span>{photo.exif_data?.aperture}</span>
                    <span>{photo.exif_data?.shutter}</span>
                    <span>{photo.exif_data?.iso}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link
              href="/gallery"
              className="elec-target"
              style={{
                fontSize: "0.56rem",
                letterSpacing: "0.4em",
                color: "rgba(0,229,255,0.36)",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(0,229,255,0.1)",
                paddingBottom: "0.2rem",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--mana)")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(0,229,255,0.36)")
              }
            >
              Access Full Archive ↗
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999, // High z-index to overlay CustomCursor if needed, though they shouldn't conflict
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,5,10,0.85)",
            backdropFilter: "blur(10px)",
            padding: "2rem",
            animation: "fadeIn 0.3s ease-out"
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            style={{
              position: "relative",
              width: "min(1200px, 95vw)",
              maxWidth: "95vw",
              maxHeight: "95vh",
              height: "auto",
              aspectRatio: selectedPhoto.aspect || "16/9",
              background: "rgba(0,25,35,0.4)",
              clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
              border: "1px solid rgba(0,229,255,0.4)",
              boxShadow: "0 0 50px rgba(0,229,255,0.2)",
              animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner content
          >
            {/* Fake border for modal */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid var(--mana)",
                pointerEvents: "none",
                zIndex: 2,
                boxSizing: "border-box"
              }}
            />
            {/* Targeting crosshairs overlay */}
            <div
              style={{
                position: "absolute",
                inset: "2%",
                border: "1px solid rgba(0, 229, 255, 0.3)",
                pointerEvents: "none",
                zIndex: 3
              }}
            >
              <div style={{ position: "absolute", top: "-5px", left: "-5px", width: "15px", height: "15px", borderTop: "2px solid var(--mana)", borderLeft: "2px solid var(--mana)" }} />
              <div style={{ position: "absolute", bottom: "-5px", right: "-5px", width: "15px", height: "15px", borderBottom: "2px solid var(--mana)", borderRight: "2px solid var(--mana)" }} />
            </div>

            <div
              style={{
                width: "100%",
                height: "100%",
                background: selectedPhoto.gradient,
                objectFit: "cover",
                zIndex: 0
              }}
              dangerouslySetInnerHTML={{ __html: selectedPhoto.svg }}
            />

            {/* Modal Content HUD */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem",
                background: "linear-gradient(to top, rgba(0,10,15,0.95), transparent)",
                zIndex: 5,
                pointerEvents: "none"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--mana)", marginBottom: "0.5rem", letterSpacing: "3px" }}>
                    {selectedPhoto.category.toUpperCase()} // ID:{selectedPhoto.id}
                  </div>
                  <h2 style={{ margin: "0", fontSize: "2rem", color: "#fff", textShadow: "0 2px 10px rgba(0,229,255,0.5)" }}>
                    {selectedPhoto.title}
                  </h2>
                </div>
                <div style={{ textAlign: "right", fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "0.2rem 0.85rem", justifyContent: "end", alignItems: "center" }}>
                    <span>{selectedPhoto.exif_data?.aperture || "No data"}</span>
                    <span style={{ color: "var(--mana)" }}>[APT]</span>

                    <span>{selectedPhoto.exif_data?.shutter || "No data"}</span>
                    <span style={{ color: "var(--mana)" }}>[SHT]</span>

                    <span>{selectedPhoto.exif_data?.iso || "No data"}</span>
                    <span style={{ color: "var(--mana)" }}>[ISO]</span>

                    <span>{selectedPhoto.exif_data?.focal || "No data"}</span>
                    <span style={{ color: "var(--mana)" }}>[FCL]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button UI */}
            <div
              className="elec-target"
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: "absolute",
                top: "calc(2% + 0.8rem)",
                right: "calc(2% + 0.8rem)",
                zIndex: 10,
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,10,20,0.6)",
                border: "1px solid var(--mana)",
                color: "var(--mana)",
                fontFamily: "monospace",
                cursor: "pointer",
                clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--mana)";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,10,20,0.6)";
                e.currentTarget.style.color = "var(--mana)";
              }}
            >
              X
            </div>
          </div>
        </div>
      )}

      {/* Styles for responsive grid and modal animations */}
      <style jsx global>{`
        @media (max-width: 768px) {
          #echoes div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 200px !important;
          }
          #echoes div[style*="grid-column: span 2"] {
            grid-column: span 2 !important;
          }
          #echoes div[style*="grid-row: span 2"] {
            grid-row: span 1 !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(10px); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
