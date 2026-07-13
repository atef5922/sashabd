This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://sashabd.com](https://sashabd.com) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on cPanel (static export)

This repo is configured for static export (`next.config.ts` uses `output: "export"`).

- Build: `npm run build` (outputs to `out/`)
- Upload: upload the **contents** of `out/` to your cPanel `public_html/`

See `docs/CPANEL-DEPLOYMENT.md` and `docs/DOMAIN-MIGRATION.md` for the full checklist (Cloudflare redirects, `.htaccess`, Search Console).

## IndexNow (Bing) submissions

This repo is configured for static export (`next.config.ts` uses `output: "export"`), so IndexNow submissions must be done via a script (not an API route).

Run (example using an Ahrefs export):

```bash
npm run indexnow:submit -- --host https://sashabd.com --key YOUR_INDEXNOW_KEY --ahrefs "C:\path\to\ahrefs_export.csv" --write-key-file --dry-run
```

Remove `--dry-run` to actually submit URLs to IndexNow.
