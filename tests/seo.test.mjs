import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");
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
    "video-conference-system",
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
  for (const title of ["System Types", "Core Components", "Featured Brands", "Complete Setup"]) {
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
  assert.equal(occurrences(header, "className={menuCardClass("), 2);
  assert.equal(occurrences(header, "<MenuCardChevron isCurrent="), 2);
  assert.equal(occurrences(header, "MENU_PANEL_CLASS,"), 2);
  assert.equal(occurrences(header, "className={MENU_SECTION_HEADING_CLASS}"), 1);
  assert.ok(megaMenu.includes("menuCardClass("), "Conference cards use the shared card");
  assert.ok(ledAbout.includes("menuCardClass("), "LED/About cards use the shared card");

  // Current page is marked and announced in every menu (3 desktop + 3 mobile lists).
  assert.equal(occurrences(header, "aria-current={"), 7);

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
  const productGrid = source.match(/\{\/\* PRODUCTS GRID \*\/\}([\s\S]*?)\{showMobilePagination/)?.[1];

  assert.ok(productGrid, "LED product grid source must be present");
  assert.equal((productGrid.match(/section\.products\.map\(\(product\)/g) ?? []).length, 1);
  assert.equal((productGrid.match(/desktopPagedProducts\.map\(renderCatalogCard\)/g) ?? []).length, 1);
  assert.match(productGrid, /data-led-product-id=\{product\.id\}/);
  assert.match(productGrid, /desktopPagedProductIds\.has\(product\.id\)/);
});

test("Conference System renders one responsive semantic content set", () => {
  const source = read("app/conference-system/page.tsx");
  const listing = sectionBetween(source, '<section className="mt-4" aria-labelledby="conference-products-heading">', '<section className={sectionClass} style={sectionStyle} aria-labelledby="what-is-conference-system">');

  assert.equal(occurrences(listing, "<ConferenceProductExplorer"), 1);
  assert.equal(occurrences(source, "renderConferenceProductCard"), 0, "card rendering lives in the explorer only");
  assert.equal(occurrences(source, "mobileProductRows"), 0);
  assert.equal(occurrences(source, "<FaqAccordion"), 1);
  assert.equal(occurrences(source, '\"@type\": \"FAQPage\"'), 1);
  assert.equal(occurrences(source, '<section id="conference-system-price"'), 1);
  assert.equal(occurrences(source, '<h1 className='), 1);

  for (const heading of [
    "Conference System Products",
    "What is a Conference System?",
    "Conference System Price in Bangladesh",
    "Key Components of a Conference System",
    "Types of Conference Systems",
    "Choose Your Conference System",
    "Wired vs Wireless Conference System",
    "Key Benefits of a Professional Conference System",
    "Conference System Applications",
    "Conference System Packages by Room Size",
    "How to Choose the Right Conference System in Bangladesh",
    "Why Choose Sasha Corporation for Conference Systems in Bangladesh?",
    "Brands We Work With",
    "Conference System FAQ",
  ]) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.equal(
      (source.match(new RegExp(`<h2[^>]*>[\\s\\S]*?${escaped}\\s*</h2>`, "g")) ?? []).length,
      1,
      `${heading} must render from one H2 source`,
    );
  }
});

