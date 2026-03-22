"use client";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept2() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section" style={{ background: "rgba(10,5,20,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 2 . Holographic Monoliths</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1050px", margin: "0 auto", padding: "2rem 0", flexWrap: "wrap", justifyContent: "center" }}>
          {featured.map((proj) => (
            <div 
              key={proj.id} 
              className="monolith"
              style={{
                flex: "1 1 300px", minHeight: "450px", position: "relative",
                background: proj.coverGradient,
                border: "1px solid rgba(0,229,255,0.15)",
                cursor: "pointer", overflow: "hidden",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "2rem", transition: "all 0.4s ease"
              }}
            >
              {/* Scanner Line */}
              <div className="scanner" />
              
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ color: "rgba(0,229,255,0.4)", fontSize: "0.6rem", letterSpacing: "3px", marginBottom: "0.5rem" }}>
                  {proj.idx}
                </div>
                <h3 style={{ color: "var(--mist)", fontSize: "1.8rem", fontFamily: "var(--font-heading)", marginBottom: "1rem", lineHeight: 1.1 }}>
                  {proj.title}
                </h3>
                <p className="desc" style={{ color: "rgba(224,224,224,0.6)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {proj.summary}
                </p>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {proj.tags.map(t => (
                    <span key={t} style={{ color: "var(--mana)", fontSize: "0.55rem", borderBottom: "1px solid var(--mana)", paddingBottom: "2px", textTransform: "uppercase" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <style jsx>{`
        .monolith:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,229,255,0.05), inset 0 0 20px rgba(0,229,255,0.1);
          border-color: rgba(0,229,255,0.4) !important;
        }
        .scanner {
          position: absolute; top: -100px; left: 0; width: 100%; height: 50px;
          background: linear-gradient(to bottom, transparent, rgba(0,229,255,0.3));
          border-bottom: 2px solid var(--mana);
          opacity: 0; pointer-events: none; z-index: 1;
        }
        .monolith:hover .scanner {
          animation: scan 1.5s ease-in-out infinite alternate; opacity: 1;
        }
        @keyframes scan {
          0% { top: -50px; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
