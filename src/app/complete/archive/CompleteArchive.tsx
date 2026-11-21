"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCompleteBank } from "@/lib/use-complete-bank";
import { readCompleteHistory, replayUrl, summarizeCompleteHistory } from "@/lib/complete-history";

type History = ReturnType<typeof readCompleteHistory>;
export default function CompleteArchive() {
  const { bank, date, error } = useCompleteBank();
  const [entries, setEntries] = useState<History>([]);
  const [month, setMonth] = useState("");
  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => {
    if (!bank || !date) return;
    const refresh = () => {
      try {
        // Detect blocked storage separately from one damaged puzzle entry.
        localStorage.getItem("wordgrid-complete-storage-probe");
        setEntries(readCompleteHistory(bank, date, localStorage));
      } catch {
        setStorageWarning(true);
        setEntries(readCompleteHistory(bank, date, {getItem:()=>null}));
      }
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener("focus", refresh); };
  }, [bank, date]);
  if (error) return <p role="alert">{error}</p>;
  if (!bank || !date) return <p role="status">Loading your collection journal...</p>;
  const summary = summarizeCompleteHistory(entries, date);
  const months = [...new Set(entries.map(entry => entry.puzzle.date.slice(0,7)))];
  const selectedMonth = month || months[0];
  const visible = entries.filter(entry => entry.puzzle.date.startsWith(selectedMonth));
  return <>
    <section aria-label="Complete personal stats" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[[summary.completed,"Boards complete"],[summary.currentStreak,"Current streak"],[summary.longestStreak,"Longest streak"],[summary.unassisted,"Without hints"]].map(([value,label]) => <div key={label} className="rounded-2xl border border-border bg-surface/60 p-4 sm:p-5"><p className="text-3xl font-black tabular-nums text-primary">{value}</p><p className="mt-2 text-xs text-text-muted">{label}{String(label).includes("streak") ? " · days" : ""}</p></div>)}
    </section>
    <p className="mt-4 text-sm text-text-muted">{summary.played} boards started · {summary.score} original-session points. Complete stats are separate from timed/Daily stats. Replays are excluded. A streak counts consecutive puzzle dates completed, including archive finishes.</p>
    <p className="mt-2 text-xs text-text-dim">Saved in this browser only. Clearing site data or changing devices removes local records.</p>
    {storageWarning && <p role="status" className="mt-3 text-sm text-accent">Browser storage is unavailable. Saved collections cannot be shown here.</p>}
    <section className="mt-8 rounded-3xl border border-border bg-surface/30 p-4 sm:p-6" aria-label="Published Complete puzzles">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-bold">Published trails</h2><p className="mt-1 text-xs text-text-muted">Through {date} · UTC+8. Future puzzles open on their date.</p></div><label className="text-sm text-text-muted">Month <select aria-label="Archive month" value={selectedMonth || ""} onChange={event => setMonth(event.target.value)} className="ml-2 rounded-xl border border-border bg-bg p-2">{months.map(value => <option key={value} value={value}>{value}</option>)}</select></label></div>
      {!visible.length && <p className="py-6 text-text-muted">No published boards yet. The first trail opens on {bank.startDate}.</p>}
      <ol className="divide-y divide-border">{visible.map(({puzzle,found,completed,score,progress}) => <li key={puzzle.id} className="flex min-w-0 flex-wrap items-center gap-3 py-4">
        <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${completed ? "border-success/40 bg-success/10 text-success" : "border-border text-text-dim"}`}>{completed ? "✓" : puzzle.date.slice(8)}</span>
        <div className="min-w-0 flex-1"><h3 className="font-semibold"><Link href={`/complete/?date=${puzzle.date}`} className="hover:text-primary">{puzzle.date}</Link></h3><p className="mt-1 text-xs text-text-muted">{puzzle.difficulty} · {found}/{puzzle.requiredWords.length} targets{progress.found.length ? ` · ${score} points` : " · Not started"}</p></div>
        <div className="flex flex-wrap gap-2 text-sm"><Link href={`/complete/?date=${puzzle.date}`} aria-label={`${found ? "Continue" : "Open"} ${puzzle.date}`} className="rounded-xl bg-surface px-3 py-2 font-semibold hover:text-primary">{completed ? "Review" : found ? "Continue" : "Open"}</Link><button onClick={() => window.location.assign(replayUrl(puzzle))} aria-label={`Replay ${puzzle.date} separately`} className="rounded-xl border border-border px-3 py-2 text-text-muted hover:text-text">Replay ↗</button></div>
      </li>)}</ol>
    </section>
  </>;
}
