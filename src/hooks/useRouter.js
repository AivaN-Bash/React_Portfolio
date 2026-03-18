import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useRouter
 *
 * Syncs page state with the browser History API.
 * Back/forward buttons, direct URLs, and shareable links all work.
 *
 * Stability improvements over naive implementation:
 *   - pageRef mirrors page state so navigate() and the popstate
 *     handler can read the current page without [page] in their
 *     dependency arrays. This keeps navigate() referentially
 *     stable across navigations, preventing unnecessary re-renders
 *     in consumers (App useMemo, etc.).
 *   - popstate listener added once on mount, never re-added.
 *   - timerRef prevents transition race conditions.
 */

const PAGE_TITLES = {
  home:     "Beam · Portfolio",
  skills:   "Skills · Beam",
  projects: "Projects · Beam",
  exp:      "Experience · Beam",
  travel:   "Work & Travel · Beam",
  contact:  "Contact · Beam",
};

function setPageTitle(page) {
  document.title = PAGE_TITLES[page] || "Beam · Portfolio";
}

const PATH_TO_PAGE = {
  "/":           "home",
  "/home":       "home",
  "/skills":     "skills",
  "/projects":   "projects",
  "/exp":        "exp",
  "/experience": "exp",
  "/travel":     "travel",
  "/contact":    "contact",
};

const PAGE_TO_PATH = {
  home:     "/",
  skills:   "/skills",
  projects: "/projects",
  exp:      "/experience",
  travel:   "/travel",
  contact:  "/contact",
};

const BASE = process.env.PUBLIC_URL || "";

function getInitialPage() {
  const path = window.location.pathname.replace(BASE, "") || "/";
  return PATH_TO_PAGE[path] || "home";
}

const TRANSITION_MS = 200;

export default function useRouter() {
  const [page,          setPage]          = useState(getInitialPage);
  const [transitioning, setTransitioning] = useState(false);

  // Ref mirrors state — lets handlers read current page without
  // being in their dependency arrays (keeps them stable)
  const pageRef    = useRef(page);
  const timerRef   = useRef(null);

  // Keep ref in sync with state
  useEffect(() => { pageRef.current = page; return undefined; }, [page]);

  // Stamp initial history entry once on mount
  useEffect(() => {
    window.history.replaceState({ page }, "", BASE + PAGE_TO_PATH[page]);
    setPageTitle(page);
  }, []); // intentional mount-only

  // Back / forward — registered once, uses pageRef so no re-registration
  useEffect(() => {
    const onPop = (e) => {
      const target = e.state?.page || "home";
      if (target === pageRef.current) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      setTransitioning(true);
      window.scrollTo({ top: 0, behavior: "instant" });

      timerRef.current = setTimeout(() => {
        setPage(target);
        pageRef.current = target;
        setPageTitle(target);
        setTransitioning(false);
        timerRef.current = null;
      }, TRANSITION_MS);
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // stable — no [page] dep needed

  // navigate is now stable across page changes — [] dependency
  const navigate = useCallback((next) => {
    if (next === pageRef.current) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    window.history.pushState({ page: next }, "", BASE + (PAGE_TO_PATH[next] || "/"));
    setTransitioning(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    timerRef.current = setTimeout(() => {
      setPage(next);
      pageRef.current = next;
      setPageTitle(next);
      setTransitioning(false);
      timerRef.current = null;
    }, TRANSITION_MS);
  }, []); // stable — reads pageRef, no state deps

  return { page, navigate, transitioning };
}
