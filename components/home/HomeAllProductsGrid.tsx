"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "@/components/products/ProductGridCard";
import {
  controllerCatalog,
  getCardShort,
  getPitchLabel,
  indoorCatalog,
  ledAccessoriesCatalog,
  outdoorCatalog,
  powerSupplyCatalog,
  receivingCardCatalog,
  rentalCatalog,
} from "@/lib/productsCatalog";
import { getPaSystemCardPriceLabel, paSystemCatalog } from "@/modules/routes/catalog/control-systems/pa-system/catalog";
import { digitalPodiumCatalog } from "@/modules/routes/catalog/control-systems/digital-podium/catalog";
import { turnstileCatalog } from "@/modules/routes/catalog/control-systems/turnstile-gate-system/catalog";
import {
  getInteractiveFlatPanelBrandLabel,
  getInteractiveFlatPanelBullets,
  getInteractiveFlatPanelChips,
  interactiveFlatPanelCatalog,
} from "@/modules/routes/catalog/control-systems/interactive-flat-panel/catalog";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const PAGE_SIZE = 12;

type HomeProduct = {
  id: string;
  kind: "led" | "accessory" | "pa" | "turnstile" | "podium" | "interactive-flat-panel";
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge: string;
  pitch?: string;
  priceLine?: string;
  quickFeatures?: readonly string[];
  bestFor?: readonly string[];
  tags?: readonly string[];
  priceLabel?: string;
  keySpecs?: ReadonlyArray<{ k: string; v: string }>;
  turnstileKind?: (typeof turnstileCatalog)[number]["kind"];
  ifpBrand?: (typeof interactiveFlatPanelCatalog)[number]["brand"];
  ifpSize?: (typeof interactiveFlatPanelCatalog)[number]["sizeInch"];
};

function getLedCardBullets(product: HomeProduct): string[] {
  return buildLedProductCardHighlights({
    keySpecs: product.keySpecs,
    pitch: product.pitch ? formatPitchDisplay(product.pitch) : "",
    quickFeatures: product.quickFeatures,
    bestFor: product.bestFor,
    subtitle: product.subtitle,
    category: product.badge.toLowerCase(),
  });
}

type HomeFilterKey =
  | "all"
  | "indoor"
  | "outdoor"
  | "rental"
  | "receiving-card"
  | "controller"
  | "power-supply"
  | "led-accessories"
  | "pa-system"
  | "turnstile-gate"
  | "digital-podium"
  | "interactive-flat-panel";

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

function formatPitchDisplay(pitch?: string): string {
  if (!pitch) return "";
  const m = pitch.match(/(\d+(?:\.\d+)?)/);
  return m?.[1] ? `${m[1]} mm` : pitch;
}

function inferPaBestFor(item: (typeof paSystemCatalog)[number]): string[] {
  if (item.bestFor?.length) return item.bestFor.slice(0, 3);

  const text = `${item.title} ${item.subtitle} ${(item.tags ?? []).join(" ")}`.toLowerCase();
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

  if (picks.length) return picks.slice(0, 3);
  return (item.tags ?? []).slice(0, 3);
}

function getPaCardFeatures(item: (typeof paSystemCatalog)[number]): string[] {
  if (item.quickFeatures?.length) return item.quickFeatures.slice(0, 4);
  if (item.tags?.length) return item.tags.slice(0, 4);
  return [];
}

function getTurnstileKindLabel(kind: (typeof turnstileCatalog)[number]["kind"]): string {
  switch (kind) {
    case "tripod_turnstile":
      return "Tripod turnstile";
    case "flap_barrier":
      return "Flap barrier";
    case "swing_speed_gate":
      return "Swing / speed gate";
    case "full_height_turnstile":
      return "Full-height turnstile";
    case "waist_high_turnstile":
      return "Waist-high turnstile";
    case "ai_face_turnstile":
      return "AI face gate";
    default:
      return "Turnstile gate";
  }
}

function getTurnstileListingQuickFeatures(item: (typeof turnstileCatalog)[number]): string[] {
  switch (item.kind) {
    case "tripod_turnstile":
      return ["Single-lane controlled entry", "RFID/biometric device integration", "Great for staff gates", "Attendance + access logging"];
    case "flap_barrier":
      return ["Premium lobby appearance", "Optical sensors for passage control", "Anti-tailgating logic (setup dependent)", "RFID/face/QR workflows"];
    case "swing_speed_gate":
      return ["Fast passage + sensors", "Wide-lane friendly (accessibility)", "Modern premium entrance look", "RFID/face/QR workflows"];
    case "full_height_turnstile":
      return ["Strong physical security", "Best for restricted zones", "Ideal for factories & perimeter entry", "Access logging + compliance"];
    case "waist_high_turnstile":
      return ["Durable gate option", "Moderate traffic flow", "Flexible single/double lane options", "RFID/biometric integration"];
    case "ai_face_turnstile":
      return ["Touchless face recognition option", "Fast verification workflow", "Attendance/HR reporting support", "Anti-passback rules (optional)"];
    default:
      return ["Access control integration", "Lane planning + commissioning", "Entry/exit log support", "Project-based configuration"];
  }
}

