import { generateIndoorStaticParams, redirectIndoorSlug } from "../../redirects";

export const generateStaticParams = generateIndoorStaticParams;

export default async function LegacyProductsIndoorSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectIndoorSlug(slug);
}
