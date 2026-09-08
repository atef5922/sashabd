import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";

const source = readFileSync(
  path.join(process.cwd(), "components/home/TrustedTechnologyPartnersSection.tsx"),
  "utf8",
);

test("Technology Partners keeps the requested semantic SEO hierarchy", () => {
  assert.match(source, /aria-labelledby="home-technology-partners-title"/);
  assert.match(source, /<h2 id="home-technology-partners-title"/);
  assert.match(source, /Authorized Distributor &amp;/);
  assert.match(source, /Technology Partner in Bangladesh/);
  assert.match(source, /<strong[^>]*>LED Display<\/strong>[\s\S]*<strong[^>]*>Conference System<\/strong>/);
  assert.match(source, /<strong[^>]*>Leyard<\/strong>[\s\S]*<strong[^>]*>NovaStar<\/strong>/);
  assert.match(source, /<strong[^>]*>conference<\/strong>[\s\S]*<strong[^>]*>PA system<\/strong>/);
  assert.match(source, /<strong[^>]*>Bosch<\/strong>[\s\S]*<strong[^>]*>TOA<\/strong>[\s\S]*<strong[^>]*>SPON<\/strong>/);
  assert.match(source, /technical support across Bangladesh/);
});

test("Technology Partners preserves one carousel with contextual canonical alt text", () => {
  assert.match(source, /homeBrandLogos\.map/);
  assert.match(source, /\[0, 1\]\.map/);
  assert.match(source, /home-brand-marquee-track/);
  assert.match(source, /groupIndex === 0 \? brandAltText\[brand\.name\] : ""/);
  assert.match(source, /NovaStar LED display control system/);
  assert.match(source, /Colorlight LED display controller/);
  assert.match(source, /Mean Well display power supply/);
  assert.doesNotMatch(source, /`\$\{brand\.name\} logo`/);
});

test("Technology Partners exposes the four requested service pills", () => {
  for (const label of [
    "LED Display Solutions",
    "Conference System Solutions",
    "PA System Integration",
    "Turnstile & Access Solutions",
  ]) {
    assert.match(source, new RegExp(label.replace(/[&]/g, "\\&")));
  }

  assert.match(source, /className="flex flex-wrap items-center justify-center/);
  assert.doesNotMatch(source, /mt-3 overflow-x-auto/);
});
