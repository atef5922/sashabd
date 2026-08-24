import Image from "next/image";
import Link from "next/link";
import type { ConferenceCardPrice } from "./catalog";

export type ConferenceProductCardData = {
  slug: string;
  name: string;
  brandName?: string;
  productTypeLabel: string;
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
}: {
  product: ConferenceProductCardData;
  priority?: boolean;
  contactHref?: string;
  compareSelected?: boolean;
  onCompareToggle?: (slug: string) => void;
}) {
  const productHref = `/conference-system/${product.slug}/`;
  const quotationHref = contactHref ?? `/contact/?project=conference-system&product=${product.slug}`;

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
        className="relative block aspect-[4/3] overflow-hidden bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 md:aspect-[16/10]"
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1023px) 50vw, 33vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-[1.025] md:p-5"
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
              View Details
            </Link>
            <Link
              prefetch={false}
              href={quotationHref}
              aria-label={`Request quotation for ${product.name}`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-gradient-to-r from-sky-700 to-sky-600 px-3 py-2 text-center text-xs font-extrabold text-white transition hover:from-sky-600 hover:to-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2"
            >
              Request Quotation
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
