import { useEffect, useRef } from "react";

// ── Cursor with RAF throttle ─────────────────────────────────
// Raw mousemove fires 200+ times/sec on fast mice.
// requestAnimationFrame caps updates to 60fps max — much smoother
// and uses far less CPU.
export default function Cursor() {
  const c    = useRef();
  const d    = useRef();
  const pos  = useRef({ x: 0, y: 0 });
  const raf  = useRef();

  useEffect(() => {
    // Detect touch — don't run cursor on mobile at all
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Cancel any pending frame before scheduling a new one
      if (raf.current) cancelAnimationFrame(raf.current);

      raf.current = requestAnimationFrame(() => {
        const { x, y } = pos.current;
        if (c.current) {
          c.current.style.left = x + "px";
          c.current.style.top  = y + "px";
        }
        if (d.current) {
          d.current.style.left = x + "px";
          d.current.style.top  = y + "px";
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="p3c" ref={c} aria-hidden="true"/>
      <div id="p3d" ref={d} aria-hidden="true"/>
    </>
  );
}
