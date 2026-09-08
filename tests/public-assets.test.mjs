import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicRoot = path.join(root, "public");
const assetsRoot = path.join(publicRoot, "assets");

function filesWithin(directory, predicate = () => true) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    if (statSync(fullPath).isDirectory()) files.push(...filesWithin(fullPath, predicate));
    else if (predicate(fullPath)) files.push(fullPath);
  }
  return files;
}

const sourceFiles = ["app", "components", "lib", "modules"]
  .flatMap((directory) => filesWithin(path.join(root, directory), (file) => /\.(?:ts|tsx|js|jsx|css)$/.test(file)));
const source = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");

test("public assets use topic-based folders with no legacy images directory", () => {
  assert.equal(existsSync(path.join(publicRoot, "images")), false);
  for (const topic of [
    "about",
    "blog",
    "brand",
    "brands",
    "clients",
    "conference-system",
    "contact",
    "control-systems",
    "home",
    "led-display",
    "projects",
    "shared",
  ]) {
    assert.ok(statSync(path.join(assetsRoot, topic)).isDirectory(), `missing public/assets/${topic}`);
  }

  const directoryNames = filesWithin(assetsRoot).map((file) =>
    path.relative(assetsRoot, path.dirname(file)).split(path.sep),
  ).flat();
  assert.equal(directoryNames.some((name) => /[A-Z\s_]/.test(name)), false, "asset directory names must stay lowercase and kebab-case");
});

test("runtime source has no legacy image paths and every explicit asset path resolves", () => {
  assert.doesNotMatch(source, /(?:\/images\/|public\/images\/)/);

  const references = [...source.matchAll(/["'`](\/assets\/[^"'`?#]+\.(?:webp|png|jpe?g|svg|ico))(?:\?[^"'`]*)?["'`]/gi)]
    .map((match) => decodeURIComponent(match[1]));
  assert.ok(references.length > 100, "expected the production source to expose its static asset references");

  for (const reference of references) {
    assert.ok(
      existsSync(path.join(publicRoot, reference.slice(1))),
      `missing public asset for ${reference}`,
    );
  }
});

test("every deployed asset remains connected to source or a catalog test", () => {
  const searchableFiles = [
    ...sourceFiles,
    ...filesWithin(path.join(root, "tests"), (file) => file.endsWith(".mjs")),
  ];
  const searchableSource = searchableFiles.map((file) => readFileSync(file, "utf8")).join("\n");
  const orphaned = filesWithin(assetsRoot)
    .filter((file) => !searchableSource.includes(path.basename(file)))
    .map((file) => path.relative(publicRoot, file).replaceAll("\\", "/"));

  assert.deepEqual(orphaned, []);
});

test("legacy asset URLs redirect to the organized paths", () => {
  const redirects = readFileSync(path.join(publicRoot, "_redirects"), "utf8");
  const htaccess = readFileSync(path.join(publicRoot, ".htaccess"), "utf8");

  for (const marker of [
    "/images/about/*",
    "/images/conference_system_products/*",
    "/images/logo/novastar.webp",
    "/images/hero.webp",
    "/sasha-corporation-final-l.webp",
  ]) {
    assert.ok(redirects.includes(marker), `${marker} needs a static-host redirect`);
  }
  assert.match(htaccess, /# Legacy asset URLs/);
  assert.match(htaccess, /assets\/conference-system\/products\/brands/);
  assert.match(htaccess, /assets\/brand\/sasha\/sasha-corporation-final-l\.webp/);
});
