import { useState, useEffect, useRef } from "react";

/**
 * useTyping
 *
 * Typewriter effect cycling through an array of words.
 *
 * Performance rewrite — was 5 useState (3-4 renders per character).
 * Now: 1 useState for display string only.
 * All mutable state (wordIdx, charIdx, deleting) stored in refs —
 * they drive the timer loop but never need to trigger a re-render
 * themselves. Only setDisplay triggers a render, which is exactly
 * what we want: one render per visible character change.
 *
 * @param {string[]} words  - Strings to cycle through
 * @param {number}   speed  - Ms per character (default 80)
 * @param {number}   pause  - Ms to hold completed word (default 1800)
 */
export default function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");

  // All loop state in refs — no re-renders when these change
  const wordIdxRef  = useRef(0);
  const charIdxRef  = useRef(0);
  const deletingRef = useRef(false);
  const timerRef    = useRef(null);

  useEffect(() => {
    // Restart cleanly when words array changes (e.g. language switch)
    wordIdxRef.current  = 0;
    charIdxRef.current  = 0;
    deletingRef.current = false;

    const tick = () => {
      const wordIdx  = wordIdxRef.current;
      const charIdx  = charIdxRef.current;
      const deleting = deletingRef.current;
      const current  = words[wordIdx] ?? "";

      let nextDelay = deleting ? speed / 2 : speed;

      if (!deleting && charIdx < current.length) {
        // Type next character
        charIdxRef.current++;
        setDisplay(current.slice(0, charIdxRef.current));
      } else if (!deleting && charIdx === current.length) {
        // Hold at end of word
        nextDelay = pause;
        deletingRef.current = true;
      } else if (deleting && charIdx > 0) {
        // Delete one character
        charIdxRef.current--;
        setDisplay(current.slice(0, charIdxRef.current));
      } else {
        // Advance to next word
        deletingRef.current = false;
        wordIdxRef.current  = (wordIdx + 1) % words.length;
        charIdxRef.current  = 0;
      }

      timerRef.current = setTimeout(tick, nextDelay);
    };

    timerRef.current = setTimeout(tick, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words, speed, pause]);

  return display;
}
