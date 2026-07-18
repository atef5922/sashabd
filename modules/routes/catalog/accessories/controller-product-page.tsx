import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { controllerCatalog } from "@/lib/productsCatalog";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import ProductGridCard from "@/components/products/ProductGridCard";
import AccessorySpecTabs from "./AccessorySpecTabs";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = controllerCatalog.find((x) => x.slug === slug);
  if (!item) return { title: "LED Controller / Video Processor" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "LED controller and processor details with I/O, compatibility, commissioning guidance, and support in Bangladesh."
    ),
    path: `/led-display/accessories/controller/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | LED Controller`,
  });
}

export async function generateStaticParams() {
  return controllerCatalog.map((x) => ({ slug: x.slug }));
}

/** Readonly support for strict TS typing. */
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

function toTokens(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function scoreFeaturedPick(current: (typeof controllerCatalog)[number], candidate: (typeof controllerCatalog)[number]): number {
  if (current.slug === candidate.slug) return -1;

  const stop = new Set([
    "and",
    "for",
    "with",
    "the",
    "a",
    "an",
    "to",
    "of",
    "in",
    "on",
    "led",
    "hd",
    "controller",
    "processor",
    "video",
  ]);

  const currentTitle = new Set(toTokens(current.title).filter((t) => t.length >= 3 && !stop.has(t)));
  const candidateTitle = new Set(toTokens(candidate.title).filter((t) => t.length >= 3 && !stop.has(t)));

  const currentBestFor = new Set((current.bestFor ?? []).map((x) => x.toLowerCase()));
  const candidateBestFor = new Set((candidate.bestFor ?? []).map((x) => x.toLowerCase()));

  const currentFeatures = new Set((current.quickFeatures ?? []).flatMap((x) => toTokens(x)).filter((t) => t.length >= 4 && !stop.has(t)));
  const candidateFeatures = new Set((candidate.quickFeatures ?? []).flatMap((x) => toTokens(x)).filter((t) => t.length >= 4 && !stop.has(t)));

  let score = 0;
  if (current.badge === candidate.badge) score += 60;

  for (const t of currentTitle) {
    if (candidateTitle.has(t)) score += 2;
  }

  for (const b of currentBestFor) {
    if (candidateBestFor.has(b)) score += 8;
  }

  for (const f of currentFeatures) {
    if (candidateFeatures.has(f)) score += 3;
  }

  return score;
}

function stableHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickFeaturedControllers(current: (typeof controllerCatalog)[number], count = 3) {
  const candidates = controllerCatalog.filter((x) => x.slug !== current.slug);

  const scored = candidates
    .map((c) => ({ c, score: scoreFeaturedPick(current, c) }))
    .filter((x) => x.score >= 0);

  const sameBadge = scored.filter((x) => x.c.badge === current.badge);
  const otherBadge = scored.filter((x) => x.c.badge !== current.badge);

  const byScore = (a: (typeof scored)[number], b: (typeof scored)[number]) => {
    if (a.score !== b.score) return b.score - a.score;
    const ah = stableHash(`${current.slug}:${a.c.slug}`);
    const bh = stableHash(`${current.slug}:${b.c.slug}`);
    return ah - bh;
  };

  sameBadge.sort(byScore);
  otherBadge.sort(byScore);

  const picked: Array<(typeof controllerCatalog)[number]> = [];
  for (const x of [...sameBadge, ...otherBadge]) {
    if (picked.length >= count) break;
    picked.push(x.c);
  }

  while (picked.length < count && candidates[picked.length]) {
    picked.push(candidates[picked.length]!);
  }

  return picked.slice(0, count);
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

function buildDescriptionParagraphs(product: (typeof controllerCatalog)[number]): string[] {
  const specs = product.keySpecs ?? [];
  const controllerType = getSpecValue(specs, "Controller Type", "Type");
  const maxLoad = getSpecValue(specs, "Max Loading Capacity", "Load Capacity", "Pixel Capacity");
  const ports = getSpecValue(specs, "Communication Ports", "Ports", "Communication Methods");
  const storage = getSpecValue(specs, "Storage Capacity", "Storage");

  const highlightBits: string[] = [];
  if (controllerType) highlightBits.push(controllerType);
  if (maxLoad) highlightBits.push(`Max load: ${maxLoad}`);
  if (ports) highlightBits.push(`Ports: ${ports}`);
  if (storage) highlightBits.push(`Storage: ${storage}`);

  return [
    product.subtitle,
    `${product.title} is used to control content playback and send data to the LED cabinet workflow (mapping + scan settings matter for stable output).`,
    highlightBits.length
      ? `Quick highlights from specs: ${highlightBits.join(", ")}.`
      : "Use correct module type, mapping plan, and cabling/grounding best practices for reliable long-term operation.",
    "We support model selection, configuration, and commissioning guidance in Bangladesh.",
  ].filter(Boolean);
}

export default async function ControllerDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = controllerCatalog.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = pickFeaturedControllers(product, 3);
  const descriptionParagraphs = buildDescriptionParagraphs(product);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/controller/", label: "Controller" },
          { href: `/led-display/accessories/controller/${product.slug}/`, label: product.title, current: true },
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
            className={
              product.slug === "huidu-hd-a5l" || product.slug === "huidu-vp620"
                ? "h-full w-full object-contain p-2"
                : "h-full w-full object-cover"
            }
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
              href="/led-display/accessories/controller/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to Controller List
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
            {product.title} helps build a stable signal and control workflow for LED display operation.
            Correct I/O selection, mapping plan, and commissioning method are important for reliable long-term performance.
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
              href="/led-display/accessories/controller/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to Controller listing
            </Link>
          </div>
        </div>

        <AccessorySpecTabs specs={product.keySpecs} descriptionParagraphs={descriptionParagraphs} brandMaroon={BRAND.maroon} />
      </section>

      {/* Key Features */}
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>
        <p className="mt-2 text-slate-600 leading-7">
          These features generally help ensure stable output, easy operation, and long-term reliability.
        </p>
        <BulletList items={product.quickFeatures} />
      </section>

      {/* Key Specs + I/O */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-slate-50 p-6 md:p-8" style={{ borderColor: `${BRAND.maroon}10` }}>
          <h2 className="text-xl font-bold text-slate-900">Key Specs (Informational)</h2>
          <p className="mt-2 text-sm text-slate-600 leading-7">
            This section is informational only - no price, no offers, and no stock data.
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
          <h2 className="text-xl font-bold text-slate-900">I/O & Control (Summary)</h2>
          <p className="mt-2 text-sm text-slate-600 leading-7">
            Confirming input/output and control method in advance helps keep setup smooth.
          </p>
          <BulletList items={product.ioPorts} />
        </div>
      </section>

      {/* Operation + Support */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Operation & Commissioning Notes</h2>
          <p className="mt-2 text-slate-600 leading-7">
            Most issues come from resolution, mapping, or scan mismatch, or from cable and grounding problems.
          </p>
          <BulletList items={product.operationNotes} />
        </div>

        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Support & Service</h2>
          <p className="mt-2 text-slate-600 leading-7">
            BOQ-based recommendations, configuration support, and after-sales guidance help reduce downtime.
          </p>
          <BulletList items={product.supportNotes} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">Featured Controllers</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Explore other popular controller and sender box models.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((fp) => (
            <ProductGridCard
              key={fp.slug}
              href={`/led-display/accessories/controller/${fp.slug}/`}
              title={fp.title}
              image={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fp.image}
                  alt={fp.title}
                  className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              }
              imageContainerClassName="bg-white"
              borderColor={`${BRAND.maroon}12`}
              topLeftBadge={{ text: fp.badge, tone: "light" }}
              topRightBadge={{ text: "Controller", tone: "dark" }}
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
      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Common questions about controller and processor selection:
        </p>

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
    </div>
  );
}






