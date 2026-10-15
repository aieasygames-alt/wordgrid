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
  hintLevel?: number;
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

export function findCompletePath(puzzle: CompletePuzzle, input: string, start?: Position): Position[] | null {
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
  if (start) return visit(start.row, start.col, 0, []);
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
  const hintLevel = Number.isInteger(value.hintLevel) && Number(value.hintLevel) > 0 ? Math.min(3, Number(value.hintLevel)) : 0;
  return { found: [...new Set([...clean(value.found), ...revealed])], revealed, ...(hintLevel ? {hintLevel} : {}) };
}

export function completeScore(puzzle: CompletePuzzle, found: string[], revealed: string[] = []): number {
  const allowed = new Set([...puzzle.requiredWords, ...puzzle.bonusWords]);
  return [...new Set(found)].reduce((total, word) => total + (allowed.has(word) && !revealed.includes(word) ? scoreWord(word) : 0), 0);
}

// Progress only grows: a stale tab must never remove another tab's discoveries.
export function mergeCompleteProgress(puzzle: CompletePuzzle, left: unknown, right: unknown): CompleteProgress {
  const a = cleanProgress(puzzle, left);
  const b = cleanProgress(puzzle, right);
  return {
    found: [...new Set([...a.found, ...b.found])].sort(),
    revealed: [...new Set([...a.revealed, ...b.revealed])].sort(),
    ...(Math.max(a.hintLevel || 0, b.hintLevel || 0) ? {hintLevel: Math.max(a.hintLevel || 0, b.hintLevel || 0)} : {}),
  };
}

export function rotateCompletePosition(cell: Position, size: number, turns: number): Position {
  let {row, col} = cell;
  for (let turn = 0; turn < ((turns % 4) + 4) % 4; turn++) [row, col] = [col, size - 1 - row];
  return {row, col};
}

export function completeHintUnlock(puzzle: CompletePuzzle, progress: CompleteProgress): number {
  const found = puzzle.requiredWords.filter(word => progress.found.includes(word)).length;
  const ratio = found / puzzle.requiredWords.length;
  return ratio >= 0.6 ? 3 : ratio >= 0.4 ? 2 : ratio >= 0.2 ? 1 : 0;
}

export function remainingStartCounts(puzzle: CompletePuzzle, found: string[]): number[][] {
  const remaining = puzzle.requiredWords.filter(word => !found.includes(word));
  return puzzle.board.map((row, r) => row.map((_, c) => remaining.filter(word => findCompletePath(puzzle, word, {row:r,col:c})).length));
}

export function completeShareText(puzzle: CompletePuzzle, progress: CompleteProgress, practice = false): string {
  const targets = puzzle.requiredWords.filter(word => progress.found.includes(word)).length;
  const bonuses = puzzle.bonusWords.filter(word => progress.found.includes(word)).length;
  const percentage = Math.round(targets / puzzle.requiredWords.length * 100);
  return `WordGrid Complete${practice ? " / Practice" : ""} - ${puzzle.date}\n${targets}/${puzzle.requiredWords.length} targets (${percentage}%)\n${bonuses} bonus words\n${progress.hintLevel || progress.revealed.length ? `Hints used / ${progress.revealed.length} revealed` : "No hints used"}\nhttps://wordgrid.games/complete/`;
}
