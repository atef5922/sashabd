"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import ConferenceProductCard, { type ConferenceProductCardData } from "./ConferenceProductCard";
import { toggleComparisonSelection } from "./conferenceComparison";
import {
  buildConferenceDiscoveryQuery,
  CONFERENCE_MAX_CUSTOM_PRICE,
  CONFERENCE_RESULT_LIMITS,
  CONFERENCE_PRICE_BANDS,
  EMPTY_CONFERENCE_DISCOVERY_STATE,
  filterConferenceProducts,
  paginateConferenceProducts,
  parseConferenceDiscoveryQuery,
  sortConferenceProducts,
  type ConferenceDiscoveryPrice,
  type ConferenceDiscoveryState,
} from "./conferenceDiscovery";

export type ConferenceExplorerProduct = ConferenceProductCardData & {
  model?: string;
  searchText: string;
  brandSlug: string | null;
  productTypes: string[];
  connection: string | null;
  meetingType: string | null;
  availability: string | null;
  priceValue: ConferenceDiscoveryPrice;
  categorySlugs: string[];
};

export type ConferenceExplorerFacet = { slug: string; label: string; count: number };
type ConferenceFilterGroup = "brands" | "productTypes" | "connections" | "meetingTypes" | "availabilities" | "priceBands";
export const CONFERENCE_PRODUCTS_PER_BRAND = 3;
export const CONFERENCE_BRAND_ORDER = ["cmx", "toa", "bosch", "spon"] as const;
const PAGE_SIZE = CONFERENCE_PRODUCTS_PER_BRAND * CONFERENCE_BRAND_ORDER.length;
const COMPARE_STORAGE_KEY = "sasha-conference-compare";
const MAX_COMPARE_PRODUCTS = 3;

function balancedByBrand(products: ConferenceExplorerProduct[], perBrand: number) {
  const byBrand = new Map<string, ConferenceExplorerProduct[]>();
  for (const product of products) {
    const key = product.brandSlug ?? "";
    byBrand.set(key, [...(byBrand.get(key) ?? []), product]);
  }
  const rank = (slug: string) => {
    const index = CONFERENCE_BRAND_ORDER.indexOf(slug as (typeof CONFERENCE_BRAND_ORDER)[number]);
    return index >= 0 ? index : slug ? CONFERENCE_BRAND_ORDER.length : CONFERENCE_BRAND_ORDER.length + 1;
  };
  const lead: ConferenceExplorerProduct[] = [];
  const rest: ConferenceExplorerProduct[] = [];
  for (const [slug, bucket] of [...byBrand].sort((a, b) => rank(a[0]) - rank(b[0]))) {
    if (rank(slug) < CONFERENCE_BRAND_ORDER.length) {
      lead.push(...bucket.slice(0, perBrand));
      rest.push(...bucket.slice(perBrand));
    } else rest.push(...bucket);
  }
  return [...lead, ...rest];
}

