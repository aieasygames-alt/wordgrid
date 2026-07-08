import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advanced Boggle Strategies — Expert Techniques",
  description:
    "Master advanced Boggle strategies from expert players. Learn grid mapping algorithms, word optimization techniques, competitive time management, and pattern recognition systems for 60+ scores.",
  alternates: { canonical: "/guides/advanced-boggle-strategies" },
  keywords: [
    "advanced boggle strategies", "boggle expert techniques", "boggle competitive play",
    "boggle master strategies", "boggle championship tactics", "boggle algorithm",
    "boggle optimization", "boggle pattern recognition advanced",
  ],
  openGraph: {
    title: "Advanced Boggle Strategies — Expert-Level Techniques",
    description:
      "Expert-level Boggle strategies: grid mapping algorithms, word optimization techniques, competitive time management, and pattern recognition systems for consistently high scores.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Advanced Boggle Strategies — Expert-Level Techniques",
  description:
    "Expert-level Boggle strategies covering grid mapping algorithms, word optimization techniques, competitive time management, and pattern recognition systems for consistently achieving 60+ scores.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/advanced-boggle-strategies/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are advanced Boggle strategies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Advanced Boggle strategies include systematic grid mapping algorithms, prioritizing word extensions over base finds, multi-directional scanning patterns, anchor letter optimization, advanced pattern recognition for -TION/-NESS/-MENT clusters, time-phased gameplay (scan→long→medium→short), and statistical letter frequency analysis. Experts use these to consistently score 60+ points.",
      },
    },
    {
      "@type": "Question",
      name: "How do you get 60+ points in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To score 60+ in Boggle: find 8+ long words (5+ letters), maximize word extensions from base words (PLAY→PLAYED→PLAYING→PLAYER→PLAYERS), use systematic full-grid scanning, prioritize -TION/-NESS/-MENT patterns, practice instant pattern recognition, and use optimal time allocation (30s scan, 60s long words, 90s medium/short). 60+ requires both vocabulary depth and pattern mastery.",
      },
    },
    {
      "@type": "Question",
      name: "What is the grid mapping algorithm for Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Boggle grid mapping algorithm: 1) Identify high-frequency anchor letters (S, R, T, N, E, A), 2) Map common letter clusters (TH, HE, IN, ER, AN, RE), 3) Locate long-word patterns (-TION, -NESS, -MENT, -ABLE), 4) Verify diagonal connectivity from each anchor, 5) Plan 5+ letter word routes before submitting, 6) Update map dynamically as words are found.",
      },
    },
    {
      "@type": "Question",
      name: "How do competitive players optimize word finding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Competitive players optimize by: 1) Pattern-based而非letter-based searching (TH, HE, IN, ER clusters), 2) Word extension multiplier (one base word → 5+ related words), 3) Length prioritization (5-letter word = 4× 3-letter words), 4) Time-phased approach (long words first), 5) Full 3-minute utilization, 6) Instant pattern recognition from thousands of practice repetitions.",
      },
    },
    {
      "@type": "Question",
      name: "What is the optimal time management for Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optimal Boggle time management: 0-30 seconds pure grid mapping (no submissions), 30-90 seconds hunting 5+ letter words exclusively, 90-150 seconds medium words (4 letters) + word extensions, 150-180 seconds quick 3-letter words + final sweep. This maximizes high-value word finding while ensuring full grid coverage.",
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
    { "@type": "ListItem", position: 3, name: "Advanced Boggle Strategies" },
  ],
};

