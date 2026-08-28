import { generateGrid, seedFromDate, todayDateString, type Grid } from "@/lib/boggle";
import { Trie } from "@/lib/dictionary";
import { loadWordList } from "@/lib/worddata";
import { solveBoard } from "@/lib/solver";

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
  totalWords: number;
  totalPossibleScore: number;
  longestWords: string[];
  bestWords: { word: string; score: number }[];
}

export const DAILY_ARCHIVE_DAYS = 30;

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function shiftDate(dateStr: string, deltaDays: number): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

let archiveTrie: Trie | null = null;

function getArchiveTrie(): Trie {
  if (archiveTrie) return archiveTrie;
  archiveTrie = new Trie();
  for (const word of loadWordList()) {
    archiveTrie.insert(word);
  }
  return archiveTrie;
}

function solveArchiveGrid(grid: Grid) {
  const solved = solveBoard(grid, getArchiveTrie());
  const totalPossibleScore = solved.reduce((sum, item) => sum + item.score, 0);
  const longestLength = Math.max(...solved.map((item) => item.word.length), 0);
  const longestWords = solved
    .filter((item) => item.word.length === longestLength)
    .map((item) => item.word)
    .slice(0, 10);
  const bestWords = solved.slice(0, 10).map((item) => ({
    word: item.word,
    score: item.score,
  }));

  return {
    totalWords: solved.length,
    totalPossibleScore,
    longestWords,
    bestWords,
  };
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
      ...solveArchiveGrid(grid),
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
      ...solveArchiveGrid(grid),
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
      ...solveArchiveGrid(grid),
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
      ...solveArchiveGrid(grid),
    };
  }

  return {
    vowels,
    quCount,
    uniqueLetters,
    repeatedLetters,
    label: "Balanced board",
    detail: "A well-rounded grid usually rewards a steady, systematic scan.",
    ...solveArchiveGrid(grid),
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
