import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About WordGrid",
  description: "Learn about WordGrid, a free browser-based word grid game with Daily, Weekly, and post-game review tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><h1 className="text-3xl font-bold">About WordGrid</h1><div className="mt-6 space-y-5 leading-relaxed text-text-muted"><p>WordGrid is a free browser-based word grid game. Players connect adjacent letters to form words, play shared Daily and Weekly boards, and use post-game review tools to study missed patterns.</p><p>The site is designed around immediate play and transparent review: the game runs in the browser, no account is required, and personal game history stays on the device unless a player chooses to share a challenge link.</p><p>WordGrid also publishes practical guides on word-grid rules, scoring, patterns, and responsible after-game solver use. The product name is WordGrid; references to Boggle describe the familiar adjacent-letter word-grid format.</p><p><Link href="/contact" className="font-semibold text-primary hover:underline">Contact WordGrid</Link> for corrections, accessibility feedback, or general questions.</p></div></main>;
}
