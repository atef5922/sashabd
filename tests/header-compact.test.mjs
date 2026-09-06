import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const header = read("components/common/Header.tsx");
const css = read("app/globals.css");

test("Header height and component sizing stay compact across breakpoints", () => {
  assert.match(css, /--site-header-height: 60px/);
  assert.match(css, /--site-header-height: 64px/);
  assert.match(css, /--site-header-height: clamp\(64px, 4\.69vw, 80px\)/);
  assert.match(css, /width: clamp\(144px, 10\.54vw, 180px\)/);
  assert.match(css, /font-size: clamp\(14px, 1vw, 20px\)/);
  assert.match(css, /flex: 0 0 clamp\(180px, 12\.5vw, 240px\)/);
  assert.match(css, /justify-content: space-between/);
  assert.match(header, /h-\[var\(--site-header-height\)\]/);
});

test("Header overlays share the header height and tablet navigation stays collapsible", () => {
  assert.match(header, /top-\[var\(--site-header-height\)\]/);
  assert.match(header, /max-h-\[calc\(100svh-var\(--site-header-height\)\)\]/);
  assert.match(header, /id="mobile-site-navigation" className="border-t bg-white min-\[1200px\]:hidden"/);
  assert.match(header, /site-header-nav[^"\n]+min-\[1200px\]:flex/);
  assert.match(read("components/common/HeaderSearch.tsx"), /top-\[calc\(var\(--site-header-height,60px\)\+8px\)\]/);
});
