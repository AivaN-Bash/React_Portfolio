import { useState, useEffect, useRef, useCallback } from "react";

// ── Swipe detection hook ──────────────────────────────────────
function useSwipe(onSwipeLeft, onSwipeRight) {
  const startX = useRef(null);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {        // 40px threshold
      diff > 0 ? onSwipeLeft() : onSwipeRight();
    }
    startX.current = null;
  };

  return { onTouchStart, onTouchEnd };
}

export default function Slideshow({ photos }) {
  const [idx,     setIdx]   = useState(0);
  const [playing, setPlay]  = useState(true);
  const [key,     setKey]   = useState(0);
  const timer = useRef();

  const go   = useCallback((n) => { setIdx(n); setKey(k => k + 1); }, []);
  const next = useCallback(() => go((idx + 1) % photos.length), [idx, photos.length, go]);
  const prev = useCallback(() => go((idx - 1 + photos.length) % photos.length), [idx, photos.length, go]);

  // Auto-play
  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(next, 4000);
    return () => clearTimeout(timer.current);
  }, [playing, next]);

  // Swipe handlers
  const swipe = useSwipe(next, prev);

  return (
    <div className="slideshow" {...swipe}>
      {/* Progress bar */}
      {playing && (
        <div className="ss-progress">
          <div className="ss-progress-fill" key={key}/>
        </div>
      )}

      <img key={idx} src={photos[idx].src} alt={photos[idx].caption} className="ss-img"/>
      <div className="ss-overlay"/>

      {/* Caption */}
      <div className="ss-caption">
        <div className="ss-cap-num">
          {String(idx + 1).padStart(2,"0")} / {String(photos.length).padStart(2,"0")}
        </div>
        <div className="ss-cap-text">{photos[idx].caption}</div>
      </div>

      {/* Swipe hint — only on touch devices */}
      <div className="ss-swipe-hint">‹ swipe ›</div>

      {/* Controls */}
      <div className="ss-controls">
        <button className="ss-btn" onClick={prev} aria-label="Previous">‹</button>

        <div className="ss-dots">
          {photos.map((_,i) => (
            <div key={i} className={`ss-dot${i===idx?" on":""}`} onClick={() => go(i)}/>
          ))}
        </div>

        <button
          className={`ss-auto-btn${playing?" playing":""}`}
          onClick={() => setPlay(p => !p)}
        >
          {playing ? "⏸ AUTO" : "▶ AUTO"}
        </button>

        <button className="ss-btn" onClick={next} aria-label="Next">›</button>
      </div>
    </div>
  );
}
