import Image from "next/image";
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
type CollectionPresentation = "default" | "conference-hub";
type CollectionHeroImage = { src: string; alt: string };

const conferenceHubSectionClass =
  "mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] [content-visibility:auto] [contain-intrinsic-size:auto_32rem] sm:px-5 md:px-6";

const CONFERENCE_HUB_CATEGORY_HERO_IMAGES: Readonly<Record<string, CollectionHeroImage>> = {
  "audio-conference-system": {
    src: "/images/conference_landing/audio-conference-system-hero.webp",
    alt: "Modern audio conference system with tabletop discussion microphones in a professional meeting room",
  },
  "digital-conference-system": {
    src: "/images/conference_landing/digital-conference-system-hero.webp",
    alt: "Modern digital conference system with touchscreen discussion microphones in a professional meeting room",
  },
  "video-conference-system": {
    src: "/images/conference_landing/video-hybrid-conference-system-hero.webp",
    alt: "Modern video and hybrid conference room with remote participants, display, camera, and tabletop microphones",
  },
  "paperless-conference-system": {
    src: "/images/conference_landing/paperless-conference-system-hero.webp",
    alt: "Modern paperless conference room with participant touchscreens and digital meeting display",
  },
  "wired-conference-system": {
    src: "/images/conference_landing/wired-conference-system-hero.webp",
    alt: "Modern wired conference system with cabled tabletop microphones in a professional meeting room",
  },
  "wireless-conference-system": {
    src: "/images/conference_landing/wireless-conference-system-hero.webp",
    alt: "Modern wireless conference system with tabletop microphones in a professional meeting room",
  },
  "chairman-unit": {
    src: "/images/conference_landing/chairman-unit-hero-compact.webp",
    alt: "Conference chairman unit with meeting controls in a professional boardroom",
  },
  "delegate-unit": {
    src: "/images/conference_landing/delegate-unit-hero.webp",
    alt: "Conference delegate unit with tabletop microphone in a professional meeting room",
  },
  "control-unit": {
    src: "/images/conference_landing/control-unit-hero.webp",
    alt: "Conference control unit for centralized meeting management in a professional boardroom",
  },
  "conference-dsp": {
    src: "/images/conference_landing/conference-dsp-hero.webp",
    alt: "Conference DSP processor for professional meeting room audio routing and processing",
  },
  "conference-amplifier": {
    src: "/images/conference_landing/conference-amplifier-hero.webp",
    alt: "Conference amplifier for professional meeting room speaker systems and clear audio reinforcement",
  },
};

const CATEGORY_HERO_EYEBROWS: Readonly<Record<ConferenceCategoryConfig["group"], string>> = {
  system: "Conference systems",
  connection: "Connection options",
  component: "System components",
  package: "Complete solutions",
};

function SectionHeading({
  eyebrow,
  title,
  description,
  presentation = "default",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  presentation?: CollectionPresentation;
}) {
  const compact = presentation === "conference-hub";
  return (
    <div className={compact ? "max-w-4xl" : "max-w-3xl"}>
      <p className={compact ? "text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f1530a]" : "text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600"}>{eyebrow}</p>
      <h2 className={compact ? "mt-1 !text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[22px]" : "mt-2 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl"}>{title}</h2>
      {description ? <p className={compact ? "mt-1.5 text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]" : "mt-3 text-sm leading-7 text-slate-600 md:text-base"}>{description}</p> : null}
    </div>
  );
}

