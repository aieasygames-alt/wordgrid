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

const solverClient = readFileSync(new URL("../src/app/solver/SolverClient.tsx", import.meta.url), "utf8");

if (solverClient.includes('"7"') || solverClient.includes("7+ letters") || solverClient.includes("7 + letters")) {
  throw new Error("The solver must not expose 7+ letter controls or statistics while the current dictionary ends at 6 letters.");
}

const wordListSource = readFileSync(new URL("../src/lib/word-lists.ts", import.meta.url), "utf8");
const currentWordListSource = readFileSync(new URL("../src/lib/current-word-list.ts", import.meta.url), "utf8");

if (!wordListSource.includes("isCurrentWord(word)")) {
  throw new Error("Curated word-list pages must filter examples against the current game dictionary.");
}

if (!currentWordListSource.includes('"public", "data", "words.txt"')) {
  throw new Error("The server word-list source must read the same public dictionary used by the game.");
}

const staticWordListExamples = [
  "quieter",
  "question",
  "finding",
  "playing",
  "writing",
];
const accidentallyPlayable = staticWordListExamples.filter((word) => words.has(word));

if (accidentallyPlayable.length > 0) {
  throw new Error(`Update word-list assertions: these examples are now playable: ${accidentallyPlayable.join(", ")}`);
}

if (!wordListSource.includes("word.length <= 6 && isCurrentWord(word)")) {
  throw new Error("Curated word-list examples must remain within the current 3-6 letter dictionary range.");
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
  "src/app/guides/advanced-boggle-strategies/page.tsx",
  "src/app/guides/how-to-find-more-words/page.tsx",
  "src/app/guides/word-grid-strategies/page.tsx",
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
  "src/app/guides/boggle-online-free/page.tsx",
  "src/app/guides/play-word-grid-online/page.tsx",
  "src/app/guides/boggle-rules-printable/page.tsx",
  "src/app/guides/boggle-rules-for-kids/page.tsx",
  "src/app/guides/boggle-solver/page.tsx",
  "src/app/guides/word-grid-vs-boggle/page.tsx",
  "src/app/guides/boggle-generator/page.tsx",
  "src/app/guides/boggle-dictionary/page.tsx",
  "src/app/guides/word-grid-strategies/page.tsx",
  "src/app/guides/boggle-word-lists/page.tsx",
  "src/app/guides/boggle-variants/page.tsx",
  "src/app/boggle-timed-game/page.tsx",
];

const unsupportedClaims = [
  "PLAYING",
  "STARTED",
  "QUESTION",
  "FORMATION",
  "5-minute",
  "3-minute",
  "3 minutes",
  "5 minutes",
  "2-letter words",
  "standard Boggle scoring",
  "100-200",
  "80,000-100,000",
  "65% of words",
  "4-minute",
  "7 letters",
  "7+",
  "8+ letters",
];

for (const page of currentRulesPages) {
  const source = readFileSync(new URL(`../${page}`, import.meta.url), "utf8");
  const found = unsupportedClaims.filter((claim) => source.includes(claim));
  if (found.length > 0) {
    throw new Error(`${page} contains unsupported current-product claims: ${found.join(", ")}`);
  }
}

const dailyPage = readFileSync(new URL("../src/app/daily/page.tsx", import.meta.url), "utf8");
const dailyClient = readFileSync(new URL("../src/app/daily/DailyClient.tsx", import.meta.url), "utf8");

if (!dailyPage.includes("shared 4x4") || !dailyPage.includes("3-minute timer")) {
  throw new Error("Daily metadata must describe the current shared 4x4 board and 3-minute timer.");
}

if (!dailyClient.includes("shared 4x4") || !dailyClient.includes("3-minute")) {
  throw new Error("Daily UI must describe the current shared 4x4 board and 3-minute timer.");
}

const weeklyPage = readFileSync(new URL("../src/app/weekly/page.tsx", import.meta.url), "utf8");
const weeklyClient = readFileSync(new URL("../src/app/weekly/WeeklyClient.tsx", import.meta.url), "utf8");

if (!weeklyPage.includes("shared 4x4") || !weeklyPage.includes("three-minute")) {
  throw new Error("Weekly metadata must describe the current shared 4x4 board and three-minute timer.");
}

if (!weeklyClient.includes("shared 4x4") || !weeklyClient.includes("initialDuration={180}")) {
  throw new Error("Weekly UI must describe and implement the shared 4x4 three-minute challenge.");
}

const zenPage = readFileSync(new URL("../src/app/zen/page.tsx", import.meta.url), "utf8");

if (zenPage.includes("repeat the same board") || zenPage.includes("same layout")) {
  throw new Error("Zen must not promise a repeatable board without a board-sharing workflow.");
}

console.log(
  `Verified ${expectedWords.length + commonPracticeWords.length + strategyGuideWords.length} guide examples against ${words.size} WordGrid words.`
);
