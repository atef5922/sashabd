#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=") || true];
  }),
);

const baseUrl = new URL(String(args.base || "http://127.0.0.1:4173"));
const expectedOrigin = String(args["expected-origin"] || "https://sashabd.com").replace(/\/+$/, "");
const outputFile = path.resolve(String(args.output || "reports/seo-audit.json"));
const isProduction = baseUrl.origin === expectedOrigin;
const timeoutMs = Number(args.timeout || 12_000);
const concurrency = Number(args.concurrency || (isProduction ? 4 : 10));
const userAgent = "SashabdTechnicalSEOAudit/1.0 (+https://sashabd.com/)";
const pageExtension = /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mjs|mp4|pdf|png|svg|txt|webp|woff2?|xml)$/i;

const issues = [];
const urlRows = [];
const indexabilityRows = [];
const redirectRows = [];

function addIssue(severity, code, url, message) {
  issues.push({ severity, code, url, message });
}

function requestUrl(publicUrl) {
  const url = new URL(publicUrl, expectedOrigin);
  if (url.origin === expectedOrigin || url.hostname === "www.sashabd.com") {
    return new URL(`${url.pathname}${url.search}`, baseUrl);
  }
  return url;
}

async function fetchOnce(url, options = {}) {
  return fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
    headers: { "user-agent": options.userAgent || userAgent },
  });
}

async function fetchRetry(url, options = {}) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await fetchOnce(url, options);
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw lastError;
}

async function crawl(startUrl, options = {}) {
  let current = new URL(startUrl);
  const hops = [];
  const visited = new Set();
  let response;

  for (let step = 0; step < 8; step += 1) {
    if (visited.has(current.href)) {
      return { startUrl: String(startUrl), hops, loop: true, finalUrl: current.href, response };
    }
    visited.add(current.href);
    response = await fetchRetry(current, options);
    const location = response.headers.get("location");
    if (response.status < 300 || response.status > 399 || !location) break;
    const next = new URL(location, current);
    hops.push({ status: response.status, from: current.href, to: next.href });
    current = next;
  }

  return { startUrl: String(startUrl), hops, loop: false, finalUrl: current.href, response };
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
}

function tagAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "i"))?.[1] || null;
}

function extractCanonicals(html, pageUrl) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => (tagAttribute(tag, "rel") || "").split(/\s+/).includes("canonical"))
    .map((tag) => tagAttribute(tag, "href"))
    .filter(Boolean)
    .map((href) => new URL(href, pageUrl).href);
}

function extractMetaRobots(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => ["robots", "googlebot"].includes((tagAttribute(tag, "name") || "").toLowerCase()))
    .map((tag) => tagAttribute(tag, "content") || "")
    .join(",")
    .toLowerCase();
}

function extractMetaContent(html, attribute, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((candidate) => (tagAttribute(candidate, attribute) || "").toLowerCase() === value.toLowerCase());
  return tag ? tagAttribute(tag, "content") || "" : "";
}

function extractPageSignals(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
  const description = extractMetaContent(html, "name", "description");
  const ogUrl = extractMetaContent(html, "property", "og:url");
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  return { title, description, ogUrl, h1Count };
}

function extractInternalLinks(html, pageUrl) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = tagAttribute(match[0], "href");
    if (!href || /^(?:#|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    try {
      const url = new URL(href, pageUrl);
      if (["sashabd.com", "www.sashabd.com"].includes(url.hostname)) links.push({ href, url });
    } catch {
      addIssue("critical", "malformed-internal-link", pageUrl, `Malformed internal href: ${href}`);
    }
  }
  return links;
}

function canonicalPageUrl(publicUrl) {
  const url = new URL(publicUrl, expectedOrigin);
  url.protocol = "https:";
  url.hostname = "sashabd.com";
  url.port = "";
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/{2,}/g, "/").toLowerCase();
  if (url.pathname !== "/" && !pageExtension.test(url.pathname) && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }
  return url.href;
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
      if (isProduction) await new Promise((resolve) => setTimeout(resolve, 80));
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows, columns) {
  return [columns.join(","), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(","))].join("\n") + "\n";
}

