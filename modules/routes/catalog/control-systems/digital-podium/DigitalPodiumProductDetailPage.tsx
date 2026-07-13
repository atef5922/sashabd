"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DigitalPodiumItem, DigitalPodiumSpecRow } from "./catalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

type RelatedLink = { href: string; label: string };

export default function DigitalPodiumProductDetailPage({
  product,
  wa,
  featuredCards = [],
  relatedLinks = [],
  whatYouGet = [],
}: {
  product: DigitalPodiumItem;
  wa: string;
  featuredCards?: Array<{
    product: DigitalPodiumItem;
    highlights: string[];
    recommendedFor: string[];
  }>;
  relatedLinks?: RelatedLink[];
  whatYouGet?: string[];
}) {
  const [activeTab, setActiveTab] = useState<"spec" | "description">("spec");

  const shortRecommended = useMemo(() => product.recommendedFor.slice(0, 4).join(", "), [product.recommendedFor]);
  const topHighlights = useMemo(() => product.cardHighlights.slice(0, 8), [product.cardHighlights]);

  const specRows: DigitalPodiumSpecRow[] = useMemo(() => product.specs ?? [], [product.specs]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/digital-podium/", label: "Digital Podium" },
          {
            href: `/digital-podium/${product.slug}/`,
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
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover bg-white"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">{product.title}</h1>
          <p className="mt-2 text-sm text-slate-600 leading-7">{product.subtitle}</p>

          <div className="mt-3 grid gap-2 rounded-2xl border bg-slate-50 p-4" style={{ borderColor: `${BRAND.maroon}12` }}>
            <div className="text-sm font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(product.priceLabel)}</div>
            <div className="text-sm text-slate-700 leading-7">
              <span className="font-bold text-slate-900">Recommended:</span>{" "}
              {shortRecommended || "Project dependent"}
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
              Request proposal
            </Link>
            <Link
              href="/digital-podium/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: "rgba(15,23,42,0.12)" }}
            >
              Back to Digital Podium
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
                      className={`grid grid-cols-12 gap-3 px-4 py-3 text-sm ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <div className="col-span-5 font-extrabold text-slate-900">{r.k}</div>
                      <div className="col-span-7 text-slate-700 leading-7">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {product.description.map((p, idx) => (
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
              Clear recommendations and BOQ-friendly scope so your podium setup works smoothly from day one.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {(whatYouGet.length
                ? whatYouGet
                : [
                    "Configuration guidance based on classroom/auditorium workflow",
                    "Display, PC and audio integration planning",
                    "Cable routing and safe installation support",
                    "Operator handover and after-sales support planning",
                  ]
              ).map((t) => (
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
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Featured Products</h2>
              <p className="text-xs text-slate-600">Other digital podium options you may compare for your setup.</p>
            </div>
            <Link
              href="/digital-podium/"
              className="text-xs font-bold"
              style={{ color: BRAND.maroon }}
            >
              View all products
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredCards.map(({ product: item, highlights, recommendedFor }) => {
              const detailHref = `/digital-podium/${item.slug}/`;

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
                    topLeftBadge={{ text: "Digital Podium", tone: "light" }}
                    topRightBadge={{ text: item.priceLabel, tone: "dark" }}
                    metaLines={[
                      { text: item.priceLabel, className: "mt-1 text-sm font-semibold text-sky-700" },
                      { text: item.subtitle, className: "mt-2 min-h-[4.5rem] text-sm text-slate-600 leading-6 line-clamp-3" },
                    ]}
                    bullets={highlights}
                    chips={recommendedFor}
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

