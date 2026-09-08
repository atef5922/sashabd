// lib/productsCatalog.ts

import { formatBdtRange } from "@/lib/price";

/* =========================
   BASE TYPES (Outdoor/Indoor/Rental)
========================= */

export type ProductCategory = "outdoor" | "indoor" | "rental";

export type ProductItem = {
  category: ProductCategory;
  slug: string;

  title: string;
  subtitle: string;
  image: string;

  quickFeatures: string[];
  bestFor: string[];
  keySpecs: { k: string; v: string }[];

  buildQuality: string[];
  controlSystem: string[];
  installationNotes: string[];
  supportNotes: string[];

  faqs: { q: string; a: string }[];

  /* Optional fields (for listing pages like /products/indoor) */
  pitchLabel?: string; // e.g. "P1.25"
  cardPrice?: string; // e.g. "Tk 10,600.00 (per sq.ft, Gold-Diamond indoor package)"
  useCaseTag?: "Showroom" | "Conference" | "Control Room" | "Studio" | "Retail";
  cardShort?: string; // short description for grid cards
};

const ledDisplayPriceRangesBySlug: Readonly<Record<string, readonly [number, number]>> = {
  "p2-5-outdoor-led-display-module": [10400, 11400],
  "p3-outdoor-led-display-module": [9855, 10399],
  "p3-076-outdoor-led-display-module": [9310, 9854],
  "p4-outdoor-led-display": [8765, 9309],
  "p5-outdoor-led-display": [8220, 8764],
  "p6-outdoor-led-display": [7675, 8218],
  "premium-quality-outdoor-led-display": [7500, 8500],
  "p6-67-outdoor-led-display-module-320x160mm": [7130, 7674],
  "p8-outdoor-led-display-module": [6585, 7129],
  "p10-outdoor-led-display-module": [4500, 5000],
  "p2-6-rental-led-display": [8900, 12100],
  "p3-rental-led-display": [8300, 11300],
  "p3-91-rental-led-display": [7300, 10100],
  "p4-81-rental-led-display": [6700, 9500],
  "p1-25-indoor-led-display": [16400, 18400],
  "p1-53-indoor-led-display": [15400, 16400],
  "p1-667-indoor-led-display": [12300, 15200],
  "p1-86-indoor-led-display": [13400, 14400],
  "p2-indoor-led-display": [10400, 11400],
  "p2-5-indoor-led-display": [9400, 10400],
  "p3-indoor-led-display": [8400, 9400],
  "p3-076-indoor-led-display": [9310, 9854],
  "p4-indoor-led-display-module": [3500, 5500],
};

export function getLedDisplayTablePrice(slug: string): string | undefined {
  const range = ledDisplayPriceRangesBySlug[slug];
  return range ? formatBdtRange(range) : undefined;
}

export function getLedDisplayCardPrice(slug: string): string | undefined {
  const tablePrice = getLedDisplayTablePrice(slug);
  return tablePrice ? `${tablePrice} (per sq.ft)` : undefined;
}

/* =========================
   COMMON FAQ (Outdoor)
========================= */

const outdoorCommonFAQs: { q: string; a: string }[] = [
  {
    q: "What are the main factors for selecting an outdoor LED module?",
    a: "The main factors are viewing distance, screen size, sunlight level, cabinet IP protection, power stability, and structural safety.",
  },
  {
    q: "Is surge protection necessary for outdoor LED displays?",
    a: "Yes. Outdoor installations face voltage fluctuation and lightning risk, so proper grounding and SPD/surge protection are strongly recommended.",
  },
  {
    q: "Can an outdoor LED display run without a controller or processor?",
    a: "No. Content playback requires a sending/controller and receiving-card setup. For HDMI/DVI input, a video processor helps deliver cleaner output.",
  },
  {
    q: "Why is a maintenance plan important?",
    a: "Outdoor dust, humidity, rain, and heat can cause issues in connectors, PSU, and modules. Preventive maintenance and spare planning reduce downtime.",
  },
];

/* =========================
   OUTDOOR PRODUCTS (FULL SET)
   Added: P2.5, P3, P3.076, P6.67, P8, P10
   Kept: P4, P5, P6 (your existing slugs)
========================= */

export const outdoorCatalog: ProductItem[] = [
  {
    category: "outdoor",
    slug: "p2-5-outdoor-led-display-module",
    title: "P2.5 Outdoor LED Display Module",
    subtitle:
      "High-clarity outdoor module for close-to-mid viewing - premium signage, showroom facade and roadside brand screens.",
    image: "/assets/led-display/outdoor/P2.5-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p2-5-outdoor-led-display-module"),

    quickFeatures: [
      "High clarity outdoor visuals",
      "Daylight visibility planning",
      "Weatherproof cabinet integration",
      "Smooth playback (controller dependent)",
      "Good for close viewing content",
    ],

    bestFor: ["Premium shop signage", "Roadside branding", "High-detail outdoor digital signage", "Showroom facade display"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P2.5 (2.5mm)" },
      { k: "Viewing Distance", v: "2.5-20m (size/content dependent)" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Premium signage & branding" },
    ],

    buildQuality: ["Outdoor cabinet sealing + waterproof planning", "Heat ventilation/fan planning (site dependent)", "Better module alignment improves sharpness"],

    controlSystem: ["Sending controller + receiving cards required", "Video processor recommended (HDMI scaling)", "Proper grounding + surge protection recommended"],

    installationNotes: ["Structure/wind load check required", "Power distribution sizing & labeling", "Commissioning: mapping + calibration + brightness tuning"],

    supportNotes: ["Spare module/PSU planning reduces downtime", "Periodic cleaning (dust/pollution areas)", "Remote assistance possible (system dependent)"],

    faqs: outdoorCommonFAQs,
  },

  {
    category: "outdoor",
    slug: "p3-outdoor-led-display-module",
    title: "P3 Outdoor LED Display Module",
    subtitle:
      "Balanced clarity and cost - popular for outdoor billboards, roadside advertising and large shop signage.",
    image: "/assets/led-display/outdoor/P3-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p3-outdoor-led-display-module"),

    quickFeatures: ["Balanced clarity vs budget", "Good for medium viewing distance", "Weather-resistant cabinet setup", "High brightness daylight planning", "Stable performance with good PSU"],

    bestFor: ["Outdoor billboards", "Roadside advertising", "Large shop signage", "Commercial building facade"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P3 (3mm)" },
      { k: "Viewing Distance", v: "3-30m (size/content dependent)" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Signage & advertising" },
    ],

    buildQuality: ["Outdoor-grade cabinet + drainage planning", "Anti-rust structure finishing", "Cable management + waterproof glands"],

    controlSystem: ["Novastar / Colorlight / Linsn ecosystem (availability dependent)", "Video processor for clean input scaling", "LAN/Fiber option for long signal runs"],

    installationNotes: ["Structure and anchor planning", "Proper grounding mandatory", "Mapping + test patterns + calibration"],

    supportNotes: ["Warranty-backed service planning", "Spare modules recommended (project dependent)", "Maintenance schedule guidance"],

    faqs: outdoorCommonFAQs,
  },

  {
    category: "outdoor",
    slug: "p3-076-outdoor-led-display-module",
    title: "P3.076 Outdoor LED Display Module",
    subtitle:
      "Higher resolution outdoor option - better text/logo clarity for close viewing premium signage.",
    image: "/assets/led-display/outdoor/P3-076-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p3-076-outdoor-led-display-module"),

    quickFeatures: ["Sharper than P3 for text/logos", "Better close viewing clarity", "Outdoor cabinet sealing required", "Smooth video (controller dependent)", "Professional calibration recommended"],

    bestFor: ["Premium brand signage", "Corporate outdoor signage", "High-detail roadside screens", "Showroom facade"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P3.076 (3.076mm)" },
      { k: "Viewing Distance", v: "3-30m (size dependent)" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "High-detail outdoor signage" },
    ],

    buildQuality: ["Cabinet flatness & module alignment critical", "Heat management planning", "Waterproof connector routing"],

    controlSystem: ["Sending + receiving card chain required", "Processor recommended for clean scaling", "Good CAT6 + grounding reduces flicker/noise"],

    installationNotes: ["Structure/wind check required", "Electrical load planning", "Calibration + content test before handover"],

    supportNotes: ["Spare planning for fast service", "Preventive inspection after rain/storm", "Remote config support (system dependent)"],

    faqs: outdoorCommonFAQs,
  },

  {
    category: "outdoor",
    slug: "p4-outdoor-led-display",
    title: "P4 Outdoor LED Display Module",
    subtitle: "High brightness outdoor signage & billboard solution.",
    image: "/assets/led-display/outdoor/P4-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p4-outdoor-led-display"),

    quickFeatures: ["Sunlight visible", "Weather resistant", "High brightness", "Wide viewing angle"],

    bestFor: ["Roadside billboard", "Shop signage", "Rooftop LED", "Public advertising"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P4 (4mm)" },
      { k: "Viewing Distance", v: "4-30 meters" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Advertising & signage" },
    ],

    buildQuality: ["Outdoor-grade cabinet design", "Rust-protection planning", "Heat ventilation support"],

    controlSystem: ["Novastar / Colorlight compatible", "HDMI input via video processor", "Remote content option"],

    installationNotes: ["Structure & wind load check required", "Proper grounding mandatory", "Brightness calibration on site"],

    supportNotes: ["Warranty-backed service", "Spare module planning", "Maintenance guidance"],

    faqs: [
      ...outdoorCommonFAQs,
      { q: "Is P4 suitable for outdoor daylight?", a: "Yes, P4 outdoor displays are designed for high brightness and daylight visibility." },
    ],
  },

  {
    category: "outdoor",
    slug: "p5-outdoor-led-display",
    title: "P5 Outdoor LED Display Module",
    subtitle: "Budget-friendly outdoor LED for signage & medium-distance viewing.",
    image: "/assets/led-display/outdoor/P5-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p5-outdoor-led-display"),

    quickFeatures: ["Daylight visibility", "Weather resistant", "Cost-effective for bigger area", "Stable performance"],

    bestFor: ["Market signage", "Roadside billboard", "Shop front branding", "Factory / gate display"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P5 (5mm)" },
      { k: "Viewing Distance", v: "5-40 meters" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Signage & advertising" },
    ],

    buildQuality: ["Outdoor cabinet with waterproof planning", "Heat ventilation support for long run", "Cable & power safety routing"],

    controlSystem: ["Novastar / Colorlight compatible", "HDMI input via video processor", "Optional remote content control"],

    installationNotes: ["Structure & wind load check required", "Proper grounding mandatory", "Brightness calibration after installation"],

    supportNotes: ["Warranty-backed service", "Spare module planning guidance", "Maintenance & troubleshooting support"],

    faqs: [
      ...outdoorCommonFAQs,
      { q: "Is P5 better than P4 for large screens?", a: "For large screen area and budget planning, P5 can be more cost-effective while still remaining bright and outdoor-safe." },
      { q: "Can I control content remotely?", a: "Yes, remote content control is possible depending on the controller setup and network availability." },
    ],
  },

  {
    category: "outdoor",
    slug: "p6-outdoor-led-display",
    title: "P6 Outdoor LED Display Module",
    subtitle: "Best value for large outdoor billboards with long-distance visibility.",
    image: "/assets/led-display/outdoor/P6-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p6-outdoor-led-display"),


    quickFeatures: ["Great for distance viewing", "Outdoor waterproof build", "Lower cost per sq.ft for big size", "High brightness option"],

    bestFor: ["Large billboards", "Highway signage", "Stadium outer display", "Outdoor event branding"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P6 (6mm)" },
      { k: "Viewing Distance", v: "6-60 meters" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Large-format advertising" },
    ],

    buildQuality: ["Strong cabinet build for outdoor installation", "Weatherproof & water drainage planning", "Heat handling support for continuous run"],

    controlSystem: ["Novastar / Colorlight compatible", "Video processor input (HDMI / DVI)", "Multi-screen configuration possible"],

    installationNotes: ["Structure & wind load check required", "Cable management + surge protection recommended", "On-site calibration for brightness & uniformity"],

    supportNotes: ["Warranty-backed service", "Spare module & PSU planning", "On-call troubleshooting support"],

    faqs: [...outdoorCommonFAQs, { q: "Is P6 suitable for close viewing?", a: "P6 is mainly recommended for medium-to-long distance viewing. For closer viewing, P4 or P5 may be a better choice." }],
  },

  {
    category: "outdoor",
    slug: "premium-quality-outdoor-led-display",
    title: "Premium Quality Outdoor LED Display in Bangladesh",
    subtitle:
      "Professional outdoor LED display solution for commercial branding, roadside visibility, showroom facades, and high-impact digital advertising across Bangladesh.",
    cardShort:
      "Professional outdoor LED display solution for commercial branding, roadside visibility, showroom facades, and high-impact digital advertising across Bangladesh.",
    pitchLabel: "P6",
    image: "/assets/led-display/outdoor/Premium Quality Outdoor LED Display.webp",

    cardPrice: getLedDisplayCardPrice("premium-quality-outdoor-led-display"),

    quickFeatures: [
      "High-brightness outdoor visuals for day and night visibility",
      "Weather-ready cabinet planning for fixed outdoor installation",
      "Stable playback workflow for video, branding, and promotional content",
      "Service-friendly module and power maintenance access",
    ],

    bestFor: ["Outdoor billboard", "Commercial facade", "Shopfront branding", "Roadside display"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P6 (6mm)" },
      { k: "Brightness", v: "6500-7000 cd/m2" },
      { k: "Cabinet Type", v: "Fixed outdoor cabinet (project dependent)" },
      { k: "Protection", v: "Weather-ready front and rear protection planning" },
      { k: "Viewing Distance", v: "6-60m (content and screen size dependent)" },
      { k: "Use Case", v: "Advertising, branding, and outdoor information display" },
    ],

    buildQuality: [
      "Weather-ready cabinet structure for long-term outdoor deployment",
      "Commercial-grade module, PSU, and cabinet integration planning",
      "Service-access-friendly layout for faster maintenance and part replacement",
    ],

    controlSystem: [
      "Compatible with standard LED controller and receiving-card workflow",
      "Video processor recommended for cleaner scaling and stable content playback",
      "Brightness scheduling and calibration improve day-to-night visibility control",
    ],

    installationNotes: [
      "Structure design, wind-load review, and safe mounting planning are required",
      "Grounding, surge protection, and stable power distribution should be confirmed before handover",
      "Final calibration, content testing, and on-site commissioning improve long-term performance",
    ],

    supportNotes: [
      "Preventive maintenance planning helps reduce downtime in outdoor environments",
      "Spare module and PSU planning supports faster field service",
      "Technical guidance is available for configuration, operation, and long-term upkeep",
    ],

    faqs: [
      ...outdoorCommonFAQs,
      {
        q: "Is this outdoor LED display suitable for commercial branding projects?",
        a: "Yes. This model is suitable for commercial outdoor branding, roadside promotion, showroom facades, and high-visibility advertising where strong brightness and weather-ready installation are important.",
      },
    ],
  },

  {
    category: "outdoor",
    slug: "p6-67-outdoor-led-display-module-320x160mm",
    title: "P6.67 Outdoor LED Display Module",
    subtitle:
      "Standard 320x160mm module size for large outdoor displays - ideal for billboards and far viewing installations.",
    image: "/assets/led-display/outdoor/P6.67-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p6-67-outdoor-led-display-module-320x160mm"),


    quickFeatures: ["Common 320x160mm module size", "Good for far viewing", "Cost-efficient for large areas", "Outdoor waterproof planning", "Easy spare sourcing (standard size)"],

    bestFor: ["Large billboards", "Roadside advertising", "Public display boards", "Commercial outdoor signage"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P6.67 (6.67mm)" },
      { k: "Module Size", v: "320x160mm" },
      { k: "Viewing Distance", v: "6.67-90m (size/content dependent)" },
      { k: "Environment", v: "Outdoor" },
    ],

    buildQuality: ["Weather sealing + cabinet drainage planning", "Anti-rust structure finishing", "Ventilation planning for hot locations"],

    controlSystem: ["Sending controller + receiving cards", "Fiber/LAN transport for long distance (site dependent)", "Brightness schedule (day/night) recommended"],

    installationNotes: ["Structure/wind load check required", "Electrical panel with proper breakers", "Commissioning: mapping + calibration"],

    supportNotes: ["Spare modules easier due to standard size", "Periodic inspection after storms", "Remote support (system dependent)"],

    faqs: outdoorCommonFAQs,
  },

  {
    category: "outdoor",
    slug: "p8-outdoor-led-display-module",
    title: "P8 Outdoor LED Display Module",
    subtitle:
      "Best for far viewing - ideal for big billboards and large public screens where content is bold and readable.",
    image: "/assets/led-display/outdoor/P8-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p8-outdoor-led-display-module"),


    quickFeatures: ["Great for far viewing", "Cost efficient for big area", "Outdoor fixed installation friendly", "High brightness daylight planning", "Easy service access with good cabinet design"],

    bestFor: ["Highway billboards", "Large public screens", "Factory outdoor signage", "Stadium outer display boards"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P8 (8mm)" },
      { k: "Viewing Distance", v: "8-120m" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Large outdoor billboards" },
    ],

    buildQuality: ["Wind-load structure planning important", "Outdoor cable protection routing", "Waterproof power distribution planning"],

    controlSystem: ["Stable controller brand recommended", "Video processor for scaling (HDMI/DVI input)", "Surge protection + earthing recommended"],

    installationNotes: ["Site survey + structure design", "Power line sizing + breaker planning", "Final calibration + stress test run"],

    supportNotes: ["Spare modules/PSU planning", "Cleaning schedule for dust/pollution", "Remote assistance possible (system dependent)"],

    faqs: outdoorCommonFAQs,
  },

  {
    category: "outdoor",
    slug: "p10-outdoor-led-display-module",
    title: "P10 Outdoor LED Display Module",
    subtitle:
      "Classic pitch for very far viewing - budget-friendly large outdoor screens and big billboards.",
    image: "/assets/led-display/outdoor/P10-Outdoor-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p10-outdoor-led-display-module"),


    quickFeatures: ["Best for very far viewing", "Lowest cost per sq.ft for big screens", "Bold content looks best (text/logo)", "Outdoor waterproof cabinet planning", "Easy maintenance with standard parts"],

    bestFor: ["Very large billboards", "Far-distance roadside screens", "Budget large outdoor projects", "Industrial outdoor boards"],

    keySpecs: [
      { k: "Pixel Pitch", v: "P10 (10mm)" },
      { k: "Viewing Distance", v: "10-200m" },
      { k: "Environment", v: "Outdoor" },
      { k: "Use Case", v: "Large billboard & advertising" },
    ],

    buildQuality: ["Strong structure and wind load planning", "Waterproof enclosure for PSU/control", "Ventilation/heat planning"],

    controlSystem: ["Standard controller chain supported", "Processor recommended for clean scaling", "Power stability + surge protection mandatory"],

    installationNotes: ["Structure + civil safety check", "Power distribution + cable routing", "Commissioning + burn-in test"],

    supportNotes: ["Spare module/PSU strategy", "Seasonal inspection recommended", "Remote config support (system dependent)"],

    faqs: outdoorCommonFAQs,
  },
];

