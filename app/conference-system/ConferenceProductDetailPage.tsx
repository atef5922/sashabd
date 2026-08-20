"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import type { ConferenceProduct } from "./catalog";

type ConferenceProductDetailPageProps = {
  product: ConferenceProduct;
  relatedProducts: ConferenceProduct[];
  wa: string;
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
};

export default function ConferenceProductDetailPage({
  product,
  relatedProducts,
  wa,
}: ConferenceProductDetailPageProps) {
  const [activeImage, setActiveImage] = useState(
    product.images.find((image) => image.primary)?.src ?? product.images[0].src
  );
  const [activeTab, setActiveTab] = useState<"spec" | "description">("spec");

  const visibleGallery = useMemo(() => {
    const seen = new Set<string>();
    return product.images.filter((image) => {
      if (seen.has(image.src)) return false;
      seen.add(image.src);
      return true;
    });
  }, [product.images]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/conference-system/", label: "Conference System" },
          { href: `/conference-system/${product.slug}/`, label: product.name, current: true },
        ]}
      />

      <section className="grid gap-5 rounded-2xl border bg-white p-4 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
        <div className="grid gap-3 sm:grid-cols-[84px_minmax(0,1fr)]">
          <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
            {visibleGallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(image.src)}
                aria-label={`Show product image ${index + 1}`}
                className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5"
                style={{ borderColor: activeImage === image.src ? BRAND.maroon : "rgba(15,23,42,0.12)" }}
              >
                <Image
                  src={image.src}
                  alt={`${image.alt} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>

          <div className="order-1 relative aspect-square overflow-hidden rounded-xl bg-white sm:order-2">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-5 sm:p-8"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-700" style={{ borderColor: `${BRAND.maroon}22` }}>
              {product.badge}
            </span>
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">{product.name}</h1>
          <p className="mt-2 text-sm font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(product.price.displayLabel)}</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{product.shortDescription}</p>

          <h2 className="mt-4 text-sm font-bold text-slate-900">Key Features</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
            {product.keyFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.applications.map((item) => (
              <span
                key={item}
                className="rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get Quotation
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp Now
            </a>
            <Link href="/conference-system/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">
              Back to Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">Product Overview</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{product.description}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Category", v: "Conference System" },
              { k: "Support", v: "BOQ + Installation" },
              { k: "Availability", v: "Project quotation" },
            ].map((item) => (
              <div key={item.k} className="rounded-xl border bg-slate-50 p-3" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{item.k}</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">{item.v}</div>
              </div>
            ))}
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
                Specifications
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
                    <th className="py-2 text-right font-bold uppercase tracking-wide">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec) => (
                    <tr key={`${spec.key}-${spec.value}`} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-2 pr-4 font-semibold text-slate-900">{spec.key}</td>
                      <td className="py-2 text-right text-slate-700">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === "description" ? <p className="text-xs leading-7 text-slate-700">{product.description}</p> : null}
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Related Conference Products</h2>
              <p className="text-xs text-slate-600">Other items for chairman, delegate, wireless, DSP, and control-room planning.</p>
            </div>
            <Link href="/conference-system/" className="text-xs font-bold" style={{ color: BRAND.maroon }}>
              View all products
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/conference-system/${item.slug}/`}
                prefetch={false}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "rgba(15,23,42,0.1)" }}
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={item.images.find((image) => image.primary)?.src ?? item.images[0].src}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-5 transition duration-200 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-extrabold leading-snug text-slate-900 line-clamp-2">{item.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(item.price.displayLabel)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
