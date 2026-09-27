# WordGrid Indexation Quality Policy

## Goal

Index pages that provide a distinct playable, instructional, or reference value. Keep navigational aliases and materially overlapping pages available to users but out of the sitemap and, where appropriate, out of the index.

## Current Rules

### Indexable

- Core experiences: `/`, `/play/`, `/daily/`, `/weekly/`, `/training/`, `/solver/`, `/challenge/`.
- Distinct support tools: `/boggle-solver/` and `/word-grid-solver/` remain indexable only while Webmaster data shows distinct query demand.
- Editorial guides with a unique audience or task.
- Daily archive entries with deterministic boards, computed word/score data, replay, solver, and adjacent archive navigation.
- Curated word pages that have a stable canonical URL and real study context.

### Kept Available, Not Indexed

- `/boggle-word-finder/`: equivalent user action to the main Solver.
- `/boggle-cheat/`: equivalent post-game review action with a potentially low-quality query framing.

These pages canonicalize to `/solver/`, use `noindex, follow`, and are excluded from the sitemap. Do not block them in `robots.txt`; crawlers need to see the directive.

## Before Adding a New URL

Require all three:

1. A distinct user task, not a synonym of an existing tool or guide.
2. Distinct first-screen content and at least one unique downstream action.
3. Query-level demand from GSC/Bing or a deliberate product destination that users can reach internally.

If a page is only an alternate label for an existing tool, link to the canonical tool instead. If it must remain for legacy users, set `noindex, follow` and canonicalize it to the primary URL.

## Monthly Audit

1. Compare sitemap URLs against GSC indexed pages and excluded-page reasons.
2. Identify URLs with impressions but no distinct query cluster after a 30-day review.
3. Check for self-canonical pages that share the same tool implementation or near-identical first-screen promise.
4. Choose one action: retain, differentiate, canonicalize/noindex, or merge with a permanent redirect.
5. Update internal links and sitemap entries in the same release as any consolidation.

## Guardrails

- Never noindex a page only because it has low traffic; determine whether it has a distinct task first.
- Do not canonicalize a page to a target with incompatible intent.
- Do not add public pages for every dictionary term, board state, or URL parameter.
- Do not expose user-provided challenge data, local stats, or raw user input as crawlable content.
