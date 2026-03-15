import { useState, useEffect } from "react";
import "../styles/Skills.css";
import SKILLS from "../data/skills";
import useScrollReveal from "../hooks/useScrollReveal";

const TAG_CLASS = { Expert:"b-ex", Advanced:"b-ad", Intermediate:"b-in" };

export default function Skills() {
  const [tab,  setTab]  = useState("backend");
  const [anim, setAnim] = useState(false);

  const headerRef = useScrollReveal({ delay: 0 });
  const tabsRef   = useScrollReveal({ delay: 100 });
  const gridRef   = useScrollReveal({ delay: 180 });

  useEffect(() => {
    setAnim(false);
    const t = setTimeout(() => setAnim(true), 80);
    return () => clearTimeout(t);
  }, [tab]);

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

      <div className="sk-tabs" ref={tabsRef}>
        {Object.entries(SKILLS).map(([key, val]) => (
          <button key={key} className={`sk-tab${tab===key?" on":""}`}
            data-arcana={val.arcana} onClick={() => setTab(key)}>
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="sk-grid" ref={gridRef}>
        {current.items.map((skill, i) => (
          <div key={skill.name} className="sk-card" style={{animationDelay:`${i*0.07}s`}}>
            <div className="sk-tr"/><div className="sk-bl"/>
            <div className="sk-top">
              <span className="sk-name">{skill.name}</span>
              <span className={`sk-badge ${TAG_CLASS[skill.tag]}`}>{skill.tag}</span>
            </div>
            <div className="sk-track">
              <div className="sk-fill" style={{width: anim ? `${skill.level}%` : "0%"}}/>
            </div>
            <div className="sk-pct">{skill.level}%</div>
          </div>
        ))}
      </div>
    </section>
  );
}
