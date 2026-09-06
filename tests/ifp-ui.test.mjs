import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const route = path.join(root, "modules/routes/catalog/control-systems/interactive-flat-panel");
const read = file => readFileSync(path.join(route, file), "utf8");
const source = read("page.tsx");
const explorer = read("IfpProductExplorer.tsx");
const css = read("ifp.module.css");
const homeCard = read("IfpHomeProductCard.tsx");
const homeCardCss = read("home-product-card.module.css");
async function loadData(file) {
  const compiled = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
}
const catalog = await loadData("catalog.ts");
const content = await loadData("content.ts");
const { panelImageDimensions } = await loadData("imageDimensions.ts");

test("IFP intrinsic image dimensions match every catalog asset", async () => {
  for (const panel of catalog.interactiveFlatPanelCatalog) {
    const file = panel.image.split("/").pop();
    const dimensions = panelImageDimensions[file];
    assert.ok(dimensions, "Dimensions exist for " + file);
    const actual = await sharp(path.join(root, "public", decodeURIComponent(panel.image))).metadata();
    assert.equal(dimensions.width, actual.width, file + " width");
    assert.equal(dimensions.height, actual.height, file + " height");
  }
});

test("IFP uses Home Browse Products cards while preserving the separate OPS layout", () => {
  const opsImage = css.match(/\.opsImage img \{([^}]+)\}/)?.[1];
  assert.ok(opsImage);
  assert.match(opsImage, /padding: 0;/);
  assert.match(opsImage, /object-fit: contain;/);
  assert.match(css, /\.opsImage \{[^}]*aspect-ratio: 8 \/ 5;/);
  assert.match(explorer, /<IfpHomeProductCard/);
  assert.match(homeCardCss, /height: 205px;/);
  assert.match(homeCardCss, /object-fit: cover; object-position: center;/);
  assert.match(homeCardCss, /border-radius: 12px;/);
  assert.match(homeCardCss, /padding: 12px 14px 14px;/);
  assert.match(homeCardCss, /color: #ef4a00;/);
  assert.match(homeCardCss, /background: #071936;/);
  assert.match(homeCard, /styles.categoryBadge/);
  assert.doesNotMatch(homeCard, /styles\.category\}/);
  assert.match(homeCard, /styles\.modelBadge/);
  assert.match(homeCard, /styles.modelBadge/);
  assert.match(homeCard, /getInteractiveFlatPanelBullets\(panel\).slice\(0, 3\)/);
  assert.match(homeCard, /View Details/);
  assert.match(homeCard, /Get a Quote/);
  assert.match(homeCard, /\{panel.priceLabel\}/);
  assert.match(homeCardCss, /@media \(max-width: 767px\)/);
  assert.match(explorer, /className=\{styles.collapseModels\}/);
  assert.match(explorer, /summary\?\.focus\(\{ preventScroll: true \}\)/);
});

test("IFP keeps all existing catalog models, brands, images and detail routes", () => {
  const panels = catalog.interactiveFlatPanelCatalog;
  assert.equal(panels.length, 18);
  assert.equal(new Set(panels.map(panel => panel.slug)).size, 18);
  assert.deepEqual([...new Set(panels.map(panel => panel.brand))], ["LG", "Samsung", "Newline", "iScreen", "iBoard"]);
  for (const panel of panels) {
    assert.ok(existsSync(path.join(root, "public", decodeURIComponent(panel.image))));
    assert.match(panel.priceLabel, /^On request/);
  }
  assert.match(explorer, /interactiveFlatPanelCatalog\.filter/);
  assert.match(explorer, /panels\.slice\(0, initialCount\)/);
  assert.match(explorer, /panels\.slice\(initialCount\)/);
  assert.match(explorer, /<details/);
  assert.match(explorer, /<summary/);
  assert.match(explorer, /<option value="">All brands/);
  assert.match(explorer, /<option value="">All sizes/);
  assert.match(explorer, /No matching panel/);
  assert.doesNotMatch(explorer, /ProductCarousel|md:hidden|hidden md:/);
});

test("IFP semantic structure, canonical, linked size anchor and FAQ use one source", () => {
  assert.equal((source.match(/<h1\b/g) ?? []).length, 1);
  assert.match(source, /canonical: "\/interactive-flat-panel\/"/);
  assert.match(source, /id="size-selection"/);
  assert.match(source, /id="ifp-products"/);
  assert.match(source, /faqs\.map\(\(item\) => \(\{ "@type": "Question"/);
  assert.match(source, /faqs\.map\(\(item, index\) => <details/);
  assert.equal(content.faqs.length, 6);
  assert.ok(content.faqs.every(item => item.q.trim() && item.a.trim()));
  assert.ok(source.indexOf('id="ifp-faq"') < source.indexOf('className={styles.finalCta}'));
  assert.doesNotMatch(source, /AggregateRating|fake|500\+|100%/);
});

test("IFP retains indicative price guidance without creating live offers", () => {
  assert.deepEqual(content.priceRows.map(row => row.size), ['65"', '75"', '86"', '98"', '110"']);
  assert.equal(content.priceRows[0].price, "৳ 2,30,000 - ৳ 2,80,000");
  assert.equal(content.priceRows[4].price, "৳ 8,50,000 - ৳ 9,50,000");
  assert.match(source, /Budget ranges are indicative, not live offers/);
  assert.match(source, /VAT\/tax/);
  assert.doesNotMatch(source, /"@type": "Offer"/);
  assert.equal(content.opsCards.length, 3);
  for (const item of content.opsCards) assert.ok(existsSync(path.join(root, "public", decodeURIComponent(item.image))));
});

test("IFP sections stay scoped and responsive independently of the Home-style cards", () => {
  assert.match(css, /--ifp-width: clamp\(80rem, 90vw, 108rem\)/);
  assert.match(css, /--ifp-unit: calc\(var\(--ifp-width\) \/ 1280\)/);
  assert.match(css, /--ifp-width: min\(90vw, 128rem\)/);
  assert.match(css, /\.productImage img \{ object-fit: contain;/);
  assert.match(css, /\.opsImage img \{ object-fit: contain;/);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /scroll-margin-top/);
  for (const file of ["page.tsx", "IfpProductExplorer.tsx"]) {
    const used = [...read(file).matchAll(/styles\.([a-zA-Z0-9_]+)/g)].map(match => match[1]);
    for (const name of used) assert.ok(css.includes("." + name), "Style exists: " + name);
  }
});

test("IFP size guide groups distance, screen size and room guidance without changing recommendations", () => {
  assert.deepEqual(content.viewingDistanceRows.map(row => row.size), ['65"', '65" - 75"', '75" - 86"', '86" - 98"', '98" - 110"']);
  assert.match(source, /Viewing distance<\/p>/);
  assert.match(source, /Suggested screen size<\/p>/);
  assert.match(source, /className=\{styles.sizeRoom\}/);
  assert.match(source, /Indicative planning guide, not a fixed viewing-distance rule/);
  assert.match(css, /\.sizeRoom \{[^}]*min-height: 3\.2em/);
  assert.doesNotMatch(source, /styles\.sizeVisual|styles\.sizeDisplay/);
  assert.match(css, /\.sizeCard:nth-last-child\(-n\+2\)/);
});

test("IFP generated hero is separate from catalog images and disclosed as a concept", () => {
  assert.ok(existsSync(path.join(root, "public/images/interactive-flat-panel/ifp-collaboration-hero.webp")));
  assert.match(source, /Illustrative room concept/);
  assert.match(source, /fill priority sizes=/);
  assert.match(source, /target="_blank" rel="noopener noreferrer"/);
});
