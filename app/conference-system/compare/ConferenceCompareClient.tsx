"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildComparisonSections,
  comparisonHasDifferentProductTypes,
  CONFERENCE_COMPARE_STORAGE_KEY,
  sanitizeComparisonSlugs,
  type ComparisonProductSnapshot,
} from "../conferenceComparison";

export default function ConferenceCompareClient({ products }: { products: ComparisonProductSnapshot[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const validSlugs = useMemo(() => new Set(products.map((product) => product.slug)), [products]);
  const selectedSlugs = useMemo(
    () => sanitizeComparisonSlugs(searchParams.get("products"), validSlugs),
    [searchParams, validSlugs],
  );
  const productBySlug = useMemo(() => new Map(products.map((product) => [product.slug, product])), [products]);
  const selectedProducts = selectedSlugs.map((slug) => productBySlug.get(slug)).filter((product): product is ComparisonProductSnapshot => Boolean(product));
  const sections = useMemo(() => buildComparisonSections(selectedProducts, products), [selectedProducts, products]);
  const crossType = comparisonHasDifferentProductTypes(selectedProducts);
  const quotationHref = `/contact/?project=conference-system&products=${encodeURIComponent(selectedSlugs.join(","))}`;

  useEffect(() => {
    window.sessionStorage.setItem(CONFERENCE_COMPARE_STORAGE_KEY, JSON.stringify(selectedSlugs));
  }, [selectedSlugs]);

  const updateSelection = (slugs: string[]) => {
    const query = slugs.length ? `?products=${encodeURIComponent(slugs.join(","))}` : "";
    router.replace(`/conference-system/compare/${query}`, { scroll: false });
  };

  return (
    <div className="min-w-0 max-w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600" aria-live="polite">
          {selectedProducts.length} of 3 products selected
        </p>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 focus-within:ring-2 focus-within:ring-orange-500/45">
          <input type="checkbox" checked={highlightDifferences} onChange={(event) => setHighlightDifferences(event.target.checked)} className="h-4 w-4 accent-orange-600" />
          Highlight Differences
        </label>
      </div>

      {selectedProducts.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedProducts.map((product) => (
            <article key={product.slug} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                  <Image src={product.image.src} alt={product.image.alt} fill sizes="80px" className="object-contain p-2" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-orange-700">{product.brand ?? "Conference Product"}</p>
                  <h2 className="mt-1 text-base font-extrabold leading-snug text-slate-950">{product.model ?? product.name}</h2>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{product.productTypes.join(", ")}</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-extrabold text-slate-950">{product.price}</p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <Link href={`/conference-system/${product.slug}/`} className="inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-3 py-2 text-xs font-extrabold text-slate-800 hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">View Details</Link>
                <button type="button" onClick={() => updateSelection(selectedSlugs.filter((slug) => slug !== product.slug))} aria-label={`Remove ${product.name} from comparison`} className="inline-flex min-h-10 items-center rounded-xl px-3 py-2 text-xs font-extrabold text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">Remove</button>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {selectedProducts.length < 2 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <h2 className="text-xl font-extrabold text-slate-950">Add another product to continue comparing.</h2>
          <p className="mt-2 text-sm text-slate-600">Choose two or three conference products from the catalogue.</p>
          <Link href="/conference-system/#conference-products-heading" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">Add Product</Link>
        </div>
      ) : (
        <>
          {crossType ? <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900" role="note">This comparison includes different product types, so some fields may not apply equally.</p> : null}
          <div className="mt-6 w-full min-w-0 max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45" tabIndex={0} aria-label="Scrollable conference product comparison table">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <caption className="sr-only">Comparison of selected conference system products</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-900 text-white">
                  <th scope="col" className="sticky left-0 z-20 min-w-44 bg-slate-900 px-4 py-4 font-extrabold">Comparison Field</th>
                  {selectedProducts.map((product) => <th key={product.slug} scope="col" className="min-w-64 px-4 py-4 font-extrabold">{product.model ?? product.name}</th>)}
                </tr>
              </thead>
              {sections.map((comparisonSection) => (
                <tbody key={comparisonSection.id}>
                  <tr><th scope="rowgroup" colSpan={selectedProducts.length + 1} className="border-y border-orange-200 bg-orange-50 px-4 py-3 text-sm font-extrabold text-orange-900">{comparisonSection.title}</th></tr>
                  {comparisonSection.rows.map((row) => (
                    <tr key={row.id} className={`border-b border-slate-100 align-top ${highlightDifferences && row.different ? "bg-amber-50/70" : "bg-white"}`}>
                      <th scope="row" className={`sticky left-0 z-10 min-w-44 border-r border-slate-200 px-4 py-3 font-bold text-slate-800 ${highlightDifferences && row.different ? "bg-amber-100" : "bg-white"}`}>
                        <span>{row.label}</span>
                        {highlightDifferences && row.different ? <span className="mt-1 block text-[11px] font-extrabold uppercase tracking-wide text-amber-800">Different</span> : null}
                      </th>
                      {row.values.map((value, index) => <td key={`${row.id}-${selectedProducts[index].slug}`} className={`min-w-64 px-4 py-3 leading-6 text-slate-700 ${highlightDifferences && row.different ? "font-semibold" : ""}`}>{value}</td>)}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center sm:flex-row">
            {selectedProducts.length < 3 ? <Link href="/conference-system/#conference-products-heading" className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-800 hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Add Product</Link> : null}
            <Link href={quotationHref} className="inline-flex min-h-11 items-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">Request Quotation</Link>
          </div>
          <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-center text-white">
            <h2 className="text-xl font-extrabold">Need help choosing?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">Share your room size, participant count and installation requirements with Sasha Corporation.</p>
            <Link href="/contact/?project=conference-system" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">Talk to an Expert</Link>
          </section>
        </>
      )}
    </div>
  );
}
