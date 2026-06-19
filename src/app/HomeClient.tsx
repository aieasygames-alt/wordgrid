"use client";

import { useState, useMemo, useCallback } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { generateGrid, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";

interface FoundWord {
  word: string;
  score: number;
}

interface GameResult {
  words: FoundWord[];
  total: number;
  grid: Grid;
  trie: Trie | null;
}

export default function HomeClient() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const grid = useMemo(() => generateGrid(seed), [seed]);
  const [result, setResult] = useState<GameResult | null>(null);

  const handleComplete = useCallback(
    (words: FoundWord[], total: number, trie: Trie | null) => {
      setResult({ words, total, grid, trie });
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
          WordGrid — Free Boggle-Style Word Puzzle
        </h1>
        <p className="text-base text-text-muted max-w-lg mx-auto mb-4">
          Connect adjacent letters to find words. 3 minutes, unlimited fun.
          No download, no sign-up.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/daily"
            className="px-6 py-2.5 bg-surface hover:bg-surface-hover transition rounded-lg text-sm font-semibold active:scale-[0.98]"
          >
            Daily Challenge
          </Link>
          <Link
            href="/play"
            className="px-6 py-2.5 bg-surface hover:bg-surface-hover transition rounded-lg text-sm font-semibold active:scale-[0.98]"
          >
            Full Screen →
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
