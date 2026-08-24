import {
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceConnectionLabel,
  getConferenceProductAvailabilityLabel,
  getConferenceProductCardPrice,
  getConferenceProductPrimaryImage,
  getConferenceProductSpecifications,
  type ConferenceProduct,
} from "./catalog";
import type { ComparisonProductSnapshot } from "./conferenceComparison";

const meetingTypeLabels = { audio: "Audio conference", video: "Video conference", hybrid: "Hybrid conference" } as const;

export function createComparisonProductSnapshot(
  product: ConferenceProduct,
  products: readonly ConferenceProduct[],
): ComparisonProductSnapshot {
  const image = getConferenceProductPrimaryImage(product);
  const price = getConferenceProductCardPrice(product);
  const productById = new Map(products.map((item) => [item.id, item]));
  return {
    slug: product.slug,
    name: product.name,
    model: product.model ?? null,
    brand: product.brand?.name ?? null,
    productTypes: product.productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]),
    productRole: product.badge,
    connection: product.connection ? getConferenceConnectionLabel(product.connection) : null,
    meetingType: product.systemCategory ? meetingTypeLabels[product.systemCategory] : null,
    systemFamily: product.systemFamily ?? null,
    participantCapacity: product.participantRange
      ? `${product.participantRange.min ?? "Unspecified"}-${product.participantRange.max ?? "Unspecified"}`
      : null,
    price: price.label,
    priceType: price.state === "exact" ? "Exact" : price.state === "range" ? "Range" : "Request",
    availability: product.availability ? getConferenceProductAvailabilityLabel(product) : null,
    warranty: product.warranty ?? null,
    specifications: getConferenceProductSpecifications(product),
    compatibleProductSlugs: product.compatibleProductIds
      .map((id) => productById.get(id)?.slug)
      .filter((slug): slug is string => Boolean(slug)),
    image: { src: image.src, alt: image.alt },
  };
}
