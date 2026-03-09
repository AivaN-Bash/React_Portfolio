import { useState, useEffect, useRef, useCallback } from "react";

export default function Slideshow({ photos }) {
  const [idx, setIdx]       = useState(0);
  const [playing, setPlay]  = useState(true);
  const [key, setKey]       = useState(0); // restarts progress bar animation
  const timer               = useRef();

  const go = useCallback((n) => {
    setIdx(n);
    setKey(k => k + 1); // restart progress bar
  }, []);

  const next = useCallback(() => go((idx + 1) % photos.length), [idx, photos.length, go]);
  const prev = useCallback(() => go((idx - 1 + photos.length) % photos.length), [idx, photos.length, go]);

  // Auto-play timer
  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(next, 4000);
    return () => clearTimeout(timer.current);
  }, [playing, next]);

  return (
    <div className="slideshow">
      {/* Auto-play progress bar */}
      {playing && (
        <div className="ss-progress">
          <div className="ss-progress-fill" key={key} />
        </div>
      )}

      {/* Photo */}
      <img
        key={idx}
        src={photos[idx].src}
        alt={photos[idx].caption}
        className="ss-img"
      />
      <div className="ss-overlay" />

      {/* Caption */}
      <div className="ss-caption">
        <div className="ss-cap-num">
          {String(idx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </div>
        <div className="ss-cap-text">{photos[idx].caption}</div>
      </div>

      {/* Controls */}
      <div className="ss-controls">
        <button className="ss-btn" onClick={prev}>‹</button>

        <div className="ss-dots">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`ss-dot${i === idx ? " on" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <button
          className={`ss-auto-btn${playing ? " playing" : ""}`}
          onClick={() => setPlay(p => !p)}
        >
          {playing ? "⏸ AUTO" : "▶ AUTO"}
        </button>

        <button className="ss-btn" onClick={next}>›</button>
      </div>
    </div>
  );
}
