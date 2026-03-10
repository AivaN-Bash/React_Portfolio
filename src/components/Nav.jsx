import { useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);

  // Close drawer when page changes
  useEffect(() => { setOpen(false); }, [page]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (id) => page === id || (page === "travel" && id === "exp");

  const navigate = (id) => {
    setPage(id);
    setOpen(false);
  };

  return (
    <>
      <nav className="nav">
        {/* Logo */}
        <div className="nav-logo" onClick={() => navigate("home")}>
          {ME.nickname.toUpperCase()} · PORTFOLIO
          <span className="nav-logo-sub">BACKEND DEVELOPER</span>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {LINKS.map(l => (
            <button key={l.id}
              className={`nl${isActive(l.id) ? " on" : ""}`}
              onClick={() => navigate(l.id)}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="nav-arcana">{ME.arcana}</div>

        {/* Hamburger button — mobile only */}
        <button
          className={`nav-burger${open ? " open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="burger-line"/>
          <span className="burger-line"/>
          <span className="burger-line"/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? " open" : ""}`}>
        {LINKS.map(l => (
          <button key={l.id}
            className={`drawer-link${isActive(l.id) ? " on" : ""}`}
            onClick={() => navigate(l.id)}>
            {l.label}
          </button>
        ))}
        <div className="drawer-arcana">{ME.arcana}</div>
      </div>
    </>
  );
}
