import { permanentRedirect } from "next/navigation";
import { turnstileCatalog } from "@/modules/routes/catalog/control-systems/turnstile-gate-system/catalog";

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
