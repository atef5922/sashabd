import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { interactiveFlatPanelCatalog } from "@/modules/routes/catalog/control-systems/interactive-flat-panel/catalog";

export async function generateMetadata({
  params,
}: LegacyInteractiveFlatPanelProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/interactive-flat-panel/${slug}/`,
    },
  };
}

type LegacyInteractiveFlatPanelProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyInteractiveFlatPanelProductPage({
  params,
}: LegacyInteractiveFlatPanelProductPageProps) {
  const { slug } = await params;
  permanentRedirect(`/interactive-flat-panel/${slug}/`);
}

export function generateStaticParams() {
  return interactiveFlatPanelCatalog.map((item) => ({ slug: item.slug }));
}
