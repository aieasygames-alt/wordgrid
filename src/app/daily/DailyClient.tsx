"use client";

import { useState, useMemo, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import StreakDisplay from "@/components/StreakDisplay";
import DailyMissionPanel from "@/components/DailyMissionPanel";
import {
  generateGrid,
  seedFromDate,
  todayDateString,
  msUntilNextDailyBoundary,
  Grid,
} from "@/lib/boggle";
import { loadDictionary, Trie } from "@/lib/dictionary";
import { solveBoard } from "@/lib/solver";
import { buildDailyMissions, type DailyMission } from "@/lib/daily-missions";
import { recordDailyPlay, type StreakData } from "@/lib/streak";

interface GameResult {
  words: { word: string; score: number }[];
  total: number;
  grid: Grid;
  trie: Trie | null;
  streak: StreakData;
  dateLabel: string;
  bestCombo: number;
}

export default function DailyClient() {
  const [today, setToday] = useState(todayDateString);
  const seed = useMemo(() => seedFromDate(today), [today]);
  const grid = useMemo(() => generateGrid(seed), [seed]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [missionsReady, setMissionsReady] = useState(false);

  useEffect(() => {
    let timer: number | null = null;

    const schedule = () => {
      timer = window.setTimeout(() => {
        setToday(todayDateString());
        schedule();
      }, msUntilNextDailyBoundary() + 1000);
    };

    schedule();
    return () => {
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadMissions = async () => {
      setMissionsReady(false);
      try {
        const trie = await loadDictionary();
        if (cancelled) return;
        const allWords = solveBoard(grid, trie);
        setMissions(buildDailyMissions(allWords, [], 0));
      } catch {
        if (!cancelled) setMissions([]);
      } finally {
        if (!cancelled) setMissionsReady(true);
      }
    };

    loadMissions();

    return () => {
      cancelled = true;
    };
  }, [grid]);

  const handleComplete = (
    words: { word: string; score: number }[],
    total: number,
    trie: Trie | null,
    bestCombo: number
  ) => {
    const streak = recordDailyPlay();
    setResult({ words, total, grid, trie, streak, dateLabel: today, bestCombo });
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
          dateLabel={result.dateLabel}
          streak={result.streak.currentStreak}
          bestCombo={result.bestCombo}
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
      <div className="mb-5 w-full max-w-lg">
        <DailyMissionPanel
          missions={missionsReady ? missions : []}
          title="Today's Missions"
          subtitle="Complete a few focused goals while you play. The board itself decides the exact targets."
        />
      </div>
      <GameBoard key={today} grid={grid} onComplete={handleComplete} />
    </main>
  );
}
