import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

export const metadata: Metadata = {
  title: "Boggle Rules for Kids: Easy Rules for Children and Classrooms",
  description:
    "Easy Boggle rules for kids, parents, and teachers. Use simple examples, classroom tips, scoring basics, and fun variations for young players.",
  alternates: { canonical: "/guides/boggle-rules-for-kids" },
  keywords: [
    "boggle rules for kids", "boggle for children", "how to teach kids boggle",
    "boggle rules simplified", "boggle for young players", "kids word games",
    "boggle classroom game", "teaching boggle to kids",
  ],
  openGraph: {
    title: "Boggle Rules for Kids: Easy Rules for Children and Classrooms",
    description:
      "Simplified Boggle rules for kids with easy explanations, examples, and tips for parents and teachers. Fun word game for children.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Rules for Kids: Easy Rules for Children and Classrooms",
  description:
    "A simplified guide to Boggle rules for children and young players, with easy explanations, examples, and tips for parents and teachers.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-08-05",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-rules-for-kids/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you explain Boggle rules to kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Explain WordGrid to kids in 4 simple steps: 1) Look at the letter grid, 2) Connect touching letters to make words, 3) Words must be 3 letters or longer, 4) Start in Zen mode and find words together. Use physical gestures to show how letters can connect up, down, sideways, and diagonal. Add Timed practice only when the child is ready.",
      },
    },
    {
      "@type": "Question",
      name: "What age is Boggle appropriate for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordGrid works well for children who can read and form short words. Start younger players in Zen mode, work cooperatively, and count discoveries rather than points. Keep the same 3-letter minimum and valid-path rules so their practice matches the game.",
      },
    },
    {
      "@type": "Question",
      name: "Can kids play Boggle for learning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Boggle is excellent for learning. It builds vocabulary, spelling skills, pattern recognition, and quick thinking. Teachers use it in classrooms for literacy development. The game makes word discovery fun and competitive, motivating children to explore language.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make Boggle easier for kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Make WordGrid easier for kids by choosing Zen mode, using a 4×4 board, counting words instead of points, playing cooperatively, and using visual aids such as letter flashcards. Keep the 3-letter minimum and do not reuse a tile so children learn the real game rules.",
      },
    },
    {
      "@type": "Question",
      name: "What are fun Boggle variations for children?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fun Boggle variations for kids: Team Boggle (pairs work together), Category Boggle (words must be from a category like animals), Story Boggle (use words to tell a story), and Alphabet Hunt (find words starting with each letter A-Z). These variations keep the game engaging and educational.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Boggle Rules for Kids" },
  ],
};

