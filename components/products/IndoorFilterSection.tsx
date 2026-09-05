"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { LedAccessoryProduct, ProductItem } from "../../lib/productsCatalog";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import { normalizeDisplayedPriceText } from "@/lib/price";

type ProductKind = "all" | "display" | "accessory";
type SortOption = "recommended" | "price-asc" | "price-desc" | "name-asc";
type FilterGroup = "type" | "pitch" | "use-case";
type DisplayVariant = "indoor" | "outdoor";

type ExplorerProduct = {
  id: string;
  kind: Exclude<ProductKind, "all">;
  title: string;
  image: string;
  href: string;
  quoteHref: string;
  badge: string;
  pitch?: string;
  useCase?: string;
  price: string;
  features: string[];
  searchable: string;
};

const PAGE_SIZES = [12, 24] as const;

function getPitch(product: ProductItem): string {
  const value = product.keySpecs.find((item) => item.k.toLowerCase() === "pixel pitch")?.v ?? product.pitchLabel ?? "";
  const mm = value.match(/(\d+(?:\.\d+)?)\s*mm/i)?.[1];
  const p = value.match(/p\s?(\d+(?:\.\d+)?)/i)?.[1];
  return mm ? `${mm}mm` : p ? `${p}mm` : value;
}

function getUseCase(product: ProductItem, variant: DisplayVariant): string {
  if (product.useCaseTag) return product.useCaseTag;
  const text = `${product.title} ${product.subtitle} ${product.bestFor.join(" ")} ${product.quickFeatures.join(" ")}`.toLowerCase();
  if (variant === "outdoor") {
    if (text.includes("stadium") || text.includes("arena")) return "Stadium";
    if (text.includes("highway") || text.includes("flyover")) return "Highway";
    if (text.includes("rooftop") || text.includes("building") || text.includes("facade") || text.includes("façade")) return "Rooftop";
    if (text.includes("shop") || text.includes("showroom") || text.includes("signage")) return "Shop Signage";
    if (text.includes("billboard") || text.includes("hoarding")) return "Billboard";
    return "Public Screen";
  }
  if (text.includes("control")) return "Control Room";
  if (text.includes("studio") || text.includes("broadcast")) return "Studio";
  if (text.includes("conference") || text.includes("meeting") || text.includes("boardroom")) return "Conference";
  if (text.includes("showroom") || text.includes("lobby")) return "Showroom";
  return "Retail";
}

function startingPrice(value: string): number | null {
  if (/request|contact|call/i.test(value)) return null;
  const match = value.match(/\d[\d,]*/)?.[0];
  return match ? Number(match.replace(/,/g, "")) : null;
}

function displayEntry(product: ProductItem, variant: DisplayVariant): ExplorerProduct {
  const pitch = getPitch(product);
  const useCase = getUseCase(product, variant);
  const features = buildLedProductCardHighlights({
    keySpecs: product.keySpecs,
    pitch,
    quickFeatures: product.quickFeatures,
    bestFor: product.bestFor,
    subtitle: product.subtitle,
    category: variant,
  }).slice(0, 3);
  const price = normalizeDisplayedPriceText(product.cardPrice ?? "Request Price");
  return {
    id: `display:${product.slug}`,
    kind: "display",
    title: product.title,
    image: product.image,
    href: `/led-display/${variant === "indoor" ? "indoor-led" : "outdoor"}/${product.slug}/`,
    quoteHref: `/contact/?project=${variant}-led-display&product=${encodeURIComponent(product.slug)}`,
    badge: useCase,
    pitch,
    useCase,
    price,
    features,
    searchable: `${product.title} ${product.subtitle} ${pitch} ${useCase} ${features.join(" ")} ${product.bestFor.join(" ")}`.toLowerCase(),
  };
}

