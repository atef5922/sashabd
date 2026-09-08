# Public asset structure

Runtime images and logos live under `public/assets/` and are grouped by subject:

- `about/` and `blog/`: editorial page media
- `brand/sasha/`: Sasha Corporation identity assets
- `brands/`: partner and product-brand logos
- `clients/`: customer and institution logos
- `conference-system/`: landing, package, project, and product media; brand products are grouped under `products/brands/{bosch,cmx,honeywell,spon,toa}/`
- `control-systems/`: digital podium, interactive flat panel, PA, and turnstile media
- `home/`: homepage-specific media
- `led-display/`: indoor, outdoor, rental, accessory, controller, receiving-card, and power-supply media
- `projects/`: project and case-study visuals
- `shared/`: site-wide fallback media

Keep `favicon.ico`, `favicon.png`, `.htaccess`, `_headers`, and `_redirects` at the root of `public/`.

Directory names use lowercase kebab-case. Product filenames retain their established names so catalog identity and image metadata remain stable.

Legacy `/images/...` and root brand-image URLs are redirected in both `public/.htaccess` and `public/_redirects`. New code must reference `/assets/...` directly.

## Map source

`home/nationwide/bangladesh-eight-divisions-map.svg` is adapted from
[`Bangladesh divisions english.svg`](https://commons.wikimedia.org/wiki/File:Bangladesh_divisions_english.svg),
created by Wikimedia Commons contributor Nafsadh and released under CC0/public domain.
