import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { absoluteUrl } from "@/lib/seo";
import {
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceConnectionLabel,
  getConferenceProductAvailabilityLabel,
  getConferenceProductCardPrice,
  getConferenceProductCardSpecs,
  getConferenceProductPricePresentation,
  getConferenceProductPrimaryImage,
  type ConferenceProduct,
} from "./catalog";
import ConferenceCollectionPriceTable from "./ConferenceCollectionPriceTable";
import ConferenceCollectionProductGrid from "./ConferenceCollectionProductGrid";
import ConferencePackageCards from "./ConferencePackageCards";
import type { ConferenceCollectionFaq, ConferenceCollectionInfoItem } from "./collectionContent";
import {
  getConferenceDisplayApplications,
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
const CATEGORY_HERO_EYEBROWS: Readonly<Record<ConferenceCategoryConfig["group"], string>> = {
  system: "Conference systems",
  connection: "Connection options",
  component: "System components",
  package: "Complete solutions",
};

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
  const cardProducts = products.map((product) => {
    const image = getConferenceProductPrimaryImage(product);
    const primaryType = product.productTypes[0];
    return {
      slug: product.slug,
      name: product.name,
      brandName: product.brand?.name,
      productTypeLabel: primaryType ? CONFERENCE_PRODUCT_TYPE_LABELS[primaryType] : product.badge,
      connectionLabel: product.connection ? getConferenceConnectionLabel(product.connection) : undefined,
      systemFamily: product.systemFamily,
      keySpecs: getConferenceProductCardSpecs(product),
      price: getConferenceProductCardPrice(product),
      availabilityLabel: product.availability ? getConferenceProductAvailabilityLabel(product) : undefined,
      image: { src: image.src, alt: image.alt },
    };
  });

  return (
    <>
      <ProductListJsonLd products={products} />
      <ConferenceCollectionProductGrid products={cardProducts} />
    </>
  );
}

function PriceTable({ title, products, eyebrow = "Catalog pricing" }: { title: string; products: readonly ConferenceProduct[]; eyebrow?: string }) {
  if (!products.length) return null;
  const rows = products.map((product) => {
    const price = getConferenceProductPricePresentation(product);
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand?.name ?? "—",
      model: product.model ?? "—",
      productType: product.productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]).join(", "),
      availability: getConferenceProductAvailabilityLabel(product),
      price: price.label,
      priceBasis: price.basisLabel,
    };
  });

  return (
    <section id="price-list" className="mt-10 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description="Each row distinguishes fixed catalog price, indicative equipment range, and project quotation. Final project cost may also include compatible equipment, cabling, installation, and commissioning."
      />
      <ConferenceCollectionPriceTable rows={rows} />
    </section>
  );
}

