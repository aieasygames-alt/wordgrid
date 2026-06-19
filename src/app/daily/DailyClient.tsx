"use client";

import { useState, useMemo } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import StreakDisplay from "@/components/StreakDisplay";
import { generateGrid, seedFromDate, todayDateString, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { recordDailyPlay, getStreak, type StreakData } from "@/lib/streak";

interface GameResult {
  words: { word: string; score: number }[];
  total: number;
  grid: Grid;
  trie: Trie | null;
  streak: StreakData;
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
    const streak = recordDailyPlay();
    setResult({ words, total, grid, trie, streak });
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
          <a href="/" className="text-sm text-text-dim hover:text-text">
            WordGrid
          </a>
        </header>
        {result.streak.currentStreak >= 2 && (
          <div className="mb-4">
            <StreakDisplay />
          </div>
        )}
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="daily"
          dateLabel={today}
          streak={result.streak.currentStreak}
          onPlayAgain={() => (window.location.href = "/play")}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
      <header className="mb-2 text-center">
        <a href="/" className="text-sm text-text-dim hover:text-text">
          WordGrid
        </a>
        <h1 className="text-xl font-semibold mt-1">
          Daily Challenge — {today}
        </h1>
      </header>
      <div className="mb-3">
        <StreakDisplay compact />
      </div>
      <GameBoard grid={grid} onComplete={handleComplete} />
    </main>
  );
}
