import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const directory = "modules/routes/catalog/control-systems/pa-system";
const read = file => readFileSync(path.join(root, file), "utf8");
const page = read(`${directory}/page.tsx`);
const products = read(`${directory}/PaSystemProducts.tsx`);
const content = read(`${directory}/landing-data.ts`);
const css = read(`${directory}/pa-landing.module.css`);
const header = read("components/common/Header.tsx");

const catalogSource = read(`${directory}/catalog.ts`);
const compiledCatalog = ts.transpileModule(catalogSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const catalog = await import("data:text/javascript;base64," + Buffer.from(compiledCatalog).toString("base64"));

test("PA landing preserves the existing catalog and all linked image assets", async () => {
  assert.equal(catalog.paSystemCatalog.length, 30);
  assert.equal(new Set(catalog.paSystemCatalog.map(item => item.slug)).size, 30);
  for (const item of catalog.paSystemCatalog) {
    const image = path.join(root, "public", decodeURIComponent(item.image));
    assert.ok(existsSync(image), item.image);
    const metadata = await sharp(image).metadata();
    assert.ok(metadata.width > 0 && metadata.height > 0, item.image);
  }
  assert.match(content, /paSystemCatalog\.filter\(item => item\.slug !==/);
  assert.match(page, /paPageItems\.map\(\(item, index\)/);
  assert.match(products, /const visible = filtered\.slice\(start, start \+ pageSize\)/);
});

test("PA landing has complete SEO structure without fabricated live offers", async () => {
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
  assert.match(page, /canonical: "\/pa-system\/"/);
  assert.match(page, /"@type": "CollectionPage"/);
  assert.match(page, /"@type": "ItemList"/);
  assert.match(page, /numberOfItems: paPageItems\.length/);
  assert.doesNotMatch(page, /"@type": "(?:Offer|Product|FAQPage)"|AggregateRating/);
  assert.doesNotMatch(page, /Prices are indicative catalog figures, not live offers/);
  assert.match(page, /<Breadcrumbs/);
  const hero = await sharp(path.join(root, "public/images/home_hero/pa-system-home-hero.webp")).metadata();
  assert.deepEqual([hero.width, hero.height], [2290, 687]);
});

test("PA product explorer keeps images, titles, features and actions aligned", () => {
  assert.match(css, /\.productImage img \{ object-fit: cover;/);
  assert.match(products, /column_speaker.*styles\.containImage/);
  assert.match(css, /\.productImage img\.containImage \{ object-fit: contain;/);
  assert.match(css, /aspect-ratio: 8 \/ 5/);
  assert.match(css, /@supports \(grid-template-rows: subgrid\)/);
  assert.match(css, /\.productCard \{ display: grid; grid-template-rows: subgrid; grid-row: span 9/);
  assert.match(css, /\.productBody h3 a \{[^}]*-webkit-line-clamp: 2;[^}]*overflow: hidden/);
  assert.match(css, /\.productFeatures span \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis/);
  assert.match(products, /title=\{item\.title\}>\{item\.title\}/);
  assert.match(products, /title=\{feature\}>\{feature\}/);
  assert.match(products, /View Details/);
  assert.match(products, /Get a Quote/);
});

test("PA filters and section navigation have contained responsive scrolling", () => {
  assert.match(css, /@media \(min-width: 1200px\) \{\s*\.filters \{ position: sticky;/);
  assert.match(css, /max-height: calc\(100svh - var\(--site-header-height, 64px\) - 32px\)/);
  assert.match(css, /overscroll-behavior: contain/);
  assert.match(css, /scrollbar-gutter: stable/);
  assert.match(css, /\.sectionNav > div \{ flex-wrap: nowrap;[^}]*overflow-x: auto/);
  assert.match(css, /scroll-margin-top: calc\(var\(--site-header-height, 64px\) \+ 18px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("PA explorer restores Home-style brand, price and numbered pagination controls", () => {
  assert.match(products, /const PRICE_BANDS =/);
  for (const band of ["under-25k", "25k-50k", "50k-100k", "100k-200k", "over-200k"]) assert.ok(products.includes(band));
  assert.match(products, /<legend>Brand<\/legend>/);
  assert.match(products, /<legend>Price Range<\/legend>/);
  assert.match(products, /type="checkbox" checked=\{selectedBrands\.includes\(brand\)\}/);
  assert.match(products, /type="checkbox" checked=\{selectedPriceBands\.includes\(band\)\}/);
  assert.match(products, /paginationRange\(currentPage, totalPages\)/);
  assert.match(products, /aria-label="PA products pagination"/);
  assert.match(products, />Previous<\/button>/);
  assert.match(products, />Next<\/button>/);
  assert.match(products, /Page \{currentPage\} of \{totalPages\}/);
  assert.match(products, /scrollIntoView\(\{ behavior: "smooth", block: "start" \}\)/);
  assert.doesNotMatch(products, /Show more products|setLimit/);
  assert.doesNotMatch(css, /\.loadMore|\.page \.note/);
});

test("PA price guide keeps a semantic table with a responsive premium quotation panel", () => {
  assert.match(page, /className=\{styles\.priceTableIntro\}/);
  assert.match(page, /<table><caption className="sr-only">/);
  assert.match(page, /<small>\{paCategory\(item\)\}<\/small>/);
  assert.match(page, /className=\{styles\.priceValue\}/);
  assert.match(page, /className=\{styles\.quoteLabel\}/);
  assert.match(css, /\.priceTableIntro \{[^}]*linear-gradient/);
  assert.match(css, /\.priceValue \{[^}]*white-space: nowrap/);
  assert.match(css, /\.quotePanel \{ position: sticky;[^}]*linear-gradient/);
  assert.match(css, /\.quotePanel \{ position: relative; top: auto; \}/);
  assert.match(css, /\.tableWrap tr \{ display: grid; grid-template-columns: minmax\(0,1fr\) auto/);
});

test("PA full-page sections and interactive controls remain available at every breakpoint", () => {
  for (const id of ["pa-products", "pa-applications", "pa-system-guide", "pa-speakers", "pa-price-list", "pa-installation", "pa-faq"]) {
    assert.ok(page.includes(`id="${id}"`), id);
  }
  assert.match(products, /type="search"/);
  assert.match(products, /type="radio"/);
  assert.match(products, /<select value=\{sort\}/);
  assert.match(products, /No matching products/);
  assert.match(products, /Show all products/);
  assert.match(page, /<details key=\{item\.q\}>/);
  assert.match(header, /\|\| isPaSystemLanding/);
  for (const width of [359, 599, 699, 899, 1199, 1440, 2200]) assert.ok(css.includes(`${width}px`));
});
