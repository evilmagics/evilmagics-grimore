"use client";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept7() {
  const featured = projects.slice(0, 6);

  return (
    <section className="section" style={{ background: "rgba(25,15,5,0.1)", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 7 . Hexagonal Cipher Grid</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="hex-grid" style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {featured.map((proj, idx) => (
            <div 
              key={proj.id} 
              className="hex"
              style={{
                position: "relative",
                width: "300px", height: "260px",
                margin: "-20px 10px", // negative margin for interlocking
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                background: "rgba(0,10,20,0.8)",
                border: "1px solid rgba(0,229,255,0.1)", // border inside clip-path doesn't work well natively, we use inner div
                cursor: "pointer",
                transition: "all 0.4s",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: "2rem"
              }}
            >
              {/* Inner glowing border */}
              <div className="hex-inner" style={{
                position: "absolute", inset: "2px",
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                background: proj.coverGradient,
                zIndex: 1, transition: "all 0.3s",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem"
              }}>
                <div style={{ color: "var(--mana)", fontSize: "0.6rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>{proj.idx}</div>
                <h3 className="hex-title" style={{ color: "var(--mist)", fontSize: "1.2rem", fontFamily: "var(--font-heading)", marginBottom: "1rem", transition: "color 0.3s" }}>
                  {proj.title}
                </h3>
                <p className="hex-desc" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", lineHeight: 1.4, opacity: 0, transition: "all 0.4s", transform: "translateY(10px)", height: 0 }}>
                  {proj.summary}
                </p>
                {/* Abstract rune icon */}
                <svg className="hex-icon" width="30" height="30" viewBox="0 0 100 100" stroke="var(--mana)" fill="none" strokeWidth="2" style={{ transition: "all 0.3s", opacity: 0.5 }}>
                  <polygon points="50,10 90,90 10,90" />
                  <circle cx="50" cy="60" r="15" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <style jsx>{`
        .hex:hover {
          transform: scale(1.05);
          z-index: 10;
        }
        .hex:hover .hex-inner {
          background: rgba(0,229,255,0.05);
          box-shadow: inset 0 0 30px rgba(0,229,255,0.2);
        }
        .hex:hover .hex-desc {
          opacity: 1;
          transform: translateY(0);
          height: auto;
          margin-bottom: 1rem;
        }
        .hex:hover .hex-icon {
          opacity: 1;
          transform: rotate(30deg);
        }
        .hex:hover .hex-title {
          color: var(--mana);
        }
        @media (max-width: 768px) {
          .hex { margin: 10px; }
        }
      `}</style>
    </section>
  );
}
