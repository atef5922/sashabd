import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { buildProductMetadata } from "@/lib/seo";
import { conferenceBrandConfigs, getConferenceBrandProductCount } from "../taxonomy";

export const metadata: Metadata = buildProductMetadata({
  title: "Conference System Brands in Bangladesh",
  description: "Browse the Conference System brand registry and verified dedicated products available for meeting-room audio and video projects in Bangladesh.",
  path: "/conference-system/brands/",
  openGraphTitle: "Conference System Brands in Bangladesh",
  openGraphType: "website",
});

export default function ConferenceBrandsPage() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6"
      data-conference-route-kind="brands-hub"
    >
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/conference-system/", label: "Conference System" },
          { href: "/conference-system/brands/", label: "Brands", current: true },
        ]}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Conference System Brands</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          This registry separates planned featured brands from other verified brands represented in the dedicated
          Conference product catalog.
        </p>
      </section>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {conferenceBrandConfigs.map((brand) => {
          const count = getConferenceBrandProductCount(brand);
          return (
            <li key={brand.id}>
              <Link
                href={`/conference-system/brands/${brand.slug}/`}
                className="block h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:shadow-md"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-lg font-extrabold text-slate-950">{brand.name}</span>
                  {brand.featured ? (
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-700">
                      Featured
                    </span>
                  ) : null}
                </span>
                <span className="mt-2 block text-sm text-slate-600">
                  {count} verified {count === 1 ? "product" : "products"}
                </span>
                {!count ? <span className="mt-2 block text-xs font-semibold text-slate-500">Noindex while empty</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
