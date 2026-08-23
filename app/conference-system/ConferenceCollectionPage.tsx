import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProductGridCard from "@/components/products/ProductGridCard";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { absoluteUrl } from "@/lib/seo";
import { getConferenceProductPrimaryImage, type ConferenceProduct, type ConferenceProductType } from "./catalog";
import type { ConferenceCollectionFaq, ConferenceCollectionInfoItem } from "./collectionContent";
import {
  getConferenceApplications,
  getConferenceBrandPageContent,
  getConferenceBrandsForProducts,
  getConferenceCategoriesForProducts,
  getConferenceCategoryPageContent,
  getConferenceCategoryProductCount,
  getConferenceProductTypes,
  getConferenceRelatedCategories,
  type ConferenceBrandConfig,
  type ConferenceCategoryConfig,
} from "./taxonomy";

type CategoryCollectionProps = {
  routeKind: "category";
  category: ConferenceCategoryConfig;
  products: readonly ConferenceProduct[];
  breadcrumbs: BreadcrumbItem[];
};

type BrandCollectionProps = {
  routeKind: "brand";
  brand: ConferenceBrandConfig;
  products: readonly ConferenceProduct[];
  breadcrumbs: BreadcrumbItem[];
};

type ConferenceCollectionPageProps = CategoryCollectionProps | BrandCollectionProps;

const ACCENT = "#FF6A00";

const productTypeLabels: Record<ConferenceProductType, string> = {
  "chairman-unit": "Chairman Unit",
  "delegate-unit": "Delegate Unit",
  "control-unit": "Control Unit",
  dsp: "DSP",
  amplifier: "Amplifier",
  camera: "Camera",
  "video-bar": "Video Bar",
  speakerphone: "Speakerphone",
  package: "Package",
  accessory: "Accessory",
  microphone: "Microphone",
  charger: "Charger",
  "access-point": "Access Point",
  processor: "Processor",
  other: "Conference System",
};

function getGridClassName(productCount: number): string {
  if (productCount === 1) return "grid max-w-2xl grid-cols-1 gap-5";
  if (productCount <= 5) return "grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3";
  return "grid gap-5 sm:grid-cols-2 xl:grid-cols-3";
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{description}</p> : null}
    </div>
  );
}

