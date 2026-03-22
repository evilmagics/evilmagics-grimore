"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "THE SILENT ARCHITECT'S GRIMOIRE [Version 1.0.0]" },
    { type: "system", text: "(c) Unknown Entity. All rights reserved." },
    { type: "system", text: " " },
    { type: "system", text: "Type 'help' for available commands." }
  ]);
  
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Backtick (`) or Tilde (~)
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      
      const newHistory = [...history, { type: "user", text: `> ${input}` }];
      
      if (cmd === "admin" || cmd === "/admin" || cmd === "login" || cmd === "sudo") {
        newHistory.push({ type: "system", text: "Initiating teleportation sequence to the Inner Sanctum..." });
        setHistory(newHistory);
        setInput("");
        
        setTimeout(() => {
          setIsOpen(false);
          router.push("/admin/login");
        }, 800);
        return;
      } 
      else if (cmd === "help") {
        newHistory.push({ type: "system", text: "Available commands:" });
        newHistory.push({ type: "system", text: "  admin    - Access the backend Grimoire" });
        newHistory.push({ type: "system", text: "  clear    - Clear console output" });
        newHistory.push({ type: "system", text: "  exit     - Close this terminal" });
      }
      else if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      }
      else if (cmd === "exit") {
        setIsOpen(false);
        setInput("");
        return;
      }
      else if (cmd !== "") {
        newHistory.push({ type: "error", text: `Command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
          }}
        >
          {/* Backdrop/Overlay */}
          <div 
            style={{ position: "absolute", inset: 0, height: "100vh", background: "rgba(5,5,5,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Terminal Window */}
          <div 
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "800px",
              margin: "2rem auto",
              background: "rgba(13, 31, 23, 0.95)",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              borderTop: "2px solid var(--mana)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.05)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--mist)",
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <div style={{ background: "rgba(0, 229, 255, 0.05)", padding: "0.5rem 1rem", borderBottom: "1px solid rgba(0, 229, 255, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28ca41" }} />
              </div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(0,229,255,0.5)", textTransform: "uppercase" }}>GRIMOIRE_CLI v1.0</span>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem", height: "300px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {history.map((line, i) => (
                <div key={i} style={{ 
                  marginBottom: "4px", 
                  color: line.type === "error" ? "#ff5f57" : line.type === "user" ? "var(--mist)" : "rgba(0,229,255,0.7)" 
                }}>
                  {line.text}
                </div>
              ))}

              <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                <span style={{ color: "var(--mana)", marginRight: "8px" }}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  spellCheck="false"
                  autoComplete="off"
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--mist)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    flex: 1,
                    caretColor: "var(--mana)"
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
