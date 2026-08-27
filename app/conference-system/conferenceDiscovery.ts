export type ConferenceDiscoveryPrice =
  | { type: "fixed"; amount: number }
  | { type: "range"; min: number; max: number }
  | { type: "request" };

export type ConferenceDiscoveryProduct = {
  slug: string;
  name: string;
  model?: string;
  brandName?: string;
  productTypeLabel?: string;
  systemFamily?: string;
  searchText: string;
  brandSlug: string | null;
  productTypes: string[];
  connection: string | null;
  meetingType: string | null;
  systemTypes?: string[];
  availability?: string | null;
  priceValue: ConferenceDiscoveryPrice;
};

export const CONFERENCE_SORT_VALUES = ["recommended", "price-asc", "price-desc", "name-asc", "name-desc"] as const;
export type ConferenceSortValue = (typeof CONFERENCE_SORT_VALUES)[number];

export const CONFERENCE_PRICE_BANDS = [
  { id: "under-25k", label: "Under ৳25,000", min: 0, maxExclusive: 25_000 },
  { id: "25k-50k", label: "৳25,000–৳49,999", min: 25_000, maxExclusive: 50_000 },
  { id: "50k-100k", label: "৳50,000–৳99,999", min: 50_000, maxExclusive: 100_000 },
  { id: "100k-200k", label: "৳100,000–৳199,999", min: 100_000, maxExclusive: 200_000 },
  { id: "over-200k", label: "৳200,000+", min: 200_000, maxExclusive: Number.POSITIVE_INFINITY },
  { id: "request", label: "Request Price", requestOnly: true },
] as const;

export const CONFERENCE_RESULT_LIMITS = [12, 24, 48] as const;
export type ConferencePageSize = (typeof CONFERENCE_RESULT_LIMITS)[number];
export const CONFERENCE_MAX_CUSTOM_PRICE = 100_000_000;

export type ConferenceDiscoveryState = {
  query: string;
  brands: string[];
  productTypes: string[];
  connections: string[];
  meetingTypes: string[];
  availabilities: string[];
  priceBands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: ConferenceSortValue;
  page: number;
  pageSize: ConferencePageSize;
};

export const EMPTY_CONFERENCE_DISCOVERY_STATE: ConferenceDiscoveryState = {
  query: "",
  brands: [],
  productTypes: [],
  connections: [],
  meetingTypes: [],
  availabilities: [],
  priceBands: [],
  minPrice: null,
  maxPrice: null,
  sort: "recommended",
  page: 1,
  pageSize: 12,
};

export type ConferenceDiscoveryOptions = {
  brands: ReadonlySet<string>;
  productTypes: ReadonlySet<string>;
  connections: ReadonlySet<string>;
  meetingTypes: ReadonlySet<string>;
  availabilities: ReadonlySet<string>;
};

function validList(value: string | null, allowed: ReadonlySet<string>): string[] {
  if (!value) return [];
  return [...new Set(value.split(",").map((item) => item.trim()).filter((item) => allowed.has(item)))];
}

function validInteger(value: string | null, minimum: number, maximum: number): number | null {
  if (!value || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= minimum && parsed <= maximum ? parsed : null;
}

export function parseConferenceDiscoveryQuery(
  params: URLSearchParams,
  options: ConferenceDiscoveryOptions,
): ConferenceDiscoveryState {
  const sortValue = params.get("sort");
  const pageValue = validInteger(params.get("page"), 1, 10_000) ?? 1;
  const pageSizeValue = validInteger(params.get("limit"), 1, 100) ?? 12;
  const parsedMinPrice = validInteger(params.get("min_price"), 0, CONFERENCE_MAX_CUSTOM_PRICE);
  const parsedMaxPrice = validInteger(params.get("max_price"), 0, CONFERENCE_MAX_CUSTOM_PRICE);
  const customPriceOrderIsValid = parsedMinPrice === null || parsedMaxPrice === null || parsedMinPrice <= parsedMaxPrice;
  return {
    query: (params.get("q") ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
    brands: validList(params.get("brand"), options.brands),
    productTypes: validList(params.get("type"), options.productTypes),
    connections: validList(params.get("connection"), options.connections),
    meetingTypes: validList(params.get("meeting"), options.meetingTypes),
    availabilities: validList(params.get("availability"), options.availabilities),
    priceBands: validList(params.get("price"), new Set(CONFERENCE_PRICE_BANDS.map((band) => band.id))),
    minPrice: customPriceOrderIsValid ? parsedMinPrice : null,
    maxPrice: customPriceOrderIsValid ? parsedMaxPrice : null,
    sort: CONFERENCE_SORT_VALUES.includes(sortValue as ConferenceSortValue)
      ? (sortValue as ConferenceSortValue)
      : "recommended",
    page: pageValue,
    pageSize: CONFERENCE_RESULT_LIMITS.includes(pageSizeValue as ConferencePageSize)
      ? (pageSizeValue as ConferencePageSize)
      : 12,
  };
}

export function buildConferenceDiscoveryQuery(state: ConferenceDiscoveryState): string {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.brands.length) params.set("brand", state.brands.join(","));
  if (state.productTypes.length) params.set("type", state.productTypes.join(","));
  if (state.connections.length) params.set("connection", state.connections.join(","));
  if (state.meetingTypes.length) params.set("meeting", state.meetingTypes.join(","));
  if (state.availabilities.length) params.set("availability", state.availabilities.join(","));
  if (state.priceBands.length) params.set("price", state.priceBands.join(","));
  if (state.minPrice !== null) params.set("min_price", String(state.minPrice));
  if (state.maxPrice !== null) params.set("max_price", String(state.maxPrice));
  if (state.sort !== "recommended") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  if (state.pageSize !== 12) params.set("limit", String(state.pageSize));
  const query = params.toString();
  return query ? `?${query}` : "";
}

function normalizeDiscoveryText(value: string): string {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase("en")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0980-\u09ff]+/g, " ")
    .trim();
}

