/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const path = require("node:path");

const [inputArg, outputArg] = process.argv.slice(2);
const inputPath = path.join(process.cwd(), inputArg ?? path.join("public", "saha_corporation.webp"));
const outputPath = path.join(
  process.cwd(),
  outputArg ?? path.join("public", "saha_corporation-transparent.webp")
);

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

async function main() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const thresholdStart = 18; // distance from white where alpha begins
  const thresholdEnd = 80; // distance from white where alpha becomes fully opaque

  for (let index = 0; index < data.length; index += info.channels) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];

    const dr = 255 - r;
    const dg = 255 - g;
    const db = 255 - b;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);

    const alpha = clamp(((distance - thresholdStart) / (thresholdEnd - thresholdStart)) * 255, 0, 255);
    data[index + 3] = alpha;
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(outputPath);

  console.log("Wrote", outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
