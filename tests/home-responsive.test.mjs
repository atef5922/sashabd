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

test("Core Solutions card titles override the global H3 size and stay on one line", () => {
  const source = read("components/home/CoreSolutionsSection.tsx");
  assert.match(source, /className="core-solution-title/);
  assert.match(source, /\.core-solution-title \{[\s\S]*?white-space: nowrap;[\s\S]*?font-size: 9px !important;/);
  assert.match(source, /font-size: clamp\(10px, 0\.88vw, 12px\) !important;/);
  assert.match(source, /@media \(min-width: 1280px\)[\s\S]*?font-size: 13px !important;/);
  assert.match(source, /font-size: calc\(13 \* var\(--home-unit\)\) !important;/);
});

test("Core Solutions shortcut badges link to LED and conference-system categories", () => {
  const source = read("components/home/CoreSolutionsSection.tsx");
  const shortcuts = source.slice(source.indexOf("const additionalSolutionLinks"), source.indexOf("function ExploreArrow"));
  for (const slug of ["audio", "video", "wired", "wireless"]) {
    assert.ok(shortcuts.includes(`/conference-system/${slug}-conference-system/`), slug);
  }
  for (const removed of ["Receiving Card", "LED Controller", "PA System", "Turnstile Gate"]) {
    assert.ok(!shortcuts.includes(`label: "${removed}"`), removed);
  }
});
