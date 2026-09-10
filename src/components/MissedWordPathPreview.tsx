"use client";

import { useMemo, useState } from "react";
import type { Grid } from "@/lib/boggle";
import type { SolvedWord } from "@/lib/solver";
import { trackEvent } from "@/lib/analytics";

export default function MissedWordPathPreview({ grid, words }: { grid: Grid; words: SolvedWord[] }) {
  const options = useMemo(() => words.slice(0, 6), [words]);
  const [selected, setSelected] = useState(0);
  const word = options[selected];
  if (!word) return null;
  const pathSet = new Set(word.path.map((cell) => `${cell.row}-${cell.col}`));
  return (
    <section className="w-full rounded-2xl border border-border bg-surface/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Missed word path</h3>
          <p className="mt-1 text-xs text-text-muted">Select a high-value missed word to see its route through the board.</p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Missed words">
          {options.map((option, index) => (
            <button
              key={option.word}
              role="tab"
              aria-selected={selected === index}
              onClick={() => { setSelected(index); trackEvent("missed_word_path_view", { word_length: option.word.length, score: option.score }); }}
              className={`rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition ${selected === index ? "bg-primary text-white" : "bg-bg/70 text-text-muted hover:bg-surface-hover"}`}
            >
              {option.word} <span className="opacity-70">{option.score}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-4 grid max-w-[280px] grid-cols-4 gap-1.5" role="grid" aria-label={`Path for ${word.word}`}>
        {grid.flat().map((cell) => {
          const active = pathSet.has(`${cell.row}-${cell.col}`);
          const step = word.path.findIndex((item) => item.row === cell.row && item.col === cell.col);
          return <div key={`${cell.row}-${cell.col}`} className={`relative flex aspect-square items-center justify-center rounded-lg border text-lg font-bold transition ${active ? "border-primary bg-primary/30 text-primary" : "border-border bg-bg/60 text-text-dim"}`}><span>{cell.letter}</span>{step >= 0 && <span className="absolute right-1 top-0.5 text-[9px] font-semibold text-primary">{step + 1}</span>}</div>;
        })}
      </div>
      <p className="mt-3 text-center text-xs text-text-muted"><span className="font-mono font-semibold text-primary">{word.word}</span> · {word.path.length} tiles · {word.score} points</p>
    </section>
  );
}
