import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DAILY_ARCHIVE_DAYS,
  formatArchiveDate,
  getDailyArchiveDates,
  getDailyArchiveEntry,
  getRecentDailyArchive,
} from "@/lib/daily-archive";

const BASE_URL = "https://wordgrid.games";

type PageProps = {
  params: {
    date: string;
  };
};

export function generateStaticParams() {
  return getDailyArchiveDates(DAILY_ARCHIVE_DAYS).map((date) => ({ date }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getDailyArchiveEntry(params.date);
  if (!entry) {
    return {
      title: "Daily Challenge Archive",
    };
  }

  return {
    title: `${formatArchiveDate(entry.date)} Daily Board — WordGrid Archive`,
    description:
      `Review the WordGrid daily board for ${formatArchiveDate(entry.date)}. See the grid, board traits, and a quick solving note.`,
    alternates: { canonical: `/daily/archive/${entry.date}` },
    openGraph: {
      title: `${formatArchiveDate(entry.date)} Daily Board — WordGrid`,
      description: entry.detail,
      url: `${BASE_URL}/daily/archive/${entry.date}`,
    },
  };
}

export default function DailyArchiveDetailPage({ params }: PageProps) {
  const entry = getDailyArchiveEntry(params.date);
  if (!entry) {
    notFound();
  }

  const archive = getRecentDailyArchive(DAILY_ARCHIVE_DAYS);
  const index = archive.findIndex((item) => item.date === entry.date);
  const newer = index > 0 ? archive[index - 1] : null;
  const older = index >= 0 && index < archive.length - 1 ? archive[index + 1] : null;

  const detailSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${formatArchiveDate(entry.date)} Daily Board`,
    url: `${BASE_URL}/daily/archive/${entry.date}`,
    description: entry.detail,
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(detailSchema) }}
      />

      <article className="max-w-6xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <Link href="/daily/archive" className="hover:text-text">
              Archive
            </Link>
            <span>/</span>
            <span className="text-text">{formatArchiveDate(entry.date)}</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                Daily breakdown
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                {formatArchiveDate(entry.date)}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed">
                A single daily board with enough context to help you review the
                pattern, compare it to nearby dates, and jump back into the
                live challenge when you want to play.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <div className="grid gap-4 sm:grid-cols-3">
                <Metric label="Label" value={entry.label} />
                <Metric label="Vowels" value={entry.vowels} />
                <Metric label="Qu" value={entry.quCount || "0"} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/daily" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                  Play today&apos;s board
                </Link>
                <Link href="/daily/archive" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Back to archive
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-lg shadow-black/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Board grid</h2>
                <p className="mt-1 text-sm text-text-muted">
                  The exact 4x4 board for this day.
                </p>
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

            <div className="mt-5 grid grid-cols-4 gap-3">
              {entry.grid.flat().map((cell, index) => (
                <div
                  key={`${entry.date}-${index}`}
                  className="aspect-square rounded-3xl border border-border bg-bg/80 flex items-center justify-center text-2xl sm:text-3xl font-bold tracking-wide uppercase text-text shadow-inner"
                >
                  {cell.letter}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl bg-bg/60 p-4 sm:p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-text-dim">Quick read</div>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-text-muted">
                {entry.detail}
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-lg shadow-black/10">
              <h2 className="text-2xl font-semibold">Board stats</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MiniStat label="Unique letters" value={entry.uniqueLetters} />
                <MiniStat label="Repeated letters" value={entry.repeatedLetters} />
                <MiniStat label="Vowel count" value={entry.vowels} />
                <MiniStat label="Qu tiles" value={entry.quCount} />
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-lg shadow-black/10">
              <h2 className="text-2xl font-semibold">How to approach it</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed">
                <li>Start with the rarest shape on the board: Qu if present, then long consonant clusters.</li>
                <li>Look for extension patterns around the most repeated letters.</li>
                <li>Use the solver when you want the full answer set, then return here to study the board layout.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-lg shadow-black/10">
              <h2 className="text-2xl font-semibold">Navigate the archive</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {newer && (
                  <Link href={`/daily/archive/${newer.date}`} className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                    Newer day
                  </Link>
                )}
                {older && (
                  <Link href={`/daily/archive/${older.date}`} className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                    Older day
                  </Link>
                )}
                <Link href="/stats" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Stats
                </Link>
                <Link href="/solver" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Solver
                </Link>
              </div>
            </div>
          </aside>
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

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-1 text-2xl font-bold text-text tracking-tight">{value}</div>
    </div>
  );
}
