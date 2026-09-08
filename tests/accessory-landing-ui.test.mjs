import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const directory = "modules/routes/catalog/accessories";
const read = file => readFileSync(path.join(root, file), "utf8");
const source = read(`${directory}/AccessoryLandingPage.tsx`);
const css = read(`${directory}/accessory-landing.module.css`);
const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const url = source => "data:text/javascript;base64," + Buffer.from(compile(source)).toString("base64");
const priceUrl = url(read("lib/price.ts"));
const catalogUrl = url(read("lib/productsCatalog.ts").replace('"@/lib/price"', JSON.stringify(priceUrl)));
const catalog = await import(catalogUrl);
const content = await import(url(read(`${directory}/landing-content.ts`).replace('"@/lib/productsCatalog"', JSON.stringify(catalogUrl))));
const { accessoryCategories, accessoryPages, accessoryPath, representativeImageSlugs } = content;
const expected = {
  "receiving-card": [catalog.receivingCardCatalog, 6],
  controller: [catalog.controllerCatalog, 9],
  "power-supply": [catalog.powerSupplyCatalog, 3],
  "led-accessories": [catalog.ledAccessoriesCatalog, 9],
};

test("Four landing routes reuse all 27 catalog records without changing product data", () => {
  assert.deepEqual(accessoryCategories, Object.keys(expected));
  for (const category of accessoryCategories) {
    const page = accessoryPages[category];
    assert.equal(page.products, expected[category][0]);
    assert.equal(page.products.length, expected[category][1]);
    assert.equal(new Set(page.products.map(p => p.slug)).size, page.products.length);
    assert.equal(accessoryPath(category), `/led-display/accessories/${category}/`);
    assert.ok(read(`${directory}/${category}-page.tsx`).includes(`category="${category}"`));
    assert.ok(read(`${directory}/${category}-page.tsx`).includes(`accessoryMetadata("${category}")`));
    for (const product of page.products) {
      assert.ok(product.title && product.quickFeatures.length >= 3);
      assert.ok(product.cardPrice === undefined || typeof product.cardPrice === "string");
      assert.ok(existsSync(path.join(root, "public", product.image)), product.image);
    }
  }
  assert.match(source, /href = `\$\{accessoryPath\(category\)\}\$\{product.slug\}\//);
  assert.match(source, /product\.quickFeatures\.slice\(0, 3\)/);
  assert.match(source, /product.cardPrice \|\| "Price on request"/);
  assert.doesNotMatch(source, /ResponsiveProductCarousel|mobileProductRows|line-clamp/);
});

test("Catalog metadata images exist; card fit rules distinguish full-bleed scenes from product cutouts", async () => {
  for (const category of accessoryCategories) {
    const { image } = accessoryPages[category];
    const actual = await sharp(path.join(root, "public", image.src)).metadata();
    assert.equal(actual.width, image.width);
    assert.equal(actual.height, image.height);
    assert.ok(image.alt && image.caption);
  }
  assert.match(css, /\.productImage img \{ object-fit: contain;/);
  assert.match(css, /\.sceneImage img \{ object-fit: cover;/);
  assert.match(css, /\.cutoutImage img \{ padding:/);
  assert.match(css, /aspect-ratio: 8 \/ 5/);
  assert.equal((source.match(/className=\{styles.productBadge\}/g) ?? []).length, 1);
});

test("Four lightweight hero illustrations replace the boxed showcase without changing catalog photos", async () => {
  const { accessoryHeroArt } = await import(url(read(`${directory}/hero-art.ts`)));
  for (const category of accessoryCategories) {
    const art = accessoryHeroArt[category];
    const actual = await sharp(path.join(root, "public", art.src)).metadata();
    assert.ok(actual.width >= 1700 && actual.height >= 700);
    assert.ok(statSync(path.join(root, "public", art.src)).size < 200000);
    assert.match(art.alt, /Illustration/);
  }
  assert.match(source, /src=\{heroArt.src\}[^>]+priority/);
  assert.match(source, /Illustrative setup/);
  assert.doesNotMatch(source, /heroShowcase|showcaseHeading/);
  assert.match(css, /\.heroVisual img \{ object-fit: contain;/);
});

test("Every card shares title, individual feature, price and action tracks with its row", () => {
  assert.match(css, /@supports \(grid-template-rows: subgrid\)/);
  assert.match(css, /\.productCard \{ display: grid; grid-template-rows: subgrid; grid-row: span 8/);
  assert.match(css, /\.productBody \{ display: grid; grid-template-rows: subgrid; grid-row: span 7/);
  assert.match(css, /\.productBody \.checks \{ grid-template-rows: subgrid; grid-row: span 3/);
  assert.match(css, /\.productFooter \{ display: grid; grid-template-rows: subgrid; grid-row: span 3/);
  assert.doesNotMatch(css, /min-height: (?:2\.7|3)em/);
  assert.doesNotMatch(source, /ResizeObserver|useEffect|line-clamp/);
});

test("Card titles and features are one line, while full catalog wording remains available", () => {
  assert.match(css, /\.productBody h3 a \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis/);
  assert.match(css, /\.productBody \.checks span \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis/);
  assert.match(source, /title=\{product.title\}>\{product.title\}/);
  assert.match(source, /title=\{singleLine \? item : undefined\}/);
  assert.match(source, /items=\{product.quickFeatures.slice\(0, 3\)\} singleLine/);
});

test("Hero image stays inside its frame on desktop and mobile, without oversized or masked edges", () => {
  assert.match(css, /\.heroVisual img \{ object-fit: contain;[^}]*width: 100% !important; height: 100% !important; max-width: 100%; left: 0 !important/);
  assert.doesNotMatch(css, /mask-image|width: auto !important|left: -80%/);
  assert.match(css, /\.heroVisual \{ position: relative;[^}]*aspect-ratio: 2 \/ 1/);
});

test("LED Accessories banner blends against its actual artwork frame without an inset border", () => {
  const selector = '\\.page\\[data-accessory-landing="led-accessories"\\] \\.heroVisual';
  assert.match(css, new RegExp(`${selector} \\{[^}]*height: 100%;[^}]*max-height: 50vw;[^}]*aspect-ratio: 2 / 1`));
  assert.match(css, new RegExp(`${selector} img \\{ padding: 0; \\}`));
  assert.match(css, new RegExp(`${selector}::after \\{ background: linear-gradient\\(90deg,#f4f7fb 0%`));
});

test("Known reused model photos are disclosed rather than presented as exact product images", () => {
  assert.equal(representativeImageSlugs.size, 5);
  const slugs = accessoryCategories.flatMap(c => accessoryPages[c].products.map(p => p.slug));
  for (const slug of representativeImageSlugs) assert.ok(slugs.includes(slug));
  assert.match(source, /representativeImageSlugs.has\(product.slug\)/);
  assert.match(source, /Representative image/);
  assert.match(source, /exact \$\{product.title\} appearance to be confirmed/);
});

test("Support and final CTA use decorative backgrounds with scoped, responsive content panels", () => {
  assert.match(source, /id=\{`\$\{category\}-applications`\} tone="dark" backgroundSrc=\{heroArt.src\}/);
  assert.match(source, /className=\{styles.sectionBackdrop\} aria-hidden="true"><Image src=\{src\} alt="" fill/);
  assert.match(source, /SectionBackdrop src="\/assets\/projects\/Project-hero.webp"/);
  assert.ok(existsSync(path.join(root, "public/assets/projects/Project-hero.webp")));
  assert.match(source, /className=\{styles.ctaActionPanel\}/);
  assert.match(css, /\.imageSection \{[^}]*isolation: isolate/);
  assert.match(css, /\.contextGrid article \{[^}]*border: 1px solid[^}]*border-radius:/);
  assert.match(css, /\.ctaInner \.actions \{ display: grid; grid-template-columns: repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.ctaInner \.actions \{ grid-template-columns: 1fr; \}/);
});

test("Each category has distinct, useful selection content and six accessible FAQs", () => {
  assert.equal(new Set(accessoryCategories.map(c => accessoryPages[c].metaDescription)).size, 4);
  for (const category of accessoryCategories) {
    const page = accessoryPages[category];
    assert.equal(page.guides.length, 3);
    assert.equal(page.contexts.length, 3);
    assert.equal(page.checklist.length, 2);
    assert.equal(page.faqs.length, 6);
    assert.equal(new Set(page.faqs.map(f => f.q)).size, 6);
    assert.ok(page.faqs.every(f => f.q && f.a));
  }
  assert.match(accessoryPages["power-supply"].advice, /qualified technician/);
  assert.match(accessoryPages["power-supply"].advice, /Isolate power/);
  assert.equal((source.match(/page.faqs.map/g) ?? []).length, 1);
  assert.match(source, /<details[^>]+><summary>/);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});

test("SEO preserves canonical paths, uses a catalog ItemList and avoids fabricated offers", () => {
  assert.equal((source.match(/<h1\b/g) ?? []).length, 1);
  assert.match(source, /canonical: accessoryPath\(category\)/);
  assert.match(source, /"@type": "CollectionPage"/);
  assert.match(source, /"@type": "ItemList"/);
  assert.match(source, /numberOfItems: page.products.length/);
  assert.match(source, /<Breadcrumbs/);
  assert.doesNotMatch(source, /"@type": "(?:Offer|Product|FAQPage)"|AggregateRating/);
  assert.match(source, /Catalog prices are indicative, not live offers/);
  assert.doesNotMatch(source, /href="\/contact\/\?/);
  assert.match(source, /aria-current=\{key === category \? "page"/);
});

test("Responsive behavior is scoped to the landing pages and keeps card actions aligned", () => {
  const header = read("components/common/Header.tsx");
  assert.match(header, /normalizedPathname === `\/led-display\/accessories\/\$\{category\}`/);
  assert.match(header, /\|\| isLedAccessoryLanding/);
  assert.match(css, /--accessory-unit: calc\(var\(--accessory-width\) \/ 1280\)/);
  assert.match(css, /\.productFooter \{ margin-top: auto;/);
  for (const width of [599, 799, 999, 1199, 1440, 2200]) assert.ok(css.includes(`${width}px`));
  assert.match(css, /\.productGrid \{ grid-template-columns: repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.productGrid,.contextGrid \{ grid-template-columns: 1fr/);
});
