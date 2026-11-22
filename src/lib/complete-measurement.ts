import { CompleteProgress, CompletePuzzle } from "./complete";
import { crossedCompleteMilestones } from "./complete-milestones";

export type CompleteMode = "daily" | "archive" | "practice" | "replay";
type Params = Record<string, string | number | boolean>;
type StoragePort = Pick<Storage, "getItem" | "setItem">;
type Emit = (event: string, params: Params) => void;

export function completeAnalyticsContext(puzzle: CompletePuzzle, mode: CompleteMode): Params {
  return {
    measurement_version: 1,
    puzzle_date: puzzle.date,
    puzzle_version: puzzle.version,
    dictionary_version: puzzle.dictionaryVersion,
    difficulty: puzzle.difficulty,
    difficulty_model: puzzle.quality?.model || "legacy",
    session_mode: mode,
    practice: mode === "practice" || mode === "replay",
    target_count: puzzle.requiredWords.length,
  };
}

// Counts only this visit, after deliberate play. A hidden tab/tutorial pauses
// immediately; an unattended foreground tab contributes at most 30 more seconds.
export class CompleteActiveClock {
  private total = 0;
  private sampled = 0;
  private lastActivity = 0;
  private started = false;
  private enabled = true;
  constructor(private now: () => number) {}

  private sample() {
    const at = this.now();
    if (this.started && this.enabled) this.total += Math.max(0, Math.min(at, this.lastActivity + 30_000) - this.sampled);
    this.sampled = at;
  }
  activity() {
    this.sample();
    this.started = true;
    this.lastActivity = this.sampled;
  }
  setEnabled(enabled: boolean) {
    this.sample();
    this.enabled = enabled;
  }
  seconds() {
    this.sample();
    return Math.floor(this.total / 1000);
  }
}

// Separate from game saves: measurement cannot alter words, scores or versions.
// Markers prevent ordinary reload/revisit duplicates. Storage is best effort,
// not a transaction across simultaneous tabs or a cross-device player identity.
export class CompleteMeasurement {
  readonly clock: CompleteActiveClock;
  private started = false;
  private markers = new Set<string>();
  private readonly context: Params;
  private readonly startState: "fresh" | "resumed";
  constructor(
    private puzzle: CompletePuzzle,
    mode: CompleteMode,
    initial: CompleteProgress,
    private saveKey: string,
    private storage: StoragePort,
    private emit: Emit,
    now: () => number,
  ) {
    this.context = completeAnalyticsContext(puzzle, mode);
    this.startState = initial.found.length || initial.extra?.length || initial.hintLevel ? "resumed" : "fresh";
    this.clock = new CompleteActiveClock(now);
  }

  private count(progress: CompleteProgress) {
    return this.puzzle.requiredWords.filter(word => progress.found.includes(word)).length;
  }
  private params(progress: CompleteProgress): Params {
    return {
      ...this.context,
      visit_start_state: this.startState,
      duration_scope: "visit",
      active_seconds: this.clock.seconds(),
      targets_found: this.count(progress),
      bonus_found: this.puzzle.bonusWords.filter(word => progress.found.includes(word)).length,
      extra_found: progress.extra?.length || 0,
      revealed_count: progress.revealed.length,
      hint_level: progress.hintLevel || 0,
    };
  }
  private once(marker: string, event: string, params: Params) {
    if (this.markers.has(marker)) return;
    this.markers.add(marker);
    try {
      const key = `${this.saveKey}:measurement-v1:${marker}`;
      if (this.storage.getItem(key) === "1") return;
      this.storage.setItem(key, "1");
    } catch { /* Play and in-memory dedup still work when storage is blocked. */ }
    this.send(event, params);
  }
  private send(event: string, params: Params) {
    try { this.emit(event, params); } catch { /* Analytics must never interrupt play. */ }
  }
  interaction(progress: CompleteProgress) {
    if (this.count(progress) === this.puzzle.requiredWords.length) return;
    this.clock.activity();
    if (this.started) return;
    this.started = true;
    this.send("complete_play_start", this.params(progress));
  }
  activity() {
    if (this.started) this.clock.activity();
  }
  record(before: CompleteProgress, after: CompleteProgress, action: "find" | "extra" | "hint" | "reveal") {
    if (this.count(before) === this.puzzle.requiredWords.length) return;
    this.interaction(before);
    const params = this.params(after);
    if (!before.found.length && !before.extra?.length && (after.found.length || after.extra?.length) && action !== "reveal") {
      this.once("first-word", "complete_first_word", { ...params, word_type: action === "extra" ? "extra" : this.count(after) ? "target" : "bonus" });
    }
    if ((after.hintLevel || 0) > (before.hintLevel || 0)) {
      this.once(`hint-${after.hintLevel}`, "complete_hint_use", { ...params, hint_type: after.hintLevel === 1 ? "start_counts" : after.hintLevel === 2 ? "first_letters" : "reveal" });
    }
    if (action === "reveal" && after.revealed.length > before.revealed.length) this.send("complete_reveal", params);
    for (const percent of crossedCompleteMilestones(this.count(before), this.count(after), this.puzzle.requiredWords.length)) {
      this.once(`milestone-${percent}`, "complete_milestone", { ...params, percent });
    }
    if (this.count(before) < this.puzzle.requiredWords.length && this.count(after) === this.puzzle.requiredWords.length) {
      this.once("finish", "complete_finish", { ...params, completion_source: action === "reveal" ? "reveal" : "find" });
      this.clock.setEnabled(false);
    }
  }
}
