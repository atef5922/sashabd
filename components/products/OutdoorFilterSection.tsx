"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { LedAccessoryProduct, ProductItem } from "../../lib/productsCatalog";
import { buildLedProductCardHighlights } from "@/lib/productCardHighlights";
import ProductGridCard from "./ProductGridCard";

const BRAND = {
  maroon: "#FF6A00",
};

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"));
  if (!spec) return "Outdoor";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

function getPitchDisplay(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"))?.v ?? "";
  const mm = spec.match(/(\d+(?:\.\d+)?)\s*mm/i)?.[1];
  if (mm) return `${mm} mm`;
  const pVal = spec.match(/p\s?(\d+(?:\.\d+)?)/i)?.[1];
  return pVal ? `${pVal} mm` : getPitchLabel(p);
}

type OutdoorBadgeCategory = "Billboard" | "Shop Signage" | "Rooftop" | "Highway" | "Stadium" | "Public Screen";

function inferOutdoorCategory(p: ProductItem): OutdoorBadgeCategory {
  const s = `${p.bestFor.join(" ")} ${p.title} ${p.subtitle} ${p.quickFeatures.join(" ")}`.toLowerCase();

  if (s.includes("stadium") || s.includes("arena") || s.includes("sports")) return "Stadium";
  if (s.includes("billboard") || s.includes("hoarding") || s.includes("gantry")) return "Billboard";
  if (s.includes("rooftop") || s.includes("building") || s.includes("façade") || s.includes("facade")) return "Rooftop";
  if (s.includes("highway") || s.includes("flyover")) return "Highway";
  if (s.includes("shop") || s.includes("store") || s.includes("showroom") || s.includes("signage")) return "Shop Signage";
  return "Public Screen";
}

export default function OutdoorFilterSection({
  all,
  stickyCards = [],
}: {
  all: ProductItem[];
  stickyCards?: LedAccessoryProduct[];
}) {
  const searchParams = useSearchParams();
  const imageObjectPositionBySlug: Record<string, string> = {
    "p2-5-outdoor-led-display-module": "50% 40%",
    "p3-outdoor-led-display-module": "50% 40%",
    "p3-076-outdoor-led-display-module": "50% 40%",
    "p4-outdoor-led-display": "50% 40%",
    "p5-outdoor-led-display": "50% 40%",
    "p6-outdoor-led-display": "50% 40%",
    "p6-67-outdoor-led-display-module-320x160mm": "50% 40%",
    "p8-outdoor-led-display-module": "50% 40%",
    "p10-outdoor-led-display-module": "50% 40%",
  };

  const uniquePitches = Array.from(new Set(all.map(getPitchLabel))).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );
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
      return `/led-display/outdoor/${matched.slug}/`;
    }
    const qs = new URLSearchParams();
    if (pitch !== "All") qs.set("pitch", pitch);
    const q = qs.toString();
    return q ? `/led-display/outdoor/?${q}` : "/led-display/outdoor/";
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
      <section className="mt-8 bg-transparent p-0">
        <h2 className="text-xl font-bold text-slate-900">Filter Outdoor LED Module Options</h2>
        <p className="mt-2 text-sm text-slate-600 leading-7">Quick navigation by pixel pitch. (Prices may change - request an updated quote if needed.)</p>

        <div className="mt-4">
          <div>
            <div className="text-xs font-bold text-slate-700">Pixel Pitch</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {pitches.map((p) => (
                <Link
                  key={p}
                  href={buildHref(p)}
                  className={`group relative isolate overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    activePitch === p
                      ? "border-transparent text-white ring-1 ring-sky-300/60 shadow-[0_12px_28px_rgba(37,99,235,0.35)]"
                      : "bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:scale-[1.04] hover:border-sky-300/80 hover:text-slate-900 hover:shadow-[0_14px_30px_rgba(14,165,233,0.22)]"
                  }`}
                  style={
                    activePitch === p
                      ? { background: "linear-gradient(135deg, #0284c7, #2563eb 48%, #FF6A00)" }
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
                  {activePitch !== p ? (
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 blur-sm transition-all duration-500 group-hover:left-[115%] group-hover:opacity-60"
                      style={{ background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,255,255,0))" }}
                    />
                  ) : null}
                  {p}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Outdoor LED Module Models and Features</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Choose a model based on viewing distance, screen size and outdoor environment. Open any model to see detailed
          notes and request support.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            const category = inferOutdoorCategory(p);
            const objectPosition = imageObjectPositionBySlug[p.slug] ?? "50% 50%";
            const chips = (p.bestFor?.length ? p.bestFor : p.quickFeatures?.length ? p.quickFeatures : [category]).slice(0, 3);
            const bullets = buildLedProductCardHighlights({
              keySpecs: p.keySpecs,
              pitch: pitchDisplay,
              quickFeatures: p.quickFeatures,
              bestFor: p.bestFor,
              subtitle: p.subtitle,
              category: "outdoor",
            });

            return (
              <ProductGridCard
                key={p.slug}
                href={`/led-display/outdoor/${p.slug}/`}
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
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    style={{ objectPosition }}
                    loading="lazy"
                  />
                }
              />
            );
          })}
        </div>

        {filtered.length === 0 && stickyCards.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-white p-6 text-sm text-slate-700">
            No models found for this filter. Try selecting <b>All</b>.
          </div>
        )}
      </section>
    </>
  );
}