function robotsDisallows(robotsText) {
  const lines = robotsText.split(/\r?\n/).map((line) => line.replace(/#.*$/, "").trim());
  let applies = false;
  const disallow = [];
  for (const line of lines) {
    const [field, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    if (field?.toLowerCase() === "user-agent") applies = value === "*";
    if (applies && field?.toLowerCase() === "disallow" && value) disallow.push(value);
  }
  return disallow;
}

async function auditPage(publicUrl, sitemapIncluded = true) {
  const requested = requestUrl(publicUrl);
  try {
    const result = await crawl(requested);
    const status = result.response?.status || 0;
    const contentType = result.response?.headers.get("content-type") || "";
    const body = result.response && status !== 304 ? await result.response.text() : "";
    const publicFinalUrl = new URL(result.finalUrl);
    if (!isProduction) {
      publicFinalUrl.protocol = "https:";
      publicFinalUrl.host = "sashabd.com";
    }
    const canonicals = contentType.includes("text/html") ? extractCanonicals(body, publicFinalUrl.href) : [];
    const metaRobots = contentType.includes("text/html") ? extractMetaRobots(body) : "";
    const signals = contentType.includes("text/html") ? extractPageSignals(body) : { title: "", description: "", ogUrl: "", h1Count: 0 };
    const xRobots = result.response?.headers.get("x-robots-tag")?.toLowerCase() || "";
    const expectedCanonical = canonicalPageUrl(publicUrl);
    const indexable = status === 200 && !metaRobots.includes("noindex") && !xRobots.includes("noindex");

    if (result.loop) addIssue("critical", "redirect-loop", publicUrl, "Redirect loop detected");
    if (sitemapIncluded && result.hops.length) addIssue("critical", "sitemap-redirect", publicUrl, `${result.hops.length} redirect hop(s)`);
    if (result.hops.length > 1) addIssue("critical", "redirect-chain", publicUrl, `${result.hops.length} redirect hops`);
    if (status !== 200 && sitemapIncluded) addIssue("critical", "sitemap-non-200", publicUrl, `Final status ${status}`);
    if (!indexable && sitemapIncluded) addIssue("critical", "sitemap-non-indexable", publicUrl, `robots=${metaRobots || xRobots || "none"}; status=${status}`);
    if (contentType.includes("text/html") && sitemapIncluded) {
      if (canonicals.length !== 1) addIssue("critical", canonicals.length ? "multiple-canonicals" : "missing-canonical", publicUrl, `Found ${canonicals.length}`);
      if (canonicals[0] && canonicals[0] !== expectedCanonical) addIssue("critical", "canonical-mismatch", publicUrl, `Expected ${expectedCanonical}; found ${canonicals[0]}`);
      if (!signals.title) addIssue("critical", "missing-title", publicUrl, "No title element found");
      if (!signals.description) addIssue("critical", "missing-meta-description", publicUrl, "No meta description found");
      if (signals.h1Count !== 1) addIssue("critical", "h1-count", publicUrl, `Expected one H1; found ${signals.h1Count}`);
      if (!/<html\b[^>]*\blang=["']en["']/i.test(body)) addIssue("critical", "missing-html-lang", publicUrl, "Expected html lang=en");
      if (!extractMetaContent(body, "name", "viewport")) addIssue("critical", "missing-viewport", publicUrl, "Viewport meta is missing");
      if (signals.ogUrl && new URL(signals.ogUrl, expectedOrigin).href !== expectedCanonical) addIssue("critical", "open-graph-url-mismatch", publicUrl, `Found ${signals.ogUrl}`);
      if (/(?:src|href)=["']http:\/\//i.test(body)) addIssue("critical", "mixed-http-resource", publicUrl, "Rendered HTML contains an HTTP resource");
      for (const match of body.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
        try { JSON.parse(match[1]); } catch (error) { addIssue("critical", "invalid-json-ld", publicUrl, error.message); }
      }
    }

    const links = contentType.includes("text/html") ? extractInternalLinks(body, expectedCanonical) : [];
    for (const link of links) {
      if (/^http:\/\//i.test(link.href)) addIssue("critical", "http-internal-link", publicUrl, link.href);
      if (link.url.hostname === "www.sashabd.com") addIssue("critical", "www-internal-link", publicUrl, link.href);
      if (!pageExtension.test(link.url.pathname) && link.url.pathname !== "/" && !link.url.pathname.endsWith("/")) {
        addIssue("critical", "noncanonical-internal-link", publicUrl, link.href);
      }
    }

    urlRows.push({
      source_url: publicUrl,
      status_code: result.hops[0]?.status || status,
      location: result.hops[0]?.to || "",
      redirect_chain: result.hops.map((hop) => `${hop.status}:${hop.to}`).join(" | "),
      final_url: isProduction ? result.finalUrl : publicFinalUrl.href,
      final_status: status,
      canonical_url: canonicals.join(" | "),
      robots_meta: metaRobots,
      x_robots_tag: xRobots,
      sitemap_inclusion: sitemapIncluded,
      internal_link_count: 0,
      outgoing_internal_link_count: links.length,
      indexability: indexable ? "indexable" : "not-indexable",
      content_type: contentType,
      issue_classification: issues.filter((issue) => issue.url === publicUrl).map((issue) => issue.code).join(" | "),
      recommended_action: issues.some((issue) => issue.url === publicUrl) ? "Review listed violations" : "None",
    });
    indexabilityRows.push({ url: publicUrl, status, canonical: canonicals.join(" | "), robots_meta: metaRobots, x_robots_tag: xRobots, indexable, sitemap_included: sitemapIncluded });
    return { publicUrl, result, links, signals };
  } catch (error) {
    addIssue("critical", "request-failed", publicUrl, error.message);
    urlRows.push({ source_url: publicUrl, status_code: 0, location: "", redirect_chain: "", final_url: "", final_status: 0, canonical_url: "", robots_meta: "", x_robots_tag: "", sitemap_inclusion: sitemapIncluded, internal_link_count: 0, indexability: "unknown", content_type: "", issue_classification: "request-failed", recommended_action: "Retry and investigate network/server availability" });
    return { publicUrl, result: null, links: [], signals: { title: "", description: "", ogUrl: "", h1Count: 0 } };
  }
}

async function auditRedirect(publicSource, expectedDestination) {
  const source = isProduction ? new URL(publicSource, expectedOrigin) : requestUrl(publicSource);
  try {
    const result = await crawl(source);
    const finalStatus = result.response?.status || 0;
    const publicFinal = isProduction ? result.finalUrl : new URL(new URL(result.finalUrl).pathname, expectedOrigin).href;
    const expected = new URL(expectedDestination, expectedOrigin).href;
    const firstStatus = result.hops[0]?.status || finalStatus;
    if (result.loop) addIssue("critical", "redirect-loop", publicSource, "Redirect loop detected");
    if (result.hops.length !== 1) addIssue("critical", "redirect-hop-count", publicSource, `Expected 1 hop; found ${result.hops.length}`);
    if (![301, 308].includes(firstStatus)) addIssue("critical", "redirect-not-permanent", publicSource, `Status ${firstStatus}`);
    if (publicFinal !== expected) addIssue("critical", "redirect-wrong-destination", publicSource, `Expected ${expected}; found ${publicFinal}`);
    if (finalStatus !== 200) addIssue("critical", "redirect-broken-destination", publicSource, `Final status ${finalStatus}`);
    redirectRows.push({ source_url: publicSource, status_code: firstStatus, destination_url: result.hops[0]?.to || "", hop_count: result.hops.length, final_url: publicFinal, final_status: finalStatus, classification: "intentional permanent migration", recommended_action: issues.some((issue) => issue.url === publicSource) ? "Fix redirect configuration" : "Keep" });
  } catch (error) {
    addIssue("critical", "redirect-request-failed", publicSource, error.message);
    redirectRows.push({ source_url: publicSource, status_code: 0, destination_url: "", hop_count: 0, final_url: "", final_status: 0, classification: "unverified", recommended_action: "Retry" });
  }
}

async function main() {
  console.log(`SEO audit: ${baseUrl.origin} (canonical: ${expectedOrigin})`);
  const robotsResponse = await fetchRetry(new URL("/robots.txt", baseUrl));
  const sitemapResponse = await fetchRetry(new URL("/sitemap.xml", baseUrl));
  const robotsText = await robotsResponse.text();
  const sitemapXml = await sitemapResponse.text();

  if (robotsResponse.status !== 200) addIssue("critical", "robots-non-200", `${expectedOrigin}/robots.txt`, `Status ${robotsResponse.status}`);
  if (sitemapResponse.status !== 200) addIssue("critical", "sitemap-non-200", `${expectedOrigin}/sitemap.xml`, `Status ${sitemapResponse.status}`);
  if (!(robotsResponse.headers.get("content-type") || "").includes("text/plain")) addIssue("critical", "robots-content-type", `${expectedOrigin}/robots.txt`, robotsResponse.headers.get("content-type") || "missing");
  if (!/(?:application|text)\/xml/i.test(sitemapResponse.headers.get("content-type") || "")) addIssue("critical", "sitemap-content-type", `${expectedOrigin}/sitemap.xml`, sitemapResponse.headers.get("content-type") || "missing");
  if (!/Sitemap:\s*https:\/\/sashabd\.com\/sitemap\.xml/i.test(robotsText)) addIssue("critical", "robots-sitemap-mismatch", `${expectedOrigin}/robots.txt`, "Canonical sitemap directive missing");
  const disallows = robotsDisallows(robotsText);
  if (disallows.includes("/")) addIssue("critical", "robots-blocks-site", `${expectedOrigin}/robots.txt`, "Disallow: /");

  const sitemapUrls = extractSitemapUrls(sitemapXml);
  if (!sitemapUrls.length) addIssue("critical", "empty-or-invalid-sitemap", `${expectedOrigin}/sitemap.xml`, "No <loc> entries found");
  for (const duplicate of sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index)) addIssue("critical", "duplicate-sitemap-url", duplicate, "Duplicate <loc>");
  for (const url of sitemapUrls) {
    if (new URL(url).origin !== expectedOrigin) addIssue("critical", "sitemap-host-violation", url, `Expected ${expectedOrigin}`);
    if (url !== canonicalPageUrl(url)) addIssue("critical", "sitemap-format-violation", url, `Expected ${canonicalPageUrl(url)}`);
    if (disallows.some((rule) => rule !== "/" && new URL(url).pathname.startsWith(rule))) addIssue("critical", "robots-blocked-sitemap-url", url, "Matched robots.txt Disallow");
  }

  console.log(`Crawling ${sitemapUrls.length} sitemap URLs with concurrency ${concurrency}...`);
  const pages = await mapLimit(sitemapUrls, concurrency, (url) => auditPage(url, true));

  const incomingLinks = new Map(sitemapUrls.map((url) => [url, 0]));
  for (const page of pages) {
    for (const link of page.links) {
      const target = new URL(link.url.href);
      target.hash = "";
      if (incomingLinks.has(target.href)) incomingLinks.set(target.href, incomingLinks.get(target.href) + 1);
    }
  }
  for (const [url, count] of incomingLinks) {
    const row = urlRows.find((candidate) => candidate.source_url === url);
    if (row) row.internal_link_count = count;
    if (url !== `${expectedOrigin}/` && count === 0) addIssue("critical", "orphan-sitemap-page", url, "No incoming link from another sitemap page");
  }

  for (const field of ["title", "description"]) {
    const seen = new Map();
    for (const page of pages) {
      const value = page.signals[field];
      if (!value) continue;
      if (seen.has(value)) addIssue("critical", `duplicate-${field}`, page.publicUrl, `Also used by ${seen.get(value)}`);
      else seen.set(value, page.publicUrl);
    }
  }

  const internalTargets = new Map();
  for (const page of pages) {
    for (const link of page.links) {
      if (pageExtension.test(link.url.pathname) || link.url.pathname.startsWith("/_next/")) continue;
      const publicTarget = new URL(`${link.url.pathname}${link.url.search}`, expectedOrigin).href;
      if (!internalTargets.has(publicTarget)) internalTargets.set(publicTarget, page.publicUrl);
    }
  }
  console.log(`Checking ${internalTargets.size} unique internal page targets...`);
  await mapLimit([...internalTargets], concurrency, async ([target, sourcePage]) => {
    try {
      const result = await crawl(requestUrl(target));
      const status = result.response?.status || 0;
      if (result.hops.length) addIssue("critical", "internal-link-redirect", sourcePage, `${target} redirects to ${result.finalUrl}`);
      if (status >= 400 || status === 0) addIssue("critical", "broken-internal-link", sourcePage, `${target} returned ${status}`);
    } catch (error) {
      addIssue("critical", "internal-link-request-failed", sourcePage, `${target}: ${error.message}`);
    }
  });

  const redirectCases = [
    ["/control-systems/", "/pa-system/"],
    ["/control-systems/pa-system/wired-gooseneck-paging-microphone/", "/pa-system/wired-gooseneck-paging-microphone/"],
    ["/control-systems/turnstile-gate-system", "/turnstile-gate/"],
    ["/led-display/indoor/p4-indoor-led-display/", "/led-display/indoor-led/p4-indoor-led-display-module/"],
    ["/led-display/indoor/p5-indoor-led-display/", "/led-display/indoor-led/"],
    ["/products/", "/led-display/"],
    ["/services/", "/services-support/"],
    ["/blog-and-case-study/", "/blog/"],
  ];
  await mapLimit(redirectCases, concurrency, ([source, destination]) => auditRedirect(source, new URL(destination, expectedOrigin).href));

  const missingResult = await crawl(new URL("/__seo-audit-missing-page-404/", baseUrl));
  if (missingResult.hops.length || missingResult.response?.status !== 404) {
    addIssue("critical", "invalid-404-response", `${expectedOrigin}/__seo-audit-missing-page-404/`, `Expected direct 404; found ${missingResult.response?.status || 0} after ${missingResult.hops.length} hop(s)`);
  }

  if (isProduction) {
    const hostCases = [
      ["http://sashabd.com/", "https://sashabd.com/"],
      ["http://www.sashabd.com/", "https://sashabd.com/"],
      ["https://www.sashabd.com/", "https://sashabd.com/"],
    ];
    await mapLimit(hostCases, 3, ([source, destination]) => auditRedirect(source, destination));
  }

  const mobileUa = "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36";
  const desktopUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";
  const [mobile, desktop] = await Promise.all([
    fetchRetry(new URL("/", baseUrl), { userAgent: mobileUa }).then((response) => response.text()),
    fetchRetry(new URL("/", baseUrl), { userAgent: desktopUa }).then((response) => response.text()),
  ]);
  const mobileCanonical = extractCanonicals(mobile, `${expectedOrigin}/`);
  const desktopCanonical = extractCanonicals(desktop, `${expectedOrigin}/`);
  if (mobileCanonical.join() !== desktopCanonical.join() || !/<h1\b/i.test(mobile) || !/<h1\b/i.test(desktop)) {
    addIssue("critical", "rendered-html-parity", `${expectedOrigin}/`, "Mobile and desktop canonical/H1 output differs or is missing");
  }

  const report = {
    generatedAt: new Date().toISOString(),
    auditedBaseUrl: baseUrl.origin,
    expectedCanonicalOrigin: expectedOrigin,
    summary: {
      sitemapUrlCount: sitemapUrls.length,
      crawledUrlCount: urlRows.length,
      internalTargetCount: internalTargets.size,
      redirectCaseCount: redirectRows.length,
      criticalIssueCount: issues.filter((issue) => issue.severity === "critical").length,
      warningCount: issues.filter((issue) => issue.severity === "warning").length,
    },
    issues,
    urls: urlRows,
    redirects: redirectRows,
    indexability: indexabilityRows,
  };

  await mkdir(path.dirname(outputFile), { recursive: true });
  await Promise.all([
    writeFile(outputFile, `${JSON.stringify(report, null, 2)}\n`),
    writeFile(path.join(path.dirname(outputFile), "url-audit.csv"), toCsv(urlRows, ["source_url", "status_code", "location", "redirect_chain", "final_url", "final_status", "canonical_url", "robots_meta", "x_robots_tag", "sitemap_inclusion", "internal_link_count", "outgoing_internal_link_count", "indexability", "content_type", "issue_classification", "recommended_action"])),
    writeFile(path.join(path.dirname(outputFile), "redirect-map.csv"), toCsv(redirectRows, ["source_url", "status_code", "destination_url", "hop_count", "final_url", "final_status", "classification", "recommended_action"])),
    writeFile(path.join(path.dirname(outputFile), "indexability-audit.csv"), toCsv(indexabilityRows, ["url", "status", "canonical", "robots_meta", "x_robots_tag", "indexable", "sitemap_included"])),
  ]);

  console.log(`Critical issues: ${report.summary.criticalIssueCount}`);
  console.log(`JSON report: ${outputFile}`);
  for (const issue of issues.slice(0, 30)) console.log(`[${issue.severity.toUpperCase()}] ${issue.code}: ${issue.url} - ${issue.message}`);
  if (issues.length > 30) console.log(`...and ${issues.length - 30} more issue(s); see JSON report.`);
  process.exitCode = report.summary.criticalIssueCount ? 1 : 0;
}

main().catch((error) => {
  console.error(`SEO audit failed: ${error.stack || error.message}`);
  process.exitCode = 1;
});
