import "../styles/Nav.css";
import ME from "../data/me";

const LINKS = [
  { id:"home",     label:"Home"       },
  { id:"skills",   label:"Skills"     },
  { id:"projects", label:"Projects"   },
  { id:"exp",      label:"Experience" },
  { id:"contact",  label:"Contact"    },
];

export default function Nav({ page, setPage }) {
  const isActive = (id) =>
    page === id || (page === "travel" && id === "exp");

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
            className={`nl${isActive(l.id) ? " on" : ""}`}
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
