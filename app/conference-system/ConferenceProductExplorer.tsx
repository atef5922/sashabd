"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import ConferenceProductCard, { type ConferenceProductCardData } from "./ConferenceProductCard";

export type ConferenceExplorerProduct = ConferenceProductCardData & {
  brandSlug: string | null;
  categorySlugs: string[];
};

export type ConferenceExplorerFacet = { slug: string; label: string; count: number };

/** Products shown per brand on the opening page. */
export const CONFERENCE_PRODUCTS_PER_BRAND = 3;

/**
 * Brands that lead the opening page, in the order they appear. Anything outside
 * this list — smaller brands, and products with no verified brand — follows on
 * the later pages rather than taking a slot above the fold.
 */
export const CONFERENCE_BRAND_ORDER = ["cmx", "toa", "bosch", "spon"] as const;

const ALL = "all";

/**
 * Opening page leads with the first N products of each headline brand, in
 * CONFERENCE_BRAND_ORDER. Their remaining products come next, then any other
 * brand, and finally products with no verified brand.
 */
function balancedByBrand(products: ConferenceExplorerProduct[], perBrand: number) {
  const byBrand = new Map<string, ConferenceExplorerProduct[]>();
  for (const product of products) {
    const key = product.brandSlug ?? "";
    const bucket = byBrand.get(key);
    if (bucket) bucket.push(product);
    else byBrand.set(key, [product]);
  }

  const rank = (slug: string) => {
    const index = CONFERENCE_BRAND_ORDER.indexOf(slug as (typeof CONFERENCE_BRAND_ORDER)[number]);
    if (index >= 0) return index;
    return slug ? CONFERENCE_BRAND_ORDER.length : CONFERENCE_BRAND_ORDER.length + 1;
  };

  const lead: ConferenceExplorerProduct[] = [];
  const rest: ConferenceExplorerProduct[] = [];
  for (const [slug, bucket] of [...byBrand].sort((a, b) => rank(a[0]) - rank(b[0]))) {
    if (rank(slug) < CONFERENCE_BRAND_ORDER.length) {
      lead.push(...bucket.slice(0, perBrand));
      rest.push(...bucket.slice(perBrand));
    } else {
      rest.push(...bucket);
    }
  }
  return [...lead, ...rest];
}

/** Page numbers with ellipsis: 1 … 4 5 6 … 12 */
function paginationRange(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((page) => pages.add(page));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((page) => pages.add(page));

  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  const result: Array<number | "gap"> = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push("gap");
    result.push(page);
    previous = page;
  }
  return result;
}

