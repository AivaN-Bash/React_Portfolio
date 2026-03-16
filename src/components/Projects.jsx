import { useEffect, useRef } from "react";
import "../styles/Projects.css";
import PROJECTS      from "../data/projects";
import useScrollReveal from "../hooks/useScrollReveal";

const STATUS_CLASS = {
  "Live":        "ps-live",
  "In Progress": "ps-progress",
  "Completed":   "ps-done",
};

export default function Projects() {
  const headerRef = useScrollReveal({ delay: 0   });
  const gridReveal = useScrollReveal({ delay: 120 });

  // Separate ref for animation restart logic
  const gridEl = useRef();

  // Re-trigger card animations when page mounts
  useEffect(() => {
    const cards = gridEl.current?.querySelectorAll(".proj-card");
    cards?.forEach((card, i) => {
      card.style.animation = "none";
      void card.offsetHeight; // force reflow
      card.style.animation = `fadeUp 0.45s ${i * 0.08}s both`;
    });
  }, []);

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

      <div className="proj-grid" ref={(el) => { gridReveal.current = el; gridEl.current = el; }}>
        {PROJECTS.map((p) => (
          <article
            key={`${p.title}-${p.arcana}`}
            className="proj-card"
            style={{ borderColor: `${p.color}22` }}
            aria-label={`Project: ${p.title}`}
          >
            <div className="proj-corner-tr" style={{ borderColor: `${p.color}55` }} aria-hidden="true"/>
            <div className="proj-corner-bl" style={{ borderColor: `${p.color}55` }} aria-hidden="true"/>
            <div className="proj-roman"     style={{ color: p.color }}             aria-hidden="true">{p.arcana}</div>

            <div className="proj-top">
              <div className="proj-icon" aria-hidden="true">{p.icon}</div>
              <span className={`proj-status ${STATUS_CLASS[p.status]}`}>
                {p.status === "Live" && <span aria-hidden="true">● </span>}
                {p.status}
              </span>
            </div>

            <h3 className="proj-title">{p.title}</h3>
            <p  className="proj-desc">{p.desc}</p>

            <ul className="proj-tags" aria-label="Technologies">
              {p.tags.map(tag => (
                <li key={tag} className="proj-tag">{tag}</li>
              ))}
            </ul>

            <div className="proj-links">
              {p.github && (
                <a
                  href={p.github}
                  className="proj-link pl-github ripple-origin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} source code on GitHub`}
                >
                  ⌥ GitHub
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  className="proj-link pl-live ripple-origin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} live demo`}
                >
                  ▶ Live Demo
                </a>
              )}
            </div>

            <div
              className="proj-accent-bar"
              aria-hidden="true"
              style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
