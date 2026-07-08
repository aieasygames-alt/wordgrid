import type { Metadata } from "next";
import { HIGH_VALUE_WORDS, INDEXABLE_WORDS } from "@/lib/worddata";
import { scoreWord } from "@/lib/boggle";

const BASE_URL = "https://wordgrid.games";

// Pre-generate 300 high-value words at build time
export function generateStaticParams() {
  return HIGH_VALUE_WORDS.map((w) => ({ word: w }));
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
      canonical: `/words/${wordLower}`,
    },
    openGraph: {
      title: `${word} — WordGrid Word Guide`,
      description: `${word} is a ${word.length}-letter English word in WordGrid. It scores ${points} points and can appear in our curated puzzle word list.`,
      url: `${BASE_URL}/words/${wordLower}`,
    },
  };
}

export default async function Page({ params }: { params: { word: string } }) {
  const word = params.word;
  const wordLower = word.toLowerCase();
  const wordUpper = word.toUpperCase();
  const points = scoreWord(wordUpper);

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
        item: `${BASE_URL}/words`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: wordUpper,
        item: `${BASE_URL}/words/${wordLower}`,
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

      <article className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-dim mb-6">
          <a href="/" className="hover:text-text">Home</a>
          <span>›</span>
          <a href="/words" className="hover:text-text">Words</a>
          <span>›</span>
          <span className="text-text-muted">{wordUpper}</span>
        </nav>

        <h1 className="text-5xl font-bold mb-2">{wordUpper}</h1>
        <p className="text-text-muted text-lg mb-6 font-mono">
          {wordUpper.length}-letter word · {points} points
        </p>

        <div className="space-y-4">
          <p className="text-text leading-relaxed">
            <strong>{wordUpper}</strong> is part of the curated WordGrid word list.
            In a puzzle, it can be formed by connecting adjacent letters without
            reusing a tile.
          </p>
          <p className="text-text-muted leading-relaxed">
            This page stays fully static so it can be generated reliably during a
            site build. If a richer dictionary lookup is ever needed, it can be
            enabled separately without affecting the default build.
          </p>
        </div>

        {/* SEO content block — unique per word */}
        <div className="mt-8 p-6 bg-surface/50 rounded-xl space-y-3">
          <h2 className="text-lg font-semibold text-text">
            About {wordUpper}
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            <strong>{wordUpper}</strong> is a {wordUpper.length}-letter English word
            . In WordGrid, it is worth{" "}
            <span className="text-primary font-semibold">{points} points</span> and
            can be found by connecting adjacent letters in our 4×4 word grid puzzles.
          </p>
          <p className="text-text-muted text-sm leading-relaxed">
            Looking to improve your word-finding skills? Check out our{" "}
            <a
              href="/guides/how-to-find-more-words"
              className="text-primary hover:text-primary underline"
            >
              guide to finding more words
            </a>{" "}
            or read about{" "}
            <a
              href="/guides/word-grid-strategies"
              className="text-primary hover:text-primary underline"
            >
              scoring strategies
            </a>
            .
          </p>
        </div>

        {/* Related words — internal linking */}
        {relatedWords.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
              Related Words
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedWords.map((rw) => (
                <a
                  key={rw}
                  href={`/words/${rw}`}
                  className="px-3 py-1.5 bg-surface hover:bg-surface-hover rounded-lg text-sm font-mono text-text transition"
                >
                  {rw.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* CTA */}
      <nav className="max-w-2xl mx-auto mt-12 pt-8 border-t border-surface">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
          Play Word Games
        </h2>
        <div className="flex gap-3 flex-wrap">
          <a
            href="/play"
            className="px-4 py-2.5 bg-primary hover:bg-primary-hover transition rounded-lg text-sm font-medium"
          >
            Play Word Grid
          </a>
          <a
            href="/daily"
            className="px-4 py-2.5 bg-surface hover:bg-surface-hover transition rounded-lg text-sm font-medium"
          >
            Daily Challenge
          </a>
        </div>
      </nav>
    </main>
  );
}
