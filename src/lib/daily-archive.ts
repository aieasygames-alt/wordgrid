import { generateGrid, seedFromDate, todayDateString, type Grid } from "@/lib/boggle";

export interface DailyArchiveEntry {
  date: string;
  seed: number;
  grid: Grid;
  vowels: number;
  quCount: number;
  uniqueLetters: number;
  repeatedLetters: number;
  label: string;
  detail: string;
}

export const DAILY_ARCHIVE_DAYS = 30;

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function shiftDate(dateStr: string, deltaDays: number): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

function analyzeGrid(grid: Grid): Omit<DailyArchiveEntry, "date" | "seed" | "grid"> {
  const tiles = grid.flat().map((cell) => cell.letter.toUpperCase());
  const normalized = tiles.map((letter) => (letter === "QU" ? "Q" : letter));
  const quCount = tiles.filter((letter) => letter === "QU").length;
  const vowels = normalized.filter((letter) => VOWELS.has(letter)).length;
  const uniqueLetters = new Set(normalized).size;
  const repeatedLetters = normalized.length - uniqueLetters;

  if (quCount > 0) {
    return {
      vowels,
      quCount,
      uniqueLetters,
      repeatedLetters,
      label: "Qu board",
      detail: "Qu-heavy boards reward fast Q scanning and nearby vowel paths.",
    };
  }

  if (vowels >= 6) {
    return {
      vowels,
      quCount,
      uniqueLetters,
      repeatedLetters,
      label: "Vowel-heavy",
      detail: "These boards usually reward quick word chaining and flexible endings.",
    };
  }

  if (vowels <= 3) {
    return {
      vowels,
      quCount,
      uniqueLetters,
      repeatedLetters,
      label: "Consonant-heavy",
      detail: "Expect tighter paths, stronger prefix hunting, and more compact words.",
    };
  }

  if (repeatedLetters >= 5) {
    return {
      vowels,
      quCount,
      uniqueLetters,
      repeatedLetters,
      label: "Pattern-heavy",
      detail: "Repeated letters tend to create familiar clusters and reusable word families.",
    };
  }

  return {
    vowels,
    quCount,
    uniqueLetters,
    repeatedLetters,
    label: "Balanced board",
    detail: "A well-rounded grid usually rewards a steady, systematic scan.",
  };
}

function formatDay(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateStr}T00:00:00Z`));
}

export function getRecentDailyArchive(limit = 14, anchorDate = todayDateString()): DailyArchiveEntry[] {
  return Array.from({ length: limit }, (_, index) => {
    const date = shiftDate(anchorDate, -index);
    const seed = seedFromDate(date);
    const grid = generateGrid(seed);
    const metrics = analyzeGrid(grid);
    return {
      date,
      seed,
      grid,
      ...metrics,
    };
  });
}

export function getDailyArchiveEntry(date: string): DailyArchiveEntry | null {
  return getRecentDailyArchive(DAILY_ARCHIVE_DAYS).find((entry) => entry.date === date) || null;
}

export function getDailyArchiveDates(limit = DAILY_ARCHIVE_DAYS, anchorDate = todayDateString()): string[] {
  return Array.from({ length: limit }, (_, index) => shiftDate(anchorDate, -index));
}

export function formatArchiveDate(dateStr: string): string {
  return formatDay(dateStr);
}
