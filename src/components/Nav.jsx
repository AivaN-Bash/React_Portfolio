import { useState, useEffect, useCallback } from "react";
import "../styles/Nav.css";
import ME          from "../data/me";
import useRipple   from "../hooks/useRipple";
import { THEMES }  from "../hooks/useTheme";

const LINKS = [
  { id: "home",     label: "Home"       },
  { id: "skills",   label: "Skills"     },
  { id: "projects", label: "Projects"   },
  { id: "exp",      label: "Experience" },
  { id: "contact",  label: "Contact"    },
];

export default function Nav({ page, setPage, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const ripple  = useRipple();
  // Merge ripple trigger with navigate so both fire on click
  const navClick   = (id) => (e) => { ripple.onClick(e);   navigate(id); };
  const navTouch   = (id) => (e) => { ripple.onTouchStart(e); };

  useEffect(() => { setOpen(false); }, [page]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive   = (id) => page === id || (page === "travel" && id === "exp");
  const navigate   = useCallback((id) => { setPage(id); setOpen(false); }, [setPage]);

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">

        {/* Logo */}
        <button className="nav-logo" onClick={() => navigate("home")} aria-label="Go to home">
          {ME.nickname.toUpperCase()} · PORTFOLIO
          <span className="nav-logo-sub">BACKEND DEVELOPER</span>
        </button>

        {/* Desktop links */}
        <div className="nav-links" role="list">
          {LINKS.map(l => (
            <button
              key={l.id}
              role="listitem"
              className={`nl ripple-origin${isActive(l.id) ? " on" : ""}`}
              onClick={navClick(l.id)}
              onTouchStart={navTouch(l.id)}
              aria-current={isActive(l.id) ? "page" : undefined}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Theme dots — desktop */}
        <div className="nav-themes" aria-label="Choose theme" role="group">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`nav-theme-dot${theme === t.id ? " on" : ""}`}
              style={{ "--dot-color": t.swatch }}
              onClick={() => setTheme(t.id)}
              aria-label={`${t.label} theme`}
              aria-pressed={theme === t.id}
              title={t.label}
            />
          ))}
        </div>

        {/* Hamburger — mobile */}
        <button
          className={`nav-burger${open ? " open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          <span className="burger-line" aria-hidden="true"/>
          <span className="burger-line" aria-hidden="true"/>
          <span className="burger-line" aria-hidden="true"/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`nav-drawer${open ? " open" : ""}`}
        role="dialog" aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        {LINKS.map(l => (
          <button
            key={l.id}
            className={`drawer-link ripple-origin${isActive(l.id) ? " on" : ""}`}
            onClick={navClick(l.id)}
            onTouchStart={navTouch(l.id)}
            aria-current={isActive(l.id) ? "page" : undefined}
            tabIndex={open ? 0 : -1}
          >
            {l.label}
          </button>
        ))}

        {/* Theme switcher inside drawer on mobile */}
        <div className="drawer-themes" aria-label="Choose theme" role="group">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`drawer-theme-dot${theme === t.id ? " on" : ""}`}
              style={{ "--dot-color": t.swatch }}
              onClick={() => { setTheme(t.id); }}
              aria-label={`${t.label} theme`}
              aria-pressed={theme === t.id}
              tabIndex={open ? 0 : -1}
              title={t.label}
            />
          ))}
        </div>

        <div className="drawer-arcana" aria-hidden="true">{ME.arcana}</div>
      </div>
    </>
  );
}
