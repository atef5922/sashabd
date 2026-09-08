// app/products/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import LedDisplayHero from "@/components/led-display/LedDisplayHero";
import { ledDisplayProjects } from "@/app/projects/projectData";
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

const ledInformationSectionClass =
  "mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6";

const ledFeatureSectionClass =
  "mt-4 rounded-2xl border border-[#dce7f6] bg-[linear-gradient(110deg,#f5f8fd_0%,#fbfcfe_52%,#f1f6fd_100%)] px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6";

const ledSectionTitleClass =
  "!text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[26px]";

const LED_PRICE_VERIFIED_DATE = "08 September 2026";

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

function getProductPriceRange(product: UnifiedProduct): { min: number; max: number } | null {
  const priceText = product.priceLine ?? product.priceLabel ?? "";
  if (!priceText || /request|contact|call/i.test(priceText)) return null;
  const prices = [...priceText.matchAll(/\d[\d,]*(?:\.\d+)?/g)]
    .map((match) => Number(match[0].replace(/,/g, "")))
    .filter(Number.isFinite);
  if (!prices.length) return null;
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

function getProductStartingPrice(product: UnifiedProduct): number | null {
  return getProductPriceRange(product)?.min ?? null;
}

function matchesLedPriceBand(product: UnifiedProduct, band: LedPriceBand): boolean {
  const productRange = getProductPriceRange(product);
  if (band === "request") return productRange === null;
  if (productRange === null) return false;
  const range = LED_PRICE_BANDS.find((item) => item.id === band);
  if (!range) return true;
  return (
    (range.min === undefined || productRange.max >= range.min) &&
    (range.max === undefined || productRange.min <= range.max)
  );
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
        className={`relative block h-[190px] shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 sm:h-[205px] ${isLedDisplay ? "bg-slate-100" : "bg-white"}`}
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

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <h3 className="mt-1 line-clamp-2 min-h-10 text-left text-[15px] font-extrabold leading-5 text-[#071936]">
          <Link
            prefetch={false}
            href={product.href}
            className="rounded-sm underline-offset-4 transition-colors hover:text-orange-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
          >
            {product.title}
          </Link>
        </h3>

        <ul className="mt-3 min-h-[4rem] space-y-1.5" aria-label={`Key features of ${product.title}`}>
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
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 3.5 19 6v5.4c0 4.3-2.8 7.4-7 9.1-4.2-1.7-7-4.8-7-9.1V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m9.2 12 1.8 1.8 3.8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chip":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function LedSectionHeading({
  icon,
  children,
  id,
}: {
  icon: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <h2 id={id} className={`${ledSectionTitleClass} flex items-center gap-2.5`}>
      <LedPremiumTitleIcon icon={icon} />
      <span className="min-w-0 text-balance">{children}</span>
    </h2>
  );
}

