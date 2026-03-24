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
    <nav className={`main-nav ${scrolled ? "scrolled" : ""}`}>
      <Link
        href="/"
        className="brand-link"
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
        className="mobile-nav-toggle"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-links ${mobileOpen ? "nav-open" : ""}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="nav-link-item"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .main-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 500;
          padding: 1.1rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to bottom, rgba(5,5,5,0.92), transparent);
          backdrop-filter: blur(6px);
          transition: background 0.3s, padding 0.3s;
          border-bottom: none;
        }
        .main-nav.scrolled {
          background: rgba(5,5,5,0.95);
          border-bottom: 1px solid rgba(0,229,255,0.06);
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link-item {
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          color: rgba(224,224,224,0.4);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.3s;
          position: relative;
          padding-bottom: 3px;
        }
        .nav-link-item:hover {
          color: var(--mana);
        }
        .mobile-nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--mana);
          font-size: 1.2rem;
          cursor: pointer;
          z-index: 600;
        }
        @media (max-width: 768px) {
          .main-nav {
            padding: 1rem 1.5rem;
          }
          .mobile-nav-toggle {
            display: block;
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
            gap: 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 1px solid rgba(0,229,255,0.1);
          }
          .nav-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
