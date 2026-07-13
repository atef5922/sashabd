"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PaSystemItem } from "./catalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";

type RelatedLink = { href: string; label: string };

export type PaSystemProductDetailPageProps = {
  product: PaSystemItem;
  categoryLabel: string;
  categoryHref: string;
  backHref: string;
  backLabel: string;
  wa: string;
  detailedSpecs: { k: string; v: string }[];
  featuredProducts: PaSystemItem[];
  featuredHrefPrefix: string;
  relatedLinks: RelatedLink[];
  overview: string;
  keyFeatures: string[];
  description: string;
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
};

function inferBestFor(item: PaSystemItem): string[] {
  if (item.bestFor?.length) return item.bestFor.slice(0, 6);

  const text = `${item.title} ${item.subtitle} ${item.tags.join(" ")}`.toLowerCase();
  const picks: string[] = [];
  const add = (label: string, hit: boolean) => {
    if (hit && !picks.includes(label)) picks.push(label);
  };

  add("School", text.includes("school"));
  add("Mosque", text.includes("mosque") || text.includes("azan") || text.includes("khutbah"));
  add("Office", text.includes("office"));
  add("Factory", text.includes("factory") || text.includes("industrial"));
  add("Outdoor", text.includes("outdoor"));
  add("Paging", text.includes("paging") || text.includes("announcement"));
  add("BGM", text.includes("bgm") || text.includes("music"));
  add("Hall", text.includes("hall") || text.includes("auditorium"));

  if (picks.length) return picks.slice(0, 6);
  return item.tags.slice(0, 6);
}

function getCardFeatures(item: PaSystemItem): string[] {
  if (item.quickFeatures?.length) return item.quickFeatures.slice(0, 4);
  if (item.tags?.length) return item.tags.slice(0, 4);
  return [];
}

export default function PaSystemProductDetailPage({
  product,
  categoryLabel,
  categoryHref,
  backHref,
  backLabel,
  wa,
  detailedSpecs,
  featuredProducts,
  featuredHrefPrefix,
  relatedLinks,
  overview,
  keyFeatures,
  description,
}: PaSystemProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"spec" | "description">("spec");

  const recommended = useMemo(() => inferBestFor(product).slice(0, 4).join(", "), [product]);
  const heroFeatures = useMemo(() => (keyFeatures.length ? keyFeatures : getCardFeatures(product)).slice(0, 10), [keyFeatures, product]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: categoryHref, label: categoryLabel },
          {
            href: `${featuredHrefPrefix}/${product.slug}/`,
            label: product.title,
            current: true,
          },
        ]}
      />

      <section className="grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-2" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
        <div className="overflow-hidden rounded-xl bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.title} className="h-full w-full object-cover bg-white" loading="lazy" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
          <p className="mt-1 text-sm font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(product.priceLabel)}</p>
          <p className="mt-1 text-sm text-slate-700">Recommended: {recommended || "Project dependent"}</p>

          <h2 className="mt-3 text-sm font-bold text-slate-900">Key Features</h2>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700 marker:text-slate-500">
            {heroFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-3 text-xs leading-6 text-slate-600">{product.subtitle}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get a Quotation →
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp
            </a>
            <Link href={backHref} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">
              {backLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
            <h3 className="text-base font-bold text-slate-900">Detailed Overview</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{overview}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/contact/"
                className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Get a Quotation →
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
              >
                WhatsApp
              </a>
              <Link href={backHref} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">
                {backLabel}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
            <h3 className="text-sm font-bold text-slate-900">Related pages</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
            <h3 className="text-sm font-bold text-slate-900">What you get from us</h3>
            <ul className="mt-2 space-y-1 text-xs leading-6 text-slate-700">
              <li>- BOQ-based quotation and model recommendation</li>
              <li>- Cabling / zoning planning and selection guidance</li>
              <li>- Rack wiring, testing, and commissioning support</li>
              <li>- After-sales support and service-friendly setup</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <div className="mb-2 border-b border-slate-200">
            <div className="flex items-center gap-5 text-sm font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("spec")}
                className="border-b-2 pb-2"
                style={{
                  borderColor: activeTab === "spec" ? BRAND.maroon : "transparent",
                  color: activeTab === "spec" ? BRAND.maroon : "#334155",
                }}
              >
                Specification
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className="border-b-2 pb-2"
                style={{
                  borderColor: activeTab === "description" ? BRAND.maroon : "transparent",
                  color: activeTab === "description" ? BRAND.maroon : "#475569",
                }}
              >
                Description
              </button>
            </div>
          </div>

          {activeTab === "spec" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700">
                    <th className="py-2 text-left font-bold uppercase tracking-wide">Parameter</th>
                    <th className="py-2 text-right font-bold uppercase tracking-wide">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedSpecs.map((spec) => (
                    <tr key={`${spec.k}-${spec.v}`} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-2 pr-4 font-semibold text-slate-900">{spec.k}</td>
                      <td className="py-2 text-right text-slate-700">{spec.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === "description" ? <p className="text-xs leading-7 text-slate-700">{description}</p> : null}
        </div>
      </section>

      {featuredProducts.length ? (
        <section className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Featured Products</h2>
              <p className="text-xs text-slate-600">Related items you may also need for your setup.</p>
            </div>
            <Link href={categoryHref} className="text-xs font-bold" style={{ color: BRAND.maroon }}>
              View all products
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((item) => {
              const detailHref = `${featuredHrefPrefix}/${item.slug}/`;
              const features = getCardFeatures(item);
              const bestFor = inferBestFor(item).slice(0, 3);

              return (
                <div
                  key={item.slug}
                  className="h-full"
                >
                  <ProductGridCard
                    href={detailHref}
                    title={item.title}
                    image={
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                    }
                    borderColor="rgba(15,23,42,0.10)"
                    metaLines={[
                      { text: item.subtitle, className: "mt-2 min-h-[4.5rem] text-sm text-slate-600 leading-6 line-clamp-3" },
                    ]}
                    bullets={features}
                    chips={bestFor}
                    accentColor={BRAND.maroon}
                    contactHref="/contact/"
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

