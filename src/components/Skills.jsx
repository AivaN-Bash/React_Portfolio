import { useState, useEffect, useCallback } from "react";
import "../styles/Skills.css";
import SKILLS       from "../data/skills";
import useScrollReveal from "../hooks/useScrollReveal";

const TAG_CLASS = { Expert: "b-ex", Advanced: "b-ad", Intermediate: "b-in" };

export default function Skills({ t = (k) => k, lang = 'en' }) {
  const [tab,  setTab]  = useState("backend");
  const [anim, setAnim] = useState(false);
  // tabKey forces a remount of the grid when tab changes,
  // which restarts the stagger animation cleanly
  const [tabKey, setTabKey] = useState(0);

  const headerRef = useScrollReveal({ delay: 0   });
  const tabsRef   = useScrollReveal({ delay: 100 });
  const gridRef   = useScrollReveal({ delay: 180 });

  // Trigger bar fill animation after tab change
  useEffect(() => {
    setAnim(false);
    const t = setTimeout(() => setAnim(true), 60);
    return () => clearTimeout(t);
  }, [tab]);

  const handleTab = useCallback((key) => {
    setTab(key);
    setTabKey(k => k + 1); // forces grid remount → animation restarts
  }, []);

  const current = SKILLS[tab];

  return (
    <section className="sec">
      <div className="sec-tag">{t("sec_skills_tag")}</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">01</div>
        <div>
          <span className="sec-ey">{t("sec_skills_ey")}</span>
          <h2 className="sec-title">{t("sec_skills_title")} <span className="dim">{t("sec_skills_dim")}</span></h2>
          <div className="sec-rule"/>
        </div>
      </div>

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
            {val.icon} {lang === 'th' ? val.label_th : val.label}
          </button>
        ))}
      </div>

      {/* key=tabKey forces remount so fadeUp animation replays on tab change */}
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
            className="sk-card"
            style={{ animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s both` }}
          >
            <div className="sk-tr" aria-hidden="true"/>
            <div className="sk-bl" aria-hidden="true"/>
            <div className="sk-top">
              <span className="sk-name">{lang === 'th' ? skill.name_th : skill.name}</span>
              <span className={`sk-badge ${TAG_CLASS[skill.tag]}`}
                aria-label={`${skill.tag} level`}>
                {skill.tag}
              </span>
            </div>
            <div className="sk-track" role="progressbar"
              aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}
              aria-label={`${skill.name} proficiency`}>
              <div className="sk-fill" style={{ width: anim ? `${skill.level}%` : "0%" }}/>
            </div>
            <div className="sk-pct" aria-hidden="true">{skill.level}%</div>
          </div>
        ))}
      </div>
    </section>
  );
}
