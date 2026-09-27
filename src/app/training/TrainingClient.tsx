"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import { getPatternFocus, getPatternSprint, type PatternFocus } from "@/lib/pattern-sprint";
import type { Trie } from "@/lib/dictionary";
import { trackEvent } from "@/lib/analytics";

type Result = { words: { word: string; score: number }[]; total: number; trie: Trie | null; bestCombo: number };

const FOCUSES: PatternFocus[] = ["quick", "long", "prefix", "suffix", "qu"];

export default function TrainingClient() {
  const [focus, setFocus] = useState<PatternFocus>(() => {
    if (typeof window === "undefined") return "quick";
    return getPatternFocus(new URLSearchParams(window.location.search).get("focus"));
  });
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const sprint = useMemo(() => getPatternSprint(focus), [focus]);

  const chooseFocus = (next: PatternFocus) => {
    setFocus(next);
    setResult(null);
    setAttempt((value) => value + 1);
    window.history.replaceState(null, "", `/training?focus=${next}`);
    trackEvent("pattern_sprint_select", { focus: next });
  };

  if (result) {
    return (
      <main className="min-h-screen px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <Link href="/training" className="text-sm text-text-dim hover:text-text">WordGrid training</Link>
          <ResultScreen
            grid={sprint.grid}
            trie={result.trie}
            foundWords={result.words}
            totalScore={result.total}
            mode="play"
            bestCombo={result.bestCombo}
            onPlayAgain={() => { setResult(null); setAttempt((value) => value + 1); }}
          />
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {FOCUSES.filter((item) => item !== focus).map((item) => (
              <button key={item} onClick={() => chooseFocus(item)} className="rounded-xl bg-surface px-4 py-2 text-sm font-semibold transition hover:bg-surface-hover">
                Train {getPatternSprint(item).label}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <article className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-text-dim hover:text-text">WordGrid</Link>
        <header className="mt-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Focused practice</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{sprint.title}</h1>
          <p className="mt-3 text-text-muted leading-relaxed">{sprint.description}</p>
          <div className="mt-4 border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm text-text-muted">
            <span className="font-semibold text-text">Sprint cue: </span>{sprint.tip}
          </div>
        </header>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Choose training pattern">
          {FOCUSES.map((item) => (
            <button key={item} onClick={() => chooseFocus(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${item === focus ? "bg-primary text-white" : "bg-surface hover:bg-surface-hover"}`}>
              {getPatternSprint(item).label}
            </button>
          ))}
        </div>

        <section className="mt-6">
          <GameBoard
            key={`${focus}-${attempt}`}
            grid={sprint.grid}
            initialDuration={30}
            startPaused
            onStart={() => trackEvent("pattern_sprint_start", { focus, board_size: 4, source: "training_page" })}
            onComplete={(words, total, trie, bestCombo) => {
              trackEvent("pattern_sprint_complete", { focus, score: total, words_found: words.length, source: "training_page" });
              setResult({ words, total, trie, bestCombo });
            }}
          />
        </section>
        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link href="/play?mode=zen" className="border border-border bg-surface/50 px-4 py-3 text-sm font-semibold transition hover:bg-surface">Practice without a clock</Link>
          <Link href="/daily" className="border border-border bg-surface/50 px-4 py-3 text-sm font-semibold transition hover:bg-surface">Play today&apos;s Daily</Link>
          <Link href="/guides/word-pattern-library" className="border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/15">Open pattern library</Link>
        </section>
      </article>
    </main>
  );
}
