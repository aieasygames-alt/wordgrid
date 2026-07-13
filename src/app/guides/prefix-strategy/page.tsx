import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Prefix Strategy for Word Grid — RE, UN, IN & PRE",
  description:
    "Learn how to use prefixes in word grid and Boggle-style puzzles. Scan RE-, UN-, IN-, PRE-, and other common starts to find more words faster.",
  alternates: { canonical: "/guides/prefix-strategy" },
  keywords: [
    "prefix strategy",
    "word grid prefixes",
    "boggle prefixes",
    "RE UN IN PRE",
    "word family strategy",
  ],
  openGraph: {
    title: "Prefix Strategy for Word Grid — RE, UN, IN & PRE",
    description:
      "A practical prefix guide for spotting more words faster in word grid puzzles.",
    url: `${BASE_URL}/guides/prefix-strategy`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Prefix Strategy for Word Grid — RE, UN, IN & PRE",
  description:
    "A practical guide to prefix scanning in word grid and Boggle-style puzzles.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  mainEntityOfPage: `${BASE_URL}/guides/prefix-strategy/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is prefix strategy in word grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prefix strategy means scanning for common starts like RE-, UN-, IN-, PRE-, DIS-, and OVER- before you look for isolated words. A prefix often turns one stem into a family of valid words, so it is one of the fastest ways to find more answers in a grid.",
      },
    },
    {
      "@type": "Question",
      name: "Which prefixes should I look for first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with RE-, UN-, IN-, PRE-, and DIS-. Those are frequent, easy to combine with common stems, and useful in both short and longer words. If the board has a strong starting cluster, test the prefix before moving to a new area.",
      },
    },
  ],
};

export default function PrefixStrategyPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-text">Guides</Link>
            <span>/</span>
            <span className="text-text">Prefix Strategy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Prefix Strategy for Word Grid</h1>
          <p className="mt-4 text-text-muted leading-relaxed">
            Prefixes are one of the highest-yield patterns in the game. If you can learn to spot them quickly, you turn one word into several and spend less time hunting from scratch.
          </p>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">How to use prefixes</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            When a board looks busy, do not scan letter by letter. Pick a likely start, try RE, UN, IN, or PRE, and see if the rest of the path can support a longer family word.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-text-muted leading-relaxed list-disc ml-4">
            <li>Check the first two letters of promising stems.</li>
            <li>Revisit any word that looks extendable.</li>
            <li>Use the pattern library to compare similar starts.</li>
          </ul>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          <PatternCard title="RE-" detail="REPLAY, REMAKE, RETURN are classic examples of a base word with a clean prefix start." />
          <PatternCard title="UN-" detail="UNDO, UNTIE, UNPACK often appear when the board has a strong vowel plus consonant chain." />
          <PatternCard title="IN-" detail="INPUT, INDOOR, INCOME are good reminders to test the board around a short start." />
          <PatternCard title="PRE-" detail="PREVIEW, PREFIX, PRETEND reward boards with a neat long chain near the start." />
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-bg/40 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Next moves</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Practice this in the live game, then review the archive to see which boards gave you the strongest prefix families.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">Play</Link>
            <Link href="/guides/word-pattern-library" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">Pattern library</Link>
            <Link href="/daily/archive" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">Archive</Link>
          </div>
        </section>
      </GuideDesktopShell>
    </main>
  );
}

function PatternCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Prefix</div>
      <div className="mt-1 text-2xl font-bold text-primary">{title}</div>
      <p className="mt-3 text-sm text-text-muted leading-relaxed">{detail}</p>
    </div>
  );
}
