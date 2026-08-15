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
import { getTodayActionTip } from "@/lib/daily-tip";
import TodayTipCard from "@/components/TodayTipCard";
import Link from "next/link";

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
  const todayTip = useMemo(() => getTodayActionTip(today), [today]);

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

  const entryLinks = [
    { href: "/play", label: "Play" },
    { href: "/zen", label: "Zen" },
    { href: "/daily", label: "Daily" },
    { href: "/challenge", label: "Challenge" },
    { href: "/daily/archive", label: "Archive" },
    { href: "/solver", label: "Word Grid Solver" },
    { href: "/stats", label: "Stats" },
  ];

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <article className="mx-auto max-w-7xl">
        <header className="mb-6 sm:mb-8 text-center">
          <a href="/" className="text-sm text-text-dim hover:text-text">
            WordGrid
          </a>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight">
            Daily Word Grid Puzzle — {today}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
            Play today&apos;s free 4x4 WordGrid board. Everyone gets the same
            Boggle-style puzzle and the same 3-minute timer, so your score is
            easy to compare and review.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            {entryLinks.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                aria-current={entry.href === "/daily" ? "page" : undefined}
                className={`px-3 py-1.5 rounded-full transition ${
                  entry.href === "/daily"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-surface/70 hover:bg-surface text-text-muted hover:text-text"
                }`}
              >
                {entry.label}
              </Link>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="space-y-5">
            <StreakDisplay compact />
            <GameBoard key={today} grid={grid} onComplete={handleComplete} />
          </section>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <TodayTipCard
              tip={todayTip}
              grid={grid}
              compact
              layout="stack"
              density="tight"
              showActionBox={false}
              showGrid={false}
              primaryHref="/play"
              primaryLabel="Play"
              secondaryHref="/guides/word-pattern-library"
              secondaryLabel="Pattern Library"
            />
            <DailyMissionPanel
              missions={missionsReady ? missions : []}
              title="Daily Missions"
              subtitle="Complete a few focused goals while you play. The board itself decides the exact targets."
              initialCollapsed
            />
          </aside>
        </div>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">How the Daily Board Works</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              The Daily puzzle uses one shared 4x4 grid for the day. Find as
              many valid words as you can before the timer ends, then come back
              tomorrow for a fresh board.
            </p>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              If you want to practice without affecting your daily rhythm, open
              a random board or use Zen mode.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">After You Play</h2>
            <div className="mt-4 grid gap-3">
              <Link href="/daily/archive" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Browse previous daily boards
              </Link>
              <Link href="/guides/boggle-scoring-sheet" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Check the scoring guide
              </Link>
              <Link href="/solver" className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 font-semibold text-primary hover:bg-primary/15 transition">
                Review a board with the solver
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
