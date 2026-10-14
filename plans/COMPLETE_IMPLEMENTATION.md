# WordGrid Complete: implementation and deployment

Implemented 2026-10-14. New route: /complete/. All stages are part of one commit;
no production deployment or remote database modification is performed.

## Stage 1: independent untimed collection game

- A dedicated React client and shared pure rules module; existing timed/Zen/daily
  game behavior is unchanged.
- Pointer drag, tap-then-submit, keyboard-accessible tiles, word text input,
  diagonal paths, no tile reuse, Qu handling and optional bonuses.
- Grouped target collection, completion screen, zero-point reveals, local progress
  with puzzle/rules/dictionary versions and a separate practice namespace.
- No third-party game requests. Original squaredle-public stays untracked and
  outside the deployed public directory. Uses the site's existing design/theme.
- /complete/ is deliberately noindex and not added to sitemap until public launch
  validation; home and footer contain discoverable beta-mode links.

## Stage 2: daily bank

- Independently assembled finite editorial list: 635 targets / 82 bonuses, including
  long words. No original Squaredle/NASPA data reused. No external dictionary fetch.
- Deterministic offline generator creates 365 unique 4x4 boards with 10-36 targets
  and at least one >=8-letter target. Full precomputed answers ship in ~156 KB JSON.
- Current coverage: 2026-10-14 to 2027-10-13. UTC+8 date checks every second and on
  document visibility changes; changing the date remounts the puzzle state.
- Outside coverage: explicitly labelled practice board, no leaderboard submission.
- `npm run generate:complete -- 2026-10-14 730` extends the original sequence; do
  not change an active start date, lexicon, or rules without version planning.
- Response headers revalidate the bank. Client and API consume the same bank.
- No mini/holes UI in this release: the requested first release is a normal 4x4
  collection game. Empty-cell rejection exists in the shared rule tests.

## Stage 3: optional leaderboard

`functions/api/complete/score.ts` handles GET and POST. D1 `DB` uses the existing
wordgrid-challenges binding, with separate complete_scores/complete_rate_limits
schema. Missing binding/tables/network degrades without breaking local play.

POST checks same-origin, JSON content type, bounded body stream (8 KB), Cloudflare
source header, date, puzzle version, display name, distinct allowed words, actual
board paths and reveal subset. Server calculates points and target/completion
counts; it never trusts client score fields. Only the current day's board accepts
submissions. GET permits published current and historical boards, not future ones.

D1 atomically limits each minute-specific hashed IP bucket to ten requests/minute.
An HttpOnly SameSite=Strict browser cookie (Secure on HTTPS) identifies a player;
unique key retains one best score per browser/puzzle version. Anonymous identity
is not account verification. A player can clear cookies or read public answers;
reveal declarations cannot be independently verified. There is deliberately no
speed leaderboard and no claim of cheat-proof ranking. No remote assets/paid service
or accounts were added.

Names and scores are public only after explicit submit. UI, privacy and terms
explain optional submission, sent words, cookie, rate limiting and limitations.
Future public launch should evaluate moderation; ASCII name restrictions prevent
HTML injection, not offensive names. Contact-based removal is documented; an
admin dashboard is not included.

## Tests and local verification

- `npm test`: original 86 guide checks plus 8 Complete behavior/integration tests.
- Complete tests check all 365 puzzles/answers, paths, duplicate handling, reveal
  scoring, storage sanitization, version keys, UTC+8 boundary/practice fallback.
- Actual SQLite adapter executes schema and endpoint SQL: server scoring, best
  score uniqueness, invalid submissions, future dates, atomic rate limits and size.
- Test time is pinned to 2026-10-14, independent of when CI executes the suite.
- Test harness uses TypeScript transpilation and node:sqlite; Node 22.13+ or 24 LTS
  is required for tests. The app remains a static Next.js export.
- Production browser verification: long word, duplicate, click path, invalid word,
  bonus, reveal, completion, refresh persistence, mobile and desktop layout.
- Wrangler Functions build succeeds; local Pages + real D1 GET/POST returns 200
  and server-derived score. Local database lives under /tmp, not production.
- Existing _redirects contains two absolute HTTPS source rules rejected by local
  Wrangler; unrelated to this feature and left unchanged.

## Deployment checklist (not executed remotely)

1. Use Node 24 LTS for local/CI verification; run npm ci, npm test, npm run lint,
   npx tsc --noEmit --incremental false, npm run build.
2. In a Pages preview environment, configure the `DB` binding and run schema.sql
   against the intended preview database. For local smoke testing:

   ```sh
   npx wrangler d1 execute wordgrid-challenges --local --file schema.sql
   npx wrangler pages dev out
   ```

3. For production, apply the additive schema against the intended production D1
   only after approval: `npx wrangler d1 execute wordgrid-challenges --remote --file schema.sql`.
   Existing challenge data is untouched by the CREATE IF NOT EXISTS statements.
   Configure Preview and Production DB bindings deliberately, preferably separate.
4. Deploy through the existing Pages Git integration (npm run build, out) with
   the functions/ directory available. Static-only file hosting has no leaderboard;
   it still supports the whole local game. Manual Pages deployments must package
   Functions and keep the configured DB binding.
5. Verify GET, consent/submit UX, cookie flags, server POST validation, duplicate
   submissions, limit responses, storage failures, mobile touch and midnight switch
   on preview before production. Real-device long drag is a remaining manual check.
6. Keep noindex during beta. After public acceptance, remove noindex and add the
   new route to sitemap. Monitor failures and maintain bank coverage before expiry.
7. Rollback frontend/worker with the previous Pages deployment; additive D1 tables
   can stay without affecting previous code. Do not automatically drop stored data.
