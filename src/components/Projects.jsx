import "../styles/Projects.css";
import PROJECTS from "../data/projects";
import useScrollReveal from "../hooks/useScrollReveal";

const STATUS_CLASS = {
  "Live":        "ps-live",
  "In Progress": "ps-progress",
  "Completed":   "ps-done",
};

export default function Projects() {
  const headerRef = useScrollReveal({ delay: 0 });
  const gridRef   = useScrollReveal({ delay: 120 });

  return (
    <section className="sec">
      <div className="sec-tag">// PROJECTS</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">04</div>
        <div>
          <span className="sec-ey">things I've built</span>
          <h2 className="sec-title">My <span className="dim">Projects</span></h2>
          <div className="sec-rule"/>
        </div>
      </div>

      <div className="proj-grid" ref={gridRef}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="proj-card"
            style={{ animationDelay:`${i*0.1}s`, borderColor:`${p.color}22` }}
          >
            <div className="proj-corner-tr" style={{borderColor:`${p.color}55`}}/>
            <div className="proj-corner-bl" style={{borderColor:`${p.color}55`}}/>
            <div className="proj-roman" style={{color: p.color}}>{p.arcana}</div>

            <div className="proj-top">
              <div className="proj-icon">{p.icon}</div>
              <span className={`proj-status ${STATUS_CLASS[p.status]}`}>
                {p.status === "Live" ? "● " : ""}{p.status}
              </span>
            </div>

            <div className="proj-title">{p.title}</div>
            <p className="proj-desc">{p.desc}</p>

            <div className="proj-tags">
              {p.tags.map(tag => <span key={tag} className="proj-tag">{tag}</span>)}
            </div>

            <div className="proj-links">
              {p.github && (
                <a href={p.github} className="proj-link pl-github" target="_blank" rel="noreferrer">
                  ⌥ GitHub
                </a>
              )}
              {p.live && (
                <a href={p.live} className="proj-link pl-live" target="_blank" rel="noreferrer">
                  ▶ Live Demo
                </a>
              )}
            </div>

            <div className="proj-accent-bar"
              style={{background:`linear-gradient(90deg, ${p.color}, transparent)`}}/>
          </div>
        ))}
      </div>
    </section>
  );
}
