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
  const primaryEntrances = [
    { href: "/play", label: "Play Free" },
    { href: "/zen", label: "Zen" },
    { href: "/daily", label: "Daily" },
    { href: "/challenge", label: "Challenge" },
  ];
  const secondaryEntrances = [
    { href: "/guides/boggle-rules-beginners", label: "Rules" },
    { href: "/guides/word-pattern-library", label: "Pattern Library" },
    { href: "/solver", label: "Solver" },
    { href: "/stats", label: "Stats" },
    { href: "/daily/archive", label: "Archive" },
  ];

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
      <section className="mb-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-start">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Play Word Grid Online Free
            </h1>
            <p className="text-base text-text-muted max-w-lg mx-auto lg:mx-0 mb-4">
              Start a free word grid game in your browser. Connect adjacent
              letters in a Boggle-style puzzle, choose timed or untimed play,
              and come back for the shared Daily board. No download, no sign-up.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {primaryEntrances.map((entry) => (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="px-5 py-3 bg-surface hover:bg-surface-hover transition rounded-xl text-sm font-semibold text-center active:scale-[0.98]"
                >
                  {entry.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2 text-sm">
              {secondaryEntrances.map((entry) => (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
                >
                  {entry.label}
                </Link>
              ))}
            </div>
          </div>

          <TodayTipCard
            tip={todayTip}
            grid={grid}
            compact
            layout="split"
            density="tight"
            actionsLayout="inline"
            showActionBox={false}
            showGrid={false}
            primaryHref="/daily"
            primaryLabel="Open Daily"
            secondaryHref="/guides/word-pattern-library"
            secondaryLabel="Open pattern library"
          />
        </div>
      </section>

      {/* Game board — visible immediately */}
      <div className="mb-8">
        <GameBoard grid={grid} onComplete={handleComplete} />
      </div>
    </>
  );
}
