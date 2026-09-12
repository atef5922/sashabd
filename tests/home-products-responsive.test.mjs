import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const css = read("components/home/home-products-responsive.module.css");

test("Home product scaling matches Indoor and only starts at wide desktop widths", () => {
  assert.match(css, /@media \(min-width: 1440px\)/);
  assert.match(css, /--home-product-width: clamp\(80rem, 90vw, 108rem\)/);
  assert.match(css, /--home-product-unit: calc\(var\(--home-product-width\) \/ 1280\)/);
  assert.match(css, /@media \(min-width: 2200px\)/);
  assert.match(css, /--home-product-width: min\(90vw, 128rem\)/);
  assert.doesNotMatch(css, /\bzoom\s*:|transform\s*:/);
});

test("Home sizing includes card imagery, filters, spacing and arbitrary text sizes", () => {
  for (const token of ["--spacing", "--text-xs", "--text-sm", "--site-h3-size"]) assert.ok(css.includes(token));
  assert.match(css, /grid-template-columns: calc\(248 \* var\(--home-product-unit\)\)/);
  assert.match(css, /height: calc\(205 \* var\(--home-product-unit\)\)/);
  assert.ok(css.includes("font-size: calc(11.5 * var(--home-product-unit))"));
  assert.ok(css.includes(".sm\\:text-\\[13px\\]"));
});

test("Only Browse Products opts into the responsive module", () => {
  const page = read("app/page.tsx");
  const grid = read("components/home/HomeAllProductsGrid.tsx");
  assert.equal((page.match(/productResponsiveStyles\.section/g) ?? []).length, 1);
  assert.match(page, /id="browse-products" className=\{`\$\{productResponsiveStyles\.section\}/);
  assert.match(grid, /data-home-product-layout/);
  assert.match(grid, /data-home-product-card/);
});

test("Home product pagination exposes pointer cursors for clickable controls", () => {
  const grid = read("components/home/HomeAllProductsGrid.tsx");
  const pagination = grid.slice(
    grid.indexOf('aria-label="Products pagination"'),
    grid.indexOf("Page {currentPage} of {totalPages}"),
  );

  assert.ok(pagination.includes("cursor-pointer"));
  assert.ok(pagination.includes("disabled:cursor-not-allowed"));
  assert.ok(pagination.includes("cursor-default border-[#071936]"));
});
