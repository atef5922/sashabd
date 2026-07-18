"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
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

type SearchItem = {
  id: string;
  category: "indoor" | "outdoor" | "rental" | "receiving-card" | "controller" | "power-supply" | "led-accessories";
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge: string;
  pitch?: string;
  priceLine?: string;
  slug: string;
  quickFeatures: ReadonlyArray<string>;
  bestFor: ReadonlyArray<string>;
  keySpecs?: ReadonlyArray<{ k: string; v: string }>;
};

function buildIndex(basePath: "/led-display"): SearchItem[] {
  const indoor: SearchItem[] = indoorCatalog.map((p) => ({
    id: `indoor:${p.slug}`,
    category: "indoor",
    title: p.title,
    subtitle: getCardShort(p),
    image: p.image,
    href: `${basePath}/indoor-led/${p.slug}/`,
    badge: "Indoor",
    pitch: getPitchLabel(p),
    priceLine: p.cardPrice,
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
    keySpecs: p.keySpecs,
  }));

  const outdoor: SearchItem[] = outdoorCatalog.map((p) => ({
    id: `outdoor:${p.slug}`,
    category: "outdoor",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/outdoor/${p.slug}/`,
    badge: "Outdoor",
    pitch: getPitchLabel(p),
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
    keySpecs: p.keySpecs,
  }));

  const rental: SearchItem[] = rentalCatalog.map((p) => ({
    id: `rental:${p.slug}`,
    category: "rental",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/rental-display/${p.slug}/`,
    badge: "Rental",
    pitch: getPitchLabel(p),
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
    keySpecs: p.keySpecs,
  }));

  const receiving: SearchItem[] = receivingCardCatalog.map((p) => ({
    id: `receiving-card:${p.slug}`,
    category: "receiving-card",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/receiving-card/${p.slug}/`,
    badge: "Receiving Card",
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: [],
  }));

  const controllers: SearchItem[] = controllerCatalog.map((p) => ({
    id: `controller:${p.slug}`,
    category: "controller",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/controller/${p.slug}/`,
    badge: "Controller",
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  const psu: SearchItem[] = powerSupplyCatalog.map((p) => ({
    id: `power-supply:${p.slug}`,
    category: "power-supply",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/power-supply/${p.slug}/`,
    badge: "Power Supply",
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: p.bestFor,
  }));

  const ledAccessories: SearchItem[] = ledAccessoriesCatalog.map((p) => ({
    id: `led-accessories:${p.slug}`,
    category: "led-accessories",
    title: p.title,
    subtitle: p.subtitle,
    image: p.image,
    href: `${basePath}/accessories/led-accessories/${p.slug}/`,
    badge: "LED Accessories",
    slug: p.slug,
    quickFeatures: p.quickFeatures,
    bestFor: [],
    priceLine: p.cardPrice,
  }));

  return [...indoor, ...outdoor, ...rental, ...receiving, ...controllers, ...psu, ...ledAccessories];
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function subtitleToBullets(subtitle: string): string[] {
  const normalized = subtitle.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const primary = normalized
    .split(/[•|–—.;]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 4);

  if (primary.length >= 2) return primary.slice(0, 4);

  const secondary = normalized
    .split(/[,/|]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 4);

  return (secondary.length ? secondary : [normalized]).slice(0, 4);
}

export default function SearchClient() {
  const params = useSearchParams();
  const rawQuery = params.get("q") ?? "";
  const basePath = "/led-display" as const;

  const results = useMemo(() => {
    const q = normalize(rawQuery);
    if (!q) return [];
    const terms = q.split(" ").filter(Boolean);

    const index = buildIndex(basePath);
    return index.filter((item) => {
      const blob = normalize(`${item.title} ${item.subtitle} ${item.badge} ${item.pitch ?? ""} ${item.slug}`);
      return terms.every((t) => blob.includes(t));
    });
  }, [basePath, rawQuery]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/search/", label: "Search", current: true },
        ]}
      />
      <div className="rounded-3xl border bg-white p-7 shadow-sm" style={{ borderColor: "rgba(15,23,42,0.10)" }}>
        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Search</div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Search results</h1>
        <p className="mt-2 text-sm text-slate-600">
          Keyword: <span className="font-semibold text-slate-900">{rawQuery || "-"}</span>
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={basePath}
            className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
          >
            Back to LED Display -&gt;
          </Link>
        </div>
      </div>

      {results.length ? (
        <section className="product-grid-3 mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => {
            const isAccessory =
              p.id.startsWith("receiving-card:") ||
              p.id.startsWith("controller:") ||
              p.id.startsWith("power-supply:") ||
              p.id.startsWith("led-accessories:");

            const bullets = ["indoor", "outdoor", "rental"].includes(p.category)
              ? buildLedProductCardHighlights({
                  keySpecs: p.keySpecs,
                  pitch: p.pitch,
                  quickFeatures: p.quickFeatures,
                  bestFor: p.bestFor,
                  subtitle: p.subtitle,
                  category: p.category,
                })
              : p.quickFeatures?.length
                ? p.quickFeatures.slice(0, 4)
                : subtitleToBullets(p.subtitle);
            const chips = p.bestFor?.length ? p.bestFor.slice(0, 3) : [];

            const metaLines: Array<{ text: string; className?: string }> = [];
            if (p.pitch) metaLines.push({ text: `Pixel pitch: ${p.pitch}` });
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
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-contain transition duration-300 group-hover:scale-[1.04]"
                  />
                }
                imageContainerClassName="bg-white"
                borderColor="rgba(15,23,42,0.10)"
                topLeftBadge={{ text: p.badge, tone: "light" }}
                topRightBadge={p.pitch ? { text: p.pitch, tone: "dark" } : isAccessory ? { text: "Accessories", tone: "dark" } : undefined}
                metaLines={metaLines}
                bullets={bullets}
                chips={chips}
                accentColor="#FF6A00"
                contactHref="/contact"
                viewDetailsLabel="View details ->"
              />
            );
          })}
        </section>
      ) : (
        <section
          className="mt-8 rounded-3xl border bg-white p-8 text-center text-slate-700"
          style={{ borderColor: "rgba(15,23,42,0.10)" }}
        >
          <div className="text-lg font-bold text-slate-900">No products found</div>
          <div className="mt-2 text-sm text-slate-600">Try a different keyword from the header search.</div>
        </section>
      )}
    </main>
  );
}
