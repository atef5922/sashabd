"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import ConferenceProductCard, { type ConferenceProductCardData } from "./ConferenceProductCard";
import {
  buildConferenceDiscoveryQuery,
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
  priceValue: ConferenceDiscoveryPrice;
  categorySlugs: string[];
};

export type ConferenceExplorerFacet = { slug: string; label: string; count: number };
export const CONFERENCE_PRODUCTS_PER_BRAND = 3;
export const CONFERENCE_BRAND_ORDER = ["cmx", "toa", "bosch", "spon"] as const;
const PAGE_SIZE = CONFERENCE_PRODUCTS_PER_BRAND * CONFERENCE_BRAND_ORDER.length;

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
  const hydrated = useRef(false);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const mobileFilterButtonRef = useRef<HTMLButtonElement>(null);

  const options = useMemo(() => ({
    brands: new Set(brands.map((facet) => facet.slug)),
    productTypes: new Set(productTypes.map((facet) => facet.slug)),
    connections: new Set(products.flatMap((product) => product.connection ? [product.connection] : [])),
    meetingTypes: new Set(products.flatMap((product) => product.meetingType ? [product.meetingType] : [])),
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
    () => paginateConferenceProducts(filtered, state.page, PAGE_SIZE),
    [filtered, state.page],
  );

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
    ...state.priceBands.map((value) => ({ group: "priceBands" as const, value, label: CONFERENCE_PRICE_BANDS.find((item) => item.id === value)?.label ?? value })),
  ];
  const activeCount = activeFilters.length;

  const filterCheckbox = (
    group: "brands" | "productTypes" | "connections" | "meetingTypes" | "priceBands",
    value: string,
    label: string,
    count?: number,
  ) => (
    <label key={`${group}-${value}`} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm text-slate-700 hover:bg-orange-50">
      <input
        type="checkbox"
        checked={state[group].includes(value)}
        onChange={() => changeFilters({ [group]: toggleValue(state[group], value) })}
        className="h-4 w-4 rounded border-slate-300 accent-[#FD6900] focus-visible:ring-2 focus-visible:ring-[#FD6900]/40"
      />
      <span className="flex-1 font-semibold">{label}</span>
      {count !== undefined ? <span className="text-xs text-slate-400">{count}</span> : null}
    </label>
  );

  const filterGroups = (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Brand</legend>{brands.map((facet) => filterCheckbox("brands", facet.slug, facet.label, facet.count))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Product Type</legend>{productTypes.map((facet) => filterCheckbox("productTypes", facet.slug, facet.label, facet.count))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Connection</legend>{["wired", "wireless", "hybrid"].filter((value) => options.connections.has(value)).map((value) => filterCheckbox("connections", value, value[0].toUpperCase() + value.slice(1), products.filter((product) => product.connection === value).length))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Meeting Type</legend>{["audio", "video", "hybrid"].filter((value) => options.meetingTypes.has(value)).map((value) => filterCheckbox("meetingTypes", value, value[0].toUpperCase() + value.slice(1), products.filter((product) => product.meetingType === value).length))}</fieldset>
      <fieldset><legend className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Price</legend>{CONFERENCE_PRICE_BANDS.map((band) => filterCheckbox("priceBands", band.id, band.label))}</fieldset>
    </div>
  );

  const clearAll = () => updateState(EMPTY_CONFERENCE_DISCOVERY_STATE);
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
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="relative block">
            <span className="sr-only">Search conference products</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 fill-none text-slate-400"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input type="search" value={state.query} onChange={(event) => changeFilters({ query: event.target.value }, "replace")} placeholder="Search products, models, brands or systems..." className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20" />
            {state.query ? <button type="button" aria-label="Clear product search" onClick={() => changeFilters({ query: "" })} className="absolute right-2 top-1.5 h-8 w-8 rounded-lg text-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">×</button> : null}
          </label>
          <button ref={mobileFilterButtonRef} type="button" aria-expanded={mobileFiltersOpen} aria-controls="conference-product-filters" onClick={() => setMobileFiltersOpen((open) => !open)} className={`${buttonClass} lg:hidden`}>Filters{activeCount ? ` (${activeCount})` : ""}</button>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><span className="whitespace-nowrap">Sort by</span><select value={state.sort} onChange={(event) => changeFilters({ sort: event.target.value as ConferenceDiscoveryState["sort"] })} className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20">{SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
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
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-extrabold text-slate-900" aria-live="polite">{filtered.length} Conference {filtered.length === 1 ? "Product" : "Products"}</p>{activeFilters.length || state.query ? <button type="button" onClick={clearAll} className="text-sm font-bold text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">Clear All</button> : null}</div>
          {activeFilters.length ? <div className="mb-4 flex flex-wrap gap-2" aria-label="Active filters">{activeFilters.map((filter) => <button key={`${filter.group}-${filter.value}`} type="button" onClick={() => removeActive(filter.group, filter.value)} aria-label={`Remove ${filter.label} filter`} className="inline-flex min-h-9 items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">{filter.label}<span aria-hidden="true">×</span></button>)}</div> : null}
          {shown.length ? <ResponsiveProductCarousel className="product-grid-3" desktopClassName="md:grid-cols-2 xl:grid-cols-3" mobileGapClassName="gap-[10px]">{shown.map((product, index) => <ConferenceProductCard key={product.slug} product={product} priority={index === 0} />)}</ResponsiveProductCarousel> : <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center"><h3 className="font-extrabold text-slate-950">No conference products found</h3><p className="mt-2 text-sm text-slate-600">No conference products match your current search and filters.</p><button type="button" onClick={clearAll} className={`${buttonClass} mt-5`}>Clear Search &amp; Filters</button></div>}
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
    </div>
  );
}
