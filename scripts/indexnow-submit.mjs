#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return null;
  const value = process.argv[idx + 1];
  if (!value || value.startsWith("--")) return "";
  return value;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function fail(msg) {
  console.error(`\n[indexnow] ${msg}\n`);
  process.exit(1);
}

function readTextFile(filePath) {
  const buf = fs.readFileSync(filePath);

  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le");
  }

  // Heuristic: Ahrefs TSV exports are sometimes UTF-16LE without being obvious in tooling.
  // If we see lots of NUL bytes early, treat as UTF-16LE.
  const probe = buf.subarray(0, Math.min(buf.length, 4096));
  let nulCount = 0;
  for (const b of probe) if (b === 0x00) nulCount += 1;
  if (nulCount > probe.length * 0.1) {
    return buf.toString("utf16le");
  }

  return buf.toString("utf8");
}

function isProbablyUrl(value) {
  return /^https?:\/\//i.test(value);
}

function normalizeHost(host) {
  if (!host) return "";
  return host.replace(/\/+$/, "");
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.toString();
  } catch {
    return "";
  }
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
  return out;
}

function parseAhrefsTsvLine(line) {
  // Ahrefs exports are TSV with quoted cells.
  // Example: "PR"\t"URL"\t"Title"
  const cells = line.split("\t").map((raw) => {
    const withoutBom = raw.replace(/^\uFEFF/, "");
    const unquoted =
      withoutBom.startsWith('"') && withoutBom.endsWith('"') ? withoutBom.slice(1, -1) : withoutBom;
    return unquoted.replace(/""/g, '"');
  });
  return cells;
}

function urlsFromAhrefsTsv(tsvText, { requireHttp200 = true } = {}) {
  const lines = tsvText.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const header = parseAhrefsTsvLine(lines[0]);
  const urlIdx = header.indexOf("URL");
  const statusIdx = header.indexOf("HTTP status code");
  const indexableIdx = header.indexOf("Is indexable page");

  if (urlIdx === -1) fail("Ahrefs file missing 'URL' column.");

  const urls = [];
  for (const line of lines.slice(1)) {
    const row = parseAhrefsTsvLine(line);
    const rawUrl = row[urlIdx] ?? "";
    const status = statusIdx >= 0 ? (row[statusIdx] ?? "") : "";
    const indexable = indexableIdx >= 0 ? (row[indexableIdx] ?? "") : "";

    if (!rawUrl) continue;
    if (requireHttp200 && status && status !== "200") continue;
    if (indexable && indexable !== "true") continue;

    const normalized = normalizeUrl(rawUrl);
    if (normalized) urls.push(normalized);
  }
  return urls;
}

async function urlsFromSitemap(sitemapLocation) {
  const xml = isProbablyUrl(sitemapLocation)
    ? await (await fetch(sitemapLocation)).text()
    : readTextFile(sitemapLocation);

  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/gi;
  let m;
  while ((m = re.exec(xml))) {
    const normalized = normalizeUrl(m[1].trim());
    if (normalized) urls.push(normalized);
  }
  return urls;
}

function ensureKeyFile({ key, publicDir }) {
  const fileName = `${key}.txt`;
  const filePath = path.join(publicDir, fileName);
  if (fs.existsSync(filePath)) return { filePath, created: false };
  fs.writeFileSync(filePath, `${key}\n`, "utf8");
  return { filePath, created: true };
}

async function submitIndexNow({ key, keyLocation, host, urls, dryRun }) {
  if (!urls.length) {
    console.log("[indexnow] No URLs to submit.");
    return;
  }

  const batches = chunk(urls, 10000);
  console.log(`[indexnow] Submitting ${urls.length} URL(s) in ${batches.length} batch(es).`);

  for (let i = 0; i < batches.length; i += 1) {
    const batch = batches[i];
    const payload = {
      host,
      key,
      keyLocation,
      urlList: batch,
    };

    if (dryRun) {
      console.log(`[indexnow] Dry-run batch ${i + 1}/${batches.length}: ${batch.length} URL(s).`);
      continue;
    }

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      fail(`IndexNow failed (batch ${i + 1}/${batches.length}): HTTP ${res.status}. ${body}`.trim());
    }

    console.log(`[indexnow] OK batch ${i + 1}/${batches.length}: ${batch.length} URL(s).`);
  }
}

async function main() {
  const key = getArg("--key") || process.env.INDEXNOW_KEY;
  const host = normalizeHost(getArg("--host") || process.env.SITE_HOST || process.env.NEXT_PUBLIC_SITE_URL);
  const ahrefsFile = getArg("--ahrefs");
  const sitemap = getArg("--sitemap");
  const dryRun = hasFlag("--dry-run");
  const writeKeyFile = hasFlag("--write-key-file");
  const includeNon200 = hasFlag("--include-non-200");

  if (!key) fail("Missing IndexNow key. Provide --key or set INDEXNOW_KEY.");
  if (!host) fail("Missing host. Provide --host (example: https://sashabd.com).");
  if (!ahrefsFile && !sitemap) {
    fail("Provide URL source: --ahrefs <file> or --sitemap <file-or-url>.");
  }

  const publicDir = path.join(process.cwd(), "public");
  if (writeKeyFile) {
    if (!fs.existsSync(publicDir)) fail("Missing public/ directory.");
    const { filePath, created } = ensureKeyFile({ key, publicDir });
    console.log(`[indexnow] Key file ${created ? "created" : "exists"}: ${filePath}`);
  }

  const keyLocation = `${host}/${encodeURIComponent(key)}.txt`;

  let urls = [];
  if (ahrefsFile) {
    const tsv = readTextFile(ahrefsFile);
    urls = urls.concat(
      urlsFromAhrefsTsv(tsv, {
        requireHttp200: !includeNon200,
      }),
    );
  }
  if (sitemap) {
    urls = urls.concat(await urlsFromSitemap(sitemap));
  }

  urls = Array.from(new Set(urls));
  await submitIndexNow({ key, keyLocation, host, urls, dryRun });

  if (dryRun) {
    console.log("[indexnow] Dry-run URLs:");
    for (const u of urls) console.log(u);
  }
}

main().catch((err) => fail(err?.stack || String(err)));
