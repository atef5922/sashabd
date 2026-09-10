import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");
const layout = read("app/layout.tsx");
const homepage = read("app/page.tsx");
const site = read("lib/site.ts");
const homepageIdentityMarkup = layout + homepage;
const occurrences = (source, value) => source.split(value).length - 1;

test("homepage exposes one consistent WebSite and Organization identity", () => {
  assert.equal(occurrences(homepageIdentityMarkup, '"@type": "WebSite"'), 1);
  assert.equal(occurrences(homepageIdentityMarkup, '"@type": "Organization"'), 1);
  assert.equal(occurrences(homepage, 'alternateName: "Sasha"'), 2);
  assert.ok(homepage.includes('logo: absoluteUrl("/assets/brand/sasha/sasha-corporation-final-l.webp")'));
  assert.ok(homepage.includes('sameAs: ["https://www.facebook.com/profile.php?id=100068947942148"]'));
});

test("homepage metadata sends consistent site-name and canonical signals", () => {
  assert.ok(layout.includes("applicationName: BRAND_NAME"));
  assert.ok(layout.includes("siteName: BRAND_NAME"));
  assert.ok(homepage.includes("siteName: BRAND_NAME"));
  assert.ok(homepage.includes('alternates: { canonical: absoluteUrl("/") }'));
  assert.ok(site.includes('name: "Sasha Corporation"'));
  assert.ok(!homepageIdentityMarkup.includes('name: "Sashabd"'));
});

test("organization logo exists and the homepage title remains unchanged", () => {
  assert.ok(existsSync(path.join(root, "public/assets/brand/sasha/sasha-corporation-final-l.webp")));
  assert.ok(homepage.includes(`title: { absolute: \`LED Display & Conference Systems in Bangladesh | \${BRAND_NAME}\` }`));
});
