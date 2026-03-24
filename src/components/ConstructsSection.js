"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const ZOOM_MIN = 25;
const ZOOM_MAX = 400;
const ZOOM_STEP = 25;
const ZOOM_DEFAULT = 100;
const AUTOPLAY_INTERVAL_MS = 30_000;

export default function ConstructsSection({ projects = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const [revealImageIdx, setRevealImageIdx] = useState(0);
  const [zoomPercent, setZoomPercent] = useState(ZOOM_DEFAULT);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOriginRef = useRef({ x: 0, y: 0 });

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
  const activeImages = activeProject?.images || [];
  const currentImage = activeImages[revealImageIdx];
  const isZoomDefault = zoomPercent === ZOOM_DEFAULT;
  const isAutoplayRunning = isRevealOpen && activeImages.length > 1 && isZoomDefault;
  const autoplayStatusLabel = isAutoplayRunning
    ? "AUTOPLAY: RUNNING (30S)"
    : activeImages.length <= 1
      ? "AUTOPLAY: OFF (NEED 2+ IMAGES)"
      : "AUTOPLAY: PAUSED (ZOOM LOCK)";

  useEffect(() => {
    if (!isAutoplayRunning) return;

    const intervalId = setInterval(() => {
      setRevealImageIdx((prev) => (prev + 1) % activeImages.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [activeImages.length, isAutoplayRunning]);

  useEffect(() => {
    if (!isRevealOpen) return;

    const handleKeyDown = (event) => {
      if (event.code !== "Space") return;
      event.preventDefault();
      setIsSpacePressed(true);
    };

    const handleKeyUp = (event) => {
      if (event.code !== "Space") return;
      event.preventDefault();
      setIsSpacePressed(false);
    };

    const handleWindowBlur = () => {
      setIsSpacePressed(false);
      setIsPanning(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isRevealOpen]);

  const clampZoom = (value) =>
    Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, Math.round(value / ZOOM_STEP) * ZOOM_STEP));

  const resetPan = () => {
    setPanOffset({ x: 0, y: 0 });
    setIsPanning(false);
  };

  const resetZoom = () => {
    setZoomPercent(ZOOM_DEFAULT);
    resetPan();
  };

  const setZoom = (value) => setZoomPercent(clampZoom(Number(value)));

  const zoomIn = () => setZoomPercent((prev) => clampZoom(prev + ZOOM_STEP));

  const zoomOut = () => setZoomPercent((prev) => clampZoom(prev - ZOOM_STEP));

  const handleWheelZoom = (event) => {
    if (!activeImages.length) return;
    event.preventDefault();

    setZoomPercent((prev) => {
      const next = clampZoom(prev + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
      if (next <= ZOOM_DEFAULT) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handlePanStart = (event) => {
    if (zoomPercent <= ZOOM_DEFAULT) return;
    if (!isSpacePressed) return;
    if (event.button !== 0) return;

    event.preventDefault();
    panStartRef.current = { x: event.clientX, y: event.clientY };
    panOriginRef.current = { ...panOffset };
    setIsPanning(true);
  };

  const handlePanMove = (event) => {
    if (!isPanning) return;

    const deltaX = event.clientX - panStartRef.current.x;
    const deltaY = event.clientY - panStartRef.current.y;
    setPanOffset({
      x: panOriginRef.current.x + deltaX,
      y: panOriginRef.current.y + deltaY,
    });
  };

  const handlePanEnd = () => {
    if (!isPanning) return;
    setIsPanning(false);
  };

  const openReveal = () => {
    if (!activeImages.length) return;
    setRevealImageIdx(0);
    resetZoom();
    setIsRevealOpen(true);
  };

  const nextImage = () => {
    if (!activeImages.length) return;
    resetZoom();
    setRevealImageIdx((prev) => (prev + 1) % activeImages.length);
  };

  const previousImage = () => {
    if (!activeImages.length) return;
    resetZoom();
    setRevealImageIdx((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const goToImage = (index) => {
    resetZoom();
    setRevealImageIdx(index);
  };

  const handleRevealOpenChange = (open) => {
    setIsRevealOpen(open);
    if (!open) {
      setRevealImageIdx(0);
      resetZoom();
      setIsSpacePressed(false);
    }
  };

  const canPanImage = zoomPercent > ZOOM_DEFAULT;
  const isHandMode = canPanImage && isSpacePressed;

  if (!activeProject) {
    return null;
  }

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
                <button
                  type="button"
                  className="elec-target"
                  onClick={openReveal}
                  disabled={!activeImages.length}
                  style={{
                    color: activeImages.length ? "var(--mana)" : "rgba(255,255,255,0.35)",
                    background: activeImages.length ? "rgba(0,229,255,0.05)" : "rgba(255,255,255,0.04)",
                    padding: "0.4rem 1rem",
                    border: "1px solid rgba(0,229,255,0.2)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    cursor: activeImages.length ? "pointer" : "not-allowed",
                  }}
                >
                  Reveal Images ({activeImages.length})
                </button>
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

      <Dialog open={isRevealOpen} onOpenChange={handleRevealOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="z-[10000] h-[95dvh] w-[95vw] max-h-[95dvh] max-w-[95vw] border-none bg-transparent p-0 shadow-none"
          style={{
            width: "95vw",
            minWidth: "95vw",
            maxWidth: "95vw",
            height: "95dvh",
            minHeight: "95dvh",
            maxHeight: "95dvh",
          }}
        >
          <div
            className="reveal-hologram-frame relative h-full w-full"
            style={{
              background: "rgba(0,25,35,0.4)",
              clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
              border: "1px solid rgba(0,229,255,0.4)",
              boxShadow: "0 0 50px rgba(0,229,255,0.2)",
              overflow: "hidden",
              transformOrigin: "center center",
            }}
          >
            <div className="reveal-hologram-sweep pointer-events-none absolute inset-0 z-[1]" />
            <div className="reveal-hologram-lines pointer-events-none absolute inset-0 z-[1]" />

            <div
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                border: "1px solid var(--mana)",
                boxSizing: "border-box",
              }}
            />

            <div
              className="pointer-events-none absolute z-[3]"
              style={{
                inset: "2%",
                border: "1px solid rgba(0,229,255,0.3)",
              }}
            >
            </div>

            <div className="relative z-[1] h-full w-full">
              <div
                className="h-full w-full"
                onMouseDown={handlePanStart}
                onMouseMove={handlePanMove}
                onMouseUp={handlePanEnd}
                onMouseLeave={handlePanEnd}
                onWheel={handleWheelZoom}
                style={{
                  cursor:
                    canPanImage
                      ? isPanning
                        ? "grabbing"
                        : isHandMode
                          ? "grab"
                          : "zoom-in"
                      : "default",
                }}
              >
                {activeImages.length > 0 ? (
                  <div className="flex h-full w-full items-center justify-center px-4 py-4 sm:px-8 sm:py-8">
                    <Image
                      src={currentImage?.secure_url || currentImage?.image_url}
                      alt={currentImage?.alt_text || activeProject.title}
                      width={2200}
                      height={1400}
                      className="max-h-full w-auto max-w-full object-contain"
                      style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomPercent / 100})`,
                        transformOrigin: "center center",
                        transition: "transform 220ms ease",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    No image available
                  </div>
                )}
              </div>

              {activeImages.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-xs"
                    onClick={previousImage}
                    className="absolute left-6 top-1/2 z-[6] -translate-y-1/2 border border-cyan-400/35 bg-black/45 text-cyan-100 hover:bg-cyan-300 hover:text-black sm:left-8"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-xs"
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 z-[6] -translate-y-1/2 border border-cyan-400/35 bg-black/45 text-cyan-100 hover:bg-cyan-300 hover:text-black sm:right-8"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-52 bg-gradient-to-t from-[rgba(0,10,15,0.95)] to-transparent" />

              <button
                type="button"
                onClick={() => handleRevealOpenChange(false)}
                className="absolute right-8 top-8 z-[8] flex h-8 w-8 items-center justify-center border border-cyan-400/50 bg-black/65 text-cyan-100 transition-colors hover:bg-cyan-300 hover:text-black sm:right-10 sm:top-10"
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="pointer-events-none absolute bottom-14 left-8 z-[7] sm:bottom-10 sm:left-10">
                <div className="text-[0.68rem] tracking-[0.22em] text-cyan-300/85">
                  IMAGE {Math.min(revealImageIdx + 1, activeImages.length)} / {activeImages.length}
                </div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">{activeProject.title}</h3>
              </div>

              <div className="absolute bottom-14 left-1/2 z-[7] flex -translate-x-1/2 items-center gap-1 sm:bottom-10">
                {activeImages.map((image, index) => (
                  <button
                    key={image.id || `${image.secure_url}-${index}`}
                    type="button"
                    onClick={() => goToImage(index)}
                    className={`h-1.5 w-6 transition-all ${index === revealImageIdx ? "bg-cyan-300" : "bg-white/30 hover:bg-cyan-300/60"}`}
                    style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute bottom-8 right-8 z-[7] flex flex-col items-end gap-1.5 sm:bottom-10 sm:right-10">
                <div className="text-right text-[10px] font-medium tracking-[0.16em] text-cyan-200/80">
                  <div>ZOOM {zoomPercent}%</div>
                  <div>{autoplayStatusLabel}</div>
                  <div>
                    {canPanImage
                      ? isSpacePressed
                        ? "HAND: SPACE HELD - DRAG TO PAN"
                        : "HAND: HOLD SPACE + DRAG"
                      : "HAND: ENABLED @ ZOOM > 100%"}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={zoomOut}
                    disabled={zoomPercent <= ZOOM_MIN}
                    className="border border-cyan-400/30 bg-black/55 text-cyan-100 hover:bg-cyan-300 hover:text-black"
                  >
                    -
                  </Button>
                  <input
                    type="range"
                    min={ZOOM_MIN}
                    max={ZOOM_MAX}
                    step={ZOOM_STEP}
                    value={zoomPercent}
                    onChange={(event) => setZoom(event.target.value)}
                    aria-label="Zoom level"
                    className="h-1.5 w-[110px] cursor-pointer accent-cyan-300 sm:w-[180px]"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={zoomIn}
                    disabled={zoomPercent >= ZOOM_MAX}
                    className="border border-cyan-400/30 bg-black/55 text-cyan-100 hover:bg-cyan-300 hover:text-black"
                  >
                    +
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={resetZoom}
                    disabled={zoomPercent === ZOOM_DEFAULT}
                    className="border border-cyan-400/30 bg-black/55 text-cyan-100 hover:bg-cyan-300 hover:text-black"
                  >
                    100%
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
        @keyframes hologram-enter {
          0% {
            opacity: 0;
            transform: perspective(1100px) rotateX(5deg) scale(0.94);
            filter: brightness(0.8) saturate(0.85);
          }
          35% {
            opacity: 1;
            transform: perspective(1100px) rotateX(0deg) scale(1.01);
            filter: brightness(1.12) saturate(1.08);
          }
          100% {
            opacity: 1;
            transform: perspective(1100px) rotateX(0deg) scale(1);
            filter: brightness(1) saturate(1);
          }
        }
        @keyframes hologram-sweep {
          0% {
            opacity: 0;
            transform: translateX(-35%) skewX(-18deg);
          }
          22% {
            opacity: 0.35;
          }
          55% {
            opacity: 0.15;
            transform: translateX(118%) skewX(-18deg);
          }
          100% {
            opacity: 0;
            transform: translateX(118%) skewX(-18deg);
          }
        }
        @keyframes hologram-scan {
          0% {
            opacity: 0.1;
            transform: translateY(-4%);
          }
          50% {
            opacity: 0.18;
            transform: translateY(0%);
          }
          100% {
            opacity: 0.1;
            transform: translateY(4%);
          }
        }
        .reveal-hologram-frame {
          animation: hologram-enter 420ms cubic-bezier(0.16, 0.9, 0.2, 1) both;
        }
        .reveal-hologram-sweep {
          background: linear-gradient(110deg, transparent 25%, rgba(0, 229, 255, 0.26) 48%, transparent 68%);
          mix-blend-mode: screen;
          animation: hologram-sweep 820ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .reveal-hologram-lines {
          background-image:
            linear-gradient(to bottom, rgba(0, 229, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px);
          background-size: 100% 3px, 4px 100%;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.8));
          animation: hologram-scan 2.2s ease-in-out infinite;
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