function getTurnstileListingBestFor(item: (typeof turnstileCatalog)[number]): string[] {
  switch (item.kind) {
    case "tripod_turnstile":
      return ["Factory entry", "Campus gate", "Office staff entry"];
    case "flap_barrier":
      return ["Bank entrance", "Corporate lobby", "Government building"];
    case "swing_speed_gate":
      return ["Premium lobbies", "Hospitals/clinics", "Visitor lanes"];
    case "full_height_turnstile":
      return ["Restricted zones", "Perimeter entry", "High-security sites"];
    case "waist_high_turnstile":
      return ["General entry points", "Moderate traffic areas", "Staff entrances"];
    case "ai_face_turnstile":
      return ["Smart offices", "Factories (attendance)", "IT parks"];
    default:
      return ["Access control projects", "Attendance workflows", "Site entrances"];
  }
}

function subtitleToBullets(subtitle: string): string[] {
  const normalized = subtitle.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const primary = normalized
    .split(/[...|.......;]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 4);

  if (primary.length >= 2) return primary.slice(0, 4);

  const secondary = normalized
    .split(/[,/|]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 4);

  return (secondary.length ? secondary : [normalized]).slice(0, 4);
}

export default function HomeAllProductsGrid() {
  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const scrollToGridOnNextPageChangeRef = useRef(false);
  const mobileCarouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [filter, setFilter] = useState<HomeFilterKey>("all");
  const [page, setPage] = useState(1);

  const imageFitFixIds = useMemo(
    () =>
      new Set<string>([
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
      ]),
    [],
  );

  const products = useMemo<HomeProduct[]>(() => {
    const basePath = "/led-display";

    const ledIndoor: HomeProduct[] = indoorCatalog.map((p) => ({
      id: `led:indoor:${p.slug}`,
      kind: "led",
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

    const ledOutdoor: HomeProduct[] = outdoorCatalog
      .filter((p) => p.slug !== "p10-outdoor-led-display-module")
      .map((p) => ({
      id: `led:outdoor:${p.slug}`,
      kind: "led",
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

    const ledRental: HomeProduct[] = rentalCatalog.map((p) => ({
      id: `led:rental:${p.slug}`,
      kind: "led",
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

    const interactiveFlat: HomeProduct[] = interactiveFlatPanelCatalog.map((p) => ({
      id: `ifp:${p.slug}`,
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

    const receiving: HomeProduct[] = receivingCardCatalog.map((p) => ({
      id: `acc:receiving:${p.slug}`,
      kind: "accessory",
      title: p.title,
      subtitle: p.subtitle,
      image: p.image,
      href: `${basePath}/accessories/receiving-card/${p.slug}/`,
      badge: "Receiving Card",
      priceLine: p.cardPrice,
      quickFeatures: p.quickFeatures ?? [],
      bestFor: [],
    }));

    const controllers: HomeProduct[] = controllerCatalog.map((p) => ({
      id: `acc:controller:${p.slug}`,
      kind: "accessory",
      title: p.title,
      subtitle: p.subtitle,
      image: p.image,
      href: `${basePath}/accessories/controller/${p.slug}/`,
      badge: "Controller",
      priceLine: p.cardPrice,
      quickFeatures: p.quickFeatures ?? [],
      bestFor: p.bestFor ?? [],
    }));

    const psu: HomeProduct[] = powerSupplyCatalog.map((p) => ({
      id: `acc:psu:${p.slug}`,
      kind: "accessory",
      title: p.title,
      subtitle: p.subtitle,
      image: p.image,
      href: `${basePath}/accessories/power-supply/${p.slug}/`,
      badge: "Power Supply",
      priceLine: p.cardPrice,
      quickFeatures: p.quickFeatures ?? [],
      bestFor: p.bestFor ?? [],
    }));

    const ledAccessories: HomeProduct[] = ledAccessoriesCatalog.map((p) => ({
      id: `acc:led-accessories:${p.slug}`,
      kind: "accessory",
      title: p.title,
      subtitle: p.subtitle,
      image: p.image,
      href: `${basePath}/accessories/led-accessories/${p.slug}/`,
      badge: "LED Accessories",
      quickFeatures: p.quickFeatures ?? [],
      tags: p.tags ?? [],
      priceLine: p.cardPrice,
    }));

    const pa: HomeProduct[] = paSystemCatalog.map((p) => {
      const features = getPaCardFeatures(p);
      const bestFor = inferPaBestFor(p);
      return {
        id: `pa:${p.slug}`,
        kind: "pa",
        title: p.title,
        subtitle: p.subtitle,
        image: p.image,
        href: `/pa-system/${p.slug}/`,
        badge: "PA Sound",
        priceLabel: p.priceLabel,
        quickFeatures: features,
        bestFor,
      };
    });

    const turnstile: HomeProduct[] = turnstileCatalog.map((p) => ({
      id: `turnstile:${p.slug}`,
      kind: "turnstile",
      title: p.title,
      subtitle: p.subtitle,
      image: p.image,
      href: `/turnstile-gate/${p.slug}/`,
      badge: "Turnstile Gate",
      priceLabel: p.priceLabel,
      quickFeatures: getTurnstileListingQuickFeatures(p),
      bestFor: getTurnstileListingBestFor(p),
      turnstileKind: p.kind,
    }));

    const podium: HomeProduct[] = digitalPodiumCatalog.map((p) => ({
      id: `podium:${p.slug}`,
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

    return [
      ...ledIndoor,
      ...ledOutdoor,
      ...ledRental,
      ...interactiveFlat,
      ...podium,
      ...receiving,
      ...controllers,
      ...psu,
      ...pa,
      ...turnstile,
      ...ledAccessories,
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    if (filter === "all") {
      const page1Config = [
        { prefix: "led:indoor:", count: 2 },
        { prefix: "led:outdoor:", count: 2 },
        { prefix: "ifp:", count: 2 },
        { prefix: "podium:", count: 2 },
        { prefix: "pa:", count: 2 },
        { prefix: "turnstile:", count: 2 },
      ];

      const page1Items: HomeProduct[] = [];
      const usedIds = new Set<string>();

      page1Config.forEach((cfg) => {
        const matches = products.filter((p) => p.id.startsWith(cfg.prefix)).slice(0, cfg.count);
        matches.forEach((m) => {
          page1Items.push(m);
          usedIds.add(m.id);
        });
      });

      const remaining = products.filter((p) => !usedIds.has(p.id));
      return [...page1Items, ...remaining];
    }

    const matchPrefix =
      filter === "indoor"
        ? "led:indoor:"
        : filter === "outdoor"
          ? "led:outdoor:"
          : filter === "rental"
            ? "led:rental:"
          : filter === "receiving-card"
            ? "acc:receiving:"
            : filter === "controller"
              ? "acc:controller:"
              : filter === "power-supply"
                ? "acc:psu:"
                : filter === "led-accessories"
                  ? "acc:led-accessories:"
                  : filter === "pa-system"
                    ? "pa:"
                    : filter === "digital-podium"
                      ? "podium:"
                      : filter === "interactive-flat-panel"
                        ? "ifp:"
                        : "turnstile:";

    return products.filter((p) => p.id.startsWith(matchPrefix));
  }, [filter, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(filteredProducts.length, startIndex + PAGE_SIZE);
  const paged = filteredProducts.slice(startIndex, endIndex);
  const paginationItems = useMemo(() => getPaginationItems(currentPage, totalPages), [currentPage, totalPages]);

  useEffect(() => {
    if (!scrollToGridOnNextPageChangeRef.current) return;
    scrollToGridOnNextPageChangeRef.current = false;
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const filters: Array<{ key: HomeFilterKey; label: string }> = [
    { key: "all", label: "All" },
    { key: "indoor", label: "Indoor LED" },
    { key: "outdoor", label: "Outdoor LED" },
    { key: "rental", label: "Rental LED" },
    { key: "interactive-flat-panel", label: "Interactive Panel" },
    { key: "digital-podium", label: "Digital Podium" },
    { key: "receiving-card", label: "Receiving Card" },
    { key: "controller", label: "Controller" },
    { key: "power-supply", label: "Power Supply" },
    { key: "pa-system", label: "PA System" },
    { key: "turnstile-gate", label: "Turnstile Gate" },
    { key: "led-accessories", label: "LED Accessories" },
  ];

  const filterLabelMap = useMemo(
    () =>
      Object.fromEntries(filters.map((item) => [item.key, item.label])) as Record<HomeFilterKey, string>,
    [filters],
  );

  const mobileSections = useMemo(() => {
    const mobileConfig = filter === "all"
      ? [
          { key: "indoor" as HomeFilterKey, title: "Indoor LED Screens", prefix: "led:indoor:" },
          { key: "outdoor" as HomeFilterKey, title: "Outdoor LED Billboards", prefix: "led:outdoor:" },
          { key: "rental" as HomeFilterKey, title: "Rental LED Screens", prefix: "led:rental:" },
          { key: "pa-system" as HomeFilterKey, title: "PA Sound Systems", prefix: "pa:" },
        ]
      : [
          {
            key: filter,
            title: filter === "all" ? "All Products" : filterLabelMap[filter],
            prefix:
              filter === "indoor"
                ? "led:indoor:"
                : filter === "outdoor"
                  ? "led:outdoor:"
                  : filter === "rental"
                    ? "led:rental:"
                  : filter === "receiving-card"
                    ? "acc:receiving:"
                    : filter === "controller"
                      ? "acc:controller:"
                      : filter === "power-supply"
                        ? "acc:psu:"
                        : filter === "led-accessories"
                          ? "acc:led-accessories:"
                          : filter === "pa-system"
                            ? "pa:"
                            : filter === "digital-podium"
                              ? "podium:"
                              : filter === "interactive-flat-panel"
                                ? "ifp:"
                                : "turnstile:",
          },
        ];

    return mobileConfig
      .map((section) => ({
        id: section.key,
        title: section.title,
        products: products.filter((p) => p.id.startsWith(section.prefix)),
      }))
      .filter((section) => section.products.length);
  }, [filter, filterLabelMap, products]);

  const scrollMobileCarousel = (sectionId: string, direction: 1 | -1) => {
    const track = mobileCarouselRefs.current[sectionId];
    if (!track) return;
    const amount = Math.max(track.clientWidth - 64, 220) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const renderProductCard = (p: HomeProduct, compactMobile = false) => {
    const imageClassName = compactMobile
      ? "object-cover object-center transition duration-300 group-hover:scale-[1.03]"
      : "object-cover object-center transition duration-300 group-hover:scale-[1.03]";

    const bullets =
      p.kind === "led"
        ? getLedCardBullets(p)
        : p.quickFeatures?.length
          ? p.quickFeatures.slice(0, 4)
          : p.tags?.length
            ? p.tags.slice(0, 4)
            : subtitleToBullets(p.subtitle);

    const chips = p.bestFor?.length ? p.bestFor.slice(0, 3) : (p.tags ?? []).slice(0, 3);

    const topRightBadge =
      p.kind === "turnstile"
        ? { text: getTurnstileKindLabel(p.turnstileKind ?? "tripod_turnstile"), tone: "dark" as const }
        : p.kind === "podium"
          ? { text: "Control", tone: "dark" as const }
          : p.kind === "accessory"
            ? { text: "Accessories", tone: "dark" as const }
            : p.kind === "interactive-flat-panel" && p.ifpBrand && p.ifpSize
              ? { text: `${getInteractiveFlatPanelBrandLabel(p.ifpBrand)} ... ${p.ifpSize}"`, tone: "dark" as const }
              : p.kind === "led" && p.pitch
                ? { text: p.pitch, tone: "dark" as const }
                : undefined;

    const metaLines: Array<{ text: string; className?: string }> = [];
    if (p.kind === "led" && p.priceLine) metaLines.push({ text: p.priceLine, className: "mt-1 text-sm font-semibold text-sky-700" });
    if (p.kind === "accessory" && p.priceLine) metaLines.push({ text: p.priceLine, className: "mt-1 text-sm font-semibold text-sky-700" });

    if (p.kind === "interactive-flat-panel") {
      if (p.priceLabel) {
        metaLines.push({ text: p.priceLabel, className: "mt-1 text-sm font-semibold text-sky-700" });
      }
      metaLines.push({ text: p.subtitle, className: "mt-2 text-sm leading-7 text-slate-600 line-clamp-3" });
    } else if (p.kind === "pa" && p.priceLabel) {
      const cardPrice = getPaSystemCardPriceLabel({ priceLabel: p.priceLabel });
      if (cardPrice) {
        metaLines.push({ text: `Price: ${cardPrice}`, className: "mt-1 text-sm font-semibold text-sky-700" });
      }
    } else if ((p.kind === "turnstile" || p.kind === "podium") && p.priceLabel) {
      metaLines.push({ text: `Price: ${p.priceLabel}`, className: "mt-1 text-sm font-semibold text-sky-700" });
    }

    return (
      <ProductGridCard
        key={p.id}
        href={p.href}
        title={p.title}
        image={<Image src={p.image} alt={p.title} fill sizes={compactMobile ? "50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"} className={imageClassName} />}
        imageContainerClassName="bg-white"
        borderColor={`${BRAND.maroon}12`}
        topLeftBadge={p.kind === "led" ? undefined : { text: p.badge, tone: "light" }}
        topRightBadge={p.kind === "led" ? undefined : topRightBadge}
        metaLines={metaLines}
        bullets={bullets}
        chips={chips}
        accentColor={BRAND.maroon}
        contactHref="/contact"
        compactMobile={compactMobile}
        viewDetailsLabel="View details ->"
      />
    );
  };

  const renderMobileProductCard = (p: HomeProduct) => {
    const displayTitle = p.title.replace(/\s*&\s*/g, " and ");

    return (
      <article
        className="flex h-full flex-col overflow-hidden rounded-md border bg-white shadow-sm"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <Link prefetch={false} href={p.href} className="relative block aspect-[4/3] overflow-hidden bg-slate-50" aria-label={`View details: ${displayTitle}`}>
          <Image
            src={p.image}
            alt={displayTitle}
            fill
            sizes="50vw"
            className="object-cover object-center transition duration-300"
          />
        </Link>

        <div className="flex flex-1 flex-col p-3">
          <div className="min-h-[2.55rem] line-clamp-2 text-[13px] font-bold leading-snug text-slate-900">
            {displayTitle}
          </div>

          <div className="mt-auto pt-3">
            <Link
              prefetch={false}
              href={p.href}
              className="inline-flex min-h-9 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold leading-tight text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
            >
              View details
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div>
      <div ref={gridTopRef} className="scroll-mt-24" />

      <section className="md:hidden">
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

        <div className="mt-4 space-y-4">
          {mobileSections.map((section) => (
            <div
              key={section.id}
              className="p-0"
            >
              <div className="mb-2 text-sm font-extrabold leading-tight text-slate-900">
                {section.title}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => scrollMobileCarousel(section.id, -1)}
                  className="absolute -left-3 top-[28%] z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-md transition active:scale-95"
                  style={{ background: "#F56605" }}
                  aria-label={`Previous ${section.title} products`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
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
                    {section.products.map((p) => (
                      <div key={p.id} className="min-w-[calc((100%-0.75rem)/2)] shrink-0 basis-[calc((100%-0.75rem)/2)] snap-start">
                        {renderMobileProductCard(p)}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollMobileCarousel(section.id, 1)}
                  className="absolute -right-3 top-[28%] z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-md transition active:scale-95"
                  style={{ background: "#F56605" }}
                  aria-label={`Next ${section.title} products`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link
            prefetch={false}
            href="/led-display/"
            className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            View All Products
          </Link>
        </div>
      </section>

      <div className="mb-4 hidden flex-wrap gap-2 md:flex">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setFilter(f.key);
                setPage(1);
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

      <section className="product-grid-3 hidden items-stretch gap-[10px] sm:grid-cols-2 lg:grid-cols-3 md:grid">
        {paged.map((p) => renderProductCard(p))}
      </section>

      {filteredProducts.length > PAGE_SIZE ? (
        <section className="mt-4 hidden md:block">
          <div className="flex flex-col items-center gap-3">
            <nav aria-label="Products pagination" className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  scrollToGridOnNextPageChangeRef.current = true;
                  setPage((p) => Math.max(1, p - 1));
                }}
                disabled={currentPage === 1}
                className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-slate-50 enabled:hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Previous
              </button>

              {paginationItems.map((item, idx) =>
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
                      borderColor: item === currentPage ? "rgba(14,116,144,0.75)" : "rgba(15,23,42,0.12)",
                      background: item === currentPage ? "rgba(14,116,144,0.12)" : "white",
                      color: item === currentPage ? "#0f172a" : "#0f172a",
                      boxShadow: item === currentPage ? "inset 0 0 0 2px rgba(14,116,144,0.65)" : undefined,
                    }}
                    aria-current={item === currentPage ? "page" : undefined}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => {
                  scrollToGridOnNextPageChangeRef.current = true;
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
                disabled={currentPage === totalPages}
                className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-slate-50 enabled:hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                Next
              </button>
            </nav>

            <div className="text-sm font-medium text-slate-600">
              Showing {startIndex + 1}-{endIndex} of {filteredProducts.length} products
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
