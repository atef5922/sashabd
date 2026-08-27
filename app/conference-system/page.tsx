import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import FaqAccordion from "@/components/common/FaqAccordion";
import { buildWhatsAppHref } from "@/lib/contact";
import { formatBdtAmount } from "@/lib/price";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  conferenceSystemCatalog,
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceCatalogIntegrityReport,
  getConferenceProductAvailabilityLabel,
  getConferenceProductPricePresentation,
  type ConferenceProduct,
  type ConferenceProductType,
} from "./catalog";
import { conferenceBrandConfigs, hasConferenceBrandProducts } from "./taxonomy";
import ConferenceProductExplorer from "./ConferenceProductExplorer";
import { buildConferenceExplorerProducts } from "./conferenceExplorerData";
import { balanceConferenceProductsByBrand, CONFERENCE_INITIAL_PRODUCT_COUNT } from "./conferenceExplorerOrder";
import { conferenceRepresentativeConfigurations } from "./conferenceProjects";
import { CONFERENCE_ENGINEER_WHATSAPP_MESSAGE } from "./conferenceInquiry";

const PAGE_TITLE = "Conference System Price in Bangladesh 2026";
const META_TITLE = `${PAGE_TITLE} | Sasha`;
const conferenceEngineerWhatsAppHref = buildWhatsAppHref(CONFERENCE_ENGINEER_WHATSAPP_MESSAGE);

const compactInformationSectionClass =
  "mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6";

const conferenceSectionTitleClass =
  "!text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:!text-[22px]";

const deferredContentStyle = {
  contentVisibility: "auto" as const,
  containIntrinsicSize: "auto 520px",
};

type ConferenceChooserIcon = "wired" | "wireless" | "digital" | "paperless" | "hybrid" | "small" | "medium" | "large" | "hall";

const conferenceSystemChooserCards: ReadonlyArray<{
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: ConferenceChooserIcon;
  imagePosition?: string;
}> = [
  {
    title: "Wired Conference System",
    description: "Stable, secure and interference-free discussion for professional meetings.",
    cta: "View Wired Systems",
    href: "/conference-system/wired-conference-system/",
    image: "/images/conference_system_projects/project1.webp",
    imageAlt: "Wired conference microphones installed around a boardroom table",
    icon: "wired",
    imagePosition: "center 62%",
  },
  {
    title: "Wireless Conference System",
    description: "Flexible setup with easy installation for rooms with changing layouts.",
    cta: "View Wireless Systems",
    href: "/conference-system/wireless-conference-system/",
    image: "/images/PA/Conference-Discussion-System.webp",
    imageAlt: "Professional conference microphones in a modern meeting room",
    icon: "wireless",
    imagePosition: "center 58%",
  },
  {
    title: "Digital Conference System",
    description: "Advanced digital technology with superior audio quality and control.",
    cta: "View Digital Systems",
    href: "/conference-system/digital-conference-system/",
    image: "/images/conference_system_projects/project2.webp",
    imageAlt: "Digital conference system with microphones and meeting displays",
    icon: "digital",
    imagePosition: "center 55%",
  },
  {
    title: "Video Conference & Hybrid",
    description: "Integrated audio, video and presentation support for hybrid meetings.",
    cta: "View Hybrid Solutions",
    href: "/conference-system/video-conference-system/",
    image: "/images/podium/Auditorium-Digital-Podium.webp",
    imageAlt: "Integrated digital presentation and video conference room solution",
    icon: "hybrid",
    imagePosition: "center 48%",
  },
  {
    title: "Paperless Conference System",
    description: "Paperless meeting systems for agenda, document and meeting-management workflows.",
    cta: "View Paperless Systems",
    href: "/conference-system/paperless-conference-system/",
    image: "/images/conference_system_products/cmx_products/CMX-MC-5800E-Paperless-Conference-Management-Server-300x300.webp",
    imageAlt: "CMX paperless conference management server for agenda and document workflows",
    icon: "paperless",
  },
];

const conferenceRoomSizeCards: ReadonlyArray<{
  capacity: string;
  room: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: ConferenceChooserIcon;
  imagePosition?: string;
}> = [
  {
    capacity: "6 – 12",
    room: "Small Boardroom",
    description: "Ideal for director rooms and small meetings.",
    href: "/contact/?project=conference-system&room_size=6-12",
    image: "/images/conference_system_projects/project1.webp",
    imageAlt: "Small boardroom prepared for a conference meeting",
    icon: "small",
    imagePosition: "center 58%",
  },
  {
    capacity: "12 – 30",
    room: "Medium Meeting Room",
    description: "Perfect for team meetings and training rooms.",
    href: "/contact/?project=conference-system&room_size=12-30",
    image: "/images/conference_system_projects/project2.webp",
    imageAlt: "Medium meeting and training room with conference microphones",
    icon: "medium",
    imagePosition: "center 55%",
  },
  {
    capacity: "30 – 50",
    room: "Large Conference Room",
    description: "Suitable for official meetings and seminars.",
    href: "/contact/?project=conference-system&room_size=30-50",
    image: "/images/conference_landing/hero_banner.webp",
    imageAlt: "Large modern conference room with tabletop microphones",
    icon: "large",
    imagePosition: "72% center",
  },
  {
    capacity: "50+",
    room: "Conference Hall",
    description: "Designed for conferences, events and large gatherings.",
    href: "/contact/?project=conference-system&room_size=50-plus",
    image: "/images/conference_system_projects/project3.webp",
    imageAlt: "Large conference hall with delegate microphones and seating",
    icon: "hall",
    imagePosition: "center 50%",
  },
];

const popularConferencePackages = [
  {
    badge: "Most Popular",
    badgeIcon: "★",
    title: "10 Person",
    subtitle: "Boardroom Package",
    description: "Perfect for small boardrooms and executive meetings",
    items: ["1 Chairman Unit", "9 Delegate Units", "1 Control Unit", "Cables & Accessories"],
    priceEyebrow: "Estimated Equipment Budget",
    price: "৳ 185,000",
    priceNote: "Indicative equipment estimate",
    cta: "Get Package BOQ",
    href: "/contact/?project=conference-system&package=10-person-boardroom",
    image: "/images/conference_system_products/bosch_products/Bosch-CCS-1000-D-Digital-Discussion-System.webp",
    imageAlt: "Ten person conference system boardroom package",
    badgeClass: "bg-[#f1530a]",
    priceClass: "text-[#f1530a]",
    buttonClass: "bg-[#f1530a] hover:bg-[#d94405]",
  },
  {
    badge: "Best for Teams",
    badgeIcon: "✣",
    title: "20 Person",
    subtitle: "Meeting Room Package",
    description: "Ideal for team meetings and training sessions",
    items: ["1 Chairman Unit", "19 Delegate Units", "1 Control Unit", "Cables & Accessories"],
    priceEyebrow: "Estimated Equipment Budget",
    price: "৳ 355,000",
    priceNote: "Indicative equipment estimate",
    cta: "Get Package BOQ",
    href: "/contact/?project=conference-system&package=20-person-meeting-room",
    image: "/images/conference_system_products/bosch_products/Bosch CCS-900 Wired Ultro Discussion Conference System.jpg",
    imageAlt: "Twenty person conference system meeting room package",
    badgeClass: "bg-[#075bc5]",
    priceClass: "text-[#f1530a]",
    buttonClass: "bg-[#071936] hover:bg-[#102b52]",
  },
  {
    badge: "For Official Use",
    badgeIcon: "⌘",
    title: "30 Person",
    subtitle: "Government Package",
    description: "Recommended for government and official meeting rooms",
    items: ["1 Chairman Unit", "29 Delegate Units", "1 Central Control Unit", "Cables, DSP & Accessories"],
    priceEyebrow: "Estimated Equipment Budget",
    price: "৳ 595,000",
    priceNote: "Indicative equipment estimate",
    cta: "Get Package BOQ",
    href: "/contact/?project=conference-system&package=30-person-government",
    image: "/images/conference_system_products/cmx_products/CMX-CS-700A-Conference-System-with-Discussion-Units-768x768.webp",
    imageAlt: "Thirty person conference system government package",
    badgeClass: "bg-[#149447]",
    priceClass: "text-[#f1530a]",
    buttonClass: "bg-[#14833f] hover:bg-[#0d6c33]",
  },
  {
    badge: "For Large Venues",
    badgeIcon: "♙",
    title: "50+ Person",
    subtitle: "Conference Hall Package",
    description: "Designed for conferences, seminars and large events",
    items: ["2 Chairman Units", "50+ Delegate Units", "Digital Control Unit", "DSP, Amplifier & Accessories"],
    priceEyebrow: "Custom Solution",
    price: "Get Custom Quotation",
    priceNote: "",
    cta: "Get Package BOQ",
    href: "/contact/?project=conference-system&package=50-plus-conference-hall",
    image: "/images/conference_system_products/cmx_products/CMX-CS-100-S101-S102-Digital-Conference-System-300x300.webp",
    imageAlt: "Custom conference hall system package for fifty or more participants",
    badgeClass: "bg-[#7131bd]",
    priceClass: "text-[#7131bd]",
    buttonClass: "bg-[#7131bd] hover:bg-[#5c249e]",
  },
] as const;

