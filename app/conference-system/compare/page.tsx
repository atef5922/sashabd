import { Suspense } from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { conferenceSystemCatalog } from "../catalog";
import { createComparisonProductSnapshot } from "../comparisonAdapter";
import ConferenceCompareClient from "./ConferenceCompareClient";

export const metadata: Metadata = {
  title: "Compare Conference System Products | Sasha Corporation",
  description: "Compare verified conference product details, pricing, system roles, installation context and available compatibility information.",
  alternates: { canonical: "/conference-system/compare/" },
  robots: { index: false, follow: true },
};

const comparisonProducts = conferenceSystemCatalog.map((product) =>
  createComparisonProductSnapshot(product, conferenceSystemCatalog),
);

export default function ConferenceComparePage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 py-7 md:px-6 md:py-9">
      <Breadcrumbs items={[homeBreadcrumb(), { href: "/conference-system/", label: "Conference System" }, { href: "/conference-system/compare/", label: "Compare", current: true }]} />
      <header className="relative mt-4 w-full max-w-full overflow-hidden rounded-3xl bg-[#071936] p-5 text-white shadow-[0_16px_40px_rgba(7,25,54,0.16)] md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative min-w-0 max-w-4xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-300">Product decision tool</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">Compare Conference Products</h1>
          <p className="mt-3 max-w-3xl break-words text-sm leading-7 text-slate-200 md:text-base">Evaluate up to three conference products using verified catalog specifications, pricing basis, system roles and compatibility information.</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-100" aria-label="Comparison tool benefits">
            <li className="max-w-full rounded-full border border-white/15 bg-white/10 px-3 py-1.5">2–3 products</li>
            <li className="max-w-full rounded-full border border-white/15 bg-white/10 px-3 py-1.5">Verified catalog data</li>
            <li className="max-w-full rounded-full border border-white/15 bg-white/10 px-3 py-1.5">Shareable selection</li>
          </ul>
        </div>
      </header>
      <section className="mt-4 w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-[#f7f9fc] p-3 shadow-[0_8px_28px_rgba(15,23,42,0.06)] sm:p-4 md:p-6" aria-label="Conference product comparison">
        <Suspense fallback={<div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-semibold text-slate-600">Loading selected products…</div>}>
          <ConferenceCompareClient products={comparisonProducts} />
        </Suspense>
      </section>
    </div>
  );
}
