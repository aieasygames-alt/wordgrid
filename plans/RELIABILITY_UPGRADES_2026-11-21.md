# WordGrid reliability upgrades — 2026-11-21

This batch addresses backlog R01, R02, R03 and R05: weekly theme quality,
the unreachable Long Word achievement, dependency maintenance, and Complete
hint countdowns. Complete lexicon expansion, history/replay, offline caching,
and a portable browser regression suite remain future work.

## Player behavior

- From the week of November 23, 2026, Weekly candidates are solved with the
  actual game dictionary and must contain at least three matching words:
  Qu paths, words with at least five letters, or words with three/four letters.
  Selection is deterministic, capped at 2,048 candidates, and fails the build
  if it cannot satisfy the theme. Earlier published boards stay unchanged.
  Weekly retains its Monday UTC boundary and server-built client payload.
- Long Word now requires six letters, matching the playable ordinary
  dictionary's three-to-six-letter range. Its detail includes the actual length;
  result achievements and share text consume the same achievement list.
- Complete shows the exact number of target words needed for each hint stage.
  Thresholds use whole words rounded up at 20%, 40%, and 60%. Bonuses and
  duplicate finds do not advance them. Unlocked controls and the all-unlocked
  state are explicit. Existing puzzle versions, scores and saves are retained.
- At widths below 360px, the header keeps the WG cubes and accessible home
  label while hiding the adjacent brand text, allowing all four controls to fit.
  This fixes a header overflow found during the countdown's 320px QA.

## Framework and tooling

- Next.js 14.2.5 → 15.5.29; React remains on compatible 18.3.1.
- Dynamic page params use the Next.js 15 asynchronous API. Robots and sitemap
  explicitly opt into static generation. Export remains `out/` on Pages.
- ESLint 9.39.5, matching `eslint-config-next`, and a flat configuration replace
  `next lint`. Internal links flagged by the newer rules use Next Link; the
  result Home action retains full navigation so it resets a completed home game.
- PostCSS 8.5.33 is shared through an override, including Next's nested copy.
  Compatible transitive dependencies and the lockfile are refreshed.
- Node 24 LTS is pinned in `.node-version`; tests require Node 22.13+ for SQLite.
- Wrangler 4.166.0 is a pinned development dependency. `npm run check:functions`
  packages Pages Functions locally and runs in the daily archive workflow.
- README and DEVELOPMENT now describe the deployed modes, D1 backend, current
  dictionary, GA4, indexable Complete route and actual remaining capabilities.
  Older Complete documents keep their historical observations with dated notes.

The November 21 npm audit changed from 15 affected packages (one critical,
12 high, two moderate, including development/transitive dependencies) to zero
reported vulnerabilities. Static export avoids running a Next Node server in
production; the package audit was not treated as proof of a live exploit.
Future advisories still require maintenance. ESLint 9 reports upstream
deprecation; an ESLint 10 toolchain migration is separate from this compatible
framework maintenance update.

## Validation

- `npm test`: 22 passing tests plus 86 guide word examples. Coverage includes
  all 365 Complete puzzles, real SQLite endpoint behavior, 53 future Weekly
  boards with at least three theme words and stable weekly layouts, preservation
  of the November 16 board, and exact hint boundaries for a 27-target puzzle.
- `npm run lint`: zero warnings/errors. TypeScript standalone check passes.
- `npm run build`: 493 static pages. All 485 sitemap URLs have HTML, exactly
  their expected canonical, no noindex, and existing referenced Next assets.
  The sitemap retains 165 archive dates through November 21.
- `npm run check:functions`: Worker compilation succeeds. No remote database
  changes or public test scores were needed.
- `npm audit --json`: zero vulnerabilities after the dependency changes.
- Browser checks: a bonus leaves hint progress unchanged; targets unlock hints
  at 2/4/6 of today's ten targets; refresh preserves progress and unlocks.
  GARDEN earns Long Word with the six-letter detail. Current Weekly tiles are
  unchanged, and client navigation to the solver loads its dictionary/results.
- Mobile checks: countdown layout at 390px and 320px; document width equals
  its available viewport width after the header correction (305px at a 320px
  window with a 15px scrollbar). Temporary viewport overrides are reset.

Native system sharing, cancellation and failure fallback still need full device
evidence. The share text path reuses the corrected achievement list, but this
batch does not claim that an operating-system share action completed. Static
localhost cannot serve the ranking API; SQLite tests and Functions compilation
cover the backend locally, followed by read-only production GET checks.

## Delivery and next scope

Publish through the existing main-branch Cloudflare Pages Git integration and
verify the matching deployment, public countdown, sitemap/assets and leaderboard
GET. The commit/deployment identities are recorded in the delivery message rather
than added through a circular follow-up commit.

R04 (Complete accepted-word coverage, difficulty and path variety) is the next
product quality candidate. It needs an explicit lexicon/version plan that keeps
published puzzles and saved progress valid. R06 history/replay, R07 full offline
support and R08 reusable browser acceptance remain open. GA4 report configuration,
real-device sharing, measured performance and SEO impact remain validation or
research work rather than completed development.
