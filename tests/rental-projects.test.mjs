import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const route = "modules/routes/catalog/rental/";

test("rental project showcase is inserted once between trust and process", () => {
  const page = read(`${route}page.tsx`);
  assert.equal(page.match(/<RentalProjectsSection \/>/g)?.length, 1);
  assert.match(page, /<RentalWhyChoose \/>\s*<RentalProjectsSection \/>\s*<RentalProcessTimeline \/>/);
});

test("sample project cards are disclosed and do not link to fabricated case studies", () => {
  const section = read(`${route}RentalProjectsSection.tsx`);
  assert.match(section, /Sample setups only/);
  assert.match(section, /not completed client projects/);
  assert.match(section, /project\.isSample \? <span[^>]+>Sample setup/);
  assert.match(section, /!project\.isSample && project\.caseStudyHref \? project\.caseStudyHref : project\.enquiryHref/);
  assert.match(section, /Discuss Setup/);
  assert.match(section, /href="\/projects\/"/);
  assert.doesNotMatch(section, /application\/ld\+json/);
});

test("all preview image files exist and records stay outside the verified dataset", () => {
  const data = read(`${route}rentalProjects.ts`);
  const paths = [...data.matchAll(/image: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(paths.length, 3);
  assert.equal(new Set(paths).size, 3);
  for (const image of paths) {
    assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), image);
  }
  assert.doesNotMatch(read("app/projects/projectData.ts"), /sample-(corporate|concert|wedding)-led/);
  assert.doesNotMatch(data, /InterContinental|Army Stadium|The Westin/);
});
