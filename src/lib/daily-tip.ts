import { generateGrid, seedFromDate, todayDateString, type Grid } from "@/lib/boggle";

export interface TodayActionTip {
  label: string;
  title: string;
  detail: string;
  action: string;
  boardNote: string;
}

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function analyzeBoard(grid: Grid): TodayActionTip {
  const letters = grid.flat().map((cell) => cell.letter.toUpperCase());
  const normalized = letters.map((letter) => (letter === "QU" ? "Q" : letter));
  const quCount = letters.filter((letter) => letter === "QU").length;
  const vowels = normalized.filter((letter) => VOWELS.has(letter)).length;
  const uniqueLetters = new Set(normalized).size;
  const repeatedLetters = normalized.length - uniqueLetters;

  const counts = new Map<string, number>();
  for (const letter of normalized) {
    counts.set(letter, (counts.get(letter) || 0) + 1);
  }
  const topStart = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];

  if (quCount > 0) {
    return {
      label: "Today's tip",
      title: "Start with Qu before anything else",
      detail:
        "Qu is the fastest special-case tile to turn into value. Trace the nearby vowels first, then look for a second branch from the same corner.",
      action: "Check every Qu path first",
      boardNote: "This board rewards quick Q scanning and nearby vowel pairs.",
    };
  }

  if (vowels <= 3) {
    return {
      label: "Today's tip",
      title: "Anchor on vowels, then branch out",
      detail:
        "Consonant-heavy boards punish random scanning. Find each vowel, then fan out through the surrounding consonants to build usable stems.",
      action: "Find all vowels first",
      boardNote: "This board is tighter than average, so stems matter more than single words.",
    };
  }

  if (repeatedLetters >= 5) {
    return {
      label: "Today's tip",
      title: "Reuse one stem for a whole family",
      detail:
        "Repeated letters usually hide small word families. Once you find one root, test plural, tense, and prefix variants around it.",
      action: "Extend every base word",
      boardNote: "The board has enough repetition to reward family scanning.",
    };
  }

  if (topStart && topStart[1] >= 4) {
    return {
      label: "Today's tip",
      title: `Sweep the ${topStart[0]} cluster first`,
      detail:
        "This board has a dense starting-letter cluster. Build momentum by clearing one letter family before moving on to a new region.",
      action: `Scan words starting with ${topStart[0]}`,
      boardNote: "One starting letter appears more often than the others.",
    };
  }

  return {
    label: "Today's tip",
    title: "Use a balanced first pass",
    detail:
      "This is a well-rounded board, so the best move is a steady scan: take the obvious 4-letter words, then revisit them for longer extensions.",
    action: "Take a systematic first sweep",
    boardNote: "Nothing jumps out as extreme, so consistency wins here.",
  };
}

export function getTodayActionTip(date = todayDateString()): TodayActionTip {
  const grid = generateGrid(seedFromDate(date));
  return analyzeBoard(grid);
}

export function getBoardActionTip(grid: Grid): TodayActionTip {
  return analyzeBoard(grid);
}
