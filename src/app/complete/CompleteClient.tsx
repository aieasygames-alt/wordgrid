"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { checkCompleteWord, completeScore, CompleteProgress, CompletePuzzle, findCompletePath, completeHintProgress, completeShareText, remainingStartCounts, mergeCompleteProgress, Position, progressKey, wordFromPath } from "@/lib/complete";
import Link from "next/link";
import { INDEXABLE_WORDS } from "@/lib/indexable-words";
import CompleteLetterBoard from "@/components/CompleteLetterBoard";
import CompleteTutorial from "@/components/CompleteTutorial";
import ThemeToggle from "@/components/ThemeToggle";
import { trackEvent } from "@/lib/analytics";
import { completeAnalyticsContext, CompleteMeasurement, CompleteMode } from "@/lib/complete-measurement";
import { useCompleteBank } from "@/lib/use-complete-bank";
import { replayUrl, selectCompleteSession } from "@/lib/complete-history";
import { useNetworkStatus } from "@/lib/use-network-status";
import { useSearchParams } from "next/navigation";
import { shareCompleteResult } from "@/lib/complete-sharing";

interface Entry { name: string; score: number; found: number; completed: number }
const EMPTY: CompleteProgress = { found: [], revealed: [] };

export default function CompleteClient() {
  const { bank, date, error } = useCompleteBank();
  const query = useSearchParams().toString();
  if (error) return <p role="alert" className="rounded-2xl border border-danger p-6">{error} <button onClick={() => location.reload()} className="underline">Reload</button></p>;
  if (!bank || !date) return <p role="status" className="p-8 text-text-muted">Preparing the board...</p>;
  const selection = selectCompleteSession(bank, date, query);
  if ("error" in selection) return <p role="alert" className="rounded-2xl border border-accent p-6">{selection.error} <Link href="/complete/archive/" className="underline">Open archive</Link></p>;
  const { puzzle, mode, replay } = selection;
  const practice = mode === "practice" || mode === "replay";
  return <CompleteGame key={progressKey(puzzle, mode === "practice", replay)} puzzle={puzzle} practice={practice} ranked={mode === "daily"} replay={replay} mode={mode} />;
}

