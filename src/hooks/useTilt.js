import { useRef, useEffect, useCallback } from "react";

/**
 * useTilt
 *
 * RAF-throttled 3D card tilt that follows the cursor.
 * Mobile/touch: skipped entirely (no hover capability).
 *
 * Performance notes:
 *   - getBoundingClientRect() is cached and only updated via
 *     ResizeObserver — prevents forced reflow on every mousemove.
 *   - requestAnimationFrame caps DOM writes to 60fps max.
 *   - will-change: transform promotes card to its own GPU layer.
 *   - Glow color read from CSS variable at runtime so it respects
 *     the active theme automatically.
 */
export default function useTilt(intensity = 12) {
  const cardRef   = useRef();
  const glowRef   = useRef();
  const rafRef    = useRef();
  const rectRef   = useRef(null); // cached bounding rect
  const isMobile  = typeof window !== "undefined" &&
                    window.matchMedia("(hover: none)").matches;

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.45s ease";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isMobile) return;

    // Promote to GPU layer once
    card.style.willChange = "transform";

    // Cache rect — updated by ResizeObserver, not on every mousemove
    rectRef.current = card.getBoundingClientRect();

    const resizeObserver = new ResizeObserver(() => {
      rectRef.current = card.getBoundingClientRect();
    });
    resizeObserver.observe(card);

    // Also refresh rect on scroll (position changes)
    const onScroll = () => { rectRef.current = card.getBoundingClientRect(); };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cache accent-rgb — read once + update when theme changes
    const accentRef = { current: "0,200,255" };
    const readAccent = () => {
      accentRef.current = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb").trim() || "0,200,255";
    };
    readAccent();

    // Watch for theme attribute changes on <html>
    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, {
      attributes: true, attributeFilter: ["data-theme"],
    });

    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = rectRef.current;
        if (!rect) return;

        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const rotX = (-(e.clientY - cy) / (rect.height / 2)) * intensity;
        const rotY = ((e.clientX - cx)  / (rect.width  / 2)) * intensity;

        card.style.transition = "transform 0.06s ease";
        card.style.transform  =
          `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;

        if (glowRef.current) {
          const gx = ((e.clientX - rect.left) / rect.width)  * 100;
          const gy = ((e.clientY - rect.top)  / rect.height) * 100;
          glowRef.current.style.opacity    = "1";
          glowRef.current.style.background =
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(${accentRef.current},0.16), transparent 65%)`;
        }
      });
    };

    card.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", reset);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      card.style.willChange = "auto";
    };
  }, [intensity, isMobile, reset]);

  return { cardRef, glowRef };
}
