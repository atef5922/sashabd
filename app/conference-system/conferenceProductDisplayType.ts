export const CONFERENCE_PRODUCT_TYPES = [
  "chairman-unit",
  "delegate-unit",
  "control-unit",
  "dsp",
  "amplifier",
  "camera",
  "video-bar",
  "speakerphone",
  "package",
  "accessory",
  "microphone",
  "charger",
  "access-point",
  "processor",
  "other",
] as const;

export type ConferenceProductType = (typeof CONFERENCE_PRODUCT_TYPES)[number];

export const CONFERENCE_PRODUCT_TYPE_LABELS: Readonly<Record<ConferenceProductType, string>> = {
  "chairman-unit": "Chairman Unit",
  "delegate-unit": "Delegate Unit",
  "control-unit": "Control Unit",
  dsp: "DSP",
  amplifier: "Amplifier",
  camera: "Camera",
  "video-bar": "Video Bar",
  speakerphone: "Speakerphone",
  package: "Complete System",
  accessory: "Accessory",
  microphone: "Microphone",
  charger: "Charger",
  "access-point": "Access Point",
  processor: "Processor",
  other: "Conference System",
};

type ConferenceProductDisplaySource = {
  productTypes?: readonly string[] | null;
  badge?: string | null;
};

function isConferenceProductType(value: string): value is ConferenceProductType {
  return Object.hasOwn(CONFERENCE_PRODUCT_TYPE_LABELS, value);
}

/**
 * Resolves the product-type text shown on cards without changing the product's
 * taxonomy. A functional collection (or one active product-type filter) wins
 * when the product belongs to it; context-free listings use a truthful compact
 * role label or the product's canonical badge.
 */
export function getConferenceProductDisplayType(
  product: ConferenceProductDisplaySource,
  currentProductType?: ConferenceProductType | null,
): string {
  const productTypes = [...new Set((product.productTypes ?? []).filter(isConferenceProductType))];

  if (currentProductType && productTypes.includes(currentProductType)) {
    return CONFERENCE_PRODUCT_TYPE_LABELS[currentProductType];
  }

  if (productTypes.length === 1) {
    return CONFERENCE_PRODUCT_TYPE_LABELS[productTypes[0]];
  }

  if (
    productTypes.length === 2
    && productTypes.includes("chairman-unit")
    && productTypes.includes("delegate-unit")
  ) {
    return "Chairman / Delegate";
  }

  const canonicalBadge = product.badge?.trim();
  if (canonicalBadge) return canonicalBadge;

  if (productTypes.length > 1) {
    return productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]).join(" / ");
  }

  return CONFERENCE_PRODUCT_TYPE_LABELS.other;
}
