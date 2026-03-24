"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = (mx - 5) + "px";
        curRef.current.style.top = (my - 5) + "px";
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = (rx - 15) + "px";
        ringRef.current.style.top = (ry - 15) + "px";
      }
      requestAnimationFrame(animate);
    };

    const handleEnter = () => {
      if (curRef.current) curRef.current.style.transform = "scale(2)";
      if (ringRef.current) ringRef.current.style.transform = "scale(1.5)";
    };

    const handleLeave = () => {
      if (curRef.current) curRef.current.style.transform = "";
      if (ringRef.current) ringRef.current.style.transform = "";
    };

    document.addEventListener("mousemove", handleMove);
    animate();

    const interactiveEls = document.querySelectorAll("a, button, .elec-target, .iso-wrap, .hex-item, .pol");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.body.style.cursor = "";
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={curRef}
        style={{
          position: "fixed",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "var(--mana)",
          pointerEvents: "none",
          zIndex: 11000,
          mixBlendMode: "screen",
          transition: "transform 0.12s, width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "1px solid rgba(0,229,255,0.35)",
          pointerEvents: "none",
          zIndex: 10999,
          transition: "all 0.14s ease",
        }}
      />
    </>
  );
}
