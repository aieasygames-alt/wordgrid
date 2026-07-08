"use client";

import { useState, useEffect } from "react";
import { msUntilNextDailyBoundary } from "@/lib/boggle";
import { getStreakStatus, type StreakData } from "@/lib/streak";

interface StreakDisplayProps {
  compact?: boolean; // small inline version for headers
}

export default function StreakDisplay({ compact = false }: StreakDisplayProps) {
  const [status, setStatus] = useState<{
    data: StreakData;
    isActive: boolean;
    isAtRisk: boolean;
    isBroken: boolean;
  } | null>(null);

  useEffect(() => {
    let timer: number | null = null;

    const refresh = () => {
      setStatus(getStreakStatus());
    };

    const schedule = () => {
      timer = window.setTimeout(() => {
        refresh();
        schedule();
      }, msUntilNextDailyBoundary() + 1000);
    };

    refresh();
    schedule();
    return () => {
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  if (!status || status.data.totalPlayed === 0) return null;

  const { data, isAtRisk } = status;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 rounded-full text-sm">
        <span className="text-lg leading-none">{data.currentStreak >= 3 ? "🔥" : "✨"}</span>
        <span className="text-accent font-semibold">{data.currentStreak}</span>
        <span className="text-text-dim text-xs">day streak</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-sm">
      {/* Current streak */}
      <div className="text-center">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-2xl">{data.currentStreak >= 3 ? "🔥" : "✨"}</span>
          <span className="text-3xl font-bold text-accent">{data.currentStreak}</span>
        </div>
        <div className="text-text-dim text-xs uppercase tracking-wide">Current</div>
      </div>

      <div className="w-px h-10 bg-surface-hover" />

      {/* Best streak */}
      <div className="text-center">
        <div className="text-3xl font-bold text-accent">{data.longestStreak}</div>
        <div className="text-text-dim text-xs uppercase tracking-wide">Best</div>
      </div>

      <div className="w-px h-10 bg-surface-hover" />

      {/* Total played */}
      <div className="text-center">
        <div className="text-3xl font-bold text-text">{data.totalPlayed}</div>
        <div className="text-text-dim text-xs uppercase tracking-wide">Total</div>
      </div>

      {/* At-risk warning */}
      {isAtRisk && data.currentStreak >= 2 && (
        <div className="ml-2 text-xs text-accent/80 animate-pulse">
          Don't break your streak!
        </div>
      )}
    </div>
  );
}
