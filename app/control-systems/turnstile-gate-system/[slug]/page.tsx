import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { turnstileCatalog } from "@/modules/routes/catalog/control-systems/turnstile-gate-system/catalog";

export async function generateMetadata({
  params,
}: LegacyTurnstileGateSystemProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/turnstile-gate/${slug}/`,
    },
  };
}

type LegacyTurnstileGateSystemProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyTurnstileGateSystemProductPage({
  params,
}: LegacyTurnstileGateSystemProductPageProps) {
  const { slug } = await params;
  permanentRedirect(`/turnstile-gate/${slug}/`);
}

export function generateStaticParams() {
  return turnstileCatalog.map((item) => ({ slug: item.slug }));
}
