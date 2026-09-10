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
let largest = 0;
let cards = 0;
for (const [src, variants] of Object.entries(manifest)) {
  originals += statSync(path.join(root, "public", src)).size;
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
walk(path.join(root, "out"));
console.log(JSON.stringify({ pages, images, responsive, sourceImages: Object.keys(manifest).length,
  originalMB: +(originals / 1048576).toFixed(2), largestVariantMB: +(largest / 1048576).toFixed(2),
  cardVariantMB: +(cards / 1048576).toFixed(2), errors: [...new Set(errors)] }, null, 2));
if (errors.length) process.exitCode = 1;
