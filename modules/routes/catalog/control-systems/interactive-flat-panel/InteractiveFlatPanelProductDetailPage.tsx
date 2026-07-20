"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { InteractiveFlatPanelItem } from "./catalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileFeaturedProductsRail from "@/components/products/MobileFeaturedProductsRail";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

type RelatedLink = { href: string; label: string };

export type InteractiveFlatPanelFeaturedCard = {
  product: InteractiveFlatPanelItem;
  highlights: string[];
  bestFor: string[];
};

export default function InteractiveFlatPanelProductDetailPage({
  product,
  wa,
  highlights,
  recommendedFor,
  specRows,
  descriptionParagraphs,
  featuredCards = [],
  relatedLinks = [],
  whatYouGet = [],
}: {
  product: InteractiveFlatPanelItem;
  wa: string;
  highlights: string[];
  recommendedFor: string[];
  specRows: { k: string; v: string }[];
  descriptionParagraphs: string[];
  featuredCards?: InteractiveFlatPanelFeaturedCard[];
  relatedLinks?: RelatedLink[];
  whatYouGet?: string[];
}) {
  const [activeTab, setActiveTab] = useState<"spec" | "description">("spec");

  const shortRecommended = useMemo(() => recommendedFor.slice(0, 4).join(", "), [recommendedFor]);
  const topHighlights = useMemo(() => highlights.slice(0, 8), [highlights]);

  const effectiveWhatYouGet = useMemo(() => {
    if (whatYouGet.length) return whatYouGet;
    return [
      "Size recommendation based on seating depth and daily usage",
      "Mounting and cabling guidance for a clean installation",
      "OPS PC and accessory planning when a Windows workflow is required",
      "Commissioning + basic user handover guidance",
      "After-sales support planning for stable long-term operation",
    ];
  }, [whatYouGet]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/interactive-flat-panel/", label: "Interactive Flat Panel" },
          {
            href: `/interactive-flat-panel/${product.slug}/`,
            label: product.title,
            current: true,
          },
        ]}
      />

      <section
        className="grid gap-4 rounded-3xl border bg-white p-4 md:grid-cols-2"
        style={{ borderColor: "rgba(15,23,42,0.1)" }}
      >
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.title} className="h-full w-full object-cover bg-white" loading="lazy" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">{product.title}</h1>
          <p className="mt-2 text-sm text-slate-600 leading-7">{product.subtitle}</p>

          <div className="mt-3 grid gap-2 rounded-2xl border bg-slate-50 p-4" style={{ borderColor: `${BRAND.maroon}12` }}>
            <div className="text-sm font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(product.priceLabel)}</div>
            <div className="text-sm text-slate-700 leading-7">
              <span className="font-bold text-slate-900">Recommended:</span> {shortRecommended || "Project dependent"}
            </div>
          </div>

          <h2 className="mt-4 text-sm font-extrabold text-slate-900">Key highlights</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {topHighlights.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: BRAND.maroon }} />
                <span className="leading-7">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((x) => (
              <span
                key={x}
                className="rounded-full border bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                style={{ borderColor: `${BRAND.maroon}12` }}
              >
                {x}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp quotation
            </a>
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request quotation
            </Link>
            <Link
              href="/interactive-flat-panel/"
              className="rounded-xl border bg-slate-50 px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: "rgba(15,23,42,0.12)" }}
            >
              Back to Interactive Flat Panel
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border bg-white p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("spec")}
                className="rounded-full border px-4 py-2 text-xs font-extrabold transition"
                style={{
                  borderColor: activeTab === "spec" ? `${BRAND.maroon}55` : "rgba(15,23,42,0.12)",
                  background: activeTab === "spec" ? `${BRAND.maroon}12` : "#fff",
                  color: activeTab === "spec" ? BRAND.maroonDark : "#0f172a",
                }}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className="rounded-full border px-4 py-2 text-xs font-extrabold transition"
                style={{
                  borderColor: activeTab === "description" ? `${BRAND.maroon}55` : "rgba(15,23,42,0.12)",
                  background: activeTab === "description" ? `${BRAND.maroon}12` : "#fff",
                  color: activeTab === "description" ? BRAND.maroonDark : "#0f172a",
                }}
              >
                Description
              </button>
            </div>

            {activeTab === "spec" ? (
              <div className="mt-4 overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(15,23,42,0.10)" }}>
                <div className="grid">
                  {specRows.map((r, i) => (
                    <div
                      key={`${r.k}-${i}`}
                      className={`grid grid-cols-12 gap-3 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                    >
                      <div className="col-span-5 font-extrabold text-slate-900">{r.k}</div>
                      <div className="col-span-7 text-slate-700 leading-7">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {descriptionParagraphs.map((p, idx) => (
                  <p key={idx} className="text-sm text-slate-600 leading-7 text-justify">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
            <div className="text-sm font-extrabold text-slate-900">What you get from Sasha</div>
            <p className="mt-2 text-sm text-slate-600 leading-7">
              Clear recommendations and BOQ-friendly scope so your installation works smoothly from day one.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {effectiveWhatYouGet.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{t}</span>
                </li>
              ))}
            </ul>

            {relatedLinks.length ? (
              <div className="mt-6">
                <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Related pages</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {relatedLinks.map((x) => (
                    <Link
                      key={x.href}
                      href={x.href}
                      className="rounded-full border bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-sm"
                      style={{ borderColor: "rgba(15,23,42,0.10)" }}
                    >
                      {x.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {featuredCards.length ? (
        <section className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <div className="hidden items-center justify-between gap-3 md:flex">
            <div>
              <h2 className="text-base font-bold text-slate-900">Featured Products</h2>
              <p className="text-xs text-slate-600">Other interactive flat panel options you may compare for your setup.</p>
            </div>
            <Link href="/interactive-flat-panel/" className="text-xs font-bold" style={{ color: BRAND.maroon }}>
              View all products
            </Link>
          </div>

          <div className="mt-4">
            <MobileFeaturedProductsRail
              viewAllHref="/interactive-flat-panel/"
              items={featuredCards.map(({ product: item }) => ({
                id: item.slug,
                href: `/interactive-flat-panel/${item.slug}/`,
                title: item.title,
                imageSrc: item.image,
                imageAlt: item.title,
                imageClassName: "h-full w-full object-cover object-center transition duration-300",
                imageContainerClassName: "bg-slate-50",
              }))}
            />
          </div>

          <div className="mt-4 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {featuredCards.map(({ product: item, highlights: cardHighlights, bestFor }) => {
              const detailHref = `/interactive-flat-panel/${item.slug}/`;

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
                    topLeftBadge={{ text: "Interactive Flat Panel", tone: "light" }}
                    topRightBadge={{ text: item.priceLabel, tone: "dark" }}
                    metaLines={[
                      { text: item.priceLabel, className: "mt-1 text-sm font-semibold text-sky-700" },
                      { text: item.subtitle, className: "mt-2 min-h-[4.5rem] text-sm text-slate-600 leading-6 line-clamp-3" },
                    ]}
                    bullets={cardHighlights}
                    chips={bestFor}
                    accentColor={BRAND.maroon}
                    contactHref="/contact"
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

