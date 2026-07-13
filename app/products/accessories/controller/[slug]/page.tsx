import { generateControllerStaticParams, redirectControllerSlug } from "../../../redirects";

export const generateStaticParams = generateControllerStaticParams;

export default async function LegacyProductsControllerSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirectControllerSlug(slug);
}
