import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { buildProductMetadata } from "@/lib/seo";
import ConferenceCollectionPage from "../../ConferenceCollectionPage";
import {
  conferenceBrandConfigs,
  getConferenceBrandBySlug,
  getConferenceBrandProducts,
} from "../../taxonomy";

export const dynamicParams = false;

export async function generateStaticParams() {
  return conferenceBrandConfigs.map((brand) => ({ brandSlug: brand.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ brandSlug: string }> }
): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = getConferenceBrandBySlug(brandSlug);
  if (!brand) return { title: "Conference System Brands" };

  const hasProducts = getConferenceBrandProducts(brand).length > 0;
  const metadata = buildProductMetadata({
    title: brand.seo.title,
    description: brand.seo.description,
    path: `/conference-system/brands/${brand.slug}/`,
    openGraphTitle: brand.seo.title,
    openGraphType: "website",
    index: hasProducts,
  });

  return hasProducts ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

export default async function ConferenceBrandPage(
  { params }: { params: Promise<{ brandSlug: string }> }
) {
  const { brandSlug } = await params;
  const brand = getConferenceBrandBySlug(brandSlug);
  if (!brand) notFound();

  return (
    <ConferenceCollectionPage
      routeKind="brand"
      title={`${brand.name} Conference System`}
      description={brand.description}
      products={getConferenceBrandProducts(brand)}
      breadcrumbs={[
        homeBreadcrumb(),
        { href: "/conference-system/", label: "Conference System" },
        { href: "/conference-system/brands/", label: "Brands" },
        { href: `/conference-system/brands/${brand.slug}/`, label: brand.name, current: true },
      ]}
    />
  );
}
