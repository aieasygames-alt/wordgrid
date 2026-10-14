import { isValidPath, scoreWord } from "./boggle";

export const COMPLETE_RULES_VERSION = "1";
export interface CompletePuzzle {
  id: string;
  date: string;
  version: string;
  rulesVersion: string;
  dictionaryVersion: string;
  board: string[][];
  requiredWords: string[];
  bonusWords: string[];
  difficulty: "Gentle" | "Steady" | "Stretch";
}
export interface CompleteBank {
  version: string;
  startDate: string;
  endDate: string;
  puzzles: CompletePuzzle[];
}
export interface CompleteProgress {
  found: string[];
  revealed: string[];
}
export type Position = { row: number; col: number };

export function completeDate(now = new Date()): string {
  return new Date(now.getTime() + 8 * 3600_000).toISOString().slice(0, 10);
}

export function selectCompletePuzzle(bank: CompleteBank, date: string) {
  const daily = bank.puzzles.find((puzzle) => puzzle.date === date);
  return { puzzle: daily ?? bank.puzzles[0], practice: !daily };
}

export function progressKey(puzzle: CompletePuzzle, practice = false): string {
  return `wordgrid-complete-v1:${practice ? "practice:" : ""}${puzzle.id}:${puzzle.version}:${puzzle.rulesVersion}:${puzzle.dictionaryVersion}`;
}

export function wordFromPath(puzzle: CompletePuzzle, path: Position[]): string | null {
  if (!isValidPath(path)) return null;
  let word = "";
  for (const { row, col } of path) {
    if (!Number.isInteger(row) || !Number.isInteger(col)) return null;
    const letter = puzzle.board[row]?.[col];
    if (!letter || !/^(?:[A-Z]|Qu)$/.test(letter)) return null;
    word += letter.toUpperCase();
  }
  return word.length >= 4 ? word : null;
}

export function findCompletePath(puzzle: CompletePuzzle, input: string): Position[] | null {
  const word = input.trim().toUpperCase();
  if (!/^[A-Z]{4,16}$/.test(word)) return null;
  const visit = (row: number, col: number, offset: number, path: Position[]): Position[] | null => {
    const letter = puzzle.board[row]?.[col]?.toUpperCase();
    if (!letter || path.some((cell) => cell.row === row && cell.col === col) || !word.startsWith(letter, offset)) return null;
    const next = [...path, { row, col }];
    const end = offset + letter.length;
    if (end === word.length) return next;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const result = visit(row + dr, col + dc, end, next);
      if (result) return result;
    }
    return null;
  };
  for (let row = 0; row < puzzle.board.length; row++) for (let col = 0; col < puzzle.board[row].length; col++) {
    const path = visit(row, col, 0, []);
    if (path) return path;
  }
  return null;
}

export function checkCompleteWord(puzzle: CompletePuzzle, input: string, found: string[]) {
  const word = input.trim().toUpperCase();
  if (found.includes(word)) return { word, kind: "duplicate" as const };
  if (!findCompletePath(puzzle, word)) return { word, kind: "invalid" as const };
  if (puzzle.requiredWords.includes(word)) return { word, kind: "required" as const };
  if (puzzle.bonusWords.includes(word)) return { word, kind: "bonus" as const };
  return { word, kind: "unknown" as const };
}

export function cleanProgress(puzzle: CompletePuzzle, raw: unknown): CompleteProgress {
  if (!raw || typeof raw !== "object") return { found: [], revealed: [] };
  const value = raw as Partial<CompleteProgress>;
  const allowed = new Set([...puzzle.requiredWords, ...puzzle.bonusWords]);
  const clean = (words: unknown) => Array.isArray(words)
    ? [...new Set(words.filter((word): word is string => typeof word === "string" && allowed.has(word)))] : [];
  const revealed = clean(value.revealed).filter((word) => puzzle.requiredWords.includes(word));
  return { found: [...new Set([...clean(value.found), ...revealed])], revealed };
}

export function completeScore(puzzle: CompletePuzzle, found: string[], revealed: string[] = []): number {
  const allowed = new Set([...puzzle.requiredWords, ...puzzle.bonusWords]);
  return [...new Set(found)].reduce((total, word) => total + (allowed.has(word) && !revealed.includes(word) ? scoreWord(word) : 0), 0);
}
