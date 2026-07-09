import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Qu Strategy for Word Grid — Find Qu Words Faster",
  description:
    "Learn Qu strategy for word grid and Boggle-style puzzles. Spot Qu first, connect vowels fast, and find more high-value words.",
  alternates: { canonical: "/guides/qu-strategy" },
  keywords: [
    "Qu strategy",
    "word grid Qu",
    "Boggle Qu words",
    "Qu tile",
    "find Qu words faster",
  ],
  openGraph: {
    title: "Qu Strategy for Word Grid — Find Qu Words Faster",
    description:
      "A practical guide to Qu scanning and high-value word families in word grid puzzles.",
    url: `${BASE_URL}/guides/qu-strategy`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Qu Strategy for Word Grid — Find Qu Words Faster",
  description:
    "A practical guide to Qu scanning in word grid and Boggle-style puzzles.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  mainEntityOfPage: `${BASE_URL}/guides/qu-strategy/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is Qu important in word grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qu is important because it compresses two letters into one tile, which changes how you scan the board. It often opens a set of related words and should be checked very early in the round.",
      },
    },
    {
      "@type": "Question",
      name: "How should I scan for Qu words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look at the Qu tile first, then trace nearby vowels and common endings. Words that begin with QUI-, QUA-, QUE-, and QUO- are often the most efficient paths when Qu appears on the board.",
      },
    },
  ],
};

export default function QuStrategyPage() {
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
            <span className="text-text">Qu Strategy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Qu Strategy for Word Grid</h1>
          <p className="mt-4 text-text-muted leading-relaxed">
            Qu deserves its own playbook. Because it behaves differently from every other tile, a fast Qu scan can unlock words that other players miss.
          </p>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">How to use Qu</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Begin every board with one question: where is the Qu tile, and what vowels sit next to it? Once you know that, the board usually gives away one or two obvious branches.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["QUI-", "QUA-", "QUE-", "QUO-"].map((cue) => (
              <div key={cue} className="rounded-2xl bg-bg/60 p-4">
                <div className="text-xs uppercase tracking-wide text-text-dim">Cue</div>
                <div className="mt-1 text-xl font-bold text-primary">{cue}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          <PatternCard title="QUICK" detail="Fast Qu words usually pair the tile with a short vowel path and a tight ending." />
          <PatternCard title="QUEST" detail="Longer Qu words often look obvious only after you trace the vowel branch around the tile." />
          <PatternCard title="QUOTE" detail="Qu words can feel hidden until you think in sound clusters instead of single letters." />
          <PatternCard title="QUIET" detail="A clean Qu branch can often support more than one answer if the board has room." />
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-bg/40 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Next moves</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Use this guide with the pattern library, then practice in the daily challenge to see whether Qu boards feel easier to decode.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">Play now</Link>
            <Link href="/guides/word-pattern-library" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">Pattern library</Link>
            <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">Daily challenge</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

function PatternCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Qu word</div>
      <div className="mt-1 text-2xl font-bold text-primary">{title}</div>
      <p className="mt-3 text-sm text-text-muted leading-relaxed">{detail}</p>
    </div>
  );
}
