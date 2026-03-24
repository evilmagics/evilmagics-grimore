"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import PhotoCard from "./ui/PhotoCard";
import PhotoModal from "./ui/PhotoModal";

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
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => setSelectedPhoto(photo)}
                containerStyle={gridStyles[i]}
              />
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
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={() => {
            const idx = feedPhotos.findIndex(p => p.id === selectedPhoto.id);
            if (idx < feedPhotos.length - 1) setSelectedPhoto(feedPhotos[idx + 1]);
          }}
          onPrev={() => {
            const idx = feedPhotos.findIndex(p => p.id === selectedPhoto.id);
            if (idx > 0) setSelectedPhoto(feedPhotos[idx - 1]);
          }}
        />
      )}

      {/* Styles for responsive grid */}
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
      `}</style>
    </>
  );
}
