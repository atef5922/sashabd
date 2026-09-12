import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

const root = process.cwd();
const page = readFileSync(path.join(root, "app/led-display/page.tsx"), "utf8");
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
