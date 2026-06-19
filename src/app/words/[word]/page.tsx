import type { Metadata } from "next";
import { fetchWordData, HIGH_VALUE_WORDS } from "@/lib/worddata";

const BASE_URL = "https://wordgrid.games";

// Pre-generate 300 high-value words at build time
export function generateStaticParams() {
  return HIGH_VALUE_WORDS.map((w) => ({ word: w }));
}

export const dynamicParams = false;

// Fetch definition at BUILD TIME — written into static HTML
export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = params.word.toUpperCase();
  const data = await fetchWordData(params.word);
  const definition = data?.meanings?.[0]?.definitions?.[0]?.definition || "";

  return {
    title: `${word} — Word Meaning & Definition | WordGrid`,
    description: definition
      ? `${word}: ${definition.slice(0, 140)}. Play word grid puzzles at WordGrid.`
      : `What does "${word}" mean? Definition, pronunciation, and word game tips for ${word}.`,
    alternates: {
      canonical: `/words/${params.word}`,
    },
    openGraph: {
      title: `${word} — Word Meaning | WordGrid`,
      description: definition
        ? `${word}: ${definition.slice(0, 140)}`
        : `Definition and word game tips for "${word}".`,
      url: `${BASE_URL}/words/${params.word}`,
    },
  };
}

export default async function Page({ params }: { params: { word: string } }) {
  const word = params.word;
  const wordUpper = word.toUpperCase();
  const data = await fetchWordData(word);

  // JSON-LD: DefinedWord structured data
  const definedWordSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedWord",
    name: wordUpper,
    description:
      data?.meanings?.[0]?.definitions?.[0]?.definition ||
      `${wordUpper} is a valid English word.`,
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
        item: `${BASE_URL}/play`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: wordUpper,
        item: `${BASE_URL}/words/${word}`,
      },
    ],
  };

  const scoreMap: Record<number, number> = { 3: 1, 4: 2, 5: 4, 6: 6 };
  const points = scoreMap[wordUpper.length] || 8;

  // Related words — words sharing the first 2 letters, for internal linking
  const relatedWords = HIGH_VALUE_WORDS.filter(
    (w) =>
      w !== word &&
      w.slice(0, 2) === word.slice(0, 2) &&
      Math.abs(w.length - word.length) <= 1
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
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a href="/" className="hover:text-slate-300">Home</a>
          <span>›</span>
          <span className="text-slate-400">{wordUpper}</span>
        </nav>

        <h1 className="text-5xl font-bold mb-2">{wordUpper}</h1>
        {data?.phonetic && (
          <p className="text-slate-400 text-lg mb-6 font-mono">{data.phonetic}</p>
        )}

        {data && data.meanings.length > 0 ? (
          <div className="space-y-6">
            {data.meanings.map((meaning, i) => (
              <div key={i}>
                <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide mb-2">
                  {meaning.partOfSpeech}
                </h2>
                <ol className="space-y-2">
                  {meaning.definitions.map((def, j) => (
                    <li key={j} className="text-slate-200 leading-relaxed">
                      <span className="text-slate-500 mr-2">{j + 1}.</span>
                      {def.definition}
                      {def.example && (
                        <p className="text-slate-400 italic mt-1 ml-5 text-sm">
                          &ldquo;{def.example}&rdquo;
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 leading-relaxed">
            <strong>{wordUpper}</strong> is a valid English word in our dictionary.
            It can be found by connecting adjacent letters in WordGrid puzzles.
          </p>
        )}

        {/* SEO content block — unique per word */}
        <div className="mt-8 p-6 bg-slate-800/50 rounded-xl space-y-3">
          <h2 className="text-lg font-semibold text-slate-200">
            About {wordUpper}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong>{wordUpper}</strong> is a {wordUpper.length}-letter English word
            {data?.meanings?.[0]?.partOfSpeech
              ? ` used as a ${data.meanings[0].partOfSpeech}`
              : ""}
            . In WordGrid, it is worth{" "}
            <span className="text-indigo-400 font-semibold">{points} points</span> and
            can be found by connecting adjacent letters in our 4×4 word grid puzzles.
            {data?.meanings?.[0]?.definitions?.[0]?.definition
              ? ` The primary definition is: "${data.meanings[0].definitions[0].definition}".`
              : ""}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Looking to improve your word-finding skills? Check out our{" "}
            <a
              href="/guides/how-to-find-more-words"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              guide to finding more words
            </a>{" "}
            or read about{" "}
            <a
              href="/guides/word-grid-strategies"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              scoring strategies
            </a>
            .
          </p>
        </div>

        {/* Related words — internal linking */}
        {relatedWords.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Related Words
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedWords.map((rw) => (
                <a
                  key={rw}
                  href={`/words/${rw}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-mono text-slate-300 transition"
                >
                  {rw.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* CTA */}
      <nav className="max-w-2xl mx-auto mt-12 pt-8 border-t border-slate-800">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Play Word Games
        </h2>
        <div className="flex gap-3 flex-wrap">
          <a
            href="/play"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm font-medium"
          >
            Play Word Grid
          </a>
          <a
            href="/daily"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 transition rounded-lg text-sm font-medium"
          >
            Daily Challenge
          </a>
        </div>
      </nav>
    </main>
  );
}
