"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Origin", href: "/#origin" },
    { label: "Essences", href: "/#essences" },
    { label: "Constructs", href: "/#constructs" },
    { label: "Echoes", href: "/#echoes" },
    { label: "Signal", href: "/#signal" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 500,
        padding: "1.1rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled
          ? "rgba(5,5,5,0.95)"
          : "linear-gradient(to bottom, rgba(5,5,5,0.92), transparent)",
        backdropFilter: "blur(6px)",
        transition: "background 0.3s",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.06)" : "none",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: "var(--mana)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <img 
          src="/logo.png" 
          alt="Grimoire" 
          style={{ 
            width: "28px", 
            height: "28px", 
            filter: "drop-shadow(0 0 8px var(--mana-glow))",
            objectFit: "contain"
          }} 
        />
        ./evilmagics
      </Link>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "var(--mana)",
          fontSize: "1.2rem",
          cursor: "pointer",
          zIndex: 600,
        }}
        className="mobile-nav-toggle"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      <ul
        style={{
          display: "flex",
          gap: "2.5rem",
          listStyle: "none",
        }}
        className={`nav-links ${mobileOpen ? "nav-open" : ""}`}
      >
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.25em",
                color: "rgba(224,224,224,0.4)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.3s",
                position: "relative",
                paddingBottom: "3px",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--mana)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(224,224,224,0.4)";
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-nav-toggle {
            display: block !important;
          }
          .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            width: 70%;
            height: 100vh;
            flex-direction: column;
            background: rgba(5,5,5,0.98);
            padding: 5rem 2rem;
            gap: 2rem !important;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 1px solid rgba(0,229,255,0.1);
          }
          .nav-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </nav>
  );
}