function CompleteGame({ puzzle, practice, ranked, replay, mode }: { puzzle: CompletePuzzle; practice: boolean; ranked: boolean; replay: string; mode: CompleteMode }) {
  const [progress, setProgress] = useState<CompleteProgress>(EMPTY);
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [path, setPath] = useState<Position[]>([]);

  const progressRef = useRef<CompleteProgress>(EMPTY);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Find your first word.");
  const [hint, setHint] = useState("");
  const [turns, setTurns] = useState(0);
  const [tutorial, setTutorial] = useState(false);
  const [hintView, setHintView] = useState(0);
  const [shareStatus, setShareStatus] = useState("");
  const [sharePreview, setSharePreview] = useState("");
  const [name, setName] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [boardStatus, setBoardStatus] = useState("Loading leaderboard...");
  const [posting, setPosting] = useState(false);
  const [receipt, setReceipt] = useState("");
  const mounted = useRef(true);
  const autoTutorialTracked = useRef(false);
  const measurement = useRef<CompleteMeasurement | null>(null);
  const analyticsContext = useMemo(() => completeAnalyticsContext(puzzle, mode), [puzzle, mode]);
  const online = useNetworkStatus();
  const key = progressKey(puzzle, mode === "practice", replay);
  useEffect(() => {
    mounted.current = true;
    try {
      const saved = mergeCompleteProgress(puzzle, EMPTY, JSON.parse(localStorage.getItem(key) || "null"));
      progressRef.current = saved;
      setProgress(saved);
      if (saved.found.length) setMessage("Your saved collection is restored.");
    }
    catch { setStorageWarning(true); }
    let needsTutorial = true;
    try { needsTutorial = localStorage.getItem("wordgrid-complete-tutorial-v1") !== "done"; } catch { /* Show tutorial without storage. */ }
    setTutorial(needsTutorial);
    // Access storage lazily so a blocked getter cannot prevent gameplay.
    measurement.current = new CompleteMeasurement(puzzle, mode, progressRef.current, key, {
      getItem: name => localStorage.getItem(name), setItem: (name, value) => localStorage.setItem(name, value),
    }, trackEvent, () => performance.now());
    measurement.current.clock.setEnabled(!document.hidden && !needsTutorial);
    if (needsTutorial && !autoTutorialTracked.current) {
      autoTutorialTracked.current = true;
      trackEvent("complete_tutorial_start", { ...analyticsContext, source: "first_visit" });
    }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== localStorage || !event.newValue) return;
      try {
        const merged = mergeCompleteProgress(puzzle, progressRef.current, JSON.parse(event.newValue));
        progressRef.current = merged;
        setProgress((current) => JSON.stringify(current) === JSON.stringify(merged) ? current : merged);
        // Republish the union if simultaneous writes left storage with a stale subset.
        if (JSON.stringify(merged) !== event.newValue) localStorage.setItem(key, JSON.stringify(merged));
      } catch { setStorageWarning(true); }
    };
    window.addEventListener("storage", sync);
    return () => { mounted.current = false; window.removeEventListener("storage", sync); };
  }, [key, puzzle, mode, analyticsContext]);
  useEffect(() => {
    const visibility = () => measurement.current?.clock.setEnabled(!document.hidden && !tutorial);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [tutorial]);
  useEffect(() => {
    if (!ready) return;
    try {
      const merged = mergeCompleteProgress(puzzle, progress, JSON.parse(localStorage.getItem(key) || "null"));
      progressRef.current = merged;
      if (JSON.stringify(merged) !== JSON.stringify(progress)) setProgress(merged);
      localStorage.setItem(key, JSON.stringify(merged));
    }
    catch { setStorageWarning(true); }
  }, [key, progress, puzzle, ready]);

  const loadLeaderboard = useCallback(async (signal?: AbortSignal) => {
    if (!ranked) { setBoardStatus("Archive and replay sessions are not submitted to today's leaderboard."); return; }
    if (!online) { setBoardStatus("Offline: scores stay on this device. Reconnect to load the leaderboard or submit today's original session."); return; }
    try {
      const response = await fetch(`/api/complete/score?date=${puzzle.date}&version=${puzzle.version}`, { signal });
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!Array.isArray(data.entries)) throw new Error();
      if (mounted.current) { setEntries(data.entries); setBoardStatus(data.remote ? "" : "Leaderboard is not enabled here. Your local game still works."); }
    } catch (reason) {
      if (mounted.current && !(reason instanceof Error && reason.name === "AbortError")) setBoardStatus("Leaderboard unavailable. Your progress is saved locally when storage is available.");
    }
  }, [ranked, puzzle.date, puzzle.version, online]);
  useEffect(() => {
    const controller = new AbortController();
    void loadLeaderboard(controller.signal);
    return () => controller.abort();
  }, [loadLeaderboard]);

  const changePath = (next: Position[]) => {
    if (ready && !tutorial && next.length >= 2) measurement.current?.interaction(progressRef.current);
    setPath(next); if (next.length) setHint("");
  };
  const recordFind = (word: string, revealed = false) => {
    const before = progressRef.current;
    if (before.found.includes(word)) return;
    const next = { ...before, found: [...new Set([...before.found, word])], revealed: revealed ? [...before.revealed, word] : before.revealed, hintLevel: revealed ? 3 : before.hintLevel };
    progressRef.current = next;
    setProgress(next);
    measurement.current?.record(before, next, revealed ? "reveal" : "find");
  };
  const submit = (value: string) => {
    if (!ready || tutorial) return;
    if (value.trim().length >= 4) measurement.current?.interaction(progressRef.current);
    const result = checkCompleteWord(puzzle, value, [...progressRef.current.found, ...(progressRef.current.extra || [])]);
    if (result.kind === "required" || result.kind === "bonus") {
      recordFind(result.word);
      setMessage(`${result.word}: ${result.kind === "bonus" ? "bonus word" : "target found"}!`);
    } else if (result.kind === "extra") {
      const before = progressRef.current;
      const next = { ...progressRef.current, extra: [...new Set([...(progressRef.current.extra || []), result.word])] };
      progressRef.current = next; setProgress(next);
      measurement.current?.record(before, next, "extra");
      setMessage(`${result.word}: extra word recognized! No points; this board keeps its original target and bonus lists.`);
    } else setMessage(result.kind === "duplicate" ? `${result.word} is already found.` : result.kind === "unknown" ? `${result.word} is not in this puzzle's editorial word list.` : "Use a connected path of at least four letters without reusing tiles.");
    setInput(""); changePath([]); setHint("");
  };
  const targets = progress.found.filter((word) => puzzle.requiredWords.includes(word));
  const bonus = progress.found.filter((word) => puzzle.bonusWords.includes(word));
  const complete = targets.length === puzzle.requiredWords.length;
  const score = completeScore(puzzle, progress.found, progress.revealed);
  const remaining = puzzle.requiredWords.filter((word) => !progress.found.includes(word));
  const lengths = [...new Set(puzzle.requiredWords.map((word) => word.length))].sort((a, b) => a - b);
  const selectedWord = path.map(({ row, col }) => puzzle.board[row][col].toUpperCase()).join("");
  const hintSteps = completeHintProgress(puzzle, progress);
  const unlock = hintSteps.filter((step) => step.unlocked).length;
  const nextHint = hintSteps.find((step) => !step.unlocked);
  const counts = useMemo(() => hintView >= 1 ? remainingStartCounts(puzzle, progress.found) : undefined, [hintView, puzzle, progress.found]);
  const preview = useMemo(() => hint ? findCompletePath(puzzle, hint) || [] : [], [hint, puzzle]);
  const activateHints = (level: number) => {
    if (!ready || tutorial || level > unlock) return;
    setHintView(level);
    const before = progressRef.current;
    const next = { ...progressRef.current, hintLevel: Math.max(progressRef.current.hintLevel || 0, level) };
    progressRef.current = next;
    setProgress(next);
    measurement.current?.record(before, next, "hint");
    setMessage(level === 1 ? "Tile badges count remaining target words starting there." : "Missing targets now show their first letter.");
  };
  const closeTutorial = (reason: "complete" | "skip", step: number) => {
    trackEvent(reason === "complete" ? "complete_tutorial_finish" : "complete_tutorial_skip", { ...analyticsContext, step });
    setTutorial(false);
    try { localStorage.setItem("wordgrid-complete-tutorial-v1", "done"); } catch { /* The tutorial remains available without storage. */ }
  };
  const share = async (copy: boolean) => {
    const text = completeShareText(puzzle, progress, practice);
    setSharePreview(text);
    const result = await shareCompleteResult(text, copy, {
      share: navigator.share?.bind(navigator), clipboard: navigator.clipboard,
    });
    setShareStatus(result.message);
    if (result.success) trackEvent("complete_share_success", { ...analyticsContext, method: result.method, targets_found: targets.length });
  };
  const review = (word: string) => {setPath([]);setHint(word);setMessage(`Reviewing ${word}: follow the numbered trail. This does not change your score.`);};
  const reveal = () => {
    if (!ready || tutorial || unlock < 3) return;
    const word = remaining[0];
    if (!word) return;
    recordFind(word, true);
    setHint(word); setMessage(`${word} revealed. No points awarded.`); changePath([]);
  };
  const postScore = async (event: FormEvent) => {
    event.preventDefault();
    if (posting || !ranked || !online || !progress.found.length) return;
    setPosting(true); setReceipt("Submitting...");
    try {
      const response = await fetch("/api/complete/score", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: puzzle.date, version: puzzle.version, name: name.trim(), words: progress.found, revealed: progress.revealed }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit score.");
      if (mounted.current) {
        setReceipt(`Saved as ${data.name}: ${data.score} points, ${data.found} targets. Your best score is kept.`);
        await loadLeaderboard();
      }
    } catch (reason) { if (mounted.current) setReceipt(reason instanceof Error ? reason.message : "Could not submit score."); }
    finally { if (mounted.current) setPosting(false); }
  };

  return (
    <>
      <nav aria-label="Complete navigation" className="mb-5 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/complete/" className="rounded-full border border-border px-4 py-2 hover:border-primary">Today's board</Link>
        <Link href="/complete/archive/" className="rounded-full border border-border px-4 py-2 hover:border-primary">Archive & personal stats</Link>
        <button onClick={() => window.location.assign(replayUrl(puzzle))} className="px-2 py-2 text-primary">Start separate replay</button>
      </nav>
      {mode === "practice" && <p role="status" className="mb-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">Practice board: there is no published puzzle for today. This is a saved board from {puzzle.date}, not today's challenge.</p>}
      {mode === "replay" && <p role="status" className="mb-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">Separate replay · {puzzle.date}. Your original collection and personal stats are preserved. This replay is not ranked.</p>}
      {mode === "archive" && <p role="status" className="mb-5 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">Archive · {puzzle.date}. Continue your original saved collection, or start a separate replay. Historical sessions are not ranked.</p>}
      {storageWarning && <p role="status" className="mb-4 text-sm text-accent">Browser storage is unavailable or the saved game could not be read. Progress may not survive a reload.</p>}
      {tutorial && <CompleteTutorial onClose={closeTutorial} />}
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]" onPointerDown={() => { if (!tutorial) measurement.current?.activity(); }} onKeyDown={() => { if (!tutorial) measurement.current?.activity(); }}>
        <section className="min-w-0 rounded-3xl border border-border bg-gradient-to-br from-surface to-bg p-4 sm:p-6 shadow-xl" aria-label="Daily puzzle">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-primary">
                <span>🧩</span>
                <span>{practice ? "Practice Board" : puzzle.date} · {puzzle.difficulty}</span>
              </div>
              <p className="mt-2 text-3xl font-black tracking-tight" data-testid="complete-progress">
                {targets.length}
                <span className="text-text-dim font-bold text-xl"> / {puzzle.requiredWords.length} targets</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-text-muted font-bold block">Score</span>
              <span className="text-2xl font-black text-amber-400 tabular-nums">{score}</span>
            </div>
          </div>
          {puzzle.quality && <details className="mt-3 text-xs text-text-muted"><summary className="cursor-pointer">About this difficulty</summary><p className="mt-2">{puzzle.requiredWords.length} targets, including {puzzle.quality.longWords} words of eight or more letters. Longer words and paths with more turns raise the difficulty estimate.</p></details>}

          {/* Gamified XP Collection Progress Bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-text-muted">Collection Trail</span>
              <span className="text-primary font-mono">{Math.round((targets.length / puzzle.requiredWords.length) * 100)}%</span>
            </div>
            <div className="relative h-2.5 w-full rounded-full bg-surface-hover/80 overflow-hidden p-0.5 border border-border/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-primary to-amber-400 transition-all duration-300 shadow-sm"
                style={{ width: `${Math.min(100, Math.max(0, Math.round((targets.length / puzzle.requiredWords.length) * 100)))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-text-dim px-0.5 font-mono">
              <span>0%</span>
              <span className={unlock >= 1 ? "text-primary font-bold" : ""}>20% (Counts)</span>
              <span className={unlock >= 2 ? "text-primary font-bold" : ""}>40% (Letters)</span>
              <span className={unlock >= 3 ? "text-amber-400 font-bold" : ""}>60% (Reveals)</span>
              <span>100%</span>
            </div>
            <progress value={targets.length} max={puzzle.requiredWords.length} aria-label="Target words found" className="sr-only" />
          </div>
          {complete && <div role="status" className="mt-4 rounded-xl border border-success/40 bg-success/10 p-4"><h2 className="font-bold text-success">Board complete!</h2><p className="mt-1 text-sm">Every target found. {score} points{progress.revealed.length ? `, ${progress.revealed.length} revealed` : " without reveals"}. Return tomorrow for a new trail.</p></div>}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <button disabled={!ready} className="text-primary disabled:opacity-40" onClick={()=>{setTurns((turns+1)%4);setMessage("Board rotated 90 degrees. Score and progress are unchanged.");}}>Rotate 90°</button>
            <span className="text-text-dim">View {turns*90}°</span>
            <button className="text-text-muted" onClick={()=>{trackEvent("complete_tutorial_start", { ...analyticsContext, source: "replay" });setTutorial(true);}}>Quick start</button>
          </div>
          <CompleteLetterBoard puzzle={puzzle} turns={turns} path={path} preview={preview} counts={counts} disabled={!ready || tutorial} onPath={changePath} onSubmit={trail=>submit(wordFromPath(puzzle,trail)||"")} onFeedback={setMessage} />
          {hint && <div className="mb-4 rounded-xl border border-accent/30 p-3 text-sm">
            <p className="font-semibold">{hint} / {hint.length} letters</p>
            <p className="mt-1 text-text-muted">Follow the line and numbered tiles to review its path.</p>
            {INDEXABLE_WORDS.includes(hint.toLowerCase()) ? <Link className="mt-2 inline-block text-primary underline" href={`/words/${hint.toLowerCase()}/`}>Open word guide</Link> : <p className="mt-2 text-xs text-text-dim">Path review only. No sourced definition is available for this word here.</p>}
            <button className="ml-3 text-text-muted" onClick={()=>setHint("")}>Close review</button>
          </div>}
          <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 rounded-xl bg-bg/60 px-3 py-2">
            <span className="min-w-0 break-all font-mono font-semibold" aria-live="polite">{selectedWord || "Select a trail"}</span>
            <div className="flex shrink-0 flex-wrap gap-3"><button type="button" disabled={!path.length || tutorial} className="text-sm text-text-muted disabled:opacity-40" onClick={() => {changePath(path.slice(0,-1));setMessage("Last tile removed.");}}>Undo</button><button type="button" disabled={!path.length || tutorial} className="text-sm text-text-muted disabled:opacity-40" onClick={() => {changePath([]);setMessage("Trail cleared.");}}>Clear</button><button type="button" disabled={!path.length || !ready || tutorial} onClick={() => submit(wordFromPath(puzzle, path) || "")} className="text-sm font-bold text-primary disabled:opacity-40">Submit path</button></div>
          </div>
          <form className="mt-4 flex gap-2" onSubmit={(event) => {event.preventDefault(); submit(input);}}>
            <label htmlFor="complete-word" className="sr-only">Type a word</label>
            <input id="complete-word" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={16} placeholder="Or type a word" className="min-w-0 flex-1 rounded-xl border border-border bg-bg px-3 py-3" disabled={!ready || tutorial} />
            <button className="rounded-xl bg-primary px-4 py-3 font-semibold text-white disabled:opacity-40" disabled={!ready || tutorial || !input.trim()}>Find</button>
          </form>
          <p role="status" className="mt-3 min-h-12 text-sm text-text-muted">{message}</p>
          <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4 text-sm"><span>{score} points / {bonus.length} bonus words</span><button disabled={!remaining.length || !ready || tutorial || unlock < 3} onClick={reveal} className="text-accent disabled:opacity-40">Reveal one target (0 points)</button></div>
        </section>
        <section className="min-w-0 rounded-3xl border border-border bg-surface/40 p-5 sm:p-6" aria-label="Target word collection">
          <div className="flex justify-between gap-3"><h2 className="text-xl font-bold">Your collection</h2><span className="text-sm text-text-muted">{remaining.length} to find</span></div>
          <div className="mt-4 rounded-xl border border-border p-3 text-sm">
            <p className="font-semibold">Hints unlock as you collect: 20% / 40% / 60%</p>
            <p aria-live="polite" className="mt-2 text-sm text-text-muted">
              {nextHint
                ? `Find ${nextHint.remaining} more target ${nextHint.remaining === 1 ? "word" : "words"} to unlock ${nextHint.label.toLowerCase()} (${nextHint.percent}%).`
                : "All hints unlocked. You can use them or keep searching without hints."}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {hintSteps.slice(0, 2).map((step) => (
                <button key={step.level} disabled={!ready || tutorial || !step.unlocked} onClick={()=>activateHints(step.level)} className="text-primary disabled:text-text-dim">
                  {step.label} {step.unlocked ? "(unlocked)" : `(${step.remaining} more)`}
                </button>
              ))}
              <button onClick={()=>setHintView(0)} className="text-text-muted">Hide hints</button>
            </div>
            <p className="mt-2 text-xs text-text-muted">Only target words advance hint unlocks. Reveals unlock at 60% and earn no points. Using counts or letters is recorded even if you hide them.</p>
          </div>
          <div className="mt-5 space-y-5">{lengths.map((length) => {
            const words = puzzle.requiredWords.filter((word) => word.length === length);
            return <div key={length}><h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-dim">{length} letters / {words.filter((word) => progress.found.includes(word)).length} of {words.length}</h3><div className="flex flex-wrap gap-2">{words.map((word) => <button type="button" key={word} disabled={!progress.found.includes(word)} onClick={()=>review(word)} aria-label={progress.found.includes(word)?`Review path for ${word}`:undefined} className={`rounded-lg border px-2 py-1 font-mono text-sm disabled:cursor-default ${progress.found.includes(word) ? progress.revealed.includes(word) ? "border-accent/40 text-accent" : "border-success/30 text-success" : "border-border text-text-dim"}`}>{progress.found.includes(word) ? word : hintView>=2 ? word[0]+"·".repeat(length-1) : "·".repeat(length)}{progress.revealed.includes(word) ? " *" : ""}</button>)}</div></div>;
          })}</div>
          <h3 className="mt-6 border-t border-border pt-4 text-sm font-semibold">Bonus collection</h3><div className="mt-2 flex flex-wrap gap-2 text-sm text-text-muted">{bonus.length ? bonus.map(word=><button key={word} onClick={()=>review(word)} aria-label={`Review path for ${word}`} className="rounded-lg border border-border px-2 py-1 font-mono">{word}</button>) : "Extra discoveries will appear here."}</div>
          {progress.revealed.length > 0 && <p className="mt-3 text-xs text-accent">* Revealed words earn no points.</p>}
          {!!puzzle.extraWords?.length && <div className="mt-5 border-t border-border pt-4"><h3 className="text-sm font-semibold">Recognized extras · {progress.extra?.length || 0}</h3><p className="mt-2 text-xs text-text-muted">Other accepted words earn no points on this original-edition board, keeping its published targets and scores intact.</p><div className="mt-2 flex flex-wrap gap-2">{progress.extra?.map(word => <button key={word} onClick={() => review(word)} className="rounded-lg border border-border px-2 py-1 font-mono text-sm">{word}</button>)}</div></div>}
        </section>
      </div>
      <section className="mt-6 rounded-3xl border border-border p-5 sm:p-6" aria-label="Spoiler-free sharing">
        <h2 className="text-xl font-bold">Share the discovery, not the answers.</h2>
        <p className="mt-2 text-sm text-text-muted">Only the date, completion, bonus count and hint status are shared.</p>
        <div className="mt-3 flex flex-wrap gap-3"><button disabled={!ready} onClick={()=>void share(false)} className="rounded-xl bg-primary px-4 py-2 font-semibold text-white">Share result</button><button disabled={!ready} onClick={()=>void share(true)} className="rounded-xl bg-surface px-4 py-2">Copy result</button><button onClick={()=>setSharePreview(completeShareText(puzzle,progress,practice))} className="text-sm text-text-muted">Preview text</button></div>
        <p role="status" className="mt-2 text-sm text-text-muted">{shareStatus}</p>
        {sharePreview && <textarea aria-label="Spoiler-free result text" readOnly value={completeShareText(puzzle,progress,practice)} rows={6} className="mt-3 w-full rounded-xl border border-border bg-bg p-3 text-sm" />}
      </section>
      <section className="mt-6 rounded-3xl border border-border p-5 sm:p-6" aria-label="Daily leaderboard">
        <h2 className="text-xl font-bold">Daily collection board</h2><p className="mt-2 text-sm text-text-muted">Optional public leaderboard. Submitting publishes your display name and score. Do not use personal information. Found words are sent for validation. No speed ranking or account verification.</p>
        {ranked && <form onSubmit={postScore} className="mt-4 flex flex-wrap gap-2"><label htmlFor="complete-name" className="sr-only">Public display name</label><input id="complete-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={24} required pattern="[A-Za-z0-9 _-]{1,24}" placeholder="Public display name" className="min-w-0 rounded-xl border border-border bg-surface px-3 py-2" /><button disabled={!ready || posting || !online || !progress.found.length} className="rounded-xl bg-surface px-4 py-2 font-semibold disabled:opacity-40">{posting ? "Submitting..." : "Submit my score"}</button><button type="button" disabled={!online} onClick={() => void loadLeaderboard()} className="px-3 py-2 text-sm text-text-muted disabled:opacity-40">Refresh</button></form>}
        <p role="status" className="mt-3 text-sm text-text-muted">{boardStatus}</p>
        <p role="status" className="mt-2 text-sm text-text-muted">{receipt}</p>
        {entries.length > 0 && <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Top 50 daily scores</caption><thead><tr className="border-b border-border"><th className="py-2">Name</th><th>Points</th><th>Targets</th><th>Complete</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={index} className="border-b border-border/50"><td className="py-2">{entry.name}</td><td>{entry.score}</td><td>{entry.found}/{puzzle.requiredWords.length}</td><td>{entry.completed ? "Yes" : "Not yet"}</td></tr>)}</tbody></table></div>}
      </section>
    </>
  );
}
