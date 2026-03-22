"use client";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept4() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section" style={{ background: "rgba(10,20,25,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 4 . Floating Runestones</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "3rem", maxWidth: "1050px", margin: "0 auto", padding: "4rem 0", flexWrap: "wrap", justifyContent: "center" }}>
          {featured.map((proj) => (
            <div 
              key={proj.id} 
              className="runestone"
              style={{
                width: "280px", height: "350px",
                position: "relative", cursor: "pointer",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: proj.coverGradient,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "2rem", textAlign: "center",
                transition: "all 0.4s ease"
              }}
            >
              <div className="inner-border" style={{
                position: "absolute", inset: "4px",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                border: "1px solid rgba(0,229,255,0.2)",
                transition: "all 0.4s", zIndex: 1
              }} />
              
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ color: "var(--mana)", fontSize: "0.6rem", letterSpacing: "3px", marginBottom: "1rem" }}>
                  {proj.idx}
                </div>
                <h3 style={{ color: "var(--mist)", fontSize: "1.4rem", fontFamily: "var(--font-heading)", marginBottom: "1rem", lineHeight: 1.2 }}>
                  {proj.title}
                </h3>
                <p style={{ color: "rgba(224,224,224,0.5)", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                  {proj.summary}
                </p>
                <div style={{ fontSize: "0.8rem", color: "rgba(0,229,255,0.7)" }}>✦</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <style jsx>{`
        .runestone:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 0 30px var(--mana-glow);
        }
        .runestone:hover .inner-border {
          border-color: var(--mana) !important;
          background: rgba(0,229,255,0.05);
        }
      `}</style>
    </section>
  );
}
