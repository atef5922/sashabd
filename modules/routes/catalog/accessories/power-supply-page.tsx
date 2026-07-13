import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { powerSupplyCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "LED Display Power Supply | Sasha Corporation",
  description:
    "Browse LED display power supply models for cabinets: 5V high-current PSU options, protections, wiring notes and selection guidance.",
  alternates: { canonical: "/led-display/accessories/power-supply/" },
  openGraph: {
    title: "LED Display Power Supply",
    description: "Browse 5V high-current LED display PSU models with practical wiring and protection guidance.",
    url: "/led-display/accessories/power-supply",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/accessories/power-supply-psu.webp"),
        width: 1200,
        height: 630,
        alt: "LED Display Power Supply",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Display Power Supply",
    description: "Browse 5V high-current LED display PSU models with practical wiring and protection guidance.",
    images: [socialImageUrl("/images/accessories/power-supply-psu.webp")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export default function PowerSupplyListingPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/power-supply/", label: "Power Supply", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      {/* Header */}
      <section className="rounded-3xl bg-white p-7 md:p-10">
        <div className="max-w-3xl">
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
            style={{ borderColor: `${BRAND.maroon}22` }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
            Power Supply Models
          </div>

          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">LED Display Power Supply</h1>
        </div>

        <p className="mt-1 w-full text-justify leading-7 text-slate-600">
          An LED display power supply is the component that delivers stable DC power to LED modules, receiving cards, and other cabinet
          electronics, so the screen can run smoothly without flicker, voltage drop, or unexpected shutdown. In practical use, the right power
          supply is important not only for turning the screen on, but also for maintaining brightness consistency, protecting components during
          long operating hours, and supporting reliable performance in both indoor and outdoor environments. Different models can vary by
          voltage, current capacity, build quality, cooling behavior, efficiency, and cabinet compatibility, which is why proper load planning
          matters before purchase. Choosing the correct LED power supply helps improve safety, reduce stress on the system, and ensure stable
          long-term operation for advertising displays, video walls, stage screens, and other LED installations.
        </p>
      </section>

      {/* GRID */}
      <section className="mt-8">
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {powerSupplyCatalog.map((p) => (
            <ProductGridCard
              key={p.slug}
              href={`/led-display/accessories/power-supply/${p.slug}/`}
              title={p.title}
              image={<Image src={p.image} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-center transition duration-300 group-hover:scale-[1.03]" priority={false} />}
              imageContainerClassName="bg-slate-100"
              borderColor={`${BRAND.maroon}12`}
              topLeftBadge={{ text: p.badge, tone: "light" }}
              topRightBadge={{ text: "Accessories", tone: "dark" }}
              metaLines={p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
              bullets={p.quickFeatures.slice(0, 4)}
              chips={p.bestFor.slice(0, 3)}
              accentColor={BRAND.maroon}
              contactHref="/contact"
              viewDetailsLabel="View details →"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
