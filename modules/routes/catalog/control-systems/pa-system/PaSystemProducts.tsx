"use client";

import ProductGridCard from "@/components/products/ProductGridCard";
import { getPaSystemCardPriceLabel, type PaSystemItem } from "./catalog";

const BRAND = {
  maroon: "#FF6A00",
};

function inferBestFor(item: PaSystemItem): string[] {
  if (item.bestFor?.length) return item.bestFor.slice(0, 3);

  const text = `${item.title} ${item.subtitle} ${item.tags.join(" ")}`.toLowerCase();
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
  return item.tags.slice(0, 3);
}

function getCardFeatures(item: PaSystemItem): string[] {
  if (item.quickFeatures?.length) return item.quickFeatures.slice(0, 4);
  if (item.tags?.length) return item.tags.slice(0, 4);
  return [];
}

export default function PaSystemProducts({
  items,
  brand,
}: {
  items: PaSystemItem[];
  brand: { maroon: string; maroonDark: string };
}) {
  return (
    <section className="mt-[10px]">
      <div className="sr-only">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">PA System Solutions</div>
        <p className="mt-3 text-slate-600 leading-7 text-justify">
          Sasha Corporation designs and supplies end-to-end <strong>PA sound system</strong> solutions in <strong>Bangladesh</strong> for{" "}
          <strong>schools</strong>, <strong>mosques</strong>, <strong>offices</strong>, <strong>factories</strong>, <strong>hospitals</strong>,{" "}
          <strong>showrooms</strong> and <strong>commercial buildings</strong>. Whether you need a <strong>portable PA</strong> package with{" "}
          <strong>wireless microphones</strong> or a fixed <strong>multi-zone mixer amplifier</strong> system with{" "}
          <strong>wall/ceiling speakers</strong> and a <strong>paging microphone</strong>, we focus on clear voice, even coverage and safe,
          service-friendly installation. We also support <strong>BOQ</strong> preparation, brand/product selection, <strong>cable design</strong>{" "}
          and <strong>zoning</strong> logic - so <strong>announcements</strong>, <strong>Azan</strong>, <strong>emergency paging</strong> and{" "}
          <strong>background music</strong> run smoothly across your facility.
        </p>
      </div>

      <div className="hidden">
        {[
          {
            i: "CV",
            t: "Clear voice coverage",
            d: "Right speaker type and placement to keep announcements loud, clear and comfortable - without echo.",
          },
          {
            i: "PA",
            t: "Paging & emergency announcement",
            d: "Priority paging, zone calling and bell/siren options so urgent messages reach the right areas fast.",
          },
          {
            i: "ZD",
            t: "Multi-zone design & BOQ support",
            d: "Zoning logic, wattage calculation and product selection for schools, mosques, factories and offices.",
          },
          {
            i: "AS",
            t: "Installation & after-sales support",
            d: "Cable routing guidance, rack wiring, testing and basic handover - plus dependable service support.",
          },
        ].map((x) => (
          <div key={x.i} className="rounded-3xl border bg-white p-6 shadow-sm" style={{ borderColor: `${brand.maroon}12` }}>
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold"
              style={{ background: `${brand.maroon}18`, color: brand.maroonDark }}
              aria-hidden="true"
            >
              {x.i}
            </div>
            <div className="mt-4 text-base font-extrabold text-slate-900">{x.t}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="sr-only">
        <div>
          <div className="text-xl font-extrabold tracking-tight text-slate-900">Popular PA Items</div>
          <p className="mt-2 text-slate-600 leading-7">
            Browse common PA items and packages. For a full setup, request a BOQ based on your site layout and number of zones.
          </p>
        </div>
      </div>

      {items.length ? (
        <div className="product-grid-3 grid items-stretch gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const detailHref = `/pa-system/${p.slug}/`;
            const features = getCardFeatures(p);
            const bestFor = inferBestFor(p);
            const cardPrice = getPaSystemCardPriceLabel(p);

            return (
              <ProductGridCard
                key={p.slug}
                href={detailHref}
                title={p.title}
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                }
                imageContainerClassName="bg-slate-50"
                borderColor={`${brand.maroon}12`}
                metaLines={cardPrice ? [{ text: `Price: ${cardPrice}`, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
                bullets={features}
                chips={bestFor}
                accentColor={BRAND.maroon}
                contactHref="/contact/"
                viewDetailsLabel="View details ->"
              />
            );
          })}
        </div>
      ) : (
        <div
          className="mt-6 rounded-3xl border bg-white p-6 text-sm font-semibold text-slate-700"
          style={{ borderColor: `${brand.maroon}12` }}
        >
          No items found.
        </div>
      )}
    </section>
  );
}
