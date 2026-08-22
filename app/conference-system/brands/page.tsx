import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { buildProductMetadata } from "@/lib/seo";
import {
  conferenceBrandConfigs,
  conferenceCategoryConfigs,
  getConferenceBrandProductCount,
  getConferenceCategoryProductCount,
} from "../taxonomy";

export const metadata: Metadata = buildProductMetadata({
  title: "Conference System Brands in Bangladesh",
  description: "Explore featured and currently available Conference System brands with verified product counts, categories, pricing, and project consultation in Bangladesh.",
  path: "/conference-system/brands/",
  openGraphTitle: "Conference System Brands in Bangladesh",
  openGraphType: "website",
});

export default function ConferenceBrandsPage() {
  const featuredBrands = conferenceBrandConfigs.filter((brand) => brand.featured);
  const otherAvailableBrands = conferenceBrandConfigs.filter(
    (brand) => !brand.featured && getConferenceBrandProductCount(brand) > 0
  );
  const availableCategories = conferenceCategoryConfigs.filter(
    (category) => getConferenceCategoryProductCount(category) > 0
  );

  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-9"
      data-conference-route-kind="brands-hub"
    >
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/conference-system/", label: "Conference System" },
          { href: "/conference-system/brands/", label: "Brands", current: true },
        ]}
      />

      <section className="overflow-hidden rounded-3xl border border-orange-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_55%,#f8fafc_100%)] p-6 md:p-9">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">Brand discovery</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          Conference System Brands in Bangladesh
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base md:leading-8">
          Explore the planned featured brand registry and verified brands currently represented in Sasha&apos;s dedicated
          Conference catalog. Product counts and availability update automatically from normalized data.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Request a Quote
          </Link>
          <Link href="/conference-system/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Conference System Hub
          </Link>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="featured-conference-brands">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">Planned navigation</p>
        <h2 id="featured-conference-brands" className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">Featured Brands</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Empty brand routes remain available for consultation but are clearly marked and excluded from search indexing.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBrands.map((brand) => {
            const count = getConferenceBrandProductCount(brand);
            return (
              <li key={brand.id}>
                <Link
                  href={`/conference-system/brands/${brand.slug}/`}
                  className="group flex h-full min-h-44 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-xl font-extrabold text-slate-950 group-hover:text-orange-700">{brand.name}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${count ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {count ? "Products Available" : "Contact for Availability"}
                    </span>
                  </span>
                  <span className="mt-4 block text-sm leading-6 text-slate-600">{brand.description}</span>
                  <span className="mt-auto pt-4 text-sm font-extrabold text-orange-600">
                    {count} verified {count === 1 ? "product" : "products"} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {otherAvailableBrands.length ? (
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">Verified catalog</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Other Available Brands</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherAvailableBrands.map((brand) => {
              const count = getConferenceBrandProductCount(brand);
              return (
                <Link key={brand.id} href={`/conference-system/brands/${brand.slug}/`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-300 hover:bg-orange-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
                  <span className="text-lg font-extrabold text-slate-950">{brand.name}</span>
                  <span className="mt-2 block text-sm text-slate-600">{count} verified {count === 1 ? "product" : "products"}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">Current coverage</p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Available Conference Categories</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {availableCategories.map((category) => (
            <Link key={category.id} href={`/conference-system/${category.slug}/`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
              {category.shortLabel ?? category.label}
              <span className="text-xs text-slate-500">{getConferenceCategoryProductCount(category)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-slate-950 p-6 text-white md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-400">Project support</p>
            <h2 className="mt-2 text-2xl font-extrabold">Need Help Selecting a Conference Brand?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Share your room, participant, system, and installation requirements. Sasha can recommend from verified
              current products and prepare a project quotation.
            </p>
          </div>
          <Link href="/contact/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
            Talk to an Expert
          </Link>
        </div>
      </section>
    </main>
  );
}
