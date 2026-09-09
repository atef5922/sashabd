import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");
const section = read("components/home/HomeRecentProjectsSection.tsx");
const carousel = read("components/home/HomeRecentProjectsCarousel.tsx");

test("Home successful installations use the latest canonical verified case studies", () => {
  assert.match(section, /import \{ projectCaseStudies \} from "@\/app\/projects\/projectData"/);
  assert.match(section, /project\.category === "led-display"\)\.sort\(sortByCompletionDate\)\.slice\(0, 3\)/);
  assert.match(section, /project\.category === "conference-system"\)\.sort\(sortByCompletionDate\)\.slice\(0, 3\)/);
  assert.match(section, /href: `\/projects\/\$\{project\.slug\}\/`/);
  assert.match(section, /<HomeRecentProjectsCarousel projects=\{projects\} \/>/);

  for (const unverifiedCopy of [
    "Bangabandhu International Conference Center",
    "28ft x 12ft",
    "Corporate Office, Gulshan",
    "Factory and Industrial Facility",
  ]) {
    assert.doesNotMatch(section, new RegExp(unverifiedCopy));
  }
});

test("Home project links, images and carousel controls are accessible", () => {
  assert.match(carousel, /alt=\{project\.imageAlt\}/);
  assert.match(carousel, /aria-label=\{`View project: \$\{project\.title\}`\}/);
  assert.match(carousel, /const pageCount = Math\.max\(1, Math\.ceil\(projects\.length \/ cardsPerPage\)\)/);
  assert.match(carousel, /Array\.from\(\{ length: pageCount \}/);
  assert.match(carousel, /aria-controls=\{`home-project-\$\{firstProjectIndex \+ 1\}`\}/);
  assert.match(carousel, /Show project page \$\{pageIndex \+ 1\} of \$\{pageCount\}/);
  assert.match(carousel, /nextCardsPerPage = window\.matchMedia\("\(min-width: 768px\)"\)\.matches/);
  assert.match(carousel, /h-6 w-6/);
  assert.match(carousel, /prefers-reduced-motion: reduce/);
  assert.match(section, /<Link href="\/projects\/"[\s\S]*?View All Projects/);
});
