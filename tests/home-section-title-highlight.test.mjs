import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");

test("homepage section titles highlight their key phrase without changing heading semantics", () => {
  const lightSectionSources = [
    read("app/page.tsx"),
    read("components/home/CoreSolutionsSection.tsx"),
    read("components/home/HomeWhyChoosePromiseSection.tsx"),
    read("components/home/HomeFeaturedProductsSection.tsx"),
    read("components/home/HomeConferenceSolutionSection.tsx"),
    read("components/home/HomeRecentProjectsSection.tsx"),
    read("components/home/TrustedTechnologyPartnersSection.tsx"),
    read("components/home/ProjectWorkflowSection.tsx"),
  ];

  for (const source of lightSectionSources) {
    assert.match(source, /<h2[\s\S]*?text-\[#1660e8\][\s\S]*?<\/h2>|title=\{<>[\s\S]*?text-\[#1660e8\]/);
  }

  const nationwide = read("components/home/home-nationwide-coverage.module.css");
  assert.match(nationwide, /\.title span\s*\{[\s\S]*?color:\s*#1660e8\s*!important;/);

  const proposal = read("components/home/ProjectProposalCtaSection.tsx");
  assert.match(proposal, /<h2[\s\S]*?text-\[#7dd3fc\][\s\S]*?<\/h2>/);
});

test("why-choose title stays on one row at desktop widths without forcing mobile overflow", () => {
  const source = read("components/home/HomeWhyChoosePromiseSection.tsx");
  const heading = source.match(/<h2 id="why-choose-sasha-heading"[\s\S]*?<\/h2>/)?.[0] ?? "";

  assert.match(heading, /max-w-none/);
  assert.match(heading, /lg:whitespace-nowrap/);
  assert.doesNotMatch(heading, /<br/);
  assert.doesNotMatch(heading, /(?:^|\s)whitespace-nowrap(?:\s|$)/);
});