function RelatedCategoryLinks({
  categories,
  products,
  eyebrow = "Explore next",
  title = "Related Conference Categories",
  description,
}: {
  categories: readonly ConferenceCategoryConfig[];
  products?: readonly ConferenceProduct[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  if (!categories.length) return null;
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-7">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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

function ApplicationList({
  applications,
  eyebrow = "Applications",
  title = "Best For",
  description = "Common room types and meeting environments suited to products in this collection.",
}: {
  applications: readonly string[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  if (!applications.length) return null;
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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
          <Link href="/contact/?project=conference-system" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
            Get Free BOQ
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
            {productCount} {productCount === 1 ? "product" : "products"} in this collection
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base md:leading-8">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/?project=conference-system" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
            Get Free BOQ
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
      <Link href="/contact/?project=conference-system" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
        Contact for Availability
      </Link>
    </section>
  );
}

function CategoryTemplate({ category, products, breadcrumbs }: Omit<CategoryCollectionProps, "routeKind">) {
  const content = getConferenceCategoryPageContent(category);
  const relatedCategories = getConferenceRelatedCategories(category);
  const relevantBrands = getConferenceBrandsForProducts(products);
  const applications = getConferenceDisplayApplications(products);
  const isCompletePackage = category.slug === "complete-package";
  const packageApplications = [
    "Small Meeting Room",
    "Corporate Boardroom",
    "Executive Boardroom",
    "Training & Seminar Room",
    "Government Meeting Room",
    "Large Conference Hall",
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-9" data-conference-route-kind="category">
      <Breadcrumbs items={breadcrumbs} />
      <Hero eyebrow={CATEGORY_HERO_EYEBROWS[category.group]} title={content.heroTitle} description={content.intro} productCount={products.length} />

      {isCompletePackage ? <ConferencePackageCards /> : null}

      <section className="mt-10">
        <SectionHeading eyebrow="Category essentials" title={`Understanding ${category.label}`} />
        <InformationCards items={content.highlights} />
      </section>

      {products.length ? (
        <section id="products" className="mt-10 scroll-mt-24">
          <SectionHeading
            eyebrow={isCompletePackage ? "Ready-made systems" : "Available products"}
            title={isCompletePackage ? "Ready-Made Conference System Products" : "Matching Products"}
            description={
              isCompletePackage
                ? `${products.length} ready-made system products are listed here separately from the installed room packages above.`
                : "Every product below is matched to this category and links to its own product page."
            }
          />
          <ProductGrid products={products} />
        </section>
      ) : (
        <EmptyState title={`No ${category.shortLabel ?? category.label} products listed yet`} message={content.emptyMessage ?? "Products are being prepared for this category. Contact Sasha for project consultation and current availability."} />
      )}

      <PriceTable
        title={isCompletePackage ? "Complete Conference System Product Price in Bangladesh" : `${category.label} Price in Bangladesh`}
        products={products}
        eyebrow={isCompletePackage ? "Product pricing" : undefined}
      />

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <SectionHeading eyebrow="Selection guide" title={content.buyerGuideTitle} description={content.buyerGuideIntro} />
        <InformationCards items={content.buyerGuide} />
      </section>

      <RelatedCategoryLinks
        categories={relatedCategories}
        eyebrow={isCompletePackage ? "Plan your system" : undefined}
        title={isCompletePackage ? "Explore Related Conference Systems" : undefined}
        description={
          isCompletePackage
            ? "Compare audio, video, wired, wireless, and control-unit options when planning a complete meeting room conference system in Bangladesh."
            : undefined
        }
      />

      {relevantBrands.length ? (
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionHeading
            eyebrow={isCompletePackage ? "Product brand" : "Shop by brand"}
            title={isCompletePackage ? "Brand Represented in Ready-Made Systems" : "Available Brands"}
            description={
              isCompletePackage
                ? "This brand is represented by the ready-made conference system products listed above. Installed room packages are planned separately according to project requirements and confirmed availability."
                : "Brands represented by the products in this collection are shown here."
            }
          />
          <div className="mt-5 flex flex-wrap gap-3">
            {relevantBrands.map((brand) => (
              <Link key={brand.id} href={`/conference-system/brands/${brand.slug}/`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-900 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
                {brand.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <ApplicationList
        applications={isCompletePackage ? packageApplications : applications}
        eyebrow={isCompletePackage ? "Meeting room applications" : undefined}
        title={isCompletePackage ? "Suitable Applications for Conference System Packages" : undefined}
        description={
          isCompletePackage
            ? "Complete conference system packages can be planned for rooms of different sizes, participant capacities, seating layouts, and formal meeting workflows."
            : undefined
        }
      />
      <FaqSection title={`${category.shortLabel ?? category.label} FAQ`} faqs={content.faqs} />
      <FinalCta title="Need Help Choosing the Right Conference System?" description="Share your room size, seating layout, participant workflow, and installation requirements. Sasha can help review available products and prepare a project quotation or BOQ." />
    </main>
  );
}

function BrandTemplate({ brand, products, breadcrumbs }: Omit<BrandCollectionProps, "routeKind">) {
  const content = getConferenceBrandPageContent(brand);
  const categories = getConferenceCategoriesForProducts(products);
  const productTypes = getConferenceProductTypes(products);
  const applications = getConferenceDisplayApplications(products);
  const title = content?.heroTitle ?? `${brand.name} Conference System Availability`;
  const description = content?.intro ?? brand.description;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-9" data-conference-route-kind="brand">
      <Breadcrumbs items={breadcrumbs} />
      <Hero eyebrow="Conference system brand" title={title} description={description} productCount={products.length} />

      {content ? (
        <section className="mt-10">
          <SectionHeading eyebrow="Brand overview" title={`${brand.name} Conference Portfolio`} />
          <InformationCards items={content.highlights} />
        </section>
      ) : null}

      {products.length ? (
        <>
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
            <SectionHeading eyebrow="Product range" title="Available Product Categories" description={`Explore the conference categories represented by ${brand.name} products in this collection.`} />
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
            <SectionHeading eyebrow="Available products" title={`${brand.name} Products`} description={`Browse the ${brand.name} conference products currently included in this collection.`} />
            <ProductGrid products={products} />
          </section>

          <PriceTable title={`${brand.name} Conference System Price in Bangladesh`} products={products} />

          {productTypes.length ? (
            <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
              <SectionHeading eyebrow="Product coverage" title="Available Product Types" />
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {productTypes.map((type) => <li key={type} className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-800">{CONFERENCE_PRODUCT_TYPE_LABELS[type]}</li>)}
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
        <EmptyState title={`No ${brand.name} Conference products listed yet`} message={brand.description} />
      )}

      <FinalCta title={`Plan a ${brand.name} Conference Project`} description="Contact Sasha with your room, participant, integration, and installation requirements. Recommendations are based on current product availability and project scope." />
    </main>
  );
}

export default function ConferenceCollectionPage(props: ConferenceCollectionPageProps) {
  return props.routeKind === "category"
    ? <CategoryTemplate category={props.category} products={props.products} breadcrumbs={props.breadcrumbs} />
    : <BrandTemplate brand={props.brand} products={props.products} breadcrumbs={props.breadcrumbs} />;
}
