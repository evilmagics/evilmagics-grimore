"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

// Mock 15 projects
const extendedProjects = [...projects, ...projects, ...projects]
  .slice(0, 15)
  .map((p, i) => ({ ...p, id: `ext-${i}`, idx: `NODE_${i+1}` }));

export default function ConstructsAstrolabeA() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Group into orbits: 3, 5, 7
  const orbits = [
    { radius: 100, count: 3, startIndex: 0 },
    { radius: 160, count: 5, startIndex: 3 },
    { radius: 220, count: 7, startIndex: 8 }
  ];

  return (
    <section className="section" style={{ background: "rgba(5,15,25,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)", overflow: "hidden" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Approach A . Multi-Node per Orbit</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: "4rem 0", alignItems: "center", minHeight: "600px" }}>
          
          <div style={{ position: "relative", width: "550px", height: "550px", flexShrink: 0 }}>
            {/* Center Core */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60px", height: "60px", borderRadius: "50%", border: "2px solid var(--mana)", background: "rgba(0,229,255,0.1)", boxShadow: "0 0 30px var(--mana-glow)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "20px", height: "20px", background: "var(--mana)", borderRadius: "50%" }} />
            </div>

            {orbits.map((orbit, oIdx) => (
              <div key={oIdx}>
                {/* Ring */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: `${orbit.radius * 2}px`, height: `${orbit.radius * 2}px`, borderRadius: "50%", border: "1px dashed rgba(0,229,255,0.15)", pointerEvents: "none" }} />
                
                {/* Planets in this orbit */}
                {Array.from({ length: orbit.count }).map((_, i) => {
                  const pIdx = orbit.startIndex + i;
                  if (pIdx >= extendedProjects.length) return null;
                  const proj = extendedProjects[pIdx];
                  
                  const angle = (i * (360 / orbit.count)) * (Math.PI / 180);
                  const px = Math.cos(angle) * orbit.radius;
                  const py = Math.sin(angle) * orbit.radius;
                  const isActive = activeIdx === pIdx;

                  return (
                    <div 
                      key={proj.id}
                      onClick={() => setActiveIdx(pIdx)}
                      style={{
                        position: "absolute", top: `calc(50% + ${py}px)`, left: `calc(50% + ${px}px)`,
                        transform: "translate(-50%, -50%)",
                        width: isActive ? "20px" : "12px", height: isActive ? "20px" : "12px",
                        background: isActive ? "var(--mana)" : "#050d14",
                        border: "2px solid var(--mana)", borderRadius: "50%", cursor: "pointer",
                        transition: "all 0.3s", zIndex: 15,
                        boxShadow: isActive ? "0 0 20px var(--mana-glow)" : "none"
                      }}
                    >
                      <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px", color: isActive ? "var(--mana)" : "rgba(255,255,255,0.3)", fontSize: "0.55rem", whiteSpace: "nowrap" }}>
                        {proj.idx}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, borderLeft: "1px solid rgba(0,229,255,0.2)", paddingLeft: "3rem" }}>
            <div style={{ color: "var(--mana)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "3px", marginBottom: "1rem" }}>
              ORBITAL NODE: {extendedProjects[activeIdx].idx}
            </div>
            <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--font-heading)", color: "var(--mist)", marginBottom: "1.5rem" }}>
              {extendedProjects[activeIdx].title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              {extendedProjects[activeIdx].description}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
               {extendedProjects[activeIdx].tags.map(t => <span key={t} style={{ border: "1px solid rgba(0,229,255,0.3)", padding: "0.2rem 0.6rem", fontSize: "0.6rem", color: "var(--mana)" }}>{t}</span>)}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
