import {
  conferenceSystemCatalog,
  getConferenceProductSystemTypes,
  type ConferenceProduct,
  type ConferenceProductType,
  validateConferenceCatalog,
} from "./catalog";
import {
  conferenceBrandPageContent,
  conferenceCategoryPageContent,
  type ConferenceBrandPageContent,
  type ConferenceCategoryPageContent,
} from "./collectionContent";

export type ConferenceCategoryGroup = "system" | "connection" | "component" | "package";

export type ConferenceCategoryConfig = {
  id: string;
  slug: string;
  label: string;
  shortLabel?: string;
  group: ConferenceCategoryGroup;
  /** Functional product type represented by this collection, when applicable. */
  productType?: ConferenceProductType;
  description: string;
  seo: {
    title: string;
    description: string;
  };
  matchProduct: (product: ConferenceProduct) => boolean;
  featured?: boolean;
  order: number;
};

export type ConferenceBrandConfig = {
  id: string;
  slug: string;
  name: string;
  description: string;
  featured?: boolean;
  order: number;
  seo: {
    title: string;
    description: string;
  };
};

export const conferenceCategoryConfigs: readonly ConferenceCategoryConfig[] = [
  {
    id: "system-audio",
    slug: "audio-conference-system",
    label: "Audio Conference System",
    shortLabel: "Audio",
    group: "system",
    description: "Audio conference products for meeting-room speech, control, processing, amplification, and wireless operation.",
    seo: {
      title: "Audio Conference System Price in Bangladesh",
      description: "Compare audio conference system prices in Bangladesh. Explore chairman, delegate, control and complete discussion systems with project BOQ support.",
    },
    matchProduct: (product) => getConferenceProductSystemTypes(product).includes("audio"),
    featured: true,
    order: 10,
  },
  {
    id: "system-digital",
    slug: "digital-conference-system",
    label: "Digital Conference System",
    shortLabel: "Digital",
    group: "system",
    description: "Digital discussion and conference products with verified digital system architecture or family relationships.",
    seo: {
      title: "Digital Conference System Price in Bangladesh",
      description: "Compare digital conference system prices in Bangladesh from Bosch, TOA, SPON and CMX. Browse control, chairman and delegate units and request a BOQ.",
    },
    matchProduct: (product) => getConferenceProductSystemTypes(product).includes("digital"),
    featured: true,
    order: 15,
  },
  {
    id: "system-video",
    slug: "video-conference-system",
    label: "Video & Hybrid Conference System",
    shortLabel: "Video / Hybrid",
    group: "system",
    description: "Video and hybrid conference products for cameras, presentation processing, switching, and meeting-room AV workflows.",
    seo: {
      title: "Video & Hybrid Conference System Price in Bangladesh",
      description: "Explore video and hybrid conference system prices in Bangladesh, including cameras and AV processing with room planning and project BOQ support.",
    },
    matchProduct: (product) => getConferenceProductSystemTypes(product).includes("video-hybrid"),
    featured: true,
    order: 20,
  },
  {
    id: "system-paperless",
    slug: "paperless-conference-system",
    label: "Paperless Conference System",
    shortLabel: "Paperless",
    group: "system",
    description: "Paperless conference hosts and management servers for agenda, document, and formal meeting workflows.",
    seo: {
      title: "Paperless Conference System Price in Bangladesh",
      description: "Explore paperless conference system prices in Bangladesh for agenda, document and meeting-management workflows. Compare systems and request a BOQ.",
    },
    matchProduct: (product) => getConferenceProductSystemTypes(product).includes("paperless"),
    featured: true,
    order: 25,
  },
  {
    id: "connection-wired",
    slug: "wired-conference-system",
    label: "Wired Conference System",
    shortLabel: "Wired",
    group: "connection",
    description: "Wired conference system products, including chairman units, delegate units, and control units.",
    seo: {
      title: "Wired Conference System Price in Bangladesh",
      description: "Compare wired conference system prices in Bangladesh for boardrooms and meeting rooms. Browse chairman, delegate and control units with BOQ support.",
    },
    matchProduct: (product) => product.connection === "wired",
    featured: true,
    order: 30,
  },
  {
    id: "connection-wireless",
    slug: "wireless-conference-system",
    label: "Wireless Conference System",
    shortLabel: "Wireless",
    group: "connection",
    description: "Wireless conference products for flexible meeting-room layouts, delegate operation, access, and charging workflows.",
    seo: {
      title: "Wireless Conference System Price in Bangladesh",
      description: "Compare wireless conference system prices in Bangladesh. Browse wireless controllers, discussion units and accessories with project BOQ support.",
    },
    matchProduct: (product) => product.connection === "wireless",
    featured: true,
    order: 40,
  },
  {
    id: "component-chairman-unit",
    slug: "chairman-unit",
    label: "Conference Chairman Unit",
    shortLabel: "Chairman Unit",
    group: "component",
    productType: "chairman-unit",
    description: "Chairman units for structured conference discussion and chairperson control positions.",
    seo: {
      title: "Conference Chairman Unit Price in Bangladesh",
      description: "Compare conference chairman unit prices in Bangladesh for boardrooms and councils. Review system compatibility and request a project BOQ.",
    },
    matchProduct: (product) => product.productTypes.includes("chairman-unit"),
    order: 50,
  },
  {
    id: "component-delegate-unit",
    slug: "delegate-unit",
    label: "Conference Delegate Unit",
    shortLabel: "Delegate Unit",
    group: "component",
    productType: "delegate-unit",
    description: "Delegate units for participant speech pickup and organized conference-table discussions.",
    seo: {
      title: "Conference Delegate Unit Price in Bangladesh",
      description: "Compare conference delegate unit prices in Bangladesh for meeting rooms and councils. Review controller compatibility and request a project BOQ.",
    },
    matchProduct: (product) => product.productTypes.includes("delegate-unit"),
    order: 60,
  },
  {
    id: "component-control-unit",
    slug: "control-unit",
    label: "Conference Control Unit",
    shortLabel: "Control Unit",
    group: "component",
    productType: "control-unit",
    description: "Central control units for conference microphone management and meeting audio operation.",
    seo: {
      title: "Conference Control Unit Price in Bangladesh",
      description: "Compare conference control unit prices in Bangladesh. Review compatible chairman and delegate systems, specifications and project BOQ support.",
    },
    matchProduct: (product) => product.productTypes.includes("control-unit"),
    order: 70,
  },
  {
    id: "component-dsp",
    slug: "conference-dsp",
    label: "Conference DSP",
    group: "component",
    productType: "dsp",
    description: "Digital signal processors for conference audio routing, tuning, and speech-system integration.",
    seo: {
      title: "Conference DSP Price in Bangladesh",
      description: "Compare conference DSP prices in Bangladesh for microphone processing, audio routing and room tuning. Review specifications and request a BOQ.",
    },
    matchProduct: (product) => product.productTypes.includes("dsp"),
    order: 80,
  },
  {
    id: "component-amplifier",
    slug: "conference-amplifier",
    label: "Conference Amplifier",
    group: "component",
    productType: "amplifier",
    description: "Amplifiers for conference audio reinforcement, speaker integration, and room sound planning.",
    seo: {
      title: "Conference Amplifier Price in Bangladesh",
      description: "Compare conference amplifier prices in Bangladesh for room audio reinforcement and speaker integration. Review specifications and request a BOQ.",
    },
    matchProduct: (product) => product.productTypes.includes("amplifier"),
    order: 90,
  },
  {
    id: "package-complete",
    slug: "complete-package",
    label: "Complete Conference Package",
    shortLabel: "Complete Package",
    group: "package",
    productType: "package",
    description: "Complete conference system products for discussion, control, and room-system planning.",
    seo: {
      title: "Complete Conference System Package Price in Bangladesh",
      description: "Compare complete conference system package prices in Bangladesh for boardrooms and meeting rooms, with equipment guidance and project BOQ support.",
    },
    matchProduct: (product) => product.productTypes.includes("package"),
    order: 100,
  },
];

