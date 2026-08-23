import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildProductMetadata, ensureMetaDescription, socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import ConferenceCollectionPage from "../ConferenceCollectionPage";
import ConferenceProductDetailPage from "../ConferenceProductDetailPage";
import {
  conferenceSystemCatalog,
  getConferenceProductBySlug,
  getConferenceProductPrimaryImage,
  getConferenceProductSpecifications,
} from "../catalog";
import {
  conferenceCategoryConfigs,
  getConferenceCategoryBySlug,
  getConferenceCategoryProducts,
  isConferenceCategoryIndexable,
} from "../taxonomy";

export const dynamicParams = false;

/**
 * Adds the commercial qualifier Bangladeshi buyers actually search for, but only
 * as much of it as fits inside the ~60 character SERP limit.
 */
const SERP_TITLE_LIMIT = 60;

function conferenceProductSeoTitle(name: string): string {
  for (const suffix of [" Price in Bangladesh", " Price in BD", " Price"]) {
    if (name.length + suffix.length <= SERP_TITLE_LIMIT) return `${name}${suffix}`;
  }
  return name;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getConferenceProductBySlug(slug);
  if (product) {
    return buildProductMetadata({
      title: conferenceProductSeoTitle(product.name),
      description: ensureMetaDescription(
        product.shortDescription,
        "Conference system price, specifications, BOQ support, installation, and after-sales service in Bangladesh."
      ),
      path: `/conference-system/${slug}`,
      image: getConferenceProductPrimaryImage(product).src,
      openGraphTitle: `${product.name} | Conference System`,
    });
  }

  const category = getConferenceCategoryBySlug(slug);
  if (!category) return { title: "Conference System" };
  const indexable = isConferenceCategoryIndexable(category);
  const metadata = buildProductMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: `/conference-system/${category.slug}/`,
    openGraphTitle: category.seo.title,
    openGraphType: "website",
    index: indexable,
  });

  return indexable ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

export async function generateStaticParams() {
  return [
    ...conferenceSystemCatalog.map((product) => ({ slug: product.slug })),
    ...conferenceCategoryConfigs.map((category) => ({ slug: category.slug })),
  ];
}

/**
 * Related products, most relevant first:
 * 1. units the catalog explicitly marks as compatible
 * 2. other products from the same brand
 * 3. products sharing a product type
 * 4. catalogue order, so the block is never empty
 */
function getRelatedProducts(slug: string, limit = 3) {
  const current = getConferenceProductBySlug(slug);
  if (!current) return conferenceSystemCatalog.filter((product) => product.slug !== slug).slice(0, limit);

  const picked = new Map<string, (typeof conferenceSystemCatalog)[number]>();
  const add = (product: (typeof conferenceSystemCatalog)[number]) => {
    if (product.slug !== slug && !picked.has(product.slug) && picked.size < limit) {
      picked.set(product.slug, product);
    }
  };

  for (const id of current.compatibleProductIds) {
    const match = conferenceSystemCatalog.find((product) => product.id === id);
    if (match) add(match);
  }

  if (current.brand) {
    for (const product of conferenceSystemCatalog) {
      if (product.brand?.slug === current.brand.slug) add(product);
    }
  }

  for (const product of conferenceSystemCatalog) {
    if (product.productTypes.some((type) => current.productTypes.includes(type))) add(product);
  }

  for (const product of conferenceSystemCatalog) add(product);

  return [...picked.values()];
}

/**
 * Product schema for rich results. Prices are declared exactly as the catalog
 * holds them: a fixed amount becomes an Offer, an indicative project range
 * becomes an AggregateOffer with low/high bounds. No ratings are emitted
 * because the site has no review data to support them.
 */
function buildProductJsonLd(product: (typeof conferenceSystemCatalog)[number]) {
  const url = absoluteUrl(`/conference-system/${product.slug}/`);
  const images = product.images.map((image) => socialImageUrl(image.src));
  const availability =
    product.availability === "in-stock"
      ? "https://schema.org/InStock"
      : "https://schema.org/PreOrder";

  const seller = { "@type": "Organization", name: BRAND_NAME } as const;
  const offers =
    product.price.type === "fixed"
      ? {
          "@type": "Offer",
          priceCurrency: product.price.currency,
          price: product.price.amount,
          availability,
          url,
          seller,
        }
      : product.price.type === "range"
        ? {
            "@type": "AggregateOffer",
            priceCurrency: product.price.currency,
            lowPrice: product.price.min,
            highPrice: product.price.max,
            availability,
            url,
            seller,
          }
        : {
            "@type": "Offer",
            priceCurrency: product.price.currency,
            availability: "https://schema.org/PreOrder",
            url,
            seller,
          };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: images,
    url,
    // The slug is the only stable per-listing identifier we own. Model numbers are
    // published as mpn, and bundles carry two model numbers so they are not a SKU.
    sku: product.slug,
    ...(product.model && !/[/\s]/.test(product.model) ? { mpn: product.model } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand.name } } : {}),
    category: "Conference System",
    additionalProperty: getConferenceProductSpecifications(product).map((spec) => ({
      "@type": "PropertyValue",
      name: spec.key,
      value: spec.value,
    })),
    offers,
  };
}

export default async function ConferenceProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getConferenceProductBySlug(slug);

  if (product) {
    const wa = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Hello Sasha Corporation, I need quotation for ${product.name}.`
    )}`;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(product)) }}
        />
        <ConferenceProductDetailPage
          product={product}
          relatedProducts={getRelatedProducts(product.slug)}
          wa={wa}
          compatibleProducts={product.compatibleProductIds
            .map((id) => conferenceSystemCatalog.find((item) => item.id === id))
            .filter((item): item is (typeof conferenceSystemCatalog)[number] => Boolean(item))}
          categoryLinks={conferenceCategoryConfigs
            .filter((category) => category.matchProduct(product) && isConferenceCategoryIndexable(category))
            .map((category) => ({ href: `/conference-system/${category.slug}/`, label: category.label }))}
          brandLink={
            product.brand
              ? { href: `/conference-system/brands/${product.brand.slug}/`, label: `All ${product.brand.name} Conference Products` }
              : null
          }
        />
      </>
    );
  }

  const category = getConferenceCategoryBySlug(slug);
  if (!category) notFound();
  const products = getConferenceCategoryProducts(category);

  return (
    <ConferenceCollectionPage
      routeKind="category"
      category={category}
      products={products}
      breadcrumbs={[
        homeBreadcrumb(),
        { href: "/conference-system/", label: "Conference System" },
        { href: `/conference-system/${category.slug}/`, label: category.label, current: true },
      ]}
    />
  );
}