function accessoryEntry(product: LedAccessoryProduct, variant: DisplayVariant): ExplorerProduct {
  const features = [...(product.quickFeatures.length ? product.quickFeatures : [product.subtitle])].slice(0, 3);
  const price = normalizeDisplayedPriceText(product.cardPrice ?? "Request Price");
  return {
    id: `accessory:${product.slug}`,
    kind: "accessory",
    title: product.title,
    image: product.image,
    href: `/led-display/accessories/led-accessories/${product.slug}/`,
    quoteHref: `/contact/?project=${variant}-led-display&product=${encodeURIComponent(product.slug)}`,
    badge: "LED Accessories",
    price,
    features,
    searchable: `${product.title} ${product.subtitle} ${features.join(" ")} ${product.tags.join(" ")}`.toLowerCase(),
  };
}

function ProductCard({ product, priority, variant }: { product: ExplorerProduct; priority?: boolean; variant: DisplayVariant }) {
  const requestPrice = /request|contact|call/i.test(product.price);
  return (
    <article data-indoor-product-card className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.045)] transition-[transform,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_7px_20px_rgba(15,23,42,0.09)] focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/10">
      <Link prefetch={false} href={product.href} aria-label={`View ${product.title}`} className={`relative block h-[190px] shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 sm:h-[205px] ${product.kind === "display" ? "bg-slate-100" : "bg-white"}`}>
        <span className="absolute left-3 top-3 z-10 inline-flex rounded-[5px] bg-[#f4510b] px-2 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.025em] text-white shadow-sm">{product.badge}</span>
        {product.pitch ? <span className="absolute right-3 top-3 z-10 inline-flex rounded-[5px] bg-[#071936] px-2 py-1 text-[10px] font-extrabold leading-none text-white shadow-sm">{product.pitch}</span> : null}
        <Image src={product.image} alt={product.title} fill priority={priority} sizes="(max-width:639px) 92vw, (max-width:1279px) 50vw, 30vw" className={product.kind === "display" ? "object-cover object-center transition duration-300 group-hover:scale-[1.025]" : "object-contain p-4 transition duration-300 group-hover:scale-[1.035]"} />
      </Link>
      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <p className="!text-left text-[11px] font-extrabold uppercase leading-4 tracking-[0.055em] text-slate-500">{product.kind === "display" ? `${variant === "indoor" ? "Indoor" : "Outdoor"} LED Display` : "LED Accessory"}</p>
        <h3 className="mt-1 line-clamp-2 min-h-10 !text-left text-[15px] font-extrabold leading-5 text-[#071936]"><Link prefetch={false} href={product.href} className="rounded-sm underline-offset-4 transition-colors hover:text-orange-600 hover:underline">{product.title}</Link></h3>
        <ul className="mt-3 min-h-[4rem] space-y-1.5" aria-label={`Key features of ${product.title}`}>
          {product.features.map((feature) => (
            <li key={feature} className="flex min-w-0 items-center gap-2 !text-left text-[12px] font-medium leading-4 text-slate-700">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 fill-none text-slate-700"><circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.4" /><path d="m5.3 8.1 1.7 1.7 3.7-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="line-clamp-1 min-w-0" title={feature}>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3">
          <p className="min-w-0 break-words !text-left text-lg font-extrabold leading-6 tracking-tight text-[#f05a19]">{product.price}</p>
          <p className="mt-0.5 !text-left text-[11px] font-normal leading-4 text-slate-500">{requestPrice ? "Contact for project pricing" : "Indicative price per sq.ft"}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link prefetch={false} href={product.href} className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#102542] bg-white px-2 text-xs font-bold text-[#071936] hover:bg-slate-50">View Details</Link>
            <Link prefetch={false} href={product.quoteHref} className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#071936] bg-[#071936] px-2 text-xs font-bold text-white hover:bg-[#102b52]">Get a Quote</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Chevron({ open }: { open: boolean }) {
  return <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-3.5 w-3.5 fill-none text-slate-600 transition-transform ${open ? "rotate-180" : ""}`}><path d="m4.5 6 3.5 3.5L11.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function IndoorFilterSection({ all, showFilter = true, stickyCards = [], variant = "indoor" }: { all: ProductItem[]; showFilter?: boolean; stickyCards?: LedAccessoryProduct[]; variant?: DisplayVariant }) {
  const searchParams = useSearchParams();
  const products = useMemo(() => [...all.map((product) => displayEntry(product, variant)), ...stickyCards.map((product) => accessoryEntry(product, variant))], [all, stickyCards, variant]);
  const pitches = useMemo(() => Array.from(new Set(products.flatMap((item) => item.pitch ? [item.pitch] : []))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })), [products]);
  const useCases = useMemo(() => Array.from(new Set(products.flatMap((item) => item.useCase ? [item.useCase] : []))).sort(), [products]);
  const requestedPitch = (searchParams.get("pitch") ?? "").replace(/^P/i, "").replace(/\s/g, "").replace(/mm$/i, "").toLowerCase();
  const initialPitch = pitches.find((pitch) => pitch.toLowerCase().replace(/mm$/i, "") === requestedPitch);

  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ProductKind>("all");
  const [selectedPitches, setSelectedPitches] = useState<string[]>(initialPitch ? [initialPitch] : []);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(12);
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<FilterGroup[]>(["type", "pitch", "use-case"]);

  const resetPage = () => setPage(1);
  const toggleGroup = (group: FilterGroup) => setOpenGroups((current) => current.includes(group) ? current.filter((item) => item !== group) : [...current, group]);
  const toggleItem = (value: string, values: string[], update: (next: string[]) => void) => { update(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]); resetPage(); };
  const clearAll = () => { setQuery(""); setKind("all"); setSelectedPitches([]); setSelectedUseCases([]); setSort("recommended"); setPage(1); };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = products.filter((item) => {
      if (kind !== "all" && item.kind !== kind) return false;
      if (selectedPitches.length && (!item.pitch || !selectedPitches.includes(item.pitch))) return false;
      if (selectedUseCases.length && (!item.useCase || !selectedUseCases.includes(item.useCase))) return false;
      return !needle || item.searchable.includes(needle);
    });
    return [...matches].sort((a, b) => {
      if (sort === "name-asc") return a.title.localeCompare(b.title);
      const aPrice = startingPrice(a.price);
      const bPrice = startingPrice(b.price);
      if (sort === "price-asc") return (aPrice ?? Infinity) - (bPrice ?? Infinity);
      if (sort === "price-desc") return (bPrice ?? -Infinity) - (aPrice ?? -Infinity);
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [kind, products, query, selectedPitches, selectedUseCases, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);
  const activeCount = (kind === "all" ? 0 : 1) + selectedPitches.length + selectedUseCases.length;
  const mobileDisplayRows = Array.from({ length: Math.ceil(paged.length / 3) }, (_, index) => paged.slice(index * 3, index * 3 + 3));
  const optionClass = "flex min-h-8 cursor-pointer items-center gap-2 rounded-md px-1.5 text-[12px] text-slate-700 transition hover:bg-orange-50";

  const searchBox = (mobile: boolean) => (
    <label className="relative block min-w-0">
      <span className="sr-only">Search {variant} LED products</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`absolute left-3 ${mobile ? "top-3 h-5 w-5" : "top-3.5 h-4 w-4"} fill-none text-slate-400`}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); resetPage(); }} placeholder={mobile ? `Search ${variant} LED products...` : "Search products..."} className={`${mobile ? "rounded-xl pl-10" : "rounded-lg pl-9"} h-11 w-full border border-slate-300 bg-white pr-9 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15`} />
      {query ? <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); resetPage(); }} className="absolute right-2 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-lg text-slate-500 hover:bg-slate-100">×</button> : null}
    </label>
  );

  const filterHeading = (group: FilterGroup, label: string, count: number) => (
    <button type="button" aria-expanded={openGroups.includes(group)} onClick={() => toggleGroup(group)} className="flex min-h-10 w-full items-center gap-2 rounded-md px-1.5 text-left text-[12px] font-extrabold text-slate-800 hover:bg-slate-50">
      <span className="min-w-0 flex-1">{label}</span>{count ? <span className="rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-extrabold text-orange-700">{count}</span> : null}<Chevron open={openGroups.includes(group)} />
    </button>
  );

  return (
    <div data-led-product-explorer={variant} data-layout-mode="desktopContents">
      {showFilter ? (
        <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto] lg:hidden">
          {searchBox(true)}
          <button type="button" aria-expanded={mobileOpen} aria-controls={`${variant}-product-filters`} onClick={() => setMobileOpen((value) => !value)} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 hover:border-orange-300 hover:bg-orange-50">Filters{activeCount ? ` (${activeCount})` : ""}</button>
        </div>
      ) : null}

      <div className={`grid gap-4 ${showFilter ? "lg:grid-cols-[15.5rem_minmax(0,1fr)]" : "grid-cols-1"}`}>
        {showFilter ? (
          <aside id={`${variant}-product-filters`} aria-label={`${variant === "indoor" ? "Indoor" : "Outdoor"} LED product filters`} className={`${mobileOpen ? "flex" : "hidden"} flex-col self-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.045)] lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100dvh-6rem)]`}>
            <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4"><div className="text-lg font-extrabold text-[#071936]">Filter Products</div><div className="flex items-center gap-2">{activeCount || query ? <button type="button" onClick={clearAll} className="text-[11px] font-bold text-orange-700 hover:underline">Clear All</button> : null}<button type="button" aria-label="Close filters" onClick={() => setMobileOpen(false)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-100 lg:hidden">×</button></div></div>
            <div className="hidden px-4 pb-2 lg:block">{searchBox(false)}</div>
            <div className="min-h-0 px-4 pb-3 lg:flex-1 lg:overflow-y-auto">
              <div className="border-b border-slate-200/80">{filterHeading("type", "Product Type", kind === "all" ? 0 : 1)}<div hidden={!openGroups.includes("type")} className="pb-2">
                {(["all", "display", "accessory"] as const).map((value) => <label key={value} className={optionClass}><input type="radio" name={`${variant}-kind`} checked={kind === value} onChange={() => { setKind(value); resetPage(); }} className="h-3.5 w-3.5 accent-[#F56605]" /><span className="min-w-0 flex-1 font-semibold">{value === "all" ? "All Products" : value === "display" ? `${variant === "indoor" ? "Indoor" : "Outdoor"} Displays` : "Accessories"}</span><span className="text-[10px] text-slate-400">({value === "all" ? products.length : products.filter((item) => item.kind === value).length})</span></label>)}
              </div></div>
              <div className="border-b border-slate-200/80">{filterHeading("pitch", "Pixel Pitch", selectedPitches.length)}<div hidden={!openGroups.includes("pitch")} className="grid grid-cols-2 gap-0.5 pb-2">
                {pitches.map((pitch) => <label key={pitch} className={optionClass}><input type="checkbox" checked={selectedPitches.includes(pitch)} onChange={() => toggleItem(pitch, selectedPitches, setSelectedPitches)} className="h-3.5 w-3.5 accent-[#F56605]" /><span className="font-semibold">{pitch}</span></label>)}
              </div></div>
              <div>{filterHeading("use-case", "Best For", selectedUseCases.length)}<div hidden={!openGroups.includes("use-case")} className="pb-2">
                {useCases.map((useCase) => <label key={useCase} className={optionClass}><input type="checkbox" checked={selectedUseCases.includes(useCase)} onChange={() => toggleItem(useCase, selectedUseCases, setSelectedUseCases)} className="h-3.5 w-3.5 accent-[#F56605]" /><span className="font-semibold">{useCase}</span></label>)}
              </div></div>
            </div>
            <div className="mx-3 mb-3 grid grid-cols-2 gap-2 lg:hidden"><button type="button" onClick={clearAll} className="min-h-10 rounded-xl border border-slate-300 bg-white text-sm font-bold">Clear All</button><button type="button" onClick={() => setMobileOpen(false)} className="min-h-10 rounded-xl bg-[#FD6900] text-sm font-extrabold text-white">Show {filtered.length}</button></div>
          </aside>
        ) : null}

        <div data-led-product-listing={variant} className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 xl:flex-row xl:items-end xl:justify-between">
            <div><h2 className="text-xl font-extrabold tracking-tight text-[#071936] lg:text-[22px]">Featured {variant === "indoor" ? "Indoor" : "Outdoor"} LED Products</h2><div className="mt-1 flex items-center gap-3"><p className="!text-left text-xs font-semibold text-slate-600" aria-live="polite">{filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}` : "0"} Products</p>{activeCount || query ? <button type="button" onClick={clearAll} className="text-xs font-bold text-orange-700 hover:underline">Clear All</button> : null}</div></div>
            <div className="flex flex-wrap items-center gap-3"><label className="flex items-center gap-2 text-xs font-bold text-slate-700"><span>Sort by</span><select value={sort} onChange={(event) => { setSort(event.target.value as SortOption); resetPage(); }} className="h-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-xs"><option value="recommended">Recommended</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="name-asc">Name: A–Z</option></select></label><label className="flex items-center gap-2 text-xs font-bold text-slate-700"><span>Show</span><select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value) as (typeof PAGE_SIZES)[number]); resetPage(); }} className="h-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-xs">{PAGE_SIZES.map((size) => <option key={size}>{size}</option>)}</select></label></div>
          </div>
          {activeCount ? <div className="mt-4 flex flex-wrap gap-2">{kind !== "all" ? <button type="button" onClick={() => setKind("all")} className="rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-800">{kind} ×</button> : null}{selectedPitches.map((pitch) => <button key={pitch} type="button" onClick={() => toggleItem(pitch, selectedPitches, setSelectedPitches)} className="rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-800">{pitch} ×</button>)}{selectedUseCases.map((item) => <button key={item} type="button" onClick={() => toggleItem(item, selectedUseCases, setSelectedUseCases)} className="rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-800">{item} ×</button>)}</div> : null}
          {paged.length ? <div className="mt-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3">{mobileDisplayRows.map((row, index) => <div key={index} className="contents">{row.map((product, productIndex) => <ProductCard key={product.id} product={product} priority={index === 0 && productIndex === 0} variant={variant} />)}</div>)}</div> : <div className="mt-4 rounded-2xl border border-slate-200 px-5 py-10 text-center"><h3 className="font-extrabold">No {variant} LED products found</h3><p className="mt-2 !text-center text-sm text-slate-600">No products match your search and filters.</p><button type="button" onClick={clearAll} className="mt-5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold">Clear Search &amp; Filters</button></div>}
          {totalPages > 1 ? <nav aria-label={`${variant === "indoor" ? "Indoor" : "Outdoor"} product pages`} className="mt-6 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-5"><button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => value - 1)} className="min-h-10 rounded-xl border border-slate-300 px-3 text-sm font-bold disabled:opacity-40">Prev</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button key={item} type="button" onClick={() => setPage(item)} className={item === currentPage ? "min-h-10 min-w-10 rounded-xl bg-orange-600 text-sm font-extrabold text-white" : "min-h-10 min-w-10 rounded-xl border border-slate-300 text-sm font-bold"}>{item}</button>)}<button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => value + 1)} className="min-h-10 rounded-xl border border-slate-300 px-3 text-sm font-bold disabled:opacity-40">Next</button></nav> : null}
        </div>
      </div>
    </div>
  );
}
