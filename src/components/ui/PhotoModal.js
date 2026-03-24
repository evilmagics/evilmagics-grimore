"use client";
import React, { useEffect, useCallback } from "react";

export default function PhotoModal({ photo, onClose, onNext, onPrev }) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999, // High z-index to overlay CustomCursor if needed, though they shouldn't conflict
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,5,10,0.85)",
        backdropFilter: "blur(10px)",
        padding: "2rem",
        animation: "fadeIn 0.3s ease-out"
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "min(1200px, 95vw)",
          maxWidth: "95vw",
          maxHeight: "95vh",
          height: "auto",
          aspectRatio: photo.aspect || "16/9",
          background: "rgba(0,25,35,0.4)",
          clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
          border: "1px solid rgba(0,229,255,0.4)",
          boxShadow: "0 0 50px rgba(0,229,255,0.2)",
          animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner content
      >
        {/* Fake border for modal */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid var(--mana)",
            pointerEvents: "none",
            zIndex: 2,
            boxSizing: "border-box"
          }}
        />
        {/* Targeting crosshairs overlay */}
        <div
          style={{
            position: "absolute",
            inset: "2%",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            pointerEvents: "none",
            zIndex: 3
          }}
        >
          <div style={{ position: "absolute", top: "-5px", left: "-5px", width: "15px", height: "15px", borderTop: "2px solid var(--mana)", borderLeft: "2px solid var(--mana)" }} />
          <div style={{ position: "absolute", bottom: "-5px", right: "-5px", width: "15px", height: "15px", borderBottom: "2px solid var(--mana)", borderRight: "2px solid var(--mana)" }} />
        </div>

        <div
          style={{
            width: "100%",
            height: "100%",
            background: photo.gradient,
            objectFit: "cover",
            zIndex: 0
          }}
          dangerouslySetInnerHTML={{ __html: photo.svg }}
        />

        {/* Modal Content HUD */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2rem",
            background: "linear-gradient(to top, rgba(0,10,15,0.95), transparent)",
            zIndex: 5,
            pointerEvents: "none"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--mana)", marginBottom: "0.5rem", letterSpacing: "3px" }}>
                {photo.category?.toUpperCase()} // ID:{photo.id}
              </div>
              <h2 style={{ margin: "0", fontSize: "2rem", color: "#fff", textShadow: "0 2px 10px rgba(0,229,255,0.5)" }}>
                {photo.title}
              </h2>
            </div>
            <div style={{ textAlign: "right", fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "0.2rem 0.85rem", justifyContent: "end", alignItems: "center" }}>
                <span>{photo.exif_data?.aperture || "No data"}</span>
                <span style={{ color: "var(--mana)" }}>[APT]</span>

                <span>{photo.exif_data?.shutter || "No data"}</span>
                <span style={{ color: "var(--mana)" }}>[SHT]</span>

                <span>{photo.exif_data?.iso || "No data"}</span>
                <span style={{ color: "var(--mana)" }}>[ISO]</span>

                <span>{photo.exif_data?.focal || "No data"}</span>
                <span style={{ color: "var(--mana)" }}>[FCL]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Overlays */}
        {onPrev && (
          <div
            className="elec-target"
            onClick={onPrev}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "15%",
              zIndex: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "2rem",
              background: "linear-gradient(to right, rgba(0,10,20,0.5), transparent)",
              opacity: 0,
              transition: "opacity 0.3s",
              color: "var(--mana)",
              fontSize: "3rem",
              fontFamily: "monospace"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
          >
            &lt;
          </div>
        )}
        
        {onNext && (
          <div
            className="elec-target"
            onClick={onNext}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "15%",
              zIndex: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "2rem",
              background: "linear-gradient(to left, rgba(0,10,20,0.5), transparent)",
              opacity: 0,
              transition: "opacity 0.3s",
              color: "var(--mana)",
              fontSize: "3rem",
              fontFamily: "monospace"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
          >
            &gt;
          </div>
        )}

        {/* Close Button UI */}
        <div
          className="elec-target"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "calc(2% + 0.8rem)",
            right: "calc(2% + 0.8rem)",
            zIndex: 11,
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,10,20,0.6)",
            border: "1px solid var(--mana)",
            color: "var(--mana)",
            fontFamily: "monospace",
            cursor: "pointer",
            clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--mana)";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,10,20,0.6)";
            e.currentTarget.style.color = "var(--mana)";
          }}
        >
          X
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(10px); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
