import type { Metadata } from "next";
import Link from "next/link";
import CompleteArchive from "./CompleteArchive";

export const metadata: Metadata = {
  title: "Complete Archive & Personal Stats",
  description: "Return to a published WordGrid Complete puzzle, replay on a separate save and track your personal collection streak in this browser.",
  alternates: { canonical: "https://wordgrid.games/complete/archive/" },
};

export default function CompleteArchivePage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:py-12">
    <Link href="/complete/" className="text-sm text-primary">← Today's Complete</Link>
    <header className="mb-8 mt-7 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Your collection journal</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Every trail, kept.</h1><p className="mt-4 text-text-muted">Continue a published board or take a fresh path with a separate replay. Your original collection stays yours.</p></header>
    <CompleteArchive />
  </main>;
}
