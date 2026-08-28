import { scoreWord } from "./boggle";
import { INDEXABLE_WORDS } from "./indexable-words";

export type WordListSlug =
  | "3-letter-boggle-words"
  | "4-letter-boggle-words"
  | "5-letter-boggle-words"
  | "words-with-qu"
  | "words-ending-in-ing"
  | "words-ending-in-s"
  | "high-scoring-boggle-words"
  | "common-boggle-words";

export interface WordListPage {
  slug: WordListSlug;
  title: string;
  h1: string;
  description: string;
  intro: string;
  searchIntent: string;
  patternTip: string;
  words: string[];
}

const COMMON_BOGGLE_WORDS = [
  "the", "and", "for", "are", "not", "you", "all", "can", "was", "one",
  "out", "get", "has", "his", "how", "man", "new", "now", "see", "two",
  "way", "who", "act", "add", "air", "arm", "art", "ask", "bad", "bag",
  "bar", "bat", "bed", "big", "box", "car", "cat", "cut", "dog", "ear",
  "eat", "egg", "end", "eye", "fan", "fat", "few", "fit", "fix", "fun",
  "gas", "got", "key", "kid", "law", "leg", "map", "net", "oil", "own",
  "pan", "pen", "pet", "pig", "pin", "pop", "ran", "rat", "red", "row",
  "run", "sad", "saw", "sea", "set", "sit", "sky", "son", "tap", "ten",
  "tip", "top", "toy", "try", "win", "yes", "able", "back", "bank", "base",
  "beat", "best", "blue", "boat", "book", "call", "care", "case", "cast",
  "city", "coat", "code", "cold", "come", "cost", "date", "dawn", "deal",
  "dear", "deep", "door", "draw", "drop", "earn", "east", "edge", "face",
  "fact", "fair", "farm", "fast", "feel", "file", "fill", "find", "fine",
  "fire", "fish", "food", "form", "about", "above", "after", "again",
  "agent", "agree", "ahead", "alert", "alive", "allow", "alone", "among",
  "apple", "apply", "array", "asset", "avoid", "award", "basic", "beach",
  "began", "begin", "being", "below", "black", "blade", "block", "board",
  "brain", "brand", "bread", "break", "bring", "build", "carry", "catch",
  "cause", "chain", "chair", "chart", "chase", "check", "child", "class",
  "clean", "clear", "clock", "close", "coast", "could", "count", "court",
  "cover", "craft", "cross", "daily",
];

const QU_WORDS = [
  "qua", "quad", "quail", "quake", "qualm", "quant", "quart", "queen",
  "queer", "query", "quest", "queue", "quick", "quiet", "quilt", "quirk",
  "quite", "quota", "quote", "quoth", "squid", "equal", "equip", "equity",
  "liquid", "square", "squeak", "squire", "unique", "quieter", "question",
];

const ING_WORDS = [
  "aging", "being", "bring", "doing", "dying", "going", "lying", "owing",
  "ring", "sing", "sting", "swing", "thing", "using", "wing", "acting",
  "asking", "baking", "caring", "coding", "coming", "ending", "finding",
  "fixing", "giving", "making", "playing", "rating", "seeing", "taking",
  "trying", "writing",
];

const S_ENDING_WORDS = [
  "acts", "adds", "airs", "arms", "asks", "bags", "bars", "bats", "beds",
  "bits", "cars", "cats", "cuts", "dogs", "ears", "eggs", "ends", "eyes",
  "fans", "fits", "jobs", "kids", "maps", "nets", "oils", "owls", "pans",
  "pens", "pets", "pigs", "pins", "pots", "rats", "rows", "runs", "sets",
  "sons", "taps", "tips", "toys", "ways", "wins", "balls", "banks",
  "books", "cards", "cases", "casts", "codes", "costs", "dates", "deals",
  "doors", "drops", "facts", "farms", "files", "forms", "games", "words",
];

function byLength(length: number) {
  return INDEXABLE_WORDS.filter((word) => word.length === length);
}

function highScoringWords() {
  return [
    ...INDEXABLE_WORDS.filter((word) => word.length >= 5),
    ...QU_WORDS,
    ...ING_WORDS.filter((word) => word.length >= 5),
  ]
    .filter((word, index, words) => words.indexOf(word) === index)
    .sort((a, b) => scoreWord(b) - scoreWord(a) || a.localeCompare(b));
}

