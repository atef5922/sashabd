import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";

const source = readFileSync(
  path.join(process.cwd(), "modules/routes/catalog/products-page.tsx"),
  "utf8",
);
const start = source.indexOf("Featured LED Display Products");
const end = source.indexOf("Planning an LED Display Project?");
const ledMainSections = source.slice(start, end);

test("LED Display section titles use one responsive size standard", () => {
  assert.match(
    source,
    /const ledSectionTitleClass\s*=\s*\n?\s*"!text-xl font-extrabold leading-7 tracking-tight text-\[#071936\] lg:!text-\[26px\]"/,
  );
  assert.doesNotMatch(
    ledMainSections,
    /lg:!text-\[22px\]|!text-\[27px\]|md:!text-\[36px\]|md:!text-\[34px\]|sm:!text-\[24px\]/,
  );

  for (const headingId of [
    "led-price-list-heading",
    "led-display-buying-guide-heading",
    "indoor-outdoor-led-comparison-heading",
    "recent-led-projects-heading",
    "led-how-we-work-heading",
    "led-display-technology-types-heading",
  ]) {
    assert.match(ledMainSections, new RegExp(`id="${headingId}"[^>]*ledSectionTitleClass`));
  }
});

test("LED Display section badges and subtitles use the shared responsive tokens", () => {
  assert.equal((ledMainSections.match(/home-section-badge/g) ?? []).length, 4);
  assert.ok((ledMainSections.match(/home-section-subtitle/g) ?? []).length >= 30);
  assert.match(ledMainSections, /home-section-badge[^>]*>[\s\S]*?Pricing Guide/);
  assert.match(ledMainSections, /home-section-badge[^>]*>[\s\S]*?LED Buying Guide/);
  assert.match(ledMainSections, /className="home-section-badge">Our Process/);
  assert.match(ledMainSections, /className="home-section-badge">[\s\S]*?LED Display Clients &amp; Projects/);
});
