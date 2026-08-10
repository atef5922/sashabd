#!/usr/bin/env node

import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";

const portArg = process.argv.find((arg) => arg.startsWith("--port="));
const port = Number(portArg?.split("=")[1] || 4173);
const root = path.resolve("out");
const htaccess = readFileSync(path.join(root, ".htaccess"), "utf8");
const redirectRules = [...htaccess.matchAll(/^\s*RewriteRule\s+([^\s]+)\s+([^\s]+)\s+\[R=(301|308),L\]\s*$/gim)]
  .filter((match) => match[1] !== "^" && !match[1].includes("index\\.html"))
  .map((match) => ({ pattern: new RegExp(match[1], "i"), destination: match[2], status: Number(match[3]) }));

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"], [".ico", "image/x-icon"],
  [".js", "application/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".png", "image/png"],
  [".svg", "image/svg+xml"], [".txt", "text/plain; charset=utf-8"], [".webp", "image/webp"], [".xml", "application/xml; charset=utf-8"],
]);

function redirectFor(url) {
  if (url.pathname === "/" && /^m=[^&]+$/i.test(url.searchParams.toString())) return "/";
  if (/\/index\.html$/i.test(url.pathname)) return url.pathname.replace(/index\.html$/i, "");
  const relative = url.pathname.replace(/^\/+/, "");
  for (const rule of redirectRules) {
    if (rule.pattern.test(relative)) return { location: relative.replace(rule.pattern, rule.destination), status: rule.status };
  }
  if (url.pathname !== "/" && !url.pathname.endsWith("/") && !/\.[a-z0-9]{1,8}$/i.test(url.pathname)) {
    return { location: `${url.pathname}/${url.search}`, status: 301 };
  }
  return null;
}

function fileFor(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidate =
    decoded === "/" ? path.join(root, "index.html") : decoded.endsWith("/") ? path.join(root, decoded, "index.html") : path.join(root, decoded);
  const resolved = path.resolve(candidate);
  if (resolved.startsWith(root) && existsSync(resolved) && statSync(resolved).isFile()) return resolved;

  const parts = decoded.split("/");
  const basename = parts.pop() || "";
  const rscMatch = basename.match(/^(__next\.[^.]+)\.(.+\.txt)$/);
  if (!rscMatch) return null;

  const restBase = rscMatch[2].slice(0, -".txt".length);
  const restParts = restBase.split(".");
  const fileName = `${restParts.pop()}.txt`;
  const rscCandidate = path.join(root, ...parts, rscMatch[1], ...restParts, fileName);
  const rscResolved = path.resolve(rscCandidate);
  if (!rscResolved.startsWith(root) || !existsSync(rscResolved) || !statSync(rscResolved).isFile()) return null;
  return rscResolved;
}

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || `127.0.0.1:${port}`}`);
  const redirect = redirectFor(url);
  if (redirect) {
    const location = typeof redirect === "string" ? redirect : redirect.location;
    response.writeHead(typeof redirect === "string" ? 301 : redirect.status, { Location: location });
    response.end();
    return;
  }

  const file = fileFor(url.pathname);
  if (!file) {
    const errorFile = path.join(root, "404.html");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    if (request.method === "HEAD") response.end();
    else createReadStream(errorFile).pipe(response);
    return;
  }

  response.writeHead(200, { "Content-Type": contentTypes.get(path.extname(file).toLowerCase()) || "application/octet-stream" });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Static production export: http://127.0.0.1:${port}`);
});
