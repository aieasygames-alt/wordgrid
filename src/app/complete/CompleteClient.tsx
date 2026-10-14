"use client";

import { FormEvent, PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { checkCompleteWord, cleanProgress, completeDate, completeScore, CompleteBank, CompleteProgress, CompletePuzzle, findCompletePath, Position, progressKey, selectCompletePuzzle, wordFromPath } from "@/lib/complete";
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
  const pathRef = useRef<Position[]>([]);
  const pointer = useRef<number | null>(null);
  const dragged = useRef(false);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Find your first word.");
  const [hint, setHint] = useState("");
  const [name, setName] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [boardStatus, setBoardStatus] = useState("Loading leaderboard...");
  const [posting, setPosting] = useState(false);
  const mounted = useRef(true);
  const key = progressKey(puzzle, practice);
  useEffect(() => {
    mounted.current = true;
    try {
      const saved = cleanProgress(puzzle, JSON.parse(localStorage.getItem(key) || "null"));
      setProgress(saved);
      if (saved.found.length) setMessage("Your saved collection is restored.");
    }
    catch { setStorageWarning(true); }
    setReady(true);
    return () => { mounted.current = false; };
  }, [key, puzzle]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(progress)); }
    catch { setStorageWarning(true); }
  }, [key, progress, ready]);

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

  const changePath = (next: Position[]) => { pathRef.current = next; setPath(next); };
  const addTile = (cell: Position) => {
    const current = pathRef.current;
    const previous = current[current.length - 1];
    if (previous?.row === cell.row && previous.col === cell.col) return;
    if (current.length > 1 && current[current.length - 2].row === cell.row && current[current.length - 2].col === cell.col) { changePath(current.slice(0, -1)); return; }
    if (current.some((item) => item.row === cell.row && item.col === cell.col)) return;
    if (previous && (Math.abs(previous.row - cell.row) > 1 || Math.abs(previous.col - cell.col) > 1)) return;
    changePath([...current, cell]);
  };
  const submit = (value: string) => {
    if (!ready) return;
    const result = checkCompleteWord(puzzle, value, progress.found);
    if (result.kind === "required" || result.kind === "bonus") {
      setProgress((current) => ({ ...current, found: [...new Set([...current.found, result.word])] }));
      setMessage(`${result.word}: ${result.kind === "bonus" ? "bonus word" : "target found"}!`);
    } else setMessage(result.kind === "duplicate" ? `${result.word} is already found.` : result.kind === "unknown" ? `${result.word} is not in this puzzle's editorial word list.` : "Use a connected path of at least four letters without reusing tiles.");
    setInput(""); changePath([]); setHint("");
  };
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>, cell: Position) => {
    if (!ready || !event.isPrimary || event.button !== 0) return;
    pointer.current = event.pointerId; dragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    addTile(cell);
  };
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointer.current !== event.pointerId) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>("button[data-complete-cell]");
    if (target && event.currentTarget.closest("[data-complete-board]")?.contains(target)) {
      const cell = { row: Number(target.dataset.row), col: Number(target.dataset.col) };
      const last = pathRef.current.at(-1);
      if (last && (last.row !== cell.row || last.col !== cell.col)) dragged.current = true;
      addTile(cell);
    }
  };
  const endPointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointer.current !== event.pointerId) return;
    pointer.current = null;
    if (dragged.current) submit(wordFromPath(puzzle, pathRef.current) || "");
  };
  const targets = progress.found.filter((word) => puzzle.requiredWords.includes(word));
  const bonus = progress.found.filter((word) => puzzle.bonusWords.includes(word));
  const complete = targets.length === puzzle.requiredWords.length;
  const score = completeScore(puzzle, progress.found, progress.revealed);
  const remaining = puzzle.requiredWords.filter((word) => !progress.found.includes(word));
  const lengths = [...new Set(puzzle.requiredWords.map((word) => word.length))].sort((a, b) => a - b);
  const selectedWord = path.map(({ row, col }) => puzzle.board[row][col].toUpperCase()).join("");
  const reveal = () => {
    const word = remaining[0];
    if (!word) return;
    setProgress((current) => ({ found: [...new Set([...current.found, word])], revealed: [...current.revealed, word] }));
    setHint(word); setMessage(`${word} revealed. No points awarded.`); changePath([]);
  };
  const postScore = async (event: FormEvent) => {
    event.preventDefault();
    if (posting || practice || !progress.found.length) return;
    setPosting(true); setBoardStatus("Submitting...");
    try {
      const response = await fetch("/api/complete/score", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: puzzle.date, version: puzzle.version, name: name.trim(), words: progress.found, revealed: progress.revealed }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit score.");
      if (mounted.current) { setBoardStatus("Score submitted. Only your best score for this browser is kept."); await loadLeaderboard(); }
    } catch (reason) { if (mounted.current) setBoardStatus(reason instanceof Error ? reason.message : "Could not submit score."); }
    finally { if (mounted.current) setPosting(false); }
  };

  return (
    <>
      {practice && <p role="status" className="mb-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">Practice board: there is no published puzzle for today. This is a saved board from {puzzle.date}, not today's challenge.</p>}
      {storageWarning && <p role="status" className="mb-4 text-sm text-accent">Browser storage is unavailable or the saved game could not be read. Progress may not survive a reload.</p>}
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-3xl border border-border bg-gradient-to-br from-surface to-bg p-4 sm:p-6" aria-label="Daily puzzle">
          <div className="flex items-center justify-between gap-3">
            <div><p className="text-xs uppercase tracking-widest text-text-muted">{practice ? "Practice" : puzzle.date} / {puzzle.difficulty}</p><p className="mt-2 text-3xl font-bold" data-testid="complete-progress">{targets.length}<span className="text-text-dim"> / {puzzle.requiredWords.length}</span></p></div>
            <ThemeToggle />
          </div>
          <progress value={targets.length} max={puzzle.requiredWords.length} aria-label="Target words found" className="mt-4 h-2 w-full accent-indigo-500" />
          {complete && <div role="status" className="mt-4 rounded-xl border border-success/40 bg-success/10 p-4"><h2 className="font-bold text-success">Board complete!</h2><p className="mt-1 text-sm">Every target found. {score} points{progress.revealed.length ? `, ${progress.revealed.length} revealed` : " without reveals"}. Return tomorrow for a new trail.</p></div>}
          <div data-complete-board className="mx-auto my-6 grid max-w-md grid-cols-4 gap-2 touch-none select-none" aria-label="Letter board" onKeyDown={(event) => { if (event.key === "Escape") changePath([]); }}>
            {puzzle.board.flatMap((row, r) => row.map((letter, c) => {
              const selected = path.findIndex((cell) => cell.row === r && cell.col === c);
              const hintSelected = hint ? findCompletePath(puzzle, hint)?.some((cell) => cell.row === r && cell.col === c) : false;
              return <button key={`${r}-${c}`} type="button" disabled={!ready} data-complete-cell data-row={r} data-col={c} aria-label={`Row ${r + 1}, column ${c + 1}: ${letter}`} aria-pressed={selected >= 0}
                className={`relative aspect-square rounded-xl border text-2xl font-bold transition-colors sm:text-3xl ${selected >= 0 ? "border-primary bg-primary text-white" : hintSelected ? "border-accent bg-accent/20" : "border-border bg-surface hover:bg-surface-hover"}`}
                onPointerDown={(event) => onPointerDown(event, {row:r,col:c})} onPointerMove={onPointerMove} onPointerUp={endPointer}
                onPointerCancel={() => { pointer.current = null; changePath([]); }}
                onClick={(event) => { if (event.detail === 0) addTile({row:r,col:c}); }}>{letter}{selected >= 0 && <span className="absolute right-1 top-1 text-[10px] leading-none opacity-80">{selected + 1}</span>}</button>;
            }))}
          </div>
          <div className="flex min-h-10 items-center justify-between gap-3 rounded-xl bg-bg/60 px-3 py-2">
            <span className="font-mono font-semibold" aria-live="polite">{selectedWord || "Select a trail"}</span>
            <div className="flex gap-3"><button type="button" className="text-sm text-text-muted" onClick={() => changePath([])}>Clear</button><button type="button" disabled={!path.length || !ready} onClick={() => submit(wordFromPath(puzzle, path) || "")} className="text-sm font-bold text-primary disabled:opacity-40">Submit path</button></div>
          </div>
          <form className="mt-4 flex gap-2" onSubmit={(event) => {event.preventDefault(); submit(input);}}>
            <label htmlFor="complete-word" className="sr-only">Type a word</label>
            <input id="complete-word" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={16} placeholder="Or type a word" className="min-w-0 flex-1 rounded-xl border border-border bg-bg px-3 py-3" disabled={!ready} />
            <button className="rounded-xl bg-primary px-4 py-3 font-semibold text-white disabled:opacity-40" disabled={!ready || !input.trim()}>Find</button>
          </form>
          <p role="status" className="mt-3 min-h-12 text-sm text-text-muted">{message}</p>
          <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4 text-sm"><span>{score} points / {bonus.length} bonus words</span><button disabled={!remaining.length || !ready} onClick={reveal} className="text-accent disabled:opacity-40">Reveal one target (0 points)</button></div>
        </section>
        <section className="rounded-3xl border border-border bg-surface/40 p-5 sm:p-6" aria-label="Target word collection">
          <div className="flex justify-between gap-3"><h2 className="text-xl font-bold">Your collection</h2><span className="text-sm text-text-muted">{remaining.length} to find</span></div>
          <div className="mt-5 space-y-5">{lengths.map((length) => {
            const words = puzzle.requiredWords.filter((word) => word.length === length);
            return <div key={length}><h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-dim">{length} letters / {words.filter((word) => progress.found.includes(word)).length} of {words.length}</h3><div className="flex flex-wrap gap-2">{words.map((word) => <span key={word} className={`rounded-lg border px-2 py-1 font-mono text-sm ${progress.found.includes(word) ? progress.revealed.includes(word) ? "border-accent/40 text-accent" : "border-success/30 text-success" : "border-border text-text-dim"}`}>{progress.found.includes(word) ? word : "·".repeat(length)}{progress.revealed.includes(word) ? " *" : ""}</span>)}</div></div>;
          })}</div>
          <h3 className="mt-6 border-t border-border pt-4 text-sm font-semibold">Bonus collection</h3><p className="mt-2 text-sm text-text-muted">{bonus.join(", ") || "Extra discoveries will appear here."}</p>
          {progress.revealed.length > 0 && <p className="mt-3 text-xs text-accent">* Revealed words earn no points.</p>}
        </section>
      </div>
      <section className="mt-6 rounded-3xl border border-border p-5 sm:p-6" aria-label="Daily leaderboard">
        <h2 className="text-xl font-bold">Daily collection board</h2><p className="mt-2 text-sm text-text-muted">Optional public leaderboard. Submitting publishes your display name and score. Do not use personal information. Found words are sent for validation. No speed ranking or account verification.</p>
        {!practice && <form onSubmit={postScore} className="mt-4 flex flex-wrap gap-2"><label htmlFor="complete-name" className="sr-only">Public display name</label><input id="complete-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={24} required pattern="[A-Za-z0-9 _-]{1,24}" placeholder="Public display name" className="min-w-0 rounded-xl border border-border bg-surface px-3 py-2" /><button disabled={!ready || posting || !progress.found.length} className="rounded-xl bg-surface px-4 py-2 font-semibold disabled:opacity-40">{posting ? "Submitting..." : "Submit my score"}</button><button type="button" onClick={() => void loadLeaderboard()} className="px-3 py-2 text-sm text-text-muted">Refresh</button></form>}
        <p role="status" className="mt-3 text-sm text-text-muted">{boardStatus}</p>
        {entries.length > 0 && <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Top 50 daily scores</caption><thead><tr className="border-b border-border"><th className="py-2">Name</th><th>Points</th><th>Targets</th><th>Complete</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={index} className="border-b border-border/50"><td className="py-2">{entry.name}</td><td>{entry.score}</td><td>{entry.found}/{puzzle.requiredWords.length}</td><td>{entry.completed ? "Yes" : "Not yet"}</td></tr>)}</tbody></table></div>}
      </section>
    </>
  );
}
