"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { solveBoard, SolvedWord } from "@/lib/solver";
import { recordGameHistory } from "@/lib/game-history";
import { buildDailyMissions } from "@/lib/daily-missions";
import { getBoardActionTip } from "@/lib/daily-tip";
import { shareCardImage, generateShareCard } from "@/lib/shareCard";
import { buildBoardUrl } from "@/lib/board-link";
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

type MissedCategory = {
  id: string;
  label: string;
  count: number;
  total: number;
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

function buildMissedBreakdown(words: SolvedWord[]): MissedCategory[] {
  const categories = [
    { id: "qu", label: "Qu", detail: "Special-case Q tiles and their nearby vowels." },
    { id: "prefix", label: "Prefixes", detail: "RE, UN, IN, PRE, and other starts." },
    { id: "suffix", label: "Suffixes", detail: "ING, ED, ER, LY, and other endings." },
    { id: "long", label: "Long words", detail: "5+ letter words that pay off most." },
    { id: "quick", label: "Quick grabs", detail: "Short, easy words you can take early." },
  ];

  const counts = new Map<string, number>(categories.map((category) => [category.id, 0]));

  for (const { word } of words) {
    const upper = word.toUpperCase();
    if (upper.includes("QU")) counts.set("qu", (counts.get("qu") || 0) + 1);
    if (PREFIX_PATTERNS.some((pattern) => upper.startsWith(pattern) || upper.includes(pattern))) {
      counts.set("prefix", (counts.get("prefix") || 0) + 1);
    }
    if (SUFFIX_PATTERNS.some((pattern) => upper.endsWith(pattern))) {
      counts.set("suffix", (counts.get("suffix") || 0) + 1);
    }
    if (upper.length >= 6) {
      counts.set("long", (counts.get("long") || 0) + 1);
    } else if (upper.length <= 4) {
      counts.set("quick", (counts.get("quick") || 0) + 1);
    }
  }

  return categories.map((category) => ({
    ...category,
    count: counts.get(category.id) || 0,
    total: words.length,
  }));
}

interface ResultScreenProps {
  grid: Grid;
  trie: Trie | null;
  foundWords: FoundWord[];
  totalScore: number;
  mode: "play" | "daily";
  sessionMode?: "timed" | "zen";
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
  sessionMode = "timed",
  dateLabel,
  streak,
  bestCombo,
  onPlayAgain,
}: ResultScreenProps) {
  const [showMissed, setShowMissed] = useState(true);
  const [copied, setCopied] = useState(false);
  const [challengeCopied, setChallengeCopied] = useState(false);
  const [reviewCopied, setReviewCopied] = useState(false);
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

  const missedBreakdown = useMemo(
    () => buildMissedBreakdown(missedWords),
    [missedWords]
  );

  const topMissedCategory = useMemo(
    () => [...missedBreakdown].sort((a, b) => b.count - a.count)[0],
    [missedBreakdown]
  );

  const bestFoundWord = useMemo(
    () =>
      [...foundWords].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.word.length - a.word.length;
      })[0],
    [foundWords]
  );

  const longestFoundWord = useMemo(
    () =>
      [...foundWords].sort((a, b) => {
        if (b.word.length !== a.word.length) return b.word.length - a.word.length;
        return b.score - a.score;
      })[0],
    [foundWords]
  );

  const maxPossible = useMemo(
    () => (hasDictionary ? allWords.reduce((s, w) => s + w.score, 0) : 0),
    [allWords, hasDictionary]
  );

  const challengePath = useMemo(
    () =>
      buildBoardUrl("/challenge", grid, {
        score: totalScore,
        found: foundWords.length,
        max: maxPossible,
        mode,
        session: sessionMode,
        date: dateLabel,
      }),
    [grid, totalScore, foundWords.length, maxPossible, mode, sessionMode, dateLabel]
  );
  const solverPath = useMemo(() => buildBoardUrl("/solver", grid), [grid]);
  const challengeUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? new URL(challengePath, window.location.origin).toString()
        : challengePath,
    [challengePath]
  );
  const solverUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? new URL(solverPath, window.location.origin).toString()
        : solverPath,
    [solverPath]
  );

  const trainingHint = useMemo<TrainingHint | null>(() => {
    if (!hasDictionary || missedWords.length === 0 || !topMissedCategory || topMissedCategory.count === 0) return null;

    if (topMissedCategory.id === "qu") {
      return {
        label: "Training focus: Qu",
        detail: "You missed several Qu words. Next round, check every Q tile first.",
      };
    }

    if (topMissedCategory.id === "prefix") {
      return {
        label: "Training focus: Prefixes",
        detail: "You missed words built from shared prefixes. Scan for stems you can extend into whole families.",
      };
    }

    if (topMissedCategory.id === "suffix") {
      return {
        label: "Training focus: Suffixes",
        detail: "You missed words that end in common suffixes. Look for base words that can stretch into endings.",
      };
    }

    if (topMissedCategory.id === "long") {
      return {
        label: "Training focus: Long words",
        detail: "Longer scoring words were left behind. Prioritize 5+ letter paths earlier in the next game.",
      };
    }

    return {
      label: "Training focus: Quick grabs",
      detail: "Several easy words were available. Start the next board with a quick sweep before hunting long words.",
    };
  }, [hasDictionary, missedWords.length, topMissedCategory]);

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
        : sessionMode === "zen"
        ? "WordGrid Zen"
        : "WordGrid Play";
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
    lines.push(`Challenge: ${challengeUrl}`);

    // Emoji summary: 🟩 found, 🟥 missed (top 20 by score)
    if (hasDictionary) {
      const topWords = allWords.slice(0, 20);
      const emojis = topWords
        .map((w) => (foundSet.has(w.word) ? "🟩" : "🟥"))
        .join("");
      lines.push(emojis);
      lines.push("");
    }
    return lines.join("\n");
  }, [mode, sessionMode, dateLabel, totalScore, maxPossible, percentage, foundWords.length, allWords, foundSet, streak, hasDictionary, bestCombo, challengeUrl]);

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

  const handleCopyChallenge = async () => {
    try {
      await navigator.clipboard.writeText(challengeUrl);
      setChallengeCopied(true);
      setTimeout(() => setChallengeCopied(false), 2000);
    } catch {
      // clipboard may be unavailable
    }
  };

  const reviewSummary = useMemo(() => {
    const boardSize = grid.length;
    const focusLabel = topMissedCategory?.label || "Mixed";
    const focusCount = topMissedCategory?.count || 0;
    const sessionLabel = mode === "daily" ? "Daily" : sessionMode === "zen" ? "Zen" : "Timed";
    const lines = [
      `WordGrid review`,
      `${sessionLabel} · ${boardSize}x${boardSize} · ${totalScore}${hasDictionary ? ` / ${maxPossible} (${percentage}%)` : ""}`,
      `Found: ${foundWords.length}${hasDictionary ? ` / ${allWords.length}` : ""}`,
    ];

    if (bestCombo && bestCombo > 1) {
      lines.push(`Best combo: x${bestCombo}`);
    }
    if (streak && streak > 1) {
      lines.push(`Streak: ${streak}`);
    }
    lines.push(`Training focus: ${focusLabel}${focusCount ? ` (${focusCount})` : ""}`);

    if (bestMissedWords.length > 0) {
      lines.push(`Best missed: ${bestMissedWords.map((word) => word.word).join(", ")}`);
    }

    lines.push(`Challenge: ${challengeUrl}`);
    return lines.join("\n");
  }, [grid.length, mode, sessionMode, totalScore, hasDictionary, maxPossible, percentage, foundWords.length, allWords.length, bestCombo, streak, topMissedCategory, bestMissedWords, challengeUrl]);

  const handleCopyReview = async () => {
    try {
      await navigator.clipboard.writeText(reviewSummary);
      setReviewCopied(true);
      setTimeout(() => setReviewCopied(false), 2000);
    } catch {
      // clipboard may be unavailable
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
      sessionMode,
      score: totalScore,
      foundCount: foundWords.length,
      totalCount: allWords.length,
      maxScore: maxPossible,
      percentage,
      bestCombo: bestCombo ?? 0,
      streak,
      dateLabel,
      boardSize: grid.length,
      focusLabel: topMissedCategory?.label,
      focusCount: topMissedCategory?.count,
    });
  }, [mode, sessionMode, totalScore, foundWords.length, allWords.length, maxPossible, percentage, bestCombo, streak, dateLabel, grid.length, topMissedCategory]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <Confetti fire={fireConfetti} />
      <h2 className="text-center text-3xl font-bold">
        {mode === "daily"
          ? `Daily — ${dateLabel}`
          : sessionMode === "zen"
          ? "Zen Complete"
          : "Game Over"}
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
            <button
              onClick={handleCopyChallenge}
              className="rounded-xl bg-surface px-6 py-3 font-semibold whitespace-nowrap transition hover:bg-surface-hover"
            >
              {challengeCopied ? "Link Copied!" : "Challenge Link"}
            </button>
            <button
              onClick={handleCopyReview}
              className="rounded-xl bg-surface px-6 py-3 font-semibold whitespace-nowrap transition hover:bg-surface-hover"
            >
              {reviewCopied ? "Review Copied!" : "Review Text"}
            </button>
            <a
              href={solverUrl}
              className="rounded-xl bg-surface px-6 py-3 font-semibold whitespace-nowrap transition hover:bg-surface-hover"
            >
              Open Solver
            </a>
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
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {missedBreakdown.map((item) => {
                    const pct = missedWords.length > 0 ? Math.round((item.count / missedWords.length) * 100) : 0;
                    return (
                      <div key={item.id} className="rounded-xl bg-bg/60 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs uppercase tracking-wide text-text-dim">{item.label}</div>
                            <div className="mt-1 text-lg font-bold text-primary">{item.count}</div>
                          </div>
                          <div className="rounded-full bg-surface px-2 py-1 text-xs font-semibold text-text-muted">
                            {pct}%
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-text-muted leading-relaxed">
                          {item.detail}
                        </p>
                        <div className="mt-3 h-2 rounded-full bg-surface overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-400 to-success"
                            style={{ width: `${Math.max(8, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-surface/60 p-3">
                    <div className="text-xs uppercase tracking-wide text-text-muted">
                      Best found
                    </div>
                    <div className="mt-1 font-semibold text-success">
                      {bestFoundWord ? `${bestFoundWord.word} (${bestFoundWord.score})` : "—"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-surface/60 p-3">
                    <div className="text-xs uppercase tracking-wide text-text-muted">
                      Longest found
                    </div>
                    <div className="mt-1 font-semibold text-primary">
                      {longestFoundWord ? `${longestFoundWord.word} (${longestFoundWord.word.length})` : "—"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-surface/60 p-3">
                    <div className="text-xs uppercase tracking-wide text-text-muted">
                      Best missed
                    </div>
                    <div className="mt-1 font-semibold text-danger">
                      {bestMissedWords[0] ? `${bestMissedWords[0].word} (${bestMissedWords[0].score})` : "—"}
                    </div>
                  </div>
                </div>
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
          Daily
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
