import { copyFile, readFile, readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(process.cwd());
const outputDir = path.resolve(root, "out");
const publicDir = path.resolve(root, "public");
const manifest = JSON.parse(await readFile(path.join(root, "lib/generated/image-variants.json"), "utf8"));
const protectedOriginals = new Set(["/assets/home/hero/conference-room-clean.webp"]);

if (path.dirname(outputDir) !== root || path.basename(outputDir) !== "out") {
  throw new Error(`Refusing to optimize unexpected output path: ${outputDir}`);
}

const relativeSegments = (url) => url.replace(/^\/+/, "").split("/");
const outputPathFor = (url) => path.join(outputDir, ...relativeSegments(url));
let optimizedWebpCount = 0;
let optimizedPngCount = 0;
let savedBytes = 0;

for (const [sourceUrl, variants] of Object.entries(manifest)) {
  if (!sourceUrl.toLowerCase().endsWith(".webp") || protectedOriginals.has(sourceUrl)) continue;
  const deployOriginal = outputPathFor(sourceUrl);
  const deployVariant = outputPathFor(variants.at(-1)[1]);
  const sourceMeta = await sharp(path.join(publicDir, ...relativeSegments(sourceUrl))).metadata();
  const variantMeta = await sharp(deployVariant).metadata();
  const sourceWidth = sourceMeta.autoOrient?.width ?? sourceMeta.width;
  const sourceHeight = sourceMeta.autoOrient?.height ?? sourceMeta.height;
  if (variantMeta.format !== "webp" || !sourceWidth || !sourceHeight || !variantMeta.width || !variantMeta.height) {
    throw new Error(`Invalid deploy WebP metadata for ${sourceUrl}`);
  }
  const sourceRatio = sourceWidth / sourceHeight;
  const variantRatio = variantMeta.width / variantMeta.height;
  if (Math.abs(sourceRatio - variantRatio) > 0.01 || variantMeta.width !== Math.min(sourceWidth, 1920)) {
    throw new Error(`Deploy WebP geometry mismatch for ${sourceUrl}`);
  }
  const originalSize = (await stat(deployOriginal)).size;
  const variantSize = (await stat(deployVariant)).size;
  const mustCorrectFormat = sourceMeta.format !== "webp";
  if (variantSize >= originalSize && !mustCorrectFormat) continue;
  await copyFile(deployVariant, deployOriginal);
  optimizedWebpCount++;
  savedBytes += originalSize - variantSize;
}

async function walkPngs(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkPngs(full));
    else if (entry.name.toLowerCase().endsWith(".png")) files.push(full);
  }
  return files;
}

for (const pngFile of await walkPngs(path.join(outputDir, "assets"))) {
  const temporary = `${pngFile}.lossless.tmp`;
  const before = (await stat(pngFile)).size;
  await sharp(pngFile).keepMetadata().png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(temporary);
  const after = (await stat(temporary)).size;
  if (after < before) {
    await copyFile(temporary, pngFile);
    optimizedPngCount++;
    savedBytes += before - after;
  }
  await unlink(temporary);
}

console.log(JSON.stringify({ optimizedWebpCount, optimizedPngCount, savedMB: +(savedBytes / 1048576).toFixed(2) }));
