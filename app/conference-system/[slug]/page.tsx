import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import ConferenceCollectionPage from "../ConferenceCollectionPage";
import ConferenceProductDetailPage from "../ConferenceProductDetailPage";
import {
  conferenceSystemCatalog,
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

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getConferenceProductBySlug(slug);
  if (product) {
    return buildProductMetadata({
      title: product.name,
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

function getRelatedProducts(slug: string) {
  return conferenceSystemCatalog
    .filter((product) => product.slug !== slug)
    .slice(0, 3);
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
      <ConferenceProductDetailPage
        product={product}
        relatedProducts={getRelatedProducts(product.slug)}
        wa={wa}
      />
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
