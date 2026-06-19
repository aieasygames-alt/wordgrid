// Word metadata — definitions fetched from Free Dictionary API at build time
// https://dictionaryapi.dev/

export interface WordDefinition {
  word: string;
  phonetic: string | null;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
  }[];
}

// Types for Free Dictionary API response
interface DictAPIDefinition {
  definition?: string;
  example?: string;
}
interface DictAPIMeaning {
  partOfSpeech?: string;
  definitions?: DictAPIDefinition[];
}
interface DictAPIPhonetic {
  text?: string;
}
interface DictAPIEntry {
  word?: string;
  phonetic?: string;
  phonetics?: DictAPIPhonetic[];
  meanings?: DictAPIMeaning[];
}

// Fetch from Free Dictionary API (no key needed, rate-limited)
export async function fetchWordData(word: string): Promise<WordDefinition | null> {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
      { next: { revalidate: 86400 } } // cache 24h
    );
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0] as DictAPIEntry;
    return {
      word: entry.word || word,
      phonetic: entry.phonetic || entry.phonetics?.[0]?.text || null,
      meanings: (entry.meanings || []).map((m) => ({
        partOfSpeech: m.partOfSpeech || "",
        definitions: (m.definitions || []).slice(0, 3).map((d) => ({
          definition: d.definition || "",
          example: d.example,
        })),
      })),
    };
  } catch {
    return null;
  }
}

// Load the word list to check if a word is in our dictionary
export function loadWordList(): string[] {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "public", "data", "words.txt");
  const text = fs.readFileSync(filePath, "utf-8");
  return text
    .split("\n")
    .map((w: string) => w.trim())
    .filter((w: string) => w.length >= 3);
}

// Curated list of 300 high-frequency English words (3-5 letters)
// These are the most common words that players encounter and search for
export const HIGH_VALUE_WORDS: string[] = [
  // 3-letter common words
  "the", "and", "for", "are", "but", "not", "you", "all", "any", "can",
  "had", "her", "was", "one", "our", "out", "day", "get", "has", "him",
  "his", "how", "man", "new", "now", "old", "see", "two", "way", "who",
  "boy", "did", "its", "let", "put", "say", "she", "too", "use", "act",
  "add", "age", "air", "arm", "art", "ask", "bad", "bag", "bar", "bat",
  "bed", "big", "bit", "box", "bus", "buy", "cap", "car", "cat", "cup",
  "cut", "dog", "dry", "ear", "eat", "egg", "end", "eye", "fan", "far",
  "fat", "few", "fit", "fix", "fly", "fog", "fun", "gas", "god", "got",
  "gun", "guy", "hat", "hit", "hot", "ice", "job", "key", "kid", "lab",
  "law", "lay", "leg", "lie", "lot", "low", "map", "mix", "mom", "mud",
  "net", "nor", "nut", "oil", "owl", "own", "pad", "pan", "pay", "pen",
  "pet", "pie", "pig", "pin", "pop", "pot", "pro", "ran", "rat", "raw",
  "red", "rid", "row", "rub", "run", "sad", "saw", "sea", "set", "sir",
  "sit", "six", "sky", "son", "sum", "sun", "tap", "tax", "tea", "ten",
  "tie", "tip", "top", "toy", "try", "van", "war", "wet", "win", "yes",
  // 4-letter common words
  "able", "back", "ball", "band", "bank", "base", "beat", "been", "best", "bill",
  "bird", "blue", "boat", "body", "bone", "book", "born", "both", "burn", "busy",
  "call", "calm", "came", "card", "care", "case", "cash", "cast", "city", "club",
  "coal", "coat", "code", "cold", "come", "cook", "cool", "copy", "cost", "crew",
  "crop", "dark", "date", "dawn", "dead", "deal", "dean", "dear", "debt", "deep",
  "deer", "desk", "diet", "dirt", "does", "done", "door", "down", "draw", "drop",
  "drug", "drum", "dual", "duke", "dust", "duty", "each", "earn", "ease", "east",
  "easy", "edge", "else", "even", "ever", "evil", "exit", "face", "fact", "fail",
  "fair", "fall", "farm", "fast", "fate", "fear", "feed", "feel", "feet", "fell",
  "felt", "file", "fill", "film", "find", "fine", "fire", "firm", "fish", "five",
  "flag", "flat", "flew", "flow", "food", "foot", "ford", "form", "fort", "four",
  // 5-letter common words
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again",
  "agent", "agree", "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "alone",
  "along", "alter", "among", "anger", "angle", "angry", "apart", "apple", "apply", "arena",
  "argue", "arise", "armed", "array", "aside", "asset", "audio", "audit", "avoid", "award",
  "aware", "badly", "baker", "bases", "basic", "beach", "began", "begin", "begun", "being",
  "below", "bench", "billy", "birth", "black", "blade", "blame", "blank", "blast", "blend",
  "blind", "block", "blood", "board", "boost", "booth", "bound", "brain", "brand", "bread",
  "break", "breed", "brief", "bring", "broad", "broke", "brown", "build", "built", "buyer",
  "cable", "calif", "carry", "catch", "cause", "chain", "chair", "chart", "chase", "cheap",
  "check", "chest", "chief", "child", "china", "chose", "civil", "claim", "class", "clean",
  "clear", "click", "clock", "close", "coach", "coast", "could", "count", "court", "cover",
  "craft", "crash", "cream", "crime", "cross", "crowd", "crown", "curve", "cycle", "daily",
];

// Get the curated word list for SSG generation
export function getStaticWords(): string[] {
  return HIGH_VALUE_WORDS;
}
