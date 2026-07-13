import { permanentRedirect } from "next/navigation";
import { digitalPodiumCatalog } from "@/modules/routes/catalog/control-systems/digital-podium/catalog";

type LegacyDigitalPodiumProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyDigitalPodiumProductPage({
  params,
}: LegacyDigitalPodiumProductPageProps) {
  const { slug } = await params;
  permanentRedirect(`/digital-podium/${slug}/`);
}

export function generateStaticParams() {
  return digitalPodiumCatalog.map((item) => ({ slug: item.slug }));
}
