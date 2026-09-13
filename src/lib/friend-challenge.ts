export type FriendChallengeEntry = {
  name: string;
  score: number;
  found: number;
  playedAt: string;
};

const STORAGE_KEY = "wordgrid-friend-challenges";
const NAME_KEY = "wordgrid-challenge-name";

type ChallengeStore = Record<string, FriendChallengeEntry[]>;

function readStore(): ChallengeStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChallengeStore) : {};
  } catch {
    return {};
  }
}

export function getChallengeName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(NAME_KEY) || "";
}

export function saveChallengeName(name: string): void {
  if (typeof window === "undefined") return;
  const normalized = name.trim().slice(0, 24);
  if (normalized) localStorage.setItem(NAME_KEY, normalized);
}

export function getChallengeEntries(boardKey: string): FriendChallengeEntry[] {
  return (readStore()[boardKey] || []).slice().sort((a, b) => b.score - a.score || b.found - a.found);
}

export function recordChallengeEntry(boardKey: string, entry: FriendChallengeEntry): FriendChallengeEntry[] {
  if (typeof window === "undefined") return [];
  const store = readStore();
  const existing = store[boardKey] || [];
  const samePlayer = existing.filter((item) => item.name.toLowerCase() !== entry.name.toLowerCase());
  store[boardKey] = [...samePlayer, entry].slice(-20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  return getChallengeEntries(boardKey);
}

export function challengeBoardKey(grid: { letter: string }[][]): string {
  return grid.flat().map((cell) => cell.letter.toUpperCase()).join(".");
}

export function encodeChallengeEntries(entries: FriendChallengeEntry[]): string {
  return encodeURIComponent(entries.slice(0, 10).map((entry) => [entry.name, entry.score, entry.found].map(String).join("~")).join("|"));
}

export function decodeChallengeEntries(value: string | null): FriendChallengeEntry[] {
  if (!value) return [];
  try {
    return decodeURIComponent(value).split("|").map((item) => {
      const [name, score, found] = item.split("~");
      const parsedScore = Number(score);
      const parsedFound = Number(found);
      if (!name || !Number.isFinite(parsedScore) || !Number.isFinite(parsedFound)) return null;
      return { name: name.slice(0, 24), score: parsedScore, found: parsedFound, playedAt: "shared" };
    }).filter((entry): entry is FriendChallengeEntry => Boolean(entry));
  } catch {
    return [];
  }
}
