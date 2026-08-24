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
    <main className="mx-auto w-full max-w-[100vw] overflow-x-clip px-4 py-8 md:max-w-7xl md:px-6">
      <Breadcrumbs items={[homeBreadcrumb(), { href: "/conference-system/", label: "Conference System" }, { href: "/conference-system/compare/", label: "Compare", current: true }]} />
      <header className="mt-4 w-full max-w-full rounded-3xl border border-orange-100 bg-white p-5 shadow-sm md:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Compare Conference Products</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 md:text-base">Compare verified product details, pricing, system family, installation context and available compatibility information.</p>
      </header>
      <section className="mt-4 w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-6" aria-label="Conference product comparison">
        <Suspense fallback={<div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-semibold text-slate-600">Loading selected products…</div>}>
          <ConferenceCompareClient products={comparisonProducts} />
        </Suspense>
      </section>
    </main>
  );
}
