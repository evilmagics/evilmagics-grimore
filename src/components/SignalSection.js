"use client";
import { useState, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

export default function SignalSection() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const btnRef = useRef(null);

  const spawnSpark = useCallback((x, y, color = "#00E5FF") => {
    // Ring
    const ring = document.createElement("div");
    ring.className = "click-ring";
    ring.style.cssText = `left:${x}px;top:${y}px;border-color:${color}`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 500);

    // Sparks
    const count = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "elec-spark";
      const angle = (i / count) * Math.PI * 2;
      const dist = 30 + Math.random() * 50;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const sz = 1.5 + Math.random() * 2.5;
      s.style.cssText = `left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;background:${color};--dx:${dx}px;--dy:${dy}px;animation:sparkFly ${0.3 + Math.random() * 0.3}s ease-out forwards`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }
  }, []);

  const handleSend = () => {
    if (!subject.trim() || !message.trim() || !email.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        spawnSpark(rect.left + rect.width / 2, rect.top, "#00E5FF");
      }
    }, 1400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const inputStyle = {
    fontSize: "0.72rem",
    fontFamily: "var(--font-mono)",
    color: "var(--mist)",
    background: "transparent",
    border: "none",
    outline: "none",
    flex: 1,
    caretColor: "var(--mana)",
    padding: 0,
    width: "100%",
  };

  return (
    <section id="signal" className="section">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label">:: Signal.transmit</span>
          <h2 className="section-title">The Resonance Link</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ maxWidth: "660px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "rgba(224,224,224,0.36)",
              textAlign: "center",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Speak your signal into the void.
            <br />
            The Architect receives all transmissions.
          </p>

          <div
            style={{
              background: "#020a05",
              border: "1px solid rgba(0,229,255,0.1)",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                background: "rgba(0,229,255,0.04)",
                padding: "0.6rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                borderBottom: "1px solid rgba(0,229,255,0.06)",
              }}
            >
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28ca41" }} />
              <span
                style={{
                  fontSize: "0.52rem",
                  letterSpacing: "0.28em",
                  color: "rgba(0,229,255,0.32)",
                  textTransform: "uppercase",
                  marginLeft: "auto",
                }}
              >
                signal_terminal v1.0
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "1.5rem 1.25rem 1.75rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem", fontSize: "0.72rem", lineHeight: 1.6, alignItems: "flex-start" }}>
                <span style={{ color: "var(--mana)", opacity: 0.6, whiteSpace: "nowrap" }}>[grimoire]$</span>
                <span style={{ color: "var(--mana)" }}>Resonance channel established.</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem", fontSize: "0.72rem", lineHeight: 1.6, alignItems: "flex-start" }}>
                <span style={{ color: "var(--mana)", opacity: 0.6, whiteSpace: "nowrap" }}>[grimoire]$</span>
                <span style={{ color: "rgba(224,224,224,0.5)" }}>Awaiting transmission. Complete the following fields.</span>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(0,229,255,0.05)", margin: "0.6rem 0" }} />

              {/* Subject */}
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <span style={{ color: "var(--mana)", opacity: 0.5, fontSize: "0.62rem", minWidth: "120px" }}>subject:</span>
                <input
                  type="text"
                  placeholder="e.g. Collaboration Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(0,229,255,0.05)", margin: "0.6rem 0" }} />

              {/* Message */}
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <span style={{ color: "var(--mana)", opacity: 0.5, fontSize: "0.62rem", minWidth: "120px" }}>message:</span>
                <input
                  type="text"
                  placeholder="Your transmission..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(0,229,255,0.05)", margin: "0.6rem 0" }} />

              {/* Email */}
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <span style={{ color: "var(--mana)", opacity: 0.5, fontSize: "0.62rem", minWidth: "120px" }}>signal_origin:</span>
                <input
                  type="email"
                  placeholder="your@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(0,229,255,0.05)", margin: "0.6rem 0" }} />

              {/* Error */}
              {error && (
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem", fontSize: "0.72rem", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--mana)", opacity: 0.6 }}>[err]$</span>
                  <span style={{ color: "#ff5f57" }}>Incomplete transmission. All fields required.</span>
                </div>
              )}

              {/* Actions */}
              {!sent ? (
                <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.52rem", color: "rgba(0,229,255,0.25)", letterSpacing: "0.2em" }}>
                    press ENTER or execute →
                  </span>
                  <button
                    ref={btnRef}
                    onClick={handleSend}
                    disabled={sending}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--mana)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.3em",
                      cursor: sending ? "wait" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.5rem 0",
                      position: "relative",
                      transition: "all 0.3s",
                      opacity: sending ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!sending) e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--mana)";
                    }}
                  >
                    <span>{sending ? "./transmitting..." : "./transmit.sh"}</span>
                    <span style={{ transition: "transform 0.3s" }}>→</span>
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1.5rem",
                    fontFamily: "var(--font-heading)",
                    color: "var(--mana)",
                    fontSize: "1rem",
                    letterSpacing: "0.3em",
                    animation: "fadeUp 0.5s ease forwards",
                  }}
                >
                  <div style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>✦</div>
                  Signal Received
                  <br />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      color: "rgba(0,229,255,0.38)",
                      letterSpacing: "0.28em",
                    }}
                  >
                    THE ARCHITECT WILL RESPOND
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
