"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { normalizeDisplayedPriceText } from "@/lib/price";
import type { TurnstileItem, TurnstileKind } from "./catalog";
import { getKindLabel, getListingQuickFeatures } from "./landing-data";
import Icon from "./TurnstileIcon";
import styles from "./turnstile-landing.module.css";

const kinds: TurnstileKind[] = ["tripod_turnstile", "flap_barrier", "swing_speed_gate", "full_height_turnstile", "waist_high_turnstile", "ai_face_turnstile"];
const priceBands = [
  { value: "under-400k", label: "Under ৳400,000", min: 0, max: 400000 },
  { value: "400k-600k", label: "৳400,000–৳599,999", min: 400000, max: 600000 },
  { value: "over-600k", label: "৳600,000 & above", min: 600000, max: Infinity },
] as const;
type PriceBand = typeof priceBands[number]["value"];

function minimumPrice(item: TurnstileItem) {
  return Number(item.priceLabel.replaceAll(",", "").match(/\d+/)?.[0] ?? Infinity);
}

export default function TurnstileProducts({ items }: { items: TurnstileItem[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<TurnstileKind | "all">("all");
  const [prices, setPrices] = useState<PriceBand[]>([]);
  const [sort, setSort] = useState("recommended");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const activeCount = Number(kind !== "all") + prices.length + Number(Boolean(query.trim()));
  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    const found = items.filter(item => (kind === "all" || item.kind === kind)
      && `${item.title} ${item.subtitle} ${getKindLabel(item.kind)} ${item.tags.join(" ")}`.toLowerCase().includes(text)
      && (!prices.length || priceBands.some(band => prices.includes(band.value) && minimumPrice(item) >= band.min && minimumPrice(item) < band.max)));
    if (sort === "name") return found.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "price-low") return found.sort((a, b) => minimumPrice(a) - minimumPrice(b));
    if (sort === "price-high") return found.sort((a, b) => minimumPrice(b) - minimumPrice(a));
    return found;
  }, [items, kind, prices, query, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const reset = () => { setQuery(""); setKind("all"); setPrices([]); setPage(1); };
  const changePage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };

  return <div className={styles.catalogLayout}>
    <aside className={styles.filters} aria-label="Filter turnstile products">
      <div className={styles.filterHeader}><h3>Filter Products</h3><button type="button" className={styles.mobileFilterToggle} aria-expanded={filtersOpen} aria-controls="turnstile-filter-options" onClick={() => setFiltersOpen(!filtersOpen)}>{filtersOpen ? "Hide" : "Filters"}{activeCount > 0 ? ` (${activeCount})` : ""}<Icon name="chevron" /></button></div>
      <label className={styles.searchField}><span className="sr-only">Search turnstile products</span><Icon name="search" /><input type="search" placeholder="Search model or gate type…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></label>
      <div id="turnstile-filter-options" className={styles.filterContents} data-open={filtersOpen}>
        <fieldset><legend>Gate Type</legend>{(["all", ...kinds] as const).map(value => <label className={styles.filterOption} key={value}><input type="radio" name="turnstile-kind" checked={kind === value} onChange={() => { setKind(value); setPage(1); }} /><span>{value === "all" ? "All products" : getKindLabel(value)}</span><small>({value === "all" ? items.length : items.filter(item => item.kind === value).length})</small></label>)}</fieldset>
        <fieldset><legend>Starting Price</legend>{priceBands.map(band => <label className={styles.filterOption} key={band.value}><input type="checkbox" checked={prices.includes(band.value)} onChange={() => { setPrices(current => current.includes(band.value) ? current.filter(value => value !== band.value) : [...current, band.value]); setPage(1); }} /><span>{band.label}</span></label>)}<p className={styles.filterNote}>Based on the lower end of each catalog range.</p></fieldset>
        <button className={styles.reset} type="button" onClick={reset}>Reset filters</button>
        <div className={styles.filterHelp}><Icon name="plan" /><h4>Planning your entrance?</h4><p>Share your lane width and access requirements for a tailored BOQ.</p><Link href="/contact/">Talk to our team <Icon name="arrow" /></Link></div>
      </div>
      {activeCount > 0 && <p className={styles.activeFilters}>{activeCount} active {activeCount === 1 ? "filter" : "filters"}<button type="button" onClick={reset}>Clear all</button></p>}
    </aside>
    <div className={styles.results} ref={resultsRef}>
      <div className={styles.toolbar}><div><h3>Featured Turnstile Gates</h3><p role="status" aria-live="polite">{filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} products` : "Showing 0 products"}</p></div><div className={styles.controls}><label>Sort by<select aria-label="Sort turnstile products" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="recommended">Recommended</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="name">Name: A–Z</option></select></label><label>Show<select aria-label="Products per page" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}>{[6, 12, 24].map(size => <option key={size} value={size}>{size}</option>)}</select></label></div></div>
      {visible.length ? <div className={styles.productGrid}>{visible.map(item => <article key={item.slug} className={styles.productCard} data-turnstile-product={item.slug}>
        <Link className={styles.productImage} href={`/turnstile-gate/${item.slug}/`} prefetch={false} aria-label={`View ${item.title}`}><Image src={item.image} alt={item.title} fill sizes="(max-width: 599px) 85vw, (max-width: 1023px) 42vw, (max-width: 1439px) 24vw, 380px" /><span>{getKindLabel(item.kind)}</span></Link>
        <div className={styles.productBody}><h3><Link href={`/turnstile-gate/${item.slug}/`} prefetch={false} title={item.title}>{item.title}</Link></h3><p className={styles.productSubtitle}>{item.subtitle}</p><ul>{getListingQuickFeatures(item).slice(0, 3).map(feature => <li key={feature}><Icon name="check" /><span>{feature}</span></li>)}</ul><div className={styles.productFooter}><p className={styles.productPrice}>{normalizeDisplayedPriceText(item.priceLabel)}</p><span className={styles.priceNote}>Catalog range · Confirm project scope</span><div className={styles.cardActions}><Link href={`/turnstile-gate/${item.slug}/`} prefetch={false}>View Details<span className="sr-only">: {item.title}</span></Link><Link href="/contact/">Get a Quote<span className="sr-only"> for {item.title}</span></Link></div></div></div>
      </article>)}</div> : <div className={styles.empty}><Icon name="search" /><h3>No matching gates</h3><p>Try another model name or clear the filters to explore all products.</p><button type="button" className={styles.button} onClick={reset}>Show all products</button></div>}
      {totalPages > 1 && <nav className={styles.pagination} aria-label="Turnstile products pagination"><button type="button" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>Previous</button>{Array.from({ length: totalPages }, (_, index) => <button type="button" key={index} aria-current={currentPage === index + 1 ? "page" : undefined} onClick={() => changePage(index + 1)}>{index + 1}</button>)}<button type="button" disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)}>Next</button></nav>}
    </div>
  </div>;
}