function LedPremiumTitleIcon({ icon }: { icon: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#cfe0ff] bg-gradient-to-br from-[#eaf2ff] to-white text-[#1458e5] shadow-sm"
    >
      <UiIcon name={icon} className="h-5 w-5" />
    </span>
  );
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
  currentYear,
}: {
  ledOnly?: boolean;
  basePath: "/led-display";
  currentYear: number;
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
    "border-[#d5e3f8] bg-[linear-gradient(180deg,#f3f7ff_0%,#ffffff_50%,#eaf2ff_100%)] shadow-[0_14px_34px_rgba(20,88,229,0.09)]",
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
        if (ledMinPrice !== null && ledMaxPrice !== null && ledMinPrice > ledMaxPrice) return false;
        const productRange = getProductPriceRange(p);
        if (productRange === null) return false;
        if (ledMinPrice !== null && productRange.max < ledMinPrice) return false;
        if (ledMaxPrice !== null && productRange.min > ledMaxPrice) return false;
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
  const ledManualPriceCeiling = Math.max(ledMinPrice ?? 0, ledMaxPrice ?? 0);
  const ledSliderScaleMax = ledManualPriceCeiling > LED_PRICE_SLIDER_MAX
    ? Math.ceil((ledManualPriceCeiling * 1.1) / 500) * 500
    : LED_PRICE_SLIDER_MAX;
  const ledSliderMinValue = Math.min(ledMinPrice ?? 0, ledSliderScaleMax);
  const ledSliderMaxValue = Math.min(ledMaxPrice ?? ledSliderScaleMax, ledSliderScaleMax);
  const ledSliderLowerPercent = (Math.min(ledSliderMinValue, ledSliderMaxValue) / ledSliderScaleMax) * 100;
  const ledSliderUpperPercent = (Math.max(ledSliderMinValue, ledSliderMaxValue) / ledSliderScaleMax) * 100;
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
    const value = parsed !== null && Number.isSafeInteger(parsed) && parsed >= 0
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
      q: "What is included in the published LED display price?",
      a: `The published per-square-foot price includes LED modules, cabinets, controller, power supplies, complete display components, structure, installation, transportation, VAT, and a 1-year LED display warranty. Final quotation is confirmed after the site survey, actual screen size, pixel pitch, installation requirements, and final BOQ. Prices were last verified on ${LED_PRICE_VERIFIED_DATE}.`,
    },
    {
      q: "Which brands do you use for LED modules and components?",
      a: "We propose brands based on availability, project budget, and compatibility with the selected control system. Final brand selection depends on performance target and after-sales support planning.",
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
    { name: "Ministry of Health and Family Welfare", logo: "/assets/clients/organizations/Health-and-family-welfare.webp", href: "https://mohfw.gov.bd/" },
    { name: "National Board of Revenue, Bangladesh", logo: "/assets/clients/organizations/nbr.webp", href: "https://nbr.portal.gov.bd/" },
    { name: "Bangladesh Election Commission", logo: "/assets/clients/organizations/ecs.webp", href: "https://ecs.gov.bd/" },
    { name: "Department of Immigration & Passports", logo: "/assets/clients/organizations/passport.webp", href: "https://dip.gov.bd/" },
    { name: "Bangladesh Public Service Commission", logo: "/assets/clients/organizations/bpsc.webp", href: "https://bpsc.gov.bd/" },
    { name: "Anti-Corruption Commission (ACC)", logo: "/assets/clients/organizations/acc.webp", href: "https://acc.org.bd/" },
    { name: "Dhaka North City Corporation", logo: "/assets/clients/organizations/dncc.webp", href: "https://dncc.gov.bd/" },
    { name: "Dhaka South City Corporation", logo: "/assets/clients/organizations/dscc.webp", href: "https://dscc.gov.bd/" },
    { name: "Sonali Bank PLC", logo: "/assets/clients/organizations/sonali-bank.webp", href: "https://www.sonalibank.com.bd/" },
    { name: "Bangladesh Small and Cottage Industries Corporation (BSCIC)", logo: "/assets/clients/organizations/BSCIC.webp", href: "https://bscic.gov.bd/" },
    { name: "Fire Service and Civil Defence Bangladesh", logo: "/assets/clients/organizations/fire-service.webp", href: "https://fireservice.gov.bd/" },
    { name: "University Grants Commission of Bangladesh", logo: "/assets/clients/organizations/ugc.webp", href: "https://ugc.gov.bd/" },
    { name: "Bangladesh Ansar and Village Defence Party", logo: "/assets/clients/organizations/ansar.webp", href: "https://ansarvdp.gov.bd/" },
    { name: "Bangladesh House Building Finance Corporation", logo: "/assets/clients/organizations/bhbfc-logo-final.webp", href: "https://bhbfc.gov.bd/" },
    { name: "Dhaka Electric Supply Company Limited (DESCO)", logo: "/assets/clients/organizations/bpatc.webp", href: "https://bpatc.gov.bd/" },
  ];
  const trustedTechPartnerLogos: Array<{ name: string; src: string; href?: string }> = [
    { name: "Absen", src: "/assets/brands/led-display/absen.webp", href: "https://www.absen.com/" },
    { name: "Unilumin", src: "/assets/brands/led-display/unilumin.webp", href: "https://www.unilumin.com/" },
    { name: "Leyard", src: "/assets/brands/led-display/leyard.webp", href: "https://www.leyardhk.com/" },
    { name: "LianTronics", src: "/assets/brands/led-display/liantronics.png", href: "https://www.liantronics.com/" },
    { name: "AOTO Electronics", src: "/assets/brands/led-display/aoto-electronics.webp", href: "https://en.aoto.com/" },
    { name: "G-Energy", src: "/assets/brands/led-display/g-energy.webp" },
    { name: "Lampro", src: "/assets/brands/led-display/lampro.webp", href: "https://www.lampro.net/" },
    { name: "NovaStar", src: "/assets/brands/led-display/novastar.webp", href: "https://www.novastar.tech/" },
    { name: "Huidu", src: "/assets/brands/led-display/huidu.webp", href: "https://www.huidu.cn/" },
    { name: "Colorlight", src: "/assets/brands/led-display/colorlight.webp", href: "https://en.colorlightinside.com/" },
    { name: "Mean Well", src: "/assets/brands/led-display/mean-well.webp", href: "https://www.meanwell.com/" },
    { name: "Mugnee Multiple Limited", src: "/assets/brands/led-display/mugnee.webp", href: "https://www.mugnee.com/" },
    { name: "Renex Digital", src: "/assets/brands/led-display/renex-exact.webp", href: "https://renex.com.bd/" },
  ];
  const visibleTrustedTechPartnerLogos = trustedTechPartnerLogos.filter(
    (brand) => !["Absen", "Unilumin"].includes(brand.name)
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

  const pitchValueFromLabel = (label: string): number => {
    const value = Number(label.match(/\d+(?:\.\d+)?/)?.[0]);
    return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
  };

  const formatPriceTablePitch = (pitch: string): string => {
    const match = pitch.match(/(\d+(?:\.\d+)?)/);
    if (!match?.[1]) return pitch;
    return `P${match[1].replace(/\.0$/, "")}`;
  };

  const indoorBestUse = (pitch: string): string => {
    const value = Number(pitch.match(/\d+(?:\.\d+)?/)?.[0]);
    if (value <= 1.53) return "Control rooms, studios";
    if (value <= 1.86) return "Conference rooms, retail";
    if (value <= 2) return "Meeting rooms, showrooms";
    if (value <= 2.5) return "Offices, classrooms";
    if (value <= 3.1) return "Auditoriums, halls";
    return "Large halls, stage backdrops";
  };

  const outdoorBestUse = (pitch: string): string => {
    const value = Number(pitch.match(/\d+(?:\.\d+)?/)?.[0]);
    if (value <= 2.5) return "Storefronts, premium billboards";
    if (value <= 3.1) return "Outdoor ads, commercial facades";
    if (value <= 4) return "Roadside screens";
    if (value <= 5) return "Highways, stadiums";
    if (value <= 6) return "Large outdoor screens";
    return "Billboards, stages, long viewing";
  };

  const hiddenOutdoorPriceSlugs = new Set<string>([
    "p3-076-outdoor-led-display-module",
    "p8-outdoor-led-display-module",
    "p10-outdoor-led-display-module",
  ]);

  const outdoorPriceRows = [...outdoorCatalog]
    .filter((p) => !hiddenOutdoorPriceSlugs.has(p.slug))
    .sort((a, b) => pitchValueFromLabel(pitchLabelForOutdoorPriceRow(a)) - pitchValueFromLabel(pitchLabelForOutdoorPriceRow(b)))
    .map((p) => ({
      title: p.title,
      pitch: pitchLabelForOutdoorPriceRow(p),
      bestUse: outdoorBestUse(pitchLabelForOutdoorPriceRow(p)),
      href: `${basePath}/outdoor/${p.slug}/`,
      price: getLedDisplayTablePrice(p.slug) ?? "Request updated quote",
    }));

  const hiddenIndoorPriceSlugs = new Set<string>(["p1-667-indoor-led-display", "p3-076-indoor-led-display"]);

  const indoorPriceRows = [...indoorCatalog]
    .filter((p) => !hiddenIndoorPriceSlugs.has(p.slug))
    .sort((a, b) => pitchValueFromTitle(a.title) - pitchValueFromTitle(b.title))
    .map((p) => ({
      title: p.title,
      pitch: pitchLabelFromTitle(p.title),
      bestUse: indoorBestUse(pitchLabelFromTitle(p.title)),
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
        className={
          ledOnly
            ? "led-display-page mx-auto mb-6 w-full max-w-[clamp(80rem,90vw,108rem)] px-4 md:px-6"
            : "mx-auto w-full max-w-7xl space-y-12 px-[10px] md:px-6"
        }
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
        {ledOnly ? <LedDisplayHero currentYear={currentYear} /> : null}
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
      <section
        className={
          ledOnly
            ? "mt-4 w-full px-4 py-5 sm:px-5 md:px-6"
            : "mt-3 space-y-3 bg-transparent p-0 shadow-none"
        }
      >
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

            <div className="grid gap-4 lg:grid-cols-[15.5rem_minmax(0,1fr)]">
              <aside
                id="led-product-filters"
                aria-label="LED display product filters"
                className={`${mobileFiltersOpen ? "flex" : "hidden"} flex-col self-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.045)] lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100dvh-6rem)]`}
              >
                <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2 pt-4">
                  <div className="text-lg font-extrabold leading-5 tracking-tight text-[#071936]">Filter Products</div>
                  <div className="flex items-center gap-2">
                    {ledActiveFilterCount || query ? (
                      <button type="button" onClick={clearLedFilters} className="cursor-pointer text-[11px] font-bold text-orange-700 hover:underline">Clear All</button>
                    ) : null}
                    <button type="button" aria-label="Close product filters" onClick={() => setMobileFiltersOpen(false)} className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 lg:hidden">×</button>
                  </div>
                </div>

                <div className="hidden shrink-0 px-4 pb-2 lg:block">
                  <label className="relative block min-w-0">
                    <span className="sr-only">Search LED display products</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-3 top-3.5 h-4 w-4 fill-none text-slate-400">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => { setQuery(event.target.value); resetResultsToFirstPage(); }}
                      placeholder="Search products..."
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-8 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                    />
                    {query ? (
                      <button type="button" aria-label="Clear product search" onClick={() => { setQuery(""); resetResultsToFirstPage(); }} className="absolute right-2 top-2 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-base text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40">×</button>
                    ) : null}
                  </label>
                </div>

                <div className="min-h-0 px-4 pb-3 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-gutter:stable]">
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
                          style={{ left: `calc(${ledSliderLowerPercent}% + 0.25rem)`, right: `calc(${100 - ledSliderUpperPercent}% + 0.25rem)` }}
                          aria-hidden="true"
                        />
                        <input
                          type="range"
                          min={0}
                          max={ledSliderScaleMax}
                          step={500}
                          value={ledSliderMinValue}
                          onChange={(event) => changeLedCustomPrice("min", event.currentTarget.value === "0" ? "" : event.currentTarget.value)}
                          aria-label="Minimum LED product price"
                          className="pointer-events-none absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F56605] [&::-moz-range-thumb]:shadow [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-0.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F56605] [&::-webkit-slider-thumb]:shadow"
                        />
                        <input
                          type="range"
                          min={0}
                          max={ledSliderScaleMax}
                          step={500}
                          value={ledSliderMaxValue}
                          onChange={(event) => changeLedCustomPrice("max", event.currentTarget.value === String(ledSliderScaleMax) ? "" : event.currentTarget.value)}
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
                            step={500}
                            value={ledMaxPrice ?? ""}
                            onChange={(event) => changeLedCustomPrice("max", event.currentTarget.value)}
                            placeholder="Any"
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

              <div data-led-product-listing className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 xl:flex-row xl:items-end xl:justify-between">
                  <div className="min-w-0">
                    <h2 className={ledSectionTitleClass}>Featured LED Display Products</h2>
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
                  <div className="mt-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
        <section className={ledInformationSectionClass} aria-labelledby="led-full-product-list-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <LedSectionHeading id="led-full-product-list-heading" icon="display">
                Browse All LED Display Products
              </LedSectionHeading>
                <p className="home-section-subtitle mt-2 max-w-3xl text-left leading-6 text-slate-600">
                Explore the complete LED display directory by category and open any model page directly.
              </p>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-[#cfe0ff] bg-[#edf4ff] px-3 py-1.5 text-xs font-extrabold text-[#1458e5]">
              {ledCatalogProducts.length} products
            </span>
          </div>

          <details className="group mt-4 overflow-hidden rounded-xl border border-[#dbe5f2] bg-[#f8fbff]">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 transition hover:bg-[#f1f6fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1458e5]/40 sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1458e5] text-white shadow-[0_5px_14px_rgba(20,88,229,0.22)]" aria-hidden="true">
                  <UiIcon name="guide" className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-extrabold text-[#071936]">View complete product directory</span>
                  <span className="mt-0.5 hidden text-xs leading-5 text-slate-600 sm:block">{fullListGroups.length} categories with direct links to every LED product</span>
                </span>
              </span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfe0ff] bg-white text-[#1458e5] shadow-sm transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>

            <nav aria-label="Full LED display product list" className="border-t border-[#dbe5f2] bg-white p-3 sm:p-4 md:p-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {fullListGroups.map((group) => (
                  <div key={group.kind} className="min-w-0 rounded-xl border border-[#dce7f6] bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] p-3.5 shadow-[0_3px_12px_rgba(15,23,42,0.035)]">
                    <div className="flex items-center justify-between gap-3 border-b border-[#e5edf8] pb-2.5">
                      <h3 className="!text-[15px] font-extrabold leading-5 text-[#071936]">{group.label}</h3>
                      <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#eaf2ff] px-2 py-1 text-[10px] font-extrabold tabular-nums text-[#1458e5]">{group.items.length}</span>
                    </div>
                    <ul className="mt-2 grid gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.href} className="min-w-0">
                          <Link
                            prefetch={false}
                            href={item.href}
                            className="group/link flex min-h-8 min-w-0 items-center justify-between gap-2 rounded-lg px-2 text-[12px] font-semibold leading-5 text-slate-700 transition hover:bg-[#edf4ff] hover:text-[#1458e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1458e5]/35"
                          >
                            <span className="min-w-0 truncate">{item.title}</span>
                            <span className="shrink-0 text-[#1458e5] opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:opacity-100" aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
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
	          <section
              id="led-price-table"
              className="relative mt-4 scroll-mt-24 overflow-hidden rounded-2xl border border-[#dbe5f2] bg-white px-4 py-6 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6 lg:px-8"
              aria-labelledby="led-price-list-heading"
            >
              <div className="mx-auto max-w-5xl text-center">
                <span className="home-section-badge text-blue-700">
                  <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[#1458e5] shadow-sm ring-1 ring-[#cfe0ff]">
                    <UiIcon name="cost" className="h-3.5 w-3.5" />
                  </span>
                  Pricing Guide
                </span>
                <h2 id="led-price-list-heading" className={`mt-3 text-balance ${ledSectionTitleClass}`}>
                  LED Display Price List in Bangladesh
                </h2>
                <p className="home-section-subtitle mx-auto mt-3 max-w-4xl text-center leading-6 text-slate-600">
                  Verified on {LED_PRICE_VERIFIED_DATE}, these per-square-foot prices cover a complete LED display scope with
                  hardware, structure, installation, transportation, VAT, and a 1-year LED display warranty.
                </p>
              </div>

              <div className="mx-auto mt-6 grid max-w-5xl overflow-hidden rounded-xl border border-[#cfdcf0] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.035)] sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: "cost", title: "Per Sq.Ft. Pricing", text: "Complete project rate", active: true },
                  { icon: "display", title: "Complete Hardware", text: "Module, cabinet, controller & PSU" },
                  { icon: "structure", title: "Installed & Delivered", text: "Structure, installation & transport" },
                  { icon: "maintenance", title: "VAT & Warranty", text: "VAT included • 1-year warranty" },
                ].map((item, index) => (
                  <div key={item.title} className={`flex min-h-[78px] items-center gap-3 px-4 py-3 ${index ? "border-t border-slate-200 sm:border-t-0 sm:[&:nth-child(2n)]:border-l lg:border-l" : ""}`}>
                    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.active ? "bg-blue-600 text-white" : "bg-[#eaf2ff] text-blue-600"}`} aria-hidden="true">
                      <UiIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-extrabold leading-5 text-[#071936] sm:text-[13px]">{item.title}</div>
                      <p className="!text-left text-[10px] leading-4 text-slate-600 sm:text-[11px]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <div className="min-w-0 rounded-2xl border border-[#cfdcf0] bg-white p-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)] sm:p-4">
                  <h3 className="flex items-center gap-3 text-[16px] font-extrabold leading-6 text-[#071936] sm:text-lg">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white" aria-hidden="true"><UiIcon name="display" className="h-5 w-5" /></span>
                    Indoor LED Display Price (P1.25–P4)
                  </h3>
                  <details className="group mt-4 md:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[12px] font-extrabold text-blue-800 [&::-webkit-details-marker]:hidden">
                      View Indoor Price List <span className="transition group-open:rotate-180" aria-hidden="true">⌄</span>
                    </summary>
                    <div className="mt-2 space-y-2">
                      {indoorPriceRows.map((row) => (
                        <article key={row.href} className="rounded-lg border border-slate-200 bg-white p-3">
                          <div className="flex items-start justify-between gap-3">
                            <Link prefetch={false} href={row.href} className="font-extrabold text-blue-700 hover:underline">{formatPriceTablePitch(row.pitch)}</Link>
                            <span className="text-right text-[11px] font-extrabold text-slate-800">{row.price}</span>
                          </div>
                          <p className="mt-1 !text-left text-[11px] leading-4 text-slate-600">{row.bestUse}</p>
                          <Link href={`/contact/?project=led-display&product=${encodeURIComponent(row.title)}`} className="mt-2 inline-flex min-h-8 items-center justify-center rounded-md border border-blue-400 px-3 text-[10px] font-extrabold text-blue-700">Get Quote</Link>
                        </article>
                      ))}
                    </div>
                  </details>
                  <div className="mt-4 hidden overflow-hidden rounded-lg border border-slate-200 md:block">
                    <table className="w-full border-collapse text-left text-[11px] lg:text-xs">
                      <thead className="bg-slate-50 font-extrabold text-[#071936]">
                        <tr>
                          <th className="border-b border-r border-slate-200 px-3 py-3">Pixel Pitch</th>
                          <th className="border-b border-r border-slate-200 px-3 py-3">Best Use</th>
                          <th className="border-b border-r border-slate-200 px-3 py-3">Estimated Price / Sqft</th>
                          <th className="border-b border-slate-200 px-3 py-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {indoorPriceRows.map((row) => (
                          <tr key={row.href} className="transition hover:bg-blue-50/40">
                            <td className="border-b border-r border-slate-200 px-3 py-2.5"><Link prefetch={false} href={row.href} title={row.title} className="font-extrabold text-blue-700 hover:underline">{formatPriceTablePitch(row.pitch)}</Link></td>
                            <td className="border-b border-r border-slate-200 px-3 py-2.5">{row.bestUse}</td>
                            <td className="whitespace-nowrap border-b border-r border-slate-200 px-3 py-2.5 font-semibold">{row.price}</td>
                            <td className="border-b border-slate-200 px-2 py-2 text-center"><Link href={`/contact/?project=led-display&product=${encodeURIComponent(row.title)}`} className="inline-flex min-h-8 items-center justify-center rounded-md border border-blue-400 px-3 text-[10px] font-extrabold text-blue-700 transition hover:bg-blue-600 hover:text-white">Get Quote</Link></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-[#cfdcf0] bg-white p-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)] sm:p-4">
                  <h3 className="flex items-center gap-3 text-[16px] font-extrabold leading-6 text-[#071936] sm:text-lg">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white" aria-hidden="true"><UiIcon name="cost" className="h-5 w-5" /></span>
                    Outdoor LED Display Price (P2.5–P10)
                  </h3>
                  <details className="group mt-4 md:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[12px] font-extrabold text-blue-800 [&::-webkit-details-marker]:hidden">
                      View Outdoor Price List <span className="transition group-open:rotate-180" aria-hidden="true">⌄</span>
                    </summary>
                    <div className="mt-2 space-y-2">
                      {outdoorPriceRows.map((row) => (
                        <article key={row.href} className="rounded-lg border border-slate-200 bg-white p-3">
                          <div className="flex items-start justify-between gap-3">
                            <Link prefetch={false} href={row.href} className="font-extrabold text-blue-700 hover:underline">{formatPriceTablePitch(row.pitch)}</Link>
                            <span className="text-right text-[11px] font-extrabold text-slate-800">{row.price}</span>
                          </div>
                          <p className="mt-1 !text-left text-[11px] leading-4 text-slate-600">{row.bestUse}</p>
                          <Link href={`/contact/?project=led-display&product=${encodeURIComponent(row.title)}`} className="mt-2 inline-flex min-h-8 items-center justify-center rounded-md border border-blue-400 px-3 text-[10px] font-extrabold text-blue-700">Get Quote</Link>
                        </article>
                      ))}
                    </div>
                  </details>
                  <div className="mt-4 hidden overflow-hidden rounded-lg border border-slate-200 md:block">
                    <table className="w-full border-collapse text-left text-[11px] lg:text-xs">
                      <thead className="bg-slate-50 font-extrabold text-[#071936]">
                        <tr>
                          <th className="border-b border-r border-slate-200 px-3 py-3">Pixel Pitch</th>
                          <th className="border-b border-r border-slate-200 px-3 py-3">Best Use</th>
                          <th className="border-b border-r border-slate-200 px-3 py-3">Estimated Price / Sqft</th>
                          <th className="border-b border-slate-200 px-3 py-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {outdoorPriceRows.map((row) => (
                          <tr key={row.href} className="transition hover:bg-blue-50/40">
                            <td className="border-b border-r border-slate-200 px-3 py-2.5"><Link prefetch={false} href={row.href} title={row.title} className="font-extrabold text-blue-700 hover:underline">{formatPriceTablePitch(row.pitch)}</Link></td>
                            <td className="border-b border-r border-slate-200 px-3 py-2.5">{row.bestUse}</td>
                            <td className="whitespace-nowrap border-b border-r border-slate-200 px-3 py-2.5 font-semibold">{row.price}</td>
                            <td className="border-b border-slate-200 px-2 py-2 text-center"><Link href={`/contact/?project=led-display&product=${encodeURIComponent(row.title)}`} className="inline-flex min-h-8 items-center justify-center rounded-md border border-blue-400 px-3 text-[10px] font-extrabold text-blue-700 transition hover:bg-blue-600 hover:text-white">Get Quote</Link></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <p className="mt-4 flex items-center justify-center gap-2 !text-center text-[11px] leading-5 text-slate-500 sm:text-xs">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-400 text-[9px] font-bold" aria-hidden="true">i</span>
                Final quotation is confirmed after the site survey, actual screen size, pixel pitch, installation requirements, and final BOQ.
              </p>

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-blue-200 bg-[linear-gradient(105deg,#ffffff_0%,#f7fbff_58%,#eef5ff_100%)] px-4 py-5 shadow-[0_5px_16px_rgba(15,23,42,0.035)] sm:px-5 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
                <div className="hidden h-24 items-center justify-center lg:flex" aria-hidden="true">
                  <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <UiIcon name="guide" className="h-11 w-11" />
                    <span className="absolute -right-5 bottom-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md"><UiIcon name="cost" className="h-5 w-5" /></span>
                  </span>
                </div>
                <div className="min-w-0 text-center lg:text-left">
                  <h3 className="text-balance text-[20px] font-black leading-6 text-[#071936] md:text-[24px]">Need an Accurate LED Display Quotation?</h3>
                  <p className="mt-2 !text-center text-[12px] leading-5 text-slate-600 lg:!text-left sm:text-[13px]">Share your requirement. We provide BOQ, size calculation, and installation planning with practical pricing for Bangladesh.</p>
                </div>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:mt-0">
                  <Link href="/contact/?project=led-display" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-[12px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-800"><UiIcon name="guide" className="h-4 w-4" />Request Free BOQ</Link>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-[12px] font-extrabold text-[#071936] shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700"><svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-3.8-.9L3 21l1.8-5a8.5 8.5 0 1 1 16.2-4.5Z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></svg>WhatsApp</a>
                </div>
              </div>
            </section>

          <section
            className="relative mt-4 overflow-hidden rounded-2xl border border-[#dbe5f2] bg-white px-4 py-6 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6 lg:px-8"
            aria-labelledby="led-display-buying-guide-heading"
          >
            <span className="pointer-events-none absolute left-6 top-5 h-14 w-24 opacity-55 [background-image:radial-gradient(#bfdbfe_1.5px,transparent_1.5px)] [background-size:10px_10px]" aria-hidden="true" />
            <span className="pointer-events-none absolute right-6 top-5 h-14 w-24 opacity-55 [background-image:radial-gradient(#bfdbfe_1.5px,transparent_1.5px)] [background-size:10px_10px]" aria-hidden="true" />

            <div className="relative mx-auto max-w-5xl text-center">
              <span className="home-section-badge text-blue-700">
                <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[#1458e5] shadow-sm ring-1 ring-[#cfe0ff]">
                  <UiIcon name="guide" className="h-3.5 w-3.5" />
                </span>
                LED Buying Guide
              </span>
              <h2 id="led-display-buying-guide-heading" className={`mt-3 text-balance ${ledSectionTitleClass}`}>
                How to Choose the Right LED Display Screen in Bangladesh
              </h2>
              <p className="home-section-subtitle mx-auto mt-2 max-w-4xl text-center leading-6 text-slate-600">
                Choose the right pixel pitch, brightness, size, and controller based on your viewing distance, environment, and application.
              </p>
            </div>

            <div className="relative mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
              {[
                {
                  no: "1",
                  icon: "cabinet",
                  title: "Pixel Pitch & Viewing Distance",
                  bullets: [
                    "P1.5–P2: close viewing distance, premium indoor LED displays",
                    "P2.5: boardrooms, classrooms, control rooms, and high-end indoor walls",
                    "P2.86: advertising displays, rental staging, and mid-range commercial use",
                    "P4–P10: outdoor LED screens, billboards, and long-distance visibility",
                  ],
                },
                {
                  no: "2",
                  icon: "structure",
                  title: "Indoor vs Outdoor Installation",
                  bullets: [
                    "Indoor: fine pitch, lower brightness for comfortable viewing",
                    "Outdoor: high brightness, IP-rated cabinets, and weather resistance",
                    "Semi-outdoor: protected spaces like canopies and entrance areas",
                    "Use cases: offices, showrooms, shopping malls, roadsides, and stadiums",
                  ],
                },
                {
                  no: "3",
                  icon: "display",
                  title: "Screen Size & Resolution Planning",
                  bullets: [
                    "Match screen size with room size, viewing distance, and content type",
                    "Ensure content resolution fits the screen for sharp, clear visuals",
                    "Choose the right aspect ratio for your content and playback workflow",
                    "Consider installation-area limits, structure, and maintenance access",
                  ],
                },
                {
                  no: "4",
                  icon: "cost",
                  title: "Brightness & Visibility",
                  bullets: [
                    "Indoor: 800–1,500 nits for comfortable indoor visibility",
                    "Semi-outdoor: 2,000–3,500 nits for shaded or semi-open areas",
                    "Outdoor daylight: 5,000–8,000 nits for clear visibility",
                    "Higher brightness is required for direct-sunlight environments",
                  ],
                },
                {
                  no: "5",
                  icon: "controller",
                  title: "Controller System & Connectivity",
                  bullets: [
                    "Trusted controller solutions: NovaStar, Colorlight, and Huidu",
                    "Support for multiple input sources and easy content management",
                    "Stable signal transmission and seamless playback performance",
                    "Suitable control capacity for fixed installations or rental projects",
                  ],
                },
                {
                  no: "6",
                  icon: "power",
                  title: "Power Consumption & Maintenance",
                  bullets: [
                    "Check total power load and plan the proper power supply",
                    "Energy-efficient panels reduce long-term operating cost",
                    "Front or rear maintenance access simplifies servicing",
                    "Good cooling and scheduled maintenance help ensure long service life",
                  ],
                },
              ].map((item) => (
                <article key={item.no} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 rounded-2xl border border-[#dbe5f2] bg-white p-4 shadow-[0_5px_16px_rgba(15,23,42,0.045)] sm:grid-cols-[58px_minmax(0,1fr)] sm:p-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf2ff] text-[#1262df] sm:h-14 sm:w-14" aria-hidden="true">
                    <UiIcon name={item.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-extrabold leading-5 text-[#071936] sm:text-base">
                      {item.no})&nbsp; {item.title}
                    </h3>
                    <span className="mt-2 block h-0.5 w-10 rounded-full bg-blue-600" aria-hidden="true" />
                    <ul className="mt-3 space-y-2 text-[12px] leading-5 text-slate-600 sm:text-[13px]">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 !text-left">
                          {Number(item.no) >= 5 ? (
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white" aria-hidden="true">✓</span>
                          ) : (
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                          )}
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="relative mt-4 grid items-center gap-2 md:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)]">
              {[
                { icon: "structure", title: "Step 1: Choose environment", text: "Decide whether the screen will be used indoor, outdoor, or semi-outdoor." },
                { icon: "power", title: "Step 2: Plan power + structure", text: "Confirm power availability, supporting structure, and safe installation access." },
                { icon: "controller", title: "Step 3: Match controller capacity", text: "Select a controller that matches screen size and resolution for smooth performance." },
              ].map((step, index) => (
                <div key={step.title} className="contents">
                  <article className="grid min-h-[92px] grid-cols-[52px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-[#cfdcf0] bg-white p-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)]">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm" aria-hidden="true">
                      <UiIcon name={step.icon} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-extrabold leading-5 text-[#071936] sm:text-sm">{step.title}</h3>
                      <p className="mt-0.5 !text-left text-[11px] leading-[1.15rem] text-slate-600 sm:text-xs">{step.text}</p>
                    </div>
                  </article>
                  {index < 2 ? <span className="hidden text-center text-3xl font-light text-blue-600 md:block" aria-hidden="true">→</span> : null}
                </div>
              ))}
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#cfdcf0] bg-[linear-gradient(110deg,#ffffff_0%,#fbfdff_72%,#f2f7ff_100%)] p-4 shadow-[0_5px_16px_rgba(15,23,42,0.04)] sm:p-5">
              <span className="pointer-events-none absolute bottom-4 right-7 hidden text-blue-100 lg:block" aria-hidden="true">
                <UiIcon name="guide" className="h-24 w-24" />
              </span>
              <div className="relative flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-black text-white shadow-sm" aria-hidden="true">“</span>
                <div>
                  <h3 className="text-[15px] font-extrabold leading-5 text-[#071936] sm:text-base">What to share for an accurate LED display quotation</h3>
                  <p className="mt-1 !text-left text-[12px] leading-5 text-slate-600 sm:text-[13px]">Providing these details helps us recommend the most suitable LED display solution for your project.</p>
                </div>
              </div>
              <ul className="relative mt-4 grid gap-x-5 gap-y-3 text-[12px] leading-5 text-slate-700 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Location: city, indoor/outdoor, and elevation",
                  "Mounting method: wall, truss, hanging, or structure",
                  "Power available: single phase or three phase",
                  "Content type: video, ads, live feed, or mixed content",
                  "Target screen size (W × H) or available wall space",
                  "Preferred control: HDMI, LAN, Wi-Fi, 4G, or cloud CMS",
                ].map((item, index) => (
                  <li key={item} className={`flex items-start gap-2 !text-left ${index % 3 ? "lg:border-l lg:border-slate-200 lg:pl-5" : ""}`}>
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                <Link href="/contact/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#ff6500] px-6 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e85b00] hover:shadow-md">
                  <UiIcon name="support" className="h-5 w-5" /> Get Buying Help
                </Link>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0cab63] px-6 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#079555] hover:shadow-md">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-3.8-.9L3 21l1.8-5a8.5 8.5 0 1 1 16.2-4.5Z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section
            className="mt-4 overflow-hidden rounded-2xl border border-[#d9e4f2] bg-white px-3.5 py-4 shadow-[0_12px_34px_rgba(15,37,70,0.05)] sm:px-5 sm:py-5 md:px-6"
            aria-labelledby="indoor-outdoor-led-comparison-heading"
          >
            <div className="grid gap-6 xl:grid-cols-[0.83fr_1.17fr] xl:gap-7">
              <div className="min-w-0">
              <h2 id="indoor-outdoor-led-comparison-heading" className={ledSectionTitleClass}>
                  Indoor vs Outdoor LED Display
                </h2>
              <p className="home-section-subtitle mt-1 leading-5 text-slate-600">Choose the right LED display for your environment</p>

                <div className="mt-4 overflow-x-auto rounded-xl border border-[#d9e4f2]">
                  <table className="w-full min-w-0 table-fixed text-left text-[7px] leading-3 text-slate-700 min-[430px]:text-[8px] sm:text-[10px] sm:leading-4">
                    <thead>
                      <tr>
                        <th className="w-[29%] bg-[#f7faff] px-1.5 py-2.5 font-bold text-[#071a42] sm:px-3">Key Factor</th>
                        <th className="w-[35.5%] bg-[#2563eb] px-1.5 py-2.5 text-center font-bold text-white sm:px-3">
                          <span className="inline-flex items-center justify-center gap-1"><UiIcon name="display" className="h-3 w-3 sm:h-3.5 sm:w-3.5" /><span className="sm:hidden">Indoor LED</span><span className="hidden sm:inline">Indoor LED Display</span></span>
                        </th>
                        <th className="w-[35.5%] bg-[#08a64a] px-1.5 py-2.5 text-center font-bold text-white sm:px-3">
                          <span className="inline-flex items-center justify-center gap-1"><UiIcon name="solutions" className="h-3 w-3 sm:h-3.5 sm:w-3.5" /><span className="sm:hidden">Outdoor LED</span><span className="hidden sm:inline">Outdoor LED Display</span></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5edf7]">
                      {[
                        ["display", "Brightness", "600–1,500 nits", "5,000–8,000 nits"],
                        ["module", "Pixel Pitch", "P1.25–P4", "P2.5–P10"],
                        ["compare", "Viewing Distance", "1–8 meters", "3–30+ meters"],
                        ["cabinet", "Protection", "IP20 (Indoor Use)", "IP65 (Weatherproof)"],
                        ["maintenance", "Maintenance", "Front / Rear Access", "Front / Rear Access"],
                        ["guide", "Best For", "Meeting Rooms, Retail, Control Rooms, Auditoriums", "Billboards, Stadiums, Streets, Outdoor Ads"],
                        ["support", "Service Life", "Depends on model & usage", "Depends on model & usage"],
                      ].map(([icon, factor, indoor, outdoor]) => (
                        <tr key={factor} className="bg-white">
                          <th className="px-1.5 py-2 font-bold text-[#071a42] sm:px-3">
                            <span className="flex items-center gap-1 sm:gap-2"><UiIcon name={icon} className="h-3 w-3 shrink-0 text-[#1d5fe9] sm:h-3.5 sm:w-3.5" />{factor}</span>
                          </th>
                          <td className="border-l border-[#e5edf7] px-1.5 py-2 text-center sm:px-2.5" style={{ textAlign: "center" }}>{indoor}</td>
                          <td className="border-l border-[#e5edf7] px-1.5 py-2 text-center sm:px-2.5" style={{ textAlign: "center" }}>{outdoor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 flex flex-col gap-2 rounded-lg border border-[#cfe0fb] bg-[#f4f8ff] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex min-w-0 items-start gap-2 text-[10px] font-medium leading-4 text-slate-600">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white font-extrabold text-[#1458e5]" aria-hidden="true">i</span>
                    <span className="min-w-0">Need help choosing? Our experts will recommend the right display for your project.</span>
                  </p>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-7 shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#2d6af1] bg-white px-3 text-[10px] font-extrabold text-[#1458e5] transition hover:bg-[#1458e5] hover:text-white">
                    Talk to an Engineer <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className={ledSectionTitleClass}>Complete LED Display Solution</h2>
                    <p className="home-section-subtitle mt-1 leading-5 text-slate-600">From planning to installation & after-sales support</p>
                  </div>
                  <Link prefetch={false} href="/contact/?project=led-display" className="inline-flex min-h-8 w-fit shrink-0 items-center justify-center gap-2 rounded-md bg-[#071a42] px-3.5 text-[10px] font-extrabold text-white shadow-sm transition hover:bg-[#12326b]">
                    <UiIcon name="guide" className="h-3.5 w-3.5" />Design My LED Display
                  </Link>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.25fr)_minmax(220px,.75fr)]">
                  <div className="rounded-xl bg-[radial-gradient(circle_at_50%_35%,#0d3470_0%,#071c42_48%,#04132d_100%)] p-2.5 text-white shadow-[inset_0_0_0_1px_rgba(96,165,250,0.22)] sm:p-4">
                    <h3 className="text-[11px] font-extrabold sm:text-xs">Complete LED System</h3>
                    <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-1.5">
                      {[
                        ["/assets/led-display/heroes/indoor-led-hero.webp", "Video Source"],
                        ["/assets/led-display/controllers/Huidu-HD-VP820-LED-Video-Processor.webp", "Video Processor"],
                        ["/assets/led-display/controllers/Huidu-HD-A5L-LED-Controller.webp", "LED Controller"],
                      ].map(([src, label], index) => (
                        <Fragment key={label}>
                          <div className="min-w-0 text-center">
                            <div className="relative mx-auto h-9 w-full max-w-[56px] overflow-hidden rounded-md border border-blue-300/25 bg-white/95 min-[430px]:max-w-[64px] sm:h-14 sm:max-w-[92px]">
                              <Image src={src} alt="" fill sizes="92px" className="object-contain p-1" />
                            </div>
                            <div className="mt-1 text-[8px] font-bold leading-3 text-blue-50 sm:text-[9px]">{label}</div>
                          </div>
                          {index < 2 ? <span className="text-center text-sm font-bold text-cyan-400" aria-hidden="true">→</span> : null}
                        </Fragment>
                      ))}
                    </div>

                    <div className="my-2 flex justify-center" aria-hidden="true"><span className="h-3 border-l border-dashed border-cyan-400/80" /></div>
                    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-1.5">
                      {[
                        ["/assets/led-display/receiving-cards/NovaStar-MRV336-Receiving-Card.webp", "Receiving Cards"],
                        ["/assets/led-display/indoor/P2-Indoor-LED-Display.webp", "LED Modules"],
                        ["/assets/led-display/heroes/indoor-led-hero.webp", "LED Screen"],
                      ].map(([src, label], index) => (
                        <Fragment key={label}>
                          <div className="min-w-0 text-center">
                            <div className="relative mx-auto h-9 w-full max-w-[56px] overflow-hidden rounded-md border border-blue-300/25 bg-white/95 min-[430px]:max-w-[64px] sm:h-14 sm:max-w-[92px]">
                              <Image src={src} alt="" fill sizes="92px" className="object-contain p-1" />
                            </div>
                            <div className="mt-1 text-[8px] font-bold leading-3 text-blue-50 sm:text-[9px]">{label}</div>
                          </div>
                          {index < 2 ? <span className="text-center text-sm font-bold text-cyan-400" aria-hidden="true">→</span> : null}
                        </Fragment>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-3 border-t border-blue-300/15 pt-3">
                      <div className="flex items-center gap-1.5 text-[8px] font-bold text-amber-300 sm:text-[9px]"><UiIcon name="power" className="h-4 w-4" />Power Input</div>
                      <span className="text-cyan-400" aria-hidden="true">→</span>
                      <div className="flex items-center gap-2">
                        <div className="relative h-9 w-16 overflow-hidden rounded bg-white/95"><Image src="/assets/led-display/power-supplies/G-Energy-5V-40A-LED-Display-Power-Supply.webp" alt="" fill sizes="64px" className="object-contain p-1" /></div>
                        <span className="text-[8px] font-bold text-blue-50 sm:text-[9px]">Power Supply (SMPS)</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#d9e4f2] bg-[#fbfdff] px-3 py-2 shadow-[0_7px_18px_rgba(15,37,70,0.04)]">
                    {[
                      ["guide", "Site Survey & Consultation", "We analyze your space and requirements"],
                      ["compare", "Screen Design & BOQ", "Custom design, size calculation & BOQ"],
                      ["structure", "Structure & Power Planning", "Safe structure design & electrical planning"],
                      ["install", "Professional Installation", "Neat installation by experienced engineers"],
                      ["controller", "Calibration & Testing", "Color calibration, brightness & performance test"],
                      ["support", "After-Sales Support", "Maintenance, spare parts & technical support"],
                    ].map(([icon, title, detail]) => (
                      <div key={title} className="flex gap-2.5 border-b border-slate-100 py-2 last:border-b-0">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#1458e5]"><UiIcon name={icon} className="h-3.5 w-3.5" /></span>
                        <div className="min-w-0">
                          <div className="text-[9px] font-extrabold leading-4 text-[#071a42] sm:text-[10px]">{title}</div>
                          <div className="text-[8px] leading-3.5 text-slate-500 sm:text-[9px]">{detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </section>

          <section className={ledInformationSectionClass} aria-labelledby="led-projector-video-wall-comparison-heading">
            <LedSectionHeading id="led-projector-video-wall-comparison-heading" icon="compare">LED Display vs Projector vs LCD Video Wall in Bangladesh</LedSectionHeading>
            <MobileIntroText
              teaser="Compare LED display vs projector vs LCD video wall in Bangladesh to choose the right display solution for your business or project."
              className="mt-2"
              teaserClassName="home-section-subtitle w-full"
              expandedClassName="home-section-subtitle leading-7 text-slate-600"
              desktopClassName="home-section-subtitle leading-7 text-slate-600"
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
                <div key={item.t} className="rounded-2xl border border-[#dbe5f2] bg-white p-4 shadow-[0_5px_18px_rgba(15,37,70,0.04)] transition hover:border-[#b9d1fb] hover:shadow-md md:p-5">
                  <h3 className="text-[1rem] font-semibold leading-[1.3] text-slate-900 md:text-lg">{item.t}</h3>
                  <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">{item.d}</p>
                  <ul className="mt-4 space-y-2 text-[13px] text-slate-700 md:text-sm">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#1458e5]" />
                        <span className="text-justify leading-6 md:text-left md:leading-7">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={ledFeatureSectionClass} aria-labelledby="led-display-solutions-heading">
            <LedSectionHeading id="led-display-solutions-heading" icon="solutions">LED Display Solutions in Bangladesh</LedSectionHeading>
            <MobileIntroText
              teaser="Sasha corporation provides complete LED Screen solutions in Bangladesh covering planning, product selection, installation, configuration, and ongoing support."
              className="mt-2"
              teaserClassName="home-section-subtitle w-full"
              expandedClassName="home-section-subtitle leading-7 text-slate-600"
              desktopClassName="home-section-subtitle leading-7 text-slate-600"
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
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#1458e5]" />
                      <span className="text-justify leading-6 md:text-left md:leading-7">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link prefetch={false} href="/contact/" className="rounded-xl bg-[#071a42] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2c67]">
                    Request a Free Quotation -&gt;
                  </Link>
                  <Link prefetch={false} href="/blog/led-display-price-in-bangladesh-complete-buying-guide/" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#1458e5] hover:text-[#1458e5]">
                    LED Display Buying Guide
                  </Link>
                  <Link prefetch={false} href="/services-support/" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#1458e5] hover:text-[#1458e5]">
                    Installation &amp; Support
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {ledReliabilityCards.map((card) => (
                  <div
                    key={card.t}
                    className="rounded-2xl border border-[#dbe5f2] bg-white p-5 shadow-[0_5px_18px_rgba(15,37,70,0.045)] transition hover:-translate-y-0.5 hover:border-[#b9d1fb] hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#cfe0ff] bg-[#edf4ff] text-[#1458e5] shadow-sm">
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

          <section
            className="mt-4 rounded-2xl border border-[#d9e4f2] bg-white px-4 py-5 shadow-[0_12px_34px_rgba(15,37,70,0.055)] sm:px-5 md:px-6 md:py-6"
            aria-labelledby="recent-led-projects-heading"
          >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 id="recent-led-projects-heading" className={`${ledSectionTitleClass} flex items-center gap-2.5`}>
                    <LedPremiumTitleIcon icon="display" />
                    <span className="min-w-0 text-balance">Our Recent LED Display Projects</span>
                  </h2>
                  <p className="home-section-subtitle mt-1 leading-5 text-slate-600">Delivering high-performance LED screens across Bangladesh.</p>
                </div>
                <Link prefetch={false} href="/projects/" className="inline-flex min-h-8 w-fit items-center justify-center gap-2 rounded-md border border-[#2d6af1] bg-white px-3.5 text-[10px] font-extrabold text-[#1458e5] transition hover:bg-[#1458e5] hover:text-white">
                  View All Projects <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="mt-5 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
                {ledDisplayProjects.map((project, index) => {
                  const isOutdoorProject = /outdoor|billboard/i.test(project.systemType ?? project.title);
                  const projectColor = isOutdoorProject ? "#0aa65a" : "#1458e5";
                  const projectBrand = project.meta.find((item) => item.k === "Brand")?.v;
                  const centerFinalPair = ledDisplayProjects.length % 3 === 2 && index === ledDisplayProjects.length - 2;

                  return (
                  <article
                    key={project.id}
                    className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-white shadow-[0_7px_20px_rgba(15,37,70,0.065)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,37,70,0.1)] md:col-span-1 lg:col-span-2 ${centerFinalPair ? "lg:col-start-2" : ""}`}
                    style={{ borderColor: "#dbe4f0" }}
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        quality={95}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        className={`object-cover transition duration-500 group-hover:scale-[1.015] ${project.imageClassName ?? ""}`}
                        style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                      />
                    </div>
                    <div className="relative flex flex-1 flex-col px-4 pb-5 pt-6 sm:px-5 sm:pb-5">
                      <div className="flex items-start gap-3">
                        <span className="-mt-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[4px] border-white text-white shadow-md" style={{ backgroundColor: projectColor }}>
                          <UiIcon name={isOutdoorProject ? "solutions" : "display"} className="h-5 w-5" />
                        </span>
                        <h3 className="line-clamp-2 min-h-12 min-w-0 flex-1 text-base font-extrabold leading-6 text-[#071a42] sm:text-[17px]">
                          {project.title}
                        </h3>
                      </div>

                      <div className="mt-2.5 flex min-h-10 items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-semibold leading-5 text-slate-700 sm:text-xs">
                        <UiIcon name="guide" className="mt-0.5 h-4 w-4 shrink-0 text-[#1458e5]" />
                        <span className="line-clamp-2">{project.organization}</span>
                      </div>

                      <dl className="mt-3 grid grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 py-2.5">
                        <div className="min-w-0 pr-3">
                          <dt className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-slate-400">Completed</dt>
                          <dd className="mt-0.5 truncate text-[11px] font-bold text-slate-700 sm:text-xs">{project.completed ?? project.year}</dd>
                        </div>
                        <div className="min-w-0 pl-3">
                          <dt className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-slate-400">Brand</dt>
                          <dd className="mt-0.5 truncate text-[11px] font-bold text-slate-700 sm:text-xs">{projectBrand ?? "Project specified"}</dd>
                        </div>
                      </dl>

                      <div className="flex min-h-12 flex-wrap content-start gap-2 pt-3.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border px-2.5 py-1 text-[10px] font-bold leading-none sm:text-[11px]"
                            style={{
                              borderColor: `${projectColor}24`,
                              backgroundColor: `${projectColor}10`,
                              color: projectColor,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        prefetch={false}
                        href={project.caseStudyHref ?? `/contact/?project=led-display&client=${encodeURIComponent(project.organization)}`}
                        className="mt-auto inline-flex min-h-9 w-fit items-center pt-3 text-[11px] font-extrabold text-[#1458e5] transition hover:text-orange-600"
                      >
                        {project.caseStudyHref ? "View Case Study" : "Request a Similar Project"} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  prefetch={false}
                  href="/projects/"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1458e5] px-5 py-2.5 text-xs font-extrabold text-white shadow-[0_6px_18px_rgba(20,88,229,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0f49c7] hover:shadow-[0_9px_22px_rgba(20,88,229,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1458e5]/40 focus-visible:ring-offset-2 sm:text-sm"
                >
                  View More Completed Projects
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
          </section>

          <section className={ledInformationSectionClass} aria-labelledby="why-choose-sasha-led-heading">
            <div ref={whyChooseSectionRef}>
              <div>
                <LedSectionHeading id="why-choose-sasha-led-heading" icon="support">Why Choose Sasha Corporation for LED Display Solutions?</LedSectionHeading>
                <MobileIntroText
                teaser="Sasha Corporation supplies, installs, configures, and supports LED display solutions across Bangladesh."
                className="mt-3 text-slate-600"
                teaserClassName="home-section-subtitle w-full"
                expandedClassName="home-section-subtitle leading-7 md:leading-8"
                desktopClassName="home-section-subtitle leading-7 md:leading-8"
                >
                  <>
                    Sasha Corporation supplies, installs, configures, and supports LED display solutions across Bangladesh. Project scope may include indoor LED displays, outdoor LED billboards, rental LED screens, LED video walls, controllers, receiving cards, power supplies, maintenance, and after-sales technical support. LED displays include a 1-year warranty; response time and maintenance terms are confirmed in the quotation according to the selected product and project scope.
                  </>
                </MobileIntroText>
              </div>

              <div>
                <div
                  ref={whyChooseCarouselRef}
                  onScroll={handleWhyChooseCarouselScroll}
                  className="mt-4 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-[0.65rem] md:overflow-visible md:px-0 md:pb-0 md:pt-0 xl:grid-cols-4"
                >
                {sashaWhyChooseCards.map((item) => (
	                  <article
                      key={item.title}
                      className="group flex w-[86%] shrink-0 snap-start flex-col rounded-xl border border-[#dbe5f2] bg-white px-3.5 py-3 shadow-[0_3px_14px_rgba(15,23,42,0.035)] transition duration-300 md:min-h-full md:min-w-0 md:w-auto md:shrink md:snap-normal md:p-4 md:hover:-translate-y-0.5 md:hover:border-[#b9d1fb] md:hover:shadow-md"
                    >
                      <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#cfe0ff] bg-gradient-to-br from-[#eaf2ff] to-white text-[#1458e5] shadow-sm">
                          <UiIcon name={item.icon} className="h-5 w-5" />
                        </div>
                        <h3 className="min-w-0 flex-1 whitespace-normal break-words text-[15px] font-extrabold leading-tight tracking-tight text-[#071936] md:text-base md:leading-5">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2.5 whitespace-normal break-words text-[12.5px] leading-5 text-slate-600 md:text-sm md:leading-6">{item.text}</p>
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
                      className={`h-1.5 rounded-full transition-all ${activeWhyChooseSlide === index ? "w-6 bg-[#1458e5]" : "w-1.5 bg-slate-300"}`}
                      aria-label={`Go to ${item.title}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </section>

          <section
            className="mt-4 rounded-2xl border border-[#d9e4f2] bg-[linear-gradient(135deg,#fbfdff_0%,#f3f7ff_100%)] px-4 py-7 shadow-[0_12px_34px_rgba(15,37,70,0.05)] sm:px-5 md:px-6 md:py-8"
            aria-labelledby="led-how-we-work-heading"
          >
              <div>
                <div className="home-section-badge">Our Process</div>
                <h2 id="led-how-we-work-heading" className={`${ledSectionTitleClass} mt-1 flex items-center gap-2.5`}>
                  <LedPremiumTitleIcon icon="process" />
                  <span className="min-w-0 text-balance">Our LED Display Project Process</span>
                </h2>
                <p className="home-section-subtitle mt-1 leading-5 text-slate-600">A clear, structured workflow from consultation to project handover.</p>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-6 lg:items-stretch">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-6">
                  {[
                    ["support", "Consultation", "We understand your needs and project requirements."],
                    ["guide", "Site Survey", "Our team visits the site for measurement & analysis."],
                    ["compare", "Design & BOQ", "We design the solution and prepare detailed BOQ."],
                    ["install", "Installation", "Professional installation with safety & neat work."],
                    ["display", "Testing & Calibration", "Complete testing, calibration & performance check."],
                    ["support", "Handover & Support", "We hand over the project and provide ongoing support."],
                  ].map(([icon, title, detail], index) => (
                    <article
                      key={title}
                      className="relative flex min-w-0 flex-col rounded-xl border bg-white p-3.5 shadow-[0_7px_20px_rgba(15,37,70,0.055)] transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ minHeight: "166px", borderColor: "#dce6f3" }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1458e5] ring-1 ring-[#d6e4fb]">
                          <UiIcon name={icon} className="h-5 w-5" />
                        </span>
                        <span className="rounded-full bg-[#1458e5] px-2 py-1 text-[8px] font-extrabold tracking-wide text-white">STEP {String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="mt-3 text-[12px] font-extrabold leading-4 text-[#071a42] sm:text-[13px]">{title}</div>
                      <div className="mt-1.5 text-[9px] leading-4 text-slate-600 sm:text-[10px]">{detail}</div>
                      {index < 5 ? (
                        <span
                          className="absolute z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-blue-100 bg-white text-sm font-bold text-[#6f9fea] shadow-sm lg:flex"
                          style={{ right: "-20px", top: "69px" }}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      ) : null}
                    </article>
                  ))}
                </div>

                <aside
                  className="flex flex-col justify-between rounded-xl p-4 text-white shadow-[0_14px_30px_rgba(7,26,66,0.2)] lg:col-span-1"
                  style={{ minHeight: "166px", background: "linear-gradient(145deg, #0b2a63 0%, #06183b 100%)" }}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                      <UiIcon name="support" className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <div className="text-[12px] font-extrabold leading-4">Need Expert Help?</div>
                      <div className="mt-1.5 text-[9px] leading-4 text-blue-100">Our technical team is ready to help you.</div>
                    </div>
                  </div>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-white px-3 text-[10px] font-extrabold text-[#071a42] shadow-sm transition hover:bg-blue-50">
                    <span className="text-[#1458e5]" aria-hidden="true">◉</span> Chat on WhatsApp
                  </a>
                </aside>
              </div>
          </section>

	          <section className={ledInformationSectionClass} aria-label="LED display system guide">
	            <div className="space-y-10">
	              <div>
	                <LedSectionHeading icon="display">What Is an LED Display?</LedSectionHeading>
                <MobileIntroText
                  teaser="An LED Display is a modular digital screen built from many light-emitting diode pixels that create images, videos, text, and live visual content."
                teaserLines={2}
                className="mt-4"
                teaserClassName="home-section-subtitle w-full leading-6"
                expandedClassName="home-section-subtitle space-y-4 leading-7 text-slate-600"
                desktopClassName="home-section-subtitle mt-4 space-y-4 leading-7 text-slate-600 md:leading-8"
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

	                <aside className="mt-5 rounded-[18px] border border-[#cfe0ff] bg-[#f3f7ff] p-4 shadow-sm md:mt-6 md:rounded-2xl md:p-5">
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
	                <LedSectionHeading icon="module">Main Components of an LED Display System</LedSectionHeading>
                  <MobileIntroText
                  teaser="Every professional LED display system is built using several essential hardware components."
                  className="mt-3 max-w-5xl"
                  teaserClassName="home-section-subtitle w-full"
                  expandedClassName="home-section-subtitle leading-7 text-slate-600"
                  desktopClassName="home-section-subtitle leading-7 text-slate-600 md:leading-8"
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
                        className={`led-component-card group flex w-[86%] shrink-0 snap-start flex-col rounded-[20px] border px-3.5 py-3 transition duration-300 md:h-full md:w-auto md:shrink md:snap-normal md:rounded-2xl md:border-[#dbe5f2] md:bg-none md:bg-white md:p-5 md:shadow-sm md:hover:-translate-y-1 md:hover:border-[#b9d1fb] md:hover:shadow-md ${componentMobileCardStyles[index % componentMobileCardStyles.length]}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="led-component-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#cfe0ff] bg-white/90 text-[#1458e5] shadow-sm transition-colors duration-200 md:h-12 md:w-12 md:rounded-2xl md:bg-[#edf4ff] md:shadow-none">
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
                        className={`h-1.5 rounded-full transition-all ${activeComponentSlide === index ? "w-6 bg-[#1458e5]" : "w-1.5 bg-slate-300"}`}
                        aria-label={`Go to ${component.name}`}
                      />
                    ))}
                  </div>

	              </div>

	              <div>
	                <LedSectionHeading icon="process">How an LED Display System Works</LedSectionHeading>
	                <MobileIntroText
	                teaser="A professional LED display operates through the seamless communication of multiple hardware components."
	                className="mt-3 max-w-5xl"
	                teaserClassName="home-section-subtitle w-full"
	                expandedClassName="home-section-subtitle leading-7 text-slate-600"
	                desktopClassName="home-section-subtitle leading-7 text-slate-600 md:leading-8"
                  >
                    <>
                      A professional LED display operates through the seamless communication of multiple hardware
                      components. The diagram below illustrates how video signals and electrical power travel through the
                      complete LED display system.
                    </>
                  </MobileIntroText>

	                <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
	                  <div className="rounded-2xl border border-[#dbe5f2] bg-[#f7faff] p-5">
	                    <h3 className="text-[1rem] font-extrabold text-slate-900 md:text-lg">Signal Flow</h3>
	                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
	                      {ledDisplaySignalFlow.map((step, index) => (
	                        <div key={step} className="flex items-stretch gap-2 md:gap-3">
	                          <div className="flex min-h-[3.55rem] flex-1 items-center justify-center rounded-xl border border-[#cfe0ff] bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_52%,#eaf2ff_100%)] px-2.5 py-3 text-center text-[12px] font-bold leading-5 text-slate-800 shadow-sm md:min-h-16 md:rounded-2xl md:px-3 md:py-4 md:text-sm md:leading-6">
	                            {step}
	                          </div>
	                          {index < ledDisplaySignalFlow.length - 1 ? (
	                            <div className="hidden items-center text-sm font-extrabold text-[#1458e5] sm:flex">
	                              -&gt;
	                            </div>
	                          ) : null}
	                        </div>
	                      ))}
	                    </div>
	                  </div>

	                  <div className="self-start rounded-2xl border border-[#dbe5f2] bg-[#f7faff] p-4">
	                    <h3 className="text-[1rem] font-extrabold text-slate-900 md:text-lg">Power Flow</h3>
	                    <div className="mt-3 grid gap-2">
	                      {ledDisplayPowerFlow.map((step, index) => (
	                        <div
                            key={step}
                            className={`relative flex flex-col items-center ${
                              index < ledDisplayPowerFlow.length - 1 ? "pb-3.5 md:pb-4" : ""
                            }`}
                          >
	                          <div className="mx-auto flex min-h-11 w-full max-w-[17.5rem] items-center justify-center rounded-lg border border-[#cfe0ff] bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_54%,#eaf2ff_100%)] px-2 py-2 text-center text-[11px] font-bold leading-4 text-slate-800 shadow-sm md:mx-0 md:min-h-12 md:max-w-none md:flex-1 md:rounded-2xl md:px-3 md:text-sm md:leading-6">
	                            {step}
	                          </div>
                            {index < ledDisplayPowerFlow.length - 1 ? (
	                            <div
                                className="absolute bottom-0 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center text-base font-extrabold leading-none text-[#1458e5] md:h-5 md:w-5 md:text-lg"
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

          <section
            className="mt-4 rounded-2xl border border-[#d9e4f2] bg-[linear-gradient(135deg,#fbfdff_0%,#f5f8ff_100%)] px-4 py-6 shadow-[0_12px_34px_rgba(15,37,70,0.05)] sm:px-5 md:px-6 md:py-7"
            aria-labelledby="led-display-technology-types-heading"
          >
            <div>
              <h2 id="led-display-technology-types-heading" className={`${ledSectionTitleClass} flex items-center gap-2.5`}>
                <LedPremiumTitleIcon icon="chip" />
                <span className="min-w-0 text-balance">LED Technology Guide</span>
              </h2>
              <p className="home-section-subtitle mt-1 font-semibold leading-5 text-slate-600">Different LED technologies for different needs</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "SMD",
                  subtitle: "Standard LED",
                  image: "/assets/led-display/indoor/P2.5-Indoor-LED-Display.webp",
                  alt: "SMD indoor LED display technology",
                  icon: "module",
                  benefits: ["Cost-effective solution", "Wide viewing angle", "Indoor & outdoor use"],
                  href: "/contact/?project=led-display&technology=smd",
                },
                {
                  title: "GOB",
                  subtitle: "Glue on Board",
                  image: "/assets/led-display/outdoor/P5-Outdoor-LED-Display.webp",
                  alt: "GOB protected LED display technology",
                  icon: "shield",
                  benefits: ["Better surface protection", "Water & dust resistant", "High durability"],
                  href: "/contact/?project=led-display&technology=gob",
                },
                {
                  title: "COB",
                  subtitle: "Chip on Board",
                  image: "/assets/led-display/indoor/P1.53-Indoor-LED-Display.webp",
                  alt: "COB fine-pitch LED display technology",
                  icon: "chip",
                  benefits: ["Superior visual performance", "Better heat dissipation", "Ultra-fine pixel pitch"],
                  href: "/contact/?project=led-display&technology=cob",
                },
                {
                  title: "Micro LED",
                  subtitle: "Next Generation",
                  image: "/assets/led-display/heroes/indoor-led-hero.webp",
                  alt: "Micro LED next-generation display technology",
                  icon: "module",
                  benefits: ["Ultra-high brightness", "Outstanding contrast", "Premium display solution"],
                  href: "/contact/?project=led-display&technology=micro-led",
                },
              ].map((technology) => (
                <article
                  key={technology.title}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-white shadow-[0_8px_22px_rgba(15,37,70,0.065)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,37,70,0.11)]"
                  style={{ borderColor: "#dbe4f0" }}
                >
                  <div className="relative overflow-hidden bg-[#eaf0f8]" style={{ height: "142px" }}>
                    <Image
                      src={technology.image}
                      alt={technology.alt}
                      fill
                      loading="eager"
                      unoptimized
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col px-4 pb-4 pt-5">
                    <div className="flex items-start gap-3">
                      <span className="-mt-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[4px] border-white bg-[#edf4ff] text-[#1458e5] shadow-md">
                        <UiIcon name={technology.icon} className="h-5 w-5" />
                      </span>
                      <div className="min-h-10 min-w-0 flex-1">
                        <div className="text-[18px] font-extrabold leading-5 text-[#071a42]">{technology.title}</div>
                        <div className="mt-1 text-[11px] font-bold leading-4 text-slate-700">{technology.subtitle}</div>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-[11px] leading-4 text-slate-700 sm:text-xs">
                      {technology.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#1458e5]" aria-hidden="true" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      prefetch={false}
                      href={technology.href}
                      className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#2d6af1] bg-white px-3 text-[12px] font-extrabold text-[#1458e5] transition hover:bg-[#1458e5] hover:text-white"
                    >
                      Learn More <span className="text-base leading-none" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 flex justify-center">
              <Link
                prefetch={false}
                href="/contact/?project=led-display&request=technology-comparison"
                className="inline-flex min-h-11 w-full max-w-[300px] items-center justify-center gap-3 rounded-lg border border-[#2d6af1] bg-white px-5 text-[12px] font-extrabold text-[#1458e5] shadow-sm transition hover:bg-[#1458e5] hover:text-white"
                style={{ maxWidth: "300px" }}
              >
                Compare All Technologies <span className="text-lg leading-none" aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          <section className={ledFeatureSectionClass} aria-labelledby="led-advertising-benefits-heading">
            <LedSectionHeading id="led-advertising-benefits-heading" icon="cost">Benefits of Digital LED Display for Advertising</LedSectionHeading>
            <MobileIntroText
              teaser="Digital LED signage for outdoor advertising improves visibility, message control, and campaign performance for brands in Bangladesh."
              className="mt-3"
              teaserClassName="home-section-subtitle w-full"
              expandedClassName="home-section-subtitle leading-7 text-slate-600"
              desktopClassName="home-section-subtitle leading-7 text-slate-600"
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
                  style={{ borderColor: "rgba(20,88,229,0.18)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: "#1458e5" }}
                    >
                      {idx + 1}
                    </span>
                    <h3 className="text-[15px] font-extrabold leading-5 text-slate-900 md:text-base">{item.t}</h3>
                  </div>
                  <p className="mt-2.5 text-justify text-[13px] leading-6 text-slate-600 md:mt-3 md:text-left md:text-sm md:leading-7">{item.d}</p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[13px] text-slate-700 md:text-sm">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#1458e5]" />
                        <span className="text-justify leading-6 md:text-left">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={ledInformationSectionClass} aria-labelledby="led-technology-brands-heading">
            <LedSectionHeading id="led-technology-brands-heading" icon="solutions">
              Authorized LED Display Distributor &amp; Technology Brands in Bangladesh
            </LedSectionHeading>
            <MobileIntroText
              teaser="Sasha Corporation is an authorized LED display distributor in Bangladesh, working with globally trusted LED display and component brands."
              className="mt-2"
              teaserClassName="home-section-subtitle w-full"
              expandedClassName="home-section-subtitle leading-7 text-slate-600"
              desktopClassName="home-section-subtitle leading-7 text-slate-600"
            >
              <>
                Sasha Corporation is an authorized LED display distributor in Bangladesh, working with globally trusted
                LED display and component brands for indoor and outdoor LED display projects. We provide professional LED
                display solutions using reliable control systems, power supplies and related technologies from brands such
                as <strong className="font-bold text-slate-900">Leyard</strong>,{" "}
                <strong className="font-bold text-slate-900">LianTronics</strong>,{" "}
                <strong className="font-bold text-slate-900">AOTO Electronics</strong>,{" "}
                <strong className="font-bold text-slate-900">G-Energy</strong>,{" "}
                <strong className="font-bold text-slate-900">Lampro</strong>,{" "}
                <strong className="font-bold text-slate-900">NovaStar</strong>,{" "}
                <strong className="font-bold text-slate-900">Huidu</strong>,{" "}
                <strong className="font-bold text-slate-900">Colorlight</strong> and{" "}
                <strong className="font-bold text-slate-900">Mean Well</strong>, supported by professional installation,
                system integration and after-sales technical service.
              </>
            </MobileIntroText>

            <div className="mt-6 rounded-3xl bg-white p-4 md:p-5">
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
                            style={{ borderColor: "rgba(20,88,229,0.14)" }}
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
                  "LED Display Installation",
                  "LED System Integration",
                  "After-Sales Technical Support",
                ].map((t) => (
                  <span
                    key={t}
                    className="shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-semibold text-[#174ea6] shadow-sm md:text-xs"
                    style={{
                      borderColor: "rgba(20,88,229,0.16)",
                      background: "linear-gradient(180deg, rgba(244,248,255,1) 0%, rgba(234,242,255,0.94) 100%)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className={ledInformationSectionClass} aria-labelledby="valuable-led-clients-heading">
            <div className="home-section-badge">
              LED Display Clients &amp; Projects
            </div>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="w-full">
                <LedSectionHeading id="valuable-led-clients-heading" icon="support">
                  Trusted by Government, Corporate &amp; Institutional LED Display Clients in Bangladesh
                </LedSectionHeading>
                <MobileIntroText
                  teaser="We provide professional LED display and LED screen solutions designed for institutional requirements with clear visibility, stable performance, and dependable after-sales support."
                  className="mt-2 w-full"
                  teaserClassName="home-section-subtitle w-full"
                  expandedClassName="home-section-subtitle text-justify text-slate-600 leading-7"
                  desktopClassName="home-section-subtitle w-full text-justify text-slate-600 leading-7"
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
                  style={{ borderColor: "rgba(20,88,229,0.10)" }}
                >
                  {x}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-white p-4 md:p-5">
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
                            style={{ borderColor: "rgba(20,88,229,0.12)" }}
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

          <section id="led-faq" className={`${ledInformationSectionClass} scroll-mt-24`} aria-labelledby="led-display-faq-heading">
            <LedSectionHeading id="led-display-faq-heading" icon="faq">Frequently Asked Questions About LED Display</LedSectionHeading>
            <div className="mt-5">
              <FaqAccordion accent="#1458e5" density="compact" items={ledFaqs} columns={2} />
            </div>

          </section>

          <section className="mt-4 overflow-hidden rounded-2xl border border-[#d9e4f2] bg-white shadow-[0_10px_30px_rgba(7,25,54,0.10)]" aria-labelledby="led-final-cta">
            <div className="relative overflow-hidden bg-[#06183b]">
              <div className="absolute inset-y-0 right-0 hidden w-1/3 md:block" aria-hidden="true">
                <Image
                  src="/assets/led-display/heroes/indoor-led-hero.webp"
                  alt=""
                  fill
                  sizes="32vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(90deg, #06183b 0%, rgba(6,24,59,0.45) 28%, rgba(6,24,59,0.05) 72%, rgba(6,24,59,0) 100%)" }}
                />
              </div>

              <div className="relative z-10 grid gap-5 px-5 py-5 sm:px-7 md:grid-cols-12 md:items-center md:gap-6 lg:px-8">
                <div className="min-w-0 md:col-span-7">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1458e5] text-white shadow-[0_8px_24px_rgba(20,88,229,0.35)]" aria-hidden="true">
                      <UiIcon name="support" className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <h2 id="led-final-cta" className="!text-xl font-black leading-tight tracking-tight text-white lg:!text-[26px]">
                        Planning an LED Display Project?
                      </h2>
                      <p className="home-section-subtitle mt-1 !text-left font-medium leading-4 text-blue-100">
                        Get clear recommendations, accurate pricing and professional support from our experts.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                    {[
                      ["guide", "Site Survey", "On-site assessment"],
                      ["controller", "Custom BOQ", "Detailed cost estimation"],
                      ["install", "Professional Installation", "By experienced engineers"],
                      ["maintenance", "After-Sales Support", "Nationwide assistance"],
                    ].map(([icon, title, detail], index) => (
                      <div key={title} className={`flex min-w-0 items-start gap-2 ${index ? "sm:border-l sm:border-blue-300/35 sm:pl-4" : ""}`}>
                        <span className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true"><UiIcon name={icon} className="h-4 w-4" /></span>
                        <div className="min-w-0">
                          <div className="text-[9px] font-extrabold leading-4 text-white sm:text-[10px]">{title}</div>
                          <div className="text-[8px] leading-3.5 text-blue-100/85 sm:text-[9px]">{detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2.5 md:col-span-2">
                  <Link href="/contact/?project=led-display" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#1458e5] px-4 text-[11px] font-extrabold text-white shadow-md transition hover:bg-[#0f49c6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                    <UiIcon name="guide" className="h-4 w-4" /> Request Free BOQ
                  </Link>
                  <a href={`tel:${siteConfig.phone}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-[11px] font-extrabold text-[#071a42] shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                    <UiIcon name="support" className="h-4 w-4" /> Talk to an Engineer
                  </a>
                </div>

                <div className="hidden md:col-span-3 md:block" aria-hidden="true" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 px-4 py-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:gap-y-0 lg:px-7">
              {[
                ["solutions", "500+", "Projects Completed"],
                ["guide", "10+ Years", "Industry Experience"],
                ["shield", "20+", "Global Brands"],
                ["delivery", "64", "Districts Covered"],
                ["install", "Expert Team", "Design & Installation"],
                ["support", "After-Sales", "Technical Support"],
              ].map(([icon, value, label], index) => (
                <div key={label} className={`flex min-w-0 items-center gap-2.5 px-2 sm:px-3 ${index ? "lg:border-l lg:border-slate-200" : ""}`}>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#1458e5]" aria-hidden="true">
                    <UiIcon name={icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-extrabold leading-4 text-[#071a42] sm:text-xs">{value}</div>
                    <div className="text-[8px] leading-3.5 text-slate-600 sm:text-[9px]">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default function ProductsPage({ currentYear }: { currentYear: number }) {
  const pathname = usePathname();
  const ledOnly = pathname === "/led-display" || pathname === "/led-display/";
  const basePath = "/led-display" as const;

  return <ProductsPageContent ledOnly={ledOnly} basePath={basePath} currentYear={currentYear} />;
}
