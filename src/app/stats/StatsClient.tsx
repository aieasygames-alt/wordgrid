"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { clearGameHistory, loadGameHistory, summarizeGameHistory, type GameHistoryEntry } from "@/lib/game-history";
import { getStreak } from "@/lib/streak";

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function modeLabel(mode: GameHistoryEntry["mode"]): string {
  return mode === "daily" ? "Daily" : "Practice";
}

export default function StatsClient() {
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadGameHistory());
  }, []);

  const summary = useMemo(() => summarizeGameHistory(history), [history]);
  const streak = useMemo(() => getStreak(), []);

  const handleClear = () => {
    clearGameHistory();
    setHistory([]);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <article className="max-w-6xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <span className="text-text">Stats</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Your WordGrid Progress
              </h1>
              <p className="mt-4 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
                This page reads your local game history on this device, so you can
                see whether your score, combo, and daily habit are moving in the
                right direction.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                Play again
              </Link>
              <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Daily challenge
              </Link>
              <Link href="/daily/archive" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Archive
              </Link>
              <Link href="/solver" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Solver
              </Link>
            </div>
          </div>
        </header>

        {summary.totalGames === 0 ? (
          <section className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-primary">No games yet on this device</h2>
            <p className="mt-3 text-text-muted leading-relaxed max-w-2xl">
              Play a few rounds and come back here to see your best score,
              combo streak, and daily challenge progress. Everything stays local
              to your browser.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                Start playing
              </Link>
              <Link href="/daily/archive" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Browse archive
              </Link>
              <Link href="/solver" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Try the solver
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Games played" value={summary.totalGames} detail={`${summary.dailyGames} daily · ${summary.practiceGames} practice`} />
              <StatCard label="Best score" value={summary.bestScore} detail="Highest raw score on this device" />
              <StatCard label="Best combo" value={`x${summary.bestCombo || 0}`} detail="Longest streak of clean finds" />
              <StatCard label="Current streak" value={`${streak.currentStreak || 0}`} detail={`${streak.longestStreak || 0} best streak · daily only`} />
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Average score" value={summary.averageScore.toFixed(1)} detail="Across all recorded games" />
              <StatCard label="Average completion" value={`${summary.averagePercentage.toFixed(0)}%`} detail="How much of each board you solved" />
              <StatCard label="Total score" value={summary.totalScore} detail="Sum of recorded session scores" />
              <StatCard label="Best completion" value={`${summary.bestPercentage.toFixed(0)}%`} detail="Best recorded solve rate" />
            </section>

            <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Recent Games</h2>
                    <p className="text-sm text-text-muted mt-1">
                      The last {summary.recent.length} sessions on this device.
                    </p>
                  </div>
                  <button
                    onClick={handleClear}
                    className="text-sm font-semibold text-text-muted hover:text-text transition"
                  >
                    Clear history
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {summary.recent.map((entry) => {
                    const width = `${Math.max(8, entry.percentage)}%`;
                    return (
                      <div key={entry.id} className="rounded-2xl border border-border bg-bg/50 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                entry.mode === "daily" ? "bg-success-bg/30 text-success" : "bg-primary/20 text-primary"
                              }`}>
                                {modeLabel(entry.mode)}
                              </span>
                              <span className="text-sm text-text-muted">
                                {entry.dateLabel || formatDate(entry.playedAt)}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-4 text-sm">
                              <span className="font-semibold text-text">{entry.score} pts</span>
                              <span className="text-text-muted">{entry.foundCount}/{entry.totalCount} words</span>
                              <span className="text-text-muted">Combo x{entry.bestCombo || 0}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">{entry.percentage.toFixed(0)}%</div>
                          </div>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-surface overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-400 to-success"
                            style={{ width }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                  <h2 className="text-2xl font-semibold">Streak Snapshot</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-bg/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-text-dim">Current streak</div>
                      <div className="text-3xl font-bold text-primary mt-1">{streak.currentStreak}</div>
                    </div>
                    <div className="rounded-2xl bg-bg/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-text-dim">Longest streak</div>
                      <div className="text-3xl font-bold text-success mt-1">{streak.longestStreak}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-text-muted leading-relaxed">
                    Your streak data is already tracked separately for daily
                    play. This page gives you the performance side so you can
                    see both habit and skill.
                  </p>
                </div>

                <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                  <h2 className="text-2xl font-semibold">Best Sessions</h2>
                  <div className="mt-4 space-y-2">
                    {[...history]
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 5)
                      .map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between gap-3 rounded-2xl bg-bg/60 px-4 py-3">
                          <div>
                            <div className="font-semibold text-sm">{modeLabel(entry.mode)}</div>
                            <div className="text-xs text-text-muted">{entry.score} pts · {entry.foundCount} words</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-primary">{entry.percentage.toFixed(0)}%</div>
                            <div className="text-xs text-text-dim">x{entry.bestCombo || 0}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </article>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
      <div className="text-xs uppercase tracking-wide text-text-dim font-semibold">{label}</div>
      <div className="mt-2 text-3xl sm:text-4xl font-bold text-primary tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-text-muted leading-relaxed">{detail}</div>
    </div>
  );
}
