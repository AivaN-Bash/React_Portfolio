import "../styles/Travel.css";
import TRAVEL from "../data/travel";
import Slideshow from "./Slideshow";
import useScrollReveal from "../hooks/useScrollReveal";

export default function TravelStory() {
  const heroRef     = useScrollReveal({ delay: 0 });
  const chapRef     = useScrollReveal({ delay: 100 });

  return (
    <div className="travel-page">
      <button className="back-btn" onClick={() => window.history.back()}>
        Back to Experience
      </button>

      <div className="travel-hero" ref={heroRef}>
        <div>
          <div className="travel-arcana-badge">{TRAVEL.arcana}</div>
          <h1 className="travel-main-title">
            Work &amp; Travel<br/>
            <span className="gold">USA 🇺🇸</span>
          </h1>
          <div className="travel-year">「 {TRAVEL.year} 」</div>
          <p className="travel-intro">{TRAVEL.intro}</p>
          <div className="travel-locations">
            {["Tennessee","Las Vegas","Los Angeles","San Francisco"].map(loc => (
              <span key={loc} className="travel-loc-tag">📍 {loc}</span>
            ))}
          </div>
        </div>
        <Slideshow photos={TRAVEL.photos}/>
      </div>

      <div className="travel-chapters" ref={chapRef}>
        <div className="chapters-title">「 My Story 」</div>
        <div className="chapters-grid">
          {TRAVEL.chapters.map((ch, i) => (
            <div key={ch.title} className="chapter-card" style={{animationDelay:`${i*0.08}s`}}>
              <span className="chapter-icon">{ch.icon}</span>
              <div className="chapter-title">{ch.title}</div>
              <div className="chapter-loc" style={{color: ch.color}}>📍 {ch.location}</div>
              <p className="chapter-story">{ch.story}</p>
              <div className="chapter-line"
                style={{background:`linear-gradient(90deg, ${ch.color}, transparent)`}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
