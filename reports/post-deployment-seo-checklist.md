# Post-Deployment SEO Checklist

## Deploy and cache

- [ ] Deploy the verified `out/` contents, including the hidden `.htaccess` file.
- [ ] Confirm the deployed build identifier/files match this audit branch.
- [ ] Clear CDN/origin cache only where required after the upload.
- [ ] Confirm HTTP and www variants redirect directly to `https://sashabd.com` in one permanent hop.
- [ ] Confirm legacy sources redirect directly to their documented canonical destination in one permanent hop.
- [ ] Run `npm.cmd run seo:audit:production` and require a zero exit code.

## Google Search Console

- [ ] Verify important final URLs with URL Inspection.
- [ ] Inspect the redirect destination, not only the redirect source.
- [ ] Resubmit `https://sashabd.com/sitemap.xml` in the canonical property.
- [ ] Use **Validate Fix** only for issues that were actually corrected (redirect-to-404, redirect chain, or stale internal discovery signals).
- [ ] Request indexing for a limited set of important final canonical pages.
- [ ] Monitor Page Indexing, HTTPS, Core Web Vitals, Enhancements, and Crawl Stats.
- [ ] Do not expect intentionally redirected source URLs to become indexable.
- [ ] Do not repeatedly request indexing for redirecting URLs.
- [ ] Treat HTTP, www, slashless, and documented legacy URLs under “Page with redirect” as expected when their one-hop destination is correct.

## Representative URL checks

- [ ] `https://sashabd.com/` returns 200 with one canonical.
- [ ] `https://sashabd.com/robots.txt` returns 200 and declares the canonical sitemap.
- [ ] `https://sashabd.com/sitemap.xml` returns 200 with XML content type.
- [ ] `/control-systems/turnstile-gate-system` redirects once to `/turnstile-gate/`.
- [ ] `/led-display/indoor/p4-indoor-led-display/` redirects once to the P4 module page, which returns 200.
- [ ] `/led-display/indoor/p5-indoor-led-display/` redirects once to the indoor category, which returns 200.
- [ ] A deliberately missing URL returns a real 404 without redirecting to the homepage.
