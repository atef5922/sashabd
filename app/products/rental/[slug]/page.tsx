import { generateRentalStaticParams, redirectRentalSlug } from "../../redirects";

export const generateStaticParams = generateRentalStaticParams;

export default async function LegacyProductsRentalSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectRentalSlug(slug);
}
