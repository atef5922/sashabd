import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildWhatsAppHref } from "@/lib/contact";
import { buildProductMetadata } from "@/lib/seo";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import ConferenceCollectionPage from "../ConferenceCollectionPage";
import ConferenceProductDetailPage from "../ConferenceProductDetailPage";
import { getConferenceCompatibleProducts, getConferenceRelatedProducts } from "../conferenceProductRelations";
import {
  conferenceSystemCatalog,
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceProductBySlug,
  getConferenceProductPrimaryImage,
} from "../catalog";
import {
  conferenceCategoryConfigs,
  getConferenceCategoryBySlug,
  getConferenceCategoryProducts,
  isConferenceCategoryIndexable,
} from "../taxonomy";

export const dynamicParams = false;

function compactConferenceModel(model: string): string {
  const parts = model.split("/").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return model;

  const prefix = parts[0].match(/^[A-Z]+-/)?.[0];
  if (!prefix || !parts.every((part) => part.startsWith(prefix))) return model;

  return [parts[0], ...parts.slice(1).map((part) => part.slice(prefix.length))].join("/");
}

function conferenceProductSeoIdentity(product: (typeof conferenceSystemCatalog)[number]): string {
  const primaryType = CONFERENCE_PRODUCT_TYPE_LABELS[product.productTypes[0] ?? "other"];
  const usefulType = primaryType === "Complete System"
    ? primaryType
    : primaryType === "Conference System"
      ? primaryType
      : `Conference ${primaryType}`;

  if (product.brand?.name && product.model) {
    return `${product.brand.name} ${compactConferenceModel(product.model)} ${usefulType}`;
  }

  return product.name;
}

function conferenceProductSeoTitle(product: (typeof conferenceSystemCatalog)[number]): string {
  return `${conferenceProductSeoIdentity(product)} Price in Bangladesh`;
}

function conferenceProductSeoDescription(product: (typeof conferenceSystemCatalog)[number]): string {
  const identity = conferenceProductSeoIdentity(product);
  if (product.price.type === "request") {
    return `${identity} in Bangladesh. Check specifications, compatibility and current availability, then request current pricing and a project BOQ from Sasha Corporation.`;
  }

  const availability = product.availability === "project-order"
    ? "project-order availability"
    : product.availability === "in-stock"
      ? "listed availability"
      : "current availability";

  return `${identity} price in Bangladesh. Check specifications, compatibility and ${availability}, then request a project BOQ from Sasha Corporation.`;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getConferenceProductBySlug(slug);
  if (product) {
    return buildProductMetadata({
      title: conferenceProductSeoTitle(product),
      description: conferenceProductSeoDescription(product),
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

export default async function ConferenceProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getConferenceProductBySlug(slug);

  if (product) {
    const wa = buildWhatsAppHref(`Hello Sasha Corporation, I need a quotation for ${product.name}.`);

    return (
      <>
        <ConferenceProductDetailPage
          product={product}
          relatedProducts={getConferenceRelatedProducts(product, conferenceSystemCatalog)}
          wa={wa}
          compatibleProducts={getConferenceCompatibleProducts(product, conferenceSystemCatalog)}
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
