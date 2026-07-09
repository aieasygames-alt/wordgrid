export type GameMode = "play" | "daily";

export interface GameHistoryEntry {
  id: string;
  playedAt: string;
  mode: GameMode;
  score: number;
  foundCount: number;
  totalCount: number;
  maxScore: number;
  percentage: number;
  bestCombo: number;
  streak?: number;
  dateLabel?: string;
}

export interface GameHistorySummary {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  bestPercentage: number;
  bestCombo: number;
  averageScore: number;
  averagePercentage: number;
  dailyGames: number;
  practiceGames: number;
  recent: GameHistoryEntry[];
}

const STORAGE_KEY = "wordgrid-game-history";
const MAX_ENTRIES = 60;

function safeRandomId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function loadGameHistory(): GameHistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        id: String(item.id || safeRandomId()),
        playedAt: String(item.playedAt || new Date().toISOString()),
        mode: item.mode === "daily" ? "daily" : "play",
        score: Number(item.score) || 0,
        foundCount: Number(item.foundCount) || 0,
        totalCount: Number(item.totalCount) || 0,
        maxScore: Number(item.maxScore) || 0,
        percentage: Number(item.percentage) || 0,
        bestCombo: Number(item.bestCombo) || 0,
        streak: typeof item.streak === "number" ? item.streak : undefined,
        dateLabel: typeof item.dateLabel === "string" ? item.dateLabel : undefined,
      } satisfies GameHistoryEntry))
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

export function recordGameHistory(
  entry: Omit<GameHistoryEntry, "id" | "playedAt">
): GameHistoryEntry | null {
  if (typeof window === "undefined") return null;

  const next: GameHistoryEntry = {
    ...entry,
    id: safeRandomId(),
    playedAt: new Date().toISOString(),
  };

  try {
    const history = loadGameHistory();
    const nextHistory = [next, ...history].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
  } catch {
    // localStorage may be blocked or full
  }

  return next;
}

export function clearGameHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function summarizeGameHistory(history: GameHistoryEntry[]): GameHistorySummary {
  const totalGames = history.length;
  const totalScore = history.reduce((sum, entry) => sum + entry.score, 0);
  const bestScore = history.reduce((best, entry) => Math.max(best, entry.score), 0);
  const bestPercentage = history.reduce((best, entry) => Math.max(best, entry.percentage), 0);
  const bestCombo = history.reduce((best, entry) => Math.max(best, entry.bestCombo), 0);
  const averageScore = totalGames > 0 ? totalScore / totalGames : 0;
  const averagePercentage = totalGames > 0
    ? history.reduce((sum, entry) => sum + entry.percentage, 0) / totalGames
    : 0;
  const dailyGames = history.filter((entry) => entry.mode === "daily").length;
  const practiceGames = history.filter((entry) => entry.mode === "play").length;

  return {
    totalGames,
    totalScore,
    bestScore,
    bestPercentage,
    bestCombo,
    averageScore,
    averagePercentage,
    dailyGames,
    practiceGames,
    recent: history.slice(0, 10),
  };
}
