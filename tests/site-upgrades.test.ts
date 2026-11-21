import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { ARCHIVE_START_DATE, getPublishedArchiveDates, isPublishedArchiveDate } from "../src/lib/archive-dates";
import { generateSizedGrid, todayDateString } from "../src/lib/boggle";
import { buildBoardUrl, decodeBoard } from "../src/lib/board-link";
import { analyticsBootstrapScript, consentScript, GA_MEASUREMENT_ID, updateAnalyticsConsent } from "../src/lib/analytics-config";
import { crossedCompleteMilestones } from "../src/lib/complete-milestones";
import { getPatternSprint, PatternFocus } from "../src/lib/pattern-sprint";
import { Trie } from "../src/lib/dictionary";
import { solveBoard } from "../src/lib/solver";
import { readFileSync } from "node:fs";
import { getWeeklyChallenge } from "../src/lib/weekly-challenge";
import { completeHintProgress, completeHintUnlock, CompletePuzzle } from "../src/lib/complete";
import completeBank from "../public/data/complete/bank-v1.json";

test("daily archive retains old URLs when advancing across the UTC+8 day boundary", () => {
  const first = getPublishedArchiveDates("2026-11-20");
  const next = getPublishedArchiveDates("2026-11-21");
  assert.equal(first.at(-1), ARCHIVE_START_DATE);
  assert.deepEqual(next.slice(1), first);
  assert.ok(next.includes("2026-07-09"));
  assert.equal(todayDateString(new Date("2026-11-20T15:59:59Z")), "2026-11-20");
  assert.equal(todayDateString(new Date("2026-11-20T16:00:00Z")), "2026-11-21");
});

test("archive rejects invalid and unpublished dates, including leap day rollover", () => {
  for (const date of ["2026-02-30", "2026-11-31", "not-a-date", "2026-6-10", "2026-06-09", "2026-11-22"]) {
    assert.equal(isPublishedArchiveDate(date, "2026-11-21"), false, date);
  }
  assert.equal(isPublishedArchiveDate("2028-02-29", "2028-03-01"), true);
  assert.equal(isPublishedArchiveDate("2027-02-29", "2028-03-01"), false);
  assert.deepEqual(getPublishedArchiveDates("bad"), []);
});

test("generated board links retain every previewed tile and mode at all three sizes", () => {
  for (const size of [4, 5, 6]) {
    for (const seed of [574624, ...Array.from({ length: 64 }, (_, index) => index)]) {
      const grid = generateSizedGrid(seed, size);
      for (const mode of ["timed", "zen"]) {
        const url = new URL(buildBoardUrl("/play/", grid, { mode, source: "generator" }), "https://wordgrid.games");
        assert.deepEqual(decodeBoard(url.searchParams.get("board")!), grid, `size ${size}, seed ${seed}`);
        assert.equal(url.searchParams.get("size"), String(size));
        assert.equal(url.searchParams.get("mode"), mode);
      }
    }
  }
});

test("GA consent is queued before configuration, restores only valid saved choices and tolerates blocked storage", () => {
  for (const saved of [null, "granted", "denied", "invalid", "blocked"]) {
    const sandbox = { window: { dataLayer: [] as IArguments[] }, localStorage: { getItem: () => { if (saved === "blocked") throw new Error("blocked"); return saved; } } };
    runInNewContext(consentScript, sandbox);
    const commands = sandbox.window.dataLayer.map((args) => Array.from(args));
    assert.equal(Array.isArray(sandbox.window.dataLayer[0]), false);
    assert.equal(commands[0][0], "consent");
    assert.equal(commands[0][1], "default");
    assert.equal((commands[0][2] as { analytics_storage: string }).analytics_storage, "denied");
    assert.equal(commands.length, saved === "granted" || saved === "denied" ? 2 : 1);
    if (commands.length === 2) assert.equal((commands[1][2] as { analytics_storage: string }).analytics_storage, saved);
  }
});

