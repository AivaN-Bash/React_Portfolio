import { useEffect, useState, useRef } from "react";

/**
 * LoadingScreen
 *
 * Persona 3 boot screen — shows once per browser session.
 * Uses a module-level flag (hasBooted) so it never re-renders
 * even if React remounts the tree.
 *
 * Performance: interval is paused when the tab is hidden
 * so it doesn't run in the background.
 */

const S = {
  wrap:    { position:"fixed", inset:0, zIndex:9000, background:"#01060f", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32 },
  ring1:   { position:"absolute", width:320, height:320, borderRadius:"50%", border:"1px solid rgba(0,200,255,0.18)", animation:"spin 8s linear infinite", borderTopColor:"#00c8ff" },
  ring2:   { position:"absolute", width:240, height:240, borderRadius:"50%", border:"1px solid rgba(255,215,0,0.1)",  animation:"spinR 12s linear infinite", borderRightColor:"#ffd700" },
  moon:    { fontSize:52, animation:"moonGlow 1.5s ease-in-out infinite", position:"relative", zIndex:1 },
  title:   { fontFamily:"'Cinzel',serif",         fontSize:13, fontWeight:700, color:"#e8f4ff", letterSpacing:6,  textTransform:"uppercase", position:"relative", zIndex:1 },
  arcana:  { fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#ffd700",  letterSpacing:4,  opacity:.65, position:"relative", zIndex:1 },
  barWrap: { width:200, height:2, background:"rgba(255,255,255,0.06)", overflow:"hidden", position:"relative", zIndex:1 },
  barFill: { height:"100%", background:"linear-gradient(90deg,#00c8ff,#7b61ff)", boxShadow:"0 0 8px rgba(0,200,255,0.5)", transition:"width 0.12s ease" },
  log:     { fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"rgba(0,200,255,0.45)", letterSpacing:2, height:14, position:"relative", zIndex:1 },
};

const BOOT_LINES = [
  "INITIALIZING PERSONA SYSTEM...",
  "LOADING TARTARUS DATA...",
  "SCANNING ARCANA RECORDS...",
  "CALIBRATING EVOKER...",
  "SYSTEM READY",
];

// Module-level flag — persists across React re-renders
let hasBooted = false;

export default function LoadingScreen() {
  const [visible,  setVisible]  = useState(!hasBooted);
  const [progress, setProgress] = useState(0);
  const [logLine,  setLogLine]  = useState(BOOT_LINES[0]);
  const [fading,   setFading]   = useState(false);

  const intervalRef = useRef(null);
  const doneRef     = useRef(false);
  const pctRef      = useRef(0);

  useEffect(() => {
    if (!visible) return;

    const tick = () => {
      // Pause when tab is hidden — don't waste cycles in background
      if (document.hidden) return;

      pctRef.current = Math.min(pctRef.current + 4, 100);
      const pct = pctRef.current;

      setProgress(pct);
      setLogLine(BOOT_LINES[Math.min(Math.floor(pct / 22), BOOT_LINES.length - 1)]);

      if (pct >= 100 && !doneRef.current) {
        doneRef.current = true;
        clearInterval(intervalRef.current);
        setTimeout(() => setFading(true), 350);
        setTimeout(() => {
          hasBooted = true;
          setVisible(false);
        }, 950);
      }
    };

    intervalRef.current = setInterval(tick, 40);

    return () => clearInterval(intervalRef.current);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{ ...S.wrap, opacity: fading ? 0 : 1, transition: "opacity 0.6s ease", pointerEvents: fading ? "none" : "all" }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div style={S.ring1} aria-hidden="true"/>
      <div style={S.ring2} aria-hidden="true"/>
      <div style={S.moon}  aria-hidden="true">🌙</div>
      <div style={S.title}>BEAM · PORTFOLIO</div>
      <div style={S.arcana}>THE FOOL — ARCANA 0</div>
      <div style={S.barWrap} aria-hidden="true">
        <div style={{ ...S.barFill, width: `${progress}%` }}/>
      </div>
      <div style={S.log} aria-live="polite">{logLine}</div>
    </div>
  );
}
