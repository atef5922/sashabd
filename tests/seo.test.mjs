import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
// Keep the source-oriented assertions stable across Windows and POSIX checkouts.
const read = (file) => readFileSync(path.join(root, file), "utf8").replaceAll("\r\n", "\n");
const htaccess = read("public/.htaccess");
const redirects = read("public/_redirects");
const occurrences = (source, text) => source.split(text).length - 1;

function sectionBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  assert.notEqual(startIndex, -1, `${start} section start must exist`);
  const endIndex = source.indexOf(end, startIndex + start.length);
  assert.notEqual(endIndex, -1, `${end} section boundary must exist`);
  return source.slice(startIndex, endIndex);
}

function sourceFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const full = path.join(directory, entry);
    if (statSync(full).isDirectory()) files.push(...sourceFiles(full));
    else if (/\.(?:ts|tsx|js|jsx|mjs)$/.test(entry)) files.push(full);
  }
  return files;
}

test("canonical host and protocol normalize directly to HTTPS non-www", () => {
  const wwwRule = "RewriteRule ^ https://sashabd.com%{REQUEST_URI} [R=301,L]";
  const httpsRule = "RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]";
  assert.match(htaccess, /RewriteCond %\{HTTP_HOST\} \^www\\\.sashabd\\\.com\$ \[NC\]/);
  assert.ok(htaccess.includes(wwwRule));
  assert.ok(htaccess.indexOf(wwwRule) < htaccess.indexOf(httpsRule), "www normalization must precede HTTPS normalization for one-hop HTTP+www redirects");
});

test("legacy redirects precede trailing-slash normalization and use one direct destination", () => {
  const slash = "RewriteCond %{REQUEST_URI} !/$";
  for (const legacy of [
    "RewriteRule ^control-systems/?$ /pa-system/ [R=301,L]",
    "RewriteRule ^control-systems/pa-system/?$ /pa-system/ [R=301,L]",
    "RewriteRule ^control-systems/digital-podium/?$ /digital-podium/ [R=301,L]",
    "RewriteRule ^control-systems/turnstile-gate-system/?$ /turnstile-gate/ [R=301,L]",
    "RewriteRule ^led-display/digital-led-display/?$ /led-display/ [R=301,L]",
  ]) {
    assert.ok(htaccess.includes(legacy));
    assert.ok(htaccess.indexOf(legacy) < htaccess.lastIndexOf(slash));
  }
  assert.match(htaccess, /\^control-systems\/pa-system\/\(\[\^\/\]\+\)\/\?\$/);
});

test("GSC m-query alternates are stripped before trailing-slash normalization", () => {
  const rootRule = "RewriteRule ^ https://sashabd.com/? [R=301,L]";
  const pathRule = "RewriteRule ^ %{REQUEST_URI}? [R=301,L]";
  const slashRule = "# Enforce trailing slash for non-file URLs";

  assert.equal(occurrences(htaccess, "RewriteCond %{QUERY_STRING} ^m=[^&]+$ [NC]"), 2);
  assert.ok(htaccess.indexOf(rootRule) < htaccess.indexOf(slashRule));
  assert.ok(htaccess.indexOf(pathRule) < htaccess.indexOf(slashRule));
});

test("known broken indoor redirects now land on valid canonical targets", () => {
  assert.match(htaccess, /p4-indoor-led-display\/\?\$ \/led-display\/indoor-led\/p4-indoor-led-display-module\/ \[R=301,L\]/);
  assert.match(htaccess, /p5-indoor-led-display\/\?\$ \/led-display\/indoor-led\/ \[R=301,L\]/);
  assert.doesNotMatch(htaccess, /p1-(?:77|35)-indoor-led-display/);
  assert.doesNotMatch(redirects, /digital-led-display-guide\/:splat/);
});

test("canonical URL construction is centralized", () => {
  const site = read("lib/site.ts");
  const seo = read("lib/seo.ts");
  assert.match(site, /canonicalOrigin: "https:\/\/sashabd\.com"/);
  assert.match(seo, /export function canonicalPath/);
  assert.match(seo, /export function absoluteUrl/);
  assert.match(seo, /\.toLowerCase\(\)/);
  assert.ok(seo.includes('pathname.replace(/\\/+$/, "")'));
});

test("sitemap uses canonical utility and stable last-modified values", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /import \{ absoluteUrl \}/);
  assert.doesNotMatch(sitemap, /const now = new Date\(\);/);
  assert.match(sitemap, /new Date\("2026-08-01T00:00:00\.000Z"\)/);
});

test("production robots.txt remains crawlable and Vercel staging is blocked", () => {
  const robots = read("app/robots.ts");
  const layout = read("app/layout.tsx");
  const seo = read("lib/seo.ts");
  const deployment = read("lib/deployment.ts");
  const headers = read("public/_headers");
  const stagingBranch = sectionBetween(robots, "if (isVercelStagingBuild())", "\n\n  return {");
  const productionBranch = robots.slice(robots.indexOf("\n\n  return {") + 2);

  assert.match(deployment, /process\.env\.VERCEL === "1"/);
  assert.match(stagingBranch, /disallow: "\/"/);
  assert.match(productionBranch, /allow: "\/"/);
  assert.match(productionBranch, /absoluteUrl\("\/sitemap\.xml"\)/);
  assert.match(layout, /const allowIndexing = !isVercelStagingBuild\(\)/);
  assert.match(seo, /const allowIndexing = index && !isVercelStagingBuild\(\)/);
  assert.doesNotMatch(headers, /^\/\*\.txt\s*\r?\n\s*X-Robots-Tag: noindex/m);
});

test("Vercel applies a global staging noindex response header", () => {
  const config = JSON.parse(read("vercel.json"));
  const wildcard = config.headers.find((entry) => entry.source === "/(.*)");
  const robotsHeader = wildcard?.headers.find((header) => header.key.toLowerCase() === "x-robots-tag");
  const ledSources = sourceFiles(path.join(root, "app", "led-display"));

  assert.equal(robotsHeader?.value, "noindex, nofollow");
  for (const file of ledSources) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /robots:\s*\{\s*index:\s*true,\s*follow:\s*true\s*\}/);
  }
});

