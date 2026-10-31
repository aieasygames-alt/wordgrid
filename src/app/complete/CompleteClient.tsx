"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { checkCompleteWord, completeDate, completeScore, CompleteBank, CompleteProgress, CompletePuzzle, findCompletePath, completeHintUnlock, completeShareText, remainingStartCounts, mergeCompleteProgress, Position, progressKey, selectCompletePuzzle, wordFromPath } from "@/lib/complete";
import Link from "next/link";
import { INDEXABLE_WORDS } from "@/lib/indexable-words";
import CompleteLetterBoard from "@/components/CompleteLetterBoard";
import CompleteTutorial from "@/components/CompleteTutorial";
import ThemeToggle from "@/components/ThemeToggle";

interface Entry { name: string; score: number; found: number; completed: number }
const EMPTY: CompleteProgress = { found: [], revealed: [] };

export default function CompleteClient() {
  const [bank, setBank] = useState<CompleteBank | null>(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/complete/bank-v1.json", { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error("The puzzle bank could not be loaded.");
      return response.json();
    }).then((value: CompleteBank) => {
      if (value.version !== "1" || !Array.isArray(value.puzzles) || !value.puzzles.length) throw new Error("Unsupported puzzle bank.");
      setBank(value);
    }).catch((reason: Error) => { if (reason.name !== "AbortError") setError("Unable to load today's board. Please reload to try again."); });
    const tick = () => setDate(completeDate());
    tick();
    const timer = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { controller.abort(); clearInterval(timer); document.removeEventListener("visibilitychange", tick); };
  }, []);
  if (error) return <p role="alert" className="rounded-2xl border border-danger p-6">{error} <button onClick={() => location.reload()} className="underline">Reload</button></p>;
  if (!bank || !date) return <p role="status" className="p-8 text-text-muted">Preparing the board...</p>;
  const { puzzle, practice } = selectCompletePuzzle(bank, date);
  return <CompleteGame key={progressKey(puzzle, practice)} puzzle={puzzle} practice={practice} />;
}

