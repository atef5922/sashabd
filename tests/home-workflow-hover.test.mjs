import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/home/ProjectWorkflowSection.tsx", import.meta.url), "utf8");

test("How We Work steps provide hover feedback with filled icon circles", () => {
  assert.match(source, /\.home-process-step:hover \.home-process-icon\s*\{/);
  assert.match(source, /background: linear-gradient\(135deg, #0b56d9 0%, #2563eb 100%\) !important;/);
  assert.match(source, /color: #ffffff !important;/);
  assert.match(source, /\.home-process-step:hover \.home-process-step-title\s*\{/);
  assert.match(source, /\.home-process-step:hover \.home-process-connector\s*\{/);
});

test("How We Work hover motion respects reduced-motion preferences", () => {
  assert.match(source, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(source, /\.home-process-step:hover \{ transform: none; \}/);
  assert.match(source, /\.home-process-step:hover \.home-process-icon \{ transform: translateX\(-50%\); \}/);
});
