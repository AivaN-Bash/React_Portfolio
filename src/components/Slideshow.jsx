import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../styles/Slideshow.css";

/**
 * useSwipe
 *
 * Returns stable event handlers (useMemo) so the parent div
 * doesn't receive new props on every render.
 * Only fires for dominant horizontal swipes — won't conflict
 * with vertical scrolling.
 */
function useSwipe(onLeft, onRight) {
  const startX = useRef(null);
  const startY = useRef(null);
  // Stable refs so useMemo deps are stable
  const onLeftRef  = useRef(onLeft);
  const onRightRef = useRef(onRight);
  useEffect(() => { onLeftRef.current  = onLeft;  }, [onLeft]);
  useEffect(() => { onRightRef.current = onRight; }, [onRight]);

  return useMemo(() => ({
    onTouchStart: (e) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    },
    onTouchEnd: (e) => {
      if (startX.current === null) return;
      const dx = startX.current - e.changedTouches[0].clientX;
      const dy = Math.abs(e.changedTouches[0].clientY - startY.current);
      if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
        dx > 0 ? onLeftRef.current() : onRightRef.current();
      }
      startX.current = null;
    },
  }), []); // stable — reads refs, never changes
}

export default function Slideshow({ photos }) {
  const [idx,     setIdx]  = useState(0);
  const [playing, setPlay] = useState(true);
  const [key,     setKey]  = useState(0);
  const timerRef = useRef(null); // consistent naming with rest of codebase

  const go = useCallback((n) => {
    setIdx(n);
    setKey(k => k + 1);
  }, []);

  const next = useCallback(
    () => go((idx + 1) % photos.length),
    [idx, photos.length, go]
  );
  const prev = useCallback(
    () => go((idx - 1 + photos.length) % photos.length),
    [idx, photos.length, go]
  );

  // Pause when tab hidden — saves CPU/battery
  useEffect(() => {
    const onVis = () => { if (document.hidden) clearTimeout(timerRef.current); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!playing || document.hidden) return;
    timerRef.current = setTimeout(next, 4000);
    return () => clearTimeout(timerRef.current);
  }, [playing, next]);

  const swipe   = useSwipe(next, prev);
  const current = photos[idx];
  const total   = photos.length;

  return (
    <div
      className="ss-wrap"
      {...swipe}
      role="region"
      aria-label="Photo slideshow"
      aria-roledescription="carousel"
    >
      {playing && (
        <div className="ss-progress" aria-hidden="true">
          <div className="ss-progress-fill" key={key}/>
        </div>
      )}

      <div className="ss-photo">
        <img
          key={idx}
          src={current.src}
          alt={current.caption}
          className="ss-img"
          loading={idx === 0 ? "eager" : "lazy"}
          fetchPriority={idx === 0 ? "high" : "auto"}
          decoding="async"
          draggable="false"
        />
        <div className="ss-gradient" aria-hidden="true"/>
        <div className="ss-caption">
          <span
            className="ss-counter"
            aria-label={`Photo ${idx + 1} of ${total}`}
          >
            {String(idx + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {String(total).padStart(2, "0")}
          </span>
          <p className="ss-caption-text">{current.caption}</p>
        </div>
      </div>

      <div className="ss-bar">
        <button className="ss-arrow" onClick={prev} aria-label="Previous photo">
          ‹
        </button>

        <div className="ss-dots" role="tablist" aria-label="Go to photo">
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

        <button
          className={`ss-auto${playing ? " on" : ""}`}
          onClick={() => setPlay(p => !p)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          aria-pressed={playing}
        >
          {playing ? "⏸" : "▶"}
          <span className="ss-auto-label">AUTO</span>
        </button>

        <button className="ss-arrow" onClick={next} aria-label="Next photo">
          ›
        </button>
      </div>

      <div className="ss-swipe-hint" aria-hidden="true">swipe</div>
    </div>
  );
}
