"use client";

import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import { generateGrid, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";

interface GameResult {
  words: { word: string; score: number }[];
  total: number;
  grid: Grid;
  trie: Trie | null;
  bestCombo: number;
}

export default function PlayClient() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const [grid, setGrid] = useState<Grid>(() => generateGrid(seed));
  const [result, setResult] = useState<GameResult | null>(null);

  const newGame = () => {
    const s = Math.floor(Math.random() * 1e9);
    setSeed(s);
    setGrid(generateGrid(s));
    setResult(null);
  };

  if (result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <header className="mb-6 text-center">
          <a href="/" className="text-sm text-text-dim hover:text-text">
            WordGrid
          </a>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
            <a href="/guides/boggle-rules-beginners" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
              Rules
            </a>
            <a href="/guides/how-to-find-more-words" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
              Find More Words
            </a>
            <a href="/solver" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
              Solver
            </a>
            <a href="/stats" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
              Stats
            </a>
            <a href="/daily/archive" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
              Archive
            </a>
            <a href="/daily" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
              Daily Challenge
            </a>
          </div>
        </header>
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="play"
          bestCombo={result.bestCombo}
          onPlayAgain={newGame}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
      <header className="mb-6 text-center max-w-2xl">
        <a href="/" className="text-sm text-text-dim hover:text-text">
          WordGrid
        </a>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Play Word Grid Online Free
        </h1>
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-xl mx-auto">
          Start a fresh board instantly. If you want the shortest path to the
          rules or strategy, use the links below before or after your round.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <a href="/guides/boggle-rules-beginners" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Rules
          </a>
          <a href="/guides/how-to-find-more-words" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Find More Words
          </a>
          <a href="/guides/word-grid-strategies" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Strategy
          </a>
          <a href="/solver" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Solver
          </a>
          <a href="/stats" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Stats
          </a>
          <a href="/daily/archive" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Archive
          </a>
          <a href="/daily" className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition">
            Daily Challenge
          </a>
        </div>
      </header>
      <GameBoard
        grid={grid}
        onComplete={(words, total, trie, bestCombo) =>
          setResult({ words, total, grid, trie, bestCombo })
        }
      />
    </main>
  );
}
