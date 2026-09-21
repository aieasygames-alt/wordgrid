"use client";

import Link from "next/link";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import type { WeeklyChallenge } from "@/lib/weekly-challenge";
import type { Trie } from "@/lib/dictionary";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import DailyStatusBar from "@/components/DailyStatusBar";

type Result = { words: { word: string; score: number }[]; total: number; trie: Trie | null; bestCombo: number };

export default function WeeklyClient({ challenge }: { challenge: WeeklyChallenge }) {
  const [result, setResult] = useState<Result | null>(null);

  if (result) {
    return (
      <main className="min-h-screen px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="text-sm text-text-dim hover:text-text">WordGrid</Link>
          <ResultScreen
            grid={challenge.grid}
            trie={result.trie}
            foundWords={result.words}
            totalScore={result.total}
            mode="play"
            bestCombo={result.bestCombo}
            onPlayAgain={() => setResult(null)}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-text-dim hover:text-text">WordGrid</Link>
        <header className="mt-4 mb-6 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Week of {challenge.id}</div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{challenge.title}</h1>
          <p className="mt-3 text-text-muted">
            {challenge.detail} This shared 4x4 board stays the same all week. Each run has a three-minute timer, so you can compare your own attempts and share the challenge.
          </p>
        </header>
        <DailyStatusBar mode="weekly" />
        <GameBoard
          grid={challenge.grid}
          initialDuration={180}
          onComplete={(words, total, trie, bestCombo) => {
            trackEvent("weekly_challenge_complete", { challenge_id: challenge.id, focus: challenge.focus, score: total, words_found: words.length });
            setResult({ words, total, trie, bestCombo });
          }}
        />
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link
            href="/solver"
            className="rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-semibold hover:bg-surface transition"
          >
            Review a board with the solver
          </Link>
          <Link
            href="/challenge"
            className="rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-semibold hover:bg-surface transition"
          >
            Share a challenge board
          </Link>
          <Link
            href="/play?mode=zen"
            className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/15 transition"
          >
            Practice without a timer
          </Link>
        </section>
      </div>
    </main>
  );
}
