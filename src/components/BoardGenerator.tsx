"use client";

import { useState } from "react";
import Link from "next/link";
import { generateSizedGrid } from "@/lib/boggle";
import { buildBoardUrl } from "@/lib/board-link";
import { trackEvent } from "@/lib/analytics";

export default function BoardGenerator() {
  const [size, setSize] = useState(4);
  const [grid, setGrid] = useState(() => generateSizedGrid(574624, 4));
  const [status, setStatus] = useState("");
  const playUrl = (mode: "timed" | "zen") => buildBoardUrl("/play/", grid, { mode, source: "generator" });

  function generate(nextSize = size) {
    setSize(nextSize);
    setGrid(generateSizedGrid(crypto.getRandomValues(new Uint32Array(1))[0], nextSize));
    setStatus(`New ${nextSize} × ${nextSize} board ready. Both play buttons use these exact letters.`);
    trackEvent("generator_generate", { board_size: nextSize });
  }

  async function share() {
    const url = new URL(playUrl("zen"), location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Play this WordGrid board", url });
        setStatus("Share sheet completed.");
        trackEvent("generator_share_success", { board_size: size, method: "share" });
      } else {
        await navigator.clipboard.writeText(url);
        setStatus("Board link copied. It opens these letters in Zen mode.");
        trackEvent("generator_share_success", { board_size: size, method: "clipboard" });
      }
    } catch (error) {
      setStatus(error instanceof Error && error.name === "AbortError" ? "Sharing cancelled." : "Sharing unavailable. Open the board and copy its address instead.");
    }
  }

  return (
    <section aria-labelledby="generator-title" className="mb-8 rounded-3xl border border-primary/30 bg-surface/60 p-5 sm:p-7">
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Your next board</p>
          <h2 id="generator-title" className="mt-2 text-2xl font-bold">Generate. Preview. Play.</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">Choose a size, shuffle the letters, then take this exact board into a timed round or relaxed Zen practice.</p>
          <div role="group" aria-label="Board size" className="mt-5 flex flex-wrap gap-2">
            {[4, 5, 6].map((value) => <button key={value} aria-pressed={size === value} onClick={() => generate(value)} className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${size === value ? "border-primary bg-primary/15 text-primary" : "border-border hover:bg-surface"}`}>{value} × {value}</button>)}
          </div>
          <button onClick={() => generate()} className="mt-3 w-full rounded-xl border border-primary/40 px-4 py-2.5 font-semibold text-primary transition hover:bg-primary/10">↻ Generate new board</button>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link href={playUrl("timed")} onClick={() => trackEvent("generator_play", { board_size: size, mode: "timed" })} className="rounded-xl bg-primary px-3 py-3 text-center text-sm font-bold text-white hover:bg-primary-hover">Play timed</Link>
            <Link href={playUrl("zen")} onClick={() => trackEvent("generator_play", { board_size: size, mode: "zen" })} className="rounded-xl border border-border bg-bg px-3 py-3 text-center text-sm font-bold hover:bg-surface">Play Zen</Link>
          </div>
          <button onClick={() => void share()} className="mt-4 text-sm font-semibold text-primary hover:underline">Share this board</button>
        </div>
        <div className="mx-auto w-full max-w-xs rounded-2xl border border-border bg-bg/80 p-3 shadow-inner">
          <table aria-label={`${size} by ${size} generated board`} className="w-full table-fixed border-separate border-spacing-1.5">
            <tbody>{grid.map((row, index) => <tr key={index}>{row.map((cell) => <td key={cell.col} className="aspect-square rounded-lg border border-border bg-surface text-center font-bold shadow-sm"><span className="flex aspect-square items-center justify-center text-lg sm:text-xl">{cell.letter}</span></td>)}</tr>)}</tbody>
          </table>
          <p className="mt-2 text-center text-xs text-text-dim">Adjacent letters · No repeated tiles</p>
        </div>
      </div>
      <p role="status" className="mt-4 min-h-5 text-sm text-text-muted">{status || "Preview a board above, or generate a fresh one."}</p>
    </section>
  );
}
