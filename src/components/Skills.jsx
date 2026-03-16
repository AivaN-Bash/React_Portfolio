import { useState, useEffect, useCallback } from "react";
import "../styles/Skills.css";
import SKILLS       from "../data/skills";
import useScrollReveal from "../hooks/useScrollReveal";

const TAG_CLASS = { Expert: "b-ex", Advanced: "b-ad", Intermediate: "b-in" };

export default function Skills() {
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
      <div className="sec-tag">// SKILLS</div>

      <div className="sec-hd" ref={headerRef}>
        <div className="sec-n">01</div>
        <div>
          <span className="sec-ey">what I actually know</span>
          <h2 className="sec-title">Skills &amp; <span className="dim">Tools</span></h2>
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
            {val.icon} {val.label}
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
            style={{ animation: `fadeUp 0.45s ${i * 0.06}s both` }}
          >
            <div className="sk-tr" aria-hidden="true"/>
            <div className="sk-bl" aria-hidden="true"/>
            <div className="sk-top">
              <span className="sk-name">{skill.name}</span>
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
