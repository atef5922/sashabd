import {
  conferenceSystemCatalog,
  getConferenceConnectionLabel,
  getConferenceProductAvailabilityLabel,
  getConferenceProductCardPrice,
  getConferenceProductCardSpecs,
  getConferenceProductPrimaryImage,
  getConferenceProductSystemTypes,
  CONFERENCE_SYSTEM_TYPE_LABELS,
} from "./catalog";
import {
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceProductDisplayType,
} from "./conferenceProductDisplayType";
import type { ConferenceExplorerProduct } from "./conferenceExplorerTypes";

/**
 * Produces only the compact fields needed by the interactive product explorer.
 * Long descriptions, applications and tags stay in the server catalog and on
 * product-detail pages instead of being duplicated in the hub-page payload.
 */
export function buildConferenceExplorerProducts(): ConferenceExplorerProduct[] {
  return conferenceSystemCatalog.map((product) => {
    const primaryImage = getConferenceProductPrimaryImage(product);
    const productTypeLabel = getConferenceProductDisplayType(product);
    const features = [...new Set([
      ...product.keyFeatures,
      ...getConferenceProductCardSpecs(product).map((spec) => spec.value),
    ])].filter(Boolean).slice(0, 3);
    const systemTypes = getConferenceProductSystemTypes(product);

    return {
      slug: product.slug,
      name: product.name,
      model: product.model,
      brandSlug: product.brand?.slug ?? null,
      brandName: product.brand?.name,
      productTypes: [...product.productTypes],
      connection: product.connection ?? null,
      meetingType: product.systemCategory ?? null,
      systemTypes,
      availability: product.availability ?? null,
      productTypeLabel,
      shortDescription: product.shortDescription,
      features,
      connectionLabel: product.connection ? getConferenceConnectionLabel(product.connection) : undefined,
      systemFamily: product.systemFamily,
      keySpecs: getConferenceProductCardSpecs(product).slice(0, 5),
      price: getConferenceProductCardPrice(product),
      priceValue:
        product.price.type === "fixed"
          ? { type: "fixed" as const, amount: product.price.amount }
          : product.price.type === "range"
            ? { type: "range" as const, min: product.price.min, max: product.price.max }
            : { type: "request" as const },
      availabilityLabel: product.availability
        ? getConferenceProductAvailabilityLabel(product)
        : undefined,
      image: { src: primaryImage.src, alt: primaryImage.alt },
      images: product.images.slice(0, 4).map((image) => ({ src: image.src, alt: image.alt })),
      searchText: [
        product.name,
        product.model,
        product.brand?.name,
        product.productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]).join(" "),
        product.connection ? getConferenceConnectionLabel(product.connection) : undefined,
        systemTypes.map((systemType) => CONFERENCE_SYSTEM_TYPE_LABELS[systemType]).join(" "),
        product.systemFamily,
        product.tags.join(" "),
      ]
        .filter(Boolean)
        .join(" "),
    };
  });
}
