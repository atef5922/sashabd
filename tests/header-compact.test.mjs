import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const header = read("components/common/Header.tsx");
const css = read("app/globals.css");

test("Header height and component sizing stay compact across breakpoints", () => {
  assert.match(css, /--site-header-height: 60px/);
  assert.match(css, /--site-header-height: 64px/);
  assert.match(css, /@media \(min-width: 1200px\)/);
  assert.match(css, /--site-header-height: clamp\(58px, 3\.8vw, 64px\)/);
  assert.match(css, /width: clamp\(120px, 8\.25vw, 140px\)/);
  assert.match(css, /height: clamp\(50px, 3\.5vw, 56px\)/);
  assert.match(css, /font-size: clamp\(14px, 1vw, 20px\)/);
  assert.match(css, /font-size: clamp\(13px, 0\.88vw, 15px\)/);
  assert.match(css, /line-height: 18px/);
  assert.match(css, /flex: 0 0 clamp\(230px, 17\.5vw, 290px\)/);
  assert.match(css, /min-height: 34px/);
  assert.match(css, /padding-top: 4px/);
  assert.match(css, /padding-left: clamp\(13px, 0\.9vw, 16px\)/);
  assert.match(css, /min-height: 30px/);
  assert.match(css, /justify-content: space-between/);
  assert.match(header, /h-\[var\(--site-header-height\)\]/);
  assert.match(header, /data-home-header="true"/);
  assert.doesNotMatch(header, /useHomeResponsiveHeader/);
  assert.doesNotMatch(header, /useConferenceTabletHeader/);
});

test("Every route uses the home header geometry and alignment", () => {
  assert.match(header, /"w-full max-w-\[clamp\(80rem,90vw,108rem\)\]"/);
  assert.match(header, /isScrolled \? "bg-\[#091931\] shadow-md" : "bg-white"/);
  assert.doesNotMatch(header, /hasFlushConferenceHero/);
});

test("Header overlays share the header height and tablet navigation stays collapsible", () => {
  assert.match(header, /top-\[var\(--site-header-height\)\]/);
  assert.match(header, /max-h-\[calc\(100svh-var\(--site-header-height\)\)\]/);
  assert.match(header, /id="mobile-site-navigation" className="border-t bg-white min-\[1200px\]:hidden"/);
  assert.match(header, /site-header-nav[^"\n]+min-\[1200px\]:flex/);
  assert.match(read("components/common/HeaderSearch.tsx"), /top-\[calc\(var\(--site-header-height,60px\)\+8px\)\]/);
});
