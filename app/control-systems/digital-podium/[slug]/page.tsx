import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { digitalPodiumCatalog } from "@/modules/routes/catalog/control-systems/digital-podium/catalog";

export async function generateMetadata({
  params,
}: LegacyDigitalPodiumProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/digital-podium/${slug}/`,
    },
  };
}

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
