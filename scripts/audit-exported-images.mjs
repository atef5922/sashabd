import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = JSON.parse(readFileSync("lib/generated/image-variants.json", "utf8"));
const errors = [];
let images = 0;
let responsive = 0;
let pages = 0;
let originals = 0;
let deployedOriginals = 0;
let largest = 0;
let cards = 0;
for (const [src, variants] of Object.entries(manifest)) {
  const sourceFile = path.join(root, "public", src);
  const deployedOriginalFile = path.join(root, "out", src);
  originals += statSync(sourceFile).size;
  if (!existsSync(deployedOriginalFile)) {
    errors.push("Missing deployed original URL: " + src);
  } else {
    const [sourceMeta, deployedMeta] = await Promise.all([
      sharp(sourceFile).metadata(),
      sharp(deployedOriginalFile).metadata(),
    ]);
    const expectedFormat = /\.jpe?g$/i.test(src) ? "jpeg" : src.split(".").at(-1).toLowerCase();
    const sourceWidth = sourceMeta.autoOrient?.width ?? sourceMeta.width;
    const sourceHeight = sourceMeta.autoOrient?.height ?? sourceMeta.height;
    if (deployedMeta.format !== expectedFormat) errors.push("Deployed original format mismatch: " + src);
    if (!sourceWidth || !sourceHeight || !deployedMeta.width || !deployedMeta.height) {
      errors.push("Missing deployed original dimensions: " + src);
    } else {
      const sourceRatio = sourceWidth / sourceHeight;
      const deployedRatio = deployedMeta.width / deployedMeta.height;
      if (Math.abs(sourceRatio - deployedRatio) > 0.01) errors.push("Deployed original aspect ratio mismatch: " + src);
      if (deployedMeta.width < Math.min(sourceWidth, 1200)) errors.push("Deployed original resolution too small: " + src);
    }
    deployedOriginals++;
  }
  largest += statSync(path.join(root, "public", variants.at(-1)[1])).size;
  cards += statSync(path.join(root, "public", (variants.find(([w]) => w >= 384) ?? variants.at(-1))[1])).size;
  for (const [width, url] of variants) {
    const file = path.join(root, "out", url);
    if (!existsSync(file)) { errors.push("Missing variant: " + url); continue; }
    const meta = await sharp(file).metadata();
    if (meta.width !== width || meta.format !== "webp") errors.push("Invalid variant: " + url);
  }
}
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!entry.name.endsWith(".html")) continue;
    pages++;
    const html = readFileSync(file, "utf8");
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      images++;
      const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
      if (!src) continue;
      const localUrl = decodeURIComponent(src.split(/[?#]/, 1)[0]);
      if (localUrl.startsWith("/") && !hasExactPathCase(path.join(root, "out"), localUrl)) {
        errors.push("Missing or case-mismatched image URL: " + file + " " + localUrl);
      }
      if (src.startsWith("/optimized/")) {
        responsive++;
        if (!/srcSet=/i.test(tag)) errors.push("Missing srcset: " + file);
      } else if (manifest[decodeURIComponent(src)]) {
        // This zoomed panoramic card intentionally retains the compact 144 KB original.
        const originalConferenceCard =
          src === "/assets/home/hero/conference-room-clean.webp" &&
          tag.includes('data-image-quality="original"');
        if (!originalConferenceCard) errors.push("Unoptimized raster: " + file + " " + src);
      }
    }
    for (const [url] of html.matchAll(/\/optimized\/[a-f0-9]+-\d+\.webp/g)) {
      if (!existsSync(path.join(root, "out", url))) errors.push("Broken image URL: " + url);
    }
  }
}

function hasExactPathCase(baseDir, urlPath) {
  const segments = urlPath.replace(/^\/+/, "").split("/").filter(Boolean);
  let current = baseDir;
  for (const segment of segments) {
    if (!existsSync(current) || !statSync(current).isDirectory()) return false;
    const exactEntry = readdirSync(current, { withFileTypes: true }).find((entry) => entry.name === segment);
    if (!exactEntry) return false;
    current = path.join(current, exactEntry.name);
  }
  return existsSync(current);
}
walk(path.join(root, "out"));
console.log(JSON.stringify({ pages, images, responsive, sourceImages: Object.keys(manifest).length,
  deployedOriginals,
  originalMB: +(originals / 1048576).toFixed(2), largestVariantMB: +(largest / 1048576).toFixed(2),
  cardVariantMB: +(cards / 1048576).toFixed(2), errors: [...new Set(errors)] }, null, 2));
if (errors.length) process.exitCode = 1;