function searchMatches(product: ConferenceDiscoveryProduct, query: string): boolean {
  const terms = normalizeDiscoveryText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = normalizeDiscoveryText(product.searchText);
  const compactHaystack = haystack.replace(/\s+/g, "");
  return terms.every((term) => haystack.includes(term) || compactHaystack.includes(term));
}

/**
 * Assigns every product to exactly one quick-price bucket. Ranged prices use
 * their published starting price so a single product never inflates several
 * facet counts.
 */
export function priceMatchesBand(price: ConferenceDiscoveryPrice, bandId: string): boolean {
  if (price.type === "request") return bandId === "request";
  const band = CONFERENCE_PRICE_BANDS.find((item) => item.id === bandId);
  if (!band || "requestOnly" in band) return false;
  const productMinimum = price.type === "fixed" ? price.amount : price.min;
  return productMinimum >= band.min && productMinimum < band.maxExclusive;
}

export function priceOverlapsCustomRange(
  price: ConferenceDiscoveryPrice,
  minPrice: number | null,
  maxPrice: number | null,
): boolean {
  if (minPrice === null && maxPrice === null) return true;
  if (price.type === "request" || (minPrice !== null && maxPrice !== null && minPrice > maxPrice)) return false;
  const productMin = price.type === "fixed" ? price.amount : price.min;
  const productMax = price.type === "fixed" ? price.amount : price.max;
  return productMax >= (minPrice ?? 0) && productMin <= (maxPrice ?? Number.POSITIVE_INFINITY);
}

export function filterConferenceProducts<T extends ConferenceDiscoveryProduct>(
  products: readonly T[],
  state: ConferenceDiscoveryState,
): T[] {
  return products.filter((product) =>
    searchMatches(product, state.query) &&
    (!state.brands.length || (product.brandSlug !== null && state.brands.includes(product.brandSlug))) &&
    (!state.productTypes.length || product.productTypes.some((type) => state.productTypes.includes(type))) &&
    (!state.connections.length || (product.connection !== null && state.connections.includes(product.connection))) &&
    (!state.meetingTypes.length || (product.systemTypes ?? (product.meetingType ? [product.meetingType] : [])).some((systemType) => state.meetingTypes.includes(systemType))) &&
    (!state.availabilities.length || (product.availability !== undefined && product.availability !== null && state.availabilities.includes(product.availability))) &&
    (!state.priceBands.length || state.priceBands.some((band) => priceMatchesBand(product.priceValue, band))) &&
    priceOverlapsCustomRange(product.priceValue, state.minPrice, state.maxPrice)
  );
}

export function sortConferenceProducts<T extends ConferenceDiscoveryProduct>(
  products: readonly T[],
  sort: ConferenceSortValue,
): T[] {
  const indexed = products.map((product, index) => ({ product, index }));
  const numericPrice = (product: T, high: boolean) => {
    if (product.priceValue.type === "request") return null;
    if (product.priceValue.type === "fixed") return product.priceValue.amount;
    return high ? product.priceValue.max : product.priceValue.min;
  };
  indexed.sort((a, b) => {
    if (sort === "recommended") return a.index - b.index;
    if (sort === "name-asc" || sort === "name-desc") {
      const comparison = a.product.name.localeCompare(b.product.name, "en", { sensitivity: "base" });
      return (sort === "name-asc" ? comparison : -comparison) || a.index - b.index;
    }
    const high = sort === "price-desc";
    const aPrice = numericPrice(a.product, high);
    const bPrice = numericPrice(b.product, high);
    if (aPrice === null || bPrice === null) {
      if (aPrice === bPrice) return a.index - b.index;
      return aPrice === null ? 1 : -1;
    }
    return (high ? bPrice - aPrice : aPrice - bPrice) || a.index - b.index;
  });
  return indexed.map(({ product }) => product);
}

export function paginateConferenceProducts<T>(products: readonly T[], requestedPage: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const page = Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages
    ? requestedPage
    : 1;
  return {
    page,
    totalPages,
    items: products.slice((page - 1) * pageSize, page * pageSize),
  };
}
