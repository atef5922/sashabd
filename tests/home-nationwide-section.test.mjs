import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");
const page = read("app/page.tsx");
const section = read("components/home/HomeNationwideCoverageSection.tsx");
const styles = read("components/home/home-nationwide-coverage.module.css");

test("homepage places one nationwide section after project evidence", () => {
  assert.equal((page.match(/<HomeNationwideCoverageSection \/>/g) ?? []).length, 1);
  assert.ok(page.indexOf("<HomeRecentProjectsSection />") < page.indexOf("<HomeNationwideCoverageSection />"));
  assert.ok(page.indexOf("<HomeNationwideCoverageSection />") < page.indexOf("<TrustedTechnologyPartnersSection />"));
  assert.doesNotMatch(page, /\{false && \(/);
});

test("nationwide coverage copy is factual, semantic and connected to solution routes", () => {
  assert.match(section, /<section[\s\S]*?aria-labelledby="nationwide-coverage-title"/);
  assert.match(section, /<h2 id="nationwide-coverage-title"/);
  assert.match(section, /supplies, installs and supports\s*<strong>LED displays<\/strong>/);
  assert.doesNotMatch(section, /all 64 districts/i);

  for (const division of ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]) {
    assert.match(section, new RegExp(division), `${division} must remain represented`);
  }
  assert.doesNotMatch(section, /divisionMarkers/);
});

test("nationwide map is local, accessible and documented as public domain", () => {
  const mapPath = "public/assets/home/nationwide/bangladesh-eight-divisions-map.svg";
  assert.ok(existsSync(path.join(root, mapPath)), `${mapPath} must exist`);
  assert.match(section, /alt="Bangladesh map showing all eight administrative divisions"/);
  assert.match(read("docs/assets.md"), /Nafsadh and released under CC0\/public domain/);
});

test("nationwide section is responsive and Organization schema declares Bangladesh", () => {
  assert.match(styles, /@media \(max-width: 1049px\)/);
  assert.match(styles, /@media \(max-width: 559px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(page, /areaServed:\s*\{\s*"@type": "Country",\s*name: "Bangladesh"/);
});
