# SEO Measurement Baseline: 2026-08-15

Use this file as the baseline for the Webmaster-driven CTR optimization work.

## Review Windows

- Early crawl check: 7 days after deployment.
- CTR check: 14 days after deployment.
- Decision check: 30 days after deployment.

Do not judge success from a single day of data. Compare equivalent date ranges where possible.

## Primary Query Baselines

| Query | Impressions | Clicks | CTR | Avg Position | Target |
| --- | ---: | ---: | ---: | ---: | --- |
| `word grid` | 3,542 | 19 | 0.54% | 4.94 | CTR 1.2%+ |
| `word grid game` | 292 | 6 | 2.05% | 3.25 | Preserve CTR and ranking |
| `boggle solver` | 55 | 0 | 0.00% | 6.98 | Generate clicks |
| `boggle generator` | 23 | 0 | 0.00% | 7.39 | Generate clicks or diagnose mismatch |

## Primary Page Baselines

| Page | Impressions | Clicks | CTR | Avg Position | Target |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 3,635 | 45 | 1.24% | 4.27 | CTR 2.0%+ |
| `/daily/` | 945 | 3 | 0.32% | 7.39 | CTR 1.0%+ |
| `/play/` | 652 | 3 | 0.46% | 6.74 | CTR 1.0%+ |
| `/solver/` | 156 | 5 | 3.21% | 5.80 | Preserve CTR; improve `boggle solver` query clicks |
| `/guides/play-word-grid-online/` | 85 | 0 | 0.00% | 8.25 | Generate clicks |
| `/guides/boggle-word-game/` | 57 | 0 | 0.00% | 5.72 | Generate clicks |
| `/guides/boggle-rules-for-kids/` | 31 | 0 | 0.00% | 3.52 | Generate clicks |

## Device Baselines

| Device | Impressions | Clicks | CTR | Avg Position | Note |
| --- | ---: | ---: | ---: | ---: | --- |
| Desktop | 5,799 | 78 | 1.35% | 5.49 | Main Webmaster traffic surface |
| Mobile | 709 | 12 | 1.69% | 5.53 | Smaller but higher CTR |

## Decision Rules

- If CTR improves and average position is stable within roughly 2 positions, keep the change.
- If CTR improves but ranking drops more than roughly 2 positions, inspect query mix before reverting.
- If impressions rise but CTR stays flat, improve snippets and above-fold intent matching again.
- If clicks remain zero on a page after 30 days, check whether the page is matching the wrong query intent.
- If competitor-adjacent queries drive impressions but no clicks, monitor rather than create comparison pages immediately.

## Next Export Checklist

1. Export Webmaster keyword, page, country, device, and overview reports.
2. Export matching GSC data for the same period if available.
3. Compare query and page metrics against this baseline.
4. Mark each priority page as:
   - Keep
   - Iterate snippet
   - Add content module
   - Diagnose intent mismatch
   - Consider new page
5. Avoid changing successful pages in the same pass as underperforming pages.
