"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept1() {
  const featured = projects.slice(0, 4);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = featured[activeIdx];

  return (
    <section className="section" style={{ background: "rgba(0,15,25,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 1 . Terminal Schematic</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1050px", margin: "0 auto", padding: "2rem 0", flexWrap: "wrap", minHeight: "500px" }}>
          {/* Left panel: Terminal List */}
          <div style={{ flex: "1 1 300px", border: "1px solid rgba(0,229,255,0.1)", background: "#050d14", padding: "1rem", position: "relative" }}>
            <div style={{ fontSize: "0.6rem", color: "var(--mana)", marginBottom: "1rem", letterSpacing: "2px" }}>[ SYSTEM / SELECTOR ]</div>
            {featured.map((proj, idx) => (
              <div 
                key={proj.id} 
                onClick={() => setActiveIdx(idx)}
                style={{
                  padding: "1rem", cursor: "pointer", 
                  borderLeft: activeIdx === idx ? "3px solid var(--mana)" : "3px solid transparent",
                  background: activeIdx === idx ? "rgba(0,229,255,0.05)" : "transparent",
                  color: activeIdx === idx ? "var(--mana)" : "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                  transition: "all 0.3s",
                  marginBottom: "0.5rem"
                }}
              >
                <div style={{ opacity: 0.5, fontSize: "0.6rem", marginBottom: "0.3rem" }}>{proj.idx}</div>
                {proj.title}
              </div>
            ))}
          </div>
          
          {/* Right panel: Schematic / Blueprint */}
          <div style={{ flex: "2 1 500px", border: "1px solid rgba(0,229,255,0.2)", overflow: "hidden", background: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20z' fill='rgba(0, 229, 255, 0.02)' fill-rule='evenodd'/%3E%3C/svg%3E\")", padding: "3rem", position: "relative" }}>
             
             {/* Key details */}
             <div style={{ position: "relative", zIndex: 2 }}>
               <h3 style={{ color: "var(--mist)", fontSize: "2.5rem", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>
                 {activeProject.title}
               </h3>
               <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                 <div style={{ color: "var(--mana)", fontSize: "0.8rem", letterSpacing: "2px", border: "1px solid var(--mana)", padding: "0.3rem 0.8rem" }}>
                   MANA COST: {activeProject.manaCost}
                 </div>
                 <div style={{ height: "1px", background: "rgba(0,229,255,0.3)", flex: 1 }}></div>
               </div>
               
               <p style={{ color: "rgba(224,224,224,0.7)", lineHeight: "1.8", marginBottom: "2.5rem", maxWidth: "80%", fontFamily: "var(--font-serif)" }}>
                 {activeProject.description}
               </p>
               
               <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                 {activeProject.tags.map(t => (
                   <span key={t} style={{ border: "1px solid rgba(0,229,255,0.3)", padding: "0.3rem 0.6rem", fontSize: "0.6rem", color: "var(--mana)", letterSpacing: "1px" }}>
                     {t}
                   </span>
                 ))}
               </div>
             </div>

             {/* Rendering Graphic (Abstract) */}
             <div className="blueprint-graphic">
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", opacity: 0.15, stroke: "var(--mana)", fill: "none", strokeWidth: "0.5" }}>
                   {activeIdx === 0 && <path className="anim-dash" d="M10,50 Q50,10 90,50 T10,50 M50,10 L50,90" />}
                   {activeIdx === 1 && <path className="anim-dash" d="M20,20 h60 v60 h-60 Z M20,50 h60 M50,20 v60" />}
                   {activeIdx === 2 && <circle className="anim-dash" cx="50" cy="50" r="40" strokeDasharray="5,5" />}
                   {activeIdx === 3 && <path className="anim-dash" d="M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z" />}
                </svg>
             </div>
          </div>
        </div>
      </ScrollReveal>
      <style jsx>{`
        .blueprint-graphic {
          position: absolute; right: -50px; bottom: -50px; width: 400px; height: 400px; pointer-events: none;
        }
        .anim-dash {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 2s ease forwards;
        }
        @keyframes draw { to { stroke-dashoffset: 0; } }
      `}</style>
    </section>
  );
}
