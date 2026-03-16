import { useEffect, useRef } from "react";
import "../styles/Travel.css";
import TRAVEL         from "../data/travel";
import Slideshow      from "./Slideshow";
import useScrollReveal from "../hooks/useScrollReveal";

export default function TravelStory() {
  const heroRef    = useScrollReveal({ delay: 0   });
  const chapRef    = useScrollReveal({ delay: 100 });
  const chapGridEl = useRef();

  // Restart chapter card animations every time this page mounts.
  // Same pattern as Projects — lazy pages remount on each visit.
  useEffect(() => {
    const cards = chapGridEl.current?.querySelectorAll(".chapter-card");
    cards?.forEach((card, i) => {
      card.style.animation = "none";
      void card.offsetHeight; // force reflow
      card.style.animation = `fadeUp 0.45s ${i * 0.08}s both`;
    });
  }, []);

  return (
    <div className="travel-page">

      <button className="back-btn" onClick={() => window.history.back()}>
        Back to Experience
      </button>

      {/* ── Hero ── */}
      <div className="travel-hero" ref={heroRef}>
        <div>
          <div className="travel-arcana-badge">{TRAVEL.arcana}</div>

          <h1 className="travel-main-title">
            Work &amp; Travel<br/>
            <span className="gold">USA 🇺🇸</span>
          </h1>

          <div className="travel-year">「 {TRAVEL.year} 」</div>
          <p className="travel-intro">{TRAVEL.intro}</p>

          <ul className="travel-locations" aria-label="Locations visited">
            {["Tennessee","Las Vegas","Los Angeles","San Francisco"].map(loc => (
              <li key={loc} className="travel-loc-tag">📍 {loc}</li>
            ))}
          </ul>
        </div>

        <Slideshow photos={TRAVEL.photos}/>
      </div>

      {/* ── Story chapters ── */}
      <div className="travel-chapters" ref={chapRef}>
        <h2 className="chapters-title">「 My Story 」</h2>

        <div
          className="chapters-grid"
          ref={chapGridEl}
        >
          {TRAVEL.chapters.map((ch) => (
            <article key={ch.title} className="chapter-card">
              <span className="chapter-icon" aria-hidden="true">{ch.icon}</span>
              <h3 className="chapter-title">{ch.title}</h3>
              <p  className="chapter-loc" style={{ color: ch.color }}>
                📍 {ch.location}
              </p>
              <p  className="chapter-story">{ch.story}</p>
              <div
                className="chapter-line"
                aria-hidden="true"
                style={{ background: `linear-gradient(90deg, ${ch.color}, transparent)` }}
              />
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}
