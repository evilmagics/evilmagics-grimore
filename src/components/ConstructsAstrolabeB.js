"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

const extendedProjects = [...projects, ...projects, ...projects]
  .slice(0, 15)
  .map((p, i) => ({ ...p, id: `ext-${i}`, idx: `NODE_${i+1}` }));

export default function ConstructsAstrolabeB() {
  const [page, setPage] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0); // relative to page
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(extendedProjects.length / itemsPerPage);
  
  const currentProjects = extendedProjects.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const handleNextSystem = () => {
    setPage((p) => (p + 1) % totalPages);
    setActiveIdx(0);
  };

  return (
    <section className="section" style={{ background: "rgba(15,5,15,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)", overflow: "hidden" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Approach B . Constellation Pagination</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: "4rem 0", alignItems: "center", minHeight: "600px" }}>
          
          <div style={{ position: "relative", width: "500px", height: "500px", flexShrink: 0 }}>
            {/* Center Core */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40px", height: "40px", borderRadius: "50%", border: "2px solid var(--mana)", background: "rgba(0,229,255,0.1)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "10px", height: "10px", background: "var(--mana)", borderRadius: "50%" }} />
            </div>

            {currentProjects.map((proj, idx) => {
              const radius = 80 + idx * 40;
              const angle = (idx * (360 / currentProjects.length) + (page * 45)) * (Math.PI / 180);
              const px = Math.cos(angle) * radius;
              const py = Math.sin(angle) * radius;
              const isActive = activeIdx === idx;
              
              return (
                <div key={proj.id} className="anim-fade" style={{ animation: "fadeIn 1s ease" }}>
                  <div style={{ 
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    width: `${radius * 2}px`, height: `${radius * 2}px`,
                    borderRadius: "50%", border: "1px dashed rgba(0,229,255,0.15)", pointerEvents: "none"
                  }} />
                  <div 
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      position: "absolute", top: `calc(50% + ${py}px)`, left: `calc(50% + ${px}px)`,
                      transform: "translate(-50%, -50%)",
                      width: isActive ? "20px" : "12px", height: isActive ? "20px" : "12px",
                      background: isActive ? "var(--mana)" : "#050d14",
                      border: "2px solid var(--mana)", borderRadius: "50%", cursor: "pointer", zIndex: 15,
                      boxShadow: isActive ? "0 0 20px var(--mana-glow)" : "none"
                    }}
                  >
                     <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px", color: isActive ? "var(--mana)" : "rgba(255,255,255,0.3)", fontSize: "0.55rem" }}>
                       {proj.idx}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1, borderLeft: "1px solid rgba(0,229,255,0.2)", paddingLeft: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
               <div style={{ color: "var(--mana)", fontSize: "0.7rem", letterSpacing: "2px" }}>
                 STAR SYSTEM: 0{page + 1} / 0{totalPages}
               </div>
               <button 
                 onClick={handleNextSystem}
                 style={{ background: "transparent", border: "1px solid rgba(0,229,255,0.4)", color: "var(--mana)", padding: "0.4rem 1rem", fontSize: "0.6rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: "2px" }}
               >
                 Warp to Next System
               </button>
            </div>
            
            <div className="anim-fade" key={currentProjects[activeIdx].id} style={{ animation: "fadeIn 0.5s ease" }}>
              <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--font-heading)", color: "var(--mist)", marginBottom: "1.5rem" }}>
                {currentProjects[activeIdx].title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                {currentProjects[activeIdx].description}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
