import { useState, useEffect } from "react";
import "../styles/Skills.css";
import SKILLS from "../data/skills";

const TAG_CLASS = {
  Expert:       "b-ex",
  Advanced:     "b-ad",
  Intermediate: "b-in",
};

export default function Skills() {
  const [tab, setTab]   = useState("backend");
  const [anim, setAnim] = useState(false);

  // Reset bar animation on tab switch
  useEffect(() => {
    setAnim(false);
    const t = setTimeout(() => setAnim(true), 80);
    return () => clearTimeout(t);
  }, [tab]);

  const current = SKILLS[tab];

  return (
    <section className="sec">
      <div className="sec-tag">// ABILITIES</div>

      <div className="sec-hd">
        <div className="sec-n">01</div>
        <div>
          <span className="sec-ey">capabilities · arcana</span>
          <h2 className="sec-title">Skills &amp; <span className="dim">Expertise</span></h2>
          <div className="sec-rule" />
        </div>
      </div>

      {/* Tabs */}
      <div className="sk-tabs">
        {Object.entries(SKILLS).map(([key, val]) => (
          <button
            key={key}
            className={`sk-tab${tab === key ? " on" : ""}`}
            data-arcana={val.arcana}
            onClick={() => setTab(key)}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      {/* Skill cards */}
      <div className="sk-grid">
        {current.items.map((skill, i) => (
          <div
            key={skill.name}
            className="sk-card"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="sk-tr" />
            <div className="sk-bl" />
            <div className="sk-top">
              <span className="sk-name">{skill.name}</span>
              <span className={`sk-badge ${TAG_CLASS[skill.tag]}`}>{skill.tag}</span>
            </div>
            <div className="sk-track">
              <div className="sk-fill" style={{ width: anim ? `${skill.level}%` : "0%" }} />
            </div>
            <div className="sk-pct">{skill.level}%</div>
          </div>
        ))}
      </div>
    </section>
  );
}
