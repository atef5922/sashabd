import { generateReceivingCardStaticParams, redirectReceivingCardSlug } from "../../../redirects";

export const generateStaticParams = generateReceivingCardStaticParams;

export default async function LegacyProductsReceivingCardSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectReceivingCardSlug(slug);
}
