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
  return mode === "daily" ? "Daily" : "Play";
}

function sessionLabel(mode?: GameHistoryEntry["sessionMode"]): string {
  return mode === "zen" ? "Zen" : "Timed";
}

export default function StatsClient() {
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadGameHistory());
  }, []);

  const summary = useMemo(() => summarizeGameHistory(history), [history]);
  const streak = useMemo(() => getStreak(), []);

  const sessionBreakdown = useMemo(() => {
    const counts = history.reduce(
      (acc, entry) => {
        acc[entry.sessionMode === "zen" ? "zen" : "timed"] += 1;
        return acc;
      },
      { timed: 0, zen: 0 }
    );
    return counts;
  }, [history]);

  const focusBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of history) {
      if (!entry.focusLabel) continue;
      counts.set(entry.focusLabel, (counts.get(entry.focusLabel) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [history]);

  const boardSizeBreakdown = useMemo(() => {
    const counts = new Map<number, number>();
    for (const entry of history) {
      if (!entry.boardSize) continue;
      counts.set(entry.boardSize, (counts.get(entry.boardSize) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([size, count]) => ({ size, count }))
      .sort((a, b) => b.count - a.count);
  }, [history]);

  const handleClear = () => {
    clearGameHistory();
    setHistory([]);
  };

  const handleExport = () => {
    if (history.length === 0) return;
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wordgrid-history-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <article className="mx-auto max-w-7xl">
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
              <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold shadow-lg shadow-primary/20">
                Play
              </Link>
              <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Daily
              </Link>
              <Link href="/daily/archive" className="px-4 py-2 rounded-xl border border-border bg-transparent hover:bg-surface transition font-semibold text-text-muted hover:text-text">
                Archive
              </Link>
              <Link href="/solver" className="px-4 py-2 rounded-xl border border-border bg-transparent hover:bg-surface transition font-semibold text-text-muted hover:text-text">
                Solver
              </Link>
            </div>
          </div>
        </header>

        {summary.totalGames === 0 ? (
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-start">
            <div className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8 shadow-xl shadow-black/10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
                No games yet on this device
              </h2>
              <p className="mt-3 text-text-muted leading-relaxed max-w-2xl">
                Play a few rounds and come back here to see your best score,
                combo streak, and daily board progress. Everything stays local
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

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-bg/50 p-4">
                  <div className="text-xs uppercase tracking-wide text-text-dim">Games</div>
                  <div className="mt-2 text-2xl font-bold text-primary">0</div>
                  <div className="mt-1 text-sm text-text-muted">Your first run will appear here.</div>
                </div>
                <div className="rounded-2xl bg-bg/50 p-4">
                  <div className="text-xs uppercase tracking-wide text-text-dim">Streak</div>
                  <div className="mt-2 text-2xl font-bold text-success">0</div>
                  <div className="mt-1 text-sm text-text-muted">Daily play starts the streak.</div>
                </div>
                <div className="rounded-2xl bg-bg/50 p-4">
                  <div className="text-xs uppercase tracking-wide text-text-dim">Best combo</div>
                  <div className="mt-2 text-2xl font-bold text-primary">x0</div>
                  <div className="mt-1 text-sm text-text-muted">Chain a few finds to set a baseline.</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-8">
              <div className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-primary">What this page will track</h2>
                <div className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed">
                  <div className="rounded-2xl bg-bg/50 p-4">
                    Best score, best combo, and average completion across sessions.
                  </div>
                  <div className="rounded-2xl bg-bg/50 p-4">
                    Daily streak progress and how often you choose timed versus Zen play.
                  </div>
                  <div className="rounded-2xl bg-bg/50 p-4">
                    Your most common missed patterns, board sizes, and recent games.
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-text">Good first steps</h2>
                <div className="mt-4 grid gap-2">
                  <Link href="/play" className="rounded-xl bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-hover transition">
                    Play a timed round
                  </Link>
                  <Link href="/daily" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                    Try today's board
                  </Link>
                  <Link href="/zen" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                    Practice in Zen
                  </Link>
                </div>
              </div>
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

            <section className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Recent Games</h2>
                    <p className="text-sm text-text-muted mt-1">
                      The last {summary.recent.length} sessions on this device.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleExport}
                  disabled={history.length === 0}
                  className="text-sm font-semibold text-text-muted hover:text-text transition disabled:opacity-50"
                >
                  Export backup
                </button>
                <button
                  onClick={handleClear}
                  className="text-sm font-semibold text-text-muted hover:text-text transition"
                >
                  Clear history
                </button>
              </div>
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

              <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
                <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                  <h2 className="text-2xl font-semibold">Play Mix</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-bg/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-text-dim">Timed</div>
                      <div className="text-3xl font-bold text-primary mt-1">{sessionBreakdown.timed}</div>
                    </div>
                    <div className="rounded-2xl bg-bg/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-text-dim">Zen</div>
                      <div className="text-3xl font-bold text-success mt-1">{sessionBreakdown.zen}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-text-muted leading-relaxed">
                    {sessionBreakdown.zen > sessionBreakdown.timed
                      ? "You lean toward low-pressure Zen. Consider mixing in more timed runs for speed."
                      : "You lean toward timed play. Zen can help reinforce pattern recognition without the clock."}
                  </p>
                </div>

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
                            <div className="font-semibold text-sm">{modeLabel(entry.mode)} · {sessionLabel(entry.sessionMode)}</div>
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

                {focusBreakdown.length > 0 && (
                  <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                    <h2 className="text-2xl font-semibold">Common Misses</h2>
                    <div className="mt-4 space-y-2">
                      {focusBreakdown.map((item) => (
                        <div key={item.label} className="rounded-2xl bg-bg/60 px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-semibold text-sm text-text">{item.label}</div>
                            <div className="text-sm font-bold text-primary">{item.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {boardSizeBreakdown.length > 0 && (
                  <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                    <h2 className="text-2xl font-semibold">Board Sizes</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {boardSizeBreakdown.map((item) => (
                        <span key={item.size} className="rounded-full bg-bg/70 px-3 py-1.5 text-sm font-semibold text-text">
                          {item.size}x{item.size} · {item.count}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
