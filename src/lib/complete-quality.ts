import { CompletePuzzle, findCompletePath, Position } from "./complete";

export function pathShape(path: Position[]) {
  let turns = 0;
  let diagonals = 0;
  let previous = "";
  for (let i = 1; i < path.length; i++) {
    const dr = path[i].row - path[i - 1].row;
    const dc = path[i].col - path[i - 1].col;
    const direction = `${dr},${dc}`;
    if (previous && previous !== direction) turns++;
    if (dr && dc) diagonals++;
    previous = direction;
  }
  return { turns, diagonals };
}

// Editorial estimates, not measured player difficulty or corpus word frequency.
// Long words and turning paths add effort even on a low-target-count board.
export function assessCompleteQuality(puzzle: Pick<CompletePuzzle, "board" | "requiredWords">) {
  const paths = puzzle.requiredWords.map(word => {
    const path = findCompletePath(puzzle, word);
    if (!path) throw new Error(`No path for ${word}`);
    return { word, ...pathShape(path) };
  });
  const longWords = paths.filter(({ word }) => word.length >= 8).length;
  const averageTurns = Math.round(paths.reduce((n, path) => n + path.turns, 0) / paths.length * 10) / 10;
  const lengthEffort = paths.reduce((n, { word }) => n + Math.max(0, word.length - 6), 0);
  const score = Math.round(paths.length * 1.1 + lengthEffort * 1.5 + averageTurns * 4);
  const anchor = [...paths].sort((a, b) => b.word.length - a.word.length)[0];
  const difficulty: CompletePuzzle["difficulty"] = score < 38 ? "Gentle" : score < 58 ? "Steady" : "Stretch";
  return { difficulty, quality: { score, longWords, averageTurns, anchorDiagonals: anchor.diagonals, anchorTurns: anchor.turns, model: "editorial-path-1" } };
}
