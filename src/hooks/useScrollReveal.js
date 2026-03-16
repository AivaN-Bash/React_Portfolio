import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 *
 * Fades + slides an element in when it enters the viewport.
 * Respects prefers-reduced-motion.
 * Cleans up all timers and observers on unmount.
 *
 * @param {number} delay - ms before animation starts (default 0)
 * @param {number} y     - translateY start distance in px (default 22)
 */
export default function useScrollReveal({ delay = 0, y = 22 } = {}) {
  const ref      = useRef();
  const timerRef = useRef(); // stored so we can cancel on unmount

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect OS-level "Reduce Motion" setting
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity   = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity    = "0";
    el.style.transform  = `translateY(${y}px)`;
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        el.style.opacity   = "1";
        el.style.transform = "translateY(0)";

        // Clean up will-change after animation finishes — stored so unmount can cancel
        timerRef.current = setTimeout(() => {
          el.style.willChange = "auto";
        }, delay + 600);

        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delay, y]);

  return ref;
}
