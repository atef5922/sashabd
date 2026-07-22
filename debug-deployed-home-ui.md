# [OPEN] deployed-home-ui

## Symptom
- Server-e uploaded static build-er por home page UI broken dekhacche.
- User screenshot-e giant logo overlay/abnormal home render dekha jacche.
- User expectation: upload-er por full site, especially home navbar/home UI, stable and error-free thakbe.

## Scope
- Production static export from `out.zip`
- Home page first priority
- Possible deploy/header/cache/static asset issue

## Initial Hypotheses
- H1: Deployed page old HTML + new assets or new HTML + old assets mix hocche, jar jonno layout break hocche.
- H2: Static asset path/CSS/JS file server-e thik moto serve hocche na, jar jonno homepage unstyled/broken dekhacche.
- H3: Home page-e client hydration mismatch or breakpoint-specific header logic deployed build-e unexpected render dicche.
- H4: Server/CDN cache policy HTML/CSS/JS-er inconsistent freshness create korche.
- H5: `out.zip` deploy-er por server rewrite/header behavior live env-e local preview theke alada result dicche.

## Evidence Log
- Live production homepage entered Next.js client error fallback instead of rendering actual UI.
- Browser/runtime evidence showed:
  - `/_next/static/chunks/ad46aab93420e8bb.js` -> `404`
  - `/_next/static/chunks/8ee915343ff55336.css` -> `404`
- Error observed: `ChunkLoadError` on homepage.
- Local fresh build contains both missing live files inside:
  - `out/_next/static/chunks/ad46aab93420e8bb.js`
  - `out/_next/static/chunks/8ee915343ff55336.css`
- Current local `out.zip` also contains both files.
- Conclusion: production failure is caused by deploy inconsistency / incomplete extraction / stale asset mismatch, not by a compile-time app error.

## Next Step
- Harden package generation so broken/incomplete deploy packages are caught before upload
- Regenerate a fully validated fresh `out.zip`

## Hypothesis Status
- H1: Confirmed. Old/new deploy mismatch is consistent with missing live chunk/CSS.
- H2: Partially confirmed. Live server is not serving required files because they are absent after deploy.
- H3: Rejected. No evidence of home page business-logic runtime bug causing the production failure.
- H4: Plausible contributing factor, but not primary blocker in this incident.
- H5: Confirmed. Live deploy behavior differs from local validated static preview.
