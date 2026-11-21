import { cleanProgress, completeScore, CompleteBank, CompleteProgress, CompletePuzzle, progressKey } from "./complete";

export function publishedCompletePuzzles(bank: CompleteBank, today: string) {
  return bank.puzzles.filter(puzzle => puzzle.date <= today).sort((a, b) => b.date.localeCompare(a.date));
}

export function selectCompleteSession(bank: CompleteBank, today: string, query: string) {
  const params = new URLSearchParams(query);
  const requested = params.get("date");
  const replay = params.get("replay") || "";
  if (replay && !/^[a-zA-Z0-9-]{1,64}$/.test(replay)) return { error: "This replay link is invalid." } as const;
  if (requested && !bank.puzzles.some(p => p.date === requested && p.date <= today)) {
    return { error: "That puzzle has not been published. Choose a date from the archive." } as const;
  }
  const puzzle = bank.puzzles.find(p => p.date === (requested || today));
  if (!puzzle) return { puzzle: bank.puzzles[0], mode: "practice", replay: "" } as const;
  return { puzzle, mode: replay ? "replay" : puzzle.date === today ? "daily" : "archive", replay } as const;
}

export function readCompleteHistory(bank: CompleteBank, today: string, storage: Pick<Storage, "getItem">) {
  return publishedCompletePuzzles(bank, today).map(puzzle => {
    let progress: CompleteProgress = { found: [], revealed: [] };
    try { progress = cleanProgress(puzzle, JSON.parse(storage.getItem(progressKey(puzzle)) || "null")); } catch { /* A damaged entry cannot hide other dates. */ }
    const found = puzzle.requiredWords.filter(word => progress.found.includes(word)).length;
    return { puzzle, progress, found, score: completeScore(puzzle, progress.found, progress.revealed), completed: found === puzzle.requiredWords.length };
  });
}

export function summarizeCompleteHistory(entries: ReturnType<typeof readCompleteHistory>, today: string) {
  const completed = entries.filter(entry => entry.completed);
  const dates = [...new Set(completed.map(entry => entry.puzzle.date))].sort();
  let longestStreak = 0, run = 0, previous = 0;
  for (const date of dates) {
    const stamp = Date.parse(`${date}T00:00:00Z`);
    run = stamp - previous === 86400000 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
    previous = stamp;
  }
  const completeDates = new Set(dates);
  let cursor = Date.parse(`${today}T00:00:00Z`), currentStreak = 0;
  if (!completeDates.has(today)) cursor -= 86400000;
  while (completeDates.has(new Date(cursor).toISOString().slice(0, 10))) { currentStreak++; cursor -= 86400000; }
  return {
    played: entries.filter(entry => entry.progress.found.length > 0).length,
    completed: completed.length,
    unassisted: completed.filter(entry => !entry.progress.hintLevel && !entry.progress.revealed.length).length,
    score: entries.reduce((sum, entry) => sum + entry.score, 0),
    currentStreak, longestStreak,
  };
}

export function replayUrl(puzzle: Pick<CompletePuzzle, "date">): string {
  return `/complete/?date=${puzzle.date}&replay=${crypto.randomUUID()}`;
}
