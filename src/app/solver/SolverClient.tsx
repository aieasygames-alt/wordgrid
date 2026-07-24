"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { generateGrid, generateSizedGrid, seedFromDate, todayDateString, type Grid } from "@/lib/boggle";
import { decodeBoard } from "@/lib/board-link";
import { loadDictionary, Trie } from "@/lib/dictionary";
import { solveBoard, type SolvedWord } from "@/lib/solver";
import { INDEXABLE_WORDS } from "@/lib/indexable-words";

type CellValue = string;

type PatternInsight = {
  label: string;
  detail: string;
};

const INDEXABLE_WORD_SET = new Set(INDEXABLE_WORDS);
const DEFAULT_SAMPLE = generateGrid(seedFromDate(todayDateString()));
const LENGTH_FILTERS = ["all", "3", "4", "5", "6", "7"] as const;
type LengthFilter = (typeof LENGTH_FILTERS)[number];

function gridToValues(grid: Grid): CellValue[][] {
  return grid.map((row) => row.map((cell) => cell.letter));
}

function valuesToGrid(values: CellValue[][]): Grid {
  return values.map((row, r) =>
    row.map((cell, c) => ({
      row: r,
      col: c,
      letter: cell || "",
    }))
  );
}

function normalizeCell(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z]/g, "").toUpperCase();
  if (!cleaned) return "";
  if (cleaned.startsWith("Q")) return "Qu";
  return cleaned.slice(0, 1);
}

function buildEmptyValues(size = 4): CellValue[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
}

function classifyPattern(word: string): string[] {
  const upper = word.toUpperCase();
  const labels: string[] = [];
  if (upper.includes("QU")) labels.push("Qu");
  if (upper.startsWith("RE") || upper.startsWith("UN") || upper.startsWith("IN")) labels.push(`Prefix: ${upper.slice(0, 2)}`);
  if (upper.startsWith("PRE") || upper.startsWith("DIS") || upper.startsWith("OVER") || upper.startsWith("UNDER")) {
    labels.push(`Prefix: ${upper.startsWith("OVER") ? "OVER" : upper.startsWith("UNDER") ? "UNDER" : upper.slice(0, 3)}`);
  }
  if (upper.endsWith("ING") || upper.endsWith("ED") || upper.endsWith("ER") || upper.endsWith("LY") || upper.endsWith("S")) {
    labels.push(`Suffix: ${upper.endsWith("ING") ? "ING" : upper.endsWith("ED") ? "ED" : upper.endsWith("ER") ? "ER" : upper.endsWith("LY") ? "LY" : "S"}`);
  }
  if (upper.length >= 6) labels.push("Long words");
  return labels;
}

function buildInsight(words: SolvedWord[]): PatternInsight | null {
  if (!words.length) return null;

  const counts = new Map<string, number>();
  for (const { word } of words) {
    for (const label of classifyPattern(word)) {
      counts.set(label, (counts.get(label) || 0) + 1);
    }
  }

  let topLabel = "";
  let topCount = 0;
  for (const [label, count] of counts) {
    if (count > topCount) {
      topLabel = label;
      topCount = count;
    }
  }

  if (!topLabel) {
    return {
      label: "Balanced board",
      detail: "The solver results are spread across several paths. This is a useful grid for general scanning practice.",
    };
  }

  if (topLabel === "Qu") {
    return {
      label: "Qu board",
      detail: "This grid heavily rewards Qu scanning. Start every solve by checking the Qu tile and nearby vowels.",
    };
  }

  if (topLabel.startsWith("Prefix: ")) {
    const prefix = topLabel.replace("Prefix: ", "");
    return {
      label: `Prefix board: ${prefix}`,
      detail: `A lot of value comes from ${prefix}-style families. Scan outward from the same start to find extensions.`,
    };
  }

  if (topLabel.startsWith("Suffix: ")) {
    const suffix = topLabel.replace("Suffix: ", "");
    return {
      label: `Suffix board: ${suffix}`,
      detail: `Many words end in ${suffix}. Look for base words that extend into this ending.`,
    };
  }

  if (topLabel === "Long words") {
    return {
      label: "Long-word board",
      detail: "This grid has more payoff in 5+ letter paths. Prioritize longer chains earlier in the scan.",
    };
  }

  return {
    label: "Pattern board",
    detail: "The best moves are spread across several pattern families. Keep scanning systematically.",
  };
}

