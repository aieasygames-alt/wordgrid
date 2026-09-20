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
const strategyGuideWords = [
  "cat",
  "cats",
  "dog",
  "dogs",
  "play",
  "plays",
  "played",
  "player",
  "replay",
  "quit",
  "quite",
  "quick",
  "quest",
  "quote",
  "quiz",
  "equal",
  "the",
  "and",
  "ear",
  "eat",
  "east",
  "care",
  "earn",
  "action",
  "garden",
  "square",
];
const missingWords = [...expectedWords, ...commonPracticeWords, ...strategyGuideWords].filter(
  (word) => !words.has(word)
);

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

const strategyPages = [
  "src/app/guides/boggle-strategy-guide/page.tsx",
  "src/app/guides/boggle-tips-tricks/page.tsx",
  "src/app/guides/how-to-win-boggle/page.tsx",
];
const nonWordTokens = new Set(["JSON", "FAQ"]);

for (const page of strategyPages) {
  const source = readFileSync(new URL(`../${page}`, import.meta.url), "utf8");
  const uppercaseExamples = new Set(source.match(/\b[A-Z]{3,}\b/g) ?? []);
  const missingExamples = [...uppercaseExamples]
    .filter((word) => !nonWordTokens.has(word))
    .map((word) => word.toLowerCase())
    .filter((word) => !words.has(word));

  if (missingExamples.length > 0) {
    throw new Error(`${page} contains examples outside the current word list: ${missingExamples.join(", ")}`);
  }
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
  `Verified ${expectedWords.length + commonPracticeWords.length + strategyGuideWords.length} guide examples against ${words.size} WordGrid words.`
);
