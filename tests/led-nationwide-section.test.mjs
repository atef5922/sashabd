import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");
const landing = read("modules/routes/catalog/products-page.tsx");
const section = read("components/led-display/LedNationwideCoverageSection.tsx");

test("LED Display renders one LED-specific nationwide section before its FAQ", () => {
  assert.equal((landing.match(/<LedNationwideCoverageSection \/>/g) ?? []).length, 1);
  assert.ok(
    landing.indexOf("<LedNationwideCoverageSection />") < landing.indexOf('<section id="led-faq"'),
  );
});

test("LED coverage copy is qualified and connects to canonical category routes", () => {
  assert.match(section, /Nationwide LED Display Support/);
  assert.match(section, /LED Display Coverage/);
  assert.match(section, /all 64 districts across the country&apos;s 8 divisions/);
  assert.match(section, /subject to site\s*requirements and the agreed project scope/);
  assert.doesNotMatch(section, /completed projects? in (?:all|every) (?:district|division)/i);

  for (const href of ["/led-display/indoor/", "/led-display/outdoor/", "/led-display/rental/"]) {
    assert.match(section, new RegExp('href="' + href.replaceAll("/", "\\/") + '"'));
  }
});

test("LED coverage claims are concentrated in the dedicated section", () => {
  assert.doesNotMatch(landing, /\["delivery", "64", "Districts Covered"\]/);
  assert.match(landing, /\["check", "1-Year", "LED Display Warranty"\]/);
  assert.doesNotMatch(landing, /\["maintenance", "After-Sales Support", "Nationwide assistance"\]/);
  assert.match(landing, /\["maintenance", "After-Sales Support", "Technical assistance"\]/);
});
test("LED coverage section uses the accessible local Bangladesh map", () => {
  const mapPath = "public/assets/home/nationwide/bangladesh-eight-divisions-map.svg";
  assert.ok(existsSync(path.join(root, mapPath)), mapPath + " must exist");
  assert.match(section, /alt="Bangladesh map showing all eight administrative divisions"/);

  for (const division of ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]) {
    assert.match(section, new RegExp(division), division + " must remain represented");
  }
});