function getPublishedConferencePriceRange(matchProduct: (product: ConferenceProduct) => boolean) {
  const bounds = conferenceSystemCatalog
    .filter(matchProduct)
    .flatMap((product) => {
      if (product.price.type === "fixed") return [[product.price.amount, product.price.amount] as const];
      if (product.price.type === "range") return [[product.price.min, product.price.max] as const];
      return [];
    });

  if (!bounds.length) return { price: "Request a Quote", pricedProductCount: 0 };

  const minimum = Math.min(...bounds.map(([min]) => min));
  const maximum = Math.max(...bounds.map(([, max]) => max));
  return {
    price: minimum === maximum
      ? formatBdtAmount(minimum)
      : `${formatBdtAmount(minimum)} – ${formatBdtAmount(maximum)}`,
    pricedProductCount: bounds.length,
  };
}

const conferencePriceGuideItems = [
  {
    title: "Chairman Unit",
    href: "/conference-system/chairman-unit/",
    image: "/images/conference_system_products/spon_products/LCM-6013CV-L.webp",
    imageAlt: "Conference system chairman unit",
    matchProduct: (product: ConferenceProduct) =>
      product.productTypes.includes("chairman-unit") && !product.productTypes.includes("package"),
  },
  {
    title: "Delegate Unit",
    href: "/conference-system/delegate-unit/",
    image: "/images/Conference%20system/SPON%20LCM-6013DV-L%20Digital%20Conference%20Delegate%20Unit.webp",
    imageAlt: "Conference system delegate unit",
    matchProduct: (product: ConferenceProduct) =>
      product.productTypes.includes("delegate-unit") && !product.productTypes.includes("package"),
  },
  {
    title: "Control Unit",
    href: "/conference-system/control-unit/",
    image: "/images/Conference%20system/SPON%20LCM-6010%20Digital%20Conference%20System%20Central%20Unit%20front.png",
    imageAlt: "Conference system central control unit",
    matchProduct: (product: ConferenceProduct) =>
      product.productTypes.includes("control-unit") && !product.productTypes.includes("package"),
  },
  {
    title: "Wireless Unit",
    href: "/conference-system/wireless-conference-system/",
    image: "/images/Conference%20system/SPON%20LCS-5252D%20Wireless%20Conference%20Delegate%20Unit.webp",
    imageAlt: "Wireless conference system unit",
    matchProduct: (product: ConferenceProduct) =>
      product.connection === "wireless" && !product.productTypes.includes("package"),
  },
  {
    title: "DSP / Processor",
    href: "/conference-system/conference-dsp/",
    image: "/images/Conference%20system/SPON%20SAP-F88E%208x8%20Digital%20Audio%20Processor%20with%20DSP.png",
    imageAlt: "Conference system DSP audio processor",
    matchProduct: (product: ConferenceProduct) =>
      (product.productTypes.includes("dsp") || product.productTypes.includes("processor")) &&
      !product.productTypes.includes("package"),
  },
  {
    title: "Complete System",
    href: "/conference-system/complete-package/",
    image: "/images/conference_system_products/bosch_products/Bosch-CCS-1000-D-Digital-Discussion-System.webp",
    imageAlt: "Complete conference system package",
    matchProduct: (product: ConferenceProduct) => product.productTypes.includes("package"),
  },
].map(({ matchProduct, ...item }) => ({
  ...item,
  ...getPublishedConferencePriceRange(matchProduct),
}));

type HybridIntegrationIcon = "camera" | "display" | "platform";

const hybridIntegrationSteps = [
  {
    title: "Conference Microphone",
    subtitle: "Wired / Wireless / Digital",
    image: "/images/conference_system_products/spon_products/LCM-6013CV-L.webp",
    imageAlt: "Digital conference microphone",
  },
  {
    title: "DSP / Audio Processor",
    subtitle: "Audio Processing & Control",
    image: "/images/Conference%20system/SPON%20SAP-F88E%208x8%20Digital%20Audio%20Processor%20with%20DSP.png",
    imageAlt: "Conference room DSP audio processor",
  },
  {
    title: "PTZ Camera",
    subtitle: "Auto Tracking Support",
    icon: "camera" as const,
  },
  {
    title: "Display / TV",
    subtitle: "HD Display for Presentations",
    icon: "display" as const,
  },
  {
    title: "Online Meeting Platform",
    subtitle: "Zoom, Teams & Google Meet",
    icon: "platform" as const,
  },
] as const;

type ChooseSashaIcon =
  | "consultation"
  | "boq"
  | "installation"
  | "dsp"
  | "support"
  | "expansion";

const chooseSashaCards = [
  {
    title: "Engineering-Based Design",
    icon: "consultation" as const,
    description: "Expert room analysis, equipment planning, and performance-focused system design.",
  },
  {
    title: "BOQ & Tender Support",
    icon: "boq" as const,
    description: "Complete BOQ, technical specifications, and documentation for tender projects.",
  },
  {
    title: "Professional Installation",
    icon: "installation" as const,
    description: "Neat installation, configuration, testing, and commissioning by an experienced team.",
  },
  {
    title: "Complete AV Integration",
    icon: "dsp" as const,
    description: "Conference microphones with DSP, PA, display, camera, and control integration.",
  },
  {
    title: "After Sales Support",
    icon: "support" as const,
    description: "Bangladesh-based technical support, project follow-up, and warranty guidance where applicable.",
  },
  {
    title: "Expansion & Spare Support",
    icon: "expansion" as const,
    description: "Practical expansion planning and genuine spare-parts availability guidance.",
  },
] as const;

type ConferenceBrandCard = {
  slug: string;
  title: string;
  category: string;
  description: string;
  support: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoMaxHeightClassName?: string;
  url: string;
  features: readonly string[];
};

const conferenceBrandCards: ConferenceBrandCard[] = [
  {
    slug: "bosch",
    title: "Bosch",
    category: "Professional Conference & Voice Communication Systems",
    description:
      "Browse the Bosch conference products currently listed in our verified catalog for professional discussion and meeting-room communication projects.",
    support: "Product selection, BOQ preparation, installation planning, and warranty assistance.",
    logoSrc: "/images/brands/audio/bosch-logo.svg",
    logoWidth: 102,
    logoHeight: 22,
    url: "/conference-system/brands/bosch/",
    features: ["Discussion & Digital Systems", "Delegate & Chairman Units", "Control Units & Accessories", "Local Technical Support"],
  },
  {
    slug: "toa",
    title: "TOA",
    category: "Public Address & Meeting Audio Systems",
    description:
      "Explore the TOA meeting-audio products available in our conference catalog, including compatible microphone, control, amplification, and speaker solutions.",
    support: "System compatibility guidance, product supply, installation support, and warranty assistance.",
    logoSrc: "/images/brands/audio/toa-logo.png",
    logoWidth: 90,
    logoHeight: 27,
    url: "/conference-system/brands/toa/",
    features: ["Infrared & Digital Systems", "Wired & Wireless Solutions", "Complete Conference Systems", "Local Technical Support"],
  },
  {
    slug: "spon",
    title: "SPON",
    category: "Digital Conference Microphone & Control Systems",
    description:
      "View SPON digital and network conference products from our catalog, including control units, DSP processors, amplifiers, and meeting-room audio equipment.",
    support: "Room-based system design, BOQ preparation, installation, commissioning, and after-sales guidance.",
    logoSrc: "/images/brands/audio/spon.svg",
    logoWidth: 163,
    logoHeight: 33,
    url: "/conference-system/brands/spon/",
    features: ["Digital Conference Systems", "DSP & Conference Controller", "Camera Tracking Solutions", "Technical Support"],
  },
  {
    slug: "cmx",
    title: "CMX",
    category: "Wireless & Digital Discussion Systems",
    description:
      "Browse CMX wired, wireless, and paperless conference products listed in our catalog for boardrooms, council chambers, and flexible meeting spaces.",
    support: "Product selection, microphone quantity planning, installation support, and after-sales guidance.",
    logoSrc: "/images/brands/audio/cmx-logo.png",
    logoWidth: 95,
    logoHeight: 95,
    logoMaxHeightClassName: "max-h-9 md:max-h-10",
    url: "/conference-system/brands/cmx/",
    features: ["Professional Conference Systems", "Wired & Wireless Options", "Amplifiers & Accessories", "Technical Support"],
  },
];

const verifiedConferenceBrandCards = conferenceBrandCards.filter((card) => {
  const brand = conferenceBrandConfigs.find((entry) => entry.slug === card.slug);
  return brand ? hasConferenceBrandProducts(brand) : false;
});