export const conferenceBrandConfigs: readonly ConferenceBrandConfig[] = [
  {
    id: "brand-bosch",
    slug: "bosch",
    name: "Bosch",
    description: "Bosch conference discussion units, control units, and recording control equipment from the CCS 900 Ultra and CCS 1000 D ranges.",
    featured: true,
    order: 10,
    seo: {
      title: "Bosch Conference System Price in Bangladesh",
      description: "Compare Bosch conference system prices in Bangladesh, including CCS 900 Ultra and CCS 1000 D components. Check compatibility and request a project BOQ.",
    },
  },
  {
    id: "brand-toa",
    slug: "toa",
    name: "TOA",
    description: "TOA conference chairman, delegate, and central units across the TS-680, TS-690, TS-780, TS-790, TS-800, and TS-900 discussion ranges.",
    featured: true,
    order: 20,
    seo: {
      title: "TOA Conference System Price in Bangladesh",
      description: "Compare TOA conference system prices in Bangladesh across TS discussion-system families. Review compatible components and request a project BOQ.",
    },
  },
  {
    id: "brand-spon",
    slug: "spon",
    name: "SPON",
    description: "SPON conference microphones, control units, DSP, amplifiers, wireless equipment, and accessories.",
    featured: true,
    order: 40,
    seo: {
      title: "SPON Conference System Price in Bangladesh",
      description: "Compare SPON conference system prices in Bangladesh for microphones, control units, DSP, amplifiers and wireless equipment. Request a project BOQ.",
    },
  },
  {
    id: "brand-cmx",
    slug: "cmx",
    name: "CMX",
    description: "CMX wired, wireless, and infrared conference discussion units, controllers, and paperless conference management systems.",
    featured: true,
    order: 50,
    seo: {
      title: "CMX Conference System Price in Bangladesh",
      description: "Compare CMX conference system prices in Bangladesh for wired, wireless, infrared and paperless systems. Check compatibility and request a BOQ.",
    },
  },
];

