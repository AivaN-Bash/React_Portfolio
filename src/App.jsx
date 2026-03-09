import { useState } from "react";
import "./styles/global.css";

// ── Components ──────────────────────────────────────────────
import Cursor      from "./components/Cursor";
import Nav         from "./components/Nav";
import Home        from "./components/Home";
import Skills      from "./components/Skills";
import Experience  from "./components/Experience";
import TravelStory from "./components/TravelStory";
import Contact     from "./components/Contact";

// ── Data ─────────────────────────────────────────────────────
import ME from "./data/me";

// ── SVG background triangles ─────────────────────────────────
const Tri = ({ size=40, color="#00c8ff", op=0.3, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
    style={{ ...style, opacity: op, pointerEvents: "none" }}>
    <polygon points="20,2 38,36 2,36" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

export default function App() {
  const [page, setPage] = useState("home");

  // All pages mapped to their components
  const pages = {
    home:    <Home    setPage={setPage} />,
    skills:  <Skills />,
    exp:     <Experience setPage={setPage} />,
    travel:  <TravelStory setPage={setPage} />,
    contact: <Contact />,
  };

  return (
    <>
      {/* ── Custom cursor ── */}
      <Cursor />

      {/* ── Background layers ── */}
      <div className="bg-l">
        <div className="bg-g" />
        <div className="bg-grid" />
        <div className="bg-dots" />
        <div className="scan" />
        <div className="clock-ring" />
        <div className="clock-ring2" />
        {/* Floating triangles */}
        <Tri size={90} color="#00c8ff" op={0.035} style={{ position:"fixed", top:"12%",    right:"6%",  animation:"float 8s ease-in-out infinite" }} />
        <Tri size={55} color="#ffd700" op={0.04}  style={{ position:"fixed", bottom:"18%", left:"4%",   animation:"float 10s 1s ease-in-out infinite" }} />
        <Tri size={38} color="#7b61ff" op={0.05}  style={{ position:"fixed", top:"58%",    right:"14%", animation:"float 7s 2s ease-in-out infinite" }} />
      </div>

      {/* ── Navigation ── */}
      <Nav page={page} setPage={setPage} />

      {/* ── Page content — re-mounts on page change for animations ── */}
      <main className="page" key={page}>
        {pages[page]}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="ft">© 2025 <span>{ME.name}</span> · {ME.nickname.toUpperCase()}</div>
        <div className="ft">ARCANA: <span>{ME.arcana}</span> · PERSONA 3 INSPIRED</div>
      </footer>
    </>
  );
}
