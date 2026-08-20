import {
  conferenceSystemCatalog,
  type ConferenceProduct,
  validateConferenceCatalog,
} from "./catalog";

export type ConferenceCategoryGroup = "system" | "connection" | "component" | "package";

export type ConferenceCategoryConfig = {
  id: string;
  slug: string;
  label: string;
  shortLabel?: string;
  group: ConferenceCategoryGroup;
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
    description: "Verified audio conference products for meeting-room speech, control, processing, amplification, and wireless operation.",
    seo: {
      title: "Audio Conference System in Bangladesh",
      description: "Browse verified audio conference system products for microphones, control, DSP, amplification, and meeting-room projects in Bangladesh.",
    },
    matchProduct: (product) => product.systemCategory === "audio",
    featured: true,
    order: 10,
  },
  {
    id: "system-video",
    slug: "video-conference-system",
    label: "Video Conference System",
    shortLabel: "Video",
    group: "system",
    description: "Verified video conference products for presentation, processing, switching, and professional meeting-room display workflows.",
    seo: {
      title: "Video Conference System in Bangladesh",
      description: "Browse verified video conference products for presentation processing, switching, display integration, and meeting-room AV projects.",
    },
    matchProduct: (product) => product.systemCategory === "video",
    featured: true,
    order: 20,
  },
  {
    id: "connection-wired",
    slug: "wired-conference-system",
    label: "Wired Conference System",
    shortLabel: "Wired",
    group: "connection",
    description: "Verified wired conference system products will appear here when connection data is available in the normalized catalog.",
    seo: {
      title: "Wired Conference System in Bangladesh",
      description: "Explore verified wired conference system products and project options for permanent boardroom and meeting-room installations in Bangladesh.",
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
    description: "Verified wireless conference products for flexible meeting-room layouts, delegate operation, access, and charging workflows.",
    seo: {
      title: "Wireless Conference System in Bangladesh",
      description: "Browse verified wireless conference system products for flexible meeting rooms, delegate units, access points, and charging workflows.",
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
    description: "Verified chairman units for structured conference discussion and chairperson control positions.",
    seo: {
      title: "Conference Chairman Unit in Bangladesh",
      description: "Browse verified conference chairman units for boardrooms, councils, committees, and structured meeting-room discussion systems.",
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
    description: "Verified delegate units for participant speech pickup and organized conference-table discussions.",
    seo: {
      title: "Conference Delegate Unit in Bangladesh",
      description: "Browse verified conference delegate units for boardrooms, meeting rooms, councils, and structured participant discussion systems.",
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
    description: "Verified central control units for conference microphone management and meeting audio operation.",
    seo: {
      title: "Conference Control Unit in Bangladesh",
      description: "Browse verified conference control units for chairman and delegate microphone management, system planning, and meeting audio projects.",
    },
    matchProduct: (product) => product.productTypes.includes("control-unit"),
    order: 70,
  },
  {
    id: "component-dsp",
    slug: "conference-dsp",
    label: "Conference DSP",
    group: "component",
    description: "Verified digital signal processors for conference audio routing, tuning, and speech-system integration.",
    seo: {
      title: "Conference DSP in Bangladesh",
      description: "Browse verified conference DSP products for microphone processing, audio routing, room tuning, and professional AV integration.",
    },
    matchProduct: (product) => product.productTypes.includes("dsp"),
    order: 80,
  },
  {
    id: "component-amplifier",
    slug: "conference-amplifier",
    label: "Conference Amplifier",
    group: "component",
    description: "Verified amplifiers for conference audio reinforcement, speaker integration, and room sound planning.",
    seo: {
      title: "Conference Amplifier in Bangladesh",
      description: "Browse verified conference amplifiers for microphone audio reinforcement, speaker integration, and professional meeting-room projects.",
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
    description: "Verified complete conference packages will appear here when package products are available in the normalized catalog.",
    seo: {
      title: "Complete Conference System Package in Bangladesh",
      description: "Explore verified complete conference system packages for meeting-room equipment, installation planning, and project support in Bangladesh.",
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
    description: "Verified Bosch Conference products will appear here when they are migrated into the dedicated Conference catalog.",
    featured: true,
    order: 10,
    seo: {
      title: "Bosch Conference System in Bangladesh",
      description: "Browse verified Bosch conference system products, specifications, pricing, and project support when available in the dedicated catalog.",
    },
  },
  {
    id: "brand-toa",
    slug: "toa",
    name: "TOA",
    description: "Verified TOA Conference products will appear here when they are migrated into the dedicated Conference catalog.",
    featured: true,
    order: 20,
    seo: {
      title: "TOA Conference System in Bangladesh",
      description: "Browse verified TOA conference system products, specifications, pricing, and project support when available in the dedicated catalog.",
    },
  },
  {
    id: "brand-honeywell",
    slug: "honeywell",
    name: "Honeywell",
    description: "Verified Honeywell Conference products will appear here when they are added to the dedicated Conference catalog.",
    featured: true,
    order: 30,
    seo: {
      title: "Honeywell Conference System in Bangladesh",
      description: "Browse verified Honeywell conference system products, specifications, pricing, and project support when available in the dedicated catalog.",
    },
  },
  {
    id: "brand-spon",
    slug: "spon",
    name: "SPON",
    description: "Verified SPON conference microphones, control units, DSP, amplifiers, wireless equipment, and accessories.",
    featured: true,
    order: 40,
    seo: {
      title: "SPON Conference System in Bangladesh",
      description: "Browse verified SPON conference microphones, control units, delegate units, DSP, amplifiers, and wireless conference products.",
    },
  },
  {
    id: "brand-cmx",
    slug: "cmx",
    name: "CMX",
    description: "Verified CMX Conference products will appear here when they are added to the dedicated Conference catalog.",
    featured: true,
    order: 50,
    seo: {
      title: "CMX Conference System in Bangladesh",
      description: "Browse verified CMX conference system products, specifications, pricing, and project support when available in the dedicated catalog.",
    },
  },
  {
    id: "brand-huidu",
    slug: "huidu",
    name: "Huidu",
    description: "Verified Huidu video processing products currently represented in the dedicated Conference catalog.",
    featured: false,
    order: 60,
    seo: {
      title: "Huidu Conference Video Products in Bangladesh",
      description: "Browse verified Huidu conference video processing products for presentation switching, scaling, and meeting-room display integration.",
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

  errors.push(...validateConferenceCatalog(conferenceSystemCatalog, RESERVED_CONFERENCE_PRODUCT_SLUGS));
  return errors;
}

const conferenceTaxonomyErrors = validateConferenceTaxonomy();
if (conferenceTaxonomyErrors.length) {
  throw new Error(`Invalid Conference taxonomy:\n${conferenceTaxonomyErrors.join("\n")}`);
}
