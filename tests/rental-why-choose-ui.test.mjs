import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
const page = readFileSync(new URL("../modules/routes/catalog/rental/page.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../modules/routes/catalog/rental/rental-responsive.module.css", import.meta.url), "utf8");
const data = page.slice(page.indexOf("const whyChooseRental"), page.indexOf("function RentalWhyChoose"));
const section = page.slice(page.indexOf("function RentalWhyChoose"), page.indexOf("const rentalProcessSteps"));

test("All six rental benefits retain their copy without individually colored icons", () => {
  assert.equal((data.match(/title:/g) ?? []).length, 6);
  assert.equal((data.match(/description:/g) ?? []).length, 6);
  assert.doesNotMatch(data, /color:|linear-gradient/);
  assert.match(section, /className=\{styles.whyChooseIcon\} aria-hidden="true"/);
  assert.match(section, /\{item.title\}/);
  assert.match(section, /\{item.description\}/);
  assert.match(section, /service=event-consultation/);
  assert.match(section, /className="rental-trust-strip"/);
});

test("Feature typography is scoped, readable and no longer squeezed beside desktop icons", () => {
  assert.match(css, /\.whyChooseCardTop \{ display: flex; flex-direction: column/);
  assert.match(css, /\.page \.whyChooseTitle \{[^}]*font-size: calc\(14 \* var\(--rental-unit\)\) !important;[^}]*line-height: 1.45/);
  assert.match(css, /\.page \.whyChooseDescription \{[^}]*text-align: left;/);
  assert.match(css, /\.whyChooseCard \{ display: grid; grid-template-columns: calc\(32 \* var\(--rental-unit\)\) minmax\(0,1fr\)/);
  assert.doesNotMatch(section, /<h2[^>]*uppercase|hover:-translate/);
});

test("The rental event backdrop is limited to the benefits panel and sits behind its content", () => {
  assert.match(section, /styles.whyChoosePanel/);
  assert.match(css, /\.whyChoosePanel \{ position: relative; isolation: isolate; \}/);
  assert.match(css, /\.whyChoosePanel::before \{[^}]*z-index: -1; pointer-events: none; background: linear-gradient/);
  assert.match(css, /url\("\/assets\/led-display\/rental\/hero\/rental-led-hero-banner.webp"\)/);
  assert.ok(existsSync(new URL("../public/assets/led-display/rental/hero/rental-led-hero-banner.webp", import.meta.url)));
});
