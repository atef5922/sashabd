import { permanentRedirect } from "next/navigation";
import { interactiveFlatPanelCatalog } from "@/modules/routes/catalog/control-systems/interactive-flat-panel/catalog";

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
