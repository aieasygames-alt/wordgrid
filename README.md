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