test("public source contains no hardcoded HTTP/www or legacy navigation URLs", () => {
  const files = ["app", "components", "lib", "modules"].flatMap((directory) => sourceFiles(path.join(root, directory)));
  const violations = [];
  for (const file of files) {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    if (/^app\/(?:control-systems|products|indoor-led|rental-display|services|blog-and-case-study)\//.test(relative)) continue;
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(/href\s*[:=]\s*["'`]([^"'`]+)["'`]/g)) {
      const href = match[1];
      if (/^http:\/\/(?:www\.)?sashabd\.com|^https:\/\/www\.sashabd\.com/.test(href)) violations.push(relative);
      if (/^\/(?:control-systems|products|indoor-led|rental-display|services)(?:\/|$)/.test(href)) violations.push(relative);
    }
  }
  assert.deepEqual([...new Set(violations)], []);
});

test("responsive header search instances use unique accessible IDs", () => {
  const header = read("components/common/Header.tsx");
  const search = read("components/common/HeaderSearch.tsx");

  assert.match(header, /inputId="header-search-mobile"/);
  assert.match(header, /inputId="header-search-desktop"/);
  assert.match(search, /htmlFor=\{inputId\}/);
  assert.match(search, /id=\{inputId\}/);
  assert.match(search, /const resultsId = `\$\{inputId\}-results`/);
  assert.doesNotMatch(search, /id="header-search(?:-results)?"/);
});

test("Conference navigation exposes one accessible desktop mega menu and mobile disclosure", () => {
  const header = read("components/common/Header.tsx");
  const navigation = read("app/conference-system/navigation.ts");
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const layout = read("app/layout.tsx");
  const navRegistry = sectionBetween(header, "const nav: NavItem[]", "function cn");
  const expectedCategoryRoutes = [
    "audio-conference-system",
    "digital-conference-system",
    "video-conference-system",
    "paperless-conference-system",
    "wired-conference-system",
    "wireless-conference-system",
    "chairman-unit",
    "delegate-unit",
    "control-unit",
    "conference-dsp",
    "conference-amplifier",
    "complete-package",
  ];
  const expectedBrandRoutes = ["bosch", "toa", "spon", "cmx"];

  assert.equal(occurrences(navRegistry, 'label: "Conference System"'), 1);
  assert.match(navRegistry, /type: "conference", href: "\/conference-system\/"/);
  assert.doesNotMatch(navRegistry, /type: "link", href: "\/conference-system\/"/);
  assert.match(header, /function ConferenceDesktopNavItem/);
  assert.match(header, /data-conference-desktop-nav/);
  assert.match(header, /aria-label="Conference System navigation"/);
  assert.match(header, /aria-expanded=\{isOpen\}/);
  assert.match(header, /event\.key !== "Escape"/);
  assert.match(header, /closeOnOutsidePointer/);
  assert.match(header, /onMouseEnter=\{\(\) => setIsOpen\(true\)\}/);
  assert.match(header, /active=\{activeHref\(item\.href\)\}/);
  assert.match(header, /aria-controls="mobile-conference-navigation"/);
  assert.match(header, /All Conference Systems/);

  assert.equal((navigation.match(/^    id: "(?:system|component|package|brand)",/gm) ?? []).length, 4);
  assert.match(navigation, /conferenceCategoryConfigs/);
  assert.match(navigation, /category\.group === "system" \|\| category\.group === "connection"/);
  assert.match(navigation, /category\.group === "component"/);
  assert.match(navigation, /category\.group === "package"/);
  assert.match(navigation, /conferenceBrandConfigs/);
  assert.match(navigation, /filter\(\(brand\) => brand\.featured\)/);
  assert.match(navigation, /`\/conference-system\/\$\{category\.slug\}\/`/);
  assert.match(navigation, /`\/conference-system\/brands\/\$\{brand\.slug\}\/`/);
  for (const slug of expectedCategoryRoutes) {
    assert.match(taxonomy, new RegExp(`slug: "${slug}"`));
  }
  for (const slug of expectedBrandRoutes) {
    assert.match(taxonomy, new RegExp(`slug: "${slug}"`));
  }
  const brandRegistry = sectionBetween(taxonomy, "export const conferenceBrandConfigs", "export const RESERVED_CONFERENCE_PRODUCT_SLUGS");
  assert.equal((brandRegistry.match(/featured: true/g) ?? []).length, 4);
  assert.match(navigation, /href: "\/conference-system\/brands\/"/);
  assert.match(layout, /conferenceNavigationGroups=\{conferenceNavigationGroups\}/);
  assert.match(layout, /conferenceBrandsHubLink=\{conferenceBrandsHubLink\}/);

  assert.match(navRegistry, /type: "dropdown",\s*href: "\/led-display\/"/);
  for (const href of ["/", "/pa-system/", "/turnstile-gate/", "/about/", "/contact/"]) {
    assert.ok(navRegistry.includes(`href: "${href}"`), `${href} must remain in main navigation`);
  }
});

test("Conference desktop mega menu keeps four groups with a package CTA column", () => {
  const header = read("components/common/Header.tsx");
  const megaMenu = sectionBetween(header, "function ConferenceDesktopNavItem", "export default function Header");

  assert.match(header, /const CONFERENCE_MENU_COLUMN_ORDER = \["system", "component", "brand"\] as const/);
  assert.match(megaMenu, /CONFERENCE_MENU_COLUMN_ORDER\.map\(\(id\) => groupsById\.get\(id\)\)/);
  assert.match(megaMenu, /groupsById\.get\("package"\)/);
  assert.match(megaMenu, /const packageItem = packageGroup\?\.items\[0\]/);

  assert.match(megaMenu, /href=\{item\.href\}/);
  assert.match(megaMenu, /href=\{brandsHubLink\.href\}/);
  assert.match(megaMenu, /href=\{packageItem\.href\}/);
  assert.doesNotMatch(megaMenu, /href="\/conference-system\/complete-package\/"/);

  assert.match(megaMenu, /Plan a complete room-based conference system\./);
  assert.match(megaMenu, /Explore Packages/);
  assert.equal(occurrences(megaMenu, "<MenuSectionHeading"), 2);
  assert.match(megaMenu, /className=\{menuCardClass\(isItemCurrent\(item\.href\)\)\}/);
});

test("Conference section headings carry a titled icon for every group", () => {
  const header = read("components/common/Header.tsx");
  const navigation = read("app/conference-system/navigation.ts");

  // One icon per group id, rendered through the shared heading.
  assert.match(header, /const CONFERENCE_SECTION_ICONS: Record<ConferenceNavigationGroup\["id"\], React\.ReactNode>/);
  for (const groupId of ["system", "component", "brand", "package"]) {
    assert.match(header, new RegExp(`^  ${groupId}: \\(`, "m"), `${groupId} needs a section icon`);
  }
  assert.equal(occurrences(header, "<MenuSectionHeading"), 3, "two desktop columns plus the mobile accordion");
  assert.equal(occurrences(header, "CONFERENCE_SECTION_ICONS[group.id]"), 2);
  assert.match(header, /stroke-\[#FD6900\]/);

  // Titles read as one consistent set, not a mix of "Shop by X" and bare nouns.
  for (const title of ["Systems & Connections", "Core Components", "Featured Brands", "Complete Setup"]) {
    assert.match(navigation, new RegExp(`title: "${title}"`), `${title} must be the group title`);
  }
  assert.doesNotMatch(navigation, /title: "Shop by /);
});

test("desktop About dropdown uses its canonical compact variant", () => {
  const header = read("components/common/Header.tsx");

  assert.match(header, /href: "\/about\/",\s*label: "About"/);
  assert.match(header, /const isAboutDropdown = item\.href === "\/about\/"/);
  assert.match(header, /isAboutDropdown \? "w-\[264px\]" : "w-\[306px\]"/);
});

test("LED display, About, and Conference submenus share one card design system", () => {
  const header = read("components/common/Header.tsx");
  const megaMenu = sectionBetween(header, "function ConferenceDesktopNavItem", "export default function Header");
  const ledAbout = sectionBetween(header, "// hover dropdown", 'aria-label="Call now"');

  // One card, one panel shell, one section heading - defined once.
  assert.match(header, /function menuCardClass\(isCurrent: boolean\)/);
  assert.match(header, /function MenuCardChevron\(\{ isCurrent \}/);
  assert.match(header, /const MENU_PANEL_CLASS = cn\(/);
  assert.match(header, /const MENU_SECTION_HEADING_CLASS =/);
  assert.match(header, /const MENU_CARD_CURRENT_CLASS = "bg-orange-50 text-\[#C2410C\] before:opacity-100"/);

  // Every desktop submenu renders through them.
  assert.equal(occurrences(header, "className={menuCardClass("), 3);
  assert.equal(occurrences(header, "<MenuCardChevron isCurrent="), 3);
  assert.equal(occurrences(header, "MENU_PANEL_CLASS,"), 3);
  assert.equal(occurrences(header, "className={MENU_SECTION_HEADING_CLASS}"), 1);
  assert.ok(megaMenu.includes("menuCardClass("), "Conference cards use the shared card");
  assert.ok(ledAbout.includes("menuCardClass("), "LED/About cards use the shared card");

  // Current page is marked and announced in every menu (3 desktop + 3 mobile lists).
  assert.equal(occurrences(header, "aria-current={"), 8);

  // The off-brand cyan accent, the lift, and the hover-delaying stagger are gone.
  for (const removed of [
    "from-cyan-600",
    "via-sky-600",
    "to-indigo-600",
    "from-cyan-300/35",
    "hover:border-sky-300/70",
    "hover:scale-[1.01]",
    "hover:-translate-y-0.5",
    "transitionDelay",
    "bg-clip-text",
    "shadow-[0_28px_80px_rgba(15,23,42,0.20)]",
  ]) {
    assert.ok(!header.includes(removed), `${removed} must be gone from the header`);
  }

  // Dropdowns open for keyboard users, not just on hover.
  assert.match(header, /group-focus-within:visible/);

  // One orange scale across desktop and mobile.
  for (const legacyHex of ["#C84B00", "#FFF3EB", "#F56605"]) {
    assert.ok(!header.includes(legacyHex), `${legacyHex} must use the shared orange scale`);
  }
});

test("custom 404 and dynamic metadata implementations exist", () => {
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(read("app/not-found.tsx"), /404 Error/);
  for (const file of [
    "modules/routes/catalog/control-systems/pa-system/product-page.tsx",
    "modules/routes/catalog/indoor/product-page.tsx",
    "app/conference-system/[slug]/page.tsx",
  ]) {
    const content = read(file);
    assert.match(content, /generateMetadata/);
    assert.match(content, /buildProductMetadata/);
    assert.match(content, /generateStaticParams/);
  }
});

test("static export RSC txt rewrites resolve dotted payload requests", () => {
  assert.match(htaccess, /RewriteRule \^\(\.\*\/\)\?\(__next\\\.\[\^.\]\+\)\\\.\(\.\+\\\.txt\)\$ \$1\$2\/\$3 \[N\]/);
  assert.match(htaccess, /RewriteRule \^\(\.\*\/__next\\\.\[\^\/\]\+\/\.\+\)\\\.\(\[\^\/.\]\+\\\.txt\)\$ \$1\/\$2 \[N\]/);
});

test("LED display products use one responsive card render path", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const productGrid = sectionBetween(
    source,
    "{/* PRODUCTS GRID */}",
    '<section className={ledInformationSectionClass} aria-labelledby="led-full-product-list-heading">',
  );

  assert.equal((productGrid.match(/desktopPagedProducts\.map\(\(product, index\)/g) ?? []).length, 1);
  assert.equal((productGrid.match(/desktopPagedProducts\.map\(renderCatalogCard\)/g) ?? []).length, 1);
  assert.match(productGrid, /<LedExplorerProductCard[\s\S]*?key=\{product\.id\}[\s\S]*?product=\{product\}/);
  assert.match(source, /data-product-id=\{product\.id\}/);
});

test("LED explorer cards provide accessible Quick View and three-product Compare tools", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const tools = read("components/products/LedProductCardTools.tsx");
  const sharedCard = read("components/products/ProductGridCard.tsx");

  assert.match(source, /LedProductQuickView product=\{toolProduct\}/);
  assert.match(source, /aria-pressed=\{compareSelected\}/);
  assert.match(source, /compareSelected=\{ledCompareIds\.includes\(product\.id\)\}/);
  assert.match(source, /You can compare up to 3 products\./);
  assert.match(source, /<LedProductCompareTray/);
  assert.match(tools, /aria-haspopup="dialog"/);
  assert.match(tools, /role="dialog"/);
  assert.match(tools, /aria-modal="true"/);
  assert.match(tools, /event\.key === "Escape"/);
  assert.match(tools, /FOCUSABLE_SELECTOR/);
  assert.match(tools, /Quick View/);
  assert.match(tools, /Compare Selected Products/);
  assert.match(tools, /Array\.from\(\{ length: 3 - products\.length \}/);
  assert.doesNotMatch(sharedCard, /LedProductQuickView|LedProductCompareTray/);
});

test("Conference System renders one responsive semantic content set", () => {
  const source = read("app/conference-system/page.tsx");
  const listing = sectionBetween(source, '<section id="conference-products-heading"', 'aria-labelledby="what-is-conference-system"');

  assert.equal(occurrences(listing, "<ConferenceProductExplorer"), 1);
  assert.equal(occurrences(source, "renderConferenceProductCard"), 0, "card rendering lives in the explorer only");
  assert.equal(occurrences(source, "mobileProductRows"), 0);
  assert.equal(occurrences(source, "<FaqAccordion"), 1);
  assert.equal(occurrences(source, '\"@type\": \"FAQPage\"'), 1);
  assert.equal(occurrences(source, '<section id="conference-system-price"'), 1);
  assert.equal(occurrences(source, '<h1 id="conference-hero-heading"'), 1);
  assert.match(source, /const PAGE_TITLE = "Conference System Price in Bangladesh 2026";/);
  assert.match(source, /const META_TITLE = `\$\{PAGE_TITLE\} \| Sasha`;/);
  assert.match(source, /const META_DESCRIPTION =[\s\S]*?"Conference system price in Bangladesh for Bosch, TOA, SPON & CMX\. Compare wired, wireless, digital and hybrid systems with BOQ, installation and support\.";/);
  assert.match(source, /title: META_TITLE/);
  assert.equal(occurrences(source, "description: META_DESCRIPTION"), 3);
  assert.match(source, /alternates: \{ canonical: "\/conference-system\/" \}/);
  assert.doesNotMatch(source, /\bkeywords\s*:/);
  assert.match(source, /Compare Bosch, TOA, SPON &amp; CMX conference systems in Bangladesh with price guidance for wired, wireless, digital and hybrid meeting-room solutions\./);
  assert.match(source, /aria-labelledby="conference-hero-heading"/);

  for (const heading of [
    "Choose Your Conference Setup",
    "Popular Conference System Packages",
    "Conference System Component Price Guide",
    "Complete Hybrid & Video Conference Integration",
    "Recent Conference System Projects in Bangladesh",
    "Conference System Engineering & Project Support",
    "What is a Conference System?",
    "Conference System Product Price List in Bangladesh",
    "Commercial Confidence",
    "Conference System Brands & Support",
    "Frequently Asked Questions",
    "Ready to Build Your Perfect Conference Room?",
  ]) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.equal(
      (source.match(new RegExp(`<h2[^>]*>[\\s\\S]*?${escaped}[\\s\\S]*?</h2>`, "g")) ?? []).length,
      1,
      `${heading} must render from one H2 source`,
    );
  }
});

test("Conference pricing sections keep separate intent and use catalog-backed component ranges", () => {
  const source = read("app/conference-system/page.tsx");

  assert.equal(occurrences(source, "Conference System Component Price Guide"), 1);
  assert.equal(occurrences(source, "Conference System Product Price List in Bangladesh"), 1);
  assert.equal(occurrences(source, ">Conference System Price in Bangladesh</h2>"), 0);
  assert.match(source, /function getPublishedConferencePriceRange/);
  assert.match(source, /conferenceSystemCatalog\s*\.filter\(matchProduct\)/);
  assert.match(source, /request-price products are excluded/);
  assert.match(source, /Indicative equipment estimates are based on each listed configuration/);
  assert.doesNotMatch(source, /price:\s*"৳\s*45,000/);
});

test("Conference hub removes superseded chooser, project, and service sections", () => {
  const source = read("app/conference-system/page.tsx");

  assert.doesNotMatch(source, /Types of Conference Systems/);
  assert.doesNotMatch(source, /Choose Your Conference System/);
  assert.doesNotMatch(source, /Conference System Packages by Room Size/);
  assert.doesNotMatch(source, /Audio vs Video Conference System/);
  assert.doesNotMatch(source, /Conference System Project Planning/);
  assert.doesNotMatch(source, /Why Choose Sasha Corporation for Conference Systems in Bangladesh/);
  assert.doesNotMatch(source, /Our Successful Projects/);
  assert.doesNotMatch(source, /Why Choose Sasha Corporation\?/);
  assert.doesNotMatch(source, /Key Benefits of a Professional Conference System/);
  assert.match(source, /href="#popular-conference-packages"/);
});

test("Conference definition and product price sections keep stable order and uniquely labelled H2 headings", () => {
  const source = read("app/conference-system/page.tsx");
  const sections = [
    { label: "what-is-conference-system", heading: "what-is-conference-system" },
    { label: "conference-system-price-heading", heading: "conference-system-price-heading" },
  ];
  const indices = sections.map(({ label }) => source.indexOf(`aria-labelledby="${label}"`));

  assert.ok(indices.every((index) => index >= 0), "each informational section must exist");
  assert.ok(indices.every((index, position) => position === 0 || index > indices[position - 1]), "informational sections must keep their decision-friendly order");
  for (const { label, heading } of sections) {
    assert.equal(occurrences(source, `aria-labelledby="${label}"`), 1, `${label} must label one section`);
    assert.equal(occurrences(source, `<h2 id="${heading}"`), 1, `${heading} must identify one H2`);
  }
});

test("Conference definition keeps one concise visible explanation with the core system entities", () => {
  const source = read("app/conference-system/page.tsx");
  const definitionSection = sectionBetween(
    source,
    'aria-labelledby="what-is-conference-system"',
    'aria-labelledby="conference-system-price-heading"',
  );

  assert.equal(
    occurrences(definitionSection, "A conference system is a professional audio communication solution"),
    1,
    "the primary definition must have a single source",
  );
  assert.match(definitionSection, /chairman units/i);
  assert.match(definitionSection, /delegate units/i);
  assert.match(definitionSection, /control unit/i);
  assert.doesNotMatch(definitionSection, /Meeting room audio solution/);
});

test("Conference product price list remains a semantic catalog-backed comparison table", () => {
  const source = read("app/conference-system/page.tsx");
  const priceSection = sectionBetween(
    source,
    'aria-labelledby="conference-system-price-heading"',
    'aria-labelledby="conference-commercial-confidence"',
  );

  assert.equal(occurrences(priceSection, "<table"), 1);
  assert.equal(occurrences(priceSection, "<caption"), 1);
  assert.match(priceSection, /Conference products with published fixed or indicative range prices/);
  assert.match(priceSection, /conferencePriceTableProducts\.map/);
  assert.match(priceSection, /getConferenceProductPricePresentation\(product\)/);
  assert.match(priceSection, /href=\{`\/conference-system\/\$\{product\.slug\}\/`\}/);
  for (const heading of ["Product Name", "Brand", "Product Type", "Best For", "Availability", "Price"]) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(priceSection, new RegExp(`<th[^>]*>\\s*${escaped}\\s*</th>`), `${heading} must remain a table heading`);
  }
  assert.match(priceSection, /\{publishedPriceCount\} products with/);
  assert.match(priceSection, /\{catalogReport\.byPriceType\.request\} Request Price products/);
});

test("Conference sections avoid redundant eyebrow labels above descriptive H2 headings", () => {
  const source = read("app/conference-system/page.tsx");

  for (const redundantLabel of [
    "Conference system equipment",
    "Buying Guide",
    "Why Choose Us",
  ]) {
    assert.ok(!source.includes(redundantLabel), `${redundantLabel} eyebrow must be removed`);
  }
});

test("Conference section headings keep their relevant semantic icon mapping", () => {
  const source = read("app/conference-system/page.tsx");
  const headings = [
    { id: "choose-conference-system-type", icon: "setup" },
    { id: "conference-system-comparison-heading", icon: "comparison" },
    { id: "choose-conference-room-size", icon: "roomSize" },
    { id: "popular-conference-packages", icon: "packages" },
    { id: "conference-price-guide", icon: "price" },
    { id: "recent-conference-system-projects", icon: "projects" },
    { id: "conference-system-engineering-support", icon: "engineering" },
    { id: "what-is-conference-system", icon: "info" },
    { id: "conference-system-price-heading", icon: "price" },
    { id: "conference-commercial-confidence", icon: "confidence" },
    { id: "conference-brand-showcase", icon: "brands" },
    { id: "conference-system-faq", icon: "faq" },
  ];

  assert.match(source, /type ConferenceSectionIcon =/);
  assert.match(source, /function ConferenceSectionTitleIcon\(/);
  for (const { id, icon } of headings) {
    const iconPattern = new RegExp(`<h2\\s+id="${id}"[\\s\\S]*?<ConferenceSectionTitleIcon\\b[^>]*\\bicon="${icon}"[^>]*/>[\\s\\S]*?</h2>`, "g");
    assert.equal(
      (source.match(iconPattern) ?? []).length,
      1,
      `${icon} must identify the ${id} heading`,
    );
  }
  assert.equal(occurrences(source, "<ConferenceSectionTitleIcon"), headings.length);
});

test("Conference compact solution, case-study, and service sections use canonical project data in the required order", () => {
  const pageSource = read("app/conference-system/page.tsx");
  const projectData = read("app/projects/projectData.ts");
  const projectCard = read("app/projects/ProjectCard.tsx");
  const guideIndex = pageSource.indexOf('aria-labelledby="conference-price-guide"');
  const hybridIndex = pageSource.indexOf('aria-labelledby="hybrid-conference-integration"');
  const projectsIndex = pageSource.indexOf('aria-labelledby="recent-conference-system-projects"');
  const whyIndex = pageSource.indexOf('aria-labelledby="conference-system-engineering-support"');
  const definitionIndex = pageSource.indexOf('aria-labelledby="what-is-conference-system"');

  assert.ok(
    guideIndex >= 0 &&
    hybridIndex > guideIndex &&
    projectsIndex > hybridIndex &&
    whyIndex > projectsIndex &&
    definitionIndex > whyIndex,
  );
  assert.equal(occurrences(projectData, "/assets/conference-system/projects/conference_p1.webp"), 1);
  assert.equal(occurrences(projectData, "/assets/conference-system/projects/coference_p2.webp"), 1);
  assert.equal(occurrences(projectData, "/assets/conference-system/projects/conference_p3.webp"), 1);
  assert.equal(occurrences(pageSource, 'id="hybrid-conference-integration"'), 1);
  assert.equal(occurrences(pageSource, "Recent Conference System Projects in Bangladesh"), 1);
  assert.equal(occurrences(pageSource, "Conference System Engineering & Project Support"), 1);
  assert.doesNotMatch(pageSource, /Representative Conference System Configurations/);
  assert.match(projectData, /export const conferenceProjects = projects\.filter/);
  assert.match(pageSource, /conferenceProjects\.map/);
  assert.match(pageSource, /md:grid-cols-2 lg:grid-cols-3/);
  assert.match(pageSource, /<ProjectCard key=\{project\.slug\} project=\{project\} presentation="compact"/);
  assert.match(projectCard, /project\.tags\.slice\(0, 3\)/);
  assert.match(projectCard, /line-clamp-2 min-h-10/);
  assert.match(projectCard, /flex-nowrap gap-1/);
  assert.match(projectCard, /shrink-0 px-1\.5 text-\[8px\]/);
  assert.match(projectCard, /sizes=\{compact \?/);
  assert.match(pageSource, /hybridIntegrationSteps\.map/);
  assert.match(pageSource, /chooseSashaCards\.map/);
  assert.match(pageSource, /border-\[#d8e5f7\] bg-\[#f2f7ff\]/);
  assert.match(pageSource, /href="\/projects\/"/);
  assert.match(pageSource, /View All Projects/);
  assert.match(projectData, /caseStudyHref: "\/projects\/corporate-boardroom-conference-system-dhaka\/"/);
  assert.match(projectData, /caseStudyHref: "\/projects\/smart-meeting-room-conference-system-dhaka\/"/);
  assert.match(projectData, /caseStudyHref: "\/projects\/large-conference-room-system-dhaka\/"/);
  assert.match(pageSource, /href="\/contact\/\?project=conference-system"/);
  assert.match(pageSource, /buildWhatsAppHref\(CONFERENCE_ENGINEER_WHATSAPP_MESSAGE\)/);
  assert.equal(occurrences(pageSource, "href={conferenceEngineerWhatsAppHref}"), 3);
  assert.equal(occurrences(pageSource, "Talk to an AV Engineer"), 3);
  assert.equal(occurrences(pageSource, "WhatsApp Engineering Team"), 0);
  assert.equal(occurrences(pageSource, "Talk to an Engineer"), 0);
});

test("Conference landing adds one semantic system comparison between setup and room-size discovery", () => {
  const page = read("app/conference-system/page.tsx");
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const comparison = sectionBetween(
    page,
    'aria-labelledby="conference-system-comparison-heading"',
    'aria-labelledby="choose-conference-room-size"',
  );
  const columns = sectionBetween(
    page,
    "const conferenceSystemComparisonColumns:",
    "const conferenceSystemComparisonRows:",
  );
  const rows = sectionBetween(
    page,
    "const conferenceSystemComparisonRows:",
    "const conferenceRoomSizeCards:",
  );
  const chooserIndex = page.indexOf('aria-labelledby="choose-conference-system-type"');
  const comparisonIndex = page.indexOf('aria-labelledby="conference-system-comparison-heading"');
  const roomSizeIndex = page.indexOf('aria-labelledby="choose-conference-room-size"');

  assert.ok(chooserIndex >= 0 && comparisonIndex > chooserIndex && roomSizeIndex > comparisonIndex);
  assert.equal(occurrences(page, 'id="conference-system-comparison-heading"'), 1);
  assert.equal(occurrences(columns, 'id: "'), 4);
  assert.equal(occurrences(rows, 'feature: "'), 7);
  assert.match(comparison, /Which Conference System Is Right for Your Room\?/);
  assert.match(comparison, /<table/);
  assert.match(comparison, /<caption className="sr-only">/);
  assert.match(comparison, /<thead/);
  assert.match(comparison, /<tbody/);
  assert.match(comparison, /scope="col"/);
  assert.match(comparison, /scope="row"/);
  assert.match(comparison, /overflow-x-auto/);
  assert.match(comparison, /min-w-\[760px\]/);
  assert.match(comparison, /sticky left-0/);
  assert.match(comparison, /tabIndex=\{0\}/);
  assert.match(comparison, /Not sure which setup fits your room\?/);
  assert.match(comparison, /href="\/contact\/\?project=conference-system"/);
  assert.match(comparison, /Request a Conference System BOQ/);
  assert.doesNotMatch(comparison, /\b(?:BDT|Tk|price)\b/i);

  for (const slug of [
    "wired-conference-system",
    "wireless-conference-system",
    "digital-conference-system",
    "video-conference-system",
  ]) {
    assert.equal(occurrences(columns, `href: "/conference-system/${slug}/"`), 1);
    assert.match(taxonomy, new RegExp(`slug: "${slug}"`));
  }
});

test("Conference package pricing distinguishes equipment estimates from installed packages", () => {
  const landing = read("app/conference-system/page.tsx");
  const packageCards = read("app/conference-system/ConferencePackageCards.tsx");
  const packages = read("app/conference-system/conferencePackages.ts");
  const inquiry = read("app/conference-system/conferenceInquiry.ts");

  assert.equal(occurrences(landing, 'priceEyebrow: "Estimated Equipment Budget"'), 3);
  assert.equal(occurrences(landing, 'priceNote: "Indicative equipment estimate"'), 3);
  assert.match(landing, /Final pricing depends on the selected brand, model, accessories, and project scope/);
  assert.match(landing, /href="\/conference-system\/complete-package\/"/);
  assert.match(landing, /View Complete Installed Packages/);
  assert.match(packageCards, /Complete Installed Conference System Packages/);
  assert.match(packageCards, /Complete Installed Package/);
  assert.match(packageCards, /package=\$\{packageItem\.id\}/);
  assert.equal(occurrences(packages, 'ctaLabel: "Get Package BOQ"'), 3);
  for (const key of ["10-person-boardroom", "20-person-meeting-room", "30-person-government", "50-plus-conference-hall"]) {
    assert.ok(inquiry.includes(`key: "${key}"`), `${key} needs an allowlisted contact context`);
  }
});

test("Conference removes the requested component, comparison, benefit, and selection-guide sections", () => {
  const source = read("app/conference-system/page.tsx");

  assert.doesNotMatch(source, /<h2[^>]*>\s*Key Components of a Conference System\s*<\/h2>/);
  assert.doesNotMatch(source, /<h2[^>]*>\s*Wired vs Wireless Conference System\s*<\/h2>/);
  assert.doesNotMatch(source, /Conference System Benefits & Applications/);
  assert.doesNotMatch(source, /conference-system-components/);
  assert.doesNotMatch(source, /wired-vs-wireless-conference-system/);
  assert.doesNotMatch(source, /conference-system-benefits-applications/);
  assert.doesNotMatch(source, /conferenceComponentCards|ConferenceComponentIconSvg/);
  assert.doesNotMatch(source, /wiredPoints|wirelessPoints/);
  assert.doesNotMatch(source, /conferenceBenefits|ConferenceBenefitIconSvg|applicationCards/);
  assert.doesNotMatch(source, /Key Benefits of a Professional Conference System/);
  assert.doesNotMatch(source, /<h2[^>]*>\s*Conference System Applications\s*<\/h2>/);
  assert.doesNotMatch(source, /conferenceGuideCards/);
  assert.doesNotMatch(source, /ConferenceGuideIconSvg/);
  assert.doesNotMatch(source, /How to Choose the Right Conference System in Bangladesh/);
  assert.doesNotMatch(source, /choose-right-conference-system/);
  assert.doesNotMatch(source, /conferenceSelectionGuideRows/);
  assert.doesNotMatch(source, /Quick Selection Guide for Conference Systems/);
});

test("Conference brand support keeps verified routes, a clean card layout, and descriptive CTAs", () => {
  const source = read("app/conference-system/page.tsx");
  const section = sectionBetween(
    source,
    'aria-labelledby="conference-brand-showcase"',
    'aria-labelledby="conference-system-faq"',
  );

  assert.match(section, /Conference System Brands & Support/);
  assert.doesNotMatch(source, /Authorized Distributor|Exclusive Distributor|authorizationStatus/);
  assert.match(section, /brand\.features\.map/);
  assert.match(section, /Explore \{brand\.title\} Conference Systems/);
  for (const brand of ["bosch", "toa", "spon", "cmx"]) {
    assert.match(source, new RegExp(`url: "/conference-system/brands/${brand}/"`));
  }
});

test("Conference commercial trust uses factual NAP, conditional warranty, and neutral brand wording", () => {
  const landing = read("app/conference-system/page.tsx");
  const site = read("lib/site.ts");

  assert.match(landing, /Commercial Confidence/);
  assert.match(landing, /commercialConfidenceCards\.map/);
  assert.match(landing, /style=\{\{ backgroundColor: "#eef4ff", borderColor: "#c9d9f0" \}\}/);
  assert.match(landing, /Bangladesh-Based AV Provider/);
  assert.match(landing, /Applicable Warranty Support/);
  assert.match(landing, /Manufacturer or supplier warranty applies where stated/);
  assert.match(landing, /Authorized Distribution &amp; Warranty:/);
  assert.match(landing, /Sasha Corporation supplies genuine conference system products through authorized distribution channels, with warranty coverage, project consultation and after-sales support based on the selected brand and model\./);
  assert.match(landing, /Conference System Expertise/);
  assert.match(landing, /description: "Bosch, TOA, SPON, CMX"/);
  assert.doesNotMatch(landing, /Authorized Solutions|Authorisation Scope:|Verified Business|Official products with manufacturer warranty/);
  assert.match(landing, /\{siteConfig\.address\}/);
  assert.match(landing, /href=\{`tel:\$\{siteConfig\.phone\}`\}/);
  assert.match(landing, /href="\/services-support\/"/);
  assert.match(landing, /href="\/terms\/"/);
  assert.match(landing, /href="\/return-policy\/"/);
  assert.match(landing, /href="\/privacy\/"/);
  assert.match(landing, /"@type": "Service"/);
  assert.match(landing, /serviceType: "Conference system consultation, supply, installation and after-sales support"/);
  assert.match(landing, /areaServed: \{/);
  assert.match(site, /address: "102\/1 West Agargaon, Dhaka 1207"/);
  assert.doesNotMatch(landing, /customer rating|five-star|award-winning|best seller|limited stock/i);
});

test("Conference closing sections follow the compact reference order without duplicates", () => {
  const source = read("app/conference-system/page.tsx");
  const commercialIndex = source.indexOf('aria-labelledby="conference-commercial-confidence"');
  const brandIndex = source.indexOf('aria-labelledby="conference-brand-showcase"');
  const faqIndex = source.indexOf('aria-labelledby="conference-system-faq"');
  const ctaIndex = source.indexOf('aria-labelledby="conference-final-cta"');

  assert.ok(commercialIndex >= 0 && brandIndex > commercialIndex && faqIndex > brandIndex && ctaIndex > faqIndex);
  assert.equal(occurrences(source, 'id="conference-commercial-confidence"'), 1);
  assert.equal(occurrences(source, 'id="conference-brand-showcase"'), 1);
  assert.equal(occurrences(source, 'id="conference-system-faq"'), 1);
  assert.equal(occurrences(source, 'id="conference-final-cta"'), 1);
  assert.match(source, /variant="minimal"/);
  assert.match(source, /Ready to Build Your Perfect Conference Room\?/);
  assert.doesNotMatch(source, /Commercial Confidence &amp; Verified Business Support/);
  assert.doesNotMatch(source, /Brands We Work With/);
  assert.doesNotMatch(source, />Conference System FAQ\s*</);
});

test("Conference catalog is normalized, complete, and route-stable", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const route = read("app/conference-system/[slug]/page.tsx");
  const detail = read("app/conference-system/ConferenceProductDetailPage.tsx");
  const gallery = read("app/conference-system/ConferenceProductGallery.tsx");
  const expectedSlugs = [
    "gen-5301p13-conference-microphone-unit",
    "nac-720w-wireless-conference-system",
    "spon-gen-5301p26-network-integrated-amplifier",
    "spon-sap-f88e-8x8-digital-audio-processor-dsp",
    "spon-lcm-6010-digital-conference-system-central-unit",
    "spon-lcm-6013cv-l-digital-conference-chairman-unit",
    "spon-lcm-6013dv-l-digital-conference-delegate-unit",
    "spon-lcm-6015p-12-port-wireless-microphone-charger",
    "spon-lcs-5251cd-digital-conference-microphone-system",
    "spon-lcs-5252d-wireless-conference-delegate-unit",
    "spon-lcs-5301z-wireless-digital-conference-access-point",
  ];
  const ids = [...catalog.matchAll(/^    id: "([^"]+)",$/gm)].map((match) => match[1]);
  const slugs = [...catalog.matchAll(/^    slug: "([^"]+)",$/gm)].map((match) => match[1]);
  const productBlocks = catalog.split(/\n  \{\n    id: /).slice(1);

  assert.equal(productBlocks.length, 11);
  assert.equal(new Set(ids).size, 11, "Conference product IDs must be unique");
  assert.equal(new Set(slugs).size, 11, "Conference product slugs must be unique");
  // The set of public URLs is fixed. Their order inside the file is an editorial
  // choice that drives listing order, so it is deliberately not asserted here.
  assert.deepEqual([...slugs].sort(), [...expectedSlugs].sort(), "existing public Conference slugs must not change");

  for (const block of productBlocks) {
    assert.match(block, /^"[^"]+",\n    slug: "[^"]+",\n    name: "[^"]+",/);
    assert.match(block, /shortDescription: "[^"]+"/);
    assert.match(block, /description:\s*(?:"|\n\s+")[\s\S]+/);
    assert.match(block, /productTypes: \["(?:chairman-unit|delegate-unit|control-unit|dsp|amplifier|camera|video-bar|speakerphone|package|accessory|microphone|charger|access-point|processor|other)"\]/);
    assert.match(block, /price: \{ type: "(?:fixed|range)", (?:amount: \d+|min: \d+, max: \d+), currency: "BDT", displayLabel: "[^"]+" \}/);
    assert.match(block, /images: \[[\s\S]*?src: [^,]+, alt: "[^"]+", primary: true/);
    assert.match(block, /applications: \[[^\]]+\]/);
    assert.match(block, /specifications: \[[\s\S]*?\{ key: "[^"]+", value: "[^"]+" \}/);
    // Every core product links to the units it is actually specified with.
    assert.match(block, /compatibleProductIds: \["[a-z0-9-]+"(?:, "[a-z0-9-]+")*\]/);
  }

  assert.doesNotMatch(catalog, /\b(?:priceLabel|cardPriceLabel|gallery|bestFor|specs):/);
  assert.match(catalog, /validateConferenceCatalog\(conferenceSystemCatalog\)/);
  assert.match(route, /conferenceSystemCatalog\.map\(\(product\) => \(\{ slug: product\.slug \}\)\)/);
  assert.match(route, /path: `\/conference-system\/\$\{slug\}`/);
  const explorer = read("app/conference-system/ConferenceProductExplorer.tsx");
  assert.match(explorer, /<ConferenceProductCard[\s\S]*?product=\{getContextualCardProduct\(product\)\}/);
  const explorerData = read("app/conference-system/conferenceExplorerData.ts");
  assert.match(explorerData, /price: getConferenceProductCardPrice\(product\)/);
  assert.match(explorerData, /availabilityLabel: product\.availability[\s\S]*?getConferenceProductAvailabilityLabel\(product\)[\s\S]*?: undefined/);
  assert.match(gallery, /visibleImages\.find/);
  assert.match(detail, /\{specifications\.map\(\(spec\) => \(/);
});

test("Conference normalized prices preserve all 11 core price records", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const expectedPrices = [
    [18500, "৳18,500"],
    [145000, "৳145,000"],
    [21500, "৳21,500"],
    [19500, "৳19,500"],
    [34500, "৳34,500"],
    [23500, "৳23,500"],
    [24500, "৳24,500"],
    [36500, "৳36,500"],
  ];
  const actualPrices = [...catalog.matchAll(/price: \{ type: "fixed", amount: (\d+), currency: "BDT", displayLabel: "([^"]+)" \}/g)]
    .map((match) => [Number(match[1]), match[2]]);
  const expectedRanges = [[55000, 75000], [60000, 75000], [65000, 90000]];
  const actualRanges = [...catalog.matchAll(/price: \{ type: "range", min: (\d+), max: (\d+), currency: "BDT", displayLabel: "[^"]+" \}/g)]
    .map((match) => [Number(match[1]), Number(match[2])]);

  // Every published amount must survive; the order they sit in the file may change.
  const key = (entry) => `${entry[0]}|${entry[1]}`;
  assert.deepEqual(actualPrices.map(key).sort(), expectedPrices.map(key).sort());
  assert.equal(actualPrices.length, expectedPrices.length);
  assert.deepEqual(actualRanges.map(key).sort(), expectedRanges.map(key).sort());
  assert.equal(actualPrices.length + actualRanges.length, 11);
});

test("Conference canonical model supports future discovery without fabricating optional data", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const taxonomy = read("app/conference-system/taxonomy.ts");

  assert.match(catalog, /CONFERENCE_SYSTEM_CATEGORIES = \["audio", "video", "hybrid"\]/);
  assert.match(catalog, /CONFERENCE_SYSTEM_TYPES = \["audio", "digital", "video-hybrid", "paperless"\]/);
  assert.match(catalog, /CONFERENCE_CONNECTIONS = \["wired", "wireless", "hybrid"\]/);
  assert.match(catalog, /CONFERENCE_ROOM_SIZES = \["small", "medium", "large", "auditorium"\]/);
  for (const optionalField of ["systemTypes?", "systemFamily?", "roomSizes?", "participantRange?", "warranty?", "datasheet?", "manual?", "brochure?"]) {
    assert.ok(catalog.includes(optionalField), `${optionalField} must remain optional`);
  }
  for (const helper of [
    "getConferenceProductById",
    "getConferenceCatalogBrands",
    "getConferenceProductsBySystemFamily",
    "getConferenceProductsByRoomSize",
    "getConferenceProductPricing",
    "getConferenceCatalogIntegrityReport",
  ]) {
    assert.match(catalog, new RegExp(`export function ${helper}\\(`));
  }
  assert.match(catalog, /broken compatibility reference/);
  assert.match(catalog, /invalid participant range/);
  assert.match(catalog, /inconsistent brand name/);
  assert.match(catalog, /invalid price update date/);
  assert.match(taxonomy, /conferenceBrandConfigs,\s*\),/);
});

test("Conference cards use canonical structured pricing and one accessible action hierarchy", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const price = read("lib/price.ts");
  const card = read("app/conference-system/ConferenceProductCard.tsx");
  const explorer = read("app/conference-system/ConferenceProductExplorer.tsx");
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");
  const collectionGrid = read("app/conference-system/ConferenceCollectionProductGrid.tsx");

  assert.match(price, /export function formatBdtAmount\(amount: number\)/);
  assert.match(catalog, /product\.price\.type === "fixed"[\s\S]*formatBdtAmount\(product\.price\.amount\)/);
  assert.match(catalog, /product\.price\.type === "range"[\s\S]*formatBdtRange\(\[product\.price\.min, product\.price\.max\]\)/);
  assert.match(catalog, /export function getConferenceProductPricePresentation\(/);
  assert.match(catalog, /label: "Request Price"/);
  assert.match(catalog, /qualifier: "Indicative range"/);
  assert.match(catalog, /qualifier: "Project quotation"/);
  assert.match(catalog, /export function getConferenceProductCardSpecs\(/);

  assert.equal(occurrences(card, "View Details"), 1);
  assert.equal(occurrences(card, "Get a Quote"), 2);
  assert.ok(!card.includes('className="absolute inset-0 z-10"'));
  assert.match(card, /aria-label=\{`View details for \$\{product\.name\}`\}/);
  assert.match(card, /aria-label=\{`Get a quote for \$\{product\.name\}`\}/);
  assert.match(card, /product\.availabilityLabel \?/);
  assert.match(card, /product\.connectionLabel \?/);
  assert.match(card, /product\.systemFamily \?/);
  assert.doesNotMatch(card, /wishlist|Limited Stock|Only \d+ left|discount/i);

  assert.match(explorer, /<ConferenceProductCard/);
  assert.match(collection, /<ConferenceCollectionProductGrid/);
  assert.match(collectionGrid, /<ConferenceProductCard/);
  assert.doesNotMatch(explorer, /<ProductGridCard/);
  assert.doesNotMatch(collection, /<ProductGridCard/);
  assert.doesNotMatch(collectionGrid, /<ProductGridCard/);
});

test("Conference product quick view is accessible, contextual, and available in every card presentation", () => {
  const card = read("app/conference-system/ConferenceProductCard.tsx");
  const quickView = read("app/conference-system/ConferenceProductQuickView.tsx");
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");

  assert.equal(occurrences(card, "<ConferenceProductQuickView"), 2);
  assert.match(quickView, /^"use client";/);
  assert.match(quickView, /createPortal\(dialog, document\.body\)/);
  assert.match(quickView, /className="conference-quick-view-overlay fixed inset-0 z-\[200\] flex items-center justify-center/);
  assert.match(quickView, /conference-quick-view-dialog relative max-h-\[calc\(100dvh-24px\)\] w-full max-w-\[1120px\]/);
  assert.match(quickView, /conference-quick-view-close[^"`]*cursor-pointer/);
  assert.match(quickView, /conference-quick-view-thumbnail[^"`]*cursor-pointer/);
  assert.match(quickView, /conference-quick-view-layout grid min-w-0/);
  assert.match(quickView, /lg:grid-cols-\[76px_minmax\(0,0\.95fr\)_minmax\(360px,1\.05fr\)\]/);
  assert.match(quickView, /lg:grid-cols-\[minmax\(0,0\.95fr\)_minmax\(360px,1\.05fr\)\]/);
  assert.match(quickView, /conference-quick-view-details order-3[^"`]*lg:order-none lg:overflow-y-auto/);
  assert.doesNotMatch(quickView, /conference-quick-view-overlay[^\n]*items-end/);
  assert.match(quickView, /role="dialog"/);
  assert.match(quickView, /aria-modal="true"/);
  assert.match(quickView, /aria-haspopup="dialog"/);
  assert.match(quickView, /event\.key === "Escape"/);
  assert.match(quickView, /event\.key !== "Tab"/);
  assert.match(quickView, /document\.body\.style\.overflow = "hidden"/);
  assert.match(quickView, /restoreFocusTarget\?\.focus\(\)/);
  assert.match(quickView, /aria-label=\{`Quick view \$\{product\.name\}`\}/);
  assert.match(quickView, /href=\{productHref\}/);
  assert.match(quickView, /href=\{quotationHref\}/);
  assert.match(quickView, /Quick Overview/);
  assert.match(quickView, /galleryImages\.map\(\(image, index\)/);
  assert.match(quickView, /aria-pressed=\{activeImage\.src === image\.src\}/);
  assert.match(quickView, /Request a Quote/);
  assert.match(quickView, /Final pricing may depend on quantity, room requirements and installation scope/);
  assert.doesNotMatch(quickView, /dangerouslySetInnerHTML|iframe/i);
  assert.match(collection, /model: product\.model/);
  assert.match(collection, /features: product\.keyFeatures\.slice\(0, 4\)/);
  assert.match(collection, /images: product\.images\.slice\(0, 4\)/);
  assert.match(read("app/conference-system/conferenceExplorerData.ts"), /keySpecs: getConferenceProductCardSpecs\(product\)\.slice\(0, 5\)/);
  assert.match(quickView, /product\.keySpecs\.slice\(0, 3\)/);
});

test("Conference product cards use a pointer-aware reduced-motion-safe image zoom", () => {
  const card = read("app/conference-system/ConferenceProductCard.tsx");
  const globalStyles = read("app/globals.css");

  assert.equal(occurrences(card, "conference-product-card-image"), 2);
  assert.match(globalStyles, /\.conference-product-card-image\s*\{[\s\S]*?transition: transform 320ms/);
  assert.match(globalStyles, /@media \(hover: hover\) and \(pointer: fine\) and \(prefers-reduced-motion: no-preference\)/);
  assert.match(globalStyles, /\[data-conference-product-card\]:hover \.conference-product-card-image\s*\{[\s\S]*?transform: scale\(1\.055\);/);
  assert.match(globalStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.conference-product-card-image[\s\S]*?transition: none;/);
});

test("Conference product card labels follow collection context without changing taxonomy", async () => {
  const moduleUrl = pathToFileURL(path.join(root, "app/conference-system/conferenceProductDisplayType.ts")).href;
  const displayType = await import(`${moduleUrl}?test=${Date.now()}`);
  const multiRoleProduct = {
    productTypes: ["chairman-unit", "delegate-unit"],
    badge: "Discussion Unit",
  };

  assert.equal(displayType.getConferenceProductDisplayType(multiRoleProduct, "delegate-unit"), "Delegate Unit");
  assert.equal(displayType.getConferenceProductDisplayType(multiRoleProduct, "chairman-unit"), "Chairman Unit");
  assert.equal(displayType.getConferenceProductDisplayType(multiRoleProduct), "Chairman / Delegate");
  assert.equal(
    displayType.getConferenceProductDisplayType({ productTypes: ["delegate-unit"], badge: "Legacy badge" }),
    "Delegate Unit",
  );
  assert.equal(
    displayType.getConferenceProductDisplayType({ productTypes: ["invalid-type"], badge: "Discussion Device" }),
    "Discussion Device",
  );
  assert.equal(displayType.getConferenceProductDisplayType({ productTypes: [] }), "Conference System");

  const taxonomy = read("app/conference-system/taxonomy.ts");
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");
  const explorerData = read("app/conference-system/conferenceExplorerData.ts");
  assert.match(taxonomy, /slug: "chairman-unit",[\s\S]*?productType: "chairman-unit"/);
  assert.match(taxonomy, /slug: "delegate-unit",[\s\S]*?productType: "delegate-unit"/);
  assert.match(collection, /getConferenceProductDisplayType\(product, currentProductType\)/);
  assert.match(explorerData, /getConferenceProductDisplayType\(product\)/);
});

test("Conference price transparency uses one presenter and explicit commercial states", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const toa = read("app/conference-system/catalog.toa.ts");
  const landing = read("app/conference-system/page.tsx");
  const detail = read("app/conference-system/ConferenceProductDetailPage.tsx");
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");

  assert.match(catalog, /basisLabel: "Fixed catalog price"/);
  assert.match(catalog, /basisLabel: "Indicative equipment range"/);
  assert.match(catalog, /basisLabel: "Project quotation"/);
  assert.match(catalog, /Current price is provided after confirming the model, quantity and project requirements/);
  assert.match(catalog, /product\.price\.updatedAt/);
  assert.match(catalog, /product\.price\.maxQualifier === "plus" \? "\+" : ""/);
  assert.match(toa, /price: indicativeRange\(55000, 85000, "plus"\)/);
  assert.match(toa, /price: indicativeRange\(27500, 29500\)/);
  assert.match(toa, /price: indicativeRange\(22500, 27000\)/);
  assert.match(catalog, /isValidIsoCalendarDate/);
  assert.match(catalog, /missing availability/);
  assert.match(detail, /getConferenceProductPricePresentation\(product\)/);
  assert.match(detail, /Price last verified/);
  assert.match(collection, /getConferenceProductPricePresentation\(product\)/);
  assert.match(landing, /getConferenceProductPricePresentation\(product\)/);
  assert.doesNotMatch(`${landing}\n${detail}\n${collection}`, /normalizeDisplayedPriceText\(.*price\.displayLabel/);
  assert.match(landing, /\.filter\(\(product\) => product\.brand\?\.slug === slug && product\.price\.type !== "request"\)[\s\S]{0,100}\.slice\(0, 2\)/);
  assert.doesNotMatch(landing, /Conference product catalog summary|Catalogued products/);
  assert.match(landing, /visible price guidance[\s\S]{0,100}Request Price products/);
});

test("Conference taxonomy registries are unique and collision-protected", () => {
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const catalog = read("app/conference-system/catalog.ts");
  const categorySource = sectionBetween(
    taxonomy,
    "export const conferenceCategoryConfigs",
    "export const conferenceBrandConfigs",
  );
  const brandSource = sectionBetween(
    taxonomy,
    "export const conferenceBrandConfigs",
    "export const RESERVED_CONFERENCE_PRODUCT_SLUGS",
  );
  const categoryIds = [...categorySource.matchAll(/^    id: "([^"]+)",$/gm)].map((match) => match[1]);
  const categorySlugs = [...categorySource.matchAll(/^    slug: "([^"]+)",$/gm)].map((match) => match[1]);
  const brandIds = [...brandSource.matchAll(/^    id: "([^"]+)",$/gm)].map((match) => match[1]);
  const brandSlugs = [...brandSource.matchAll(/^    slug: "([^"]+)",$/gm)].map((match) => match[1]);

  assert.equal(categorySlugs.length, 12);
  assert.equal(new Set(categorySlugs).size, categorySlugs.length);
  assert.equal(new Set(brandSlugs).size, brandSlugs.length);
  assert.equal(new Set([...categoryIds, ...brandIds]).size, categoryIds.length + brandIds.length);
  assert.deepEqual(categorySlugs, [
    "audio-conference-system",
    "digital-conference-system",
    "video-conference-system",
    "paperless-conference-system",
    "wired-conference-system",
    "wireless-conference-system",
    "chairman-unit",
    "delegate-unit",
    "control-unit",
    "conference-dsp",
    "conference-amplifier",
    "complete-package",
  ]);
  assert.deepEqual(brandSlugs, ["bosch", "toa", "spon", "cmx"]);
  assert.match(taxonomy, /RESERVED_CONFERENCE_PRODUCT_SLUGS = \[[\s\S]*\.\.\.conferenceCategoryConfigs\.map/);
  assert.match(taxonomy, /"brands",/);
  assert.match(
    taxonomy,
    /validateConferenceCatalog\(\s*conferenceSystemCatalog,\s*RESERVED_CONFERENCE_PRODUCT_SLUGS,\s*conferenceBrandConfigs,\s*\)/,
  );
  assert.match(catalog, /reserved slug collision/);
});

test("Conference taxonomy matches only normalized catalog fields", () => {
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const catalog = read("app/conference-system/catalog.ts");

  for (const matcher of [
    'getConferenceProductSystemTypes(product).includes("audio")',
    'getConferenceProductSystemTypes(product).includes("digital")',
    'getConferenceProductSystemTypes(product).includes("video-hybrid")',
    'getConferenceProductSystemTypes(product).includes("paperless")',
    'product.connection === "wired"',
    'product.connection === "wireless"',
    'product.productTypes.includes("chairman-unit")',
    'product.productTypes.includes("delegate-unit")',
    'product.productTypes.includes("control-unit")',
    'product.productTypes.includes("dsp")',
    'product.productTypes.includes("amplifier")',
    'product.productTypes.includes("package")',
  ]) {
    assert.ok(taxonomy.includes(matcher), `${matcher} must drive taxonomy matching`);
  }
  assert.doesNotMatch(taxonomy, /matchProduct:[^\n]+(?:title|description|specifications|tags)/);
  assert.match(taxonomy, /product\.brand\?\.slug === brand\.slug/);

  const representativeMappings = [
    ["spon-lcm-6013cv-l-digital-conference-chairman-unit", 'systemTypes: ["audio", "digital"]', 'productTypes: ["chairman-unit"]'],
    ["spon-lcm-6013dv-l-digital-conference-delegate-unit", 'systemTypes: ["audio", "digital"]', 'productTypes: ["delegate-unit"]'],
    ["spon-lcm-6010-digital-conference-system-central-unit", 'systemTypes: ["audio", "digital"]', 'productTypes: ["control-unit"]'],
    ["spon-sap-f88e-8x8-digital-audio-processor-dsp", 'systemCategory: "audio"', 'productTypes: ["dsp"]'],
    ["spon-gen-5301p26-network-integrated-amplifier", 'systemCategory: "audio"', 'productTypes: ["amplifier"]'],
    ["spon-lcs-5252d-wireless-conference-delegate-unit", 'connection: "wireless"', 'brand: { name: "SPON", slug: "spon" }'],
  ];

  for (const [slug, fieldA, fieldB] of representativeMappings) {
    const start = catalog.indexOf(`slug: "${slug}"`);
    const end = catalog.indexOf("\n  {", start);
    const block = catalog.slice(start, end === -1 ? undefined : end);
    assert.ok(block.includes(fieldA), `${slug} must include ${fieldA}`);
    assert.ok(block.includes(fieldB), `${slug} must include ${fieldB}`);
  }

  // Both are SPON products: their source images ship as SPON-GEN-5301P26 and
  // SPON-NAC-720W, and GEN-5301P26 from the same model family is already SPON.
  for (const slug of ["gen-5301p13-conference-microphone-unit", "nac-720w-wireless-conference-system"]) {
    const start = catalog.indexOf(`slug: "${slug}"`);
    const end = catalog.indexOf("\n  {", start);
    assert.match(
      catalog.slice(start, end),
      /^    brand: \{ name: "SPON", slug: "spon" \},$/m,
      `${slug} must carry its verified SPON brand`,
    );
  }
});

test("Conference taxonomy routes are static, distinct, and safely indexed", () => {
  const firstLevelRoute = read("app/conference-system/[slug]/page.tsx");
  const brandRoute = read("app/conference-system/brands/[brandSlug]/page.tsx");
  const brandHub = read("app/conference-system/brands/page.tsx");
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");
  const detail = read("app/conference-system/ConferenceProductDetailPage.tsx");
  const sitemap = read("app/sitemap.ts");

  assert.match(firstLevelRoute, /dynamicParams = false/);
  assert.match(firstLevelRoute, /conferenceSystemCatalog\.map\(\(product\) => \(\{ slug: product\.slug \}\)\)/);
  assert.match(firstLevelRoute, /conferenceCategoryConfigs\.map\(\(category\) => \(\{ slug: category\.slug \}\)\)/);
  assert.match(firstLevelRoute, /getConferenceProductBySlug\(slug\)/);
  assert.match(firstLevelRoute, /getConferenceCategoryBySlug\(slug\)/);
  assert.match(firstLevelRoute, /robots: \{ index: false, follow: true \}/);
  assert.match(brandRoute, /dynamicParams = false/);
  assert.match(brandRoute, /conferenceBrandConfigs\.map\(\(brand\) => \(\{ brandSlug: brand\.slug \}\)\)/);
  assert.match(brandRoute, /robots: \{ index: false, follow: true \}/);
  assert.match(brandHub, /data-conference-route-kind="brands-hub"/);
  assert.match(collection, /data-conference-route-kind="category"/);
  assert.match(collection, /data-conference-route-kind="brand"/);
  assert.match(detail, /data-conference-route-kind="product"/);
  assert.match(sitemap, /conferenceCategoryConfigs\.filter\(isConferenceCategoryIndexable\)/);
  assert.match(sitemap, /conferenceBrandConfigs\.filter\(isConferenceBrandIndexable\)/);
  assert.match(sitemap, /\/conference-system\/brands\//);
});

test("Conference category and populated-brand content is unique and complete", () => {
  const content = read("app/conference-system/collectionContent.ts");
  const categorySource = sectionBetween(
    content,
    "export const conferenceCategoryPageContent",
    "export const conferenceBrandPageContent",
  );
  const brandSource = content.slice(content.indexOf("export const conferenceBrandPageContent"));
  const categoryKeys = [...categorySource.matchAll(/^  "([^"]+)": \{$/gm)].map((match) => match[1]);
  const categoryHeroTitles = [...categorySource.matchAll(/heroTitle: "([^"]+)"/g)].map((match) => match[1]);
  const brandHeroTitles = [...brandSource.matchAll(/heroTitle: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(categoryKeys.length, 12);
  assert.equal(categoryHeroTitles.length, 12);
  assert.equal(new Set(categoryHeroTitles).size, 12, "category hero titles must be unique");
  assert.equal((categorySource.match(/highlights: \[/g) ?? []).length, 12);
  assert.equal((categorySource.match(/buyerGuide: \[/g) ?? []).length, 12);
  assert.equal((categorySource.match(/relatedCategorySlugs: \[/g) ?? []).length, 12);
  assert.equal((categorySource.match(/faqs: \[/g) ?? []).length, 12);
  assert.equal(brandHeroTitles.length, 4);
  assert.equal(new Set(brandHeroTitles).size, 4, "brand hero titles must be unique");
  for (const brand of ["bosch", "toa", "cmx", "spon"]) {
    assert.match(brandSource, new RegExp(`^  ${brand}: \\{$`, "m"), `${brand} needs brand page content`);
  }
  // Honeywell and Huidu have no verified conference products/brand, so they must not claim brand content.
  assert.doesNotMatch(brandSource, /^  honeywell: \{$/m);
  assert.doesNotMatch(brandSource, /^  huidu: \{$/m);
});

test("Conference brand catalogs are unique, conference-only, and image-backed", () => {
  const bosch = read("app/conference-system/catalog.brands.ts");
  const newBosch = read("app/conference-system/catalog.bosch.ts");
  const toa = read("app/conference-system/catalog.toa.ts");
  const spon = read("app/conference-system/catalog.spon.ts");
  const core = read("app/conference-system/catalog.ts");
  const all = `${core}\n${bosch}\n${newBosch}\n${toa}\n${spon}`;

  const ids = [...all.matchAll(/^    id: "([^"]+)",$/gm)].map((m) => m[1]);
  const slugs = [...all.matchAll(/^    slug: "([^"]+)",$/gm)].map((m) => m[1]);
  const names = [...all.matchAll(/^    name: "([^"]+)",$/gm)].map((m) => m[1]);
  const models = [...all.matchAll(/^    model: "([^"]+)",$/gm)].map((m) => m[1]);
  const shortDescriptions = [...all.matchAll(/shortDescription:\s*\n?\s*"([^"]{40,})"/g)].map((m) => m[1]);
  const descriptions = [...all.matchAll(/^    description:\s*\n?\s*"([^"]{60,})"/gm)].map((m) => m[1]);

  assert.equal(ids.length, 70, "catalog must expose every verified conference product");
  assert.equal(new Set(ids).size, ids.length, "product ids must be unique");
  assert.equal(new Set(slugs).size, slugs.length, "product slugs must be unique");
  assert.equal(new Set(names).size, names.length, "product names must be unique");
  assert.equal(models.length, ids.length, "every product needs a model for detail-page facts");
  const weakTitles = names.filter((name, index) => {
    const normalize = (value) => value.toLowerCase().replace(/\s*\/\s*/g, "/").trim();
    return normalize(name) === normalize(models[index]);
  });
  assert.deepEqual(weakTitles, [], "product H1 sources must not be model-only");
  assert.equal(new Set(shortDescriptions).size, shortDescriptions.length, "short descriptions must be unique for SEO");
  assert.equal(new Set(descriptions).size, descriptions.length, "descriptions must be unique for SEO");
  assert.equal(descriptions.length, ids.length, "every product needs its own description");

  // The merged export keeps the original core products first so their slugs stay stable.
  assert.match(core, /const coreConferenceProducts: ConferenceProduct\[\] = \[/);
  assert.match(
    core,
    /export const conferenceSystemCatalog: ConferenceProduct\[\] = \[\s*\.\.\.coreConferenceProducts,\s*\.\.\.newSponConferenceProducts,\s*\.\.\.boschConferenceProducts,\s*\.\.\.newBoschConferenceProducts,\s*\.\.\.cmxConferenceProducts,\s*\.\.\.toaConferenceProducts,\s*\];/,
  );

  for (const model of ["CCSD-CL", "LBB 4116/05", "LBB 4116/10", "LBB 4116/20", "DCNM-WD", "DCNM-WCH05", "DCNM-HDMIC", "CCSE-CURA-IN", "DCNM-WLIION"]) {
    assert.match(newBosch, new RegExp(`model: "${model.replaceAll("/", "\\/")}"`), `${model} must be present once`);
  }
  assert.match(bosch, /Bosch CCS-900 Wired Ultro Discussion Conference System\.jpg/);
  assert.match(bosch, /Bosch-CCS-1000-D-Digital-Discussion-System\.webp/);
  for (const file of [
    "Bosch CCSD-CL Discussion Chairman Unit.webp",
    "bosch-lbb-4116-05-dcn-extension-cable-5m-in-bd.webp",
    "bosch-lbb-411610-dcn-extension-cable-10m.webp",
    "bosch-lbb-411620-dcn-extension-cable-20m.webp",
    "bosch-dcnm-wd-dicentis-wireless-discussion-device-min.webp",
    "bosch-dcnm-wch05-dicentis-charger-for-5-batteries-min.webp",
    "bosch-dcnm-hdmic-dicentis-wireless-microphone-min.webp",
    "bosch-ccse-cura-control-unit-with-recorder-and-amplifier.webp",
    "Bosch DCNM-WLIION Battery Pack for DCNM-WD.webp",
  ]) {
    const relative = path.join("public/assets/conference-system/products/brands/bosch", file);
    assert.ok(statSync(path.join(root, relative)).isFile(), `${relative} must exist`);
  }

  for (const title of [
    "SPON LCS-8004HTP / LCS-8008HTP / LCS-8016HTP HDMI Video Matrix",
    "SPON LCS-2883A Omnidirectional Conference Speakerphone",
    "SPON LCS-2870D Inverted Conference Camera Bracket",
    "SPON LCS-2871D Inverted Conference Camera Bracket",
    "SPON LCS-2871-20 HD Conference Camera",
    "SPON LCS-5203L Digital Conference Central Unit",
    "SPON LCM-6013DVW-L Wireless Conference Delegate Unit",
  ]) {
    assert.ok(spon.includes(`name: "${title}"`), `${title} needs a descriptive canonical title`);
  }
  for (const title of [
    "SPON LCM-6013CV-L Digital Conference Chairman Unit",
    "SPON GEN-5301P13 Conference Microphone Unit",
    "SPON NAC-720W Wireless Conference System",
  ]) {
    assert.ok(core.includes(`name: "${title}"`), `${title} needs a brand-qualified canonical title`);
  }
  for (const file of ["LCS-800XHTP.webp", "LCS-2883A.webp", "LCS-2870D.webp", "LCS-2871D.webp", "2af217e477.webp", "LCS-5203L.webp", "LCM-6013DVW-L.webp", "LCM-6013CV-L.webp"]) {
    const relative = path.join("public/assets/conference-system/products/brands/spon", file);
    assert.ok(statSync(path.join(root, relative)).isFile(), `${relative} must exist`);
  }

  // PA equipment must not leak into the Conference category.
  for (const paTerm of ["Ceiling Loudspeaker", "Horn Loudspeaker", "Column Loudspeaker", "Mixer Amplifier", "PAVA"]) {
    assert.ok(!bosch.includes(paTerm), `Bosch conference catalog must not list ${paTerm}`);
    assert.ok(!toa.includes(paTerm), `TOA conference catalog must not list ${paTerm}`);
  }
  assert.ok(!all.includes("honeywell"), "Honeywell has no verified conference products");

  // Every brand image reference resolves to a file that is actually on disk.
  const dirMap = { bosch: "bosch", cmx: "cmx", toa: "toa" };
  const refs = [...`${bosch}\n${toa}`.matchAll(/(bosch|cmx|toa)Image\("([^"]+)"\)/g)];
  assert.equal(refs.length, 45, "every brand image reference must resolve");
  for (const [, brand, file] of refs) {
    const relative = path.join("public/assets/conference-system/products/brands", dirMap[brand], file);
    assert.ok(statSync(path.join(root, relative)).isFile(), `${relative} must exist`);
  }
});

test("Conference product explorer provides canonical search, multi-filter, sort, query state, and pagination", () => {
  const explorer = read("app/conference-system/ConferenceProductExplorer.tsx");
  const explorerOrder = read("app/conference-system/conferenceExplorerOrder.ts");
  const landing = read("app/conference-system/page.tsx");
  const discovery = read("app/conference-system/conferenceDiscovery.ts");

  assert.match(explorer, /^"use client";/);
  assert.match(explorerOrder, /export const CONFERENCE_PRODUCTS_PER_BRAND = 3;/);
  assert.match(explorerOrder, /function balanceConferenceProductsByBrand\(/);

  // Page one leads with the headline brands in order; unbranded stock follows later.
  assert.match(explorerOrder, /export const CONFERENCE_BRAND_ORDER = \["cmx", "toa", "bosch", "spon"\] as const;/);
  assert.match(explorerOrder, /cmx:\s*\[\s*"cmx-cs-700a-conference-system-with-discussion-units",\s*"cmx-cs-100-s101-s102-digital-conference-system",\s*"cmx-5g-100mc-wifi-wireless-conference-controller",\s*\]/);
  assert.match(explorer, /const PAGE_SIZE = CONFERENCE_PRODUCTS_PER_BRAND \* CONFERENCE_BRAND_ORDER\.length;/);
  assert.match(explorerOrder, /return index >= 0 \? index : slug \? CONFERENCE_BRAND_ORDER\.length : CONFERENCE_BRAND_ORDER\.length \+ 1;/);
  assert.match(explorerOrder, /if \(rank\(slug\) < CONFERENCE_BRAND_ORDER\.length\)/);
  assert.match(explorerOrder, /lead\.push\(\.\.\.orderedBucket\.slice\(0, perBrand\)\)/);
  assert.match(explorer, /filterConferenceProducts\(recommendedProducts, state\)/);
  assert.match(explorer, /sortConferenceProducts\(/);
  assert.match(explorer, /Search products, models, brands or systems/);
  assert.match(explorer, /type="checkbox"/);
  assert.equal(occurrences(explorer, "{filterGroups}"), 1, "desktop and mobile must share one accessible filter form");
  assert.match(explorer, /aria-controls="conference-product-filters"/);
  assert.match(explorer, /aria-label="Close product filters"/);
  assert.match(explorer, /event\.key !== "Escape"/);
  assert.match(explorer, /mobileFilterButtonRef\.current\?\.focus\(\)/);
  assert.match(explorer, /lg:sticky lg:top-20/);
  assert.match(explorer, /lg:max-h-\[calc\(100dvh-6rem\)\]/);
  assert.match(explorer, /lg:overflow-y-auto lg:overscroll-contain/);
  assert.match(explorer, /Active filters/);
  assert.match(explorer, /System Type/);
  assert.match(explorer, /Availability/);
  assert.match(explorer, /Contact for availability/);
  assert.match(explorer, /Minimum price in BDT/);
  assert.match(explorer, /Maximum price in BDT/);
  assert.match(explorer, /facetCount\("priceBands", band\.id\)/);
  assert.match(explorer, /state\.pageSize/);
  assert.match(explorer, /Showing \$\{\(safePage - 1\)/);
  assert.match(explorer, /Remove \$\{filter\.label\} filter/);
  assert.match(explorer, /No conference products match your current search and filters/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /data-conference-product-listing/);
  assert.match(explorer, /min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-\[0_3px_16px_rgba\(15,23,42,0\.045\)\] sm:p-4/);

  // Numbered pagination, not an incremental "show more" button.
  assert.match(explorer, /function paginationRange\(current: number, total: number\)/);
  assert.match(explorer, /aria-label="Conference product pages"/);
  assert.match(explorer, /aria-current=\{entry === safePage \? "page" : undefined\}/);
  assert.ok(!explorer.includes("Page {safePage} of {totalPages}"), "redundant page-count text must be gone");
  assert.ok(!explorer.includes("Show more"), "incremental show-more paging must be gone");
  assert.ok(!explorer.includes("CONFERENCE_PAGE_SIZE"), "incremental page-size constant must be gone");

  // Query state is validated, reversible and never changes the canonical route.
  assert.match(discovery, /parseConferenceDiscoveryQuery/);
  assert.match(discovery, /buildConferenceDiscoveryQuery/);
  assert.match(explorer, /window\.addEventListener\("popstate", readLocation\)/);
  assert.match(explorer, /"replaceState"/);
  assert.ok(!landing.includes("?page="), "the server-rendered hub must not emit faceted query links");

  // Server facets and connection/meeting options all derive from the complete canonical projection.
  assert.match(landing, /conferenceBrandConfigs\s*\.map\(\(brand\) => \(\{/);
  assert.match(landing, /Object\.entries\(CONFERENCE_PRODUCT_TYPE_LABELS\)/);
  assert.equal(occurrences(landing, ".filter((facet) => facet.count > 0)"), 2);
  assert.match(explorer, /connections: new Set\(catalogProducts\.flatMap/);
  assert.match(landing, /products=\{conferenceExplorerProducts\}/);
  assert.doesNotMatch(landing, /catalogEndpoint="\/conference-system\/catalog-data\.json"/);
});

test("Conference Digital, Video-Hybrid, and Paperless classifications stay evidence-based and separate from connection", () => {
  const core = read("app/conference-system/catalog.ts");
  const catalogs = [
    core,
    read("app/conference-system/catalog.brands.ts"),
    read("app/conference-system/catalog.bosch.ts"),
    read("app/conference-system/catalog.toa.ts"),
    read("app/conference-system/catalog.spon.ts"),
  ].join("\n");
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const landing = read("app/conference-system/page.tsx");
  const explorer = read("app/conference-system/ConferenceProductExplorer.tsx");
  const chooserCards = sectionBetween(landing, "const conferenceSystemChooserCards", "const conferenceRoomSizeCards");

  assert.equal((catalogs.match(/systemTypes: \[[^\]]*"digital"[^\]]*\]/g) ?? []).length, 28);
  assert.equal((catalogs.match(/systemTypes: \[[^\]]*"paperless"[^\]]*\]/g) ?? []).length, 3);
  assert.equal((catalogs.match(/systemCategory: "audio"/g) ?? []).length, 63);
  assert.equal((catalogs.match(/systemCategory: "video"/g) ?? []).length, 4);
  assert.equal((catalogs.match(/systemTypes: \[[^\]]*"video-hybrid"[^\]]*\]/g) ?? []).length, 1);
  assert.equal((catalogs.match(/connection: "wired"/g) ?? []).length, 49);
  assert.equal((catalogs.match(/connection: "wireless"/g) ?? []).length, 10);

  for (const id of [
    "cmx-mc-5800e-paperless-conference-management-server",
    "cmx-mc-5802abc-paperless-digital-conference-host",
    "cmx-mc-5803-paperless-digital-conference-system-host",
  ]) {
    const start = catalogs.indexOf(`id: "${id}"`);
    const end = catalogs.indexOf("\n  {", start);
    const block = catalogs.slice(start, end === -1 ? undefined : end);
    assert.match(block, /systemTypes: \[[^\]]*"paperless"/);
    assert.doesNotMatch(block, /systemCategory: "video"/);
  }

  assert.match(core, /getConferenceProductSystemTypes\(product: ConferenceProduct\)/);
  assert.match(core, /getConferenceProductsBySystemType\(systemType: ConferenceSystemType\)/);
  assert.match(taxonomy, /slug: "digital-conference-system"/);
  assert.match(taxonomy, /slug: "paperless-conference-system"/);
  assert.match(landing, /href: "\/conference-system\/digital-conference-system\/"/);
  assert.match(landing, /href: "\/conference-system\/video-conference-system\/"/);
  assert.match(landing, /title: "Paperless Conference System"/);
  assert.match(landing, /cta: "View Paperless Systems"/);
  assert.match(landing, /href: "\/conference-system\/paperless-conference-system\/"/);
  assert.equal(occurrences(chooserCards, 'title: "'), 5);
  assert.match(landing, /snap-mandatory.*md:grid-cols-2.*xl:grid-cols-5/);
  assert.match(landing, /md:last:col-span-2.*xl:last:col-span-1/);
  assert.doesNotMatch(landing, /href: "\/conference-system\/\?q=digital/);
  assert.match(explorer, /SYSTEM_TYPE_OPTIONS/);
  assert.match(explorer, /product\.systemTypes/);
});

test("Conference landing sends the compact full-catalog projection and defers below-fold rendering", () => {
  const source = read("app/conference-system/page.tsx");
  const header = read("components/common/Header.tsx");
  const explorerData = read("app/conference-system/conferenceExplorerData.ts");
  const catalogRoute = read("app/conference-system/catalog-data.json/route.ts");
  const explorerProps = sectionBetween(source, "<ConferenceProductExplorer", "/>");
  const searchIndex = sectionBetween(explorerData, "searchText: [", ".filter(Boolean)");

  assert.doesNotMatch(searchIndex, /product\.specifications/);
  assert.doesNotMatch(searchIndex, /product\.applications/);
  assert.match(searchIndex, /product\.tags\.join\(" "\)/);
  assert.doesNotMatch(explorerProps, /categories=/);
  assert.match(explorerProps, /products=\{conferenceExplorerProducts\}/);
  assert.doesNotMatch(source, /initialConferenceExplorerProducts|conferenceExplorerProducts\.slice\(/);
  assert.doesNotMatch(explorerProps, /catalogEndpoint=|totalProducts=/);
  assert.match(catalogRoute, /dynamic = "force-static"/);
  assert.match(catalogRoute, /balanceConferenceProductsByBrand\(buildConferenceExplorerProducts\(\)\)/);
  assert.match(source, /contentVisibility: "auto" as const/);
  assert.match(source, /containIntrinsicSize: "auto 520px"/);
  assert.match(source, /max-w-\[clamp\(80rem,90vw,108rem\)\]/);
  assert.match(header, /useConferenceTabletHeader \? "w-full max-w-\[clamp\(80rem,90vw,108rem\)\]" : "max-w-7xl"/);
});

test("Conference comparison engine keeps selection accessible, bounded, persistent, and independent", () => {
  const card = read("app/conference-system/ConferenceProductCard.tsx");
  const explorer = read("app/conference-system/ConferenceProductExplorer.tsx");
  const comparison = read("app/conference-system/conferenceComparison.ts");

  assert.match(card, /aria-pressed=\{compareSelected\}/);
  assert.match(card, /Added to Compare/);
  assert.match(card, /onCompareToggle\(product\.slug\)/);
  assert.match(comparison, /CONFERENCE_COMPARE_STORAGE_KEY = "sasha-conference-compare"/);
  assert.match(explorer, /CONFERENCE_COMPARE_STORAGE_KEY/);
  assert.match(explorer, /window\.sessionStorage/);
  assert.match(explorer, /You can compare up to 3 products\./);
  assert.match(explorer, /Compare \(\{selectedCompareProducts\.length\}\)/);
  assert.match(explorer, /selectedCompareProducts\.length >= 2/);
  assert.match(explorer, /buildConferenceComparisonHref\(compareSlugs\)/);
  assert.match(card, /presentation === "compact"[\s\S]*?aria-pressed=\{compareSelected\}[\s\S]*?onCompareToggle\(product\.slug\)/);
  assert.doesNotMatch(explorer, /updateState\([^)]*compare/i, "comparison selection must remain independent of discovery state");
});

test("Conference comparison helpers sanitize URL state, enforce three products, and expose honest differences", async () => {
  const moduleUrl = pathToFileURL(path.join(root, "app/conference-system/conferenceComparison.ts")).href;
  const comparison = await import(`${moduleUrl}?test=${Date.now()}`);
  const valid = new Set(["one", "two", "three", "four"]);

  assert.deepEqual(comparison.sanitizeComparisonSlugs("one,two", valid), ["one", "two"]);
  assert.deepEqual(comparison.sanitizeComparisonSlugs("one,two,three", valid), ["one", "two", "three"]);
  assert.deepEqual(comparison.sanitizeComparisonSlugs("one,one,invalid,two", valid), ["one", "two"]);
  assert.deepEqual(comparison.sanitizeComparisonSlugs("invalid", valid), []);
  assert.deepEqual(comparison.sanitizeComparisonSlugs("one,two,three,four", valid), ["one", "two", "three"]);
  assert.deepEqual(comparison.restoreComparisonSlugs('["two","invalid","two","one"]', valid), ["two", "one"]);
  assert.deepEqual(comparison.restoreComparisonSlugs("not-json", valid), []);
  assert.deepEqual(comparison.restoreComparisonSlugs('{"one":true}', valid), []);
  assert.equal(comparison.buildConferenceComparisonHref([]), "/conference-system/compare/");
  assert.equal(
    comparison.buildConferenceComparisonHref(["one", "two"]),
    "/conference-system/compare/?products=one%2Ctwo",
  );

  let selection = [];
  selection = comparison.toggleComparisonSelection(selection, "one").slugs;
  selection = comparison.toggleComparisonSelection(selection, "two").slugs;
  selection = comparison.toggleComparisonSelection(selection, "three").slugs;
  const rejected = comparison.toggleComparisonSelection(selection, "four");
  assert.deepEqual(selection, ["one", "two", "three"]);
  assert.equal(rejected.limitReached, true);
  assert.deepEqual(rejected.slugs, selection);
  selection = comparison.toggleComparisonSelection(selection, "two").slugs;
  assert.deepEqual(selection, ["one", "three"], "selected items can be removed");
  selection = [];
  assert.deepEqual(selection, [], "selection can be cleared");

  const product = (overrides) => ({
    slug: "one", name: "Product One", model: "ONE", brand: "Bosch", productTypes: ["Control Unit"],
    productRole: "System controller", connection: "Wired", meetingType: "Audio", systemFamily: null,
    participantCapacity: null, price: "৳10,000", priceType: "Exact", availability: "In stock", warranty: null,
    specifications: [], compatibleProductSlugs: [], image: { src: "/one.webp", alt: "Product One" }, ...overrides,
  });
  const products = [
    product({}),
    product({ slug: "two", name: "Product Two", model: "TWO", price: "৳10,000 - ৳15,000", priceType: "Range", connection: null, specifications: [{ key: "Power Supply", value: "24V" }] }),
    product({ slug: "three", name: "Product Three", model: "THREE", price: "Request quotation", priceType: "Request", productTypes: ["Delegate Unit"], specifications: [{ key: "Power Supply", value: "12V" }] }),
  ];
  const sections = comparison.buildComparisonSections(products, products);
  const rows = sections.flatMap((section) => section.rows);
  assert.deepEqual(rows.find((row) => row.id === "price").values, ["৳10,000", "৳10,000 - ৳15,000", "Request quotation"]);
  assert.equal(rows.find((row) => row.id === "price").different, true);
  assert.deepEqual(rows.find((row) => row.id === "connection").values, ["Wired", "Not specified", "Wired"], "partial missing values are disclosed");
  assert.equal(rows.some((row) => row.id === "warranty"), false, "rows missing for every product are hidden");
  assert.equal(rows.find((row) => row.label === "Power Supply").different, true);
  assert.equal(comparison.getComparisonDifferenceCount(sections), rows.filter((row) => row.different).length);
  assert.equal(comparison.comparisonHasDifferentProductTypes(products), true);
  assert.equal(comparison.comparisonHasDifferentProductTypes([products[0], product({ slug: "four" })]), false);
});

test("Conference compare route is a noindex utility page with canonical URL and safe CTAs", () => {
  const route = read("app/conference-system/compare/page.tsx");
  const client = read("app/conference-system/compare/ConferenceCompareClient.tsx");
  const sitemap = read("app/sitemap.ts");

  assert.match(route, /alternates: \{ canonical: "\/conference-system\/compare\/" \}/);
  assert.match(route, /robots: \{ index: false, follow: true \}/);
  assert.match(route, /<h1[^>]*>Compare Conference Products<\/h1>/);
  assert.match(route, /<Suspense/);
  assert.doesNotMatch(sitemap, /abs\("\/conference-system\/compare\/"\)/);
  assert.match(client, /useSearchParams\(\)/);
  assert.match(client, /Highlight Differences/);
  assert.match(client, /Copy Share Link/);
  assert.match(client, /comparison-product-picker-title/);
  assert.match(client, /restoreComparisonSlugs/);
  assert.match(client, /Compatible and similar products are shown first/);
  assert.match(client, /Change/);
  assert.match(client, /Different/);
  assert.match(client, /This comparison includes different product types/);
  assert.match(client, /overflow-x-auto/);
  assert.match(client, /sticky left-0/);
  assert.match(client, /Get Quote for Selection/);
  assert.match(client, /Get Free BOQ/);
  assert.doesNotMatch(client, /best product|winner|cheapest/i);
});

test("Conference discovery helpers implement deterministic search, filter, price, sort, and URL behavior", async () => {
  const moduleUrl = pathToFileURL(path.join(root, "app/conference-system/conferenceDiscovery.ts")).href;
  const discovery = await import(`${moduleUrl}?test=${Date.now()}`);
  const products = [
    { slug: "bosch-chair", name: "Bosch Chairman", model: "CCS-CU", brandName: "Bosch", productTypeLabel: "Chairman Unit", searchText: "Bosch CCS-CU Chairman wired boardroom", brandSlug: "bosch", productTypes: ["chairman-unit"], connection: "wired", meetingType: "audio", availability: "project-order", priceValue: { type: "fixed", amount: 72_500 } },
    { slug: "toa-control", name: "TOA Controller", model: "TS-900", brandName: "TOA", productTypeLabel: "Control Unit", searchText: "TOA TS controller wired training", brandSlug: "toa", productTypes: ["control-unit"], connection: "wired", meetingType: "audio", availability: "project-order", priceValue: { type: "range", min: 118_000, max: 165_000 } },
    { slug: "cmx-wireless", name: "CMX Wireless Unit", searchText: "CMX wireless chairman", brandSlug: "cmx", productTypes: ["chairman-unit"], connection: "wireless", meetingType: "audio", availability: "contact", priceValue: { type: "request" } },
  ];
  const state = { ...discovery.EMPTY_CONFERENCE_DISCOVERY_STATE };

  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "bOsCh  chairman" }).length, 1);
  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "CCS-CU" })[0].slug, "bosch-chair");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "CCSCU" })[0].slug, "bosch-chair", "model punctuation is optional in search");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "boardroom" })[0].slug, "bosch-chair", "application intent is searchable");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "bosch" })[0].slug, "bosch-chair", "brand text is searchable");
  assert.deepEqual(discovery.filterConferenceProducts(products, { ...state, query: "" }).map((item) => item.slug), products.map((item) => item.slug), "empty search preserves input order");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, brands: ["bosch", "toa"], connections: ["wired"] }).length, 2, "OR within brand and AND across groups");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, brands: ["bosch"], productTypes: ["control-unit"] }).length, 0);
  assert.equal(discovery.filterConferenceProducts(products, { ...state, availabilities: ["contact"] })[0].slug, "cmx-wireless");
  assert.equal(discovery.priceMatchesBand(products[1].priceValue, "100k-200k"), true);
  assert.equal(discovery.priceMatchesBand(products[2].priceValue, "under-25k"), false, "request price is never numeric zero");
  assert.equal(discovery.priceMatchesBand({ type: "fixed", amount: 25_000 }, "under-25k"), false, "exact boundary does not appear in adjacent bands");
  assert.equal(discovery.priceMatchesBand({ type: "fixed", amount: 25_000 }, "25k-50k"), true);
  assert.equal(discovery.priceMatchesBand({ type: "fixed", amount: 50_000 }, "25k-50k"), false);
  assert.equal(discovery.priceMatchesBand({ type: "fixed", amount: 50_000 }, "50k-100k"), true);
  assert.equal(discovery.priceMatchesBand(products[2].priceValue, "request"), true, "request-price products have their own nonnumeric filter");
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 165_000, max: 225_000 }, "100k-200k"), true, "range uses its minimum price");
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 165_000, max: 225_000 }, "over-200k"), false, "one range cannot enter two quick-price buckets");
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 110_000, max: 150_000 }, "100k-200k"), true);
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 80_000, max: 250_000 }, "50k-100k"), true);
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 80_000, max: 250_000 }, "100k-200k"), false, "maximum price does not create an overlapping assignment");
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 201_000, max: 225_000 }, "100k-200k"), false);
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 201_000, max: 225_000 }, "over-200k"), true);
  assert.equal(discovery.priceMatchesBand({ type: "range", min: 165_000, max: 225_000 }, "25k-50k"), false);
  for (const priceValue of products.map((product) => product.priceValue)) {
    const matchingBands = discovery.CONFERENCE_PRICE_BANDS.filter((band) => discovery.priceMatchesBand(priceValue, band.id));
    assert.equal(matchingBands.length, 1, "every valid price has one quick-price assignment");
  }
  assert.equal(discovery.priceOverlapsCustomRange(products[0].priceValue, 70_000, 80_000), true);
  assert.equal(discovery.priceOverlapsCustomRange(products[1].priceValue, 150_000, 180_000), true, "custom price uses range overlap semantics");
  assert.equal(discovery.priceOverlapsCustomRange(products[2].priceValue, 0, 1_000_000), false, "request price is not numeric zero");
  assert.deepEqual(discovery.sortConferenceProducts(products, "price-asc").map((item) => item.slug), ["bosch-chair", "toa-control", "cmx-wireless"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "price-desc").map((item) => item.slug), ["toa-control", "bosch-chair", "cmx-wireless"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "name-asc").map((item) => item.slug), ["bosch-chair", "cmx-wireless", "toa-control"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "name-desc").map((item) => item.slug), ["toa-control", "cmx-wireless", "bosch-chair"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "recommended").map((item) => item.slug), products.map((item) => item.slug));

  const equalPriceProducts = [
    { ...products[0], slug: "first", priceValue: { type: "fixed", amount: 50_000 } },
    { ...products[0], slug: "second", priceValue: { type: "range", min: 50_000, max: 60_000 } },
  ];
  assert.deepEqual(discovery.sortConferenceProducts(equalPriceProducts, "price-asc").map((item) => item.slug), ["first", "second"], "equal numeric keys preserve canonical order");

  const options = { brands: new Set(["bosch", "toa"]), productTypes: new Set(["chairman-unit"]), connections: new Set(["wired"]), meetingTypes: new Set(["audio"]), availabilities: new Set(["project-order", "contact"]) };
  const parsed = discovery.parseConferenceDiscoveryQuery(new URLSearchParams("brand=bosch,invalid&type=chairman-unit&connection=random&availability=project-order&min_price=50000&max_price=200000&page=3&limit=24&sort=name-desc"), options);
  assert.deepEqual(parsed.brands, ["bosch"]);
  assert.deepEqual(parsed.connections, []);
  assert.equal(parsed.page, 3);
  assert.equal(parsed.pageSize, 24);
  assert.equal(parsed.minPrice, 50_000);
  assert.equal(parsed.maxPrice, 200_000);
  assert.deepEqual(parsed.availabilities, ["project-order"]);
  assert.equal(parsed.sort, "name-desc");
  assert.equal(discovery.buildConferenceDiscoveryQuery(parsed), "?brand=bosch&type=chairman-unit&availability=project-order&min_price=50000&max_price=200000&sort=name-desc&page=3&limit=24");
  const malformed = discovery.parseConferenceDiscoveryQuery(new URLSearchParams("page=3x&limit=99&sort=random&brand=invalid&min_price=200&max_price=100"), options);
  assert.equal(malformed.page, 1);
  assert.equal(malformed.sort, "recommended");
  assert.equal(malformed.pageSize, 12);
  assert.equal(malformed.minPrice, null);
  assert.equal(malformed.maxPrice, null);
  assert.deepEqual(malformed.brands, []);
  const paged = discovery.paginateConferenceProducts(products.slice(0, 2), 5, 12);
  assert.equal(paged.page, 1, "stale pagination returns to page one");
  assert.equal(paged.totalPages, 1);
  assert.equal(paged.items.length, 2);
  assert.match(read("app/conference-system/ConferenceProductExplorer.tsx"), /updateState\(\{ \.\.\.state, \.\.\.patch, page: 1 \}/, "search, filter and sort changes reset pagination");
});

