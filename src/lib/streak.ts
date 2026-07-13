// Streak system for Daily board
// Tracks consecutive days played, best streak, and total games.

import { todayDateString } from "./boggle";

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalPlayed: number;
  lastPlayedDate: string; // YYYY-MM-DD (UTC+8)
}

const STORAGE_KEY = "wordgrid-streak";

function getYesterday(): string {
  const now = new Date();
  const utc8 = new Date(now.getTime() + 8 * 3600_000 - 86400_000);
  return utc8.toISOString().slice(0, 10);
}

function defaultStreak(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalPlayed: 0,
    lastPlayedDate: "",
  };
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") return defaultStreak();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStreak();
    return { ...defaultStreak(), ...JSON.parse(raw) };
  } catch {
    return defaultStreak();
  }
}

/**
 * Record a daily challenge completion.
 * - If played yesterday → streak continues (+1)
 * - If already played today → no-op (idempotent)
 * - If gap > 1 day → streak resets to 1
 * Returns updated streak data.
 */
export function recordDailyPlay(): StreakData {
  const today = todayDateString();
  const prev = getStreak();

  // Already played today — return as-is
  if (prev.lastPlayedDate === today) return prev;

  const yesterday = getYesterday();
  const newStreak = prev.lastPlayedDate === yesterday ? prev.currentStreak + 1 : 1;

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(prev.longestStreak, newStreak),
    totalPlayed: prev.totalPlayed + 1,
    lastPlayedDate: today,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage full or blocked
    }
  }

  return updated;
}

/**
 * Check if user has already played today's challenge.
 */
export function hasPlayedToday(): boolean {
  const data = getStreak();
  return data.lastPlayedDate === todayDateString();
}

/**
 * Get streak status for display — includes "at risk" warning.
 * If user's last play was >1 day ago but today, streak is broken.
 */
export function getStreakStatus(): {
  data: StreakData;
  isActive: boolean;     // played today
  isAtRisk: boolean;     // hasn't played today but has a streak to lose
  isBroken: boolean;      // streak broken (gap > 1 day)
} {
  const data = getStreak();
  const today = todayDateString();

  if (data.lastPlayedDate === today) {
    return { data, isActive: true, isAtRisk: false, isBroken: false };
  }

  const yesterday = getYesterday();
  if (data.lastPlayedDate === yesterday && data.currentStreak > 0) {
    return { data, isActive: false, isAtRisk: true, isBroken: false };
  }

  return { data, isActive: false, isAtRisk: false, isBroken: data.currentStreak > 0 };
}
