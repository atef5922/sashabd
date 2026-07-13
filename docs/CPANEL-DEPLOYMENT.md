# Deploy to cPanel (static export) — safe checklist

This repo exports a static site to `out/` (`next.config.ts` uses `output: "export"`).

## 1) Build export
- Run `npm run build`
- Confirm these exist in `out/`:
  - `out/index.html`
  - `out/sitemap.xml`
  - `out/robots.txt`
  - `out/404.html`
  - `out/.htaccess`

## 2) Upload to cPanel
- cPanel → File Manager → open `public_html/`
- Upload **contents of** `out/` into `public_html/` (not the `out/` folder itself)
- Ensure `public_html/.htaccess` exists (upload may hide dotfiles; enable “Show Hidden Files”)

## 3) Cloudflare basics (new domain)
- SSL/TLS mode: **Full (strict)** (recommended)
- Caching: keep default unless you know you need custom rules

## 4) Verify after deploy
Check these URLs:
- `https://sashabd.com/` → 200
- `https://sashabd.com/sitemap.xml` → 200
- `https://sashabd.com/robots.txt` → 200
- `https://sashabd.com/led-display/` → 200

Confirm canonical + trailing slash:
- `/led-display` should 301 → `/led-display/`
- `/index.html` should 301 → `/`

