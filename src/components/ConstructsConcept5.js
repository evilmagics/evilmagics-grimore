"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept5() {
  const featured = projects.slice(0, 4);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="section" style={{ background: "rgba(15,5,15,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 5 . Holographic Slabs (Accordion)</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "900px", margin: "0 auto", padding: "2rem 0" }}>
          {featured.map((proj, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div 
                key={proj.id}
                onClick={() => setActiveIdx(idx === activeIdx ? -1 : idx)}
                style={{
                  border: isActive ? "1px solid var(--mana)" : "1px solid rgba(0,229,255,0.1)",
                  background: isActive ? "rgba(0,229,255,0.05)" : "rgba(0,0,0,0.4)",
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Header Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 2rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                    <span style={{ color: "rgba(0,229,255,0.4)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "2px" }}>
                      {proj.idx}
                    </span>
                    <h3 style={{ color: "var(--mist)", fontSize: "1.5rem", fontFamily: "var(--font-heading)", margin: 0, textShadow: isActive ? "0 0 10px var(--mana-glow)" : "none", transition: "all 0.3s" }}>
                      {proj.title}
                    </h3>
                  </div>
                  <div style={{ color: isActive ? "var(--mana)" : "rgba(255,255,255,0.2)", fontSize: "1.2rem", transform: isActive ? "rotate(45deg)" : "rotate(0deg)", transition: "all 0.3s" }}>
                    +
                  </div>
                </div>

                {/* Expanded Content */}
                <div style={{ 
                  maxHeight: isActive ? "400px" : "0", 
                  opacity: isActive ? 1 : 0, 
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: isActive ? "0 2rem 2rem 2rem" : "0 2rem",
                  display: "flex", gap: "2rem"
                }}>
                  <div style={{ flex: 2 }}>
                    <div style={{ height: "1px", background: "linear-gradient(90deg, var(--mana), transparent)", marginBottom: "1.5rem" }} />
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                      {proj.description}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      {proj.tags.map(t => <span key={t} style={{ border: "1px solid rgba(0,229,255,0.2)", padding: "0.2rem 0.6rem", fontSize: "0.6rem", color: "var(--mana)" }}>{t}</span>)}
                    </div>
                    <div style={{ color: "var(--mana)", fontSize: "0.7rem", letterSpacing: "1px" }}>
                      MANA COST: {proj.manaCost}
                    </div>
                  </div>
                  
                  {/* Abstract Schematic Graphic */}
                  <div style={{ flex: 1, borderLeft: "1px dashed rgba(0,229,255,0.2)", paddingLeft: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", maxWidth: "150px", stroke: "var(--mana)", fill: "none", strokeWidth: "1", opacity: 0.6 }}>
                      {idx % 2 === 0 ? (
                        <>
                          <rect x="20" y="20" width="60" height="60" strokeDasharray="4 4" />
                          <circle cx="50" cy="50" r="15" />
                          <line x1="10" y1="50" x2="90" y2="50" />
                        </>
                      ) : (
                        <>
                          <polygon points="50,10 90,90 10,90" strokeDasharray="2 6" strokeLinecap="round" />
                          <circle cx="50" cy="65" r="10" />
                          <line x1="50" y1="10" x2="50" y2="90" />
                        </>
                      )}
                    </svg>
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
