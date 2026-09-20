import { readFileSync } from "node:fs";
import { join } from "node:path";

export const CURRENT_WORD_LIST = new Set(
  readFileSync(join(process.cwd(), "public", "data", "words.txt"), "utf8")
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase())
);

export function isCurrentWord(word: string) {
  return CURRENT_WORD_LIST.has(word.toLowerCase());
}
