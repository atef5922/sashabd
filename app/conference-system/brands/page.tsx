import Image from "next/image";
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
  title: "Conference System Brands & Prices in Bangladesh",
  description: "Compare Bosch, TOA, SPON and CMX conference system brands and prices in Bangladesh. Explore compatible product families and request a project BOQ.",
  path: "/conference-system/brands/",
  openGraphTitle: "Conference System Brands & Prices in Bangladesh",
  openGraphType: "website",
});

const brandsHubSectionClass =
  "mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] [content-visibility:auto] [contain-intrinsic-size:auto_32rem] sm:px-5 md:px-6";

export default function ConferenceBrandsPage() {
  const availableBrands = conferenceBrandConfigs.filter(
    (brand) => getConferenceBrandProductCount(brand) > 0
  );
  const availableCategories = conferenceCategoryConfigs.filter(
    (category) => getConferenceCategoryProductCount(category) > 0
  );

  return (
    <main
      className="mx-auto -mt-2 w-full max-w-[clamp(80rem,90vw,108rem)] px-4 pb-10 pt-0 md:px-6"
      data-conference-route-kind="brands-hub"
    >
      <section className="relative left-1/2 right-1/2 isolate -mx-[50vw] min-h-[520px] w-screen overflow-hidden border-0 bg-[#f7f9fc] shadow-none sm:min-h-[460px] lg:min-h-[clamp(25rem,30vw,29rem)]" aria-labelledby="conference-brands-hero-heading">
        <Image
          src="/images/conference_landing/hero_banner.webp"
          alt="Professional conference room with tabletop discussion microphones"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[66%_center] lg:object-contain lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 sm:via-white/85 sm:to-white/5 lg:via-white/40 lg:to-transparent" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[520px] w-full max-w-[clamp(80rem,90vw,108rem)] items-center px-5 py-8 sm:min-h-[460px] sm:px-8 lg:min-h-[clamp(25rem,30vw,29rem)] lg:px-10">
          <div className="min-w-0 max-w-[42rem] lg:max-w-[43%]" style={{ width: "calc(100vw - 2.5rem)" }}>
            <Breadcrumbs
              items={[
                homeBreadcrumb(),
                { href: "/conference-system/", label: "Conference System" },
                { href: "/conference-system/brands/", label: "Brands", current: true },
              ]}
              showBackLink={false}
              className="mb-4 text-[11px] font-semibold text-slate-600 sm:text-xs"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#071936] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white sm:text-xs">Conference system brands</span>
              <span className="rounded-full border border-orange-200 bg-white/95 px-3 py-1 text-[10px] font-bold text-orange-700 shadow-sm sm:text-xs">{availableBrands.length} Featured Brands</span>
            </div>
            <h1 id="conference-brands-hero-heading" className="mt-5 break-words text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">
              Conference System Brands in Bangladesh
            </h1>
            <p className="mt-3 max-w-[39rem] text-left text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">
              Compare conference system brands available through Sasha Corporation. Review each brand&apos;s current product range, applications, indicative pricing, and room-planning guidance before requesting a quotation.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 min-[430px]:flex-row">
              <Link href="/contact/?project=conference-system" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">Get Free BOQ</Link>
              <Link href="#featured-conference-brands" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#071936] px-5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">View Brands</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${brandsHubSectionClass} scroll-mt-24`} aria-labelledby="featured-conference-brands">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f1530a]">Available brands</p>
        <h2 id="featured-conference-brands" className="mt-1 !text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[22px]">Choose a Conference System Brand</h2>
        <p className="mt-1.5 max-w-4xl text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
          Open a brand collection to compare product types, prices, applications, and suitable conference-room uses.
        </p>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {availableBrands.map((brand) => {
            const count = getConferenceBrandProductCount(brand);
            return (
              <li key={brand.id}>
                <Link
                  href={`/conference-system/brands/${brand.slug}/`}
                  className="group flex h-full min-h-40 flex-col rounded-lg border border-blue-200 bg-gradient-to-br from-[#f8fbff] to-blue-50 p-4 shadow-[0_3px_12px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-lg font-extrabold text-[#071936] group-hover:text-[#1744a1]">{brand.name}</span>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.04em] text-emerald-700">
                      Products Available
                    </span>
                  </span>
                  <span className="mt-3 block text-xs font-medium leading-5 text-slate-600">{brand.description}</span>
                  <span className="mt-auto pt-3 text-xs font-extrabold text-[#2456c7]">
                    Browse {count} {count === 1 ? "product" : "products"} &rarr;
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={brandsHubSectionClass}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f1530a]">Current coverage</p>
        <h2 className="mt-1 !text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[22px]">Available Conference Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {availableCategories.map((category) => (
            <Link key={category.id} href={`/conference-system/${category.slug}/`} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#cdd9e8] bg-[#f8fbff] px-3.5 py-2 text-xs font-extrabold text-[#071936] transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#1744a1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
              {category.shortLabel ?? category.label}
              <span className="text-[10px] text-slate-500">{getConferenceCategoryProductCount(category)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={brandsHubSectionClass}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f1530a]">Choosing a brand</p>
        <h2 className="mt-1 !text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[22px]">How the Conference Brands Differ</h2>
        <div className="mt-4 grid gap-2.5 md:grid-cols-2">
          <article className="rounded-lg border border-blue-200 bg-blue-50/70 p-4">
            <h3 className="text-base font-extrabold text-slate-900">Bosch — CCS 900 Ultra and CCS 1000 D</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Bosch splits its range in two. CCS 900 Ultra is analogue and commissions without configuration software,
              which suits fixed boardrooms that value speed of installation. CCS 1000 D is digital, set up from a web
              browser, and adds request-to-speak queueing plus camera-control triggers. The CCSD-CURD variant records the
              meeting to USB storage, which matters where the audio record forms part of the minutes.
            </p>
          </article>
          <article className="rounded-lg border border-orange-200 bg-orange-50/70 p-4">
            <h3 className="text-base font-extrabold text-slate-900">TOA — TS-680 through TS-900</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              TOA&apos;s listed conference range spans compact through formal meeting-room applications, including the
              TS-820 and TS-900 series. The TS-918 expansion unit provides a defined route to add compatible member
              positions without replacing the corresponding central unit.
            </p>
          </article>
          <article className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4">
            <h3 className="text-base font-extrabold text-slate-900">CMX — wired, wireless, infrared and paperless</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              The listed CMX range covers wired digital, wireless, infrared, and paperless meeting options. The WS and
              US series cover wired discussion, the 5G and UHF series support flexible table layouts, and the MC series
              adds paperless meeting hosts for agenda and document workflows.
            </p>
          </article>
          <article className="rounded-lg border border-violet-200 bg-violet-50/70 p-4">
            <h3 className="text-base font-extrabold text-slate-900">SPON — networked conference audio</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              SPON covers the discussion chain together with the wider room audio: chairman and delegate units, a central
              control unit, DSP, network amplification, wireless access points, and charging. That makes it a practical
              choice where the conference system has to integrate with building paging rather than stand alone.
            </p>
          </article>
        </div>
        <p className="mt-4 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
          Across all four brands the deciding questions are the same: how many positions the room needs today and after
          expansion, whether the table can take cable, whether sessions must stay acoustically contained, and whether the
          audio record has to be archived. Sasha Corporation can work through those with you before a BOQ is prepared.
        </p>
      </section>

      <section className="relative mt-4 min-h-[250px] overflow-hidden rounded-2xl border border-[#172c53] bg-[#071936] shadow-[0_8px_28px_rgba(7,25,54,0.18)]">
        <Image src="/images/conference_system_projects/project2.webp" alt="" fill sizes="100vw" className="object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,54,0.99)_0%,rgba(7,25,54,0.96)_37%,rgba(7,25,54,0.68)_60%,rgba(7,25,54,0.18)_100%)]" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[250px] max-w-[560px] flex-col justify-center px-5 py-6 sm:px-7 md:px-9">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-400">Project support</p>
          <h2 className="mt-1.5 max-w-[470px] !text-[24px] font-black leading-[1.08] tracking-tight text-white sm:!text-[28px]">Need Help Selecting a Conference Brand?</h2>
          <p className="mt-2 max-w-[460px] text-left text-[11px] font-medium leading-[1.15rem] text-blue-100 sm:text-xs">Share your room, participant, system, and installation requirements. Sasha can recommend suitable current products and prepare a project quotation.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/contact/?project=conference-system" className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#f45b18] px-5 text-[10px] font-extrabold text-white transition hover:bg-[#db490d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60">Get Free BOQ</Link>
            <Link href="/conference-system/" className="inline-flex min-h-9 items-center justify-center rounded-md border border-white/45 bg-white/10 px-5 text-[10px] font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">Conference System Hub</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
