# Digital Podium landing page

## Scope

- Canonical route: `/digital-podium/`. Existing legacy redirect is unchanged.
- Replaced separate mobile/desktop layouts with one server-rendered page.
- Reused existing podium artwork; no generated assets, catalog edits or product-detail changes.
- Landing-only CSS module: `modules/routes/catalog/control-systems/digital-podium/podium.module.css`.
- Shared header change only opts `/digital-podium/` into the existing Home/IFP responsive sizing. Other routes retain their behavior.

## Design

- Light hero with full podium artwork, readable copy and in-flow feature/CTA rows.
- Home-style product cards: one configuration badge, full image (`object-fit: contain`), unclipped titles/features and bottom-aligned actions.
- Six models rendered once; desktop three-column, tablet two-column, phone single-column.
- Alternating white, pale blue and navy sections; consistent containers, typography, icons and spacing.
- Application guide, room integration, catalog-driven price table, configuration features, buying guide, installation process, procurement checklist, related links, eight native FAQ disclosures and final quote/WhatsApp CTA.
- Preserves `buying-guide`, `specs-explained`, `installation` and `boq-tender` anchors.

## Content and SEO

- Existing catalog is the source for product URLs, titles, images, indicative prices and card highlights.
- Prices are not live offers. Configuration, appearance, availability and installation inclusions require a written quotation.
- Existing artwork is identified as illustrative; no invented projects, reviews, ratings or customer counts.
- One H1, descriptive metadata, canonical URL, matching social image dimensions, descriptive image alt text and crawlable internal links.
- BreadcrumbList and CollectionPage/ItemList describe the visible page and six linked models. No invented Product/Offer data.
- FAQ is visible and keyboard-accessible, rendered only once. No FAQ rich-result markup: Google retired that feature in May 2026 and removed its documentation in June.
- References: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Google Search documentation updates](https://developers.google.com/search/updates#june-2026).

## Verification (2026-09-06)

- `npm run typecheck`: passed.
- Targeted ESLint: passed.
- `node --test tests/digital-podium-ui.test.mjs tests/header-compact.test.mjs`: 6 passed.
- Local Chrome: 320, 390, 430, 600, 768, 820, 999, 1024, 1200, 1242, 1366, 1440, 1518, 1708, 1821, 2039, 2102 and 2732 CSS-pixel widths. These cover phone/tablet and equivalents of the requested desktop zoom ranges, not native browser zoom automation.
- No page/text/card horizontal overflow detected at those widths. Equal card bottoms within each desktop/tablet row.
- Full-page screenshots reviewed at desktop, tablet and mobile sizes. Product images loaded, in-page anchors resolved; FAQ Enter-to-open and click-to-close passed. No uncaught browser runtime exceptions observed.
- Final hero contain-fit adjustment rechecked at 390, 1366 and 1821 widths.
- Product, contact and related-solution links checked locally. One premium product request returned a transient 500 during the first concurrent check; retry returned 200 without changing the detail page.
- Existing `tests/seo.test.mjs`: 76 passed, 11 failed. Repeating with HEAD versions of the changed tracked files produced the identical 11 failures (robots/source regex checks, Conference and LED catalog/template checks). They are outside this page update and remain unchanged.
- No production build, static export, deployment or git commit performed.

## Future content updates

Update `catalog.ts` for approved product data and `content.ts` for landing-page guidance. Keep the model label list in catalog order. If artwork changes aspect ratio, keep contain fitting and check all six cards before publishing. Confirm current prices and exact inclusions before presenting them as firm offers.
