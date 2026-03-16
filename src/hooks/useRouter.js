import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useRouter
 *
 * Syncs page state with the browser History API.
 * Enables: back/forward buttons, direct URL links, shareable URLs.
 *
 * Race condition fix: the transition timeout is stored in a ref
 * and cleared before each new navigation, preventing stale state
 * if navigate() is called before the previous transition ends.
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
  const timerRef = useRef(null); // stored so we can cancel on rapid navigation

  // Handle browser back / forward
  useEffect(() => {
    const onPop = (e) => {
      const target = e.state?.page || "home";
      if (target === page) return;

      // Cancel any in-flight transition
      if (timerRef.current) clearTimeout(timerRef.current);

      setTransitioning(true);
      window.scrollTo({ top: 0, behavior: "instant" });

      timerRef.current = setTimeout(() => {
        setPage(target);
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
  }, [page]);

  // Stamp initial history entry with page state
  useEffect(() => {
    window.history.replaceState({ page }, "", BASE + PAGE_TO_PATH[page]);
    setPageTitle(page);
  }, []); // intentional: mount-only

  const navigate = useCallback((next) => {
    if (next === page) return;

    // Cancel in-flight transition before starting a new one
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    window.history.pushState({ page: next }, "", BASE + (PAGE_TO_PATH[next] || "/"));

    setTransitioning(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    timerRef.current = setTimeout(() => {
      setPage(next);
      setPageTitle(next);
      setTransitioning(false);
      timerRef.current = null;
    }, TRANSITION_MS);
  }, [page]);

  return { page, navigate, transitioning };
}
