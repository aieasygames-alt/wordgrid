# Boggle Keyword Upgrade — 2026-06-28

## Overview
Added 4 new SEO-optimized guide pages targeting high-value Boggle keywords identified from competitor webmaster data.

## Data-Driven Insights

### High-Value Keywords (from competitor data)

| Keyword | Impressions | Clicks | CTR | Rank | Opportunity |
|---------|-------------|--------|-----|------|-------------|
| play boggle free online game | 100 | 1 | 100% | 5.0 | HIGH - Perfect CTR |
| boggle word game | 12 | 3 | 25% | 6.0 | HIGH - Strong CTR |
| boggle game online | 48 | 8 | 16.67% | 7.3 | MED-HIGH - Good CTR |
| boggle online free | 245 | 2 | 0.8% | 6.5 | HIGH - Volume |
| boggle online | 462 | 0 | 0% | 7.5 | MED - Volume |
| boggle | 444 | 1 | 0.23% | 8.6 | MED - Brand term |

### Key Insight
- "play boggle free online game" at rank 5 with 100% CTR shows huge demand
- Keywords ranking 6-8 have low CTR but high volume — improving rank here pays off
- Long-tail "how to" style phrases have very high CTR

## New Pages Created

### 1. Play Boggle Online Free
**URL:** `/guides/play-boggle-online-free/`
**Target Keywords:**
- play boggle free online game (100% CTR at rank 5!)
- play boggle online free
- boggle online free game
- free boggle online
- play boggle online no download

**Strategy:** This is the highest-priority page. Target keyword has perfect CTR but only at rank 5. Getting to top 3 would capture significantly more traffic.

### 2. Boggle Word Game
**URL:** `/guides/boggle-word-game/`
**Target Keywords:**
- boggle word game (25% CTR at rank 6)
- boggle word game rules
- boggle word game online
- boggle word game scoring
- how to play boggle word game

**Strategy:** Strong CTR keyword. Comprehensive guide covering rules, scoring, and gameplay.

### 3. Boggle Game Online
**URL:** `/guides/boggle-game-online/`
**Target Keywords:**
- boggle game online (16.67% CTR at rank 7.3)
- boggle online game
- boggle game online free
- play boggle game online
- boggle game no download

**Strategy:** Good CTR keyword. Focus on the online/browser aspect of gameplay.

### 4. Boggle Online Free
**URL:** `/guides/boggle-online-free/`
**Target Keywords:**
- boggle online free (245 impressions)
- boggle online free game
- free boggle online
- boggle online no download
- play boggle online for free

**Strategy:** High-volume keyword with decent rank (6.5). "Free" angle is emphasized.

## SEO Features Per Page

Each new page includes:
- ✅ Optimized title tags with target keywords
- ✅ Compelling meta descriptions for CTR
- ✅ Targeted keyword arrays in metadata
- ✅ Open Graph tags for social sharing
- ✅ Article Schema markup
- ✅ FAQ Schema (5-6 Q&A pairs targeting question queries)
- ✅ HowTo Schema (where applicable)
- ✅ Breadcrumb Schema
- ✅ Canonical URLs
- ✅ Internal linking to related guides
- ✅ CTA blocks driving to /play and /daily

## Technical Implementation

### Files Modified
1. `src/app/sitemap.ts` — Added 4 new guide pages
2. `src/app/guides/page.tsx` — Added 4 new entries to GUIDES array

### Files Created
1. `src/app/guides/play-boggle-online-free/page.tsx`
2. `src/app/guides/boggle-word-game/page.tsx`
3. `src/app/guides/boggle-game-online/page.tsx`
4. `src/app/guides/boggle-online-free/page.tsx`

### Build Status
✅ Build successful — all pages generate as static HTML
✅ Total pages: 398 (including word pages)
✅ New guide pages show in build output

## Expected Impact

### Traffic Projections (Conservative)
Assuming we reach rank 5-6 for these terms:

| Keyword | Current Impressions | Est. Clicks at Rank 5 | Est. Clicks at Rank 3 |
|---------|-------------------|----------------------|----------------------|
| boggle online free | 245 | ~5 | ~12 |
| boggle game online | 48 | ~2 | ~5 |
| boggle word game | 12 | ~1 | ~2 |
| boggle online | 462 | ~5 | ~15 |
| play boggle free online game | 100 | ~5 | ~8 |

**Total estimated monthly clicks:** 18-42 additional clicks

### Long-term Potential
If pages reach top 3 rankings:
- **50-100+ additional monthly clicks** from these terms
- **Brand awareness** for "wordgrid" as Boggle alternative
- **Diversified traffic** beyond generic "word grid" terms

## Next Steps

1. ✅ **Deploy** — Push to production
2. ⏳ **IndexNow submission** — Submit new URLs to Bing/Yandex
3. ⏳ **Google Search Console** — Request indexing for new pages
4. ⏳ **Monitor rankings** — Track position changes over 4-6 weeks
5. ⏳ **Consider additional guides** if these perform well:
   - "Boggle rules pdf"
   - "How to win at Boggle"
   - "Boggle scoring sheet"

## Notes

- All pages follow existing design patterns
- Content is comprehensive (4-6 min read per page)
- FAQ schema targets question-based queries
- HowTo schema captures "how to" intent
- Strong internal linking to other guides
- Each page has clear CTAs to drive game engagement
