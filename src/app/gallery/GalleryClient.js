"use client";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import ScrollReveal from "../../components/ScrollReveal";
import PhotoCard from "../../components/ui/PhotoCard";
import PhotoModal from "../../components/ui/PhotoModal";

export default function GalleryClient({ photos = [], categories = [] }) {
  const categoryNames = useMemo(() => ["All", ...categories.map(c => c.name)], [categories]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory, photos]);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        {/* Fog Header */}
        <section
          style={{
            position: "relative",
            padding: "5rem 3rem 3rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(13,31,23,0.3) 40%, rgba(5,5,5,0) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background:
                "linear-gradient(to top, var(--base), transparent)",
              pointerEvents: "none",
            }}
          />

          <ScrollReveal>
            <span className="section-label">:: Echoes.gallery</span>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--mist)",
                marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              The Moonlit Gallery
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "rgba(224,224,224,0.32)",
                fontSize: "0.9rem",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              Fragments of memory captured through the lens — whispers of light and shadow.
            </p>
          </ScrollReveal>
        </section>

        <section className="section" style={{ paddingTop: "1rem" }}>
          {/* Category filter */}
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "3rem",
                flexWrap: "wrap",
              }}
            >
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontSize: "0.5rem",
                    letterSpacing: "0.2em",
                    color:
                      activeCategory === cat ? "#050505" : "rgba(224,224,224,0.4)",
                    background:
                      activeCategory === cat ? "var(--mana)" : "transparent",
                    border: "1px solid rgba(0,229,255,0.12)",
                    padding: "0.3rem 0.8rem",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.target.style.borderColor = "rgba(0,229,255,0.3)";
                      e.target.style.color = "var(--mana)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.target.style.borderColor = "rgba(0,229,255,0.12)";
                      e.target.style.color = "rgba(224,224,224,0.4)";
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Masonry Grid */}
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              columnCount: 3,
              columnGap: "1.2rem",
            }}
            className="masonry-grid"
          >
            {filtered.map((photo) => (
              <ScrollReveal key={photo.id}>
                <PhotoCard
                  photo={photo}
                  onClick={() => setLightbox(photo)}
                  containerStyle={{
                    breakInside: "avoid",
                    marginBottom: "1.2rem",
                    aspectRatio: photo.aspect || "4/3",
                    height: "auto", // the card normally inherits 100% height
                  }}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {lightbox && (
          <PhotoModal
            photo={lightbox}
            onClose={() => setLightbox(null)}
            onNext={() => {
              const idx = filtered.findIndex(p => p.id === lightbox.id);
              if (idx < filtered.length - 1) setLightbox(filtered[idx + 1]);
            }}
            onPrev={() => {
              const idx = filtered.findIndex(p => p.id === lightbox.id);
              if (idx > 0) setLightbox(filtered[idx - 1]);
            }}
          />
        )}
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2 !important;
          }
        }
        @media (max-width: 480px) {
          .masonry-grid {
            column-count: 1 !important;
          }
        }
      `}</style>
    </>
  );
}
