"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import GameBoard from "@/components/GameBoard";
import ResultScreen from "@/components/ResultScreen";
import TodayTipCard from "@/components/TodayTipCard";
import { generateGrid, generateSizedGrid, Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { decodeBoard } from "@/lib/board-link";
import { getBoardActionTip } from "@/lib/daily-tip";

interface GameResult {
  words: { word: string; score: number }[];
  total: number;
  grid: Grid;
  trie: Trie | null;
  bestCombo: number;
  sessionMode: "timed" | "zen";
}

const entryLinks = [
  { href: "/play", label: "Play" },
  { href: "/zen", label: "Zen" },
  { href: "/daily", label: "Daily" },
  { href: "/challenge", label: "Challenge" },
];

const supportLinks = [
  { href: "/guides/play-word-grid-online", label: "Play Guide" },
  { href: "/guides/play-boggle-online-free", label: "Free Boggle" },
  { href: "/guides/boggle-rules-beginners", label: "Rules" },
  { href: "/guides/how-to-find-more-words", label: "Find More Words" },
  { href: "/guides/word-grid-strategies", label: "Strategy" },
  { href: "/solver", label: "Solver" },
  { href: "/stats", label: "Stats" },
  { href: "/daily/archive", label: "Archive" },
];

export default function PlayClient() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const [grid, setGrid] = useState<Grid>(() => generateGrid(seed));
  const [result, setResult] = useState<GameResult | null>(null);
  const [boardSize, setBoardSize] = useState(4);
  const [sessionMode, setSessionMode] = useState<"timed" | "zen">("timed");
  const boardTip = useMemo(() => getBoardActionTip(grid), [grid]);
  const gameKey = useMemo(
    () => `${sessionMode}-${boardSize}-${grid.flat().map((cell) => cell.letter).join("")}`,
    [sessionMode, boardSize, grid]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const sizeParam = Number(params.get("size"));
    if (Number.isFinite(sizeParam) && sizeParam >= 4) {
      setBoardSize(sizeParam);
    }
    const modeParam = params.get("mode");
    if (modeParam === "zen") {
      setSessionMode("zen");
    }
    const boardParam = params.get("board");
    if (!boardParam && Number.isFinite(sizeParam) && sizeParam >= 4) {
      const nextSeed = Math.floor(Math.random() * 1e9);
      setSeed(nextSeed);
      setGrid(sizeParam === 4 ? generateGrid(nextSeed) : generateSizedGrid(nextSeed, sizeParam));
      setResult(null);
      return;
    }
    if (!boardParam) return;

    const decoded = decodeBoard(boardParam);
    if (decoded) {
      setBoardSize(decoded.length);
      setGrid(decoded);
      setResult(null);
    }
  }, []);

  const newGame = () => {
    const s = Math.floor(Math.random() * 1e9);
    setSeed(s);
    setGrid(boardSize === 4 ? generateGrid(s) : generateSizedGrid(s, boardSize));
    setResult(null);
  };

  const entryNav = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {entryLinks.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="px-4 py-2 rounded-xl bg-surface/70 hover:bg-surface transition text-center text-sm font-semibold"
        >
          {entry.label}
        </Link>
      ))}
    </div>
  );

  const supportNav = (
    <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
      {supportLinks.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
        >
          {entry.label}
        </Link>
      ))}
    </div>
  );

  const desktopRail = (
    <aside className="hidden lg:flex flex-col gap-4 w-[360px] shrink-0 lg:sticky lg:top-8 lg:self-start">
      <TodayTipCard
        tip={boardTip}
        grid={grid}
        compact
        layout="stack"
        primaryHref="/daily"
        primaryLabel="Open Daily"
        secondaryHref="/solver"
        secondaryLabel="Open Solver"
      />
      <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
        <h2 className="text-xl font-bold">Desktop shortcuts</h2>
        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          Keep the board on the left and use these shortcuts to switch modes or
          review the same grid without scrolling back to the top.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {entryLinks.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="rounded-xl bg-bg/70 px-3 py-2 text-sm font-semibold text-text transition hover:bg-surface-hover"
            >
              {entry.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );

  if (result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <header className="mb-6 text-center max-w-4xl">
          <Link href="/" className="text-sm text-text-dim hover:text-text">
            WordGrid
          </Link>
          <div className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Play Word Grid Online Free
          </div>
          <p className="mt-3 text-sm sm:text-base text-text-muted max-w-xl mx-auto">
            Pick the next step from the same four entry points: Play, Zen,
            Daily, or Challenge. The board controls stay below, so the page
            reads in one clear order.
          </p>
          <div className="mt-4">{entryNav}</div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <button
              onClick={() => setSessionMode("timed")}
              className={`px-3 py-1.5 rounded-full transition ${
                sessionMode === "timed" ? "bg-primary text-white" : "bg-surface/70 hover:bg-surface"
              }`}
            >
              Timed
            </button>
            <button
              onClick={() => setSessionMode("zen")}
              className={`px-3 py-1.5 rounded-full transition ${
                sessionMode === "zen" ? "bg-primary text-white" : "bg-surface/70 hover:bg-surface"
              }`}
            >
              Zen
            </button>
            <button
              onClick={() => {
                const s = Math.floor(Math.random() * 1e9);
                setBoardSize(4);
                setSeed(s);
                setGrid(generateGrid(s));
                setResult(null);
              }}
              className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
            >
              4x4
            </button>
            <button
              onClick={() => {
                const s = Math.floor(Math.random() * 1e9);
                setBoardSize(5);
                setSeed(s);
                setGrid(generateSizedGrid(s, 5));
                setResult(null);
              }}
              className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
            >
              5x5
            </button>
            <button
              onClick={() => {
                const s = Math.floor(Math.random() * 1e9);
                setBoardSize(6);
                setSeed(s);
                setGrid(generateSizedGrid(s, 6));
                setResult(null);
              }}
              className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
            >
              6x6
            </button>
          </div>
          {supportNav}
        </header>
        <ResultScreen
          grid={result.grid}
          trie={result.trie}
          foundWords={result.words}
          totalScore={result.total}
          mode="play"
          sessionMode={result.sessionMode}
          bestCombo={result.bestCombo}
          onPlayAgain={newGame}
        />
        <section className="mt-10 w-full max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/guides/boggle-rules-beginners" className="rounded-2xl border border-border bg-surface/50 p-4 font-semibold hover:bg-surface transition">
            Rules guide
          </Link>
          <Link href="/guides/boggle-scoring-sheet" className="rounded-2xl border border-border bg-surface/50 p-4 font-semibold hover:bg-surface transition">
            Scoring guide
          </Link>
          <Link href="/guides/boggle-dictionary" className="rounded-2xl border border-border bg-surface/50 p-4 font-semibold hover:bg-surface transition">
            Dictionary guide
          </Link>
          <Link href="/solver" className="rounded-2xl border border-primary/20 bg-primary/10 p-4 font-semibold text-primary hover:bg-primary/15 transition">
            Review with solver
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
        <header className="mb-6 text-center max-w-4xl">
        <Link href="/" className="text-sm text-text-dim hover:text-text">
          WordGrid
        </Link>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Play Word Grid Online Free
        </h1>
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-xl mx-auto">
          Start a free Boggle-style word grid puzzle in your browser. Pick timed
          rounds, Zen practice, the shared Daily board, or a Challenge link.
        </p>
        <div className="mt-4">{entryNav}</div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <button
            onClick={() => setSessionMode("timed")}
            className={`px-3 py-1.5 rounded-full transition ${
              sessionMode === "timed" ? "bg-primary text-white" : "bg-surface/70 hover:bg-surface"
            }`}
          >
            Timed
          </button>
          <button
            onClick={() => setSessionMode("zen")}
            className={`px-3 py-1.5 rounded-full transition ${
              sessionMode === "zen" ? "bg-primary text-white" : "bg-surface/70 hover:bg-surface"
            }`}
          >
            Zen
          </button>
          <button
            onClick={() => {
              const s = Math.floor(Math.random() * 1e9);
              setBoardSize(4);
              setSeed(s);
              setGrid(generateGrid(s));
              setResult(null);
            }}
            className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
          >
            4x4
          </button>
          <button
            onClick={() => {
              const s = Math.floor(Math.random() * 1e9);
              setBoardSize(5);
              setSeed(s);
              setGrid(generateSizedGrid(s, 5));
              setResult(null);
            }}
            className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
          >
            5x5
          </button>
          <button
            onClick={() => {
              const s = Math.floor(Math.random() * 1e9);
              setBoardSize(6);
              setSeed(s);
              setGrid(generateSizedGrid(s, 6));
              setResult(null);
            }}
            className="px-3 py-1.5 rounded-full bg-surface/70 hover:bg-surface transition"
            >
              6x6
            </button>
        </div>
        {supportNav}
      </header>
      <div className="w-full max-w-7xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 lg:items-start">
        <div className="w-full">
          <GameBoard
            key={gameKey}
            grid={grid}
            initialDuration={sessionMode === "zen" ? 0 : 180}
            onComplete={(words, total, trie, bestCombo) =>
              setResult({ words, total, grid, trie, bestCombo, sessionMode })
            }
          />
        </div>
        {desktopRail}
      </div>
      <section className="mt-10 w-full max-w-7xl mx-auto space-y-10">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">Why This Play Page Matters</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              This is the direct play surface for searchers who want an instant
              game, especially on Bing-style discovery where playable intent
              often wins faster than a long guide.
            </p>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              For Google, the stronger path is usually to pair the live board
              with supporting pages about rules, scoring, vocabulary, and
              solver review. That is why this page links into the guide cluster
              instead of standing alone.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">Choose Your Next Step</h2>
            <div className="mt-4 grid gap-3">
              <Link href="/guides/boggle-rules-beginners" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Learn the rules
              </Link>
              <Link href="/guides/boggle-scoring-sheet" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Understand scoring
              </Link>
              <Link href="/guides/boggle-dictionary" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Build vocabulary
              </Link>
              <Link href="/solver" className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 font-semibold text-primary hover:bg-primary/15 transition">
                Review with solver
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Timed mode</h2>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              The classic 3-minute rhythm for players who want standard
              Boggle-style pressure and comparable scores.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Zen mode</h2>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Slow practice with no clock, useful for learning new families and
              scanning patterns without rushing.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Daily board</h2>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Everyone gets the same board, which makes it easier to compare
              scores and review the same puzzle later in the solver.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Board sizes</h2>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Use 4x4 for classic play, then move to 5x5 and 6x6 when you want
              longer paths and more vocabulary pressure.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
