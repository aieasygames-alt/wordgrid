import Link from "next/link";
import { scoreWord } from "@/lib/boggle";
import type { WordListPage as WordListPageData } from "@/lib/word-lists";
import { INDEXABLE_WORDS } from "@/lib/indexable-words";

const INDEXABLE_WORD_SET = new Set(INDEXABLE_WORDS);

type WordListPageProps = {
  page: WordListPageData;
};

export default function WordListPage({ page }: WordListPageProps) {
  const uniqueWords = page.words.filter(
    (word, index, words) => words.indexOf(word) === index
  );
  const grouped = uniqueWords.reduce<Record<string, string[]>>((groups, word) => {
    const length = `${word.length} letters`;
    groups[length] = groups[length] || [];
    groups[length].push(word);
    return groups;
  }, {});
  const averageScore =
    uniqueWords.reduce((sum, word) => sum + scoreWord(word), 0) /
    Math.max(1, uniqueWords.length);

  return (
    <article className="mx-auto max-w-7xl">
      <header className="mb-8">
        <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
          <Link href="/" className="hover:text-text">WordGrid</Link>
          <span>/</span>
          <Link href="/words" className="hover:text-text">Words</Link>
        </nav>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-text-muted">
              {page.intro}
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
            <div className="grid grid-cols-3 gap-3">
              <Metric label="Words" value={uniqueWords.length} />
              <Metric label="Avg pts" value={averageScore.toFixed(1)} />
              <Metric label="Best" value={Math.max(...uniqueWords.map(scoreWord))} />
            </div>
            <p className="mt-4 text-sm text-text-muted leading-relaxed">
              {page.searchIntent}
            </p>
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">How to Use This List</h2>
          <p className="mt-3 text-text-muted leading-relaxed">
            {page.patternTip}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/play" className="rounded-xl bg-primary px-4 py-2 font-semibold transition hover:bg-primary-hover">
              Practice on a board
            </Link>
            <Link href="/solver" className="rounded-xl bg-surface px-4 py-2 font-semibold transition hover:bg-surface-hover">
              Review with solver
            </Link>
            <Link href="/guides/word-pattern-library" className="rounded-xl border border-border px-4 py-2 font-semibold text-text-muted transition hover:bg-surface hover:text-text">
              Pattern library
            </Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Related word lists</h2>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/words/3-letter-boggle-words" className="text-primary hover:underline">3 letter Boggle words</Link>
            <Link href="/words/4-letter-boggle-words" className="text-primary hover:underline">4 letter Boggle words</Link>
            <Link href="/words/5-letter-boggle-words" className="text-primary hover:underline">5 letter Boggle words</Link>
            <Link href="/words/words-with-qu" className="text-primary hover:underline">Words with Qu</Link>
            <Link href="/words/high-scoring-boggle-words" className="text-primary hover:underline">High scoring Boggle words</Link>
          </div>
        </aside>
      </section>

      <section className="space-y-8">
        {Object.entries(grouped).map(([group, words]) => (
          <div key={group}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
              {group}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {words.map((word) => (
                <div key={word} className="rounded-2xl bg-surface/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    {INDEXABLE_WORD_SET.has(word) ? (
                      <Link href={`/words/${word}/`} className="font-mono text-lg font-bold hover:text-primary">
                        {word.toUpperCase()}
                      </Link>
                    ) : (
                      <span className="font-mono text-lg font-bold">{word.toUpperCase()}</span>
                    )}
                    <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
                      {scoreWord(word)} pts
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {word.length} letters. Check whether the board can extend it
                    with a nearby prefix, suffix, or plural ending.
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-border bg-bg/40 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold">Next Practice Step</h2>
        <p className="mt-3 max-w-3xl text-text-muted leading-relaxed">
          Pick five words from this page, play a timed board, then open the
          solver to see whether those patterns appeared in places you missed.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/guides/boggle-word-lists" className="rounded-xl bg-surface px-4 py-2 font-semibold transition hover:bg-surface-hover">
            Full Boggle word list
          </Link>
          <Link href="/guides/most-common-boggle-words" className="rounded-xl bg-surface px-4 py-2 font-semibold transition hover:bg-surface-hover">
            Most common words
          </Link>
          <Link href="/daily" className="rounded-xl bg-primary px-4 py-2 font-semibold transition hover:bg-primary-hover">
            Try today's board
          </Link>
        </div>
      </section>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-3 text-center">
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-[0.68rem] uppercase tracking-wide text-text-dim">
        {label}
      </div>
    </div>
  );
}
