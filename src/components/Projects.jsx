import "../styles/Projects.css";
import PROJECTS from "../data/projects";

// Map status string to CSS class
const STATUS_CLASS = {
  "Live":        "ps-live",
  "In Progress": "ps-progress",
  "Completed":   "ps-done",
};

export default function Projects() {
  return (
    <section className="sec">
      <div className="sec-tag">// WORKS</div>

      <div className="sec-hd">
        <div className="sec-n">04</div>
        <div>
          <span className="sec-ey">portfolio · builds</span>
          <h2 className="sec-title">My <span className="dim">Projects</span></h2>
          <div className="sec-rule" />
        </div>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="proj-card"
            style={{
              animationDelay: `${i * 0.1}s`,
              borderColor: `${p.color}22`,
            }}
          >
            {/* Corner deco */}
            <div className="proj-corner-tr" style={{ borderColor: `${p.color}55` }} />
            <div className="proj-corner-bl" style={{ borderColor: `${p.color}55` }} />

            {/* Roman numeral watermark */}
            <div className="proj-roman" style={{ color: p.color }}>{p.arcana}</div>

            {/* Top row — icon + status */}
            <div className="proj-top">
              <div className="proj-icon">{p.icon}</div>
              <span className={`proj-status ${STATUS_CLASS[p.status]}`}>
                {p.status === "Live" ? "● " : ""}{p.status}
              </span>
            </div>

            <div className="proj-title">{p.title}</div>
            <p className="proj-desc">{p.desc}</p>

            {/* Tech tags */}
            <div className="proj-tags">
              {p.tags.map(tag => (
                <span key={tag} className="proj-tag">{tag}</span>
              ))}
            </div>

            {/* Links */}
            <div className="proj-links">
              {p.github && (
                <a
                  href={p.github}
                  className="proj-link pl-github"
                  target="_blank"
                  rel="noreferrer"
                >
                  ⌥ GitHub
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  className="proj-link pl-live"
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Live Demo
                </a>
              )}
            </div>

            {/* Color accent bar */}
            <div
              className="proj-accent-bar"
              style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
