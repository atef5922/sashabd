"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPaSystemCardPriceLabel, type PaSystemItem } from "./catalog";
import { paBrand, paCategories, paCategory, paFeatures, type PaCategory } from "./landing-data";
import PaIcon from "./PaIcon";
import styles from "./pa-landing.module.css";

const DEFAULT_PAGE_SIZE = 12;
const PRICE_BANDS = [
  ["under-25k", "Under ৳25,000"],
  ["25k-50k", "৳25,000–৳49,999"],
  ["50k-100k", "৳50,000–৳99,999"],
  ["100k-200k", "৳100,000–৳199,999"],
  ["over-200k", "৳200,000+"],
] as const;
type PriceBand = typeof PRICE_BANDS[number][0];

function minimumPrice(item: PaSystemItem): number | null {
  const label = getPaSystemCardPriceLabel(item);
  if (!label) return null;
  const match = label.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function matchesPriceBand(item: PaSystemItem, band: PriceBand): boolean {
  const price = minimumPrice(item);
  if (price === null) return false;
  if (band === "under-25k") return price < 25_000;
  if (band === "25k-50k") return price >= 25_000 && price < 50_000;
  if (band === "50k-100k") return price >= 50_000 && price < 100_000;
  if (band === "100k-200k") return price >= 100_000 && price < 200_000;
  return price >= 200_000;
}

function paginationRange(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages: Array<number | "…"> = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("…");
  for (let page = left; page <= right; page += 1) pages.push(page);
  if (right < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export default function PaSystemProducts({ items }: { items: PaSystemItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PaCategory>("All products");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceBands, setSelectedPriceBands] = useState<PriceBand[]>([]);
  const [sort, setSort] = useState("recommended");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollAfterPageChange = useRef(false);

  const brands = useMemo(() => {
    const priority = ["Bosch", "TOA", "Ahuja", "Other / project-based"];
    return [...new Set(items.map(paBrand))].sort((a, b) => priority.indexOf(a) - priority.indexOf(b));
  }, [items]);
  const brandCounts = useMemo(
    () => Object.fromEntries(brands.map(brand => [brand, items.filter(item => paBrand(item) === brand).length])),
    [brands, items],
  );
  const priceCounts = useMemo(
    () => Object.fromEntries(PRICE_BANDS.map(([band]) => [band, items.filter(item => matchesPriceBand(item, band)).length])),
    [items],
  );

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    const found = items.filter(item => {
      const categoryMatches = category === "All products" || paCategory(item) === category;
      const brandMatches = !selectedBrands.length || selectedBrands.includes(paBrand(item));
      const priceMatches = !selectedPriceBands.length || selectedPriceBands.some(band => matchesPriceBand(item, band));
      const searchMatches = `${item.title} ${item.subtitle} ${item.tags.join(" ")}`.toLowerCase().includes(text);
      return categoryMatches && brandMatches && priceMatches && searchMatches;
    });
    if (sort === "name") return [...found].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "price-low") return [...found].sort((a, b) => (minimumPrice(a) ?? Infinity) - (minimumPrice(b) ?? Infinity));
    if (sort === "price-high") return [...found].sort((a, b) => (minimumPrice(b) ?? -Infinity) - (minimumPrice(a) ?? -Infinity));
    return found;
  }, [items, query, category, selectedBrands, selectedPriceBands, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const pages = useMemo(() => paginationRange(currentPage, totalPages), [currentPage, totalPages]);
  const activeCount = (category === "All products" ? 0 : 1) + selectedBrands.length + selectedPriceBands.length;

  useEffect(() => {
    if (!scrollAfterPageChange.current) return;
    scrollAfterPageChange.current = false;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(current => current.includes(brand) ? current.filter(item => item !== brand) : [...current, brand]);
    setPage(1);
  };
  const togglePriceBand = (band: PriceBand) => {
    setSelectedPriceBands(current => current.includes(band) ? current.filter(item => item !== band) : [...current, band]);
    setPage(1);
  };
  const reset = () => {
    setQuery("");
    setCategory("All products");
    setSelectedBrands([]);
    setSelectedPriceBands([]);
    setSort("recommended");
    setPage(1);
  };
  const changePage = (nextPage: number) => {
    scrollAfterPageChange.current = true;
    setPage(Math.min(totalPages, Math.max(1, nextPage)));
  };

  return <div className={styles.catalogLayout}>
    <aside className={styles.filters} aria-label="Filter PA products">
      <div className={styles.filterHeader}><h3>Filter Products</h3>{activeCount ? <span>{activeCount} active</span> : null}</div>
      <label className={styles.field}>Search products<div className={styles.searchField}><PaIcon name="search" /><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Model, speaker, amplifier…" /></div></label>
      <fieldset className={styles.filterGroup}><legend>Product category</legend><div className={styles.filterOptions}>{paCategories.map(option => <label key={option}><input type="radio" name="pa-category" value={option} checked={category === option} onChange={() => { setCategory(option); setPage(1); }} /><span>{option}</span><small>{option === "All products" ? items.length : items.filter(item => paCategory(item) === option).length}</small></label>)}</div></fieldset>
      <fieldset className={styles.filterGroup}><legend>Brand</legend><div className={styles.filterOptions}>{brands.map(brand => <label key={brand}><input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} /><span>{brand}</span><small>{brandCounts[brand]}</small></label>)}</div></fieldset>
      <fieldset className={styles.filterGroup}><legend>Price Range</legend><div className={styles.filterOptions}>{PRICE_BANDS.map(([band, label]) => <label key={band}><input type="checkbox" checked={selectedPriceBands.includes(band)} onChange={() => togglePriceBand(band)} /><span>{label}</span><small>{priceCounts[band]}</small></label>)}</div></fieldset>
      <button className={styles.resetButton} onClick={reset} type="button">Reset filters</button>
      <div className={styles.filterHelp}><PaIcon name="plan" /><strong>Planning a complete system?</strong><p>Share your floor plan and zones for a tailored equipment list.</p><Link href="/contact/">Request a BOQ <PaIcon name="arrow" /></Link></div>
    </aside>

    <div className={styles.catalogResults} ref={resultsRef}>
      <div className={styles.catalogToolbar}><div><h3>Featured PA Equipment & Systems</h3><p role="status" aria-live="polite">{filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} products` : "Showing 0 products"}</p></div><div className={styles.catalogControls}><label>Sort by<select value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="recommended">Recommended</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="name">Name: A–Z</option></select></label><label>Show<select value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}>{[12, 24, 48].map(size => <option key={size} value={size}>{size}</option>)}</select></label></div></div>
      {visible.length ? <div className={styles.productGrid}>{visible.map(item => <article className={styles.productCard} key={item.slug} data-pa-product={item.slug}>
        <Link href={`/pa-system/${item.slug}/`} prefetch={false} className={styles.productImage} aria-label={`View ${item.title}`}><Image className={/column_speaker/.test(item.kind) ? styles.containImage : undefined} src={item.image} alt={item.title} fill sizes="(max-width: 599px) 92vw, (max-width: 899px) 44vw, (min-width: 2200px) 580px, 29vw" /><span className={styles.productBadge}>{paBrand(item) === "Other / project-based" ? paCategory(item) : paBrand(item)}</span></Link>
        <div className={styles.productBody}>
          <h3><Link href={`/pa-system/${item.slug}/`} prefetch={false} title={item.title}>{item.title}</Link></h3>
          <p className={styles.productDescription} title={item.subtitle}>{item.subtitle}</p>
          <ul className={styles.productFeatures}>{paFeatures(item).map(feature => <li key={feature}><PaIcon name="check" /><span title={feature}>{feature}</span></li>)}</ul>
          <div className={styles.productFooter}><p className={styles.price}>{getPaSystemCardPriceLabel(item) ?? "Price on request"}</p><p className={styles.priceNote}>Indicative catalog price · Confirm scope</p><div className={styles.cardActions}><Link href={`/pa-system/${item.slug}/`} prefetch={false} className={styles.outline}>View Details<span className="sr-only">: {item.title}</span></Link><Link href="/contact/" className={styles.navy}>Get a Quote<span className="sr-only"> for {item.title}</span></Link></div></div>
        </div>
      </article>)}</div> : <div className={styles.empty}><PaIcon name="search" /><h3>No matching products</h3><p>Try a different model name or reset the filters.</p><button className={styles.outline} type="button" onClick={reset}>Show all products</button></div>}
      {totalPages > 1 ? <div className={styles.paginationWrap}><nav className={styles.pagination} aria-label="PA products pagination"><button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>{pages.map((entry, index) => entry === "…" ? <span key={`gap-${index}`} aria-hidden="true">…</span> : <button type="button" key={entry} onClick={() => changePage(entry)} aria-current={entry === currentPage ? "page" : undefined}>{entry}</button>)}<button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></nav><p>Page {currentPage} of {totalPages}</p></div> : null}
    </div>
  </div>;
}
