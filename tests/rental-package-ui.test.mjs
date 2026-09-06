import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = name => readFileSync(new URL(`../modules/routes/catalog/rental/${name}`, import.meta.url), "utf8");
const page = read("page.tsx");
const css = read("rental-responsive.module.css");

test("Package titles and feature rows stay single-line with full text available", () => {
  assert.match(css, /\.page \.packageTitle \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis/);
  assert.match(css, /\.packageDetail > span:last-child \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis/);
  assert.match(page, /title=\{rentalPackage.title\}/);
  assert.match(page, /title=\{`\$\{label\}: \$\{value\}`\}/);
  assert.equal((page.match(/<PackageDetail icon=/g) ?? []).length, 5);
});

test("Package images are taller and content tracks align without button overflow", () => {
  assert.match(css, /\.packageImage \{ height: calc\(156 \* var\(--rental-unit, 1px\)\)/);
  assert.match(css, /\.packageBody > \* \{ min-width: 0; max-width: 100%; \}/);
  assert.match(css, /\.packageCard \{ display: grid; grid-template-rows: subgrid; grid-row: span 5/);
  assert.match(css, /\.packageBody \{ display: grid; grid-template-rows: subgrid; grid-row: span 4/);
  assert.match(page, /snap-x snap-mandatory/);
  assert.match(page, /href=\{`\/contact\/\?project=rental-led-display&package=\$\{rentalPackage.query\}`\}/);
});

test("Descriptions use two lines without changing the underlying package copy", () => {
  assert.match(css, /\.packageDescription \{[^}]*-webkit-line-clamp: 2;[^}]*height: 2.9em;/);
  assert.match(page, /title=\{rentalPackage.description\}>\{rentalPackage.description\}/);
});

test("Only the featured package has a non-interactive border animation with reduced-motion fallback", () => {
  assert.match(page, /rentalPackage.featured \? `\$\{styles.featuredPackage\} border-/);
  assert.match(css, /@property --rental-featured-angle/);
  assert.match(css, /\.featuredPackage::after \{[^}]*pointer-events: none;[^}]*mask-composite: exclude;[^}]*animation: rentalBorderOrbit 6s linear infinite/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{\s*\.featuredPackage::after \{ animation: none; display: none;/);
});
