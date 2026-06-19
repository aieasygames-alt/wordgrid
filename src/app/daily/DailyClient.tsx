"use client";

import { useState, useMemo } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import { generateGrid, seedFromDate, todayDateString, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";

interface GameResult {
  words: { word: string; score: number }[];
  total: number;
  grid: Grid;
  trie: Trie | null;
}

export default function DailyClient() {
  const today = todayDateString();
  const seed = useMemo(() => seedFromDate(today), [today]);
  const grid = useMemo(() => generateGrid(seed), [seed]);
  const [result, setResult] = useState<GameResult | null>(null);

  const handleComplete = (
    words: { word: string; score: number }[],
    total: number,
    trie: Trie | null
  ) => {
    setResult({ words, total, grid, trie });
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `daily-${today}`,
        JSON.stringify({ words, total })
      );
    }
  };

  if (result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <header className="mb-6 text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-300">
            WordGrid
          </a>
        </header>
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="daily"
          dateLabel={today}
          onPlayAgain={() => (window.location.href = "/play")}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
      <header className="mb-2 text-center">
        <a href="/" className="text-sm text-slate-500 hover:text-slate-300">
          WordGrid
        </a>
        <h1 className="text-xl font-semibold mt-1">
          Daily Challenge — {today}
        </h1>
      </header>
      <GameBoard grid={grid} onComplete={handleComplete} />
    </main>
  );
}
