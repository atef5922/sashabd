# Sasha Corporation website

Production website for Sasha Corporation's LED display, conference system, PA system, digital podium, interactive flat panel, turnstile, rental, project, and support services in Bangladesh.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` runs every test file in `tests/`.

## Static deployment

The project uses Next.js static export. `npm run build` generates the deployable site in `out/`.

- cPanel: upload the contents of `out/` to `public_html/`.
- Vercel: the repository includes `vercel.json` for staging no-index headers.

See `docs/CPANEL-DEPLOYMENT.md`, `docs/DOMAIN-MIGRATION.md`, and `docs/deploy.md` for deployment details.

## Project layout

- `app/`: public routes and route metadata
- `modules/routes/`: shared route implementations and catalog pages
- `components/`: reusable UI
- `lib/`: catalog data, SEO, pricing, and site helpers
- `public/`: referenced static assets only
- `tests/`: UI, catalog, inquiry, responsive, and SEO regression tests
- `scripts/`: build, audit, serving, and IndexNow utilities
