import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { receivingCardCatalog } from "@/lib/productsCatalog";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import ReceivingCardSpecTabs from "./ReceivingCardSpecTabs";
import ProductGridCard from "@/components/products/ProductGridCard";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

function getSpecValue(specs: readonly { k: string; v: string }[], ...keys: string[]): string | null {
  const map = new Map<string, string>();
  specs.forEach((s) => map.set(s.k.trim().toLowerCase(), s.v));
  for (const key of keys) {
    const v = map.get(key.trim().toLowerCase());
    if (v) return v;
  }
  return null;
}

function buildDescriptionParagraph(product: (typeof receivingCardCatalog)[number]): string {
  const specs = product.keySpecs ?? [];
  const model = getSpecValue(specs, "Model") ?? product.title;
  const interfacePorts = getSpecValue(specs, "Interface Ports", "Ports", "Interface");
  const loadOrPixel = getSpecValue(specs, "Load Capacity", "Pixel Capacity", "Recommended Control Range");
  const scan = getSpecValue(specs, "Scan Support", "Scanning Support");
  const icSupport = getSpecValue(specs, "IC Support", "Compatibility");
  const useCase = getSpecValue(specs, "Use Case");

  const specBits: string[] = [];
  if (interfacePorts) specBits.push(`Ports: ${interfacePorts}`);
  if (loadOrPixel) specBits.push(`Capacity: ${loadOrPixel}`);
  if (scan) specBits.push(`Scan: ${scan}`);
  if (icSupport) specBits.push(`IC: ${icSupport}`);

  const highlights = specBits.length ? `Highlights: ${specBits.join(", ")}.` : "";
  const useCaseLine = useCase ? `Use case: ${useCase}.` : "";

  return [
    product.subtitle,
    `${model} is installed inside the LED cabinet to receive data from the sender/controller and distribute it to the modules.`,
    "For stable output, match module scan rate, HUB type/pinout, driver IC type, cabinet resolution, and the controller ecosystem (wrong match can cause shift/mirror, flicker, or color issues).",
    highlights,
    useCaseLine,
    "We support selection, wiring guidance, and mapping/setup help in Bangladesh.",
  ]
    .filter(Boolean)
    .join(" ");
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = receivingCardCatalog.find((x) => x.slug === slug);
  if (!item) return { title: "Receiving Card" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "Receiving card specifications, compatibility notes, installation guidance, and technical support in Bangladesh."
    ),
    path: `/led-display/accessories/receiving-card/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | LED Display Receiving Card`,
  });
}

export async function generateStaticParams() {
  return receivingCardCatalog.map((x) => ({ slug: x.slug }));
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

export default async function ReceivingCardDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = receivingCardCatalog.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = receivingCardCatalog.filter((x) => x.slug !== product.slug).slice(0, 3);
  const description = buildDescriptionParagraph(product);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/receiving-card/", label: "Receiving Card" },
          { href: `/led-display/accessories/receiving-card/${product.slug}/`, label: product.title, current: true },
        ]}
        className="mb-5 text-sm text-slate-600"
      />

      {/* Overview */}
      <section
        className="grid gap-6 rounded-3xl border bg-white p-6 md:grid-cols-2 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
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
              href="/led-display/accessories/receiving-card/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to Receiving Cards
            </Link>
          </div>

          {/* Key Features (moved up from below) */}
          <div className="mt-6 rounded-2xl border bg-slate-50 p-5" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-sm font-bold text-slate-900">Key Features</div>
            <p className="mt-1 text-sm text-slate-600 leading-6">
              Practical features that reduce mapping issues and improve long-term stability.
            </p>

            <BulletList items={product.quickFeatures} />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-3xl border bg-white p-6 md:p-8" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Detailed Overview</h2>
          <p className="mt-2 text-slate-600 leading-7">
            {product.title} is a core part of LED module data processing. Proper compatibility with module scan type, HUB interface,
            and controller ecosystem is essential for stable output and predictable commissioning.
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
              href="/led-display/accessories/receiving-card/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to receiving card listing
            </Link>
          </div>
        </div>

        <ReceivingCardSpecTabs specs={product.keySpecs} description={description} brandMaroon={BRAND.maroon} />
      </section>

      {/* Compatibility + Installation */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Compatibility Checklist</h2>
          <p className="mt-2 text-slate-600 leading-7">
            Matching these points before ordering reduces wrong-selection risk.
          </p>
          <BulletList items={product.compatibility} />
        </div>

        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Installation & Commissioning</h2>
          <p className="mt-2 text-slate-600 leading-7">
            Following best practices reduces downtime and makes maintenance easier.
          </p>
          <BulletList items={product.installationNotes} />
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mt-8 rounded-3xl border bg-slate-50 p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}10` }}>
        <h2 className="text-2xl font-bold text-slate-900">Common Issues & Quick Fix</h2>
        <p className="mt-2 text-slate-600 leading-7">
          During setup, most issues come from mapping, scan settings, or cable routing.
        </p>
        <BulletList items={product.troubleshooting} />

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
            Contact for Setup Help -&gt;
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">Featured Receiving Cards</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Explore other popular receiving card models.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((fp) => (
            <ProductGridCard
              key={fp.slug}
              href={`/led-display/accessories/receiving-card/${fp.slug}/`}
              title={fp.title}
              image={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fp.image}
                  alt={fp.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              }
              imageContainerClassName="bg-slate-100"
              borderColor={`${BRAND.maroon}12`}
              topLeftBadge={{ text: fp.badge, tone: "light" }}
              topRightBadge={{ text: "Accessories", tone: "dark" }}
              metaLines={fp.cardPrice ? [{ text: fp.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
              bullets={fp.quickFeatures.slice(0, 4)}
              chips={fp.quickFeatures.slice(0, 3)}
              accentColor={BRAND.maroon}
              contactHref="/contact"
              viewDetailsLabel="View details ->"
            />
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
        <p className="mt-2 text-slate-600 leading-7">Common questions about receiving card selection:</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {product.faqs.map((f, idx) => (
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








