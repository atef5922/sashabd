"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";

import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import { normalizeDisplayedPriceText } from "@/lib/price";
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
  conferenceSystemCatalog,
  getConferenceProductPriceLabel,
  getConferenceProductPrimaryImage,
} from "@/app/conference-system/catalog";
import { getConferenceProductDisplayType } from "@/app/conference-system/conferenceProductDisplayType";
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
  kind: "led" | "conference" | "accessory" | "pa" | "turnstile" | "podium" | "interactive-flat-panel";
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
  brandName?: string;
  brandSlug?: string;
  conferencePriceType?: "fixed" | "range" | "request";
  conferencePriceMin?: number;
  conferencePriceMax?: number;
  productTypeLabel?: string;
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

type HomeCategoryKey =
  | "all"
  | "led-display"
  | "conference-system"
  | "pa-system"
  | "turnstile-gate"
  | "digital-podium"
  | "interactive-flat-panel"
  | "accessories";

type HomeSortKey = "recommended" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

type SimpleFilterGroup = "category" | "price";

const HOME_PRICE_OPTIONS = [
  ["under-25k", "Under ৳25,000"],
  ["25k-50k", "৳25,000–৳49,999"],
  ["50k-100k", "৳50,000–৳99,999"],
  ["100k-200k", "৳100,000–৳199,999"],
  ["over-200k", "৳200,000+"],
  ["request", "Request Price"],
] as const;

function matchesHomeCategory(product: HomeProduct, category: HomeCategoryKey): boolean {
  if (category === "all") return true;
  if (category === "led-display") return product.kind === "led";
  if (category === "conference-system") return product.kind === "conference";
  if (category === "pa-system") return product.kind === "pa";
  if (category === "turnstile-gate") return product.kind === "turnstile";
  if (category === "digital-podium") return product.kind === "podium";
  if (category === "interactive-flat-panel") return product.kind === "interactive-flat-panel";
  return product.kind === "accessory";
}

function getHomeCategoryHref(category: HomeCategoryKey): string {
  switch (category) {
    case "conference-system":
      return "/conference-system/";
    case "pa-system":
      return "/pa-system/";
    case "turnstile-gate":
      return "/turnstile-gate/";
    case "digital-podium":
      return "/digital-podium/";
    case "interactive-flat-panel":
      return "/interactive-flat-panel/";
    case "accessories":
      return "/led-display/accessories/";
    default:
      return "/led-display/";
  }
}

function getHomeProductPrice(product: HomeProduct): string {
  if (product.priceLine) return normalizeDisplayedPriceText(product.priceLine);
  if (product.kind === "pa" && product.priceLabel) {
    return normalizeDisplayedPriceText(getPaSystemCardPriceLabel({ priceLabel: product.priceLabel }) ?? product.priceLabel);
  }
  if (product.priceLabel) return normalizeDisplayedPriceText(product.priceLabel);
  return "Request quotation";
}

