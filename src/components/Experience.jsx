import "../styles/Experience.css";
import EXP from "../data/experience";
import useScrollReveal from "../hooks/useScrollReveal";

// ── Each card is its own component so the hook call is valid ──
function ExpCard({ exp, index, setPage, t, lang = 'en' }) {
  const ref = useScrollReveal({ delay: index * 80 });
  return (
    <div ref={ref} className={`exp-card${exp.special ? " special" : ""}`}>
      <div className="exp-roman" style={{ color: exp.color }}>{exp.arcana}</div>
      <div className="exp-pb">{exp.period}</div>
      <h3 className="exp-role">{lang === 'th' ? (exp.role_th || exp.role) : exp.role}</h3>
      <div className="exp-co" style={{ color: exp.color }}>{lang === 'th' ? (exp.company_th || exp.company) : exp.company}</div>
      <div className={`exp-type${exp.special ? " special-type" : ""}`}>{lang === 'th' ? (exp.type_th || exp.type) : exp.type}</div>
      <p className="exp-desc">{lang === 'th' ? (exp.desc_th || exp.desc) : exp.desc}</p>
      <div className="exp-tags">
        {exp.tags.map(tag => <span key={tag} className="exp-tag">{tag}</span>)}
      </div>
      {exp.special && (
        <button className="exp-story-btn" onClick={() => setPage("travel")}>
          {t("exp_story_btn")}
        </button>
      )}
    </div>
  );
}

export default function Experience({ setPage, t = (k) => k, lang = 'en' }) {
  const headerRef = useScrollReveal({ delay: 0 });

  return (
    <section className="sec">
      <div className="sec-tag">{t("sec_exp_tag")}</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">02</div>
        <div>
          <span className="sec-ey">{t("sec_exp_ey")}</span>
          <h2 className="sec-title">{t("sec_exp_title")} <span className="dim">{t("sec_exp_dim")}</span></h2>
          <div className="sec-rule"/>
        </div>
      </div>

      <div className="exp-list">
        {EXP.map((exp, i) => (
          <div key={`${exp.company}-${exp.period}`}>
            <ExpCard exp={exp} index={i} setPage={setPage} t={t} lang={lang}/>
            {i < EXP.length - 1 && <div className="exp-conn"/>}
          </div>
        ))}
      </div>
    </section>
  );
}
