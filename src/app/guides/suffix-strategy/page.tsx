import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Suffix Strategy for Word Grid — ING, ED, ER & LY",
  description:
    "Learn suffix strategy for word grid and Boggle-style puzzles. Extend base words with -ING, -ED, -ER, -LY, and plural endings for more points.",
  alternates: { canonical: "/guides/suffix-strategy" },
  keywords: [
    "suffix strategy",
    "word grid suffixes",
    "boggle suffixes",
    "ING ED ER LY",
    "word family endings",
  ],
  openGraph: {
    title: "Suffix Strategy for Word Grid — ING, ED, ER & LY",
    description:
      "A practical suffix guide for turning base words into better-scoring word grid answers.",
    url: `${BASE_URL}/guides/suffix-strategy`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Suffix Strategy for Word Grid — ING, ED, ER & LY",
  description:
    "A practical guide to suffix scanning in word grid and Boggle-style puzzles.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  mainEntityOfPage: `${BASE_URL}/guides/suffix-strategy/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is suffix strategy in word grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Suffix strategy means taking a base word and checking whether the board supports a longer ending, like -ING, -ED, -ER, -LY, or plural S. It is a fast way to turn one found word into a small family of additional answers.",
      },
    },
    {
      "@type": "Question",
      name: "Which suffixes are most useful?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most useful suffixes are -ING, -ED, -ER, -LY, -S, and -ES. They are common, easy to test, and often add value without requiring a completely new search path.",
      },
    },
  ],
};

export default function SuffixStrategyPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-text">Guides</Link>
            <span>/</span>
            <span className="text-text">Suffix Strategy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Suffix Strategy for Word Grid</h1>
          <p className="mt-4 text-text-muted leading-relaxed">
            Suffixes are the quickest way to squeeze extra value out of a base word. Once you see one stem, your next job is to ask how far that stem can stretch.
          </p>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">How to use suffixes</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Start from the word you already found. Then test whether the board can add -ING, -ED, -ER, -LY, or a plural ending without breaking adjacency.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["ING", "ED", "ER", "LY", "S", "ES"].map((suffix) => (
              <div key={suffix} className="rounded-2xl bg-bg/60 p-4">
                <div className="text-xs uppercase tracking-wide text-text-dim">Suffix</div>
                <div className="mt-1 text-xl font-bold text-primary">-{suffix}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          <PatternCard title="PLAY -> PLAYED" detail="A small tense change can add a clean extra answer when the board supports the tail of the word." />
          <PatternCard title="MOVE -> MOVING" detail="Verb endings often sit close to the base word and are worth checking once a stem is found." />
          <PatternCard title="KIND -> KINDLY" detail="-LY is a compact ending that often slips by if you only scan for obvious nouns." />
          <PatternCard title="STAR -> STARS" detail="Plural S is the easiest point you can pick up after finding a good noun stem." />
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-bg/40 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Next moves</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Practice suffix hunting in a live round, then open the archive to see how often long stems and endings show up together.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">Play now</Link>
            <Link href="/guides/word-pattern-library" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">Pattern library</Link>
            <Link href="/stats" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">Stats</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

function PatternCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Suffix</div>
      <div className="mt-1 text-2xl font-bold text-primary">{title}</div>
      <p className="mt-3 text-sm text-text-muted leading-relaxed">{detail}</p>
    </div>
  );
}
