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
