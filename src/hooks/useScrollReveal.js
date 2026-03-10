import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// useScrollReveal
//
// Attach ref to any element — it fades/slides in when it enters
// the viewport. Works on both desktop and mobile.
//
// Usage:
//   const ref = useScrollReveal();
//   <div ref={ref}> ... </div>
//
// Options:
//   delay  — ms before animation starts (default 0)
//   y      — translateY start distance in px (default 28)
// ─────────────────────────────────────────────────────────────
export default function useScrollReveal({ delay = 0, y = 28 } = {}) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden
    el.style.opacity   = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y]);

  return ref;
}
