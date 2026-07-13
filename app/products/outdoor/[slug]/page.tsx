import { generateOutdoorStaticParams, redirectOutdoorSlug } from "../../redirects";

export const generateStaticParams = generateOutdoorStaticParams;

export default async function LegacyProductsOutdoorSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectOutdoorSlug(slug);
}
