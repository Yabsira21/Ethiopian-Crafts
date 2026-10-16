# Performance notes

Fill this in with your own measurements. Do not invent numbers.

## Test conditions
- Page tested:
- Device / browser / throttling:
- Tool (Lighthouse, PageSpeed Insights, DevTools Performance...):
- Build tested: production (`npm run build && npm start`)

## Before
| Metric | Result |
|---|---|
| LCP | |
| CLS | |
| INP | |

## What we changed
-

## After (same conditions)
| Metric | Result |
|---|---|
| LCP | |
| CLS | |
| INP | |

## What the metrics tell us
- LCP:
- CLS:
- INP:

## Day 43 choices in this project
- `next/image`: all product and hero images; hero uses `priority`.
- `next/font`: Inter in `src/app/layout.jsx`.
- `next/script`: not used (no third-party scripts needed).
- Server vs Client Components: pages, product card and navbar are Server Components; cart, filters, forms and admin orders are Client Components.
- Environment: `AUTH_SECRET` is server-only (no `NEXT_PUBLIC_` prefix); `.env.example` is committed, `.env.local` is not.
