import type { Metadata } from "next";
import StatsClient from "./StatsClient";

export const metadata: Metadata = {
  title: "WordGrid Stats — Scores, Streaks & History",
  description:
    "See local WordGrid stats on this device: best scores, streaks, recent games, and progress over time.",
  alternates: { canonical: "/stats" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <a href="/play" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Play</div>
            <p className="mt-1 text-sm text-text-muted">Return to the game.</p>
          </a>
          <a href="/daily" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Daily</div>
            <p className="mt-1 text-sm text-text-muted">Open today&apos;s board.</p>
          </a>
          <a href="/solver" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Solver</div>
            <p className="mt-1 text-sm text-text-muted">Review missed words.</p>
          </a>
          <a href="/words" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Words</div>
            <p className="mt-1 text-sm text-text-muted">Study the vocabulary.</p>
          </a>
        </div>
        <StatsClient />
      </div>
    </main>
  );
}
