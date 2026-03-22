"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

const extendedProjects = [...projects, ...projects, ...projects]
  .slice(0, 15)
  .map((p, i) => ({ ...p, id: `ext-${i}`, idx: `NODE_${i+1}` }));

export default function ConstructsAstrolabeC() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="section" style={{ background: "rgba(5,20,15,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)", overflow: "hidden" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Approach C . Dynamic Focal Scroll</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: "4rem 0", height: "600px", alignItems: "stretch" }}>
          
          {/* Scrollable List */}
          <div style={{ flex: "0 0 300px", borderRight: "1px solid rgba(0,229,255,0.2)", overflowY: "auto", paddingRight: "1rem" }} className="hide-scroll">
            <div style={{ color: "var(--mana)", fontSize: "0.6rem", letterSpacing: "2px", position: "sticky", top: 0, background: "rgba(0,10,20,0.9)", padding: "10px 0", zIndex: 5 }}>[ INDEX_LIST ]</div>
            {extendedProjects.map((proj, idx) => (
              <div 
                key={proj.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  padding: "1rem", cursor: "pointer",
                  borderLeft: activeIdx === idx ? "2px solid var(--mana)" : "2px solid transparent",
                  background: activeIdx === idx ? "rgba(0,229,255,0.05)" : "transparent",
                  color: activeIdx === idx ? "var(--mana)" : "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-mono)", fontSize: "0.8rem", transition: "all 0.3s"
                }}
              >
                {proj.idx} // {proj.title}
              </div>
            ))}
          </div>

          {/* Focal Astrolabe */}
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <div style={{ position: "absolute", top: "2rem", left: "2rem", color: "rgba(255,255,255,0.8)", maxWidth: "300px" }}>
               <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-heading)", color: "var(--mist)", marginBottom: "1rem" }}>{extendedProjects[activeIdx].title}</h3>
               <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{extendedProjects[activeIdx].description}</p>
             </div>

             <div style={{ position: "relative", width: "400px", height: "400px" }}>
               {/* Fixed Orbits */}
               <div style={{ position: "absolute", inset: "50px", borderRadius: "50%", border: "1px dashed rgba(0,229,255,0.2)" }} />
               <div style={{ position: "absolute", inset: "100px", borderRadius: "50%", border: "1px dashed rgba(0,229,255,0.1)" }} />
               <div style={{ position: "absolute", inset: "150px", borderRadius: "50%", border: "1px dashed rgba(0,229,255,0.05)" }} />
               
               {/* Core = Active Project */}
               <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "50px", height: "50px", borderRadius: "50%", border: "2px solid var(--mana)", background: "var(--mana-dim)", boxShadow: "0 0 40px var(--mana-glow)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mana)", fontSize: "0.6rem" }}>
                 {extendedProjects[activeIdx].idx}
               </div>

               {/* Random decorative nodes orbiting */}
               <div style={{ position: "absolute", top: "50%", left: "0", transform: "translate(-50%, -50%)", width: "12px", height: "12px", background: "rgba(0,229,255,0.5)", borderRadius: "50%" }} />
               <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translate(-50%, -50%)", width: "8px", height: "8px", background: "rgba(0,229,255,0.3)", borderRadius: "50%" }} />
             </div>
          </div>

        </div>
      </ScrollReveal>
      <style jsx>{`
        .hide-scroll::-webkit-scrollbar { width: 4px; }
        .hide-scroll::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.2); }
      `}</style>
    </section>
  );
}
