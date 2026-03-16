import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/Slideshow.css";

// ── Swipe ────────────────────────────────────────────────────
function useSwipe(onLeft, onRight) {
  const startX = useRef(null);
  return {
    onTouchStart: (e) => { startX.current = e.touches[0].clientX; },
    onTouchEnd:   (e) => {
      if (startX.current === null) return;
      const diff = startX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? onLeft() : onRight();
      startX.current = null;
    },
  };
}

export default function Slideshow({ photos }) {
  const [idx,     setIdx]  = useState(0);
  const [playing, setPlay] = useState(true);
  const [key,     setKey]  = useState(0);
  const timer = useRef();

  const go   = useCallback((n) => { setIdx(n); setKey(k => k + 1); }, []);
  const next = useCallback(() => go((idx + 1) % photos.length), [idx, photos.length, go]);
  const prev = useCallback(() => go((idx - 1 + photos.length) % photos.length), [idx, photos.length, go]);

  // Pause when tab hidden — saves CPU/battery
  useEffect(() => {
    const fn = () => { if (document.hidden) clearTimeout(timer.current); };
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, []);

  useEffect(() => {
    if (!playing || document.hidden) return;
    timer.current = setTimeout(next, 4000);
    return () => clearTimeout(timer.current);
  }, [playing, next]);

  const swipe = useSwipe(next, prev);

  const current = photos[idx];
  const total   = photos.length;

  return (
    <div className="ss-wrap" {...swipe}>

      {/* ── Progress bar (top edge) ── */}
      {playing && (
        <div className="ss-progress" aria-hidden="true">
          <div className="ss-progress-fill" key={key} />
        </div>
      )}

      {/* ── Photo ── */}
      <div className="ss-photo">
        <img
          key={idx}
          src={current.src}
          alt={current.caption}
          className="ss-img"
          loading={idx === 0 ? "eager" : "lazy"}
        fetchPriority={idx === 0 ? "high" : "auto"}
          decoding="async"
        />
        {/* Gradient so caption is readable */}
        <div className="ss-gradient" aria-hidden="true" />

        {/* Caption — overlaid on photo */}
        <div className="ss-caption">
          <span className="ss-counter">
            {String(idx + 1).padStart(2, "0")}
            <span className="ss-counter-sep"> / </span>
            {String(total).padStart(2, "0")}
          </span>
          <p className="ss-caption-text">{current.caption}</p>
        </div>
      </div>

      {/* ── Controls bar ── */}
      <div className="ss-bar">

        {/* Prev */}
        <button className="ss-arrow" onClick={prev} aria-label="Previous">
          ‹
        </button>

        {/* Dots — centred */}
        <div className="ss-dots" role="tablist" aria-label="Slides">
          {photos.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Photo ${i + 1}`}
              className={`ss-dot${i === idx ? " on" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        {/* Auto toggle */}
        <button
          className={`ss-auto${playing ? " on" : ""}`}
          onClick={() => setPlay(p => !p)}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
          <span className="ss-auto-label">AUTO</span>
        </button>

        {/* Next */}
        <button className="ss-arrow" onClick={next} aria-label="Next">
          ›
        </button>

      </div>

      {/* Swipe hint — touch only */}
      <div className="ss-swipe-hint" aria-hidden="true">swipe</div>

    </div>
  );
}
