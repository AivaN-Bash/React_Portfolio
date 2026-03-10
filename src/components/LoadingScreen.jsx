import { useEffect, useState } from "react";

// ── Inline styles (no external CSS needed — it unmounts after load) ──────────
const S = {
  wrap: {
    position: "fixed", inset: 0, zIndex: 9000,
    background: "#01060f",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: 32,
    transition: "opacity 0.6s ease",
  },
  ring1: {
    position: "absolute",
    width: 320, height: 320, borderRadius: "50%",
    border: "1px solid rgba(0,200,255,0.2)",
    animation: "spin 8s linear infinite",
    borderTopColor: "#00c8ff",
  },
  ring2: {
    position: "absolute",
    width: 240, height: 240, borderRadius: "50%",
    border: "1px solid rgba(255,215,0,0.12)",
    animation: "spinR 12s linear infinite",
    borderRightColor: "#ffd700",
  },
  moon: { fontSize: 52, animation: "moonGlow 1.5s ease-in-out infinite", position: "relative", zIndex: 1 },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: 13, fontWeight: 700,
    color: "#e8f4ff", letterSpacing: 6,
    textTransform: "uppercase",
    position: "relative", zIndex: 1,
  },
  arcana: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10, color: "#ffd700",
    letterSpacing: 4, opacity: 0.7,
    position: "relative", zIndex: 1,
  },
  barWrap: {
    width: 200, height: 2,
    background: "rgba(255,255,255,0.07)",
    borderRadius: 1, overflow: "hidden",
    position: "relative", zIndex: 1,
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg, #00c8ff, #7b61ff)",
    boxShadow: "0 0 8px rgba(0,200,255,0.6)",
    transition: "width 0.15s ease",
  },
  log: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 9, color: "rgba(0,200,255,0.5)",
    letterSpacing: 2, height: 14,
    position: "relative", zIndex: 1,
  },
};

const BOOT_LINES = [
  "INITIALIZING PERSONA SYSTEM...",
  "LOADING TARTARUS DATA...",
  "SCANNING ARCANA RECORDS...",
  "CALIBRATING EVOKER...",
  "SYSTEM READY",
];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [logLine,  setLogLine]  = useState(BOOT_LINES[0]);
  const [fading,   setFading]   = useState(false);

  useEffect(() => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += 4;
      setProgress(Math.min(pct, 100));

      // Update boot log text as progress goes up
      const idx = Math.min(Math.floor(pct / 22), BOOT_LINES.length - 1);
      setLogLine(BOOT_LINES[idx]);

      if (pct >= 100) {
        clearInterval(interval);
        // Short pause then fade out
        setTimeout(() => setFading(true), 400);
        setTimeout(() => onDone(), 1000);
      }
    }, 40); // ~1.6s total

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div style={{ ...S.wrap, opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "all" }}>
      {/* Rotating rings */}
      <div style={S.ring1} />
      <div style={S.ring2} />

      {/* Moon icon */}
      <div style={S.moon}>🌙</div>

      {/* Title */}
      <div style={S.title}>BEAM · PORTFOLIO</div>
      <div style={S.arcana}>THE FOOL — ARCANA 0</div>

      {/* Progress bar */}
      <div style={S.barWrap}>
        <div style={{ ...S.barFill, width: `${progress}%` }} />
      </div>

      {/* Boot log */}
      <div style={S.log}>{logLine}</div>
    </div>
  );
}
