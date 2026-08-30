export const MAX_COMPARISON_PRODUCTS = 3;
export const CONFERENCE_COMPARE_STORAGE_KEY = "sasha-conference-compare";

export type ComparisonProductSnapshot = {
  slug: string;
  name: string;
  model: string | null;
  brand: string | null;
  productTypes: string[];
  productRole: string;
  connection: string | null;
  meetingType: string | null;
  systemFamily: string | null;
  participantCapacity: string | null;
  price: string;
  priceType: "Exact" | "Range" | "Request";
  availability: string | null;
  warranty: string | null;
  specifications: Array<{ key: string; value: string }>;
  compatibleProductSlugs: string[];
  image: { src: string; alt: string };
};

export type ComparisonRow = {
  id: string;
  label: string;
  values: string[];
  different: boolean;
};

export type ComparisonSection = { id: string; title: string; rows: ComparisonRow[] };

export function sanitizeComparisonSlugs(raw: string | null | undefined, validSlugs: ReadonlySet<string>): string[] {
  if (!raw) return [];
  const selected: string[] = [];
  for (const candidate of raw.split(",")) {
    const slug = candidate.trim();
    if (validSlugs.has(slug) && !selected.includes(slug)) selected.push(slug);
    if (selected.length === MAX_COMPARISON_PRODUCTS) break;
  }
  return selected;
}

export function restoreComparisonSlugs(
  rawStoredValue: string | null | undefined,
  validSlugs: ReadonlySet<string>,
): string[] {
  if (!rawStoredValue) return [];
  try {
    const stored = JSON.parse(rawStoredValue);
    if (!Array.isArray(stored)) return [];
    return sanitizeComparisonSlugs(
      stored.filter((slug): slug is string => typeof slug === "string").join(","),
      validSlugs,
    );
  } catch {
    return [];
  }
}

export function buildConferenceComparisonHref(slugs: readonly string[]): string {
  const selected = [...new Set(slugs)].slice(0, MAX_COMPARISON_PRODUCTS);
  return selected.length
    ? `/conference-system/compare/?products=${encodeURIComponent(selected.join(","))}`
    : "/conference-system/compare/";
}

export function toggleComparisonSelection(current: readonly string[], slug: string): {
  slugs: string[];
  limitReached: boolean;
} {
  if (current.includes(slug)) {
    return { slugs: current.filter((selectedSlug) => selectedSlug !== slug), limitReached: false };
  }
  if (current.length >= MAX_COMPARISON_PRODUCTS) {
    return { slugs: [...current], limitReached: true };
  }
  return { slugs: [...current, slug], limitReached: false };
}

function normalizeComparisonValue(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

function makeRow(
  id: string,
  label: string,
  products: readonly ComparisonProductSnapshot[],
  getValue: (product: ComparisonProductSnapshot) => string | null | undefined,
  missing = "Not specified",
): ComparisonRow | null {
  const raw = products.map(getValue);
  if (raw.every((value) => !value?.trim())) return null;
  const values = raw.map((value) => value?.trim() || missing);
  return { id, label, values, different: new Set(values.map(normalizeComparisonValue)).size > 1 };
}

function specificationValue(product: ComparisonProductSnapshot, key: string): string | null {
  return product.specifications.find((item) => item.key === key)?.value ?? null;
}

const TECHNICAL_KEY_PATTERN = /(?:capacity|input|output|interface|record|network|expansion|codec|sampling|frequency|microphone|speaker|headphone|display|screen|resolution|zoom|field of view|sensor|lens|aperture|noise|signal-to-noise|power|battery|charging|cable|connector|control port|security)/i;
const INSTALLATION_KEY_PATTERN = /(?:installation|mounting|cabling|deployment|installation environment)/i;

export function buildComparisonSections(
  products: readonly ComparisonProductSnapshot[],
  allProducts: readonly ComparisonProductSnapshot[],
): ComparisonSection[] {
  const bySlug = new Map(allProducts.map((product) => [product.slug, product]));
  const section = (id: string, title: string, rows: Array<ComparisonRow | null>): ComparisonSection | null => {
    const meaningful = rows.filter((row): row is ComparisonRow => Boolean(row));
    return meaningful.length ? { id, title, rows: meaningful } : null;
  };

  const overview = section("overview", "Overview", [
    makeRow("brand", "Brand", products, (product) => product.brand),
    makeRow("model", "Model", products, (product) => product.model),
    makeRow("product-type", "Product Type", products, (product) => product.productTypes.join(", ")),
    makeRow("price", "Price", products, (product) => product.price),
    makeRow("availability", "Availability", products, (product) => product.availability),
    makeRow("warranty", "Warranty", products, (product) => product.warranty),
  ]);

  const system = section("system-role", "System & Role", [
    makeRow("connection", "Connection Type", products, (product) => product.connection),
    makeRow("meeting-type", "System Type", products, (product) => product.meetingType),
    makeRow("role", "Product Role", products, (product) => product.productRole),
    makeRow("system-family", "System Family", products, (product) => product.systemFamily),
    makeRow("participant-capacity", "Participant Capacity", products, (product) => product.participantCapacity),
    makeRow("expandability", "Expandability", products, (product) => specificationValue(product, "Expandability")),
  ]);

  const compatibility = section("compatibility", "Compatibility", [
    makeRow(
      "verified-products",
      "Verified Compatible Products",
      products,
      (product) => {
        const names = product.compatibleProductSlugs.map((slug) => bySlug.get(slug)?.name).filter(Boolean);
        return names.length ? names.join("; ") : null;
      },
      "Not verified",
    ),
    makeRow("compatible-family", "Compatible System Family", products, (product) => product.systemFamily, "Not verified"),
  ]);

  const technicalKeys = [...new Set(products.flatMap((product) => product.specifications.map((spec) => spec.key)))]
    .filter((key) => TECHNICAL_KEY_PATTERN.test(key) && !INSTALLATION_KEY_PATTERN.test(key))
    .slice(0, 18);
  const technical = section(
    "technical",
    "Technical Specifications",
    technicalKeys.map((key) => makeRow(`technical-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, key, products, (product) => specificationValue(product, key))),
  );

  const installationKeys = [...new Set(products.flatMap((product) => product.specifications.map((spec) => spec.key)))]
    .filter((key) => INSTALLATION_KEY_PATTERN.test(key));
  const installation = section(
    "installation",
    "Installation",
    installationKeys.map((key) => makeRow(`installation-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, key, products, (product) => specificationValue(product, key))),
  );

  const commercial = section("commercial", "Commercial Information", [
    makeRow("price-type", "Price Type", products, (product) => product.priceType),
    makeRow("quote", "Quotation", products, () => "Available on request"),
  ]);

  return [overview, system, compatibility, technical, installation, commercial].filter(
    (item): item is ComparisonSection => Boolean(item),
  );
}

export function comparisonHasDifferentProductTypes(products: readonly ComparisonProductSnapshot[]): boolean {
  return new Set(products.map((product) => [...product.productTypes].sort().join("|"))).size > 1;
}

export function getComparisonDifferenceCount(sections: readonly ComparisonSection[]): number {
  return sections.reduce(
    (count, comparisonSection) => count + comparisonSection.rows.filter((row) => row.different).length,
    0,
  );
}
