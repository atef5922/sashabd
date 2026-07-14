import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const TARGET_RATIO = 16 / 10;
const RATIO_TOLERANCE = 0.015;

const isWebp = (value) => value.toLowerCase().endsWith(".webp");

const parseImagePathsFromCode = (content) => {
  const out = [];
  const re = /image:\s*["'`]([^"'`]+)["'`]/g;
  for (let m; (m = re.exec(content)); ) {
    const raw = m[1];
    if (!raw.startsWith("/images/")) continue;
    if (!isWebp(raw)) continue;
    out.push(raw);
  }
  return out;
};

const listLibFiles = async () => {
  const base = path.join(ROOT, "lib");
  const entries = await fs.readdir(base, { withFileTypes: true });
  const files = [];

  const walk = async (dir, dirents) => {
    for (const d of dirents) {
      const full = path.join(dir, d.name);
      if (d.isDirectory()) {
        const nested = await fs.readdir(full, { withFileTypes: true });
        await walk(full, nested);
      } else if (d.isFile() && (d.name.endsWith(".ts") || d.name.endsWith(".tsx"))) {
        files.push(full);
      }
    }
  };

  await walk(base, entries);
  return files;
};

const getAverageColor = async (filePath) => {
  const { data } = await sharp(filePath)
    .resize(1, 1, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const r = data[0] ?? 255;
  const g = data[1] ?? 255;
  const b = data[2] ?? 255;
  return { r, g, b, alpha: 1 };
};

const padToRatio = async (filePath) => {
  const meta = await sharp(filePath).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) return { changed: false, reason: "no-dimensions" };

  const ratio = width / height;
  if (Math.abs(ratio - TARGET_RATIO) <= RATIO_TOLERANCE) {
    return { changed: false, reason: "already-ok" };
  }

  const bg = await getAverageColor(filePath);

  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;

  if (ratio > TARGET_RATIO) {
    const targetH = Math.ceil(width / TARGET_RATIO);
    const pad = targetH - height;
    top = Math.floor(pad / 2);
    bottom = pad - top;
  } else {
    const targetW = Math.ceil(height * TARGET_RATIO);
    const pad = targetW - width;
    left = Math.floor(pad / 2);
    right = pad - left;
  }

  const buf = await sharp(filePath)
    .extend({ top, bottom, left, right, background: bg })
    .webp({ quality: 90, effort: 5 })
    .toBuffer();

  await fs.writeFile(filePath, buf);
  return { changed: true, width, height, top, bottom, left, right };
};

const main = async () => {
  const libFiles = await listLibFiles();
  const imagePaths = new Set();

  for (const file of libFiles) {
    const content = await fs.readFile(file, "utf8");
    for (const p of parseImagePathsFromCode(content)) imagePaths.add(p);
  }

  const resolved = Array.from(imagePaths)
    .map((p) => path.join(ROOT, "public", p.replace(/^\//, "")))
    .sort((a, b) => a.localeCompare(b));

  let changed = 0;
  let skipped = 0;
  let missing = 0;
  let failed = 0;

  for (const filePath of resolved) {
    try {
      await fs.access(filePath);
    } catch {
      missing += 1;
      continue;
    }

    try {
      const result = await padToRatio(filePath);
      if (result.changed) {
        changed += 1;
      } else {
        skipped += 1;
      }
    } catch {
      failed += 1;
    }
  }

  process.stdout.write(
    `Done. Updated: ${changed}, Skipped: ${skipped}, Missing: ${missing}, Failed: ${failed}, Target ratio: ${TARGET_RATIO.toFixed(3)}\n`,
  );
};

main().catch((err) => {
  process.stderr.write(`${err?.stack ?? err}\n`);
  process.exit(1);
});