type CommercialConfidenceIcon = "verified" | "quotation" | "installation" | "warranty" | "privacy";

const commercialConfidenceCards = [
  {
    icon: "verified" as const,
    title: "Bangladesh-Based AV Provider",
    description: "Sasha Corporation provides a Dhaka office address and direct project contact for AV requirements in Bangladesh.",
  },
  {
    icon: "quotation" as const,
    title: "Documented Quotation",
    description: "Every quotation includes detailed specifications, pricing, and an agreed project scope.",
  },
  {
    icon: "installation" as const,
    title: "Agreed Service Scope",
    description: "Installation, testing, handover, and support responsibilities are documented before confirmation.",
  },
  {
    icon: "warranty" as const,
    title: "Applicable Warranty Support",
    description: "Manufacturer or supplier warranty applies where stated in the product quotation and agreed commercial scope.",
  },
  {
    icon: "privacy" as const,
    title: "Secure & Private",
    description: "Your information is handled securely with clear privacy and ordering policies.",
  },
] as const;

const PRICE_TABLE_BRAND_ORDER = ["cmx", "toa", "bosch", "spon"] as const;
const conferencePriceTableProducts = PRICE_TABLE_BRAND_ORDER.flatMap((slug) =>
  conferenceSystemCatalog
    .filter((product) => product.brand?.slug === slug && product.price.type !== "request")
    .slice(0, 2),
);

const conferenceFaqs = [
  {
    q: "What is the price of a conference system in Bangladesh?",
    a: "Conference system cost depends on participant count, system type, controller, microphone units, audio equipment, and installation requirements. Check the product price table above or request a BOQ for an exact estimate.",
  },
  {
    q: "Which conference system brands are available?",
    a: "Sasha Corporation supplies conference systems from Bosch, TOA, SPON, and CMX, covering chairman and delegate units, control units, DSP, amplifiers, and wireless equipment across different budgets and room sizes.",
  },
  {
    q: "What is the difference between chairman unit and delegate unit?",
    a: "A chairman unit usually has priority control and can manage discussion flow, while delegate units are used by participants for speaking during meetings.",
  },
  {
    q: "Can conference systems be connected with online meetings?",
    a: "Yes, many modern conference systems can be integrated with audio processors, USB audio interface, video conferencing systems, and online meeting platforms.",
  },
  {
    q: "Is wireless conference system better than wired?",
    a: "Wireless systems are better for flexible and clean setup, while wired systems are better for permanent rooms where stable connection and long-term reliability are important.",
  },
  {
    q: "Does Sasha Corporation provide installation support?",
    a: "Yes, Sasha Corporation provides consultation, product supply, installation support, and after-sales service for conference system projects in Bangladesh.",
  },
  {
    q: "How many microphones do I need for a meeting room?",
    a: "It depends on the number of participants and seating arrangement. Usually one chairman unit and multiple delegate units are selected based on room capacity.",
  },
  {
    q: "Can I get a custom conference system quotation?",
    a: "Yes, Sasha Corporation can provide custom quotation based on room size, participant capacity, preferred system type, and project requirements.",
  },
] as const;

function HybridIntegrationIconSvg({ icon }: { icon: HybridIntegrationIcon }) {
  const commonProps = {
    viewBox: "0 0 64 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-12 w-16",
    "aria-hidden": true,
  };

  switch (icon) {
    case "camera":
      return (
        <svg {...commonProps}>
          <rect x="20" y="15" width="24" height="17" rx="5" />
          <circle cx="32" cy="23.5" r="5" />
          <path d="M25 11h14l3 4H22l3-4ZM27 32l-4 7h18l-4-7" />
        </svg>
      );
    case "display":
      return (
        <svg {...commonProps}>
          <rect x="9" y="8" width="46" height="29" rx="3" />
          <path d="M27 43h10M32 37v6" />
          <path d="M14 13h36v19H14z" className="fill-blue-50 stroke-blue-300" />
        </svg>
      );
    case "platform":
      return (
        <svg {...commonProps}>
          <rect x="7" y="7" width="50" height="34" rx="4" />
          <circle cx="21" cy="19" r="4" />
          <circle cx="43" cy="19" r="4" />
          <path d="M14 33c1-5 4-7 7-7s6 2 7 7M36 33c1-5 4-7 7-7s6 2 7 7" />
        </svg>
      );
  }
}

function CommercialConfidenceIconSvg({ icon }: { icon: CommercialConfidenceIcon }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  switch (icon) {
    case "verified":
      return <svg {...commonProps}><path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
    case "quotation":
      return <svg {...commonProps}><path d="M7 3h8l3 3v15H6V3h1" /><path d="M14 3v4h4M9 11h6M9 15h6" /><path d="m8.5 18 1 1 2-2" /></svg>;
    case "installation":
      return <svg {...commonProps}><path d="m14 6 4 4M4 20l6-2 8-8-4-4-8 8-2 6Z" /><path d="m16 4 2-2 4 4-2 2" /></svg>;
    case "warranty":
      return <svg {...commonProps}><circle cx="12" cy="9" r="5" /><path d="m9 14-1 7 4-2 4 2-1-7M9.5 9l1.5 1.5L14.5 7" /></svg>;
    case "privacy":
      return <svg {...commonProps}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg>;
  }
}

function ChooseSashaIconSvg({ icon }: { icon: ChooseSashaIcon }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  switch (icon) {
    case "consultation":
      return (
        <svg {...commonProps}>
          <path d="M4 6h16v10H8l-4 4V6Z" />
          <path d="M8 10h8" />
          <path d="M8 13h5" />
        </svg>
      );
    case "boq":
      return (
        <svg {...commonProps}>
          <path d="M7 3h8l3 3v15H6V3h1" />
          <path d="M14 3v4h4" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        </svg>
      );
    case "installation":
      return (
        <svg {...commonProps}>
          <path d="M14 6l4 4" />
          <path d="M4 20l6-2 8-8-4-4-8 8-2 6Z" />
        </svg>
      );
    case "dsp":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 10h3" />
          <path d="M8 14h3" />
          <circle cx="15.5" cy="10.5" r="1.5" />
          <circle cx="15.5" cy="15.5" r="1.5" />
        </svg>
      );
    case "support":
      return (
        <svg {...commonProps}>
          <path d="M12 4a7 7 0 0 0-7 7v3" />
          <path d="M19 14v-3a7 7 0 0 0-7-7" />
          <rect x="3" y="13" width="4" height="6" rx="2" />
          <rect x="17" y="13" width="4" height="6" rx="2" />
          <path d="M12 18h3" />
        </svg>
      );
    case "expansion":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
          <path d="M18 5h4M20 3v4" />
        </svg>
      );
  }
}

type ConferenceSectionIcon = "info" | "price";

function ConferenceSectionTitleIcon({ icon, compact = false }: { icon: ConferenceSectionIcon; compact?: boolean }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: compact ? "h-4 w-4" : "h-5 w-5",
    "aria-hidden": true,
  };

  const paths: Record<ConferenceSectionIcon, ReactNode> = {
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7h.01" /></>,
    price: <><path d="M7 4h10l3 3v10l-3 3H7l-3-3V7l3-3Z" /><path d="M9 9h4.5a2 2 0 0 1 0 4H10.5a2 2 0 0 0 0 4H15" /><path d="M12 7v2M12 17v2" /></>,
  };

  return (
    <span
      aria-hidden="true"
      className={`${compact ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-xl"} inline-flex shrink-0 items-center justify-center border border-orange-200 bg-gradient-to-br from-orange-50 to-white text-orange-600 shadow-sm`}
    >
      <svg {...commonProps}>{paths[icon]}</svg>
    </span>
  );
}

type ConferenceHeroFeatureIcon = "authorized" | "design" | "installation" | "support";

const conferenceHeroFeatures: Array<{
  icon: ConferenceHeroFeatureIcon;
  title: string;
  description: string;
}> = [
  { icon: "authorized", title: "Conference System Solutions", description: "Bosch, TOA, SPON, CMX" },
  { icon: "design", title: "System Design & BOQ", description: "For Different Room Sizes" },
  { icon: "installation", title: "Installation & Support", description: "Bangladesh-Based Service" },
  { icon: "support", title: "After Sales Support", description: "Expert Technical Team" },
];

function ConferenceHeroFeatureIcon({ icon }: { icon: ConferenceHeroFeatureIcon }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };

  switch (icon) {
    case "authorized":
      return <svg {...commonProps}><path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
    case "design":
      return <svg {...commonProps}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></svg>;
    case "installation":
      return <svg {...commonProps}><path d="m14.7 6.3 3-3a4 4 0 0 1-5.1 5.1l-6.8 6.8a2 2 0 1 0 2.8 2.8l6.8-6.8a4 4 0 0 1 5.1-5.1l-3 3" /><path d="m5 19-2 2" /></svg>;
    case "support":
      return <svg {...commonProps}><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><path d="M18 19c0 1.1-.9 2-2 2h-4" /><rect x="2" y="13" width="4" height="6" rx="2" /><rect x="18" y="13" width="4" height="6" rx="2" /></svg>;
  }
}

