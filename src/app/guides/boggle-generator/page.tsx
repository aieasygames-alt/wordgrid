import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

export const metadata: Metadata = {
  title: "Boggle Generator - Create Free Practice Boards",
  description:
    "Create a fresh 4x4, 5x5, or 6x6 WordGrid practice board in your browser, then review valid routes with the free solver.",
  alternates: { canonical: "/guides/boggle-generator" },
  keywords: [
    "boggle generator",
    "boggle board generator",
    "boggle puzzle maker",
    "word grid generator",
    "custom boggle grid",
  ],
  openGraph: {
    title: "Boggle Generator - Create Free Practice Boards",
    description:
      "Start a fresh WordGrid board, choose a supported board size, then use the solver to review the finished grid.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Generator: Create Free Practice Boards",
  description:
    "A practical guide to creating a fresh WordGrid practice board, choosing a supported board size, and reviewing it with the solver.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  mainEntityOfPage: `${BASE_URL}/guides/boggle-generator/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I generate a new WordGrid board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open WordGrid Play, choose a 4x4, 5x5, or 6x6 board, and start a fresh practice game. Choose Timed mode for a clock or Zen mode for unhurried practice.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the letters in a WordGrid board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordGrid lets you choose a supported board size and practice mode. It does not currently offer manual letter placement, difficulty controls, themed boards, or printable exports.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check a generated board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finish the board first, then enter its letters in the WordGrid solver. The solver supports 4x4, 5x5, and 6x6 grids and returns valid routes from the current WordGrid dictionary.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "WordGrid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Boggle Generator" },
  ],
};

const boardOptions = [
  ["4x4 board", "/play?size=4", "A compact board for a quick practice round."],
  ["5x5 board", "/play?size=5", "More tiles for broader route scanning."],
  ["6x6 board", "/play?size=6", "The largest current practice board."],
] as const;

export default function BoggleGeneratorGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
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

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="mb-2 text-4xl font-bold">Boggle generator: create a fresh practice board</h1>
          <p className="text-text-muted">Choose a board, play it cleanly, then review the routes you missed.</p>
        </header>

        <GuideActionBar
          primary={{ href: "/play", label: "Start a board", detail: "Choose Timed or Zen practice." }}
          secondary={{ href: "/daily", label: "Play Daily", detail: "Use today's shared board." }}
          tertiary={{ href: "/solver", label: "Open solver", detail: "Review a finished grid." }}
          quaternary={{ href: "/guides/boggle-rules-printable/", label: "Read rules", detail: "Check legal routes and scoring." }}
        />

        <div className="max-w-3xl space-y-8 text-text">
          <section className="space-y-3 leading-relaxed">
            <p>
              Use WordGrid as a <strong>Boggle-style board generator</strong> when
              you want a fresh board for practice. Open Play, select a 4x4, 5x5,
              or 6x6 board, then choose Timed mode for a clock or Zen mode for
              unhurried route finding.
            </p>
            <p>
              The reliable practice loop is simple: play before looking up
              answers, enter the finished layout into the <Link href="/solver" className="text-primary hover:underline">solver</Link>,
              then study one missed route or word pattern on your next board.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Choose a board size</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {boardOptions.map(([title, href, description]) => (
                <Link key={href} href={href} className="rounded-xl border border-border bg-surface/50 p-4 transition hover:bg-surface">
                  <h3 className="font-semibold text-primary">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface/50 p-5">
            <h2 className="mb-3 text-2xl font-semibold text-primary">What WordGrid generates today</h2>
            <ul className="space-y-2 leading-relaxed">
              <li>Fresh browser-based boards in 4x4, 5x5, and 6x6 sizes.</li>
              <li>Timed and Zen practice modes, plus a shared Daily board.</li>
              <li>Current WordGrid dictionary validation and 3-6 letter scoring.</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Manual letter placement, difficulty settings, themed boards, printable exports,
              and word-count guarantees are not current WordGrid features.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Use a fresh board as a drill</h2>
            <ol className="ml-4 list-decimal space-y-3 leading-relaxed">
              <li>Choose a board size and begin in Zen if you are learning a pattern.</li>
              <li>Trace only adjacent tiles and never reuse a tile in one word.</li>
              <li>After the round, use the solver to find the valid routes you missed.</li>
              <li>Open the <Link href="/guides/word-pattern-library/" className="text-primary hover:underline">pattern library</Link> and practice one family on the next board.</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about generating boards</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((item) => (
                <details key={item.name} className="rounded-xl bg-surface/50 p-4 first:open">
                  <summary className="cursor-pointer font-semibold">{item.name}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </GuideDesktopShell>
    </main>
  );
}