function filterWords(words: SolvedWord[], filter: LengthFilter, search: string): SolvedWord[] {
  const query = search.trim().toUpperCase();
  return words.filter((word) => {
    const lengthMatch = filter === "all" ? true : word.word.length === Number(filter) || (filter === "7" && word.word.length >= 7);
    const searchMatch = query ? word.word.includes(query) : true;
    return lengthMatch && searchMatch;
  });
}

export default function SolverClient() {
  const [values, setValues] = useState<CellValue[][]>(() => gridToValues(DEFAULT_SAMPLE));
  const [trie, setTrie] = useState<Trie | null>(null);
  const [loadingTrie, setLoadingTrie] = useState(true);
  const [solving, setSolving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [solvedWords, setSolvedWords] = useState<SolvedWord[]>([]);
  const [filter, setFilter] = useState<LengthFilter>("all");
  const [search, setSearch] = useState("");
  const [pasted, setPasted] = useState("");
  const [activeBoardName, setActiveBoardName] = useState("Today's board");
  const autoSolvedRef = useRef(false);
  const boardSize = values.length;

  useEffect(() => {
    let cancelled = false;
    loadDictionary()
      .then((loaded) => {
        if (cancelled) return;
        setTrie(loaded);
      })
      .catch(() => {
        if (!cancelled) setError("Dictionary failed to load. Try refreshing the page.");
      })
      .finally(() => {
        if (!cancelled) setLoadingTrie(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const boardParam = params.get("board");
    if (!boardParam) return;

    const parsed = decodeBoard(boardParam);
    if (!parsed) {
      setError("Could not read the shared board link.");
      return;
    }

    const next = gridToValues(parsed);
    setValues(next);
    setActiveBoardName("Shared challenge");
    setSolvedWords([]);
    setFilter("all");
    setSearch("");
  }, []);

  const solveCurrentBoard = useCallback(
    async (nextValues: CellValue[][] = values, label = activeBoardName) => {
      const boardReady = nextValues.flat().every(Boolean);
      if (!boardReady) {
        setError("Fill every cell before solving.");
        return;
      }

      setSolving(true);
      setError(null);
      try {
        const activeTrie = trie || (await loadDictionary());
        setTrie(activeTrie);
        const solved = solveBoard(valuesToGrid(nextValues), activeTrie);
        setSolvedWords(solved);
        setActiveBoardName(label);
      } catch {
        setError("Could not solve this board. Please try again.");
      } finally {
        setSolving(false);
      }
    },
    [values, trie, activeBoardName]
  );

  useEffect(() => {
    if (autoSolvedRef.current || !trie) return;
    autoSolvedRef.current = true;
    void solveCurrentBoard(values, activeBoardName);
  }, [trie, solveCurrentBoard, values, activeBoardName]);

  const updateCell = (row: number, col: number, nextValue: string) => {
    setValues((current) => {
      const copy = current.map((r) => [...r]);
      copy[row][col] = normalizeCell(nextValue);
      return copy;
    });
  };

  const loadTodayBoard = () => {
    const next = gridToValues(generateGrid(seedFromDate(todayDateString())));
    setValues(next);
    void solveCurrentBoard(next, "Today's board");
  };

  const loadRandomBoard = () => {
    const next = gridToValues(generateSizedGrid(Math.floor(Math.random() * 1e9), boardSize));
    setValues(next);
    void solveCurrentBoard(next, "Random board");
  };

  const clearBoard = () => {
    const empty = buildEmptyValues(boardSize);
    setValues(empty);
    setSolvedWords([]);
    setSearch("");
    setError(null);
    setActiveBoardName("Blank board");
  };

  const totalPossibleScore = useMemo(
    () => solvedWords.reduce((sum, word) => sum + word.score, 0),
    [solvedWords]
  );
  const filteredWords = useMemo(
    () => filterWords(solvedWords, filter, search),
    [solvedWords, filter, search]
  );
  const bestWords = useMemo(() => solvedWords.slice(0, 8), [solvedWords]);
  const longestWords = useMemo(
    () => solvedWords.slice().sort((a, b) => b.word.length - a.word.length).slice(0, 8),
    [solvedWords]
  );
  const lengthBuckets = useMemo(() => {
    const buckets = new Map<number, number>();
    for (const word of solvedWords) {
      const len = word.word.length >= 7 ? 7 : word.word.length;
      buckets.set(len, (buckets.get(len) || 0) + 1);
    }
    return buckets;
  }, [solvedWords]);
  const insight = useMemo(() => buildInsight(solvedWords), [solvedWords]);

  const applyPastedBoard = () => {
    const raw = pasted.trim().replace(/[^a-zA-Z\s]/g, " ");
    const tokens: string[] = [];
    for (const line of raw.split(/\r?\n/)) {
      if (!line.trim()) continue;
      const split = line.trim().split(/[\s,|/]+/).filter(Boolean);
      if (split.length > 1) {
        for (const token of split) {
          tokens.push(normalizeCell(token));
        }
      } else {
        const cleaned = line.replace(/[^a-zA-Z]/g, "").toUpperCase();
        for (let i = 0; i < cleaned.length; ) {
          if (cleaned[i] === "Q" && cleaned[i + 1] === "U") {
            tokens.push("Qu");
            i += 2;
          } else {
            tokens.push(cleaned[i]);
            i += 1;
          }
        }
      }
    }

    const size = Math.sqrt(tokens.length);
    if (!Number.isInteger(size)) {
      setError("Paste a square board: 16, 25, or 36 letters.");
      return;
    }

    const next = buildEmptyValues(size);
    let idx = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        next[r][c] = normalizeCell(tokens[idx] || "");
        idx += 1;
      }
    }
    setValues(next);
    setPasted("");
    void solveCurrentBoard(next, "Pasted board");
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10 lg:sticky lg:top-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Board Input</h2>
              <p className="text-sm text-text-muted mt-1">
                Edit the board, load today&apos;s daily grid, or paste a custom layout.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-text-dim">Status</div>
              <div className="text-sm font-semibold text-primary">
                {loadingTrie ? "Loading dictionary" : solvedWords.length ? "Solved" : "Ready"}
              </div>
            </div>
          </div>

          <div
            className="mt-5 grid gap-2 sm:gap-3"
            style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
          >
            {values.map((row, r) =>
              row.map((cell, c) => (
                <input
                  key={`${r}-${c}`}
                  value={cell}
                  onChange={(e) => updateCell(r, c, e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  maxLength={2}
                  inputMode="text"
                  autoCapitalize="characters"
                  aria-label={`Row ${r + 1} column ${c + 1}`}
                  className="h-14 sm:h-16 rounded-2xl border border-border bg-bg/70 text-center text-lg sm:text-xl font-bold tracking-wide uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={r === 1 && c === 2 ? "Qu" : ""}
                />
              ))
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={loadTodayBoard}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold"
            >
              Load today&apos;s board
            </button>
            <button
              onClick={loadRandomBoard}
              className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold"
            >
              Random board
            </button>
            <button
              onClick={() => {
                const next = generateSizedGrid(Math.floor(Math.random() * 1e9), 5);
                setValues(gridToValues(next));
                void solveCurrentBoard(gridToValues(next), "Big board");
              }}
              className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold"
            >
              Big board 5x5
            </button>
            <button
              onClick={() => {
                const next = generateSizedGrid(Math.floor(Math.random() * 1e9), 6);
                setValues(gridToValues(next));
                void solveCurrentBoard(gridToValues(next), "Huge board");
              }}
              className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold"
            >
              Huge board 6x6
            </button>
            <button
              onClick={clearBoard}
              className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold"
            >
              Clear
            </button>
            <button
              onClick={() => void solveCurrentBoard()}
              disabled={solving || loadingTrie}
              className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold disabled:opacity-60"
            >
              {solving ? "Solving..." : "Solve board"}
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-bg/50 p-4">
            <label className="block text-sm font-semibold text-text-muted">
              Paste a board
            </label>
            <textarea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              className="mt-2 h-28 w-full rounded-2xl border border-border bg-bg/70 p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder={"T R A C\nE N O U\nS Q U A\nL R I N"}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={applyPastedBoard}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold"
              >
                Use pasted board
              </button>
              <p className="text-xs text-text-dim self-center">
                Use spaces or line breaks. The solver understands Qu as a single tile.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Results</h2>
              <p className="text-sm text-text-muted mt-1">
                {activeBoardName}. {solvedWords.length ? "Review the highest-value words first." : "Solve a board to see the word list."}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-text-dim">Total Score</div>
              <div className="text-2xl font-bold text-primary">{totalPossibleScore}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-bg/60 p-4">
              <div className="text-xs uppercase tracking-wide text-text-dim">Words</div>
              <div className="text-2xl font-bold">{solvedWords.length}</div>
            </div>
            <div className="rounded-2xl bg-bg/60 p-4">
              <div className="text-xs uppercase tracking-wide text-text-dim">Best word</div>
              <div className="text-2xl font-bold text-success">{bestWords[0]?.word || "—"}</div>
            </div>
            <div className="rounded-2xl bg-bg/60 p-4">
              <div className="text-xs uppercase tracking-wide text-text-dim">Longest</div>
              <div className="text-2xl font-bold text-primary">{longestWords[0]?.word || "—"}</div>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-danger/30 bg-danger-bg/20 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          {insight && (
            <div className="mt-4 rounded-2xl border border-border bg-bg/60 p-4">
              <div className="text-xs uppercase tracking-wide text-text-dim">Pattern read</div>
              <div className="mt-1 font-semibold text-primary">{insight.label}</div>
              <p className="mt-1 text-sm text-text-muted leading-relaxed">{insight.detail}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {LENGTH_FILTERS.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  filter === item ? "bg-primary text-white" : "bg-bg/70 hover:bg-surface-hover"
                }`}
              >
                {item === "all" ? "All words" : item === "7" ? "7+ letters" : `${item} letters`}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-border bg-bg/70 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Search a word..."
            />
          </div>

          <div className="mt-4 max-h-[30rem] overflow-auto rounded-2xl border border-border bg-bg/50 p-3">
            {filteredWords.length ? (
              <div className="flex flex-wrap gap-2">
                {filteredWords.map((word) => {
                  const wordLower = word.word.toLowerCase();
                  const content = (
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{word.word}</span>
                      <span className="text-xs text-primary font-semibold">
                        {word.score}
                      </span>
                    </div>
                  );

                  return INDEXABLE_WORD_SET.has(wordLower) ? (
                    <Link
                      key={word.word}
                      href={`/words/${wordLower}/`}
                      className="rounded-xl border border-border bg-surface/60 px-3 py-2 transition hover:border-primary/40 hover:bg-surface"
                    >
                      {content}
                    </Link>
                  ) : (
                    <span
                      key={word.word}
                      className="rounded-xl border border-border bg-surface/60 px-3 py-2"
                    >
                      {content}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-text-muted">
                Solve a board to see words, or adjust the filter/search.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface/50 p-5">
          <h3 className="font-semibold text-primary">Top words</h3>
          <div className="mt-3 space-y-2">
            {bestWords.map((word) => (
              <div key={word.word} className="flex items-center justify-between gap-3 rounded-xl bg-bg/50 px-3 py-2">
                <div className="font-mono font-semibold">{word.word}</div>
                <div className="text-xs text-primary font-semibold">{word.score} pts</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface/50 p-5">
          <h3 className="font-semibold text-primary">Length breakdown</h3>
          <div className="mt-3 space-y-3">
            {[3, 4, 5, 6, 7].map((len) => {
              const count = lengthBuckets.get(len) || 0;
              const maxCount = Math.max(...[...lengthBuckets.values()], 1);
              const width = `${Math.max(8, (count / maxCount) * 100)}%`;
              return (
                <div key={len}>
                  <div className="flex items-center justify-between text-xs text-text-dim mb-1">
                    <span>{len}+ letters</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg/70 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-success" style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface/50 p-5">
          <h3 className="font-semibold text-primary">Helpful next step</h3>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Use the solver after a game, then go back to the board and try to
            beat your previous score without peeking.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
              Play again
            </Link>
            <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
              Daily
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
