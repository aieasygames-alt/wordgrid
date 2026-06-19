"use client";

import { useState, useMemo, useCallback } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
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
  const [showGame, setShowGame] = useState(false);

  const handleComplete = useCallback(
    (words: FoundWord[], total: number, trie: Trie | null) => {
      setResult({ words, total, grid, trie });
    },
    [grid]
  );

  // Show result screen
  if (result) {
    return (
      <div className="mb-8">
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="play"
          onPlayAgain={() => {
            setResult(null);
            setSeed(Math.floor(Math.random() * 2 ** 31));
            setShowGame(true);
          }}
        />
      </div>
    );
  }

  // Show inline game
  if (showGame) {
    return (
      <div className="mb-8">
        <GameBoard grid={grid} onComplete={handleComplete} />
        <div className="text-center mt-3">
          <button
            onClick={() => setShowGame(false)}
            className="text-sm text-text-dim hover:text-text-muted"
          >
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  // Hero with Play Now button that reveals the game inline
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        WordGrid — Free Daily Word Puzzle
      </h1>
      <p className="text-lg text-text-muted max-w-lg mx-auto mb-6">
        Connect adjacent letters in a 4×4 grid to find hidden words. Race against
        the clock in this addictive word search challenge.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setShowGame(true)}
          className="px-8 py-4 bg-primary hover:bg-primary-hover transition rounded-xl text-lg font-semibold active:scale-[0.98]"
        >
          Play Now — Free
        </button>
        <Link
          href="/daily"
          className="px-8 py-4 bg-surface hover:bg-surface-hover transition rounded-xl text-lg font-semibold active:scale-[0.98]"
        >
          Daily Challenge
        </Link>
      </div>
    </section>
  );
}
