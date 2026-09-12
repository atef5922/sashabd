import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");
const page = read("app/conference-system/page.tsx");
const section = read("components/conference-system/ConferenceNationwideCoverageSection.tsx");

test("Conference page places one nationwide section between projects and engineering support", () => {
  assert.equal((page.match(/<ConferenceNationwideCoverageSection \/>/g) ?? []).length, 1);
  const projectsIndex = page.indexOf('aria-labelledby="recent-conference-system-projects"');
  const coverageIndex = page.indexOf("<ConferenceNationwideCoverageSection />");
  const engineeringIndex = page.indexOf('aria-labelledby="conference-system-engineering-support"');
  assert.ok(projectsIndex >= 0 && coverageIndex > projectsIndex && engineeringIndex > coverageIndex);
});

test("Conference coverage copy is qualified and links to canonical solution routes", () => {
  assert.match(section, /Nationwide Conference System Support/);
  assert.match(section, /Conference System Installation/);
  assert.match(section, /64 districts and 8 divisions/);
  assert.match(section, /subject to room\s*requirements, site access and the agreed project scope/);
  assert.doesNotMatch(section, /completed projects? in (?:all|every) (?:district|division)/i);

  for (const href of [
    "/conference-system/wired-conference-system/",
    "/conference-system/wireless-conference-system/",
    "/conference-system/video-conference-system/",
  ]) {
    assert.match(section, new RegExp('href="' + href.replaceAll("/", "\\/") + '"'));
  }
});

test("Conference coverage uses one accessible local map and represents every division", () => {
  const mapPath = "public/assets/home/nationwide/bangladesh-eight-divisions-map.svg";
  assert.ok(existsSync(path.join(root, mapPath)), mapPath + " must exist");
  assert.match(section, /alt="Bangladesh map showing all eight administrative divisions"/);

  for (const division of ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]) {
    assert.match(section, new RegExp(division), division + " must remain represented");
  }
});
