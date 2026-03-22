"use client";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function OriginSection() {
  const [decryptText, setDecryptText] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);

  const phrases = [
    ":: backend.developer",
    ":: system.architect",
    ":: api.conjurer",
    ":: database.weaver",
  ];
  const scrambleChars = "!@#$%&*<>?/|~ABCDEFabcdefgh0123456789";

  useEffect(() => {
    let timeout;
    function decrypt() {
      const target = phrases[phraseIdx.current];
      if (charIdx.current < target.length) {
        let scrambled = "";
        for (let i = charIdx.current; i < target.length; i++) {
          scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
        setDecryptText(target.slice(0, charIdx.current) + scrambled);
        charIdx.current++;
        timeout = setTimeout(decrypt, 52);
      } else {
        setDecryptText(target);
        charIdx.current = 0;
        phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        timeout = setTimeout(decrypt, 2300);
      }
    }
    timeout = setTimeout(decrypt, 1200);
    return () => clearTimeout(timeout);
  }, []);

  const stats = [
    { value: "4+", label: "Cycles of Craft" },
    { value: "∞", label: "Spells Compiled" },
    { value: "12", label: "Constructs Built" },
    { value: "01", label: "Silent Architect" },
  ];

  return (
    <section id="origin" className="section">
      <ScrollReveal>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="origin-grid"
        >
          <div>
            <span
              style={{
                fontSize: "0.52rem",
                letterSpacing: "0.5em",
                color: "var(--mana)",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                display: "block",
              }}
            >
              :: Origin.sys
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.9rem",
                color: "var(--mist)",
                lineHeight: 1.2,
                marginBottom: "1.2rem",
              }}
            >
              The System Manifest
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
                marginTop: "1.6rem",
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderLeft: "1px solid rgba(0,229,255,0.16)",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.5rem",
                      color: "var(--mana)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.5rem",
                      letterSpacing: "0.22em",
                      color: "rgba(224,224,224,0.32)",
                      textTransform: "uppercase",
                      marginTop: "0.18rem",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.9rem",
                color: "rgba(224,224,224,0.46)",
                lineHeight: 1.85,
                marginBottom: "1.1rem",
              }}
            >
              I am a Backend Developer — a weaver of invisible systems. My craft
              is to summon APIs as Summoning Gates, architect databases as
              Ancient Tomes, and bind services through the ley lines of
              distributed infrastructure.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.9rem",
                color: "rgba(224,224,224,0.46)",
                lineHeight: 1.85,
                marginBottom: "1.1rem",
                opacity: 0.52,
              }}
            >
              This grimoire is my sanctum. Every project a ritual. Every line of
              code a rune, etched into the silicon substrate of the modern world.
            </p>
            <div
              style={{
                fontSize: "0.66rem",
                lineHeight: 2,
                color: "rgba(0,229,255,0.48)",
                marginTop: "0.7rem",
                minHeight: "1.3rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              {decryptText}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <style jsx>{`
        @media (max-width: 768px) {
          .origin-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
