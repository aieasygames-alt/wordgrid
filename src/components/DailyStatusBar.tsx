"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { msUntilNextDailyBoundary, todayDateString } from "@/lib/boggle";
import { getStreakStatus } from "@/lib/streak";
import { loadGameHistory, summarizeGameHistory } from "@/lib/game-history";

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export default function DailyStatusBar({ mode = "daily" }: { mode?: "daily" | "weekly" }) {
  const [refreshMs, setRefreshMs] = useState(msUntilNextDailyBoundary());
  const [playedToday, setPlayedToday] = useState(false);
  const [streak, setStreak] = useState(0);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setRefreshMs(msUntilNextDailyBoundary());
      const status = getStreakStatus();
      setPlayedToday(status.isActive);
      setStreak(status.data.currentStreak);
      setAverage(summarizeGameHistory(loadGameHistory()).averageScore);
    };
    refresh();
    const timer = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const isWeekly = mode === "weekly";
  return (
    <section className="mb-5 grid gap-2 sm:grid-cols-3" aria-label={`${mode} status`}>
      <div className="border border-border bg-surface/60 px-4 py-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">{isWeekly ? "This week" : "Today"}</div>
        <div className="mt-1 font-semibold text-text">{isWeekly ? "Themed board ready" : playedToday ? "Completed" : "Not played yet"}</div>
      </div>
      <div className="border border-border bg-surface/60 px-4 py-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">{isWeekly ? "Daily reset" : "Next board"}</div>
        <div className="mt-1 font-semibold tabular-nums text-text">{formatCountdown(refreshMs)}</div>
      </div>
      <div className="border border-border bg-surface/60 px-4 py-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Your baseline</div>
        <div className="mt-1 font-semibold text-text">{average > 0 ? `${average.toFixed(0)} avg · ${streak} day streak` : <Link href="/stats" className="text-primary hover:underline">Play to set a baseline</Link>}</div>
      </div>
    </section>
  );
}
