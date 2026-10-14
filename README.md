# WordGrid

Word search puzzle game — find words by connecting adjacent letters in a 4×4 grid.

## Tech Stack
- Next.js 14 (static export)
- TypeScript + Tailwind CSS
- Deploy: Cloudflare Pages

## Local Development
```bash
npm install
npm run dev
```

## Build & Deploy
```bash
npm run build    # outputs to ./out
npx wrangler pages deploy out
```

## Notes
- Word detail pages are fully static by default, so builds do not depend on the external dictionary API.
- If you want to re-enable remote dictionary lookups for richer word pages, set `WORDGRID_ENABLE_REMOTE_DICTIONARY=1` before building.

## Routes
- `/` — Landing page
- `/play` — Random game
- `/daily` — Daily challenge (same grid for everyone, UTC date-based)

## Complete Mode

`/complete/` is an independent untimed daily collection game: find all target
words, discover optional bonuses, reveal words for zero points, and save progress
locally. Daily boards change at midnight UTC+8. The initial editorial bank covers
2026-10-14 through 2027-10-13; outside coverage, a clearly labelled practice board
remains playable. The mode is noindex during beta.

- `npm run generate:complete` regenerates the deterministic editorial bank.
- `npm test` includes Complete rules, all generated puzzles, and SQLite API tests;
  use Node 22.13+ (Node 24 LTS recommended).
- Optional ranking uses `/api/complete/score`, the Cloudflare `DB` binding, and
  the additive tables in `schema.sql`. Apply schema to the intended preview and
  production databases before enabling ranking. Static hosting works without it.
- Published answers are readable and browser identity is anonymous: rankings are
  casual, not cheat-proof. No Squaredle assets or NASPA word list are reused.

See `plans/COMPLETE_IMPLEMENTATION.md` for verification and deployment steps.