export const WORD_LIST_PAGES: WordListPage[] = [
  {
    slug: "3-letter-boggle-words",
    title: "3 Letter Boggle Words — Common Short Words List",
    h1: "3 Letter Boggle Words",
    description:
      "Study common 3 letter Boggle words with scores, scanning tips, and examples for faster word grid play.",
    intro:
      "Three-letter words are the anchors of a fast Boggle round. They are only worth 1 point, but they keep your scan moving and often reveal longer extensions.",
    searchIntent: "Players want a compact short-word list they can memorize before timed play.",
    patternTip: "Scan corners first, then test every nearby S, R, D, and E for quick extensions.",
    words: byLength(3),
  },
  {
    slug: "4-letter-boggle-words",
    title: "4 Letter Boggle Words — Common Word Grid List",
    h1: "4 Letter Boggle Words",
    description:
      "Browse useful 4 letter Boggle words with score values, pattern tips, and practice links for word grid puzzles.",
    intro:
      "Four-letter words are the first efficiency jump in Boggle scoring. They are worth 2 points and often come from extending a familiar 3-letter base.",
    searchIntent: "Players are looking for common 4-letter answers that appear often in Boggle-style boards.",
    patternTip: "After every 3-letter find, look one tile beyond the path for S, E, R, D, or Y.",
    words: byLength(4),
  },
  {
    slug: "5-letter-boggle-words",
    title: "5 Letter Boggle Words — Higher-Value Word List",
    h1: "5 Letter Boggle Words",
    description:
      "Learn common 5 letter Boggle words worth 4 points, with examples and scanning advice for higher scores.",
    intro:
      "Five-letter words are where Boggle scores start to climb. One 5-letter answer is worth as much as four 3-letter words, so these are worth deliberate practice.",
    searchIntent: "Players want higher-value words that are still realistic to spot during a timed round.",
    patternTip: "Look for stems that can take one extra tile: BEGIN, BOARD, CHAIN, CLEAN, CLOSE, and similar patterns.",
    words: byLength(5),
  },
  {
    slug: "words-with-qu",
    title: "Boggle Words with Qu — Qu Tile Word List",
    h1: "Boggle Words with Qu",
    description:
      "Find useful Boggle words with Qu, including quick Qu patterns, score values, and tips for using the Qu tile.",
    intro:
      "Qu is special in Boggle because one tile gives you the Q and U together. A Qu board can feel awkward until you learn the common branches.",
    searchIntent: "Players want to know which Qu words are worth checking when a board contains the Qu tile.",
    patternTip: "Start with QUI-, QUA-, QUE-, and QUO-, then check whether nearby vowels can support a longer route.",
    words: QU_WORDS,
  },
  {
    slug: "words-ending-in-ing",
    title: "Boggle Words Ending in ING — Pattern List",
    h1: "Boggle Words Ending in ING",
    description:
      "Practice Boggle words ending in ING and learn how to turn short stems into higher-scoring word grid answers.",
    intro:
      "ING endings are powerful because they turn ordinary stems into longer, higher-value answers. If the board has I-N-G connected, inspect every nearby verb-like stem.",
    searchIntent: "Players are studying suffix patterns that create longer Boggle answers.",
    patternTip: "Find the ING chain first, then work backward into playable stems around the I.",
    words: ING_WORDS,
  },
  {
    slug: "words-ending-in-s",
    title: "Boggle Words Ending in S — Plural Word List",
    h1: "Boggle Words Ending in S",
    description:
      "Use this Boggle S-ending word list to spot plurals, verb forms, and easy extensions in word grid puzzles.",
    intro:
      "An S tile can quietly raise your score. Many short nouns and verbs become a second valid answer when S is adjacent to the end of the path.",
    searchIntent: "Players want quick plural and verb-ending examples for timed play.",
    patternTip: "Every time you find a noun-like word, ask whether a nearby S creates a legal extension.",
    words: S_ENDING_WORDS,
  },
  {
    slug: "high-scoring-boggle-words",
    title: "High Scoring Boggle Words — Long Word List",
    h1: "High Scoring Boggle Words",
    description:
      "Study high scoring Boggle words, long patterns, Qu words, and score-efficient targets for stronger word grid games.",
    intro:
      "High scores usually come from a few long words, not only from lots of short answers. This list emphasizes words and patterns that create bigger point jumps.",
    searchIntent: "Players want examples of words that produce stronger Boggle scores.",
    patternTip: "Prioritize 5+ letter stems, Qu branches, and suffix chains before sweeping up tiny words.",
    words: highScoringWords().slice(0, 160),
  },
  {
    slug: "common-boggle-words",
    title: "Common Boggle Words — Practical Study List",
    h1: "Common Boggle Words",
    description:
      "Memorize common Boggle words by length and score so you can recognize frequent word grid answers faster.",
    intro:
      "Common Boggle words make the board feel less random. Memorizing a focused list helps you recognize short anchors and extend them into better answers.",
    searchIntent: "Players want a practical vocabulary list before playing or reviewing with a solver.",
    patternTip: "Learn short anchors first, then practice turning them into 4- and 5-letter answers.",
    words: COMMON_BOGGLE_WORDS,
  },
];

export function getWordListPage(slug: string): WordListPage | undefined {
  return WORD_LIST_PAGES.find((page) => page.slug === slug);
}

export function wordListUrl(slug: WordListSlug): string {
  return `/words/${slug}/`;
}
