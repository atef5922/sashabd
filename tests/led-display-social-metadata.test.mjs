import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

const root = process.cwd();
const page = readFileSync(path.join(root, "app/led-display/page.tsx"), "utf8");
const landing = readFileSync(path.join(root, "modules/routes/catalog/products-page.tsx"), "utf8");
const hero = readFileSync(path.join(root, "components/led-display/LedDisplayHero.tsx"), "utf8");
const header = readFileSync(path.join(root, "components/common/Header.tsx"), "utf8");
const htaccess = readFileSync(path.join(root, "public/.htaccess"), "utf8");
const socialImagePath = path.join(root, "public/assets/led-display/led-display-social-preview.webp");

test("LED Display metadata uses its dedicated social image and site name", () => {
  assert.match(page, /const SOCIAL_IMAGE = "\/assets\/led-display\/led-display-social-preview\.webp";/);
  assert.match(page, /siteName: BRAND_NAME/);
  assert.equal((page.match(/socialImageUrl\(SOCIAL_IMAGE\)/g) ?? []).length, 2);
  assert.match(page, /width: 1200/);
  assert.match(page, /height: 630/);
});

test("LED Display social image has the declared dimensions", async () => {
  const metadata = await sharp(socialImagePath).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
});

test("LED Display content images have useful non-empty alternative text", () => {
  assert.match(hero, /alt=\{slide\.alt\}/);
  assert.doesNotMatch(hero, /alt=\{index === activeIndex \? slide\.alt : ""\}/);
  assert.equal((landing.match(/alt=\{`\$\{label\} in an LED display system`\}/g) ?? []).length, 2);
  assert.match(landing, /alt="LED display power supply \(SMPS\)"/);
  assert.match(landing, /alt="Indoor LED display installation"/);
  assert.match(header, /alt="Complete conference system package"/);
  assert.doesNotMatch(landing, /<Image\b[^>]*alt=""/s);
});

test("LED Display provides compact social sharing options", () => {
  assert.match(landing, /const LED_PAGE_URL = "https:\/\/sashabd\.com\/led-display\/";/);
  assert.equal((landing.match(/data-led-social-share=/g) ?? []).length, 1);
  for (const network of ["facebook.com/sharer", "linkedin.com/sharing", "api.whatsapp.com/send/"]) {
    assert.match(landing, new RegExp(network.replaceAll(".", "\\.")));
  }
  assert.match(landing, /rel="noopener noreferrer nofollow"/);
});

test("static HTML responses declare UTF-8 at the server layer", () => {
  assert.match(htaccess, /^AddDefaultCharset UTF-8$/m);
  assert.match(htaccess, /AddCharset UTF-8 \.html \.htm/);
  assert.match(htaccess, /Header always set Content-Type "text\/html; charset=UTF-8"/);
});
