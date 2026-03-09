import "../styles/Travel.css";
import TRAVEL from "../data/travel";
import Slideshow from "./Slideshow";

export default function TravelStory({ setPage }) {
  return (
    <div className="travel-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => setPage("exp")}>
        ← Back to Experience
      </button>

      {/* ── Hero ── */}
      <div className="travel-hero" style={{ animation: "fadeUp .5s both" }}>
        <div>
          <div className="travel-arcana-badge">{TRAVEL.arcana}</div>
          <h1 className="travel-main-title">
            Work &amp; Travel<br />
            <span className="gold">USA 🇺🇸</span>
          </h1>
          <div className="travel-year">「 {TRAVEL.year} 」</div>
          <p className="travel-intro">{TRAVEL.intro}</p>
          <div className="travel-locations">
            {["Tennessee", "Las Vegas", "Los Angeles", "San Francisco"].map(loc => (
              <span key={loc} className="travel-loc-tag">📍 {loc}</span>
            ))}
          </div>
        </div>

        {/* Slideshow */}
        <div style={{ animation: "fadeUp .5s .2s both" }}>
          <Slideshow photos={TRAVEL.photos} />
        </div>
      </div>

      {/* ── Chapter cards ── */}
      <div className="travel-chapters">
        <div className="chapters-title">「 My Story 」</div>
        <div className="chapters-grid">
          {TRAVEL.chapters.map((ch, i) => (
            <div
              key={ch.title}
              className="chapter-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="chapter-icon">{ch.icon}</span>
              <div className="chapter-title">{ch.title}</div>
              <div className="chapter-loc" style={{ color: ch.color }}>📍 {ch.location}</div>
              <p className="chapter-story">{ch.story}</p>
              <div
                className="chapter-line"
                style={{ background: `linear-gradient(90deg, ${ch.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
