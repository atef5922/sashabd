// app/products/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import LedDisplayHero from "@/components/led-display/LedDisplayHero";
import {
  indoorCatalog,
  outdoorCatalog,
  rentalCatalog,
  receivingCardCatalog,
  controllerCatalog,
  powerSupplyCatalog,
  ledAccessoriesCatalog,
  getPitchLabel,
  getCardShort,
  getLedDisplayTablePrice,
} from "@/lib/productsCatalog";
import {
  getInteractiveFlatPanelBrandLabel,
  getInteractiveFlatPanelBullets,
  getInteractiveFlatPanelChips,
  interactiveFlatPanelCatalog,
} from "./control-systems/interactive-flat-panel/catalog";
import { digitalPodiumCatalog } from "./control-systems/digital-podium/catalog";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

type FilterKey =
  | "all"
  | "indoor"
  | "outdoor"
  | "rental"
  | "interactive-flat-panel"
  | "digital-podium"
  | "receiving-card"
  | "controller"
  | "power-supply"
  | "led-accessories";

const LED_DISPLAY_INTERNAL_LINK_KINDS: FilterKey[] = [
  "indoor",
  "outdoor",
  "rental",
  "receiving-card",
  "controller",
  "power-supply",
  "led-accessories",
];

type UnifiedProduct = {
  id: string;
  kind?: "led" | "accessory" | "pa" | "turnstile" | "podium" | "interactive-flat-panel";
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge: string;
  pitch?: string;
  priceLine?: string;
  priceLabel?: string;
  quickFeatures?: readonly string[];
  keySpecs?: ReadonlyArray<{ k: string; v: string }>;
  bestFor?: readonly string[];
  tags?: readonly string[];
  ifpBrand?: (typeof interactiveFlatPanelCatalog)[number]["brand"];
  ifpSize?: (typeof interactiveFlatPanelCatalog)[number]["sizeInch"];
};

type LedSortOption = "recommended" | "price-asc" | "price-desc" | "name-asc";
type LedPriceBand = "under-5k" | "5k-10k" | "10k-20k" | "20k-50k" | "50k-75k" | "request";

const LED_RESULT_LIMITS = [12, 24, 36] as const;
const LED_PRICE_SLIDER_MAX = 75_000;
const LED_PRICE_BANDS: ReadonlyArray<{ id: LedPriceBand; label: string; min?: number; max?: number }> = [
  { id: "under-5k", label: "Under ৳5,000", max: 4_999 },
  { id: "5k-10k", label: "৳5,000–৳9,999", min: 5_000, max: 9_999 },
  { id: "10k-20k", label: "৳10,000–৳19,999", min: 10_000, max: 19_999 },
  { id: "20k-50k", label: "৳20,000–৳49,999", min: 20_000, max: 49_999 },
  { id: "50k-75k", label: "৳50,000–৳74,999", min: 50_000, max: 74_999 },
  { id: "request", label: "Request Price" },
];

function getProductStartingPrice(product: UnifiedProduct): number | null {
  const priceText = product.priceLine ?? product.priceLabel ?? "";
  if (!priceText || /request|contact|call/i.test(priceText)) return null;
  const match = priceText.match(/\d[\d,]*(?:\.\d+)?/);
  if (!match) return null;
  const price = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(price) ? price : null;
}

function matchesLedPriceBand(product: UnifiedProduct, band: LedPriceBand): boolean {
  const price = getProductStartingPrice(product);
  if (band === "request") return price === null;
  if (price === null) return false;
  const range = LED_PRICE_BANDS.find((item) => item.id === band);
  if (!range) return true;
  return (range.min === undefined || price >= range.min) && (range.max === undefined || price <= range.max);
}

function isLedExplorerProduct(product: UnifiedProduct): boolean {
  const kind = product.id.split(":")[0] as FilterKey;
  return LED_DISPLAY_INTERNAL_LINK_KINDS.includes(kind);
}

