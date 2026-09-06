import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const route = path.join(root, "modules/routes/catalog/control-systems/digital-podium");
const read = file => readFileSync(path.join(route, file), "utf8");
const source = read("page.tsx");
const css = read("podium.module.css");
async function loadData(file) {
  const compiled = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
}
const { digitalPodiumCatalog: products } = await loadData("catalog.ts");
const content = await loadData("content.ts");

test("All six podium configurations retain their catalog data and detail links", () => {
  assert.equal(products.length, 6);
  assert.equal(new Set(products.map(p => p.slug)).size, 6);
  assert.equal(content.modelLabels.length, products.length);
  for (const product of products) {
    assert.ok(product.title && product.priceLabel && product.cardHighlights.length >= 3);
    assert.ok(existsSync(path.join(root, "public", product.image)));
  }
  assert.match(source, /digitalPodiumCatalog\.map/);
  assert.match(source, /href = `\/digital-podium\/\$\{product.slug\}\//);
  assert.match(source, /product\.priceLabel/);
  assert.match(source, /product\.cardHighlights\.slice\(0, 3\)/);
  assert.doesNotMatch(source, /ResponsiveProductCarousel|mobileProductRows|line-clamp/);
});

test("Podium hero and card images remain accessible and uncropped", async () => {
  for (const product of products) {
    const dimensions = await sharp(path.join(root, "public", product.image)).metadata();
    assert.ok(dimensions.width > 1000 && dimensions.height > 700);
  }
  const hero = await sharp(path.join(root, "public", content.heroImage)).metadata();
  assert.equal(hero.width, 1983);
  assert.equal(hero.height, 793);
  assert.match(css, /\.productImage img \{ object-fit: contain;/);
  assert.match(css, /\.heroVisual img \{ object-fit: contain;/);
  assert.match(css, /aspect-ratio: 3 \/ 2/);
  assert.match(source, /src=\{heroImage\}[^>]+priority/);
  assert.match(source, /src=\{product.image\} alt=\{product.title\}/);
  assert.match(source, /Images illustrate configuration styles/);
});

test("Podium SEO is canonical, catalog-driven and avoids invented offers or FAQ rich-result markup", () => {
  assert.equal((source.match(/<h1\b/g) ?? []).length, 1);
  assert.match(source, /canonical: "\/digital-podium\/"/);
  assert.match(source, /"@type": "CollectionPage"/);
  assert.match(source, /"@type": "ItemList"/);
  assert.match(source, /numberOfItems: digitalPodiumCatalog.length/);
  assert.match(source, /<Breadcrumbs/);
  assert.doesNotMatch(source, /"@type": "(?:Offer|Product|FAQPage)"|AggregateRating/);
  assert.match(source, /Indicative budgets are not live offers/);
  assert.match(source, /VAT\/tax/);
  assert.doesNotMatch(source, /href="\/contact\/\?/);
});

test("One accessible FAQ render and preserved guide anchors work without carousel JavaScript", () => {
  assert.equal(content.faqs.length, 8);
  assert.equal(new Set(content.faqs.map(f => f.q)).size, 8);
  assert.equal((source.match(/faqs\.map/g) ?? []).length, 1);
  assert.match(source, /<details[^>]+><summary>/);
  for (const id of ["podium-products", "podium-price-guide", "buying-guide", "specs-explained", "installation", "boq-tender", "podium-faq"]) {
    assert.ok(source.includes(`id="${id}"`), id);
  }
  assert.ok(source.indexOf('id="podium-faq"') < source.indexOf('className={styles.finalCta}'));
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /focus-visible/);
  assert.match(css, /--podium-unit: calc\(var\(--podium-width\) \/ 1280\)/);
  assert.match(css, /\.productFooter \{ margin-top: auto;/);
});
