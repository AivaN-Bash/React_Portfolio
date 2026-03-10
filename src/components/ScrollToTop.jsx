import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      style={{
        position:   "fixed",
        bottom:     "24px",
        right:      "24px",
        zIndex:     500,
        width:      "46px",
        height:     "46px",
        background: "rgba(1,6,15,0.92)",
        border:     "1px solid rgba(0,200,255,0.35)",
        color:      "var(--blue)",
        fontSize:   "18px",
        cursor:     "pointer",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath:   "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
        backdropFilter: "blur(12px)",
        boxShadow:  visible ? "0 0 18px rgba(0,200,255,0.25)" : "none",
        // Smooth show/hide
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      ↑
    </button>
  );
}
