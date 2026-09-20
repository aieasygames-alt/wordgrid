import { readFileSync } from "node:fs";

const words = new Set(
  readFileSync(new URL("../public/data/words.txt", import.meta.url), "utf8")
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase())
);

const expectedWords = ["cat", "the", "run", "play", "quick", "garden", "player"];
const commonPracticeWords = [
  "and",
  "are",
  "cat",
  "dog",
  "ear",
  "eat",
  "for",
  "fun",
  "get",
  "map",
  "net",
  "run",
  "sea",
  "set",
  "the",
  "top",
  "able",
  "bank",
  "beat",
  "boat",
  "book",
  "call",
  "care",
  "cold",
  "come",
  "earn",
  "east",
  "find",
  "fish",
  "form",
  "game",
  "word",
  "about",
  "apple",
  "beach",
  "black",
  "board",
  "brain",
  "build",
  "chain",
  "clean",
  "close",
  "daily",
  "earth",
  "great",
  "money",
  "quiet",
  "water",
  "action",
  "garden",
  "player",
  "square",
  "unique",
];
const missingWords = [...expectedWords, ...commonPracticeWords].filter((word) => !words.has(word));

if (missingWords.length > 0) {
  throw new Error(`Scoring examples missing from the WordGrid word list: ${missingWords.join(", ")}`);
}

if ([...words].some((word) => word.length > 6)) {
  throw new Error("The scoring page must be updated before the word list expands past 6 letters.");
}

const commonWordsPage = readFileSync(
  new URL("../src/app/guides/most-common-boggle-words/page.tsx", import.meta.url),
  "utf8"
);
const unlistedExamples = commonPracticeWords.filter((word) => !commonWordsPage.includes(`\"${word.toUpperCase()}\"`));

if (unlistedExamples.length > 0) {
  throw new Error(`Common-words examples missing from the page: ${unlistedExamples.join(", ")}`);
}

const currentRulesPages = [
  "src/app/guides/boggle-rules-beginners/page.tsx",
  "src/app/guides/boggle-word-game/page.tsx",
  "src/app/guides/boggle-game-online/page.tsx",
  "src/app/guides/play-boggle-online-free/page.tsx",
  "src/app/guides/boggle-scoring-sheet/page.tsx",
];

const unsupportedClaims = ["PLAYING", "STARTED", "QUESTION", "FORMATION", "5-minute"];

for (const page of currentRulesPages) {
  const source = readFileSync(new URL(`../${page}`, import.meta.url), "utf8");
  const found = unsupportedClaims.filter((claim) => source.includes(claim));
  if (found.length > 0) {
    throw new Error(`${page} contains unsupported current-product claims: ${found.join(", ")}`);
  }
}

console.log(
  `Verified ${expectedWords.length + commonPracticeWords.length} guide examples against ${words.size} WordGrid words.`
);
