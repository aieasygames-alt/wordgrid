"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import Link from "next/link";
import { generateGrid, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { trackEvent } from "@/lib/analytics";

interface FoundWord {
  word: string;
  score: number;
}

interface GameResult {
  words: FoundWord[];
  total: number;
  grid: Grid;
  trie: Trie | null;
  bestCombo: number;
}

export default function HomeClient() {
  // Keep the server and first client render identical; randomize after mount.
  const [seed, setSeed] = useState(20260907);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 2 ** 31));
  }, []);
  const grid = useMemo(() => generateGrid(seed), [seed]);
  const [result, setResult] = useState<GameResult | null>(null);

  const handleComplete = useCallback(
    (words: FoundWord[], total: number, trie: Trie | null, bestCombo: number) => {
      setResult({ words, total, grid, trie, bestCombo });
    },
    [grid]
  );

  const playAgain = useCallback(() => {
    setResult(null);
    setSeed(Math.floor(Math.random() * 2 ** 31));
  }, []);

  // Result screen — after first game ends
  if (result) {
    return (
      <div className="mb-8">
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="play"
          bestCombo={result.bestCombo}
          onPlayAgain={playAgain}
        />
      </div>
    );
  }

  // Default: game-first lobby with secondary modes kept out of the primary path.
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:py-8">
      <header className="mb-5 flex items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight">WordGrid</Link>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/daily" className="rounded-lg bg-surface px-3 py-2 font-semibold hover:bg-surface-hover transition">Daily</Link>
          <Link href="/weekly" className="rounded-lg bg-surface px-3 py-2 font-semibold hover:bg-surface-hover transition">Weekly</Link>
        </div>
      </header>
      <section className="mb-5 text-center">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Free browser word game</div>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Play this board</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-muted">Connect adjacent letters, find as many words as you can, then review the board after the clock ends.</p>
      </section>
      <div className="mb-6">
        <GameBoard
          grid={grid}
          startPaused
          onStart={() => trackEvent("homepage_game_start_click", { board_size: grid.length })}
          onComplete={handleComplete}
        />
      </div>
      <section className="grid gap-3 sm:grid-cols-3">
        <Link href="/daily" className="border border-border bg-surface/50 p-4 transition hover:bg-surface">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Daily</div>
          <div className="mt-1 font-semibold">Shared board, new each day</div>
        </Link>
        <Link href="/weekly" className="border border-border bg-surface/50 p-4 transition hover:bg-surface">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Weekly</div>
          <div className="mt-1 font-semibold">One themed board all week</div>
        </Link>
        <Link href="/solver" className="border border-border bg-surface/50 p-4 transition hover:bg-surface">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Improve</div>
          <div className="mt-1 font-semibold">Review a finished board</div>
        </Link>
      </section>
    </main>
  );
}
