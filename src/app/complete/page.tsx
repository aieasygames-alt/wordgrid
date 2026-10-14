import type { Metadata } from "next";
import Link from "next/link";
import CompleteClient from "./CompleteClient";

export const metadata: Metadata = {
  title: "Complete - Find Every Word",
  description: "An untimed daily word grid. Connect adjacent letters, discover long words, and find every target in WordGrid Complete.",
  alternates: { canonical: "/complete/" },
  robots: { index: false, follow: true },
  openGraph: { title: "WordGrid Complete - Find Every Word", description: "One daily grid. No timer. Find every target word.", url: "https://wordgrid.games/complete/" },
};

export default function CompletePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold">WordGrid <span className="text-primary">/ Complete</span></Link>
        <Link href="/play/" className="text-sm text-text-muted hover:text-text">Timed play</Link>
      </header>
      <div className="mb-7 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">The whole board. At your pace.</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Find every word.</h1>
        <p className="mt-3 text-text-muted">No countdown, just discovery. Follow a trail through the letters until every target is yours.</p>
      </div>
      <CompleteClient />
      <section className="mt-10 grid gap-5 border-t border-border pt-7 text-sm sm:grid-cols-3" aria-label="Complete rules">
        <div><h2 className="font-semibold">Connect</h2><p className="mt-2 text-text-muted">Drag across adjacent tiles, including diagonals, or tap tiles and submit. A tile can only be used once per word. You can also type a word. Words need at least four letters; a Qu tile counts as two letters.</p></div>
        <div><h2 className="font-semibold">Collect</h2><p className="mt-2 text-text-muted">Find all target words to finish. Bonus words add points but are not required. Reveal a target when stuck: it counts as found but earns no points. This is a finite editorial word list, not every dictionary word.</p></div>
        <div><h2 className="font-semibold">Return</h2><p className="mt-2 text-text-muted">A new board arrives at midnight UTC+8. Progress stays in this browser when storage is available. The optional leaderboard is casual, not a verified competition. No account needed.</p></div>
      </section>
    </main>
  );
}
