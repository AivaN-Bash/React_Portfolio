import { useState, useEffect } from "react";

/**
 * useTheme
 *
 * Manages the active colour theme for the portfolio.
 * Reads from localStorage → falls back to system preference.
 * Writes data-theme on <html> so all CSS variables cascade.
 */

export const THEMES = [
  {
    id:     "midnight",
    label:  "Midnight",
    desc:   "Deep navy — Persona 3 default",
    swatch: "#00c8ff",
  },
  {
    id:     "aurora",
    label:  "Violet",
    desc:   "Deep purple — dreamlike",
    swatch: "#c084fc",
  },
  {
    id:     "ember",
    label:  "Ember",
    desc:   "Volcanic dark — fire energy",
    swatch: "#f97316",
  },
  {
    id:     "dawn",
    label:  "Dawn",
    desc:   "Off-white — clean light mode",
    swatch: "#0284c7",
  },
];

const VALID_IDS  = new Set(THEMES.map(t => t.id));
const STORAGE_KEY = "beam-portfolio-theme";

function getInitialTheme() {
  // 1. Saved preference
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_IDS.has(saved)) return saved;
  } catch { /* localStorage blocked (private mode etc.) */ }

  // 2. System preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "midnight"
    : "dawn";
}

export default function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;

    // Apply theme attribute — triggers CSS cascade
    html.setAttribute("data-theme", theme);

    // Smooth color transition between themes
    html.style.setProperty("transition", "background-color 0.4s ease, color 0.3s ease");
    const cleanup = setTimeout(() => html.style.removeProperty("transition"), 450);

    // Persist
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignore */ }

    return () => clearTimeout(cleanup);
  }, [theme]);

  const setTheme = (id) => {
    if (VALID_IDS.has(id)) setThemeState(id);
  };

  return { theme, setTheme, themes: THEMES };
}
