"use client";

import { useState, useEffect } from "react";
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
    setStatus(getStreakStatus());
  }, []);

  if (!status || status.data.totalPlayed === 0) return null;

  const { data, isAtRisk } = status;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-900/30 rounded-full text-sm">
        <span className="text-lg leading-none">{data.currentStreak >= 3 ? "🔥" : "✨"}</span>
        <span className="text-orange-300 font-semibold">{data.currentStreak}</span>
        <span className="text-slate-500 text-xs">day streak</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-sm">
      {/* Current streak */}
      <div className="text-center">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-2xl">{data.currentStreak >= 3 ? "🔥" : "✨"}</span>
          <span className="text-3xl font-bold text-orange-400">{data.currentStreak}</span>
        </div>
        <div className="text-slate-500 text-xs uppercase tracking-wide">Current</div>
      </div>

      <div className="w-px h-10 bg-slate-700" />

      {/* Best streak */}
      <div className="text-center">
        <div className="text-3xl font-bold text-amber-400">{data.longestStreak}</div>
        <div className="text-slate-500 text-xs uppercase tracking-wide">Best</div>
      </div>

      <div className="w-px h-10 bg-slate-700" />

      {/* Total played */}
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-300">{data.totalPlayed}</div>
        <div className="text-slate-500 text-xs uppercase tracking-wide">Total</div>
      </div>

      {/* At-risk warning */}
      {isAtRisk && data.currentStreak >= 2 && (
        <div className="ml-2 text-xs text-orange-400/80 animate-pulse">
          Don't break your streak!
        </div>
      )}
    </div>
  );
}
