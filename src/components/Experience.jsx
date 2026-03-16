import "../styles/Experience.css";
import EXP from "../data/experience";
import useScrollReveal from "../hooks/useScrollReveal";

// ── Each card is its own component so the hook call is valid ──
function ExpCard({ exp, index, setPage }) {
  const ref = useScrollReveal({ delay: index * 80 });
  return (
    <div ref={ref} className={`exp-card${exp.special ? " special" : ""}`}>
      <div className="exp-roman" style={{ color: exp.color }}>{exp.arcana}</div>
      <div className="exp-pb">{exp.period}</div>
      <h3 className="exp-role">{exp.role}</h3>
      <div className="exp-co" style={{ color: exp.color }}>{exp.company}</div>
      <div className={`exp-type${exp.special ? " special-type" : ""}`}>{exp.type}</div>
      <p className="exp-desc">{exp.desc}</p>
      <div className="exp-tags">
        {exp.tags.map(tag => <span key={tag} className="exp-tag">{tag}</span>)}
      </div>
      {exp.special && (
        <button className="exp-story-btn" onClick={() => setPage("travel")}>
          ✈ Read Full Story →
        </button>
      )}
    </div>
  );
}

export default function Experience({ setPage }) {
  const headerRef = useScrollReveal({ delay: 0 });

  return (
    <section className="sec">
      <div className="sec-tag">// EXPERIENCE</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">02</div>
        <div>
          <span className="sec-ey">where I've been</span>
          <h2 className="sec-title">Work <span className="dim">History</span></h2>
          <div className="sec-rule"/>
        </div>
      </div>

      <div className="exp-list">
        {EXP.map((exp, i) => (
          <div key={`${exp.company}-${exp.period}`}>
            <ExpCard exp={exp} index={i} setPage={setPage}/>
            {i < EXP.length - 1 && <div className="exp-conn"/>}
          </div>
        ))}
      </div>
    </section>
  );
}
