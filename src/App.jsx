import { lazy, Suspense, memo } from "react";
import "./styles/global.css";

import Cursor        from "./components/Cursor";
import Nav           from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop   from "./components/ScrollToTop";
import ME            from "./data/me";
import useRouter     from "./hooks/useRouter";
import useTheme      from "./hooks/useTheme";

const Home        = lazy(() => import("./components/Home"));
const Skills      = lazy(() => import("./components/Skills"));
const Projects    = lazy(() => import("./components/Projects"));
const Experience  = lazy(() => import("./components/Experience"));
const TravelStory = lazy(() => import("./components/TravelStory"));
const Contact     = lazy(() => import("./components/Contact"));

const Background = memo(() => (
  <div className="bg-l" aria-hidden="true">
    <div className="bg-g"/>
    <div className="bg-grid"/>
    <div className="bg-dots"/>
    <div className="scan"/>
    <div className="clock-ring"/>
    <div className="clock-ring2"/>
    <svg className="bg-tri t1" width="90" height="90" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,36 2,36" stroke="currentColor" strokeWidth="1.5" fill="none"
        style={{ color:"var(--accent)" }}/>
    </svg>
    <svg className="bg-tri t2" width="55" height="55" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,36 2,36" stroke="currentColor" strokeWidth="1.5" fill="none"
        style={{ color:"var(--accent2)" }}/>
    </svg>
    <svg className="bg-tri t3" width="38" height="38" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,36 2,36" stroke="currentColor" strokeWidth="1.5" fill="none"
        style={{ color:"var(--purple)" }}/>
    </svg>
  </div>
));
Background.displayName = "Background";

const PageFallback = () => (
  <div style={{
    minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center",
    color:"var(--accent)", opacity:.3, fontFamily:"var(--mono)",
    fontSize:"11px", letterSpacing:"0.2em",
  }}>
    LOADING...
  </div>
);

export default function App() {
  const { page, navigate, transitioning } = useRouter();
  const { theme, setTheme }               = useTheme();

  const renderPage = () => {
    switch (page) {
      case "home":     return <Home     setPage={navigate}/>;
      case "skills":   return <Skills/>;
      case "projects": return <Projects/>;
      case "exp":      return <Experience setPage={navigate}/>;
      case "travel":   return <TravelStory/>;
      case "contact":  return <Contact/>;
      default:         return <Home setPage={navigate}/>;
    }
  };

  return (
    <>
      <LoadingScreen/>
      <Cursor/>
      <Background/>

      {/* Nav receives theme props — switcher lives inside nav */}
      <Nav page={page} setPage={navigate} theme={theme} setTheme={setTheme}/>

      <main
        className="page"
        style={{
          opacity:    transitioning ? 0 : 1,
          transform:  transitioning ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <Suspense fallback={<PageFallback/>}>
          {renderPage()}
        </Suspense>
      </main>

      <footer className="footer">
        <div className="ft">
          © {new Date().getFullYear()} <span>{ME.name}</span> · {ME.nickname.toUpperCase()}
        </div>
        <div className="ft">ARCANA: <span>{ME.arcana}</span> · PERSONA 3 INSPIRED</div>
      </footer>

      <ScrollToTop/>
    </>
  );
}
