import { Grid, scoreWord } from "./boggle";
import { Trie, TrieNode } from "./dictionary";

export interface SolvedWord {
  word: string;
  path: { row: number; col: number }[];
  score: number;
}

// DFS solver — find all valid words on the board using the Trie
const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],            [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

// Q compression: Qu face → "Q", which maps to a single Trie node
// (the dictionary has QU→Q compression applied at load time)
function cellLetter(letter: string): string {
  const upper = letter.toUpperCase();
  return upper === "QU" ? "Q" : upper;
}

export function solveBoard(grid: Grid, trie: Trie): SolvedWord[] {
  const results: SolvedWord[] = [];
  const found = new Set<string>();

  function dfs(
    row: number,
    col: number,
    path: { row: number; col: number }[],
    prefix: string,
    node: TrieNode
  ) {
    const cell = grid[row][col];
    const contribution = cellLetter(cell.letter);

    const child = node.children.get(contribution);
    if (!child) return;

    const newPrefix = prefix + contribution;

    if (child.isWord && child.originalWord.length >= 3 && !found.has(newPrefix)) {
      found.add(newPrefix);
      results.push({
        word: child.originalWord,
        path: [...path],
        score: scoreWord(child.originalWord),
      });
    }

    // Continue DFS to adjacent cells
    for (const [dr, dc] of DIRECTIONS) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr < 0 || nr >= 4 || nc < 0 || nc >= 4) continue;
      if (path.some((p) => p.row === nr && p.col === nc)) continue;
      dfs(nr, nc, [...path, { row: nr, col: nc }], newPrefix, child);
    }
  }

  const root = trie.root;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      dfs(r, c, [{ row: r, col: c }], "", root);
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
