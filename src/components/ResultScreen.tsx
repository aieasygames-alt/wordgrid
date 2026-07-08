"use client";

import { useState, useMemo, useEffect } from "react";
import { Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { solveBoard, SolvedWord } from "@/lib/solver";
import { buildDailyMissions } from "@/lib/daily-missions";
import { shareCardImage, generateShareCard } from "@/lib/shareCard";
import Confetti from "./Confetti";
import DailyMissionPanel from "./DailyMissionPanel";

interface FoundWord {
  word: string;
  score: number;
}

type TrainingHint = {
  label: string;
  detail: string;
};

const PREFIX_PATTERNS = [
  "RE",
  "UN",
  "IN",
  "DIS",
  "PRE",
  "OVER",
  "UNDER",
  "INTER",
  "OUT",
  "TRANS",
  "CON",
  "COM",
];

const SUFFIX_PATTERNS = [
  "ING",
  "ED",
  "ER",
  "EST",
  "LY",
  "NESS",
  "TION",
  "MENT",
  "ABLE",
  "ION",
  "TY",
  "S",
];

interface ResultScreenProps {
  grid: Grid;
  trie: Trie | null;
  foundWords: FoundWord[];
  totalScore: number;
  mode: "play" | "daily";
  dateLabel?: string;
  streak?: number;
  bestCombo?: number;
  onPlayAgain?: () => void;
}

export default function ResultScreen({
  grid,
  trie,
  foundWords,
  totalScore,
  mode,
  dateLabel,
  streak,
  bestCombo,
  onPlayAgain,
}: ResultScreenProps) {
  const [showMissed, setShowMissed] = useState(true);
  const [copied, setCopied] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const hasDictionary = Boolean(trie);

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
    () => (hasDictionary ? allWords.filter((w) => !foundSet.has(w.word)) : []),
    [allWords, foundSet, hasDictionary]
  );

  const bestMissedWords = useMemo(
    () => missedWords.slice().sort((a, b) => b.score - a.score).slice(0, 6),
    [missedWords]
  );

  const trainingHint = useMemo<TrainingHint | null>(() => {
    if (!hasDictionary || missedWords.length === 0) return null;

    const counts = new Map<string, number>();
    const add = (label: string) => {
      counts.set(label, (counts.get(label) || 0) + 1);
    };

    for (const { word } of missedWords) {
      const upper = word.toUpperCase();
      if (upper.includes("QU")) add("Qu");

      const prefix = PREFIX_PATTERNS.find((p) => upper.startsWith(p) || upper.includes(p));
      if (prefix) add(`Prefix: ${prefix}`);

      const suffix = SUFFIX_PATTERNS.find((s) => upper.endsWith(s));
      if (suffix) add(`Suffix: ${suffix}`);

      if (upper.length >= 6) add("Long words");
      else if (upper.length <= 4) add("Quick grabs");
    }

    let topLabel = "";
    let topCount = 0;
    for (const [label, count] of counts) {
      if (count > topCount) {
        topLabel = label;
        topCount = count;
      }
    }

    if (!topLabel) {
      return {
        label: "Training focus: Mixed",
        detail: "The missed words were spread out. Try a more systematic scan next round.",
      };
    }

    if (topLabel === "Qu") {
      return {
        label: "Training focus: Qu",
        detail: "You missed several Qu words. Next round, check every Q tile first.",
      };
    }

    if (topLabel.startsWith("Prefix: ")) {
      const prefix = topLabel.replace("Prefix: ", "");
      return {
        label: `Training focus: ${topLabel}`,
        detail: `You missed words built around the ${prefix} pattern. Scan for extensions and word families around that prefix.`,
      };
    }

    if (topLabel.startsWith("Suffix: ")) {
      const suffix = topLabel.replace("Suffix: ", "");
      return {
        label: `Training focus: ${topLabel}`,
        detail: `You missed words ending in ${suffix}. Look for base words that can extend into that ending.`,
      };
    }

    if (topLabel === "Long words") {
      return {
        label: "Training focus: Long words",
        detail: "Longer scoring words were left behind. Prioritize 5+ letter paths earlier in the next game.",
      };
    }

    return {
      label: "Training focus: Quick grabs",
      detail: "Several easy words were available. Start the next board with a quick sweep before hunting long words.",
    };
  }, [hasDictionary, missedWords]);

  const maxPossible = useMemo(
    () => (hasDictionary ? allWords.reduce((s, w) => s + w.score, 0) : 0),
    [allWords, hasDictionary]
  );

  const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  const dailyMissions = useMemo(
    () => (mode === "daily" && hasDictionary ? buildDailyMissions(allWords, foundWords, bestCombo ?? 0) : []),
    [mode, hasDictionary, allWords, foundWords, bestCombo]
  );

  // Generate emoji grid for sharing (like Wordle)
  const shareText = useMemo(() => {
    const header =
      mode === "daily"
        ? `WordGrid Daily ${dateLabel}`
        : "WordGrid";
    const lines = [
      header,
      hasDictionary
        ? `Score: ${totalScore} / ${maxPossible} (${percentage}%)`
        : `Score: ${totalScore}`,
      hasDictionary
        ? `Words: ${foundWords.length} / ${allWords.length}`
        : `Words found: ${foundWords.length}`,
    ];

    if (streak && streak >= 2) {
      lines.push(`🔥 ${streak}-day streak`);
    }
    if (bestCombo && bestCombo >= 2) {
      lines.push(`⚡ Best combo: x${bestCombo}`);
    }
    if (!hasDictionary) {
      lines.push("Dictionary data was unavailable, so missed words could not be calculated.");
    }
    lines.push("");

    // Emoji summary: 🟩 found, 🟥 missed (top 20 by score)
    if (hasDictionary) {
      const topWords = allWords.slice(0, 20);
      const emojis = topWords
        .map((w) => (foundSet.has(w.word) ? "🟩" : "🟥"))
        .join("");
      lines.push(emojis);
      lines.push("");
    }
    lines.push("");
    lines.push("wordgrid.games/" + mode);

    return lines.join("\n");
  }, [mode, dateLabel, totalScore, maxPossible, percentage, foundWords.length, allWords, foundSet, streak, hasDictionary, bestCombo]);

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
          bestCombo,
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
        bestCombo,
      });
      if (blob) {
        setPreviewUrl(URL.createObjectURL(blob));
      }
    } finally {
      setCardLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <Confetti fire={fireConfetti} />
      <h2 className="text-3xl font-bold">
        {mode === "daily" ? `Daily — ${dateLabel}` : "Game Over"}
      </h2>

      {/* Score summary */}
      <div className="text-center">
        <div className="text-6xl font-bold text-primary mb-1">{totalScore}</div>
        {hasDictionary ? (
          <div className="text-text-muted text-sm">
            out of {maxPossible} possible ({percentage}%)
          </div>
        ) : (
          <div className="text-text-muted text-sm">
            Dictionary data was not ready, so missed words are hidden.
          </div>
        )}
      </div>

      {mode === "daily" && dailyMissions.length > 0 && (
        <DailyMissionPanel
          missions={dailyMissions}
          title="Daily Missions"
          subtitle="How well you matched today's board-specific goals."
        />
      )}

      {/* Progress bar */}
      {hasDictionary && (
        <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {/* Stats row */}
      <div className="flex justify-center gap-8 w-full">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{foundWords.length}</div>
          <div className="text-text-dim text-xs uppercase tracking-wide">Found</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-danger">{missedWords.length}</div>
          <div className="text-text-dim text-xs uppercase tracking-wide">Missed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text">{allWords.length}</div>
          <div className="text-text-dim text-xs uppercase tracking-wide">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {bestCombo && bestCombo > 0 ? `x${bestCombo}` : "—"}
          </div>
          <div className="text-text-dim text-xs uppercase tracking-wide">Best Combo</div>
        </div>
      </div>

      {/* Game review */}
      {hasDictionary && (
        <div className="w-full rounded-2xl border border-border bg-surface/40 p-4 sm:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-3">
            Game Review
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface/60 p-3">
              <div className="text-xs uppercase tracking-wide text-text-muted mb-1">
                Best missed words
              </div>
              <div className="flex flex-wrap gap-1.5">
                {bestMissedWords.length > 0 ? (
                  bestMissedWords.map((w) => (
                    <a
                      key={w.word}
                      href={`/words/${w.word.toLowerCase()}`}
                      className="px-2.5 py-1 rounded-md bg-danger-bg/30 text-danger hover:bg-danger-bg/50 transition text-sm font-mono"
                    >
                      {w.word}
                      <span className="ml-1 text-xs text-danger/70">{w.score}</span>
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-text-muted">No missed words to review.</span>
                )}
              </div>
            </div>
            <div className="rounded-xl bg-surface/60 p-3">
              <div className="text-xs uppercase tracking-wide text-text-muted mb-1">
                Next focus
              </div>
              {trainingHint ? (
                <div className="space-y-1">
                  <div className="font-semibold text-primary">{trainingHint.label}</div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {trainingHint.detail}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-text-muted">
                  Great scan. Try the next board and keep building speed.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={handleShareCard}
          disabled={cardLoading}
          className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold text-lg active:scale-[0.98] disabled:opacity-50"
        >
          {cardLoading ? "Generating…" : "Share Image"}
        </button>
        <button
          onClick={handleShare}
          className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold whitespace-nowrap"
        >
          {copied ? "Copied!" : "Text"}
        </button>
      </div>

      {/* Card preview */}
      {previewUrl && (
        <div className="w-full">
          <div className="text-xs text-text-dim mb-1">Preview (long-press to save):</div>
          {/* Blob preview URLs are a good fit for a plain img tag here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Share card preview"
            className="w-full rounded-xl border border-border"
          />
          <button
            onClick={() => setPreviewUrl(null)}
            className="mt-1 text-xs text-text-dim hover:text-text-muted"
          >
            Close preview
          </button>
        </div>
      )}

      {/* Found words list */}
      <div className="w-full">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">
          Your Words ({foundWords.length})
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {foundWords
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((w, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-success-bg/40 text-success rounded-md text-sm font-mono"
              >
                {w.word} <span className="text-success text-xs">{w.score}</span>
              </span>
            ))}
        </div>
      </div>

      {/* Missed words */}
      {hasDictionary && missedWords.length > 0 && (
        <div className="w-full">
          <button
            onClick={() => setShowMissed(!showMissed)}
            className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2 hover:text-text transition"
          >
            {showMissed ? "▼" : "▶"} Missed Words ({missedWords.length})
          </button>
          {showMissed && (
            <div className="flex flex-wrap gap-1.5">
              {missedWords.map((w, i) => (
                <a
                  key={i}
                  href={`/words/${w.word.toLowerCase()}`}
                  className="px-2.5 py-1 bg-danger-bg/30 text-danger/80 hover:bg-danger-bg/50 hover:text-danger rounded-md text-sm font-mono transition"
                >
                  {w.word} <span className="text-danger/60 text-xs">{w.score}</span>
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
            className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
          >
            {mode === "daily" ? "Play Random" : "New Game"}
          </button>
        )}
        <a
          href="/daily"
          className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
        >
          Daily Challenge
        </a>
        <a
          href="/"
          className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
        >
          Home
        </a>
      </div>
    </div>
  );
}
