# SEO Review Checklist

Use this checklist for the next Webmaster/GSC export after the CTR optimization deployment.

## Before Export

- Confirm deployment commit hash and deployment date.
- Wait at least 7 days for early crawl checks.
- Prefer 14-30 days before making a success/failure call.
- Export the same report types used for the baseline:
  - Keyword report
  - Page traffic report
  - Device report
  - Country report
  - Search performance overview

## Query Review

For each query, record impressions, clicks, CTR, and average position:

- `word grid`
- `word grid game`
- `boggle solver`
- `boggle generator`
- `play word grid online`
- `boggle word game`
- `boggle rules for kids`

Decision labels:

- Keep: CTR improved and ranking stayed stable.
- Iterate snippet: ranking stable, CTR still weak.
- Diagnose intent: impressions increased, clicks stayed near zero.
- Watch: sample size too small.

## Page Review

For each page, record impressions, clicks, CTR, and average position:

- `/`
- `/daily/`
- `/play/`
- `/solver/`
- `/guides/play-word-grid-online/`
- `/guides/boggle-word-game/`
- `/guides/boggle-rules-for-kids/`
- `/guides/boggle-solver/`
- `/guides/boggle-generator/`
- `/guides/boggle-word-lists/`
- `/guides/most-common-boggle-words/`

## Content Decision Rules

- If a page has position 1-5 and CTR below 1%, improve snippet and first paragraph.
- If a page has position 6-10 and CTR below 1%, improve snippet, H1, and near-top CTA.
- If a page has impressions but no clicks after 30 days, inspect the exact queries before adding content.
- If a page gains clicks without position loss, leave it alone for another cycle.
- If the same query maps to multiple pages, decide which one is canonical for that intent and strengthen internal links toward it.

## Follow-Up Actions

- Update `seo-measurement-baseline-2026-08-15.md` with a post-change table.
- Create a short note listing pages to keep, iterate, or pause.
- Do not change more than one major element per priority page in the same follow-up batch unless the page is clearly mismatched.