function getHomeProductNumericPrice(product: HomeProduct, useMaximum = false): number | null {
  if (product.kind === "conference") {
    if (product.conferencePriceType === "request") return null;
    return useMaximum
      ? product.conferencePriceMax ?? product.conferencePriceMin ?? null
      : product.conferencePriceMin ?? product.conferencePriceMax ?? null;
  }
  const priceText = getHomeProductPrice(product).replace(/,/g, "");
  const match = priceText.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function homePriceMatchesBand(product: HomeProduct, band: string): boolean {
  const minimum = getHomeProductNumericPrice(product);
  if (minimum === null) return band === "request";
  switch (band) {
    case "under-25k":
      return minimum < 25_000;
    case "25k-50k":
      return minimum >= 25_000 && minimum < 50_000;
    case "50k-100k":
      return minimum >= 50_000 && minimum < 100_000;
    case "100k-200k":
      return minimum >= 100_000 && minimum < 200_000;
    case "over-200k":
      return minimum >= 200_000;
    default:
      return false;
  }
}

const VERIFIED_HOME_BRANDS = [
  "Bosch",
  "TOA",
  "SPON",
  "CMX",
  "LG",
  "Samsung",
  "Newline",
  "iScreen",
  "iBoard",
  "Huidu",
  "NovaStar",
  "Colorlight",
  "G-Energy",
] as const;

function brandSlug(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inferVerifiedHomeBrand(title: string, tags: readonly string[] = []): { name: string; slug: string } | null {
  const haystack = `${title} ${tags.join(" ")}`.toLowerCase();
  const matched = VERIFIED_HOME_BRANDS.find((brand) => {
    const normalized = brand.toLowerCase();
    return new RegExp(`(^|[^a-z0-9])${normalized.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}([^a-z0-9]|$)`, "i").test(haystack);
  });
  return matched ? { name: matched, slug: brandSlug(matched) } : null;
}

function getBadgeClass(kind: HomeProduct["kind"], badge?: string): string {
  switch (kind) {
    case "led":
      return "bg-[#ef4a00]";
    case "conference":
      switch (badge?.toUpperCase()) {
        case "BOSCH":
          return "bg-[#e30613]";
        case "TOA":
          return "bg-[#65717d]";
        case "CMX":
          return "bg-[#ef6c00]";
        default:
          return "bg-[#0868b5]";
      }
    case "pa":
      return "bg-sky-700";
    case "turnstile":
      return "bg-emerald-700";
    case "podium":
      return "bg-violet-700";
    case "interactive-flat-panel":
      return "bg-indigo-700";
    default:
      return "bg-slate-700";
  }
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
  const searchInputId = useId();
  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const scrollToGridOnNextPageChangeRef = useRef(false);
  const mobileCarouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [category, setCategory] = useState<HomeCategoryKey>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<HomeSortKey>("recommended");
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [selectedPriceBands, setSelectedPriceBands] = useState<string[]>([]);
  const [openFilterGroups, setOpenFilterGroups] = useState<SimpleFilterGroup[]>(["category", "price"]);
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  useEffect(() => {
    if (!mobileFilterDrawerOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFilterDrawerOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileFilterDrawerOpen]);

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
      brandName: getInteractiveFlatPanelBrandLabel(p.brand),
      brandSlug: brandSlug(getInteractiveFlatPanelBrandLabel(p.brand)),
    }));

    const conference: HomeProduct[] = conferenceSystemCatalog.map((p) => {
      const primaryImage = getConferenceProductPrimaryImage(p);
      return {
        id: `conference:${p.slug}`,
        kind: "conference",
        title: p.name,
        subtitle: p.shortDescription,
        image: primaryImage.src,
        href: `/conference-system/${p.slug}/`,
        badge: p.brand?.name ?? "Conference",
        priceLabel: getConferenceProductPriceLabel(p),
        quickFeatures: p.keyFeatures.slice(0, 4),
        bestFor: p.applications.slice(0, 3),
        tags: p.tags,
        brandName: p.brand?.name,
        brandSlug: p.brand?.slug,
        conferencePriceType: p.price.type,
        conferencePriceMin: p.price.type === "fixed" ? p.price.amount : p.price.type === "range" ? p.price.min : undefined,
        conferencePriceMax: p.price.type === "fixed" ? p.price.amount : p.price.type === "range" ? p.price.max : undefined,
        productTypeLabel: getConferenceProductDisplayType(p),
      };
    });

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

    const allProducts: HomeProduct[] = [
      ...ledIndoor,
      ...ledOutdoor,
      ...ledRental,
      ...conference,
      ...interactiveFlat,
      ...podium,
      ...receiving,
      ...controllers,
      ...psu,
      ...pa,
      ...turnstile,
      ...ledAccessories,
    ];

    return allProducts.map((product) => {
      if (product.brandName && product.brandSlug) return product;
      const inferredBrand = inferVerifiedHomeBrand(product.title, product.tags);
      return inferredBrand
        ? { ...product, brandName: inferredBrand.name, brandSlug: inferredBrand.slug }
        : product;
    });
  }, []);

  const recommendedProducts = useMemo(() => {
    const page1Config = [
      { prefix: "led:indoor:", count: 2 },
      { prefix: "led:outdoor:", count: 2 },
      { prefix: "conference:", count: 2 },
      { prefix: "ifp:", count: 1 },
      { prefix: "podium:", count: 1 },
      { prefix: "pa:", count: 2 },
      { prefix: "turnstile:", count: 2 },
    ];
    const featured: HomeProduct[] = [];
    const usedIds = new Set<string>();
    page1Config.forEach(({ prefix, count }) => {
      products.filter((product) => product.id.startsWith(prefix)).slice(0, count).forEach((product) => {
        featured.push(product);
        usedIds.add(product.id);
      });
    });
    return [...featured, ...products.filter((product) => !usedIds.has(product.id))];
  }, [products]);

  const categoryProducts = useMemo(
    () => recommendedProducts.filter((product) => matchesHomeCategory(product, category)),
    [category, recommendedProducts],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matched = categoryProducts.filter((product) => {
      const searchMatches = !normalizedQuery || [
        product.title,
        product.subtitle,
        product.badge,
        product.pitch,
        product.productTypeLabel,
        product.brandName,
        ...(product.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      const priceMatches = !selectedPriceBands.length || selectedPriceBands.some((band) => homePriceMatchesBand(product, band));
      return searchMatches && priceMatches;
    });

    if (sort === "recommended") return matched;
    if (sort === "name-asc" || sort === "name-desc") {
      return [...matched].sort((a, b) =>
        sort === "name-asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
      );
    }
    const highToLow = sort === "price-desc";
    return [...matched].sort((a, b) => {
      const aPrice = getHomeProductNumericPrice(a, highToLow);
      const bPrice = getHomeProductNumericPrice(b, highToLow);
      if (aPrice === null || bPrice === null) {
        if (aPrice === bPrice) return 0;
        return aPrice === null ? 1 : -1;
      }
      return highToLow ? bPrice - aPrice : aPrice - bPrice;
    });
  }, [categoryProducts, query, selectedPriceBands, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(filteredProducts.length, startIndex + pageSize);
  const paged = filteredProducts.slice(startIndex, endIndex);
  const paginationItems = useMemo(() => getPaginationItems(currentPage, totalPages), [currentPage, totalPages]);

  useEffect(() => {
    if (!scrollToGridOnNextPageChangeRef.current) return;
    scrollToGridOnNextPageChangeRef.current = false;
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const categories = useMemo<Array<{ key: HomeCategoryKey; label: string }>>(
    () => [
      { key: "all", label: "All Products" },
      { key: "led-display", label: "LED Display" },
      { key: "conference-system", label: "Conference System" },
      { key: "pa-system", label: "PA System" },
      { key: "turnstile-gate", label: "Turnstile Gate" },
      { key: "interactive-flat-panel", label: "Interactive Panel" },
      { key: "digital-podium", label: "Digital Podium" },
      { key: "accessories", label: "Accessories" },
    ],
    [],
  );

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((item) => [item.key, products.filter((product) => matchesHomeCategory(product, item.key)).length]),
      ) as Record<HomeCategoryKey, number>,
    [categories, products],
  );

  const priceCounts = useMemo(
    () => Object.fromEntries(HOME_PRICE_OPTIONS.map(([value]) => [value, categoryProducts.filter((product) => homePriceMatchesBand(product, value)).length])),
    [categoryProducts],
  );

  const activeFilterCount = (category === "all" ? 0 : 1) + selectedPriceBands.length;

  const selectCategory = (nextCategory: HomeCategoryKey) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const toggleListValue = (setter: Dispatch<SetStateAction<string[]>>, value: string) => {
    setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
    setPage(1);
  };

  const toggleFilterGroup = (group: SimpleFilterGroup) => {
    setOpenFilterGroups((current) =>
      current.includes(group) ? current.filter((item) => item !== group) : [...current, group],
    );
  };

  const clearAllFilters = () => {
    setCategory("all");
    setSelectedPriceBands([]);
    setQuery("");
    setPage(1);
  };

  const categoryLabelMap = useMemo(
    () =>
      Object.fromEntries(categories.map((item) => [item.key, item.label])) as Record<HomeCategoryKey, string>,
    [categories],
  );

  const mobileSections = useMemo(() => {
    const hasFocusedFilters = category !== "all" || selectedPriceBands.length > 0 || query.trim();
    if (hasFocusedFilters) {
      const href = category === "conference-system" ? "/conference-system/"
        : category === "pa-system" ? "/pa-system/"
          : category === "turnstile-gate" ? "/turnstile-gate/"
            : category === "interactive-flat-panel" ? "/interactive-flat-panel/"
              : category === "digital-podium" ? "/digital-podium/"
                : "/led-display/";
      return [{ id: "matches", title: category === "all" ? "Matching Products" : categoryLabelMap[category], href, products: filteredProducts }];
    }

    return [
      { id: "led-display", title: "LED Displays", href: "/led-display/", products: products.filter((product) => product.kind === "led") },
      { id: "conference-system", title: "Conference Systems", href: "/conference-system/", products: products.filter((product) => product.kind === "conference") },
      { id: "pa-system", title: "PA Sound Systems", href: "/pa-system/", products: products.filter((product) => product.kind === "pa") },
      { id: "turnstile-gate", title: "Turnstile Gates", href: "/turnstile-gate/", products: products.filter((product) => product.kind === "turnstile") },
    ].filter((section) => section.products.length);
  }, [category, categoryLabelMap, filteredProducts, products, query, selectedPriceBands]);

  const scrollMobileCarousel = (sectionId: string, direction: 1 | -1) => {
    const track = mobileCarouselRefs.current[sectionId];
    if (!track) return;
    const amount = Math.max(track.clientWidth - 64, 220) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const renderProductCard = (p: HomeProduct, compactMobile = false) => {
    const bullets =
      p.kind === "led"
        ? getLedCardBullets(p)
        : p.quickFeatures?.length
          ? p.quickFeatures.slice(0, 4)
          : p.tags?.length
            ? p.tags.slice(0, 4)
            : subtitleToBullets(p.subtitle);

    const topRightLabel =
      p.kind === "conference"
        ? p.productTypeLabel
        : p.kind === "turnstile"
        ? getTurnstileKindLabel(p.turnstileKind ?? "tripod_turnstile")
        : p.kind === "podium"
          ? "Control"
          : p.kind === "interactive-flat-panel" && p.ifpBrand && p.ifpSize
            ? `${getInteractiveFlatPanelBrandLabel(p.ifpBrand)} · ${p.ifpSize}\"`
            : p.kind === "led" && p.pitch
              ? formatPitchDisplay(p.pitch)
              : undefined;
    const displayTitle = p.title.replace(/\s*&\s*/g, " and ");
    const priceLabel = getHomeProductPrice(p);

    return (
      <article
        key={p.id}
        className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.045)] transition-[transform,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_7px_20px_rgba(15,23,42,0.09)] focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/10 motion-reduce:transition-none"
      >
        <Link
          prefetch={false}
          href={p.href}
          aria-label={`View details: ${displayTitle}`}
          className="relative block h-[190px] shrink-0 overflow-hidden border-b border-slate-100 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 sm:h-[205px]"
        >
          <Image
            src={p.image}
            alt={displayTitle}
            fill
            sizes={compactMobile ? "50vw" : "(max-width: 1023px) 50vw, 28vw"}
            className="object-cover object-center transition-transform duration-300 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none"
          />
          <span className={`absolute left-3 top-3 z-10 inline-flex max-w-[58%] truncate rounded-[5px] px-2 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.025em] text-white shadow-sm ${getBadgeClass(p.kind, p.badge)}`}>
            {p.badge}
          </span>
          {topRightLabel ? (
            <span className="absolute right-3 top-3 z-10 inline-flex max-w-[42%] truncate rounded-[5px] bg-[#071936] px-2 py-1 text-[10px] font-extrabold leading-none text-white shadow-sm">
              {topRightLabel}
            </span>
          ) : null}
        </Link>

        <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
          <h3 className="mt-1 line-clamp-2 min-h-10 text-left text-[15px] font-extrabold leading-5 text-[#071936]">
            <Link
              prefetch={false}
              href={p.href}
              className="rounded-sm underline-offset-4 transition-colors hover:text-orange-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
            >
              {displayTitle}
            </Link>
          </h3>

          <ul className="mt-3 min-h-[4rem] space-y-1.5" aria-label={`Key features of ${displayTitle}`}>
            {bullets.slice(0, 3).map((feature) => (
              <li key={feature} className="flex min-w-0 items-center gap-2 text-left text-[11.5px] font-medium leading-4 text-slate-700">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 fill-none text-slate-700">
                  <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m5.2 8 1.7 1.7 3.9-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="line-clamp-1 min-w-0" title={feature}>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-3">
            <p className="min-h-6 break-words text-left text-base font-extrabold leading-6 tracking-tight text-[#ef4a00] [font-variant-numeric:tabular-nums]">
              {priceLabel}
            </p>
            <p className="mt-0.5 text-left text-[10px] font-medium leading-4 text-slate-500">
              {priceLabel === "Request quotation" ? "Project-based configuration" : "Indicative product price"}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                prefetch={false}
                href={p.href}
                className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-md border border-[#102542] bg-white px-2 py-2 text-center text-xs font-bold text-[#071936] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/35"
              >
                View Details
              </Link>
              <Link
                prefetch={false}
                href={p.kind === "conference" ? `/contact/?project=conference-system&product=${p.id.replace("conference:", "")}` : "/contact/"}
                className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-md border border-[#071936] bg-[#071936] px-2 py-2 text-center text-xs font-bold text-white transition-colors hover:border-[#102b52] hover:bg-[#102b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/45 focus-visible:ring-offset-2"
              >
                Get a Quote<span className="sr-only"> for {displayTitle}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  };

  const renderMobileProductCard = (p: HomeProduct) => {
    const displayTitle = p.title.replace(/\s*&\s*/g, " and ");

    return (
      <article
        className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
      >
        <Link prefetch={false} href={p.href} className="relative block aspect-[4/3] overflow-hidden border-b border-slate-100 bg-white" aria-label={`View details: ${displayTitle}`}>
          <Image
            src={p.image}
            alt={displayTitle}
            fill
            sizes="50vw"
            className="object-cover object-center transition duration-300"
          />
          <span className={`absolute left-2 top-2 inline-flex max-w-[72%] truncate rounded-[4px] px-1.5 py-1 text-[8px] font-extrabold uppercase leading-none text-white ${getBadgeClass(p.kind, p.badge)}`}>
            {p.badge}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-3">
          <div className="min-h-[2.55rem] line-clamp-2 text-[13px] font-bold leading-snug text-slate-900">
            {displayTitle}
          </div>

          <p className="mt-2 line-clamp-1 text-left text-[11px] font-extrabold text-[#ef4a00]">
            {getHomeProductPrice(p)}
          </p>

          <div className="mt-auto pt-3">
            <Link
              prefetch={false}
              href={p.href}
              className="inline-flex min-h-9 w-full items-center justify-between rounded-md border border-[#102542] bg-white py-1 pl-3 pr-1 text-[10px] font-bold leading-tight text-[#071936] transition hover:bg-slate-50"
            >
              <span>View Details</span>
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#071936] text-white">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </article>
    );
  };

  const simpleFilterGroups: Array<{
    id: SimpleFilterGroup;
    label: string;
    selectedCount: number;
    options: Array<{ value: string; label: string; count: number; active: boolean }>;
  }> = [
    {
      id: "category",
      label: "Product Category",
      selectedCount: category === "all" ? 0 : 1,
      options: categories.map((item) => ({
        value: item.key,
        label: item.label,
        count: categoryCounts[item.key],
        active: category === item.key,
      })),
    },
    {
      id: "price",
      label: "Price Range",
      selectedCount: selectedPriceBands.length,
      options: HOME_PRICE_OPTIONS
        .map(([value, label]) => ({ value, label, count: priceCounts[value] ?? 0, active: selectedPriceBands.includes(value) }))
        .filter((option) => option.count > 0 || option.active),
    },
  ];

  const renderSimpleFilterGroups = (mobile = false, includeCategory = true) => (
    <div className={mobile ? "rounded-xl border border-slate-200 bg-white px-3" : "mt-3 border-t border-slate-100"}>
      {simpleFilterGroups.filter((group) => includeCategory || group.id !== "category").map((group) => {
        const isOpen = openFilterGroups.includes(group.id);
        return (
          <div key={group.id} className="border-b border-slate-100 last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleFilterGroup(group.id)}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 py-2 text-left text-[11px] font-extrabold text-slate-700 transition hover:text-[#071936] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/40"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{group.label}</span>
                {group.selectedCount ? (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-100 px-1 text-[9px] text-orange-700">{group.selectedCount}</span>
                ) : null}
              </span>
              <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 fill-none transition-transform ${isOpen ? "rotate-180" : ""}`}>
                <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isOpen ? (
              <div className={`space-y-0.5 pb-3 ${mobile ? `grid gap-x-2 space-y-0 ${group.id === "price" ? "grid-cols-1" : "grid-cols-2"}` : ""}`}>
                {group.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={option.active}
                    onClick={() => {
                      if (group.id === "category") selectCategory(option.value as HomeCategoryKey);
                      else toggleListValue(setSelectedPriceBands, option.value);
                    }}
                    className={`group/option flex min-h-8 w-full cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-left text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/35 ${option.active ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-50 hover:text-[#071936]"}`}
                  >
                    <span className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${option.active ? "border-[#ef4a00] bg-[#ef4a00] text-white" : "border-slate-300 bg-white text-transparent group-hover/option:border-slate-400"}`} aria-hidden="true">
                      <svg viewBox="0 0 12 12" className="h-2 w-2 fill-none">
                        <path d="m2.5 6 2.1 2.1 4.9-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1 truncate" title={option.label}>{option.label}</span>
                    <span className="shrink-0 text-[9px] text-slate-400">({option.count})</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  const activeFilterChips: Array<{ key: string; label: string; onRemove: () => void }> = [
    ...(category !== "all"
      ? [{ key: `category:${category}`, label: categoryLabelMap[category], onRemove: () => selectCategory("all") }]
      : []),
    ...selectedPriceBands.map((value) => ({
      key: `price:${value}`,
      label: HOME_PRICE_OPTIONS.find(([optionValue]) => optionValue === value)?.[1] ?? value,
      onRemove: () => toggleListValue(setSelectedPriceBands, value),
    })),
    ...(query.trim()
      ? [{ key: "search", label: `Search: ${query.trim()}`, onRemove: () => { setQuery(""); setPage(1); } }]
      : []),
  ];

  const renderActiveFilterChips = () => activeFilterChips.length ? (
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Active filters">
      {activeFilterChips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex min-h-7 max-w-full items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-700 transition hover:border-orange-300 hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/35"
          aria-label={`Remove ${chip.label} filter`}
        >
          <span className="truncate">{chip.label}</span>
          <span aria-hidden="true" className="text-sm leading-none">&times;</span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearAllFilters}
        className="min-h-7 rounded-full px-2 text-[10px] font-bold text-slate-500 underline-offset-4 hover:text-[#ef4a00] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/35"
      >
        Clear all
      </button>
    </div>
  ) : null;

  return (
    <div>
      <div ref={gridTopRef} className="scroll-mt-24" />

      <section className="lg:hidden">
        <label htmlFor={`${searchInputId}-mobile`} className="sr-only">Search products</label>
        <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none text-slate-400">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id={`${searchInputId}-mobile`}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search all products..."
            className="h-11 w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
          />
        </div>

        <button
          type="button"
          aria-expanded={mobileFilterDrawerOpen}
          aria-controls={`${searchInputId}-responsive-filters`}
          onClick={() => setMobileFilterDrawerOpen((open) => !open)}
          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-extrabold text-[#071936] shadow-sm transition hover:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 sm:w-auto"
        >
          Filters{activeFilterCount ? ` (${activeFilterCount})` : ""}
        </button>
        </div>

        <aside
          id={`${searchInputId}-responsive-filters`}
          aria-label="Product filters"
          className={`${mobileFilterDrawerOpen ? "block" : "hidden"} mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.045)]`}
        >
          <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-3">
            <h3 className="text-base font-extrabold text-[#071936]">Filter Products</h3>
            <div className="flex items-center gap-2">
              {activeFilterCount ? <button type="button" onClick={clearAllFilters} className="text-[11px] font-bold text-orange-700 hover:underline">Clear All</button> : null}
              <button type="button" aria-label="Close product filters" onClick={() => setMobileFilterDrawerOpen(false)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-100">&times;</button>
            </div>
          </div>
          <div className="px-3 pb-2">{renderSimpleFilterGroups(true)}</div>
          <div className="mx-3 mb-3 mt-1 grid grid-cols-2 gap-2">
            <button type="button" onClick={clearAllFilters} className="min-h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700">Clear All</button>
            <button type="button" onClick={() => setMobileFilterDrawerOpen(false)} className="min-h-10 rounded-xl bg-[#FD6900] px-3 text-sm font-extrabold text-white">Show {filteredProducts.length} Products</button>
          </div>
        </aside>

        {activeFilterChips.length ? <div className="mt-3">{renderActiveFilterChips()}</div> : null}

        <div className="mt-4 space-y-4">
          {mobileSections.map((section) => (
            <div
              key={section.id}
              className="p-0"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold leading-tight text-slate-900">
                  {section.title}
                </div>
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
                    {section.products.map((p) => (
                      <div key={p.id} className="min-w-[calc(100%-1.5rem)] shrink-0 basis-[calc(100%-1.5rem)] snap-start sm:min-w-[calc((100%-0.75rem)/2)] sm:basis-[calc((100%-0.75rem)/2)]">
                        {renderMobileProductCard(p)}
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
          {!mobileSections.length ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
              <p className="text-sm font-extrabold text-[#071936]">No matching products found</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Try another search or clear the selected filters.</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-3 rounded-md bg-[#071936] px-4 py-2 text-[11px] font-bold text-white"
              >
                Clear All Filters
              </button>
            </div>
          ) : null}
        </div>

        {category !== "all" ? <div className="mt-4">
          <Link
            prefetch={false}
            href={getHomeCategoryHref(category)}
            className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            View All {categoryLabelMap[category]} Products
          </Link>
        </div> : null}
      </section>

      <div className="hidden gap-4 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
        <aside className="self-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100dvh-7rem)] lg:flex-col" aria-label="Product filters">
          <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2 pt-4">
            <h3 className="text-lg font-extrabold tracking-tight text-[#071936]">Filter Products</h3>
            {activeFilterCount || query ? (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-[#ef4a00] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
              >
                Clear
              </button>
            ) : null}
          </div>

          <label htmlFor={searchInputId} className="sr-only">Search products</label>
          <div className="relative mx-4 mb-2 shrink-0">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none text-slate-400">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              id={searchInputId}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="h-11 w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3 [scrollbar-gutter:stable] [scrollbar-width:thin]">
            {renderSimpleFilterGroups()}
          </div>
        </aside>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5" aria-labelledby="home-featured-products-title">
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h3 id="home-featured-products-title" className="text-xl font-extrabold tracking-tight text-[#071936]">Featured Technology Products</h3>
              <p className="mt-1 text-left text-xs font-medium text-slate-600" aria-live="polite">
                Showing {filteredProducts.length ? startIndex + 1 : 0}&ndash;{endIndex} of {filteredProducts.length} products
              </p>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span>Sort by</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value as HomeSortKey);
                    setPage(1);
                  }}
                  className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-[#071936] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span>Show</span>
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                  className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-[#071936] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                </select>
              </label>
            </div>
          </div>

          {activeFilterChips.length ? <div className="mt-3">{renderActiveFilterChips()}</div> : null}

          {paged.length ? (
            <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((product) => renderProductCard(product))}
            </div>
          ) : (
            <div className="mt-4 flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center">
              <p className="text-base font-extrabold text-[#071936]">No matching products found</p>
              <p className="mt-1 text-sm text-slate-600">Try another keyword or clear the selected filters.</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-4 rounded-md bg-[#071936] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#102b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/45 focus-visible:ring-offset-2"
              >
                Reset filters
              </button>
            </div>
          )}

          {filteredProducts.length > pageSize ? (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex flex-col items-center gap-3">
                <nav aria-label="Products pagination" className="flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      scrollToGridOnNextPageChangeRef.current = true;
                      setPage((current) => Math.max(1, current - 1));
                    }}
                    disabled={currentPage === 1}
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-slate-800 transition enabled:hover:border-orange-300 enabled:hover:bg-orange-50 enabled:hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {paginationItems.map((item, index) =>
                    item === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-1 text-sm font-bold text-slate-400">&hellip;</span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          scrollToGridOnNextPageChangeRef.current = true;
                          setPage(item);
                        }}
                        className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border px-2 text-xs font-extrabold transition ${item === currentPage ? "border-[#071936] bg-[#071936] text-white" : "border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"}`}
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
                      setPage((current) => Math.min(totalPages, current + 1));
                    }}
                    disabled={currentPage === totalPages}
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-slate-800 transition enabled:hover:border-orange-300 enabled:hover:bg-orange-50 enabled:hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
                <p className="text-xs font-medium text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
