import { useState, useEffect } from "react";

/**
 * ScrollToTop
 *
 * Floating button — appears after scrolling 320px.
 * Smooth fade-in/out. Accessible keyboard target.
 * Styles live in global.css under .stt-btn.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
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