/* =========================
   RENTAL PRODUCTS (Expanded)
========================= */

const rentalCommonFAQs: { q: string; a: string }[] = [
  { q: "Rental LED reusable?", a: "Yes. Rental cabinets are designed for frequent setup & dismantling with quick lock structure." },
  { q: "What is the main focus when choosing a rental LED display?", a: "Quick setup, lightweight cabinet, strong locks, stable refresh for camera/video, and easy servicing." },
];

export const rentalCatalog: ProductItem[] = [
  {
    category: "rental",
    slug: "p2-6-rental-led-display",
    title: "P2.6 Rental LED Display",
    subtitle: "Sharp visuals for stage & event rental with faster setup cabinets.",
    image: "/assets/led-display/rental/P2.6-Rental-LED-Display.webp",
    cardPrice: getLedDisplayCardPrice("p2-6-rental-led-display"),

    quickFeatures: [
      "Pixel pitch P2.6 for close-view stage displays",
      "Lightweight rental cabinet design",
      "Quick-lock cabinet system for faster setup",
      "Suitable for events, stages, and rental projects",
    ],
    bestFor: ["Stage backdrop", "Corporate events", "Live concerts", "Indoor rental LED wall"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P2.6 (2.6mm)" },
      { k: "Environment", v: "Indoor / Semi-outdoor (setup dependent)" },
      { k: "Use Case", v: "Event & stage rental" },
    ],
    buildQuality: ["Die-cast aluminum cabinet", "Fast lock structure", "Quick service design"],
    controlSystem: ["Novastar rental processors", "Multi-screen support", "Processor for live inputs"],
    installationNotes: ["Quick assembly & dismantling", "Hanging or ground support", "Cable safety routing"],
    supportNotes: ["On-site technical support (project dependent)", "Spare modules available", "Fast swap guidance"],
    faqs: rentalCommonFAQs,
  },
  {
    category: "rental",
    slug: "p3-rental-led-display",
    title: "P3 Rental LED Display",
    subtitle: "Fast setup LED display for stage & event rental.",
    image: "/assets/led-display/rental/P3-Rental-LED-Display.webp",
    cardPrice: getLedDisplayCardPrice("p3-rental-led-display"),

    quickFeatures: [
      "Pixel pitch P3 for stage and event displays",
      "Lightweight rental cabinet design",
      "Quick-lock cabinet system for repeated installation",
      "Suitable for indoor events and medium viewing distances",
    ],
    bestFor: ["Stage backdrop", "Corporate events", "Live concerts"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P3 (3mm)" },
      { k: "Environment", v: "Indoor / Semi-outdoor" },
      { k: "Use Case", v: "Event & stage rental" },
    ],
    buildQuality: ["Die-cast aluminum cabinet", "Fast lock structure"],
    controlSystem: ["Novastar rental processors", "Multi-screen support"],
    installationNotes: ["Quick assembly & dismantling", "Hanging or ground support"],
    supportNotes: ["On-site technical support", "Spare modules available"],
    faqs: rentalCommonFAQs,
  },
  {
    category: "rental",
    slug: "p3-91-rental-led-display",
    title: "P3.91 Rental LED Display",
    subtitle: "250x250mm rental LED module with SMD1921 lamp, 64x64 resolution, 4500 cd/m2 brightness, and 7680Hz refresh support.",
    image: "/assets/led-display/rental/P3.91-Rental-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p3-91-rental-led-display"),

    quickFeatures: ["250x250mm universal module", "4500 cd/m2 high brightness", "7680Hz high refresh", "500x500 / 500x1000 rental cabinet ready"],
    bestFor: ["Concert LED wall", "Stage rental screen", "Corporate stage", "Indoor & outdoor event setup"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P3.91 (3.91mm)" },
      { k: "LED Type", v: "SMD1921" },
      { k: "Module Resolution", v: "64 x 64 = 4096 pixels" },
      { k: "Pixel Density", v: "68,267 dots/m2" },
      { k: "Module Size", v: "250 x 250 x 15.6 mm" },
      { k: "Module Weight", v: "0.49 +- 0.02 kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Brightness", v: "4500 cd/m2" },
      { k: "Viewing Angle", v: "140 / 120 deg" },
      { k: "Refresh Rate", v: "7680Hz" },
      { k: "Video Support", v: "2K, 4K" },
    ],
    buildQuality: ["Bottom case texture design improves exterior texture", "New PCB board design for stronger reliability", "Waterproof and moisture-proof front-side gluing treatment"],
    controlSystem: ["Single-dot brightness calibration supported", "6500K color temperature with 1000K-9500K adjustable range", "Supports 2K / 4K playback with 12-14bit processing depth"],
    installationNotes: ["Suitable for 500x500mm and 500x1000mm rental cabinets", "Rigging safety and power distribution planning required", "Best performance after calibration and pre-show test run"],
    supportNotes: ["High brightness with strong heat dissipation for event duty", "Supports up to 7680Hz refresh for camera-friendly output", "Customized selection recommended for coastal, low-temperature, or high-humidity environments"],
    faqs: rentalCommonFAQs,
  },
  {
    category: "rental",
    slug: "p4-81-rental-led-display",
    title: "P4.81 Rental LED Display",
    subtitle: "Cost-effective for large event LED walls - best for medium-to-far viewing.",
    image: "/assets/led-display/rental/P4.81-Rental-LED-Display.webp",

    cardPrice: getLedDisplayCardPrice("p4-81-rental-led-display"),

    quickFeatures: ["Budget friendly for big area", "Fast setup", "Good for far viewing", "Easy servicing"],
    bestFor: ["Large stage screens", "Outdoor event LED walls", "Festival branding", "Public programs"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P4.81 (4.81mm)" },
      { k: "Environment", v: "Indoor / Outdoor (setup dependent)" },
      { k: "Use Case", v: "Large event rental LED wall" },
    ],
    buildQuality: ["Rental cabinet lock system", "Quick assembly", "Service-friendly design"],
    controlSystem: ["Processor recommended", "Multiple input switching support", "Multi-screen supported"],
    installationNotes: ["Rigging/hanging safety first", "Cable strain relief use", "Show-time backup power plan"],
    supportNotes: ["Spare planning", "Fast swap modules", "Event support possible"],
    faqs: rentalCommonFAQs,
  },
];

/* =========================
   INDOOR PRODUCTS (UPDATED to match your /products/indoor UI slugs)
   Now includes: P1.25, P1.53, P1.667, P1.86, P2, P2.5, P3, P3.076, P4, P5
   Slugs match your previous indoor page + details page routing
========================= */

const indoorCommonFAQs: { q: string; a: string }[] = [
  {
    q: "What are the main factors for selecting an indoor LED display?",
    a: "Viewing distance, resolution (pixel pitch), screen size, content type (text/video), cabinet service method (front/rear) and processor quality.",
  },
  {
    q: "Which indoor LED option is best for a conference room?",
    a: "Usually the P1.5 to P2.5 range is better for close viewing. Final selection depends on room size and viewing distance.",
  },
  {
    q: "Why is calibration important for indoor LED displays?",
    a: "Calibration improves color uniformity, brightness consistency, and grayscale performance, resulting in a more professional visual output.",
  },
];

