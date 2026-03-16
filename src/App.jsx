import { lazy, Suspense, memo, useMemo } from "react";
import "./styles/global.css";

import Cursor        from "./components/Cursor";
import Nav           from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop   from "./components/ScrollToTop";
import ME            from "./data/me";
import useRouter     from "./hooks/useRouter";
import useTheme      from "./hooks/useTheme";

// ── Lazy pages — code-split per route ────────────────────────
const Home        = lazy(() => import("./components/Home"));
const Skills      = lazy(() => import("./components/Skills"));
const Projects    = lazy(() => import("./components/Projects"));
const Experience  = lazy(() => import("./components/Experience"));
const TravelStory = lazy(() => import("./components/TravelStory"));
const Contact     = lazy(() => import("./components/Contact"));

// ── Static values — defined outside component so never recreated ──
const CURRENT_YEAR = new Date().getFullYear();

// Page factory map — avoids switch/case and useMemo dependency array
const PAGES = {
  home:     (nav) => <Home     setPage={nav}/>,
  skills:   ()    => <Skills/>,
  projects: ()    => <Projects/>,
  exp:      (nav) => <Experience setPage={nav}/>,
  travel:   ()    => <TravelStory/>,
  contact:  ()    => <Contact/>,
};

// ── Background — memoised, never re-renders ──────────────────
// Three individual fixed-position SVGs. Cannot use a single SVG
// with CSS vw/vh transforms on <polygon> — SVG elements live in
// SVG coordinate space, not the viewport.
const Background = memo(() => (
  <div className="bg-l" aria-hidden="true">
    <div className="bg-g"/>
    <div className="bg-grid"/>
    <div className="bg-dots"/>
    <div className="scan"/>
    <div className="clock-ring"/>
    <div className="clock-ring2"/>

    <svg className="bg-tri t1" width="90"  height="90"  viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,36 2,36" stroke="var(--accent)"  strokeWidth="1.5" fill="none"/>
    </svg>
    <svg className="bg-tri t2" width="55"  height="55"  viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,36 2,36" stroke="var(--accent2)" strokeWidth="1.5" fill="none"/>
    </svg>
    <svg className="bg-tri t3" width="38"  height="38"  viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,36 2,36" stroke="var(--purple)"  strokeWidth="1.5" fill="none"/>
    </svg>
  </div>
));
Background.displayName = "Background";

// ── Page loading fallback ─────────────────────────────────────
const PageFallback = () => (
  <div className="page-fallback" role="status" aria-label="Loading page">
    <span>LOADING</span>
  </div>
);

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const { page, navigate, transitioning } = useRouter();
  const { theme, setTheme }               = useTheme();

  // Only re-renders page content when page or navigate changes
  const pageContent = useMemo(
    () => (PAGES[page] ?? PAGES.home)(navigate),
    [page, navigate]
  );

  return (
    <>
      <LoadingScreen/>
      <Cursor/>
      <Background/>

      <Nav
        page={page}
        setPage={navigate}
        theme={theme}
        setTheme={setTheme}
      />

      {/* CSS class drives transition — no inline style object on every render */}
      <main className={`page${transitioning ? " page--out" : ""}`}>
        <Suspense fallback={<PageFallback/>}>
          {pageContent}
        </Suspense>
      </main>

      <footer className="footer">
        <p className="ft">
          © {CURRENT_YEAR} <span>{ME.name}</span>
          {" · "}{ME.nickname.toUpperCase()}
        </p>
        <p className="ft">
          ARCANA: <span>{ME.arcana}</span>
          {" · "}PERSONA 3 INSPIRED
        </p>
      </footer>

      <ScrollToTop/>
    </>
  );
}
