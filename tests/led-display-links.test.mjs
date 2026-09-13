import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const productsPage = readFileSync(path.join(root, "modules/routes/catalog/products-page.tsx"), "utf8");
const hero = readFileSync(path.join(root, "components/led-display/LedDisplayHero.tsx"), "utf8");
const productTools = readFileSync(path.join(root, "components/products/LedProductCardTools.tsx"), "utf8");
const contactPage = readFileSync(path.join(root, "app/contact/page.tsx"), "utf8");

test("LED Display links use the clean quotation destination", () => {
  assert.match(productsPage, /const LED_QUOTE_HREF = "\/contact\/#quotation";/);
  assert.doesNotMatch(productsPage, /\/contact\/\?project=led-display/);
  assert.doesNotMatch(hero, /\/contact\/\?project=led-display/);
  assert.match(hero, /href="\/contact\/#quotation"/);
  assert.match(contactPage, /id="quotation"/);
});

test("repeated LED product actions include destination-specific anchor context", () => {
  assert.match(productsPage, /View Details<span className="sr-only"> for \{product\.title\}<\/span>/);
  assert.match(productsPage, /Get Quote<span className="sr-only"> for \{row\.title\}<\/span>/);
  assert.match(productsPage, /View Case Study[\s\S]*?<span className="sr-only"> for \{project\.title\}<\/span>/);
  assert.match(productsPage, /Discuss \{technology\.title\}/);
  assert.equal((productsPage.match(/<span className="sr-only"> — \{row\.title\}<\/span>/g) ?? []).length, 4);
  assert.match(productTools, /View Full Details<span className="sr-only"> for \{product\.title\}<\/span>/);
  assert.match(productTools, /Get a Quote<span className="sr-only"> for \{product\.title\}<\/span>/);
});