type ConferenceTrustFeatureIcon = "boq" | "installation" | "pricing" | "warranty";

const conferenceTrustFeatures: Array<{ icon: ConferenceTrustFeatureIcon; title: string }> = [
  { icon: "boq", title: "BOQ & Tender Support" },
  { icon: "installation", title: "Installation & Training" },
  { icon: "pricing", title: "BOQ-Based Pricing" },
  { icon: "warranty", title: "Applicable Warranty & Support" },
];

function ConferenceTrustFeatureIconSvg({ icon }: { icon: ConferenceTrustFeatureIcon }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
    "aria-hidden": true,
  };

  switch (icon) {
    case "boq":
      return (
        <svg {...commonProps}>
          <path d="M7 3h8l3 3v15H6V3h1" />
          <path d="M14 3v4h4" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        </svg>
      );
    case "installation":
      return (
        <svg {...commonProps}>
          <path d="m14.7 6.3 3-3a4 4 0 0 1-5.1 5.1l-6.8 6.8a2 2 0 1 0 2.8 2.8l6.8-6.8a4 4 0 0 1 5.1-5.1l-3 3" />
          <path d="m5 19-2 2" />
        </svg>
      );
    case "pricing":
      return (
        <svg {...commonProps}>
          <path d="M12.3 3H20v7.7L10.7 20 3 12.3 12.3 3Z" />
          <circle cx="16.2" cy="6.8" r="1.4" />
        </svg>
      );
    case "warranty":
      return (
        <svg {...commonProps}>
          <path d="M12 21s-6-3.6-6-9V5l6-2 6 2v7c0 5.4-6 9-6 9Z" />
          <path d="M9.5 12.5 11 14l3.5-4" />
        </svg>
      );
  }
}

function ConferenceChooserIconSvg({ icon }: { icon: ConferenceChooserIcon }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  switch (icon) {
    case "wired":
      return <svg {...commonProps}><path d="m10.5 13.5 3-3" /><path d="m7.6 16.4-1.4 1.4a3.4 3.4 0 0 1-4.8-4.8l3-3a3.4 3.4 0 0 1 4.8 0" /><path d="m16.4 7.6 1.4-1.4a3.4 3.4 0 1 1 4.8 4.8l-3 3a3.4 3.4 0 0 1-4.8 0" /></svg>;
    case "wireless":
      return <svg {...commonProps}><path d="M4.9 9.7a10 10 0 0 1 14.2 0" /><path d="M7.8 12.6a6 6 0 0 1 8.4 0" /><path d="M10.6 15.4a2 2 0 0 1 2.8 0" /><circle cx="12" cy="19" r=".8" fill="currentColor" stroke="none" /></svg>;
    case "digital":
      return <svg {...commonProps}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx=".5" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>;
    case "paperless":
      return <svg {...commonProps}><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 11h6M9 15h6M9 18h4" /></svg>;
    case "hybrid":
      return <svg {...commonProps}><rect x="3" y="7" width="12" height="10" rx="2" /><path d="m15 10 5-3v10l-5-3" /><circle cx="8" cy="11" r="1.5" /><path d="M5.8 15a2.5 2.5 0 0 1 4.4 0" /></svg>;
    case "small":
      return <svg {...commonProps}><circle cx="12" cy="7" r="2.5" /><path d="M7.5 20v-2.5a4.5 4.5 0 0 1 9 0V20" /></svg>;
    case "medium":
      return <svg {...commonProps}><circle cx="8" cy="8" r="2.3" /><circle cx="16" cy="8" r="2.3" /><path d="M3.5 20v-2a4.5 4.5 0 0 1 9 0v2M11.5 20v-2a4.5 4.5 0 0 1 9 0v2" /></svg>;
    case "large":
      return <svg {...commonProps}><circle cx="12" cy="6" r="2.2" /><circle cx="5.5" cy="10" r="2" /><circle cx="18.5" cy="10" r="2" /><path d="M8.5 20v-3a3.5 3.5 0 0 1 7 0v3M2 20v-2a3.5 3.5 0 0 1 5-3.2M22 20v-2a3.5 3.5 0 0 0-5-3.2" /></svg>;
    case "hall":
      return <svg {...commonProps}><circle cx="6" cy="8" r="2" /><circle cx="12" cy="6" r="2.2" /><circle cx="18" cy="8" r="2" /><path d="M2 19v-1.5a4 4 0 0 1 6-3.5M16 14a4 4 0 0 1 6 3.5V19M8 20v-3a4 4 0 0 1 8 0v3" /></svg>;
  }
}

export const metadata: Metadata = {
  title: META_TITLE,
  description:
    "Compare Bosch, TOA, SPON and CMX conference system prices in Bangladesh. Explore wired, wireless, digital and paperless systems with BOQ support.",
  keywords: [
    "conference system price in Bangladesh",
    "conference system in Bangladesh",
    "wireless conference microphone",
    "digital conference system",
    "chairman unit",
    "delegate unit",
    "conference microphone system",
    "meeting room audio system",
    "PA and conference system Bangladesh",
  ],
  alternates: { canonical: "/conference-system/" },
  openGraph: {
    title: META_TITLE,
    description:
      "Compare Bosch, TOA, SPON and CMX conference system prices in Bangladesh. Explore wired, wireless, digital and paperless systems with BOQ support.",
    url: "/conference-system/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/Conference%20system/NAC-720W.webp"),
        width: 1200,
        height: 630,
        alt: "Conference System in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: "Compare conference system prices in Bangladesh and explore wired, wireless, digital and paperless systems with project BOQ support.",
    images: [socialImageUrl("/images/Conference%20system/NAC-720W.webp")],
  },
};

