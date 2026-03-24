"use client";
import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { getIconComponent, getShapePath } from "@/lib/iconMap";

export default function RuneGrid({ techStack = [] }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const requestRef = useRef();

  // Rotation state
  const rotationParams = useRef({
    rx: 0,
    ry: 0,
    vx: 0.002,
    vy: 0.002,
    mouseX: 0,
    mouseY: 0,
    isHovering: false
  });

  const sphereData = useRef([]);
  
  useEffect(() => {
    const N = techStack.length;
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    sphereData.current = techStack.map((item, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      return { x, y, z };
    });
  }, []);

  useEffect(() => {
    const params = rotationParams.current;

    const updateGlobe = () => {
      // Dynamic radius based on window width
      const R = window.innerWidth < 768 ? 140 : 220;

      if (params.isHovering) {
        params.vx += (params.mouseY * 0.008 - params.vx) * 0.1;
        params.vy += (params.mouseX * 0.008 - params.vy) * 0.1;
      } else {
        params.vx += (0.0015 - params.vx) * 0.05;
        params.vy += (0.0015 - params.vy) * 0.05;
      }

      params.rx += params.vx;
      params.ry += params.vy;

      const cosX = Math.cos(params.rx);
      const sinX = Math.sin(params.rx);
      const cosY = Math.cos(params.ry);
      const sinY = Math.sin(params.ry);

      techStack.forEach((_, i) => {
        const el = itemsRef.current[i];
        const data = sphereData.current[i];
        if (!el || !data) return;

        const x1 = data.x * cosY - data.z * sinY;
        const z1 = data.z * cosY + data.x * sinY;
        
        const y2 = data.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + data.y * sinX;

        const depth = z2;
        const scale = (depth + 2.5) / 3.5; 
        
        const screenX = x1 * R;
        const screenY = y2 * R;

        const opacity = Math.max(0.05, (depth + 1.2) / 2.2); 
        const zIndex = Math.floor((depth + 1) * 100);

        el.style.transform = `translate3d(calc(-50% + ${screenX}px), calc(-50% + ${screenY}px), 0) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
        // The opacity of the line colors fade out towards the back
        el.style.filter = `brightness(${Math.max(0.1, (depth + 1.2) / 2)}) drop-shadow(0 0 4px currentColor)`;
      });

      requestRef.current = requestAnimationFrame(updateGlobe);
    };

    requestRef.current = requestAnimationFrame(updateGlobe);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    rotationParams.current.mouseX = x / (rect.width / 2);
    rotationParams.current.mouseY = y / (rect.height / 2);
    rotationParams.current.isHovering = true;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    
    rotationParams.current.mouseX = x / (rect.width / 2);
    rotationParams.current.mouseY = y / (rect.height / 2);
    rotationParams.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    rotationParams.current.isHovering = false;
  };

  const getSubCategoryColor = (sub) => {
    switch(sub) {
      // Languages
      case "Compiled": return "var(--mana)"; // Cyan
      case "Scripting": return "#ffd700"; // Yellow/Gold
      case "Web Core": return "#ff9800"; // Orange
      case "Mobile": return "#00b0ff"; // Bright Blue
      // Frameworks & UI
      case "UI Styling": return "#1de9b6"; // Teal
      case "UI Library": return "#29b6f6"; // Light Blue
      case "Fullstack": return "#e040fb"; // Magenta
      case "App Framework": return "var(--mana)"; // Cyan
      // Libraries
      case "Backend API": return "#00e676"; // Green
      case "ORM / Query": return "#ffc107"; // Amber
      case "Config": return "#9e9e9e"; // Gray
      case "Data Science": return "#29b6f6"; // Blue
      case "Frontend State": return "#ff4081"; // Pink
      // Databases
      case "SQL": return "#448aff"; // Blue
      case "NoSQL": return "#00e676"; // Green
      case "In-Memory": return "#ff5252"; // Red
      case "Queues": return "#ff5252"; // Red
      case "Cloud BaaS": return "#ff9100"; // Orange
      // DevOps & Infra
      case "Containers": return "#29b6f6"; // Light Blue
      case "Orchestration": return "#ab47bc"; // Purple
      case "VCS": return "#ff3d00"; // Deep Orange
      case "Observability": return "#ffea00"; // Yellow
      // Tools & Workspace
      case "Code Editor": return "#448aff"; // Blue
      case "Design / Docs": return "#f50057"; // Deep Pink
      case "API Testing": return "#ff9100"; // Orange
      case "Communication": return "#651fff"; // Deep Purple
      case "Legacy Utils": return "#9e9e9e"; // Gray
      default: return "var(--mist)";
    }
  };

  return (
    <section className="section rune-grid-section" id="essences">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label">:: CORE.ESSENCES</span>
          <h2 className="section-title">The Rune Grid</h2>
          <p style={{ color: "rgba(224,224,224,0.4)", fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontStyle: "italic", marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 0" }}>
            A constellation of bound tools and languages, forming the foundation of every summoned architecture.
          </p>
        </div>
      </ScrollReveal>

      {/* Decorative Glow Behind Globe */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

      <ScrollReveal>
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          className="globe-container"
          onMouseDown={(e) => { e.currentTarget.style.cursor = "grabbing"; }}
          onMouseUp={(e) => { e.currentTarget.style.cursor = "grab"; }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%" }}>
            {techStack.map((node, i) => {
              const ringColor = getSubCategoryColor(node.sub_category);
              const IconComp = getIconComponent(node.icon_key);
              
              return (
                <div
                  key={node.name}
                  ref={el => itemsRef.current[i] = el}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    willChange: "transform, opacity, z-index, filter",
                    color: ringColor
                  }}
                  className="globe-item"
                >
                  <div
                    className="globe-icon-wrapper"
                    style={{
                      width: "42px", 
                      height: "42px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                    }}
                  >
                    {/* The Outer Magical Shape */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, overflow: "visible" }}
                      dangerouslySetInnerHTML={{ __html: getShapePath(node.category) }} 
                    />
                    
                    {/* The Inner Tech Icon */}
                    <div style={{ position: "relative", zIndex: 1, width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {IconComp ? <IconComp style={{ width: "100%", height: "100%", color: "currentColor" }} /> : null}
                    </div>
                  </div>
                  
                  <div
                    className="globe-label"
                    style={{
                      position: "absolute",
                      top: "110%",
                      padding: "0.3rem 0.8rem",
                      background: "rgba(2, 5, 3, 0.9)",
                      border: `1px solid ${ringColor}`,
                      borderRadius: "4px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--mist)",
                      whiteSpace: "nowrap",
                      opacity: 0,
                      transform: "translateY(-10px) scale(0.8)",
                      pointerEvents: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: `0 5px 15px rgba(0,0,0,0.8), 0 0 15px ${ringColor}80`,
                      zIndex: 200,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2px"
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>{node.name}</span>
                    <span style={{ color: ringColor, fontSize: "0.5rem", textTransform: "uppercase" }}>{node.category} &bull; {node.sub_category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <style jsx global>{`
        .globe-item > .globe-icon-wrapper {
          color: inherit;
        }
        .globe-item > .globe-icon-wrapper svg {
          transition: all 0.3s ease;
        }
        .globe-item > .globe-icon-wrapper:hover {
          transform: scale(1.3);
          filter: drop-shadow(0 0 10px currentColor) brightness(1.2) !important;
        }
        .globe-item > .globe-icon-wrapper:hover svg circle,
        .globe-item > .globe-icon-wrapper:hover svg polygon {
          stroke-width: 1.8;
        }
        .globe-item > .globe-icon-wrapper:hover + .globe-label,
        .globe-label:hover {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        .rune-grid-section {
          min-height: 800px;
          padding: 4rem 0;
          position: relative;
        }
        .globe-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          height: 600px;
          margin: 4rem auto;
          overflow: hidden;
          cursor: grab;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .rune-grid-section {
            min-height: auto;
            padding: 3rem 0;
          }
          .globe-container {
            height: 400px;
            margin: 2rem auto;
          }
          .globe-icon-wrapper {
            transform: scale(0.8);
          }
          .globe-label {
            display: none !important; /* Hide label on mobile to avoid clutter */
          }
        }
      `}</style>
    </section>
  );
}