function InformationCards({ items, presentation = "default", filled = false }: { items: readonly ConferenceCollectionInfoItem[]; presentation?: CollectionPresentation; filled?: boolean }) {
  if (!items.length) return null;
  const compact = presentation === "conference-hub";
  const filledCardClasses = [
    "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100/80",
    "border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100/80",
    "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-100/80",
  ] as const;
  const filledNumberClasses = [
    "bg-blue-600 text-white ring-blue-200",
    "bg-orange-500 text-white ring-orange-200",
    "bg-emerald-600 text-white ring-emerald-200",
  ] as const;
  return (
    <div className={compact ? "mt-4 grid gap-2.5 md:grid-cols-3" : "mt-5 grid gap-4 md:grid-cols-3"}>
      {items.map((item, index) => (
        <article key={item.title} className={compact ? `rounded-lg border p-3.5 text-center shadow-[0_3px_12px_rgba(15,23,42,0.06)] ${filled ? filledCardClasses[index % filledCardClasses.length] : "border-slate-200 bg-[#fbfdff]"}` : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"}>
          <span className={compact ? `mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ring-2 ${filled ? filledNumberClasses[index % filledNumberClasses.length] : "bg-blue-50 text-[#2456c7] ring-blue-100"}` : "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-sm font-extrabold text-orange-700"}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={compact ? "mt-2 !text-sm font-extrabold leading-5 text-[#071936]" : "mt-4 text-base font-extrabold text-slate-950"}>{item.title}</h3>
          <p className={compact ? "mt-1.5 text-center text-[11px] font-medium leading-[1.15rem] text-slate-600 sm:text-xs" : "mt-2 text-sm leading-6 text-slate-600"}>{item.description}</p>
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

function ProductGrid({ products, presentation = "default" }: { products: readonly ConferenceProduct[]; presentation?: CollectionPresentation }) {
  const compact = presentation === "conference-hub";
  const cardProducts = products.map((product) => {
    const image = getConferenceProductPrimaryImage(product);
    const primaryType = product.productTypes[0];
    return {
      slug: product.slug,
      name: product.name,
      brandName: product.brand?.name,
      productTypeLabel: primaryType ? CONFERENCE_PRODUCT_TYPE_LABELS[primaryType] : product.badge,
      connectionLabel: !compact && product.connection ? getConferenceConnectionLabel(product.connection) : undefined,
      systemFamily: compact ? undefined : product.systemFamily,
      keySpecs: getConferenceProductCardSpecs(product),
      price: getConferenceProductCardPrice(product),
      availabilityLabel: !compact && product.availability ? getConferenceProductAvailabilityLabel(product) : undefined,
      image: { src: image.src, alt: image.alt },
    };
  });

  return (
    <>
      <ProductListJsonLd products={products} />
      <ConferenceCollectionProductGrid products={cardProducts} presentation={compact ? "compact" : "standard"} />
    </>
  );
}

function PriceTable({ title, products, eyebrow = "Catalog pricing", presentation = "default" }: { title: string; products: readonly ConferenceProduct[]; eyebrow?: string; presentation?: CollectionPresentation }) {
  if (!products.length) return null;
  const compact = presentation === "conference-hub";
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
    <section id="price-list" className={compact ? `${conferenceHubSectionClass} scroll-mt-24` : "mt-10 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 md:p-7"}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description="Each row distinguishes fixed catalog price, indicative equipment range, and project quotation. Final project cost may also include compatible equipment, cabling, installation, and commissioning."
        presentation={presentation}
      />
      <ConferenceCollectionPriceTable rows={rows} presentation={compact ? "compact" : "standard"} />
    </section>
  );
}

function RelatedCategoryLinks({
  categories,
  products,
  eyebrow = "Explore next",
  title = "Related Conference Categories",
  description,
  presentation = "default",
}: {
  categories: readonly ConferenceCategoryConfig[];
  products?: readonly ConferenceProduct[];
  eyebrow?: string;
  title?: string;
  description?: string;
  presentation?: CollectionPresentation;
}) {
  if (!categories.length) return null;
  const compact = presentation === "conference-hub";
  return (
    <section className={compact ? conferenceHubSectionClass : "mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-7"}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} presentation={presentation} />
      <div className={compact ? "mt-4 flex flex-wrap gap-2" : "mt-5 flex flex-wrap gap-3"}>
        {categories.map((category) => {
          const count = products
            ? products.filter(category.matchProduct).length
            : getConferenceCategoryProductCount(category);
          return (
            <Link
              key={category.id}
              href={`/conference-system/${category.slug}/`}
              className={compact ? "inline-flex min-h-9 items-center gap-2 rounded-full border border-[#cdd9e8] bg-[#f8fbff] px-3.5 py-2 text-xs font-extrabold text-[#071936] transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#1744a1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40" : "inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"}
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
  presentation = "default",
}: {
  applications: readonly string[];
  eyebrow?: string;
  title?: string;
  description?: string;
  presentation?: CollectionPresentation;
}) {
  if (!applications.length) return null;
  const compact = presentation === "conference-hub";
  return (
    <section className={compact ? conferenceHubSectionClass : "mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7"}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} presentation={presentation} />
      <ul className={compact ? "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" : "mt-5 flex flex-wrap gap-2.5"}>
        {applications.map((application) => (
          <li key={application} className={compact ? "flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-[#f8fbff] px-3 py-2 text-left text-xs font-bold text-slate-700" : "rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"}>
            {compact ? <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] text-[#2456c7] ring-1 ring-blue-100" aria-hidden="true">✓</span> : null}
            {application}
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqSection({ title, faqs, presentation = "default" }: { title: string; faqs: readonly ConferenceCollectionFaq[]; presentation?: CollectionPresentation }) {
  if (!faqs.length) return null;
  const compact = presentation === "conference-hub";
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
    <section className={compact ? conferenceHubSectionClass : "mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionHeading eyebrow="Buyer questions" title={title} presentation={presentation} />
      <FaqAccordion items={[...faqs]} accent={compact ? "#2456c7" : ACCENT} density={compact ? "compact" : undefined} variant={compact ? "minimal" : undefined} className={compact ? "mt-3" : "mt-5"} />
    </section>
  );
}

function FinalCta({ title, description, presentation = "default" }: { title: string; description: string; presentation?: CollectionPresentation }) {
  if (presentation === "conference-hub") {
    return (
      <section className="relative mt-4 min-h-[250px] overflow-hidden rounded-2xl border border-[#172c53] bg-[#071936] shadow-[0_8px_28px_rgba(7,25,54,0.18)]">
        <Image src="/images/conference_system_projects/project2.webp" alt="" fill sizes="100vw" className="object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,54,0.99)_0%,rgba(7,25,54,0.96)_37%,rgba(7,25,54,0.68)_60%,rgba(7,25,54,0.18)_100%)]" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[250px] max-w-[560px] flex-col justify-center px-5 py-6 sm:px-7 md:px-9">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-400">Project consultation</p>
          <h2 className="mt-1.5 max-w-[470px] !text-[24px] font-black leading-[1.08] tracking-tight text-white sm:!text-[28px]">{title}</h2>
          <p className="mt-2 max-w-[460px] text-left text-[11px] font-medium leading-[1.15rem] text-blue-100 sm:text-xs">{description}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/contact/?project=conference-system" className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#f45b18] px-5 text-[10px] font-extrabold text-white transition hover:bg-[#db490d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60">Get Free BOQ</Link>
            <Link href="/conference-system/" className="inline-flex min-h-9 items-center justify-center rounded-md border border-white/45 bg-white/10 px-5 text-[10px] font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">Conference System Hub</Link>
          </div>
        </div>
      </section>
    );
  }

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

function Hero({
  eyebrow,
  title,
  description,
  productCount,
  productCountLabel,
  productsAnchor = true,
  heroImage,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  productCount: number;
  productCountLabel: string;
  productsAnchor?: boolean;
  heroImage?: CollectionHeroImage;
  breadcrumbs?: BreadcrumbItem[];
}) {
  if (heroImage) {
    return (
      <section
        className="relative left-1/2 right-1/2 isolate -mx-[50vw] min-h-[520px] w-screen overflow-hidden border-0 bg-[#f7f9fc] shadow-none sm:min-h-[460px] lg:min-h-[clamp(25rem,30vw,29rem)]"
        aria-labelledby="conference-collection-hero-heading"
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[66%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/65 to-transparent sm:from-white/90 sm:via-white/45 lg:hidden" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[520px] w-full max-w-[clamp(80rem,90vw,108rem)] items-center px-5 py-8 sm:min-h-[460px] sm:px-8 lg:min-h-[clamp(25rem,30vw,29rem)] lg:px-10">
          <div
            className="min-w-0 max-w-[42rem] lg:max-w-[43%]"
            style={{ width: "calc(100vw - 2.5rem)" }}
          >
            {breadcrumbs ? (
              <Breadcrumbs
                items={breadcrumbs}
                showBackLink={false}
                className="mb-4 text-[11px] font-semibold text-slate-600 sm:text-xs"
              />
            ) : null}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#071936] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white sm:text-xs">{eyebrow}</span>
              <span className="rounded-full border border-orange-200 bg-white/95 px-3 py-1 text-[10px] font-bold text-orange-700 shadow-sm sm:text-xs">
                {productCountLabel}
              </span>
            </div>
            <h1 id="conference-collection-hero-heading" className="mt-5 break-words text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-[39rem] text-left text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">
              {description}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 min-[430px]:flex-row">
              <Link
                href="/contact/?project=conference-system"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Get Free BOQ
              </Link>
              <Link
                href={productsAnchor && productCount ? "#products" : "/conference-system/"}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#071936] px-5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                {productsAnchor && productCount ? "View Products" : "Browse Conference Systems"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_52%,#f8fafc_100%)] p-6 md:p-9">
      <div className="relative max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-white">{eyebrow}</span>
          <span className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-bold text-orange-700">
            {productCountLabel}
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

function getCategoryProductCountLabel(category: ConferenceCategoryConfig, productCount: number): string {
  if (category.slug === "control-unit") return `${productCount} Conference Control Products`;
  if (category.group === "system" || category.group === "connection") {
    return `${productCount} ${category.shortLabel ?? category.label} Conference Products`;
  }
  return `${productCount} ${category.shortLabel ?? category.label} Products`;
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
  const heroImage = CONFERENCE_HUB_CATEGORY_HERO_IMAGES[category.slug];
  const usesConferenceHubPresentation = Boolean(heroImage);
  const presentation: CollectionPresentation = usesConferenceHubPresentation ? "conference-hub" : "default";
  const packageApplications = [
    "Small Meeting Room",
    "Corporate Boardroom",
    "Executive Boardroom",
    "Training & Seminar Room",
    "Government Meeting Room",
    "Large Conference Hall",
  ];

  return (
    <main
      className={`mx-auto w-full px-4 ${usesConferenceHubPresentation ? "-mt-2 max-w-[clamp(80rem,90vw,108rem)] pb-10 pt-0 md:px-6" : "max-w-7xl py-7 md:px-6 md:py-9"}`}
      data-conference-route-kind="category"
    >
      {usesConferenceHubPresentation ? null : <Breadcrumbs items={breadcrumbs} />}
      <Hero
        eyebrow={CATEGORY_HERO_EYEBROWS[category.group]}
        title={content.heroTitle}
        description={content.intro}
        productCount={products.length}
        productCountLabel={getCategoryProductCountLabel(category, products.length)}
        breadcrumbs={usesConferenceHubPresentation ? breadcrumbs : undefined}
        heroImage={heroImage}
      />

      {isCompletePackage ? <ConferencePackageCards /> : null}

      <section className={usesConferenceHubPresentation ? conferenceHubSectionClass : "mt-10"}>
        <SectionHeading eyebrow="Category essentials" title={`Understanding ${category.label}`} presentation={presentation} />
        <InformationCards items={content.highlights} presentation={presentation} filled={usesConferenceHubPresentation} />
      </section>

      {products.length ? (
        <section id="products" className={usesConferenceHubPresentation ? `${conferenceHubSectionClass} scroll-mt-24` : "mt-10 scroll-mt-24"}>
          <SectionHeading
            eyebrow={isCompletePackage ? "Ready-made systems" : "Available products"}
            title={isCompletePackage ? "Ready-Made Conference System Products" : "Matching Products"}
            description={
              isCompletePackage
                ? `${products.length} ready-made system products are listed here separately from the installed room packages above.`
                : "Every product below is matched to this category and links to its own product page."
            }
            presentation={presentation}
          />
          <ProductGrid products={products} presentation={presentation} />
        </section>
      ) : (
        <EmptyState title={`No ${category.shortLabel ?? category.label} products listed yet`} message={content.emptyMessage ?? "Products are being prepared for this category. Contact Sasha for project consultation and current availability."} />
      )}

      <PriceTable
        title={isCompletePackage ? "Complete Conference System Product Price in Bangladesh" : `${category.label} Price in Bangladesh`}
        products={products}
        eyebrow={isCompletePackage ? "Product pricing" : undefined}
        presentation={presentation}
      />

      <section className={usesConferenceHubPresentation ? conferenceHubSectionClass : "mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7"}>
        <SectionHeading eyebrow="Selection guide" title={content.buyerGuideTitle} description={content.buyerGuideIntro} presentation={presentation} />
        <InformationCards items={content.buyerGuide} presentation={presentation} />
      </section>

      <RelatedCategoryLinks
        categories={relatedCategories}
        eyebrow={isCompletePackage ? "Plan your system" : undefined}
        title={isCompletePackage ? "Explore Related Conference Systems" : undefined}
        presentation={presentation}
        description={
          isCompletePackage
            ? "Compare audio, video, wired, wireless, and control-unit options when planning a complete meeting room conference system in Bangladesh."
            : undefined
        }
      />

      {relevantBrands.length ? (
        <section className={usesConferenceHubPresentation ? conferenceHubSectionClass : "mt-10 rounded-3xl border border-slate-200 bg-white p-5 md:p-7"}>
          <SectionHeading
            eyebrow={isCompletePackage ? "Product brand" : "Shop by brand"}
            title={isCompletePackage ? "Brand Represented in Ready-Made Systems" : "Available Brands"}
            description={
              isCompletePackage
                ? "This brand is represented by the ready-made conference system products listed above. Installed room packages are planned separately according to project requirements and confirmed availability."
                : "Brands represented by the products in this collection are shown here."
            }
            presentation={presentation}
          />
          <div className={usesConferenceHubPresentation ? "mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4" : "mt-5 flex flex-wrap gap-3"}>
            {relevantBrands.map((brand) => (
              <Link key={brand.id} href={`/conference-system/brands/${brand.slug}/`} className={usesConferenceHubPresentation ? "flex min-h-14 items-center justify-between rounded-lg border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm font-extrabold text-[#071936] transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#1744a1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40" : "inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-900 transition hover:border-orange-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"}>
                <span>{brand.name}</span>
                {usesConferenceHubPresentation ? <span className="text-[#2456c7]" aria-hidden="true">→</span> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <ApplicationList
        applications={isCompletePackage ? packageApplications : applications}
        eyebrow={isCompletePackage ? "Meeting room applications" : undefined}
        title={isCompletePackage ? "Suitable Applications for Conference System Packages" : undefined}
        presentation={presentation}
        description={
          isCompletePackage
            ? "Complete conference system packages can be planned for rooms of different sizes, participant capacities, seating layouts, and formal meeting workflows."
            : undefined
        }
      />
      <FaqSection title={`${category.shortLabel ?? category.label} FAQ`} faqs={content.faqs} presentation={presentation} />
      <FinalCta title="Need Help Choosing the Right Conference System?" description="Share your room size, seating layout, participant workflow, and installation requirements. Sasha can help review available products and prepare a project quotation or BOQ." presentation={presentation} />
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
  const presentation: CollectionPresentation = "conference-hub";
  const heroImage: CollectionHeroImage = {
    src: "/images/conference_landing/hero_banner.webp",
    alt: "Professional conference room with tabletop discussion microphones",
  };

  return (
    <main className="mx-auto -mt-2 w-full max-w-[clamp(80rem,90vw,108rem)] px-4 pb-10 pt-0 md:px-6" data-conference-route-kind="brand">
      <Hero
        eyebrow="Conference system brand"
        title={title}
        description={description}
        productCount={products.length}
        productCountLabel={`${products.length} ${brand.name} Conference Products`}
        breadcrumbs={breadcrumbs}
        heroImage={heroImage}
      />

      {content ? (
        <section className={conferenceHubSectionClass}>
          <SectionHeading eyebrow="Brand overview" title={`${brand.name} Conference Portfolio`} presentation={presentation} />
          <InformationCards items={content.highlights} presentation={presentation} filled />
        </section>
      ) : null}

      {products.length ? (
        <>
          <section className={conferenceHubSectionClass}>
            <SectionHeading eyebrow="Product range" title="Available Product Categories" description={`Explore the conference categories represented by ${brand.name} products in this collection.`} presentation={presentation} />
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link key={category.id} href={`/conference-system/${category.slug}/`} className="flex min-h-14 items-center justify-between rounded-lg border border-slate-200 bg-[#f8fbff] px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                  <span>
                    <span className="block text-sm font-extrabold text-[#071936]">{category.shortLabel ?? category.label}</span>
                    <span className="mt-0.5 block text-[11px] font-semibold text-slate-500">{products.filter(category.matchProduct).length} products</span>
                  </span>
                  <span className="text-[#2456c7]" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>

          <section id="products" className={`${conferenceHubSectionClass} scroll-mt-24`}>
            <SectionHeading eyebrow="Available products" title={`${brand.name} Products`} description={`Browse the ${brand.name} conference products currently included in this collection.`} presentation={presentation} />
            <ProductGrid products={products} presentation={presentation} />
          </section>

          <PriceTable title={`${brand.name} Conference System Price in Bangladesh`} products={products} presentation={presentation} />

          {productTypes.length ? (
            <section className={conferenceHubSectionClass}>
              <SectionHeading eyebrow="Product coverage" title="Available Product Types" presentation={presentation} />
              <ul className="mt-4 flex flex-wrap gap-2">
                {productTypes.map((type) => <li key={type} className="rounded-full border border-[#cdd9e8] bg-[#f8fbff] px-3.5 py-2 text-xs font-extrabold text-[#071936]">{CONFERENCE_PRODUCT_TYPE_LABELS[type]}</li>)}
              </ul>
            </section>
          ) : null}

          <ApplicationList applications={applications} presentation={presentation} />
          <RelatedCategoryLinks categories={categories} products={products} presentation={presentation} />

          {content ? (
            <section className={conferenceHubSectionClass}>
              <SectionHeading eyebrow="Project planning" title={content.buyerGuideTitle} description={content.buyerGuideIntro} presentation={presentation} />
              <InformationCards items={content.buyerGuide} presentation={presentation} />
            </section>
          ) : null}

          {content ? <FaqSection title={`${brand.name} Conference System FAQ`} faqs={content.faqs} presentation={presentation} /> : null}
        </>
      ) : (
        <EmptyState title={`No ${brand.name} Conference products listed yet`} message={brand.description} />
      )}

      <FinalCta title={`Plan a ${brand.name} Conference Project`} description="Contact Sasha with your room, participant, integration, and installation requirements. Recommendations are based on current product availability and project scope." presentation={presentation} />
    </main>
  );
}

export default function ConferenceCollectionPage(props: ConferenceCollectionPageProps) {
  return props.routeKind === "category"
    ? <CategoryTemplate category={props.category} products={props.products} breadcrumbs={props.breadcrumbs} />
    : <BrandTemplate brand={props.brand} products={props.products} breadcrumbs={props.breadcrumbs} />;
}
