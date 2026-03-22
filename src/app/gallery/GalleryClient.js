"use client";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import ScrollReveal from "../../components/ScrollReveal";

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
                <div
                  className="elec-target"
                  style={{
                    breakInside: "avoid",
                    marginBottom: "1.2rem",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(0,229,255,0.06)",
                    transition: "all 0.4s",
                  }}
                  onClick={() => setLightbox(photo)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(0,0,0,0.4), 0 0 15px rgba(0,229,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.06)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: photo.aspect || "4/3",
                      background: photo.gradient,
                      position: "relative",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      padding: "2rem 1rem 0.8rem",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    className="photo-overlay"
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.7rem",
                        color: "var(--mist)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {photo.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.46rem",
                        color: "rgba(0,229,255,0.5)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {photo.exif_data?.aperture} · {photo.exif_data?.shutter} ·{" "}
                      {photo.exif_data?.iso}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {lightbox && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              animation: "fadeUp 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                background: "none",
                border: "1px solid rgba(0,229,255,0.2)",
                color: "var(--mana)",
                fontSize: "0.8rem",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "var(--mana)";
                e.target.style.boxShadow = "0 0 12px var(--mana-glow)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(0,229,255,0.2)";
                e.target.style.boxShadow = "";
              }}
            >
              ✕
            </button>

            <div
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "min(70vw, 800px)",
                  aspectRatio: lightbox.aspect || "4/3",
                  background: lightbox.gradient,
                  position: "relative",
                  border: "1px solid rgba(0,229,255,0.1)",
                }}
              />
              {/* Metadata */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(0,229,255,0.1)",
                  padding: "0.8rem 1rem",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.7rem",
                    color: "var(--mist)",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {lightbox.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.48rem",
                    color: "rgba(0,229,255,0.5)",
                    letterSpacing: "0.1em",
                    lineHeight: 1.8,
                  }}
                >
                  <div>aperture: {lightbox.exif_data?.aperture}</div>
                  <div>shutter: {lightbox.exif_data?.shutter}</div>
                  <div>iso: {lightbox.exif_data?.iso}</div>
                  {lightbox.exif_data?.focal && <div>focal: {lightbox.exif_data.focal}</div>}
                  <div>category: {lightbox.category}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style jsx>{`
        .masonry-grid > div:hover .photo-overlay {
          opacity: 1 !important;
        }
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
