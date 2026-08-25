import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import {
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceConnectionLabel,
  getConferenceProductAvailabilityLabel,
  getConferenceProductPriceNote,
  getConferenceProductPricePresentation,
  getConferenceProductSpecifications,
  type ConferenceProduct,
} from "./catalog";
import ConferenceProductGallery from "./ConferenceProductGallery";

type ConferenceContextLink = { href: string; label: string };

type ConferenceProductDetailPageProps = {
  product: ConferenceProduct;
  relatedProducts: ConferenceProduct[];
  wa: string;
  categoryLinks?: ConferenceContextLink[];
  brandLink?: ConferenceContextLink | null;
  compatibleProducts?: ConferenceProduct[];
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
};

export default function ConferenceProductDetailPage({
  product,
  relatedProducts,
  wa,
  categoryLinks = [],
  brandLink = null,
  compatibleProducts = [],
}: ConferenceProductDetailPageProps) {
  const specifications = getConferenceProductSpecifications(product);
  const priceNote = getConferenceProductPriceNote(product);
  const price = getConferenceProductPricePresentation(product);
  const availabilityLabel = getConferenceProductAvailabilityLabel(product);
  const quoteHref = `/contact/?project=conference-system&product=${product.slug}`;
  const productFacts = [
    { label: "Brand", value: product.brand?.name },
    { label: "Model", value: product.model },
    { label: "Product type", value: product.productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]).join(", ") },
    { label: "Connection", value: product.connection ? getConferenceConnectionLabel(product.connection) : undefined },
    { label: "System family", value: product.systemFamily },
    { label: "Availability", value: availabilityLabel },
    { label: "Warranty", value: product.warranty },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));
  const documents = [
    { label: "Datasheet", href: product.datasheet },
    { label: "Manual", href: product.manual },
    { label: "Brochure", href: product.brochure },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6" data-conference-route-kind="product">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/conference-system/", label: "Conference System" },
          { href: `/conference-system/${product.slug}/`, label: product.name, current: true },
        ]}
      />

      <section className="grid gap-5 rounded-2xl border bg-white p-4 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
        <ConferenceProductGallery productName={product.name} images={product.images} />

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-700" style={{ borderColor: `${BRAND.maroon}22` }}>
              {product.badge}
            </span>
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">{product.name}</h1>
          <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/60 p-4" aria-label="Price and availability">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-sky-800">{price.basisLabel}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">{price.label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-600">{priceNote}</p>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-sky-100 pt-3 text-xs">
              <div><dt className="font-semibold text-slate-500">Availability</dt><dd className="mt-0.5 font-extrabold text-slate-900">{availabilityLabel}</dd></div>
              {price.updatedAt ? <div><dt className="font-semibold text-slate-500">Price last verified</dt><dd className="mt-0.5 font-extrabold text-slate-900"><time dateTime={price.updatedAt}>{price.updatedAt}</time></dd></div> : null}
            </dl>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-700">{product.shortDescription}</p>

          <h2 className="mt-4 text-sm font-bold text-slate-900">Key Features</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
            {product.keyFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.applications.map((item) => (
              <span
                key={item}
                className="rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                style={{ borderColor: "rgba(15,23,42,0.12)" }}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <Link
              href={quoteHref}
              aria-label={`Get quotation for ${product.name}`}
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get Quotation
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp Now
            </a>
            <Link href="/conference-system/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">
              Back to Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">Product Overview</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{product.description}</p>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {productFacts.map((item) => (
              <div key={item.label} className="rounded-xl border bg-slate-50 p-3" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{item.label}</dt>
                <dd className="mt-1 text-sm font-extrabold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="border-b border-slate-200 pb-2 text-base font-bold text-slate-900">Specifications</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-xs">
              <caption className="sr-only">{`${product.name} specifications`}</caption>
              <thead>
                <tr className="border-b border-slate-200 text-slate-700">
                  <th scope="col" className="py-2 text-left font-bold uppercase tracking-wide">Parameter</th>
                  <th scope="col" className="py-2 text-right font-bold uppercase tracking-wide">Specification</th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec) => (
                  <tr key={`${spec.key}-${spec.value}`} className="border-b border-slate-100 last:border-b-0">
                    <th scope="row" className="py-2 pr-4 text-left font-semibold text-slate-900">{spec.key}</th>
                    <td className="py-2 text-right text-slate-700">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {documents.length ? (
        <section className="mt-4 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">Official Product Documents</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {documents.map((document) => (
              <li key={document.label}>
                <a href={document.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-extrabold text-slate-800 hover:border-orange-300 hover:text-orange-700">
                  View {document.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {compatibleProducts.length || categoryLinks.length || brandLink ? (
        <section className="mt-4 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">System Compatibility &amp; Planning</h2>

          {compatibleProducts.length ? (
            <>
              <p className="sr-only">{`Units commonly specified with the ${product.name}`}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {compatibleProducts.map((item) => (
                  <li key={item.slug}>
                    <Link
                      prefetch={false}
                      href={`/conference-system/${item.slug}/`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-[#FD6900]/45 hover:bg-orange-50/70 hover:text-[#C2410C]"
                    >
                      {item.name}
                      <span aria-hidden="true" className="text-[#FD6900]">{"→"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {categoryLinks.length || brandLink ? (
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Browse related ranges</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      prefetch={false}
                      href={link.href}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-orange-50 hover:text-[#C2410C]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {brandLink ? (
                  <li>
                    <Link
                      prefetch={false}
                      href={brandLink.href}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-orange-50 hover:text-[#C2410C]"
                    >
                      {brandLink.label}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Related Conference Products</h2>
              <p className="text-xs text-slate-600">Other items for chairman, delegate, wireless, DSP, and control-room planning.</p>
            </div>
            <Link href="/conference-system/" className="text-xs font-bold" style={{ color: BRAND.maroon }}>
              View all products
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/conference-system/${item.slug}/`}
                prefetch={false}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "rgba(15,23,42,0.1)" }}
              >
                <div className="relative aspect-square border-b border-slate-100 bg-white">
                  <Image
                    src={item.images.find((image) => image.primary)?.src ?? item.images[0].src}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2 transition duration-200 group-hover:scale-[1.015]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-extrabold leading-snug text-slate-900 line-clamp-2">{item.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-sky-700">{getConferenceProductPricePresentation(item).label}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
