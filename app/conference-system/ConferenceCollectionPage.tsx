import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { getConferenceProductPrimaryImage, type ConferenceProduct } from "./catalog";

type ConferenceCollectionPageProps = {
  routeKind: "category" | "brand";
  title: string;
  description: string;
  products: readonly ConferenceProduct[];
  breadcrumbs: BreadcrumbItem[];
};

export default function ConferenceCollectionPage({
  routeKind,
  title,
  description,
  products,
  breadcrumbs,
}: ConferenceCollectionPageProps) {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6"
      data-conference-route-kind={routeKind}
    >
      <Breadcrumbs items={breadcrumbs} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{description}</p>
        <p className="mt-3 text-sm font-bold text-orange-600">
          {products.length} verified {products.length === 1 ? "product" : "products"}
        </p>
      </section>

      {products.length ? (
        <section className="mt-5" aria-labelledby="conference-collection-products">
          <h2 id="conference-collection-products" className="text-xl font-extrabold text-slate-950">
            Products
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const image = getConferenceProductPrimaryImage(product);
              return (
                <li key={product.id}>
                  <Link
                    href={`/conference-system/${product.slug}/`}
                    className="group grid h-full grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-orange-200 hover:shadow-md"
                  >
                    <span className="relative block aspect-square overflow-hidden rounded-xl bg-slate-50">
                      <Image src={image.src} alt={image.alt} fill sizes="88px" className="object-contain p-2" />
                    </span>
                    <span className="min-w-0 self-center">
                      <span className="block text-sm font-extrabold leading-5 text-slate-950 group-hover:text-orange-600">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-sky-700">
                        {normalizeDisplayedPriceText(product.price.displayLabel)}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <section className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="text-lg font-extrabold text-slate-950">No verified products yet</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            This route is ready for verified catalog data and is excluded from search indexing while empty.
          </p>
          <Link href="/conference-system/" className="mt-4 inline-flex text-sm font-bold text-orange-600 hover:underline">
            Browse all Conference products
          </Link>
        </section>
      )}
    </main>
  );
}
