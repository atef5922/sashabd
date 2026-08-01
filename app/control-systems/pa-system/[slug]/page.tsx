import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { paSystemCatalog } from "@/modules/routes/catalog/control-systems/pa-system/catalog";

export async function generateMetadata({
  params,
}: LegacyPaSystemProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/pa-system/${slug}/`,
    },
  };
}

type LegacyPaSystemProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyPaSystemProductPage({
  params,
}: LegacyPaSystemProductPageProps) {
  const { slug } = await params;
  permanentRedirect(`/pa-system/${slug}/`);
}

export function generateStaticParams() {
  return paSystemCatalog.map((item) => ({ slug: item.slug }));
}

