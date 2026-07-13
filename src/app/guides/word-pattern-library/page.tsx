import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Word Grid Pattern Library — Prefixes, Suffixes & Qu",
  description:
    "Learn the most useful word grid patterns: prefixes, suffixes, Qu words, plurals, and word families. A practical guide for spotting more words faster.",
  alternates: { canonical: "/guides/word-pattern-library" },
  keywords: [
    "word grid patterns",
    "boggle word patterns",
    "prefixes and suffixes",
    "Qu strategy",
    "word family patterns",
    "word grid tips",
  ],
  openGraph: {
    title: "Word Grid Pattern Library — Prefixes, Suffixes & Qu",
    description:
      "A practical pattern library for spotting more words faster in word grid and Boggle-style puzzles.",
    url: `${BASE_URL}/guides/word-pattern-library`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Word Grid Pattern Library — Prefixes, Suffixes & Qu",
  description:
    "A practical guide to word grid patterns, including prefixes, suffixes, Qu handling, and word-family scanning.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  mainEntityOfPage: `${BASE_URL}/guides/word-pattern-library/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the most useful word grid patterns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most useful word grid patterns are common prefixes, common suffixes, plural endings, verb endings, and word families. In practice, that means scanning for RE-, UN-, IN-, PRE-, -ING, -ED, -ER, -LY, and easy plural S endings. Qu is also its own high-value pattern because it creates a two-letter sound from one tile.",
      },
    },
    {
      "@type": "Question",
      name: "How do I spot more words in a grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the rare or high-value patterns first: Qu, long stems, and repeated letters. Then check prefixes, suffixes, and plurals around any word you already found. The fastest players do not search randomly; they reuse one pattern to generate several related words.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Qu matter so much?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qu matters because it compresses two letters into one tile and often opens a whole family of words. If a board contains Qu, it changes the search space immediately. Players who check Qu first usually find stronger words faster and miss fewer hidden routes.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Word Grid Pattern Library" },
  ],
};

const PATTERNS = [
  {
    title: "Prefixes",
    cue: "RE-, UN-, IN-, PRE-",
    detail:
      "Prefixes are the easiest way to turn one base word into a family. If you see a likely starting stem, test the front of the board for extensions before moving on.",
  },
  {
    title: "Suffixes",
    cue: "-ING, -ED, -ER, -LY",
    detail:
      "Suffixes turn medium words into score-efficient longer words. Once you find a base word, ask whether the board can support a longer ending.",
  },
  {
    title: "Plural S",
    cue: "CAT -> CATS",
    detail:
      "Plural endings are one of the fastest low-friction gains. If the board has an S nearby, check every noun-like word for a cheap extra point.",
  },
  {
    title: "Verb Forms",
    cue: "PLAY -> PLAYED -> PLAYING",
    detail:
      "Verb families often live in the same neighborhood. A single stem can turn into multiple valid answers when the right suffix is present.",
  },
  {
    title: "Qu",
    cue: "QUI-, QUA-, QUE-",
    detail:
      "Qu is a special-case pattern because it rewards early attention and often opens high-value branches of the board.",
  },
  {
    title: "Long stems",
    cue: "5+ letters",
    detail:
      "Long stems are where score jumps happen. When you discover a 4-letter base, immediately test whether the grid can support one more step.",
  },
];

