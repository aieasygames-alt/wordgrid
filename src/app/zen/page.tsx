import type { Metadata } from "next";
import Link from "next/link";
import TodayTipCard from "@/components/TodayTipCard";
import { generateGrid, seedFromDate, todayDateString } from "@/lib/boggle";
import { getTodayActionTip } from "@/lib/daily-tip";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Zen — Play Word Grid Without the Clock",
  description:
    "Practice WordGrid at your own pace with no timer. Use Zen mode to learn patterns, test boards, and build speed without pressure.",
  alternates: { canonical: "/zen" },
  openGraph: {
    title: "Zen — WordGrid",
    description:
      "No timer, no pressure. Use Zen mode to practice patterns and build board recognition at your own pace.",
    url: `${BASE_URL}/zen`,
  },
};

export default function Page() {
  const today = todayDateString();
  const warmupGrid = generateGrid(seedFromDate(today));
  const tip = getTodayActionTip(today);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-[-6rem] top-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-[42rem] h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <article className="mx-auto max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <span className="text-text">Zen</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div>
              <div className="inline-flex rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
                No timer
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Zen
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed">
                Step into a pressure-free mode with no countdown. Perfect for
                learning the board, testing patterns, and warming up before a
                timed run.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/play?mode=zen" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold shadow-lg shadow-primary/20">
                  Start Zen
                </Link>
                <Link href="/challenge" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Open Challenge
                </Link>
                <Link href="/guides/word-pattern-library" className="px-4 py-2 rounded-xl border border-border bg-transparent hover:bg-surface transition font-semibold text-text-muted hover:text-text">
                  Pattern Library
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-2xl shadow-black/10">
              <div className="grid gap-3 sm:grid-cols-3">
                <StatBox label="Timer" value="Off" />
                <StatBox label="Goal" value="Practice" />
                <StatBox label="Pressure" value="Low" />
              </div>
              <div className="mt-4 rounded-2xl bg-bg/60 p-4 text-sm text-text-muted leading-relaxed">
                Use Zen to scan at your own pace, repeat the same board, and
                build up recognition before moving back to timed play.
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] mb-6">
          <div className="lg:sticky lg:top-8">
            <TodayTipCard
              tip={tip}
              grid={warmupGrid}
              primaryHref="/play?mode=zen"
              primaryLabel="Start Zen"
              secondaryHref="/daily"
              secondaryLabel="Open Daily"
              compact
              layout="stack"
              density="tight"
              showActionBox={false}
              showGrid={false}
            />
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
            <h2 className="text-2xl font-bold">Zen routine</h2>
            <div className="mt-4 space-y-3">
              <RoutineStep
                index="1"
                title="Scan the board once"
                text="Do a calm first pass and collect the obvious short words before chasing long paths."
              />
              <RoutineStep
                index="2"
                title="Work one family at a time"
                text="Pick a promising stem, then test prefixes, suffixes, and Qu-related branches around it."
              />
              <RoutineStep
                index="3"
                title="Finish with a solver review"
                text="After the run, open the solver and check which family cost you the most points."
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Card title="Warm up" text="Get a feel for the board before the timer starts." />
          <Card title="Study patterns" text="Focus on prefixes, suffixes, Qu, and long word stems." />
          <Card title="Repeat boards" text="Use the same layout to measure your progress over time." />
        </section>
      </article>
    </main>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="text-xs uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-1 text-2xl font-bold text-primary">{value}</div>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
      <h2 className="font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">{text}</p>
    </div>
  );
}

function RoutineStep({ index, title, text }: { index: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-bg/60 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
          {index}
        </div>
        <div>
          <h3 className="font-semibold text-text">{title}</h3>
          <p className="mt-1 text-sm text-text-muted leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}
