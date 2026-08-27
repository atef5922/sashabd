import type { ConferenceProduct, ConferenceProductType, ConferenceSystemType } from "./catalog";

const RELATED_TYPE_PRIORITIES: Partial<Record<ConferenceProductType, readonly ConferenceProductType[]>> = {
  "control-unit": ["chairman-unit", "delegate-unit", "accessory", "control-unit"],
  "chairman-unit": ["control-unit", "delegate-unit", "accessory"],
  "delegate-unit": ["control-unit", "chairman-unit", "accessory"],
  dsp: ["control-unit", "amplifier", "processor", "speakerphone", "camera"],
  amplifier: ["dsp", "control-unit", "microphone", "package"],
  camera: ["processor", "accessory", "speakerphone", "dsp"],
  processor: ["camera", "control-unit", "accessory", "dsp"],
  package: ["control-unit", "chairman-unit", "delegate-unit", "accessory", "dsp", "amplifier"],
  speakerphone: ["camera", "dsp", "processor", "microphone"],
  microphone: ["control-unit", "amplifier", "dsp", "accessory"],
  charger: ["delegate-unit", "chairman-unit", "accessory"],
  "access-point": ["delegate-unit", "chairman-unit", "control-unit", "accessory"],
  accessory: ["camera", "control-unit", "chairman-unit", "delegate-unit"],
  other: ["control-unit", "chairman-unit", "delegate-unit", "accessory", "dsp", "amplifier"],
};

const PAPERLESS_PRIORITIES: readonly ConferenceProductType[] = [
  "control-unit",
  "processor",
  "accessory",
  "chairman-unit",
  "delegate-unit",
  "other",
];

const VIDEO_PRIORITIES: readonly ConferenceProductType[] = [
  "camera",
  "accessory",
  "processor",
  "speakerphone",
  "dsp",
];

function getSystemTypes(product: ConferenceProduct): ConferenceSystemType[] {
  if (product.systemTypes?.length) return product.systemTypes;
  if (product.systemCategory === "audio") return ["audio"];
  if (product.systemCategory === "video" || product.systemCategory === "hybrid") return ["video-hybrid"];
  return [];
}

function getRelatedTypePriorities(product: ConferenceProduct): readonly ConferenceProductType[] {
  const systemTypes = getSystemTypes(product);
  if (systemTypes.includes("paperless")) return PAPERLESS_PRIORITIES;
  if (systemTypes.includes("video-hybrid")) return VIDEO_PRIORITIES;
  for (const type of product.productTypes) {
    const priorities = RELATED_TYPE_PRIORITIES[type];
    if (priorities) return priorities;
  }
  return [];
}

function documentsAnotherProductCompatibility(
  candidate: ConferenceProduct,
  current: ConferenceProduct,
): boolean {
  if (!current.model) return false;
  const compatibilityRows = candidate.specifications.filter((spec) =>
    spec.key.toLocaleLowerCase("en-US").includes("compatibility"),
  );
  return compatibilityRows.length > 0 && !compatibilityRows.some((spec) =>
    spec.value.toLocaleLowerCase("en-US").includes(current.model!.toLocaleLowerCase("en-US")),
  );
}

/**
 * Ranks discovery links without presenting inferred relationships as verified
 * compatibility. Explicit catalog references and matching verified system
 * families come first; product role and taxonomy provide the remaining context.
 */
export function getConferenceRelatedProducts(
  current: ConferenceProduct,
  products: readonly ConferenceProduct[],
  limit = 3,
): ConferenceProduct[] {
  if (limit <= 0) return [];

  const explicitCompatibility = new Map(
    current.compatibleProductIds.map((id, index) => [id, index]),
  );
  const typePriorities = getRelatedTypePriorities(current);
  const currentSystemTypes = new Set(getSystemTypes(current));
  const isPaperless = currentSystemTypes.has("paperless");
  const isVideo = currentSystemTypes.has("video-hybrid");
  const isWireless = current.connection === "wireless";
  const seen = new Set<string>();

  return products
    .map((product, catalogIndex) => {
      if (product.id === current.id || product.slug === current.slug || seen.has(product.slug)) return null;
      seen.add(product.slug);

      let score = 0;
      const compatibilityIndex = explicitCompatibility.get(product.id);
      const isExplicitlyCompatible = compatibilityIndex !== undefined;
      if (isExplicitlyCompatible) score += 10_000 - compatibilityIndex * 100;

      const hasMatchingSystemFamily = Boolean(
        current.systemFamily && product.systemFamily === current.systemFamily,
      );
      if (hasMatchingSystemFamily) score += 1_200;

      const typeIndex = typePriorities.findIndex((type) => product.productTypes.includes(type));
      if (typeIndex >= 0) score += 500 - typeIndex * 40;

      const productSystemTypes = getSystemTypes(product);
      const sharedSystemTypes = productSystemTypes
        .filter((systemType) => currentSystemTypes.has(systemType)).length;
      score += sharedSystemTypes * 100;

      if (current.systemCategory && product.systemCategory === current.systemCategory) score += 60;
      if (current.connection && product.connection === current.connection) score += 20;
      if (current.brand && product.brand?.slug === current.brand.slug) score += 80;
      const hasConflictingCompatibility = documentsAnotherProductCompatibility(product, current);
      if (hasConflictingCompatibility) score -= 1_000;

      const isStrongCandidate = isExplicitlyCompatible || hasMatchingSystemFamily || (
        typeIndex >= 0 &&
        sharedSystemTypes > 0 &&
        score >= 500 &&
        !hasConflictingCompatibility &&
        (!isPaperless || productSystemTypes.includes("paperless")) &&
        (!isVideo || productSystemTypes.includes("video-hybrid")) &&
        !isWireless
      );
      if (!isStrongCandidate) return null;

      return { product, score, catalogIndex };
    })
    .filter((item): item is { product: ConferenceProduct; score: number; catalogIndex: number } => Boolean(item))
    .sort((a, b) => b.score - a.score || a.catalogIndex - b.catalogIndex)
    .slice(0, limit)
    .map(({ product }) => product);
}

export function getConferenceRelatedSectionCopy(product: ConferenceProduct): string {
  if (getSystemTypes(product).includes("paperless")) {
    return "Related paperless and digital conference system components.";
  }
  if (product.productTypes.includes("package") || product.productTypes.includes("other")) {
    return "Related conference system components, upgrades, and integration products.";
  }
  if (product.connection === "wireless") {
    return "Related wireless conference system components for room planning.";
  }
  if (product.productTypes.includes("control-unit")) {
    return "Discussion units and related system components for conference planning.";
  }
  if (product.productTypes.includes("chairman-unit")) {
    return "Related controllers, delegate units, and conference accessories.";
  }
  if (product.productTypes.includes("delegate-unit")) {
    return "Related controllers, chairman units, and conference accessories.";
  }
  if (product.productTypes.includes("dsp")) {
    return "Related conference audio processing and integration products.";
  }
  if (product.productTypes.includes("amplifier")) {
    return "Related conference audio processing and amplification products.";
  }
  if (product.productTypes.includes("camera")) {
    return "Related video and hybrid conference integration products.";
  }
  if (product.productTypes.includes("processor")) {
    return "Related conference processing and system integration products.";
  }
  return "Related conference system components for project planning.";
}
