import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");

const coreVariants = [
  "led-display.webp",
  "conference-system.webp",
  "pa-system.webp",
  "turnstile-access-control.webp",
  "interactive-flat-panel.webp",
  "digital-podium.webp",
];

test("Core Solutions uses compact 640x480 WebP card variants", async () => {
  const source = read("components/home/CoreSolutionsSection.tsx");
  for (const file of coreVariants) {
    const relative = `public/assets/home/core-solutions/${file}`;
    const absolute = path.join(root, relative);
    const metadata = await sharp(absolute).metadata();
    assert.equal(metadata.width, 640, file);
    assert.equal(metadata.height, 480, file);
    assert.ok(statSync(absolute).size < 70 * 1024, `${file} should stay below 70 KB`);
    assert.ok(source.includes(`/assets/home/core-solutions/${file}`), file);
  }
});

test("Header and footer use compact logo variants", async () => {
  const header = read("components/common/Header.tsx");
  const footer = read("components/common/Footer.tsx");
  for (const file of ["sasha-corporation-header.webp", "sasha-corporation-header-scrolled.webp"]) {
    const absolute = path.join(root, "public/assets/brand/sasha", file);
    const metadata = await sharp(absolute).metadata();
    assert.equal(metadata.width, 360, file);
    assert.ok(statSync(absolute).size < 30 * 1024, `${file} should stay below 30 KB`);
    assert.ok(header.includes(file), file);
  }
  assert.ok(footer.includes("sasha-corporation-header-scrolled.webp"));
});

test("Below-fold images stay lazy without restricting the mobile catalog", () => {
  const featured = read("components/home/HomeFeaturedProductsSection.tsx");
  const products = read("components/home/HomeAllProductsGrid.tsx");
  assert.ok(featured.includes('loading="lazy"'));
  assert.ok(!featured.includes('loading="eager"'));
  assert.ok(!products.includes("MOBILE_SECTION_PREVIEW_SIZE"));
  assert.ok(products.includes("products: filteredProducts"));
});
