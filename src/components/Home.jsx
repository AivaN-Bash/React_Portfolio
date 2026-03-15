import { useState, useEffect } from "react";
import "../styles/Home.css";
import ME from "../data/me";
import useTilt from "../hooks/useTilt";

// ── SVG helpers ───────────────────────────────────────────────
const MoonSVG = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
    style={{ position:"absolute", opacity:.1, top:"-20px", right:"-20px", pointerEvents:"none" }}>
    <circle cx="60" cy="60" r="50" stroke="#00c8ff" strokeWidth="1"/>
    <path d="M60 10 C35 10 15 32 15 60 C15 88 35 110 60 110 C48 95 42 78 42 60 C42 42 48 25 60 10Z"
      fill="#00c8ff" opacity=".25"/>
  </svg>
);
const Tri = ({ size=40, color="#00c8ff", op=0.3, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
    style={{ ...style, opacity: op, pointerEvents:"none" }}>
    <polygon points="20,2 38,36 2,36" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

// ── Typing animation ──────────────────────────────────────────
const ROLES = [
  "Backend Developer",
  "API Engineer",
  "Node.js Developer",
  "Python Developer",
  "Database Designer",
];
function useTyping(words, speed=80, pause=1800) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && charIdx === current.length) delay = pause;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1)); setCharIdx(i => i + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1)); setCharIdx(i => i - 1);
      } else {
        setDeleting(false); setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ── Tech stack ────────────────────────────────────────────────
const STACK = [
  { name:"Node.js",    color:"#68a063" },
  { name:"Python",     color:"#3b8ede" },
  { name:"PostgreSQL", color:"#336791" },
  { name:"MongoDB",    color:"#4caf50" },
  { name:"Docker",     color:"#2496ed" },
  { name:"Redis",      color:"#dc382d" },
  { name:"Git",        color:"#f05032" },
  { name:"AWS",        color:"#ff9900" },
];

// ── Glitch name component ─────────────────────────────────────
function GlitchName({ text }) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  );
}

export default function Home({ setPage }) {
  const typedRole = useTyping(ROLES);
  const { cardRef, glowRef } = useTilt(11);
  const parts  = ME.name.split(" ");
  const middle = parts.slice(0, -1).join(" ");
  const last   = parts.slice(-1)[0];

  return (
    <section className="hero">
      {/* ── Left: text ── */}
      <div>
        <div className="h-over">Bangkok, Thailand · Open to Work</div>

        <h1 className="hero-name">
          {middle}<br/>
          {/* Glitch effect on last name */}
          <span className="gold"><GlitchName text={last}/></span>
        </h1>

        <div className="hero-nick">「 {ME.nickname.toUpperCase()} 」</div>

        {/* Typing animation */}
        <div className="hero-typing">
          <span className="typing-prefix">&gt;&nbsp;</span>
          <span className="typing-text">{typedRole}</span>
          <span className="typing-cursor">_</span>
        </div>

        <p className="hero-about">{ME.about}</p>

        {/* P3 status bars */}
        <div className="sb-wrap">
          <div className="sb-row">
            <span className="sb-lbl">EXP</span>
            <div className="sb-track"><div className="sb-fill sb-hp"/></div>
            <span className="sb-v">87/100</span>
          </div>
          <div className="sb-row">
            <span className="sb-lbl">SKL</span>
            <div className="sb-track"><div className="sb-fill sb-sp"/></div>
            <span className="sb-v">74/100</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="hero-btns">
          <button className="btn-p" onClick={() => setPage("contact")}>
            <span>✉ Contact Me</span>
          </button>
          <button className="btn-s" onClick={() => setPage("projects")}>
            ▶ View Projects
          </button>
          <a className="btn-cv" href="./cv/Beam-CV.pdf" download>
            ↓ Download CV
          </a>
        </div>

        {/* Tech stack pills */}
        <div className="stack-row">
          <span className="stack-label">STACK</span>
          <div className="stack-pills">
            {STACK.map(s => (
              <span key={s.name} className="stack-pill" style={{"--pill-color": s.color}}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Persona card with 3D tilt ── */}
      <div className="p-frame">
        <div className="p-ring1"/><div className="p-ring2"/>
        <div className="p-tr1"><Tri size={28} color="#00c8ff" op={0.55}/></div>
        <div className="p-tr2"><Tri size={20} color="#ffd700" op={0.45}/></div>

        {/* cardRef = tilt target */}
        <div className="p-card" ref={cardRef}>
          <MoonSVG/>
          {/* glowRef = cursor glow highlight layer */}
          <div ref={glowRef} className="p-card-glow"/>
          <div className="p-card-in">
            <div className="p-arcana">{ME.arcana}</div>
            <div className="p-symbol">🌙</div>
            <div className="p-cname">{parts[0]}<br/>{last}</div>
            <div className="p-cnick">「 {ME.nickname} 」</div>
            <div className="p-bar"/>
            <div className="p-crole">{ME.role}</div>
            <div className="p-dots">
              {[...Array(5)].map((_,i) => <div key={i} className={`p-dot${i<3?" on":""}`}/>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
