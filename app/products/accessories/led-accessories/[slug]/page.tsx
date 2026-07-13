import { generateLedAccessoriesStaticParams, redirectLedAccessoriesSlug } from "../../../redirects";

export const generateStaticParams = generateLedAccessoriesStaticParams;

export default async function LegacyProductsLedAccessoriesSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectLedAccessoriesSlug(slug);
}
