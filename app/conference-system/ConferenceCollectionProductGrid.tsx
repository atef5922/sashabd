"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ConferenceProductCard, { type ConferenceProductCardData } from "./ConferenceProductCard";
import { paginateConferenceProducts } from "./conferenceDiscovery";

const COLLECTION_PAGE_SIZE = 12;

function getGridClassName(productCount: number): string {
  if (productCount === 1) return "grid max-w-2xl grid-cols-1 gap-5";
  if (productCount <= 5) return "grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3";
  return "grid gap-5 sm:grid-cols-2 xl:grid-cols-3";
}

function paginationRange(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((page) => pages.add(page));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((page) => pages.add(page));
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? ["gap", page] : [page],
  );
}

export default function ConferenceCollectionProductGrid({
  products,
}: {
  products: readonly ConferenceProductCardData[];
}) {
  const totalPages = Math.max(1, Math.ceil(products.length / COLLECTION_PAGE_SIZE));
  const [requestedPage, setRequestedPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const readPageFromLocation = useCallback(() => {
    if (totalPages === 1) return;
    const rawPage = new URLSearchParams(window.location.search).get("page");
    const parsedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
    setRequestedPage(parsedPage >= 1 && parsedPage <= totalPages ? parsedPage : 1);
  }, [totalPages]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(readPageFromLocation);
    window.addEventListener("popstate", readPageFromLocation);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", readPageFromLocation);
    };
  }, [readPageFromLocation]);

  const { page, items: shownProducts } = useMemo(
    () => paginateConferenceProducts(products, requestedPage, COLLECTION_PAGE_SIZE),
    [products, requestedPage],
  );

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setRequestedPage(nextPage);

    const params = new URLSearchParams(window.location.search);
    if (nextPage === 1) params.delete("page");
    else params.set("page", String(nextPage));
    const query = params.toString();
    window.history.pushState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}#products`);
    window.requestAnimationFrame(() => gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const buttonClass = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45 disabled:cursor-not-allowed disabled:opacity-40";
  const pageButtonClass = (active: boolean) => active
    ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-orange-600 bg-orange-600 px-3 text-sm font-extrabold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2"
    : buttonClass;

  return (
    <div ref={gridTopRef} className="scroll-mt-24">
      {totalPages > 1 ? (
        <p className="mt-5 text-sm font-semibold text-slate-600" aria-live="polite">
          Showing {(page - 1) * COLLECTION_PAGE_SIZE + 1}&ndash;{Math.min(page * COLLECTION_PAGE_SIZE, products.length)} of {products.length} products
        </p>
      ) : null}

      <div
        className={`${totalPages > 1 ? "mt-4" : "mt-6"} ${getGridClassName(shownProducts.length)}`}
        data-conference-product-grid={shownProducts.length === 1 ? "single" : "multiple"}
        data-products-on-page={shownProducts.length}
      >
        {shownProducts.map((product, index) => (
          <ConferenceProductCard key={product.slug} product={product} priority={index === 0} />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav aria-label="Collection product pages" className="mt-7 flex flex-wrap items-center justify-center gap-1.5 border-t border-slate-200 pt-6">
          <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1} className={buttonClass}>
            Previous
          </button>
          {paginationRange(page, totalPages).map((entry, index) => entry === "gap" ? (
            <span key={`gap-${index}`} className="px-1 text-slate-400" aria-hidden="true">&hellip;</span>
          ) : (
            <button
              key={entry}
              type="button"
              aria-label={`Go to page ${entry}`}
              aria-current={entry === page ? "page" : undefined}
              onClick={() => goToPage(entry)}
              className={pageButtonClass(entry === page)}
            >
              {entry}
            </button>
          ))}
          <button type="button" onClick={() => goToPage(page + 1)} disabled={page === totalPages} className={buttonClass}>
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