export const RESERVED_CONFERENCE_PRODUCT_SLUGS = [
  ...conferenceCategoryConfigs.map((category) => category.slug),
  "brands",
] as const;

export function getConferenceCategories(): readonly ConferenceCategoryConfig[] {
  return conferenceCategoryConfigs;
}

export function getConferenceCategoryBySlug(slug: string): ConferenceCategoryConfig | undefined {
  return conferenceCategoryConfigs.find((category) => category.slug === slug);
}

export function getConferenceCategoryProducts(category: ConferenceCategoryConfig): ConferenceProduct[] {
  return conferenceSystemCatalog.filter(category.matchProduct);
}

export function getConferenceCategoryProductCount(category: ConferenceCategoryConfig): number {
  return getConferenceCategoryProducts(category).length;
}

export function hasConferenceCategoryProducts(category: ConferenceCategoryConfig): boolean {
  return getConferenceCategoryProductCount(category) > 0;
}

export function getConferenceCategoryPageContent(category: ConferenceCategoryConfig): ConferenceCategoryPageContent {
  return conferenceCategoryPageContent[category.slug];
}

export function getConferenceRelatedCategories(category: ConferenceCategoryConfig): ConferenceCategoryConfig[] {
  const content = getConferenceCategoryPageContent(category);
  return content.relatedCategorySlugs
    .map((slug) => getConferenceCategoryBySlug(slug))
    .filter((item): item is ConferenceCategoryConfig => Boolean(item));
}

export function isConferenceCategoryIndexable(category: ConferenceCategoryConfig): boolean {
  const content = getConferenceCategoryPageContent(category);
  return (
    hasConferenceCategoryProducts(category) &&
    content.highlights.length >= 3 &&
    content.buyerGuide.length >= 3 &&
    content.faqs.length >= 3
  );
}

export function getConferenceBrands(): readonly ConferenceBrandConfig[] {
  return conferenceBrandConfigs;
}

export function getConferenceBrandBySlug(slug: string): ConferenceBrandConfig | undefined {
  return conferenceBrandConfigs.find((brand) => brand.slug === slug);
}

export function getConferenceBrandProducts(brand: ConferenceBrandConfig): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => product.brand?.slug === brand.slug);
}

export function getConferenceBrandProductCount(brand: ConferenceBrandConfig): number {
  return getConferenceBrandProducts(brand).length;
}

export function hasConferenceBrandProducts(brand: ConferenceBrandConfig): boolean {
  return getConferenceBrandProductCount(brand) > 0;
}

export function getConferenceBrandPageContent(brand: ConferenceBrandConfig): ConferenceBrandPageContent | undefined {
  return conferenceBrandPageContent[brand.slug];
}

export function getConferenceBrandsForProducts(products: readonly ConferenceProduct[]): ConferenceBrandConfig[] {
  const representedSlugs = new Set(products.map((product) => product.brand?.slug).filter(Boolean));
  return conferenceBrandConfigs.filter((brand) => representedSlugs.has(brand.slug));
}

export function getConferenceCategoriesForProducts(products: readonly ConferenceProduct[]): ConferenceCategoryConfig[] {
  if (!products.length) return [];
  const productIds = new Set(products.map((product) => product.id));
  return conferenceCategoryConfigs.filter((category) =>
    conferenceSystemCatalog.some((product) => productIds.has(product.id) && category.matchProduct(product))
  );
}

export function getConferenceProductTypes(products: readonly ConferenceProduct[]): ConferenceProductType[] {
  return [...new Set(products.flatMap((product) => product.productTypes))];
}

export function getConferenceApplications(products: readonly ConferenceProduct[]): string[] {
  return [...new Set(products.flatMap((product) => product.applications))];
}

