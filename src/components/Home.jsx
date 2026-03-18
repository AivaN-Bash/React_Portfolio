import { memo } from "react";
import "../styles/Home.css";
import ME from "../data/me";
import useTilt   from "../hooks/useTilt";
import useTyping from "../hooks/useTyping";
import useRipple  from "../hooks/useRipple";

// ── Constants ────────────────────────────────────────────────
// Bilingual roles — indexed, not translated via t() because useTyping
// takes a simple string array. We pass the right array per lang.
const ROLES_EN = [
  "Backend Developer",
  "API Engineer",
  "Node.js Developer",
  "Python Developer",
  "Database Designer",
];
const ROLES_TH = [
  "นักพัฒนา Backend",
  "วิศวกร API",
  "นักพัฒนา Node.js",
  "นักพัฒนา Python",
  "ออกแบบฐานข้อมูล",
];

const STACK = [
  { name: "Node.js",    color: "#68a063" },
  { name: "Python",     color: "#3b8ede" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB",    color: "#4caf50" },
  { name: "Docker",     color: "#2496ed" },
  { name: "Redis",      color: "#dc382d" },
  { name: "Git",        color: "#f05032" },
  { name: "AWS",        color: "#ff9900" },
];

// ── Sub-components — memoized so they never re-render ────────

const MoonSVG = memo(() => (
  <svg
    width="120" height="120" viewBox="0 0 120 120" fill="none"
    aria-hidden="true"
    className="p-moon-svg"
  >
    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1"/>
    <path
      d="M60 10 C35 10 15 32 15 60 C15 88 35 110 60 110 C48 95 42 78 42 60 C42 42 48 25 60 10Z"
      fill="currentColor" opacity=".25"
    />
  </svg>
));
MoonSVG.displayName = "MoonSVG";

const TriSVG = memo(({ size = 40, color = "var(--accent)", op = 0.3, style = {} }) => (
  <svg
    width={size} height={size} viewBox="0 0 40 40" fill="none"
    aria-hidden="true"
    style={{ ...style, opacity: op, pointerEvents: "none" }}
  >
    <polygon points="20,2 38,36 2,36" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
));
TriSVG.displayName = "TriSVG";

const GlitchName = memo(({ text }) => (
  <span className="glitch" data-text={text}>{text}</span>
));
GlitchName.displayName = "GlitchName";

// ── Component ────────────────────────────────────────────────
export default function Home({ setPage, t, lang = 'en' }) {
  const roles     = lang === 'th' ? ROLES_TH : ROLES_EN;
  const typedRole = useTyping(roles);
  const { cardRef, glowRef } = useTilt(11);
  const ripple = useRipple();

  const nameParts = ME.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName  = nameParts.at(-1);

  // Use PUBLIC_URL so CV works on both localhost and GitHub Pages
  const cvHref = `${process.env.PUBLIC_URL || ""}/cv/Beam-CV.pdf`;

  return (
    <section className="hero">

      {/* ── Left column — text content ── */}
      <div className="hero-content">

        <p className="h-over" aria-label="Location and status">
          {t("over_location")} · {t("over_status")}
        </p>

        <h1 className="hero-name">
          {firstName}<br/>
          <span className="gold">
            <GlitchName text={lastName}/>
          </span>
        </h1>

        <p className="hero-nick" aria-label="Nickname">
          「 {ME.nickname.toUpperCase()} 」
        </p>

        {/* Typing animation */}
        <div className="hero-typing" aria-label={`Role: ${typedRole}`} aria-live="polite">
          <span className="typing-prefix" aria-hidden="true">&gt;&nbsp;</span>
          <span className="typing-text">{typedRole}</span>
          <span className="typing-cursor" aria-hidden="true">_</span>
        </div>

        <p className="hero-about">{lang === 'th' ? ME.about_th : ME.about}</p>

        {/* P3-style status bars — decorative */}
        <div className="sb-wrap" aria-hidden="true">
          <div className="sb-row">
            <span className="sb-lbl hp">EXP</span>
            <div className="sb-track"><div className="sb-fill sb-hp"/></div>
            <span className="sb-v">87/100</span>
          </div>
          <div className="sb-row">
            <span className="sb-lbl sp">SKL</span>
            <div className="sb-track"><div className="sb-fill sb-sp"/></div>
            <span className="sb-v">74/100</span>
          </div>
        </div>

        {/* CTA buttons — primary: View Projects, secondary: Contact, tertiary: CV */}
        <div className="hero-btns">
          <button {...ripple} className="btn-p ripple-origin" onClick={() => setPage("projects")}>
            <span>▶ {t("hero_cta_projects")}</span>
          </button>
          <button {...ripple} className="btn-s ripple-origin" onClick={() => setPage("contact")}>
            ✉ {t("hero_cta_contact")}
          </button>
          <a
            className="btn-cv"
            href={cvHref}
            download="Beam-CV.pdf"
            aria-label="Download CV as PDF"
          >
            ↓ {t("hero_cta_cv")}
          </a>
        </div>

        {/* Tech stack */}
        <div className="stack-row">
          <span className="stack-label" aria-hidden="true">{t("hero_stack_label")}</span>
          <ul className="stack-pills" aria-label="Tech stack">
            {STACK.map(s => (
              <li
                key={s.name}
                className="stack-pill"
                style={{ "--pill-color": s.color }}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right column — Persona card ── */}
      <div className="p-frame" aria-hidden="true">
        <div className="p-ring1"/>
        <div className="p-ring2"/>
        <div className="p-tr1">
          <TriSVG size={28} color="var(--accent)" op={0.55}/>
        </div>
        <div className="p-tr2">
          <TriSVG size={20} color="var(--accent2)" op={0.45}/>
        </div>

        <div className="p-card" ref={cardRef}>
          <MoonSVG/>
          <div ref={glowRef} className="p-card-glow"/>
          <div className="p-card-in">
            <div className="p-arcana">{ME.arcana}</div>
            <div className="p-symbol">🌙</div>
            <div className="p-cname">{firstName}<br/>{lastName}</div>
            <div className="p-cnick">「 {ME.nickname} 」</div>
            <div className="p-bar"/>
            <div className="p-crole">{lang === 'th' ? ME.role_th : ME.role}</div>
            <div className="p-dots">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`p-dot${i < 3 ? " on" : ""}`}/>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
