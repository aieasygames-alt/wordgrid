import test from "node:test";
import assert from "node:assert/strict";
import { CompleteActiveClock, CompleteMeasurement, CompleteMode } from "../src/lib/complete-measurement";
import { CompleteProgress, CompletePuzzle, progressKey } from "../src/lib/complete";
import bank from "../public/data/complete/bank-v2.json";

const puzzle = bank.puzzles[0] as CompletePuzzle;
const empty: CompleteProgress = { found: [], revealed: [] };
function harness(initial = empty, mode: CompleteMode = "daily", replay = "", values = new Map<string, string>()) {
  let now = 0;
  const events: { name: string; params: Record<string, string | number | boolean> }[] = [];
  const meter = new CompleteMeasurement(puzzle, mode, initial, progressKey(puzzle, mode === "practice", replay), {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value); },
  }, (name, params) => { events.push({ name, params }); }, () => now);
  return { meter, events, values, advance: (ms: number) => { now += ms; } };
}

test("Complete duration starts at deliberate play, freezes when hidden/tutorial and caps foreground idle", () => {
  let now = 0;
  const clock = new CompleteActiveClock(() => now);
  now += 20_000;
  assert.equal(clock.seconds(), 0);
  clock.activity(); now += 10_000;
  clock.setEnabled(false); now += 3600_000;
  assert.equal(clock.seconds(), 10);
  clock.setEnabled(true); clock.activity(); now += 120_000;
  assert.equal(clock.seconds(), 40);
  clock.activity(); now += 5000;
  assert.equal(clock.seconds(), 45);
});

test("opening and restoring Complete do not emit starts or finishes; deliberate play starts once per visit", () => {
  const h = harness();
  h.meter.activity(); h.advance(20_000);
  assert.deepEqual(h.events, []);
  h.meter.interaction(empty); h.advance(2000); h.meter.interaction(empty);
  assert.equal(h.events.length, 1);
  assert.equal(h.events[0].name, "complete_play_start");
  assert.equal(h.events[0].params.active_seconds, 0);
  const finished = { found: puzzle.requiredWords, revealed: [] };
  const restored = harness(finished);
  restored.meter.interaction(finished);
  restored.meter.record(finished, finished, "hint");
  assert.deepEqual(restored.events, []);
});

test("completion and milestones deduplicate after reload and across daily/archive visits to the same save", () => {
  const before = { found: puzzle.requiredWords.slice(0, -1), revealed: [] };
  const after = { found: puzzle.requiredWords, revealed: [] };
  const h = harness(before);
  h.meter.interaction(before); h.advance(12_000); h.meter.record(before, after, "find");
  assert.equal(h.events.filter(e => e.name === "complete_finish").length, 1);
  const finish = h.events.find(e => e.name === "complete_finish")!.params;
  assert.equal(finish.active_seconds, 12);
  assert.equal(finish.visit_start_state, "resumed");
  assert.equal(finish.duration_scope, "visit");
  const reloaded = harness(before, "archive", "", h.values);
  reloaded.meter.record(before, after, "find");
  assert.deepEqual(reloaded.events.map(e => e.name), ["complete_play_start"]);
  const replay = harness(before, "replay", "separate-attempt", h.values);
  replay.meter.record(before, after, "find");
  assert.ok(replay.events.some(e => e.name === "complete_finish"));
});

test("hint levels count first use, reveals count each target and completion identifies assistance", () => {
  const before = { found: puzzle.requiredWords.slice(0, -2), revealed: [] };
  const h = harness(before);
  const counts = { ...before, hintLevel: 1 };
  h.meter.record(before, counts, "hint");
  h.meter.record(counts, counts, "hint");
  const first = { found: puzzle.requiredWords.slice(0, -1), revealed: [puzzle.requiredWords.at(-2)!], hintLevel: 3 };
  const last = { found: puzzle.requiredWords, revealed: [...first.revealed, puzzle.requiredWords.at(-1)!], hintLevel: 3 };
  h.meter.record(counts, first, "reveal"); h.meter.record(first, last, "reveal");
  assert.deepEqual(h.events.filter(e => e.name === "complete_hint_use").map(e => e.params.hint_type), ["start_counts", "reveal"]);
  assert.equal(h.events.filter(e => e.name === "complete_reveal").length, 2);
  assert.equal(h.events.find(e => e.name === "complete_finish")!.params.completion_source, "reveal");
  assert.equal(h.events.find(e => e.name === "complete_finish")!.params.revealed_count, 2);
});

test("Complete context distinguishes all modes without leaking words, player data or replay identifiers", () => {
  for (const mode of ["daily", "archive", "practice", "replay"] as const) {
    const h = harness(empty, mode, mode === "replay" ? "private-replay-id" : "");
    h.meter.record(empty, { found: [puzzle.requiredWords[0]], revealed: [] }, "find");
    const first = h.events.find(e => e.name === "complete_first_word")!.params;
    assert.equal(first.session_mode, mode);
    assert.equal(first.practice, mode === "practice" || mode === "replay");
    assert.equal(first.puzzle_date, puzzle.date);
    assert.equal(first.puzzle_version, puzzle.version);
    assert.equal(first.dictionary_version, puzzle.dictionaryVersion);
    assert.equal(first.visit_start_state, "fresh");
    const allowed = new Set(["measurement_version", "puzzle_date", "puzzle_version", "dictionary_version", "difficulty", "difficulty_model", "session_mode", "practice", "target_count", "visit_start_state", "duration_scope", "active_seconds", "targets_found", "bonus_found", "extra_found", "revealed_count", "hint_level", "word_type", "percent"]);
    for (const event of h.events) {
      assert.ok(Object.keys(event.params).every(key => allowed.has(key)));
      assert.ok(Object.keys(event.params).length < 25);
      assert.ok(!JSON.stringify(event.params).includes("private-replay-id"));
      assert.ok(!Object.values(event.params).includes(puzzle.requiredWords[0]));
    }
  }
});

test("blocked measurement storage never changes game progress and still deduplicates in memory", () => {
  const before = { found: puzzle.requiredWords.slice(0, -1), revealed: [] };
  const after = { found: puzzle.requiredWords, revealed: [] };
  const original = JSON.stringify([before, after]);
  const events: string[] = [];
  const meter = new CompleteMeasurement(puzzle, "archive", before, "unavailable", {
    getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); },
  }, name => { events.push(name); }, () => 0);
  meter.record(before, after, "find"); meter.record(before, after, "find");
  assert.equal(events.filter(name => name === "complete_finish").length, 1);
  assert.equal(JSON.stringify([before, after]), original);
});
