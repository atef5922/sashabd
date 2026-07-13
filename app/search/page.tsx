import { Suspense } from "react";
import SearchClient from "./search-client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
          <Breadcrumbs
            items={[
              homeBreadcrumb(),
              { href: "/search/", label: "Search", current: true },
            ]}
          />
          <div
            className="rounded-3xl border bg-white p-7 shadow-sm"
            style={{ borderColor: "rgba(15,23,42,0.10)" }}
          >
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Search</div>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Search results</h1>
            <p className="mt-2 text-sm text-slate-600">Loading…</p>
          </div>
        </main>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
