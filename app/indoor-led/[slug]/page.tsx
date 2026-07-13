import { permanentRedirect } from "next/navigation";
import { getProductsByCategory } from "@/lib/productsCatalog";

const LEGACY_INDOOR_SLUGS = ["p4-indoor-led-display", "p5-indoor-led-display"] as const;
const LEGACY_INDOOR_SLUG_SET = new Set<string>(LEGACY_INDOOR_SLUGS);

export async function generateStaticParams() {
  const slugs = getProductsByCategory("indoor").map((x) => x.slug);
  const legacyAliases = [...LEGACY_INDOOR_SLUGS];
  const seen = new Set<string>();
  return [...slugs, ...legacyAliases]
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map((slug) => ({ slug }));
}

export default async function IndoorLedLegacyTopLevelProductRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const indoorSlugs = new Set(getProductsByCategory("indoor").map((x) => x.slug));
  if (LEGACY_INDOOR_SLUG_SET.has(slug) || !indoorSlugs.has(slug)) permanentRedirect("/led-display/indoor-led/");
  permanentRedirect(`/led-display/indoor-led/${slug}/`);
}
