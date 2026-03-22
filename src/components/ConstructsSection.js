"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ConstructsSection({ projects = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Determine orbits dynamically based on total projects
  const orbits = [];
  let currentIdx = 0;
  let radius = 100;
  const radiusStep = 65;
  
  // Capacities for orbits: O1: 4, O2: 8, O3: 12, O4: 16...
  let orbitLevel = 1;
  while (currentIdx < projects.length) {
    const maxCapacity = orbitLevel * 4;
    const remaining = projects.length - currentIdx;
    
    // Attempt to distribute somewhat evenly for the last orbit
    // If remaining is less than maxCapacity, just put all remaining.
    const countInOrbit = Math.min(maxCapacity, remaining);
    
    orbits.push({
      radius,
      count: countInOrbit,
      startIndex: currentIdx,
      level: orbitLevel
    });
    
    currentIdx += countInOrbit;
    radius += radiusStep;
    orbitLevel++;
  }

  // Fallback to first project if activeIdx out of bounds (shouldn't happen but safe)
  const activeProject = projects[activeIdx] || projects[0];

  return (
    <section id="constructs" className="section" style={{ background: "rgba(5,15,25,0.2)", paddingBottom: "6rem", overflow: "hidden" }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label">:: Constructs.vault</span>
          <h2 className="section-title">Architectural Blueprints</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: "2rem 0", alignItems: "center", minHeight: "600px" }}>
          
          <div style={{ position: "relative", width: "550px", height: "550px", flexShrink: 0 }}>
            {/* Center Core */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70px", height: "70px", borderRadius: "50%", border: "2px solid var(--mana)", background: "rgba(0,229,255,0.05)", boxShadow: "0 0 30px var(--mana-glow)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "20px", height: "20px", background: "var(--mana)", borderRadius: "50%", animation: "pulse 2s infinite alternate" }} />
            </div>

            {orbits.map((orbit, oIdx) => {
              // Alternating rotation direction based on orbit level
              const animClass = orbit.level % 2 === 0 ? "spin-cw" : "spin-ccw";
              // Slower spin for larger outer orbits
              const spinDuration = 30 + orbit.level * 15; 
              
              return (
                <div key={oIdx}>
                  {/* Rotating Dashed Ring */}
                  <div 
                    className={animClass}
                    style={{ 
                      position: "absolute", top: "50%", left: "50%", 
                      width: `${orbit.radius * 2}px`, height: `${orbit.radius * 2}px`, 
                      marginLeft: `-${orbit.radius}px`, marginTop: `-${orbit.radius}px`,
                      borderRadius: "50%", border: "1.5px dashed rgba(0,229,255,0.15)", 
                      pointerEvents: "none", zIndex: 1,
                      animationDuration: `${spinDuration}s`,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite"
                    }} 
                  />
                  
                  {/* Static Planets in this orbit */}
                  {Array.from({ length: orbit.count }).map((_, i) => {
                    const pIdx = orbit.startIndex + i;
                    if (pIdx >= projects.length) return null;
                    const proj = projects[pIdx];
                    
                    const angle = (i * (360 / orbit.count) - 90) * (Math.PI / 180); // start at top (-90deg)
                    const px = Math.cos(angle) * orbit.radius;
                    const py = Math.sin(angle) * orbit.radius;
                    const isActive = activeIdx === pIdx;

                    return (
                      <div 
                        key={proj.id}
                        className="orbit-node"
                        onClick={() => setActiveIdx(pIdx)}
                        style={{
                          position: "absolute", top: `calc(50% + ${py}px)`, left: `calc(50% + ${px}px)`,
                          transform: "translate(-50%, -50%)",
                          width: isActive ? "24px" : "14px", height: isActive ? "24px" : "14px",
                          background: isActive ? "var(--mana)" : "#050d14",
                          border: isActive ? "2px solid #fff" : "2px solid var(--mana)", 
                          borderRadius: "50%", cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)", zIndex: 15,
                          boxShadow: isActive ? "0 0 25px var(--mana-glow)" : "none"
                        }}
                      >
                        <div style={{ 
                          position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", 
                          marginTop: "8px", color: isActive ? "var(--mana)" : "rgba(255,255,255,0.3)", 
                          fontSize: "0.55rem", whiteSpace: "nowrap", letterSpacing: "1px",
                          transition: "color 0.3s", pointerEvents: "none"
                        }}>
                          {proj.idx}
                        </div>
                      </div>
                    )
                  })}
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1, borderLeft: "1px solid rgba(0,229,255,0.15)", paddingLeft: "3.5rem", position: "relative" }}>
            <div style={{ color: "var(--mana)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "3px", marginBottom: "1rem" }}>
              ORBITAL NODE: {activeProject.idx}
            </div>
            
            <div key={activeProject.id} className="anim-fade-up">
              <h3 style={{ fontSize: "2.5rem", fontFamily: "var(--font-heading)", color: "var(--mist)", marginBottom: "1.2rem", lineHeight: 1.1 }}>
                {activeProject.title}
              </h3>
              
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
                <a 
                  href={activeProject.repo_url || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="elec-target"
                  style={{ color: "var(--mana)", background: "rgba(0,229,255,0.05)", padding: "0.4rem 1rem", border: "1px solid rgba(0,229,255,0.2)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.target.style.background = "var(--mana-dim)"; e.target.style.boxShadow = "0 0 15px var(--mana-glow)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "rgba(0,229,255,0.05)"; e.target.style.boxShadow = "none"; }}
                >
                  View Source
                </a>
                <div style={{ width: "2px", height: "15px", background: "rgba(0,229,255,0.3)" }} />
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "1px" }}>
                  MANA COST: <span style={{ color: "var(--mist)" }}>{activeProject.mana_cost}</span>
                </span>
              </div>

              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                {activeProject.description}
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <div style={{ color: "rgba(0,229,255,0.4)", fontSize: "0.6rem", letterSpacing: "2px", marginBottom: "0.8rem" }}>TECH STACK</div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                     {activeProject.techs?.map(t => (
                       <span key={typeof t === 'string' ? t : t.name} style={{ border: "1px solid rgba(0,229,255,0.3)", background: "rgba(0,10,20,0.8)", padding: "0.3rem 0.6rem", fontSize: "0.6rem", color: "var(--mana)", letterSpacing: "1px" }}>
                         {typeof t === 'string' ? t : t.name}
                       </span>
                     ))}
                  </div>
                </div>
                <div style={{ borderTop: "1px dashed rgba(0,229,255,0.1)", paddingTop: "1.5rem" }}>
                  <div style={{ color: "rgba(0,229,255,0.4)", fontSize: "0.6rem", letterSpacing: "2px", marginBottom: "0.8rem" }}>SYSTEM TAGS</div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                     {activeProject.tags?.map(t => (
                       <span key={t} style={{ border: "1px dashed rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.02)", padding: "0.3rem 0.6rem", fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>
                         {t}
                       </span>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      
      <style jsx>{`
        @keyframes rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .spin-cw {
          animation-name: rotate-cw;
        }
        .spin-ccw {
          animation-name: rotate-ccw;
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 1; }
        }
        .anim-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        .orbit-node:hover {
          transform: translate(-50%, -50%) scale(1.3) !important;
          box-shadow: 0 0 15px var(--mana-glow);
        }
        @media (max-width: 1024px) {
           /* Simplified responsive structural changes */
           .section > div > div {
             flex-direction: column;
           }
           .section > div > div > div:first-child {
             width: 400px !important;
             height: 400px !important;
             margin: 0 auto 3rem;
           }
        }
      `}</style>
    </section>
  );
}
