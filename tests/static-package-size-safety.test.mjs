import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("static builds clean only the generated export and keep public asset URLs stable", () => {
  const packageJson = JSON.parse(read("package.json"));
  const cleaner = read("scripts/clean-static-output.mjs");
  const generator = read("scripts/generate-image-variants.mjs");
  const responsiveImages = read("lib/responsive-image.ts");

  assert.equal(packageJson.scripts.prebuild, "node scripts/clean-static-output.mjs && node scripts/generate-image-variants.mjs");
  assert.match(cleaner, /path\.resolve\(root, "out"\)/);
  assert.match(cleaner, /path\.basename\(outputDir\) !== "out"/);
  assert.doesNotMatch(cleaner, /public|assets|optimized/);
  assert.match(generator, /const imageQuality = 78/);
  assert.match(generator, /expectedVariantFiles/);
  assert.match(generator, /staleVariantCount/);
  assert.match(generator, /\/optimized\//);
  assert.match(responsiveImages, /variants\[decodeURIComponent/);
});

test("deployment packaging rejects nested archives and audits responsive images", () => {
  const packager = read("scripts/build-static-package.ps1");
  const deployOptimizer = read("scripts/optimize-deploy-assets.mjs");
  const imageAudit = read("scripts/audit-exported-images.mjs");
  assert.match(packager, /Get-ChildItem \$outDir -Recurse -File -Filter "\*\.zip"/);
  assert.match(packager, /Unexpected ZIP archive\(s\) inside static output/);
  assert.match(packager, /node scripts\/optimize-deploy-assets\.mjs/);
  assert.match(packager, /node scripts\/audit-exported-images\.mjs/);
  assert.match(packager, /Exported image audit failed/);
  assert.match(deployOptimizer, /sourceUrl\.toLowerCase\(\)\.endsWith\("\.webp"\)/);
  assert.match(deployOptimizer, /protectedOriginals/);
  assert.match(deployOptimizer, /variantMeta\.format !== "webp"/);
  assert.match(deployOptimizer, /mustCorrectFormat = sourceMeta\.format !== "webp"/);
  assert.match(deployOptimizer, /Math\.abs\(sourceRatio - variantRatio\) > 0\.01/);
  assert.match(deployOptimizer, /Math\.min\(sourceWidth, 1920\)/);
  assert.match(deployOptimizer, /keepMetadata\(\)\.png\(\{ compressionLevel: 9, adaptiveFiltering: true \}\)/);
  assert.match(imageAudit, /Missing deployed original URL/);
  assert.match(imageAudit, /Deployed original format mismatch/);
  assert.match(imageAudit, /Deployed original aspect ratio mismatch/);
  assert.match(imageAudit, /Deployed original resolution too small/);
  assert.match(imageAudit, /Missing or case-mismatched image URL/);
  assert.match(imageAudit, /entry\.name === segment/);
});

test("rental category image uses the server-safe canonical filename case", () => {
  const rentalPage = read("modules/routes/catalog/rental/page.tsx");
  assert.match(rentalPage, /image: "\/assets\/projects\/project-indoor-wall\.webp"/);
  assert.doesNotMatch(rentalPage, /Project-indoor-wall\.webp/);
});
