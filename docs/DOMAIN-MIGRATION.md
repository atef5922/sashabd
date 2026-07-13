# Domain Migration (leddisplay.com.bd → sashabd.com) — Cloudflare + cPanel/LiteSpeed

This project is a static Next.js export (`next.config.ts` uses `output: "export"`) with `trailingSlash: true`.

The safest domain-move setup is:
- Old domain serves **only** 301 redirects to the new domain (no 200 OK pages)
- New domain enforces a single canonical format (https + non-www + trailing slash)

## 1) Cloudflare: old domain → new domain (sitewide 301)

Create **two Redirect Rules** on the **old domain zone** (`leddisplay.com.bd`).

**Rule A (non-www)**
- Request URL: `https://leddisplay.com.bd/*`
- Target URL: `https://sashabd.com/${1}`
- Status: `301`
- Preserve query string: enabled

**Rule B (www)**
- Request URL: `https://www.leddisplay.com.bd/*`
- Target URL: `https://sashabd.com/${1}`
- Status: `301`
- Preserve query string: enabled

Notes:
- DNS for `www` should be **Proxied** (orange cloud), otherwise rules won’t run for that hostname.
- After enabling, verify a few old URLs return a single-hop 301 to the matching new URL path.

## 2) New domain canonicalization (origin-level)

On cPanel/LiteSpeed, place the project’s `.htaccess` in the web root (usually `public_html/`).
This repo already provides `public/.htaccess`, which is copied to the export output.

What it enforces:
- HTTPS + non-www canonical for `sashabd.com`
- `/index.html` → `/`
- Trailing slash for non-file URLs (matches `trailingSlash: true`)
- Long cache for static assets, revalidate for HTML, sitemap, robots

## 3) Google Search Console (after redirects are live)

### A) Submit sitemap (new domain)
- Property: `sashabd.com`
- Indexing → Sitemaps → submit `https://sashabd.com/sitemap.xml`

### B) Inspect key pages
Use URL Inspection for:
- `https://sashabd.com/`
- `https://sashabd.com/led-display/`

Confirm “URL is on Google” and canonical points to `https://sashabd.com/...`.

### C) Change of Address (recommended)
- Property: `leddisplay.com.bd`
- Settings → Change of address → select `sashabd.com` → Validate & Update

If “Select new site” is disabled, ensure the same Google account is a **verified owner** of both properties.

## 4) What NOT to do
- Don’t keep the old domain serving the same pages with 200 OK.
- Don’t use 302/JS redirects for a domain move (use 301).
- Don’t mix URL formats (www/non-www, http/https, slash/no-slash) without canonical redirects.

