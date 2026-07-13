# Performance (Ahrefs “Slow page”)

If Ahrefs reports **Slow page** with very high **Time to first byte (TTFB)** (for example 5,000–18,000 ms) while the HTML size is small (for example 15–20 KB), this is almost always a **hosting / caching** issue (network latency, no CDN edge cache, origin load), not a React/Next.js page-code issue.

This repo is configured for a static export:
- `next.config.ts` → `output: "export"`
- `next.config.ts` → `trailingSlash: true`

## What to do (Cloudflare + Origin hosting)

### 1) Ensure Cloudflare is proxying the site
- DNS record for `sashabd.com` should be **Proxied** (orange cloud).
- Enable **Brotli** and **HTTP/3** (QUIC) in Cloudflare.

### 2) Cache HTML at the edge (recommended)
Create a **Cache Rule** on Cloudflare to cache HTML pages:
- If: `http.host eq "sashabd.com"`
- And: path does **not** match static files (e.g. does not contain a `.`)
- Then: **Cache everything** (Edge TTL: e.g. 1 day or 7 days)

This reduces repeated TTFB for bots and audits because Cloudflare serves the HTML from the nearest edge POP.

### 3) Keep static assets cached long-term
For JS/CSS/images you want long cache:
- JS/CSS: 1 year `immutable`
- Images: 1 year (or at least 30 days)

If you deploy on a platform that supports a `_headers` file (Cloudflare Pages / Netlify), this repo includes:
- `public/_headers`

Make sure your deployment copies `public/` into the published output.

### 4) Origin checks (CyberPanel/OpenLiteSpeed)
If Cloudflare is not caching HTML (or you bypass Cloudflare), verify on origin:
- Gzip/Brotli enabled
- HTTP/2 enabled
- Keep-Alive enabled
- Server is not CPU/RAM constrained during crawls

## Validate
After enabling caching:
- Re-run Ahrefs crawl.
- Compare TTFB for `/blog/`, `/services/`, and a few deep product/blog URLs.

