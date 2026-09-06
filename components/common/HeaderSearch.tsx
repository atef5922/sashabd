"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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
} from "../../lib/productsCatalog";
import { paSystemCatalog } from "../../modules/routes/catalog/control-systems/pa-system/catalog";
import { turnstileCatalog } from "../../modules/routes/catalog/control-systems/turnstile-gate-system/catalog";
import { digitalPodiumCatalog } from "../../modules/routes/catalog/control-systems/digital-podium/catalog";
import { interactiveFlatPanelCatalog } from "../../modules/routes/catalog/control-systems/interactive-flat-panel/catalog";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
type HeaderSearchItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge: string;
  pitch?: string;
  keywords?: string;
  slug: string;
};

function buildHeaderSearchIndex(basePath: "/led-display"): HeaderSearchItem[] {
  const indoor: HeaderSearchItem[] = indoorCatalog.map((p) => ({
    id: `indoor:${p.slug}`,
    title: p.title,
    subtitle: getCardShort(p),
    image: p.image,
    href: `${basePath}/indoor-led/${p.slug}/`,
    badge: "Indoor",
    pitch: getPitchLabel(p),
    slug: p.slug,
  }));

  const outdoor: HeaderSearchItem[] = outdoorCatalog.map((p) => ({
    id: `outdoor:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/outdoor/${p.slug}/`,
    badge: "Outdoor",
    pitch: getPitchLabel(p),
    slug: p.slug,
  }));

  const rental: HeaderSearchItem[] = rentalCatalog.map((p) => ({
    id: `rental:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/rental-display/${p.slug}/`,
    badge: "Rental",
    pitch: getPitchLabel(p),
    slug: p.slug,
  }));

  const receiving: HeaderSearchItem[] = receivingCardCatalog.map((p) => ({
    id: `receiving-card:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/receiving-card/${p.slug}/`,
    badge: "Receiving Card",
    slug: p.slug,
  }));

  const controllers: HeaderSearchItem[] = controllerCatalog.map((p) => ({
    id: `controller:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/controller/${p.slug}/`,
    badge: "Controller",
    slug: p.slug,
  }));

  const psu: HeaderSearchItem[] = powerSupplyCatalog.map((p) => ({
    id: `power-supply:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/power-supply/${p.slug}/`,
    badge: "Power Supply",
    slug: p.slug,
  }));

  const ledAccessories: HeaderSearchItem[] = ledAccessoriesCatalog.map((p) => ({
    id: `led-accessories:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/led-accessories/${p.slug}/`,
    badge: "LED Accessories",
    keywords: (p.tags ?? []).join(" "),
    slug: p.slug,
  }));

  const pa: HeaderSearchItem[] = paSystemCatalog.map((p) => ({
    id: `pa-system:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `/pa-system/${p.slug}/`,
    badge: "PA Sound System",
    keywords: p.tags.join(" "),
    slug: p.slug,
  }));

  const ifp: HeaderSearchItem[] = interactiveFlatPanelCatalog.map((p) => ({
    id: `interactive-flat-panel:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `/interactive-flat-panel/${p.slug}/`,
    badge: "Interactive Flat Panel",
    keywords: p.tags.join(" "),
    slug: p.slug,
  }));

  const turnstile: HeaderSearchItem[] = turnstileCatalog.map((p) => ({
    id: `turnstile:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `/turnstile-gate/${p.slug}/`,
    badge: "Turnstile Gate",
    keywords: p.tags.join(" "),
    slug: p.slug,
  }));

  const podium: HeaderSearchItem[] = digitalPodiumCatalog.map((p) => ({
    id: `digital-podium:${p.slug}`,
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `/digital-podium/${p.slug}/`,
    badge: "Digital Podium",
    keywords: p.tags.join(" "),
    slug: p.slug,
  }));

  const digitalPodium: HeaderSearchItem[] = [
    {
      id: "digital-podium:landing",
      title: "Digital Podium",
      subtitle: "Smart podium for lecture halls, training & conferences",
      image: "/images/logo/digital-podium.svg",
      href: "/digital-podium/",
      badge: "Digital Podium",
      keywords: "smart podium interactive lectern presentation training classroom",
      slug: "digital-podium",
    },
  ];

  const interactiveFlatPanel: HeaderSearchItem[] = [
    {
      id: "interactive-flat-panel:landing",
      title: "Interactive Flat Panel",
      subtitle: "Smart classroom and meeting room touch display",
      image: "/images/hero.webp",
      href: "/interactive-flat-panel/",
      badge: "Interactive Flat Panel",
      keywords: "interactive flat panel ifp smart classroom meeting room touch display 4k android ops pc",
      slug: "interactive-flat-panel",
    },
  ];

  return [
    ...indoor,
    ...outdoor,
    ...rental,
    ...receiving,
    ...controllers,
    ...psu,
    ...ledAccessories,
    ...ifp,
    ...pa,
    ...turnstile,
    ...podium,
    ...digitalPodium,
    ...interactiveFlatPanel,
  ];
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function HeaderSearch({
  isScrolled,
  inputId,
  className,
}: {
  isScrolled: boolean;
  inputId: string;
  className?: string;
}) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const basePath = "/led-display" as const;

  const index = useMemo(() => buildHeaderSearchIndex(basePath), [basePath]);

  const results = useMemo(() => {
    const q = normalizeSearchText(query);
    if (!q) return [];
    const terms = q.split(" ").filter(Boolean);

    const out: HeaderSearchItem[] = [];
    for (const item of index) {
      const blob = normalizeSearchText(
        `${item.title} ${item.subtitle} ${item.badge} ${item.pitch ?? ""} ${item.keywords ?? ""} ${item.slug}`
      );
      const matched = terms.every((t) => blob.includes(t));
      if (matched) out.push(item);
      if (out.length >= 10) break;
    }
    return out;
  }, [index, query]);

  const isOpen = hasFocus && normalizeSearchText(query).length > 0;
  const resultsId = `${inputId}-results`;

  // activeIndex resets naturally via query dependency - no manual reset needed

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setHasFocus(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const inputShellClass = "bg-white text-black placeholder:text-black";

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative w-full max-w-[320px] lg:max-w-[440px] xl:max-w-[500px]",
        className
      )}
    >
      <div className="premium-search-shell rounded-2xl shadow-sm transition focus-within:ring-2 focus-within:ring-sky-200/90 focus-within:ring-offset-2 focus-within:ring-offset-white md:rounded-full">
        <div className={cn("premium-search-inner rounded-2xl transition md:rounded-full", inputShellClass)}>
          <div className="flex items-center gap-1 px-2.5 py-1 md:gap-2 md:px-4 md:py-2">
            <button
              type="button"
              onClick={() => {
                const q = normalizeSearchText(query);
                if (!q) {
                  inputRef.current?.focus();
                  return;
                }
                setHasFocus(false);
                inputRef.current?.blur();
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }}
              className={cn(
                "grid h-6.5 w-6.5 shrink-0 place-items-center rounded-full transition",
                normalizeSearchText(query)
                  ? isScrolled
                    ? "bg-white/10 hover:bg-white/15"
                    : "bg-slate-50 hover:bg-slate-100"
                  : "bg-transparent hover:bg-transparent"
              )}
              aria-label="Search"
            >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-slate-900 md:h-5 md:w-5"
                  aria-hidden="true"
                >
                <path
                  d="M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M16 16l4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <label className="sr-only" htmlFor={inputId}>
              Search products
            </label>
            <input
              id={inputId}
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setHasFocus(true)}
              onBlur={(e) => {
                const next = e.relatedTarget;
                const wrap = wrapRef.current;
                if (next instanceof Node && wrap && wrap.contains(next)) return;
                setHasFocus(false);
              }}
              onKeyDown={(e) => {
                if (!isOpen) return;
                if (e.key === "Escape") {
                  setHasFocus(false);
                  (e.currentTarget as HTMLInputElement).blur();
                  return;
                }
                if (e.key === "ArrowDown") {
                  if (!results.length) return;
                  e.preventDefault();
                  setActiveIndex((v) => (v + 1) % results.length);
                  return;
                }
                if (e.key === "ArrowUp") {
                  if (!results.length) return;
                  e.preventDefault();
                  setActiveIndex((v) => (v - 1 + results.length) % results.length);
                  return;
                }
                if (e.key !== "Enter") return;

                if (activeIndex >= 0 && results[activeIndex]) {
                  e.preventDefault();
                  setHasFocus(false);
                  inputRef.current?.blur();
                  router.push(results[activeIndex].href);
                  return;
                }

                const q = normalizeSearchText(query);
                if (!q) return;
                e.preventDefault();
                setHasFocus(false);
                inputRef.current?.blur();
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }}
              placeholder="Search products"
              className={cn("w-full bg-transparent text-[12px] font-semibold text-black placeholder:text-black outline-none md:text-sm")}
              autoComplete="off"
              spellCheck={false}
              aria-autocomplete="list"
              aria-controls={isOpen ? resultsId : undefined}
            />

            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px] font-bold transition",
                  isScrolled
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                )}
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {isOpen ? (
        <div
          id={resultsId}
          className="fixed inset-x-3 top-[calc(var(--site-header-height,60px)+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:absolute md:inset-x-auto md:left-0 md:top-full md:mt-2 md:w-full md:max-w-[calc(100vw-2rem)]"
        >
          <div className="max-h-[calc(100dvh-9.5rem)] overflow-y-auto overscroll-contain p-2 md:max-h-[420px]">
            {results.length ? (
              results.map((r, idx) => (
                <Link
                  key={r.id}
                  prefetch={false}
                  href={r.href}
                  onClick={() => setHasFocus(false)}
                  className={cn(
                    "flex min-w-0 items-center gap-2.5 rounded-xl px-2.5 py-2.5 transition md:gap-3 md:px-3",
                    idx === activeIndex ? "bg-slate-200 shadow-sm" : "hover:bg-slate-100 hover:shadow-sm"
                  )}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white md:h-10 md:w-10">
                    <Image src={r.image} alt={r.title} fill className="object-contain" sizes="(max-width: 767px) 48px, 40px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-[13px] font-extrabold leading-[1.15rem] text-slate-900 md:text-sm md:leading-normal">{r.title}</div>
                    <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-slate-600 md:mt-0.5 md:flex-wrap md:gap-2 md:text-[11px]">
                      <span className="max-w-[45%] shrink-0 truncate rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 md:max-w-none">
                        {r.badge}
                      </span>
                      {r.pitch ? (
                        <span className="shrink-0 rounded-full bg-slate-900 px-2 py-0.5 text-white">{r.pitch}</span>
                      ) : null}
                      <span className="min-w-0 flex-1 truncate">{r.subtitle}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700">
                No products found. Try another keyword.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
