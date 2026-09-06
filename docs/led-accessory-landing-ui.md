# LED accessory category landing pages

Updated the Receiving Card, Controller, Power Supply and LED Accessories listing pages. Product records, detail pages, existing URLs and the accessories hub are unchanged.

## Shared design

- A full-width, category-specific illustrated hero with a soft transition into the copy, in-flow actions and compatibility tags. The former boxed product showcase is removed. Mobile places the copy above the visual without cropping the foreground equipment.
- Four-way category navigation with an accessible current-page state.
- One server-rendered product grid: 6 receiving cards, 9 controllers, 3 power supplies and 9 accessories. Full titles, three catalog highlights, existing prices (or price-on-request fallback) and aligned actions; no repeated category badge below the image.
- Nested CSS subgrids align the title, each of the three feature rows, price, price note and actions across each visual card row. Titles and each feature now stay on one visible line with ellipsis when necessary; the complete catalog text remains in the DOM and native hover titles. No runtime height measurement is used. A flex fallback remains for browsers without subgrid.
- Hero images use bounded 100% width/height with `object-fit: contain`, rather than intrinsic-width overflow. No image mask or negative horizontal offset remains. Mobile frames follow each source's 3:1 or 2:1 aspect ratio, showing the entire supplied image instead of a zoomed-in portion. Existing source artwork is unchanged.
- All product image areas share an 8:5 ratio. Scene photos fill that frame (only a small amount of empty background is cropped on the 3:2 ribbon photo). Isolated hardware remains contained. Two rack-device photos can fill the frame because their original files have substantial empty vertical space. R716, R516 and A3L use backdrops matched to their existing images, avoiding a contrasting inset rectangle. Catalog files are unchanged.
- Distinct selection guides, applications, quotation checklists, six native FAQ disclosures per page and a final contact/WhatsApp section.
- Scoped white, pale blue and navy backgrounds; three/two/one-column product layouts. Wide-screen typography follows the established Home-style scaling. Only these four exact paths opt into the existing responsive header; product-detail headers are unchanged.
- Unique metadata and canonical URLs, breadcrumb data and catalog-driven CollectionPage/ItemList structured data. No fabricated reviews, live offers or FAQ-rich-result claims.

## Asset limitations

Five existing catalog records reuse another model's image: NovaStar MRV336, Colorlight 5A-75E, Huidu VP210H, HD-VP1220 and HD-VP1620. Their listing images now explicitly say “Representative image” and have descriptive alternative text. Replace these with verified exact-model photography when available. The named MRV336 and Colorlight files currently contain generation placeholders and are deliberately not used. No product images or catalog specifications were overwritten.

Some original product photos are only 259–300px wide; responsive fitting cannot restore missing detail. Their pixels were not replaced with invented product photography.

Four new hero illustrations are saved in `public/images/accessories/heroes/`, approximately 78–141 KiB each. They are visibly marked “Illustrative setup”. The imagegen skill was used via the built-in tool; the exact prompt set and saved filenames are in [led-accessory-hero-prompts.md](led-accessory-hero-prompts.md).

## Verification

- TypeScript and targeted ESLint passed.
- Latest fit/one-line correction: `node --test tests/accessory-landing-ui.test.mjs`: 10 tests passed; targeted ESLint and typecheck passed.
- Local headless Chrome: all four pages checked at 320, 390, 430, 600, 768, 820, 999, 1024, 1200, 1242, 1366, 1440, 1518, 1708, 1821, 2039, 2102 and 2732 CSS pixels. These include desktop widths corresponding approximately to the requested browser-zoom range; they are viewport emulations, not OS/device coverage.
- Correction audit: no document or visible-content horizontal overflow; image, title, all three feature rows, price, note and both action positions aligned within one pixel across each card row. All page images loaded, one H1 per page and all 24 FAQ disclosures rendered. FAQ keyboard behavior was checked in the original page audit; its markup is unchanged by these corrections.
- All 27 product-detail links returned HTTP 200. No uncaught browser exceptions in the category-page audit.
- Desktop/mobile screenshots reviewed for hero, product, guide, FAQ and CTA layout.

The correction scope is hero and product cards only. Selection/application/checklist/FAQ/CTA content and styles, catalog values, route URLs, global headers and other pages were not changed by this correction.

No production build, export, deployment or commit was run.

Latest browser regression: all four routes checked at 320, 390, 600, 768, 820, 1024, 1200, 1242, 1366, 1440, 1518, 1708, 1821, 2039, 2102 and 2732 CSS pixels. Banner elements remained inside their frames with `contain` and no mask; every product title and feature stayed one line with its complete hover text; card-row alignment and document overflow checks passed. No browser errors were recorded.
