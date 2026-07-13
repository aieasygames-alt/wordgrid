import type { Grid } from "./boggle";

const BOARD_PARAM = "board";

function encodeToken(token: string): string {
  return encodeURIComponent(token.trim().toUpperCase());
}

function decodeToken(token: string): string {
  const decoded = decodeURIComponent(token.trim());
  const upper = decoded.toUpperCase();
  return upper === "Q" || upper === "QU" ? "Qu" : upper;
}

export function encodeBoard(grid: Grid): string {
  return grid.flat().map((cell) => encodeToken(cell.letter || "")).join(".");
}

export function decodeBoard(value: string): Grid | null {
  const tokens = value
    .split(".")
    .map((token) => token.trim())
    .filter(Boolean)
    .map(decodeToken);

  const size = Math.sqrt(tokens.length);
  if (!Number.isInteger(size)) return null;

  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      row,
      col,
      letter: tokens[row * size + col],
    }))
  );
}

export function buildBoardUrl(
  pathname: string,
  grid: Grid,
  params: Record<string, string | number | undefined> = {}
): string {
  const searchParams = new URLSearchParams();
  searchParams.set(BOARD_PARAM, encodeBoard(grid));
  searchParams.set("size", String(grid.length));

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    searchParams.set(key, String(value));
  }

  return `${pathname}?${searchParams.toString()}`;
}
