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
  description: "Explore Conference System brands, current product ranges, pricing, and project consultation in Bangladesh.",
  path: "/conference-system/brands/",
  openGraphTitle: "Conference System Brands in Bangladesh",
  openGraphType: "website",
});

export default function ConferenceBrandsPage() {
  const availableBrands = conferenceBrandConfigs.filter(
    (brand) => getConferenceBrandProductCount(brand) > 0
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
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">Conference system brands</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          Conference System Brands in Bangladesh
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base md:leading-8">
          Compare conference system brands available through Sasha Corporation. Review each brand&apos;s current product
          range, applications, indicative pricing, and room-planning guidance before requesting a quotation.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/?project=conference-system" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Request a Quote
          </Link>
          <Link href="/conference-system/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Conference System Hub
          </Link>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="featured-conference-brands">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">Available brands</p>
        <h2 id="featured-conference-brands" className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">Choose a Conference System Brand</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Open a brand collection to compare product types, prices, applications, and suitable conference-room uses.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableBrands.map((brand) => {
            const count = getConferenceBrandProductCount(brand);
            return (
              <li key={brand.id}>
                <Link
                  href={`/conference-system/brands/${brand.slug}/`}
                  className="group flex h-full min-h-44 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-xl font-extrabold text-slate-950 group-hover:text-orange-700">{brand.name}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
                      Products Available
                    </span>
                  </span>
                  <span className="mt-4 block text-sm leading-6 text-slate-600">{brand.description}</span>
                  <span className="mt-auto pt-4 text-sm font-extrabold text-orange-600">
                    Browse {count} {count === 1 ? "product" : "products"} &rarr;
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

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

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">Choosing a brand</p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">How the Conference Brands Differ</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article>
            <h3 className="text-base font-extrabold text-slate-900">Bosch — CCS 900 Ultra and CCS 1000 D</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Bosch splits its range in two. CCS 900 Ultra is analogue and commissions without configuration software,
              which suits fixed boardrooms that value speed of installation. CCS 1000 D is digital, set up from a web
              browser, and adds request-to-speak queueing plus camera-control triggers. The CCSD-CURD variant records the
              meeting to USB storage, which matters where the audio record forms part of the minutes.
            </p>
          </article>
          <article>
            <h3 className="text-base font-extrabold text-slate-900">TOA — TS-680 through TS-900</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              TOA offers the widest ladder of room sizes, from the compact TS-820 up to the TS-900 range for formal
              chambers. Its practical advantage in Bangladesh is service depth: the brand has been supported here long
              enough that spares and repair knowledge exist in-country. The TS-918 expansion unit gives a defined route
              to add member positions later without replacing the central unit.
            </p>
          </article>
          <article>
            <h3 className="text-base font-extrabold text-slate-900">CMX — wired, wireless, infrared and paperless</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              CMX is the broadest range on carrier choice. The WS and US series cover wired digital discussion, the 5G
              and UHF series free the table from cabling, and the S800MC uses infrared so discussion audio cannot pass
              through walls during closed sessions. The MC series adds paperless meeting hosts that distribute agendas
              and papers to seat terminals instead of printed packs.
            </p>
          </article>
          <article>
            <h3 className="text-base font-extrabold text-slate-900">SPON — networked conference audio</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              SPON covers the discussion chain together with the wider room audio: chairman and delegate units, a central
              control unit, DSP, network amplification, wireless access points, and charging. That makes it a practical
              choice where the conference system has to integrate with building paging rather than stand alone.
            </p>
          </article>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          Across all four brands the deciding questions are the same: how many positions the room needs today and after
          expansion, whether the table can take cable, whether sessions must stay acoustically contained, and whether the
          audio record has to be archived. Sasha Corporation can work through those with you before a BOQ is prepared.
        </p>
      </section>

      <section className="mt-10 rounded-3xl bg-slate-950 p-6 text-white md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-400">Project support</p>
            <h2 className="mt-2 text-2xl font-extrabold">Need Help Selecting a Conference Brand?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Share your room, participant, system, and installation requirements. Sasha can recommend suitable current
              products and prepare a project quotation.
            </p>
          </div>
          <Link href="/contact/?project=conference-system" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
            Talk to an Expert
          </Link>
        </div>
      </section>
    </main>
  );
}
