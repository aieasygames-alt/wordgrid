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
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6">
      <section className="mb-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          Instant Arcade Board · 3-Minute Blitz
        </div>
        <h1 className="mt-2.5 text-2xl font-black tracking-tight sm:text-4xl">
          Connect Adjacent Tiles. Find Every Word.
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-muted">
          Drag horizontally, vertically, or diagonally. Submit words before the clock runs out!
        </p>
      </section>
      <div className="mb-8">
        <GameBoard
          grid={grid}
          startPaused
          onStart={() => trackEvent("homepage_game_start_click", { board_size: grid.length })}
          onComplete={handleComplete}
        />
      </div>
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black tracking-tight text-text">More Game Modes</h2>
          <span className="text-xs font-semibold text-text-muted">Pick a challenge</span>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/daily"
            className="group relative rounded-2xl border border-border/80 bg-gradient-to-br from-surface to-surface/40 p-5 transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🔥</span>
              <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                Daily Board
              </span>
            </div>
            <div className="mt-3 font-bold text-base text-text group-hover:text-amber-400 transition-colors">
              Daily Challenge
            </div>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              Same board for everyone globally. Changes at midnight UTC+8. Build your daily streak!
            </p>
          </Link>

          <Link
            href="/complete"
            className="group relative rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-surface to-surface/40 p-5 transition-all hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/15"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🧩</span>
              <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                Untimed Collection
              </span>
            </div>
            <div className="mt-3 font-bold text-base text-text group-hover:text-primary transition-colors">
              WordGrid Complete
            </div>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              No timer pressure. Find all required target words, reveal bonus words, and climb the leaderboard.
            </p>
          </Link>

          <Link
            href="/zen"
            className="group relative rounded-2xl border border-border/80 bg-gradient-to-br from-surface to-surface/40 p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🧘</span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                Endless Practice
              </span>
            </div>
            <div className="mt-3 font-bold text-base text-text group-hover:text-emerald-400 transition-colors">
              Zen Mode
            </div>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              Relaxed word hunting without time limits. Great for discovering obscure roots and prefixes.
            </p>
          </Link>

          <Link
            href="/challenge"
            className="group relative rounded-2xl border border-border/80 bg-gradient-to-br from-surface to-surface/40 p-5 transition-all hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">⚔️</span>
              <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
                Multiplayer
              </span>
            </div>
            <div className="mt-3 font-bold text-base text-text group-hover:text-rose-400 transition-colors">
              Friend Challenge
            </div>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              Share your finished board and score target with friends to see who can beat your record.
            </p>
          </Link>

          <Link
            href="/training"
            className="group relative rounded-2xl border border-border/80 bg-gradient-to-br from-surface to-surface/40 p-5 transition-all hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🎯</span>
              <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-violet-400">
                Skill Sprints
              </span>
            </div>
            <div className="mt-3 font-bold text-base text-text group-hover:text-violet-400 transition-colors">
              Pattern Sprint
            </div>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              Fast 30-second drills targeting specific prefixes, suffixes, and high-scoring letter combos.
            </p>
          </Link>

          <Link
            href="/solver"
            className="group relative rounded-2xl border border-border/80 bg-gradient-to-br from-surface to-surface/40 p-5 transition-all hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🔍</span>
              <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                Analyzer
              </span>
            </div>
            <div className="mt-3 font-bold text-base text-text group-hover:text-cyan-400 transition-colors">
              Board Solver
            </div>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              Input any custom grid to instantly calculate all possible words and visualize paths.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
