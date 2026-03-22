"use client";
import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept3() {
  const [activeProj, setActiveProj] = useState(projects[0]);

  return (
    <section className="section" style={{ background: "rgba(5,20,15,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 3 . Arcane Constellation</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ position: "relative", maxWidth: "1050px", margin: "0 auto", padding: "2rem 0", height: "600px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Node Network Map */}
          <div style={{ position: "relative", width: "50%", height: "400px" }}>
            {/* Pseudo-connections */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
               <path d="M100,100 L300,50 L250,250 L100,100" fill="none" stroke="rgba(0,229,255,0.1)" strokeWidth="1" />
               <path d="M100,100 L50,200 L250,250" fill="none" stroke="rgba(0,229,255,0.1)" strokeWidth="1" />
            </svg>
            
            {projects.slice(0, 5).map((proj, i) => {
              const positions = [ {x: 100, y: 100}, {x: 300, y: 50}, {x: 250, y: 250}, {x: 50, y: 200}, {x: 350, y: 150} ];
              const pos = positions[i] || {x:0, y:0};
              const isActive = activeProj.id === proj.id;
              return (
                <div 
                  key={proj.id}
                  onClick={() => setActiveProj(proj)}
                  style={{
                    position: "absolute", left: pos.x, top: pos.y,
                    width: isActive ? "20px" : "12px", height: isActive ? "20px" : "12px",
                    background: isActive ? "var(--mana)" : "rgba(0,229,255,0.3)",
                    borderRadius: "50%", cursor: "pointer",
                    transform: "translate(-50%, -50%)",
                    boxShadow: isActive ? "0 0 20px var(--mana-glow)" : "none",
                    transition: "all 0.3s"
                  }}
                >
                  <div style={{ position: "absolute", top: "25px", left: "50%", transform: "translateX(-50%)", color: isActive ? "var(--mana)" : "rgba(255,255,255,0.3)", fontSize: "0.6rem", whiteSpace: "nowrap" }}>
                    {proj.idx}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Details Card */}
          <div style={{ width: "45%", border: "1px solid rgba(0,229,255,0.2)", background: "rgba(0,0,0,0.5)", padding: "2rem", backdropFilter: "blur(10px)" }}>
            <div style={{ color: "var(--mana)", fontSize: "0.7rem", letterSpacing: "2px", marginBottom: "1rem" }}>{activeProj.idx}</div>
            <h3 style={{ color: "var(--mist)", fontSize: "2rem", marginBottom: "1rem" }}>{activeProj.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.6 }}>{activeProj.description}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {activeProj.tags.map(t => <span key={t} style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)", padding: "0.3rem 0.6rem", fontSize: "0.6rem", color: "var(--mana)" }}>{t}</span>)}
            </div>
            <div style={{ borderTop: "1px solid rgba(0,229,255,0.1)", paddingTop: "1rem", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>
              MANA REQUIREMENT: {activeProj.manaCost}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
