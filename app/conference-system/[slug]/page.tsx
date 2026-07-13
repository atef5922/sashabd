import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import ConferenceProductDetailPage from "../ConferenceProductDetailPage";
import { conferenceSystemCatalog, getConferenceProductBySlug } from "../catalog";

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getConferenceProductBySlug(slug);
  if (!product) return { title: "Conference System" };

  return buildProductMetadata({
    title: product.title,
    description: ensureMetaDescription(
      product.subtitle,
      "Conference system price, specifications, BOQ support, installation, and after-sales service in Bangladesh."
    ),
    path: `/conference-system/${slug}`,
    image: product.image,
    openGraphTitle: `${product.title} | Conference System`,
  });
}

export async function generateStaticParams() {
  return conferenceSystemCatalog.map((product) => ({ slug: product.slug }));
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

  if (!product) {
    notFound();
  }

  const wa = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hello Sasha Corporation, I need quotation for ${product.title}.`
  )}`;

  return (
    <ConferenceProductDetailPage
      product={product}
      relatedProducts={getRelatedProducts(product.slug)}
      wa={wa}
    />
  );
}