function paginationRange(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((page) => pages.add(page));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((page) => pages.add(page));
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  return sorted.flatMap((page, index) => index > 0 && page - sorted[index - 1] > 1 ? ["gap", page] : [page]);
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

const SORT_OPTIONS = [
  ["recommended", "Recommended"],
  ["price-asc", "Price: Low to High"],
  ["price-desc", "Price: High to Low"],
  ["name-asc", "Name: A–Z"],
  ["name-desc", "Name: Z–A"],
] as const;

export default function ConferenceProductExplorer({
  products,
  brands,
  productTypes,
}: {
  products: ConferenceExplorerProduct[];
  brands: ConferenceExplorerFacet[];
  productTypes: ConferenceExplorerFacet[];
}) {
  const [state, setState] = useState<ConferenceDiscoveryState>(EMPTY_CONFERENCE_DISCOVERY_STATE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareFeedback, setCompareFeedback] = useState("");
  const hydrated = useRef(false);
  const comparisonHydrated = useRef(false);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const mobileFilterButtonRef = useRef<HTMLButtonElement>(null);

  const options = useMemo(() => ({
    brands: new Set(brands.map((facet) => facet.slug)),
    productTypes: new Set(productTypes.map((facet) => facet.slug)),
    connections: new Set(products.flatMap((product) => product.connection ? [product.connection] : [])),
    meetingTypes: new Set(products.flatMap((product) => product.meetingType ? [product.meetingType] : [])),
    availabilities: new Set(products.flatMap((product) => product.availability ? [product.availability] : [])),
  }), [brands, productTypes, products]);

  const readLocation = useCallback(() => {
    setState(parseConferenceDiscoveryQuery(new URLSearchParams(window.location.search), options));
  }, [options]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(readLocation);
    hydrated.current = true;
    window.addEventListener("popstate", readLocation);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", readLocation);
    };
  }, [readLocation]);

  useEffect(() => {
    const validSlugs = new Set(products.map((product) => product.slug));
    let cancelled = false;
    let restored: string[] = [];
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(COMPARE_STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) {
        restored = [...new Set(stored.filter((slug): slug is string => typeof slug === "string" && validSlugs.has(slug)))].slice(0, MAX_COMPARE_PRODUCTS);
      }
    } catch {
      window.sessionStorage.removeItem(COMPARE_STORAGE_KEY);
    }
    queueMicrotask(() => {
      if (cancelled) return;
      comparisonHydrated.current = true;
      setCompareSlugs(restored);
    });
    return () => { cancelled = true; };
  }, [products]);

  useEffect(() => {
    if (!comparisonHydrated.current) return;
    window.sessionStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareSlugs));
  }, [compareSlugs]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileFiltersOpen(false);
      mobileFilterButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileFiltersOpen]);

  const updateState = useCallback((next: ConferenceDiscoveryState, history: "push" | "replace" = "push") => {
    setState(next);
    if (!hydrated.current) return;
    const url = `${window.location.pathname}${buildConferenceDiscoveryQuery(next)}${window.location.hash}`;
    window.history[history === "push" ? "pushState" : "replaceState"]({}, "", url);
  }, []);

  const changeFilters = (patch: Partial<ConferenceDiscoveryState>, history: "push" | "replace" = "push") => {
    updateState({ ...state, ...patch, page: 1 }, history);
  };

  const recommendedProducts = useMemo(() => balancedByBrand(products, CONFERENCE_PRODUCTS_PER_BRAND), [products]);
  const filtered = useMemo(
    () => sortConferenceProducts(filterConferenceProducts(recommendedProducts, state), state.sort),
    [recommendedProducts, state],
  );
  const { page: safePage, totalPages, items: shown } = useMemo(
    () => paginateConferenceProducts(filtered, state.page, state.pageSize),
    [filtered, state.page, state.pageSize],
  );

  const facetCount = (group: ConferenceFilterGroup, value: string) =>
    filterConferenceProducts(recommendedProducts, { ...state, [group]: [value], page: 1 }).length;

  useEffect(() => {
    if (!hydrated.current || state.page === safePage) return;
    const normalized = { ...state, page: safePage };
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${buildConferenceDiscoveryQuery(normalized)}${window.location.hash}`,
    );
  }, [safePage, state]);

  const activeFilters = [
    ...state.brands.map((value) => ({ group: "brands" as const, value, label: brands.find((item) => item.slug === value)?.label ?? value })),
    ...state.productTypes.map((value) => ({ group: "productTypes" as const, value, label: productTypes.find((item) => item.slug === value)?.label ?? value })),
    ...state.connections.map((value) => ({ group: "connections" as const, value, label: value[0].toUpperCase() + value.slice(1) })),
    ...state.meetingTypes.map((value) => ({ group: "meetingTypes" as const, value, label: `${value[0].toUpperCase() + value.slice(1)} Conference` })),
    ...state.availabilities.map((value) => ({ group: "availabilities" as const, value, label: value === "in-stock" ? "In stock" : value === "project-order" ? "Project order" : "Contact for availability" })),
    ...state.priceBands.map((value) => ({ group: "priceBands" as const, value, label: CONFERENCE_PRICE_BANDS.find((item) => item.id === value)?.label ?? value })),
  ];
  const customPriceActive = state.minPrice !== null || state.maxPrice !== null;
  const customPriceInvalid = state.minPrice !== null && state.maxPrice !== null && state.minPrice > state.maxPrice;
  const customPriceLabel = customPriceActive
    ? `${state.minPrice === null ? "Any" : `৳${state.minPrice.toLocaleString("en-BD")}`} – ${state.maxPrice === null ? "Any" : `৳${state.maxPrice.toLocaleString("en-BD")}`}`
    : "";
  const activeCount = activeFilters.length + (customPriceActive ? 1 : 0);

  const changeCustomPrice = (field: "minPrice" | "maxPrice", rawValue: string) => {
    const numericValue = rawValue === "" ? null : Number(rawValue);
    const nextValue = numericValue !== null && Number.isSafeInteger(numericValue) && numericValue >= 0 && numericValue <= CONFERENCE_MAX_CUSTOM_PRICE
      ? numericValue
      : null;
    changeFilters({
      [field]: nextValue,
      ...(nextValue !== null ? { priceBands: state.priceBands.filter((band) => band !== "request") } : {}),
    }, "replace");
  };

  const toggleFilterValue = (group: ConferenceFilterGroup, value: string) => {
    const nextValues = toggleValue(state[group], value);
    if (group === "priceBands" && value === "request" && nextValues.includes("request")) {
      changeFilters({ priceBands: nextValues, minPrice: null, maxPrice: null });
      return;
    }
    changeFilters({ [group]: nextValues });
  };

  const filterCheckbox = (
    group: ConferenceFilterGroup,
    value: string,
    label: string,
    count?: number,
  ) => (
    <label key={`${group}-${value}`} className={`flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-slate-700 ${count === 0 && !state[group].includes(value) ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-orange-50"}`}>
      <input
        type="checkbox"
        checked={state[group].includes(value)}
        disabled={count === 0 && !state[group].includes(value)}
        onChange={() => toggleFilterValue(group, value)}
        className="h-4 w-4 rounded border-slate-300 accent-[#FD6900] focus-visible:ring-2 focus-visible:ring-[#FD6900]/40"
      />
      <span className="flex-1 font-semibold">{label}</span>
      {count !== undefined ? <span className="text-xs text-slate-400">{count}</span> : null}
    </label>
  );

  const filterGroups = (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Brand</legend>{brands.map((facet) => filterCheckbox("brands", facet.slug, facet.label, facetCount("brands", facet.slug)))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Product Type</legend>{productTypes.map((facet) => filterCheckbox("productTypes", facet.slug, facet.label, facetCount("productTypes", facet.slug)))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Connection</legend>{["wired", "wireless", "hybrid"].filter((value) => options.connections.has(value)).map((value) => filterCheckbox("connections", value, value[0].toUpperCase() + value.slice(1), facetCount("connections", value)))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Conference Format</legend>{["audio", "video", "hybrid"].filter((value) => options.meetingTypes.has(value)).map((value) => filterCheckbox("meetingTypes", value, value[0].toUpperCase() + value.slice(1), facetCount("meetingTypes", value)))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Availability</legend>{[
        ["in-stock", "In stock"],
        ["project-order", "Project order"],
        ["contact", "Contact for availability"],
      ].filter(([value]) => options.availabilities.has(value)).map(([value, label]) => filterCheckbox("availabilities", value, label, facetCount("availabilities", value)))}</fieldset>
      <fieldset>
        <legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Price</legend>
        {CONFERENCE_PRICE_BANDS.map((band) => filterCheckbox("priceBands", band.id, band.label, facetCount("priceBands", band.id)))}
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
          <label className="text-xs font-bold text-slate-600">
            Minimum (৳)
            <input type="number" inputMode="numeric" min={0} max={CONFERENCE_MAX_CUSTOM_PRICE} step={1000} value={state.minPrice ?? ""} onChange={(event) => changeCustomPrice("minPrice", event.currentTarget.value)} placeholder="0" aria-describedby={customPriceInvalid ? "conference-price-range-error" : undefined} className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-2.5 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20" />
          </label>
          <label className="text-xs font-bold text-slate-600">
            Maximum (৳)
            <input type="number" inputMode="numeric" min={0} max={CONFERENCE_MAX_CUSTOM_PRICE} step={1000} value={state.maxPrice ?? ""} onChange={(event) => changeCustomPrice("maxPrice", event.currentTarget.value)} placeholder="Any" aria-describedby={customPriceInvalid ? "conference-price-range-error" : undefined} className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-2.5 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20" />
          </label>
        </div>
        {customPriceInvalid ? <p id="conference-price-range-error" role="alert" className="mt-2 text-xs font-semibold text-red-700">Minimum price cannot exceed maximum price.</p> : <p className="mt-2 text-[11px] leading-4 text-slate-500">Custom range applies to published prices; Request Price remains separate.</p>}
      </fieldset>
    </div>
  );

  const clearAll = () => updateState({ ...EMPTY_CONFERENCE_DISCOVERY_STATE, pageSize: state.pageSize });
  const selectedCompareProducts = products.filter((product) => compareSlugs.includes(product.slug));
  const toggleCompare = (slug: string) => {
    setCompareFeedback("");
    setCompareSlugs((current) => {
      const result = toggleComparisonSelection(current, slug);
      if (result.limitReached) {
        setCompareFeedback("You can compare up to 3 products.");
      }
      return result.slugs;
    });
  };
  const removeActive = (group: typeof activeFilters[number]["group"], value: string) => changeFilters({ [group]: state[group].filter((item) => item !== value) });
  const goToPage = (page: number) => {
    updateState({ ...state, page });
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const buttonClass = "inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45";
  const pageButtonClass = (active: boolean) =>
    active
      ? "inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-orange-600 bg-orange-600 px-3 text-sm font-extrabold text-white shadow-sm transition hover:border-orange-700 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2"
      : `${buttonClass} min-w-10`;

  return (
    <div data-conference-product-explorer>
      <div ref={gridTopRef} className="scroll-mt-24" />
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
          <label className="relative block sm:col-span-2 xl:col-span-1">
            <span className="sr-only">Search conference products</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 fill-none text-slate-400"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input type="search" value={state.query} onChange={(event) => changeFilters({ query: event.target.value }, "replace")} placeholder="Search products, models, brands or systems..." className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20" />
            {state.query ? <button type="button" aria-label="Clear product search" onClick={() => changeFilters({ query: "" })} className="absolute right-2 top-1.5 h-8 w-8 rounded-lg text-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">×</button> : null}
          </label>
          <button ref={mobileFilterButtonRef} type="button" aria-expanded={mobileFiltersOpen} aria-controls="conference-product-filters" onClick={() => setMobileFiltersOpen((open) => !open)} className={`${buttonClass} lg:hidden`}>Filters{activeCount ? ` (${activeCount})` : ""}</button>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><span className="whitespace-nowrap">Sort by</span><select value={state.sort} onChange={(event) => changeFilters({ sort: event.target.value as ConferenceDiscoveryState["sort"] })} className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20">{SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><span className="whitespace-nowrap">Show</span><select value={state.pageSize} onChange={(event) => changeFilters({ pageSize: Number(event.target.value) as ConferenceDiscoveryState["pageSize"] })} className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20" aria-label={`Products per page; default ${PAGE_SIZE}`}>{CONFERENCE_RESULT_LIMITS.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside
          id="conference-product-filters"
          aria-label="Conference product filters"
          className={`${mobileFiltersOpen ? "block" : "hidden"} self-start rounded-2xl border border-slate-200 bg-white p-4 lg:block`}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-extrabold text-slate-950">Filter Products</h3>
            <div className="flex items-center gap-3">
              {activeCount ? <button type="button" onClick={clearAll} className="text-xs font-bold text-orange-700 hover:underline">Clear All</button> : null}
              <button type="button" aria-label="Close product filters" onClick={() => { setMobileFiltersOpen(false); mobileFilterButtonRef.current?.focus(); }} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 lg:hidden">×</button>
            </div>
          </div>
          {filterGroups}
          <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
            <button type="button" onClick={clearAll} className={buttonClass}>Clear All</button>
            <button type="button" onClick={() => { setMobileFiltersOpen(false); mobileFilterButtonRef.current?.focus(); }} className="min-h-10 rounded-xl bg-[#FD6900] px-3 text-sm font-extrabold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">Show {filtered.length} Products</button>
          </div>
        </aside>
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-extrabold text-slate-900" aria-live="polite">{filtered.length ? `Showing ${(safePage - 1) * state.pageSize + 1}–${Math.min(safePage * state.pageSize, filtered.length)} of ${filtered.length}` : "0"} Conference {filtered.length === 1 ? "Product" : "Products"}</p>{activeCount || state.query ? <button type="button" onClick={clearAll} className="text-sm font-bold text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">Clear All</button> : null}</div>
          {activeCount ? <div className="mb-4 flex flex-wrap gap-2" aria-label="Active filters">{activeFilters.map((filter) => <button key={`${filter.group}-${filter.value}`} type="button" onClick={() => removeActive(filter.group, filter.value)} aria-label={`Remove ${filter.label} filter`} className="inline-flex min-h-9 items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">{filter.label}<span aria-hidden="true">×</span></button>)}{customPriceActive ? <button type="button" onClick={() => changeFilters({ minPrice: null, maxPrice: null })} aria-label="Remove custom price range filter" className="inline-flex min-h-9 items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">{customPriceLabel}<span aria-hidden="true">×</span></button> : null}</div> : null}
          {shown.length ? <ResponsiveProductCarousel className="product-grid-3" desktopClassName="md:grid-cols-2 xl:grid-cols-3" mobileGapClassName="gap-[10px]">{shown.map((product, index) => <ConferenceProductCard key={product.slug} product={product} priority={index === 0} compareSelected={compareSlugs.includes(product.slug)} onCompareToggle={toggleCompare} />)}</ResponsiveProductCarousel> : <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center"><h3 className="font-extrabold text-slate-950">No conference products found</h3><p className="mt-2 text-sm text-slate-600">No conference products match your current search and filters.</p><button type="button" onClick={clearAll} className={`${buttonClass} mt-5`}>Clear Search &amp; Filters</button></div>}
          {totalPages > 1 ? (
            <nav aria-label="Conference product pages" className="mt-6 flex flex-wrap items-center justify-center gap-1.5 border-t border-slate-100 pt-5">
              <button type="button" onClick={() => goToPage(safePage - 1)} disabled={safePage === 1} className={`${buttonClass} disabled:cursor-not-allowed disabled:opacity-40`}>Prev</button>
              {paginationRange(safePage, totalPages).map((entry, index) =>
                entry === "gap" ? (
                  <span key={`gap-${index}`} className="px-1 text-slate-400">…</span>
                ) : (
                  <button
                    key={entry}
                    type="button"
                    aria-label={`Go to page ${entry}`}
                    aria-current={entry === safePage ? "page" : undefined}
                    onClick={() => goToPage(entry)}
                    className={pageButtonClass(entry === safePage)}
                  >
                    {entry}
                  </button>
                ),
              )}
              <button type="button" onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages} className={`${buttonClass} disabled:cursor-not-allowed disabled:opacity-40`}>Next</button>
            </nav>
          ) : null}
        </div>
      </div>
      {selectedCompareProducts.length ? (
        <aside aria-label="Selected products for comparison" className="fixed inset-x-3 bottom-20 z-40 mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur md:bottom-4 md:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-extrabold text-slate-950">Compare Products</h3>
                <button type="button" onClick={() => { setCompareSlugs([]); setCompareFeedback(""); }} className="text-xs font-bold text-slate-600 underline-offset-4 hover:text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Clear</button>
              </div>
              <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                {selectedCompareProducts.map((product) => (
                  <div key={product.slug} className="flex min-w-[12rem] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white"><Image src={product.image.src} alt="" fill sizes="40px" className="object-contain p-1" /></div>
                    <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-800">{product.model ?? product.name}</span>
                    <button type="button" onClick={() => toggleCompare(product.slug)} aria-label={`Remove ${product.name} from comparison`} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-white hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">×</button>
                  </div>
                ))}
                {Array.from({ length: MAX_COMPARE_PRODUCTS - selectedCompareProducts.length }, (_, index) => <div key={`empty-${index}`} className="flex min-w-[8rem] items-center justify-center rounded-xl border border-dashed border-slate-300 px-3 text-xs font-bold text-slate-500">+ Add Product</div>)}
              </div>
              {compareFeedback ? <p className="mt-1 text-xs font-bold text-red-700" role="status">{compareFeedback}</p> : null}
            </div>
            {selectedCompareProducts.length >= 2 ? (
              <Link href={`/conference-system/compare/?products=${compareSlugs.join(",")}`} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2">Compare ({selectedCompareProducts.length})</Link>
            ) : (
              <button type="button" disabled aria-disabled="true" className="inline-flex min-h-11 shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-5 py-3 text-sm font-extrabold text-slate-500">Compare ({selectedCompareProducts.length})</button>
            )}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
