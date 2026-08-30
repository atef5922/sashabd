import {
  CONFERENCE_PRODUCT_TYPE_LABELS,
  CONFERENCE_SYSTEM_TYPE_LABELS,
  getConferenceConnectionLabel,
  getConferenceProductAvailabilityLabel,
  getConferenceProductCardPrice,
  getConferenceProductPrimaryImage,
  getConferenceProductSystemTypes,
  getConferenceProductSpecifications,
  type ConferenceProduct,
} from "./catalog";
import { getConferenceProductDisplayType } from "./conferenceProductDisplayType";
import type { ComparisonProductSnapshot } from "./conferenceComparison";

function formatParticipantCapacity(product: ConferenceProduct): string | null {
  if (!product.participantRange) return null;
  const { min, max } = product.participantRange;
  if (min !== undefined && max !== undefined) return `${min}–${max} participants`;
  if (min !== undefined) return `At least ${min} participants`;
  if (max !== undefined) return `Up to ${max} participants`;
  return null;
}

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
    productRole: getConferenceProductDisplayType(product),
    connection: product.connection ? getConferenceConnectionLabel(product.connection) : null,
    meetingType: getConferenceProductSystemTypes(product)
      .map((systemType) => CONFERENCE_SYSTEM_TYPE_LABELS[systemType])
      .join(", ") || null,
    systemFamily: product.systemFamily ?? null,
    participantCapacity: formatParticipantCapacity(product),
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
