import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), "utf8");

test("homepage section heading overrides use the shared H2 size token", () => {
  const nationwide = read("components/home/home-nationwide-coverage.module.css");
  const conference = read("components/home/HomeConferenceSolutionSection.tsx");
  const projects = read("components/home/HomeRecentProjectsSection.tsx");
  const workflow = read("components/home/ProjectWorkflowSection.tsx");
  const responsive = read("components/home/home-responsive.module.css");

  assert.match(nationwide, /\.title\s*\{[\s\S]*?font-size:\s*var\(--site-h2-size\)\s*!important;/);
  assert.doesNotMatch(nationwide, /font-size:\s*clamp\(34px,\s*3\.2vw,\s*50px\)/);

  for (const [source, selector] of [
    [conference, "home-conference-title"],
    [projects, "home-projects-title"],
    [workflow, "home-process-title"],
  ]) {
    assert.match(
      source,
      new RegExp(`\\.${selector}\\s*\\{[\\s\\S]*?font-size:\\s*var\\(--site-h2-size\\)\\s*!important;`),
      `${selector} must use the shared H2 token`,
    );
  }

  for (const selector of ["home-conference-title", "home-projects-title", "home-process-title"]) {
    assert.match(
      responsive,
      new RegExp(`\\.${selector}\\)\\s*\\{[^}]*font-size:\\s*var\\(--site-h2-size\\)\\s*!important;`),
      `${selector} wide-screen scaling must preserve the shared H2 token`,
    );
  }
});