function InformationCards({ items }: { items: readonly ConferenceCollectionInfoItem[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-sm font-extrabold text-orange-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-base font-extrabold text-slate-950">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

/**
 * ItemList tells search engines this page is a product listing and in what order,
 * which is what makes a collection eligible for list-style rich results.
 */
function ProductListJsonLd({ products }: { products: readonly ConferenceProduct[] }) {
  if (!products.length) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/conference-system/${product.slug}/`),
      name: product.name,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function ProductGrid({ products }: { products: readonly ConferenceProduct[] }) {
  return (
    <div
      className={`mt-6 ${getGridClassName(products.length)}`}
      data-conference-product-grid={products.length === 1 ? "single" : "multiple"}
    >
      <ProductListJsonLd products={products} />
      {products.map((product) => {
        const image = getConferenceProductPrimaryImage(product);
        const primaryType = product.productTypes[0];
        return (
          <ProductGridCard
            key={product.id}
            href={`/conference-system/${product.slug}/`}
            title={product.name}
            image={
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
              />
            }
            imageContainerClassName="bg-slate-50"
            topLeftBadge={{ text: primaryType ? productTypeLabels[primaryType] : product.badge, tone: "light" }}
            topRightBadge={product.brand ? { text: product.brand.name, tone: "dark" } : undefined}
            metaLines={[{ text: product.price.displayLabel, className: "mt-1 text-xs font-semibold text-sky-700" }]}
            bullets={product.keyFeatures}
            chips={product.applications}
            viewDetailsLabel="View details ->"
          />
        );
      })}
    </div>
  );
}

function PriceTable({ title, products }: { title: string; products: readonly ConferenceProduct[] }) {
  if (!products.length) return null;
  return (
    <section id="price-list" className="mt-10 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
      <SectionHeading
        eyebrow="Verified pricing"
        title={title}
        description="Prices and labels come directly from the normalized Conference catalog. Final project cost may also include compatible equipment, cabling, installation, and commissioning."
      />
      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Product</th>
              <th scope="col" className="px-4 py-3 font-bold">Brand</th>
              <th scope="col" className="px-4 py-3 font-bold">Model</th>
              <th scope="col" className="px-4 py-3 font-bold">Type</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id} className="align-top hover:bg-orange-50/40">
                <th scope="row" className="px-4 py-3 font-bold text-slate-950">
                  <Link href={`/conference-system/${product.slug}/`} className="underline-offset-4 hover:text-orange-600 hover:underline">
                    {product.name}
                  </Link>
                </th>
                <td className="px-4 py-3 text-slate-700">{product.brand?.name ?? "Not verified"}</td>
                <td className="px-4 py-3 text-slate-700">{product.model ?? "Not verified"}</td>
                <td className="px-4 py-3 text-slate-700">
                  {product.productTypes.map((type) => productTypeLabels[type]).join(", ")}
                </td>
                <td className="px-4 py-3 text-right font-extrabold text-slate-950">
                  {normalizeDisplayedPriceText(product.price.displayLabel)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RelatedCategoryLinks({ categories, products }: { categories: readonly ConferenceCategoryConfig[]; products?: readonly ConferenceProduct[] }) {
  if (!categories.length) return null;
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-7">
      <SectionHeading eyebrow="Explore next" title="Related Conference Categories" />
      <div className="mt-5 flex flex-wrap gap-3">
        {categories.map((category) => {
          const count = products
            ? products.filter(category.matchProduct).length
            : getConferenceCategoryProductCount(category);
          return (
            <Link
              key={category.id}
              href={`/conference-system/${category.slug}/`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
            >
              {category.shortLabel ?? category.label}
              <span className="text-xs font-semibold text-slate-500">{count}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ApplicationList({ applications }: { applications: readonly string[] }) {
  if (!applications.length) return null;
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
      <SectionHeading eyebrow="Applications" title="Best For" description="These labels are aggregated from the matching normalized product records." />
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {applications.map((application) => (
          <li key={application} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            {application}
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqSection({ title, faqs }: { title: string; faqs: readonly ConferenceCollectionFaq[] }) {
  if (!faqs.length) return null;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionHeading eyebrow="Buyer questions" title={title} />
      <FaqAccordion items={[...faqs]} accent={ACCENT} className="mt-5" />
    </section>
  );
}

function FinalCta({ title, description }: { title: string; description: string }) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white md:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-400">Project consultation</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link href="/contact/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
            Request a Quote
          </Link>
          <Link href="/conference-system/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 px-5 py-3 text-sm font-extrabold text-white transition hover:border-slate-400 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300">
            Conference System Hub
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hero({ eyebrow, title, description, productCount, productsAnchor = true }: { eyebrow: string; title: string; description: string; productCount: number; productsAnchor?: boolean }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_52%,#f8fafc_100%)] p-6 md:p-9">
      <div className="relative max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-white">{eyebrow}</span>
          <span className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-bold text-orange-700">
            {productCount} verified {productCount === 1 ? "product" : "products"}
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base md:leading-8">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Request a Quote
          </Link>
          <Link href={productsAnchor && productCount ? "#products" : "/conference-system/"} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            {productsAnchor && productCount ? "View Products" : "Browse Conference Systems"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <section className="mt-10 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-6 md:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">Catalog status</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{message}</p>
      <Link href="/contact/" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
        Contact for Availability
      </Link>
    </section>
  );
}

function CategoryTemplate({ category, products, breadcrumbs }: Omit<CategoryCollectionProps, "routeKind">) {
  const content = getConferenceCategoryPageContent(category);
  const relatedCategories = getConferenceRelatedCategories(category);
  const relevantBrands = getConferenceBrandsForProducts(products);
  const applications = getConferenceApplications(products);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-9" data-conference-route-kind="category">
      <Breadcrumbs items={breadcrumbs} />
      <Hero eyebrow={category.group} title={content.heroTitle} description={content.intro} productCount={products.length} />

      <section className="mt-10">
        <SectionHeading eyebrow="Category essentials" title={`Understanding ${category.label}`} />
        <InformationCards items={content.highlights} />
      </section>

      {products.length ? (
        <section id="products" className="mt-10 scroll-mt-24">
          <SectionHeading
            eyebrow="Verified products"
            title="Matching Products"
            description="Every product below is matched to this category and links to its own product page."
          />
          <ProductGrid products={products} />
        </section>
      ) : (
        <EmptyState title={`No verified ${category.shortLabel ?? category.label} products yet`} message={content.emptyMessage ?? "Products are being prepared for this category. Contact Sasha for project consultation and current availability."} />
      )}

      <PriceTable title={`${category.label} Price in Bangladesh`} products={products} />

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <SectionHeading eyebrow="Selection guide" title={content.buyerGuideTitle} description={content.buyerGuideIntro} />
        <InformationCards items={content.buyerGuide} />
      </section>

      <RelatedCategoryLinks categories={relatedCategories} />

      {relevantBrands.length ? (
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionHeading eyebrow="Shop by brand" title="Available Brands" description="Only verified brands represented by the matching products are shown." />
          <div className="mt-5 flex flex-wrap gap-3">
            {relevantBrands.map((brand) => (
              <Link key={brand.id} href={`/conference-system/brands/${brand.slug}/`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-900 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
                {brand.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <ApplicationList applications={applications} />
      <FaqSection title={`${category.shortLabel ?? category.label} FAQ`} faqs={content.faqs} />
      <FinalCta title="Need Help Choosing the Right Conference System?" description="Share your room size, seating layout, participant workflow, and installation requirements. Sasha can help review verified products and prepare a project quotation or BOQ." />
    </main>
  );
}

function BrandTemplate({ brand, products, breadcrumbs }: Omit<BrandCollectionProps, "routeKind">) {
  const content = getConferenceBrandPageContent(brand);
  const categories = getConferenceCategoriesForProducts(products);
  const productTypes = getConferenceProductTypes(products);
  const applications = getConferenceApplications(products);
  const title = content?.heroTitle ?? `${brand.name} Conference System Availability`;
  const description = content?.intro ?? brand.description;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-9" data-conference-route-kind="brand">
      <Breadcrumbs items={breadcrumbs} />
      <Hero eyebrow={brand.featured ? "Featured brand" : "Verified brand"} title={title} description={description} productCount={products.length} />

      {content ? (
        <section className="mt-10">
          <SectionHeading eyebrow="Verified coverage" title={`${brand.name} Conference Portfolio`} />
          <InformationCards items={content.highlights} />
        </section>
      ) : null}

      {products.length ? (
        <>
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
            <SectionHeading eyebrow="Catalog breakdown" title="Available Product Categories" description="Counts are calculated from this brand's normalized products." />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link key={category.id} href={`/conference-system/${category.slug}/`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-300 hover:bg-orange-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
                  <span className="block text-sm font-extrabold text-slate-950">{category.shortLabel ?? category.label}</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-500">{products.filter(category.matchProduct).length} products</span>
                </Link>
              ))}
            </div>
          </section>

          <section id="products" className="mt-10 scroll-mt-24">
            <SectionHeading eyebrow="Verified products" title={`${brand.name} Products`} description={`Only verified ${brand.name} products are included.`} />
            <ProductGrid products={products} />
          </section>

          <PriceTable title={`${brand.name} Conference System Price in Bangladesh`} products={products} />

          {productTypes.length ? (
            <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
              <SectionHeading eyebrow="Product coverage" title="Available Product Types" />
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {productTypes.map((type) => <li key={type} className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-800">{productTypeLabels[type]}</li>)}
              </ul>
            </section>
          ) : null}

          <ApplicationList applications={applications} />
          <RelatedCategoryLinks categories={categories} products={products} />

          {content ? (
            <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
              <SectionHeading eyebrow="Project planning" title={content.buyerGuideTitle} description={content.buyerGuideIntro} />
              <InformationCards items={content.buyerGuide} />
            </section>
          ) : null}

          {content ? <FaqSection title={`${brand.name} Conference System FAQ`} faqs={content.faqs} /> : null}
        </>
      ) : (
        <EmptyState title={`No verified ${brand.name} Conference products yet`} message={brand.description} />
      )}

      <FinalCta title={`Plan a ${brand.name} Conference Project`} description="Contact Sasha with your room, participant, integration, and installation requirements. Any recommendation will be based on verified catalog availability and project scope." />
    </main>
  );
}

export default function ConferenceCollectionPage(props: ConferenceCollectionPageProps) {
  return props.routeKind === "category"
    ? <CategoryTemplate category={props.category} products={props.products} breadcrumbs={props.breadcrumbs} />
    : <BrandTemplate brand={props.brand} products={props.products} breadcrumbs={props.breadcrumbs} />;
}