export default function WordPatternLibraryPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-5xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-text">
              Guides
            </Link>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                Pattern library
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Word Grid Pattern Library
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed">
                This guide turns scattered word-finding tips into a simple
                pattern library. Learn the handful of prefixes, suffixes, and
                board cues that show up again and again in word grid puzzles,
                then use them to scan faster in live play.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryStat label="Primary focus" value="Patterns" />
                <SummaryStat label="Best for" value="More words" />
                <SummaryStat label="Quick win" value="Qu" />
                <SummaryStat label="Score boost" value="5+ letters" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                  Play
                </Link>
                <Link href="/solver" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Open solver
                </Link>
                <Link href="/daily/archive" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Review archive
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Quick answer</h2>
              <p className="mt-2 text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
                If you want to find more words in a grid, scan for a small set
                of repeatable patterns: common prefixes, common suffixes, plural
                S endings, verb endings, and Qu. The best players do not hunt
                every letter equally; they keep reusing pattern families until
                the board runs dry.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PatternChip label="RE" />
              <PatternChip label="UN" />
              <PatternChip label="ING" />
              <PatternChip label="Qu" />
              <PatternChip label="S" />
            </div>
          </div>
        </section>

        <nav className="rounded-3xl border border-border bg-bg/40 p-5 sm:p-6 mb-6">
          <div className="text-xs uppercase tracking-[0.2em] text-text-dim mb-3">On this page</div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <a href="#pattern-map" className="text-primary hover:underline">Pattern map</a>
            <a href="#prefixes" className="text-primary hover:underline">Prefixes</a>
            <a href="#suffixes" className="text-primary hover:underline">Suffixes</a>
            <a href="#qu" className="text-primary hover:underline">Qu strategy</a>
            <a href="#families" className="text-primary hover:underline">Word families</a>
            <a href="#checklist" className="text-primary hover:underline">Scan checklist</a>
          </div>
        </nav>

        <section id="pattern-map" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PATTERNS.map((pattern) => (
            <article key={pattern.title} className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-lg shadow-black/10">
              <div className="text-xs uppercase tracking-[0.2em] text-text-dim">{pattern.title}</div>
              <div className="mt-2 text-2xl font-bold text-primary tracking-tight">{pattern.cue}</div>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">{pattern.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-2xl font-semibold">Deep dives</h2>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                If you want one pattern per page, start here. Each deep dive is
                short, practical, and easier to revisit later.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Link href="/guides/prefix-strategy" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Prefix guide</div>
              <div className="mt-1 font-semibold text-text">Prefix Strategy</div>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">RE-, UN-, IN-, PRE- and how to turn one stem into a family.</p>
            </Link>
            <Link href="/guides/suffix-strategy" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Suffix guide</div>
              <div className="mt-1 font-semibold text-text">Suffix Strategy</div>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">-ING, -ED, -ER, -LY, and the fastest ways to extend a base word.</p>
            </Link>
            <Link href="/guides/qu-strategy" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Qu guide</div>
              <div className="mt-1 font-semibold text-text">Qu Strategy</div>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">A special-case tile that deserves first-pass attention on every board.</p>
            </Link>
          </div>
        </section>

        <section id="prefixes" className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Prefixes</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Prefixes are strong because they let one stem expand into several
              answers. If you see RE, UN, IN, or PRE near a promising start,
              stop looking for isolated words and start looking for families.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <PatternChip label="RE" />
              <PatternChip label="UN" />
              <PatternChip label="IN" />
              <PatternChip label="PRE" />
              <PatternChip label="DIS" />
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h3 className="text-xl font-semibold">How to scan prefixes</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed">
              <li>Start with the first two letters of every obvious long stem.</li>
              <li>Test whether the start can grow into a longer family word.</li>
              <li>Check whether the same stem appears in more than one path.</li>
              <li>Use the solver when the board is crowded and your eyes miss the branch.</li>
            </ul>
          </div>
        </section>

        <section id="suffixes" className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Suffixes</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Suffixes are the cleanest way to convert a medium word into a
              scorer. Once you have a base word, check whether the board can
              support -ING, -ED, -ER, -LY, or a plural S without forcing a bad
              route.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-bg/50 p-5 sm:p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Common endings</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {["ING", "ED", "ER", "LY", "S", "ES"].map((suffix) => (
                <div key={suffix} className="rounded-2xl bg-surface/70 px-4 py-3 text-sm font-semibold text-text">
                  -{suffix}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="qu" className="mt-8 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold">Qu strategy</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                Qu behaves differently from every other tile because it compresses
                two letters into one cell. That makes it a high-priority scan
                target whenever it appears.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["QUI-", "QUA-", "QUE-", "QUO-"].map((cue) => (
                <div key={cue} className="rounded-2xl bg-bg/60 p-4">
                  <div className="text-xs uppercase tracking-wide text-text-dim">Watch for</div>
                  <div className="mt-1 text-xl font-bold text-primary">{cue}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="families" className="mt-8 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Word families</h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-3xl">
            The biggest retention boost usually comes from seeing one word as a
            family instead of a single answer. When you find a stem, ask what
            the board can support around it: singular, plural, tense changes,
            and nearby prefix additions.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <FamilyRow stem="PLAY" forms="PLAYS, PLAYED, PLAYER, PLAYING" />
            <FamilyRow stem="FORM" forms="FORMS, FORMED, REFORM, REFORMED" />
            <FamilyRow stem="MOVE" forms="MOVES, MOVED, MOVING, REMOVE" />
            <FamilyRow stem="RATE" forms="RATES, RATED, RATING, IRATE" />
          </div>
        </section>

        <section id="checklist" className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Fast scan checklist</h2>
            <ol className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed list-decimal ml-4">
              <li>Check Qu, then rare anchors.</li>
              <li>Find one long stem and try to extend it.</li>
              <li>Test plural S and common endings.</li>
              <li>Revisit any word that looks family-like.</li>
              <li>Finish with the solver or archive to study the board shape.</li>
            </ol>
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Next steps</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Use this pattern library with the live game and the review tools.
              The best learning loop is simple: play, inspect the missed words,
              review the archive, and come back with one pattern to improve.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                Play a round
              </Link>
              <Link href="/stats" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Open stats
              </Link>
              <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                Daily
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-1 text-xl font-bold text-primary tracking-tight">{value}</div>
    </div>
  );
}

function PatternChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-bg/70 px-3 py-1.5 text-sm font-semibold text-text">
      {label}
    </span>
  );
}

function FamilyRow({ stem, forms }: { stem: string; forms: string }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">Stem</div>
      <div className="mt-1 font-bold text-primary">{stem}</div>
      <div className="mt-2 text-sm text-text-muted leading-relaxed">{forms}</div>
    </div>
  );
}
