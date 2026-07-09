"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { solveBoard, SolvedWord } from "@/lib/solver";
import { recordGameHistory } from "@/lib/game-history";
import { buildDailyMissions } from "@/lib/daily-missions";
import { getBoardActionTip } from "@/lib/daily-tip";
import { shareCardImage, generateShareCard } from "@/lib/shareCard";
import Confetti from "./Confetti";
import DailyMissionPanel from "./DailyMissionPanel";
import TodayTipCard from "./TodayTipCard";

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
  const recordedRef = useRef(false);

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
  const boardTip = useMemo(() => getBoardActionTip(grid), [grid]);

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

  useEffect(() => {
    if (recordedRef.current) return;
    recordedRef.current = true;
    recordGameHistory({
      mode,
      score: totalScore,
      foundCount: foundWords.length,
      totalCount: allWords.length,
      maxScore: maxPossible,
      percentage,
      bestCombo: bestCombo ?? 0,
      streak,
      dateLabel,
    });
  }, [mode, totalScore, foundWords.length, allWords.length, maxPossible, percentage, bestCombo, streak, dateLabel]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Confetti fire={fireConfetti} />
      <h2 className="text-center text-3xl font-bold">
        {mode === "daily" ? `Daily — ${dateLabel}` : "Game Over"}
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border bg-surface/35 p-5 shadow-lg shadow-black/5 sm:p-6">
            <div className="text-center">
              <div className="mb-1 text-6xl font-bold text-primary">{totalScore}</div>
              {hasDictionary ? (
                <div className="text-sm text-text-muted">
                  out of {maxPossible} possible ({percentage}%)
                </div>
              ) : (
                <div className="text-sm text-text-muted">
                  Dictionary data was not ready, so missed words are hidden.
                </div>
              )}
            </div>

            {mode === "daily" && dailyMissions.length > 0 && (
              <div className="mt-5">
                <DailyMissionPanel
                  missions={dailyMissions}
                  title="Daily Missions"
                  subtitle="How well you matched today's board-specific goals."
                />
              </div>
            )}

            {hasDictionary && (
              <div className="mt-5">
                <div className="h-3 w-full overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-border bg-bg/70 p-3 text-center">
                <div className="text-2xl font-bold text-success">{foundWords.length}</div>
                <div className="text-xs uppercase tracking-wide text-text-dim">Found</div>
              </div>
              <div className="rounded-2xl border border-border bg-bg/70 p-3 text-center">
                <div className="text-2xl font-bold text-danger">{missedWords.length}</div>
                <div className="text-xs uppercase tracking-wide text-text-dim">Missed</div>
              </div>
              <div className="rounded-2xl border border-border bg-bg/70 p-3 text-center">
                <div className="text-2xl font-bold text-text">{allWords.length}</div>
                <div className="text-xs uppercase tracking-wide text-text-dim">Total</div>
              </div>
              <div className="rounded-2xl border border-border bg-bg/70 p-3 text-center">
                <div className="text-2xl font-bold text-primary">
                  {bestCombo && bestCombo > 0 ? `x${bestCombo}` : "—"}
                </div>
                <div className="text-xs uppercase tracking-wide text-text-dim">Best Combo</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleShareCard}
                disabled={cardLoading}
                className="min-w-[140px] flex-1 rounded-xl bg-primary px-6 py-3 text-lg font-semibold transition hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50"
              >
                {cardLoading ? "Generating…" : "Share Image"}
              </button>
              <button
                onClick={handleShare}
                className="rounded-xl bg-surface px-6 py-3 font-semibold whitespace-nowrap transition hover:bg-surface-hover"
              >
                {copied ? "Copied!" : "Text"}
              </button>
              <a
                href="/stats"
                className="rounded-xl bg-surface px-6 py-3 font-semibold whitespace-nowrap transition hover:bg-surface-hover"
              >
                Stats
              </a>
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
              Your Words ({foundWords.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {foundWords
                .slice()
                .sort((a, b) => b.score - a.score)
                .map((w, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-success-bg/40 px-2.5 py-1 font-mono text-sm text-success"
                  >
                    {w.word} <span className="text-xs text-success">{w.score}</span>
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <TodayTipCard
            tip={boardTip}
            grid={grid}
            primaryHref="/guides/word-pattern-library"
            primaryLabel="Study this pattern"
            secondaryHref="/play"
            secondaryLabel="Practice another round"
            compact
          />

          {hasDictionary && (
            <div className="w-full rounded-2xl border border-border bg-surface/40 p-4 sm:p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                Game Review
              </h3>
              <div className="grid gap-3">
                <div className="rounded-xl bg-surface/60 p-3">
                  <div className="mb-1 text-xs uppercase tracking-wide text-text-muted">
                    Best missed words
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bestMissedWords.length > 0 ? (
                      bestMissedWords.map((w) => (
                        <a
                          key={w.word}
                          href={`/words/${w.word.toLowerCase()}`}
                          className="rounded-md bg-danger-bg/30 px-2.5 py-1 font-mono text-sm text-danger transition hover:bg-danger-bg/50"
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
                  <div className="mb-1 text-xs uppercase tracking-wide text-text-muted">
                    Next focus
                  </div>
                  {trainingHint ? (
                    <div className="space-y-1">
                      <div className="font-semibold text-primary">{trainingHint.label}</div>
                      <p className="text-sm leading-relaxed text-text-muted">
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

          {previewUrl && (
            <div className="w-full">
              <div className="mb-1 text-xs text-text-dim">Preview (long-press to save):</div>
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
        </div>
      </div>

      {/* Missed words */}
      {hasDictionary && missedWords.length > 0 && (
        <div className="w-full">
          <button
            onClick={() => setShowMissed(!showMissed)}
            className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted transition hover:text-text"
          >
            {showMissed ? "▼" : "▶"} Missed Words ({missedWords.length})
          </button>
          {showMissed && (
            <div className="flex flex-wrap gap-1.5">
              {missedWords.map((w, i) => (
                <a
                  key={i}
                  href={`/words/${w.word.toLowerCase()}`}
                  className="rounded-md bg-danger-bg/30 px-2.5 py-1 font-mono text-sm text-danger/80 transition hover:bg-danger-bg/50 hover:text-danger"
                >
                  {w.word} <span className="text-xs text-danger/60">{w.score}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="rounded-xl bg-primary px-6 py-3 font-semibold transition hover:bg-primary-hover"
          >
            {mode === "daily" ? "Play Random" : "New Game"}
          </button>
        )}
        <a
          href="/daily"
          className="rounded-xl bg-surface px-6 py-3 font-semibold transition hover:bg-surface-hover"
        >
          Daily Challenge
        </a>
        <a
          href="/"
          className="rounded-xl bg-surface px-6 py-3 font-semibold transition hover:bg-surface-hover"
        >
          Home
        </a>
      </div>
    </div>
  );
}
