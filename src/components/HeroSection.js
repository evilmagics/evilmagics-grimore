"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H;
    const pts = [];
    let animId;

    function resize() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.26;
        this.vy = (Math.random() - 0.5) * 0.26;
        this.sz = Math.random() * 1.3 + 0.25;
        this.a = Math.random() * 0.42 + 0.07;
        this.ph = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.ph += 0.016;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${this.a * (0.6 + 0.4 * Math.sin(this.ph))})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) pts.push(new Particle());

    function connections() {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.05 * (1 - d / 90)})`;
            ctx.lineWidth = 0.35;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      connections();
      pts.forEach((p) => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Rune Circle */}
      <div
        style={{
          position: "absolute",
          width: "440px",
          height: "440px",
          border: "1px solid rgba(0,229,255,0.05)",
          borderRadius: "50%",
          animation: "spin 40s linear infinite",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "18px",
            border: "1px solid rgba(0,229,255,0.03)",
            borderRadius: "50%",
            animation: "spin 18s linear infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "36px",
            border: "1px dashed rgba(0,229,255,0.05)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.5em",
            color: "var(--mana)",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
            opacity: 0,
            animation: "fadeUp 1s 0.1s forwards",
          }}
        >
          :: System initializing . . .
        </p>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
            color: "var(--mist)",
            lineHeight: 1.05,
            marginBottom: "0.45rem",
            opacity: 0,
            animation: "fadeUp 1s 0.2s forwards",
          }}
        >
          The Silent
          <br />
          <span style={{ color: "var(--mana)" }}>Architect</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "rgba(224,224,224,0.36)",
            marginBottom: "2.5rem",
            letterSpacing: "0.1em",
            opacity: 0,
            animation: "fadeUp 1s 0.3s forwards",
          }}
        >
          Conjuring systems from the void
        </p>
        <a
          href="#origin"
          className="elec-target"
          style={{
            display: "inline-block",
            border: "1px solid rgba(0,229,255,0.25)",
            padding: "0.6rem 2rem",
            fontSize: "0.58rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--mana)",
            textDecoration: "none",
            transition: "all 0.4s",
            opacity: 0,
            animation: "fadeUp 1s 0.4s forwards",
            position: "relative",
            overflow: "hidden",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "var(--mana)";
            e.target.style.boxShadow = "0 0 24px var(--mana-glow)";
            e.target.style.background = "var(--mana-dim)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(0,229,255,0.25)";
            e.target.style.boxShadow = "none";
            e.target.style.background = "transparent";
          }}
        >
          Enter the Grimoire
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
          opacity: 0,
          animation: "fadeUp 1s 0.6s forwards",
        }}
      >
        <span
          style={{
            fontSize: "0.46rem",
            letterSpacing: "0.4em",
            color: "rgba(0,229,255,0.32)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "44px",
            background: "linear-gradient(to bottom, var(--mana), transparent)",
          }}
        />
      </div>
    </section>
  );
}
