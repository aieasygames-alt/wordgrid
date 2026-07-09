import type { Metadata } from "next";
import Link from "next/link";
import { formatArchiveDate, getRecentDailyArchive } from "@/lib/daily-archive";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Daily Challenge Archive — Recent WordGrid Boards",
  description:
    "Browse recent WordGrid daily challenge boards. Review the last two weeks of grids, spot patterns, and jump back into today's puzzle.",
  alternates: { canonical: "/daily/archive" },
  openGraph: {
    title: "Daily Challenge Archive — WordGrid",
    description:
      "Review recent daily WordGrid boards and return to today's challenge whenever you're ready.",
    url: `${BASE_URL}/daily/archive`,
  },
};

export default function DailyArchivePage() {
  const archive = getRecentDailyArchive(14);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WordGrid daily challenge archive",
    itemListElement: archive.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: formatArchiveDate(entry.date),
      url: `${BASE_URL}/daily/archive/${entry.date}/`,
    })),
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <article className="max-w-6xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <Link href="/daily" className="hover:text-text">
              Daily
            </Link>
            <span>/</span>
            <span className="text-text">Archive</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                Retention hub
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Daily Challenge Archive
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed">
                Review recent daily boards, notice recurring letter patterns,
                and jump back into today&apos;s challenge when you are ready to
                play again. This page gives the daily mode a visible history
                instead of a single isolated game.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <div className="grid gap-4 sm:grid-cols-3">
                <Metric label="Boards shown" value={archive.length} />
                <Metric label="Best for" value="Review" />
                <Metric label="Today" value={formatArchiveDate(archive[0]?.date || "")} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/daily" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                  Play today&apos;s board
                </Link>
                <Link href="/solver" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Open solver
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {archive.map((entry, index) => (
            <article
              key={entry.date}
              className={`rounded-3xl border p-5 sm:p-6 shadow-lg transition ${
                index === 0
                  ? "border-primary/40 bg-primary/5 shadow-primary/10"
                  : "border-border bg-surface/50 shadow-black/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-text-dim">
                    {index === 0 ? "Latest board" : `Day -${index}`}
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-text">
                    {formatArchiveDate(entry.date)}
                  </h2>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  entry.label === "Qu board"
                    ? "bg-primary/15 text-primary"
                    : entry.label === "Balanced board"
                      ? "bg-success-bg/30 text-success"
                      : "bg-accent/15 text-accent"
                }`}>
                  {entry.label}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {entry.grid.flat().map((cell, cellIndex) => (
                  <div
                    key={`${entry.date}-${cellIndex}`}
                    className="aspect-square rounded-2xl border border-border bg-bg/80 flex items-center justify-center text-base sm:text-lg font-bold tracking-wide uppercase text-text shadow-inner"
                  >
                    {cell.letter}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-text-muted leading-relaxed">
                {entry.detail}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <StatPill label="Vowels" value={String(entry.vowels)} />
                <StatPill label="Unique letters" value={String(entry.uniqueLetters)} />
                <StatPill label="Repeated" value={String(entry.repeatedLetters)} />
                {entry.quCount > 0 && <StatPill label="Qu" value={String(entry.quCount)} />}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-xs text-text-dim">Open the full daily breakdown</span>
                <Link
                  href={`/daily/archive/${entry.date}`}
                  className="inline-flex items-center rounded-xl bg-surface px-4 py-2 text-sm font-semibold hover:bg-surface-hover transition"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Keep the streak moving</h2>
              <p className="mt-2 text-sm text-text-muted leading-relaxed max-w-2xl">
                Daily mode still updates through the live challenge, but this
                archive gives players a reason to return, review, and explore
                patterns between sessions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/daily" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                Today&apos;s challenge
              </Link>
              <Link href="/stats" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                View stats
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-1 text-xl font-bold text-primary tracking-tight">{value}</div>
    </div>
  );
}

function StatPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-bg/70 px-3 py-1.5 text-text-muted">
      <span className="font-semibold text-text">{value}</span>
      <span>{label}</span>
    </span>
  );
}
