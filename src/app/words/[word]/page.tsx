import type { Metadata } from "next";
import Link from "next/link";
import { INDEXABLE_WORDS } from "@/lib/worddata";
import { scoreWord } from "@/lib/boggle";

const BASE_URL = "https://wordgrid.games";
const VOWELS = new Set(["A", "E", "I", "O", "U"]);

// Pre-generate only the curated word pages that should be indexable.
export function generateStaticParams() {
  return INDEXABLE_WORDS.map((w) => ({ word: w }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = params.word.toUpperCase();
  const wordLower = params.word.toLowerCase();
  const isIndexable = INDEXABLE_WORDS.includes(wordLower);
  const points = scoreWord(wordLower);

  return {
    title: `${word} — WordGrid Word Guide`,
    description: `${word} is a ${word.length}-letter English word in WordGrid. It scores ${points} points and can appear in our curated puzzle word list.`,
    robots: {
      index: isIndexable,
      follow: true,
    },
    alternates: {
      canonical: `${BASE_URL}/words/${wordLower}/`,
    },
    openGraph: {
      title: `${word} — WordGrid Word Guide`,
      description: `${word} is a ${word.length}-letter English word in WordGrid. It scores ${points} points and can appear in our curated puzzle word list.`,
      url: `${BASE_URL}/words/${wordLower}/`,
    },
  };
}

export default async function Page({ params }: { params: { word: string } }) {
  const word = params.word;
  const wordLower = word.toLowerCase();
  const wordUpper = word.toUpperCase();
  const points = scoreWord(wordUpper);
  const letters = wordUpper.split("");
  const vowelCount = letters.filter((letter) => VOWELS.has(letter)).length;
  const hasQu = wordUpper.includes("QU");
  const commonEndings = ["S", "ED", "ER", "ING", "LY"].filter((ending) =>
    wordUpper.endsWith(ending)
  );
  const commonStarts = ["RE", "UN", "IN", "PRE", "CO"].filter((start) =>
    wordUpper.startsWith(start)
  );
  const patternNotes = [
    hasQu ? "Check Qu boards early because the Qu tile compresses two letters into one cell." : null,
    commonStarts.length > 0 ? `${commonStarts.join(", ")} is a useful prefix cue when scanning from the front of a word.` : null,
    commonEndings.length > 0 ? `${commonEndings.join(", ")} endings are worth checking around any nearby base word.` : null,
    wordUpper.length >= 5 ? "This is a higher-value target, so it is worth scanning for before sweeping up every 3-letter word." : null,
    wordUpper.length === 3 ? "Short words are useful anchors because they can often be extended into plural or suffix forms." : null,
  ].filter(Boolean) as string[];

  // JSON-LD: Word page structured data
  const definedWordSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedWord",
    name: wordUpper,
    description: `${wordUpper} is a ${wordUpper.length}-letter English word used in WordGrid.`,
    inLanguage: "en",
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Words",
        item: `${BASE_URL}/words/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: wordUpper,
        item: `${BASE_URL}/words/${wordLower}/`,
      },
    ],
  };

  // Related words — words sharing the first 2 letters, for internal linking
  const relatedWords = INDEXABLE_WORDS.filter(
    (w) =>
      w !== wordLower &&
      w.slice(0, 2) === wordLower.slice(0, 2) &&
      Math.abs(w.length - wordLower.length) <= 1
  ).slice(0, 8);

  return (
    <main className="min-h-screen px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedWordSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 text-sm text-text-dim mb-6">
              <Link href="/" className="hover:text-text">Home</Link>
              <span>›</span>
              <Link href="/words/" className="hover:text-text">Words</Link>
              <span>›</span>
              <span className="text-text-muted">{wordUpper}</span>
            </nav>

            <h1 className="text-5xl font-bold tracking-tight mb-2">{wordUpper}</h1>
            <p className="text-text-muted text-lg mb-6 font-mono">
              {wordUpper.length}-letter word · {points} points
            </p>

            <div className="space-y-4 max-w-3xl">
              <p className="text-text leading-relaxed">
                <strong>{wordUpper}</strong> is part of the curated WordGrid word list.
                In a puzzle, it can be formed by connecting adjacent letters without
                reusing a tile.
              </p>
              <p className="text-text-muted leading-relaxed">
                In Boggle-style play, the word is most useful as a pattern to
                recognize quickly: note its length, score value, vowels, and
                whether it can be extended from nearby letters.
              </p>
            </div>

            {/* SEO content block — unique per word */}
            <div className="mt-8 p-6 bg-surface/50 rounded-3xl space-y-3 max-w-3xl">
              <h2 className="text-lg font-semibold text-text">
                About {wordUpper}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                <strong>{wordUpper}</strong> is a {wordUpper.length}-letter English word.
                In WordGrid, it is worth{" "}
                <span className="text-primary font-semibold">{points} points</span> and
                can be found by connecting adjacent letters in our word grid puzzles.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <WordFact label="Length" value={`${wordUpper.length} letters`} />
                <WordFact label="Vowels" value={vowelCount} />
                <WordFact label="Pattern" value={hasQu ? "Qu word" : commonEndings[0] || commonStarts[0] || "Core word"} />
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Looking to improve your word-finding skills? Check out our{" "}
                <Link
                  href="/guides/how-to-find-more-words"
                  className="text-primary hover:text-primary underline"
                >
                  guide to finding more words
                </Link>{" "}
                or read about{" "}
                <Link
                  href="/guides/word-grid-strategies"
                  className="text-primary hover:text-primary underline"
                >
                  scoring strategies
                </Link>
                .
              </p>
            </div>

            <section className="mt-8 max-w-3xl rounded-3xl border border-border bg-surface/50 p-6">
              <h2 className="text-lg font-semibold text-text">
                How to Spot {wordUpper} on a Board
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Start by locating the first letter, then check the eight
                neighboring cells for the next letter. Keep the path flexible:
                Boggle words can turn corners, move diagonally, and branch back
                toward the center as long as no tile is reused.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
                {(patternNotes.length > 0 ? patternNotes : [
                  "Use this word as a recognition anchor, then look one tile beyond the path for extensions.",
                  "If the final tile has an adjacent S, test a plural or verb form before moving on.",
                ]).map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8 max-w-3xl rounded-3xl border border-border bg-bg/40 p-6">
              <h2 className="text-lg font-semibold text-text">
                Related Study Lists
              </h2>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {wordUpper.length <= 5 ? (
                  <Link href={`/words/${wordUpper.length}-letter-boggle-words/`} className="rounded-xl bg-surface px-3 py-2 font-semibold hover:bg-surface-hover transition">
                    {wordUpper.length}-letter words
                  </Link>
                ) : null}
                <Link href="/words/common-boggle-words/" className="rounded-xl bg-surface px-3 py-2 font-semibold hover:bg-surface-hover transition">
                  Common words
                </Link>
                <Link href="/words/high-scoring-boggle-words/" className="rounded-xl bg-surface px-3 py-2 font-semibold hover:bg-surface-hover transition">
                  High scoring words
                </Link>
                {hasQu && (
                  <Link href="/words/words-with-qu/" className="rounded-xl bg-surface px-3 py-2 font-semibold hover:bg-surface-hover transition">
                    Qu words
                  </Link>
                )}
              </div>
            </section>

            {relatedWords.length > 0 && (
              <div className="mt-8 max-w-3xl">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                  Related Words
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relatedWords.map((rw) => (
                    <Link
                      key={rw}
                      href={`/words/${rw}/`}
                      className="px-3 py-1.5 bg-surface hover:bg-surface-hover rounded-lg text-sm font-mono text-text transition"
                    >
                      {rw.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* In-stream Game Challenge Box */}
            <div className="mt-10 max-w-3xl rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-surface/60 to-surface/80 p-6 sm:p-7 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-primary">Challenge Ready</span>
                  <h3 className="mt-1 text-lg font-bold text-text">Spot &quot;{wordUpper}&quot; in live word grids</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    Practice finding {wordUpper.length}-letter words under pressure or compete on today&apos;s shared board.
                  </p>
                </div>
                <div className="flex gap-2.5 sm:flex-col sm:w-48 shrink-0">
                  <Link
                    href="/daily/"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md shadow-primary/20 transition active:scale-[0.98]"
                  >
                    <span>▶</span> Play Daily
                  </Link>
                  <Link
                    href="/play/"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-surface hover:bg-surface-hover text-text text-xs font-semibold border border-border/80 transition text-center"
                  >
                    Free Practice
                  </Link>
                </div>
              </div>
            </div>

            <nav className="max-w-3xl mt-8 pt-6 border-t border-border">
              <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                Explore WordGrid Game Modes
              </h2>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/daily/"
                  className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition rounded-xl text-sm font-semibold"
                >
                  📅 Today&apos;s Daily (4x4)
                </Link>
                <Link
                  href="/play/"
                  className="px-4 py-2 bg-surface hover:bg-surface-hover transition rounded-xl text-sm font-medium border border-border"
                >
                  ⏱️ Timed Mode
                </Link>
                <Link
                  href="/complete/"
                  className="px-4 py-2 bg-surface hover:bg-surface-hover transition rounded-xl text-sm font-medium border border-border"
                >
                  🏆 Complete Mode
                </Link>
                <Link
                  href="/solver/"
                  className="px-4 py-2 bg-surface hover:bg-surface-hover transition rounded-xl text-sm font-medium border border-border"
                >
                  🔍 Boggle Solver
                </Link>
              </div>
            </nav>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/15 via-surface/60 to-surface/80 p-5 sm:p-6 shadow-xl shadow-primary/5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-primary">Word Value</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs font-bold text-primary">{points} pts</span>
              </div>
              <div className="mt-3">
                <h3 className="text-base font-bold text-text">Spot {wordUpper} in Action</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                  Test your speed and pattern recognition on today&apos;s shared 4×4 board.
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <Link
                  href="/daily/"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md shadow-primary/20 transition active:scale-[0.98]"
                >
                  <span>▶</span> Play Daily Challenge
                </Link>
                <Link
                  href="/play/"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-surface hover:bg-surface-hover text-text text-xs font-semibold border border-border/80 transition"
                >
                  ⚡ Instant Practice (4x4)
                </Link>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-center gap-3 text-[11px] text-text-dim">
                <span>✓ Free browser play</span>
                <span>•</span>
                <span>✓ No download</span>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-base font-semibold text-text">Study next</h2>
              <div className="mt-3 grid gap-2">
                <Link href="/guides/how-to-find-more-words/" className="rounded-xl bg-bg/60 px-3.5 py-2.5 text-sm font-semibold hover:bg-surface-hover transition">
                  More word-finding
                </Link>
                <Link href="/guides/word-grid-strategies/" className="rounded-xl bg-bg/60 px-3.5 py-2.5 text-sm font-semibold hover:bg-surface-hover transition">
                  Scoring strategy
                </Link>
                <Link href="/words/" className="rounded-xl bg-bg/60 px-3.5 py-2.5 text-sm font-semibold hover:bg-surface-hover transition">
                  Back to list
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-base font-semibold text-text">Pattern reminder</h2>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                Short common words are useful anchors. Extend them with prefixes,
                suffixes, and nearby letter branches to build higher-value chains.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}

function WordFact({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-1 font-semibold text-text">{value}</div>
    </div>
  );
}
