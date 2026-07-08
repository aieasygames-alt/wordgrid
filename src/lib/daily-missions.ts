import type { SolvedWord } from "@/lib/solver";

export interface FoundWordLike {
  word: string;
  score: number;
}

export interface DailyMission {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
}

const PREFIX_PATTERNS = ["RE", "UN", "IN", "PRE", "DIS", "OVER", "UNDER", "INTER", "OUT", "TRANS"];

function countBy<T>(items: T[], keyFn: (item: T) => string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

export function buildDailyMissions(
  allWords: SolvedWord[],
  foundWords: FoundWordLike[],
  bestCombo = 0
): DailyMission[] {
  const foundSet = new Set(foundWords.map((w) => w.word.toUpperCase()));
  const maxPossible = allWords.reduce((sum, w) => sum + w.score, 0);
  const count4PlusAvailable = allWords.filter((w) => w.word.length >= 4).length;

  const longTarget = allWords.some((w) => w.word.length >= 6)
    ? 6
    : allWords.some((w) => w.word.length >= 5)
    ? 5
    : 4;

  const longWordsFound = foundWords.filter((w) => w.word.length >= longTarget).length;
  const fourPlusTarget = Math.min(3, Math.max(1, count4PlusAvailable));
  const fourPlusFound = foundWords.filter((w) => w.word.length >= 4).length;

  const quAvailable = allWords.some((w) => w.word.includes("QU"));
  const quFound = foundWords.some((w) => w.word.toUpperCase().includes("QU"));

  const startCounts = countBy(
    allWords.filter((w) => w.word.length >= 3),
    (w) => w.word[0]
  );
  const startCandidate = [...startCounts.entries()]
    .sort((a, b) => b[1] - a[1])[0];

  const patternMission: DailyMission = quAvailable
    ? {
        id: "qu",
        title: "Find a Qu word",
        detail: "Qu words are easy to miss and often worth strong points.",
        completed: quFound,
      }
    : startCandidate && startCandidate[1] >= 3
    ? {
        id: "start-cluster",
        title: `Find 3 words starting with ${startCandidate[0]}`,
        detail: "Cluster your search around one starting letter to build momentum.",
        completed: foundWords.filter((w) => w.word.startsWith(startCandidate[0])).length >= 3,
      }
    : {
        id: "prefix",
        title: "Find a prefix word",
        detail: "Look for words that start with RE-, UN-, PRE-, or similar patterns.",
        completed: foundWords.some((w) =>
          PREFIX_PATTERNS.some((p) => w.word.startsWith(p))
        ),
      };

  const scoreTarget = Math.max(
    15,
    Math.min(30, Math.round(maxPossible * 0.2))
  );
  const comboTarget = allWords.length >= 30 ? 4 : 3;

  return [
    {
      id: "long-word",
      title: `Find a ${longTarget}+ letter word`,
      detail: "Long words swing the score the most.",
      completed: longWordsFound > 0,
    },
    {
      id: "four-plus",
      title: `Find ${fourPlusTarget} words of 4+ letters`,
      detail: "Use medium-length words to build a steady score base.",
      completed: fourPlusFound >= fourPlusTarget,
    },
    {
      id: "combo",
      title: `Reach a x${comboTarget} combo`,
      detail: "A short run of clean finds is often the fastest way to build momentum.",
      completed: bestCombo >= comboTarget,
    },
    patternMission,
    {
      id: "score",
      title: `Score at least ${scoreTarget} points`,
      detail: "A clean daily run should produce a solid total even before you go hunting for every word.",
      completed: foundWords.reduce((sum, w) => sum + w.score, 0) >= scoreTarget,
    },
  ];
}
