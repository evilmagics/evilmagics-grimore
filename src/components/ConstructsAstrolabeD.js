"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

const extendedProjects = [...projects, ...projects, ...projects]
  .slice(0, 15)
  .map((p, i) => ({ ...p, id: `ext-${i}`, idx: `NODE_${i+1}` }));

export default function ConstructsAstrolabeD() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="section" style={{ background: "rgba(10,15,30,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)", overflow: "hidden" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Approach D . Pseudo-3D Atom</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: "4rem 0", alignItems: "center", minHeight: "600px" }}>
          
          <div style={{ position: "relative", width: "500px", height: "500px", perspective: "1000px" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "50px", height: "50px", borderRadius: "50%", background: "rgba(0,229,255,0.1)", border: "2px solid var(--mana)", boxShadow: "0 0 30px var(--mana-glow)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div style={{ width: "15px", height: "15px", background: "var(--mana)", borderRadius: "50%" }} />
            </div>

            <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", animation: "spin3d 60s linear infinite" }}>
               {extendedProjects.map((proj, idx) => {
                 // Distribute rotations uniformly
                 const rx = (idx * 36) % 180;
                 const ry = (idx * 72) % 180;
                 const isActive = activeIdx === idx;
                 
                 return (
                   <div key={proj.id} style={{
                     position: "absolute", top: "50%", left: "50%",
                     width: "300px", height: "300px",
                     marginLeft: "-150px", marginTop: "-150px",
                     borderRadius: "50%", border: isActive ? "2px solid rgba(0,229,255,0.4)" : "1px dashed rgba(0,229,255,0.1)",
                     transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
                     transformStyle: "preserve-3d", pointerEvents: "none", zIndex: isActive ? 50 : 1
                   }}>
                      <div 
                        onClick={() => setActiveIdx(idx)}
                        style={{
                          position: "absolute", top: "0", left: "50%", marginLeft: "-10px", marginTop: "-10px",
                          width: isActive ? "24px" : "12px", height: isActive ? "24px" : "12px",
                          background: isActive ? "var(--mana)" : "#050d14",
                          border: "2px solid var(--mana)", borderRadius: "50%", cursor: "pointer",
                          pointerEvents: "auto",
                          transform: `rotateY(${-ry}deg) rotateX(${-rx}deg)`, // un-rotate content so it faces front
                          boxShadow: isActive ? "0 0 20px var(--mana-glow)" : "none",
                           transition: "all 0.3s"
                        }}
                      >
                        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "5px", color: isActive ? "var(--mana)" : "rgba(255,255,255,0.3)", fontSize: "0.6rem", whiteSpace: "nowrap" }}>
                          {proj.idx}
                        </div>
                      </div>
                   </div>
                 );
               })}
            </div>
          </div>

          <div style={{ flex: 1, borderLeft: "1px solid rgba(0,229,255,0.2)", paddingLeft: "4rem" }}>
            <h3 style={{ fontSize: "2.5rem", fontFamily: "var(--font-heading)", color: "var(--mist)", marginBottom: "1.5rem" }}>
              {extendedProjects[activeIdx].title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              {extendedProjects[activeIdx].description}
            </p>
             <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
               {extendedProjects[activeIdx].tags.map(t => <span key={t} style={{ border: "1px solid rgba(0,229,255,0.3)", padding: "0.3rem 0.8rem", fontSize: "0.6rem", color: "var(--mana)" }}>{t}</span>)}
            </div>
             <div style={{ color: "var(--mana)", fontSize: "0.8rem", letterSpacing: "2px" }}>
               MANA REQUIRED: {extendedProjects[activeIdx].manaCost}
             </div>
          </div>
        </div>
      </ScrollReveal>
      <style jsx>{`
        @keyframes spin3d {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateY(360deg) rotateZ(360deg); }
        }
      `}</style>
    </section>
  );
}
