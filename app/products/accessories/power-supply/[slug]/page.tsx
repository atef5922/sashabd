import { generatePowerSupplyStaticParams, redirectPowerSupplySlug } from "../../../redirects";

export const generateStaticParams = generatePowerSupplyStaticParams;

export default async function LegacyProductsPowerSupplySlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectPowerSupplySlug(slug);
}
