"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildComparisonSections,
  buildConferenceComparisonHref,
  comparisonHasDifferentProductTypes,
  CONFERENCE_COMPARE_STORAGE_KEY,
  getComparisonDifferenceCount,
  MAX_COMPARISON_PRODUCTS,
  restoreComparisonSlugs,
  sanitizeComparisonSlugs,
  type ComparisonProductSnapshot,
} from "../conferenceComparison";

const PRODUCT_PICKER_LIMIT = 30;

function productSearchText(product: ComparisonProductSnapshot): string {
  return [
    product.name,
    product.model,
    product.brand,
    product.productTypes.join(" "),
    product.productRole,
    product.connection,
    product.meetingType,
    product.systemFamily,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("en-US");
}

function productRelevanceScore(
  candidate: ComparisonProductSnapshot,
  selectedProducts: readonly ComparisonProductSnapshot[],
): number {
  return selectedProducts.reduce((score, selected) => {
    const sharedProductType = candidate.productTypes.some((type) => selected.productTypes.includes(type));
    const verifiedCompatible = selected.compatibleProductSlugs.includes(candidate.slug)
      || candidate.compatibleProductSlugs.includes(selected.slug);
    return score
      + (verifiedCompatible ? 16 : 0)
      + (candidate.systemFamily && candidate.systemFamily === selected.systemFamily ? 8 : 0)
      + (sharedProductType ? 4 : 0)
      + (candidate.brand && candidate.brand === selected.brand ? 2 : 0)
      + (candidate.connection && candidate.connection === selected.connection ? 1 : 0);
  }, 0);
}

export default function ConferenceCompareClient({ products }: { products: ComparisonProductSnapshot[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialized = useRef(false);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [selectionReady, setSelectionReady] = useState(false);
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [replacingSlug, setReplacingSlug] = useState<string | null>(null);
  const [pickerQuery, setPickerQuery] = useState("");
  const [pickerBrand, setPickerBrand] = useState("");
  const [pickerType, setPickerType] = useState("");
  const [feedback, setFeedback] = useState("");

  const validSlugs = useMemo(() => new Set(products.map((product) => product.slug)), [products]);
  const productBySlug = useMemo(() => new Map(products.map((product) => [product.slug, product])), [products]);
  const rawProductsParam = searchParams.get("products");
  const hasProductsParam = searchParams.has("products");
  const querySelectedSlugs = useMemo(
    () => sanitizeComparisonSlugs(rawProductsParam, validSlugs),
    [rawProductsParam, validSlugs],
  );

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      if (!initialized.current) {
        let initialSlugs = querySelectedSlugs;
        if (!hasProductsParam) {
          try {
            initialSlugs = restoreComparisonSlugs(
              window.sessionStorage.getItem(CONFERENCE_COMPARE_STORAGE_KEY),
              validSlugs,
            );
          } catch {
            initialSlugs = [];
          }
        }

        initialized.current = true;
        setSelectedSlugs(initialSlugs);
        setSelectionReady(true);

        if ((!hasProductsParam && initialSlugs.length) || (hasProductsParam && rawProductsParam !== initialSlugs.join(","))) {
          router.replace(buildConferenceComparisonHref(initialSlugs), { scroll: false });
        }
        return;
      }

      setSelectedSlugs(querySelectedSlugs);
    });
    return () => { cancelled = true; };
  }, [hasProductsParam, querySelectedSlugs, rawProductsParam, router, validSlugs]);

  useEffect(() => {
    if (!selectionReady) return;
    try {
      window.sessionStorage.setItem(CONFERENCE_COMPARE_STORAGE_KEY, JSON.stringify(selectedSlugs));
    } catch {
      // The URL remains the durable, shareable source of comparison state.
    }
  }, [selectedSlugs, selectionReady]);

  const selectedProducts = useMemo(
    () => selectedSlugs
      .map((slug) => productBySlug.get(slug))
      .filter((product): product is ComparisonProductSnapshot => Boolean(product)),
    [productBySlug, selectedSlugs],
  );
  const sections = useMemo(
    () => buildComparisonSections(selectedProducts, products),
    [selectedProducts, products],
  );
  const differenceCount = getComparisonDifferenceCount(sections);
  const crossType = comparisonHasDifferentProductTypes(selectedProducts);
  const quotationHref = `/contact/?project=conference-system&products=${encodeURIComponent(selectedSlugs.join(","))}`;
  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand).filter((brand): brand is string => Boolean(brand)))].sort(),
    [products],
  );
  const productTypes = useMemo(
    () => [...new Set(products.flatMap((product) => product.productTypes))].sort(),
    [products],
  );
  const pickerProducts = useMemo(() => {
    const normalizedQuery = pickerQuery.trim().toLocaleLowerCase("en-US");
    return products
      .filter((product) => !selectedSlugs.includes(product.slug))
      .filter((product) => !pickerBrand || product.brand === pickerBrand)
      .filter((product) => !pickerType || product.productTypes.includes(pickerType))
      .filter((product) => !normalizedQuery || productSearchText(product).includes(normalizedQuery))
      .map((product, index) => ({
        product,
        index,
        score: productRelevanceScore(product, selectedProducts),
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, PRODUCT_PICKER_LIMIT)
      .map(({ product }) => product);
  }, [pickerBrand, pickerQuery, pickerType, products, selectedProducts, selectedSlugs]);

  const updateSelection = (slugs: readonly string[]) => {
    const nextSlugs = sanitizeComparisonSlugs(slugs.join(","), validSlugs);
    setSelectedSlugs(nextSlugs);
    setFeedback("");
    router.replace(buildConferenceComparisonHref(nextSlugs), { scroll: false });
  };

  const openPicker = (slugToReplace?: string) => {
    setReplacingSlug(slugToReplace ?? null);
    setPickerOpen(true);
    setFeedback("");
  };

  const closePicker = () => {
    setPickerOpen(false);
    setReplacingSlug(null);
  };

  const chooseProduct = (slug: string) => {
    if (replacingSlug) {
      updateSelection(selectedSlugs.map((selectedSlug) => selectedSlug === replacingSlug ? slug : selectedSlug));
    } else {
      updateSelection([...selectedSlugs, slug]);
    }
    closePicker();
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setFeedback("Comparison link copied.");
    } catch {
      setFeedback("Copy is unavailable. You can copy the comparison URL from your browser address bar.");
    }
  };

  const clearComparison = () => {
    updateSelection([]);
    closePicker();
    setFeedback("Comparison cleared.");
  };

  return (
    <div className="min-w-0 max-w-full" data-conference-comparison-ready={selectionReady ? "true" : "false"}>
      <ol className="grid grid-cols-3 gap-2" aria-label="Comparison progress">
        {[
          { label: "Select", active: selectedProducts.length > 0 },
          { label: "Compare", active: selectedProducts.length >= 2 },
          { label: "Request BOQ", active: false },
        ].map((step, index) => (
          <li key={step.label} className={`min-w-0 rounded-xl border px-1 py-2 text-center text-[10px] font-extrabold leading-4 sm:px-4 sm:text-xs ${step.active ? "border-orange-300 bg-orange-50 text-orange-800" : "border-slate-200 bg-white text-slate-500"}`}>
            <span className="mr-1 hidden sm:inline">{index + 1}.</span>{step.label}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-extrabold text-slate-900" aria-live="polite">
            {selectedProducts.length} of {MAX_COMPARISON_PRODUCTS} products selected
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            {selectedProducts.length >= 2
              ? `${differenceCount} differing ${differenceCount === 1 ? "field" : "fields"} found`
              : "Select at least two products for a side-by-side comparison"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {selectedProducts.length < MAX_COMPARISON_PRODUCTS ? (
            <button type="button" onClick={() => openPicker()} className="inline-flex min-h-10 items-center rounded-xl bg-[#071936] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#102b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/45 focus-visible:ring-offset-2">
              <span aria-hidden="true" className="mr-1.5 text-base leading-none">+</span>Add Product
            </button>
          ) : null}
          {selectedProducts.length >= 2 ? (
            <button type="button" onClick={copyShareLink} className="inline-flex min-h-10 items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">
              Copy Share Link
            </button>
          ) : null}
          {selectedProducts.length ? (
            <button type="button" onClick={clearComparison} className="inline-flex min-h-10 items-center rounded-xl px-3 py-2 text-xs font-extrabold text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">
              Clear
            </button>
          ) : null}
          {selectedProducts.length >= 2 ? (
            <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 focus-within:ring-2 focus-within:ring-orange-500/45">
              <input type="checkbox" checked={highlightDifferences} onChange={(event) => setHighlightDifferences(event.target.checked)} className="h-4 w-4 accent-orange-600" />
              Highlight Differences
            </label>
          ) : null}
        </div>
      </div>

      {feedback ? <p className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-900" role="status">{feedback}</p> : null}

      {pickerOpen ? (
        <section className="mt-4 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-lg" aria-labelledby="comparison-product-picker-title">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
            <div>
              <h2 id="comparison-product-picker-title" className="text-lg font-extrabold text-slate-950">{replacingSlug ? "Replace product" : "Add a product"}</h2>
              <p className="mt-1 text-xs font-medium text-slate-600">Compatible and similar products are shown first where catalog data supports it.</p>
            </div>
            <button type="button" onClick={closePicker} aria-label="Close product picker" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl text-slate-500 transition hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">×</button>
          </div>
          <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-3 sm:p-5">
            <label className="block sm:col-span-3 lg:col-span-1">
              <span className="sr-only">Search products</span>
              <input type="search" value={pickerQuery} onChange={(event) => setPickerQuery(event.target.value)} placeholder="Search model, brand or product type" autoFocus className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15" />
            </label>
            <label className="block">
              <span className="sr-only">Filter by brand</span>
              <select value={pickerBrand} onChange={(event) => setPickerBrand(event.target.value)} className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/15">
                <option value="">All brands</option>
                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="sr-only">Filter by product type</span>
              <select value={pickerType} onChange={(event) => setPickerType(event.target.value)} className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/15">
                <option value="">All product types</option>
                {productTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
          </div>
          <div className="max-h-[28rem] overflow-y-auto p-3 sm:p-4" tabIndex={0} aria-label="Available products">
            {pickerProducts.length ? (
              <ul className="grid gap-2 md:grid-cols-2">
                {pickerProducts.map((product) => (
                  <li key={product.slug}>
                    <button type="button" onClick={() => chooseProduct(product.slug)} className="group flex min-h-24 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-orange-300 hover:bg-orange-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-white">
                        <Image src={product.image.src} alt="" fill sizes="64px" className="object-contain p-1" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-orange-700">{product.brand ?? "Conference Product"}</span>
                        <span className="mt-0.5 line-clamp-2 block text-sm font-extrabold leading-5 text-slate-900 group-hover:text-orange-800">{product.name}</span>
                        <span className="mt-1 block text-xs font-semibold text-slate-500">{product.productTypes.join(" / ")} · {product.price}</span>
                      </span>
                      <span aria-hidden="true" className="shrink-0 text-lg font-bold text-orange-600">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="font-extrabold text-slate-900">No matching products found</p>
                <button type="button" onClick={() => { setPickerQuery(""); setPickerBrand(""); setPickerType(""); }} className="mt-3 text-sm font-bold text-orange-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Clear picker filters</button>
              </div>
            )}
          </div>
        </section>
      ) : null}

      {selectedProducts.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedProducts.map((product) => (
            <article key={product.slug} className="flex min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex min-w-0 items-start gap-3 p-3 sm:p-4">
                <Link href={`/conference-system/${product.slug}/`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45 sm:h-24 sm:w-24">
                  <Image src={product.image.src} alt={product.image.alt} fill sizes="(max-width: 639px) 80px, 96px" className="object-contain p-1" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-orange-700">{product.brand ?? "Conference Product"}</p>
                    {product.availability ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{product.availability}</span> : null}
                  </div>
                  <h2 className="mt-1 line-clamp-3 break-words text-sm font-extrabold leading-5 text-slate-950 [overflow-wrap:anywhere]">{product.name}</h2>
                  {product.model ? <p className="mt-1 break-words text-xs font-bold text-slate-500 [overflow-wrap:anywhere]">Model: {product.model}</p> : null}
                  <p className="mt-1 line-clamp-2 break-words text-xs font-semibold text-slate-600 [overflow-wrap:anywhere]">{product.productTypes.join(" / ")}</p>
                </div>
              </div>
              <div className="mt-auto border-t border-slate-100 px-4 py-3">
                <p className="text-lg font-extrabold tracking-tight text-[#f05a19]">{product.price}</p>
                <div className="mt-3 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
                  <Link href={`/conference-system/${product.slug}/`} className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-lg border border-slate-300 px-2 py-2 text-center text-[11px] font-extrabold text-slate-800 hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Details</Link>
                  <button type="button" onClick={() => openPicker(product.slug)} className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-lg border border-slate-300 px-2 py-2 text-[11px] font-extrabold text-slate-700 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">Change</button>
                  <button type="button" onClick={() => updateSelection(selectedSlugs.filter((slug) => slug !== product.slug))} aria-label={`Remove ${product.name} from comparison`} className="col-span-2 inline-flex min-h-10 min-w-0 items-center justify-center rounded-lg px-2 py-2 text-[11px] font-extrabold text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 sm:col-span-1">Remove</button>
                </div>
              </div>
            </article>
          ))}
          {selectedProducts.length < MAX_COMPARISON_PRODUCTS ? (
            <button type="button" onClick={() => openPicker()} className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-5 text-center text-slate-600 transition hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">
              <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-2xl font-light text-orange-700">+</span>
              <span className="mt-3 text-sm font-extrabold">Add another product</span>
              <span className="mt-1 text-xs font-medium">Compare up to three products</span>
            </button>
          ) : null}
        </div>
      ) : null}

      {selectedProducts.length < 2 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <span aria-hidden="true" className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-700">↔</span>
          <h2 className="mt-4 text-xl font-extrabold text-slate-950">{selectedProducts.length ? "Add one more product to compare" : "Build your product comparison"}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">Select two or three conference products to compare verified specifications, compatibility, price and availability in one place.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => openPicker()} className="inline-flex min-h-11 items-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">Select Product</button>
            <Link href="/conference-system/#conference-products-heading" className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Browse Full Catalog</Link>
          </div>
        </div>
      ) : (
        <>
          {crossType ? <p className="mt-6 break-words rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900" role="note">This comparison includes different product types, so some fields may not apply equally.</p> : null}
          <p id="comparison-scroll-hint" className="mt-5 text-xs font-semibold text-slate-500 sm:hidden">Swipe horizontally to view every selected product.</p>
          <div className="mt-2 w-full min-w-0 max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45 sm:mt-6" tabIndex={0} aria-label="Scrollable conference product comparison table" aria-describedby="comparison-scroll-hint">
            <table className={`${selectedProducts.length === 3 ? "min-w-[980px]" : "min-w-[740px]"} w-full border-collapse text-left text-sm`}>
              <caption className="sr-only">Comparison of selected conference system products</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-[#071936] text-white">
                  <th scope="col" className="sticky left-0 z-20 min-w-40 bg-[#071936] px-4 py-4 font-extrabold">Comparison Field</th>
                  {selectedProducts.map((product) => (
                    <th key={product.slug} scope="col" className="min-w-64 px-4 py-4 align-top font-extrabold">
                      <span className="block text-[10px] uppercase tracking-[0.08em] text-orange-300">{product.brand ?? "Product"}</span>
                      <span className="mt-1 block leading-5">{product.model ?? product.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              {sections.map((comparisonSection) => (
                <tbody key={comparisonSection.id}>
                  <tr><th scope="rowgroup" colSpan={selectedProducts.length + 1} className="border-y border-orange-200 bg-orange-50 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-orange-900">{comparisonSection.title}</th></tr>
                  {comparisonSection.rows.map((row) => (
                    <tr key={row.id} data-comparison-different={row.different ? "true" : "false"} className={`border-b border-slate-100 align-top ${highlightDifferences && row.different ? "bg-amber-50/70" : "bg-white"}`}>
                      <th scope="row" className={`sticky left-0 z-10 min-w-40 border-r border-slate-200 px-4 py-3 font-bold text-slate-800 ${highlightDifferences && row.different ? "bg-amber-100" : "bg-white"}`}>
                        <span>{row.label}</span>
                        {highlightDifferences && row.different ? <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-amber-800">Different</span> : null}
                      </th>
                      {row.values.map((value, index) => {
                        const missing = value === "Not specified" || value === "Not verified";
                        return <td key={`${row.id}-${selectedProducts[index].slug}`} className={`min-w-64 px-4 py-3 leading-6 ${missing ? "italic text-slate-400" : highlightDifferences && row.different ? "font-semibold text-slate-800" : "text-slate-700"}`}>{value}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left">
            <div>
              <h2 className="text-base font-extrabold text-slate-950">Ready for a project recommendation?</h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">Send this exact product shortlist with your room and participant requirements.</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              {selectedProducts.length < MAX_COMPARISON_PRODUCTS ? <button type="button" onClick={() => openPicker()} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-800 hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Add Product</button> : null}
              <Link href={quotationHref} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">Get Quote for Selection</Link>
            </div>
          </div>
          <section className="mt-6 rounded-2xl bg-[#071936] p-6 text-center text-white">
            <h2 className="text-xl font-extrabold">Need help choosing?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">Share your room size, participant count and installation requirements with Sasha Corporation.</p>
            <Link href="/contact/?project=conference-system" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#071936] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">Get Free BOQ</Link>
          </section>
        </>
      )}
    </div>
  );
}
