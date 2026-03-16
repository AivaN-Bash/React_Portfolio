import { useCallback } from "react";

/**
 * useRipple
 *
 * Adds a material-style ripple wave on button press.
 * Works on both mouse click and touch tap.
 * Zero dependencies — pure DOM manipulation.
 *
 * Usage:
 *   const ripple = useRipple();
 *   <button {...ripple} className="ripple-origin">Click me</button>
 */
export default function useRipple() {
  const trigger = useCallback((e) => {
    const button = e.currentTarget;
    if (!button) return;

    const rect   = button.getBoundingClientRect();
    const x      = (e.clientX || rect.left + rect.width  / 2) - rect.left;
    const y      = (e.clientY || rect.top  + rect.height / 2) - rect.top;

    const wave = document.createElement("span");
    wave.className      = "ripple-wave";
    wave.style.left     = x + "px";
    wave.style.top      = y + "px";

    button.appendChild(wave);

    // Remove after animation completes
    wave.addEventListener("animationend", () => wave.remove(), { once: true });
  }, []);

  return {
    onClick:      trigger,
    onTouchStart: trigger,
    className:    "ripple-origin",
  };
}
