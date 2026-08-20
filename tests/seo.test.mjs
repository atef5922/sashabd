import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

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

test("desktop About dropdown uses its canonical compact variant", () => {
  const header = read("components/common/Header.tsx");

  assert.match(header, /href: "\/about\/",\s*label: "About"/);
  assert.match(header, /const isAboutDropdown = item\.href === "\/about\/"/);
  assert.match(header, /!isControlSystemsDropdown && !isAboutDropdown/);
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

  assert.equal(occurrences(listing, "conferenceSystemCatalog.map((product) => renderConferenceProductCard(product))"), 1);
  assert.equal(occurrences(source, "mobileProductRows"), 0);
  assert.equal(occurrences(source, "<FaqAccordion"), 1);
  assert.equal(occurrences(source, '\"@type\": \"FAQPage\"'), 1);
  assert.equal(occurrences(source, '<section id="conference-system-price"'), 1);
  assert.equal(occurrences(source, '<h1 className='), 1);

  for (const heading of [
    "Conference System Products",
    "What is a Conference System?",
    "Key Components of a Conference System",
    "Key Benefits of a Professional Conference System",
    "Conference System Applications",
    "Conference System Packages by Room Size",
    "Types of Conference Systems",
    "Conference System Price in Bangladesh",
    "Wired vs Wireless Conference System",
    "How to Choose the Right Conference System in Bangladesh",
    "Why Choose Sasha Corporation for Conference Systems in Bangladesh?",
    "Brands We Work With",
    "Conference System FAQ",
  ]) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.equal(
      (source.match(new RegExp(`<h2[^>]*>\\s*${escaped}\\s*</h2>`, "g")) ?? []).length,
      1,
      `${heading} must render from one H2 source`,
    );
  }
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