test("Conference product pages avoid ineligible Product markup and keep relevance-ranked internal links", () => {
  const route = read("app/conference-system/[slug]/page.tsx");
  const detail = read("app/conference-system/ConferenceProductDetailPage.tsx");
  const gallery = read("app/conference-system/ConferenceProductGallery.tsx");
  const catalog = read("app/conference-system/catalog.ts");
  const relations = read("app/conference-system/conferenceProductRelations.ts");

  // Quotation ranges and project-order/contact availability are not asserted as
  // Google-eligible offers, and product-specific reviews are not fabricated.
  assert.doesNotMatch(route, /"@type": "Product"/);
  assert.doesNotMatch(route, /type="application\/ld\+json"/);
  assert.doesNotMatch(route, /buildProductJsonLd|buildConferenceProductOfferJsonLd/);
  assert.doesNotMatch(route, /AggregateRating|reviewCount/);
  // Related products use explicit compatibility first, then verified family and
  // contextual role/taxonomy signals. Self-links and duplicate slugs are excluded.
  assert.match(route, /getConferenceRelatedProducts\(product, conferenceSystemCatalog\)/);
  assert.match(relations, /current\.compatibleProductIds\.map/);
  assert.match(relations, /current\.systemFamily && product\.systemFamily === current\.systemFamily/);
  assert.match(relations, /RELATED_TYPE_PRIORITIES/);
  assert.match(relations, /product\.id === current\.id \|\| product\.slug === current\.slug/);
  assert.match(relations, /seen\.has\(product\.slug\)/);

  // Commercial metadata remains data-driven and preserves the full Bangladesh
  // intent without falling back to an ambiguous country abbreviation.
  assert.match(route, /function conferenceProductSeoIdentity\(/);
  assert.match(route, /CONFERENCE_PRODUCT_TYPE_LABELS/);
  assert.match(route, /Price in Bangladesh/);
  assert.doesNotMatch(route, /Price in BD/);
  assert.match(route, /title: conferenceProductSeoTitle\(product\)/);
  assert.match(route, /description: conferenceProductSeoDescription\(product\)/);

  // Specifications are a real heading, always rendered - not hidden behind a tab.
  assert.match(detail, /<h2 className="border-b border-slate-200 pb-2 text-base font-bold text-slate-900">Specifications<\/h2>/);
  assert.ok(!detail.includes('useState<"spec" | "description">'), "specification tab state must be gone");
  assert.equal(occurrences(detail, "{product.description}"), 1, "description must not be duplicated on the same page");

  // Compatibility block gives each product its own internal links, with no templated prose.
  assert.match(detail, /System Compatibility/);
  assert.match(detail, /compatibleProducts\.map\(\(item\) => \(/);
  assert.match(detail, /Compatibility should be confirmed before ordering/);
  assert.ok(
    !detail.includes("avoids the compatibility gaps"),
    "the templated compatibility sentence must not be repeated across product pages",
  );

  // One normalized specification list feeds both the table and the schema.
  assert.match(catalog, /export function getConferenceProductSpecifications\(/);
  assert.match(catalog, /const COMMERCIAL_SPEC_KEYS = new Set\(\["Price Basis", "Quotation", "Price", "Support"\]\)/);
  assert.match(catalog, /const SPEC_KEY_ALIASES: Readonly<Record<string, string>>/);
  assert.match(catalog, /const EMPTY_SPECIFICATION_VALUES = new Set/);
  assert.match(detail, /getConferenceProductSpecifications\(product\)/);
  assert.match(detail, /\{specifications\.map\(\(spec\) => \(/);
  assert.match(detail, /getConferenceProductPriceNote\(product\)/);
  assert.ok(!detail.startsWith('"use client";'), "the complete product page must remain a server component");
  assert.match(detail, /<ConferenceProductGallery productName=\{product\.name\} images=\{product\.images\} \/>/);
  assert.match(gallery, /^"use client";/);
  assert.match(gallery, /aria-pressed=\{activeImage\.src === image\.src\}/);
  assert.match(gallery, /alt=\{activeImage\.alt \|\| productName\}/);
  assert.match(gallery, /loading="lazy"/);
  assert.match(gallery, /priority/);
  assert.match(detail, /aria-label="Price and availability"/);
  assert.match(detail, /productFacts\.map/);
  assert.match(detail, /Official Product Documents/);

  // No unverified commerce or manufacturer identifiers are emitted.
  assert.doesNotMatch(route, /\bsku\s*:/);
  assert.doesNotMatch(route, /\bmpn\s*:/);
  assert.doesNotMatch(route, /\bgtin\w*\s*:/);
  assert.ok(!route.includes("offerCount"), "a single listing must not claim an offer count");
  assert.match(route, /compatibleProducts=\{getConferenceCompatibleProducts\(product, conferenceSystemCatalog\)\}/);
  assert.match(route, /categoryLinks=\{conferenceCategoryConfigs/);
  assert.match(route, /brandLink=\{/);
});

test("Conference related products are contextual, explicit-first, unique, and never self-related", async () => {
  const moduleUrl = pathToFileURL(path.join(root, "app/conference-system/conferenceProductRelations.ts")).href;
  const { getConferenceCompatibleProducts, getConferenceRelatedProducts, getConferenceRelatedSectionCopy } = await import(`${moduleUrl}?test=${Date.now()}`);
  const makeProduct = (overrides) => ({
    id: overrides.id,
    slug: overrides.slug ?? overrides.id,
    name: overrides.name ?? overrides.id,
    brand: { name: "Example", slug: "example" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wired",
    productTypes: ["accessory"],
    price: { type: "request", currency: "BDT", displayLabel: "Request Price" },
    availability: "contact",
    shortDescription: "Verified conference product summary.",
    description: "Verified conference product overview.",
    keyFeatures: ["Verified feature one", "Verified feature two", "Verified feature three"],
    specifications: [],
    applications: ["Meeting Room"],
    compatibleProductIds: [],
    images: [{ src: "/example.webp", alt: "Example conference product" }],
    badge: "Conference",
    tags: ["Conference"],
    ...overrides,
  });
  const controller = makeProduct({
    id: "controller",
    productTypes: ["control-unit"],
    compatibleProductIds: ["chairman", "delegate"],
  });
  const chairman = makeProduct({ id: "chairman", productTypes: ["chairman-unit"] });
  const delegate = makeProduct({ id: "delegate", productTypes: ["delegate-unit"] });
  const duplicateDelegate = makeProduct({ id: "duplicate-delegate", slug: "delegate", productTypes: ["delegate-unit"] });
  const unrelated = makeProduct({ id: "camera", productTypes: ["camera"], systemTypes: ["video-hybrid"], systemCategory: "video" });

  assert.deepEqual(
    getConferenceCompatibleProducts(chairman, [controller, chairman, delegate]).map((product) => product.id),
    ["controller"],
    "an explicit catalog relationship remains discoverable in both directions",
  );

  const related = getConferenceRelatedProducts(
    controller,
    [controller, unrelated, delegate, duplicateDelegate, chairman],
    4,
  );
  assert.deepEqual(related.slice(0, 2).map((product) => product.id), ["chairman", "delegate"]);
  assert.ok(related.every((product) => product.id !== controller.id));
  assert.equal(new Set(related.map((product) => product.slug)).size, related.length);
  assert.match(getConferenceRelatedSectionCopy(controller), /Discussion units/);
  assert.match(getConferenceRelatedSectionCopy(makeProduct({ id: "dsp", productTypes: ["dsp"] })), /audio processing/);
  assert.match(getConferenceRelatedSectionCopy(makeProduct({ id: "camera-copy", productTypes: ["camera"] })), /video and hybrid/);
  assert.match(getConferenceRelatedSectionCopy(makeProduct({ id: "paperless", systemTypes: ["paperless"], productTypes: ["processor"] })), /paperless and digital/);

  const paperless = makeProduct({
    id: "paperless-host",
    systemTypes: ["digital", "paperless"],
    productTypes: ["control-unit", "processor"],
    compatibleProductIds: ["paperless-server"],
  });
  const paperlessServer = makeProduct({ id: "paperless-server", systemTypes: ["paperless"], productTypes: ["processor"] });
  const paperlessPeer = makeProduct({ id: "paperless-peer", systemTypes: ["digital", "paperless"], productTypes: ["control-unit"] });
  const unrelatedWireless = makeProduct({ id: "wireless-unit", connection: "wireless", systemTypes: ["digital"], productTypes: ["delegate-unit"] });
  assert.deepEqual(
    getConferenceRelatedProducts(paperless, [paperless, unrelatedWireless, paperlessPeer, paperlessServer], 6).map((product) => product.id),
    ["paperless-server", "paperless-peer"],
  );

  const wirelessController = makeProduct({
    id: "wireless-controller",
    connection: "wireless",
    productTypes: ["control-unit"],
    compatibleProductIds: ["wireless-compatible-unit"],
  });
  const wirelessCompatibleUnit = makeProduct({ id: "wireless-compatible-unit", connection: "wireless", productTypes: ["delegate-unit"] });
  const unverifiedWirelessUnit = makeProduct({ id: "wireless-unverified-unit", connection: "wireless", productTypes: ["delegate-unit"] });
  assert.deepEqual(
    getConferenceRelatedProducts(wirelessController, [wirelessController, unverifiedWirelessUnit, wirelessCompatibleUnit], 6).map((product) => product.id),
    ["wireless-compatible-unit"],
  );
});

test("Conference offer schema emits only valid fixed-price offers", async () => {
  const moduleUrl = pathToFileURL(path.join(root, "app/conference-system/conferenceProductSchema.ts")).href;
  const { buildConferenceProductOfferJsonLd } = await import(`${moduleUrl}?test=${Date.now()}`);
  const fixed = { type: "fixed", amount: 72_500, currency: "BDT" };

  const inStock = buildConferenceProductOfferJsonLd(fixed, "in-stock", "https://sashabd.com/conference-system/example/", "Sasha Corporation");
  assert.equal(inStock.price, 72_500);
  assert.equal(inStock.priceCurrency, "BDT");
  assert.equal(inStock.availability, "https://schema.org/InStock");
  assert.equal(inStock.seller.name, "Sasha Corporation");

  const projectOrder = buildConferenceProductOfferJsonLd(fixed, "project-order", "https://sashabd.com/conference-system/example/", "Sasha Corporation");
  assert.equal("availability" in projectOrder, false, "project order must not be asserted as preorder");
  assert.equal(buildConferenceProductOfferJsonLd({ type: "range", min: 50_000, max: 75_000, currency: "BDT" }, "project-order", "https://sashabd.com/example/", "Sasha Corporation"), undefined);
  assert.equal(buildConferenceProductOfferJsonLd({ type: "request", currency: "BDT" }, "contact", "https://sashabd.com/example/", "Sasha Corporation"), undefined);
  assert.equal(buildConferenceProductOfferJsonLd({ type: "fixed", amount: 0, currency: "BDT" }, "in-stock", "https://sashabd.com/example/", "Sasha Corporation"), undefined);
});

test("Conference quotation links preserve validated product context", () => {
  const card = read("app/conference-system/ConferenceProductCard.tsx");
  const detail = read("app/conference-system/ConferenceProductDetailPage.tsx");
  const compare = read("app/conference-system/compare/ConferenceCompareClient.tsx");
  const contactForm = read("app/contact/ContactForm.tsx");
  const inquiry = read("app/conference-system/conferenceInquiry.ts");
  const contactPage = read("app/contact/page.tsx");

  assert.match(card, /\/contact\/\?project=conference-system&product=\$\{product\.slug\}/);
  assert.match(detail, /\/contact\/\?project=conference-system&product=\$\{product\.slug\}/);
  assert.match(compare, /\/contact\/\?project=conference-system&products=\$\{encodeURIComponent\(selectedSlugs\.join\(","\)\)\}/);
  assert.match(contactForm, /resolveConferenceInquiry\(params, conferenceProducts\)/);
  assert.match(inquiry, /new Map\(conferenceProducts\.map\(\(product\) => \[product\.slug, product\]\)\)/);
  assert.match(inquiry, /\.map\(\(slug\) => productBySlug\.get\(slug\)\)/);
  assert.match(contactForm, /<option>Conference System<\/option>/);
  assert.match(contactForm, /<option>Hybrid \/ Video Meeting Room<\/option>/);
  assert.match(contactForm, /<option value="">Select a solution<\/option>/);
  assert.match(contactForm, /const \[projectType, setProjectType\] = useState\(""\)/);
  assert.match(contactForm, /name="conference_product_slugs"/);
  assert.match(contactForm, /name="conference_package_key"/);
  assert.match(contactForm, /name="conference_room_size"/);
  assert.match(contactForm, /setMessage\(\(current\) => current \|\| context\.message\)/);
  assert.match(inquiry, /requestedProject === "hybrid-conference-room"/);
  assert.match(inquiry, /room_size/);
  assert.match(inquiry, /Room size, participant count, quantity and installation requirements/);
  assert.equal(occurrences(card, "Get a Quote"), 2);
  assert.equal(occurrences(detail, "Get a Quote"), 1);
  assert.match(contactPage, /conferenceSystemCatalog\.map\(\(product\) => \(\{/);
  assert.match(contactPage, /conferenceProducts=\{conferenceQuoteProducts\}/);
});

test("Conference specifications stay classified, consistent, and complete", () => {
  const catalog = read("app/conference-system/catalog.ts");

  // Connection is a classification with exactly two allowed values; anything that
  // describes what a unit connects to is re-keyed to Compatibility.
  assert.match(catalog, /const CONNECTION_VALUES = new Set<string>\(Object\.values\(CONNECTION_LABELS\)\)/);
  assert.match(catalog, /const isConnectionProse = spec\.key === "Connection" && !CONNECTION_VALUES\.has\(spec\.value\)/);
  assert.match(catalog, /push\(isConnectionProse \? "Compatibility" : spec\.key, spec\.value\)/);

  // Canonical rows are derived from typed fields, so they cannot drift per product.
  for (const derived of ["Brand", "Model", "Product Type", "System Family", "Connection", "Participant Capacity", "Room Size", "System Type", "Warranty", "Availability"]) {
    assert.ok(catalog.includes(`push("${derived}"`), `${derived} must be derived from a typed field`);
  }

  // Every core product now carries the rows the brand ranges already had.
  const core = sectionBetween(catalog, "const coreConferenceProducts", "export const conferenceSystemCatalog");
  const coreBlocks = core.split(/\n  \{\n    id: /).slice(1);
  assert.equal(coreBlocks.length, 11);
  for (const block of coreBlocks) {
    assert.match(block, /availability: "project-order"/, "core products need an availability");
    assert.match(block, /\{ key: "Series", value: "[^"]+" \}/, "core products need a Series row");
    assert.match(block, /\{ key: "Installation", value: "[^"]+" \}/, "core products need an Installation row");
  }
});

test("Conference landing shows a trust bar linking every brand to its brand route", () => {
  const landing = read("app/conference-system/page.tsx");
  const trustSection = sectionBetween(
    landing,
    '<section aria-labelledby="conference-trust-heading">',
    '<section id="conference-products-heading"',
  );

  // The trust bar sits directly after the H1 intro card and before the product grid.
  assert.ok(
    landing.indexOf('id="conference-trust-heading"') < landing.indexOf('id="conference-products-heading"'),
    "trust bar must come before the product listing",
  );
  assert.equal(occurrences(landing, 'id="conference-trust-heading"'), 1);
  assert.match(trustSection, /Authorized Conference System Brands/);
  assert.match(trustSection, /Genuine Products[\s\S]*Warranty[\s\S]*Local Support/);
  assert.doesNotMatch(trustSection, /Authorized Distributor/);
  assert.match(trustSection, /xl:min-h-\[80px\].*xl:py-2/);
  assert.match(trustSection, /xl:min-h-\[62px\]/);

  // Every brand logo is a real link into the brand taxonomy.
  assert.match(trustSection, /verifiedConferenceBrandCards\.map\(\(brand\) => \{/);
  assert.match(trustSection, /href=\{brand\.url\}/);
  assert.match(trustSection, /lg:flex lg:justify-center lg:gap-x-7/);
  assert.match(trustSection, /cmx: "h-8 sm:h-9 lg:h-9"/);
  assert.match(trustSection, /brand\.slug === "spon" \? "lg:-mr-5"/);

  // The BOQ, installation, pricing and warranty highlights are present.
  assert.match(trustSection, /conferenceTrustFeatures\.map\(\(feature\) => \(/);
  assert.match(landing, /title: "BOQ & Tender Support"/);
  assert.match(landing, /title: "Installation & Training"/);
  assert.match(landing, /title: "BOQ-Based Pricing"/);
  assert.match(landing, /title: "Applicable Warranty & Support"/);
});

test("Conference products remain discoverable without the removed directory disclosure", () => {
  const landing = read("app/conference-system/page.tsx");
  const sitemap = read("app/sitemap.ts");

  assert.doesNotMatch(landing, /Browse the complete product directory/);
  assert.match(landing, /products=\{conferenceExplorerProducts\}/);
  assert.match(sitemap, /conferenceSystemCatalog\.map\(\(p\) => \(\{/);
  assert.match(sitemap, /url: abs\(`\/conference-system\/\$\{p\.slug\}\/`\)/);
  assert.match(sitemap, /conferenceCategoryConfigs\.filter\(isConferenceCategoryIndexable\)/);

  // The full normalized catalog also supplies a matching ItemList without creating
  // pagination URLs or changing the canonical route architecture.
  assert.match(landing, /const productListJsonLd = \{/);
  assert.match(landing, /"@type": "ItemList"/);
  assert.match(landing, /numberOfItems: conferenceSystemCatalog\.length/);
  assert.match(landing, /JSON\.stringify\(productListJsonLd\)/);
  assert.ok(!landing.includes("?page="), "the hub must not introduce ungoverned pagination URLs");
});

test("Conference collection templates stay normalized, adaptive, and single-DOM", () => {
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");
  const collectionGrid = read("app/conference-system/ConferenceCollectionProductGrid.tsx");
  const collectionPriceTable = read("app/conference-system/ConferenceCollectionPriceTable.tsx");
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const categoryRoute = read("app/conference-system/[slug]/page.tsx");
  const brandRoute = read("app/conference-system/brands/[brandSlug]/page.tsx");
  const productGrid = sectionBetween(collection, "function ProductGrid", "function PriceTable");
  const priceTable = sectionBetween(collection, "function PriceTable", "function RelatedCategoryLinks");

  assert.match(collection, /function CategoryTemplate/);
  assert.match(collection, /function BrandTemplate/);
  assert.equal((productGrid.match(/products\.map\(\(product\)/g) ?? []).length, 1);
  assert.equal((priceTable.match(/products\.map\(\(product\)/g) ?? []).length, 1);
  assert.match(productGrid, /getConferenceProductPrimaryImage\(product\)/);
  assert.match(productGrid, /<ConferenceCollectionProductGrid/);
  assert.match(collectionGrid, /<ConferenceProductCard/);
  assert.match(collectionGrid, /const COLLECTION_PAGE_SIZE = 12/);
  assert.match(collectionGrid, /paginateConferenceProducts\(products, requestedPage, COLLECTION_PAGE_SIZE\)/);
  assert.match(collectionGrid, /totalPages > 1/);
  assert.match(collectionGrid, /shownProducts\.map\(\(product\)/);
  assert.match(productGrid, /slug: product\.slug/);
  assert.match(priceTable, /getConferenceProductPricePresentation\(product\)/);
  assert.match(priceTable, /getConferenceProductAvailabilityLabel\(product\)/);
  assert.match(priceTable, /price\.basisLabel/);
  assert.match(collectionPriceTable, /const REPRESENTATIVE_ROW_LIMIT = 10/);
  assert.match(collectionPriceTable, /visibleRows\.map\(\(row\)/);
  assert.match(collectionPriceTable, /aria-expanded=\{showAll\}/);
  assert.match(taxonomy, /export function getConferenceDisplayApplications\(/);
  assert.match(taxonomy, /const rawApplications = getConferenceApplications\(products\)/);
  assert.match(taxonomy, /Math\.min\(Math\.max\(Math\.trunc\(limit\), 1\), 10\)/);
  assert.doesNotMatch(collection, /const (?:wireless|audio|video|brand)Products\s*=/);
  assert.match(collection, /getConferenceBrandsForProducts\(products\)/);
  assert.match(collection, /getConferenceDisplayApplications\(products\)/);
  assert.match(collection, /getConferenceCategoriesForProducts\(products\)/);
  assert.match(collection, /function getCategoryProductCountLabel/);
  assert.match(collection, /Conference Control Products/);
  assert.match(collection, /Conference Products`/);
  assert.match(collection, /productCountLabel=\{getCategoryProductCountLabel\(category, products\.length\)\}/);
  assert.doesNotMatch(collection, /verified products/i);
  assert.match(collectionGrid, /productCount <= 5/);
  assert.equal(occurrences(collection, "<FaqAccordion"), 1);
  assert.equal(occurrences(collection, '"@type": "FAQPage"'), 1);
  assert.doesNotMatch(collection, /md:hidden[\s\S]{0,1200}hidden md:/);
  assert.match(categoryRoute, /category=\{category\}/);
  assert.match(brandRoute, /brand=\{brand\}/);
});

test("Conference empty and thin routes use content-quality indexability", () => {
  const taxonomy = read("app/conference-system/taxonomy.ts");
  const categoryRoute = read("app/conference-system/[slug]/page.tsx");
  const brandRoute = read("app/conference-system/brands/[brandSlug]/page.tsx");
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");

  assert.match(taxonomy, /function isConferenceCategoryIndexable/);
  assert.match(taxonomy, /content\.highlights\.length >= 3/);
  assert.match(taxonomy, /content\.buyerGuide\.length >= 3/);
  assert.match(taxonomy, /content\.faqs\.length >= 3/);
  assert.match(taxonomy, /function isConferenceBrandIndexable/);
  assert.match(taxonomy, /representedTypes\.length >= 2/);
  assert.match(taxonomy, /representedCategories\.length >= 2/);
  assert.match(categoryRoute, /isConferenceCategoryIndexable\(category\)/);
  assert.match(brandRoute, /isConferenceBrandIndexable\(brand\)/);
  assert.match(categoryRoute, /robots: \{ index: false, follow: true \}/);
  assert.match(brandRoute, /robots: \{ index: false, follow: true \}/);
  assert.match(collection, /No \$\{category\.shortLabel/);
  assert.match(collection, /No \$\{brand\.name\} Conference products listed yet/);
});

test("Conference brands hub shows available brands with customer-facing copy", () => {
  const hub = read("app/conference-system/brands/page.tsx");

  assert.match(hub, /conferenceBrandConfigs\.filter\([\s\S]*getConferenceBrandProductCount\(brand\) > 0/);
  assert.match(hub, /Products Available/);
  assert.doesNotMatch(hub, /planned featured brand registry|normalized data|search indexing|empty brand routes/i);
  assert.doesNotMatch(hub, /Contact for Availability|Other Available Brands/);
  assert.match(hub, /getConferenceCategoryProductCount\(category\)/);
  assert.match(hub, /href="\/conference-system\/"/);
  assert.match(hub, /href="\/contact\/\?project=conference-system"/);
});

test("LED product details render one Featured Products dataset", () => {
  const source = read("components/products/DisplayProductDetailPage.tsx");
  const featuredSection = source.match(/<section className="mt-6">([\s\S]*?)<MobilePostFeaturedCta/)?.[1];

  assert.ok(featuredSection, "Featured Products section source must be present");
  assert.equal((featuredSection.match(/featuredProducts\.map\(\(item\)/g) ?? []).length, 1);
  assert.match(featuredSection, /<ProductGridCard/);
  assert.match(featuredSection, /bullets=\{item\.quickFeatures\}/);
  assert.match(featuredSection, /chips=\{item\.bestFor\}/);
  assert.match(featuredSection, /compactMobile/);
  assert.doesNotMatch(featuredSection, /MobileFeaturedProductsRail/);
  assert.doesNotMatch(featuredSection, /role="link"|router\.push/);
});

test("LED product detail hero is LCP-ready and omits ineligible Product rich-result markup", () => {
  const source = read("components/products/DisplayProductDetailPage.tsx");
  const hero = source.match(/<section className="grid gap-4[\s\S]*?<div>\s*<h1/)?.[0];

  assert.ok(hero, "Product hero source must be present");
  assert.match(hero, /loading="eager"/);
  assert.match(hero, /fetchPriority="high"/);
  assert.match(hero, /decoding="async"/);
  assert.match(hero, /width=\{heroImageDimensions\.width\}/);
  assert.match(hero, /height=\{heroImageDimensions\.height\}/);
  assert.doesNotMatch(hero, /loading="lazy"/);
  assert.doesNotMatch(source, /ProductStructuredData|buildProductStructuredData/);

  for (const file of [
    "modules/routes/catalog/indoor/product-page.tsx",
    "modules/routes/catalog/outdoor/product-page.tsx",
    "modules/routes/catalog/rental/product-page.tsx",
  ]) {
    const route = read(file);
    assert.doesNotMatch(route, /ProductStructuredData|buildProductStructuredData/);
    assert.doesNotMatch(route, /type="application\/ld\+json"/);
  }
});
test("outdoor LED price and category sections use one responsive semantic source", () => {
  const source = read("modules/routes/catalog/outdoor/page.tsx");
  const categoryData = sectionBetween(source, "const categoryLinks", "const pitchCards");

  assert.match(source, /data-outdoor-led-route-kind="hub"/);
  assert.match(source, /quality=\{95\}/);
  assert.match(source, /sizes="100vw"/);
  assert.match(source, /<MobileDisclosure/);
  assert.equal(occurrences(source, "priceRows.map"), 1);
  assert.equal(occurrences(source, "categoryLinks.map"), 1);
  for (const label of ["Indoor LED Displays", "Outdoor LED Displays", "Rental LED Displays"]) {
    assert.equal(occurrences(categoryData, label), 1);
  }
});

test("outdoor LED duplicate-prone groups render one canonical semantic set", () => {
  const source = read("modules/routes/catalog/outdoor/page.tsx");
  const filter = read("components/products/OutdoorFilterSection.tsx");
  const sharedFilter = read("components/products/IndoorFilterSection.tsx");
  const headings = [
    "Outdoor LED Display Solutions for Professional Spaces",
    "Outdoor LED Display Price Per Square Feet in Bangladesh",
    "Outdoor LED Pixel Pitch Guide for Bangladesh (P2.5 to P10)",
    "How to Choose the Right Outdoor LED Display",
    "Key Features of Outdoor LED Display",
    "Applications of Outdoor LED Displays",
    "Main Components of an Outdoor LED Display",
    "Outdoor LED Display Technical Specifications Explained",
    "Outdoor vs Indoor LED Display Comparison",
    "Outdoor LED Screen Waterproof & Durability",
    "Outdoor LED Display Project Consultation in Bangladesh",
    "Recent Outdoor LED Projects",
    "Outdoor LED Display Maintenance and Performance Tips",
    "Explore High-Performance LED Display in Bangladesh",
    "Why Choose Sasha Corporation for Outdoor LED Display in Bangladesh",
    "Outdoor LED Display Installation Process",
    "City Wise Outdoor LED Display Deployment",
    "FAQs About Outdoor LED Display in Bangladesh",
  ];

  assert.match(filter, /variant="outdoor"/);
  assert.match(sharedFilter, /type="search"/);
  assert.match(sharedFilter, /Price: Low to High/);
  assert.match(sharedFilter, /selectedPitches/);
  assert.match(sharedFilter, /selectedUseCases/);
  assert.equal(occurrences(source, "items.map((item)"), 1);
  let previous = -1;
  for (const heading of headings) {
    const position = source.indexOf(heading);
    assert.ok(position > previous, `${heading} must follow the prior outdoor section`);
    previous = position;
  }
  const sectionCalls = [...source.matchAll(/<Section\s+([^>]+)>/g)];
  assert.ok(sectionCalls.length >= headings.length);
  for (const call of sectionCalls) assert.match(call[1], /icon="[^"]+"/);
});

test("rental LED duplicate-prone groups render one canonical semantic set", () => {
  const source = read("modules/routes/catalog/rental/page.tsx");
  const packages = sectionBetween(source, "const rentalPackages", "const pitchGuide");
  const pitchGuide = sectionBetween(source, "const pitchGuide", "const whyChooseRental");
  const whyChoose = sectionBetween(source, "const whyChooseRental", "const rentalProcessSteps");
  const process = sectionBetween(source, "const rentalProcessSteps", "const rentalPlanningGroups");
  const planning = sectionBetween(source, "const rentalPlanningGroups", "const rentalExploreCategories");
  const explore = sectionBetween(source, "const rentalExploreCategories", "function RentalFinalCta");
  const finalCta = sectionBetween(source, "function RentalFinalCta", "export default function RentalProductsPage");

  assert.equal(occurrences(source, "<RentalLedHero />"), 1);
  assert.match(source, /rental-led-hero-banner\.webp/);
  assert.match(source, /quality=\{95\}/);
  assert.match(source, /Make Your Event/);
  assert.match(source, /Bigger &amp;.*Brighter/);
  assert.equal(occurrences(source, "Filter Rental LED Display Options"), 0);
  assert.equal(occurrences(source, "Rental LED Display Models and Features"), 0);
  assert.equal(occurrences(source, "mobileDisplayRows.map((row, index)"), 0);
  assert.equal(occurrences(source, "displayCards.map((p) => renderDisplayCard(p))"), 0);
  assert.match(source, /id="rental-solutions-toggle"/);
  assert.match(source, /htmlFor="rental-solutions-toggle"/);
  assert.match(source, /View Complete Rental Package/);
  assert.match(source, /Show Less/);
  assert.match(source, /Complete Your Rental Setup/);
  assert.match(source, /Get Complete Rental Package/);
  assert.match(source, /#rental-solutions-toggle:checked ~ #rental-expanded-solutions/);
  assert.match(source, /accessories=\{stickyAccessories\}/);
  assert.doesNotMatch(source, /<ProductGridCard/);
  assert.equal(occurrences(source, "Types of LED Display Rental Solutions"), 0);
  assert.equal(occurrences(source, "Why Choose Our Rental LED Display"), 0);
  assert.equal(occurrences(source, "LED Screen Rental for Events"), 0);
  assert.equal(occurrences(source, "Rental LED Display Applications in Bangladesh"), 0);
  assert.equal(occurrences(source, "Rental LED Display Cost Drivers in Bangladesh"), 0);
  assert.equal(occurrences(source, "LED Display Rental Process"), 0);
  assert.equal(occurrences(source, "Fast Setup Checklist (Rental LED Screen)"), 0);
  assert.equal(occurrences(source, "Rental LED Event Booking Planner"), 0);

  for (const heading of [
    "<RentalOccasionShowcase />",
    "<RentalPackageShowcase />",
    "<RentalPitchGuide />",
    "<RentalWhyChoose />",
    "<RentalProcessTimeline />",
    "<RentalPlanningChecklist whatsappHref={wa} />",
    "<RentalExploreCategories />",
    "<RentalFinalCta whatsappHref={wa} />",
  ]) {
    assert.equal(occurrences(source, heading), 1, `${heading} must render once`);
  }

  for (const label of ["Small Indoor Event", "Corporate Stage Package", "Concert & Live Show", "Wedding LED Wall", "Custom Large Event"]) {
    assert.equal(occurrences(packages, label), 1, `${label} must appear once in rental packages`);
  }
  for (const label of ["P2.6", "P3", "P3.91", "P4.81"]) {
    assert.equal(occurrences(pitchGuide, `pitch: "${label}"`), 1, `${label} must appear once in the pitch guide`);
  }
  for (const label of ["Quick-Lock Rental Cabinets", "Professional Rigging & Safety", "NovaStar / Processor Configuration", "Live Camera & AV Integration", "On-Site Operator Support", "Fast Setup & Dismantling"]) {
    assert.equal(occurrences(whyChoose, label), 1, `${label} must appear once in Why Choose`);
  }

  for (const label of ["Share Your Requirements", "Venue Review", "Quote & BOQ", "Setup & Testing", "Event-Day Support", "Dismantling"]) {
    assert.equal(occurrences(process, label), 1, `${label} must appear once in the rental process`);
  }
  for (const label of ["Event & Venue Details", "Screen & Content Requirements", "Rigging, Power & Safety", "Testing, Support & Handover"]) {
    assert.equal(occurrences(planning, label), 1, `${label} must appear once in the planning checklist`);
  }
  for (const label of ["Indoor LED Displays", "Outdoor LED Displays", "Rental LED Displays"]) {
    assert.equal(occurrences(explore, label), 1, `${label} must appear once in Explore`);
  }
  for (const label of ["Request Rental Quote", "Chat on WhatsApp", "Fast Response", "Reliable Service", "Expert Support"]) {
    assert.equal(occurrences(finalCta, label), 1, `${label} must appear once in the final rental CTA`);
  }
  assert.equal(occurrences(source, "Get Event Consultation -&gt;"), 0);
  assert.equal(occurrences(source, "WhatsApp for Booking"), 0);
});

test("indoor LED page duplicate-prone groups render from one semantic source", () => {
  const source = read("modules/routes/catalog/indoor/page.tsx");
  const filter = read("components/products/IndoorFilterSection.tsx");
  const mobileIntro = read("components/common/MobileIntroText.tsx");

  assert.equal(occurrences(filter, "mobileDisplayRows.map((row, index)"), 1);
  assert.equal(occurrences(filter, "displayCards.map((p) => renderDisplayCard(p))"), 0);
  assert.match(filter, /desktopContents/);
  assert.match(mobileIntro, /singleDom/);
  assert.equal(occurrences(source, "singleDom"), 2);
  assert.ok(occurrences(source, "before:content-[attr(data-label)]") >= 8);
  const sectionWrapper = sectionBetween(source, "const Section = ({", "function responsiveCardStyle");
  const sectionSubtitles = [...source.matchAll(/\bsubtitle="([^"]+)"/g)].map((match) => match[1]);

  assert.ok(sectionWrapper, "Indoor section wrapper must be present");
  assert.equal(sectionSubtitles.length, 14);
  assert.equal(new Set(sectionSubtitles).size, sectionSubtitles.length);
  assert.match(mobileIntro, /teaser\?: string/);
  assert.doesNotMatch(sectionWrapper, /teaser=\{subtitle\}/);
  assert.match(sectionWrapper, /singleDom[\s\S]*<p className="text-slate-600 leading-7">\{subtitle\}<\/p>/);
  assert.equal(occurrences(source, "priceRows.map"), 1);
  assert.equal(occurrences(source, "{ t: \"1) Survey\""), 1);
  assert.equal(occurrences(source, "{ t: \"2) Design\""), 1);
  assert.equal(occurrences(source, "{ t: \"3) Install\""), 1);
  assert.equal(occurrences(source, "{ t: \"4) Support\""), 1);
  assert.equal(occurrences(source, "items.map((x, index)"), 1);
  assert.equal(occurrences(source, "rows.map(([k, a, b], index)"), 1);
  assert.equal(occurrences(source, "rows.map(([distance, content, pitch, scenario], index)"), 1);

  for (const [start, end, labels] of [
    [
      "Key Features of Indoor LED Display",
      "Best for showroom",
      ["Fine Pixel Pitch Clarity", "Camera-Friendly Refresh", "Color & Brightness Control", "Efficient, Serviceable Design"],
    ],
    [
      "Main Components of an Indoor LED Display",
      "Indoor LED Display Technical Specifications Explained",
      ["LED module", "Receiving card", "Power supply", "LED cabinet", "Sending card", "Video processor"],
    ],
    [
      "Applications of Indoor LED Displays",
      "Main Components of an Indoor LED Display",
      ["Corporate Boardroom", "Control Room", "Television Studio", "Shopping Mall Advertising", "Conference Hall", "Command & Control Center", "Airport Display", "Exhibition Center"],
    ],
    [
      "Indoor vs Outdoor LED Display Quick Comparison",
      "Indoor LED Display vs LCD Video Wall",
      ["Brightness", "Protection", "Pixel Pitch", "Cabinet Service", "Power/Surge"],
    ],
    [
      "Indoor LED Display Technical Specifications Explained",
      "Indoor vs Outdoor LED Display Quick Comparison",
      ["Pixel Pitch", "Refresh Rate", "Brightness & Grayscale"],
    ],
    [
      "Indoor LED Display Maintenance Guide",
      "Explore High-Performance LED Display in Bangladesh",
      ["Cleaning", "Calibration", "Power safety", "Cooling"],
    ],
    [
      "Indoor LED Display vs LCD Video Wall",
      "Indoor LED Display Project Consultation in Bangladesh",
      ["Seam Visibility", "Scalability", "Viewing Experience", "Long-Hour Operation", "Maintenance", "Best Use Case"],
    ],
    [
      "Explore High-Performance LED Display in Bangladesh",
      "Why Choose Sasha Corporation for Indoor LED Display in Bangladesh",
      ["Indoor LED Displays", "Outdoor LED Displays", "Rental LED Displays"],
    ],
    [
      "How to Choose the Right Pixel Pitch for Indoor LED Display",
      "How to Choose the Right Digital LED Display in Bangladesh",
      ["1.5m to 2.5m", "2.5m to 4m", "4m to 6m", "6m+", "Step 1: Measure real viewing distance", "Step 2: Define dominant content", "Step 3: Balance clarity with lifecycle cost"],
    ],
  ]) {
    const section = sectionBetween(source, start, end);
    for (const label of labels) {
      assert.equal(occurrences(section, label), 1, `${label} must appear once in ${start}`);
    }
  }
});

test("LED display main components render one canonical card list", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const dataSource = source.match(/const ledDisplayComponentCards = \[([\s\S]*?)\];/)?.[1];
  const section = source.match(/Main Components of an LED Display System([\s\S]*?)How the Display System Works/)?.[1];

  assert.ok(dataSource, "LED display component card data must be present");
  assert.ok(section, "Main Components section source must be present");

  const componentNames = [...dataSource.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(componentNames.length, 9);
  assert.equal(new Set(componentNames).size, componentNames.length);
  assert.equal((section.match(/ledDisplayComponentCards\.map\(\(component/g) ?? []).length, 2);
  assert.equal((section.match(/<article/g) ?? []).length, 1);
  assert.match(section, /md:grid-cols-2/);
  assert.match(section, /lg:grid-cols-3/);
});

test("LED display Why Choose benefits render one canonical card list", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const dataSource = source.match(/const sashaWhyChooseCards = \[([\s\S]*?)\];/)?.[1];
  const section = source.match(/Why Choose Sasha Corporation for LED Display Solutions\?([\s\S]*?)Our Project Delivery Process/)?.[1];

  assert.ok(dataSource, "Sasha Why Choose benefit data must be present");
  assert.ok(section, "Why Choose Sasha section source must be present");

  const benefitTitles = [...dataSource.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(benefitTitles.length, 8);
  assert.equal(new Set(benefitTitles).size, benefitTitles.length);
  assert.equal((section.match(/sashaWhyChooseCards\.map\(\(item/g) ?? []).length, 2);
  assert.equal((section.match(/<article/g) ?? []).length, 1);
  assert.match(section, /md:grid-cols-2/);
  assert.match(section, /xl:grid-cols-4/);
});

test("LED display technology partner marquee exposes one semantic logo set", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const dataSource = source.match(/const trustedTechPartnerLogos:[\s\S]*?= \[([\s\S]*?)\];/)?.[1];
  const section = source.match(/Authorized LED Display Distributor &amp; Technology Brands in Bangladesh([\s\S]*?)Trusted by Government, Corporate &amp; Institutional LED Display Clients in Bangladesh/)?.[1];

  assert.ok(dataSource, "Technology partner logo data must be present");
  assert.ok(section, "Technology Partners section source must be present");
  assert.match(source, /new BrowserIntersectionObserver/);
  assert.match(source, /rootMargin: "600px 0px"/);

  const sourceBrands = [...dataSource.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
  const visibleBrands = sourceBrands.filter((brand) => !["Absen", "Unilumin"].includes(brand));
  assert.equal(visibleBrands.length, 11);
  assert.equal(new Set(visibleBrands).size, visibleBrands.length);
  assert.match(section, /ref=\{trustedTechMarqueeRef\}/);
  assert.match(section, /trustedTechCloneReady \? \[true\] : \[\]/);
  assert.match(section, /key=\{isClone \? "visual-clone-track" : "canonical-track"\}/);
  assert.match(section, /aria-hidden=\{isClone \? "true" : undefined\}/);
  assert.match(section, /inert=\{isClone \? true : undefined\}/);
  assert.match(section, /role=\{isClone \? "presentation" : undefined\}/);
  assert.match(section, /alt=\{isClone \? "" : b\.name\}/);
  assert.match(section, /key=\{`\$\{b\.name\}-\$\{isClone \? "visual-clone" : "canonical"\}`\}/);
});

test("LED display client marquee exposes one semantic client set", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const dataSource = source.match(/const ledTrustedInstitutions:[\s\S]*?= \[([\s\S]*?)\];/)?.[1];
  const section = source.match(/Trusted by Government, Corporate &amp; Institutional LED Display Clients in Bangladesh([\s\S]*?)Frequently Asked Questions About LED Display/)?.[1];

  assert.ok(dataSource, "Client logo data must be present");
  assert.ok(section, "LED Display Clients & Projects section source must be present");
  assert.match(source, /LED Display Clients &amp; Projects/);

  const sourceClients = [...dataSource.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(sourceClients.length, 15);
  assert.equal(new Set(sourceClients).size, sourceClients.length);
  assert.match(section, /ref=\{trustedClientMarqueeRef\}/);
  assert.match(section, /trustedClientCloneReady \? \[true\] : \[\]/);
  assert.match(section, /key=\{isClone \? "visual-clone-client-track" : "canonical-client-track"\}/);
  assert.match(section, /aria-hidden=\{isClone \? "true" : undefined\}/);
  assert.match(section, /inert=\{isClone \? true : undefined\}/);
  assert.match(section, /role=\{isClone \? "presentation" : undefined\}/);
  assert.match(section, /alt=\{isClone \? "" : ins\.name\}/);
  assert.match(section, /key=\{`\$\{ins\.name\}-\$\{isClone \? "visual-clone" : "canonical"\}`\}/);
});

test("LED product-card fallbacks avoid unrelated template feature text", () => {
  const card = read("components/products/ProductGridCard.tsx");
  const highlights = read("lib/productCardHighlights.ts");
  const catalog = read("lib/productsCatalog.ts");

  assert.match(highlights, /lightweight cabinet\\b\(\?!\\s\+design\)/);
  assert.doesNotMatch(catalog, new RegExp(`design ${"design"} design`));

  for (const relevantFeature of [
    "Front-service LED module fixing",
    "Low-voltage DC cabinet wiring",
    "Internal cabinet signal connection",
    "26-pin ribbon-cable termination",
    "16-pin ribbon-cable termination",
    "Brackets and mounting hardware",
    "Regulated 5V DC cabinet output",
  ]) {
    assert.ok(card.includes(relevantFeature), `${relevantFeature} fallback must exist`);
  }

  for (const genericFeature of [
    `Clear voice ${"coverage"} planning`,
    `Access-control ${"integration"} ready`,
    `Stable control ${"system"} workflow`,
  ]) {
    assert.ok(card.includes(genericFeature), `${genericFeature} may remain only for non-LED fallback contexts`);
  }

  assert.ok(card.indexOf("Front-service LED module fixing") < card.indexOf(`Access-control ${"integration"} ready`));
  assert.ok(card.indexOf("Internal cabinet signal connection") < card.indexOf(`Clear voice ${"coverage"} planning`));
  assert.ok(card.indexOf("Regulated 5V DC cabinet output") < card.indexOf(`Stable control ${"system"} workflow`));
});

test("P2.6 and P3 rental LED card features stay rental-specific", () => {
  const catalog = read("lib/productsCatalog.ts");
  const p26 = catalog.match(/title: "P2\.6 Rental LED Display"[\s\S]*?quickFeatures: \[([\s\S]*?)\],\s*bestFor:/)?.[1];
  const p3 = catalog.match(/title: "P3 Rental LED Display"[\s\S]*?quickFeatures: \[([\s\S]*?)\],\s*bestFor:/)?.[1];

  assert.ok(p26, "P2.6 rental quickFeatures must be present");
  assert.ok(p3, "P3 rental quickFeatures must be present");

  for (const [source, expected] of [
    [
      p26,
      [
        "Pixel pitch P2.6 for close-view stage displays",
        "Lightweight rental cabinet design",
        "Quick-lock cabinet system for faster setup",
        "Suitable for events, stages, and rental projects",
      ],
    ],
    [
      p3,
      [
        "Pixel pitch P3 for stage and event displays",
        "Lightweight rental cabinet design",
        "Quick-lock cabinet system for repeated installation",
        "Suitable for indoor events and medium viewing distances",
      ],
    ],
  ]) {
    const features = [...source.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(features, expected);
    assert.equal(features.length, 4);
    assert.doesNotMatch(source, /presentation|collaboration|training|touch-ready/i);
  }
});

test("LED display internal product links use only LED-relevant product families", () => {
  const source = read("modules/routes/catalog/products-page.tsx");
  const allowlist = source.match(/const LED_DISPLAY_INTERNAL_LINK_KINDS:[\s\S]*?= \[([\s\S]*?)\];/)?.[1];
  const linkBuilder = source.match(/const fullListGroups = useMemo\(\(\) => \{([\s\S]*?)const waPhone/)?.[1];
  const section = source.match(/Browse All LED Display Products([\s\S]*?)<\/details>/)?.[1];

  assert.ok(allowlist, "LED internal-link allowlist must be present");
  assert.ok(linkBuilder, "Internal-link group builder must be present");
  assert.ok(section, "Internal Product Links section must be present");

  for (const kind of ["indoor", "outdoor", "rental", "receiving-card", "controller", "power-supply", "led-accessories"]) {
    assert.match(allowlist, new RegExp(`"${kind}"`));
  }

  assert.doesNotMatch(allowlist, /"interactive-flat-panel"/);
  assert.doesNotMatch(allowlist, /"digital-podium"/);
  assert.match(linkBuilder, /const kinds = LED_DISPLAY_INTERNAL_LINK_KINDS/);
  assert.match(section, /fullListGroups\.map\(\(group\)/);
  assert.match(section, /group\.items\.map\(\(item\)/);
});

test("redirect configuration has no exact-source destination chains", () => {
  const rows = redirects.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  const exact = rows.map((line) => line.split(/\s+/)).filter(([source]) => !source.includes("*") && !source.includes(":"));
  const sources = new Set(exact.map(([source]) => source));
  const chains = exact.filter(([, destination]) => sources.has(destination));
  assert.deepEqual(chains, []);
});

test("Projects publish only verified completed-project evidence and withhold templates", () => {
  const source = read("app/projects/page.tsx");
  const data = read("app/projects/projectData.ts");

  assert.match(data, /id: "nusaifa-trading-p5-led-billboard-nasirabad"/);
  assert.match(data, /caseStudyHref: "\/blog\/p5-led-billboard-project-nasirabad-chattogram-nusaifa-trading\/"/);
  assert.match(data, /image: "\/assets\/projects\/led-display\/nusaifa-trading\/IMG_20260308_135826902_HDR\.webp"/);
  assert.match(source, /const list = projects;/);
  assert.match(source, /Verified Completed Projects/);
  assert.match(source, /Never render these as Sasha Corporation project evidence/);
  assert.doesNotMatch(source, /const list = .*templateProjects/);
  assert.doesNotMatch(source, /Do these projects represent real work in Bangladesh/);
  assert.doesNotMatch(source, /id: "template-2"/);
});

test("Verified LED display projects use canonical factual data and uploaded images", () => {
  const data = read("app/projects/projectData.ts");
  const landing = read("modules/routes/catalog/products-page.tsx");
  const records = [
    {
      id: "national-library-p2-5-indoor-led-display-dhaka",
      client: "National Library",
      completedIso: "2026-08-14",
      image: "public/assets/projects/led-display/national-library/IMG_20260521_000347272_HDR_AE.webp",
    },
    {
      id: "varendra-university-p2-5-indoor-led-display-rajshahi",
      client: "Varendra University",
      completedIso: "2026-05-11",
      image: "public/assets/projects/led-display/varendra-university/sasha_led_display_installation_room.webp",
    },
    {
      id: "nusaifa-trading-p5-led-billboard-nasirabad",
      client: "Nusaifa Trading",
      completedIso: "2026-03-10",
      image: "public/assets/projects/led-display/nusaifa-trading/IMG_20260308_135826902_HDR.webp",
    },
    {
      id: "funland-p4-leyard-outdoor-led-display-gazipur",
      client: "Laptop Care and Technology, Funland",
      completedIso: "2026-01-05",
      image: "public/assets/projects/led-display/funland/IMG_20260505_180601669_HDR.webp",
    },
    {
      id: "save-the-children-p5-outdoor-led-display-dhaka",
      client: "Save the Children",
      completedIso: "2025-10-19",
      image: "public/assets/projects/led-display/save-the-children/IMG_20260408_170401913_HDR.webp",
    },
    {
      id: "banani-officers-quarter-p3-indoor-led-display-dhaka",
      client: "Banani Officers’ Quarter",
      completedIso: "2024-03-05",
      image: "public/assets/projects/led-display/banani-officers-quarter/project-indoor-wall.webp",
    },
  ];

  assert.equal(occurrences(data, 'category: "led-display"'), records.length);
  for (const record of records) {
    assert.equal(occurrences(data, `id: "${record.id}"`), 1);
    assert.match(data, new RegExp(`organization: "${record.client.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(data, new RegExp(`completedIso: "${record.completedIso}"`));
    assert.ok(existsSync(path.join(root, record.image)), `${record.image} must exist`);
  }

  assert.match(data, /export const ledDisplayProjects = projects\.filter/);
  assert.match(data, /systemType: "P2\.5 Indoor Full-Color LED Display Module"/);
  assert.match(data, /systemType: "P4 Leyard Outdoor SMD LED Display"/);
  assert.match(data, /systemType: "P5 Outdoor LED Billboard"/);
  assert.match(data, /systemType: "P5 Outdoor LED Display"/);
  assert.match(data, /systemType: "P3 Indoor LED Display"/);
  assert.match(data, /\{ k: "Brand", v: "Leyard" \}/);
  assert.ok(occurrences(data, '{ k: "Brand", v: "Lampro" }') >= 4);
  assert.match(landing, /import \{ ledDisplayProjects \} from "@\/app\/projects\/projectData"/);
  assert.match(landing, /ledDisplayProjects\.map\(\(project, index\)/);
  assert.match(landing, /lg:grid-cols-6/);
  assert.match(landing, /lg:col-start-2/);
  assert.match(landing, /aspect-\[16\/10\]/);
  assert.match(landing, /style=\{project\.imagePosition \? \{ objectPosition: project\.imagePosition \} : undefined\}/);
  assert.match(landing, /<dt[^>]*>Completed<\/dt>/);
  assert.match(landing, /<dt[^>]*>Brand<\/dt>/);
  assert.doesNotMatch(landing, /Indoor LED Video Wall Installation|Corporate Office, Dhaka|Rental LED for Concert Event|International Convention City, Bashundhara/);
});

test("Phase 1 keeps the Projects landing multi-solution and corrects shared entity wording", () => {
  const projects = read("app/projects/page.tsx");
  const workflow = sectionBetween(projects, "const workflowSteps = [", "const checklistRows = [");
  const checklist = sectionBetween(projects, "const checklistRows = [", "const PAGE_TITLE");
  const footer = read("components/common/Footer.tsx");
  const turnstile = read("modules/routes/catalog/control-systems/turnstile-gate-system/page.tsx");
  const contact = read("app/contact/page.tsx");

  assert.match(projects, /Professional technology project delivery from requirement assessment and BOQ planning through/);
  assert.equal(occurrences(workflow, 'n: "'), 4);
  for (const title of [
    "Site Assessment & Requirements",
    "Solution Design & BOQ Planning",
    "Installation & Integration",
    "Testing, Commissioning & Handover",
  ]) {
    assert.match(workflow, new RegExp(title.replace(/[&]/g, "\\&")));
  }
  assert.equal(occurrences(checklist, "title:"), 5);
  for (const title of [
    "Requirement & Compatibility Verification",
    "Installation & Cabling Quality",
    "Configuration & System Integration",
    "Performance Testing",
    "Commissioning & Handover",
  ]) {
    assert.ok(checklist.includes(title));
  }
  assert.match(projects, /For conference system projects, include room size, participant capacity/);
  assert.match(projects, /Planning a Technology Project\?/);
  assert.match(projects, /prepare a project-specific equipment list and BOQ/);
  assert.match(
    footer,
    /Sasha Corporation supplies, installs and integrates conference systems, LED displays, PA systems, turnstile and access control solutions, digital podiums and professional AV systems across Bangladesh\./,
  );
  assert.doesNotMatch(turnstile, /Mugnee(?: Multiple)? Ltd\./i);
  assert.match(turnstile, /Sasha Corporation is a trusted/);
  assert.match(turnstile, /Sasha Corporation provides complete/);
  assert.match(turnstile, /Sasha Corporation helps businesses/);
  assert.match(contact, /Sales &amp; Support/);
  assert.doesNotMatch(contact, /call anytime/i);
});

test("Conference project case studies use canonical data, SEO, schema, breadcrumbs, images and sitemap routes", () => {
  const data = read("app/projects/projectData.ts");
  const detail = read("app/projects/[slug]/page.tsx");
  const listing = read("app/projects/page.tsx");
  const sitemap = read("app/sitemap.ts");

  for (const slug of [
    "corporate-boardroom-conference-system-dhaka",
    "smart-meeting-room-conference-system-dhaka",
    "large-conference-room-system-dhaka",
  ]) {
    assert.equal(occurrences(data, `slug: "${slug}"`), 1);
    assert.match(data, new RegExp(`caseStudyHref: "\\/projects\\/${slug}\\/"`));
  }
  assert.equal(occurrences(data, 'category: "conference-system"'), 3);
  assert.match(data, /categoryLabel: "Conference System"/);
  assert.match(data, /Padma WASA Conference System Installation in Munshiganj \| Sasha Corporation/);
  assert.match(data, /Smart Meeting Room Conference System Installation in Dhaka \| Sasha Corporation/);
  assert.match(data, /Large Conference Room System Installation in Dhaka \| Sasha Corporation/);
  assert.match(data, /organization: "Padma WASA"/);
  assert.match(data, /completedIso: "2025-12-07"/);
  assert.match(data, /organization: "Sustainable and Renewable Energy Development Authority \(SREDA\)"/);
  assert.match(data, /completedIso: "2026-02-25"/);
  assert.match(data, /organization: "Department of Environment \(DoE\), Bangladesh"/);
  assert.match(data, /completedIso: "2026-05-15"/);
  assert.match(data, /image: "\/assets\/conference-system\/projects\/conference_p3\.webp"/);
  assert.match(data, /Large conference room digital conference system installation in Dhaka by Sasha Corporation/);
  assert.match(detail, /export const dynamicParams = false/);
  assert.match(detail, /projectCaseStudies\.map\(\(project\) => \(\{ slug: project\.slug \}\)\)/);
  assert.match(detail, /alternates: \{ canonical \}/);
  assert.match(detail, /type: "article"/);
  assert.match(detail, /"@type": "WebPage"/);
  assert.match(detail, /"@type": "ImageObject"/);
  assert.match(detail, /homeBreadcrumb\(\)/);
  assert.match(detail, /\{ href: "\/projects\/", label: "Projects" \}/);
  assert.match(detail, /Request a Conference System BOQ/);
  assert.match(detail, /detail\.ctaHeading \?\? "Planning a Conference Room Project\?"/);
  assert.match(detail, /href: "\/contact\/\?project=conference-system"/);
  assert.match(detail, /const imageWidth = project\.imageWidth \?\? 1448/);
  assert.match(detail, /const imageHeight = project\.imageHeight \?\? 1086/);
  assert.match(detail, /width=\{imageWidth\}/);
  assert.match(detail, /height=\{imageHeight\}/);
  assert.match(detail, /className="h-auto max-h-\[720px\] w-auto max-w-full object-contain"/);
  assert.match(listing, /<ProjectCard key=\{project\.id\} project=\{project\}/);
  assert.match(sitemap, /projectCaseStudies\.map/);
  assert.match(sitemap, /url: abs\(`\/projects\/\$\{project\.slug\}\/`\)/);
});

test("LED display project case studies have dedicated routes, factual SEO data, schema and internal links", () => {
  const data = read("app/projects/projectData.ts");
  const detail = read("app/projects/[slug]/page.tsx");
  const sitemap = read("app/sitemap.ts");

  for (const slug of [
    "national-library-p2-5-indoor-led-display-dhaka",
    "varendra-university-p2-5-indoor-led-display-rajshahi",
    "funland-p4-leyard-outdoor-led-display-gazipur",
    "save-the-children-p5-outdoor-led-display-dhaka",
  ]) {
    assert.equal(occurrences(data, `slug: "${slug}"`), 1);
    assert.match(data, new RegExp(`caseStudyHref: "\\/projects\\/${slug}\\/"`));
  }

  assert.match(data, /export const projectCaseStudies = projects\.filter/);
  assert.match(data, /organizationUrl: "https:\/\/nanl\.gov\.bd\/"/);
  assert.match(data, /organizationUrl: "https:\/\/vu\.edu\.bd\/"/);
  assert.match(data, /organizationUrl: "https:\/\/www\.savethechildren\.net\/bangladesh"/);
  assert.match(detail, /"@type": "Article"/);
  assert.match(detail, /isLedProject \? "Related LED Display Pages"/);
  assert.match(detail, /href: "\/contact\/\?project=led-display"/);
  assert.match(detail, /\["Explore LED Display Solutions", "\/led-display\/"\]/);
  assert.match(detail, /\["View All Completed Projects", "\/projects\/"\]/);
  assert.match(sitemap, /projectCaseStudies\.map/);
});

test("Batch 3 removes unverified social profiles and scopes current partnership claims", () => {
  const site = read("lib/site.ts");
  const footer = read("components/common/Footer.tsx");
  const floatingActions = read("components/common/FloatingActions.tsx");
  const homePartners = read("components/home/TrustedTechnologyPartnersSection.tsx");
  const ledLanding = read("modules/routes/catalog/products-page.tsx");

  for (const source of [site, footer, floatingActions]) {
    assert.doesNotMatch(source, /https:\/\/www\.(?:facebook|youtube)\.com\/?["']/);
  }
  assert.doesNotMatch(floatingActions, /Messenger|showMessenger|siteConfig\.socials/);
  assert.match(floatingActions, /aria-label="Chat on WhatsApp"/);
  assert.doesNotMatch(homePartners, /Authorized Brands|Authorized brand ecosystem/);
  assert.match(homePartners, /Authorized Distributor &amp;/);
  assert.match(homePartners, /Technology Partner in Bangladesh/);
  assert.match(homePartners, /LED Display[\s\S]*Conference System/);
  assert.doesNotMatch(ledLanding, /Authorized Brands|Authorized brand ecosystem/);
  assert.match(ledLanding, /Authorized LED Display Distributor &amp; Technology Brands in Bangladesh/);
});

test("Batch 3 keeps main LED SERP intent factual and authority links focused", () => {
  const page = read("app/led-display/page.tsx");
  const landing = read("modules/routes/catalog/products-page.tsx");
  const hero = read("components/led-display/LedDisplayHero.tsx");

  assert.match(page, /const CURRENT_YEAR = new Date\(\)\.getFullYear\(\)/);
  assert.match(page, /LED Display Price in Bangladesh \$\{CURRENT_YEAR\} \| Sasha Corporation/);
  assert.match(page, /Compare \$\{CURRENT_YEAR\} LED display prices in Bangladesh/);
  assert.match(page, /<ProductsPage currentYear=\{CURRENT_YEAR\}/);
  assert.match(hero, /in Bangladesh \{currentYear\}/);
  assert.match(landing, /LED Display Price List in Bangladesh/);
  assert.doesNotMatch(landing, /<h3[^>]*>Filter Products<\/h3>/);
  assert.match(landing, /\/blog\/led-display-price-in-bangladesh-complete-buying-guide\//);
  assert.match(landing, /href="\/services-support\/"/);
  assert.doesNotMatch(landing, /1-3 year warranty|24\/7 customer support|nationwide after-sales service/i);
});

test("Blog quick summaries and introductions remain reader-focused", () => {
  const source = read("modules/routes/blog/post-page.tsx");
  const listing = read("modules/routes/blog/index-page.tsx");

  assert.match(source, /post\.uniqueSections\.slice\(0, 3\)\.map/);
  assert.match(source, /section\.bullets\?\.\[0\] \?\? section\.paragraphs\[0\]/);
  assert.match(source, /const articleIntro/);
  assert.doesNotMatch(source, /Primary focus:|Key intent keywords:|high-intent search queries/i);
  assert.match(source, /const hasBeenUpdated = post\.updatedAt > post\.publishedAt/);
  assert.match(source, /hasBeenUpdated \? "Updated:" : "Published:"/);
  assert.match(listing, /Published \{formatDate\(item\.publishedAt\)\}/);
  assert.doesNotMatch(listing, /Updated \{formatDate\(item\.updatedAt\)\}/);
});

test("LED hub, category pages, and buying guide use direct contextual internal links", () => {
  const hub = read("modules/routes/catalog/products-page.tsx");
  const indoor = read("modules/routes/catalog/indoor/page.tsx");
  const outdoor = read("modules/routes/catalog/outdoor/page.tsx");
  const rental = read("modules/routes/catalog/rental/page.tsx");
  const blog = read("modules/routes/blog/post-page.tsx");

  assert.match(hub, /LED Display Buying Guide/);
  assert.doesNotMatch(hub, /LED Price Buying Guide/);
  for (const source of [indoor, outdoor, rental]) {
    assert.match(source, /href="\/led-display\/"/);
  }
  assert.match(rental, /href="\/led-display\/rent-guide\/"/);
  assert.match(rental, /LED screen rental planning guide/);
  assert.match(blog, /href="\/led-display\/"/);
  assert.match(blog, /current LED display products and project pricing/);
  assert.doesNotMatch(blog, /hubPrefixes|hubSuffixes|hubQualifiers|hashString/);
});

test("LED price guidance states the verified all-inclusive commercial scope", () => {
  const source = read("modules/routes/catalog/products-page.tsx");

  assert.match(source, /const LED_PRICE_VERIFIED_DATE = "08 September 2026"/);
  assert.match(source, /published per-square-foot price includes LED modules, cabinets, controller, power supplies/);
  assert.match(source, /structure, installation, transportation, VAT, and a 1-year LED display warranty/);
  assert.match(source, /Final quotation is confirmed after the site survey, actual screen size, pixel pitch, installation requirements, and final BOQ/);
  assert.match(source, /Per Sq\.Ft\. Pricing/);
  assert.match(source, /Installed & Delivered/);
  assert.match(source, /VAT included • 1-year warranty/);
});

test("Batch 3 close-out renders each Projects semantic set once", () => {
  const source = read("app/projects/page.tsx");

  assert.equal(occurrences(source, "valueBlocks.map((x)"), 1);
  assert.equal(occurrences(source, "workflowSteps.map((x)"), 1);
  assert.equal(occurrences(source, "checklistRows.map((row)"), 1);
  assert.equal((source.match(/const valueBlocks = \[([\s\S]*?)\] as const;/)?.[1].match(/\bn:/g) ?? []).length, 3);
  assert.equal((source.match(/const workflowSteps = \[([\s\S]*?)\] as const;/)?.[1].match(/\bn:/g) ?? []).length, 4);
  assert.equal((source.match(/const checklistRows = \[([\s\S]*?)\] as const;/)?.[1].match(/title:/g) ?? []).length, 5);
});

test("Batch 3 close-out renders each Services semantic set once", () => {
  const source = read("modules/routes/services/page.tsx");

  assert.equal(occurrences(source, "serviceCoverage.map((x)"), 1);
  assert.equal(occurrences(source, "services.map((s)"), 1);
  assert.equal(occurrences(source, "steps.map((s)"), 1);
  assert.equal((source.match(/const serviceCoverage = \[([\s\S]*?)\];/)?.[1].match(/\bt:/g) ?? []).length, 3);
  assert.equal((source.match(/const services = \[([\s\S]*?)\];/)?.[1].match(/\bicon:/g) ?? []).length, 4);
  assert.equal((source.match(/const steps = \[([\s\S]*?)\];/)?.[1].match(/\bn:/g) ?? []).length, 4);
  assert.equal(occurrences(source, "singleDom"), 9);
});

test("footer decorative waves use complete SVG curve commands", () => {
  const source = read("components/common/Footer.tsx");
  const wavePath = source.match(/d=\{`M0 [^`]+`\}/)?.[0] ?? "";

  assert.match(wavePath, / C 40 .*?, 95 .*?, 160 \$\{46 - row\}`\}/);
  assert.doesNotMatch(wavePath, /, 205 |, 240 /);
  assert.doesNotMatch(wavePath, /undefined|null|NaN/);
  assert.equal(occurrences(source, '<FooterBottomPattern side="'), 2);
});

test("footer navigation arrows are white until their links are hovered", () => {
  const source = read("components/common/Footer.tsx");

  assert.match(
    source,
    /mt-\[5px\] text-white[^"\n]*group-hover:translate-x-1[^"\n]*group-hover:text-\[#FF7A1A\]/,
  );
});

test("global footer uses AV-wide emergency support wording", () => {
  const source = read("components/common/Footer.tsx");

  assert.match(source, /Emergency support for critical AV systems by prior agreement\./);
  assert.doesNotMatch(source, /Emergency support for critical LED screens/);
});
