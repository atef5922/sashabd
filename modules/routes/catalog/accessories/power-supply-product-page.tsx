import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { powerSupplyCatalog } from "@/lib/productsCatalog";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import MobileFeaturedProductsRail from "@/components/products/MobileFeaturedProductsRail";
import ProductGridCard from "@/components/products/ProductGridCard";
import AccessorySpecTabs from "./AccessorySpecTabs";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = powerSupplyCatalog.find((x) => x.slug === slug);
  if (!item) return { title: "LED Display Power Supply" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "LED power supply specifications, cabinet matching guidance, wiring notes, and support in Bangladesh."
    ),
    path: `/led-display/accessories/power-supply/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | LED Display Power Supply`,
  });
}

export async function generateStaticParams() {
  return powerSupplyCatalog.map((x) => ({ slug: x.slug }));
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-slate-700">
      {items.map((b, i) => (
        <li key={`${i}-${b}`} className="flex items-start gap-2">
          <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
          <span className="leading-7">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function getSpecValue(specs: readonly { k: string; v: string }[], ...keys: string[]): string | null {
  const map = new Map<string, string>();
  specs.forEach((s) => map.set(s.k.trim().toLowerCase(), s.v));
  for (const key of keys) {
    const v = map.get(key.trim().toLowerCase());
    if (v) return v;
  }
  return null;
}

function buildDescriptionParagraphs(product: (typeof powerSupplyCatalog)[number]): string[] {
  const specs = product.keySpecs ?? [];
  const outputVoltage = getSpecValue(specs, "Output Voltage", "DC Output", "Output");
  const outputCurrent = getSpecValue(specs, "Output Current", "Current");
  const ratedPower = getSpecValue(specs, "Rated Power", "Power");
  const inputVoltage = getSpecValue(specs, "Input Voltage", "AC Input");

  const highlightBits: string[] = [];
  if (outputVoltage) highlightBits.push(outputVoltage);
  if (outputCurrent) highlightBits.push(`Current: ${outputCurrent}`);
  if (ratedPower) highlightBits.push(`Power: ${ratedPower}`);
  if (inputVoltage) highlightBits.push(`Input: ${inputVoltage}`);

  return [
    product.subtitle,
    "Correct PSU sizing and wiring safety are critical for preventing flicker, overheating, voltage drop, and downtime in LED cabinets.",
    highlightBits.length ? `Quick highlights from specs: ${highlightBits.join(", ")}.` : "",
 "Share your cabinet/module count and distribution plan-we can guide quantity, wiring, and selection in Bangladesh.",
  ].filter(Boolean);
}

export default async function PowerSupplyDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = powerSupplyCatalog.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = powerSupplyCatalog.filter((x) => x.slug !== product.slug).slice(0, 3);
  const descriptionParagraphs = buildDescriptionParagraphs(product);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/power-supply/", label: "Power Supply" },
          { href: `/led-display/accessories/power-supply/${product.slug}/`, label: product.title, current: true },
        ]}
        className="mb-5 text-sm text-slate-600"
      />

      {/* Overview */}
      <section
        className="grid gap-6 rounded-3xl border bg-white p-6 md:grid-cols-2 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <div className="overflow-hidden rounded-3xl bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
            style={{ borderColor: `${BRAND.maroon}22` }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
            {product.badge}
          </div>

          <h1 className="mt-4 text-xl font-bold text-slate-900 md:text-3xl">
            {product.title}
          </h1>
          <p className="mt-3 text-slate-600 leading-7">{product.subtitle}</p>
          {product.cardPrice ? <p className="mt-2 text-sm font-semibold text-sky-700">Price: {normalizeDisplayedPriceText(product.cardPrice)}</p> : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get a Quotation -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp Now
            </a>
            <Link
              href="/led-display/accessories/power-supply/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to Power Supply Models
            </Link>
          </div>

          {/* Best for */}
          <div className="mt-6 rounded-2xl border bg-slate-50 p-5" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-sm font-bold text-slate-900">Best for</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.bestFor.map((b) => (
                <span
                  key={b}
                  className="rounded-full border bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  style={{ borderColor: "rgba(15,23,42,0.12)" }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-3xl border bg-white p-6 md:p-8" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Detailed Overview</h2>
          <p className="mt-2 text-slate-600 leading-7">
            {product.title} is selected based on cabinet load, voltage stability, and power distribution method.
            Correct PSU sizing and wiring safety are critical for preventing flicker, overheating, and downtime.
          </p>
          <BulletList items={product.quickFeatures.slice(0, 8)} />

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              WhatsApp quotation
            </a>
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request proposal -&gt;
            </Link>
            <Link
              href="/led-display/accessories/power-supply/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to PSU listing
            </Link>
          </div>
        </div>

        <AccessorySpecTabs specs={product.keySpecs} descriptionParagraphs={descriptionParagraphs} brandMaroon={BRAND.maroon} />
      </section>

      {/* Key Features */}
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Practical features that help stable power delivery and safer cabinet operation.
        </p>
        <BulletList items={product.quickFeatures} />
      </section>

      {/* Specs + Notes */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-slate-50 p-6 md:p-8" style={{ borderColor: `${BRAND.maroon}10` }}>
          <h2 className="text-xl font-bold text-slate-900">Technical Specifications (Informational)</h2>
          <p className="mt-2 text-sm text-slate-600 leading-7">
            This section is informational only - no price and no stock. Final specs may vary by batch/model.
          </p>

          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {product.keySpecs.map((s) => (
              <li key={s.k} className="flex items-start justify-between gap-6">
                <span className="font-semibold text-slate-800">{s.k}</span>
                <span className="text-slate-600 text-right">{s.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border bg-slate-50 p-6 md:p-8" style={{ borderColor: `${BRAND.maroon}10` }}>
          <h2 className="text-xl font-bold text-slate-900">Selection & Safety Notes</h2>
          <p className="mt-2 text-sm text-slate-600 leading-7">
            Wrong PSU selection may cause flicker, overheating, voltage drop, and long-term damage.
          </p>
          <BulletList items={product.selectionNotes} />
        </div>
      </section>

      {/* Installation */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Installation & Wiring Tips</h2>
          <p className="mt-2 text-slate-600 leading-7">
            Following safe installation practices reduces downtime and keeps cabinet wiring clean.
          </p>
          <BulletList items={product.installationNotes} />
        </div>

        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Support & BOQ Help</h2>
          <p className="mt-2 text-slate-600 leading-7">
            Share your cabinet size and module count, and we can guide PSU quantity and distribution planning.
          </p>

          <div className="mt-4 rounded-2xl border bg-slate-50 p-5" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-sm font-bold text-slate-900">Fast matching checklist</div>
            <BulletList
              items={[
                "Cabinet/module count (how many modules?)",
                "Indoor/Outdoor + brightness requirement",
                "DC cable length + distribution method",
              ]}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              WhatsApp for Support
            </a>
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Contact for BOQ -&gt;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="hidden text-2xl font-bold text-slate-900 md:block">Featured Power Supply Models</h2>
        <p className="mt-2 hidden text-slate-600 leading-7 md:block">
          Explore other popular LED display power supply options.
        </p>

        <div className="mt-5">
          <MobileFeaturedProductsRail
            viewAllHref="/led-display/accessories/power-supply/"
            items={featuredProducts.map((fp) => ({
              id: fp.slug,
              href: `/led-display/accessories/power-supply/${fp.slug}/`,
              title: fp.title,
              imageSrc: fp.image,
              imageAlt: fp.title,
              imageClassName: "h-full w-full object-contain transition duration-300",
              imageContainerClassName: "bg-white",
            }))}
          />
        </div>

        <div className="mt-5 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((fp) => (
            <ProductGridCard
              key={fp.slug}
              href={`/led-display/accessories/power-supply/${fp.slug}/`}
              title={fp.title}
              image={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fp.image}
                  alt={fp.title}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              }
              imageContainerClassName="bg-white"
              borderColor={`${BRAND.maroon}12`}
              topLeftBadge={{ text: fp.badge, tone: "light" }}
              topRightBadge={{ text: "Accessories", tone: "dark" }}
              metaLines={fp.cardPrice ? [{ text: fp.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
              bullets={fp.quickFeatures.slice(0, 4)}
              chips={fp.bestFor.slice(0, 3)}
              accentColor={BRAND.maroon}
              contactHref="/contact"
              viewDetailsLabel="View details ->"
            />
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mt-8 hidden rounded-3xl border bg-white p-6 md:block md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
        <p className="mt-2 text-slate-600 leading-7">Common questions about PSU selection for LED cabinets.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {(product.faqs ?? []).map((f, idx) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300 text-sm font-bold text-amber-700">
                    {idx + 1}
                  </span>
                  <span className="text-base font-semibold text-slate-900">{f.q}</span>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold leading-none text-slate-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}




