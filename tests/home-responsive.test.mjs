import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const css = read("components/home/home-responsive.module.css");

test("Home-wide sizing only activates at wide desktop breakpoints", () => {
  assert.deepEqual([...css.matchAll(/@media \(min-width: (\d+)px\)/g)].map(m => Number(m[1])), [1440, 2200]);
  assert.match(css, /--home-width: clamp\(80rem, 90vw, 108rem\)/);
  assert.match(css, /--home-unit: calc\(var\(--home-width\) \/ 1280\)/);
  assert.match(css, /--home-width: min\(90vw, 128rem\)/);
  assert.doesNotMatch(css, /\bzoom\s*:|transform\s*:/);
});

test("Home opts in without changing shared routes or nesting a new layout wrapper", () => {
  const source = read("app/page.tsx");
  assert.equal((source.match(/homeResponsiveStyles\.page/g) ?? []).length, 1);
  assert.match(source, /className=\{`\$\{homeResponsiveStyles\.page\} home-page-stack space-y-4`\}/);
  assert.match(source, /productResponsiveStyles\.section/);
});

test("Bespoke Home layouts scale their graphics, gutters and type together", () => {
  for (const name of ["home-trust-service-card", "core-solutions", "home-promise-card-title", "home-featured-product-slide", "home-conference-visual", "home-project-card", "home-technology-partners", "home-process-connector", "home-project-proposal"]) assert.ok(css.includes(name), name);
  assert.match(css, /width: calc\(\(100% - 36 \* var\(--home-unit\)\) \/ 4\)/);
  assert.match(css, /width: calc\(\(100% - 32 \* var\(--home-unit\)\) \/ 3\)/);
  assert.match(css, /height: calc\(322 \* var\(--home-unit\)\)/);
  assert.match(css, /left: calc\(50% \+ 45 \* var\(--home-unit\)\)/);
});