export const indoorCatalog: ProductItem[] = [
  {
    category: "indoor",
    slug: "p1-25-indoor-led-display",
    title: "P1.25 Indoor LED Display Module",
    subtitle: "Ultra-fine pitch indoor LED module for premium control rooms, studios, and close-view video walls.",
    cardShort: "Ultra-fine pitch indoor LED module for premium control rooms, studios, and close-view video walls.",
    pitchLabel: "P1.25",
    cardPrice: getLedDisplayCardPrice("p1-25-indoor-led-display"),
    useCaseTag: "Control Room",
    image: "/assets/led-display/indoor/P1.25-Indoor-LED-Display.webp",

    quickFeatures: [
      "320x160mm universal module size",
      "Bottom case texture structure design",
      "High-quality lamp beads for reliable operation",
      "Upgraded PCB board for stable workflow",
      "Lightweight module installation",
      "Excellent visual viewing experience",
      "Good compatibility across same series",
      "Supports coating process and up to 7680Hz refresh",
    ],
    bestFor: ["Control room", "Studio", "Boardroom", "Premium indoor video wall"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P1.25 (1.25mm)" },
      { k: "LED Type", v: "SMD1010" },
      { k: "Module Resolution (WxH)", v: "256x128 = 32,768 pixels" },
      { k: "Pixel Density", v: "640,000 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16.6mm" },
      { k: "Module Weight", v: "0.48 +/- 0.02kg" },
      { k: "HUB Type", v: "HUB320" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: "500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140 deg / 140 deg" },
      { k: "Brightness/Color Uniformity", v: "=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "586 W/m2" },
      { k: "Input Power <Typical>", v: "176 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K, 4K" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: ["320x160mm universal module body with lightweight structure", "Bottom case texture design improves assembly strength", "High-quality lamp beads reduce fall-off risk and improve durability"],
    controlSystem: ["Supports HUB320-based indoor control workflow", "Single-dot brightness calibration support for better uniformity", "Compatible with 2K and 4K video systems using proper processor setup"],
    installationNotes: ["Lightweight module design helps reduce structural load on the video wall body", "Precise mapping, calibration, and PCB stability are important for fine-pitch clarity", "Supports coating process and 45-degree tangent angle application planning"],
    supportNotes: ["Up to 3840Hz standard and 7680Hz optional refresh for camera-friendly output", "Suitable for close-view indoor operation with long-life performance", "After-sales support, spare planning, and calibration guidance available"],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p1-53-indoor-led-display",
    title: "P1.53 Indoor LED Display Module",
    subtitle: "Fine-pitch indoor LED module with 320x160mm universal size, reliable PCB design, and optional 7680Hz refresh support.",
    cardShort: "Fine-pitch indoor LED module with universal 320x160mm cabinet compatibility and camera-friendly refresh options.",
    pitchLabel: "P1.53",
    cardPrice: getLedDisplayCardPrice("p1-53-indoor-led-display"),
    useCaseTag: "Studio",
    image: "/assets/led-display/indoor/P1.53-Indoor-LED-Display.webp",

    quickFeatures: [
      "320x160mm universal module size",
      "Bottom case texture design for stronger assembly",
      "High-quality lamp beads with reduced fall-off risk",
      "Reliable PCB board design for stable operation",
      "Lightweight module helps reduce screen load",
      "Excellent indoor visual experience",
      "Good compatibility across same series",
      "Supports coating process, 45-degree tangent angle, and optional 7680Hz refresh",
    ],
    bestFor: ["Studio", "Boardroom", "Control room", "Premium indoor video wall"],
    keySpecs: [
      { k: "Pixel Pitch", v: "1.538mm" },
      { k: "LED Type", v: "SMD1212" },
      { k: "Module Resolution (WxH)", v: "208x104 = 21,632 pixels" },
      { k: "Pixel Density", v: "422,500 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16.6mm" },
      { k: "Module Weight", v: "0.49 +/- 0.02kg" },
      { k: "HUB Type", v: "HUB320" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: "500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140 deg / 140 deg" },
      { k: "Brightness/Color Uniformity", v: "=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "488 W/m2" },
      { k: "Input Power <Typical>", v: "163 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K HD, 4K UHD" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: [
      "320x160mm universal module body supports standard indoor cabinet integration",
      "Bottom case texture design improves assembly strength and stability",
      "High-quality lamp beads reduce fall-off risk and improve long-term durability",
    ],
    controlSystem: [
      "HUB320-based control workflow with single-dot brightness calibration support",
      "Processor and receiving card mapping should match module scan and resolution",
      "Supports 2K HD and 4K UHD video systems with proper processor configuration",
    ],
    installationNotes: [
      "Lightweight module design reduces total cabinet and screen structural load",
      "Suitable for coating process support and 45-degree tangent angle applications",
      "Careful mapping, calibration, and PCB stability checks are important during commissioning",
    ],
    supportNotes: [
      "3840Hz standard refresh with optional 7680Hz for camera-friendly output",
      "Designed for long-life indoor use with 100,000-hour lifespan reference",
      "After-sales support, spare planning, and calibration guidance available",
    ],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p1-667-indoor-led-display",
    title: "P1.667 Indoor LED Display Module",
    subtitle: "Premium indoor clarity with strong grayscale & camera-friendly refresh options.",
    cardShort: "Premium indoor clarity with strong grayscale & camera-friendly refresh options.",
    pitchLabel: "P1.667",
    cardPrice: getLedDisplayCardPrice("p1-667-indoor-led-display"),
    useCaseTag: "Showroom",
    image: "/assets/led-display/indoor/P1.667mm-Indoor-LED-Display.webp",

    quickFeatures: ["Premium clarity", "Strong grayscale", "Camera-friendly refresh option", "Balanced fine pitch"],
    bestFor: ["Boardroom", "Showroom", "Control room", "TV studio"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P1.667 (1.667mm)" },
      { k: "Module Resolution", v: "192 x 96 = 18,432 pixels" },
      { k: "Module Size", v: "320x160mm" },
      { k: "Brightness", v: "500 cd/m2" },
      { k: "Environment", v: "Indoor" },
      { k: "Use Case", v: "Premium indoor wall" },
    ],
    buildQuality: ["Better cabinet flatness improves sharpness", "Front maintenance option (cabinet dependent)", "Consistent PSU quality recommended"],
    controlSystem: ["Processor recommended for HDMI scaling", "Stable mapping + calibration", "Good CAT6 + proper grounding"],
    installationNotes: ["Viewing distance planning", "Power distribution sizing", "Commissioning + calibration + training"],
    supportNotes: ["After-sales support", "Spare module strategy", "Maintenance plan guidance"],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p1-86-indoor-led-display",
    title: "P1.86 Indoor LED Display Module",
    subtitle: "Fine-pitch indoor LED module with 320x160mm universal size, reliable PCB design, and optional 7680Hz refresh support.",
    cardShort: "Fine-pitch indoor LED module with universal 320x160mm cabinet compatibility and camera-friendly refresh options.",
    pitchLabel: "P1.86",
    cardPrice: getLedDisplayCardPrice("p1-86-indoor-led-display"),
    useCaseTag: "Conference",
    image: "/assets/led-display/indoor/P1.86-Indoor-LED-Display.webp",

    quickFeatures: [
      "320x160mm universal module size",
      "Bottom case texture design for stronger assembly",
      "High-quality lamp beads with reduced fall-off risk",
      "Reliable PCB board design for stable operation",
      "Lightweight module helps reduce screen load",
      "Excellent indoor visual experience",
      "Good compatibility across same series",
      "Supports coating process, 45-degree tangent angle, and optional 7680Hz refresh",
    ],
    bestFor: ["Conference room", "Showroom", "Control room", "Premium indoor video wall"],
    keySpecs: [
      { k: "Pixel Pitch", v: "1.86mm" },
      { k: "LED Type", v: "SMD1515" },
      { k: "Module Resolution (WxH)", v: "172x86 = 14,792 pixels" },
      { k: "Pixel Density", v: "288,906 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16mm" },
      { k: "Module Weight", v: "0.43 +/- 0.02kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: "450-500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140 deg / 140 deg" },
      { k: "Brightness/Color Uniformity", v: "=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "300 W/m2" },
      { k: "Input Power <Typical>", v: "90 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K HD, 4K UHD" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: [
      "320x160mm universal module body supports standard indoor cabinet integration",
      "Bottom case texture design improves assembly strength and stability",
      "High-quality lamp beads reduce fall-off risk and improve long-term durability",
    ],
    controlSystem: [
      "HUB75-based control workflow with single-dot brightness calibration support",
      "Processor and receiving card mapping should match module scan and resolution",
      "Supports 2K HD and 4K UHD video systems with proper processor configuration",
    ],
    installationNotes: [
      "Lightweight module design reduces total cabinet and screen structural load",
      "Suitable for coating process support and 45-degree tangent angle applications",
      "Careful mapping, calibration, and PCB stability checks are important during commissioning",
    ],
    supportNotes: [
      "3840Hz standard refresh with optional 7680Hz for camera-friendly output",
      "Designed for long-life indoor use with 100,000-hour lifespan reference",
      "After-sales support, spare planning, and calibration guidance available",
    ],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p2-indoor-led-display",
    title: "P2 Indoor LED Display Module",
    subtitle:
      "Fine-pitch indoor LED module with 320x160mm universal size, reliable PCB design, and optional 7680Hz refresh support.",
    cardShort:
      "Fine-pitch indoor LED module with universal 320x160mm cabinet compatibility and camera-friendly refresh options.",
    pitchLabel: "P2.0",
    cardPrice: getLedDisplayCardPrice("p2-indoor-led-display"),
    useCaseTag: "Showroom",
    image: "/assets/led-display/indoor/P2-Indoor-LED-Display.webp",

    quickFeatures: [
      "320x160mm universal module size",
      "Bottom case texture design for stronger assembly",
      "High-quality lamp beads with reduced fall-off risk",
      "Reliable PCB board design for stable operation",
      "Lightweight module helps reduce screen load",
      "Excellent indoor visual experience",
      "Good compatibility across same series",
      "Supports coating process, 45-degree tangent angle, and optional 7680Hz refresh",
    ],
    bestFor: ["Boardroom", "Showroom", "Control room", "Premium indoor video wall"],
    keySpecs: [
      { k: "Pixel Pitch", v: "2.0mm" },
      { k: "LED Type", v: "SMD1515" },
      { k: "Module Resolution (WxH)", v: "160x80 = 12,800 pixels" },
      { k: "Pixel Density", v: "250,000 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16.6mm" },
      { k: "Module Weight", v: "0.45 +- 0.02kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: "450-500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140deg / 140deg" },
      { k: "Brightness/Color Uniformity", v: ">=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "488 W/m2" },
      { k: "Input Power <Typical>", v: "163 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K HD, 4K UHD" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: [
      "320x160mm universal module body supports standard indoor cabinet integration",
      "Bottom case texture design helps improve assembly strength and handling stability",
      "High-quality lamp beads and reliable PCB structure reduce common failure risks",
    ],
    controlSystem: [
      "HUB75-based receiving workflow supports practical indoor screen control setup",
      "Single-dot brightness calibration support helps improve visual uniformity",
      "Compatible with 2K HD and 4K UHD video processing for close-view display use",
    ],
    installationNotes: [
      "Lightweight module design helps reduce structural load on indoor video wall projects",
      "Precise alignment, mapping, calibration, and power planning improve final image quality",
      "Supports coating process and 45-degree tangent angle planning for specific installations",
    ],
    supportNotes: [
      "3840Hz standard refresh with optional 7680Hz for camera-friendly indoor output",
      "Designed for long-life indoor use with 100,000-hour lifespan reference",
      "After-sales support, spare planning, and calibration guidance available",
    ],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p2-5-indoor-led-display",
    title: "P2.5 Indoor LED Display Module",
    subtitle:
      "Fine-pitch indoor LED module with 320x160mm universal size, stable PCB design, and optional 7680Hz refresh support.",
    cardShort:
      "Indoor LED module with universal 320x160mm cabinet compatibility and balanced image clarity for close-view use.",
    pitchLabel: "P2.5",
    cardPrice: getLedDisplayCardPrice("p2-5-indoor-led-display"),
    useCaseTag: "Showroom",
    image: "/assets/led-display/indoor/P2.5-Indoor-LED-Display.webp",

    quickFeatures: [
      "320x160mm universal module size",
      "Bottom case texture design for stronger assembly",
      "High-quality lamp beads with reduced fall-off risk",
      "Reliable PCB board design for stable operation",
      "Lightweight module helps reduce screen load",
      "Excellent indoor visual experience",
      "Good compatibility across same series",
      "Supports coating process, 45-degree tangent angle, and optional 7680Hz refresh",
    ],
    bestFor: ["Conference room", "Showroom", "Retail display", "Control room"],
    keySpecs: [
      { k: "Pixel Pitch", v: "2.5mm" },
      { k: "LED Type", v: "SMD2121" },
      { k: "Module Resolution (WxH)", v: "128x64 = 8,192 pixels" },
      { k: "Pixel Density", v: "160,000 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16.6mm" },
      { k: "Module Weight", v: "0.38 +- 0.02kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: "450-500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140deg / 140deg" },
      { k: "Brightness/Color Uniformity", v: ">=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "488 W/m2" },
      { k: "Input Power <Typical>", v: "163 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K HD, 4K UHD" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: [
      "320x160mm universal module body supports standard indoor cabinet integration",
      "Bottom case texture design helps improve assembly strength and handling stability",
      "High-quality lamp beads and reliable PCB structure reduce common failure risks",
    ],
    controlSystem: [
      "HUB75-based receiving workflow supports practical indoor screen control setup",
      "Single-dot brightness calibration support helps improve visual uniformity",
      "Compatible with 2K HD and 4K UHD video processing for close-view display use",
    ],
    installationNotes: [
      "Lightweight module design helps reduce structural load on indoor video wall projects",
      "Precise alignment, mapping, calibration, and power planning improve final image quality",
      "Supports coating process and 45-degree tangent angle planning for specific installations",
    ],
    supportNotes: [
      "3840Hz standard refresh with optional 7680Hz for camera-friendly indoor output",
      "Designed for long-life indoor use with 100,000-hour lifespan reference",
      "After-sales support, spare planning, and calibration guidance available",
    ],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p3-indoor-led-display",
    title: "P3 Indoor LED Display Module",
    subtitle:
      "Indoor LED module with 192x192mm standard size, stable PCB design, and optional 7680Hz refresh support.",
    cardShort:
      "Indoor P3 LED module with practical 192x192mm cabinet compatibility and balanced clarity for medium viewing distance.",
    pitchLabel: "P3.0",
    cardPrice: getLedDisplayCardPrice("p3-indoor-led-display"),
    useCaseTag: "Retail",
    image: "/assets/led-display/indoor/P3-Indoor-LED-Display.webp",

    quickFeatures: [
      "Bottom case texture design for stronger assembly",
      "High-quality lamp beads with reduced fall-off risk",
      "Reliable PCB board design for stable operation",
      "Lightweight module helps reduce screen load",
      "Excellent indoor visual experience",
      "Good compatibility across same series",
      "Supports coating process and optional 7680Hz refresh",
    ],
    bestFor: ["Masjid display", "Training hall", "Seminar room", "Retail signage"],
    keySpecs: [
      { k: "Pixel Pitch", v: "3.0mm" },
      { k: "LED Type", v: "SMD2121" },
      { k: "Module Resolution (WxH)", v: "64x64 = 4,096 pixels" },
      { k: "Pixel Density", v: "102,400 dots/m2" },
      { k: "Module Size (WxHxD)", v: "192mm x 192mm x 14mm" },
      { k: "Module Weight", v: "0.23 +- 0.02kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: ">=500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140deg / 140deg" },
      { k: "Brightness/Color Uniformity", v: ">=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "543 W/m2" },
      { k: "Input Power <Typical>", v: "180 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K HD, 4K UHD" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: [
      "192x192mm standard module body supports common indoor cabinet integration",
      "Bottom case texture design helps improve assembly strength and handling stability",
      "High-quality lamp beads and reliable PCB structure reduce common failure risks",
    ],
    controlSystem: [
      "HUB75-based receiving workflow supports practical indoor screen control setup",
      "Single-dot brightness calibration support helps improve visual uniformity",
      "Compatible with 2K HD and 4K UHD video processing for indoor presentation use",
    ],
    installationNotes: [
      "Lightweight module design helps reduce structural load on indoor video wall projects",
      "Precise alignment, mapping, calibration, and power planning improve final image quality",
      "Supports coating process planning for added reliability in long-term operation",
    ],
    supportNotes: [
      "3840Hz standard refresh with optional 7680Hz for camera-friendly indoor output",
      "Designed for long-life indoor use with 100,000-hour lifespan reference",
      "After-sales support, spare planning, and calibration guidance available",
    ],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p3-076-indoor-led-display",
    title: "P3.076 Indoor LED Display Module",
    subtitle:
      "Fine-pitch indoor LED module with 320x160mm universal size, stable PCB design, and optional 7680Hz refresh support.",
    cardShort:
      "Indoor P3.076 LED module with universal 320x160mm cabinet compatibility and stable visual performance for medium viewing distance.",
    pitchLabel: "P3.076",
    cardPrice: getLedDisplayCardPrice("p3-076-indoor-led-display"),
    useCaseTag: "Conference",
    image: "/assets/led-display/indoor/P3.076-Indoor-LED-Display.webp",

    quickFeatures: [
      "320x160mm universal module size",
      "Bottom case texture design for stronger assembly",
      "High-quality lamp beads with reduced fall-off risk",
      "Reliable PCB board design for stable operation",
      "Lightweight module helps reduce screen load",
      "Excellent indoor visual experience",
      "Good compatibility across same series",
      "Supports coating process, 45-degree tangent angle, and optional 7680Hz refresh",
    ],
    bestFor: ["Masjid LED screen", "Classroom", "Seminar hall", "Indoor signage"],
    keySpecs: [
      { k: "Pixel Pitch", v: "3.076mm" },
      { k: "LED Type", v: "SMD2121" },
      { k: "Module Resolution (WxH)", v: "104x52 = 5,408 pixels" },
      { k: "Pixel Density", v: "105,625 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16.2mm" },
      { k: "Module Weight", v: "0.35 +- 0.02kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: ">=500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140deg / 140deg" },
      { k: "Brightness/Color Uniformity", v: ">=98%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "488 W/m2" },
      { k: "Input Power <Typical>", v: "163 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "2K HD, 4K UHD" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "BIS / CE / CB / ROHS / EAC" },
    ],
    buildQuality: [
      "320x160mm universal module body supports standard indoor cabinet integration",
      "Bottom case texture design helps improve assembly strength and handling stability",
      "High-quality lamp beads and reliable PCB structure reduce common failure risks",
    ],
    controlSystem: [
      "HUB75-based receiving workflow supports practical indoor screen control setup",
      "Single-dot brightness calibration support helps improve visual uniformity",
      "Compatible with 2K HD and 4K UHD video processing for indoor presentation use",
    ],
    installationNotes: [
      "Lightweight module design helps reduce structural load on indoor video wall projects",
      "Precise alignment, mapping, calibration, and power planning improve final image quality",
      "Supports coating process and 45-degree tangent angle planning for specific installations",
    ],
    supportNotes: [
      "3840Hz standard refresh with optional 7680Hz for camera-friendly indoor output",
      "Designed for long-life indoor use with 100,000-hour lifespan reference",
      "After-sales support, spare planning, and calibration guidance available",
    ],
    faqs: indoorCommonFAQs,
  },

  {
    category: "indoor",
    slug: "p4-indoor-led-display-module",
    title: "P4 Indoor LED Display Module",
    subtitle:
      "Cost-effective indoor LED module with clear text visibility, practical 320x160mm cabinet compatibility, and stable everyday performance for commercial display projects.",
    cardShort:
      "P4 indoor LED module for showrooms, meeting spaces, education screens, and indoor brand communication where balanced cost and clarity matter.",
    pitchLabel: "P4",
    cardPrice: getLedDisplayCardPrice("p4-indoor-led-display-module"),
    useCaseTag: "Retail",
    image: "/assets/led-display/indoor/P4 Indoor LED Display.webp",

    quickFeatures: [
      "Balanced indoor clarity for medium viewing distance",
      "320x160mm standard module size for cabinet planning",
      "Stable PCB and LED packaging for daily operation",
      "Clean text, offer, and branding playback",
      "Good fit for shop, office, and education displays",
      "Controller-ready workflow for indoor content management",
    ],
    bestFor: ["Retail signage", "Showroom LED wall", "Office reception", "Training room"],
    keySpecs: [
      { k: "Pixel Pitch", v: "4.0mm" },
      { k: "LED Type", v: "SMD2121" },
      { k: "Module Resolution (WxH)", v: "80x40 = 3,200 pixels" },
      { k: "Pixel Density", v: "62,500 dots/m2" },
      { k: "Module Size (WxHxD)", v: "320mm x 160mm x 16mm" },
      { k: "Module Weight", v: "0.33 +- 0.02kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Single-dot Brightness Calibration", v: "Support" },
      { k: "Brightness", v: ">=500 cd/m2" },
      { k: "Color Temperature", v: "2000K - 9300K adjustable" },
      { k: "Viewing Angle (H/V)", v: "140deg / 140deg" },
      { k: "Brightness/Color Uniformity", v: ">=97%" },
      { k: "Contrast Ratio", v: "5000:1" },
      { k: "Input Power <Max>", v: "430 W/m2" },
      { k: "Input Power <Typical>", v: "145 W/m2" },
      { k: "Power Supply Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
      { k: "Frame Changing Frequency", v: "60Hz" },
      { k: "Refresh Rate", v: "3840Hz (standard)" },
      { k: "Processing Depth", v: "12-14bit" },
      { k: "Video Support", v: "Full HD, 2K, 4K scaling support" },
      { k: "Life Span", v: "100,000 hours" },
      { k: "Working Temp/Humidity", v: "-20 deg C to 45 deg C / 10%-50% RH (no condensation)" },
      { k: "Storage Temp/Humidity", v: "-20 deg C to 50 deg C / 10%-60% RH (no condensation)" },
      { k: "Certification", v: "CE / ROHS / CB" },
    ],
    buildQuality: [
      "320x160mm indoor module structure helps simplify cabinet planning and replacement work",
      "Stable PCB layout and standard indoor build support consistent day-to-day screen performance",
      "Well-suited for commercial display projects where budget control and reliable operation both matter",
    ],
    controlSystem: [
      "HUB75-based control workflow supports practical receiving-card and controller integration",
      "Single-dot brightness calibration support helps improve color and brightness consistency across the display",
      "Supports indoor content playback for product promotion, presentation screens, schedules, and branded communication",
    ],
    installationNotes: [
      "Best performance comes from proper viewing-distance planning, cabinet alignment, and clean power distribution",
      "Works well for retail walls, reception branding, indoor promo displays, and training-room visual communication",
      "Project-based sizing, structure planning, and calibration help achieve a cleaner final image on site",
    ],
    supportNotes: [
      "3840Hz refresh helps produce smoother visuals for presentation, ads, and general commercial playback",
      "Spare module planning, controller setup, and content guidance improve long-term maintenance readiness",
      "Suitable for Bangladesh indoor LED projects that need practical pricing and dependable after-sales support",
    ],
    faqs: indoorCommonFAQs,
  },
];

/* =========================
   HELPERS (Indoor/Outdoor/Rental)
========================= */

export function getProductByCategoryAndSlug(category: ProductCategory, slug: string): ProductItem | null {
  if (category === "outdoor") return outdoorCatalog.find((p) => p.slug === slug) ?? null;
  if (category === "rental") return rentalCatalog.find((p) => p.slug === slug) ?? null;
  if (category === "indoor") return indoorCatalog.find((p) => p.slug === slug) ?? null;
  return null;
}

export function getProductsByCategory(category: ProductCategory): ProductItem[] {
  if (category === "outdoor") return outdoorCatalog;
  if (category === "rental") return rentalCatalog;
  if (category === "indoor") return indoorCatalog;
  return [];
}

/* =========================
   LISTING HELPERS (optional)
   Indoor page can use these helpers to keep UI consistent
========================= */

export function getPitchLabel(p: ProductItem): string {
  if (p.pitchLabel) return p.pitchLabel;

  // fallback: try to parse from keySpecs "Pixel Pitch"
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"))?.v ?? "";
  // examples: "P2.5 (2.5mm)" -> "P2.5"
  const m = spec.match(/P\s?(\d+(\.\d+)?)/i);
  if (m?.[1]) return `P${m[1]}`;
  return "P";
}

export function getCardShort(p: ProductItem): string {
  return p.cardShort ?? p.subtitle ?? "";
}

function parseProductPitchValue(p: ProductItem): number {
  const raw = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"))?.v ?? p.pitchLabel ?? "";
  const match = raw.match(/(\d+(?:\.\d+)?)/);
  if (!match) return Number.POSITIVE_INFINITY;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase();
}

export function getRelatedProducts(products: ProductItem[], currentSlug: string, limit = 3): ProductItem[] {
  const current = products.find((item) => item.slug === currentSlug);
  if (!current) return products.filter((item) => item.slug !== currentSlug).slice(0, limit);

  const currentPitch = parseProductPitchValue(current);
  const currentBestFor = new Set(current.bestFor.map(normalizeKeyword));

  return products
    .filter((item) => item.slug !== current.slug)
    .map((item) => {
      const pitchDistance = Math.abs(parseProductPitchValue(item) - currentPitch);
      const sharedUseCases = item.bestFor.reduce((count, useCase) => {
        return count + (currentBestFor.has(normalizeKeyword(useCase)) ? 1 : 0);
      }, 0);

      return {
        item,
        pitchDistance,
        sharedUseCases,
      };
    })
    .sort((a, b) => {
      if (b.sharedUseCases !== a.sharedUseCases) return b.sharedUseCases - a.sharedUseCases;
      if (a.pitchDistance !== b.pitchDistance) return a.pitchDistance - b.pitchDistance;
      return a.item.title.localeCompare(b.item.title);
    })
    .slice(0, limit)
    .map((entry) => entry.item);
}

/* =========================
   ACCESSORIES: RECEIVING CARDS
========================= */

export type KeySpec = { k: string; v: string };

export type ReceivingCardProduct = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  cardPrice?: string;
  badge: string;

  quickFeatures: readonly string[];
  keySpecs: readonly KeySpec[];

  compatibility: readonly string[];
  installationNotes: readonly string[];
  troubleshooting: readonly string[];

  faqs: readonly { q: string; a: string }[];
};

export const receivingCardCatalog: readonly ReceivingCardProduct[] = [
  {
    slug: "r-712",
    title: "R-712 Receiving Card",
    subtitle:
      "High-performance receiving card for synchronous & asynchronous LED control systems. Built-in HUB75E ports for faster installation.",
    image: "/assets/led-display/receiving-cards/R-712-Receiving-Card.webp",
    cardPrice: "Tk 2,350.00 (per card, offer & project size)",
    badge: "HUB75E - 12 Ports",
    quickFeatures: [
      "Dual compatibility (Sync + Async control systems)",
      "Built-in HUB75E ports (no external adapter boards)",
      "High load capacity (up to 131,072 pixels)",
      "Scan mode support (static to 1/128 scan)",
      "Flexible cascading + data group exchange",
      "Offset alignment + multi-card cascade support",
      "Stable performance + certification (CE/RoHS)",
    ],
    keySpecs: [
      { k: "Model", v: "R-712" },
      { k: "Interface Ports", v: "12 x HUB75E (integrated)" },
      { k: "Load Capacity", v: "Up to 131,072 pixels" },
      { k: "Scan Support", v: "Static to 1/128 scan" },
      { k: "System Compatibility", v: "Synchronous & Asynchronous" },
      { k: "Cascading", v: "Multi-card cascade + data group exchange" },
      { k: "Mapping Support", v: "Offset alignment supported" },
      { k: "Certifications", v: "CE / RoHS" },
      { k: "Use Case", v: "Rental, indoor fixed, outdoor screens" },
      { k: "Notes", v: "Model selection depends on module scan, HUB interface, and controller ecosystem" },
    ],
    compatibility: [
      "HUB75 series module wiring check (HUB75E recommended)",
      "Scan rate must match (1/16, 1/32, 1/64, etc.) to avoid mapping mismatch",
      "Verify driver IC type (Conventional/PWM) according to your system",
      "Set config file and mapping according to controller/processor brand and model",
    ],
    installationNotes: [
      "Label ribbon cables and power cables before installation",
      "Ensure proper grounding and signal cable quality (reduces noise)",
      "During commissioning, use test patterns to check dead pixels or line issues",
      "Keeping a spare receiving card is recommended (rental/outdoor projects)",
    ],
    troubleshooting: [
      "Display shifted/mirrored -> mapping/scan mismatch or HUB pinout mismatch",
      "Random flicker -> grounding/signal noise or weak PSU",
      "Half screen dead -> loose ribbon cable or port assignment mismatch",
      "Wrong colors -> IC config / gamma / data polarity check",
    ],
    faqs: [
      {
        q: "Are receiving card and sending card the same?",
        a: "No. The sending card/processor sends data from the content source, while the receiving card inside the cabinet receives data and distributes it to modules.",
      },
      {
        q: "What happens if I choose the wrong card?",
        a: "It can cause mapping mismatch (shift/mirror), flicker, half-screen failure, and color issues-especially with scan/HUB mismatch.",
      },
      {
        q: "What information is needed for selection?",
        a: "Provide module size/pixel pitch, scan rate, HUB type, cabinet resolution, and controller brand/model for quick and accurate matching.",
      },
    ],
  },

  {
    slug: "r-732",
    title: "R-732 Receiving Card",
    subtitle:
      "Advanced receiving card for fine-pitch & large LED video walls. Reliable transmission with flexible pixel mapping and cascade support.",
    image: "/assets/led-display/receiving-cards/R-732-Receiving-Card.webp",
    cardPrice: "Tk 3,000.00 (per card, offer & project size)",
    badge: "Advanced Pixel Control",
    quickFeatures: [
      "Advanced pixel control (Conventional + PWM IC support)",
      "Direct connection to modules (flexible cascade)",
      "Stable communication over distance (system dependent)",
      "Offset & data exchange support (layout flexibility)",
      "Multi-card cascade compatible (large screens)",
      "Trace & sample point functions (testing support)",
      "Wide temperature range planning (deployment ready)",
    ],
    keySpecs: [
      { k: "Model", v: "R-732" },
      { k: "IC Support", v: "Conventional & PWM type (system dependent)" },
      { k: "Cascading", v: "Multi-card cascade supported" },
      { k: "Mapping", v: "Offset + data exchange supported" },
      { k: "Transmission", v: "Stable communication over distance (system dependent)" },
      { k: "Testing Tools", v: "Trace & sample point functions (testing support)" },
      { k: "Deployment", v: "Wide temperature range planning (deployment ready)" },
      { k: "Use Case", v: "Video walls, stage, control rooms" },
      { k: "Notes", v: "Final specs depend on controller ecosystem" },
    ],
    compatibility: [
      "For fine-pitch modules, scan + IC combination must be matched carefully",
      "Match firmware/config according to the controller model",
      "If cable length/routing is not correct, flicker or noise may occur",
      "Ensure power stability (plan for low voltage drop)",
    ],
    installationNotes: [
      "During commissioning, run test patterns and do cabinet-to-cabinet alignment",
      "Plan spares to reduce downtime on large screens",
      "Maintain cable strain-relief and proper airflow",
      "Keep port map documentation for easier maintenance",
    ],
    troubleshooting: [
      "Lines/tearing -> data cable routing or port mapping issue",
      "Flicker in sections -> power drop or ground loop",
      "Mismatch between cabinets -> config mismatch (scan/IC/mapping)",
      "No output -> check port assignment and ribbon orientation",
    ],
    faqs: [
      {
        q: "Where is R-732 used most?",
        a: "Large LED video walls, stage displays, and control rooms where alignment and stability are critical.",
      },
      {
        q: "What are the benefits of upgrading?",
        a: "Better mapping flexibility, cascade planning, and commissioning features make large-screen setup easier.",
      },
    ],
  },

  {
    slug: "hd-r716",
    title: "Huidu HD-R716 Receiving Card",
    subtitle:
      "High-end receiving card for ultra-fine pixel pitch LED displays with 16 HUB75E ports, smart diagnostics, and dual Gigabit Ethernet for stable data transmission.",
    image: "/assets/led-display/receiving-cards/Huidu-HD-R716-Receiving-Card.webp",
    cardPrice: "Tk 4,500.00 (per card, offer & project size)",
    badge: "16 HUB75E - High Pixel",
    quickFeatures: [
      "16 HUB75E ports (supports large module arrays without extra HUB cards)",
      "Pixel capacity up to 512 x 640 (327,680 pixels total)",
      "Scan versatility: static to 1/128 scan",
      "Wide grayscale range: 256 to 65,536 levels",
      "Smart setup tools: built-in diagnostics + auto-configuration",
      "LED indicators for power & signal status",
      "Dual Gigabit Ethernet ports (daisy-chain + backup link supported)",
      "Industrial operating range (-40 deg C to +80 deg C; 0-90% RH)",
    ],
    keySpecs: [
      { k: "Model", v: "HD-R716" },
      { k: "Interface Ports", v: "16 x HUB75E, 2 x Gigabit Ethernet" },
      { k: "Pixel Capacity", v: "Up to 512 x 640 (327,680 pixels)" },
      { k: "Scanning Support", v: "Static to 1/128 scan" },
      { k: "Grayscale Support", v: "256-65,536 levels" },
      { k: "Voltage Input", v: "DC 4.0V ~ 5.5V" },
      { k: "Power Consumption", v: "Max 5W" },
      { k: "Operating Temperature", v: "-40 deg C to +80 deg C" },
      { k: "Humidity Tolerance", v: "0 ~ 90% RH" },
      { k: "Weight", v: "~ 91g" },
      { k: "Compatibility", v: "All standard & PWM driver IC modules" },
      { k: "Smart Features", v: "Smart config, diagnostics, auto-scan detection" },
    ],
    compatibility: [
      "Compatible with standard & PWM driver IC modules (according to controller ecosystem)",
      "Confirm scan mode (static to 1/128) matches your module and controller configuration",
      "Use correct port mapping and cabinet-to-cabinet routing plan during commissioning",
    ],
    installationNotes: [
      "Check LED indicators to confirm power and signal status during initial setup",
      "Document port mapping/routing for easier future service",
      "Use quality CAT5e/CAT6 and proper grounding to reduce noise and flicker risk",
    ],
    troubleshooting: [
      "Shift/mirror/tearing -> mapping/scan mismatch; re-check configuration and routing",
      "Random flicker -> grounding/noise or unstable power; verify distribution and cable quality",
      "No output -> check Ethernet link, port mapping, and ribbon orientation",
    ],
    faqs: [
      {
        q: "What is HD-R716 best suited for?",
        a: "Ultra-fine pixel pitch and high-resolution LED display installations where stable data transmission and flexible scan support are required.",
      },
      {
        q: "Does it support high scan modes?",
        a: "Yes. It supports scan modes from static up to 1/128 scan.",
      },
      {
        q: "What should I share for correct selection/setup?",
        a: "Share your module pixel pitch, scan rate, HUB type, cabinet resolution, and controller/sending device model for accurate mapping and configuration.",
      },
    ],
  },

  {
    slug: "hd-r516",
    title: "Huidu HD-R516 Receiving Card",
    subtitle:
      "Smart receiving card for full-color LED video screens with 16 HUB75E ports and dual Gigabit Ethernet for stable transmission. Supports smart settings and built-in screen test.",
    image: "/assets/led-display/receiving-cards/Huidu-HD-R516-Receiving-Card.webp",
    badge: "16 HUB75E - Smart Setup",
    quickFeatures: [
      "16 HUB75E ports for cabinet module connectivity",
      "Dual Gigabit Ethernet ports (daisy-chain supported)",
      "Smart setting support for faster screen layout setup",
      "Built-in screen test function (uniformity + flatness check)",
      "Scan support: static to 1/64 scan",
      "Grayscale: 256 to 65,536 levels",
      "Input voltage: DC 4.5V to 5.5V (power ports supported)",
      "Long-distance link support (CAT5e/CAT6 within ~146m, cable dependent)",
    ],
    keySpecs: [
      { k: "Model", v: "HD-R516" },
      { k: "Interface Ports", v: "16 x HUB75E, 2 x Gigabit Ethernet" },
      { k: "DC Power Ports", v: "2 x DC power ports (for power input)" },
      { k: "Recommended Control Range", v: "256 x 512 pixels" },
      { k: "Scan Support", v: "Static to 1/64 scan" },
      { k: "Grayscale", v: "256-65,536 levels" },
      { k: "Input Voltage", v: "DC 4.5V ~ 5.5V" },
      { k: "Ethernet Features", v: "Daisy-chain supported (dual Gigabit ports)" },
      { k: "Screen Test", v: "Built-in screen test (uniformity + flatness check)" },
      { k: "Smart Setup", v: "Smart setting support for faster layout setup" },
      { k: "Link Distance", v: "CAT5e/CAT6 within ~146m (cable dependent)" },
      { k: "Working Temperature", v: "-40 deg C to +85 deg C" },
    ],
    compatibility: [
      "Works with common driver IC modules; supports most PWM IC modules (system dependent)",
      "Confirm scan mode and mapping configuration in your controller/sender software",
      "Use quality CAT5e/CAT6 and proper grounding to reduce flicker/noise risk",
    ],
    installationNotes: [
      "Label and document HUB port mapping for easier future service",
      "Run the built-in screen test during commissioning to verify uniformity and flatness",
      "Keep clean cable routing and strain relief to reduce connector stress",
    ],
    troubleshooting: [
      "Flicker/noise -> check grounding, DC distribution stability, and cable quality",
      "Shift/mirror -> re-check scan/mapping configuration and HUB port mapping",
      "No data -> verify Ethernet link LEDs and sender-to-receiver routing order",
    ],
    faqs: [
      {
        q: "Which sender/controllers can be used with HD-R516?",
        a: "Use it within a compatible Huidu control ecosystem (sender, controller, or processor). Share your current sender/controller model for accurate confirmation.",
      },
      {
        q: "What scan modes does HD-R516 support?",
        a: "It supports scanning methods from static up to 1/64 scan.",
      },
      {
        q: "What information should I share for correct selection/setup?",
        a: "Share pixel pitch, scan rate, HUB type, cabinet resolution, and sender/controller model to match mapping and configuration quickly.",
      },
    ],
  },
  {
    slug: "novastar-mrv336-receiving-card",
    title: "NovaStar MRV336 Receiving Card",
    subtitle:
      "Professional receiving card for indoor, outdoor, and rental LED cabinets with practical HUB mapping support, stable data distribution, and cleaner commissioning workflow.",
    image: "/assets/led-display/receiving-cards/R-732-Receiving-Card.webp",
    cardPrice: "Tk 3,200.00 (per card, offer & project size)",
    badge: "NovaStar - Cabinet Mapping",
    quickFeatures: [
      "Stable data receiving workflow for indoor, outdoor, and rental LED cabinets",
      "Practical HUB-based cabinet wiring support for cleaner installation planning",
      "Useful for video wall, billboard, stage, and spare-card service workflows",
      "Reliable mapping and cabinet-to-cabinet routing during commissioning",
      "Works with common scan configurations and module ecosystems",
      "Good choice for system expansion, maintenance stock, and replacement planning",
    ],
    keySpecs: [
      { k: "Model", v: "NovaStar MRV336" },
      { k: "Interface Ports", v: "HUB-based cabinet connectivity (project dependent pinout)" },
      { k: "Load Capacity", v: "Standard cabinet loading for full-color LED screens (configuration dependent)" },
      { k: "Scan Support", v: "Common static to high-scan LED module workflows (project dependent)" },
      { k: "Control Ecosystem", v: "NovaStar sender / processor ecosystem" },
      { k: "Mapping Support", v: "Cabinet routing, offset, and configuration support" },
      { k: "Use Case", v: "Indoor fixed, rental stage, outdoor branding screens" },
      { k: "Notes", v: "Final compatibility depends on module scan rate, HUB pinout, and controller version" },
    ],
    compatibility: [
      "Confirm module scan rate, HUB type, and cabinet resolution before selection",
      "Match the receiving card with the correct NovaStar sender / processor ecosystem",
      "Check ribbon pinout and cabinet routing order to avoid shift or mirror issues",
      "Power stability and clean grounding help reduce flicker and communication noise",
    ],
    installationNotes: [
      "Label HUB ribbon order and cabinet signal routing before commissioning",
      "Keep sender, cable path, and cabinet map documented for faster servicing later",
      "Run test patterns after setup to confirm mapping, colors, and cabinet alignment",
      "Keep at least one spare receiving card for large or uptime-critical LED walls",
    ],
    troubleshooting: [
      "Shifted or mirrored image -> re-check cabinet routing, mapping, and HUB pinout",
      "Section flicker -> inspect grounding, PSU stability, and signal cable quality",
      "No output in one cabinet -> verify port assignment and ribbon cable orientation",
      "Color mismatch -> review config file, scan setup, and driver IC compatibility",
    ],
    faqs: [
      {
        q: "Where is NovaStar MRV336 commonly used?",
        a: "It is commonly selected for indoor fixed LED walls, outdoor signage projects, and rental cabinets where stable cabinet mapping and practical service support are important.",
      },
      {
        q: "What should I share before ordering?",
        a: "Share your module scan rate, HUB type, cabinet resolution, and existing NovaStar sender or processor model for accurate selection and setup guidance.",
      },
      {
        q: "Can it be kept as a spare card?",
        a: "Yes. Keeping compatible spare receiving cards is a practical way to reduce downtime in rental, outdoor, and high-uptime LED projects.",
      },
    ],
  },
  {
    slug: "colorlight-5a-75e-receiving-card",
    title: "Colorlight 5A-75E Receiving Card",
    subtitle:
      "Reliable full-color LED receiving card with HUB75E-focused cabinet connectivity, practical mapping support, and stable day-to-day performance for signage, video wall, and event screens.",
    image: "/assets/led-display/receiving-cards/R-712-Receiving-Card.webp",
    cardPrice: "Tk 2,950.00 (per card, offer & project size)",
    badge: "Colorlight - HUB75E",
    quickFeatures: [
      "HUB75E-oriented cabinet connectivity for common full-color LED module workflows",
      "Stable data reception for signage, video wall, and event-use LED screens",
      "Practical mapping and routing support for cleaner cabinet commissioning",
      "Good fit for maintenance stock, service backup, and system replacement planning",
      "Works well where controller, receiving card, and module matching are done correctly",
      "Supports smoother troubleshooting by keeping cabinet routing and mapping structured",
    ],
    keySpecs: [
      { k: "Model", v: "Colorlight 5A-75E" },
      { k: "Interface Ports", v: "HUB75E-based cabinet connectivity (project dependent layout)" },
      { k: "Recommended Control Range", v: "Standard cabinet loading for full-color LED displays (configuration dependent)" },
      { k: "Scan Support", v: "Common scan-based LED module workflows (project dependent)" },
      { k: "Control Ecosystem", v: "Colorlight sender / controller ecosystem" },
      { k: "Mapping Support", v: "Cabinet routing, offset, and configuration support" },
      { k: "Use Case", v: "Indoor signage, LED video walls, event and rental support stock" },
      { k: "Notes", v: "Final compatibility depends on module scan rate, HUB75E pinout, and controller software configuration" },
    ],
    compatibility: [
      "Confirm HUB75E pinout, scan mode, and cabinet resolution before selection",
      "Use it with the correct Colorlight sender or controller ecosystem for reliable setup",
      "Validate module-to-card compatibility during configuration to avoid image shift or tearing",
      "Keep power distribution stable and signal routing clean for long-term performance",
    ],
    installationNotes: [
      "Document cabinet order, data routing path, and HUB cable positions during installation",
      "Use quality CAT5e/CAT6 and proper grounding to reduce data noise during operation",
      "Run cabinet test and mapping verification before final handover",
      "Keep spare ribbon cables and one backup receiving card for faster field service",
    ],
    troubleshooting: [
      "Partial image loss -> check cabinet routing sequence and connector seating",
      "Flicker or instability -> inspect grounding, power quality, and network cable condition",
      "Wrong image position -> re-check mapping, scan setup, and HUB75E wiring order",
      "No communication -> verify sender-to-receiver ecosystem compatibility and port assignment",
    ],
    faqs: [
      {
        q: "Is Colorlight 5A-75E suitable for common LED cabinets?",
        a: "Yes, it is suitable for many full-color LED cabinet workflows when the module scan rate, HUB75E wiring, and Colorlight control ecosystem are matched correctly.",
      },
      {
        q: "Why is compatibility checking important?",
        a: "Receiving card selection is not only about the card itself. HUB pinout, scan rate, controller software, and cabinet routing must all match for stable visual output.",
      },
      {
        q: "What information helps with quick quotation and matching?",
        a: "Share pixel pitch, scan rate, HUB75E connector details, cabinet resolution, and your current Colorlight sender/controller model for practical matching support.",
      },
    ],
  },
] as const;

export function getReceivingCardBySlug(slug: string): ReceivingCardProduct | null {
  return (receivingCardCatalog as readonly ReceivingCardProduct[]).find((x) => x.slug === slug) ?? null;
}

/* =========================
   ACCESSORIES: LED ACCESSORIES (Cables & Parts)
========================= */

export type LedAccessoryProduct = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  cardPrice?: string;
  badge: string;

  quickFeatures: readonly string[];
  keySpecs: readonly KeySpec[];

  selectionNotes: readonly string[];
  installationNotes: readonly string[];
  faqs: readonly { q: string; a: string }[];
  tags: readonly string[];
};


export const ledAccessoriesCatalog: readonly LedAccessoryProduct[] = [
  {
    slug: "magnet-led-module-fixing",
    title: "Magnet for LED Module Fixing",
    subtitle:
      "Magnetic stud set used for front-service LED module fixing - selected for faster servicing and cleaner cabinet installation.",
    image: "/assets/led-display/accessories/Magnet-for-LED-Module-Fixing.webp",
    cardPrice: "On request (per set / project quantity)",
    badge: "LED Accessories",
    quickFeatures: [
      "Front-service module fixing using magnetic studs",
      "Speeds up servicing (fewer screws and rework)",
      "Cleaner cabinet finishing for indoor installations",
    ],
    keySpecs: [
      { k: "Type", v: "Magnetic module fixing stud / mount (project dependent)" },
      { k: "Use", v: "Front-service LED module mounting" },
      { k: "Cabinet Type", v: "Typically indoor cabinets (service-friendly designs)" },
      { k: "Notes", v: "Size and fixing method depend on module/cabinet structure" },
    ],
    selectionNotes: [
      "Confirm module thickness and cabinet structure before selection",
      "Match the fixing method with your front-service opening/servicing approach",
      "For high-vibration areas, consider additional mechanical locking (project dependent)",
    ],
    installationNotes: [
      "Align mounting points consistently to keep module gaps even",
      "Keep metal dust away from magnets during installation (clean workspace)",
      "Document fixing pattern so maintenance is faster later",
    ],
    faqs: [
      {
        q: "Is this suitable for outdoor cabinets?",
        a: "It can be used in certain outdoor service-friendly designs, but selection depends on cabinet structure, sealing strategy, and mounting requirements.",
      },
      {
        q: "Do magnets replace screws completely?",
        a: "Some cabinets use magnets as the primary fixing method, while others combine magnets with mechanical support - choose based on cabinet design and safety needs.",
      },
    ],
    tags: ["Accessory", "Magnet", "Module fixing"],
  },
  {
    slug: "led-display-power-connector-cable",
    title: "LED Display Power Connector Cable",
    subtitle:
      "Red-black DC harness cable for LED module and cabinet power wiring - prepared per length, connector, and quantity.",
    image: "/assets/led-display/accessories/LED-Display-Power-Connector-Cable.webp",
    cardPrice: "On request (length, quantity & connector type wise)",
    badge: "LED Accessories",
    quickFeatures: [
      "DC harness for cabinet and module power connection",
      "Custom length and connector matching (project dependent)",
      "Useful for replacement, rewiring, and maintenance stock",
    ],
    keySpecs: [
      { k: "Type", v: "DC power harness (red/black)" },
      { k: "Use", v: "Cabinet internal DC distribution for modules/accessories" },
      { k: "Length", v: "Cut-to-length (project dependent)" },
      { k: "Connector", v: "Matched to your module/PSU setup (project dependent)" },
    ],
    selectionNotes: [
      "Confirm polarity, connector type, and pinout before ordering",
      "Plan cable length with service loops (avoid strain on connectors)",
      "Use appropriate cable size for current load to reduce voltage drop (project dependent)",
    ],
    installationNotes: [
      "Label power lines per cabinet to speed up troubleshooting",
      "Keep cable routing neat and avoid sharp bends around metal edges",
      "Check DC distribution stability during commissioning with test patterns and full brightness checks",
    ],
    faqs: [
      {
        q: "Can you supply custom lengths?",
        a: "Yes - share your required length, connector type, and quantity so the harness can be prepared for the project.",
      },
      {
        q: "Does cable choice affect flicker?",
        a: "Poor DC distribution and loose connections can contribute to unstable output. Correct cable sizing and clean routing help reduce issues.",
      },
    ],
    tags: ["Accessory", "Power cable", "Connector cable"],
  },
  {
    slug: "26-pin-frc-ribbon-cable-idc",
    title: "26 Pin FRC Flat Ribbon Cable with IDC Connector",
    subtitle:
      "26-pin flat ribbon cable for receiving card and HUB connectivity - common for cabinet internal data distribution.",
    image: "/assets/led-display/accessories/26-Pin-FRC-Flat-Ribbon.webp",
    cardPrice: "On request (per piece / project quantity)",
    badge: "LED Accessories",
    quickFeatures: [
      "Receiving card to HUB internal data connection",
      "Common cabinet ribbon for data distribution wiring",
      "Good spare item for service and quick replacement",
    ],
    keySpecs: [
      { k: "Pins", v: "26 pin" },
      { k: "Connector", v: "IDC" },
      { k: "Use", v: "Receiving card to HUB/adapter board internal connection" },
      { k: "Notes", v: "Length and orientation depend on cabinet wiring plan" },
    ],
    selectionNotes: [
      "Confirm pin count and connector orientation before ordering",
      "Match the cable length with your cabinet layout and service access needs",
      "Keep spares for rental and high-uptime screens to reduce downtime",
    ],
    installationNotes: [
      "Avoid twisting the ribbon - keep routing flat and strain-free",
      "Ensure correct orientation to prevent mapping issues",
      "Use tidy cable routing to reduce accidental unplugging during service",
    ],
    faqs: [
      {
        q: "Is 26-pin used for every cabinet?",
        a: "It depends on the receiving card/HUB ecosystem. Some setups use different pin counts - confirm your existing ribbon type before ordering.",
      },
      {
        q: "Can wrong ribbon orientation cause problems?",
        a: "Yes - incorrect orientation can lead to no output, wrong mapping, or unstable behavior. Always verify alignment before powering on.",
      },
    ],
    tags: ["Accessory", "Ribbon cable", "IDC connector"],
  },
  {
    slug: "16-pin-frc-ribbon-cable-idc",
    title: "16 Pin FRC Flat Ribbon Cable with IDC Connector",
    subtitle:
      "16-pin flat ribbon cable for selected signal/control wiring - useful for cabinet service and internal connections.",
    image: "/assets/led-display/accessories/16-Pin-FRC-Flat-Ribbon.webp",
    cardPrice: "On request (per piece / project quantity)",
    badge: "LED Accessories",
    quickFeatures: [
      "Selected cabinet signal/control ribbon connections",
      "Common for service, replacement, and internal wiring jobs",
      "Suitable for maintenance stock and spares planning",
    ],
    keySpecs: [
      { k: "Pins", v: "16 pin" },
      { k: "Connector", v: "IDC" },
      { k: "Use", v: "Selected cabinet internal signal/control connections" },
      { k: "Notes", v: "Confirm compatibility with your module/HUB wiring" },
    ],
    selectionNotes: [
      "Confirm pin count and IDC connector type used in your cabinet",
      "Plan cable length based on cabinet routing and service access",
      "Keep spare ribbons for quick on-site replacement",
    ],
    installationNotes: [
      "Route cables away from sharp edges and moving parts",
      "Avoid over-bending and tension near IDC terminations",
      "Verify stable output after replacement by running test patterns",
    ],
    faqs: [
      {
        q: "Can I use 16-pin ribbon in place of 26-pin?",
        a: "No - pin count must match the interface. Using the wrong cable can cause no output or incorrect behavior.",
      },
      {
        q: "Do you provide multiple lengths?",
        a: "Yes - share your cabinet routing requirement so the correct length can be prepared.",
      },
    ],
    tags: ["Accessory", "Ribbon cable", "IDC connector"],
  },
  {
    slug: "26-pin-idc-female-connector",
    title: "26 Pin IDC Female Connector",
    subtitle:
      "26-pin IDC female connector for ribbon termination - used for LED cabinet data and HUB board connection work.",
    image: "/assets/led-display/accessories/26-Pin-IDC-Female-Connector.webp",
    cardPrice: "On request (per piece / project quantity)",
    badge: "LED Accessories",
    quickFeatures: [
      "IDC connector for 26-pin ribbon termination",
      "Used for cabinet data wiring and HUB board connections",
      "Useful for service replacement and spare stock",
    ],
    keySpecs: [
      { k: "Type", v: "IDC female connector" },
      { k: "Pins", v: "26 pin" },
      { k: "Use", v: "Ribbon termination for data/HUB connections" },
      { k: "Notes", v: "Confirm pitch and orientation to match your ribbon/cabinet" },
    ],
    selectionNotes: [
      "Match the connector pin count and pitch with your ribbon cable",
      "Confirm keying/orientation to avoid reversed termination",
      "Keep spare connectors for service teams and rental screens",
    ],
    installationNotes: [
      "Use the correct crimp/press method for reliable termination",
      "Test continuity after termination to prevent intermittent faults",
      "Label terminated cables for quicker servicing later",
    ],
    faqs: [
      {
        q: "Do you provide connector installation support?",
        a: "Yes - share your ribbon type and the cabinet connection point so we can guide the correct termination approach.",
      },
      {
        q: "What happens if the termination is reversed?",
        a: "It can result in no output or unstable data. Always verify orientation before powering on.",
      },
    ],
    tags: ["Accessory", "IDC connector", "26 pin"],
  },
  {
    slug: "16-pin-idc-female-connector",
    title: "16 Pin IDC Female Connector",
    subtitle:
      "16-pin IDC female connector for selected signal/control connections - used for cabinet wiring and service work.",
    image: "/assets/led-display/accessories/16-Pin-IDC-Female-Connector.webp",
    cardPrice: "On request (per piece / project quantity)",
    badge: "LED Accessories",
    quickFeatures: [
      "IDC connector for 16-pin ribbon termination",
      "Used for selected cabinet internal wiring points",
      "Suitable for maintenance, replacement, and assembly work",
    ],
    keySpecs: [
      { k: "Type", v: "IDC female connector" },
      { k: "Pins", v: "16 pin" },
      { k: "Use", v: "Ribbon termination for selected cabinet connections" },
      { k: "Notes", v: "Confirm pitch and interface type before selection" },
    ],
    selectionNotes: [
      "Confirm pin count and connector pitch used in your setup",
      "Plan spare quantity for field replacement and service work",
      "Use matching ribbon cable quality to reduce intermittent faults",
    ],
    installationNotes: [
      "Use proper termination tools for stable contact",
      "Check orientation and continuity before commissioning",
      "Maintain tidy wiring to avoid accidental cable damage during service",
    ],
    faqs: [
      {
        q: "Can you supply bulk quantities for projects?",
        a: "Yes - share project quantity and connector requirements for quotation support.",
      },
      {
        q: "Is this compatible with all LED modules?",
        a: "Compatibility depends on the cabinet wiring and interface used. Confirm your current connector type before ordering.",
      },
    ],
    tags: ["Accessory", "IDC connector", "16 pin"],
  },
  {
    slug: "structure-mounting-accessories",
    title: "Structure & Mounting Accessories",
    subtitle:
      "Clamps, brackets, and mounting hardware for LED wall installation - wall-mount, hanging, and gantry structures (project-designed).",
    image: "/assets/led-display/accessories/Structure-&-Mounting-Accessories.webp",
    cardPrice: "Tk 5,000 - 50,000",
    badge: "LED Accessories",
    quickFeatures: [
      "Clamps, brackets, and mounting hardware set",
      "Wall-mount, hanging, or gantry setup support",
      "Designed as per drawing and site requirement",
    ],
    keySpecs: [
      { k: "Scope", v: "Mounting brackets, clamps, and structure hardware" },
      { k: "Installation Type", v: "Wall-mount / hanging / gantry (project dependent)" },
      { k: "Budget Range", v: "Tk 5,000 - 50,000 (project dependent)" },
      { k: "Notes", v: "Final design depends on site load and structural drawing approval" },
    ],
    selectionNotes: [
      "Share screen size, cabinet type, and installation method (wall/hanging/gantry)",
      "Structural design should follow site load and safety requirements",
      "Plan service access and cable routing while finalizing structure layout",
    ],
    installationNotes: [
      "Follow approved drawing and use proper anchor/fastener selection (site dependent)",
      "Check alignment, level, and cabinet locking before commissioning",
      "Re-check fasteners after initial run-in (especially for rental/movable setups)",
    ],
    faqs: [
      {
        q: "Can you design the structure for my site?",
        a: "Yes - share installation location, screen size, and site constraints so a safe structural approach can be planned.",
      },
      {
        q: "Why does mounting affect LED performance?",
        a: "A stable structure keeps cabinets aligned, reduces vibration-related issues, and improves long-term reliability and serviceability.",
      },
    ],
    tags: ["Structure", "Mounting", "Accessories"],
  },
  {
    slug: "heavy-duty-flight-case",
    title: "Heavy-duty Flight Case (LED / Sound Equipment)",
    subtitle:
      "Road-ready flight case for rental transport - protects equipment, speeds up load-in/out, and supports stacking for logistics.",
    image: "/assets/led-display/accessories/Heavy-duty-Flight-Case.webp",
    cardPrice: "Tk 15,000 - 25,000",
    badge: "LED Accessories",
    quickFeatures: [
      "Protects equipment during transport and storage",
      "Speeds up load-in / load-out for events",
      "Stackable design for rental inventory logistics",
    ],
    keySpecs: [
      { k: "Use", v: "Transport and storage for rental LED / sound equipment" },
      { k: "Build", v: "Road-ready case (materials and hardware project dependent)" },
      { k: "Budget Range", v: "Tk 15,000 - 25,000 (size dependent)" },
      { k: "Notes", v: "Sizing depends on the equipment and foam/partition design" },
    ],
    selectionNotes: [
      "Share equipment dimensions and weight to plan the correct internal fit",
      "Choose handle, caster, and stacking needs based on your logistics workflow",
      "Consider foam/partition layout for faster packing and safer transport",
    ],
    installationNotes: [
      "Label cases per equipment type to speed up event setup",
      "Keep latches and casters checked for smooth operations",
      "Avoid overloading and keep weight distribution balanced during transport",
    ],
    faqs: [
      {
        q: "Can you make a custom size case?",
        a: "Yes - share equipment dimensions and your preferred handling/stacking needs for a practical case plan.",
      },
      {
        q: "Is this only for LED?",
        a: "No - flight cases are commonly used for LED, audio, and lighting equipment where repeated transport protection is needed.",
      },
    ],
    tags: ["Flight Case", "Protection", "Logistics"],
  },
  {
    slug: "power-distribution-box-63a",
    title: "63A Power Distribution Box (Event LED / Sound / Light)",
    subtitle:
      "Event-ready power distribution box for temporary setups - helps safer cable management and cleaner electrical organization on site.",
    image: "/assets/led-display/accessories/63A-Power-Distribution-Box.webp",
    cardPrice: "On request",
    badge: "LED Accessories",
    quickFeatures: [
      "Event-ready distribution for LED, sound, and light setups",
      "Cleaner load management and cable organization on site",
      "Useful for stage, concert, and outdoor event workflow",
    ],
    keySpecs: [
      { k: "Main Input", v: "63A (as configured)" },
      { k: "Outputs", v: "Multiple outputs (project dependent)" },
      { k: "Protection", v: "MCB/RCD options (project dependent)" },
      { k: "Use", v: "Temporary event power distribution and organization" },
    ],
    selectionNotes: [
      "Confirm required input type and output socket plan based on your event load",
      "Use proper protections and distribution planning to avoid overload risks",
      "Share your device list (LED, audio, lights) for practical load planning support",
    ],
    installationNotes: [
      "Only trained technicians should handle event power distribution",
      "Keep distribution box dry and use safe cable routing to avoid trip hazards",
      "Verify grounding and protection devices before live operation",
    ],
    faqs: [
      {
        q: "Can it be customized for my event setup?",
        a: "Yes - share your input source, expected load, and required outputs so the configuration can match your workflow.",
      },
      {
        q: "Is 63A always required?",
        a: "Not always. The correct rating depends on your total load and power source. We can recommend a suitable configuration based on your event plan.",
      },
    ],
    tags: ["Power", "Distribution", "Safety"],
  },
] as const;

export function getLedAccessoryBySlug(slug: string): LedAccessoryProduct | null {
  return (ledAccessoriesCatalog as readonly LedAccessoryProduct[]).find((x) => x.slug === slug) ?? null;
}

export function getRelatedLedAccessories(currentSlug: string, limit = 3): LedAccessoryProduct[] {
  const current = (ledAccessoriesCatalog as readonly LedAccessoryProduct[]).find((x) => x.slug === currentSlug);
  const candidates = (ledAccessoriesCatalog as readonly LedAccessoryProduct[]).filter((x) => x.slug !== currentSlug);
  if (!current) return candidates.slice(0, limit);

  const normalizeTag = (tag: string) => tag.trim().toLowerCase();

  const tagStop = new Set([
    "accessory",
    "accessories",
    "led accessories",
    "led accessory",
    "led",
  ]);

  const extractPinCount = (value: string): number | null => {
    const match = value.match(/\b(\d{1,3})\b/);
    if (!match) return null;
    const parsed = Number(match[1]);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const tokenize = (value: string): Set<string> => {
    const stop = new Set([
      "a",
      "an",
      "and",
      "are",
      "as",
      "at",
      "be",
      "box",
      "cable",
      "cables",
      "case",
      "connector",
      "connectors",
      "distribution",
      "equipment",
      "event",
      "female",
      "fixing",
      "for",
      "flat",
      "frc",
      "hardware",
      "idc",
      "in",
      "installation",
      "led",
      "light",
      "logistics",
      "module",
      "modules",
      "of",
      "on",
      "or",
      "parts",
      "pin",
      "pins",
      "power",
      "protection",
      "ribbon",
      "service",
      "sound",
      "the",
      "to",
      "with",
      "work",
    ]);

    const tokens = new Set<string>();
    for (const raw of value.toLowerCase().match(/[a-z0-9]+/g) ?? []) {
      if (raw.length < 3) continue;
      if (stop.has(raw)) continue;
      tokens.add(raw);
    }
    return tokens;
  };

  const accessoryText = (p: LedAccessoryProduct) => {
    return [p.title, p.subtitle, p.quickFeatures.join(" "), p.tags.join(" ")].filter(Boolean).join(" ");
  };

  const currentTagsAll = current.tags.map(normalizeTag);
  const currentTags = new Set(currentTagsAll.filter((t) => !tagStop.has(t)));
  const currentTokens = tokenize(accessoryText(current));
  const currentPin = extractPinCount(current.title) ?? extractPinCount(current.tags.join(" "));

  const intersectionSize = (a: Set<string>, b: Set<string>) => {
    let count = 0;
    for (const x of a) if (b.has(x)) count++;
    return count;
  };

  return candidates
    .map((item) => {
      const itemTagsAll = item.tags.map(normalizeTag);
      const itemTags = new Set(itemTagsAll.filter((t) => !tagStop.has(t)));
      const sharedTags = intersectionSize(currentTags, itemTags);

      const itemTokens = tokenize(accessoryText(item));
      const sharedTokens = intersectionSize(currentTokens, itemTokens);
      const unionTokens = new Set([...currentTokens, ...itemTokens]).size || 1;
      const tokenJaccard = sharedTokens / unionTokens;

      const itemPin = extractPinCount(item.title) ?? extractPinCount(item.tags.join(" "));
      const pinMatch = currentPin !== null && itemPin !== null && currentPin === itemPin ? 1 : 0;

      // Weighted score: prefer same-type accessories via meaningful tags, then description similarity, then pin matches.
      const score = sharedTags * 20 + tokenJaccard * 20 + sharedTokens * 2 + pinMatch * 6;

      return { item, score, sharedTags, sharedTokens, pinMatch };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      if (b.sharedTokens !== a.sharedTokens) return b.sharedTokens - a.sharedTokens;
      if (b.pinMatch !== a.pinMatch) return b.pinMatch - a.pinMatch;
      return a.item.title.localeCompare(b.item.title);
    })
    .slice(0, limit)
    .map((x) => x.item);
}

/* =========================
   ACCESSORIES: POWER SUPPLY
========================= */

export type PowerSupplyProduct = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  cardPrice?: string;
  badge: string;

  quickFeatures: readonly string[];
  bestFor: readonly string[];

  keySpecs: readonly KeySpec[];

  selectionNotes: readonly string[];
  installationNotes: readonly string[];

  faqs: readonly { q: string; a: string }[];
};

export const powerSupplyCatalog: readonly PowerSupplyProduct[] = [
  {
    slug: "5v-20a-smps",
    title: "5V 20A DC Switch Mode Power Supply (SMPS)",
    subtitle:
      "Common cabinet PSU for LED modules and controller accessories. Stable 5V output with protection features for safer operation.",
    image: "/assets/led-display/power-supplies/5V-20A-DC-Switch-Mode-Power-Supply-(SMPS).webp",
    cardPrice: "Tk 1,500.00 (per unit, project offer dependent)",
    badge: "5V | 20A",
    quickFeatures: [
      "Stable regulated 5V DC output for LED cabinets",
      "Short circuit protection",
      "Overload protection",
      "Over-voltage protection",
      "Auto recovery after fault",
      "Mounting holes for fixed installation",
      "Aluminum body helps heat dissipation",
      "Low-noise / fanless design (depending on model)",
    ],
    bestFor: ["Small LED cabinets", "Controller/receiving card power", "Indoor signage"],
    keySpecs: [
      { k: "Output Voltage", v: "5V DC" },
      { k: "Output Current", v: "0-20A" },
      { k: "Rated Power", v: "Up to 100W (varies by model)" },
      { k: "Input Voltage", v: "100-120V / 200-240V +/-20% (auto-switch)" },
      { k: "Frequency", v: "50/60Hz" },
      { k: "Cooling", v: "Natural air cooling (fanless design)" },
    ],
    selectionNotes: [
      "Calculate PSU quantity and load based on cabinet and module count.",
      "Use thick DC cable and proper distribution planning to reduce voltage drop.",
      "For outdoor or unstable grid conditions, use surge protection and proper grounding.",
      "Low-quality PSU may increase ripple/noise and cause flicker or module damage.",
    ],
    installationNotes: [
      "Use proper fuse/MCB on the AC input side.",
      "Verify DC output polarity (V+ / V-) before powering on.",
      "Cable labeling makes future maintenance easier.",
      "Keep proper ventilation and airflow to reduce heat build-up.",
    ],
    faqs: [
      { q: "How many modules can a 5V 20A PSU run?", a: "It depends on module type, brightness target, and content. For safe planning, do load calculation and keep a power margin." },
      { q: "What should I do if the PSU overheats?", a: "Improve airflow, reduce load, check wiring and voltage drop, and ensure proper grounding." },
    ],
  },

  {
    slug: "g-energy-5v-30a",
    title: "G-Energy 5V 30A Power Supply",
    subtitle:
      "Higher-current 5V PSU for LED cabinets. Good balance for medium cabinet loads with standard protection features.",
    image: "/assets/led-display/power-supplies/G-Energy-5V-30A-Power-Supply.webp",
    cardPrice: "Tk 1,600.00 (per unit, project offer dependent)",
    badge: "5V | 30A",
    quickFeatures: [
      "Regulated 5V output for cabinet electronics",
      "Protection: short circuit / overload / over-voltage",
      "Auto recovery after fault",
      "Mounting holes for fixed installation",
      "Improved heat dissipation aluminum casing",
      "Suitable for LED signage and control equipment",
    ],
    bestFor: ["Medium LED cabinets", "Indoor fixed displays", "Rental screens (small/medium)"],
    keySpecs: [
      { k: "Output Voltage", v: "5V DC" },
      { k: "Output Current", v: "Up to 30A" },
      { k: "Cooling", v: "Natural air / fanless (model dependent)" },
      { k: "Use Case", v: "LED cabinets, signage, control equipment" },
    ],
    selectionNotes: [
      "Even with a 30A class PSU, keep margin for continuous load operation.",
      "Consider voltage drop when DC cable runs are long.",
      "For outdoor use, surge protection and grounding are essential.",
    ],
    installationNotes: [
      "A DC distribution board helps keep wiring neat and organized.",
      "Double-check V+ / V- polarity before startup.",
      "During commissioning, run a full-white load test.",
    ],
    faqs: [{ q: "How should I choose between 30A and 40A PSU?", a: "Choose based on module count, cabinet size, brightness target, and safety margin. For larger cabinets or higher load, 40A is usually safer." }],
  },

  {
    slug: "g-energy-5v-40a-200w",
    title: "G-Energy 5V 40A LED Display Power Supply",
    subtitle:
      "200W-class LED cabinet power supply. Suitable for higher load planning with stable operation and wide input range.",
    image: "/assets/led-display/power-supplies/G-Energy-5V-40A-LED-Display-Power-Supply.webp",
    cardPrice: "Tk 1,799.00 (per unit, project offer dependent)",
    badge: "5V | 40A | 200W",
    quickFeatures: [
      "High-current output for larger cabinet loads",
      "Wide input voltage planning (model dependent)",
      "Natural air convection cooling",
      "Protection for safer cabinet operation",
      "Stable performance for indoor & outdoor LED screens",
    ],
    bestFor: ["Large LED cabinets", "Outdoor cabinets", "High brightness setups"],
    keySpecs: [
      { k: "Output Power", v: "200W (max.)" },
      { k: "Input Voltage", v: "AC 100-240V, 50/60Hz" },
      { k: "Output Current", v: "0-40A" },
      { k: "Ripple & Noise", v: "<=150mV (model dependent)" },
      { k: "Efficiency", v: "Up to ~87% (model dependent)" },
      { k: "Cooling", v: "Natural air convection" },
    ],
    selectionNotes: [
      "For high-current PSU, design DC distribution correctly to reduce heat and voltage drop.",
      "For outdoor cabinets, grounding and surge protection are strongly recommended.",
      "Keeping spare PSU units helps reduce downtime.",
    ],
    installationNotes: [
      "Install PSU in an airflow-friendly location.",
      "Run high-load (full-white) test during commissioning.",
      "Use correct cable gauge; thin cable increases drop and heat.",
    ],
    faqs: [{ q: "Which PSU is better for outdoor LED cabinet?", a: "Outdoor cabinets usually have higher load and harsher conditions, so a higher-current PSU with proper grounding and surge protection is best practice." }],
  },
] as const;

export function getPowerSupplyBySlug(slug: string): PowerSupplyProduct | null {
  return (powerSupplyCatalog as readonly PowerSupplyProduct[]).find((x) => x.slug === slug) ?? null;
}

/* =========================
   ACCESSORIES: CONTROLLERS / PROCESSORS
========================= */

export type ControllerProduct = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  cardPrice?: string;

  badge: string;
  quickFeatures: readonly string[];

  bestFor: readonly string[];
  keySpecs: readonly KeySpec[];

  ioPorts: readonly string[];
  operationNotes: readonly string[];
  supportNotes: readonly string[];

  faqs: readonly { q: string; a: string }[];
};

export const controllerCatalog: ControllerProduct[] = [
  {
    slug: "huidu-hd-a3l",
    title: "Huidu HD A3L LED Controller",
    subtitle:
      "Entry-level asynchronous LED controller for small to medium signage. Wi-Fi/USB/LAN supported with built-in storage for offline playback.",
    image: "/assets/led-display/controllers/Huidu-HD-A3L-LED-Controller.webp",
    cardPrice: "Tk 12,000.00 (per unit, configuration & project)",

    badge: "Asynchronous LED Controller",
    quickFeatures: [
      "Entry-level asynchronous controller (small/medium signs)",
      "Wi-Fi + USB + LAN control (model dependent)",
      "Built-in storage for offline playback",
      "Supports full-color modules (indoor/outdoor)",
      "Compatible with HUB75 / HUB75E modules",
      "Stable 24/7 operation with low power consumption",
      "Huidu cloud platform supported (remote content)",
      "Easy setup via HDPlayer / mobile software",
    ],

    bestFor: ["Shop signage", "Advertising boards", "Indoor digital boards", "Small video wall projects"],

    keySpecs: [
      { k: "Controller Type", v: "Asynchronous LED Control Card" },
      { k: "Max Loading Capacity", v: "320 x 256 pixels (single card)" },
      { k: "Supported Module Types", v: "HUB75 / HUB75E (Indoor & Outdoor)" },
      { k: "Storage Capacity", v: "4GB On-board Storage" },
      { k: "Communication Ports", v: "Ethernet / USB / Wi-Fi (model dependent)" },
      { k: "Supported Scan Types", v: "Static / 1/2 / 1/4 / 1/8 / 1/16 / 1/32" },
      { k: "Power Supply", v: "DC 5V" },
      { k: "Working Temperature", v: "-20-C ~ +70-C" },
      { k: "Certifications", v: "CE / RoHS / EMC" },
    ],

    ioPorts: ["Control: LAN / Wi-Fi / USB (Cloud optional)", "Media/Content: USB supported (model dependent)", "Module: HUB75/HUB75E output"],

    operationNotes: [
      "Wrong mapping or scan settings may cause shifted, mirrored, or line issues.",
      "Good CAT6 wiring and grounding help reduce flicker.",
      "During commissioning, use test patterns to verify pixels and rows.",
    ],

    supportNotes: [
      "BOQ-based recommendation according to project needs.",
      "Controller configuration and receiving-card mapping guidance.",
      "Spare planning and after-sales support.",
    ],

    faqs: [
      { q: "Does A3L work for both indoor and outdoor modules?", a: "Yes. If the module is HUB75/HUB75E compatible, A3L can be used for both indoor and outdoor applications." },
      { q: "How can I update content without Wi-Fi?", a: "You can update content through LAN or USB (model dependent)." },
    ],
  },

  {
    slug: "huidu-hd-a5l",
    title: "Huidu HD A5L LED Controller",
    subtitle:
      "Advanced asynchronous controller with higher loading and smoother playback. Suitable for medium signage and larger program areas.",
    image: "/assets/led-display/controllers/Huidu-HD-A5L-LED-Controller.webp",
    cardPrice: "Tk 20,000.00 (per unit, configuration & project)",

    badge: "Asynchronous Full-Color Controller",
    quickFeatures: [
      "Higher loading capacity than A3L",
      "Built-in storage (bigger playlists/videos)",
      "Wi-Fi / USB / LAN control + optional 4G cloud",
      "Full HD 1080p video decoding support",
      "Compatible with HUB75/HUB75E modules",
      "Multi-content areas (text/video/image)",
      "Low power consumption for 24/7",
    ],

    bestFor: ["Medium advertising boards", "Indoor/outdoor signage", "Retail displays", "Commercial LED boards"],

    keySpecs: [
      { k: "Controller Type", v: "Asynchronous Full-Color LED Control Card" },
      { k: "Max Loading Capacity", v: "512 x 256 pixels (single card)" },
      { k: "Supported LED Modules", v: "HUB75 / HUB75E indoor & outdoor modules" },
      { k: "Storage Capacity", v: "8GB Built-in Storage" },
      { k: "Communication Methods", v: "LAN / Wi-Fi / USB / 4G (optional)" },
      { k: "Video Decoding", v: "1080p hardware decoding" },
      { k: "Power Supply", v: "DC 5V" },
      { k: "Working Temperature", v: "-20-C ~ +70-C" },
      { k: "Certifications", v: "CE / RoHS / EMC" },
    ],

    ioPorts: ["Control: LAN / Wi-Fi / USB / optional 4G", "Media: USB supported", "Module: HUB75/HUB75E output"],

    operationNotes: [
      "Proper multi-area programming gives cleaner signage output.",
      "Stable LAN keeps content updates smooth.",
      "If scan/mapping mismatches occur, first check module scan type and config file.",
    ],

    supportNotes: ["Controller selection + setup support", "Mapping + calibration guidance", "Spare planning for uptime"],

    faqs: [{ q: "Is A5L better for larger signage?", a: "Yes. A5L supports higher loading capacity than A3L, so it is usually a better choice for medium signage and boards." }],
  },

  {
    slug: "huidu-hd-a6l",
    title: "Huidu HD A6L LED Controller",
    subtitle:
      "High-capacity asynchronous controller for larger content & bigger screens. Stable 24/7 operation with multi-window programming.",
    image: "/assets/led-display/controllers/Huidu-HD-A6L-LED-Controller.webp",

    badge: "High Capacity Asynchronous Controller",
    quickFeatures: [
      "Massive loading capacity (large screens)",
      "Built-in 16GB storage (eMMC)",
      "Cloud control + Wi-Fi/LAN/USB + optional 4G",
      "Full HD 1080p hardware decoding",
      "Multi-window layout (up to 6 areas)",
      "Ambient light sensor support (auto brightness)",
      "Works with HUB75/HUB75E indoor & outdoor modules",
    ],

    bestFor: ["Large shop signage", "Outdoor commercial boards", "Big indoor digital walls", "Long-run 24/7 displays"],

    keySpecs: [
      { k: "Controller Type", v: "Asynchronous Full-Color LED Control Card" },
      { k: "Max Loading Capacity", v: "896 x 512 pixels (high load)" },
      { k: "Internal Storage", v: "16GB eMMC Storage" },
      { k: "Communication", v: "LAN / Wi-Fi / USB / Cloud / optional 4G" },
      { k: "Working Voltage", v: "DC 5V" },
      { k: "Operating Temperature", v: "-20-C ~ +70-C" },
      { k: "Certifications", v: "CE / RoHS / EMC" },
    ],

    ioPorts: ["Control: LAN / Wi-Fi / USB / Cloud / optional 4G", "Brightness: Sensor supported", "Module: HUB75/HUB75E output"],

    operationNotes: [
      "For large screens, correct power distribution and grounding are critical.",
      "Content scheduling helps smooth daily operation.",
      "Good network stability and cable quality reduce flicker.",
    ],

    supportNotes: ["BOQ-based quotation + config support", "Calibration + mapping guidance", "After-sales service & spares planning"],

    faqs: [{ q: "Is A6L suitable for outdoor boards?", a: "Yes. With proper cabinet and module compatibility, A6L performs well for larger outdoor boards." }],
  },

  {
    slug: "huidu-vp410",
    title: "Huidu HD VP-410 LED Video Processor",
    subtitle:
      "3-in-1 video processor for medium LED screens. Multiple inputs with scaling and stable output over Ethernet ports.",
    image: "/assets/led-display/controllers/Huidu-HD-VP-410-LED-Video-Processor.webp",
    cardPrice: "Tk 31,500.00 (per unit, configuration & project)",

    badge: "LED Video Processor (Scaler/Switcher)",
    quickFeatures: [
      "Up to ~2.3 million pixels loading (medium screens)",
      "4x Gigabit Ethernet outputs for stable output",
      "Multiple inputs (HDMI/DVI/VGA/CVBS/USB)",
      "PIP/POP supported",
      "Seamless switching (no blackout feel)",
      "Built-in USB media playback",
      "Front panel easy operation",
      "Stable 24/7 performance",
    ],

    bestFor: ["Events & conference rooms", "Medium LED walls", "Stage display", "Live input switching"],

    keySpecs: [
      { k: "Max Loading Capacity", v: "~ 2.3 million pixels" },
      { k: "Max Width", v: "3840 px" },
      { k: "Max Height", v: "1920 px" },
      { k: "Input Ports", v: "HDMI / DVI / VGA / CVBS / USB Media" },
      { k: "Output Ports", v: "4 x Gigabit Ethernet" },
      { k: "PIP / POP", v: "Supported" },
      { k: "Working Voltage", v: "AC 100-240V, 50/60Hz" },
    ],

    ioPorts: ["Inputs: HDMI / DVI / VGA / CVBS / USB", "Outputs: 4x Ethernet", "Control: Front panel + software"],

    operationNotes: [
      "For live programs, test input switching before final setup.",
      "Correct scaling and fit produce sharper images.",
      "Good CAT6 and clean power improve stability.",
    ],

    supportNotes: ["Event/rental setup support", "Signal planning + cable guidance", "On-site commissioning available"],

    faqs: [{ q: "Is VP-410 good for live events?", a: "Yes. Its multi-input support and scaling make it suitable for events and conferences." }],
  },

  {
    slug: "huidu-vp620",
    title: "Huidu HD VP620 LED Video Processor",
    subtitle:
      "Professional processor for indoor/outdoor video walls with multiple inputs and auto-resolution scaling for clean output.",
    image: "/assets/led-display/controllers/Huidu-HD-VP620-LED-Video-Processor.webp",
    cardPrice: "Tk 38,000.00 (per unit, configuration & project)",

    badge: "Video Processor (Multi-input)",
    quickFeatures: [
      "High-capacity processor (~2.3 million pixels)",
      "4x Ethernet outputs (medium to large screens)",
      "Multiple inputs: HDMI/DVI/VGA/USB media",
      "Auto-resolution scaling",
      "Seamless switching",
      "Adjustable image parameters",
      "Reliable for indoor/outdoor LED",
    ],

    bestFor: ["Stage screens", "Conference displays", "Indoor video walls", "Retail signage / billboards"],

    keySpecs: [
      { k: "Max Loading Capacity", v: "~ 2.3 million pixels" },
      { k: "Max Width", v: "3840 px" },
      { k: "Max Height", v: "2560 px" },
      { k: "Input Ports", v: "HDMI x2, DVI x1, VGA x1, USB Media" },
      { k: "Output Ports", v: "4 x Gigabit Ethernet" },
      { k: "Operating Voltage", v: "AC 100-240V, 50/60Hz" },
    ],

    ioPorts: ["Inputs: HDMI/DVI/VGA/USB", "Outputs: 4x Ethernet", "Control: Front panel + LAN/USB"],

    operationNotes: [
      "Set presets according to the input source.",
      "Tune color and sharpness and test with real content.",
      "For long cable runs, use quality CAT6 and proper grounding.",
    ],

    supportNotes: ["System integration support", "On-site setup assistance", "After-sales troubleshooting support"],

    faqs: [{ q: "VP620 vs VP410 - when should I choose which one?", a: "VP620 generally provides more professional control and fitting options. Final choice should be based on project size and signal requirements." }],
  },

  {
    slug: "huidu-vp820",
    title: "Huidu HD VP820 LED Video Processor",
    subtitle:
      "High-end processor for very large LED walls. More Ethernet outputs and professional scaling with PIP/POP.",
    image: "/assets/led-display/controllers/Huidu-HD-VP820-LED-Video-Processor.webp",
    cardPrice: "Tk 31,500",

    badge: "High-End Video Processor",
    quickFeatures: [
      "Ultra-high loading capacity (~5.2 million pixels)",
      "8x Ethernet output ports",
      "Multiple inputs + USB playback",
      "Professional PIP/POP",
      "Seamless switching",
      "High-quality scaling engine",
      "Best for large events & big screens",
    ],

    bestFor: ["Large events & concert walls", "Auditorium/stage", "Large outdoor LED", "High-end rental screens"],

    keySpecs: [
      { k: "Max Loading Capacity", v: "~ 5.2 million pixels" },
      { k: "Max Width", v: "8000 px" },
      { k: "Max Height", v: "4096 px" },
      { k: "Output Ports", v: "8 x Gigabit Ethernet" },
      { k: "PIP / POP", v: "Supported" },
      { k: "Operating Voltage", v: "AC 100-240V, 50/60Hz" },
    ],

    ioPorts: ["Inputs: HDMI/DVI/VGA/CVBS/USB", "Outputs: 8x Ethernet", "Control: Front panel + USB/LAN"],

    operationNotes: [
      "For large screens, finalize EDID and resolution planning in advance.",
      "Keep PIP/POP layout presets prepared.",
      "Keep backup source cables for safer operation.",
    ],

    supportNotes: ["Large project signal planning", "On-site commissioning & presets setup", "After-sales support & spares guidance"],

    faqs: [{ q: "Who is VP820 best for?", a: "VP820 is best for users running large LED walls or stage LED systems." }],
  },

  {
    slug: "huidu-vp210h",
    title: "Huidu HD-VP210H 3-in-1 LED Video Processor",
    subtitle:
      "3-in-1 solution: sender + scaler + multi-input switcher. Great for indoor/outdoor control, events and studio setups.",
    image: "/assets/led-display/controllers/Huidu-HD-VP820-LED-Video-Processor.webp",
    cardPrice: "Tk 18,000.00 (per unit, configuration & project)",

    badge: "3-in-1 Sender + Scaler + Switcher",
    quickFeatures: [
      "3-in-1: Sender + Scaler + Multi-input switcher",
      "Multiple inputs: HDMI/DVI/VGA/USB",
      "~ 1.3 million pixel loading capacity",
      "Independent image scaling",
      "Dual Ethernet output",
      "Front panel control for events",
      "Ideal for fixed displays & stage backdrops",
    ],

    bestFor: ["Events & studios", "Indoor/outdoor fixed LED", "Stage backdrop", "Live switching + scaling needs"],

    keySpecs: [
      { k: "Main Function", v: "3-in-1 sender + processor + switcher" },
      { k: "Max Loading Capacity", v: "~ 1.3 million pixels" },
      { k: "Output Ports", v: "2 x Gigabit Ethernet" },
      { k: "Operating Voltage", v: "AC 100-240V, 50/60Hz" },
    ],

    ioPorts: ["Inputs: HDMI/DVI/VGA/USB", "Outputs: 2x Ethernet", "Control: LAN/USB + front panel"],

    operationNotes: [
      "Before events, test input switching and scaling.",
      "If resolution mismatches occur, check fit mode and EDID.",
      "Keep backup source cables for safer operation.",
    ],

    supportNotes: ["Rental/event setup support", "Signal chain planning", "After-sales troubleshooting"],

    faqs: [{ q: "Who is VP210H best for?", a: "It is ideal for users who need sender, scaler, and switcher in one device - especially for events and stage setups." }],
  },
  {
    slug: "huidu-hd-vp1220-led-video-processor",
    title: "Huidu HD-VP1220 LED Video Processor",
    subtitle:
      "High-capacity LED video processor for large indoor video walls, outdoor branding screens, and stage productions where cleaner scaling, stable signal switching, and practical pixel loading matter.",
    image: "/assets/led-display/controllers/Huidu-HD-VP620-LED-Video-Processor.webp",
    cardPrice: "Tk 48,000.00 (per unit, configuration & project)",

    badge: "Large Screen Video Processor",
    quickFeatures: [
      "Higher loading capacity for medium-to-large LED screen projects",
      "Multiple input handling for camera, laptop, media player, and presentation workflows",
      "Cleaner image scaling for indoor video walls and stage screen fitting",
      "Stable Ethernet output planning for practical cabinet distribution",
      "Useful for conference, event, retail, and commercial display applications",
      "Professional switching workflow with easier setup for mixed AV sources",
      "Better fit for projects needing more headroom than entry-level processors",
    ],

    bestFor: ["Large video walls", "Conference LED screens", "Stage events", "Commercial display projects"],

    keySpecs: [
      { k: "Controller Type", v: "LED Video Processor / Multi-input Scaler" },
      { k: "Max Loading Capacity", v: "~ 3.9 million pixels" },
      { k: "Max Width", v: "3840 px" },
      { k: "Max Height", v: "2160 px" },
      { k: "Input Ports", v: "HDMI / DVI / VGA / USB Media (model workflow dependent)" },
      { k: "Output Ports", v: "6 x Gigabit Ethernet" },
      { k: "Control Method", v: "Front panel + software control" },
      { k: "Operating Voltage", v: "AC 100-240V, 50/60Hz" },
      { k: "Use Case", v: "Large indoor walls, stage visuals, showroom and corporate LED displays" },
    ],

    ioPorts: [
      "Inputs: HDMI / DVI / VGA / USB media playback",
      "Outputs: 6x Gigabit Ethernet for cabinet loading",
      "Control: Front panel buttons + software control workflow",
    ],

    operationNotes: [
      "Confirm target resolution and cabinet loading plan before final processor selection.",
      "Use quality signal cables and proper grounding to keep switching and playback stable.",
      "Test scaling, fit mode, and source switching with real content before handover.",
    ],

    supportNotes: [
      "Processor selection support based on real screen resolution and usage type.",
      "Signal planning, scaling setup, and commissioning guidance available.",
      "After-sales troubleshooting and spare planning support for uptime-critical projects.",
    ],

    faqs: [
      {
        q: "When should I choose VP1220 instead of a smaller processor?",
        a: "Choose VP1220 when your LED project needs higher loading capacity, more source flexibility, and smoother fitting for larger indoor walls, stage visuals, or commercial LED screens.",
      },
      {
        q: "Is VP1220 suitable for conference and event use?",
        a: "Yes. It is well suited for conference, stage, and mixed-source event workflows where clean scaling and stable switching matter.",
      },
    ],
  },
  {
    slug: "huidu-hd-vp1620-led-video-processor",
    title: "Huidu HD-VP1620 LED Video Processor",
    subtitle:
      "Professional high-load LED video processor for concert walls, large stage setups, and premium commercial displays where stronger output capacity, flexible input handling, and cleaner visual control are required.",
    image: "/assets/led-display/controllers/Huidu-HD-VP820-LED-Video-Processor.webp",
    cardPrice: "Tk 62,000.00 (per unit, configuration & project)",

    badge: "High Load Video Processor",
    quickFeatures: [
      "High pixel loading support for large-format LED screen deployments",
      "Multiple source input workflow for live events, presentations, and mixed media playback",
      "Professional scaling and screen fitting for wider LED walls and stage backdrops",
      "More output headroom for large cabinet counts and higher-resolution projects",
      "Suitable for concert, auditorium, outdoor campaign, and premium display use",
      "Cleaner switching workflow for operators managing multiple live sources",
      "Practical choice for projects that need stronger processor capacity and expansion room",
    ],

    bestFor: ["Concert LED walls", "Auditorium screens", "Large outdoor displays", "Premium rental projects"],

    keySpecs: [
      { k: "Controller Type", v: "High-load LED Video Processor / Scaler" },
      { k: "Max Loading Capacity", v: "~ 5.2 million pixels" },
      { k: "Max Width", v: "8000 px" },
      { k: "Max Height", v: "4096 px" },
      { k: "Input Ports", v: "HDMI / DVI / VGA / CVBS / USB Media" },
      { k: "Output Ports", v: "8 x Gigabit Ethernet" },
      { k: "PIP / POP", v: "Supported" },
      { k: "Operating Voltage", v: "AC 100-240V, 50/60Hz" },
      { k: "Use Case", v: "Large stage walls, auditorium visuals, outdoor campaigns, premium rental screens" },
    ],

    ioPorts: [
      "Inputs: HDMI / DVI / VGA / CVBS / USB media",
      "Outputs: 8x Gigabit Ethernet for large cabinet loading",
      "Control: Front panel + software workflow for switching and scaling",
    ],

    operationNotes: [
      "Finalize EDID, source resolution, and processor layout before event-day operation.",
      "Keep backup signal cables and tested presets ready for large-screen live workflows.",
      "Check cabinet loading balance and scaling presets before final commissioning.",
    ],

    supportNotes: [
      "Large-screen processor selection support based on project resolution and content workflow.",
      "On-site commissioning, scaling setup, and signal planning support available.",
      "Spare and after-sales guidance for event, rental, and uptime-focused LED systems.",
    ],

    faqs: [
      {
        q: "Who should choose VP1620?",
        a: "VP1620 is a strong fit for users running large stage walls, auditorium visuals, outdoor campaigns, or premium rental LED setups that need high output capacity and stable source handling.",
      },
      {
        q: "Is VP1620 suitable for rental and live event use?",
        a: "Yes. It is practical for rental and live event workflows where large LED walls, multiple sources, and reliable switching performance are important.",
      },
    ],
  },
];

export function getControllerBySlug(slug: string): ControllerProduct | null {
  return controllerCatalog.find((x) => x.slug === slug) ?? null;
}



