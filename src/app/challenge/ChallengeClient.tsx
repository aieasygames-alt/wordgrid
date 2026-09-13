"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { decodeBoard, buildBoardUrl } from "@/lib/board-link";
import { Grid } from "@/lib/boggle";
import { trackEvent } from "@/lib/analytics";
import { challengeBoardKey, decodeChallengeEntries, getChallengeEntries, getChallengeName, recordChallengeEntry, saveChallengeName, FriendChallengeEntry } from "@/lib/friend-challenge";

type ChallengeMeta = {
  score: number | null;
  found: number | null;
  max: number | null;
  mode: string | null;
  session: string | null;
  date: string | null;
};

function parseNumber(value: string | null): number | null {
  if (value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function cellTone(letter: string): string {
  const upper = letter.toUpperCase();
  if (upper === "QU") return "from-cyan-400/20 to-cyan-500/10 text-cyan-100";
  if ("AEIOU".includes(upper[0] || "")) return "from-emerald-400/20 to-emerald-500/10 text-emerald-100";
  return "from-indigo-400/20 to-indigo-500/10 text-slate-100";
}

function formatMode(mode: string | null): string {
  if (!mode) return "Challenge";
  if (mode === "daily") return "Daily";
  if (mode === "play") return "Play";
  return "Challenge";
}

function formatSession(session: string | null): string {
  if (session === "zen") return "Zen";
  if (session === "timed") return "Timed";
  return "";
}

export default function ChallengeClient() {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [meta, setMeta] = useState<ChallengeMeta>({
    score: null,
    found: null,
    max: null,
    mode: null,
    session: null,
    date: null,
  });
  const [entries, setEntries] = useState<FriendChallengeEntry[]>([]);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const boardParam = params.get("board");
    const parsedGrid = boardParam ? decodeBoard(boardParam) : null;

    setGrid(parsedGrid);
    setMeta({
      score: parseNumber(params.get("score")),
      found: parseNumber(params.get("found")),
      max: parseNumber(params.get("max")),
      mode: params.get("mode"),
      session: params.get("session"),
      date: params.get("date"),
    });
    if (parsedGrid) {
      const localEntries = getChallengeEntries(challengeBoardKey(parsedGrid));
      const sharedEntries = decodeChallengeEntries(params.get("scores"));
      setEntries([...sharedEntries, ...localEntries].reduce<FriendChallengeEntry[]>((all, entry) => {
        if (all.some((item) => item.name.toLowerCase() === entry.name.toLowerCase() && item.score === entry.score)) return all;
        return [...all, entry];
      }, []).sort((a, b) => b.score - a.score || b.found - a.found));
      setName(getChallengeName());
    }
    if (parsedGrid) trackEvent("challenge_open", { board_size: parsedGrid.length, source: params.get("mode") ?? "shared" });
  }, []);

  const playHref = useMemo(
    () => (grid ? buildBoardUrl("/play", grid, { mode: meta.session ?? undefined, source: "challenge" }) : "/play"),
    [grid, meta.session]
  );
  const solverHref = useMemo(
    () => (grid ? buildBoardUrl("/solver", grid) : "/solver"),
    [grid]
  );
  const boardSize = grid?.length ?? 0;
  const completionRate =
    meta.score !== null && meta.max ? Math.round((meta.score / meta.max) * 100) : null;
  const remainingToMax =
    meta.score !== null && meta.max !== null ? Math.max(0, meta.max - meta.score) : null;
  const sessionLabel = formatSession(meta.session);
  const saveLocalScore = () => {
    if (!grid || meta.score === null) return;
    const playerName = name.trim() || "You";
    saveChallengeName(playerName);
    setEntries(recordChallengeEntry(challengeBoardKey(grid), {
      name: playerName,
      score: meta.score,
      found: meta.found || 0,
      playedAt: new Date().toISOString(),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
    trackEvent("friend_challenge_score_saved", { board_size: boardSize });
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-[-6rem] top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <article className="mx-auto max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <span className="text-text">Challenge</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <div className="lg:sticky lg:top-8">
              <div className="inline-flex rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
                {formatMode(meta.mode)}
                {sessionLabel ? ` · ${sessionLabel}` : ""}
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Challenge
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed">
                Play the same grid, beat the shared score, or open the solver to
                study the board before your next attempt.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={playHref} onClick={() => trackEvent("challenge_start", { board_size: boardSize })} className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold shadow-lg shadow-primary/20">
                  Play
                </Link>
                <Link href={solverHref} className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Open solver
                </Link>
                <Link href="/daily" className="px-4 py-2 rounded-xl border border-border bg-transparent hover:bg-surface transition font-semibold text-text-muted hover:text-text">
                  Daily
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-2xl shadow-black/10">
              <div className="grid gap-3 sm:grid-cols-3">
                <StatBox label="Target score" value={meta.score ?? "—"} />
                <StatBox label="Words found" value={meta.found ?? "—"} />
                <StatBox label="Max score" value={meta.max ?? "—"} />
              </div>
              <div className="mt-4 rounded-2xl bg-bg/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-text-dim">Battle report</div>
                    <div className="mt-1 font-semibold text-primary">
                      {meta.score !== null
                        ? `Score to beat: ${meta.score}`
                        : "Score to beat not available"}
                    </div>
                  </div>
                  {completionRate !== null && (
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wide text-text-dim">Completion</div>
                      <div className="text-2xl font-bold text-success">{completionRate}%</div>
                    </div>
                  )}
                </div>
                {meta.max !== null && meta.score !== null && (
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-400 to-success"
                      style={{ width: `${completionRate ?? 0}%` }}
                    />
                  </div>
                )}
                <div className="mt-3 grid gap-2 sm:grid-cols-3 text-sm">
                  <div className="rounded-xl bg-surface/70 px-3 py-2">
                    <div className="text-xs uppercase tracking-wide text-text-dim">Board</div>
                    <div className="font-semibold text-text">{boardSize ? `${boardSize}x${boardSize}` : "Unknown"}</div>
                  </div>
                  <div className="rounded-xl bg-surface/70 px-3 py-2">
                    <div className="text-xs uppercase tracking-wide text-text-dim">Mode</div>
                    <div className="font-semibold text-text">{sessionLabel || "Timed"}</div>
                  </div>
                  <div className="rounded-xl bg-surface/70 px-3 py-2">
                    <div className="text-xs uppercase tracking-wide text-text-dim">Gap to max</div>
                    <div className="font-semibold text-text">
                      {remainingToMax !== null ? `${remainingToMax} pts` : "—"}
                    </div>
                  </div>
                </div>
              </div>
              {meta.date && (
                <div className="mt-4 rounded-2xl bg-bg/60 px-4 py-3 text-sm text-text-muted">
                  Shared on {meta.date} · {boardSize ? `${boardSize}x${boardSize}` : "board"}
                </div>
              )}
              <div className="mt-4 rounded-2xl bg-bg/60 px-4 py-3 text-sm text-text-muted leading-relaxed">
                Treat this as a replay page first. If you already know the
                board, the solver is the fastest way to turn the round into a
                study session.
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10 lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold">Board preview</h2>
            <p className="mt-1 text-sm text-text-muted">
              {grid ? "This is the exact board your friend shared." : "Paste or open a board link to preview the challenge."}
            </p>

            <div className="mt-5">
              {grid ? (
                <BoardPreview grid={grid} />
              ) : (
                <div className="rounded-3xl border border-dashed border-border bg-bg/40 px-6 py-10 text-center text-text-muted">
                  No board found in the link yet.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-2xl font-bold">How to use this challenge</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed">
                <li>1. Open the board with the Play button to start the round.</li>
                <li>2. Try to beat the target score without peeking.</li>
                <li>3. Use the solver after the run to review missed patterns.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5 sm:p-6">
              <h2 className="text-2xl font-bold">Friend score board</h2>
              <p className="mt-2 text-sm text-text-muted">Scores are saved in this browser. Share the link above so friends can play the same grid.</p>
              {meta.score !== null && (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input value={name} onChange={(event) => setName(event.target.value)} maxLength={24} placeholder="Your name" aria-label="Your challenge name" className="min-w-0 flex-1 rounded-xl border border-border bg-bg/70 px-3 py-2 text-sm outline-none focus:border-primary" />
                  <button onClick={saveLocalScore} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">{saved ? "Score saved" : "Save score"}</button>
                </div>
              )}
              <div className="mt-4 space-y-2">
                {entries.length === 0 ? <p className="text-sm text-text-muted">No scores saved here yet.</p> : entries.slice(0, 10).map((entry, index) => (
                  <div key={`${entry.name}-${entry.playedAt}`} className="flex items-center justify-between rounded-xl bg-bg/60 px-3 py-2 text-sm">
                    <span className="font-semibold"><span className="mr-2 text-text-dim">{index + 1}</span>{entry.name}</span>
                    <span className="font-bold text-primary">{entry.score} <span className="text-xs font-normal text-text-muted">({entry.found} words)</span></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-2xl font-bold">Recommended next step</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                If you are sharing this with someone else, send them the play
                link. If you are using it yourself, start with the board
                preview and then jump into the solver once you finish.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={playHref} onClick={() => trackEvent("challenge_start", { board_size: boardSize })} className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold shadow-lg shadow-primary/20">
                  Play
                </Link>
                <Link href={solverHref} className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Review board
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

function StatBox({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-1 text-2xl font-bold text-primary">{value}</div>
    </div>
  );
}

function BoardPreview({ grid }: { grid: Grid }) {
  const size = grid.length;
  return (
    <div
      className="grid gap-2 sm:gap-3"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {grid.flat().map((cell) => (
        <div
          key={`${cell.row}-${cell.col}`}
          className={`flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br font-bold shadow-lg shadow-black/10 ${cellTone(cell.letter)}`}
          style={{
            height: size <= 4 ? 80 : size === 5 ? 68 : 58,
            fontSize: size <= 4 ? "1.5rem" : size === 5 ? "1.3rem" : "1.05rem",
          }}
        >
          {cell.letter}
        </div>
      ))}
    </div>
  );
}
