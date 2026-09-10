"use client";

import { useState } from "react";
import type { SolvedWord } from "@/lib/solver";
import { trackEvent } from "@/lib/analytics";

export default function ProgressiveHint({ word }: { word: SolvedWord }) {
  const [level, setLevel] = useState(0);
  const reveal = () => {
    const next = Math.min(2, level + 1);
    setLevel(next);
    trackEvent("hint_used", { hint_level: next, word_length: word.word.length });
  };
  const clue = level === 0 ? `${word.word.length}-letter word` : level === 1 ? `${word.word[0]}${"_".repeat(Math.max(1, word.word.length - 1))}` : word.word;
  return <button onClick={reveal} className="rounded-lg bg-bg/70 px-3 py-2 text-left transition hover:bg-surface-hover" aria-label={level < 2 ? "Reveal a hint" : "Revealed word"}><span className="font-mono text-sm font-semibold text-primary">{clue}</span><span className="ml-2 text-xs text-text-muted">{level < 2 ? "Reveal hint" : `${word.score} pts`}</span></button>;
}
