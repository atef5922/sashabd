# Static image delivery

Run `npm run build` (or `npm run build:package`) for deployment. The prebuild
step generates WebP variants from all PNG, JPEG, WebP and AVIF files under
`public/assets`. The same step runs before `npm run dev`.

Deploy the complete `out` directory, including `out/optimized` and the hosting
configuration files. Variants and their lookup manifest are generated artifacts,
not committed source files. Original assets stay available for metadata, downloads,
and existing external URLs. SVG and animated assets bypass the raster pipeline.

Next Image uses the shared custom loader. Native image elements use
`responsiveImageProps`. Both preserve caller dimensions, fitting and layout.
CSS backgrounds use generated responsive custom properties.

Variants retain aspect ratio and transparency, never upscale, and use a conservative
WebP quality setting. Generated variants that no longer belong to the current
manifest are removed automatically, while original `/assets/` URLs stay unchanged
for metadata, structured data, downloads, and existing external links.
Their content-hashed filenames allow the existing one-year static asset cache
policy without serving an older image after the original changes.

Production builds clean the previous `out` directory before export. Static package
creation rejects nested ZIP archives and runs the exported-image audit before the
deploy archive is created.

Packaging also replaces deploy-only `.webp` originals with their validated largest
responsive master when that copy is smaller, preserving the public URL, format,
aspect ratio, source file, and a maximum width of 1920px. The one intentionally
direct-served hero remains untouched. PNG deploy copies are recompressed losslessly.

After adding/replacing an image during development, restart `npm run dev` to
regenerate the variants. Run `node scripts/audit-exported-images.mjs` after a build
to check every exported raster image, referenced variant and intrinsic width.

After deploying, purge the hosting HTML cache. Verify a new `/optimized/*.webp`
URL returns HTTP 200, `Content-Type: image/webp` and the configured static
`Cache-Control` header. In browser Network tools, verify smaller viewports choose
smaller `srcset` variants. Recheck real-network LCP after deployment; local asset
size reductions are not a measurement of production loading time.
