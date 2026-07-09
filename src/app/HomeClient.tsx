"use client";

import { useState, useMemo, useCallback } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import ThemeToggle from "@/components/ThemeToggle";
import TodayTipCard from "@/components/TodayTipCard";
import Link from "next/link";
import { generateGrid, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { getTodayActionTip } from "@/lib/daily-tip";

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
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const grid = useMemo(() => generateGrid(seed), [seed]);
  const [result, setResult] = useState<GameResult | null>(null);
  const todayTip = useMemo(() => getTodayActionTip(), []);

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

  // Default: hero + game visible immediately
  return (
    <>
      {/* Top bar with theme toggle */}
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      {/* Hero text */}
      <section className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Word Grid Online Free — Play Boggle-Style Puzzle
        </h1>
        <p className="text-base text-text-muted max-w-lg mx-auto mb-4">
          WordGrid is a free word grid online game. Play Boggle online free in
          your browser, connect adjacent letters in a 4×4 grid, and race the
          clock or relax in Zen mode. No download, no sign-up.
        </p>
        <div className="mt-6 mb-5 text-left">
          <TodayTipCard
            tip={todayTip}
            grid={grid}
            compact
            primaryHref="/daily"
            primaryLabel="Try today's board"
            secondaryHref="/guides/word-pattern-library"
            secondaryLabel="Open pattern library"
          />
        </div>
        <div className="flex gap-3 justify-center">
          <Link
            href="/daily"
            className="px-6 py-2.5 bg-surface hover:bg-surface-hover transition rounded-lg text-sm font-semibold active:scale-[0.98]"
          >
            Daily Challenge
          </Link>
          <Link
            href="/daily/archive"
            className="px-6 py-2.5 bg-surface hover:bg-surface-hover transition rounded-lg text-sm font-semibold active:scale-[0.98]"
          >
            Archive
          </Link>
          <Link
            href="/play"
            className="px-6 py-2.5 bg-surface hover:bg-surface-hover transition rounded-lg text-sm font-semibold active:scale-[0.98]"
          >
            Full Screen →
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
          <Link href="/play" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Play Word Grid Online
          </Link>
          <Link href="/guides/play-boggle-online-free" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Play Boggle Online Free
          </Link>
          <Link href="/guides/boggle-rules-beginners" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Boggle Rules for Beginners
          </Link>
          <Link href="/guides/word-pattern-library" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Pattern Library
          </Link>
          <Link href="/solver" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Solver
          </Link>
          <Link href="/stats" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Stats
          </Link>
          <Link href="/daily/archive" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Archive
          </Link>
        </div>
      </section>

      {/* Game board — visible immediately */}
      <div className="mb-8">
        <GameBoard grid={grid} onComplete={handleComplete} />
      </div>
    </>
  );
}