test("Conference definition section stays concise with professional body alignment", () => {
  const source = read("app/conference-system/page.tsx");
  const section = sectionBetween(
    source,
    'aria-labelledby="what-is-conference-system"',
    '<section id="conference-system-price"',
  );

  assert.ok(!section.includes("Meeting room audio solution"));
  assert.ok(!section.includes('className="max-w-5xl"'));
  assert.match(section, /<div className="w-full">/);
  assert.match(section, /<h2 id="what-is-conference-system" className="flex items-center gap-3 text-2xl/);
  assert.match(section, /className="mt-4 w-full"/);
  assert.match(section, /desktopClassName="w-full"/);
  assert.match(section, /<p className="w-full text-left text-sm leading-7 text-slate-700 md:text-base md:leading-8">/);
  assert.ok(!section.includes("text-align-last"));
});

test("Conference definition and price descriptions share full-width professional typography", () => {
  const source = read("app/conference-system/page.tsx");
  const priceSection = sectionBetween(
    source,
    '<section id="conference-system-price"',
    'aria-labelledby="conference-system-components"',
  );

  assert.match(
    priceSection,
    /<p className="mt-4 w-full text-left text-sm leading-7 text-slate-700 md:text-base md:leading-8">/,
  );
  assert.ok(!priceSection.includes("text-align-last"));
});

test("Conference sections avoid redundant eyebrow labels above descriptive H2 headings", () => {
  const source = read("app/conference-system/page.tsx");

  for (const redundantLabel of [
    "Conference system equipment",
    "Conference System Benefits",
    "Buying Guide",
    "Why Choose Us",
  ]) {
    assert.ok(!source.includes(redundantLabel), `${redundantLabel} eyebrow must be removed`);
  }

  for (const id of [
    "conference-system-components",
    "conference-system-benefits",
    "choose-right-conference-system",
    "why-choose-sasha",
  ]) {
    assert.match(source, new RegExp(`<h2 id="${id}" className="flex items-center gap-3 text-2xl`));
  }
});

test("every Conference hub section heading has a consistent relevant icon", () => {
  const source = read("app/conference-system/page.tsx");

  assert.match(source, /type ConferenceSectionIcon =/);
  assert.match(source, /function ConferenceSectionTitleIcon\(/);
  assert.equal(occurrences(source, "<ConferenceSectionTitleIcon icon="), 16);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /bg-gradient-to-br from-orange-50 to-white/);
});

test("Conference brand showcase separates authorization trust from brand navigation", () => {
  const source = read("app/conference-system/page.tsx");
  const section = sectionBetween(
    source,
    'aria-labelledby="conference-brand-showcase"',
    'aria-labelledby="conference-system-faq"',
  );

  assert.match(section, /authorized distributor of Bosch, TOA, SPON, and CMX solutions in Bangladesh/);
  assert.equal(occurrences(source, 'badge: "Authorized Distributor"'), 4);
  assert.equal(occurrences(section, "Project support"), 1);
  assert.match(section, /Authorization scope follows the applicable manufacturer appointment and product-line terms/);
  assert.ok(!section.includes("Exclusive Distributor"));
  for (const brand of ["bosch", "toa", "spon", "cmx"]) {
    assert.match(source, new RegExp(`url: "/conference-system/brands/${brand}/"`));
  }
});

test("Conference catalog is normalized, complete, and route-stable", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const route = read("app/conference-system/[slug]/page.tsx");
  const landing = read("app/conference-system/page.tsx");
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
    assert.match(block, /price: \{ type: "fixed", amount: \d+, currency: "BDT", displayLabel: "[^"]+" \}/);
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
  assert.match(explorer, /<ConferenceProductCard[\s\S]*?product=\{product\}/);
  assert.match(landing, /price: getConferenceProductCardPrice\(product\)/);
  assert.match(landing, /availabilityLabel: product\.availability \? getConferenceProductAvailabilityLabel\(product\) : undefined/);
  assert.match(gallery, /visibleImages\.find/);
  assert.match(detail, /\{specifications\.map\(\(spec\) => \(/);
});

test("Conference normalized prices preserve all 11 visible amounts", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const expectedPrices = [
    [18500, "৳18,500"],
    [145000, "৳145,000"],
    [72500, "৳72,500"],
    [64500, "৳64,500"],
    [54500, "৳54,500"],
    [21500, "৳21,500"],
    [19500, "৳19,500"],
    [34500, "৳34,500"],
    [23500, "৳23,500"],
    [24500, "৳24,500"],
    [36500, "৳36,500"],
  ];
  const actualPrices = [...catalog.matchAll(/price: \{ type: "fixed", amount: (\d+), currency: "BDT", displayLabel: "([^"]+)" \}/g)]
    .map((match) => [Number(match[1]), match[2]]);

  // Every published amount must survive; the order they sit in the file may change.
  const key = (entry) => `${entry[0]}|${entry[1]}`;
  assert.deepEqual(actualPrices.map(key).sort(), expectedPrices.map(key).sort());
  assert.equal(actualPrices.length, expectedPrices.length);
});

test("Conference canonical model supports future discovery without fabricating optional data", () => {
  const catalog = read("app/conference-system/catalog.ts");
  const taxonomy = read("app/conference-system/taxonomy.ts");

  assert.match(catalog, /CONFERENCE_SYSTEM_CATEGORIES = \["audio", "video", "hybrid"\]/);
  assert.match(catalog, /CONFERENCE_CONNECTIONS = \["wired", "wireless", "hybrid"\]/);
  assert.match(catalog, /CONFERENCE_ROOM_SIZES = \["small", "medium", "large", "auditorium"\]/);
  for (const optionalField of ["systemFamily?", "roomSizes?", "participantRange?", "warranty?", "datasheet?", "manual?", "brochure?"]) {
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

  assert.match(price, /export function formatBdtAmount\(amount: number\)/);
  assert.match(catalog, /product\.price\.type === "fixed"[\s\S]*formatBdtAmount\(product\.price\.amount\)/);
  assert.match(catalog, /product\.price\.type === "range"[\s\S]*formatBdtRange\(\[product\.price\.min, product\.price\.max\]\)/);
  assert.match(catalog, /label: "Request Price", state: "request"/);
  assert.match(catalog, /qualifier: "Indicative price"/);
  assert.match(catalog, /export function getConferenceProductCardSpecs\(/);

  assert.equal(occurrences(card, "View Details"), 1);
  assert.equal(occurrences(card, "Request Quotation"), 1);
  assert.ok(!card.includes('className="absolute inset-0 z-10"'));
  assert.match(card, /aria-label=\{`View details for \$\{product\.name\}`\}/);
  assert.match(card, /aria-label=\{`Request quotation for \$\{product\.name\}`\}/);
  assert.match(card, /product\.availabilityLabel \?/);
  assert.match(card, /product\.connectionLabel \?/);
  assert.match(card, /product\.systemFamily \?/);
  assert.doesNotMatch(card, /Compare|wishlist|Limited Stock|Only \d+ left|discount/i);

  assert.match(explorer, /<ConferenceProductCard/);
  assert.match(collection, /<ConferenceProductCard/);
  assert.doesNotMatch(explorer, /<ProductGridCard/);
  assert.doesNotMatch(collection, /<ProductGridCard/);
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

  assert.equal(categorySlugs.length, 10);
  assert.equal(new Set(categorySlugs).size, categorySlugs.length);
  assert.equal(new Set(brandSlugs).size, brandSlugs.length);
  assert.equal(new Set([...categoryIds, ...brandIds]).size, categoryIds.length + brandIds.length);
  assert.deepEqual(categorySlugs, [
    "audio-conference-system",
    "video-conference-system",
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
    'product.systemCategory === "audio"',
    'product.systemCategory === "video"',
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
    ["spon-lcm-6013cv-l-digital-conference-chairman-unit", 'systemCategory: "audio"', 'productTypes: ["chairman-unit"]'],
    ["spon-lcm-6013dv-l-digital-conference-delegate-unit", 'systemCategory: "audio"', 'productTypes: ["delegate-unit"]'],
    ["spon-lcm-6010-digital-conference-system-central-unit", 'systemCategory: "audio"', 'productTypes: ["control-unit"]'],
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

  assert.equal(categoryKeys.length, 10);
  assert.equal(categoryHeroTitles.length, 10);
  assert.equal(new Set(categoryHeroTitles).size, 10, "category hero titles must be unique");
  assert.equal((categorySource.match(/highlights: \[/g) ?? []).length, 10);
  assert.equal((categorySource.match(/buyerGuide: \[/g) ?? []).length, 10);
  assert.equal((categorySource.match(/relatedCategorySlugs: \[/g) ?? []).length, 10);
  assert.equal((categorySource.match(/faqs: \[/g) ?? []).length, 10);
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
  const toa = read("app/conference-system/catalog.toa.ts");
  const core = read("app/conference-system/catalog.ts");
  const all = `${core}\n${bosch}\n${toa}`;

  const ids = [...all.matchAll(/^    id: "([^"]+)",$/gm)].map((m) => m[1]);
  const slugs = [...all.matchAll(/^    slug: "([^"]+)",$/gm)].map((m) => m[1]);
  const names = [...all.matchAll(/^    name: "([^"]+)",$/gm)].map((m) => m[1]);
  const shortDescriptions = [...all.matchAll(/shortDescription:\s*\n?\s*"([^"]{40,})"/g)].map((m) => m[1]);
  const descriptions = [...all.matchAll(/^    description:\s*\n?\s*"([^"]{60,})"/gm)].map((m) => m[1]);

  assert.equal(ids.length, 54, "catalog must expose every verified conference product");
  assert.equal(new Set(ids).size, ids.length, "product ids must be unique");
  assert.equal(new Set(slugs).size, slugs.length, "product slugs must be unique");
  assert.equal(new Set(names).size, names.length, "product names must be unique");
  assert.equal(new Set(shortDescriptions).size, shortDescriptions.length, "short descriptions must be unique for SEO");
  assert.equal(new Set(descriptions).size, descriptions.length, "descriptions must be unique for SEO");
  assert.equal(descriptions.length, ids.length, "every product needs its own description");

  // The merged export keeps the original core products first so their slugs stay stable.
  assert.match(core, /const coreConferenceProducts: ConferenceProduct\[\] = \[/);
  assert.match(
    core,
    /export const conferenceSystemCatalog: ConferenceProduct\[\] = \[\s*\.\.\.coreConferenceProducts,\s*\.\.\.boschConferenceProducts,\s*\.\.\.cmxConferenceProducts,\s*\.\.\.toaConferenceProducts,\s*\];/,
  );

  // PA equipment must not leak into the Conference category.
  for (const paTerm of ["Ceiling Loudspeaker", "Horn Loudspeaker", "Column Loudspeaker", "Mixer Amplifier", "PAVA"]) {
    assert.ok(!bosch.includes(paTerm), `Bosch conference catalog must not list ${paTerm}`);
    assert.ok(!toa.includes(paTerm), `TOA conference catalog must not list ${paTerm}`);
  }
  assert.ok(!all.includes("honeywell"), "Honeywell has no verified conference products");

  // Every brand image reference resolves to a file that is actually on disk.
  const dirMap = { bosch: "bosch_products", cmx: "cmx_products", toa: "toa_products" };
  const refs = [...`${bosch}\n${toa}`.matchAll(/(bosch|cmx|toa)Image\("([^"]+)"\)/g)];
  assert.equal(refs.length, 43, "each brand product carries one primary image");
  for (const [, brand, file] of refs) {
    const relative = path.join("public/images/conference_system_products", dirMap[brand], file);
    assert.ok(statSync(path.join(root, relative)).isFile(), `${relative} must exist`);
  }
});

test("Conference product explorer provides canonical search, multi-filter, sort, query state, and pagination", () => {
  const explorer = read("app/conference-system/ConferenceProductExplorer.tsx");
  const landing = read("app/conference-system/page.tsx");
  const discovery = read("app/conference-system/conferenceDiscovery.ts");

  assert.match(explorer, /^"use client";/);
  assert.match(explorer, /export const CONFERENCE_PRODUCTS_PER_BRAND = 3;/);
  assert.match(explorer, /function balancedByBrand\(/);

  // Page one leads with the headline brands in order; unbranded stock follows later.
  assert.match(explorer, /export const CONFERENCE_BRAND_ORDER = \["cmx", "toa", "bosch", "spon"\] as const;/);
  assert.match(explorer, /const PAGE_SIZE = CONFERENCE_PRODUCTS_PER_BRAND \* CONFERENCE_BRAND_ORDER\.length;/);
  assert.match(explorer, /return index >= 0 \? index : slug \? CONFERENCE_BRAND_ORDER\.length : CONFERENCE_BRAND_ORDER\.length \+ 1;/);
  assert.match(explorer, /if \(rank\(slug\) < CONFERENCE_BRAND_ORDER\.length\)/);
  assert.match(explorer, /filterConferenceProducts\(recommendedProducts, state\)/);
  assert.match(explorer, /sortConferenceProducts\(/);
  assert.match(explorer, /Search products, models, brands or systems/);
  assert.match(explorer, /type="checkbox"/);
  assert.match(explorer, /Active filters/);
  assert.match(explorer, /Remove \$\{filter\.label\} filter/);
  assert.match(explorer, /No conference products match your current search and filters/);
  assert.match(explorer, /aria-live="polite"/);

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

  // Facets are derived from canonical catalog fields and only offered when populated.
  assert.match(landing, /conferenceCategoryConfigs\s*\.map\(\(category\) => \(\{/);
  assert.match(landing, /conferenceBrandConfigs\s*\.map\(\(brand\) => \(\{/);
  assert.match(landing, /Object\.entries\(CONFERENCE_PRODUCT_TYPE_LABELS\)/);
  assert.equal(occurrences(landing, ".filter((facet) => facet.count > 0)"), 3);
  assert.match(landing, /categorySlugs: conferenceCategoryConfigs/);
});

test("Conference discovery helpers implement deterministic search, filter, price, sort, and URL behavior", async () => {
  const moduleUrl = pathToFileURL(path.join(root, "app/conference-system/conferenceDiscovery.ts")).href;
  const discovery = await import(`${moduleUrl}?test=${Date.now()}`);
  const products = [
    { slug: "bosch-chair", name: "Bosch Chairman", model: "CCS-CU", brandName: "Bosch", productTypeLabel: "Chairman Unit", searchText: "Bosch CCS-CU Chairman wired", brandSlug: "bosch", productTypes: ["chairman-unit"], connection: "wired", meetingType: "audio", priceValue: { type: "fixed", amount: 72_500 } },
    { slug: "toa-control", name: "TOA Controller", model: "TS-900", brandName: "TOA", productTypeLabel: "Control Unit", searchText: "TOA TS controller wired", brandSlug: "toa", productTypes: ["control-unit"], connection: "wired", meetingType: "audio", priceValue: { type: "range", min: 118_000, max: 165_000 } },
    { slug: "cmx-wireless", name: "CMX Wireless Unit", searchText: "CMX wireless chairman", brandSlug: "cmx", productTypes: ["chairman-unit"], connection: "wireless", meetingType: "audio", priceValue: { type: "request" } },
  ];
  const state = { ...discovery.EMPTY_CONFERENCE_DISCOVERY_STATE };

  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "bOsCh  chairman" }).length, 1);
  assert.equal(discovery.filterConferenceProducts(products, { ...state, query: "CCS-CU" })[0].slug, "bosch-chair");
  assert.equal(discovery.filterConferenceProducts([...products].reverse(), { ...state, query: "CCS-CU" })[0].slug, "bosch-chair", "exact model match receives deterministic priority");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, brands: ["bosch", "toa"], connections: ["wired"] }).length, 2, "OR within brand and AND across groups");
  assert.equal(discovery.filterConferenceProducts(products, { ...state, brands: ["bosch"], productTypes: ["control-unit"] }).length, 0);
  assert.equal(discovery.priceOverlapsBand(products[1].priceValue, "100k-200k"), true);
  assert.equal(discovery.priceOverlapsBand(products[2].priceValue, "under-25k"), false, "request price is never numeric zero");
  assert.deepEqual(discovery.sortConferenceProducts(products, "price-asc").map((item) => item.slug), ["bosch-chair", "toa-control", "cmx-wireless"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "price-desc").map((item) => item.slug), ["toa-control", "bosch-chair", "cmx-wireless"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "name-asc").map((item) => item.slug), ["bosch-chair", "cmx-wireless", "toa-control"]);
  assert.deepEqual(discovery.sortConferenceProducts(products, "recommended").map((item) => item.slug), products.map((item) => item.slug));

  const options = { brands: new Set(["bosch", "toa"]), productTypes: new Set(["chairman-unit"]), connections: new Set(["wired"]), meetingTypes: new Set(["audio"]) };
  const parsed = discovery.parseConferenceDiscoveryQuery(new URLSearchParams("brand=bosch,invalid&type=chairman-unit&connection=random&page=3&sort=name-desc"), options);
  assert.deepEqual(parsed.brands, ["bosch"]);
  assert.deepEqual(parsed.connections, []);
  assert.equal(parsed.page, 3);
  assert.equal(parsed.sort, "name-desc");
  assert.equal(discovery.buildConferenceDiscoveryQuery(parsed), "?brand=bosch&type=chairman-unit&sort=name-desc&page=3");
});

test("Conference product pages emit Product schema and relevance-ranked internal links", () => {
  const route = read("app/conference-system/[slug]/page.tsx");
  const detail = read("app/conference-system/ConferenceProductDetailPage.tsx");
  const gallery = read("app/conference-system/ConferenceProductGallery.tsx");
  const catalog = read("app/conference-system/catalog.ts");

  // Product / Offer / Brand structured data, priced exactly as the catalog holds it.
  assert.match(route, /function buildProductJsonLd\(/);
  assert.match(route, /"@type": "Product"/);
  assert.match(route, /"@type": "Brand", name: product\.brand\.name/);
  assert.match(route, /product\.price\.type === "fixed"/);
  assert.match(route, /"@type": "AggregateOffer"/);
  assert.match(route, /lowPrice: product\.price\.min/);
  assert.match(route, /highPrice: product\.price\.max/);
  assert.match(route, /additionalProperty: getConferenceProductSpecifications\(product\)\.map/);
  assert.match(route, /type="application\/ld\+json"/);
  // No invented review signals.
  assert.ok(!route.includes("AggregateRating"), "ratings must not be fabricated");
  assert.ok(!route.includes("reviewCount"), "review counts must not be fabricated");

  // Related products are ranked, not the first three of the catalog.
  assert.match(route, /for \(const id of current\.compatibleProductIds\)/);
  assert.match(route, /product\.brand\?\.slug === current\.brand\.slug/);
  assert.match(route, /product\.productTypes\.some\(\(type\) => current\.productTypes\.includes\(type\)\)/);
  assert.ok(
    !/function getRelatedProducts[\s\S]{0,200}\.slice\(0, 3\);\n\}/.test(route),
    "related products must not be a flat catalog slice",
  );

  // Commercial qualifier in the title tag, capped to the SERP limit.
  assert.match(route, /const SERP_TITLE_LIMIT = 60;/);
  assert.match(route, /" Price in Bangladesh", " Price in BD", " Price"/);
  assert.match(route, /title: conferenceProductSeoTitle\(product\.name\)/);

  // Specifications are a real heading, always rendered - not hidden behind a tab.
  assert.match(detail, /<h2 className="border-b border-slate-200 pb-2 text-base font-bold text-slate-900">Specifications<\/h2>/);
  assert.ok(!detail.includes('useState<"spec" | "description">'), "specification tab state must be gone");
  assert.equal(occurrences(detail, "{product.description}"), 1, "description must not be duplicated on the same page");

  // Compatibility block gives each product its own internal links, with no templated prose.
  assert.match(detail, /System Compatibility/);
  assert.match(detail, /compatibleProducts\.map\(\(item\) => \(/);
  assert.ok(
    !detail.includes("avoids the compatibility gaps"),
    "the templated compatibility sentence must not be repeated across product pages",
  );

  // One normalized specification list feeds both the table and the schema.
  assert.match(catalog, /export function getConferenceProductSpecifications\(/);
  assert.match(catalog, /const COMMERCIAL_SPEC_KEYS = new Set\(\["Price Basis", "Quotation", "Price", "Support"\]\)/);
  assert.match(catalog, /const SPEC_KEY_ALIASES: Readonly<Record<string, string>>/);
  assert.match(detail, /getConferenceProductSpecifications\(product\)/);
  assert.match(detail, /\{specifications\.map\(\(spec\) => \(/);
  assert.match(detail, /getConferenceProductPriceNote\(product\)/);
  assert.ok(!detail.startsWith('"use client";'), "the complete product page must remain a server component");
  assert.match(detail, /<ConferenceProductGallery productName=\{product\.name\} images=\{product\.images\} \/>/);
  assert.match(gallery, /^"use client";/);
  assert.match(gallery, /aria-pressed=\{activeImage === image\.src\}/);
  assert.match(gallery, /priority/);
  assert.match(detail, /Availability: \{availabilityLabel\}/);

  // Schema identifiers stay honest: slug as sku, model as mpn only when it is one model.
  assert.match(route, /sku: product\.slug/);
  assert.match(route, /product\.model && !\/\[\/\\s\]\/\.test\(product\.model\)/);
  assert.ok(!route.includes("offerCount"), "a single listing must not claim an offer count");
  assert.match(route, /compatibleProducts=\{product\.compatibleProductIds/);
  assert.match(route, /categoryLinks=\{conferenceCategoryConfigs/);
  assert.match(route, /brandLink=\{/);
});

test("Conference specifications stay classified, consistent, and complete", () => {
  const catalog = read("app/conference-system/catalog.ts");

  // Connection is a classification with exactly two allowed values; anything that
  // describes what a unit connects to is re-keyed to Compatibility.
  assert.match(catalog, /const CONNECTION_VALUES = new Set<string>\(Object\.values\(CONNECTION_LABELS\)\)/);
  assert.match(catalog, /const isConnectionProse = spec\.key === "Connection" && !CONNECTION_VALUES\.has\(spec\.value\)/);
  assert.match(catalog, /push\(isConnectionProse \? "Compatibility" : spec\.key, spec\.value\)/);

  // Canonical rows are derived from typed fields, so they cannot drift per product.
  for (const derived of ["Brand", "Model", "Connection", "System Category", "Availability"]) {
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

test("Conference landing links every brand badge to its brand route", () => {
  const landing = read("app/conference-system/page.tsx");
  const badgeSection = sectionBetween(
    landing,
    '<section className="mt-4" aria-labelledby="conference-brand-badges-heading">',
    '<section className="mt-4" aria-labelledby="conference-products-heading">',
  );

  // The badge row sits directly after the H1 intro card and before the product grid.
  assert.ok(
    landing.indexOf('id="conference-brand-badges-heading"') < landing.indexOf('id="conference-products-heading"'),
    "brand badges must come before the product listing",
  );
  assert.equal(occurrences(landing, 'id="conference-brand-badges-heading"'), 1);
  assert.match(badgeSection, /Shop Conference Systems by Brand/);

  // Every badge is a real link into the brand taxonomy, plus the hub link.
  assert.match(badgeSection, /conferenceExplorerBrands\.map\(\(brand\) => \(/);
  assert.match(badgeSection, /href=\{`\/conference-system\/brands\/\$\{brand\.slug\}\/`\}/);
  assert.match(badgeSection, /href="\/conference-system\/brands\/"/);
  assert.match(badgeSection, /View All Brands/);
});

test("Conference landing exposes every category and product through server-rendered links", () => {
  const landing = read("app/conference-system/page.tsx");

  assert.match(landing, /aria-label="Conference system categories"/);
  assert.match(landing, /conferenceExplorerCategories\.map\(\(category\) => \(/);
  assert.match(landing, /href=\{`\/conference-system\/\$\{category\.slug\}\/`\}/);
  assert.match(landing, /Browse the complete product directory/);
  assert.match(landing, /conferenceSystemCatalog\.map\(\(product\) => \(/);
  assert.match(landing, /href=\{`\/conference-system\/\$\{product\.slug\}\/`\}/);

  // The same normalized catalog supplies a matching ItemList without creating
  // pagination URLs or changing the canonical route architecture.
  assert.match(landing, /const productListJsonLd = \{/);
  assert.match(landing, /"@type": "ItemList"/);
  assert.match(landing, /numberOfItems: conferenceSystemCatalog\.length/);
  assert.match(landing, /JSON\.stringify\(productListJsonLd\)/);
  assert.ok(!landing.includes("?page="), "the hub must not introduce ungoverned pagination URLs");
});

test("Conference collection templates stay normalized, adaptive, and single-DOM", () => {
  const collection = read("app/conference-system/ConferenceCollectionPage.tsx");
  const categoryRoute = read("app/conference-system/[slug]/page.tsx");
  const brandRoute = read("app/conference-system/brands/[brandSlug]/page.tsx");
  const productGrid = sectionBetween(collection, "function ProductGrid", "function PriceTable");
  const priceTable = sectionBetween(collection, "function PriceTable", "function RelatedCategoryLinks");

  assert.match(collection, /function CategoryTemplate/);
  assert.match(collection, /function BrandTemplate/);
  assert.equal((productGrid.match(/products\.map\(\(product\)/g) ?? []).length, 1);
  assert.equal((priceTable.match(/products\.map\(\(product\)/g) ?? []).length, 1);
  assert.match(productGrid, /getConferenceProductPrimaryImage\(product\)/);
  assert.match(productGrid, /<ConferenceProductCard/);
  assert.match(productGrid, /slug: product\.slug/);
  assert.match(priceTable, /product\.price\.displayLabel/);
  assert.match(priceTable, /normalizeDisplayedPriceText/);
  assert.doesNotMatch(collection, /const (?:wireless|audio|video|brand)Products\s*=/);
  assert.match(collection, /getConferenceBrandsForProducts\(products\)/);
  assert.match(collection, /getConferenceApplications\(products\)/);
  assert.match(collection, /getConferenceCategoriesForProducts\(products\)/);
  assert.match(collection, /productCount === 1/);
  assert.match(collection, /productCount <= 5/);
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
  assert.match(collection, /No verified \$\{category\.shortLabel/);
  assert.match(collection, /No verified \$\{brand\.name\} Conference products yet/);
});

test("Conference brands hub distinguishes featured, empty, and other verified brands", () => {
  const hub = read("app/conference-system/brands/page.tsx");

  assert.match(hub, /conferenceBrandConfigs\.filter\(\(brand\) => brand\.featured\)/);
  assert.match(hub, /!brand\.featured && getConferenceBrandProductCount\(brand\) > 0/);
  assert.match(hub, /Products Available/);
  assert.match(hub, /Contact for Availability/);
  assert.match(hub, /Other Available Brands/);
  assert.match(hub, /getConferenceCategoryProductCount\(category\)/);
  assert.match(hub, /href="\/conference-system\/"/);
  assert.match(hub, /href="\/contact\/"/);
});

test("LED product details render one Featured Products dataset", () => {
  const source = read("components/products/DisplayProductDetailPage.tsx");
  const featuredSection = source.match(/<section className="mt-6">([\s\S]*?)<MobilePostFeaturedCta/)?.[1];

  assert.ok(featuredSection, "Featured Products section source must be present");
  assert.equal((featuredSection.match(/featuredProducts\.map\(\(item\)/g) ?? []).length, 1);
  assert.doesNotMatch(featuredSection, /MobileFeaturedProductsRail/);
});

test("LED product detail hero is LCP-ready and Product schema stays factual", () => {
  const source = read("components/products/DisplayProductDetailPage.tsx");
  const schemaComponent = read("components/products/ProductStructuredData.tsx");
  const schema = read("lib/productStructuredData.ts");
  const hero = source.match(/<section className="grid gap-4[\s\S]*?<div>\s*<h1/)?.[0];

  assert.ok(hero, "Product hero source must be present");
  assert.match(hero, /loading="eager"/);
  assert.match(hero, /fetchPriority="high"/);
  assert.match(hero, /decoding="async"/);
  assert.match(hero, /width=\{heroImageDimensions\.width\}/);
  assert.match(hero, /height=\{heroImageDimensions\.height\}/);
  assert.doesNotMatch(hero, /loading="lazy"/);
  assert.match(schemaComponent, /type="application\/ld\+json"/);
  assert.match(schemaComponent, /buildProductStructuredData/);
  assert.doesNotMatch(source, /buildProductStructuredData/);
  for (const file of [
    "modules/routes/catalog/indoor/product-page.tsx",
    "modules/routes/catalog/outdoor/product-page.tsx",
    "modules/routes/catalog/rental/product-page.tsx",
  ]) {
    assert.match(read(file), /<ProductStructuredData/);
  }
  assert.match(schema, /"@type": "Product"/);
  assert.match(schema, /name: product\.title/);
  assert.match(schema, /url: absoluteUrl\(path\)/);
  assert.match(schema, /description: product\.subtitle/);
  assert.doesNotMatch(schema, /AggregateOffer|\boffers?\s*:|\bbrand\s*:|\bsku\s*:|\bmodel\s*:|\bgtin\w*\s*:|\bmpn\s*:/i);
});

test("outdoor LED price and category sections use one responsive semantic source", () => {
  const source = read("modules/routes/catalog/outdoor/page.tsx");
  const sectionWrapper = sectionBetween(source, "const Section = ({", "function responsiveCardStyle");
  const categoryData = sectionBetween(source, "const outdoorCategoryLinks", "function getPitchLabel");
  const priceSection = sectionBetween(source, "Outdoor LED Display Price Per Square Feet in Bangladesh", "Explore LED Display Categories");
  const categorySection = sectionBetween(source, "Explore LED Display Categories", "City Wise Outdoor LED Display Deployment");

  assert.match(sectionWrapper, /singleDom/);
  assert.equal(occurrences(source, "singleDom"), 2);
  assert.equal(occurrences(priceSection, "outdoorPriceRows.map"), 1);
  assert.match(priceSection, /<MobileDisclosure/);
  assert.equal(occurrences(categorySection, "outdoorCategoryLinks.map"), 1);
  for (const label of ["Indoor LED Displays", "Outdoor LED Displays", "Rental LED Displays"]) {
    assert.equal(occurrences(categoryData, label), 1);
  }
});

test("outdoor LED duplicate-prone groups render one canonical semantic set", () => {
  const source = read("modules/routes/catalog/outdoor/page.tsx");
  const filter = read("components/products/OutdoorFilterSection.tsx");
  const cardGrid = sectionBetween(source, "const CardGrid", "export default function OutdoorProductsPage");

  assert.equal(occurrences(filter, "mobileDisplayRows.map((row, index)"), 1);
  assert.equal(occurrences(filter, "displayCards.map((p) => renderDisplayCard(p))"), 0);
  assert.match(filter, /desktopContents/);
  assert.equal(occurrences(cardGrid, "items.map((x, index)"), 1);

  for (const [start, end, labels] of [
    [
      "Key Features of Outdoor LED Display",
      "Why Choose Outdoor LED Display",
      ["High Brightness Visibility", "Weather-Resistant Build", "Long-Distance Readability", "Stable Power & Protection"],
    ],
    [
      "Why Choose Outdoor LED Display",
      "Outdoor vs Indoor LED Display Comparison",
      ["Sunlight readable high brightness", "IP65 / IP66 weather protection", "Long-distance visibility", "24/7 operation support", "Energy-efficient design", "Remote content management", "Power protection and voltage stability", "Serviceable modular maintenance", "Advertisement and announcement in one screen"],
    ],
    [
      "Outdoor vs Indoor LED Display Comparison",
      "Applications of outdoor LED Displays",
      ["Brightness", "Waterproof rating", "Viewing distance", "Pixel pitch range", "Installation area", "Cabinet protection", "Use case", "Price range"],
    ],
    [
      "Applications of outdoor LED Displays",
      "Outdoor LED Display Installation Process",
      ["Roadside advertising LED billboard", "Rooftop LED display", "Shopping mall outdoor signage", "Corporate branding display", "Petrol pump digital signage", "Hotel / restaurant front signage", "Government notice display", "Event & stadium perimeter display"],
    ],
    [
      "Outdoor LED Display Installation Process",
      "Outdoor LED Display Project Consultation in Bangladesh",
      ["Site survey", "Screen size planning", "Structure design", "Electrical planning", "LED cabinet installation", "Configuration & calibration", "Testing & handover", "After-sales support"],
    ],
    [
      "Outdoor LED Display Project Consultation in Bangladesh",
      "Outdoor LED Installation Checklist (Weather + Safety)",
      ["Location + environment: rooftop / roadside / market / highway", "Viewing distance (near & far) + audience angle", "Target screen size (ft) or wall size (W x H)", "Content source: live HDMI / scheduled playback / remote control", "Power: single/three phase + backup (IPS/Generator)", "Weatherproof structure + service access (front/rear)", "Safety: earthing + surge protection (SPD) planning"],
    ],
    [
      "Outdoor LED Installation Checklist (Weather + Safety)",
      "Outdoor LED Pixel Pitch Guide for Bangladesh (P2.5 to P10)",
      ["Weatherproof build", "Power & protection", "Signal & control", "Commissioning"],
    ],
    [
      "Outdoor LED Pixel Pitch Guide for Bangladesh (P2.5 to P10)",
      "Outdoor LED Display Maintenance and Performance Tips",
      ["Close roadside branding (P2.5-P4)", "Mid-range city visibility (P5-P6.67)", "Long-distance highways (P8-P10)", "Selection checklist before purchase"],
    ],
    [
      "Outdoor LED Screen Waterproof & Durability",
      "Outdoor LED Display Price Per Square Feet in Bangladesh",
      ["Rain protection", "Dust protection", "Heat resistance", "Rust-resistant structure", "Stable outdoor performance", "Wind load considerations", "24/7 reliability"],
    ],
    [
      "City Wise Outdoor LED Display Deployment",
      "FAQs About Outdoor LED Display in Bangladesh",
      ["Outdoor LED Display in Dhaka", "Outdoor LED Display in Chattogram", "Outdoor LED Billboard in Sylhet", "Outdoor Advertising Screen in Khulna", "Outdoor LED Display in Rajshahi", "Outdoor LED Display in Barishal", "Outdoor LED Display in Rangpur", "Outdoor LED Display in Mymensingh"],
    ],
  ]) {
    const section = sectionBetween(source, start, end);
    for (const label of labels) {
      assert.equal(occurrences(section, label), 1, `${label} must appear once in ${start}`);
    }
  }
});

test("rental LED duplicate-prone groups render one canonical semantic set", () => {
  const source = read("modules/routes/catalog/rental/page.tsx");
  const sectionWrapper = sectionBetween(source, "const Section = ({", "function responsiveCardStyle");
  const cardGrid = sectionBetween(source, "const CardGrid", "export default function RentalProductsPage");

  assert.equal(occurrences(source, "singleDom"), 2);
  assert.match(sectionWrapper, /singleDom/);
  assert.equal(occurrences(source, "mobileDisplayRows.map((row, index)"), 1);
  assert.equal(occurrences(source, "displayCards.map((p) => renderDisplayCard(p))"), 0);
  assert.match(source, /desktopContents/);
  assert.equal(occurrences(cardGrid, "items.map((x, index)"), 1);

  for (const [start, end, labels] of [
    [
      "Types of LED Display Rental Solutions",
      "Why Choose Our Rental LED Display",
      ["Indoor Rental LED Display", "Outdoor Rental LED Screen", "Stage Background LED Screen", "Concert LED Video Wall", "Wedding LED Display", "Corporate Event LED Screen", "Exhibition LED Display"],
    ],
    [
      "Why Choose Our Rental LED Display",
      "LED Screen Rental for Events",
      ["High brightness LED panels", "Seamless video wall display", "Professional installation", "On-site technical support", "Flexible screen sizes", "Fast setup and dismantling"],
    ],
    [
      "LED Screen Rental for Events",
      "LED Display Rental Process",
      ["Concert", "Wedding", "Political Event", "Corporate Event", "Trade Show", "Product Launch", "Live Streaming Event", "Stage Backdrop"],
    ],
    [
      "LED Display Rental Process",
      "Rental LED Display Applications in Bangladesh",
      ["Contact us", "Share event details", "Choose screen size", "Installation by our engineers", "Event support & operation"],
    ],
    [
      "Fast Setup Checklist (Rental LED Screen)",
      "Rental LED Display Cost Drivers in Bangladesh",
      ["Structure & safety", "Power planning", "Signal & mapping", "Show readiness"],
    ],
    [
      "Rental LED Event Booking Planner",
      "Explore LED Display Categories",
      ["Event & Screen Scope", "Technical Inputs", "Rigging & Safety", "Handover Checklist"],
    ],
    [
      "Explore LED Display Categories",
      "FAQs About Rental LED Display",
      ["Indoor LED Displays", "Outdoor LED Displays", "Rental LED Displays"],
    ],
  ]) {
    const section = sectionBetween(source, start, end);
    for (const label of labels) {
      assert.equal(occurrences(section, label), 1, `${label} must appear once in ${start}`);
    }
  }
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
      "Applications of Indoor LED Displays",
      ["LED module", "Receiving card", "Power supply", "LED cabinet", "Sending card", "Video processor"],
    ],
    [
      "Applications of Indoor LED Displays",
      "Indoor LED Display Project Consultation in Bangladesh",
      ["Corporate Boardroom", "Control Room", "Television Studio", "Shopping Mall Advertising", "Conference Hall", "Command & Control Center", "Airport Display", "Exhibition Center"],
    ],
    [
      "Indoor vs Outdoor LED Display Quick Comparison",
      "Indoor LED Display Technical Specifications Explained",
      ["Brightness", "Protection", "Pixel Pitch", "Cabinet Service", "Power/Surge"],
    ],
    [
      "Indoor LED Display Technical Specifications Explained",
      "Indoor LED Display Maintenance Guide",
      ["Pixel Pitch", "Refresh Rate", "Brightness & Grayscale"],
    ],
    [
      "Indoor LED Display Maintenance Guide",
      "Indoor LED Display vs LCD Video Wall",
      ["Cleaning", "Calibration", "Power safety", "Cooling"],
    ],
    [
      "Indoor LED Display vs LCD Video Wall",
      "Explore High-Performance LED Display in Bangladesh",
      ["Seam Visibility", "Scalability", "Viewing Experience", "Long-Hour Operation", "Maintenance", "Best Use Case"],
    ],
    [
      "Explore High-Performance LED Display in Bangladesh",
      "How to Choose the Right Pixel Pitch for Indoor LED Display",
      ["Indoor LED Displays", "Outdoor LED Displays", "Rental LED Displays"],
    ],
    [
      "How to Choose the Right Pixel Pitch for Indoor LED Display",
      "Indoor LED Display Price Per Square Feet",
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
  const section = source.match(/Main Components of an LED Display System([\s\S]*?)How an LED Display System Works/)?.[1];

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
  const section = source.match(/Why Choose Sasha Corporation for LED Display Solutions\?([\s\S]*?)LED Display Installation Process in Bangladesh/)?.[1];

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
  const section = source.match(/LED Technology &amp; Component Brands([\s\S]*?)Our Valuable Clients/)?.[1];

  assert.ok(dataSource, "Technology partner logo data must be present");
  assert.ok(section, "Technology Partners section source must be present");

  const sourceBrands = [...dataSource.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
  const visibleBrands = sourceBrands.filter((brand) => !["Absen", "Unilumin", "Leyard"].includes(brand));
  assert.equal(visibleBrands.length, 10);
  assert.equal(new Set(visibleBrands).size, visibleBrands.length);
  assert.match(section, /\[false, true\]\.map\(\(isClone\)/);
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
  const section = source.match(/Our Valuable Clients([\s\S]*?)Frequently Asked Questions About LED Display/)?.[1];

  assert.ok(dataSource, "Client logo data must be present");
  assert.ok(section, "Our Valuable Clients section source must be present");

  const sourceClients = [...dataSource.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(sourceClients.length, 15);
  assert.equal(new Set(sourceClients).size, sourceClients.length);
  assert.match(section, /\[false, true\]\.map\(\(isClone\)/);
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
  const linkBuilder = source.match(/const fullListGroups = useMemo\(\(\) => \{([\s\S]*?)const ledFullListLinks = useMemo/)?.[1];
  const section = source.match(/Internal Product Links([\s\S]*?)<\/details>/)?.[1];

  assert.ok(allowlist, "LED internal-link allowlist must be present");
  assert.ok(linkBuilder, "Internal-link group builder must be present");
  assert.ok(section, "Internal Product Links section must be present");

  for (const kind of ["indoor", "outdoor", "rental", "receiving-card", "controller", "power-supply", "led-accessories"]) {
    assert.match(allowlist, new RegExp(`"${kind}"`));
  }

  assert.doesNotMatch(allowlist, /"interactive-flat-panel"/);
  assert.doesNotMatch(allowlist, /"digital-podium"/);
  assert.match(linkBuilder, /const kinds = LED_DISPLAY_INTERNAL_LINK_KINDS/);
  assert.match(section, /ledFullListLinks\.map\(\(item\)/);
});

test("redirect configuration has no exact-source destination chains", () => {
  const rows = redirects.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  const exact = rows.map((line) => line.split(/\s+/)).filter(([source]) => !source.includes("*") && !source.includes(":"));
  const sources = new Set(exact.map(([source]) => source));
  const chains = exact.filter(([, destination]) => sources.has(destination));
  assert.deepEqual(chains, []);
});

test("Batch 3 withholds template projects from published case-study evidence", () => {
  const source = read("app/projects/page.tsx");

  assert.match(source, /const projects: Project\[\] = \[\]/);
  assert.match(source, /const list = projects;/);
  assert.match(source, /Never render these as Sasha Corporation project evidence/);
  assert.match(source, /No client project is currently published from the verified repository dataset/);
  assert.doesNotMatch(source, /const list = .*templateProjects/);
  assert.doesNotMatch(source, /badge: "Delivered project"/);
  assert.doesNotMatch(source, /Do these projects represent real work in Bangladesh/);
});

test("Batch 3 removes unverified social profiles and relationship claims", () => {
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
  for (const source of [homePartners, ledLanding]) {
    assert.doesNotMatch(source, /Authorized Brands|Authorized brand ecosystem/);
    assert.match(source, /LED Technology &amp; Component Brands/);
  }
});

test("Batch 3 keeps main LED SERP intent factual and authority links focused", () => {
  const page = read("app/led-display/page.tsx");
  const landing = read("modules/routes/catalog/products-page.tsx");

  assert.match(page, /LED Display Price in Bangladesh 2026 \| Sasha Corporation/);
  assert.match(page, /Compare 2026 LED display prices in Bangladesh/);
  assert.match(landing, /\/blog\/led-display-price-in-bangladesh-complete-buying-guide\//);
  assert.match(landing, /href="\/services-support\/"/);
  assert.doesNotMatch(landing, /1-3 year warranty|24\/7 customer support|nationwide after-sales service/i);
});

test("Batch 3 close-out renders each Projects semantic set once", () => {
  const source = read("app/projects/page.tsx");

  assert.equal(occurrences(source, "valueBlocks.map((x)"), 1);
  assert.equal(occurrences(source, "workflowSteps.map((x)"), 1);
  assert.equal(occurrences(source, "checklistRows.map((row)"), 1);
  assert.equal((source.match(/const valueBlocks = \[([\s\S]*?)\] as const;/)?.[1].match(/\bn:/g) ?? []).length, 3);
  assert.equal((source.match(/const workflowSteps = \[([\s\S]*?)\] as const;/)?.[1].match(/\bn:/g) ?? []).length, 4);
  assert.equal((source.match(/const checklistRows = \[([\s\S]*?)\] as const;/)?.[1].match(/title:/g) ?? []).length, 6);
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
