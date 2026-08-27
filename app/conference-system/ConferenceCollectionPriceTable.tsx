"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type ConferenceCollectionPriceRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  productType: string;
  availability: string;
  price: string;
  priceBasis: string;
};

const REPRESENTATIVE_ROW_LIMIT = 10;

function getRepresentativeRows(rows: readonly ConferenceCollectionPriceRow[]) {
  if (rows.length <= REPRESENTATIVE_ROW_LIMIT) return [...rows];
  return Array.from({ length: REPRESENTATIVE_ROW_LIMIT }, (_, index) => {
    const sourceIndex = Math.round((index * (rows.length - 1)) / (REPRESENTATIVE_ROW_LIMIT - 1));
    return rows[sourceIndex];
  });
}

export default function ConferenceCollectionPriceTable({
  rows,
}: {
  rows: readonly ConferenceCollectionPriceRow[];
}) {
  const [showAll, setShowAll] = useState(false);
  const representativeRows = useMemo(() => getRepresentativeRows(rows), [rows]);
  const visibleRows = showAll ? rows : representativeRows;
  const canExpand = rows.length > REPRESENTATIVE_ROW_LIMIT;

  return (
    <>
      {canExpand ? (
        <p className="mt-5 text-sm leading-6 text-slate-600" aria-live="polite">
          {showAll
            ? `Showing all ${rows.length} products.`
            : `Showing ${representativeRows.length} representative products from this ${rows.length}-product collection.`}
        </p>
      ) : null}

      <div className={`${canExpand ? "mt-3" : "mt-5"} overflow-x-auto rounded-2xl border border-slate-200 [scrollbar-gutter:stable]`}>
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <caption className="sr-only">Conference product catalog pricing and availability</caption>
          <thead className="bg-slate-950 text-white">
            <tr>
              <th scope="col" className="min-w-56 px-4 py-3 font-bold">Product</th>
              <th scope="col" className="px-4 py-3 font-bold">Brand</th>
              <th scope="col" className="px-4 py-3 font-bold">Model</th>
              <th scope="col" className="px-4 py-3 font-bold">Type</th>
              <th scope="col" className="px-4 py-3 font-bold">Availability</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {visibleRows.map((row) => (
              <tr key={row.id} className="align-top hover:bg-orange-50/40">
                <th scope="row" className="px-4 py-3 font-bold text-slate-950">
                  <Link href={`/conference-system/${row.slug}/`} className="underline-offset-4 hover:text-orange-600 hover:underline">
                    {row.name}
                  </Link>
                </th>
                <td className="px-4 py-3 text-slate-700">{row.brand}</td>
                <td className="px-4 py-3 text-slate-700">{row.model}</td>
                <td className="px-4 py-3 text-slate-700">{row.productType}</td>
                <td className="px-4 py-3 text-slate-700">{row.availability}</td>
                <td className="px-4 py-3 text-right font-extrabold text-slate-950">
                  {row.price}
                  <span className="mt-1 block text-[11px] font-semibold text-slate-500">{row.priceBasis}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canExpand ? (
        <button
          type="button"
          aria-expanded={showAll}
          onClick={() => setShowAll((current) => !current)}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
        >
          {showAll ? "Show representative prices" : `View all ${rows.length} product prices`}
        </button>
      ) : null}
    </>
  );
}
