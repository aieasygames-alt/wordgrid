import type { Metadata } from "next";
import ChallengeClient from "./ChallengeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "WordGrid Challenge — Share and Beat the Same Grid",
  description:
    "Open a shared WordGrid board, compare scores, challenge friends, and review the grid with the solver after play.",
  alternates: { canonical: "/challenge" },
  openGraph: {
    title: "WordGrid Challenge — Share and Beat the Same Grid",
    description:
      "Open the shared board, beat the score, and review it with the solver after the run.",
    url: `${BASE_URL}/challenge`,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <a href="/play" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Play</div>
            <p className="mt-1 text-sm text-text-muted">Start a fresh board.</p>
          </a>
          <a href="/daily" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Daily</div>
            <p className="mt-1 text-sm text-text-muted">Use the shared daily grid.</p>
          </a>
          <a href="/solver" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Solver</div>
            <p className="mt-1 text-sm text-text-muted">Review what you missed.</p>
          </a>
          <a href="/stats" className="rounded-2xl bg-surface/50 p-4 hover:bg-surface transition">
            <div className="font-semibold text-primary">Stats</div>
            <p className="mt-1 text-sm text-text-muted">Check your local progress.</p>
          </a>
        </div>
        <ChallengeClient />
      </div>
    </main>
  );
}