test("consent updates preserve an installed gtag and use its standard command queue fallback", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  const calls: unknown[][] = [];
  const tag = (...args: unknown[]) => { calls.push(args); };
  const analyticsWindow = { gtag: tag as ((...args: unknown[]) => void) | undefined, dataLayer: [] as IArguments[] };
  Object.defineProperty(globalThis, "window", { configurable: true, value: analyticsWindow });
  try {
    updateAnalyticsConsent("granted");
    assert.equal(analyticsWindow.gtag, tag);
    assert.deepEqual(calls, [["consent", "update", { analytics_storage: "granted" }]]);
    analyticsWindow.gtag = undefined;
    updateAnalyticsConsent("denied");
    assert.equal(Array.isArray(analyticsWindow.dataLayer[0]), false);
    assert.deepEqual(Array.from(analyticsWindow.dataLayer[0]), ["consent", "update", { analytics_storage: "denied" }]);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

test("analytics bootstrap configures the existing property after consent and excludes local/preview page views", () => {
  for (const hostname of ["wordgrid.games", "www.wordgrid.games", "localhost", "preview.wordgrid.pages.dev"]) {
    const sandbox = { window: { dataLayer: [] as IArguments[] }, location: { hostname, origin: `https://${hostname}`, pathname: "/play/" }, localStorage: { getItem: () => "granted" } };
    runInNewContext(analyticsBootstrapScript, sandbox);
    const commands = sandbox.window.dataLayer.map((args) => Array.from(args));
    assert.equal(commands[1][1], "update");
    const config = commands.find((command) => command[0] === "config");
    if (hostname.endsWith("wordgrid.games")) {
      assert.equal(config?.[1], GA_MEASUREMENT_ID);
      assert.equal(commands[2][0], "js");
    } else assert.equal(config, undefined);
  }
});

test("Complete milestones use exact thresholds and do not replay restored or duplicate progress", () => {
  assert.deepEqual(crossedCompleteMilestones(1, 2, 10), [20]);
  assert.deepEqual(crossedCompleteMilestones(5, 6, 10), [60]);
  assert.deepEqual(crossedCompleteMilestones(9, 10, 10), [100]);
  assert.deepEqual(crossedCompleteMilestones(6, 6, 10), []);
  assert.deepEqual(crossedCompleteMilestones(6, 7, 10), []);
  assert.deepEqual(crossedCompleteMilestones(0, 1, 3), [20]);
  assert.deepEqual(crossedCompleteMilestones(0, 0, 0), []);
});

test("every fixed training board contains multiple playable words matching its focus", () => {
  const trie = new Trie();
  for (const word of readFileSync("public/data/words.txt", "utf8").trim().split(/\s+/)) trie.insert(word);
  const patterns: Record<PatternFocus, RegExp> = { qu: /^QU/, prefix: /^(RE|UN|IN|PRE)/, suffix: /(S|ED|ER|ING)$/, long: /^.{5,6}$/, quick: /^.{3,4}$/ };
  for (const focus of Object.keys(patterns) as PatternFocus[]) {
    const sprint = getPatternSprint(focus);
    const matches = solveBoard(sprint.grid, trie).filter(({ word }) => patterns[focus].test(word));
    assert.ok(matches.length >= 3, `${focus} needs at least three valid pattern routes`);
    if (focus === "qu") assert.ok(sprint.grid.flat().some((cell) => cell.letter === "Qu"));
  }
});

test("new weekly boards have playable theme words and remain stable throughout the week", () => {
  const trie = new Trie();
  for (const word of readFileSync("public/data/words.txt", "utf8").trim().split(/\s+/)) {
    if (word.length >= 3) trie.insert(word);
  }
  for (let week = 0; week < 53; week++) {
    const monday = Date.parse("2026-11-23T00:00:00Z") + week * 7 * 86400000;
    const challenge = getWeeklyChallenge(new Date(monday));
    const solved = solveBoard(challenge.grid, trie);
    const matches = solved.filter(({ word }) => challenge.focus === "qu" ? word.includes("QU") : challenge.focus === "long" ? word.length >= 5 : word.length <= 4);
    assert.ok(matches.length >= 3, `${challenge.id}: ${challenge.focus} needs at least three playable theme words`);
    assert.deepEqual(getWeeklyChallenge(new Date(monday + 7 * 86400000 - 1)), challenge);
  }
  const published = getWeeklyChallenge(new Date("2026-11-21T12:00:00Z"));
  assert.equal(published.id, "2026-11-16");
  assert.equal(published.grid.map(row => row.map(cell => cell.letter).join(" ")).join(" / "), "R Qu B S / O V V W / R I A S / M H P I");
});

test("hint countdown uses whole target words at exact thresholds and ignores bonuses and duplicates", () => {
  const puzzle = completeBank.puzzles.find(puzzle => puzzle.requiredWords.length === 27 && puzzle.bonusWords.length > 0) as CompletePuzzle;
  assert.ok(puzzle);
  assert.deepEqual(completeHintProgress(puzzle, { found: [], revealed: [] }).map(step => step.remaining), [6, 11, 17]);
  const five = [...puzzle.requiredWords.slice(0, 5), puzzle.requiredWords[0], puzzle.bonusWords[0]];
  assert.equal(completeHintUnlock(puzzle, { found: five, revealed: [] }), 0);
  assert.equal(completeHintProgress(puzzle, { found: five, revealed: [] })[0].remaining, 1);
  for (const [found, expectedLevel, expectedRemaining] of [[6, 1, 5], [10, 1, 1], [11, 2, 6], [16, 2, 1], [17, 3, 0]]) {
    const progress = { found: puzzle.requiredWords.slice(0, found), revealed: [] };
    assert.equal(completeHintUnlock(puzzle, progress), expectedLevel);
    const next = completeHintProgress(puzzle, progress).find(step => !step.unlocked);
    assert.equal(next?.remaining ?? 0, expectedRemaining);
  }
  assert.ok(completeHintProgress(puzzle, { found: puzzle.requiredWords, revealed: [] }).every(step => step.unlocked && step.remaining === 0));
});
