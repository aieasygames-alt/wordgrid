import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

export const metadata: Metadata = {
  title: "Boggle Variants and WordGrid Practice Modes",
  description:
    "Explore WordGrid's current Timed, Zen, and Daily modes, plus offline Boggle-style variation ideas for groups, classrooms, and solo practice.",
  alternates: { canonical: "/guides/boggle-variants" },
  keywords: [
    "boggle variants",
    "boggle variations",
    "boggle alternatives",
    "solo boggle",
    "team boggle",
    "boggle classroom games",
  ],
  openGraph: {
    title: "Boggle Variants and WordGrid Practice Modes",
    description:
      "Choose a current WordGrid mode, then adapt a finished board for group, classroom, or solo play.",
  },
};

const BASE_URL = "https://wordgrid.games";

const currentModes = [
  ["Timed", "Use a clock when you want a faster scan and a score-focused round."],
  ["Zen", "Practice route tracing without a clock and pause to discuss a pattern."],
  ["Daily", "Play the shared board, then compare your own results over time."],
] as const;

const offlineIdeas = [
  ["Team review", "After a finished board, partners compare the legal words they found and use the solver to review missed routes."],
  ["Category challenge", "Agree on a category before the round, then separately note which valid board words fit it. Keep the normal dictionary and path rules for scoring."],
  ["Story prompt", "After a board, pick several valid discoveries and use them as prompts for a short story. This is a writing activity, not a change to WordGrid scoring."],
  ["Pattern drill", "Pick one pattern such as Qu, S endings, or ING endings, then use Zen mode to look for legal routes that use it."],
] as const;

const faqItems = [
  {
    question: "What variants does WordGrid support today?",
    answer:
      "WordGrid currently supports Timed practice, Zen practice, and a shared Daily board. You can choose 4x4, 5x5, or 6x6 practice boards on Play.",
  },
  {
    question: "Can I use a WordGrid board for a team or classroom activity?",
    answer:
      "Yes. Start a board, have participants work alone or in pairs, then compare results after the round. Keep WordGrid's adjacent-path, no-reused-tile, dictionary, and scoring rules if you want comparable results.",
  },
  {
    question: "Are Big Boggle or Boggle Junior rules the same as WordGrid rules?",
    answer:
      "No. Physical editions and house-rule variations can use different board sizes, timing, word lengths, and scoring. For WordGrid, use the current rules and score table shown in this site.",
  },
  {
    question: "What is the best solo variation?",
    answer:
      "Zen is the best current WordGrid option for unhurried solo practice. Finish the board first, then use the solver to identify one missed route pattern for the next round.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Variants and WordGrid Practice Modes",
  description:
    "A guide to current WordGrid modes and offline Boggle-style activities that do not change WordGrid's live rules.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  mainEntityOfPage: `${BASE_URL}/guides/boggle-variants/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function BoggleVariantsGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="mb-2 text-4xl font-bold">Boggle variants and WordGrid practice modes</h1>
          <p className="text-text-muted">Use the current game modes for play, then turn a finished board into a group or solo activity.</p>
        </header>

        <GuideActionBar
          primary={{ href: "/play", label: "Start a board", detail: "Choose Timed or Zen practice." }}
          secondary={{ href: "/daily", label: "Play Daily", detail: "Use today's shared board." }}
          tertiary={{ href: "/solver", label: "Review a board", detail: "Find missed legal routes." }}
          quaternary={{ href: "/guides/boggle-rules-printable/", label: "Read rules", detail: "Keep current scoring nearby." }}
        />

        <div className="max-w-3xl space-y-8 text-text">
          <section className="space-y-3 leading-relaxed">
            <p>
              Searches for <strong>Boggle variants</strong> can refer to physical
              editions, house rules, classroom activities, or online modes. This
              page separates those ideas from the current WordGrid product so you
              always know which rules apply when you play here.
            </p>
            <p>
              WordGrid uses one current dictionary, adjacent non-repeating routes,
              and the 1/2/4/6 score table for 3- through 6-letter words. Offline
              activities below are optional ways to discuss or reuse a finished board;
              they do not change live WordGrid results.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Current WordGrid modes</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {currentModes.map(([name, description]) => (
                <div key={name} className="rounded-xl border border-border bg-surface/50 p-4">
                  <h3 className="font-semibold text-primary">{name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Practice boards are available in 4x4, 5x5, and 6x6 sizes. Select
              the size before you start; the live dictionary and scoring rules stay the same.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Offline activity ideas</h2>
            <div className="space-y-3">
              {offlineIdeas.map(([name, description]) => (
                <div key={name} className="rounded-xl bg-surface/50 p-4">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface/50 p-5">
            <h2 className="mb-3 text-2xl font-semibold text-primary">Keep product and house rules separate</h2>
            <p className="text-sm leading-relaxed text-text-muted">
              Physical Boggle editions and custom variations may use their own
              timing, word-length minimums, and scoring. Treat those rules as
              external references. When playing WordGrid, rely on the
              <Link href="/guides/boggle-rules-beginners/" className="text-primary hover:underline"> current rules</Link>
              {" "}and the <Link href="/guides/boggle-scoring-sheet/" className="text-primary hover:underline">current scoring table</Link>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about variants</h2>
            <div className="space-y-3">
              {faqItems.map(({ question, answer }) => (
                <details key={question} className="rounded-xl bg-surface/50 p-4 first:open">
                  <summary className="cursor-pointer font-semibold">{question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </GuideDesktopShell>
    </main>
  );
}
