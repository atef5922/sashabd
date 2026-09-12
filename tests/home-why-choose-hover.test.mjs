import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/home/HomeWhyChoosePromiseSection.tsx", import.meta.url), "utf8");

test("Why Choose service cards and company stats expose restrained hover feedback", () => {
  assert.match(source, /\.home-promise-card:hover\s*\{/);
  assert.match(source, /\.home-promise-card:hover \.home-promise-icon\s*\{/);
  assert.match(source, /\.home-promise-stat:hover\s*\{/);
  assert.match(source, /\.home-promise-stat:hover \.home-stat-icon\s*\{/);
});

test("Why Choose hover motion respects reduced-motion preferences", () => {
  assert.match(source, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(source, /\.home-promise-card:hover[\s\S]*?transform: none;/);
  assert.match(source, /\.home-promise-stat:hover[\s\S]*?transform: none;/);
});
