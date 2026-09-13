import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");
const site = read("lib/site.ts");
const customerFacingSources = [
  "components/common/Header.tsx",
  "components/common/Footer.tsx",
  "modules/routes/catalog/accessories/AccessoryLandingPage.tsx",
  "app/contact/page.tsx",
  "app/conference-system/page.tsx",
  "modules/routes/catalog/control-systems/interactive-flat-panel/page.tsx",
  "modules/routes/catalog/control-systems/digital-podium/page.tsx",
].map(read).join("\n");

test("site-wide phone and WhatsApp configuration uses the new number", () => {
  assert.match(site, /phone: "\+8801717443355"/);
  assert.match(site, /phoneDisplay: "01717443355"/);
  assert.match(site, /whatsapp: "\+8801717443355"/);
  assert.doesNotMatch(site, /079855|8801717079855/);
});

test("customer-facing number labels use the local display value", () => {
  assert.equal((customerFacingSources.match(/siteConfig\.phoneDisplay/g) ?? []).length, 9);
  assert.doesNotMatch(customerFacingSources, />\{siteConfig\.phone\}</);
});
