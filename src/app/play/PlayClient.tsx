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
          <a href="/" className="text-sm text-slate-500 hover:text-slate-300">
            WordGrid
          </a>
        </header>
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="play"
          onPlayAgain={newGame}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
      <header className="mb-6 text-center">
        <a href="/" className="text-sm text-slate-500 hover:text-slate-300">
          WordGrid
        </a>
      </header>
      <GameBoard
        grid={grid}
        onComplete={(words, total, trie) =>
          setResult({ words, total, grid, trie })
        }
      />
    </main>
  );
}
