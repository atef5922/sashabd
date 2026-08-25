import type { ConferenceExplorerProduct } from "./conferenceExplorerTypes";

export const CONFERENCE_PRODUCTS_PER_BRAND = 3;
export const CONFERENCE_BRAND_ORDER = ["cmx", "toa", "bosch", "spon"] as const;
export const CONFERENCE_FEATURED_PRODUCT_ORDER: Partial<Record<string, readonly string[]>> = {
  cmx: [
    "cmx-cs-700a-conference-system-with-discussion-units",
    "cmx-cs-100-s101-s102-digital-conference-system",
    "cmx-5g-100mc-wifi-wireless-conference-controller",
  ],
};

export const CONFERENCE_INITIAL_PRODUCT_COUNT =
  CONFERENCE_PRODUCTS_PER_BRAND * CONFERENCE_BRAND_ORDER.length;

export function balanceConferenceProductsByBrand(
  products: readonly ConferenceExplorerProduct[],
  perBrand = CONFERENCE_PRODUCTS_PER_BRAND,
): ConferenceExplorerProduct[] {
  const byBrand = new Map<string, ConferenceExplorerProduct[]>();
  for (const product of products) {
    const key = product.brandSlug ?? "";
    byBrand.set(key, [...(byBrand.get(key) ?? []), product]);
  }

  const rank = (slug: string) => {
    const index = CONFERENCE_BRAND_ORDER.indexOf(slug as (typeof CONFERENCE_BRAND_ORDER)[number]);
    return index >= 0 ? index : slug ? CONFERENCE_BRAND_ORDER.length : CONFERENCE_BRAND_ORDER.length + 1;
  };
  const lead: ConferenceExplorerProduct[] = [];
  const rest: ConferenceExplorerProduct[] = [];

  for (const [slug, bucket] of [...byBrand].sort((a, b) => rank(a[0]) - rank(b[0]))) {
    const featuredOrder = CONFERENCE_FEATURED_PRODUCT_ORDER[slug];
    const featuredRank = new Map(featuredOrder?.map((productSlug, index) => [productSlug, index]) ?? []);
    const orderedBucket = featuredOrder
      ? [...bucket].sort(
          (a, b) =>
            (featuredRank.get(a.slug) ?? featuredOrder.length) -
            (featuredRank.get(b.slug) ?? featuredOrder.length),
        )
      : bucket;

    if (rank(slug) < CONFERENCE_BRAND_ORDER.length) {
      lead.push(...orderedBucket.slice(0, perBrand));
      rest.push(...orderedBucket.slice(perBrand));
    } else {
      rest.push(...orderedBucket);
    }
  }

  return [...lead, ...rest];
}
