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
  priceValue: ConferenceDiscoveryPrice;
};

export const CONFERENCE_SORT_VALUES = ["recommended", "price-asc", "price-desc", "name-asc", "name-desc"] as const;
export type ConferenceSortValue = (typeof CONFERENCE_SORT_VALUES)[number];

export const CONFERENCE_PRICE_BANDS = [
  { id: "under-25k", label: "Under ৳25,000", min: 0, max: 25_000 },
  { id: "25k-50k", label: "৳25,000–৳50,000", min: 25_000, max: 50_000 },
  { id: "50k-100k", label: "৳50,000–৳100,000", min: 50_000, max: 100_000 },
  { id: "100k-200k", label: "৳100,000–৳200,000", min: 100_000, max: 200_000 },
  { id: "over-200k", label: "৳200,000+", min: 200_000, max: Number.POSITIVE_INFINITY },
] as const;

export type ConferenceDiscoveryState = {
  query: string;
  brands: string[];
  productTypes: string[];
  connections: string[];
  meetingTypes: string[];
  priceBands: string[];
  sort: ConferenceSortValue;
  page: number;
};

export const EMPTY_CONFERENCE_DISCOVERY_STATE: ConferenceDiscoveryState = {
  query: "",
  brands: [],
  productTypes: [],
  connections: [],
  meetingTypes: [],
  priceBands: [],
  sort: "recommended",
  page: 1,
};

export type ConferenceDiscoveryOptions = {
  brands: ReadonlySet<string>;
  productTypes: ReadonlySet<string>;
  connections: ReadonlySet<string>;
  meetingTypes: ReadonlySet<string>;
};

function validList(value: string | null, allowed: ReadonlySet<string>): string[] {
  if (!value) return [];
  return [...new Set(value.split(",").map((item) => item.trim()).filter((item) => allowed.has(item)))];
}

export function parseConferenceDiscoveryQuery(
  params: URLSearchParams,
  options: ConferenceDiscoveryOptions,
): ConferenceDiscoveryState {
  const sortValue = params.get("sort");
  const pageValue = Number.parseInt(params.get("page") ?? "1", 10);
  return {
    query: (params.get("q") ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
    brands: validList(params.get("brand"), options.brands),
    productTypes: validList(params.get("type"), options.productTypes),
    connections: validList(params.get("connection"), options.connections),
    meetingTypes: validList(params.get("meeting"), options.meetingTypes),
    priceBands: validList(params.get("price"), new Set(CONFERENCE_PRICE_BANDS.map((band) => band.id))),
    sort: CONFERENCE_SORT_VALUES.includes(sortValue as ConferenceSortValue)
      ? (sortValue as ConferenceSortValue)
      : "recommended",
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
  };
}

export function buildConferenceDiscoveryQuery(state: ConferenceDiscoveryState): string {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.brands.length) params.set("brand", state.brands.join(","));
  if (state.productTypes.length) params.set("type", state.productTypes.join(","));
  if (state.connections.length) params.set("connection", state.connections.join(","));
  if (state.meetingTypes.length) params.set("meeting", state.meetingTypes.join(","));
  if (state.priceBands.length) params.set("price", state.priceBands.join(","));
  if (state.sort !== "recommended") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  const query = params.toString();
  return query ? `?${query}` : "";
}

function searchMatches(product: ConferenceDiscoveryProduct, query: string): boolean {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = product.searchText.toLocaleLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function priceOverlapsBand(price: ConferenceDiscoveryPrice, bandId: string): boolean {
  if (price.type === "request") return bandId === "request";
  const band = CONFERENCE_PRICE_BANDS.find((item) => item.id === bandId);
  if (!band) return false;
  const productMin = price.type === "fixed" ? price.amount : price.min;
  const productMax = price.type === "fixed" ? price.amount : price.max;
  return productMin <= band.max && productMax >= band.min;
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
    (!state.meetingTypes.length || (product.meetingType !== null && state.meetingTypes.includes(product.meetingType))) &&
    (!state.priceBands.length || state.priceBands.some((band) => priceOverlapsBand(product.priceValue, band)))
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