export default function BoggleRulesForKidsGuide() {
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
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Boggle Rules for Kids: Easy Rules for Children and Classrooms
          </h1>
          <p className="text-text-muted">8 min read &middot; Updated July 24, 2026</p>
        </header>

        <GuideActionBar
          primary={{ href: "/play", label: "Start Zen practice", detail: "Play without a clock." }}
          secondary={{ href: "/daily", label: "Try Daily", detail: "Use one shared board." }}
          tertiary={{ href: "/guides/boggle-rules-printable/", label: "Printable rules", detail: "Keep the path rules nearby." }}
          quaternary={{ href: "/solver", label: "Review a board", detail: "Find routes after play." }}
        />

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Teaching <strong>Boggle to kids</strong> doesn't have to be
              complicated. This guide simplifies the rules for children with
              easy explanations, examples, and fun variations perfect for young
              players, classrooms, and family game nights.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link href="/play" className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 font-semibold text-primary hover:bg-primary/15 transition">
                Play a practice board
              </Link>
              <Link href="/guides/boggle-rules-printable" className="rounded-xl bg-surface/70 px-4 py-3 font-semibold hover:bg-surface transition">
                Open printable rules
              </Link>
              <Link href="/guides/boggle-rules-beginners" className="rounded-xl bg-surface/70 px-4 py-3 font-semibold hover:bg-surface transition">
                WordGrid rules
              </Link>
            </div>
            <p className="leading-relaxed mt-3">
              Boggle helps kids build vocabulary, spelling skills, and pattern
              recognition — all while discovering words at their own pace.
            </p>
            <p className="leading-relaxed mt-3">
              For the full WordGrid rules and scoring reference, move next to{" "}
              <Link href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                Boggle Rules for Beginners
              </Link>{" "}
              and the{" "}
              <Link href="/guides/boggle-scoring-sheet" className="text-primary hover:underline">
                scoring sheet
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Rules Explained Simply for Kids
            </h2>
            <p className="leading-relaxed mb-3">
              Use this 4-step explanation for children:
            </p>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <ol className="space-y-3 list-decimal ml-4">
                <li>
                  <strong>Look at the letter grid.</strong> Choose a 4×4 board
                  for a compact first practice grid. It looks like a big square
                  full of letters.
                </li>
                <li>
                  <strong>Connect touching letters.</strong> Letters can connect
                  up, down, sideways, or diagonal. <em>Show diagonal by
                  drawing corners.</em>
                </li>
                <li>
                  <strong>Spell words.</strong> Connect letters to make words.
                  Each word must be <strong>3 letters or longer</strong>. Do not
                  reuse a tile in the same word.
                </li>
                <li>
                  <strong>Start in Zen.</strong> Find words together without a
                  clock. When that feels easy, try Timed mode and use the current
                  score table: 3 letters = 1, 4 = 2, 5 = 4, and 6 = 6.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Age Is Boggle For?
            </h2>
            <div className="bg-surface/50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Ages 6-7</h3>
                  <ul className="space-y-1">
                    <li>• Play with simplified rules</li>
                    <li>• Choose Zen mode</li>
                    <li>• Keep the 3-letter minimum</li>
                    <li>• Focus on fun, not scoring</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ages 8+</h3>
                  <ul className="space-y-1">
                    <li>• Ready for the full WordGrid rules</li>
                    <li>• Try Timed mode when ready</li>
                    <li>• Can understand scoring</li>
                    <li>• Competitive play fun</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Teaching Tips for Parents and Teachers
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Before You Start</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Show a completed grid example</li>
                  <li>• Demonstrate letter connections physically</li>
                  <li>• Practice spelling 3-letter words together</li>
                  <li>• Explain what "adjacent" means with gestures</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">First Game Strategy</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Skip scoring — just count words found</li>
                  <li>• Choose Zen mode for unhurried practice</li>
                  <li>• Play cooperatively: work together to find words</li>
                  <li>• Celebrate every word discovery enthusiastically</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Building Skills</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Praise longer words when found</li>
                  <li>• Teach looking for patterns (TH, HE, IN, ER)</li>
                  <li>• Show how to add S to make plurals</li>
                  <li>• Encourage checking diagonals (often missed)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Simplified Scoring for Kids
            </h2>
            <div className="bg-surface/50 rounded-xl p-4">
              <p className="text-sm leading-relaxed mb-3">
                For young players, use this simplified scoring:
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Simple Version</h3>
                  <ul className="space-y-1">
                    <li>• 3 letters = 1 point</li>
                    <li>• 4 letters = 2 points</li>
                    <li>• 5 letters = 4 points</li>
                    <li>• 6 letters = 6 points</li>
                  </ul>
                  <p className="text-xs text-text-muted mt-2">
                    Easy to remember and calculate quickly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Alternative: Count Words</h3>
                  <p className="text-xs">
                    Skip scoring entirely. Just count how many words each
                    player finds. Winner = most words.
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    Best for ages 6-7 or first-time players.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Fun Boggle Variations for Kids
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Team Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Best for:</strong> Classrooms, large groups
                </p>
                <p className="text-sm leading-relaxed">
                  Kids pair up and work together to find words. Teams compare
                  scores at the end. Great for collaborative learning and peer
                  teaching.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Category Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Best for:</strong> Vocabulary building
                </p>
                <p className="text-sm leading-relaxed">
                  Pick a category (animals, food, sports). Players only count
                  words from that category. Helps kids practice thematic
                  vocabulary.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Alphabet Hunt</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Best for:</strong> Alphabet practice
                </p>
                <p className="text-sm leading-relaxed">
                  Try to find words starting with each letter A-Z. Kids write
                  down their words in alphabetical order. Fun challenge for
                  letter recognition.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Story Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Best for:</strong> Creative writing
                </p>
                <p className="text-sm leading-relaxed">
                  After finding 10+ words, kids use them to write a silly story.
                  Combines word skills with creativity and narrative
                  construction.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Making Boggle Educational
            </h2>
            <p className="leading-relaxed mb-3">
              Boggle builds these essential skills:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Literacy Skills</h3>
                <ul className="space-y-1">
                  <li>• Vocabulary expansion</li>
                  <li>• Spelling practice</li>
                  <li>• Word recognition</li>
                  <li>• Pattern detection</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Cognitive Skills</h3>
                <ul className="space-y-1">
                  <li>• Quick thinking</li>
                  <li>• Visual scanning</li>
                  <li>• Focus under time pressure</li>
                  <li>• Strategic planning</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Classroom Tips for Teachers
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Setup</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Project the grid on a whiteboard</li>
                  <li>• Students play with paper/pencil or devices</li>
                  <li>• Begin in Zen mode for first rounds</li>
                  <li>• Have students share favorite words found</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Differentiation</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Advanced students: use Timed mode</li>
                  <li>• Struggling students: use Zen and work in pairs</li>
                  <li>• ELL students: partner with native speakers</li>
                  <li>• All students: focus on fun over perfection</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Follow-Up Activities</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Create class word wall with discovered words</li>
                  <li>• Discuss word patterns found (-ING, -TION, etc.)</li>
                  <li>• Have students write sentences using found words</li>
                  <li>• Keep running tally of class high scores</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Troubleshooting Common Issues
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Issue: "I can't find any words!"</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Solution:</strong> Start by finding just 3-letter
                  words. Work row by row. Then look diagonally. Celebrate each
                  word found enthusiastically. If stuck, help them find one word
                  to build confidence.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Issue: "This is too hard!"</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Solution:</strong> Switch to cooperative mode — play
                  together to find words. Switch to Zen mode. Focus on the fun
                  of discovery, not competition.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Issue: "Diagonals are confusing"</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Solution:</strong> Draw diagonal lines on paper to show
                  the pattern. Use physical gestures. Practice on simple grids
                  first. Diagonals are often missed by beginners — it's normal
                  to need practice.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  How do you explain Boggle rules to kids?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Explain Boggle to kids in 4 steps: 1) Look at a grid of
                  letters, 2) Connect touching letters to make words (up, down,
                  sideways, diagonal), 3) Words must be 3 letters or longer,
                  4) Start in Zen mode and find words together. Use gestures
                  and begin with practice rounds without scoring.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What age is Boggle appropriate for?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  WordGrid works well for children who can read and form short
                  words. Younger players can begin in Zen mode, work with a
                  partner, and count words rather than points. The game builds
                  vocabulary and spelling skills.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can kids play Boggle for learning?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes, Boggle is excellent for learning. It builds vocabulary,
                  spelling, pattern recognition, and quick thinking. Teachers use
                  it in classrooms for literacy development. The game makes
                  word discovery fun and competitive.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you make Boggle easier for kids?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Make WordGrid easier by choosing Zen mode, using a 4×4 board,
                  counting words rather than points, playing cooperatively, and
                  using visual aids. Keep the 3-letter minimum and gradually
                  increase difficulty.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Try Boggle With Kids Now
            </h2>
            <p className="text-text mb-4">
              Start with a fun practice round. No pressure, just word discovery.
              Adjust rules as needed for age and skill level.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play
              </Link>
              <Link
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Daily
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-rules-beginners/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Rules of Boggle: Complete Beginner's Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Detailed rules explanation for adults and older kids.
                </div>
              </Link>
              <Link
                href="/guides/boggle-variants/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Variants →
                </div>
                <div className="text-sm text-text-muted">
                  Fun game variations for families and classrooms.
                </div>
              </Link>
              <Link
                href="/guides/"
                className="block text-sm text-text-dim hover:text-text"
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </div>
      </GuideDesktopShell>
    </main>
  );
}
