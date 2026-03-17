import { useState, useEffect, useCallback, useMemo } from "react";
import "../styles/Nav.css";
import ME         from "../data/me";
import useRipple  from "../hooks/useRipple";
import { THEMES } from "../hooks/useTheme";

// ── Nav links — numbers match reference image ─────────────────
const LINKS = [
  { id: "home",     num: "01" },
  { id: "skills",   num: "02" },
  { id: "projects", num: "03" },
  { id: "exp",      num: "04" },
  { id: "contact",  num: "05" },
];

// Lang toggle — EN / TH only
const LANGS = [
  { id: "en", label: "EN" },
  { id: "th", label: "TH" },
];

const lockScroll   = () => document.body.classList.add("scroll-locked");
const unlockScroll = () => document.body.classList.remove("scroll-locked");

export default function Nav({ page, setPage, theme, setTheme, lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const ripple = useRipple();

  // Stable navigate — no page in deps (uses pageRef in useRouter)
  const navigate = useCallback((id) => {
    setPage(id);
    setOpen(false);
  }, [setPage]);

  // Pre-computed handlers — stable until navigate/ripple change
  const navClick = useMemo(() => (
    Object.fromEntries(LINKS.map(l => [
      l.id,
      (e) => { ripple.onClick(e); navigate(l.id); }
    ]))
  ), [navigate, ripple]);

  const navTouch = useMemo(() => (
    Object.fromEntries(LINKS.map(l => [
      l.id,
      (e) => ripple.onTouchStart(e)
    ]))
  ), [ripple]);

  // Close drawer when route changes
  useEffect(() => { setOpen(false); }, [page]);

  // Body scroll lock — class-based, not style mutation
  useEffect(() => {
    open ? lockScroll() : unlockScroll();
    return unlockScroll;
  }, [open]);

  // Escape key closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = useCallback(
    (id) => page === id || (page === "travel" && id === "exp"),
    [page]
  );

  // Cycle to next language
  const cycleLang = useCallback(() => {
    const idx  = LANGS.findIndex(l => l.id === lang);
    const next = LANGS[(idx + 1) % LANGS.length];
    setLang(next.id);
  }, [lang, setLang]);

  return (
    <>
      {/* ── Top nav bar ── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">

        <button
          className="nav-logo"
          onClick={() => navigate("home")}
          aria-label="Go to home"
        >
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
              onClick={navClick[l.id]}
              onTouchStart={navTouch[l.id]}
              aria-current={isActive(l.id) ? "page" : undefined}
            >
              {t(`nav_${l.id}`)}
            </button>
          ))}
        </div>

        {/* Desktop: theme dots + lang */}
        <div className="nav-right">
          <div className="nav-themes" aria-label="Choose theme" role="group">
            {THEMES.map(t2 => (
              <button
                key={t2.id}
                className={`nav-theme-dot${theme === t2.id ? " on" : ""}`}
                style={{ "--dot-color": t2.swatch }}
                onClick={() => setTheme(t2.id)}
                aria-label={`${t2.label} theme`}
                aria-pressed={theme === t2.id}
                title={t2.label}
              />
            ))}
          </div>

          {/* Language button — desktop only */}
          <button
            className="nav-lang"
            onClick={cycleLang}
            aria-label={`Current language: ${lang.toUpperCase()}. Click to change.`}
          >
            {LANGS.find(l => l.id === lang)?.label}
          </button>
        </div>

        {/* Hamburger */}
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

      {/* ── Mobile drawer — reference design ── */}
      <div
        id="mobile-drawer"
        className={`nav-drawer${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        {/* Top rule — thin line matching reference */}
        <div className="drawer-rule" aria-hidden="true"/>

        {/* Large numbered nav items — main feature of reference */}
        <nav className="drawer-nav" aria-label="Mobile navigation">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              className={`drawer-item${isActive(l.id) ? " on" : ""}`}
              onClick={navClick[l.id]}
              onTouchStart={navTouch[l.id]}
              aria-current={isActive(l.id) ? "page" : undefined}
              tabIndex={open ? 0 : -1}
              style={{ animationDelay: open ? `${i * 0.06}s` : "0s" }}
            >
              {/* Small dim number — left side */}
              <span className="drawer-num" aria-hidden="true">{l.num}</span>

              {/* Large bold label */}
              <span className="drawer-label">{t(`nav_${l.id}`)}</span>

              {/* Active indicator dot — right side */}
              {isActive(l.id) && (
                <span className="drawer-dot" aria-hidden="true"/>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom bar — language + theme */}
        <div className="drawer-footer">
          {/* Language selector — EN / TH / 日本語 */}
          <div
            className="drawer-lang"
            role="group"
            aria-label="Select language"
          >
            {LANGS.map((l, i) => (
              <span key={l.id} className="drawer-lang-group">
                <button
                  className={`drawer-lang-btn${lang === l.id ? " on" : ""}`}
                  onClick={() => setLang(l.id)}
                  aria-label={`Switch to ${l.label}`}
                  aria-pressed={lang === l.id}
                  tabIndex={open ? 0 : -1}
                >
                  {l.label}
                </button>
                {i < LANGS.length - 1 && (
                  <span className="drawer-lang-sep" aria-hidden="true">/</span>
                )}
              </span>
            ))}
          </div>

          {/* Theme dots — compact row */}
          <div className="drawer-themes" aria-label="Choose theme" role="group">
            {THEMES.map(t2 => (
              <button
                key={t2.id}
                className={`drawer-theme-dot${theme === t2.id ? " on" : ""}`}
                style={{ "--dot-color": t2.swatch }}
                onClick={() => setTheme(t2.id)}
                aria-label={`${t2.label} theme`}
                aria-pressed={theme === t2.id}
                tabIndex={open ? 0 : -1}
                title={t2.label}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
