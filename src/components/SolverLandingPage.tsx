import Link from "next/link";

interface SolverLandingPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  primaryIntent: string;
  useCases: string[];
  steps: string[];
  related: { href: string; label: string }[];
}

export default function SolverLandingPage({
  eyebrow,
  title,
  intro,
  primaryIntent,
  useCases,
  steps,
  related,
}: SolverLandingPageProps) {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <article className="mx-auto max-w-7xl">
        <header className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/solver" className="hover:text-text">Solver</Link>
          </nav>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                {eyebrow}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
                {intro}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/solver" className="rounded-xl bg-primary px-5 py-3 font-semibold shadow-lg shadow-primary/20 transition hover:bg-primary-hover">
                  Open the solver
                </Link>
                <Link href="/play" className="rounded-xl bg-surface px-5 py-3 font-semibold transition hover:bg-surface-hover">
                  Play first
                </Link>
                <Link href="/daily" className="rounded-xl border border-border px-5 py-3 font-semibold text-text-muted transition hover:bg-surface hover:text-text">
                  Daily board
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 shadow-xl shadow-black/10 sm:p-6">
              <h2 className="text-xl font-semibold">Best for</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {primaryIntent}
              </p>
              <div className="mt-4 grid gap-2">
                {useCases.map((item) => (
                  <div key={item} className="rounded-xl bg-bg/60 px-4 py-3 text-sm text-text-muted">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">How to Use It</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-text-muted">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Related pages</h2>
              <div className="mt-4 grid gap-2 text-sm">
                {related.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-xl bg-bg/60 px-4 py-3 font-semibold text-primary transition hover:bg-surface-hover">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Fair play note</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                The solver is most useful after a round. Play first, then use the
                answer list to learn missed paths and stronger scoring patterns.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-bg/40 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Why This Helps You Improve</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
            A solver does more than list answers. It shows which words were
            realistic, which long paths carried the score, and which prefixes,
            suffixes, or Qu routes you should practice on the next board.
          </p>
        </section>
      </article>
    </main>
  );
}