export default function ConferenceSystemPage() {
  const catalogReport = getConferenceCatalogIntegrityReport();
  const publishedPriceCount = catalogReport.byPriceType.fixed + catalogReport.byPriceType.range;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: conferenceFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Conference System Products in Bangladesh",
    numberOfItems: conferenceSystemCatalog.length,
    itemListElement: conferenceSystemCatalog.slice(0, CONFERENCE_INITIAL_PRODUCT_COUNT).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/conference-system/${product.slug}/`),
      name: product.name,
    })),
  };
  const conferenceServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Conference System Supply, Installation and Support",
    serviceType: "Conference system consultation, supply, installation and after-sales support",
    url: absoluteUrl("/conference-system/"),
    provider: {
      "@type": "Organization",
      name: "Sasha Corporation",
      url: absoluteUrl("/"),
      telephone: siteConfig.phone,
      email: `${siteConfig.emailUser}@${siteConfig.emailDomain}`,
    },
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
  };
  // Facets for the product explorer: taxonomy categories and brands that actually have stock.
  const conferenceExplorerProducts = balanceConferenceProductsByBrand(buildConferenceExplorerProducts());

  const conferenceExplorerBrands = conferenceBrandConfigs
    .map((brand) => ({
      slug: brand.slug,
      label: brand.name,
      count: conferenceSystemCatalog.filter((product) => product.brand?.slug === brand.slug).length,
    }))
    .filter((facet) => facet.count > 0);

  const conferenceExplorerProductTypes = Object.entries(CONFERENCE_PRODUCT_TYPE_LABELS)
    .map(([slug, label]) => ({
      slug,
      label,
      count: conferenceSystemCatalog.filter((product) =>
        product.productTypes.includes(slug as ConferenceProductType),
      ).length,
    }))
    .filter((facet) => facet.count > 0);


  return (
    <div className="mx-auto w-full max-w-[clamp(80rem,90vw,108rem)] px-4 pb-10 pt-0 md:px-6" data-conference-route-kind="hub">
      <section
        className="relative left-1/2 right-1/2 isolate -mx-[50vw] -mt-2 min-h-[446px] w-screen overflow-hidden bg-[#f7f9fc] sm:min-h-[406px] lg:min-h-[clamp(18.5rem,25vw,21.5rem)]"
        aria-labelledby="conference-hero-heading"
      >
        <Image
          src="/images/conference_landing/hero_banner.webp"
          alt="Modern Sasha Corporation conference room with tabletop microphone systems"
          width={1983}
          height={793}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-[54%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 sm:via-white/75 lg:via-white/25 lg:to-transparent" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[446px] w-full max-w-[clamp(80rem,90vw,108rem)] flex-col px-5 py-6 sm:min-h-[406px] sm:px-8 sm:py-7 lg:min-h-[clamp(18.5rem,25vw,21.5rem)] lg:px-10 lg:py-[clamp(1.5rem,2vw,2rem)]">
          <div className="max-w-[42rem] sm:translate-y-2 lg:max-w-[38%] lg:translate-y-3">
            <h1 id="conference-hero-heading" className="text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">
              Conference System
              <span className="block">Price in Bangladesh 2026</span>
            </h1>
            <p className="mt-3 max-w-[39rem] text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">
              Explore Bosch, TOA, SPON &amp; CMX conference systems with price range, features, and complete solutions for meeting rooms, boardrooms, and conference halls.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 min-[430px]:flex-row sm:mt-5">
              <Link
                href="/contact/?project=conference-system"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h7" />
                </svg>
                Get Free BOQ
              </Link>
              <a
                href="#conference-products-heading"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#071936] px-5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>
                Browse Conference Systems
              </a>
            </div>
          </div>

          <ul className="mt-auto grid max-w-[42rem] -translate-y-2 grid-cols-2 gap-x-4 gap-y-3 pt-4 sm:grid-cols-4 sm:gap-x-6 lg:w-[56%] lg:max-w-none lg:-translate-y-3 lg:gap-x-7 lg:pt-3">
            {conferenceHeroFeatures.map((feature) => (
              <li
                key={feature.title}
                className="flex min-w-0 items-center gap-2 text-[#071936] [text-shadow:0_1px_2px_rgb(255_255_255/95%)]"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-[#071936] drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] [&>svg]:h-5 [&>svg]:w-5 lg:[&>svg]:h-[22px] lg:[&>svg]:w-[22px]">
                  <ConferenceHeroFeatureIcon icon={feature.icon} />
                </span>
                <span className="min-w-0">
                  <strong className="block whitespace-nowrap text-[9px] font-black leading-3 tracking-[-0.015em] sm:text-[9.5px] lg:text-[10px]">{feature.title}</strong>
                  <span className="mt-0.5 block whitespace-nowrap text-[7.5px] font-bold leading-3 text-slate-600 sm:text-[8px] lg:text-[8.5px]">{feature.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="conference-trust-heading">
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.035)] sm:px-5 xl:min-h-[80px] xl:px-7 xl:py-2">
          <div className="grid items-center gap-4 lg:grid-cols-[10rem_minmax(0,1fr)] xl:min-h-[62px] xl:grid-cols-[minmax(205px,0.9fr)_1px_minmax(420px,2.6fr)_1px_minmax(350px,1.8fr)] xl:gap-0">
            <p id="conference-trust-heading" role="heading" aria-level={2} className="text-left text-xs font-extrabold leading-[1.4] tracking-[-0.01em] text-[#071936] sm:text-[13px] xl:max-w-[205px]">
              <span className="block">Trusted Conference System</span>
              <span className="block">Solutions in Bangladesh</span>
            </p>

            <div className="hidden h-12 w-px bg-slate-200 xl:block" aria-hidden="true" />

            <div className="grid min-w-0 grid-cols-2 items-center gap-x-3 gap-y-4 border-t border-slate-100 pt-4 lg:flex lg:justify-center lg:gap-x-7 lg:border-t-0 lg:pt-0 xl:px-8 2xl:gap-x-10">
              {verifiedConferenceBrandCards.map((brand) => {
                const logoHeightClass = {
                  bosch: "h-7 sm:h-8 lg:h-[34px]",
                  toa: "h-7 sm:h-8 lg:h-[34px]",
                  spon: "h-6 sm:h-7 lg:h-8",
                  cmx: "h-8 sm:h-9 lg:h-9",
                }[brand.slug] ?? "h-8";

                return (
                  <Link
                    key={brand.slug}
                    prefetch={false}
                    href={brand.url}
                    aria-label={`Browse ${brand.title} conference systems`}
                    className="flex min-w-0 shrink-0 items-center justify-center transition duration-200 hover:scale-[1.03] hover:opacity-80 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                  >
                    {brand.logoSrc ? (
                      <Image
                        src={brand.logoSrc}
                        alt={`${brand.title} logo`}
                        width={brand.logoWidth ?? 100}
                        height={brand.logoHeight ?? 24}
                        className={`${logoHeightClass} max-w-full w-auto object-contain ${brand.slug === "spon" ? "lg:-mr-5" : ""}`}
                      />
                    ) : (
                      <span className="text-lg font-extrabold tracking-tight text-slate-950">{brand.title}</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden h-12 w-px bg-slate-200 xl:block" aria-hidden="true" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-slate-100 pt-4 lg:col-span-2 xl:col-span-1 xl:border-t-0 xl:pl-7 xl:pt-0 2xl:gap-x-7">
              {conferenceTrustFeatures.map((feature) => (
                <div key={feature.title} className="flex min-w-0 items-center gap-2 text-[#071936]">
                  <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center text-orange-600 [&>svg]:h-4 [&>svg]:w-4">
                    <ConferenceTrustFeatureIconSvg icon={feature.icon} />
                  </span>
                  <span className="whitespace-nowrap text-[10px] font-bold leading-4 sm:text-[11px]">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="conference-products-heading" className="mt-4 scroll-mt-24" aria-label="Conference System Products">
        <ConferenceProductExplorer
          products={conferenceExplorerProducts}
          brands={conferenceExplorerBrands}
          productTypes={conferenceExplorerProductTypes}
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
      </section>

      <section
        className="mt-4 rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6"
        aria-labelledby="choose-conference-system-type"
      >
        <div>
          <h2 id="choose-conference-system-type" className={conferenceSectionTitleClass}>
            Choose Your Conference Setup
          </h2>
          <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
            Browse system types and connection options for your meeting requirements
          </p>
        </div>

        <div className="-mx-1 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {conferenceSystemChooserCards.map((card) => (
            <article
              key={card.title}
              className="group flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.055)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_9px_24px_rgba(15,23,42,0.09)] min-[520px]:w-[66%] md:w-auto md:snap-none md:last:col-span-2 md:last:w-[calc(50%_-_0.375rem)] md:last:justify-self-center xl:last:col-span-1 xl:last:w-auto xl:last:justify-self-stretch"
            >
              <div className="relative h-[104px] overflow-hidden bg-slate-100 sm:h-[112px]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 768px) 48vw, 86vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.025]"
                  style={{ objectPosition: card.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071936]/18 via-transparent to-transparent" aria-hidden="true" />
              </div>

              <div className="relative flex flex-1 flex-col px-4 pb-4 pt-5">
                <span className="absolute -top-7 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-[#071936] text-white shadow-[0_4px_12px_rgba(7,25,54,0.22)] [&>svg]:h-[19px] [&>svg]:w-[19px]">
                  <ConferenceChooserIconSvg icon={card.icon} />
                </span>
                <h3 className="text-[14px] font-extrabold leading-5 tracking-tight text-[#071936] sm:text-[15px]">{card.title}</h3>
                <p className="mt-1.5 text-[11px] font-medium leading-[1.15rem] text-slate-600 sm:text-xs">{card.description}</p>
                <Link
                  prefetch={false}
                  href={card.href}
                  className="mt-auto inline-flex min-h-8 items-end gap-1.5 pt-3 text-[11px] font-extrabold text-[#075BC5] transition-colors hover:text-orange-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 sm:text-xs"
                >
                  {card.cta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dce7f6] bg-[linear-gradient(110deg,#f5f8fd_0%,#f9fbfe_52%,#f1f6fd_100%)] px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6"
        aria-labelledby="choose-conference-room-size"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="choose-conference-room-size" className={conferenceSectionTitleClass}>
              Choose by Room Size <span className="text-[13px] font-bold tracking-normal sm:text-sm">(Participants)</span>
            </h2>
            <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
              Select the right solution based on your room capacity
            </p>
          </div>
          <a
            href="#popular-conference-packages"
            className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#315bd7] bg-white px-4 text-[11px] font-extrabold text-[#173aa7] shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:self-auto sm:text-xs"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 4h11l3 3v13H5z" /><path d="M15 4v4h4M8 11h8M8 15h8" />
            </svg>
            View Room Size Guide
          </a>
        </div>

        <div className="-mx-1 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {conferenceRoomSizeCards.map((card) => (
            <article
              key={card.capacity}
              className="group relative h-[154px] w-[88%] shrink-0 snap-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.055)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_9px_24px_rgba(15,23,42,0.09)] min-[520px]:w-[68%] md:w-auto md:snap-none"
            >
              <div className="absolute inset-y-0 right-0 w-[51%] overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 13vw, (min-width: 768px) 25vw, 45vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.035]"
                  style={{ objectPosition: card.imagePosition }}
                />
              </div>
              <div className="absolute inset-y-0 left-0 z-[1] w-[67%] bg-gradient-to-r from-white via-white via-76% to-white/0" aria-hidden="true" />

              <div className="relative z-[2] flex h-full w-[64%] flex-col px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-orange-500 [&>svg]:h-7 [&>svg]:w-7">
                    <ConferenceChooserIconSvg icon={card.icon} />
                  </span>
                  <p className="text-[18px] font-black leading-5 tracking-[-0.025em] text-[#071936]">
                    {card.capacity}
                    <span className="block text-[9px] font-extrabold leading-3 tracking-normal text-slate-700">Participants</span>
                  </p>
                </div>
                <h3 className="mt-2 text-[11px] font-extrabold leading-4 text-[#071936] sm:text-xs">{card.room}</h3>
                <p className="mt-0.5 line-clamp-2 text-[10px] font-medium leading-[0.95rem] text-slate-600 sm:text-[11px]">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-auto inline-flex min-h-6 items-end gap-1 pt-1 text-[10px] font-extrabold text-orange-600 transition-colors hover:text-[#075BC5] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 sm:text-[11px]"
                >
                  View Solutions
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6"
        aria-labelledby="popular-conference-packages"
      >
        <h2 id="popular-conference-packages" className={conferenceSectionTitleClass}>
          Popular Conference System Packages
        </h2>
        <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
          Capacity-based planning packages with estimated equipment budgets; final pricing is confirmed through a project BOQ.
        </p>

        <div className="-mx-1 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {popularConferencePackages.map((item) => (
            <article
              key={item.title}
              className="group relative h-[226px] w-[89%] shrink-0 snap-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.055)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_9px_24px_rgba(15,23,42,0.09)] min-[520px]:w-[68%] md:w-auto md:snap-none"
            >
              <span className={`absolute left-0 top-0 z-10 inline-flex h-6 items-center gap-1 rounded-br-lg px-2.5 text-[9px] font-extrabold text-white ${item.badgeClass}`}>
                <span aria-hidden="true">{item.badgeIcon}</span>
                {item.badge}
              </span>

              <div className="absolute right-2 top-8 h-[82px] w-[49%]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 12vw, (min-width: 768px) 24vw, 42vw"
                  className="object-contain transition duration-300 group-hover:scale-[1.035]"
                />
              </div>

              <div className="px-3.5 pt-8">
                <div className="max-w-[53%]">
                  <h3 className="text-[14px] font-black leading-[1.05rem] tracking-tight text-[#071936] sm:text-[15px]">{item.title}</h3>
                  <p className="text-[11px] font-extrabold leading-4 text-[#071936] sm:text-xs">{item.subtitle}</p>
                  <p className="mt-1.5 line-clamp-2 text-[9px] font-medium leading-[0.9rem] text-slate-600 sm:text-[10px]">{item.description}</p>
                </div>

                <ul className="absolute bottom-3.5 left-3.5 w-[49%] space-y-1 text-[9px] font-semibold leading-3 text-slate-700 sm:text-[10px]">
                  {item.items.map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5">
                      <svg viewBox="0 0 20 20" className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600" fill="currentColor" aria-hidden="true">
                        <circle cx="10" cy="10" r="9" /><path d="m6 10 2.4 2.4L14.5 6.8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-[47px] right-3 w-[44%] text-center">
                  <p className="text-[8px] font-semibold leading-3 text-slate-500">{item.priceEyebrow}</p>
                  <p className={`mt-0.5 text-[17px] font-black leading-5 tracking-[-0.025em] ${item.priceClass} ${item.price.length > 15 ? "text-[14px] leading-4" : ""}`}>
                    {item.price}
                  </p>
                  {item.priceNote ? <p className="mt-0.5 text-[8px] font-medium leading-3 text-slate-500">{item.priceNote}</p> : null}
                </div>

                <Link
                  href={item.href}
                  className={`absolute bottom-3 right-3 inline-flex h-7 w-[45%] items-center justify-center rounded-md px-2 text-center text-[9px] font-extrabold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-1 ${item.buttonClass}`}
                >
                  {item.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-1.5 text-[9px] font-medium leading-4 text-slate-600 sm:flex-row sm:items-start sm:justify-between sm:text-[10px]">
          <p className="max-w-4xl text-left">
            Indicative equipment estimates are based on each listed configuration. Final pricing depends on the selected brand, model, accessories, and project scope; the final BOQ confirms whether installation, cabling, integration, transport, VAT/tax, and commissioning are included or quoted separately.
          </p>
          <Link href="/conference-system/complete-package/" className="shrink-0 self-start font-extrabold text-[#1744a1] hover:text-blue-700 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
            View Complete Installed Packages <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dce7f6] bg-[linear-gradient(110deg,#f5f8fd_0%,#fbfcfe_50%,#f0f5fc_100%)] px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6"
        aria-labelledby="conference-price-guide"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="conference-price-guide" className={conferenceSectionTitleClass}>
              Conference System Component Price Guide
            </h2>
            <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
              Quick component ranges calculated from currently published catalog prices
            </p>
          </div>
          <a
            href="#conference-system-price"
            className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#315bd7] bg-white px-4 text-[11px] font-extrabold text-[#173aa7] shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:self-auto sm:text-xs"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 8.5 10.5 2H20v9.5L13.5 18 4 8.5Z" /><circle cx="15.7" cy="6.3" r="1.3" />
            </svg>
            View All Prices
          </a>
        </div>

        <div className="-mx-1 mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-6 [&::-webkit-scrollbar]:hidden">
          {conferencePriceGuideItems.map((item) => (
            <Link
              key={item.title}
              prefetch={false}
              href={item.href}
              className="group flex h-[68px] w-[76%] shrink-0 snap-start items-center overflow-hidden rounded-lg border border-slate-200 bg-white px-2 shadow-[0_2px_8px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md min-[520px]:w-[56%] sm:w-auto sm:snap-none"
            >
              <span className="relative h-14 w-[44%] shrink-0">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 7vw, (min-width: 640px) 20vw, 32vw"
                  className="object-contain p-1 transition duration-300 group-hover:scale-[1.04]"
                />
              </span>
              <span className="min-w-0 py-2">
                <strong className="block text-[10px] font-extrabold leading-4 text-[#071936] sm:text-[11px]">{item.title}</strong>
                <span className="mt-0.5 block text-[9px] font-bold leading-3 text-slate-700 sm:text-[10px]">{item.price}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-1 border-t border-slate-200/80 pt-2 text-[9px] font-medium leading-4 text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
          <p>Note: Component ranges are generated from published catalog prices; request-price products are excluded.</p>
          <p className="shrink-0">
            For exact pricing and BOQ,{" "}
            <Link href="/contact/?project=conference-system" className="font-extrabold text-orange-600 hover:text-orange-700 hover:underline">
              Get a Free Quotation →
            </Link>
          </p>
        </div>
      </section>

      <section
        className="mt-4 scroll-mt-24 overflow-hidden rounded-2xl border border-[#d7e2f2] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.05)]"
        aria-labelledby="hybrid-conference-integration"
      >
        <div className="grid bg-[linear-gradient(105deg,#ffffff_0%,#f8fbff_64%,#eef5ff_100%)] lg:grid-cols-[minmax(0,1fr)_30%]">
          <div className="relative px-4 py-5 sm:px-5 md:px-6 lg:py-6">
            <div className="grid gap-6 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.08em] text-[#2456c7]">Hybrid Meeting Solution</p>
                <h2 id="hybrid-conference-integration" className="mt-1.5 max-w-[290px] !text-[23px] font-black leading-[1.08] tracking-tight text-[#071936] sm:!text-[27px]">
                  Complete Hybrid & Video Conference Integration
                </h2>
                <p className="mt-2.5 text-left text-[11px] font-medium leading-[1.15rem] text-slate-600 sm:text-xs">
                  Integrate conference microphones with cameras, displays, audio processing, and online meeting platforms for a complete hybrid experience.
                </p>
                <ul className="mt-3 space-y-1.5 text-[10px] font-bold leading-4 text-slate-700 sm:text-[11px]">
                  {["Crystal-clear audio and video", "Automatic camera tracking", "Zoom, Microsoft Teams and more", "Scalable for any room size"].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[8px] text-white" aria-hidden="true">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  <Link href="/contact/?project=hybrid-conference-room" className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#071f4a] px-3 text-[10px] font-extrabold text-white shadow-sm transition hover:bg-[#123665] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                    Design My Meeting Room <span aria-hidden="true" className="ml-1.5">→</span>
                  </Link>
                  <a href={conferenceEngineerWhatsAppHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-[10px] font-extrabold text-[#123566] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-3.8-.9L3 21l1.8-5a8.5 8.5 0 1 1 16.2-4.5Z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></svg>
                    Talk to an AV Engineer
                  </a>
                </div>
              </div>

              <div className="min-w-0 self-center">
                <div className="-mx-1 flex snap-x snap-mandatory items-start overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                  {hybridIntegrationSteps.map((step, index) => (
                    <div key={step.title} className="flex shrink-0 items-start snap-start sm:min-w-0 sm:flex-1">
                      <div className="w-[104px] text-center sm:w-auto sm:min-w-0 sm:flex-1">
                        <div className="mx-auto flex h-[62px] w-[78px] items-center justify-center text-[#102c57]">
                          {"image" in step ? (
                            <span className="relative block h-[58px] w-[76px]">
                              <Image src={step.image} alt={step.imageAlt} fill sizes="76px" className="object-contain" />
                            </span>
                          ) : (
                            <HybridIntegrationIconSvg icon={step.icon} />
                          )}
                        </div>
                        <h3 className="mt-1 !text-[10px] font-extrabold leading-3.5 text-[#071936]">{step.title}</h3>
                        <p className="mt-1 text-[8px] font-semibold leading-3 text-slate-500 sm:text-[9px]">{step.subtitle}</p>
                      </div>
                      {index < hybridIntegrationSteps.length - 1 ? (
                        <span className="mt-6 inline-flex w-5 shrink-0 items-center justify-center text-sm font-black text-[#2855a7] sm:w-4" aria-hidden="true">→</span>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mx-auto mt-3 max-w-[360px] rounded-md border border-[#dce5f2] bg-white/90 px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-extrabold text-[#071936]">Central Control System</p>
                  <p className="mt-0.5 text-[8px] font-semibold text-slate-500 sm:text-[9px]">Intuitive control from a touch panel or software</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[230px] overflow-hidden lg:min-h-full">
            <Image
              src="/images/conference_system_projects/project2.webp"
              alt="Hybrid conference room with microphones, displays, and video meeting facilities"
              fill
              sizes="(max-width: 1023px) 100vw, 30vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/15 to-transparent lg:from-white lg:via-transparent" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"
        aria-labelledby="conference-system-configurations"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 id="conference-system-configurations" className={conferenceSectionTitleClass}>Representative Conference System Configurations</h2>
            <p className="mt-1 text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">Sample room configurations illustrating typical system design and possible delivery scopes—not completed client case studies</p>
          </div>
          <Link href="/projects/" className="inline-flex min-h-9 shrink-0 items-center justify-center self-start rounded-md border border-[#b9cbea] bg-white px-4 text-[10px] font-extrabold text-[#1744a1] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:text-[11px]">
            View All Projects <span aria-hidden="true" className="ml-1.5">→</span>
          </Link>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {conferenceRepresentativeConfigurations.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgba(15,23,42,0.09)] sm:grid sm:grid-cols-[47%_53%] lg:block xl:grid xl:grid-cols-[47%_53%]">
              <div className="relative aspect-[16/10] min-h-[170px] overflow-hidden bg-slate-100 sm:aspect-auto lg:aspect-[16/9] lg:min-h-0 xl:aspect-auto xl:min-h-[190px]">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 24vw" className="object-cover transition duration-300 group-hover:scale-[1.025]" />
              </div>
              <div className="flex min-w-0 flex-col p-3.5">
                <h3 className="!text-[13px] font-extrabold leading-5 text-[#071936] sm:!text-sm">{project.cardTitle}</h3>
                <dl className="mt-2.5 space-y-2 border-y border-slate-100 py-2.5 text-[10px] leading-4 text-slate-600 sm:text-[11px]">
                  <div><dt className="font-extrabold text-slate-800">Example Application</dt><dd>{project.application}</dd></div>
                  <div><dt className="font-extrabold text-slate-800">Brand / System</dt><dd>{project.brand}</dd></div>
                  <div><dt className="font-extrabold text-slate-800">Configuration</dt><dd>{project.configuration}</dd></div>
                  <div><dt className="font-extrabold text-slate-800">Illustrative Scope</dt><dd>{project.illustrativeScope}</dd></div>
                </dl>
                <Link href="/projects/" aria-label={`View projects related to the ${project.title} sample configuration`} className="mt-auto inline-flex min-h-8 items-end pt-2 text-[11px] font-extrabold text-[#1744a1] hover:text-blue-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:text-xs">
                  View Projects <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dbe5f2] bg-[linear-gradient(110deg,#ffffff_0%,#fbfdff_70%,#f2f7ff_100%)] px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"
        aria-labelledby="conference-system-engineering-support"
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div className="min-w-0">
            <h2 id="conference-system-engineering-support" className={conferenceSectionTitleClass}>Conference System Engineering & Project Support</h2>
            <p className="mt-1 text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">Room-based design, BOQ, integration, installation, and lifecycle support</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {chooseSashaCards.map((item) => (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.035)]">
                  <div className="flex items-start gap-2.5 xl:block">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[#2456c7] xl:mb-2.5">
                      <ChooseSashaIconSvg icon={item.icon} />
                    </span>
                    <h3 className="pt-0.5 !text-xs font-extrabold leading-4 text-[#071936] sm:!text-[13px] xl:pt-0">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-left text-[10px] font-medium leading-4 text-slate-600 sm:text-[11px]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="flex flex-col rounded-xl border border-blue-100 bg-[#eef5ff] p-4" aria-label="Conference project consultation">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#2456c7] shadow-sm"><ChooseSashaIconSvg icon="support" /></span>
              <div>
                <h3 className="!text-[15px] font-extrabold leading-5 text-[#123566]">Need Expert Advice for Your Project?</h3>
                <p className="mt-2 text-left text-[11px] font-medium leading-5 text-slate-600 sm:text-xs">Our AV engineers are ready to help you choose the right conference system.</p>
              </div>
            </div>
            <div className="mt-auto grid gap-2 pt-4">
              <Link href="/contact/?project=conference-system" className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#071f4a] px-3 text-[10px] font-extrabold text-white shadow-sm transition hover:bg-[#123665] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">Get Free BOQ</Link>
              <a href={conferenceEngineerWhatsAppHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-[#9fb8df] bg-white px-3 text-[10px] font-extrabold text-[#123566] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-3.8-.9L3 21l1.8-5a8.5 8.5 0 1 1 16.2-4.5Z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></svg>
                Talk to an AV Engineer
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className={compactInformationSectionClass} style={deferredContentStyle} aria-labelledby="what-is-conference-system">
        <h2 id="what-is-conference-system" className={`${conferenceSectionTitleClass} flex items-center gap-2.5`}>
          <ConferenceSectionTitleIcon icon="info" compact />
          What is a Conference System?
        </h2>
        <div className="mt-3 rounded-xl border border-[#dbe5f2] bg-[#f6f9ff] p-4">
          <p className="text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
            A conference system is a professional audio communication solution used for meetings, boardrooms, seminar
            rooms, training centers, government offices, corporate offices, hotels, educational institutions, and
            conference halls. It includes chairman units, delegate units, a control unit, wireless microphones, DSP
            processor, speakers, cables, and accessories to keep every speaker clear and every discussion organized.
          </p>
        </div>
      </section>

      <section id="conference-system-price" className={`${compactInformationSectionClass} scroll-mt-24`} style={deferredContentStyle} aria-labelledby="conference-system-price-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 id="conference-system-price-heading" className={`${conferenceSectionTitleClass} flex items-center gap-2.5`}>
              <ConferenceSectionTitleIcon icon="price" compact />
              Conference System Product Price List in Bangladesh
            </h2>
            <p className="mt-2 max-w-5xl text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">
              This detailed product-level price list complements the component guide above. Conference system price in
              Bangladesh varies by product model, microphone quantity, system type, brand, control unit, processor, speaker
              coverage, installation complexity, and service support. The table below lists individual Sasha Corporation
              conference products with availability, pricing basis, and direct product links for easier comparison.
            </p>
          </div>
          <span className="inline-flex min-h-8 shrink-0 items-center self-start rounded-full border border-blue-100 bg-[#eef5ff] px-3 text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#1744a1] sm:text-[10px]">
            {conferencePriceTableProducts.length} representative products
          </span>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-[#dbe5f2] bg-white shadow-[0_2px_9px_rgba(15,23,42,0.035)]">
          <table className="w-full border-collapse text-left text-[10px] sm:text-[11px]">
            <caption className="sr-only">Conference products with published fixed or indicative range prices</caption>
            <thead className="hidden bg-[linear-gradient(90deg,#071936_0%,#123665_62%,#2456c7_100%)] text-white md:table-header-group">
              <tr>
                <th className="w-[30%] border-r border-white/20 px-3 py-2.5 font-extrabold">Product Name</th>
                <th className="w-[10%] border-r border-white/20 px-3 py-2.5 font-extrabold">Brand</th>
                <th className="w-[14%] border-r border-white/20 px-3 py-2.5 font-extrabold">Product Type</th>
                <th className="w-[18%] border-r border-white/20 px-3 py-2.5 font-extrabold">Best For</th>
                <th className="w-[14%] border-r border-white/20 px-3 py-2.5 font-extrabold">Availability</th>
                <th className="w-[16%] px-3 py-2.5 text-right font-extrabold">Price</th>
              </tr>
            </thead>
            <tbody className="block divide-y divide-slate-200 md:table-row-group">
              {conferencePriceTableProducts.map((product) => {
                const price = getConferenceProductPricePresentation(product);
                return <tr key={product.slug} className="block bg-white align-top transition-colors md:table-row md:even:bg-sky-50/45 md:hover:bg-blue-50/70">
                  <td className="block border-l-[3px] border-[#2456c7] px-3 py-3 md:table-cell md:border-l-0 md:border-r md:border-slate-200 md:py-2.5">
                    <Link
                      href={`/conference-system/${product.slug}/`}
                      className="block break-words text-[11px] font-extrabold leading-4 text-[#071936] underline-offset-4 transition hover:text-[#2456c7] hover:underline sm:text-xs"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-[9px] font-medium leading-4 text-slate-500 sm:text-[10px]">{product.shortDescription}</p>
                    <div className="mt-2.5 grid gap-2 border-t border-slate-100 pt-2.5 md:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Brand</span>
                        <span className="text-right text-[10px] font-bold text-slate-800">{product.brand?.name ?? "Sasha"}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Type</span>
                        <span className="text-right text-[10px] font-bold text-slate-800">{product.badge}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Best For</span>
                        <span className="mt-0.5 block text-[10px] font-medium leading-4 text-slate-700">{product.applications.join(", ")}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Availability</span>
                        <span className="text-right text-[10px] font-bold text-slate-800">{getConferenceProductAvailabilityLabel(product)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Price</span>
                        <span className="text-right"><span className="block text-[11px] font-extrabold text-[#071936]">{price.label}</span><span className="block text-[9px] font-semibold text-slate-500">{price.basisLabel}</span></span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-2.5 font-semibold leading-4 text-slate-800 md:table-cell md:border-r md:border-slate-200">{product.brand?.name ?? "Sasha"}</td>
                  <td className="hidden px-3 py-2.5 font-semibold leading-4 text-slate-800 md:table-cell md:border-r md:border-slate-200">{product.badge}</td>
                  <td className="hidden px-3 py-2.5 font-medium leading-4 text-slate-600 md:table-cell md:border-r md:border-slate-200">{product.applications.join(", ")}</td>
                  <td className="hidden px-3 py-2.5 font-medium leading-4 text-slate-600 md:table-cell md:border-r md:border-slate-200">{getConferenceProductAvailabilityLabel(product)}</td>
                  <td className="hidden px-3 py-2.5 text-right md:table-cell">
                    <span className="font-extrabold text-slate-800">
                      {price.label}
                    </span>
                    <span className="mt-0.5 block text-[9px] font-semibold leading-3 text-slate-500">{price.basisLabel}</span>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 rounded-lg border border-blue-100 bg-[#f6f9ff] px-3 py-2.5 text-left text-[11px] font-medium leading-5 text-slate-600 sm:text-xs">
          This compact table shows representative fixed-price and indicative-range products from each supported brand.
          Use the searchable catalog and Price filters above to review all <strong>{publishedPriceCount} products with
          visible price guidance</strong> or the {catalogReport.byPriceType.request} Request Price products. Quotation items
          are kept separate instead of being presented as zero-priced stock.
        </p>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"
        aria-labelledby="conference-commercial-confidence"
      >
        <h2 id="conference-commercial-confidence" className={conferenceSectionTitleClass}>Commercial Confidence</h2>
        <p className="mt-1 text-left text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">Clear quotation, project scope, service responsibilities, and applicable commercial terms.</p>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {commercialConfidenceCards.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-[0_2px_8px_rgba(15,23,42,0.035)]">
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#2456c7] ring-1 ring-blue-100">
                <CommercialConfidenceIconSvg icon={item.icon} />
              </span>
              <h3 className="mt-2 !text-xs font-extrabold leading-4 text-[#071936]">{item.title}</h3>
              <p className="mt-1.5 text-center text-[11px] font-medium leading-[1.1rem] text-slate-600">{item.description}</p>
              {item.icon === "verified" ? (
                <div className="mt-1.5 text-[10px] font-semibold leading-4 text-slate-500">
                  <address className="not-italic">{siteConfig.address}</address>
                  <a href={`tel:${siteConfig.phone}`} className="mt-1 inline-flex font-extrabold text-[#1744a1] hover:underline">{siteConfig.phone}</a>
                </div>
              ) : null}
              {item.icon === "privacy" ? (
                <nav aria-label="Commercial policies" className="mt-1.5 flex flex-wrap justify-center gap-x-2 text-[10px] font-extrabold text-[#1744a1]">
                  <Link href="/terms/" className="hover:underline">Terms</Link>
                  <Link href="/return-policy/" className="hover:underline">Returns</Link>
                  <Link href="/privacy/" className="hover:underline">Privacy</Link>
                </nav>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 rounded-lg border border-blue-100 bg-[#f6f9ff] px-3 py-2.5 text-[11px] font-medium leading-5 text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p className="flex items-start gap-2 text-left">
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-blue-200 text-[9px] font-extrabold text-[#2456c7]" aria-hidden="true">i</span>
            <span><strong className="text-slate-800">Brand &amp; Warranty Scope:</strong> Product availability, warranty coverage, and commercial terms are confirmed for the selected model in the final quotation.</span>
          </p>
          <Link href="/services-support/" className="shrink-0 font-extrabold text-[#1744a1] hover:underline">Learn More <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"
        aria-labelledby="conference-brand-showcase"
      >
        <h2 id="conference-brand-showcase" className={conferenceSectionTitleClass}>Our Conference System Brand Support</h2>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {verifiedConferenceBrandCards.map((brand) => (
            <article key={brand.title} className="flex min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.035)]">
              <div className="flex h-10 items-center gap-2.5 border-b border-slate-100 pb-2">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2456c7] ring-1 ring-blue-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>
                </span>
                {brand.logoSrc ? (
                  <Image src={brand.logoSrc} alt={`${brand.title} logo`} width={brand.logoWidth} height={brand.logoHeight} className={`h-auto w-auto object-contain ${brand.logoMaxHeightClassName ?? "max-h-6"}`} />
                ) : (
                  <strong className="text-sm font-extrabold text-[#071936]">{brand.title}</strong>
                )}
              </div>
              <h3 className="sr-only">{brand.title} Conference System Support</h3>
              <ul className="mt-2.5 space-y-1.5 text-[11px] font-medium leading-4 text-slate-600 sm:text-xs">
                {brand.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-1.5"><span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#2456c7]" aria-hidden="true" />{feature}</li>
                ))}
              </ul>
              <Link prefetch={false} href={brand.url} className="mt-auto inline-flex items-center pt-3 text-[11px] font-extrabold text-[#1744a1] hover:text-blue-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:text-xs">
                View {brand.title} Products <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"
        aria-labelledby="conference-system-faq"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="conference-system-faq" className={conferenceSectionTitleClass}>Frequently Asked Questions</h2>
          <a href="#conference-faq-list" className="inline-flex min-h-8 shrink-0 items-center justify-center self-start rounded-md border border-[#b9cbea] bg-white px-3 text-[9px] font-extrabold text-[#1744a1] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:self-auto sm:text-[10px]">View All Questions <span aria-hidden="true" className="ml-1.5">→</span></a>
        </div>
        <div id="conference-faq-list" className="scroll-mt-24">
          <FaqAccordion items={conferenceFaqs} accent="#2456c7" columns={1} density="compact" variant="minimal" className="mt-3" />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conferenceServiceJsonLd) }} />
      </section>

      <section className="relative mt-4 min-h-[250px] overflow-hidden rounded-2xl border border-[#172c53] bg-[#071936] shadow-[0_8px_28px_rgba(7,25,54,0.18)]" aria-labelledby="conference-final-cta">
        <Image src="/images/conference_system_projects/project2.webp" alt="" fill sizes="100vw" className="object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,54,0.99)_0%,rgba(7,25,54,0.96)_37%,rgba(7,25,54,0.68)_60%,rgba(7,25,54,0.18)_100%)]" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[250px] max-w-[520px] flex-col justify-center px-5 py-6 sm:px-7 md:px-9">
          <h2 id="conference-final-cta" className="max-w-[390px] !text-[24px] font-black leading-[1.08] tracking-tight text-white sm:!text-[28px]">Ready to Build Your Perfect Conference Room?</h2>
          <p className="mt-2 max-w-[390px] text-left text-[11px] font-medium leading-[1.15rem] text-blue-100 sm:text-xs">Our experts will design the right conference solution for your space, budget, and meeting requirements.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/contact/?project=conference-system" className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#f45b18] px-5 text-[10px] font-extrabold text-white shadow-sm transition hover:bg-[#db490d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60">Get Free BOQ <span aria-hidden="true" className="ml-1.5">→</span></Link>
            <a href={conferenceEngineerWhatsAppHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-white/45 bg-white/10 px-5 text-[10px] font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-3.8-.9L3 21l1.8-5a8.5 8.5 0 1 1 16.2-4.5Z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></svg>
              Talk to an AV Engineer
            </a>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[8px] font-semibold text-blue-100 sm:text-[9px]">
            {["Project Consultation", "Customized Solution", "Clear BOQ Pricing", "Bangladesh-Based Support"].map((item) => (
              <li key={item} className="flex items-center gap-1.5"><span className="inline-flex h-3 w-3 items-center justify-center rounded-full border border-blue-200/60 text-[7px]" aria-hidden="true">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
