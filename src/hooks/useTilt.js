import { useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// useTilt
//
// Gives a card a 3D perspective tilt that follows the mouse.
// On mobile/touch devices: shows a gentle auto-rotate instead.
//
// Usage:
//   const { cardRef, glowRef } = useTilt();
//   <div ref={cardRef}>
//     <div ref={glowRef} />   ← optional glow that follows cursor
//   </div>
// ─────────────────────────────────────────────────────────────
export default function useTilt(intensity = 12) {
  const cardRef = useRef();
  const glowRef = useRef();
  const isMobile = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const reset = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.5s ease";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isMobile) return; // skip on touch devices

    const onMove = (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const rotX   = (-dy / (rect.height / 2)) * intensity;
      const rotY   = ( dx / (rect.width  / 2)) * intensity;

      card.style.transition = "transform 0.08s ease";
      card.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;

      // Move glow highlight
      if (glowRef.current) {
        const gx = ((e.clientX - rect.left) / rect.width)  * 100;
        const gy = ((e.clientY - rect.top)  / rect.height) * 100;
        glowRef.current.style.opacity    = "1";
        glowRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,200,255,0.18), transparent 65%)`;
      }
    };

    const onLeave = () => reset();

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity, isMobile, reset]);

  return { cardRef, glowRef, isMobile };
}
