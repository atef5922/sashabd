// app/products/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import FaqAccordion from "@/components/common/FaqAccordion";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileIntroText from "@/components/common/MobileIntroText";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
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
  const scrollToGridOnNextPageChangeRef = useRef(false);
  const mobileCarouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const componentCarouselRef = useRef<HTMLDivElement | null>(null);
  const componentSectionRef = useRef<HTMLDivElement | null>(null);
  const allProducts = useMemo(() => buildProducts(basePath), [basePath]);
  const fullListGroups = useMemo(() => {
    const kinds: Array<FilterKey> = [
      "indoor",
      "outdoor",
      "rental",
      "interactive-flat-panel",
      "digital-podium",
      "receiving-card",
      "controller",
      "power-supply",
    ];
    const labels: Record<string, string> = {
      indoor: "Indoor LED Display",
      outdoor: "Outdoor LED Display",
      rental: "Rental LED Display",
      "interactive-flat-panel": "Interactive Panel",
      "digital-podium": "Digital Podium",
      "receiving-card": "Receiving Card",
      controller: "Controller",
      "power-supply": "Power Supply",
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
  const shareUrl = `https://${siteConfig.domain}${basePath}/`;
  const shareTitle = ledOnly ? "LED Display Price in Bangladesh 2026" : "All LED Products & Accessories";
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareTitle = encodeURIComponent(shareTitle);
  const socialShareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
      className: "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedShareTitle}%20${encodedShareUrl}`,
      className: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`,
      className: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
    },
  ];
  const ledQuickActions = [
    {
      label: "WhatsApp for quotation",
      href: wa,
      icon: "support",
      kind: "external" as const,
      primary: true,
    },
    {
      label: "Request BOQ-based proposal",
      href: "/contact",
      icon: "guide",
      kind: "internal" as const,
    },
    {
      label: "Jump to price table",
      href: "#led-price-table",
      icon: "cost",
      kind: "anchor" as const,
    },
    {
      label: "Jump to FAQ",
      href: "#led-faq",
      icon: "faq",
      kind: "anchor" as const,
    },
  ];
  const ledCategoryQuickLinks = [
    { label: "Indoor LED Display", href: "/led-display/indoor-led/", icon: "display", tone: "text-amber-600 bg-amber-50 border-amber-100" },
    { label: "Outdoor LED Display", href: "/led-display/outdoor/", icon: "display", tone: "text-sky-600 bg-sky-50 border-sky-100" },
    { label: "Rental LED Display", href: "/led-display/rental-display/", icon: "display", tone: "text-rose-600 bg-rose-50 border-rose-100" },
    { label: "Receiving Card", href: "/led-display/accessories/receiving-card/", icon: "receiving", tone: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Controller", href: "/led-display/accessories/controller/", icon: "controller", tone: "text-orange-600 bg-orange-50 border-orange-100" },
    { label: "Power Supply", href: "/led-display/accessories/power-supply/", icon: "power", tone: "text-cyan-600 bg-cyan-50 border-cyan-100" },
    { label: "LED Accessories", href: "/led-display/accessories/led-accessories/", icon: "cable", tone: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { label: "Projects", href: "/projects", icon: "display", tone: "text-slate-600 bg-slate-50 border-slate-200" },
  ];

  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [mobilePage, setMobilePage] = useState(1);
  const [activeComponentSlide, setActiveComponentSlide] = useState(0);
  const desktopPageSize = ledOnly ? 21 : 20;
  const mobilePageSize = ledOnly ? 8 : desktopPageSize;
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

    return allProducts.filter((p) => {
      const kind = p.id.split(":")[0] as FilterKey;

      const passFilter = ledOnly
        ? filter === "all"
          ? kind === "indoor" ||
            kind === "outdoor" ||
            kind === "rental" ||
            kind === "receiving-card" ||
            kind === "controller" ||
            kind === "power-supply" ||
            kind === "led-accessories"
          : kind === filter
        : filter === "all"
          ? true
          : kind === filter;
      if (!passFilter) return false;

      if (!q) return true;

      const blob = `${p.title} ${p.subtitle} ${p.badge} ${p.pitch ?? ""}`.toLowerCase();
      return blob.includes(q);
    });
  }, [allProducts, filter, query, ledOnly]);

  const filters: Array<{ key: FilterKey; label: string }> = ledOnly
    ? [
        { key: "all", label: "All" },
        { key: "indoor", label: "Indoor LED" },
        { key: "outdoor", label: "Outdoor LED" },
        { key: "rental", label: "Rental LED" },
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

  const mobileLedSections = useMemo(() => {
    if (!ledOnly) return [];

    const mobileConfig = [
      { key: "indoor" as FilterKey, title: "Indoor LED Display", prefix: "indoor:", href: "/led-display/indoor-led/" },
      { key: "outdoor" as FilterKey, title: "Outdoor LED Display", prefix: "outdoor:", href: "/led-display/outdoor/" },
      { key: "rental" as FilterKey, title: "Rental LED Display", prefix: "rental:", href: "/led-display/rental-display/" },
      { key: "receiving-card" as FilterKey, title: "Receiving Card", prefix: "receiving-card:", href: "/led-display/accessories/receiving-card/" },
      { key: "controller" as FilterKey, title: "Controller", prefix: "controller:", href: "/led-display/accessories/controller/" },
      { key: "power-supply" as FilterKey, title: "Power Supply", prefix: "power-supply:", href: "/led-display/accessories/power-supply/" },
      { key: "led-accessories" as FilterKey, title: "LED Accessories", prefix: "led-accessories:", href: "/led-display/accessories/led-accessories/" },
    ];

    const visibleConfig = filter === "all" ? mobileConfig : mobileConfig.filter((section) => section.key === filter);

    return visibleConfig
      .map((section) => ({
        id: section.key,
        title: section.title,
        href: section.href,
        products: filtered.filter((p) => p.id.startsWith(section.prefix)),
      }))
      .filter((section) => section.products.length > 0);
  }, [filtered, filter, ledOnly]);

  const scrollMobileCarousel = (sectionId: string, direction: 1 | -1) => {
    const track = mobileCarouselRefs.current[sectionId];
    if (!track) return;
    const amount = Math.max(track.clientWidth - 64, 220) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const ledWhyChoose = [
    "LED modules combine to form a scalable screen for text, video, and live visuals",
    "Pixel pitch and viewing distance together decide clarity and reading comfort",
    "Indoor, outdoor, and rental formats are chosen based on environment and usage time",
    "Controller and content software enable scheduled updates without reprinting media",
    "Proper installation, calibration, and maintenance keep long-term performance stable",
  ];

  const ledHighlights = [
    {
      t: "Reliable Sourcing",
      d: "China import + BD stock. Genuine modules, controllers and accessories.",
      icon: "compare",
    },
    {
      t: "Expert Installation",
      d: "Site survey, structure, wiring, calibration - complete end-to-end service.",
      icon: "process",
    },
    {
      t: "After-Sales Support",
      d: "Maintenance, spare parts and troubleshooting - long-term peace of mind.",
      icon: "faq",
    },
  ];



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

  const trustedByBusinessesPoints = [
    {
      t: "Correct spec matching",
      d: "We match module scan/IC, receiving card, PSU capacity and processor, reducing common issues like flicker and shifting.",
      bullets: ["Mapping accuracy", "PSU sizing", "Processor compatibility"],
    },
    {
      t: "Professional installation",
      d: "Structure safety, neat cabling, earthing, and commissioning tests are done with a checklist-driven approach.",
      bullets: ["Structure & cable routing", "Grounding & SPD planning", "Burn-in + testing"],
    },
    {
      t: "After-sales support",
      d: "Spare planning guidance and troubleshooting support helps reduce downtime and keeps screens running.",
      bullets: ["Spare modules/PSU", "Remote support (system dependent)", "Maintenance schedule"],
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
  const mobileTotalPages = ledOnly ? Math.max(1, Math.ceil(filtered.length / mobilePageSize)) : desktopTotalPages;
  const mobileCurrentPage = ledOnly ? Math.min(Math.max(1, mobilePage), mobileTotalPages) : desktopCurrentPage;
  const mobileStartIndex = ledOnly ? (mobileCurrentPage - 1) * mobilePageSize : desktopStartIndex;
  const mobileEndIndex = ledOnly ? Math.min(mobileStartIndex + mobilePageSize, filtered.length) : desktopEndIndex;
  const mobilePagedProducts = ledOnly ? filtered.slice(mobileStartIndex, mobileEndIndex) : desktopPagedProducts;
  const mobilePaginationItems = ledOnly ? getPaginationItems(mobileCurrentPage, mobileTotalPages) : desktopPaginationItems;
  const showMobilePagination = ledOnly && filtered.length > 0 && mobileTotalPages > 1;
  const showFullList = ledOnly && fullListGroups.length > 0;

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

  useEffect(() => {
    if (!shouldPaginate) return;
    if (!gridTopRef.current) return;
    if (!scrollToGridOnNextPageChangeRef.current) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    requestAnimationFrame(() => {
      gridTopRef.current?.scrollIntoView({ behavior, block: "start" });
    });

    scrollToGridOnNextPageChangeRef.current = false;
  }, [desktopCurrentPage, mobileCurrentPage, shouldPaginate]);

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
        className={ledOnly ? "py-2" : "rounded-3xl border p-8 shadow-sm"}
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
        {ledOnly ? (
          <Breadcrumbs
            items={[homeBreadcrumb(), { href: "/led-display/", label: "LED Display", current: true }]}
            className="mb-3 pt-3 text-sm text-slate-600"
          />
        ) : null}
        <div
          className={
            ledOnly
              ? "mobile-page-intro-card bg-transparent px-0 py-0 text-left shadow-none md:rounded-[28px] md:border md:border-slate-200 md:bg-white md:px-8 md:py-7 md:text-center md:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
              : ""
          }
        >
          <h1 className={`${ledOnly ? "text-center " : ""}text-3xl font-extrabold text-slate-900 md:text-4xl`}>
          {ledOnly ? "LED Display Price in Bangladesh 2026" : "All LED Products & Accessories"}
        </h1>
          {ledOnly ? (
            <MobileIntroText
              teaser="Looking for the best LED display price in Bangladesh with indoor, outdoor and rental options in one place?"
              expandedClassName="mx-auto mt-4 max-w-6xl"
              desktopClassName="mx-auto mt-4 max-w-6xl"
            >
              <p className="text-justify text-[15px] leading-8 text-slate-700 md:text-[16px]">
                Looking for the best <strong>LED display price in Bangladesh</strong>? <strong>Sasha Corporation</strong> is a trusted <strong>LED display supplier in Bangladesh</strong>, offering <strong>indoor LED displays</strong> from <strong>P0.9-P3</strong> and <strong>outdoor LED screens</strong> from <strong>P2.5-P10</strong> for commercial advertising, corporate branding, events, shopping malls, mosques, universities, and government projects. We provide <strong>LED video walls</strong>, <strong>digital LED billboards</strong>, <strong>advertising LED displays</strong>, <strong>rental LED screen panels</strong>, and <strong>digital signage systems</strong> with professional installation, controller and CMS setup, maintenance support, and nationwide after-sales service across Bangladesh.
              </p>
            </MobileIntroText>
          ) : (
            <p className="mt-3 max-w-3xl text-slate-600">
              Indoor, Outdoor, Rental LED Displays, Receiving Cards, Controllers, and Power Supplies - all models in one place.
            </p>
          )}
        </div>
        {ledOnly ? (
          <div className="mt-3.5 rounded-[22px] border border-slate-200 bg-slate-50/90 p-2 shadow-sm md:p-2.5">
            <div className="grid gap-2 lg:grid-cols-4">
              {ledQuickActions.map((action) => {
                const content = (
                  <>
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        action.primary
                          ? "border-white/20 bg-white/12 text-white"
                          : "border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      <UiIcon name={action.icon} className="h-3 w-3" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-left">{action.label}</span>
                    <span className={action.primary ? "text-white/80" : "text-slate-400"} aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none">
                        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </>
                );

                const className = `group ${action.primary ? "inline-flex" : "hidden md:inline-flex"} min-h-[36px] items-center gap-2 rounded-[16px] border px-3 py-2 text-[11.5px] font-semibold transition hover:-translate-y-0.5 ${
                  action.primary
                    ? "border-transparent bg-[linear-gradient(135deg,#11a7c9_0%,#169bd5_58%,#1f7ae0_100%)] text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                }`;

                if (action.kind === "internal") {
                  return (
                    <Link key={action.label} prefetch={false} href={action.href} className={className}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className={className}
                    target={action.kind === "external" ? "_blank" : undefined}
                    rel={action.kind === "external" ? "noreferrer" : undefined}
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            <div className="mt-3 rounded-[20px] border border-slate-200 bg-white p-3 md:p-3.5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-[15px] font-extrabold text-slate-900 md:text-[16px]">
                  Explore LED Display Categories & Related Services
                </h2>
                <span className="inline-flex w-fit items-center rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-700">
                  Quick Links
                </span>
              </div>

              <div className="mt-3 flex flex-nowrap gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible md:pb-0 xl:grid-cols-8">
                {ledCategoryQuickLinks.map((item) => (
                  <Link
                    key={item.href}
                    prefetch={false}
                    href={item.href}
                    className="group inline-flex min-w-[110px] shrink-0 items-center gap-1.5 rounded-[14px] border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-semibold leading-tight text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm md:min-w-0 md:rounded-[16px] md:px-2.5 md:py-2 md:text-[10.5px]"
                  >
                    <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${item.tone} md:h-5.5 md:w-5.5`}>
                      <UiIcon name={item.icon} className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    </span>
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <span className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-none md:h-3 md:w-3">
                        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
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
        {ledOnly ? (
          <div className="mt-5 md:hidden">
            <div className="overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max min-w-full flex-nowrap gap-2">
                {filters.map((f) => {
                  const active = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => {
                        setFilter(f.key);
                        setPage(1);
                        setMobilePage(1);
                      }}
                      className="rounded-full border px-4 py-2 text-[11px] font-bold whitespace-nowrap transition"
                      style={{
                        borderColor: active ? "rgba(255,106,0,0.65)" : "rgba(103,232,249,0.28)",
                        background: active ? "linear-gradient(135deg, rgba(228,87,0,0.98), rgba(255,106,0,0.98))" : "rgba(103,232,249,0.10)",
                        color: active ? "#fff" : "#0f172a",
                        boxShadow: active ? "0 8px 18px rgba(255,106,0,0.22)" : "none",
                      }}
                    >
                      {f.key === "all" ? "All Products" : f.label}
                    </button>
                  );
                })}
              </div>
            </div>
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
                    setPage(1);
                    setMobilePage(1);
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
                setPage(1);
                setMobilePage(1);
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
                  setPage(1);
                  setMobilePage(1);
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
      <div ref={gridTopRef} className="scroll-mt-24" />
      <section className="mt-3 space-y-3 !bg-transparent !p-0 !shadow-none">
        {ledOnly ? (
          <>
            <div className="space-y-4 md:hidden">
              {mobileLedSections.map((section) => (
                <div key={section.id}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="text-sm font-extrabold leading-tight text-slate-900">{section.title}</div>
                    <Link
                      prefetch={false}
                      href={section.href}
                      className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-slate-800"
                    >
                      <span>View all</span>
                      <span className="text-[#F56605]">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                          <path d="M5 12h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => scrollMobileCarousel(section.id, -1)}
                      className="absolute -left-2 top-[28%] z-20 inline-flex -translate-y-1/2 items-center justify-center p-0 text-[#F56605] transition active:scale-95"
                      aria-label={`Previous ${section.title} products`}
                    >
                      <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_2px_4px_rgba(255,255,255,0.55)]" fill="none" aria-hidden="true">
                        <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className="overflow-hidden px-1">
                      <div
                        ref={(node) => {
                          mobileCarouselRefs.current[section.id] = node;
                        }}
                        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      >
                        {section.products.map((product) => (
                          <div key={product.id} className="min-w-[calc((100%-0.75rem)/2)] shrink-0 basis-[calc((100%-0.75rem)/2)] snap-start">
                            {renderCatalogCard(product)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollMobileCarousel(section.id, 1)}
                      className="absolute -right-2 top-[28%] z-20 inline-flex -translate-y-1/2 items-center justify-center p-0 text-[#F56605] transition active:scale-95"
                      aria-label={`Next ${section.title} products`}
                    >
                      <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_2px_4px_rgba(255,255,255,0.55)]" fill="none" aria-hidden="true">
                        <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              <ResponsiveProductCarousel className="product-grid-3" desktopClassName="md:grid-cols-2 lg:grid-cols-3" mobileGapClassName="gap-[10px]">
                {desktopPagedProducts.map(renderCatalogCard)}
              </ResponsiveProductCarousel>
            </div>
          </>
        ) : (
          <ResponsiveProductCarousel className="product-grid-3" desktopClassName="md:grid-cols-2 lg:grid-cols-3" mobileGapClassName="gap-[10px]">
            {desktopPagedProducts.map(renderCatalogCard)}
          </ResponsiveProductCarousel>
        )}

        {showMobilePagination && !ledOnly ? (
          <div className="flex flex-col items-center gap-2 md:hidden">
            <nav aria-label="Products pagination" className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  scrollToGridOnNextPageChangeRef.current = true;
                  setMobilePage((p) => Math.max(1, p - 1));
                }}
                disabled={mobileCurrentPage === 1}
                className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-slate-50 enabled:hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Previous
              </button>

              {mobilePaginationItems.map((item, idx) =>
                item === "..." ? (
                  <span key={`mobile-ellipsis-${idx}`} className="px-1 text-sm font-bold text-slate-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={`mobile-${item}`}
                    type="button"
                    onClick={() => {
                      scrollToGridOnNextPageChangeRef.current = true;
                      setMobilePage(item);
                    }}
                    className="min-w-9 rounded-xl border px-2.5 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
                    style={{
                      borderColor: item === mobileCurrentPage ? "rgba(14,116,144,0.75)" : "rgba(15,23,42,0.12)",
                      background: item === mobileCurrentPage ? "rgba(14,116,144,0.12)" : "white",
                      color: "#0f172a",
                      boxShadow: item === mobileCurrentPage ? "inset 0 0 0 2px rgba(14,116,144,0.65)" : undefined,
                    }}
                    aria-current={item === mobileCurrentPage ? "page" : undefined}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => {
                  scrollToGridOnNextPageChangeRef.current = true;
                  setMobilePage((p) => Math.min(mobileTotalPages, p + 1));
                }}
                disabled={mobileCurrentPage === mobileTotalPages}
                className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-slate-50 enabled:hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Next
              </button>
            </nav>
          </div>
        ) : null}

        {showDesktopPagination ? (
          <div className="hidden flex-col items-center gap-2 md:flex">
            <nav aria-label="Products pagination" className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  scrollToGridOnNextPageChangeRef.current = true;
                  setPage((p) => Math.max(1, p - 1));
                }}
                disabled={desktopCurrentPage === 1}
                className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-slate-50 enabled:hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Previous
              </button>

              {desktopPaginationItems.map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-sm font-bold text-slate-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      scrollToGridOnNextPageChangeRef.current = true;
                      setPage(item);
                    }}
                    className="min-w-10 rounded-xl border px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
                    style={{
                      borderColor: item === desktopCurrentPage ? "rgba(14,116,144,0.75)" : "rgba(15,23,42,0.12)",
                      background: item === desktopCurrentPage ? "rgba(14,116,144,0.12)" : "white",
                      color: item === desktopCurrentPage ? "#0f172a" : "#0f172a",
                      boxShadow: item === desktopCurrentPage ? "inset 0 0 0 2px rgba(14,116,144,0.65)" : undefined,
                    }}
                    aria-current={item === desktopCurrentPage ? "page" : undefined}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => {
                  scrollToGridOnNextPageChangeRef.current = true;
                  setPage((p) => Math.min(desktopTotalPages, p + 1));
                }}
                disabled={desktopCurrentPage === desktopTotalPages}
                className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-slate-50 enabled:hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Next
              </button>
            </nav>

          </div>
        ) : null}

      </section>

      {/* Empty state */}
	      {filtered.length === 0 && (
	        <section className={ledOnly ? "py-8 text-center text-slate-700" : "rounded-3xl border bg-white p-8 text-center text-slate-700"}>
	          <div className="text-lg font-bold text-slate-900">No products found</div>
	          <div className="mt-2 text-sm text-slate-600">Try changing the filter or search keyword.</div>
	        </section>
	      )}
	
	      {ledOnly && (
	        <>
	          <section className="py-8">
	            <div className="space-y-10">
	              <div>
	                <h2 className="text-2xl font-bold text-slate-900">What Is an LED Display?</h2>
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

	                <aside className="mt-6 rounded-2xl border border-[#FF6A00]/20 bg-orange-50/70 p-5 shadow-sm">
	                  <h3 className="text-lg font-extrabold text-slate-900">
	                    Every LED Display Is Built Using Multiple Hardware Components
	                  </h3>
	                  <p className="mt-3 text-sm leading-7 text-slate-700">
	                    A professional LED display is not just a screen. It is a complete electronic display system
	                    consisting of multiple hardware components that work together to deliver stable performance,
	                    accurate colors, seamless video playback, and long-term reliability.
	                  </p>
	                </aside>
	              </div>

	              <div ref={componentSectionRef}>
	                <h2 className="text-2xl font-bold text-slate-900">Main Components of an LED Display System</h2>
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
                    className="mt-6 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden"
                  >
                    {ledDisplayComponentCards.map((component, index) => (
                      <article
                        key={component.name}
                        className={`group flex w-[86%] shrink-0 snap-start flex-col rounded-[20px] border px-3.5 py-3 transition duration-300 ${componentMobileCardStyles[index % componentMobileCardStyles.length]}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/75 bg-white/85 text-[#F56605] shadow-sm">
                            <UiIcon name={component.icon} className="h-5 w-5" />
                          </div>
                          <h3 className="min-w-0 flex-1 text-[16px] font-extrabold leading-tight tracking-tight text-slate-900">
                            {component.name}
                          </h3>
                        </div>
                        <p className="mt-2.5 text-[12.5px] leading-[1.55] text-slate-700">{component.description}</p>
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

	                <div className="mt-6 hidden items-stretch gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
	                  {ledDisplayComponentCards.map((component) => (
		                    <article
		                      key={component.name}
		                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FF6A00]/50 hover:shadow-md"
		                    >
		                      <div className="flex items-center gap-3">
		                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#FF6A00]/20 bg-orange-50 text-[#FF6A00] transition group-hover:bg-[#FF6A00] group-hover:text-white">
		                          <UiIcon name={component.icon} className="h-6 w-6" />
		                        </div>
		                        <h3 className="text-lg font-extrabold leading-snug text-slate-900">{component.name}</h3>
		                      </div>
		                      <p className="mt-3 text-sm leading-7 text-slate-600">{component.description}</p>
		                    </article>
	                  ))}
	                </div>
	              </div>

	              <div>
	                <h2 className="text-2xl font-bold text-slate-900">How an LED Display System Works</h2>
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
	                    <h3 className="text-lg font-extrabold text-slate-900">Signal Flow</h3>
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

	                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
	                    <h3 className="text-lg font-extrabold text-slate-900">Power Flow</h3>
	                    <div className="mt-4 grid gap-2.5">
	                      {ledDisplayPowerFlow.map((step, index) => (
	                        <div key={step} className="flex items-center gap-2">
	                          <div className="mx-auto flex min-h-[2.9rem] w-full max-w-[17.5rem] items-center justify-center rounded-lg border border-cyan-200/75 bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_54%,#cffafe_100%)] px-2 py-2 text-center text-[11px] font-bold leading-4 text-slate-800 shadow-sm md:mx-0 md:min-h-14 md:max-w-none md:rounded-2xl md:border-slate-200 md:bg-white md:px-3 md:py-3 md:text-sm md:leading-6">
	                            {step}
	                          </div>
	                          <div
                              className={`w-3 text-[11px] font-extrabold text-[#FF6A00] md:text-sm ${
                                index < ledDisplayPowerFlow.length - 1 ? "opacity-100" : "opacity-0"
                              }`}
                              aria-hidden="true"
                            >
                              -&gt;
                            </div>
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

	          <section id="led-price-table" className="scroll-mt-24 py-8">
	            <h2 className="text-2xl font-bold text-slate-900">
	              LED Display Price List in Bangladesh
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
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">Indoor LED Display Price (P1.25-P3.076)</h3>
                <div className="mt-4 overflow-x-auto">
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

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">Outdoor LED Display Price (P2.5-P10)</h3>
                <div className="mt-4 overflow-x-auto">
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

            <p className="mt-1 text-sm leading-7 text-slate-600">
              Note: Prices may vary depending on configuration, installation scope, and order quantity.
            </p>
          </section>

          <section className="py-8 mb-[25px]">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-lg font-semibold text-slate-900">End-to-End LED Screen Implementation</div>
                <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
                  We help clients select the correct LED configuration based on viewing distance, environment, content type, and operational
                  requirements. Each project is planned with attention to power stability, structure safety, and long-term usability. Pricing is
                  specification-driven and clearly explained-covering modules, cabinets, control systems, structure, installation and calibration.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {ledEndToEndBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
                      <span className="leading-7">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link prefetch={false} href="/contact" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Request a Free Quotation -&gt;
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {ledReliabilityCards.map((card) => (
                  <div key={card.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <UiIcon name={card.icon} className="h-5 w-5" />
                      </div>
                      <div className="text-base font-semibold text-slate-900">{card.t}</div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-8 pb-[25px]">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {outdoorSignageBenefits.map((item, idx) => (
                <div
                  key={item.t}
                  className="rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: "rgba(255,106,0,0.16)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: "#FF6A00" }}
                    >
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{item.t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.d}</p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                        <span className="leading-6">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

          <section className="pt-8 pb-[25px]">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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
	                      <h3 className="text-xl font-extrabold leading-snug text-slate-900">{item.title}</h3>
	                    </div>
	                    <p className="mt-3 hidden text-sm leading-7 text-slate-600 md:block">{item.text}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FF6A00]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
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
                ].map((x) => (
                  <article key={x.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-base font-extrabold text-slate-900">{x.t}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
                  </article>
                ))}
              </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">What to share for an accurate LED display quotation</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                A quick site survey or clear project information helps avoid mismatched size, incorrect pixel pitch,
                power issues, and hidden installation cost. Sharing the right details early helps us recommend the
                correct LED screen price in Bangladesh with better accuracy.
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-700 md:grid-cols-2">
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
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
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">Indoor LED display: best for close viewing</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Suitable for showrooms, offices, lobbies, studios, and meeting rooms where text and fine details need to stay sharp at short distances.
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  {[
                    "Finer pixel pitch for crisp text and high detail.",
                    "Higher refresh rate options for clean camera capture (events/streaming).",
                    "Front-service vs rear-service planning based on access behind the wall.",
                    "Lower brightness target than outdoor, optimized for indoor comfort.",
                    "Color uniformity and calibration matter more for premium indoor walls.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "#FF6A00" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">Outdoor LED display: built for daylight and weather</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Recommended for roadside branding, shopfront signs, building facades, and public screens where sunlight, rain, and dust are key factors.
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  {[
                    "Higher brightness planning for daylight readability.",
                    "Cabinet protection level (IP) and waterproof cable routing.",
                    "Heat management and power stability for long running hours.",
                    "Wind-load and mounting structure checks for safety.",
                    "Service access strategy to keep maintenance fast and safe.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "#FF6A00" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
                href="/contact"
                className="hidden rounded-xl bg-[#FF6A00] px-6 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E45700] hover:shadow-md md:inline-flex"
              >
                Get a Recommendation -&gt;
              </Link>
            </div>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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
                <div key={item.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.d}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="py-3">
            <div className="sc-led-why-section">
              <div className="sc-led-why-head">
                <h2 className="sc-led-why-title text-2xl font-extrabold md:text-4xl">
                  Why Choose Sasha Corporation for LED Display Solutions?
                </h2>
                <MobileIntroText
                  teaser="Sasha Corporation supplies, installs, configures, and supports LED display solutions across Bangladesh."
                  className="sc-led-why-intro mt-3"
                  teaserClassName="w-full"
                  expandedClassName="text-sm leading-7 md:text-base md:leading-8"
                  desktopClassName="text-sm leading-7 md:text-base md:leading-8"
                >
                  <>
                    Sasha Corporation supplies, installs, configures, and supports LED display solutions across Bangladesh. We provide indoor LED displays, outdoor LED billboards, rental LED screens, LED video walls, controllers, receiving cards, power supplies, maintenance services, and after-sales technical support for commercial, corporate, event, and government projects. Our solutions come with 1-3 year warranty, 24/7 customer support, and regular maintenance services to ensure long-term performance and reliability.
                  </>
                </MobileIntroText>
              </div>

              <div className="sc-led-why-grid-wrap">
                <div className="sc-led-why-grid mt-4">
	                {sashaWhyChooseCards.map((item) => (
	                  <article key={item.title} className="sc-led-why-card">
	                    <div className="flex items-center gap-3">
	                      <div className="sc-led-why-card-icon shrink-0" aria-hidden="true">
	                        <UiIcon name={item.icon} className="h-5 w-5 text-[#FF6A00]" />
	                      </div>
	                      <h3 className="sc-led-why-card-title !mt-0">{item.title}</h3>
	                    </div>
	                    <p className="sc-led-why-card-text">{item.text}</p>
	                  </article>
	                ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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
                professional LED screen project is planned, installed, tested, and handed over in Bangladesh.
              </>
            </MobileIntroText>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                <article key={step.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-extrabold text-slate-900">{step.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.d}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-2 w-2 rounded-full bg-slate-900" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">Simple Timeline Overview</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
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
                  <div key={step.label} className="rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 text-center md:p-3">
                    <div className="mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-[#FF6A00] ring-1 ring-[#FF6A00]/10 md:h-10 md:w-10">
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
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <UiIcon name="solutions" className="h-6 w-6 text-slate-800" />
              <span>Trusted Technology Partners & Authorized Brands</span>
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
                {trustedTechPartnerLogos.map((b, idx) => (
                  <span key={b.name}>
                    <span className="font-bold text-slate-900" title={b.name} aria-label={b.name}>
                      {b.name}
                    </span>
                    {idx < trustedTechPartnerLogos.length - 2 ? ", " : idx === trustedTechPartnerLogos.length - 2 ? ", and " : ""}
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
                  <div className="flex w-max gap-3 animate-[renexMarquee_42s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                    {[...trustedTechPartnerLogos, ...trustedTechPartnerLogos].map((b, idx) => (
                      <div
                        key={`${b.name}-${idx}`}
                        className="flex h-16 w-40 shrink-0 items-center justify-center rounded-[20px] border bg-white px-4 shadow-sm"
                        style={{ borderColor: "rgba(255,106,0,0.12)" }}
                        title={b.name}
                        aria-label={b.name}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={b.src}
                          alt={b.name}
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
                </div>
              </div>

              <div className="mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-700 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
                {[
                  "Quality-focused workflow",
                  "Dedicated LED engineering team",
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
                <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {ledTrustedInstitutions.map((ins) => (
                <div
                  key={ins.name}
                  className="group flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center transition hover:bg-slate-100"
                  title={ins.name}
                  aria-label={ins.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ins.logo}
                    alt={ins.name}
                    className={
                      ins.logo === "/images/logo/nbr.webp"
                        ? "h-16 w-full object-contain sm:h-20"
                        : ins.logo === "/images/logo/Health-and-family-welfare.webp"
                          ? "h-16 w-full object-contain sm:h-20"
                          : ins.logo === "/images/logo/ecs.webp"
                            ? "h-16 w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/passport.webp"
                              ? "h-16 w-full object-contain sm:h-20"
                              : ins.logo === "/images/logo/bpsc.webp"
                                ? "h-20 w-full object-contain sm:h-24"
                                : ins.logo === "/images/logo/acc.webp"
                                  ? "h-16 w-full object-contain sm:h-20"
                                  : ins.logo === "/images/logo/dncc.webp"
                                    ? "h-16 w-full object-contain sm:h-20"
                                    : ins.logo === "/images/logo/dscc.webp"
                                      ? "h-20 w-full object-contain sm:h-24"
                                      : ins.logo === "/images/logo/sonali-bank.webp"
                                        ? "h-16 w-full object-contain sm:h-20"
                                        : ins.logo === "/images/logo/BSCIC.webp"
                                          ? "h-16 w-full object-contain sm:h-20"
                                          : ins.logo === "/images/logo/bsfic.webp"
                                            ? "h-16 w-full object-contain sm:h-20"
                                            : ins.logo === "/images/logo/parjatan.webp"
                                              ? "h-14 w-full object-contain sm:h-16"
                                              : ins.logo === "/images/logo/bgb.webp"
                                                ? "h-16 w-full object-contain sm:h-20"
                                                : ins.logo === "/images/logo/caab.webp"
                                                  ? "h-16 w-full object-contain sm:h-20"
                                                  : ins.logo === "/images/logo/brta.webp"
                                                    ? "h-16 w-full object-contain sm:h-20"
                                                    : ins.logo === "/images/logo/fire-service.webp"
                                                      ? "h-16 w-full object-contain sm:h-20"
                                                      : ins.logo === "/images/logo/ugc.webp"
                                                        ? "h-16 w-full object-contain sm:h-20"
                                                        : ins.logo === "/images/logo/ansar.webp"
                                                          ? "h-16 w-full object-contain sm:h-20"
                                                          : ins.logo === "/images/logo/bhbfc-logo-final.webp"
                                                            ? "h-20 w-full object-contain sm:h-24"
                                                            : ins.logo === "/images/logo/bpatc.webp"
                                                              ? "h-20 w-full object-contain sm:h-24"
                                                              : "h-10 w-full object-contain sm:h-11"
                    }
                    loading="lazy"
                  />
	                  <p
	                    className={
	                      ins.logo === "/images/logo/dscc.webp"
	                        ? "mt-3 text-center !text-center text-sm font-medium leading-snug text-slate-800 whitespace-nowrap"
	                        : "mt-3 text-center !text-center text-sm font-medium leading-snug text-slate-800"
	                    }
	                  >
                    {ins.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="led-faq" className="scroll-mt-24 pt-8 pb-[25px]">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <UiIcon name="faq" className="h-6 w-6 text-slate-800" />
              <span>Frequently Asked Questions About LED Display</span>
            </h2>
            <div className="mt-5">
              <FaqAccordion accent={BRAND.maroon} density="compact" items={ledFaqs} columns={2} />
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








