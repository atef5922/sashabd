import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (file) => readFileSync(path.join(process.cwd(), file), "utf8");
const page = read("app/page.tsx");
const section = read("components/home/HomeClientsProjectsSection.tsx");

test("Home adds one Clients & Projects section after Technology Partners", () => {
  assert.equal((page.match(/<HomeClientsProjectsSection \/>/g) ?? []).length, 1);
  assert.ok(page.indexOf("<TrustedTechnologyPartnersSection />") < page.indexOf("<HomeClientsProjectsSection />"));
  assert.ok(page.indexOf("<HomeClientsProjectsSection />") < page.indexOf("<ProjectWorkflowSection />"));
});

test("Home Clients & Projects copy covers all four solution topics naturally", () => {
  assert.match(section, /aria-labelledby="home-clients-projects-title"/);
  assert.match(section, /<h2[\s\S]*?id="home-clients-projects-title"/);
  assert.match(section, /Government, Corporate &amp; Institutional Clients/);
  assert.match(section, /Across Bangladesh/);

  for (const topic of ["LED Display", "Conference System", "PA System", "Turnstile Gate"]) {
    assert.match(section, new RegExp(`<strong[^>]*>${topic}<\\/strong>`));
    assert.match(section, new RegExp(`${topic} Projects`));
  }
});

test("Home client carousel exposes one semantic logo set and one hidden clone", () => {
  assert.match(section, /clientOrganizations\.map/);
  assert.match(section, /\[false, true\]\.map\(\(isClone\)/);
  assert.match(section, /aria-hidden=\{isClone \? "true" : undefined\}/);
  assert.match(section, /inert=\{isClone \? true : undefined\}/);
  assert.match(section, /alt=\{isClone \? "" : `\$\{client\.name\} logo`\}/);
  assert.match(section, /motion-reduce:animate-none/);
});