const CONFERENCE_APPLICATION_GROUPS: readonly {
  label: string;
  patterns: readonly RegExp[];
}[] = [
  { label: "Corporate & Executive Boardrooms", patterns: [/boardroom/i, /corporate board/i, /executive meeting/i] },
  { label: "Council & Committee Rooms", patterns: [/council/i, /committee/i, /parliamentary/i, /regulatory/i] },
  { label: "Government Meeting Rooms", patterns: [/government/i, /ministerial/i, /assembly hall/i] },
  { label: "Conference Rooms & Halls", patterns: [/conference room/i, /conference hall/i, /meeting hall/i, /conference venue/i, /heritage meeting hall/i] },
  { label: "Training & Seminar Rooms", patterns: [/training/i, /seminar/i] },
  { label: "Universities & Education", patterns: [/university/i] },
  { label: "Flexible & Wireless Rooms", patterns: [/wireless/i, /flexible meeting/i, /huddle room/i] },
  { label: "Hybrid & Video Meetings", patterns: [/video conference/i, /boardroom av/i] },
  { label: "Hotels & Event Venues", patterns: [/hotel/i, /ballroom/i] },
  { label: "Meeting Rooms & Offices", patterns: [/^meeting room$/i, /corporate head office/i, /departmental office/i] },
];

/**
 * Converts granular catalog tags into a short set of customer-facing room uses.
 * Raw applications remain untouched on each product record and product page.
 */
export function getConferenceDisplayApplications(
  products: readonly ConferenceProduct[],
  limit = 8,
): string[] {
  const rawApplications = getConferenceApplications(products);
  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), 10);

  return CONFERENCE_APPLICATION_GROUPS
    .map((group, order) => ({
      label: group.label,
      order,
      matches: rawApplications.filter((application) =>
        group.patterns.some((pattern) => pattern.test(application)),
      ).length,
    }))
    .filter((group) => group.matches > 0)
    .sort((a, b) => b.matches - a.matches || a.order - b.order)
    .slice(0, safeLimit)
    .map((group) => group.label);
}

export function isConferenceBrandIndexable(brand: ConferenceBrandConfig): boolean {
  const products = getConferenceBrandProducts(brand);
  const content = getConferenceBrandPageContent(brand);
  const representedTypes = getConferenceProductTypes(products);
  const representedCategories = getConferenceCategoriesForProducts(products);

  return Boolean(
    products.length &&
    content &&
    content.highlights.length >= 3 &&
    content.buyerGuide.length >= 3 &&
    content.faqs.length >= 3 &&
    representedTypes.length >= 2 &&
    representedCategories.length >= 2
  );
}

function findDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

export function validateConferenceTaxonomy(): string[] {
  const errors: string[] = [];
  const categoryIds = conferenceCategoryConfigs.map((category) => category.id);
  const categorySlugs = conferenceCategoryConfigs.map((category) => category.slug);
  const brandIds = conferenceBrandConfigs.map((brand) => brand.id);
  const brandSlugs = conferenceBrandConfigs.map((brand) => brand.slug);

  for (const duplicate of findDuplicates([...categoryIds, ...brandIds])) {
    errors.push(`duplicate taxonomy id ${duplicate}`);
  }
  for (const duplicate of findDuplicates(categorySlugs)) {
    errors.push(`duplicate category slug ${duplicate}`);
  }
  for (const duplicate of findDuplicates(brandSlugs)) {
    errors.push(`duplicate brand slug ${duplicate}`);
  }

  const categorySlugSet = new Set(categorySlugs);
  for (const category of conferenceCategoryConfigs) {
    const content = conferenceCategoryPageContent[category.slug];
    if (!content) {
      errors.push(`missing page content for category ${category.slug}`);
      continue;
    }
    if (content.relatedCategorySlugs.includes(category.slug)) {
      errors.push(`category ${category.slug} cannot relate to itself`);
    }
    for (const relatedSlug of content.relatedCategorySlugs) {
      if (!categorySlugSet.has(relatedSlug)) errors.push(`unknown related category slug ${relatedSlug}`);
    }
  }

  for (const brand of conferenceBrandConfigs) {
    if (hasConferenceBrandProducts(brand) && !conferenceBrandPageContent[brand.slug]) {
      errors.push(`missing page content for populated brand ${brand.slug}`);
    }
  }

  errors.push(
    ...validateConferenceCatalog(
      conferenceSystemCatalog,
      RESERVED_CONFERENCE_PRODUCT_SLUGS,
      conferenceBrandConfigs,
    ),
  );
  return errors;
}

const conferenceTaxonomyErrors = validateConferenceTaxonomy();
if (conferenceTaxonomyErrors.length) {
  throw new Error(`Invalid Conference taxonomy:\n${conferenceTaxonomyErrors.join("\n")}`);
}