function LedExplorerProductCard({ product, priority = false }: { product: UnifiedProduct; priority?: boolean }) {
  const isLedDisplay = product.id.startsWith("indoor:") || product.id.startsWith("outdoor:") || product.id.startsWith("rental:");
  const features = (isLedDisplay
    ? getLedCardBullets(product)
    : product.quickFeatures?.length
      ? product.quickFeatures
      : subtitleToBullets(product.subtitle)
  ).slice(0, 3);
  const priceText = normalizeDisplayedPriceText(product.priceLine ?? product.priceLabel ?? "Request Price");
  const isRequestPrice = /request|contact|call/i.test(priceText);
  const productKey = product.id.split(":").slice(1).join(":");
  const quoteHref = `/contact/?project=led-display&product=${encodeURIComponent(productKey)}`;

  const imageClassName = isLedDisplay
    ? product.id === "indoor:p2-5-indoor-led-display"
      ? "object-cover object-[58%_center] transition duration-300 group-hover:scale-[1.025]"
      : "object-cover object-center transition duration-300 group-hover:scale-[1.025]"
    : "object-contain p-5 transition duration-300 group-hover:scale-[1.035]";

  return (
    <article
      data-led-product-card
      data-product-id={product.id}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.045)] transition-[transform,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_7px_20px_rgba(15,23,42,0.09)] focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/10 motion-reduce:transition-none"
    >
      <Link
        prefetch={false}
        href={product.href}
        aria-label={`View ${product.title}`}
        className={`relative block h-[210px] shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 sm:h-[220px] ${isLedDisplay ? "bg-slate-100" : "bg-white"}`}
      >
        <span className="absolute left-3 top-3 z-10 inline-flex rounded-[5px] px-2 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.025em] text-white shadow-sm" style={{ backgroundColor: "#f4510b" }}>
          {product.badge}
        </span>
        {product.pitch ? (
          <span className="absolute right-3 top-3 z-10 inline-flex rounded-[5px] bg-[#071936] px-2 py-1 text-[10px] font-extrabold leading-none text-white shadow-sm">
            {formatPitchDisplay(product.pitch)}
          </span>
        ) : null}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 639px) 92vw, (max-width: 1279px) 50vw, 30vw"
          className={imageClassName}
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-2.5">
        <p className="text-left text-[10px] font-extrabold uppercase leading-4 tracking-[0.08em] text-slate-500">
          {product.badge}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-base font-extrabold leading-5 text-[#071936]">
          <Link
            prefetch={false}
            href={product.href}
            className="rounded-sm underline-offset-4 transition-colors hover:text-orange-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
          >
            {product.title}
          </Link>
        </h3>

        <ul className="mt-3 min-h-[4.25rem] space-y-1.5" aria-label={`Key features of ${product.title}`}>
          {features.map((feature) => (
            <li key={feature} className="flex min-w-0 items-center gap-2 !text-left text-[12px] font-medium leading-4 text-slate-700">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 fill-none text-slate-700">
                <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.4" />
                <path d="m5.3 8.1 1.7 1.7 3.7-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="line-clamp-1 min-w-0" style={{ textAlign: "left", textAlignLast: "left" }} title={feature}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-3">
          <p className="min-w-0 break-words text-left text-lg font-extrabold leading-6 tracking-tight text-[#f05a19] [font-variant-numeric:tabular-nums]">
            {priceText}
          </p>
          <p className="mt-0.5 text-left text-[11px] font-normal leading-4 text-slate-500">
            {isRequestPrice ? "Contact for project pricing" : "Indicative product price"}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              prefetch={false}
              href={product.href}
              aria-label={`View details for ${product.title}`}
              className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-md border border-[#102542] bg-white px-2 py-2 text-center text-xs font-bold text-[#071936] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/35"
            >
              View Details
            </Link>
            <Link
              prefetch={false}
              href={quoteHref}
              aria-label={`Get a quote for ${product.title}`}
              className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-md border border-[#071936] bg-[#071936] px-2 py-2 text-center text-xs font-bold text-white transition-colors hover:border-[#102b52] hover:bg-[#102b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/45 focus-visible:ring-offset-2"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function getLedCardBullets(product: UnifiedProduct): string[] {
  return buildLedProductCardHighlights({
    keySpecs: product.keySpecs,
    pitch: product.pitch,
    quickFeatures: product.quickFeatures,
    bestFor: product.bestFor,
    subtitle: product.subtitle,
    category: product.badge.toLowerCase(),
  });
}

function UiIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const base = `inline-block ${className}`;
  switch (name) {
    case "display":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "guide":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 6a2 2 0 0 1 2-2h11l3 3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 4v4h4M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "compare":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M7 4v14M17 6v14M4 18h6M14 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="7" cy="4" r="2" fill="currentColor" />
          <circle cx="17" cy="6" r="2" fill="currentColor" />
        </svg>
      );
    case "solutions":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "cost":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 9h.01M17 15h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "process":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 12h4l2-6 2 12 2-6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "faq":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="16.8" r="1" fill="currentColor" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="m8.2 12.2 2.4 2.4 5.2-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "module":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 4v16M15 4v16M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "cabinet":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 5v14M16 5v14M4 10h16M4 14h16" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 8h2M15 8h2M7 17h2M15 17h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "receiving":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 10h6M9 14h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 10h2M3 14h2M19 10h2M19 14h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "power":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="m12.5 9-2.5 3h3l-2.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 12H4M20 12h1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "cable":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 8c5 0 7 8 12 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 16c5 0 7-8 12-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="3" y="6.5" width="4" height="3" rx=".8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="17" y="14.5" width="4" height="3" rx=".8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "fiber":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 8h10M7 16h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "structure":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 20V6h14v14M5 10h14M5 15h14M9 6v14M15 6v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "install":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M14 5 6 13l5 5 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m13 6 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "controller":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 10h6M9 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 9v6M21 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6.5 10a5.5 5.5 0 1 1 11 0v4.5a1.5 1.5 0 0 1-1.5 1.5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="4" y="10.5" width="3.5" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="16.5" y="10.5" width="3.5" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="m14.5 6.5 3 3-7.5 7.5H7v-3l7.5-7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m13 8 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="7" width="11" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 10h3l2 2v4h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="17" r="1.7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="17" r="1.7" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "custom":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    default:
      return null;
  }
}

function buildProducts(basePath: "/led-display"): UnifiedProduct[] {
  const indoor: UnifiedProduct[] = indoorCatalog.map((p) => ({
    id: `indoor:${p.slug}`,
    title: p.title,
    subtitle: getCardShort(p),
    image: p.image,
    href: `${basePath}/indoor-led/${p.slug}/`,
    badge: "Indoor",
    pitch: getPitchLabel(p),
    priceLine: p.cardPrice,
    keySpecs: p.keySpecs,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  const outdoor: UnifiedProduct[] = outdoorCatalog.map((p) => ({
    id: `outdoor:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/outdoor/${p.slug}/`,
    badge: "Outdoor",
    pitch: getPitchLabel(p),
    priceLine: p.cardPrice,
    keySpecs: p.keySpecs,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  {
    const p10Id = "outdoor:p10-outdoor-led-display-module";
    const p8Id = "outdoor:p8-outdoor-led-display-module";
    const p10Index = outdoor.findIndex((p) => p.id === p10Id);
    const p8Index = outdoor.findIndex((p) => p.id === p8Id);

    if (p10Index !== -1 && p8Index !== -1 && p10Index !== p8Index + 1) {
      const [p10] = outdoor.splice(p10Index, 1);
      const updatedP8Index = outdoor.findIndex((p) => p.id === p8Id);
      outdoor.splice(updatedP8Index + 1, 0, p10);
    }
  }

  let featuredOutdoor: UnifiedProduct | undefined;
  {
    const featuredId = "outdoor:p5-outdoor-led-display";
    const featuredIndex = outdoor.findIndex((p) => p.id === featuredId);

    if (featuredIndex !== -1) {
      [featuredOutdoor] = outdoor.splice(featuredIndex, 1);
    }
  }

  const featuredIndoorIds = ["indoor:p1-86-indoor-led-display", "indoor:p2-indoor-led-display"];
  const featuredIndoor: UnifiedProduct[] = [];
  for (const featuredId of featuredIndoorIds) {
    const featuredIndex = indoor.findIndex((p) => p.id === featuredId);
    if (featuredIndex !== -1) {
      const [item] = indoor.splice(featuredIndex, 1);
      featuredIndoor.push(item);
    }
  }

  const rental: UnifiedProduct[] = rentalCatalog.map((p) => ({
    id: `rental:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/rental-display/${p.slug}/`,
    badge: "Rental",
    pitch: getPitchLabel(p),
    priceLine: p.cardPrice,
    keySpecs: p.keySpecs,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  let premiumOutdoorNearRental: UnifiedProduct | undefined;
  {
    const premiumId = "outdoor:premium-quality-outdoor-led-display";
    const premiumIndex = outdoor.findIndex((p) => p.id === premiumId);
    if (premiumIndex !== -1) {
      [premiumOutdoorNearRental] = outdoor.splice(premiumIndex, 1);
    }
  }

  const interactiveFlat: UnifiedProduct[] = interactiveFlatPanelCatalog.map((p) => ({
    id: `interactive-flat-panel:${p.slug}`,
    kind: "interactive-flat-panel",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `/interactive-flat-panel/${p.slug}/`,
    badge: "Interactive Panel",
    priceLabel: p.priceLabel,
    quickFeatures: getInteractiveFlatPanelBullets(p),
    bestFor: getInteractiveFlatPanelChips(p),
    tags: p.tags,
    ifpBrand: p.brand,
    ifpSize: p.sizeInch,
  }));

  const podium: UnifiedProduct[] = digitalPodiumCatalog.map((p) => ({
    id: `digital-podium:${p.slug}`,
    kind: "podium",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `/digital-podium/${p.slug}/`,
    badge: "Digital Podium",
    priceLabel: p.priceLabel,
    quickFeatures: p.cardHighlights ?? [],
    bestFor: p.recommendedFor?.length ? p.recommendedFor : p.tags,
    tags: p.tags,
  }));

  const receiving: UnifiedProduct[] = receivingCardCatalog.map((p) => ({
    id: `receiving-card:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/receiving-card/${p.slug}/`,
    badge: "Receiving Card",
    priceLine: p.cardPrice,
    quickFeatures: p.quickFeatures,
  }));

  const controllers: UnifiedProduct[] = controllerCatalog.map((p) => ({
    id: `controller:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/controller/${p.slug}/`,
    badge: "Controller",
    priceLine: p.cardPrice,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  const psu: UnifiedProduct[] = powerSupplyCatalog.map((p) => ({
    id: `power-supply:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/power-supply/${p.slug}/`,
    badge: "Power Supply",
    priceLine: p.cardPrice,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  const ledAccessories: UnifiedProduct[] = ledAccessoriesCatalog.map((p) => ({
    id: `led-accessories:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/led-accessories/${p.slug}/`,
    badge: "LED Accessories",
    priceLine: p.cardPrice,
    quickFeatures: p.quickFeatures,
    tags: p.tags,
  }));

  const combined = [
    ...(featuredOutdoor ? [featuredOutdoor] : []),
    ...featuredIndoor,
    ...indoor,
    ...outdoor,
    ...rental,
    ...interactiveFlat,
    ...podium,
    ...receiving,
    ...controllers,
    ...psu,
    ...ledAccessories,
  ];

  if (premiumOutdoorNearRental) {
    const rentalAnchorIndex = combined.findIndex((p) => p.id === "rental:p3-91-rental-led-display");
    if (rentalAnchorIndex !== -1) {
      combined.splice(rentalAnchorIndex + 1, 0, premiumOutdoorNearRental);
    } else {
      combined.push(premiumOutdoorNearRental);
    }
  }

  return combined;
}

function formatPitchDisplay(pitch?: string): string {
  if (!pitch) return "";
  const m = pitch.match(/(\d+(?:\.\d+)?)/);
  return m?.[1] ? `${m[1]} mm` : pitch;
}

function subtitleToBullets(subtitle: string): string[] {
  const normalized = subtitle.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const primary = normalized
    .split(/[\u2022|\u2013\u2014.;]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 4);

  if (primary.length >= 2) return primary.slice(0, 4);

  const secondary = normalized
    .split(/[,/|]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 4);

  return (secondary.length ? secondary : [normalized]).slice(0, 4);
}

function getAccessoryKind(product: UnifiedProduct): "receiving-card" | "controller" | "power-supply" | "led-accessories" | null {
  if (product.id.startsWith("receiving-card:")) return "receiving-card";
  if (product.id.startsWith("controller:")) return "controller";
  if (product.id.startsWith("power-supply:")) return "power-supply";
  if (product.id.startsWith("led-accessories:")) return "led-accessories";
  return null;
}

function isAccessoryProduct(product: UnifiedProduct): boolean {
  return (
    product.id.startsWith("receiving-card:") ||
    product.id.startsWith("controller:") ||
    product.id.startsWith("power-supply:") ||
    product.id.startsWith("led-accessories:")
  );
}

function getPaginationItems(current: number, total: number): Array<number | "..."> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | "..."> = [];
  const push = (x: number | "...") => items.push(x);
  push(1);

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) push("...");
  for (let p = left; p <= right; p += 1) push(p);
  if (right < total - 1) push("...");
  push(total);
  return items;
}

function ProductsPageContent({
  ledOnly = false,
  basePath,
}: {
  ledOnly?: boolean;
  basePath: "/led-display";
}) {
  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const scrollToGridOnNextPageChangeRef = useRef<ScrollBehavior | null>(null);
  const componentCarouselRef = useRef<HTMLDivElement | null>(null);
  const componentSectionRef = useRef<HTMLDivElement | null>(null);
  const whyChooseCarouselRef = useRef<HTMLDivElement | null>(null);
  const whyChooseSectionRef = useRef<HTMLDivElement | null>(null);
  const allProducts = useMemo(() => buildProducts(basePath), [basePath]);
  const fullListGroups = useMemo(() => {
    const kinds = LED_DISPLAY_INTERNAL_LINK_KINDS;
    const labels: Record<string, string> = {
      indoor: "Indoor LED Display",
      outdoor: "Outdoor LED Display",
      rental: "Rental LED Display",
      "interactive-flat-panel": "Interactive Panel",
      "digital-podium": "Digital Podium",
      "receiving-card": "Receiving Card",
      controller: "Controller",
      "power-supply": "Power Supply",
      "led-accessories": "LED Accessories",
    };

    return kinds
      .map((kind) => {
        const items = allProducts
          .filter((p) => p.id.startsWith(`${kind}:`))
          .map((p) => ({ title: p.title, href: p.href }));
        return { kind, label: labels[kind] ?? kind, items };
      })
      .filter((g) => g.items.length > 0);
  }, [allProducts]);
  const ledFullListLinks = useMemo(
    () => fullListGroups.flatMap((group) => group.items.map((item) => ({ ...item, groupLabel: group.label }))),
    [fullListGroups]
  );
  const waPhone = siteConfig.whatsapp.replace(/\D/g, "");
  const wa = `https://api.whatsapp.com/send/?phone=${waPhone}&text&type=phone_number&app_absent=0`;
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [ledSort, setLedSort] = useState<LedSortOption>("recommended");
  const [ledPageSize, setLedPageSize] = useState<(typeof LED_RESULT_LIMITS)[number]>(12);
  const [ledPriceBands, setLedPriceBands] = useState<LedPriceBand[]>([]);
  const [ledMinPrice, setLedMinPrice] = useState<number | null>(null);
  const [ledMaxPrice, setLedMaxPrice] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openLedFilterGroups, setOpenLedFilterGroups] = useState<Array<"category" | "price">>(["category", "price"]);
  const [activeComponentSlide, setActiveComponentSlide] = useState(0);
  const [activeWhyChooseSlide, setActiveWhyChooseSlide] = useState(0);
  const desktopPageSize = ledOnly ? ledPageSize : 20;
  const productImageSizes = "(max-width: 1024px) 100vw, 25vw";
  const componentMobileCardStyles = [
    "border-sky-200/70 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_48%,#dbeafe_100%)] shadow-[0_14px_34px_rgba(59,130,246,0.10)]",
    "border-emerald-200/70 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_48%,#d1fae5_100%)] shadow-[0_14px_34px_rgba(16,185,129,0.10)]",
    "border-orange-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_48%,#ffedd5_100%)] shadow-[0_14px_34px_rgba(249,115,22,0.11)]",
    "border-violet-200/70 bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_48%,#ede9fe_100%)] shadow-[0_14px_34px_rgba(139,92,246,0.10)]",
    "border-cyan-200/70 bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_48%,#cffafe_100%)] shadow-[0_14px_34px_rgba(6,182,212,0.10)]",
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchingProducts = allProducts.filter((p) => {
      const kind = p.id.split(":")[0] as FilterKey;

      const passFilter = ledOnly
        ? filter === "all"
          ? isLedExplorerProduct(p)
          : kind === filter
        : filter === "all"
          ? true
          : kind === filter;
      if (!passFilter) return false;

      if (ledOnly && ledPriceBands.length && !ledPriceBands.some((band) => matchesLedPriceBand(p, band))) {
        return false;
      }

      if (ledOnly && (ledMinPrice !== null || ledMaxPrice !== null)) {
        const productPrice = getProductStartingPrice(p);
        if (productPrice === null) return false;
        if (ledMinPrice !== null && productPrice < ledMinPrice) return false;
        if (ledMaxPrice !== null && productPrice > ledMaxPrice) return false;
      }

      if (!q) return true;

      const blob = `${p.title} ${p.subtitle} ${p.badge} ${p.pitch ?? ""}`.toLowerCase();
      return blob.includes(q);
    });

    if (!ledOnly || ledSort === "recommended") return matchingProducts;

    return [...matchingProducts].sort((a, b) => {
      if (ledSort === "name-asc") return a.title.localeCompare(b.title);
      const priceA = getProductStartingPrice(a);
      const priceB = getProductStartingPrice(b);
      if (priceA === null && priceB === null) return a.title.localeCompare(b.title);
      if (priceA === null) return 1;
      if (priceB === null) return -1;
      return ledSort === "price-asc" ? priceA - priceB : priceB - priceA;
    });
  }, [allProducts, filter, query, ledOnly, ledMaxPrice, ledMinPrice, ledPriceBands, ledSort]);

  const filters: Array<{ key: FilterKey; label: string }> = ledOnly
    ? [
        { key: "all", label: "All Products" },
        { key: "indoor", label: "Indoor LED Display" },
        { key: "outdoor", label: "Outdoor LED Display" },
        { key: "rental", label: "Rental LED Display" },
        { key: "receiving-card", label: "Receiving Card" },
        { key: "controller", label: "Controller" },
        { key: "power-supply", label: "Power Supply" },
        { key: "led-accessories", label: "LED Accessories" },
      ]
    : [
        { key: "all", label: "All" },
        { key: "indoor", label: "Indoor LED" },
        { key: "outdoor", label: "Outdoor LED" },
        { key: "rental", label: "Rental LED" },
        { key: "interactive-flat-panel", label: "Interactive Panel" },
        { key: "digital-podium", label: "Digital Podium" },
        { key: "receiving-card", label: "Receiving Card" },
        { key: "controller", label: "Controller" },
        { key: "power-supply", label: "Power Supply" },
        { key: "led-accessories", label: "LED Accessories" },
      ];

  const ledCatalogProducts = useMemo(() => allProducts.filter(isLedExplorerProduct), [allProducts]);
  const ledCustomPriceActive = ledMinPrice !== null || ledMaxPrice !== null;
  const ledCustomPriceInvalid = ledMinPrice !== null && ledMaxPrice !== null && ledMinPrice > ledMaxPrice;
  const ledSliderMinValue = Math.min(ledMinPrice ?? 0, LED_PRICE_SLIDER_MAX);
  const ledSliderMaxValue = Math.max(ledSliderMinValue, Math.min(ledMaxPrice ?? LED_PRICE_SLIDER_MAX, LED_PRICE_SLIDER_MAX));
  const ledSliderMinPercent = (ledSliderMinValue / LED_PRICE_SLIDER_MAX) * 100;
  const ledSliderMaxPercent = (ledSliderMaxValue / LED_PRICE_SLIDER_MAX) * 100;
  const ledActiveFilterCount = (filter === "all" ? 0 : 1) + ledPriceBands.length + (ledCustomPriceActive ? 1 : 0);
  const categoryCount = (category: FilterKey) => category === "all"
    ? ledCatalogProducts.length
    : ledCatalogProducts.filter((product) => product.id.startsWith(`${category}:`)).length;
  const priceBandCount = (band: LedPriceBand) => ledCatalogProducts.filter((product) => {
    const matchesCategory = filter === "all" || product.id.startsWith(`${filter}:`);
    return matchesCategory && matchesLedPriceBand(product, band);
  }).length;
  const resetResultsToFirstPage = () => {
    scrollToGridOnNextPageChangeRef.current = "auto";
    setPage(1);
  };
  const changeLedCustomPrice = (field: "min" | "max", rawValue: string) => {
    const parsed = rawValue === "" ? null : Number(rawValue);
    const value = parsed !== null && Number.isSafeInteger(parsed) && parsed >= 0 && parsed <= LED_PRICE_SLIDER_MAX
      ? parsed
      : null;
    if (field === "min") setLedMinPrice(value);
    else setLedMaxPrice(value);
    if (value !== null) setLedPriceBands((bands) => bands.filter((band) => band !== "request"));
    resetResultsToFirstPage();
  };
  const clearLedFilters = () => {
    setFilter("all");
    setLedPriceBands([]);
    setLedMinPrice(null);
    setLedMaxPrice(null);
    setQuery("");
    resetResultsToFirstPage();
  };

  const ledDisplayComponentCards = [
    {
      icon: "module",
      name: "LED Module",
      description:
        "The LED module is the primary display unit that produces images, videos, and text using thousands of RGB LEDs.",
    },
    {
      icon: "cabinet",
      name: "LED Cabinet",
      description:
        "The LED cabinet securely holds LED modules together while providing structural support, protection, cooling, and easy maintenance.",
    },
    {
      icon: "receiving",
      name: "Receiving Card",
      description:
        "The receiving card receives video data from the controller and accurately distributes signals to every LED module.",
    },
    {
      icon: "controller",
      name: "Sending Card / LED Controller",
      description:
        "The LED controller processes video signals and synchronizes content across the entire LED display system.",
    },
    {
      icon: "power",
      name: "Switching Power Supply (SMPS)",
      description:
        "The SMPS converts AC power into stable DC power required to operate LED modules safely and efficiently.",
    },
    {
      icon: "cable",
      name: "Flat Ribbon (FRC) Cable",
      description:
        "FRC cables transfer display data from the receiving card to individual LED modules for seamless image output.",
    },
    {
      icon: "power",
      name: "Power Cable",
      description:
        "Power cables deliver electrical power from the SMPS to LED modules and other internal components.",
    },
    {
      icon: "fiber",
      name: "CAT6 / Fiber Cable",
      description:
        "CAT6 or fiber optic cables transmit high-speed data between the sending card and receiving cards with stable signal quality.",
    },
    {
      icon: "structure",
      name: "Steel Structure / Mounting Frame",
      description:
        "The steel structure provides a strong and secure framework for installing indoor and outdoor LED displays safely.",
    },
  ];

  const ledDisplaySignalFlow = [
    "Computer / Media Player",
    "Video Processor / Scaler",
    "Sending Card / LED Controller",
    "CAT6 / Fiber Cable",
    "Receiving Card",
    "FRC Ribbon Cable",
    "LED Module",
    "Complete LED Display",
  ];

  const ledDisplayPowerFlow = ["220V AC", "Switching Power Supply (SMPS)", "LED Module"];

  const ledFaqs = [
    {
      q: "How does Led display work?",
      a: "An LED display works by controlling thousands of tiny light-emitting diodes in grouped pixels. The controller and receiving cards process your video or image signal, then drive each pixel's red, green, and blue output to create clear text, graphics, and motion content in real time.",
    },
    {
      q: "Which LED display is better for close viewing?",
      a: "For close viewing, indoor models with finer pixel pitch are usually better. The best option depends on distance, screen size, and content quality requirements.",
    },
    {
      q: "What should I check before buying an outdoor LED display?",
      a: "Check brightness level, cabinet protection, control system quality, and installation standards to ensure stable outdoor performance.",
    },
    {
      q: "Can LED display size and pixel pitch be customized?",
      a: "Yes. Screen size and pixel pitch are typically customized according to viewing distance, location, and content goals.",
    },
    {
      q: "How do I choose the right pixel pitch for my location?",
      a: "Pixel pitch should be selected based on viewing distance, content type, and expected clarity. Closer viewing typically requires finer pitch, while long-distance visibility allows larger pitch.",
    },
    {
      q: "Can LED display systems run content remotely?",
      a: "Yes. Most modern controllers support remote content management, allowing you to update videos, text, and campaign media from a connected system.",
    },
    {
      q: "Do you support both permanent and rental LED projects?",
      a: "Yes. Solutions are available for fixed installations as well as temporary rental requirements for events, stage productions, and campaigns.",
    },
    {
      q: "What information do you need for an LED display quotation?",
      a: "Screen size (W x H), viewing distance, indoor/outdoor environment, content source (HDMI/live or scheduled), installation method, and power/earthing condition are key inputs for a BOQ-ready quotation.",
    },
    {
      q: "Which brands do you use for LED modules and components?",
      a: "We propose brands based on availability, project budget, and compatibility with the selected control system. Final brand selection depends on performance target and after-sales support planning.",
    },
    {
      q: "Do you provide BOQ-ready documentation for LED display projects?",
      a: "Yes. We can support BOQ-ready quotation, recommended component list (modules, controller, power, accessories), and installation planning notes based on your site, screen size, and operating requirement.",
    },
  ];

  const ledTrustedCards = [
    "Procurement-ready documentation",
    "Engineering-first installation",
    "Safety & compliance focus",
    "Fast support & maintenance",
  ];

  const landingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ledFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const ledTrustedInstitutions: Array<{ name: string; logo: string; href: string }> = [
    { name: "Ministry of Health and Family Welfare", logo: "/images/logo/Health-and-family-welfare.webp", href: "https://mohfw.gov.bd/" },
    { name: "National Board of Revenue, Bangladesh", logo: "/images/logo/nbr.webp", href: "https://nbr.portal.gov.bd/" },
    { name: "Bangladesh Election Commission", logo: "/images/logo/ecs.webp", href: "https://ecs.gov.bd/" },
    { name: "Department of Immigration & Passports", logo: "/images/logo/passport.webp", href: "https://dip.gov.bd/" },
    { name: "Bangladesh Public Service Commission", logo: "/images/logo/bpsc.webp", href: "https://bpsc.gov.bd/" },
    { name: "Anti-Corruption Commission (ACC)", logo: "/images/logo/acc.webp", href: "https://acc.org.bd/" },
    { name: "Dhaka North City Corporation", logo: "/images/logo/dncc.webp", href: "https://dncc.gov.bd/" },
    { name: "Dhaka South City Corporation", logo: "/images/logo/dscc.webp", href: "https://dscc.gov.bd/" },
    { name: "Sonali Bank PLC", logo: "/images/logo/sonali-bank.webp", href: "https://www.sonalibank.com.bd/" },
    { name: "Bangladesh Small and Cottage Industries Corporation (BSCIC)", logo: "/images/logo/BSCIC.webp", href: "https://bscic.gov.bd/" },
    { name: "Fire Service and Civil Defence Bangladesh", logo: "/images/logo/fire-service.webp", href: "https://fireservice.gov.bd/" },
    { name: "University Grants Commission of Bangladesh", logo: "/images/logo/ugc.webp", href: "https://ugc.gov.bd/" },
    { name: "Bangladesh Ansar and Village Defence Party", logo: "/images/logo/ansar.webp", href: "https://ansarvdp.gov.bd/" },
    { name: "Bangladesh House Building Finance Corporation", logo: "/images/logo/bhbfc-logo-final.webp", href: "https://bhbfc.gov.bd/" },
    { name: "Dhaka Electric Supply Company Limited (DESCO)", logo: "/images/logo/bpatc.webp", href: "https://bpatc.gov.bd/" },
  ];
  const trustedTechPartnerLogos: Array<{ name: string; src: string; href?: string }> = [
    { name: "Absen", src: "/images/logo/absen.webp", href: "https://www.absen.com/" },
    { name: "Unilumin", src: "/images/logo/unilumin.webp", href: "https://www.unilumin.com/" },
    { name: "Leyard", src: "/images/logo/leyard.webp", href: "https://www.leyardhk.com/" },
    { name: "LianTronics", src: "/images/logo/liantronics.png", href: "https://www.liantronics.com/" },
    { name: "AOTO Electronics", src: "/images/logo/aoto-electronics.webp", href: "https://en.aoto.com/" },
    { name: "G-Energy", src: "/images/logo/g-energy.webp" },
    { name: "Lampro", src: "/images/logo/lampro.webp", href: "https://www.lampro.net/" },
    { name: "NovaStar", src: "/images/logo/novastar.webp", href: "https://www.novastar.tech/" },
    { name: "Huidu", src: "/images/brands/huidu.webp", href: "https://www.huidu.cn/" },
    { name: "Colorlight", src: "/images/logo/colorlight.webp", href: "https://en.colorlightinside.com/" },
    { name: "Mean Well", src: "/images/logo/mean-well.webp", href: "https://www.meanwell.com/" },
    { name: "Mugnee Multiple Limited", src: "/images/logo/mugnee.webp", href: "https://www.mugnee.com/" },
    { name: "Renex Digital", src: "/images/brands/renex-exact.webp", href: "https://renex.com.bd/" },
  ];
  const visibleTrustedTechPartnerLogos = trustedTechPartnerLogos.filter(
    (brand) => !["Absen", "Unilumin", "Leyard"].includes(brand.name)
  );

  const ledEndToEndBullets = [
    "Indoor video walls for offices, malls, studios",
    "Outdoor screens for advertising and public visibility",
    "Rental displays for events and stage programs",
    "Site survey, installation, calibration & training",
    "Project delivery across major cities in Bangladesh",
  ];

  const ledReliabilityCards = [
    {
      t: "Technical Planning",
      d: "Display size, pitch, brightness and structure matched to real usage conditions.",
      icon: "guide",
    },
    {
      t: "Clean Installation",
      d: "Proper mounting, cable routing and commissioning for stable daily operation.",
      icon: "process",
    },
    {
      t: "Accurate Configuration",
      d: "Controller setup and calibration ensure smooth playback and color consistency.",
      icon: "compare",
    },
    {
      t: "Clear Cost Breakdown",
      d: "Itemized quotations with transparent scope and warranty terms.",
      icon: "cost",
    },
    {
      t: "After-Sales Support",
      d: "Guidance, troubleshooting and spare support for long-term reliability.",
      icon: "faq",
    },
    {
      t: "Responsive Service",
      d: "Timely support for installation and maintenance across key locations.",
      icon: "check",
    },
  ];

  const ledCompare = [
    {
      t: "LED Display",
      d: "Best for indoor LED display, outdoor LED screen, digital signage, and large seamless video wall projects with high brightness and long-term performance.",
      points: ["Seamless display with no bezel lines", "High brightness and strong contrast for clear visibility", "Scales well for showroom, office, event, and billboard sizes", "Suitable for long daily operation and 24/7 usage"],
    },
    {
      t: "Projector",
      d: "A lower-cost option for presentations and temporary large visuals, but it works best in controlled lighting and needs regular maintenance.",
      points: ["Best suited for dark meeting rooms or classrooms", "Lower brightness than LED display solutions", "Lamp or laser maintenance adds recurring cost", "Less effective in bright commercial spaces"],
    },
    {
      t: "LCD Video Wall",
      d: "Useful for indoor control rooms and dashboard walls where fine detail matters, though panel bezel lines remain visible.",
      points: ["Visible bezels between connected panels", "Sharp detail for small-to-medium indoor display walls", "Common in control room and monitoring dashboard setups", "Large seamless scaling is limited by bezel gaps"],
    },
  ];

  const sashaWhyChooseCards = [
    {
      icon: "module",
      title: "Premium LED Modules & Components",
      text:
        "We supply LED modules, receiving cards, controllers, power supplies, cabinets, and accessories for indoor and outdoor LED display projects.",
    },
    {
      icon: "install",
      title: "Professional Installation Support",
      text:
        "We provide LED display installation, steel structure work, wiring, mounting, testing, and commissioning services.",
    },
    {
      icon: "controller",
      title: "Controller & CMS Configuration",
      text:
        "We configure Huidu, NovaStar, and Colorlight controllers with CMS setup, screen calibration, and content management.",
    },
    {
      icon: "support",
      title: "After-Sales Technical Support",
      text:
        "We provide troubleshooting, remote assistance, spare parts support, and technical service after project handover.",
    },
    {
      icon: "maintenance",
      title: "Maintenance & Servicing",
      text:
        "We provide LED display maintenance, calibration, module replacement, power supply inspection, and preventive servicing.",
    },
    {
      icon: "display",
      title: "Indoor & Outdoor Project Expertise",
      text:
        "We deliver indoor LED displays, outdoor LED billboards, LED video walls, and rental LED screen solutions.",
    },
    {
      icon: "delivery",
      title: "Nationwide Project Delivery",
      text:
        "We provide LED display supply, installation, and technical support services across Bangladesh.",
    },
    {
      icon: "custom",
      title: "Customized LED Display Solutions",
      text:
        "We provide customized LED display solutions based on screen size, pixel pitch, brightness, controller system, and installation requirements.",
    },
  ];

  const outdoorSignageBenefits = [
    {
      t: "Daylight Visibility That Stays Clear",
      d: "High-brightness LED signage keeps ads readable in direct sunlight and busy roadside conditions where print often loses impact.",
      points: ["Suitable for highway, rooftop, and commercial facade placement", "Supports wide viewing angles for moving audiences"],
    },
    {
      t: "Real-Time Campaign Control",
      d: "You can update offers, pricing, and announcements instantly without reprinting banners, reducing campaign delay and operational friction.",
      points: ["Schedule content by time slot, event, or location", "Run multiple creatives for different audience windows"],
    },
    {
      t: "Stronger Return on Advertising Spend",
      d: "A single digital screen can run repeated and rotating campaigns for months, improving utilization compared to one-time static printing.",
      points: ["Lower recurring print and replacement dependency", "Higher message frequency improves recall and response"],
    },
    {
      t: "Scalable for Different Business Sizes",
      d: "From storefront branding to large-format billboards, modular LED systems can be sized and expanded based on site goals and budget.",
      points: ["Flexible cabinet layout for custom dimensions", "Easier long-term expansion with compatible modules"],
    },
  ];

  const pitchValueFromTitle = (title: string): number => {
    const m = title.match(/p\s*([0-9]+(?:\.[0-9]+)?)/i);
    const v = m ? Number(m[1]) : Number.POSITIVE_INFINITY;
    return Number.isFinite(v) ? v : Number.POSITIVE_INFINITY;
  };

  const pitchLabelFromTitle = (title: string): string => {
    const m = title.match(/p\s*([0-9]+(?:\.[0-9]+)?)/i);
    if (!m?.[1]) return "-";
    const raw = m[1];
    const normalized = raw.includes(".") ? raw : `${raw}.0`;
    return `${normalized} mm`;
  };

  const pitchLabelForOutdoorPriceRow = (product: (typeof outdoorCatalog)[number]): string => {
    const fromTitle = pitchLabelFromTitle(product.title);
    if (fromTitle !== "-") return fromTitle;

    const specPitch = product.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"))?.v ?? "";
    const match = specPitch.match(/p\s*([0-9]+(?:\.[0-9]+)?)/i) ?? specPitch.match(/(\d+(?:\.\d+)?)\s*mm/i);
    if (match?.[1]) return `${match[1]} mm`;

    return product.pitchLabel || "Outdoor";
  };

  const hiddenOutdoorPriceSlugs = new Set<string>([
    "p3-076-outdoor-led-display-module",
    "p8-outdoor-led-display-module",
    "p10-outdoor-led-display-module",
  ]);

  const outdoorPriceRows = [...outdoorCatalog]
    .filter((p) => !hiddenOutdoorPriceSlugs.has(p.slug))
    .sort((a, b) => pitchValueFromTitle(a.title) - pitchValueFromTitle(b.title))
    .map((p) => ({
      title: p.title,
      pitch: pitchLabelForOutdoorPriceRow(p),
      href: `${basePath}/outdoor/${p.slug}/`,
      price: getLedDisplayTablePrice(p.slug) ?? "Request updated quote",
    }));

  const hiddenIndoorPriceSlugs = new Set<string>(["p1-667-indoor-led-display"]);

  const indoorPriceRows = [...indoorCatalog]
    .filter((p) => !hiddenIndoorPriceSlugs.has(p.slug))
    .sort((a, b) => pitchValueFromTitle(b.title) - pitchValueFromTitle(a.title))
    .map((p) => ({
      title: p.title,
      pitch: pitchLabelFromTitle(p.title),
      href: `${basePath}/indoor-led/${p.slug}/`,
      price: getLedDisplayTablePrice(p.slug) ?? "Request updated quote",
    }));

  const renderCatalogCard = (p: UnifiedProduct) => {
    if (p.kind === "interactive-flat-panel" || p.kind === "podium") {
      const bullets =
        p.quickFeatures?.length
          ? p.quickFeatures.slice(0, 4)
          : p.tags?.length
            ? p.tags.slice(0, 4)
            : subtitleToBullets(p.subtitle);

      const chips = p.bestFor?.length ? p.bestFor.slice(0, 3) : (p.tags ?? []).slice(0, 3);

      const topRightBadge =
        p.kind === "podium"
          ? { text: "Control", tone: "dark" as const }
          : p.kind === "interactive-flat-panel" && p.ifpBrand && p.ifpSize
            ? { text: `${getInteractiveFlatPanelBrandLabel(p.ifpBrand)} - ${p.ifpSize}"`, tone: "dark" as const }
            : undefined;

      const metaLines: Array<{ text: string; className?: string }> = [];
      if (p.kind === "interactive-flat-panel") {
        if (p.priceLabel) {
          metaLines.push({ text: p.priceLabel, className: "mt-1 text-sm font-semibold text-sky-700" });
        }
        metaLines.push({ text: p.subtitle, className: "mt-2 text-sm leading-7 text-slate-600 line-clamp-3" });
      } else if (p.kind === "podium" && p.priceLabel) {
        metaLines.push({ text: `Price: ${p.priceLabel}`, className: "mt-1 text-sm font-semibold text-sky-700" });
      }

      return (
        <ProductGridCard
          key={p.id}
          href={p.href}
          title={p.title}
          image={<Image src={p.image} alt={p.title} fill sizes={productImageSizes} className="object-cover transition duration-300 group-hover:scale-[1.02]" />}
          imageContainerClassName="bg-slate-50"
          borderColor="rgba(15,23,42,0.08)"
          topLeftBadge={{ text: p.badge, tone: "light" }}
          topRightBadge={topRightBadge}
          metaLines={metaLines}
          bullets={bullets}
          chips={chips}
          accentColor={BRAND.maroon}
          contactHref="/contact"
          compactMobile
          viewDetailsLabel="View details ->"
        />
      );
    }

    if (isAccessoryProduct(p)) {
      const kind = getAccessoryKind(p);
      const rightBadge = kind === "controller" ? "Controller" : "Accessories";

      const bullets =
        p.quickFeatures?.length
          ? p.quickFeatures.slice(0, 4)
          : kind === "led-accessories" && p.tags?.length
            ? p.tags.slice(0, 4)
            : subtitleToBullets(p.subtitle);

      const chips = p.bestFor?.length ? p.bestFor.slice(0, 3) : (p.tags ?? []).slice(0, 3);

      const metaLines: Array<{ text: string; className?: string }> = [];
      if (p.priceLine) metaLines.push({ text: p.priceLine, className: "mt-1 text-sm font-semibold text-sky-700" });

      return (
        <ProductGridCard
          key={p.id}
          href={p.href}
          title={p.title}
          image={
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes={productImageSizes}
              className="object-cover object-center transition duration-300 group-hover:scale-[1.03]"
            />
          }
          imageContainerClassName="bg-slate-100"
          borderColor={`${BRAND.maroon}12`}
          topLeftBadge={{ text: p.badge, tone: "light" }}
          topRightBadge={{ text: rightBadge, tone: "dark" }}
          metaLines={metaLines}
          bullets={bullets}
          chips={chips}
          accentColor={BRAND.maroon}
          contactHref="/contact"
          compactMobile
          viewDetailsLabel="View details ->"
        />
      );
    }

    const ledImageClassName =
      p.id === "indoor:p2-5-indoor-led-display"
        ? "object-cover object-[58%_center] transition duration-300 group-hover:scale-[1.03]"
        : p.id === "outdoor:premium-quality-outdoor-led-display"
          ? "object-cover object-[50%_42%] transition duration-300 group-hover:scale-[1.03]"
          : "object-cover object-center transition duration-300 group-hover:scale-[1.03]";

    const bullets = getLedCardBullets(p);
    const chips = p.bestFor?.length ? p.bestFor.slice(0, 3) : [];

    const metaLines: Array<{ text: string; className?: string }> = [];
    if (p.priceLine) metaLines.push({ text: p.priceLine, className: "mt-1 text-sm font-semibold text-sky-700" });

    return (
      <ProductGridCard
        key={p.id}
        href={p.href}
        title={p.title}
        image={<Image src={p.image} alt={p.title} fill sizes={productImageSizes} className={ledImageClassName} />}
        imageContainerClassName="bg-slate-50"
        borderColor={`${BRAND.maroon}12`}
        topLeftBadge={undefined}
        topRightBadge={undefined}
        metaLines={metaLines}
        bullets={bullets}
        chips={chips}
        accentColor={BRAND.maroon}
        contactHref="/contact"
        compactMobile
        viewDetailsLabel="View details ->"
      />
    );
  };

  const shouldPaginate = ledOnly;
  const desktopTotalPages = shouldPaginate ? Math.max(1, Math.ceil(filtered.length / desktopPageSize)) : 1;
  const desktopCurrentPage = shouldPaginate ? Math.min(Math.max(1, page), desktopTotalPages) : 1;
  const desktopStartIndex = shouldPaginate ? (desktopCurrentPage - 1) * desktopPageSize : 0;
  const desktopEndIndex = shouldPaginate ? Math.min(desktopStartIndex + desktopPageSize, filtered.length) : filtered.length;
  const desktopPagedProducts = shouldPaginate ? filtered.slice(desktopStartIndex, desktopEndIndex) : filtered;
  const desktopPaginationItems = shouldPaginate ? getPaginationItems(desktopCurrentPage, desktopTotalPages) : [];
  const showDesktopPagination = shouldPaginate && filtered.length > 0 && desktopTotalPages > 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ledOnly) return;

    const prevScrollRestoration =
      "scrollRestoration" in window.history ? window.history.scrollRestoration : undefined;

    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      if ("scrollRestoration" in window.history && prevScrollRestoration) {
        window.history.scrollRestoration = prevScrollRestoration;
      }
    };
  }, [ledOnly]);

  useLayoutEffect(() => {
    if (!gridTopRef.current) return;
    const behavior = scrollToGridOnNextPageChangeRef.current;
    if (!behavior) return;

    scrollToGridOnNextPageChangeRef.current = null;
    gridTopRef.current.scrollIntoView({ behavior, block: "start" });
  }, [desktopCurrentPage, filter, ledMaxPrice, ledMinPrice, ledPageSize, ledPriceBands, ledSort, query]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFiltersOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileFiltersOpen]);

  useEffect(() => {
    if (!ledOnly) return;
    const container = componentCarouselRef.current;
    if (!container) return;
    if (ledDisplayComponentCards.length <= 1) return;
    if (window.innerWidth >= 768) return;

    const timer = window.setInterval(() => {
      const section = componentSectionRef.current ?? container;
      if (!section) return;
      if (document.visibilityState !== "visible") return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isSectionVisible = rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.18;
      if (!isSectionVisible) return;

      setActiveComponentSlide((prev) => {
        const nextIndex = (prev + 1) % ledDisplayComponentCards.length;
        const cards = Array.from(container.children) as HTMLElement[];
        const target = cards[nextIndex];
        if (target) {
          const left = target.offsetLeft - container.offsetLeft;
          container.scrollTo({ left, behavior: "smooth" });
        }
        return nextIndex;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [ledOnly, ledDisplayComponentCards.length]);

  useEffect(() => {
    if (!ledOnly) return;
    const container = whyChooseCarouselRef.current;
    if (!container) return;
    if (sashaWhyChooseCards.length <= 1) return;
    if (window.innerWidth >= 768) return;

    const timer = window.setInterval(() => {
      const section = whyChooseSectionRef.current ?? container;
      if (!section) return;
      if (document.visibilityState !== "visible") return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isSectionVisible = rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.18;
      if (!isSectionVisible) return;

      setActiveWhyChooseSlide((prev) => {
        const nextIndex = (prev + 1) % sashaWhyChooseCards.length;
        const cards = Array.from(container.children) as HTMLElement[];
        const target = cards[nextIndex];
        if (target) {
          const left = target.offsetLeft - container.offsetLeft;
          container.scrollTo({ left, behavior: "smooth" });
        }
        return nextIndex;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [ledOnly, sashaWhyChooseCards.length]);

  const handleComponentCarouselScroll = () => {
    const container = componentCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    const containerLeft = container.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - containerLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeComponentSlide) {
      setActiveComponentSlide(nearestIndex);
    }
  };

  const scrollComponentCarouselToIndex = (index: number) => {
    const container = componentCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    const target = cards[index];
    if (!target) return;

    const left = target.offsetLeft - container.offsetLeft;
    container.scrollTo({ left, behavior: "smooth" });
  };

  const handleWhyChooseCarouselScroll = () => {
    const container = whyChooseCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    const containerLeft = container.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - containerLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeWhyChooseSlide) {
      setActiveWhyChooseSlide(nearestIndex);
    }
  };

  const scrollWhyChooseCarouselToIndex = (index: number) => {
    const container = whyChooseCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    const target = cards[index];
    if (!target) return;

    const left = target.offsetLeft - container.offsetLeft;
    container.scrollTo({ left, behavior: "smooth" });
  };


  return (
      <div
      className={`mx-auto w-full max-w-7xl ${
        ledOnly
          ? "led-display-page mb-[25px] space-y-2 [&>section]:mt-0 [&>section:not(:first-child)]:rounded-3xl [&>section:not(:first-child)]:bg-white [&>section:not(:first-child)]:p-[10px] [&>section:not(:first-child)]:shadow-sm [&>section:not(:first-child)]:border-0 md:[&>section:not(:first-child)]:p-6"
          : "space-y-12"
      } px-[10px] md:px-6`}
    >
      {/* HEADER */}
      <section
        className={ledOnly ? "py-0" : "rounded-3xl border p-8 shadow-sm"}
        style={
          ledOnly
            ? undefined
            : {
                borderColor: "rgba(37,99,235,0.25)",
                background:
                  "radial-gradient(120% 140% at 0% 0%, rgba(14,165,233,0.14) 0%, rgba(255,255,255,0.92) 38%, rgba(255,255,255,0.96) 62%, rgba(255,106,0,0.10) 100%)",
                boxShadow: "0 14px 36px rgba(15,23,42,0.10)",
              }
        }
      >
        {ledOnly ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingFaqSchema) }} />
        ) : null}
        {ledOnly ? <LedDisplayHero /> : null}
        {!ledOnly ? <div>
          <h1 className="text-[1.75rem] font-extrabold leading-[1.2] text-slate-900 md:text-4xl">
          All LED Products &amp; Accessories
        </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Indoor, Outdoor, Rental LED Displays, Receiving Cards, Controllers, and Power Supplies - all models in one place.
          </p>
        </div> : null}
        {!ledOnly ? (
          <div className="mt-4">
            <Link
              prefetch={false}
              href="/led-display/"
              className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
            >
              LED Display
            </Link>
          </div>
        ) : null}
        {!ledOnly ? (
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setFilter(f.key);
                    resetResultsToFirstPage();
                  }}
                  className="rounded-2xl border px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
                  style={{
                    borderColor: active ? "rgba(122,18,52,0.45)" : "rgba(15,23,42,0.10)",
                    background: active ? "rgba(122,18,52,0.10)" : "white",
                    color: active ? "#FF6A00" : "#0f172a",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex w-full gap-2 sm:w-auto">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetResultsToFirstPage();
              }}
              placeholder='Search (e.g. "P1.86", "R-712", "VP820", "5V 40A")'
              className="w-full rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:ring-2 sm:w-[380px]"
              style={{ borderColor: "rgba(15,23,42,0.12)" }}
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  resetResultsToFirstPage();
                }}
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
        ) : null}
      </section>

      {/* PRODUCTS GRID */}
      <div id="led-products" ref={gridTopRef} className="scroll-mt-24" />
      <section className="mt-3 space-y-3 !bg-transparent !p-0 !shadow-none">
        {ledOnly ? (
          <div data-led-product-explorer>
            <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto] lg:hidden">
              <label className="relative block min-w-0">
                <span className="sr-only">Search LED display products</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 fill-none text-slate-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); resetResultsToFirstPage(); }}
                  placeholder="Search LED products..."
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                />
                {query ? (
                  <button type="button" aria-label="Clear product search" onClick={() => { setQuery(""); resetResultsToFirstPage(); }} className="absolute right-2 top-1.5 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">×</button>
                ) : null}
              </label>
              <button
                type="button"
                aria-expanded={mobileFiltersOpen}
                aria-controls="led-product-filters"
                onClick={() => setMobileFiltersOpen((open) => !open)}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
              >
                Filters{ledActiveFilterCount ? ` (${ledActiveFilterCount})` : ""}
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
              <aside
                id="led-product-filters"
                aria-label="LED display product filters"
                className={`${mobileFiltersOpen ? "flex" : "hidden"} flex-col self-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.045)] lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100dvh-6rem)]`}
              >
                <div className="flex shrink-0 items-center justify-between gap-3 px-3 pb-2 pt-3">
                  <h3 className="text-base font-extrabold leading-5 tracking-tight text-[#071936]">Filter Products</h3>
                  <div className="flex items-center gap-2">
                    {ledActiveFilterCount || query ? (
                      <button type="button" onClick={clearLedFilters} className="cursor-pointer text-[11px] font-bold text-orange-700 hover:underline">Clear All</button>
                    ) : null}
                    <button type="button" aria-label="Close product filters" onClick={() => setMobileFiltersOpen(false)} className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 lg:hidden">×</button>
                  </div>
                </div>

                <div className="hidden shrink-0 px-3 pb-2 lg:block">
                  <label className="relative block min-w-0">
                    <span className="sr-only">Search LED display products</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-2.5 top-2.5 h-4 w-4 fill-none text-slate-400">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => { setQuery(event.target.value); resetResultsToFirstPage(); }}
                      placeholder="Search products..."
                      className="h-9 w-full rounded-lg border border-slate-300 bg-white pl-8 pr-8 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                    />
                    {query ? (
                      <button type="button" aria-label="Clear product search" onClick={() => { setQuery(""); resetResultsToFirstPage(); }} className="absolute right-1 top-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-base text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">×</button>
                    ) : null}
                  </label>
                </div>

                <div className="min-h-0 px-3 pb-2 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-gutter:stable]">
                  <div className="border-b border-slate-200/80">
                    <button
                      type="button"
                      aria-expanded={openLedFilterGroups.includes("category")}
                      aria-controls="led-filter-category"
                      onClick={() => setOpenLedFilterGroups((groups) => groups.includes("category") ? groups.filter((group) => group !== "category") : [...groups, "category"])}
                      className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-md px-1.5 text-left text-[12px] font-extrabold text-slate-800 transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/35"
                    >
                      <span className="min-w-0 flex-1">Product Category</span>
                      {filter !== "all" ? <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-extrabold text-orange-700">1</span> : null}
                      <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 fill-none text-slate-600 transition-transform duration-200 ${openLedFilterGroups.includes("category") ? "rotate-180" : ""}`}>
                        <path d="m4.5 6 3.5 3.5L11.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div id="led-filter-category" hidden={!openLedFilterGroups.includes("category")} className="px-0.5 pb-2 pt-0.5">
                      {filters.map((item) => (
                        <label key={item.key} className="group/option flex min-h-7 cursor-pointer items-center gap-2 rounded-md px-1.5 text-[12px] leading-4 text-slate-700 transition hover:bg-orange-50">
                          <input
                            type="checkbox"
                            checked={filter === item.key}
                            onChange={() => { setFilter(item.key); resetResultsToFirstPage(); }}
                            className="h-3.5 w-3.5 shrink-0 rounded-[3px] border-slate-300 accent-[#F56605] focus-visible:ring-2 focus-visible:ring-[#F56605]/35"
                          />
                          <span className="min-w-0 flex-1 font-semibold text-slate-700 group-hover/option:text-slate-950">{item.label}</span>
                          <span className="shrink-0 text-[10px] font-medium tabular-nums text-slate-400">({categoryCount(item.key)})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-slate-200/80 last:border-b-0">
                    <button
                      type="button"
                      aria-expanded={openLedFilterGroups.includes("price")}
                      aria-controls="led-filter-price"
                      onClick={() => setOpenLedFilterGroups((groups) => groups.includes("price") ? groups.filter((group) => group !== "price") : [...groups, "price"])}
                      className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-md px-1.5 text-left text-[12px] font-extrabold text-slate-800 transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/35"
                    >
                      <span className="min-w-0 flex-1">Price Range (৳)</span>
                      {ledPriceBands.length || ledCustomPriceActive ? <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-extrabold text-orange-700">{ledPriceBands.length + (ledCustomPriceActive ? 1 : 0)}</span> : null}
                      <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 fill-none text-slate-600 transition-transform duration-200 ${openLedFilterGroups.includes("price") ? "rotate-180" : ""}`}>
                        <path d="m4.5 6 3.5 3.5L11.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div id="led-filter-price" hidden={!openLedFilterGroups.includes("price")} className="px-1 pb-2 pt-0.5">
                      <div className="relative mt-1 h-5">
                        <div className="absolute inset-x-1 top-2 h-1 rounded-full bg-slate-200" aria-hidden="true" />
                        <div
                          className="absolute top-2 h-1 rounded-full bg-[#F56605]"
                          style={{ left: `calc(${ledSliderMinPercent}% + 0.25rem)`, right: `calc(${100 - ledSliderMaxPercent}% + 0.25rem)` }}
                          aria-hidden="true"
                        />
                        <input
                          type="range"
                          min={0}
                          max={LED_PRICE_SLIDER_MAX}
                          step={500}
                          value={ledSliderMinValue}
                          onChange={(event) => changeLedCustomPrice("min", event.currentTarget.value === "0" ? "" : event.currentTarget.value)}
                          aria-label="Minimum LED product price"
                          className="pointer-events-none absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F56605] [&::-moz-range-thumb]:shadow [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-0.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F56605] [&::-webkit-slider-thumb]:shadow"
                        />
                        <input
                          type="range"
                          min={0}
                          max={LED_PRICE_SLIDER_MAX}
                          step={500}
                          value={ledSliderMaxValue}
                          onChange={(event) => changeLedCustomPrice("max", event.currentTarget.value === String(LED_PRICE_SLIDER_MAX) ? "" : event.currentTarget.value)}
                          aria-label="Maximum LED product price"
                          className="pointer-events-none absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F56605] [&::-moz-range-thumb]:shadow [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-0.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F56605] [&::-webkit-slider-thumb]:shadow"
                        />
                      </div>

                      <div className="mt-1 grid grid-cols-2 gap-2">
                        <label className="relative block">
                          <span className="sr-only">Minimum price in BDT</span>
                          <span className="pointer-events-none absolute left-2 top-2 text-[11px] font-bold text-slate-500">৳</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={LED_PRICE_SLIDER_MAX}
                            step={500}
                            value={ledMinPrice ?? ""}
                            onChange={(event) => changeLedCustomPrice("min", event.currentTarget.value)}
                            placeholder="0"
                            aria-describedby={ledCustomPriceInvalid ? "led-price-range-error" : undefined}
                            className="h-8 w-full rounded-md border border-slate-300 bg-white pl-5 pr-1.5 text-[11px] font-semibold tabular-nums text-slate-800 outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                          />
                        </label>
                        <label className="relative block">
                          <span className="sr-only">Maximum price in BDT</span>
                          <span className="pointer-events-none absolute left-2 top-2 text-[11px] font-bold text-slate-500">৳</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={LED_PRICE_SLIDER_MAX}
                            step={500}
                            value={ledMaxPrice ?? ""}
                            onChange={(event) => changeLedCustomPrice("max", event.currentTarget.value)}
                            placeholder={`${LED_PRICE_SLIDER_MAX.toLocaleString("en-BD")}+`}
                            aria-describedby={ledCustomPriceInvalid ? "led-price-range-error" : undefined}
                            className="h-8 w-full rounded-md border border-slate-300 bg-white pl-5 pr-1.5 text-[11px] font-semibold tabular-nums text-slate-800 outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                          />
                        </label>
                      </div>

                      {ledCustomPriceInvalid ? (
                        <p id="led-price-range-error" role="alert" className="mt-1.5 text-left text-[10px] font-semibold leading-4 text-red-700">
                          Minimum price cannot exceed maximum price.
                        </p>
                      ) : null}

                      <details className="mt-2 rounded-md border border-slate-200 bg-slate-50/70 px-2 py-1.5">
                        <summary className="cursor-pointer text-[10px] font-bold text-slate-600 marker:text-orange-600">
                          Quick price ranges{ledPriceBands.length ? ` (${ledPriceBands.length} selected)` : ""}
                        </summary>
                        <div className="mt-1.5 border-t border-slate-200 pt-1.5">
                          {LED_PRICE_BANDS.map((band) => {
                            const count = priceBandCount(band.id);
                            const selected = ledPriceBands.includes(band.id);
                            return (
                              <label key={band.id} className={`group/option flex min-h-7 items-center gap-2 rounded-md px-1.5 text-[12px] leading-4 text-slate-700 transition ${count === 0 && !selected ? "cursor-not-allowed opacity-45" : "cursor-pointer hover:bg-orange-50"}`}>
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  disabled={count === 0 && !selected}
                                  onChange={() => {
                                    setLedPriceBands((bands) => selected ? bands.filter((item) => item !== band.id) : [...bands, band.id]);
                                    if (band.id === "request" && !selected) {
                                      setLedMinPrice(null);
                                      setLedMaxPrice(null);
                                    }
                                    resetResultsToFirstPage();
                                  }}
                                  className="h-3.5 w-3.5 shrink-0 rounded-[3px] border-slate-300 accent-[#F56605] focus-visible:ring-2 focus-visible:ring-[#F56605]/35"
                                />
                                <span className="min-w-0 flex-1 font-semibold text-slate-700 group-hover/option:text-slate-950">{band.label}</span>
                                <span className="shrink-0 text-[10px] font-medium tabular-nums text-slate-400">({count})</span>
                              </label>
                            );
                          })}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>

                <div className="mx-3 mb-3 mt-1 grid grid-cols-2 gap-2 lg:hidden">
                  <button type="button" onClick={clearLedFilters} className="min-h-10 cursor-pointer rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700">Clear All</button>
                  <button type="button" onClick={() => setMobileFiltersOpen(false)} className="min-h-10 cursor-pointer rounded-xl bg-[#FD6900] px-3 text-sm font-extrabold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">Show {filtered.length} Products</button>
                </div>
              </aside>

              <div data-led-product-listing className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_3px_16px_rgba(15,23,42,0.045)] sm:p-4">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="!text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[22px]">Featured LED Display Products</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <p className="text-left text-xs font-semibold leading-4 text-slate-600" aria-live="polite">
                        {filtered.length ? `Showing ${desktopStartIndex + 1}–${desktopEndIndex} of ${filtered.length}` : "0"} LED {filtered.length === 1 ? "Product" : "Products"}
                      </p>
                      {ledActiveFilterCount || query ? (
                        <button type="button" onClick={clearLedFilters} className="cursor-pointer text-sm font-bold text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">Clear All</button>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="whitespace-nowrap">Sort by</span>
                      <select value={ledSort} onChange={(event) => { setLedSort(event.target.value as LedSortOption); resetResultsToFirstPage(); }} className="h-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-xs focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                        <option value="recommended">Recommended</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A–Z</option>
                      </select>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="whitespace-nowrap">Show</span>
                      <select value={ledPageSize} onChange={(event) => { setLedPageSize(Number(event.target.value) as (typeof LED_RESULT_LIMITS)[number]); resetResultsToFirstPage(); }} className="h-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-xs focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20" aria-label="LED products per page">
                        {LED_RESULT_LIMITS.map((limit) => <option key={limit} value={limit}>{limit}</option>)}
                      </select>
                    </label>
                  </div>
                </div>

                {ledActiveFilterCount ? (
                  <div className="mb-4 flex flex-wrap gap-2" aria-label="Active LED product filters">
                    {filter !== "all" ? (
                      <button type="button" onClick={() => { setFilter("all"); resetResultsToFirstPage(); }} className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">
                        {filters.find((item) => item.key === filter)?.label}<span aria-hidden="true">×</span>
                      </button>
                    ) : null}
                    {ledPriceBands.map((bandId) => (
                      <button key={bandId} type="button" onClick={() => { setLedPriceBands((bands) => bands.filter((item) => item !== bandId)); resetResultsToFirstPage(); }} className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">
                        {LED_PRICE_BANDS.find((band) => band.id === bandId)?.label}<span aria-hidden="true">×</span>
                      </button>
                    ))}
                    {ledCustomPriceActive ? (
                      <button type="button" onClick={() => { setLedMinPrice(null); setLedMaxPrice(null); resetResultsToFirstPage(); }} className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">
                        {ledMinPrice === null ? "Any" : `৳${ledMinPrice.toLocaleString("en-BD")}`}–{ledMaxPrice === null ? "Any" : `৳${ledMaxPrice.toLocaleString("en-BD")}`}<span aria-hidden="true">×</span>
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {desktopPagedProducts.length ? (
                  <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {desktopPagedProducts.map((product, index) => <LedExplorerProductCard key={product.id} product={product} priority={index === 0} />)}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
                    <h3 className="font-extrabold text-slate-950">No LED products found</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">No products match your current search and filters.</p>
                    <button type="button" onClick={clearLedFilters} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700">Clear Search &amp; Filters</button>
                  </div>
                )}

                {showDesktopPagination ? (
                  <nav aria-label="LED product pages" className="mt-6 flex flex-wrap items-center justify-center gap-1.5 border-t border-slate-100 pt-5">
                    <button type="button" onClick={() => { scrollToGridOnNextPageChangeRef.current = "smooth"; setPage((current) => Math.max(1, current - 1)); }} disabled={desktopCurrentPage === 1} className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40">Prev</button>
                    {desktopPaginationItems.map((item, index) => item === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-1 text-slate-400">…</span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        aria-label={`Go to LED product page ${item}`}
                        aria-current={item === desktopCurrentPage ? "page" : undefined}
                        onClick={() => { scrollToGridOnNextPageChangeRef.current = "smooth"; setPage(item); }}
                        className={item === desktopCurrentPage
                          ? "inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl border border-orange-600 bg-orange-600 px-3 text-sm font-extrabold text-white shadow-sm"
                          : "inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"}
                      >
                        {item}
                      </button>
                    ))}
                    <button type="button" onClick={() => { scrollToGridOnNextPageChangeRef.current = "smooth"; setPage((current) => Math.min(desktopTotalPages, current + 1)); }} disabled={desktopCurrentPage === desktopTotalPages} className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                  </nav>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <ResponsiveProductCarousel className="product-grid-3" desktopClassName="md:grid-cols-2 lg:grid-cols-3" mobileGapClassName="gap-[10px]">
            {desktopPagedProducts.map(renderCatalogCard)}
          </ResponsiveProductCarousel>
        )}
      </section>

      {ledOnly ? (
        <section className="mt-3 !bg-transparent !p-0 !shadow-none">
          <details className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 md:px-5 md:py-4 [&::-webkit-details-marker]:hidden">
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700"
                  aria-hidden="true"
                >
                  <UiIcon name="display" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[1.15rem] font-extrabold leading-tight text-slate-900 md:text-[1.35rem]">
                    Browse all products (full list)
                  </div>
                  <p className="mt-1 hidden text-sm leading-6 text-slate-600 md:block">
                    Open to jump to any product page. This helps product discovery and internal site navigation.
                  </p>
                </div>
              </div>
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 transition group-open:rotate-180"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>

            <div className="border-t border-slate-200 px-4 py-4 md:px-5 md:py-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Internal Product Links
              </p>
              <nav aria-label="Full LED display product list" className="mt-4">
                <div className="grid gap-x-8 gap-y-2 md:grid-cols-2 xl:grid-cols-4">
                  {ledFullListLinks.map((item) => (
                    <Link
                      key={item.href}
                      prefetch={false}
                      href={item.href}
                      className="inline-flex min-w-0 items-start text-[14px] leading-7 text-slate-700 transition hover:text-[#F56605]"
                      title={`${item.title} - ${item.groupLabel}`}
                    >
                      <span className="truncate">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </details>
        </section>
      ) : null}

      {/* Empty state */}
	      {!ledOnly && filtered.length === 0 && (
	        <section className={ledOnly ? "py-8 text-center text-slate-700" : "rounded-3xl border bg-white p-8 text-center text-slate-700"}>
	          <div className="text-lg font-bold text-slate-900">No products found</div>
	          <div className="mt-2 text-sm text-slate-600">Try changing the filter or search keyword.</div>
	        </section>
	      )}
	
	      {ledOnly && (
	        <>
	          <section id="led-price-table" className="scroll-mt-24 py-8">
	            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
                <UiIcon name="cost" className="h-6 w-6 text-slate-800" />
	              <span>LED Display Price List in Bangladesh</span>
	            </h2>
            <MobileIntroText
              teaser="LED display price in Bangladesh varies based on pixel pitch, screen size, display type, brightness, cabinet quality, controller system, and installation complexity."
              className="mt-3"
              teaserClassName="w-full"
              expandedClassName="space-y-4 text-sm leading-7 text-slate-600"
              desktopClassName="space-y-4 text-sm leading-7 text-slate-600"
            >
              <>
                <p>
                  LED display price in Bangladesh varies based on pixel pitch, screen size, display type, brightness,
                  cabinet quality, controller system, and installation complexity. Generally, LED screen price starts from
                  around {normalizeDisplayedPriceText("4,000 - 23,000 BDT")} per square foot for indoor LED displays, outdoor LED billboards, advertising LED
                  screens, and high-resolution video wall solutions.
                </p>
                <p>
                  For outdoor advertising, P10, P8, P6, P5, P4, and P2.5 LED displays are popular choices for roadside
                  billboards, shopping malls, stadiums, building facades, public information displays, and large digital
                  signage projects. Outdoor LED screens need high brightness, waterproof cabinets, strong structure, proper
                  ventilation, and reliable power distribution for stable long-term performance.
                </p>
                <p>
                  For indoor applications, P3, P2.5, P2, P1.86, P1.53, and P1.25 LED displays are commonly used in conference
                  rooms, corporate offices, control rooms, retail shops, showrooms, mosques, universities, and event venues.
                  These fine-pitch LED displays provide sharper image quality, smooth video playback, and better viewing comfort
                  from a short distance.
                </p>
              </>
            </MobileIntroText>

            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                <h3 className="text-[1rem] font-semibold text-slate-900 md:text-lg">Indoor LED Display Price (P1.25-P3.076)</h3>
                <details className="group mt-4 md:hidden">
                  <summary
                    className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden"
                    style={{
                      borderColor: `${BRAND.maroon}14`,
                      background: "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)",
                    }}
                  >
                    Tap To Expand Indoor Price List
                  </summary>
                  <div className="mt-3 space-y-2">
                    {indoorPriceRows.map((row) => (
                      <Link
                        key={row.href}
                        prefetch={false}
                        href={row.href}
                        className="flex items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-3"
                      >
                        <span className="min-w-0 flex-1 text-[12px] font-semibold leading-5 text-slate-900">{row.title}</span>
                        <span className="shrink-0 text-[11px] font-extrabold text-[#F56605]">{row.price}</span>
                      </Link>
                    ))}
                  </div>
                </details>
                <div className="mt-4 hidden overflow-x-auto md:block">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600">
                      <tr>
                        <th className="border border-slate-200 px-3 py-3">LED Display Model</th>
                        <th className="border border-slate-200 px-3 py-3 text-right">Price Per Sqft (BDT)</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      {indoorPriceRows.map((row) => (
                        <tr key={row.href}>
                          <td className="border border-slate-200 px-3 py-3">
                            <Link prefetch={false} href={row.href} className="font-semibold text-slate-900 hover:underline">
                              {row.title}
                            </Link>
                          </td>
                          <td className="border border-slate-200 px-3 py-3 text-right whitespace-nowrap">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                <h3 className="text-[1rem] font-semibold text-slate-900 md:text-lg">Outdoor LED Display Price (P2.5-P10)</h3>
                <details className="group mt-4 md:hidden">
                  <summary
                    className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden"
                    style={{
                      borderColor: `${BRAND.maroon}14`,
                      background: "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
                    }}
                  >
                    Tap To Expand Outdoor Price List
                  </summary>
                  <div className="mt-3 space-y-2">
                    {outdoorPriceRows.map((row) => (
                      <Link
                        key={row.href}
                        prefetch={false}
                        href={row.href}
                        className="flex items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-3"
                      >
                        <span className="min-w-0 flex-1 text-[12px] font-semibold leading-5 text-slate-900">{row.title}</span>
                        <span className="shrink-0 text-[11px] font-extrabold text-[#F56605]">{row.price}</span>
                      </Link>
                    ))}
                  </div>
                </details>
                <div className="mt-4 hidden overflow-x-auto md:block">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600">
                      <tr>
                        <th className="border border-slate-200 px-3 py-3">LED Display Model</th>
                        <th className="border border-slate-200 px-3 py-3 text-right">Price Per Sqft (BDT)</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      {outdoorPriceRows.map((row) => (
                        <tr key={row.href}>
                          <td className="border border-slate-200 px-3 py-3">
                            <Link prefetch={false} href={row.href} className="font-semibold text-slate-900 hover:underline">
                              {row.title}
                            </Link>
                          </td>
                          <td className="border border-slate-200 px-3 py-3 text-right whitespace-nowrap">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:mt-1 md:text-left md:text-sm md:leading-7">
              Note: Prices may vary depending on configuration, installation scope, and order quantity.
            </p>
          </section>

          <section className="pt-8 pb-[25px]">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="check" className="h-6 w-6 text-slate-800" />
              <span>How to Choose the Right LED Display Screen in Bangladesh</span>
            </h2>
            <MobileIntroText
              teaser="Choosing the right LED display screen depends on screen size, viewing distance, installation area, brightness, controller setup, and long-term operating cost."
              className="mt-3"
              teaserClassName="w-full text-center"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-center text-sm leading-7 text-slate-600 md:text-[15px]"
            >
              <>
                Choosing the right <strong>LED display screen</strong> depends on screen size, viewing distance,
                installation area, brightness, controller setup, and long-term operating cost. Whether you need an
                <strong> indoor LED display</strong> for a corporate office, a <strong>digital signage display</strong>{" "}
                for a showroom, or an <strong>outdoor LED billboard</strong> for advertising, this guide helps you
                shortlist the right <strong>LED display solution in Bangladesh</strong>.
              </>
            </MobileIntroText>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {[
                  {
                    no: "01",
                    title: "Pixel Pitch & Viewing Distance",
                    text: "Pixel pitch directly affects image sharpness and comfortable viewing distance. Lower pixel pitch gives higher resolution for close viewing, while higher pixel pitch is suitable for larger viewing areas and long-distance visibility.",
                    bullets: [
                      "P1.5-P2.5: control room, boardroom, studio, and premium showroom LED display",
                      "P2.5-P4: indoor advertising display, retail branding, and lobby video wall",
                      "P4-P6: shopping mall, hall room, stage backdrop, and mixed-content commercial display",
                      "P6-P10: outdoor LED screen, roadside billboard, and far-distance public advertising",
                    ],
                  },
                  {
                    no: "02",
                    title: "Indoor vs Outdoor Installation",
                    text: "Installation environment directly impacts brightness requirement, cabinet protection, maintenance planning, and long-term durability. Always choose the LED screen according to the real application area and exposure condition.",
                    bullets: [
                      "Indoor LED Display: high resolution, comfortable brightness, and close-view detail",
                      "Outdoor LED Display: higher brightness, cabinet sealing, and weather-ready durability",
                      "Semi-outdoor LED Display: suitable for covered commercial frontage and entrance areas",
                      "Use cases: office, showroom, shopping mall, roadside, mosque, stage, and stadium",
                    ],
                  },
                  {
                    no: "03",
                    title: "Screen Size & Resolution Planning",
                    text: "The right LED screen size depends on wall space, content type, audience distance, and target visual impact. Proper planning improves readability, branding visibility, and overall project value.",
                    bullets: [
                      "Measure available installation area carefully before finalizing cabinet layout",
                      "Match screen aspect ratio with your content source and playback workflow",
                      "Consider presentation, video, branding, menu board, or live data use",
                      "Plan width, height, and total pixel resolution together for better results",
                    ],
                  },
                  {
                    no: "04",
                    title: "Brightness & Visibility",
                    text: "Display brightness measured in nits determines how clearly the LED screen remains visible in indoor lighting, semi-outdoor conditions, or direct sunlight. Proper brightness selection protects both visual quality and budget.",
                    bullets: [
                      "Indoor LED display: 800-1500 nits for comfortable close-view visibility",
                      "Semi-outdoor LED display: 2000-3500 nits for shaded but bright commercial areas",
                      "Outdoor LED billboard: 5000-8000 nits for sunlight-facing visibility",
                      "Higher brightness improves daytime visibility and advertising performance",
                    ],
                  },
                  {
                    no: "05",
                    title: "Controller System & Connectivity",
                    text: "A reliable LED display controller ensures stable signal transmission, accurate mapping, smooth video playback, and flexible content management. Controller choice also affects future maintenance and content workflow.",
                    bullets: [
                      "NovaStar controller solutions for professional video wall and rental projects",
                      "Colorlight control system options for scalable commercial LED display setups",
                      "Huidu asynchronous controller options for signage and scheduled playback",
                      "Support for video processing, calibration, and remote content management",
                    ],
                  },
                  {
                    no: "06",
                    title: "Power Consumption & Maintenance",
                    text: "Long-term operating cost depends on LED quality, screen size, brightness level, controller ecosystem, and power supply efficiency. Maintenance planning is also important for stable LED screen performance in Bangladesh.",
                    bullets: [
                      "Check average and maximum power consumption before installation",
                      "Use quality power supply, controller, and signal components for reliability",
                      "Schedule regular cleaning, calibration, and preventive servicing",
                      "Good LED systems can support long service life with proper maintenance",
                    ],
                  },
	                ].map((item) => (
	                  <article key={item.no} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
	                    <div className="flex items-center gap-3">
	                      <div className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-2 text-xs font-extrabold text-white">
	                        {item.no}
	                      </div>
	                      <h3 className="text-[1rem] font-extrabold leading-[1.3] text-slate-900 md:text-xl">{item.title}</h3>
	                    </div>
	                    <p className="mt-3 hidden text-sm leading-7 text-slate-600 md:block">{item.text}</p>
                    <ul className="mt-4 space-y-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FF6A00]" />
                          <span className="text-justify md:text-left">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3 md:gap-4">
                {[
                  {
                    t: "Step 1: Confirm screen category",
                    d: "Shortlist indoor, outdoor, or rental LED display first so brightness, cabinet type, and service method match the real application.",
                  },
                  {
                    t: "Step 2: Plan power + structure safely",
                    d: "Stable power supply, grounding, surge protection, and a safe mounting frame reduce downtime, hidden cost, and long-term service issues.",
                  },
                  {
                    t: "Step 3: Match controller capacity",
                    d: "Match sending controller, receiving card, and processor capacity to target resolution and refresh requirement for smooth playback.",
                  },
                ].map((x, index) => (
                  <article
                    key={x.t}
                    className={`rounded-2xl border p-5 md:border-slate-200 md:bg-white ${
                      index === 0
                        ? "border-sky-200/80 bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_52%,#e0f2fe_100%)]"
                        : index === 1
                          ? "border-violet-200/80 bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_52%,#ede9fe_100%)]"
                          : "border-cyan-200/80 bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_52%,#cffafe_100%)]"
                    }`}
                  >
                    <div className="text-[15px] font-extrabold leading-5 text-slate-900 md:text-base">{x.t}</div>
                    <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-left md:text-sm md:leading-7">{x.d}</p>
                  </article>
                ))}
              </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[15px] font-extrabold leading-5 text-slate-900 md:text-base">What to share for an accurate LED display quotation</h3>
              <MobileIntroText
                teaser="A quick site survey or clear project information helps avoid mismatched size, incorrect pixel pitch, power issues, and hidden installation cost."
                className="mt-2"
                teaserClassName="w-full"
                expandedClassName="text-sm leading-7 text-slate-600"
                desktopClassName="text-sm leading-7 text-slate-600"
              >
                <>
                  A quick site survey or clear project information helps avoid mismatched size, incorrect pixel pitch,
                  power issues, and hidden installation cost. Sharing the right details early helps us recommend the
                  correct LED screen price in Bangladesh with better accuracy.
                </>
              </MobileIntroText>
              <ul className="mt-4 grid gap-2 text-[13px] leading-6 text-slate-700 md:grid-cols-2 md:text-sm md:leading-7">
                {[
                  "Location type: indoor, outdoor, showroom, event, or roadside advertising",
                  "Target screen size (W x H) or available wall, frame, or stage space",
                  "Content type: mostly text, video ads, live camera, menu board, or mixed content",
                  "Power situation: available line, generator / UPS, and distance to DB panel",
                  "Mounting: wall mount, stand, hanging, rooftop, cabinet frame, or structure needed",
                  "Preferred control: laptop, USB, Wi-Fi, LAN, or cloud CMS scheduling workflow",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "#FF6A00" }} />
                    <span className="text-justify md:text-left">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact/"
                  className="inline-flex rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E45700] hover:shadow-md"
                >
                  Get Buying Help -&gt;
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="compare" className="h-6 w-6 text-slate-800" />
              <span>Indoor vs Outdoor LED display in Bangladesh</span>
            </h2>
            <MobileIntroText
              teaser="Indoor and outdoor LED displays solve different problems based on viewing distance, brightness, and installation environment."
              className="mt-2"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                Indoor and outdoor LED displays solve different problems. Indoor setups focus on close-view clarity and comfortable brightness,
                while outdoor setups prioritize daylight visibility, weather protection, and structural safety. Use this guide to shortlist the right
                direction before requesting a site-specific quotation.
              </>
            </MobileIntroText>

            <div className="mt-5 grid gap-3 md:mt-6 md:gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                <h3 className="text-[1rem] font-semibold leading-[1.3] text-slate-900 md:text-lg">Indoor LED display: best for close viewing</h3>
                <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-left md:text-sm md:leading-7">
                  Suitable for showrooms, offices, lobbies, studios, and meeting rooms where text and fine details need to stay sharp at short distances.
                </p>
                <ul className="mt-4 space-y-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7">
                  {[
                    "Finer pixel pitch for crisp text and high detail.",
                    "Higher refresh rate options for clean camera capture (events/streaming).",
                    "Front-service vs rear-service planning based on access behind the wall.",
                    "Lower brightness target than outdoor, optimized for indoor comfort.",
                    "Color uniformity and calibration matter more for premium indoor walls.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "#FF6A00" }} />
                      <span className="text-justify md:text-left">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                <h3 className="text-[1rem] font-semibold leading-[1.3] text-slate-900 md:text-lg">Outdoor LED display: built for daylight and weather</h3>
                <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-left md:text-sm md:leading-7">
                  Recommended for roadside branding, shopfront signs, building facades, and public screens where sunlight, rain, and dust are key factors.
                </p>
                <ul className="mt-4 space-y-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7">
                  {[
                    "Higher brightness planning for daylight readability.",
                    "Cabinet protection level (IP) and waterproof cable routing.",
                    "Heat management and power stability for long running hours.",
                    "Wind-load and mounting structure checks for safety.",
                    "Service access strategy to keep maintenance fast and safe.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "#FF6A00" }} />
                      <span className="text-justify md:text-left">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <details className="group mt-5 md:hidden">
              <summary
                className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden"
                style={{
                  borderColor: `${BRAND.maroon}14`,
                  background: "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)",
                }}
              >
                Tap To Expand Comparison Factors
              </summary>
              <div className="mt-3 grid gap-2">
                {[
                  ["Viewing distance", "Short-to-mid (detail focused)", "Mid-to-long (visibility focused)"],
                  ["Brightness target", "Comfortable indoor levels", "High brightness for daylight"],
                  ["Cabinet protection", "Standard indoor cabinet", "Weather-ready cabinet (IP planning)"],
                  ["Maintenance access", "Front/rear service based on wall setup", "Service access with safety constraints"],
                  ["Power & safety", "Stable supply + grounding", "Surge protection + outdoor power distribution"],
                  ["Typical use cases", "Video walls, dashboards, meeting rooms", "Signage, billboards, public screens"],
                ].map((row) => (
                  <div key={row[0]} className="rounded-[16px] border border-slate-200 bg-white p-3.5">
                    <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#F56605]">{row[0]}</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="rounded-[12px] bg-slate-50 px-3 py-2">
                        <div className="text-[11px] font-bold text-slate-900">Indoor</div>
                        <div className="mt-1 text-[12px] leading-5 text-slate-700">{row[1]}</div>
                      </div>
                      <div className="rounded-[12px] bg-slate-50 px-3 py-2">
                        <div className="text-[11px] font-bold text-slate-900">Outdoor</div>
                        <div className="mt-1 text-[12px] leading-5 text-slate-700">{row[2]}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Key factor</th>
                    <th className="px-4 py-3">Indoor</th>
                    <th className="px-4 py-3">Outdoor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Viewing distance", "Short-to-mid (detail focused)", "Mid-to-long (visibility focused)"],
                    ["Brightness target", "Comfortable indoor levels", "High brightness for daylight"],
                    ["Cabinet protection", "Standard indoor cabinet", "Weather-ready cabinet (IP planning)"],
                    ["Maintenance access", "Front/rear service based on wall setup", "Service access with safety constraints"],
                    ["Power & safety", "Stable supply + grounding", "Surge protection + outdoor power distribution"],
                    ["Typical use cases", "Video walls, dashboards, meeting rooms", "Signage, billboards, public screens"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <td className="px-4 py-3 font-semibold text-slate-900">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                      <td className="px-4 py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex gap-2 md:flex-wrap md:gap-3">
              <Link
                prefetch={false}
                href={`${basePath}/indoor-led/`}
                className="inline-flex min-w-0 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-[11px] font-extrabold leading-tight text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm md:flex-none md:rounded-xl md:px-5 md:text-sm"
              >
                Explore Indoor Models -&gt;
              </Link>
              <Link
                prefetch={false}
                href={`${basePath}/outdoor/`}
                className="inline-flex min-w-0 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-[11px] font-extrabold leading-tight text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm md:flex-none md:rounded-xl md:px-5 md:text-sm"
              >
                Explore Outdoor Models -&gt;
              </Link>
              <Link
                prefetch={false}
                href="/contact/"
                className="hidden rounded-xl bg-[#FF6A00] px-6 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E45700] hover:shadow-md md:inline-flex"
              >
                Get a Recommendation -&gt;
              </Link>
            </div>
          </section>

          <section className="py-8 mb-[25px]">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="solutions" className="h-6 w-6 text-slate-800" />
              <span>LED Display Solutions in Bangladesh</span>
            </h2>
            <MobileIntroText
              teaser="Sasha corporation provides complete LED Screen solutions in Bangladesh covering planning, product selection, installation, configuration, and ongoing support."
              className="mt-2"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                Sasha corporation provides complete LED Screen solutions in Bangladesh covering planning, product selection, installation,
                configuration, and ongoing support for indoor LED panel, outdoor LED Billboard, rental LED display,
                and LED video wall projects. From commercial advertising and retail branding to corporate,
                institutional, and event environments, our team focuses on practical specifications, stable
                performance, and long-term service support for consistent visual impact.
              </>
            </MobileIntroText>

            <div className="mt-6 grid gap-4 md:mt-8 md:gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
                <div className="text-[1rem] font-semibold text-slate-900 md:text-lg">End-to-End LED Screen Implementation</div>
                <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                  We help clients select the correct LED configuration based on viewing distance, environment, content type, and operational
                  requirements. Each project is planned with attention to power stability, structure safety, and long-term usability. Pricing is
                  specification-driven and clearly explained-covering modules, cabinets, control systems, structure, installation and calibration.
                </p>

                <ul className="mt-4 space-y-2 text-[13px] text-slate-700 md:text-sm">
                  {ledEndToEndBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
                      <span className="text-justify leading-6 md:text-left md:leading-7">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link prefetch={false} href="/contact/" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Request a Free Quotation -&gt;
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {ledReliabilityCards.map((card, index) => (
                  <div
                    key={card.t}
                    className={`rounded-2xl border p-5 md:border-slate-200 md:bg-white ${
                      index % 3 === 0
                        ? "border-sky-200/80 bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_52%,#e0f2fe_100%)]"
                        : index % 3 === 1
                          ? "border-emerald-200/80 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_52%,#d1fae5_100%)]"
                          : "border-orange-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_52%,#ffedd5_100%)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                        <UiIcon name={card.icon} className="h-5 w-5" />
                      </div>
                    <div className="text-[15px] font-semibold leading-5 text-slate-900 md:text-base">{card.t}</div>
                    </div>
                    <p className="mt-2.5 text-justify text-[13px] leading-6 text-slate-600 md:mt-3 md:text-left md:text-sm md:leading-7">{card.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-3">
            <div ref={whyChooseSectionRef} className="sc-led-why-section">
              <div className="sc-led-why-head">
                <h2 className="sc-led-why-title flex items-center gap-2 text-[1.45rem] font-extrabold leading-[1.25] md:text-4xl">
                  <UiIcon name="support" className="h-6 w-6 shrink-0 text-slate-800 md:h-7 md:w-7" />
                  <span>Why Choose Sasha Corporation for LED Display Solutions?</span>
                </h2>
                <MobileIntroText
                  teaser="Sasha Corporation supplies, installs, configures, and supports LED display solutions across Bangladesh."
                  className="sc-led-why-intro mt-3"
                  teaserClassName="w-full"
                  expandedClassName="text-sm leading-7 md:text-base md:leading-8"
                  desktopClassName="text-sm leading-7 md:text-base md:leading-8"
                >
                  <>
                    Sasha Corporation supplies, installs, configures, and supports LED display solutions across Bangladesh. Project scope may include indoor LED displays, outdoor LED billboards, rental LED screens, LED video walls, controllers, receiving cards, power supplies, maintenance, and after-sales technical support. Warranty, response time, and maintenance terms are confirmed in the quotation according to the selected product and project scope.
                  </>
                </MobileIntroText>
              </div>

              <div className="sc-led-why-grid-wrap">
                <div
                  ref={whyChooseCarouselRef}
                  onScroll={handleWhyChooseCarouselScroll}
                  className="mt-4 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-[0.65rem] md:overflow-visible md:px-0 md:pb-0 md:pt-0 xl:grid-cols-4"
                >
	                {sashaWhyChooseCards.map((item, index) => (
	                  <article
                      key={item.title}
                      className={`group flex w-[86%] shrink-0 snap-start flex-col rounded-[20px] border px-3.5 py-3 transition duration-300 md:relative md:min-h-full md:min-w-0 md:w-auto md:shrink md:snap-normal md:overflow-hidden md:rounded-[24px] md:border-white/10 md:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] md:p-[0.9rem] md:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_34px_rgba(15,23,42,0.22)] md:backdrop-blur-[14px] md:transition-[transform,border-color,box-shadow,background] md:duration-[220ms] md:ease-in-out md:after:absolute md:after:inset-x-0 md:after:bottom-0 md:after:h-[3px] md:after:bg-[linear-gradient(90deg,rgba(255,106,0,0),rgba(255,106,0,0.95),rgba(255,140,0,0))] md:after:opacity-[0.88] md:hover:-translate-y-1 md:hover:border-[rgba(255,106,0,0.58)] md:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.07))] md:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_38px_rgba(15,23,42,0.28),0_0_0_1px_rgba(255,106,0,0.18),0_0_24px_rgba(255,106,0,0.16)] ${componentMobileCardStyles[index % componentMobileCardStyles.length]}`}
                    >
                      <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/75 bg-white/85 text-[#F56605] shadow-sm md:h-12 md:w-12 md:rounded-full md:border-[rgba(255,106,0,0.32)] md:bg-[linear-gradient(180deg,rgba(255,106,0,0.2),rgba(255,106,0,0.08))] md:text-[#FF6A00] md:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(255,106,0,0.16)]">
                          <UiIcon name={item.icon} className="h-5 w-5" />
                        </div>
                        <h3 className="min-w-0 flex-1 whitespace-normal break-words text-[16px] font-extrabold leading-tight tracking-tight text-slate-900 md:mt-0 md:text-[1.02rem] md:font-semibold md:leading-[1.5] md:tracking-normal">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2.5 whitespace-normal break-words text-[12.5px] leading-[1.55] text-slate-700 md:mt-[0.7rem] md:text-[0.94rem] md:leading-[1.8] md:text-[#475569]">{item.text}</p>
	                  </article>
	                ))}
                </div>

                <div className="mt-2.5 flex justify-center gap-1.5 md:hidden">
                  {sashaWhyChooseCards.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        scrollWhyChooseCarouselToIndex(index);
                        setActiveWhyChooseSlide(index);
                      }}
                      className={`h-1.5 rounded-full transition-all ${activeWhyChooseSlide === index ? "w-6 bg-[#F56605]" : "w-1.5 bg-slate-300"}`}
                      aria-label={`Go to ${item.title}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="process" className="h-6 w-6 text-slate-800" />
              <span>LED Display Installation Process in Bangladesh</span>
            </h2>
            <MobileIntroText
              teaser="A proper LED display installation process improves visual performance, operational safety, and long-term reliability."
              className="mt-3"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                A proper LED display installation process improves visual performance, operational safety, and long-term
                reliability. The workflow below gives a simple and practical overview so buyers can understand how a
                professional LED screen project is planned, installed, tested, and handed over in Bangladesh. Review our{" "}
                <Link href="/services-support/" className="font-semibold text-slate-900 underline underline-offset-2">
                  installation and support services
                </Link>{" "}
                for scope planning.
              </>
            </MobileIntroText>

            <div className="mt-6 -mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
              {[
                {
                  t: "Step 1: Site Survey and Requirement Collection",
                  d: "The team checks location dimensions, viewing distance, ambient light, structural condition, and electrical readiness. At this stage, project goals and content type are finalized.",
                  points: [
                    "Measure screen area and audience viewing zones.",
                    "Confirm indoor, outdoor, or rental operating environment.",
                    "Identify content source: HDMI, media server, live feed, or remote control.",
                  ],
                },
                {
                  t: "Step 2: System Design and BOQ Planning",
                  d: "Based on survey findings, the technical team prepares pixel pitch recommendation, cabinet layout, controller architecture, and power distribution plan with a clear scope of work.",
                  points: [
                    "Select suitable LED modules and cabinet structure.",
                    "Define controller, sending card, and receiving card compatibility.",
                    "Prepare itemized BOQ including installation and calibration scope.",
                  ],
                },
                {
                  t: "Step 3: Structure, Cabling, and Power Preparation",
                  d: "Before mounting panels, the support frame, cable routes, and distribution board setup are prepared for safety and serviceability. This step reduces future downtime and maintenance risks.",
                  points: [
                    "Install mounting frame with alignment and load safety checks.",
                    "Set AC power lines, earthing, and protection devices.",
                    "Complete data and power cable routing with clean labeling.",
                  ],
                },
                {
                  t: "Step 4: Panel Mounting and Controller Configuration",
                  d: "LED cabinets/modules are installed in sequence, followed by mapping and signal configuration. Accurate addressing and controller setup are critical for stable output.",
                  points: [
                    "Mount panels with proper lock and flatness adjustment.",
                    "Configure receiving card mapping and communication chain.",
                    "Set sender/controller resolution and input signal parameters.",
                  ],
                },
                {
                  t: "Step 5: Testing, Calibration, and Quality Check",
                  d: "The display is tested under real content conditions to validate brightness balance, color consistency, and signal stability. Any mismatch is corrected before handover.",
                  points: [
                    "Run test patterns for pixel, line, and color uniformity checks.",
                    "Tune brightness, grayscale, and playback smoothness.",
                    "Perform burn-in and stability testing for operational readiness.",
                  ],
                },
                {
                  t: "Step 6: Client Handover and Support Orientation",
                  d: "After final approval, operators receive basic training on content update, routine checks, and issue reporting. Documentation is shared for daily use and future support.",
                  points: [
                    "Provide operation guide and controller usage workflow.",
                    "Explain preventive maintenance and cleaning frequency.",
                    "Share support channel for troubleshooting and service response.",
                  ],
                },
              ].map((step) => (
                <article key={step.t} className="w-[89%] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white p-4 md:w-auto md:shrink md:snap-none md:p-5">
                  <h3 className="text-[15px] font-extrabold leading-5 text-slate-900 md:text-base">{step.t}</h3>
                  <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">{step.d}</p>
                  <ul className="mt-4 space-y-2 text-[13px] text-slate-700 md:text-sm">
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
                        <span className="text-justify leading-6 md:text-left md:leading-7">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">Simple Timeline Overview</h3>
              <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                Project duration varies by screen size, site readiness, and installation complexity. A common workflow
                timeline is shown below for planning clarity.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { label: "Survey", icon: "guide" },
                  { label: "Design", icon: "compare" },
                  { label: "Preparation", icon: "structure" },
                  { label: "Installation", icon: "install" },
                  { label: "Calibration", icon: "controller" },
                  { label: "Handover", icon: "support" },
                ].map((step, i) => (
                  <div
                    key={step.label}
                    className={`rounded-xl border px-2.5 py-2.5 text-center shadow-sm md:border-slate-200 md:bg-white md:p-3 md:shadow-none ${
                      i % 3 === 0
                        ? "border-sky-200/80 bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_52%,#e0f2fe_100%)]"
                        : i % 3 === 1
                          ? "border-violet-200/80 bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_52%,#ede9fe_100%)]"
                          : "border-orange-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_52%,#ffedd5_100%)]"
                    }`}
                  >
                    <div className="mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#FF6A00] ring-1 ring-[#FF6A00]/10 md:h-10 md:w-10 md:bg-slate-50">
                      <UiIcon name={step.icon} className="h-4 w-4 md:h-4.5 md:w-4.5" />
                    </div>
                    <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#FF6A00] md:mt-2 md:text-xs md:normal-case md:tracking-normal">Phase {i + 1}</div>
                    <div className="mt-1 text-[12px] font-semibold leading-4 text-slate-800 md:text-sm md:leading-5">{step.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

	          <section className="py-8">
	            <div className="space-y-10">
	              <div>
	                <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
                    <UiIcon name="display" className="h-6 w-6 text-slate-800" />
                    <span>What Is an LED Display?</span>
                  </h2>
                <MobileIntroText
                  teaser="An LED Display is a modular digital screen built from many light-emitting diode pixels that create images, videos, text, and live visual content."
                  teaserLines={2}
                  className="mt-4"
                  teaserClassName="w-full leading-6"
                  expandedClassName="space-y-4 text-sm leading-7 text-slate-600"
                  desktopClassName="mt-4 space-y-4 text-sm leading-7 text-slate-600 md:text-[15px] md:leading-8"
                >
                  <>
                    <p>
                      An <strong>LED Display</strong> is a modular digital screen built from many light-emitting
                      diode pixels that create images, videos, text, and live visual content. In a professional{" "}
                      <strong>LED Display System</strong>, each <strong>LED Module</strong> contains red, green,
                      and blue LEDs. A controller or sending card receives the video source, the receiving card
                      distributes display data, and the power supply keeps every module running with stable DC power.
                      This coordinated hardware process allows an <strong>LED Screen</strong> to show bright,
                      seamless, high-impact content at almost any custom size.
                    </p>
                    <p>
                      Businesses choose <strong>LED Display in Bangladesh</strong> for retail branding, showroom
                      promotion, corporate reception areas, command centers, stage programs, public information
                      boards, <strong>Digital Signage</strong>, <strong>Digital Billboard</strong> advertising, and
                      large <strong>LED Video Wall</strong> installations. Indoor LED Display solutions are designed
                      for close viewing, smoother detail, and controlled lighting environments, while Outdoor LED
                      Display systems use higher brightness, stronger cabinets, weather-ready protection, and safer
                      mounting plans for daylight and outdoor exposure. Whether the project is a compact indoor
                      signage screen or a roadside outdoor display, the final performance depends on matching the LED
                      module, cabinet, controller, receiving card, cables, steel structure, and power supply correctly.
                    </p>
                  </>
                </MobileIntroText>

	                <aside className="mt-5 rounded-[18px] border border-[#FF6A00]/20 bg-orange-50/70 p-4 shadow-sm md:mt-6 md:rounded-2xl md:p-5">
	                  <h3 className="text-[1rem] font-extrabold leading-[1.3] text-slate-900 md:text-lg">
	                    Every LED Display Is Built Using Multiple Hardware Components
	                  </h3>
	                  <p className="mt-2.5 text-justify text-[13px] leading-6 text-slate-700 md:mt-3 md:text-left md:text-sm md:leading-7">
	                    A professional LED display is not just a screen. It is a complete electronic display system
	                    consisting of multiple hardware components that work together to deliver stable performance,
	                    accurate colors, seamless video playback, and long-term reliability.
	                  </p>
	                </aside>
	              </div>

	              <div ref={componentSectionRef}>
	                <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
                    <UiIcon name="module" className="h-6 w-6 text-slate-800" />
                    <span>Main Components of an LED Display System</span>
                  </h2>
                  <MobileIntroText
                    teaser="Every professional LED display system is built using several essential hardware components."
                    className="mt-3 max-w-5xl"
                    teaserClassName="w-full"
                    expandedClassName="text-sm leading-7 text-slate-600"
                    desktopClassName="text-sm leading-7 text-slate-600 md:text-[15px] md:leading-8"
                  >
                    <>Every professional LED display system is built using several essential hardware components. Each component performs a specific function to ensure stable operation, high image quality, and reliable long-term performance.</>
                  </MobileIntroText>

                  <div
                    ref={componentCarouselRef}
                    onScroll={handleComponentCarouselScroll}
                    className="mt-6 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-2 md:items-stretch md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-3"
                  >
                    {ledDisplayComponentCards.map((component, index) => (
                      <article
                        key={component.name}
                        className={`group flex w-[86%] shrink-0 snap-start flex-col rounded-[20px] border px-3.5 py-3 transition duration-300 md:h-full md:w-auto md:shrink md:snap-normal md:rounded-2xl md:border-slate-200 md:bg-none md:bg-white md:p-5 md:shadow-sm md:hover:-translate-y-1 md:hover:border-[#FF6A00]/50 md:hover:shadow-md ${componentMobileCardStyles[index % componentMobileCardStyles.length]}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/75 bg-white/85 text-[#F56605] shadow-sm md:h-12 md:w-12 md:rounded-2xl md:border-[#FF6A00]/20 md:bg-orange-50 md:text-[#FF6A00] md:shadow-none md:transition md:group-hover:bg-[#FF6A00] md:group-hover:text-white">
                            <UiIcon name={component.icon} className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                          <h3 className="min-w-0 flex-1 text-[16px] font-extrabold leading-tight tracking-tight text-slate-900 md:flex-none md:text-lg md:leading-snug md:tracking-normal">
                            {component.name}
                          </h3>
                        </div>
                        <p className="mt-2.5 text-[12.5px] leading-[1.55] text-slate-700 md:mt-3 md:text-sm md:leading-7 md:text-slate-600">{component.description}</p>
                      </article>
                    ))}
                  </div>

                  <div className="mt-2.5 flex justify-center gap-1.5 md:hidden">
                    {ledDisplayComponentCards.map((component, index) => (
                      <button
                        key={component.name}
                        type="button"
                        onClick={() => {
                          scrollComponentCarouselToIndex(index);
                          setActiveComponentSlide(index);
                        }}
                        className={`h-1.5 rounded-full transition-all ${activeComponentSlide === index ? "w-6 bg-[#F56605]" : "w-1.5 bg-slate-300"}`}
                        aria-label={`Go to ${component.name}`}
                      />
                    ))}
                  </div>

	              </div>

	              <div>
	                <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
                    <UiIcon name="process" className="h-6 w-6 text-slate-800" />
                    <span>How an LED Display System Works</span>
                  </h2>
	                <MobileIntroText
                    teaser="A professional LED display operates through the seamless communication of multiple hardware components."
                    className="mt-3 max-w-5xl"
                    teaserClassName="w-full"
                    expandedClassName="text-sm leading-7 text-slate-600"
                    desktopClassName="text-sm leading-7 text-slate-600 md:text-[15px] md:leading-8"
                  >
                    <>
                      A professional LED display operates through the seamless communication of multiple hardware
                      components. The diagram below illustrates how video signals and electrical power travel through the
                      complete LED display system.
                    </>
                  </MobileIntroText>

	                <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
	                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
	                    <h3 className="text-[1rem] font-extrabold text-slate-900 md:text-lg">Signal Flow</h3>
	                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
	                      {ledDisplaySignalFlow.map((step, index) => (
	                        <div key={step} className="flex items-stretch gap-2 md:gap-3">
	                          <div
                              className={`flex min-h-[3.55rem] flex-1 items-center justify-center rounded-xl border px-2.5 py-3 text-center text-[12px] font-bold leading-5 text-slate-800 shadow-sm md:min-h-16 md:rounded-2xl md:px-3 md:py-4 md:text-sm md:leading-6 ${
                                index % 4 === 0
                                  ? "border-sky-200/80 bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_52%,#e0f2fe_100%)]"
                                  : index % 4 === 1
                                    ? "border-violet-200/80 bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_52%,#ede9fe_100%)]"
                                    : index % 4 === 2
                                      ? "border-emerald-200/80 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_52%,#d1fae5_100%)]"
                                      : "border-orange-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_52%,#ffedd5_100%)]"
                              }`}
                            >
	                            {step}
	                          </div>
	                          {index < ledDisplaySignalFlow.length - 1 ? (
	                            <div className="hidden items-center text-sm font-extrabold text-[#FF6A00] sm:flex">
	                              -&gt;
	                            </div>
	                          ) : null}
	                        </div>
	                      ))}
	                    </div>
	                  </div>

	                  <div className="self-start rounded-2xl border border-slate-200 bg-slate-50 p-4">
	                    <h3 className="text-[1rem] font-extrabold text-slate-900 md:text-lg">Power Flow</h3>
	                    <div className="mt-3 grid gap-2">
	                      {ledDisplayPowerFlow.map((step, index) => (
	                        <div
                            key={step}
                            className={`relative flex flex-col items-center ${
                              index < ledDisplayPowerFlow.length - 1 ? "pb-3.5 md:pb-4" : ""
                            }`}
                          >
	                          <div className="mx-auto flex min-h-11 w-full max-w-[17.5rem] items-center justify-center rounded-lg border border-cyan-200/75 bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_54%,#cffafe_100%)] px-2 py-2 text-center text-[11px] font-bold leading-4 text-slate-800 shadow-sm md:mx-0 md:min-h-12 md:max-w-none md:flex-1 md:rounded-2xl md:border-slate-200 md:bg-white md:px-3 md:text-sm md:leading-6">
	                            {step}
	                          </div>
                            {index < ledDisplayPowerFlow.length - 1 ? (
	                            <div
                                className="absolute bottom-0 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center text-base font-extrabold leading-none text-[#FF6A00] md:h-5 md:w-5 md:text-lg"
                                aria-hidden="true"
                              >
                                ↓
                              </div>
                            ) : null}
	                        </div>
	                      ))}
	                    </div>
	                  </div>
	                </div>

	                <p className="mt-5 hidden rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 md:block">
	                  Every component inside an LED display system performs a dedicated function. The controller processes
	                  video signals, the receiving card distributes display data, the SMPS supplies stable power, while FRC
	                  and CAT6 cables ensure reliable communication between all components. Together they deliver smooth
	                  video playback, vibrant colors, stable operation, and long-term performance for both indoor and
	                  outdoor LED display installations.
	                </p>
	              </div>
	            </div>
	          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="display" className="h-6 w-6 text-slate-800" />
              <span>Types of LED Display Technology</span>
            </h2>
            <MobileIntroText
              teaser="Choosing the right LED display technology helps improve visual quality, durability, and long-term value."
              className="mt-3"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                Choosing the right LED display technology helps improve visual quality, durability, and long-term value.
                Below is a practical comparison of common technologies used in Bangladesh for indoor, outdoor, rental,
                and commercial LED screen projects.
              </>
            </MobileIntroText>

            <div className="mt-5 grid gap-3 md:mt-6 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">SMD LED</h3>
                <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                  SMD (Surface-Mounted Device) is the most common LED display technology where red, green, and blue
                  LEDs are integrated into a single package. It offers vibrant colors, wide viewing angles, and excellent
                  image quality for indoor and commercial LED displays.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  <li>Good viewing angle and color uniformity for indoor and semi-outdoor usage.</li>
                  <li>Popular for retail branding, conference rooms, showrooms, and stage backdrops.</li>
                  <li>Supports a wide range of pixel pitch options for different viewing distances.</li>
                  <li>Cost-effective and widely available for new installation and maintenance support.</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">GOB LED</h3>
                <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                  GOB (Glue-on-Board) is an LED technology that adds a transparent protective layer over the LED surface.
                  This improves resistance to dust, moisture, and impact, making it ideal for durable indoor LED display
                  applications.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  <li>Better physical protection compared with standard exposed LED module surfaces.</li>
                  <li>Useful for schools, shopping malls, transport hubs, and high-traffic indoor zones.</li>
                  <li>Helps reduce risk of dead pixels caused by accidental touch or minor impact.</li>
                  <li>A practical option when reliability and panel safety are top priorities.</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">COB LED</h3>
                <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                  COB (Chip-on-Board) mounts LED chips directly onto the circuit board, enabling finer pixel pitch and
                  better visual performance. It is widely used in premium indoor LED video walls, control rooms, and
                  corporate display solutions.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  <li>Suitable for fine-pitch indoor LED wall requirements and close-distance viewing.</li>
                  <li>Offers strong black level performance and improved perceived contrast in many setups.</li>
                  <li>Common in control rooms, corporate lobbies, studios, and command center environments.</li>
                  <li>Typically considered for premium projects with long-term professional usage goals.</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">Micro LED</h3>
                <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                  Micro LED uses ultra-small LED chips to deliver exceptional brightness, contrast, and image clarity. It is
                  considered one of the most advanced display technologies for high-end indoor visual experiences.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  <li>Excellent brightness uniformity and contrast for flagship indoor installs.</li>
                  <li>Very fine pixel pitch options for close-view premium environments.</li>
                  <li>Energy-efficient with long service life for enterprise-grade deployments.</li>
                  <li>Used in luxury showrooms, broadcast studios, and high-end control rooms.</li>
                </ul>
              </article>
            </div>

            <p className="mt-5 hidden text-sm leading-7 text-slate-600 md:block">
              Final technology selection depends on location, viewing distance, expected brightness, maintenance plan,
              and budget. For best results, compare SMD, GOB, and COB options based on real project conditions instead
              of choosing only by headline specification.
            </p>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="compare" className="h-6 w-6 text-slate-800" />
              <span>LED Display vs Projector vs LCD Video Wall in Bangladesh</span>
            </h2>
            <MobileIntroText
              teaser="Compare LED display vs projector vs LCD video wall in Bangladesh to choose the right display solution for your business or project."
              className="mt-2"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                Compare LED display vs projector vs LCD video wall in Bangladesh to choose the right display solution
                for your business, showroom, office, conference room, control room, retail space, or event setup. This
                quick comparison highlights brightness, image clarity, viewing distance, maintenance needs, and long-term
                operating cost so you can choose the best option for digital signage, presentation, advertising, or video
                wall use.
              </>
            </MobileIntroText>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {ledCompare.map((item) => (
                <div key={item.t} className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                  <h3 className="text-[1rem] font-semibold leading-[1.3] text-slate-900 md:text-lg">{item.t}</h3>
                  <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">{item.d}</p>
                  <ul className="mt-4 space-y-2 text-[13px] text-slate-700 md:text-sm">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
                        <span className="text-justify leading-6 md:text-left md:leading-7">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-8 pb-[25px]">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="cost" className="h-6 w-6 text-slate-800" />
              <span>Benefits of Digital LED Display for Advertising</span>
            </h2>
            <MobileIntroText
              teaser="Digital LED signage for outdoor advertising improves visibility, message control, and campaign performance for brands in Bangladesh."
              className="mt-3"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                Digital LED signage for outdoor advertising improves visibility, message control, and campaign performance
                for brands in Bangladesh. It enables high-brightness display output for daylight readability, faster
                content updates for time-sensitive promotions, and measurable communication impact across roadsides,
                commercial zones, and public locations. With better audience attention and flexible scheduling, outdoor
                LED signage helps businesses run more effective, scalable, and cost-efficient advertising campaigns.
              </>
            </MobileIntroText>
            <div className="mt-5 grid gap-3 md:grid-cols-2 md:gap-4">
              {outdoorSignageBenefits.map((item, idx) => (
                <div
                  key={item.t}
                  className="rounded-[20px] border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-3xl md:p-5"
                  style={{ borderColor: "rgba(255,106,0,0.16)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: "#FF6A00" }}
                    >
                      {idx + 1}
                    </span>
                    <h3 className="text-[15px] font-extrabold leading-5 text-slate-900 md:text-base">{item.t}</h3>
                  </div>
                  <p className="mt-2.5 text-justify text-[13px] leading-6 text-slate-600 md:mt-3 md:text-left md:text-sm md:leading-7">{item.d}</p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[13px] text-slate-700 md:text-sm">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                        <span className="text-justify leading-6 md:text-left">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="solutions" className="h-6 w-6 text-slate-800" />
              <span>LED Technology &amp; Component Brands</span>
            </h2>
            <MobileIntroText
              teaser="We use globally trusted LED display components in Bangladesh projects to ensure stable performance, reliable power, and long-term support."
              className="mt-2"
              teaserClassName="w-full"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-sm leading-7 text-slate-600"
            >
              <>
                We use globally trusted LED display components in Bangladesh projects with{" "}
                {visibleTrustedTechPartnerLogos.map((b, idx) => (
                  <span key={b.name}>
                    <span className="font-bold text-slate-900" title={b.name} aria-label={b.name}>
                      {b.name}
                    </span>
                    {idx < visibleTrustedTechPartnerLogos.length - 2 ? ", " : idx === visibleTrustedTechPartnerLogos.length - 2 ? ", and " : ""}
                  </span>
                ))}{" "}
                to ensure stable performance, reliable power, and long-term support.
              </>
            </MobileIntroText>

            <div className="mt-6 rounded-3xl border bg-white p-4 md:p-5" style={{ borderColor: "rgba(255,106,0,0.12)" }}>
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14" style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14" style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

                <div className="group">
                  <div className="flex w-max animate-[renexMarquee_42s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                    {[false, true].map((isClone) => (
                      <div
                        key={isClone ? "visual-clone-track" : "canonical-track"}
                        className="flex gap-3 pr-3"
                        aria-hidden={isClone ? "true" : undefined}
                        inert={isClone ? true : undefined}
                        role={isClone ? "presentation" : undefined}
                      >
                        {visibleTrustedTechPartnerLogos.map((b) => (
                          <div
                            key={`${b.name}-${isClone ? "visual-clone" : "canonical"}`}
                            className="flex h-16 w-40 shrink-0 items-center justify-center rounded-[20px] border bg-white px-4 shadow-sm"
                            style={{ borderColor: "rgba(255,106,0,0.12)" }}
                            title={isClone ? undefined : b.name}
                            aria-label={isClone ? undefined : b.name}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={b.src}
                              alt={isClone ? "" : b.name}
                              aria-hidden={isClone ? "true" : undefined}
                              className={
                                b.name === "G-Energy"
                                  ? "h-12 w-auto max-w-[152px] object-contain"
                                  : b.name === "LianTronics"
                                    ? "h-9 w-auto max-w-[148px] object-contain"
                                    : b.name === "AOTO Electronics"
                                      ? "h-10 w-auto max-w-[132px] object-contain"
                                      : b.name === "Lampro"
                                    ? "h-9 w-auto max-w-[136px] object-contain"
                                    : b.name === "Huidu"
                                      ? "h-10 w-auto max-w-[145px] object-contain"
                                      : b.name === "NovaStar"
                                        ? "h-10 w-auto max-w-[150px] object-contain"
                                        : b.name === "Mugnee Multiple Limited"
                                          ? "h-10 w-auto max-w-[156px] object-contain"
                                          : b.name === "Renex Digital"
                                            ? "h-12 w-full max-w-none object-cover object-center"
                                        : "h-10 w-auto max-w-[146px] object-contain"
                              }
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-700 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
                {[
                  "Quality-focused workflow",
                  "Project-specific technical planning",
                  "Industry-grade components",
                  "Project-based support & service",
                ].map((t) => (
                  <span
                    key={t}
                    className="shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-semibold text-[#9A3412] shadow-sm md:text-xs"
                    style={{
                      borderColor: "rgba(255,106,0,0.14)",
                      background: "linear-gradient(180deg, rgba(255,247,237,1) 0%, rgba(255,237,213,0.92) 100%)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="text-sm font-semibold" style={{ color: "#FF6A00" }}>
              Reliability, Compliance, Long-Term Support
            </div>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="w-full">
                <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 text-slate-700"
                    style={{ borderColor: "rgba(255,106,0,0.2)" }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
                      <path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
                      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Our Valuable Clients</span>
                </h2>
                <MobileIntroText
                  teaser="We provide professional LED display and LED screen solutions designed for institutional requirements with clear visibility, stable performance, and dependable after-sales support."
                  className="mt-2 w-full"
                  teaserClassName="w-full"
                  expandedClassName="text-justify text-slate-600 leading-7"
                  desktopClassName="w-full text-justify text-slate-600 leading-7"
                >
                  <>
                    We provide professional LED display and LED screen solutions designed for institutional requirements - clear visibility, stable performance, safe installation, and dependable after-sales support. We are honored to have worked with clients such as <span className="font-bold text-slate-900">Ministry of Health and Family Welfare</span>, <span className="font-bold text-slate-900">National Board of Revenue (Bangladesh)</span>, <span className="font-bold text-slate-900">Bangladesh Election Commission</span>, <span className="font-bold text-slate-900">Department of Immigration &amp; Passports</span>, <span className="font-bold text-slate-900">Bangladesh Public Service Commission</span>, <span className="font-bold text-slate-900">Anti-Corruption Commission (ACC)</span>, <span className="font-bold text-slate-900">Dhaka North City Corporation</span>, <span className="font-bold text-slate-900">Dhaka South City Corporation</span>, <span className="font-bold text-slate-900">Sonali Bank PLC</span>, and <span className="font-bold text-slate-900">Bangladesh Road Transport Authority (BRTA)</span>.
                  </>
                </MobileIntroText>
              </div>
            </div>

            <div className="mt-6 hidden gap-3 md:grid md:grid-cols-4">
              {ledTrustedCards.map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border bg-slate-50 p-4 text-sm font-semibold text-slate-800"
                  style={{ borderColor: "rgba(255,106,0,0.07)" }}
                >
                  {x}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border bg-white p-4 md:p-5" style={{ borderColor: "rgba(255,106,0,0.12)" }}>
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 md:w-14" style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 md:w-14" style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

                <div className="group">
                  <div className="flex w-max animate-[renexMarquee_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                    {[false, true].map((isClone) => (
                      <div
                        key={isClone ? "visual-clone-client-track" : "canonical-client-track"}
                        className="flex gap-3 pr-3"
                        aria-hidden={isClone ? "true" : undefined}
                        inert={isClone ? true : undefined}
                        role={isClone ? "presentation" : undefined}
                      >
                        {ledTrustedInstitutions.map((ins) => (
                          <div
                            key={`${ins.name}-${isClone ? "visual-clone" : "canonical"}`}
                            className="flex h-[112px] w-[136px] shrink-0 flex-col items-center justify-center rounded-[20px] border bg-slate-50 px-3 py-3 text-center shadow-sm md:h-[124px] md:w-[168px] md:px-4"
                            style={{ borderColor: "rgba(255,106,0,0.10)" }}
                            title={isClone ? undefined : ins.name}
                            aria-label={isClone ? undefined : ins.name}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={ins.logo}
                              alt={isClone ? "" : ins.name}
                              aria-hidden={isClone ? "true" : undefined}
                              className="h-12 w-full object-contain md:h-14"
                              loading="lazy"
                            />
                            <p className="mx-auto mt-2 line-clamp-2 max-w-[112px] !text-center text-[11px] font-medium leading-4 tracking-normal text-slate-800 ![text-align-last:center] md:max-w-[138px] md:text-[12px] md:leading-[1.15rem]">{ins.name}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="led-faq" className="scroll-mt-24 pt-8 pb-[25px]">
            <h2 className="flex items-center gap-2 text-[1.45rem] font-bold leading-[1.25] text-slate-900 md:text-2xl">
              <UiIcon name="faq" className="h-6 w-6 text-slate-800" />
              <span>Frequently Asked Questions About LED Display</span>
            </h2>
            <div className="mt-5">
              <FaqAccordion accent={BRAND.maroon} density="compact" items={ledFaqs} columns={2} />
            </div>

          </section>

          <section className="pb-[25px] pt-2">
            <div
              className="rounded-[24px] px-4 py-6 text-center md:px-5 md:py-7"
            >
              <div className="mx-auto max-w-3xl">
                <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-slate-900 md:text-[32px]">
                  Need a complete LED display solution?
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-justify text-[13px] leading-6 text-slate-600 md:text-center md:text-[15px] md:leading-8">
                  Share your requirement or BOQ and we will suggest a practical solution path covering screen type,
                  controller, power, structure, installation scope, and support planning for your project.
                </p>
                <div className="mt-5 flex justify-center">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-[14px] bg-[#081B44] px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(8,27,68,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0B255B] hover:shadow-[0_18px_34px_rgba(8,27,68,0.26)]"
                  >
                    WhatsApp project details
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const pathname = usePathname();
  const ledOnly = pathname === "/led-display" || pathname === "/led-display/";
  const basePath = "/led-display" as const;

  return <ProductsPageContent ledOnly={ledOnly} basePath={basePath} />;
}
