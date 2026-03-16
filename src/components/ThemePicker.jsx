import { useState, useRef, useEffect } from "react";
import { THEMES } from "../hooks/useTheme";
import "../styles/ThemePicker.css";

/**
 * ThemePicker
 *
 * Floating theme selector — bottom-left corner.
 * Opens a small panel with 4 theme options.
 * Fully keyboard accessible (Tab + Enter/Space + Escape).
 */
export default function ThemePicker({ theme, setTheme }) {
  const [open,    setOpen]    = useState(false);
  const panelRef              = useRef();
  const triggerRef            = useRef();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!panelRef.current?.contains(e.target)) setOpen(false);
    };
    // Delay so the trigger-click doesn't immediately close
    const timer = setTimeout(() => document.addEventListener("click", onClick), 50);
    return () => { clearTimeout(timer); document.removeEventListener("click", onClick); };
  }, [open]);

  const current = THEMES.find(t => t.id === theme);

  return (
    <div className="tp-wrap" ref={panelRef}>

      {/* Panel */}
      <div
        className={`tp-panel${open ? " open" : ""}`}
        role="listbox"
        aria-label="Choose colour theme"
        aria-expanded={open}
      >
        <div className="tp-panel-title">Theme</div>

        {THEMES.map(t => (
          <button
            key={t.id}
            role="option"
            aria-selected={theme === t.id}
            className={`tp-option${theme === t.id ? " on" : ""}`}
            onClick={() => { setTheme(t.id); setOpen(false); }}
            tabIndex={open ? 0 : -1}
          >
            <span
              className="tp-swatch"
              style={{ background: t.swatch }}
              aria-hidden="true"
            />
            <span className="tp-option-body">
              <span className="tp-option-name">{t.label}</span>
              <span className="tp-option-desc">{t.desc}</span>
            </span>
            {theme === t.id && (
              <span className="tp-check" aria-hidden="true">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Trigger button */}
      <button
        ref={triggerRef}
        className={`tp-trigger${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={`Current theme: ${current?.label}. Click to change.`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="tp-dot"
          style={{ background: current?.swatch }}
          aria-hidden="true"
        />
        <span className="tp-trigger-label" aria-hidden="true">Theme</span>
      </button>

    </div>
  );
}
