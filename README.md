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
- `/daily` — Daily challenge (same grid for everyone, midnight UTC+8)
- `/daily/archive/` — Static daily history, refreshed by the daily archive workflow.

### Daily archive refresh

`.github/workflows/refresh-daily-archive.yml` runs at 00:15 and 12:15 UTC+8 on
the default branch and can also be run manually. It validates a fresh static
export, advances the date and refresh time in `public/data/archive-build.json`, and commits the marker to
trigger the existing Cloudflare Pages Git integration. Scheduled runs can be
delayed by GitHub; the archive labels its newest published board explicitly.
The second run refreshes the deployment marker even on the same date so a
failed Cloudflare build can be retried.
Historical URLs from June 10, 2026 onward are retained in builds and the sitemap.
Monitor the workflow and the Cloudflare Pages deployment after enabling it on main.

## Complete Mode

`/complete/` is an independent untimed daily collection game: find all target
words, discover optional bonuses, reveal words for zero points, and save progress
locally. Daily boards change at midnight UTC+8. The initial editorial bank covers
2026-10-14 through 2027-10-13; outside coverage, a clearly labelled practice board
remains playable. The published mode is indexable and included in the sitemap.

- `npm run generate:complete` regenerates the deterministic editorial bank.
- `npm test` includes Complete rules, all generated puzzles, and SQLite API tests;
  use Node 22.13+ (Node 24 LTS recommended).
- Optional ranking uses `/api/complete/score`, the Cloudflare `DB` binding, and
  the additive tables in `schema.sql`. Apply schema to the intended preview and
  production databases before enabling ranking. Static hosting works without it.
- Published answers are readable and browser identity is anonymous: rankings are
  casual, not cheat-proof. No Squaredle assets or NASPA word list are reused.

See `plans/COMPLETE_IMPLEMENTATION.md` for verification and deployment steps.
