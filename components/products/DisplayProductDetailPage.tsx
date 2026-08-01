"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileFeaturedProductsRail from "@/components/products/MobileFeaturedProductsRail";
import MobilePostFeaturedCta from "@/components/products/MobilePostFeaturedCta";
import { normalizeDisplayedPriceText } from "@/lib/price";
import type { ProductItem } from "../../lib/productsCatalog";
import { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";

type RelatedLink = { href: string; label: string };

type DisplayProductDetailPageProps = {
  product: ProductItem;
  categoryLabel: string;
  categoryHref: string;
  backHref: string;
  backLabel: string;
  wa: string;
  detailedSpecs: { k: string; v: string }[];
  featuredProducts: ProductItem[];
  featuredHrefPrefix: string;
  relatedLinks: RelatedLink[];
  overview: string;
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
};

const imageFitFixIds = new Set<string>([
  "indoor:p1-25-indoor-led-display",
  "indoor:p1-53-indoor-led-display",
  "indoor:p1-667-indoor-led-display",
  "indoor:p1-86-indoor-led-display",
  "indoor:p2-indoor-led-display",
  "indoor:p2-5-indoor-led-display",
  "indoor:p3-indoor-led-display",
  "indoor:p3-076-indoor-led-display",
  "outdoor:p2-5-outdoor-led-display-module",
  "outdoor:p3-outdoor-led-display-module",
  "outdoor:p3-076-outdoor-led-display-module",
  "outdoor:p4-outdoor-led-display",
  "outdoor:p5-outdoor-led-display",
  "outdoor:p6-outdoor-led-display",
  "outdoor:p6-67-outdoor-led-display-module-320x160mm",
  "outdoor:p8-outdoor-led-display-module",
  "outdoor:p10-outdoor-led-display-module",
]);

function getSpecValue(product: ProductItem, key: string): string | null {
  const match = product.keySpecs.find((s) => s.k.toLowerCase() === key.toLowerCase());
  return match?.v ?? null;
}

function parsePitchMm(text: string | null): number | null {
  if (!text) return null;
  const m = text.match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

function cleanText(text: string): string {
  return text
    .replace(/\u00c3\u0192\u00e2\u20ac\u201d|\u00c3\u2014|\u00d7/g, "x")
    .replace(/\u00c3\u201a\u00c2\u00b2|\u00c2\u00b2|\u00b2/g, "2")
    .replace(/\u00c3\u201a\u00c2\u00b1|\u00c2\u00b1|\u00b1/g, "+/-")
    .replace(/\u00c3\u201a\u00c2\u00b0C|\u00c2\u00b0C|\u00b0C/g, "deg C")
    .replace(/\u00c3\u201a\u00c2\u00b0|\u00c2\u00b0|\u00b0/g, " deg")
    .replace(/\u00c3\u00a2\u20ac\u00b0\u00c2\u00a5|\u00e2\u2030\u00a5|\u2265/g, ">=")
    .replace(/\u00c3\u00a2\u20ac\u00a0\u00e2\u20ac\u2122|\u00e2\u2020\u2019|\u2192/g, "->");
}

function estimateModuleResolution(pitchMm: number | null): string {
  if (!pitchMm) return "Project dependent";
  const w = Math.round(320 / pitchMm);
  const h = Math.round(160 / pitchMm);
  const px = (w * h).toLocaleString("en-US");
  return `${w}x${h} = ${px} pixels`;
}

function estimateDensity(pitchMm: number | null): string {
  if (!pitchMm) return "Project dependent";
  const d = Math.round(1000000 / (pitchMm * pitchMm)).toLocaleString("en-US");
  return `${d} dots/m2`;
}

function buildCompleteSpecs(product: ProductItem, incomingSpecs: { k: string; v: string }[]): { k: string; v: string }[] {

  const map = new Map<string, string>();
  incomingSpecs.forEach((s) => map.set(s.k.trim().toLowerCase(), s.v));

  const byKeys = (...keys: string[]): string | null => {
    for (const key of keys) {
      const v = map.get(key.toLowerCase());
      if (v) return v;
    }
    return null;
  };

  const pitch = byKeys("Pixel Pitch");
  const pitchMm = parsePitchMm(pitch ?? null);
  const isOutdoor = product.category === "outdoor";
  const isRental = product.category === "rental";

  return [
    { k: "Pixel Pitch", v: pitch ?? "Project dependent" },
    { k: "LED Type", v: byKeys("LED Type") ?? (isOutdoor ? "SMD1921" : isRental ? "SMD2121" : "SMD1212") },
    { k: "Module Resolution (WxH)", v: byKeys("Module Resolution (WxH)", "Resolution") ?? estimateModuleResolution(pitchMm) },
    { k: "Pixel Density", v: byKeys("Pixel Density") ?? estimateDensity(pitchMm) },
    { k: "Module Size (WxH)", v: byKeys("Module Size (WxH)", "Module Size") ?? "320x160 mm" },
    { k: "Module Weight", v: byKeys("Module Weight") ?? "Project dependent" },
    { k: "HUB Type", v: byKeys("HUB Type") ?? "HUB75" },
    { k: "Brightness", v: byKeys("Brightness") ?? (isOutdoor ? "5500 cd/m2" : isRental ? "1200 cd/m2" : "500 cd/m2") },
    { k: "Color Temperature", v: byKeys("Color Temperature") ?? "3200 K - 9300 K adjustable" },
    { k: "Viewing Angle (H/V)", v: byKeys("Viewing Angle (H/V)") ?? "140 deg / 140 deg" },
    { k: "Brightness / Color Uniformity", v: byKeys("Brightness / Color Uniformity") ?? ">= 95%" },
    { k: "Contrast Ratio", v: byKeys("Contrast Ratio") ?? "5000 : 1" },
    { k: "Max Power Consumption", v: byKeys("Max Power Consumption") ?? (isOutdoor ? "700 W/m2" : "480 W/m2") },
    { k: "Typical Power Consumption", v: byKeys("Typical Power Consumption") ?? (isOutdoor ? "260 W/m2" : "160 W/m2") },
    { k: "Input Voltage", v: byKeys("Input Voltage") ?? "AC 90-132 V / AC 186-264 V (47-63 Hz)" },
    { k: "Frame Frequency", v: byKeys("Frame Frequency") ?? "60 Hz" },
    { k: "Refresh Rate", v: byKeys("Refresh Rate") ?? "3840 Hz (Standard) / 7680 Hz (Optional)" },
    { k: "Processing Depth", v: byKeys("Processing Depth") ?? "14 - 16 Bit" },
    { k: "Video Support", v: byKeys("Video Support") ?? "2K / 4K UHD" },
    { k: "Life Span", v: byKeys("Life Span") ?? "100,000 Hours" },
    { k: "Operating Temp / Humidity", v: byKeys("Operating Temp / Humidity") ?? (isOutdoor ? "-20 deg C to +50 deg C / 10% - 90% RH" : "-20 deg C to +45 deg C / 10% - 90% RH") },
    { k: "Storage Temp / Humidity", v: byKeys("Storage Temp / Humidity") ?? "-20 deg C to +50 deg C / 10% - 80% RH" },
    { k: "Certifications", v: byKeys("Certifications") ?? "BIS / CE / CB / RoHS / EAC" },
    { k: "Environment", v: byKeys("Environment") ?? (isOutdoor ? "Outdoor" : isRental ? "Indoor / Semi-outdoor" : "Indoor") },
    { k: "Use Case", v: byKeys("Use Case") ?? (product.bestFor.join(", ") || "Project dependent") },
  ];
}

function buildHeroFeatures(product: ProductItem, specs: { k: string; v: string }[]): string[] {
  if (product.slug === "p1-25-indoor-led-display") {
    return [
      "320x160mm universal module size for standard indoor cabinet integration.",
      "Bottom case texture design for stronger structure and better assembly stability.",
      "High-quality LED lamp beads for reliable long-hour indoor performance.",
      "Upgraded PCB board design for more stable signal and power workflow.",
      "Lightweight module construction to reduce overall screen and cabinet load.",
      "Excellent visual clarity for close-view indoor display applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 45 deg tangent angle for creative installation requirements.",
      "Supports up to 7680Hz refresh rate for smoother and camera-friendly visuals.",
    ];
  }

  if (product.slug === "p1-53-indoor-led-display") {
    return [
      "320x160mm universal module size for standard indoor cabinet integration.",
      "Bottom case texture design for stronger structure and improved assembly stability.",
      "High-quality SMD1212 lamp beads for reliable long-hour indoor operation.",
      "Stable PCB board design for dependable power and signal workflow.",
      "Lightweight module construction helps reduce screen and cabinet load.",
      "Excellent indoor visual experience for close-view applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 45 deg tangent angle for creative installation requirements.",
      "Supports 3840Hz standard and up to 7680Hz optional refresh for camera-friendly output.",
    ];
  }

  if (product.slug === "p1-86-indoor-led-display") {
    return [
      "320x160mm universal module size for standard indoor cabinet integration.",
      "Bottom case texture design for stronger structure and improved assembly stability.",
      "High-quality SMD1515 lamp beads for reliable long-hour indoor operation.",
      "Stable PCB board design for dependable power and signal workflow.",
      "Lightweight module construction helps reduce screen and cabinet load.",
      "Excellent indoor visual experience for close-view applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 45 deg tangent angle for creative installation requirements.",
      "Supports 3840Hz standard and up to 7680Hz optional refresh for camera-friendly output.",
    ];
  }

  if (product.slug === "p2-indoor-led-display") {
    return [
      "320x160mm universal module size for standard indoor cabinet integration.",
      "Bottom case texture design for stronger structure and improved assembly stability.",
      "High-quality SMD1515 lamp beads for reliable long-hour indoor operation.",
      "Stable PCB board design for dependable power and signal workflow.",
      "Lightweight module construction helps reduce screen and cabinet load.",
      "Excellent indoor visual experience for close-view applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 45 deg tangent angle for creative installation requirements.",
      "Supports 3840Hz standard and up to 7680Hz optional refresh for camera-friendly output.",
    ];
  }

  if (product.slug === "p2-5-indoor-led-display") {
    return [
      "320x160mm universal module size for standard indoor cabinet integration.",
      "Bottom case texture design for stronger structure and improved assembly stability.",
      "High-quality SMD2121 lamp beads for reliable long-hour indoor operation.",
      "Stable PCB board design for dependable power and signal workflow.",
      "Lightweight module construction helps reduce screen and cabinet load.",
      "Excellent indoor visual experience for close-view applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 45 deg tangent angle for creative installation requirements.",
      "Supports 3840Hz standard and up to 7680Hz optional refresh for camera-friendly output.",
    ];
  }

  if (product.slug === "p3-indoor-led-display") {
    return [
      "192x192mm standard module size for indoor cabinet integration.",
      "Bottom case texture design for stronger structure and improved assembly stability.",
      "High-quality SMD2121 lamp beads for reliable long-hour indoor operation.",
      "Stable PCB board design for dependable power and signal workflow.",
      "Lightweight module construction helps reduce screen and cabinet load.",
      "Excellent indoor visual experience for medium-view applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 3840Hz standard and up to 7680Hz optional refresh for camera-friendly output.",
    ];
  }

  if (product.slug === "p3-076-indoor-led-display") {
    return [
      "320x160mm universal module size for standard indoor cabinet integration.",
      "Bottom case texture design for stronger structure and improved assembly stability.",
      "High-quality SMD2121 lamp beads for reliable long-hour indoor operation.",
      "Stable PCB board design for dependable power and signal workflow.",
      "Lightweight module construction helps reduce screen and cabinet load.",
      "Excellent indoor visual experience for medium-view applications.",
      "Good compatibility across the same indoor module series.",
      "Supports coating process for added protection and reliability.",
      "Supports 45 deg tangent angle for creative installation requirements.",
      "Supports 3840Hz standard and up to 7680Hz optional refresh for camera-friendly output.",
    ];
  }

  const map = new Map<string, string>();
  specs.forEach((s) => map.set(s.k.toLowerCase(), s.v));

  const moduleSize = map.get("module size (wxh)") ?? "320x160 mm";
  const env = (map.get("environment") ?? product.category).toLowerCase();
  const ledType = map.get("led type") ?? "SMD LED";
  const refresh = map.get("refresh rate") ?? "high refresh rate";
  const contrast = map.get("contrast ratio") ?? "high contrast";
  const uniformity = map.get("brightness / color uniformity") ?? "stable color uniformity";
  const useCase = map.get("use case") ?? product.bestFor.join(", ");
  const featureHighlights = product.quickFeatures.length
    ? product.quickFeatures.map((f) => f.replace(/\.$/, "")).join(", ")
    : "professional display performance";

  return [
    `Standard Size: ${moduleSize} universal ${env} LED module.`,
    "Lightweight Design: Supports easier installation and reduced structural load with proper cabinet planning.",
    `High-Quality Lamp Beads: Durable ${ledType} LEDs for stable long-hour operation.`,
    `Enhanced Reliability: Optimized power and signal workflow supports ${featureHighlights}.`,
    `Excellent Visual Experience: ${contrast} and ${uniformity} for clear viewing performance.`,
    `Good Compatibility: Suitable for ${useCase}.`,
    "Installation Friendly: Supports practical mapping, calibration, and long-term maintenance workflow.",
    `High Refresh Rate: Supports up to ${refresh} for camera-friendly performance.`,
  ];
}

function toSentence(items: string[]): string {
  return items.map((x) => x.replace(/\.$/, "")).join(", ");
}

function buildDescriptionParagraph(product: ProductItem): string {
  const chunks = [
    `Build quality focuses on ${toSentence(product.buildQuality)}.`,
    `Control workflow includes ${toSentence(product.controlSystem)}.`,
    `Installation notes cover ${toSentence(product.installationNotes)}.`,
    `Support includes ${toSentence(product.supportNotes)}.`,
  ];
  return chunks.join(" ");
}

export default function DisplayProductDetailPage({
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
}: DisplayProductDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"spec" | "description">("spec");
  const pitch = getSpecValue(product, "Pixel Pitch");
  const recommended = product.bestFor.join(", ");
  const completeSpecs = buildCompleteSpecs(product, detailedSpecs);
  const heroFeatures = buildHeroFeatures(product, completeSpecs);
  const descriptionParagraph = cleanText(buildDescriptionParagraph(product));

  return (
    <div className="display-detail-desktop-copy mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: categoryHref, label: categoryLabel },
          {
            href: `${featuredHrefPrefix}${product.slug}/`,
            label: product.title,
            current: true,
          },
        ]}
      />

      <section className="grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-2" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
        <div className="overflow-hidden rounded-xl bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain bg-white p-2"
            loading="lazy"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
          {pitch ? <p className="mt-1 text-sm text-slate-700">Pixel pitch: {cleanText(pitch)}</p> : null}
          {product.cardPrice ? <p className="mt-1 text-sm font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(cleanText(product.cardPrice))}</p> : null}
          <p className="mt-1 text-sm text-slate-700">Recommended: {recommended || "Project dependent"}</p>

          <h2 className="mt-3 pb-0 text-[20px] font-bold leading-tight text-slate-900 after:hidden">Key Features:</h2>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700 marker:text-slate-500">
            {heroFeatures.map((item) => (
              <li key={item}>{cleanText(item)}</li>
            ))}
          </ul>

          <p className="mt-3 text-xs leading-6 text-slate-600">{cleanText(product.subtitle)}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get a Quotation -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="hidden space-y-4">
          <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
            <h3 className="text-base font-bold text-slate-900">Detailed Overview</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{cleanText(overview)}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/contact/"
                className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Get a Quotation -&gt;
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
              >
                WhatsApp
              </a>
              <Link
                href={backHref}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
              >
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
              <li>- Controller configuration and calibration guidance</li>
              <li>- Power planning and installation support</li>
              <li>- After-sales support and spare planning</li>
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
                style={{ borderColor: activeTab === "spec" ? BRAND.maroon : "transparent", color: activeTab === "spec" ? BRAND.maroon : "#334155" }}
              >
                Specification
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className="border-b-2 pb-2"
                style={{ borderColor: activeTab === "description" ? BRAND.maroon : "transparent", color: activeTab === "description" ? BRAND.maroon : "#475569" }}
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
                  {completeSpecs.map((spec) => (
                    <tr key={`${spec.k}-${spec.v}`} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-2 pr-4 font-semibold text-slate-900">{cleanText(spec.k)}</td>
                      <td className="py-2 text-right text-slate-700">{cleanText(spec.v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === "description" ? (
            <p className="text-xs leading-7 text-slate-700">
              {descriptionParagraph}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mt-6">
        <div className="hidden items-center justify-between gap-3 md:flex">
          <div>
            <h2 className="text-base font-bold text-slate-900">Featured Products</h2>
            <p className="text-xs text-slate-600">Related products you may also like.</p>
          </div>
          <Link href={categoryHref} className="text-xs font-bold" style={{ color: BRAND.maroon }}>
            View all products
          </Link>
        </div>

        <div className="mt-4">
          <MobileFeaturedProductsRail
            viewAllHref={categoryHref}
            items={featuredProducts.map((item) => {
              const detailHref = `${featuredHrefPrefix.replace(/\/+$/, "")}/${item.slug}`;
              return {
                id: item.slug,
                href: detailHref,
                title: item.title,
                imageSrc: item.image,
                imageAlt: item.title,
                imageContainerClassName: "bg-white",
                imageClassName:
                  `${item.category}:${item.slug}` === "indoor:p3-076-indoor-led-display"
                    ? "h-full w-full object-cover object-center transition duration-300"
                    : imageFitFixIds.has(`${item.category}:${item.slug}`)
                      ? `${item.category}:${item.slug}` === "indoor:p2-5-indoor-led-display"
                        ? "h-full w-full object-cover object-[58%_center] transition duration-300"
                        : "h-full w-full object-cover object-center transition duration-300"
                      : "h-full w-full object-contain transition duration-300",
              };
            })}
          />
        </div>

        <div className="mt-4 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((item) => {
            const detailHref = `${featuredHrefPrefix.replace(/\/+$/, "")}/${item.slug}`;

            return (
            <article
              key={item.slug}
              role="link"
              tabIndex={0}
              onClick={() => router.push(detailHref)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(detailHref);
                }
              }}
              className="group cursor-pointer overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: "rgba(15,23,42,0.10)" }}
            >
              <Link href={detailHref} className="group block">
                <div className="product-card-image-frame relative aspect-square w-full bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className={
                      `${item.category}:${item.slug}` === "indoor:p3-076-indoor-led-display"
                        ? "h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                        : imageFitFixIds.has(`${item.category}:${item.slug}`)
                        ? `${item.category}:${item.slug}` === "indoor:p2-5-indoor-led-display"
                          ? "h-full w-full object-cover object-[58%_center] transition duration-300 group-hover:scale-[1.03]"
                          : "h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                        : "h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                    }
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                    {item.category === "outdoor" ? "Outdoor" : item.category === "rental" ? "Rental" : "Indoor"}
                  </span>
                  {item.pitchLabel ? (
                    <span className="absolute right-3 top-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow">
                      {item.pitchLabel}
                    </span>
                  ) : null}
                </div>
              </Link>

              <div className="p-5">
                <Link href={detailHref} className="block">
                  <div className="line-clamp-2 text-lg font-semibold text-slate-900">{item.title}</div>
                </Link>
                {item.cardPrice ? <p className="mt-1 text-sm font-semibold text-sky-700">{normalizeDisplayedPriceText(item.cardPrice)}</p> : null}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <Link
                    href="/contact/"
                    onClick={(event) => event.stopPropagation()}
                    className="relative z-20 inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-xs font-extrabold text-white whitespace-nowrap"
                  >
                    Request quotation
                  </Link>
                  <Link
                    href={detailHref}
                    onClick={(event) => event.stopPropagation()}
                    className="text-sm font-bold whitespace-nowrap hover:underline group-hover:underline"
                    style={{ color: BRAND.maroon }}
                  >
                    View details -&gt;
                  </Link>
                </div>
              </div>
            </article>
          )})}
        </div>
      </section>

      <MobilePostFeaturedCta
        title={`Need a complete ${categoryLabel.toLowerCase()} solution?`}
        description={`Share your screen size, installation type, and site details. We will help you plan a relevant ${categoryLabel.toLowerCase()} setup with modules, controller, power, structure, and support.`}
        primaryHref={wa}
        primaryLabel="WhatsApp project details"
        links={[
          { label: "Browse LED Display", href: "/led-display/" },
          { label: "Installation & maintenance", href: "/services-support/" },
          { label: "View projects", href: "/projects/" },
          { label: "Contact", href: "/contact/" },
        ]}
      />
    </div>
  );
}