export default function AdvancedBoggleStrategiesGuide() {
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

      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Advanced Boggle Strategies — Expert-Level Techniques
          </h1>
          <p className="text-text-muted">12 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              <strong>Advanced Boggle strategies</strong> separate 50-point
              players from 70+ champions. If you're consistently scoring 40-50
              and want to break through to expert level, these techniques will
              get you there.
            </p>
            <p className="leading-relaxed mt-3">
              Expert play isn't about vocabulary size. It's about systematic
              execution, pattern recognition, and mathematical optimization of
              your time and attention.
            </p>
            <p className="leading-relaxed mt-3">
              For a more practical bridge from theory to play, start with{" "}
              <Link href="/guides/most-common-boggle-words" className="text-primary hover:underline">
                the high-frequency word list
              </Link>{" "}
              or{" "}
              <Link href="/guides/word-grid-strategies" className="text-primary hover:underline">
                the main strategy guide
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              The Expert Mindset: Systems Over Words
            </h2>
            <p className="leading-relaxed mb-3">
              Champions don't think about individual words. They think in
              systems:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-900/20 rounded-xl p-3 border border-red-800/30">
                <h3 className="font-semibold mb-2">❌ Intermediate Thinking</h3>
                <ul className="space-y-1 text-sm">
                  <li>Random letter scanning</li>
                  <li>Word-by-word submission</li>
                  <li>Excitement-based discoveries</li>
                  <li>Inconsistent time usage</li>
                  <li>Pattern recognition when convenient</li>
                </ul>
              </div>
              <div className="bg-green-900/20 rounded-xl p-3 border border-green-800/30">
                <h3 className="font-semibold mb-2">✅ Expert Thinking</h3>
                <ul className="space-y-1 text-sm">
                  <li>Systematic grid mapping</li>
                  <li>Word extension multiplication</li>
                  <li>Length-first optimization</li>
                  <li>Precise time allocation</li>
                  <li>Instant pattern recognition</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Advanced Grid Mapping Algorithm
            </h2>
            <p className="leading-relaxed mb-3">
              Experts map the grid algorithmically before submitting a single
              word:
            </p>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <ol className="space-y-2 list-decimal ml-4">
                <li>
                  <strong>Anchor identification (0-10 seconds):</strong> Locate
                  all S, R, T, N, E, A positions. These 6 letters appear in 65% of
                  English words and are your primary word-builders.
                </li>
                <li>
                  <strong>Cluster mapping (10-20 seconds):</strong> From each
                  anchor, map common pairs: TH, HE, IN, ER, AN, RE. Highlight
                  these mentally or with quick eye movements.
                </li>
                <li>
                  <strong>Long-pattern detection (20-30 seconds):</strong> Scan
                  specifically for -TION, -NESS, -MENT, -ABLE structures. These
                  indicate 5-8 letter words and maximum points.
                </li>
                <li>
                  <strong>Diagonal verification (0-30 seconds continuous):</strong>
                  While mapping, constantly verify diagonal connectivity. 40% of
                  players miss diagonal words.
                </li>
                <li>
                  <strong>Qu prioritization (if present):</strong> If Qu exists,
                  mentally mark it as highest-priority anchor. QUICK, QUEST,
                  QUOTE, QUIZ are worth hunting immediately.
                </li>
              </ol>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Expert insight:</strong> You're not finding words during
              this phase. You're building a search map that tells you WHERE to
              look for high-value words.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Word Extension Multiplier System
            </h2>
            <p className="leading-relaxed mb-3">
              The single biggest point accelerator: systematic word extension.
            </p>
            <div className="bg-surface/50 rounded-xl p-4">
              <p className="text-sm leading-relaxed mb-3">
                <strong>Extension chain from PLAY:</strong>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Base Discovery</h4>
                  <ul className="space-y-1">
                    <li>PLAY (4 letters, 2 points)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">First Extension</h4>
                  <ul className="space-y-1">
                    <li>PLAYS (5 letters, 4 points)</li>
                    <li>PLAYED (6 letters, 6 points)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Second Extension</h4>
                  <ul className="space-y-1">
                    <li>PLAYING (7 letters, 8 points)</li>
                    <li>PLAYER (6 letters, 6 points)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Third Extension</h4>
                  <ul className="space-y-1">
                    <li>PLAYERS (7 letters, 8 points)</li>
                    <li>REPLAY (6 letters, 6 points)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-text-muted mt-3">
                <strong>Total from one base word:</strong> 7 related words = 40+
                points. Expert players automatically check every word for S, -ED,
                -ING, -ER, PRE-, RE- extensions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Pattern Recognition Training
            </h2>
            <p className="leading-relaxed mb-3">
              Expert-level pattern recognition in three training tiers:
            </p>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tier 1: Instant Pair Recognition</h3>
                <p className="text-sm leading-relaxed">
                  TH, HE, IN, ER, AN, RE, ON, OR, AT, EN should trigger automatic
                  word generation without conscious thought. When you see TH,
                  your brain should instantly suggest: THE, THIS, THAT, WITH,
                  BOTH, THEY...
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tier 2: Ending Pattern Recognition</h3>
                <p className="text-sm leading-relaxed">
                  -TION, -NESS, -MENT, -ABLE, -FUL, -LESS, -ANCE, -ENCE patterns
                  should automatically signal long-word opportunities. When you
                  see TION, instantly think: ACTION, MOTION, NOTION, PROMOTION,
                  PROMOTION, CONDITION, TRANSITION...
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tier 3: Structure Recognition</h3>
                <p className="text-sm leading-relaxed">
                  Recognize word families and structures: PRE- (PREDICT,
                  PREVENT, PRESENT, PREPARE), UN- (UNTIL, UNLESS, UNABLE),
                  -ING forms, -ER/-OR agent nouns. This is championship-level
                  pattern recognition.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Optimal Time Allocation System
            </h2>
            <p className="leading-relaxed mb-3">
              Expert time management is mathematical, not intuitive:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Time</th>
                  <th className="text-left py-2 text-text-muted">Activity</th>
                  <th className="text-left py-2 text-text-muted">Goal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0-30s", "Grid mapping", "Build search map"],
                  ["30-90s", "5+ letter words only", "Maximum points per time"],
                  ["90-150s", "4-letter + extensions", "Multiply base finds"],
                  ["150-180s", "3-letter cleanup", "Use remaining capacity"],
                ].map(([time, activity, goal]) => (
                  <tr key={time} className="border-b border-surface">
                    <td className="py-2 font-semibold">{time}</td>
                    <td className="py-2">{activity}</td>
                    <td className="py-2 text-xs">{goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              <strong>Key insight:</strong> Most players invert this — grabbing
              3-letter words immediately. Experts prioritize high-value words
              first because the scoring system rewards length exponentially.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Statistical Letter Optimization
            </h2>
            <p className="leading-relaxed mb-3">
              Use letter frequency statistics to optimize scanning:
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Tier 1 Anchors</h3>
                <p className="text-xs text-text-dim mb-2">65% of words</p>
                <ul className="space-y-1">
                  <li>S (plurals)</li>
                  <li>R (-ER, -OR)</li>
                  <li>T (-TION, TH)</li>
                  <li>N (-ING, -TION)</li>
                  <li>E (most common)</li>
                  <li>A (common vowel)</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Tier 2 Letters</h3>
                <p className="text-xs text-text-dim mb-2">25% of words</p>
                <ul className="space-y-1">
                  <li>L (-LL, -LE)</li>
                  <li>I (-ING, -TION)</li>
                  <li>O (-OR, -TION)</li>
                  <li>D (-ED, -NESS)</li>
                  <li>H (TH, CH, SH)</li>
                  <li>C (-TION, -IC)</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Tier 3 Letters</h3>
                <p className="text-xs text-text-dim mb-2">10% of words</p>
                <ul className="space-y-1">
                  <li>Qu (high value)</li>
                  <li>X (EX-, -X)</li>
                  <li>Z (zero, zone)</li>
                  <li>J (just, joy)</li>
                  <li>K (like, make)</li>
                </ul>
              </div>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Expert optimization:</strong> When grid mapping, prioritize
              Tier 1 letters first. If time permits, scan Tier 2. Check Tier 3
              only if obvious patterns emerge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Breaking 60+: The Championship Formula
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <p className="text-sm leading-relaxed mb-3">
                <strong>Consistent 60+ scores require:</strong>
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>8-10 long words (5+ letters)</strong> — This is the
                  difference maker. Most 40-point players find only 3-4.
                </li>
                <li>
                  <strong>15+ word extensions</strong> — PLAYS, PLAYED, PLAYING
                  from base words. 50-point players average 5-6 extensions.
                </li>
                <li>
                  <strong>30+ total words</strong> — Word count matters less than
                  length, but you need volume to reach 60+.
                </li>
                <li>
                  <strong>-TION/-NESS mastery</strong> — Find 2-3 of these per
                  game. They're 6-8 points each and relatively common.
                </li>
                <li>
                  <strong>Full grid coverage</strong> — Don't miss corners or
                  diagonal paths. Systematic scanning prevents this.
                </li>
                <li>
                  <strong>Use all 180 seconds</strong> — Most 50-point players
                  stop effectively at 150 seconds. Champions use every second.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Advanced Scoring Mathematics
            </h2>
            <p className="leading-relaxed mb-3">
              Understanding the scoring math drives expert strategy:
            </p>
            <div className="bg-surface/50 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-text-muted">Metric</th>
                    <th className="text-left py-2 text-text-muted">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Point efficiency", "5-letter words = 4× 3-letter words"],
                    ["Time efficiency", "1 long word vs 4 short words (same time)"],
                    ["Extension multiplier", "1 base word → 5-7 related words"],
                    ["-TION premium", "6 points × commonality = high ROI"],
                    ["Diagonal bonus", "40% more words, most players miss"],
                    ["Qu advantage", "Rare but 5-6 easy points when present"],
                  ].map(([metric, value]) => (
                    <tr key={metric} className="border-b border-surface">
                      <td className="py-2">{metric}</td>
                      <td className="py-2 text-xs">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Practice Plan: Reaching Championship Level
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Week 1-2: Pattern Foundation</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Daily Challenges: focus on systematic scanning only</li>
                  <li>• Memorize Tier 1 anchor letters and common pairs</li>
                  <li>• Practice 30-second grid mapping without submissions</li>
                  <li>• Target: Consistent 45+ scores</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Week 3-4: Extension Mastery</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Daily Challenges: focus on word extensions</li>
                  <li>• For each base word, check S, -ED, -ING, -ER, PRE-, RE-</li>
                  <li>• Practice automatic extension checking</li>
                  <li>• Target: 20+ extensions per game</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Week 5-6: Length Optimization</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Daily Challenges: prioritize 5+ letter words first</li>
                  <li>• Learn -TION, -NESS, -MENT, -ABLE pattern locations</li>
                  <li>• Practice time-phased approach (long → medium → short)</li>
                  <li>• Target: 8+ long words per game</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Week 7-8: Full Integration</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Daily Challenges: complete expert strategy</li>
                  <li>• Combine mapping, extensions, length prioritization</li>
                  <li>• Use full 3 minutes with precise time allocation</li>
                  <li>• Target: Consistent 60+ scores</li>
                </ul>
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
                  What are advanced Boggle strategies?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Advanced Boggle strategies include systematic grid mapping,
                  word extension multiplication, length-first optimization,
                  multi-directional scanning, anchor letter optimization,
                  advanced pattern recognition, and statistical time allocation.
                  Experts use these to consistently score 60+.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you get 60+ points in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  To score 60+: Find 8+ long words (5+ letters), maximize word
                  extensions (15+ per game), use systematic scanning, prioritize
                  -TION/-NESS/-MENT patterns, practice instant pattern
                  recognition, and use optimal time allocation. 60+ requires
                  vocabulary depth AND pattern mastery.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is the grid mapping algorithm for Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle grid mapping: 1) Identify anchor letters (S, R, T, N, E,
                  A), 2) Map common clusters (TH, HE, IN, ER, AN), 3) Locate
                  long-word patterns (-TION, -NESS, -MENT), 4) Verify diagonal
                  connectivity, 5) Plan 5+ letter word routes, 6) Update map
                  dynamically.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do competitive players optimize word finding?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Competitive players optimize by pattern-based searching (TH,
                  HE, IN, ER), word extension multiplication, length
                  prioritization (5-letter = 4× 3-letter), time-phased
                  approach, full 3-minute utilization, and instant pattern
                  recognition from practice.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Master Advanced Strategies
            </h2>
            <p className="text-text mb-4">
              Expert-level play requires consistent practice. Start with one
              advanced technique and build systematically. Daily Challenges are
              perfect for tracking improvement.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Practice Now
              </Link>
              <Link
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Daily Challenge
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-strategy-guide/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Strategy Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Comprehensive competitive playbook.
                </div>
              </Link>
              <Link
                href="/guides/boggle-word-lists/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Word Lists →
                </div>
                <div className="text-sm text-text-muted">
                  High-frequency words by letter and pattern.
                </div>
              </Link>
              <Link
                href="/play"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Play Word Grid Now →
                </div>
                <div className="text-sm text-text-muted">
                  Test the advanced patterns in a live game.
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
      </article>
    </main>
  );
}
