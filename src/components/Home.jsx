import "../styles/Home.css";
import ME from "../data/me";

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

export default function Home({ setPage }) {
  const [first, ...rest] = ME.name.split(" ");
  const last = ME.name.split(" ").slice(-1)[0];
  const middle = ME.name.split(" ").slice(0, -1).join(" ");

  return (
    <section className="hero">
      {/* ── Text side ── */}
      <div>
        <div className="h-over">PERSONA ACTIVATED — AWAITING COMMAND</div>

        <h1 className="hero-name">
          {middle}<br/>
          <span className="gold">{last}</span>
        </h1>

        <div className="hero-nick">「 {ME.nickname.toUpperCase()} 」</div>
        <div className="hero-role">{ME.role}</div>
        <p className="hero-about">{ME.about}</p>

        {/* P3-style status bars */}
        <div className="sb-wrap">
          <div className="sb-row">
            <span className="sb-lbl">EXP</span>
            <div className="sb-track"><div className="sb-fill sb-hp" /></div>
            <span className="sb-v">87/100</span>
          </div>
          <div className="sb-row">
            <span className="sb-lbl">SKL</span>
            <div className="sb-track"><div className="sb-fill sb-sp" /></div>
            <span className="sb-v">74/100</span>
          </div>
        </div>

        <div className="hero-btns">
          <button className="btn-p" onClick={() => setPage("contact")}>
            <span>✉ Contact Me</span>
          </button>
          <button className="btn-s" onClick={() => setPage("skills")}>
            ▶ View Skills
          </button>
        </div>
      </div>

      {/* ── Persona card side ── */}
      <div className="p-frame">
        <div className="p-ring1" />
        <div className="p-ring2" />
        <div className="p-tr1"><Tri size={28} color="#00c8ff" op={0.55} /></div>
        <div className="p-tr2"><Tri size={20} color="#ffd700" op={0.45} /></div>

        <div className="p-card">
          <MoonSVG />
          <div className="p-card-in">
            <div className="p-arcana">{ME.arcana}</div>
            <div className="p-symbol">🌙</div>
            <div className="p-cname">{first}<br />{last}</div>
            <div className="p-cnick">「 {ME.nickname} 」</div>
            <div className="p-bar" />
            <div className="p-crole">{ME.role}</div>
            <div className="p-dots">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`p-dot${i < 3 ? " on" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
