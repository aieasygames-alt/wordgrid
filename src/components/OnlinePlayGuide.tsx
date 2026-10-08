import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

type OnlinePlayGuideProps = {
  eyebrow: string;
  title: string;
  description: string;
  canonicalPath: string;
  focusTitle: string;
  focusCopy: string;
  focusSteps: string[];
};

const faqItems = [
  { question: "Can I play WordGrid for free?", answer: "Yes. WordGrid runs in a browser with no download or account required. Open Play for a fresh practice board or Daily for the shared board." },
  { question: "Which mode should I choose first?", answer: "Choose Timed if you want a three-minute score challenge. Choose Zen when you want to trace routes without a clock. Choose Daily when you want one shared board for the day." },
  { question: "Can I choose a board size?", answer: "Yes. Play supports 4x4, 5x5, and 6x6 practice boards. A 4x4 board is the clearest starting point for a first round." },
  { question: "What should I do after a board?", answer: "Finish the board first, then use the solver to review missed legal routes. Pick one missed pattern to look for in the next round." },
];

export default function OnlinePlayGuide({
  eyebrow,
  title,
  description,
  canonicalPath,
  focusTitle,
  focusCopy,
  focusSteps,
}: OnlinePlayGuideProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${canonicalPath}`,
    dateModified: "2026-09-27",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen px-4 py-8">
        <GuideDesktopShell>
          <header className="mb-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
              <Link href="/" className="hover:text-text">WordGrid</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-text">Guides</Link>
            </nav>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
            <h1 className="mt-2 text-4xl font-bold">{title}</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">{description}</p>
          </header>

          <GuideActionBar
            primary={{ href: "/play/", label: "Start a fresh board", detail: "Choose a mode and play in your browser" }}
            secondary={{ href: "/daily/", label: "Play Daily", detail: "Open today's shared board" }}
            tertiary={{ href: "/zen/", label: "Try Zen", detail: "Practice without a clock" }}
            quaternary={{ href: "/solver/", label: "Review a board", detail: "Find missed routes after play" }}
          />

          <div className="space-y-8 text-text">
            <section className="border-l-2 border-primary bg-primary/5 p-5">
              <h2 className="text-2xl font-semibold text-primary">{focusTitle}</h2>
              <p className="mt-3 leading-relaxed text-text-muted">{focusCopy}</p>
              <ol className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
                {focusSteps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
              </ol>
            </section>
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Start your first board in three steps</h2>
              <ol className="space-y-3 rounded-lg border border-border bg-surface/50 p-5 leading-relaxed text-text-muted">
                <li>1. Open Play and start with the 4x4 board unless you already want a larger practice grid.</li>
                <li>2. Pick Timed for a three-minute round or Zen when you want to learn the board at your own pace.</li>
                <li>3. Submit the words you find, finish the round, then review one missed route before starting again.</li>
              </ol>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Choose a mode that matches your goal</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Timed", "Use a clock when you want a faster scan."],
                  ["Zen", "Practice without a clock and trace routes carefully."],
                  ["Daily", "Play the shared board and compare your own results over time."],
                ].map(([mode, detail]) => (
                  <div key={mode} className="rounded-lg border border-border bg-surface/50 p-4">
                    <h3 className="font-semibold">{mode}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">What to do after you play</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link href="/solver/" className="rounded-lg border border-border bg-surface/50 p-4 transition hover:bg-surface">
                  <h3 className="font-semibold text-primary">Review missed routes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">Use the solver only after the board to see which legal paths you missed.</p>
                </Link>
                <Link href="/guides/how-to-find-more-words/" className="rounded-lg border border-border bg-surface/50 p-4 transition hover:bg-surface">
                  <h3 className="font-semibold text-primary">Practice one pattern</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">Turn a missed route into one concrete pattern to scan for next time.</p>
                </Link>
                <Link href="/daily/" className="rounded-lg border border-border bg-surface/50 p-4 transition hover:bg-surface">
                  <h3 className="font-semibold text-primary">Return for Daily</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">Use the shared daily board when you want a fresh, repeatable routine.</p>
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Need the full path, dictionary, and scoring rules before you begin? Read the{" "}
                <Link href="/guides/boggle-rules-beginners/" className="text-primary hover:underline">WordGrid rules guide</Link>.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about playing online</h2>
              <div className="divide-y divide-border rounded-lg border border-border bg-surface/50">
                {faqItems.map((item) => (
                  <details key={item.question} className="p-5">
                    <summary className="cursor-pointer font-semibold">{item.question}</summary>
                    <p className="mt-3 leading-relaxed text-text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </GuideDesktopShell>
      </main>
    </>
  );
}
