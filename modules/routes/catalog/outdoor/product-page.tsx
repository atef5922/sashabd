import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DisplayProductDetailPage from "@/components/products/DisplayProductDetailPage";
import { siteConfig } from "@/lib/site";
import { getRelatedProducts, outdoorCatalog } from "@/lib/productsCatalog";
import { buildProductMetadata, compactProductTitle, ensureMetaDescription } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = outdoorCatalog.find((x) => x.slug === slug);
  if (!item) return { title: "Outdoor LED Display Module" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "Outdoor LED module specifications, weather-ready planning notes, and installation support in Bangladesh."
    ),
    path: `/led-display/outdoor/${slug}`,
    image: item.image,
    openGraphTitle: `${compactProductTitle(item.title)} | Outdoor LED BD`,
  });
}

export async function generateStaticParams() {
  return outdoorCatalog.map((x) => ({ slug: x.slug }));
}

export default async function OutdoorProductDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = outdoorCatalog.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = getRelatedProducts(outdoorCatalog, product.slug, 3);
  const detailedSpecs = product.keySpecs;

  return (
    <DisplayProductDetailPage
      product={product}
      categoryLabel="Outdoor"
      categoryHref="/led-display/outdoor/"
      backHref="/led-display/outdoor/"
      backLabel="Back to Outdoor Models"
      wa={wa}
      detailedSpecs={detailedSpecs}
      featuredProducts={featuredProducts}
      featuredHrefPrefix="/led-display/outdoor/"
      relatedLinks={[
        { href: "/led-display/", label: "LED Display" },
        { href: "/led-display/outdoor/", label: "Outdoor category" },
        { href: "/contact", label: "BOQ quotation" },
        { href: "/services-support/", label: "Installation & maintenance" },
      ]}
      overview={`${product.title} is suitable for outdoor visibility where weather conditions, installation safety, and content readability from distance are critical. Final planning should confirm height, viewing angle, and stable power routing.`}
    />
  );
}
