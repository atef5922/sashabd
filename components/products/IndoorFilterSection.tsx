"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { LedAccessoryProduct, ProductItem } from "../../lib/productsCatalog";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "./ProductGridCard";
import ResponsiveProductCarousel from "./ResponsiveProductCarousel";

const BRAND = {
  maroon: "#FF6A00",
};

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase() === "pixel pitch");
  if (!spec) return "Indoor";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

function getPitchDisplay(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase() === "pixel pitch")?.v ?? "";
  const mm = spec.match(/(\d+(?:\.\d+)?)\s*mm/i)?.[1];
  if (mm) return `${mm} mm`;
  const pVal = spec.match(/p\s?(\d+(?:\.\d+)?)/i)?.[1];
  return pVal ? `${pVal} mm` : getPitchLabel(p);
}

type IndoorBadgeCategory = "Showroom" | "Conference" | "Control Room" | "Studio" | "Retail";

function inferIndoorCategory(p: ProductItem): IndoorBadgeCategory {
  if (p.useCaseTag) return p.useCaseTag;
  const s = `${p.bestFor.join(" ")} ${p.title} ${p.subtitle}`.toLowerCase();

  if (s.includes("control")) return "Control Room";
  if (s.includes("studio") || s.includes("broadcast") || s.includes("tv")) return "Studio";
  if (s.includes("conference") || s.includes("meeting") || s.includes("boardroom")) return "Conference";
  if (s.includes("showroom") || s.includes("lobby") || s.includes("reception")) return "Showroom";
  return "Retail";
}

export default function IndoorFilterSection({
  all,
  showFilter = true,
  stickyCards = [],
}: {
  all: ProductItem[];
  showFilter?: boolean;
  stickyCards?: LedAccessoryProduct[];
}) {
  const searchParams = useSearchParams();

  const excludedPitches = new Set(["P1.35", "P1.77"]);
  const uniquePitches = Array.from(new Set(all.map(getPitchLabel)))
    .filter((pitch) => !excludedPitches.has(pitch))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const pitches = ["All", ...uniquePitches];

  const rawPitch = searchParams.get("pitch") ?? "All";
  const activePitch = pitches.includes(rawPitch) ? rawPitch : "All";

  const buildHref = (pitch: string) => {
    const exactMatch = all.find((p) => {
      const pitchOk = pitch === "All" ? true : getPitchLabel(p) === pitch;
      return pitchOk;
    });
    const pitchMatch = pitch === "All" ? null : all.find((p) => getPitchLabel(p) === pitch);
    const matched = exactMatch ?? pitchMatch ?? all[0];
    if (matched && pitch !== "All") {
      return `/led-display/indoor-led/${matched.slug}`;
    }
    const qs = new URLSearchParams();
    if (pitch !== "All") qs.set("pitch", pitch);
    const q = qs.toString();
    return q ? `/led-display/indoor-led/?${q}` : "/led-display/indoor-led/";
  };

  const filtered = all.filter((p) => {
    const pitchOk = activePitch === "All" ? true : getPitchLabel(p) === activePitch;
    return pitchOk;
  });

  const displayCards: Array<ProductItem | LedAccessoryProduct> = [...filtered, ...stickyCards].filter(
    (p, idx, arr) => arr.findIndex((x) => x.slug === p.slug) === idx
  );

  return (
    <>
      {showFilter ? (
        <section className="mt-8 bg-transparent p-0">
          <h2 className="text-xl font-bold text-slate-900">Filter Indoor LED Display Options</h2>
          <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">Quick navigation by pixel pitch. (Visual filtering links only-no price/stock shown.)</p>

          <div className="mt-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">Pixel Pitch</div>
              <div className="mt-2 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {pitches.map((p) => (
                  <Link
                    key={p}
                    href={buildHref(p)}
                    className={`group relative isolate inline-flex min-h-9 shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border px-3.5 text-[11px] font-bold leading-none tracking-tight transition-all duration-300 ${
                      activePitch === p
                        ? "border-[rgba(255,106,0,0.65)] text-white shadow-[0_8px_18px_rgba(255,106,0,0.22)]"
                        : "border-cyan-100/70 bg-[rgba(103,232,249,0.10)] text-slate-700 shadow-none hover:border-orange-200 hover:text-slate-900"
                    }`}
                    style={
                      activePitch === p
                        ? { background: "linear-gradient(135deg, rgba(228,87,0,0.98), rgba(255,106,0,0.98))" }
                        : undefined
                    }
                  >
                    {activePitch === p ? (
                      <span
                        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                        style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.26), rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.22))" }}
                      />
                    ) : null}
                    {activePitch !== p ? (
                      <span
                        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: "linear-gradient(120deg, rgba(14,165,233,0.15), rgba(37,99,235,0.20), rgba(255,106,0,0.14))" }}
                      />
                    ) : null}
                    {p}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Indoor LED Display Models and Features</h2>
        <p className="mt-2 hidden text-slate-600 leading-7 md:block">
          Choose a model based on viewing distance, content type and environment. Open any model to see detailed specs.
        </p>

        <ResponsiveProductCarousel className="mt-6" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
          {displayCards.map((p) => {
            if ("badge" in p) {
              const chips = (p.tags?.length ? p.tags : p.quickFeatures?.length ? p.quickFeatures : [p.badge]).slice(0, 3);
              const bullets = (p.quickFeatures?.length ? p.quickFeatures : p.tags?.length ? p.tags : [p.subtitle]).slice(0, 4);
              return (
                <ProductGridCard
                  key={p.slug}
                  href={`/led-display/accessories/led-accessories/${p.slug}/`}
                  title={p.title}
                  borderColor={`${BRAND.maroon}12`}
                  accentColor={BRAND.maroon}
                  topLeftBadge={{ text: p.badge, tone: "light" }}
                  topRightBadge={{ text: "Accessories", tone: "dark" }}
                  metaLines={p.cardPrice ? [{ text: p.cardPrice, className: "mt-2 text-sm font-semibold text-sky-700" }] : []}
                  bullets={bullets}
                  chips={chips}
                  compactMobile
                  image={
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  }
                />
              );
            }

            const pitchDisplay = getPitchDisplay(p);
            const category = inferIndoorCategory(p);
            const chips = (p.bestFor?.length ? p.bestFor : p.quickFeatures?.length ? p.quickFeatures : [category]).slice(0, 3);
            const bullets = buildLedProductCardHighlights({
              keySpecs: p.keySpecs,
              pitch: pitchDisplay,
              quickFeatures: p.quickFeatures,
              bestFor: p.bestFor,
              subtitle: p.subtitle,
              category: "indoor",
            });

            return (
              <ProductGridCard
                key={p.slug}
                href={`/led-display/indoor-led/${p.slug}/`}
                title={p.title}
                borderColor={`${BRAND.maroon}12`}
                accentColor={BRAND.maroon}
                topLeftBadge={{ text: category, tone: "light" }}
                topRightBadge={{ text: getPitchLabel(p), tone: "dark" }}
                metaLines={[
                  { text: `Pixel pitch: ${pitchDisplay}`, className: "mt-1 text-sm font-semibold text-slate-700" },
                  ...(p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []),
                ]}
                bullets={bullets}
                chips={chips}
                compactMobile
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                }
              />
            );
          })}
        </ResponsiveProductCarousel>

        {filtered.length === 0 && stickyCards.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-white p-6 text-sm text-slate-700">
            No models found for this filter. Try selecting <b>All</b>.
          </div>
        )}
      </section>
    </>
  );
}
