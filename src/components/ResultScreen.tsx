"use client";

import { useState, useMemo, useEffect } from "react";
import { Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { solveBoard, SolvedWord } from "@/lib/solver";
import { shareCardImage, generateShareCard } from "@/lib/shareCard";
import Confetti from "./Confetti";

interface FoundWord {
  word: string;
  score: number;
}

interface ResultScreenProps {
  grid: Grid;
  trie: Trie | null;
  foundWords: FoundWord[];
  totalScore: number;
  mode: "play" | "daily";
  dateLabel?: string;
  onPlayAgain?: () => void;
}

export default function ResultScreen({
  grid,
  trie,
  foundWords,
  totalScore,
  mode,
  dateLabel,
  onPlayAgain,
}: ResultScreenProps) {
  const [showMissed, setShowMissed] = useState(true);
  const [copied, setCopied] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Trigger confetti when result screen mounts with a good score
  useEffect(() => {
    if (foundWords.length > 0) {
      setFireConfetti(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allWords: SolvedWord[] = useMemo(() => {
    if (!trie) return [];
    return solveBoard(grid, trie);
  }, [grid, trie]);

  const foundSet = useMemo(
    () => new Set(foundWords.map((w) => w.word)),
    [foundWords]
  );

  const missedWords = useMemo(
    () => allWords.filter((w) => !foundSet.has(w.word)),
    [allWords, foundSet]
  );

  const maxPossible = useMemo(
    () => allWords.reduce((s, w) => s + w.score, 0),
    [allWords]
  );

  const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  // Generate emoji grid for sharing (like Wordle)
  const shareText = useMemo(() => {
    const header =
      mode === "daily"
        ? `WordGrid Daily ${dateLabel}`
        : "WordGrid";
    const lines = [
      header,
      `Score: ${totalScore} / ${maxPossible} (${percentage}%)`,
      `Words: ${foundWords.length} / ${allWords.length}`,
      "",
    ];

    // Emoji summary: 🟩 found, 🟥 missed (top 20 by score)
    const topWords = allWords.slice(0, 20);
    const emojis = topWords
      .map((w) => (foundSet.has(w.word) ? "🟩" : "🟥"))
      .join("");
    lines.push(emojis);
    lines.push("");
    lines.push("wordgrid.games/" + mode);

    return lines.join("\n");
  }, [mode, dateLabel, totalScore, maxPossible, percentage, foundWords.length, allWords.length, foundSet]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled or clipboard failed
    }
  };

  const handleShareCard = async () => {
    setCardLoading(true);
    try {
      await shareCardImage({
        grid,
        totalScore,
        maxScore: maxPossible,
        foundCount: foundWords.length,
        totalCount: allWords.length,
        percentage,
        mode,
        dateLabel,
      });
    } catch {
      // fallback to text share
      handleShare();
    } finally {
      setCardLoading(false);
    }
  };

  const handlePreviewCard = async () => {
    if (previewUrl) {
      setPreviewUrl(null);
      return;
    }
    setCardLoading(true);
    try {
      const blob = await generateShareCard({
        grid,
        totalScore,
        maxScore: maxPossible,
        foundCount: foundWords.length,
        totalCount: allWords.length,
        percentage,
        mode,
        dateLabel,
      });
      if (blob) {
        setPreviewUrl(URL.createObjectURL(blob));
      }
    } finally {
      setCardLoading(false);
    }
  };

  if (!trie) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-400 animate-pulse">Calculating results…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <Confetti fire={fireConfetti} />
      <h2 className="text-3xl font-bold">
        {mode === "daily" ? `Daily — ${dateLabel}` : "Game Over"}
      </h2>

      {/* Score summary */}
      <div className="text-center">
        <div className="text-6xl font-bold text-indigo-400 mb-1">{totalScore}</div>
        <div className="text-slate-400 text-sm">
          out of {maxPossible} possible ({percentage}%)
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-8 w-full">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{foundWords.length}</div>
          <div className="text-slate-500 text-xs uppercase tracking-wide">Found</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{missedWords.length}</div>
          <div className="text-slate-500 text-xs uppercase tracking-wide">Missed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-300">{allWords.length}</div>
          <div className="text-slate-500 text-xs uppercase tracking-wide">Total</div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={handleShareCard}
          disabled={cardLoading}
          className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl font-semibold text-lg active:scale-[0.98] disabled:opacity-50"
        >
          {cardLoading ? "Generating…" : "Share Image"}
        </button>
        <button
          onClick={handleShare}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 transition rounded-xl font-semibold whitespace-nowrap"
        >
          {copied ? "Copied!" : "Text"}
        </button>
      </div>

      {/* Card preview */}
      {previewUrl && (
        <div className="w-full">
          <div className="text-xs text-slate-500 mb-1">Preview (long-press to save):</div>
          <img
            src={previewUrl}
            alt="Share card preview"
            className="w-full rounded-xl border border-slate-700"
          />
          <button
            onClick={() => setPreviewUrl(null)}
            className="mt-1 text-xs text-slate-500 hover:text-slate-400"
          >
            Close preview
          </button>
        </div>
      )}

      {/* Found words list */}
      <div className="w-full">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
          Your Words ({foundWords.length})
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {foundWords
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((w, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-green-900/40 text-green-300 rounded-md text-sm font-mono"
              >
                {w.word} <span className="text-green-500 text-xs">{w.score}</span>
              </span>
            ))}
        </div>
      </div>

      {/* Missed words */}
      {missedWords.length > 0 && (
        <div className="w-full">
          <button
            onClick={() => setShowMissed(!showMissed)}
            className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2 hover:text-slate-300 transition"
          >
            {showMissed ? "▼" : "▶"} Missed Words ({missedWords.length})
          </button>
          {showMissed && (
            <div className="flex flex-wrap gap-1.5">
              {missedWords.map((w, i) => (
                <a
                  key={i}
                  href={`/words/${w.word.toLowerCase()}`}
                  className="px-2.5 py-1 bg-red-900/30 text-red-300/80 hover:bg-red-900/50 hover:text-red-300 rounded-md text-sm font-mono transition"
                >
                  {w.word} <span className="text-red-500/60 text-xs">{w.score}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl font-semibold"
          >
            {mode === "daily" ? "Play Random" : "New Game"}
          </button>
        )}
        <a
          href="/daily"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 transition rounded-xl font-semibold"
        >
          Daily Challenge
        </a>
        <a
          href="/"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 transition rounded-xl font-semibold"
        >
          Home
        </a>
      </div>
    </div>
  );
}
