"use client";

import Link from "next/link";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import { getWeeklyChallenge } from "@/lib/weekly-challenge";
import type { Trie } from "@/lib/dictionary";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Result = { words: { word: string; score: number }[]; total: number; trie: Trie | null; bestCombo: number };

export default function WeeklyClient() {
  const challenge = getWeeklyChallenge();
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
          <p className="mt-3 text-text-muted">{challenge.detail} The board stays the same all week, so you can compare runs and share the challenge.</p>
        </header>
        <GameBoard
          grid={challenge.grid}
          initialDuration={180}
          onComplete={(words, total, trie, bestCombo) => {
            trackEvent("weekly_challenge_complete", { challenge_id: challenge.id, focus: challenge.focus, score: total, words_found: words.length });
            setResult({ words, total, trie, bestCombo });
          }}
        />
      </div>
    </main>
  );
}
