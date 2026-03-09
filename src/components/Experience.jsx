import "../styles/Experience.css";
import EXP from "../data/experience";

export default function Experience({ setPage }) {
  return (
    <section className="sec">
      <div className="sec-tag">// JOURNEY</div>

      <div className="sec-hd">
        <div className="sec-n">02</div>
        <div>
          <span className="sec-ey">work history · timeline</span>
          <h2 className="sec-title">Work <span className="dim">Experience</span></h2>
          <div className="sec-rule" />
        </div>
      </div>

      <div className="exp-list">
        {EXP.map((exp, i) => (
          <div key={exp.role + i}>
            <div
              className={`exp-card${exp.special ? " special" : ""}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Roman numeral */}
              <div className="exp-roman" style={{ color: exp.color }}>{exp.arcana}</div>

              {/* Period badge */}
              <div className="exp-pb">{exp.period}</div>

              <h3 className="exp-role">{exp.role}</h3>
              <div className="exp-co" style={{ color: exp.color }}>{exp.company}</div>
              <div className={`exp-type${exp.special ? " special-type" : ""}`}>{exp.type}</div>
              <p className="exp-desc">{exp.desc}</p>

              <div className="exp-tags">
                {exp.tags.map(tag => (
                  <span key={tag} className="exp-tag">{tag}</span>
                ))}
              </div>

              {/* Read Full Story button — only on special card */}
              {exp.special && (
                <button className="exp-story-btn" onClick={() => setPage("travel")}>
                  ✈ Read Full Story →
                </button>
              )}
            </div>

            {/* Timeline connector between cards */}
            {i < EXP.length - 1 && <div className="exp-conn" />}
          </div>
        ))}
      </div>
    </section>
  );
}
