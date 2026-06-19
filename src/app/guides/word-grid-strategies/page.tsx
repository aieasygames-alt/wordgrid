import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Grid Strategies — Score Higher Every Game | WordGrid",
  description:
    "Advanced strategies for word grid and Boggle-style puzzles. Learn scoring optimization, time management, and word patterns to maximize your score.",
  alternates: { canonical: "/guides/word-grid-strategies" },
};

export default function Guide2() {
  return (
    <main className="min-h-screen px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-300">
            ← WordGrid
          </a>
          <h1 className="text-4xl font-bold mt-4 mb-2">
            Word Grid Strategies: Score Higher Every Game
          </h1>
          <p className="text-slate-400">5 min read</p>
        </header>

        <div className="space-y-6 text-slate-200">
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">
              Understand the Scoring Curve
            </h2>
            <p className="leading-relaxed mb-3">
              WordGrid rewards length exponentially. Here&apos;s the breakdown:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400">Length</th>
                  <th className="text-left py-2 text-slate-400">Points</th>
                  <th className="text-left py-2 text-slate-400">Value per letter</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [3, 1], [4, 2], [5, 4], [6, 6], [7, 8], [8, 10],
                ].map(([len, pts]) => (
                  <tr key={len} className="border-b border-slate-800">
                    <td className="py-2">{len} letters</td>
                    <td className="py-2 text-indigo-400 font-semibold">{pts} pts</td>
                    <td className="py-2 text-slate-500">
                      {(pts / len).toFixed(1)} pts/letter
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Notice: 5-letter words give the best value per letter (0.8). Aim for
              the 5-6 sweet spot rather than chasing rare 7+ words.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">
              Time Management
            </h2>
            <p className="leading-relaxed mb-3">
              With 3 minutes on the clock, divide your time strategically:
            </p>
            <ul className="space-y-2 ml-4">
              <li>
                <strong>0:00–0:30</strong> — Quick scan: grab all obvious 3-4 letter
                words you can see immediately. Build momentum.
              </li>
              <li>
                <strong>0:30–2:00</strong> — Deep search: extend found words with
                prefixes/suffixes, hunt for 5+ letter words around rare letters.
              </li>
              <li>
                <strong>2:00–3:00</strong> — Final sweep: check plurals, verb tenses,
                and any remaining unexplored areas of the board.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">
              Word Families
            </h2>
            <p className="leading-relaxed mb-3">
              When you find a word, think about its entire word family:
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 font-mono text-sm">
              <div>RATE → RATES, RATED, RATING</div>
              <div>STAR → STARS, STARRED, START, STARE</div>
              <div>POINT → POINTS, POINTED, POINTER</div>
              <div>FORM → FORMS, FORMED, REFORM</div>
            </div>
            <p className="leading-relaxed mt-3">
              One root word can generate 3-5 additional valid words. This is how top
              scorers find 25+ words per game.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">
              Know Your Vowels
            </h2>
            <p className="leading-relaxed">
              Vowel placement determines what&apos;s possible. If you see two vowels
              adjacent, look for words that use both (RAIN, ROAD, TEAM). If vowels are
              spread out, focus on consonant clusters around each one independently.
            </p>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-indigo-300 mb-2">
              Start Practicing
            </h2>
            <p className="text-slate-300 mb-4">
              The daily challenge resets every 24 hours — perfect for building a habit.
            </p>
            <div className="flex gap-3">
              <a
                href="/daily"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl font-semibold"
              >
                Today&apos;s Challenge
              </a>
              <a
                href="/guides/how-to-find-more-words"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 transition rounded-xl font-semibold"
              >
                More Tips
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
