// Classic Boggle 16 dice (standard edition)
export const BOGGLE_DICE: string[][] = [
  ["A", "E", "A", "N", "E", "G"],
  ["A", "H", "S", "P", "C", "O"],
  ["A", "S", "P", "F", "F", "K"],
  ["O", "B", "J", "O", "A", "B"],
  ["I", "O", "T", "M", "U", "C"],
  ["R", "Y", "V", "D", "E", "L"],
  ["L", "R", "E", "I", "X", "D"],
  ["E", "I", "U", "N", "E", "S"],
  ["W", "N", "G", "E", "E", "H"],
  ["L", "N", "H", "N", "R", "Z"],
  ["T", "S", "T", "I", "Y", "D"],
  ["O", "W", "T", "O", "A", "T"],
  ["E", "R", "T", "T", "Y", "L"],
  ["T", "O", "E", "S", "S", "I"],
  ["T", "E", "R", "W", "H", "V"],
  ["N", "U", "I", "H", "M", "Qu"],
];

const LETTER_WEIGHTS: Array<[string, number]> = [
  ["A", 9],
  ["B", 2],
  ["C", 3],
  ["D", 4],
  ["E", 12],
  ["F", 2],
  ["G", 3],
  ["H", 2],
  ["I", 9],
  ["J", 1],
  ["K", 1],
  ["L", 4],
  ["M", 2],
  ["N", 6],
  ["O", 8],
  ["P", 2],
  ["Q", 1],
  ["R", 6],
  ["S", 4],
  ["T", 6],
  ["U", 4],
  ["V", 1],
  ["W", 2],
  ["X", 1],
  ["Y", 2],
  ["Z", 1],
  ["Qu", 1],
];

export interface Cell {
  row: number;
  col: number;
  letter: string;
}

export type Grid = Cell[][];

// Mulberry32 seeded PRNG — deterministic for daily challenges
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateGrid(seed: number): Grid {
  return generateGridWithSize(seed, 4);
}

function pickWeightedLetter(rand: () => number): string {
  const total = LETTER_WEIGHTS.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = rand() * total;
  for (const [letter, weight] of LETTER_WEIGHTS) {
    roll -= weight;
    if (roll <= 0) return letter;
  }
  return "E";
}

function generateGridWithSize(seed: number, size: number): Grid {
  const rand = mulberry32(seed);
  const grid: Grid = [];
  const useClassicDice = size === 4;
  let diceOrder: number[] = [];
  if (useClassicDice) {
    diceOrder = [...BOGGLE_DICE.keys()];
    for (let i = diceOrder.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [diceOrder[i], diceOrder[j]] = [diceOrder[j], diceOrder[i]];
    }
  }

  for (let row = 0; row < size; row++) {
    const cells: Cell[] = [];
    for (let col = 0; col < size; col++) {
      if (useClassicDice) {
        const dieIdx = diceOrder[row * size + col];
        const die = BOGGLE_DICE[dieIdx];
        const face = Math.floor(rand() * die.length);
        cells.push({ row, col, letter: die[face] });
      } else {
        cells.push({ row, col, letter: pickWeightedLetter(rand) });
      }
    }
    grid.push(cells);
  }
  return grid;
}

export function generateSizedGrid(seed: number, size: number): Grid {
  return generateGridWithSize(seed, size);
}

// Seed from date string "YYYY-MM-DD"
export function seedFromDate(dateStr: string): number {
  const SALT = 0x574f5244; // "WORD"
  const dateMs = new Date(dateStr + "T00:00:00Z").getTime();
  return Math.floor(dateMs / 86400000) ^ SALT;
}

// UTC+8 date string — ensures all players globally see the same daily board.
// Without this, UTC+12 players see "tomorrow's" board and UTC-12 see "yesterday's".
export function todayDateString(): string {
  const now = new Date();
  // Shift to UTC+8 (Singapore/Western China timezone)
  const utc8 = new Date(now.getTime() + 8 * 3600_000);
  return utc8.toISOString().slice(0, 10);
}

// Milliseconds until the next UTC+8 midnight boundary.
// Used to refresh daily UI state without requiring a manual reload.
export function msUntilNextDailyBoundary(): number {
  const offsetMs = 8 * 3600_000;
  const utc8Now = new Date(Date.now() + offsetMs);
  const nextBoundaryUtcMs = Date.UTC(
    utc8Now.getUTCFullYear(),
    utc8Now.getUTCMonth(),
    utc8Now.getUTCDate() + 1
  );
  return Math.max(0, nextBoundaryUtcMs - offsetMs - Date.now());
}

function areAdjacent(
  r1: number, c1: number,
  r2: number, c2: number
): boolean {
  return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1 &&
    !(r1 === r2 && c1 === c2);
}

export function isValidPath(cells: { row: number; col: number }[]): boolean {
  if (cells.length < 2) return false;
  for (let i = 1; i < cells.length; i++) {
    if (!areAdjacent(cells[i - 1].row, cells[i - 1].col, cells[i].row, cells[i].col)) {
      return false;
    }
    for (let j = 0; j < i; j++) {
      if (cells[j].row === cells[i].row && cells[j].col === cells[i].col) {
        return false;
      }
    }
  }
  return true;
}

// Scoring (custom — not Scrabble)
export function scoreWord(word: string): number {
  const len = word.length;
  if (len < 3) return 0;
  if (len === 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 4;
  if (len === 6) return 6;
  return 8 + (len - 7) * 2;
}
