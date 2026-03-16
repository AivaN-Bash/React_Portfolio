import { useEffect, useRef } from "react";

/**
 * Cursor
 *
 * Custom P3-themed cursor — outer ring + inner dot.
 * Uses CSS transform: translate() instead of style.left/top.
 *
 * Why transform is faster:
 *   style.left/top  → triggers layout → paint → composite (3 steps)
 *   transform       → skips layout and paint → composite only (1 step)
 *   Both run through requestAnimationFrame at 60fps max.
 *
 * Touch / mobile: detected once on mount, cursor hidden entirely.
 */
export default function Cursor() {
  const ringRef = useRef();
  const dotRef  = useRef();
  const posRef  = useRef({ x: -100, y: -100 }); // start off-screen
  const rafRef  = useRef();

  useEffect(() => {
    // Skip cursor entirely on touch / no-pointer devices
    if (window.matchMedia("(hover: none)").matches) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    // Show elements now — hidden via CSS until first move
    ring.style.opacity = "1";
    dot.style.opacity  = "1";

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = posRef.current;
        // Single GPU-composited write — no layout, no paint
        const t = `translate(${x}px, ${y}px)`;
        ring.style.transform = t;
        dot.style.transform  = t;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="p3c" ref={ringRef} aria-hidden="true"/>
      <div id="p3d" ref={dotRef}  aria-hidden="true"/>
    </>
  );
}
