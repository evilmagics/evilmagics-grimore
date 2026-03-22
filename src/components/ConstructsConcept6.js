"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/projects";

export default function ConstructsConcept6() {
  const featured = projects.slice(0, 5);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="section" style={{ background: "rgba(5,15,25,0.2)", borderBottom: "1px solid rgba(0,229,255,0.1)", overflow: "hidden" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label" style={{ color: "#ff0088" }}>:: Concept 6 . Orbital Astrolabe</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "4rem", maxWidth: "1100px", margin: "0 auto", padding: "4rem 0", alignItems: "center", minHeight: "600px" }}>
          
          {/* Orbital System */}
          <div style={{ position: "relative", width: "450px", height: "450px", flexShrink: 0 }}>
            {/* Center Core */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60px", height: "60px", borderRadius: "50%", border: "2px solid var(--mana)", background: "rgba(0,229,255,0.1)", boxShadow: "0 0 30px var(--mana-glow)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "20px", height: "20px", background: "var(--mana)", borderRadius: "50%", animation: "pulse 2s infinite alternate" }} />
            </div>

            {/* Orbits */}
            {featured.map((proj, idx) => {
              const radius = 80 + idx * 40;
              const angle = (idx * (360 / featured.length)) * (Math.PI / 180);
              const px = Math.cos(angle) * radius;
              const py = Math.sin(angle) * radius;
              const isActive = activeIdx === idx;
              
              return (
                <div key={proj.id}>
                  {/* Orbit Ring */}
                  <div style={{ 
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    width: `${radius * 2}px`, height: `${radius * 2}px`,
                    borderRadius: "50%", border: isActive ? "1px solid rgba(0,229,255,0.4)" : "1px dashed rgba(0,229,255,0.1)",
                    transition: "all 0.4s"
                  }} />
                  {/* Planet / Node */}
                  <div 
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      position: "absolute", top: `calc(50% + ${py}px)`, left: `calc(50% + ${px}px)`,
                      transform: "translate(-50%, -50%)",
                      width: isActive ? "24px" : "12px", height: isActive ? "24px" : "12px",
                      background: isActive ? "var(--mana)" : "#050d14",
                      border: "2px solid var(--mana)", borderRadius: "50%", cursor: "pointer",
                      transition: "all 0.3s", zIndex: 15,
                      boxShadow: isActive ? "0 0 20px var(--mana-glow)" : "none"
                    }}
                  >
                    <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px", color: isActive ? "var(--mana)" : "rgba(255,255,255,0.3)", fontSize: "0.6rem", whiteSpace: "nowrap", opacity: isActive ? 1 : 0.5 }}>
                      {proj.idx}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Panel */}
          <div style={{ flex: 1, borderLeft: "1px solid rgba(0,229,255,0.2)", paddingLeft: "3rem", position: "relative" }}>
            <div style={{ color: "var(--mana)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "3px", marginBottom: "1rem" }}>
              ORBITAL NODE: {featured[activeIdx].idx}
            </div>
            <h3 style={{ fontSize: "2.5rem", fontFamily: "var(--font-heading)", color: "var(--mist)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              {featured[activeIdx].title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              {featured[activeIdx].description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
              <div>
                <div style={{ fontSize: "0.6rem", color: "rgba(0,229,255,0.4)", letterSpacing: "1px", marginBottom: "0.5rem" }}>TECH STACK</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {featured[activeIdx].tags.map(t => <span key={t} style={{ color: "var(--mana)", fontSize: "0.7rem", border: "1px solid rgba(0,229,255,0.2)", padding: "0.2rem 0.6rem" }}>{t}</span>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.6rem", color: "rgba(0,229,255,0.4)", letterSpacing: "1px", marginBottom: "0.5rem" }}>ENERGY REQUIRED</div>
                <div style={{ fontSize: "1.2rem", color: "var(--mist)", fontFamily: "var(--font-mono)" }}>
                  {featured[activeIdx].manaCost} <span style={{ color: "var(--mana)" }}>MANA</span>
                </div>
              </div>
            </div>
            
            <a href={featured[activeIdx].liveUrl} className="elec-target" style={{ display: "inline-block", padding: "0.8rem 2rem", border: "1px solid var(--mana)", background: "rgba(0,229,255,0.05)", color: "var(--mana)", textDecoration: "none", fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", transition: "all 0.3s", cursor: "pointer" }} onMouseEnter={(e) => { e.target.style.background = "var(--mana-dim)"; e.target.style.boxShadow = "0 0 20px var(--mana-glow)"; }} onMouseLeave={(e) => { e.target.style.background = "rgba(0,229,255,0.05)"; e.target.style.boxShadow = "none"; }}>
              Access Construct
            </a>
          </div>

        </div>
      </ScrollReveal>
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
