import { useEffect, useRef } from "react";
import "../styles/Travel.css";
import TRAVEL          from "../data/travel";
import Slideshow       from "./Slideshow";
import useScrollReveal from "../hooks/useScrollReveal";

export default function TravelStory({ t = (k) => k, lang = "en" }) {
  const heroRef    = useScrollReveal({ delay: 0   });
  const chapRef    = useScrollReveal({ delay: 100 });
  const chapGridEl = useRef();

  const isTh = lang === "th";

  // Bilingual photos — pass caption based on lang
  const photos = TRAVEL.photos.map(p => ({
    src:     p.src,
    caption: isTh ? (p.caption_th || p.caption) : p.caption,
  }));

  // Restart card animations on mount
  useEffect(() => {
    const cards = chapGridEl.current?.querySelectorAll(".chapter-card");
    cards?.forEach((card, i) => {
      card.style.animation = "none";
      void card.offsetHeight;
      card.style.animation = `fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.075}s both`;
    });
  }, []);

  return (
    <div className="travel-page">

      <button className="back-btn" onClick={() => window.history.back()}>
        {isTh ? "← กลับ" : "← Back"}
      </button>

      {/* ── Hero ── */}
      <div className="travel-hero" ref={heroRef}>
        <div>
          <div className="travel-arcana-badge">{TRAVEL.arcana}</div>

          <h1 className="travel-main-title">
            {isTh ? "Work & Travel" : "Work & Travel"}<br/>
            <span className="gold">
              {isTh ? "สหรัฐอเมริกา 🇺🇸" : "USA 🇺🇸"}
            </span>
          </h1>

          <div className="travel-year">「 {TRAVEL.year} 」</div>

          <p className="travel-intro">
            {isTh ? TRAVEL.intro_th : TRAVEL.intro}
          </p>

          <ul className="travel-locations" aria-label={isTh ? "สถานที่ที่ไปเยือน" : "Locations visited"}>
            {(isTh ? TRAVEL.locations_th : TRAVEL.locations).map((loc, i) => (
              <li key={i} className="travel-loc-tag">📍 {loc}</li>
            ))}
          </ul>
        </div>

        <Slideshow photos={photos}/>
      </div>

      {/* ── Story chapters ── */}
      <div className="travel-chapters" ref={chapRef}>
        <h2 className="chapters-title">
          「 {isTh ? TRAVEL.story_title_th : TRAVEL.story_title} 」
        </h2>

        <div className="chapters-grid" ref={chapGridEl}>
          {TRAVEL.chapters.map((ch) => (
            <article key={ch.title} className="chapter-card">
              <span className="chapter-icon" aria-hidden="true">{ch.icon}</span>
              <h3 className="chapter-title">
                {isTh ? (ch.title_th || ch.title) : ch.title}
              </h3>
              <p className="chapter-loc" style={{ color: ch.color }}>
                📍 {isTh ? (ch.location_th || ch.location) : ch.location}
              </p>
              <p className="chapter-story">
                {isTh ? (ch.story_th || ch.story) : ch.story}
              </p>
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
