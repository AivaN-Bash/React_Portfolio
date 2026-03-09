import "../styles/Nav.css";
import ME from "../data/me";

const LINKS = [
  { id: "home",    label: "Home"       },
  { id: "skills",  label: "Skills"     },
  { id: "exp",     label: "Experience" },
  { id: "contact", label: "Contact"    },
];

export default function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>
        {ME.nickname.toUpperCase()} · PORTFOLIO
        <span className="nav-logo-sub">BACKEND DEVELOPER</span>
      </div>

      <div className="nav-links">
        {LINKS.map(l => (
          <button
            key={l.id}
            className={`nl ${(page === l.id || (page === "travel" && l.id === "exp")) ? "on" : ""}`}
            onClick={() => setPage(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="nav-arcana">{ME.arcana}</div>
    </nav>
  );
}
