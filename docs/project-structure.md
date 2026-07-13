# Project Structure

## App Router

- `app/layout.tsx`
  Root layout and site-wide metadata.
- `app/led-display/*`
  Primary public catalog routes.
- `app/products/*`
  Secondary catalog routes kept as thin wrappers.
- `app/blog/*`
  Short blog URLs kept as wrappers.
- `app/blog-and-case-study/*`
  Legacy blog URLs kept as wrappers.

## Shared Route Implementations

- `modules/routes/catalog/`
  Shared implementations for product index, category pages, and product detail routes.
- `modules/routes/blog/`
  Shared implementations for blog listing and blog post pages.

Route files inside `app/` should stay thin where possible. Put page UI, metadata, and data logic in `modules/routes/*`, then re-export from route files.

## Shared UI and Data

- `components/common/`
  Shared site UI such as header, footer, and reusable content blocks.
- `components/products/`
  Product-specific UI components and filters.
- `components/ui/`
  Small generic UI pieces.
- `lib/`
  Catalog data, SEO helpers, site config, utilities, and blog content.

## Working Files

- `public/`
  Static assets.
- `temp/`
  Scratch work and exported research files.
- `tmp_*`
  Temporary root files are ignored and should not be used for permanent source code.
