import Image from "next/image";
import Link from "next/link";
import type { ConferenceCardPrice } from "./catalog";

const VIEW_DETAILS_LABEL = "View Details";

export type ConferenceProductCardData = {
  slug: string;
  name: string;
  brandName?: string;
  productTypeLabel: string;
  features?: readonly string[];
  connectionLabel?: string;
  systemFamily?: string;
  keySpecs: readonly { label: string; value: string }[];
  price: ConferenceCardPrice;
  availabilityLabel?: string;
  image: { src: string; alt: string };
};

export default function ConferenceProductCard({
  product,
  priority = false,
  contactHref,
  compareSelected = false,
  onCompareToggle,
  presentation = "standard",
}: {
  product: ConferenceProductCardData;
  priority?: boolean;
  contactHref?: string;
  compareSelected?: boolean;
  onCompareToggle?: (slug: string) => void;
  presentation?: "standard" | "compact";
}) {
  const productHref = `/conference-system/${product.slug}/`;
  const quotationHref = contactHref ?? `/contact/?project=conference-system&product=${product.slug}`;

  if (presentation === "compact") {
    const features = (product.features?.length
      ? product.features
      : product.keySpecs.map((spec) => spec.value)
    ).slice(0, 3);
    const priceCaption = product.price.state === "request"
      ? product.price.qualifier ?? "Contact for pricing"
      : "Indicative Price Range";
    const brandBadgeClass = (() => {
      switch (product.brandName?.toUpperCase()) {
        case "BOSCH":
          return "bg-[#e30613]";
        case "SPON":
          return "bg-[#0868b5]";
        case "CMX":
          return "bg-[#ef6c00]";
        case "TOA":
          return "bg-[#65717d]";
        default:
          return "bg-slate-700";
      }
    })();

    return (
      <article
        data-conference-product-card
        data-product-slug={product.slug}
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.045)] transition-[transform,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_7px_20px_rgba(15,23,42,0.09)] focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/10 motion-reduce:transition-none"
      >
        {onCompareToggle ? (
          <button
            type="button"
            aria-pressed={compareSelected}
            aria-label={`${compareSelected ? "Remove" : "Add"} ${product.name} ${compareSelected ? "from" : "to"} comparison`}
            onClick={() => onCompareToggle(product.slug)}
            className={`absolute right-3 top-3 z-20 inline-flex min-h-8 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold shadow-sm backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 ${compareSelected ? "border-orange-300 bg-orange-50/95 text-orange-800" : "border-slate-200 bg-white/95 text-slate-700 hover:border-orange-300 hover:text-orange-700"}`}
          >
            <span aria-hidden="true">{compareSelected ? "✓" : "+"}</span>
            {compareSelected ? "Selected" : "Compare"}
          </button>
        ) : null}
        <Link
          prefetch={false}
          href={productHref}
          aria-label={`View ${product.name}`}
          className="relative block h-[210px] shrink-0 overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 sm:h-[220px]"
        >
          {product.brandName ? (
            <span className={`absolute left-3 top-3 z-10 inline-flex rounded-[5px] px-2 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.025em] text-white shadow-sm ${brandBadgeClass}`}>
              {product.brandName}
            </span>
          ) : null}
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 50vw, 25vw"
            className="object-contain p-5 sm:p-6"
            priority={priority}
          />
        </Link>

        <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-2.5">
          <h3 className="line-clamp-2 min-h-10 text-base font-extrabold leading-5 text-[#071936]">
            <Link
              prefetch={false}
              href={productHref}
              className="rounded-sm underline-offset-4 transition-colors hover:text-orange-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-1 line-clamp-1 min-h-4 text-left text-xs font-medium leading-4 text-slate-600" title={product.productTypeLabel}>
            {product.productTypeLabel}
          </p>

          <ul className="mt-3 min-h-[4.25rem] space-y-1.5" aria-label={`Key features of ${product.name}`}>
            {features.map((feature) => (
              <li key={feature} className="flex min-w-0 items-center gap-2 text-left text-[12px] font-medium leading-4 text-slate-700">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 fill-none text-slate-700">
                  <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.4" />
                  <path d="m5.3 8.1 1.7 1.7 3.7-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="line-clamp-1 min-w-0" title={feature}>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-3">
            <p className="min-w-0 break-words text-left text-lg font-extrabold leading-6 tracking-tight text-[#f05a19] [font-variant-numeric:tabular-nums]">
              {product.price.label}
            </p>
            <p className="mt-0.5 text-left text-[11px] font-normal leading-4 text-slate-500">
              {priceCaption}
            </p>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <Link
                prefetch={false}
                href={productHref}
                aria-label={`View details for ${product.name}`}
                className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-md border border-[#102542] bg-white px-2 py-2 text-center text-xs font-bold text-[#071936] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/35"
              >
                {VIEW_DETAILS_LABEL}
              </Link>
              <Link
                prefetch={false}
                href={quotationHref}
                aria-label={`Get a quote for ${product.name}`}
                className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-md border border-[#071936] bg-[#071936] px-2 py-2 text-center text-xs font-bold text-white transition-colors hover:border-[#102b52] hover:bg-[#102b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/45 focus-visible:ring-offset-2"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      data-conference-product-card
      data-product-slug={product.slug}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:border-sky-200 hover:shadow-md focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-500/20"
    >
      <Link
        prefetch={false}
        href={productHref}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[4/3] overflow-hidden border-b border-slate-100 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1023px) 50vw, 33vw"
          className="object-contain p-1.5 transition duration-300 group-hover:scale-[1.015] md:p-2"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
          {product.brandName ? (
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-700">
              {product.brandName}
            </span>
          ) : <span />}
          {product.connectionLabel ? (
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800">
              {product.connectionLabel}
            </span>
          ) : null}
        </div>

        {onCompareToggle ? (
          <button
            type="button"
            aria-pressed={compareSelected}
            aria-label={`${compareSelected ? "Remove" : "Add"} ${product.name} ${compareSelected ? "from" : "to"} comparison`}
            onClick={() => onCompareToggle(product.slug)}
            className={`mt-3 inline-flex min-h-9 w-fit items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45 ${compareSelected ? "border-orange-300 bg-orange-50 text-orange-800" : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700"}`}
          >
            <span aria-hidden="true">{compareSelected ? "✓" : "+"}</span>
            {compareSelected ? "Added to Compare" : "Compare"}
          </button>
        ) : null}

        <h3 className="mt-3 line-clamp-3 text-[15px] font-extrabold leading-6 text-slate-950">
          <Link
            prefetch={false}
            href={productHref}
            className="rounded-sm underline-offset-4 transition hover:text-orange-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-xs font-bold text-slate-600">
          {product.productTypeLabel}
          {product.systemFamily ? <span className="font-medium text-slate-500"> · {product.systemFamily}</span> : null}
        </p>

        {product.keySpecs.length ? (
          <dl className="mt-4 grid gap-2 border-t border-slate-100 pt-3 text-xs">
            {product.keySpecs.slice(0, 3).map((spec) => (
              <div key={`${spec.label}-${spec.value}`} className="grid min-w-0 grid-cols-[5.5rem_1fr] gap-2">
                <dt className="font-semibold text-slate-500">{spec.label}</dt>
                <dd className="line-clamp-2 min-w-0 font-semibold leading-5 text-slate-700" title={spec.value}>
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-auto border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              {product.price.qualifier ? (
                <p className="text-[11px] font-semibold text-slate-500">{product.price.qualifier}</p>
              ) : null}
              <p className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-950">
                {product.price.label}
              </p>
            </div>
            {product.availabilityLabel ? (
              <p className="shrink-0 text-right text-[11px] font-semibold leading-4 text-emerald-700">
                {product.availabilityLabel}
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Link
              prefetch={false}
              href={productHref}
              aria-label={`View details for ${product.name}`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-xs font-extrabold text-slate-800 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
            >
              {VIEW_DETAILS_LABEL}
            </Link>
            <Link
              prefetch={false}
              href={quotationHref}
              aria-label={`Get a quote for ${product.name}`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-gradient-to-r from-sky-700 to-sky-600 px-3 py-2 text-center text-xs font-extrabold text-white transition hover:from-sky-600 hover:to-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
