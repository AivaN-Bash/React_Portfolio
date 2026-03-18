import { useState, useCallback } from "react";
import "../styles/Skills.css";
import SKILLS       from "../data/skills";
import useScrollReveal from "../hooks/useScrollReveal";

// Level → display label
const LEVEL_LABEL = { Expert: "★★★", Advanced: "★★☆", Intermediate: "★☆☆" };
const TAG_CLASS   = { Expert: "b-ex", Advanced: "b-ad", Intermediate: "b-in" };

export default function Skills({ t = (k) => k, lang = "en" }) {
  const [tab,    setTab]    = useState("backend");
  const [tabKey, setTabKey] = useState(0);

  const headerRef = useScrollReveal({ delay: 0   });
  const tabsRef   = useScrollReveal({ delay: 80  });
  const gridRef   = useScrollReveal({ delay: 160 });

  const handleTab = useCallback((key) => {
    setTab(key);
    setTabKey(k => k + 1);
  }, []);

  const current = SKILLS[tab];

  return (
    <section className="sec">
      <div className="sec-tag">{t("sec_skills_tag")}</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">01</div>
        <div>
          <span className="sec-ey">{t("sec_skills_ey")}</span>
          <h2 className="sec-title">
            {t("sec_skills_title")} <span className="dim">{t("sec_skills_dim")}</span>
          </h2>
          <div className="sec-rule"/>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sk-tabs" ref={tabsRef} role="tablist" aria-label="Skill categories">
        {Object.entries(SKILLS).map(([key, val]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            aria-controls={`sk-panel-${key}`}
            className={`sk-tab${tab === key ? " on" : ""}`}
            data-arcana={val.arcana}
            onClick={() => handleTab(key)}
          >
            {val.icon} {lang === "th" ? val.label_th : val.label}
          </button>
        ))}
      </div>

      {/* Skill tag grid — no progress bars, no fake % numbers */}
      <div
        key={tabKey}
        id={`sk-panel-${tab}`}
        role="tabpanel"
        className="sk-grid"
        ref={gridRef}
      >
        {current.items.map((skill, i) => (
          <div
            key={skill.name}
            className={`sk-tag ${TAG_CLASS[skill.tag]}`}
            style={{ animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s both` }}
          >
            <span className="sk-tag-name">
              {lang === "th" ? skill.name_th : skill.name}
            </span>
            <span
              className={`sk-tag-badge ${TAG_CLASS[skill.tag]}`}
              aria-label={`${skill.tag} level`}
            >
              {skill.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