function CompleteGame({ puzzle, practice }: { puzzle: CompletePuzzle; practice: boolean }) {
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
  const key = progressKey(puzzle, practice);
  useEffect(() => {
    mounted.current = true;
    try {
      const saved = mergeCompleteProgress(puzzle, EMPTY, JSON.parse(localStorage.getItem(key) || "null"));
      progressRef.current = saved;
      setProgress(saved);
      if (saved.found.length) setMessage("Your saved collection is restored.");
    }
    catch { setStorageWarning(true); }
    try { setTutorial(localStorage.getItem("wordgrid-complete-tutorial-v1") !== "done"); } catch { setTutorial(true); }
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
  }, [key, puzzle]);
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
    if (practice) { setBoardStatus("Practice boards are not ranked."); return; }
    try {
      const response = await fetch(`/api/complete/score?date=${puzzle.date}`, { signal });
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!Array.isArray(data.entries)) throw new Error();
      if (mounted.current) { setEntries(data.entries); setBoardStatus(data.remote ? "" : "Leaderboard is not enabled here. Your local game still works."); }
    } catch (reason) {
      if (mounted.current && !(reason instanceof Error && reason.name === "AbortError")) setBoardStatus("Leaderboard unavailable. Your progress is saved locally when storage is available.");
    }
  }, [practice, puzzle.date]);
  useEffect(() => {
    const controller = new AbortController();
    void loadLeaderboard(controller.signal);
    return () => controller.abort();
  }, [loadLeaderboard]);

  const changePath = (next: Position[]) => { setPath(next); if (next.length) setHint(""); };
  const submit = (value: string) => {
    if (!ready || tutorial) return;
    const result = checkCompleteWord(puzzle, value, progress.found);
    if (result.kind === "required" || result.kind === "bonus") {
      setProgress((current) => ({ ...current, found: [...new Set([...current.found, result.word])] }));
      setMessage(`${result.word}: ${result.kind === "bonus" ? "bonus word" : "target found"}!`);
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
  const unlock = completeHintUnlock(puzzle, progress);
  const counts = useMemo(() => hintView >= 1 ? remainingStartCounts(puzzle, progress.found) : undefined, [hintView, puzzle, progress.found]);
  const preview = useMemo(() => hint ? findCompletePath(puzzle, hint) || [] : [], [hint, puzzle]);
  const activateHints = (level: number) => {
    if (!ready || tutorial || level > unlock) return;
    setHintView(level);
    setProgress(current => ({...current, hintLevel: Math.max(current.hintLevel || 0, level)}));
    setMessage(level === 1 ? "Tile badges count remaining target words starting there." : "Missing targets now show their first letter.");
  };
  const closeTutorial = () => {setTutorial(false);try {localStorage.setItem("wordgrid-complete-tutorial-v1","done");} catch { /* The tutorial remains available without storage. */ }};
  const share = async (copy: boolean) => {
    const text = completeShareText(puzzle, progress, practice);
    setSharePreview(text);
    try {
      if (!copy && navigator.share) { await navigator.share({text}); setShareStatus("Share sheet completed."); }
      else { await navigator.clipboard.writeText(text); setShareStatus("Result copied. No answers included."); }
    } catch (reason) {setShareStatus(reason instanceof Error && reason.name === "AbortError" ? "Sharing cancelled." : "Sharing unavailable. Select and copy the preview below.");}
  };
  const review = (word: string) => {setPath([]);setHint(word);setMessage(`Reviewing ${word}: follow the numbered trail. This does not change your score.`);};
  const reveal = () => {
    if (!ready || tutorial || unlock < 3) return;
    const word = remaining[0];
    if (!word) return;
    setProgress((current) => ({ ...current, found: [...new Set([...current.found, word])], revealed: [...current.revealed, word], hintLevel: 3 }));
    setHint(word); setMessage(`${word} revealed. No points awarded.`); changePath([]);
  };
  const postScore = async (event: FormEvent) => {
    event.preventDefault();
    if (posting || practice || !progress.found.length) return;
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
      {practice && <p role="status" className="mb-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">Practice board: there is no published puzzle for today. This is a saved board from {puzzle.date}, not today's challenge.</p>}
      {storageWarning && <p role="status" className="mb-4 text-sm text-accent">Browser storage is unavailable or the saved game could not be read. Progress may not survive a reload.</p>}
      {tutorial && <CompleteTutorial onClose={closeTutorial} />}
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
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
            <button className="text-text-muted" onClick={()=>setTutorial(true)}>Quick start</button>
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
            <div className="mt-3 flex flex-wrap gap-3">
              <button disabled={!ready || tutorial || unlock<1} onClick={()=>activateHints(1)} className="text-primary disabled:text-text-dim">Start counts {unlock<1?"(20%)":""}</button>
              <button disabled={!ready || tutorial || unlock<2} onClick={()=>activateHints(2)} className="text-primary disabled:text-text-dim">First letters {unlock<2?"(40%)":""}</button>
              <button onClick={()=>setHintView(0)} className="text-text-muted">Hide hints</button>
            </div>
            <p className="mt-2 text-xs text-text-muted">Reveals unlock at 60% and earn no points. Using counts or letters is recorded even if you hide them.</p>
          </div>
          <div className="mt-5 space-y-5">{lengths.map((length) => {
            const words = puzzle.requiredWords.filter((word) => word.length === length);
            return <div key={length}><h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-dim">{length} letters / {words.filter((word) => progress.found.includes(word)).length} of {words.length}</h3><div className="flex flex-wrap gap-2">{words.map((word) => <button type="button" key={word} disabled={!progress.found.includes(word)} onClick={()=>review(word)} aria-label={progress.found.includes(word)?`Review path for ${word}`:undefined} className={`rounded-lg border px-2 py-1 font-mono text-sm disabled:cursor-default ${progress.found.includes(word) ? progress.revealed.includes(word) ? "border-accent/40 text-accent" : "border-success/30 text-success" : "border-border text-text-dim"}`}>{progress.found.includes(word) ? word : hintView>=2 ? word[0]+"·".repeat(length-1) : "·".repeat(length)}{progress.revealed.includes(word) ? " *" : ""}</button>)}</div></div>;
          })}</div>
          <h3 className="mt-6 border-t border-border pt-4 text-sm font-semibold">Bonus collection</h3><div className="mt-2 flex flex-wrap gap-2 text-sm text-text-muted">{bonus.length ? bonus.map(word=><button key={word} onClick={()=>review(word)} aria-label={`Review path for ${word}`} className="rounded-lg border border-border px-2 py-1 font-mono">{word}</button>) : "Extra discoveries will appear here."}</div>
          {progress.revealed.length > 0 && <p className="mt-3 text-xs text-accent">* Revealed words earn no points.</p>}
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
        {!practice && <form onSubmit={postScore} className="mt-4 flex flex-wrap gap-2"><label htmlFor="complete-name" className="sr-only">Public display name</label><input id="complete-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={24} required pattern="[A-Za-z0-9 _-]{1,24}" placeholder="Public display name" className="min-w-0 rounded-xl border border-border bg-surface px-3 py-2" /><button disabled={!ready || posting || !progress.found.length} className="rounded-xl bg-surface px-4 py-2 font-semibold disabled:opacity-40">{posting ? "Submitting..." : "Submit my score"}</button><button type="button" onClick={() => void loadLeaderboard()} className="px-3 py-2 text-sm text-text-muted">Refresh</button></form>}
        <p role="status" className="mt-3 text-sm text-text-muted">{boardStatus}</p>
        <p role="status" className="mt-2 text-sm text-text-muted">{receipt}</p>
        {entries.length > 0 && <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Top 50 daily scores</caption><thead><tr className="border-b border-border"><th className="py-2">Name</th><th>Points</th><th>Targets</th><th>Complete</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={index} className="border-b border-border/50"><td className="py-2">{entry.name}</td><td>{entry.score}</td><td>{entry.found}/{puzzle.requiredWords.length}</td><td>{entry.completed ? "Yes" : "Not yet"}</td></tr>)}</tbody></table></div>}
      </section>
    </>
  );
}
