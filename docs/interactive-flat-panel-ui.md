# Interactive Flat Panel UI and hero asset

## Latest: Home-style model cards

At the user's request, IFP model cards now match Home's **Browse Products** cards, superseding the earlier contained-image model-card treatment below. Desktop uses the same 205px cover image, overlay badges, 12px radius, category/title, three feature rows, orange price and paired View Details/Get a Quote buttons. Mobile uses Home's compact image/title/price/details treatment. Filters, expansion, catalog records, OPS cards and other sections are unchanged.

Compared actual Home and IFP computed styles in Chrome: image height/fit, radius, title font/line height and body padding matched exactly at 1366px. Checked 13 viewport widths, filter/reset and model expansion; no horizontal overflow or browser exceptions. TypeScript, targeted lint and seven tests passed. No build was run.

## Scope and verification

- Full landing-page redesign: hero, service strip, brand/size model explorer, applications, sizing and indicative budget guides, features, OPS options, projector comparison, service support, installation process, buying checklist, FAQ and final quote CTA.
- Existing 18 catalog records, product URLs, price labels, product/OPS images and six FAQ answers retained. Repeated buyer guidance is consolidated.
- Local CSS module follows Home/Rental wide-screen container proportions. Only the exact IFP landing route opts into the existing responsive header; shared footer and other pages are unchanged.
- TypeScript and targeted ESLint checks passed.
- Seven regression tests passed after the image-fit follow-up: `node --test tests/ifp-ui.test.mjs`.
- Headless Chrome verified widths 320, 390, 600, 768, 1024, 1242, 1366, 1518, 1708, 1821, 2039, 2102 and 2732 CSS pixels. Desktop widths cover the requested 50%–110% zoom equivalents; this is viewport emulation, not physical-device or cross-browser certification.
- Checked overflow, visible images, headings and controls; reviewed desktop, tablet and mobile screenshots. Brand/size filtering, empty/reset states, native model expansion and FAQ toggles passed. All 23 distinct page-internal site links returned HTTP 200, with no runtime or hydration errors during the audit.
- Production build/export was intentionally not run, per the user's instruction. A production build and deployment smoke test remain necessary before release.

## Image-fit and layout follow-up

- Removed thumbnail padding from product and OPS images. Product media uses the full available card width while containing the entire source; OPS frames match the original 8:5 artwork exactly. Badges are now in a separate metadata bar, outside the images.
- Added verified intrinsic dimensions for all 18 panel photos. Single-column mobile cards use each image's natural aspect ratio without letterboxing; desktop rows keep aligned image frames, headings and buttons.
- Refined product text sizing, tag/spec sizing, filter controls, hover/focus surfaces and readable stacked price rows on phones. Added a bottom collapse control with focus return for the expanded model list.
- Repeated the 13-width Chrome audit with all 21 product/OPS images loaded. Minimum rendered image-width occupancy exceeded 99%; card-button row drift was zero. No horizontal overflow, clipped headings/controls or browser exceptions were found. Filter/reset, expansion/collapse and FAQ interactions passed.
- Catalog data, source images, section order, hero, metadata, shared header/footer and other pages were not changed by this follow-up. No production build was run.

## Hero asset

- Mode: built-in image generation.
- Asset: `public/assets/control-systems/interactive-flat-panel/landing/ifp-collaboration-hero.webp`, 1672 × 941, optimized WebP (89 KB).
- Purpose: illustrative room concept only; not a real installation or a representation of a particular catalog model.
- All catalog and OPS photos are the existing assets, unchanged.

## Generation prompt

Use case: ads-marketing / photorealistic product environment. Create a wide 16:9 landscape website hero background for an Interactive Flat Panel supplier serving classrooms and meeting rooms. Photorealistic architectural/product visualization, not a website mockup. A premium contemporary learning and collaboration room, with one large unbranded black-framed interactive flat panel fully visible on the right half of the composition. On the panel show a crisp attractive blue and cyan digital whiteboard with simple geometric learning diagrams and small colored sticky-note shapes, no readable text. A minimal oak meeting table and a few navy upholstered chairs low in the right foreground, subtle warm wood wall slats on the far right, refined realistic daylight. Left 45 percent deliberately quiet pale cool white wall with very subtle light-blue gradient, empty negative space reserved for HTML headline and buttons. Front three-quarter perspective, straight architecture, full panel visible with comfortable margins. Palette: clean white, light icy blue, navy, natural oak; premium clear contrast and detailed materials. No people, no logos, no watermarks, no typography, no text, no website elements. This is an illustrative room concept, not a client installation.

## Content approach

Consolidated repeated buying advice into distinct model, sizing, budget, workflow and installation sections. Existing catalog links and price labels retained; budget ranges explicitly indicative, with no invented offers or ratings. Semantic headings and descriptive image alternatives follow [Google’s helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [image guidance](https://developers.google.com/search/docs/appearance/google-images).
