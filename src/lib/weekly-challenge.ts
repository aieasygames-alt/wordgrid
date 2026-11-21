import { generateGrid, type Grid } from "./boggle";
import { Trie } from "./dictionary";
import { solveBoard } from "./solver";
import { loadWordList } from "./worddata";

export type WeeklyChallenge = {
  id: string;
  title: string;
  detail: string;
  focus: "qu" | "long" | "quick";
  grid: Grid;
};

// Keep already published boards stable, including the current week's challenge.
const QUALITY_CHECKED_FROM = "2026-11-23";
const MIN_THEME_WORDS = 3;
let weeklyTrie: Trie | undefined;

function getWeeklyTrie(): Trie {
  if (!weeklyTrie) {
    weeklyTrie = new Trie();
    for (const word of loadWordList()) weeklyTrie.insert(word);
  }
  return weeklyTrie;
}

function hasThemeWords(grid: Grid, focus: WeeklyChallenge["focus"]): boolean {
  if (focus === "qu" && !grid.flat().some((cell) => cell.letter === "Qu")) return false;
  return solveBoard(grid, getWeeklyTrie()).filter(({ word }) =>
    focus === "qu" ? word.includes("QU") : focus === "long" ? word.length >= 5 : word.length <= 4
  ).length >= MIN_THEME_WORDS;
}

function mondayUtc(date = new Date()): Date {
  const value = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = value.getUTCDay() || 7;
  value.setUTCDate(value.getUTCDate() - day + 1);
  return value;
}

function weekId(date = new Date()): string {
  return mondayUtc(date).toISOString().slice(0, 10);
}

function seedFromWeek(id: string): number {
  return [...id].reduce((seed, char) => ((seed * 31) + char.charCodeAt(0)) >>> 0, 17);
}

export function getWeeklyChallenge(date = new Date()): WeeklyChallenge {
  const id = weekId(date);
  const index = Math.floor(Date.parse(`${id}T00:00:00Z`) / 604800000) % 3;
  const themes: Array<Omit<WeeklyChallenge, "id" | "grid">> = [
    {
      title: "Qu Hunt",
      detail: "This week, scan the Qu tile early and build outward through nearby vowels.",
      focus: "qu",
    },
    {
      title: "Long Word Run",
      detail: "This week, slow down long enough to extend promising paths into 5+ letter words.",
      focus: "long",
    },
    {
      title: "Quick Grab Sprint",
      detail: "This week, sweep for short, reliable words first, then return for higher-value paths.",
      focus: "quick",
    },
  ];
  const theme = themes[index];
  const seed = seedFromWeek(id);
  if (id < QUALITY_CHECKED_FROM) return { id, ...theme, grid: generateGrid(seed) };

  // Selection runs at build time with the actual game dictionary, never in the
  // browser. The same week and dictionary always choose the same candidate.
  for (let attempt = 0; attempt < 2048; attempt++) {
    const grid = generateGrid((seed + attempt) >>> 0);
    if (hasThemeWords(grid, theme.focus)) return { id, ...theme, grid };
  }
  throw new Error(`Could not generate a playable ${theme.focus} challenge for ${id}.`);
}
