import { readdir, readFile, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outputDir = path.join(publicDir, "optimized");
const widths = [64, 128, 256, 384, 640, 960, 1280, 1920];
const manifest = {};
let originalBytes = 0;
let largestBytes = 0;
let count = 0;

async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(full));
    else if (/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) result.push(full);
  }
  return result.sort();
}

await mkdir(outputDir, { recursive: true });
const files = await walk(path.join(publicDir, "assets"));
// Bounded concurrency keeps export builds usable on small hosting/build machines.
let cursor = 0;
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < files.length) {
    const file = files[cursor++];
    const input = await readFile(file);
    const meta = await sharp(input).metadata();
    if (!meta.width || !meta.height || (meta.pages ?? 1) > 1) continue;
    const source = "/" + path.relative(publicDir, file).split(path.sep).join("/");
    const hash = createHash("sha256").update(input).update("webp-q82-v1").digest("hex").slice(0, 20);
    const maxWidth = Math.min(meta.autoOrient?.width ?? meta.width, 1920);
    const sizes = [...new Set([...widths.filter(w => w < maxWidth), maxWidth])];
    const variants = [];
    for (const width of sizes) {
      const name = hash + "-" + width + ".webp";
      const destination = path.join(outputDir, name);
      try { await stat(destination); } catch {
        await sharp(input).rotate().resize({ width, withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 }).toFile(destination);
      }
      variants.push([width, "/optimized/" + name]);
    }
    manifest[source] = variants;
    originalBytes += input.length;
    const largestSize = (await stat(path.join(publicDir, variants.at(-1)[1]))).size;
    largestBytes += largestSize;
    count++;
  }
}));
await mkdir(path.join(root, "lib/generated"), { recursive: true });
await writeFile(path.join(root, "lib/generated/image-variants.json"),
  JSON.stringify(Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))));
const backgrounds = [
  "/assets/led-display/rental/hero/rental-led-hero-banner.webp",
  "/assets/control-systems/turnstile/turnstile-entrance-hero-v2.webp",
  "/assets/control-systems/digital-podium/digital-podium-hero.webp",
];
const rules = width => backgrounds.map((src, index) => {
  const entries = manifest[src];
  const url = (entries.find(([size]) => size >= width) ?? entries.at(-1))[1];
  return "--optimized-background-" + index + ":url('" + url + "')";
}).join(";");
await writeFile(path.join(root, "lib/generated/image-backgrounds.css"),
  ":root{" + rules(1920) + "}\n@media(max-width:640px){:root{" + rules(960) + "}}\n");
console.log("Images: " + count + "; originals: " + (originalBytes / 1048576).toFixed(1) +
  " MB; largest optimized variants: " + (largestBytes / 1048576).toFixed(1) + " MB");
