import { useState, useEffect } from "react";

/**
 * useTyping
 *
 * Cycles through an array of words with a typewriter effect.
 * Each word types out character by character, pauses, then deletes.
 *
 * @param {string[]} words   - Array of strings to cycle through
 * @param {number}   speed   - Ms per character while typing (default 80)
 * @param {number}   pause   - Ms to hold the completed word (default 1800)
 * @returns {string}           The current displayed string
 */
export default function useTyping(words, speed = 80, pause = 1800) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && charIdx === current.length) delay = pause;

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(i => i + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(i => i - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}
