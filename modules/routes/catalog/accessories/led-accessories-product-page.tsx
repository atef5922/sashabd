import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getRelatedLedAccessories, ledAccessoriesCatalog } from "@/lib/productsCatalog";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import ProductGridCard from "@/components/products/ProductGridCard";
import ReceivingCardSpecTabs from "./ReceivingCardSpecTabs";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = ledAccessoriesCatalog.find((x) => x.slug === slug);
  if (!item) return { title: "LED Accessories" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "LED accessories in Bangladesh: selection, specs, and installation support."
    ),
    path: `/led-display/accessories/led-accessories/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | LED Accessories`,
  });
}

export async function generateStaticParams() {
  return ledAccessoriesCatalog.map((x) => ({ slug: x.slug }));
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

function buildAccessoryDescription(product: (typeof ledAccessoriesCatalog)[number]): string {
  const highlight = product.keySpecs
    .filter((x) => ["Type", "Pins", "Connector", "Use", "Main Input", "Scope"].includes(x.k))
    .slice(0, 3)
    .map((x) => `${x.k}: ${x.v}`)
    .join(" | ");

  return [
    product.subtitle,
    "This is a practical accessory used in LED cabinet installation, servicing, or event workflow. Choosing the correct variant helps reduce downtime and prevents avoidable wiring or compatibility issues.",
    highlight ? `Quick highlights ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ${highlight}.` : "",
    "Share your cabinet/module details (scan/HUB ecosystem, connector type, quantity, and usage scenario) for accurate recommendation and quotation support in Bangladesh.",
  ]
    .filter(Boolean)
    .join(" ");
}

export default async function LedAccessoriesDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = ledAccessoriesCatalog.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = getRelatedLedAccessories(product.slug, 3);
  const description = buildAccessoryDescription(product);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/led-accessories/", label: "LED Accessories" },
          { href: `/led-display/accessories/led-accessories/${product.slug}/`, label: product.title, current: true },
        ]}
        className="mb-5 text-sm text-slate-600"
      />

      <section
        className="grid gap-6 rounded-3xl border bg-white p-6 md:grid-cols-2 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.title} className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div>
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
            style={{ borderColor: `${BRAND.maroon}22` }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
            {product.badge}
          </div>

          <h1 className="mt-4 text-xl font-bold text-slate-900 md:text-3xl">{product.title}</h1>
          <p className="mt-3 text-slate-600 leading-7">{product.subtitle}</p>
          {product.cardPrice ? <p className="mt-3 text-sm font-semibold text-sky-700">{normalizeDisplayedPriceText(product.cardPrice)}</p> : null}

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
              href="/led-display/accessories/led-accessories/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to LED Accessories
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border bg-slate-50 p-5" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-sm font-bold text-slate-900">Key Features</div>
            <BulletList items={product.quickFeatures} />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-3xl border bg-white p-6 md:p-8" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <p className="mt-2 text-slate-600 leading-7">
            {product.title} is used to support reliable installation, maintenance, and day-to-day operation for LED display systems.
            Using the right accessory variant reduces service time and helps keep output stable in real-world setups.
          </p>

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
          </div>
        </div>

        <ReceivingCardSpecTabs specs={product.keySpecs} description={description} brandMaroon={BRAND.maroon} />
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Selection Notes</h2>
          <p className="mt-2 text-slate-600 leading-7">
            A few checks before buying help avoid mismatched parts and rework.
          </p>
          <BulletList items={product.selectionNotes} />
        </div>

        <div className="rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">Installation & Maintenance</h2>
          <p className="mt-2 text-slate-600 leading-7">
            Practical tips that keep wiring clean, service-friendly, and stable.
          </p>
          <BulletList items={product.installationNotes} />
        </div>
      </section>

      {featuredProducts.length ? (
        <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h2 className="text-2xl font-bold text-slate-900">More LED Accessories</h2>
          <p className="mt-2 text-slate-600 leading-7">Other items you may also need for installation or service.</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((fp) => (
              <div
                key={fp.slug}
                className="h-full"
              >
                <ProductGridCard
                  href={`/led-display/accessories/led-accessories/${fp.slug}/`}
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
                  bullets={(fp.quickFeatures?.length ? fp.quickFeatures : fp.tags).slice(0, 4)}
                  chips={fp.tags.slice(0, 3)}
                  accentColor={BRAND.maroon}
                  contactHref="/contact"
                  viewDetailsLabel="View details ->"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 rounded-3xl border bg-white p-6 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
        <p className="mt-2 text-slate-600 leading-7">Quick answers before ordering accessories in Bangladesh.</p>

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

