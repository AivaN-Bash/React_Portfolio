import { useState, useEffect, useRef } from "react";

/**
 * ScrollToTop
 *
 * Appears after scrolling 320px. Fades in/out smoothly.
 *
 * Performance fix: only calls setState when visible actually
 * changes — avoids a re-render on every single scroll event.
 * Uses useRef to track the previous value without triggering
 * extra renders.
 */
export default function ScrollToTop() {
  const [visible, setVisible]   = useState(false);
  const prevVisible = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 320;
      // Only update state when value actually changes
      if (shouldShow !== prevVisible.current) {
        prevVisible.current = shouldShow;
        setVisible(shouldShow);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`stt-btn${visible ? " stt-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      ↑
    </button>
  );
}
