/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const path = require("node:path");

const inputPath = path.join(process.cwd(), "public", "sasha-corporation-final-l-transparent.webp");
const baseOutPath = path.join(process.cwd(), "public", "sasha-corporation-final-l-scrolled.webp");
const corpOutPath = path.join(process.cwd(), "public", "sasha-corporation-final-l-corp-gold.webp");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function isCorpPixel(r, g, b, a) {
  if (a < 10) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max - min;
  if (saturation > 40) return false; // avoid colorful pixels

  const distanceFromWhite = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
  return distanceFromWhite > 28;
}

async function main() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  const corpStartY = Math.floor(height * 0.72);

  const base = Buffer.from(data);
  const corp = Buffer.alloc(data.length, 0);

  const gold = { r: 255, g: 180, b: 0 };

  for (let y = corpStartY; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * channels;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (!isCorpPixel(r, g, b, a)) continue;

      // Remove from base (so dark text/lines won't show on black header)
      base[index + 3] = 0;

      // Create golden corp layer
      corp[index] = gold.r;
      corp[index + 1] = gold.g;
      corp[index + 2] = gold.b;
      corp[index + 3] = clamp(a + 40, 0, 255); // slightly boost for crisp edges
    }
  }

  await sharp(base, { raw: { width, height, channels: 4 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(baseOutPath);

  await sharp(corp, { raw: { width, height, channels: 4 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(corpOutPath);

  console.log("Wrote", baseOutPath);
  console.log("Wrote", corpOutPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
