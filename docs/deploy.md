# Deployment (Static Export)

This project uses Next.js static export:

- `next.config.ts` has `output: "export"` and `trailingSlash: true`
- Production build output is the `out/` folder

## Build

```bash
npm ci
npm run build
```

## Upload to server (Apache / cPanel)

Upload **everything inside** `out/` to your server web root (commonly `public_html/`):

- `out/index.html`
- `out/_next/`
- `out/led-display/`, `out/control-systems/`, etc.
- `out/sitemap.xml` and `out/robots.txt`
- `out/.htaccess`

## Verify after upload

- `https://YOUR_DOMAIN/robots.txt`
- `https://YOUR_DOMAIN/sitemap.xml`
- Open a few old links (e.g. `/products/...`) to confirm they 301 to `/led-display/...`

## Notes

- Redirects + caching are handled by `public/.htaccess` (copied into `out/.htaccess` during export).
- If you use Cloudflare or another CDN, make sure HTML is not cached too aggressively (keep “Respect Existing Headers” enabled).