export default function ConferenceProductExplorer({
  products,
  categories,
  brands,
}: {
  products: ConferenceExplorerProduct[];
  categories: ConferenceExplorerFacet[];
  brands: ConferenceExplorerFacet[];
}) {
  const [category, setCategory] = useState<string>(ALL);
  const [brand, setBrand] = useState<string>(ALL);
  const [page, setPage] = useState(1);

  const railRef = useRef<HTMLDivElement>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // One page holds a full round of the headline brands, so page 1 is exactly
  // three products each from CMX, TOA, Bosch and SPON.
  const pageSize = CONFERENCE_PRODUCTS_PER_BRAND * CONFERENCE_BRAND_ORDER.length;

  const filtered = useMemo(() => {
    const matches = products.filter(
      (product) =>
        (category === ALL || product.categorySlugs.includes(category)) &&
        (brand === ALL || product.brandSlug === brand),
    );
    return brand === ALL && category === ALL
      ? balancedByBrand(matches, CONFERENCE_PRODUCTS_PER_BRAND)
      : matches;
  }, [products, category, brand]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const shown = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const syncArrows = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanScrollLeft(rail.scrollLeft > 4);
    setCanScrollRight(rail.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    syncArrows();
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      rail.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const slide = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(rail.clientWidth * 0.7, 200), behavior: "smooth" });
  };

  /** Click-and-drag horizontal scrolling, so the rail works with a mouse too. */
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    // Always clear `moved` first: a touch tap after a mouse drag must not be swallowed.
    dragState.current.moved = false;
    if (!rail || event.pointerType === "touch") return;
    dragState.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft, moved: false };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragState.current.active) return;
    const delta = event.clientX - dragState.current.startX;
    if (Math.abs(delta) > 3) dragState.current.moved = true;
    rail.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = () => {
    dragState.current.active = false;
  };

  const goToPage = (next: number) => {
    setPage(next);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const applyFacet = (setter: (value: string) => void, value: string) => {
    // A drag that moved the rail should not also toggle the chip under the cursor.
    if (dragState.current.moved) return;
    setter(value);
    setPage(1);
  };

  /** Uniform 36px pill: same height and rhythm whatever the label length. */
  const chipClass = (isActive: boolean) =>
    [
      "inline-flex h-9 shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full border px-4 text-[13px] font-bold leading-none transition-colors duration-200",
      "cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45",
      isActive
        ? "border-[#FD6900] bg-[#FD6900] text-white shadow-sm"
        : "border-slate-200 bg-white text-slate-600 hover:border-[#FD6900]/40 hover:bg-orange-50/70 hover:text-[#C2410C]",
    ].join(" ");

  /**
   * Overlay arrows sit inside the rail bounds and float over a masked edge, so a
   * chip fades out under them instead of being chopped in half.
   */
  const arrowClass =
    "absolute top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_16px_-6px_rgba(15,23,42,0.35)] transition duration-200 hover:text-[#C2410C] hover:ring-[#FD6900]/45 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45 md:inline-flex";

  /** Fades the scrollable edges to transparent — works on any page background. */
  const FADE = 56;
  const railMask = (() => {
    if (canScrollLeft && canScrollRight) {
      return `linear-gradient(to right, transparent 0, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent 100%)`;
    }
    if (canScrollRight) return `linear-gradient(to right, #000 calc(100% - ${FADE}px), transparent 100%)`;
    if (canScrollLeft) return `linear-gradient(to right, transparent 0, #000 ${FADE}px)`;
    return undefined;
  })();

  const pageButtonClass = (isActive: boolean) =>
    [
      "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-[13px] font-extrabold transition-colors duration-200",
      "cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45",
      isActive
        ? "border-[#FD6900] bg-[#FD6900] text-white shadow-sm"
        : "border-slate-200 bg-white text-slate-600 hover:border-[#FD6900]/40 hover:bg-orange-50/70 hover:text-[#C2410C]",
    ].join(" ");

  const stepClass =
    "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-bold text-slate-600 transition-colors duration-200 hover:border-[#FD6900]/40 hover:bg-orange-50/70 hover:text-[#C2410C] disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45";

  return (
    <div data-conference-product-explorer>
      <div ref={gridTopRef} className="scroll-mt-24" />

      {/* Facet rail: one line, overlay arrows on desktop, swipe or drag anywhere. */}
      <div className="relative mb-4">
        {canScrollLeft ? (
          <button
            type="button"
            aria-label="Scroll filters left"
            onClick={() => slide(-1)}
            className={`${arrowClass} left-0`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none" aria-hidden="true">
              <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}

        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          style={railMask ? { maskImage: railMask, WebkitMaskImage: railMask } : undefined}
          className="-mx-4 overflow-x-auto px-4 py-0.5 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:cursor-grab md:px-0 md:active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-center gap-2" style={{ paddingRight: canScrollRight ? FADE - 16 : 0 }}>
            <button
              type="button"
              aria-pressed={category === ALL && brand === ALL}
              onClick={() => {
                if (dragState.current.moved) return;
                setCategory(ALL);
                setBrand(ALL);
                setPage(1);
              }}
              className={chipClass(category === ALL && brand === ALL)}
            >
              All Products
            </button>

            {categories.map((facet) => {
              const isActive = category === facet.slug;
              return (
                <button
                  key={`category-${facet.slug}`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => applyFacet(setCategory, isActive ? ALL : facet.slug)}
                  className={chipClass(isActive)}
                >
                  {facet.label}
                </button>
              );
            })}

            <span aria-hidden="true" className="h-5 w-px shrink-0 bg-slate-200" />

            {brands.map((facet) => {
              const isActive = brand === facet.slug;
              return (
                <button
                  key={`brand-${facet.slug}`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => applyFacet(setBrand, isActive ? ALL : facet.slug)}
                  className={chipClass(isActive)}
                >
                  {facet.label}
                </button>
              );
            })}
          </div>
        </div>

        {canScrollRight ? (
          <button
            type="button"
            aria-label="Scroll filters right"
            onClick={() => slide(1)}
            className={`${arrowClass} right-0`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none" aria-hidden="true">
              <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing page {safePage} of {totalPages}, {filtered.length} conference system products in total.
      </p>

      {shown.length ? (
        <ResponsiveProductCarousel
          className="product-grid-3"
          desktopClassName="md:grid-cols-2 lg:grid-cols-3"
          mobileGapClassName="gap-[10px]"
        >
          {shown.map((product, index) => (
            <ConferenceProductCard
              key={product.slug}
              product={product}
              priority={index === 0}
            />
          ))}
        </ResponsiveProductCarousel>
      ) : (
        <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
          No conference products match this combination yet. Clear the filters to see the full range.
        </p>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="Conference product pages"
          className="mt-6 flex flex-col items-center gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-center"
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className={stepClass}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none" aria-hidden="true">
                <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>

            {paginationRange(safePage, totalPages).map((entry, index) =>
              entry === "gap" ? (
                <span key={`gap-${index}`} aria-hidden="true" className="px-1 text-sm font-bold text-slate-300">
                  &hellip;
                </span>
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

            <button
              type="button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className={stepClass}
            >
              Next
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none" aria-hidden="true">
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
