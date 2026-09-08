import { boschConferenceProducts, cmxConferenceProducts } from "./catalog.brands";
import { newBoschConferenceProducts } from "./catalog.bosch";
import { toaConferenceProducts } from "./catalog.toa";
import { newSponConferenceProducts } from "./catalog.spon";
import { formatBdtAmount, formatBdtRange } from "../../lib/price";
import {
  CONFERENCE_PRODUCT_TYPES,
  CONFERENCE_PRODUCT_TYPE_LABELS,
  type ConferenceProductType,
} from "./conferenceProductDisplayType";

export {
  CONFERENCE_PRODUCT_TYPES,
  CONFERENCE_PRODUCT_TYPE_LABELS,
  type ConferenceProductType,
} from "./conferenceProductDisplayType";

const CONFERENCE_IMAGE_BASE = "/assets/conference-system/products/core";

export const CONFERENCE_SYSTEM_CATEGORIES = ["audio", "video", "hybrid"] as const;
export const CONFERENCE_SYSTEM_TYPES = ["audio", "digital", "video-hybrid", "paperless"] as const;
export const CONFERENCE_CONNECTIONS = ["wired", "wireless", "hybrid"] as const;
export const CONFERENCE_ROOM_SIZES = ["small", "medium", "large", "auditorium"] as const;
export const CONFERENCE_AVAILABILITIES = ["in-stock", "project-order", "contact"] as const;

export type ConferenceSystemCategory = (typeof CONFERENCE_SYSTEM_CATEGORIES)[number];
export type ConferenceSystemType = (typeof CONFERENCE_SYSTEM_TYPES)[number];
export type ConferenceConnection = (typeof CONFERENCE_CONNECTIONS)[number];
export type ConferenceRoomSize = (typeof CONFERENCE_ROOM_SIZES)[number];
export type ConferenceAvailability = (typeof CONFERENCE_AVAILABILITIES)[number];

type ConferencePriceMetadata = {
  currency: "BDT";
  displayLabel: string;
  /** Only populate from a reliable commercial source; never infer from file dates. */
  updatedAt?: string;
};

export type ConferencePrice =
  | (ConferencePriceMetadata & { type: "fixed"; amount: number })
  | (ConferencePriceMetadata & { type: "range"; min: number; max: number; maxQualifier?: "plus" })
  | (ConferencePriceMetadata & { type: "request" });

export type ConferenceProductImage = {
  src: string;
  alt: string;
  primary?: boolean;
};

export type ConferenceProductBrand = { name: string; slug: string };

export type ConferenceProduct = {
  id: string;
  slug: string;
  name: string;
  model?: string;
  brand?: ConferenceProductBrand;
  /** Multi-value solution classification; kept separate from physical connection. */
  systemTypes?: ConferenceSystemType[];
  /** Primary meeting modality retained for comparison and legacy query compatibility. */
  systemCategory?: ConferenceSystemCategory;
  connection?: ConferenceConnection;
  /** Verified manufacturer series/family only; never inferred from brand alone. */
  systemFamily?: string;
  productTypes: ConferenceProductType[];
  price: ConferencePrice;
  availability?: ConferenceAvailability;
  shortDescription: string;
  description: string;
  keyFeatures: string[];
  specifications: { key: string; value: string }[];
  applications: string[];
  participantRange?: { min?: number; max?: number };
  roomSizes?: ConferenceRoomSize[];
  compatibleProductIds: string[];
  images: ConferenceProductImage[];
  datasheet?: string;
  manual?: string;
  brochure?: string;
  warranty?: string;
  featured?: boolean;
  badge: string;
  tags: string[];
  legacy?: { oldSlug?: string };
};

function conferenceImage(fileName: string): string {
  return `${CONFERENCE_IMAGE_BASE}/${encodeURIComponent(fileName)}`;
}

const sapF88eMain = conferenceImage("SPON SAP-F88E 8x8 Digital Audio Processor with DSP.png");
const sapF88eAlt = conferenceImage("SAP-F88E.webp");
const lcs5252dMain = conferenceImage("SPON LCS-5252D Wireless Conference Delegate Unit.webp");
const lcs5252dSide = conferenceImage("SPON LCS-5252D Wireless Conference Delegate Unit side .webp");
const lcs5252dBack = conferenceImage("SPON LCS-5252D Wireless Conference Delegate Unit back.webp");
const lcm6013cvMain = conferenceImage("SPON LCM-6013CV-L Digital Conference Chairman Unit.webp");
const lcm6013cvSide = conferenceImage("SPON LCM-6013CV-L Digital Conference Chairman Unit side.webp");
const lcm6013dvMain = conferenceImage("SPON LCM-6013DV-L Digital Conference Delegate Unit.webp");
const lcm6013dvFront = conferenceImage("SPON LCM-6013DV-L Digital Conference Delegate Unit front.webp");
const lcm6015pMain = conferenceImage("SPON LCM-6015P 12-Port Wireless Microphone Charger.webp");
const lcm6015pPerspective = conferenceImage("SPON LCM-6015P 12-Port Wireless Microphone Charger perspective.webp");
const lcm6010Front = conferenceImage("SPON LCM-6010 Digital Conference System Central Unit front.png");
const lcm6010Back = conferenceImage("SPON LCM-6010 Digital Conference System Central Unit back.png");

const coreConferenceProducts: ConferenceProduct[] = [
  {
    id: "spon-gen-5301p26-network-integrated-amplifier",
    slug: "spon-gen-5301p26-network-integrated-amplifier",
    name: "SPON GEN-5301P26 Network Integrated Amplifier",
    model: "GEN-5301P26",
    brand: { name: "SPON", slug: "spon" },
    systemCategory: "audio",
    productTypes: ["amplifier"],
    price: { type: "range", min: 65000, max: 90000, currency: "BDT", displayLabel: "৳65,000 - ৳90,000" },
    availability: "project-order",
    shortDescription: "Network integrated amplifier for conference audio routing, room sound reinforcement, and system integration.",
    images: [
      { src: conferenceImage("SPON GEN-5301P26 Network Integrated Amplifier.webp"), alt: "SPON GEN-5301P26 Network Integrated Amplifier", primary: true },
    ],
    compatibleProductIds: ["spon-sap-f88e-8x8-digital-audio-processor-dsp", "spon-lcm-6010-digital-conference-system-central-unit"],
    badge: "Amplifier",
    tags: ["SPON", "Network Audio", "Amplifier"],
    keyFeatures: [
      "Network integrated amplifier for meeting and conference audio",
      "Supports centralized room sound planning",
      "Useful with conference microphones, speakers, and control systems",
      "Suitable for project-based audio integration",
    ],
    applications: ["Conference Room", "Control Room", "Training Venue"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "GEN-5301P26" },
      { key: "Product Type", value: "Network integrated amplifier" },
      { key: "Series", value: "SPON GEN-5301 network audio range" },
      { key: "Installation", value: "Rack mount at the AV position" },
      { key: "Use Case", value: "Conference audio reinforcement and room integration" },
      { key: "System Role", value: "Amplification and network audio support" },
      { key: "Quotation", value: "Project price on request" },
    ],
    description:
      "The SPON GEN-5301P26 Network Integrated Amplifier is positioned for conference rooms, control rooms, and training venues where microphone audio needs stable reinforcement and integration with a wider room audio system. It can be included in a complete conference BOQ with microphones, speakers, processors, and control equipment.",
  },
  {
    id: "spon-sap-f88e-8x8-digital-audio-processor-dsp",
    slug: "spon-sap-f88e-8x8-digital-audio-processor-dsp",
    name: "SPON SAP-F88E 8x8 Digital Audio Processor with DSP",
    model: "SAP-F88E",
    brand: { name: "SPON", slug: "spon" },
    systemCategory: "audio",
    productTypes: ["dsp"],
    price: { type: "range", min: 60000, max: 75000, currency: "BDT", displayLabel: "৳60,000 - ৳75,000" },
    availability: "project-order",
    shortDescription: "8-input and 8-output digital audio processor with DSP for conference rooms, training halls, and AV integration.",
    images: [
      { src: sapF88eMain, alt: "SPON SAP-F88E 8x8 Digital Audio Processor with DSP", primary: true },
      { src: sapF88eAlt, alt: "SPON SAP-F88E Digital Audio Processor alternate view" },
    ],
    compatibleProductIds: ["spon-gen-5301p26-network-integrated-amplifier", "spon-lcm-6010-digital-conference-system-central-unit"],
    badge: "DSP Processor",
    tags: ["SPON", "DSP", "8x8 Audio"],
    keyFeatures: [
      "8 x 8 digital audio processing for conference AV systems",
      "DSP tuning support for cleaner microphone and speaker output",
      "Useful for feedback control, routing, and room audio balancing",
      "Designed for professional conference and training environments",
    ],
    applications: ["Conference Hall", "Government Office", "University"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "SAP-F88E" },
      { key: "Product Type", value: "Digital audio processor with DSP" },
      { key: "Series", value: "SPON SAP audio processing range" },
      { key: "Installation", value: "Rack mount at the AV position" },
      { key: "Input / Output", value: "8 x 8 audio processing class" },
      { key: "Application", value: "Conference room DSP, AV routing, audio tuning" },
      { key: "Quotation", value: "Available after project requirement review" },
    ],
    description:
      "The SPON SAP-F88E 8x8 Digital Audio Processor with DSP is used when a conference room needs cleaner microphone management, routing flexibility, and tuned speaker output. It is useful for meeting rooms, boardrooms, training halls, and auditoriums where speech clarity and stable audio behavior are important. Sasha Corporation can include this processor in a complete conference AV design with installation and commissioning support.",
  },
  {
    id: "spon-lcm-6010-digital-conference-system-central-unit",
    slug: "spon-lcm-6010-digital-conference-system-central-unit",
    name: "SPON LCM-6010 Digital Conference System Central Unit",
    model: "LCM-6010",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wired",
    productTypes: ["control-unit"],
    price: { type: "range", min: 55000, max: 75000, currency: "BDT", displayLabel: "৳55,000 - ৳75,000" },
    availability: "project-order",
    shortDescription: "Central control unit for SPON digital conference systems with chairman and delegate microphone management.",
    images: [
      { src: lcm6010Front, alt: "SPON LCM-6010 Digital Conference System Central Unit", primary: true },
      { src: lcm6010Back, alt: "SPON LCM-6010 Digital Conference System Central Unit back" },
    ],
    compatibleProductIds: ["spon-lcm-6013cv-l-digital-conference-chairman-unit", "spon-lcm-6013dv-l-digital-conference-delegate-unit"],
    badge: "Central Unit",
    tags: ["SPON", "Central Unit", "Digital Conference"],
    keyFeatures: [
      "Central unit for digital conference microphone systems",
      "Supports chairman and delegate unit management",
      "Front and rear panel connectivity for system installation",
      "Suitable for structured meeting and discussion environments",
    ],
    applications: ["Boardroom", "Council Chamber", "Seminar Hall"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCM-6010" },
      { key: "Product Type", value: "Digital conference system central unit" },
      { key: "Series", value: "SPON LCM digital conference range" },
      { key: "System Role", value: "Chairman/delegate unit control and audio management" },
      { key: "Installation", value: "Rack/table equipment setup based on project design" },
      { key: "Quotation", value: "Project price on request" },
    ],
    description:
      "The SPON LCM-6010 Digital Conference System Central Unit is the control point for a structured digital conference microphone setup. It is suitable for meeting rooms that need chairman and delegate units, clear speaking order, and professional meeting audio management. The final BOQ depends on the number of microphones, cable routing, table layout, and integration with speakers or recording equipment.",
  },
  {
    id: "spon-lcm-6013cv-l-digital-conference-chairman-unit",
    slug: "spon-lcm-6013cv-l-digital-conference-chairman-unit",
    name: "SPON LCM-6013CV-L Digital Conference Chairman Unit",
    model: "LCM-6013CV-L",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wired",
    productTypes: ["chairman-unit"],
    price: { type: "fixed", amount: 21500, currency: "BDT", displayLabel: "৳21,500" },
    availability: "project-order",
    shortDescription: "Conference microphone chairman unit with tri-band Wi-Fi 6, video tracking, chairman control, and a touch screen.",
    images: [
      { src: "/assets/conference-system/products/brands/spon/LCM-6013CV-L.webp", alt: "SPON LCM-6013CV-L conference microphone chairman unit", primary: true },
      { src: lcm6013cvMain, alt: "SPON LCM-6013CV-L Digital Conference Chairman Unit" },
      { src: lcm6013cvSide, alt: "SPON LCM-6013CV-L Digital Conference Chairman Unit side view" },
    ],
    compatibleProductIds: ["spon-lcm-6010-digital-conference-system-central-unit", "spon-lcm-6013dv-l-digital-conference-delegate-unit"],
    badge: "Chairman Unit",
    tags: ["SPON", "Chairman Unit", "Wi-Fi 6", "Video Tracking"],
    keyFeatures: [
      "Tri-band Wi-Fi 6",
      "Video tracking",
      "Chairman control",
      "4.3-inch touch screen and speech status indicator",
    ],
    applications: ["Chairperson Desk", "Boardroom", "Council Chamber"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCM-6013CV-L" },
      { key: "Product Type", value: "Conference microphone chairman unit" },
      { key: "Series", value: "SPON LCM digital conference range" },
      { key: "Installation", value: "Tabletop at the chairperson position" },
      { key: "Power Supply", value: "Powered by conference central control unit, DC 24V" },
      { key: "Power Consumption", value: "<=3 W" },
      { key: "Audio Codec Formats", value: "MP3, PCM, ADPCM" },
      { key: "Audio Sampling Rate and Bitrate", value: "8 kHz-48 kHz, 16-bit, 8 kbps-320 kbps" },
      { key: "Signal-to-Noise Ratio", value: ">=83 dB" },
      { key: "Display", value: "4-inch capacitive touch screen" },
      { key: "Headphone Output", value: "3.5 mm stereo jack" },
      { key: "Connectivity", value: "Cat6 network cable" },
      { key: "Microphone", value: "Gooseneck microphone" },
      { key: "Interfaces", value: "2 x RJ45 Ethernet ports for connection to the next microphone unit" },
      { key: "Operating Temperature and Humidity", value: "0°C to +45°C, <=90% RH non-condensing" },
      { key: "Product Dimensions", value: "168 x 103 x 289 mm" },
    ],
    description:
      "The LCM-6013CV-L is a conference microphone chairman unit for structured discussion control in boardrooms, council rooms, and institutional meeting spaces. It combines chairman control, video tracking, tri-band Wi-Fi 6 capability, a speech status indicator, and a capacitive touch screen. Cat6 connectivity and dual RJ45 ports support connection within a compatible conference system, while the gooseneck microphone provides a dedicated chairperson speaking position.",
  },
  {
    id: "spon-lcm-6013dv-l-digital-conference-delegate-unit",
    slug: "spon-lcm-6013dv-l-digital-conference-delegate-unit",
    name: "SPON LCM-6013DV-L Digital Conference Delegate Unit",
    model: "LCM-6013DV-L",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wired",
    productTypes: ["delegate-unit"],
    price: { type: "fixed", amount: 19500, currency: "BDT", displayLabel: "৳19,500" },
    availability: "project-order",
    shortDescription: "Delegate microphone unit for SPON digital conference systems in boardrooms, meeting rooms, and seminar halls.",
    images: [
      { src: lcm6013dvMain, alt: "SPON LCM-6013DV-L Digital Conference Delegate Unit", primary: true },
      { src: lcm6013dvFront, alt: "SPON LCM-6013DV-L Digital Conference Delegate Unit front view" },
    ],
    compatibleProductIds: ["spon-lcm-6010-digital-conference-system-central-unit", "spon-lcm-6013cv-l-digital-conference-chairman-unit"],
    badge: "Delegate Unit",
    tags: ["SPON", "Delegate Unit", "Conference Mic"],
    keyFeatures: [
      "Delegate microphone unit for participant speech pickup",
      "Designed for structured conference table discussion",
      "Works as part of a digital chairman/delegate conference setup",
      "Suitable for scalable meeting room microphone planning",
    ],
    applications: ["Participant Table", "Meeting Room", "Training Venue"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCM-6013DV-L" },
      { key: "Product Type", value: "Digital conference delegate unit" },
      { key: "Series", value: "SPON LCM digital conference range" },
      { key: "Installation", value: "Tabletop at each participant position" },
      { key: "Microphone Style", value: "Desktop gooseneck conference microphone" },
      { key: "System Compatibility", value: "SPON digital conference system planning" },
      { key: "Quotation", value: "Based on delegate unit quantity and installation scope" },
    ],
    description:
      "The SPON LCM-6013DV-L Digital Conference Delegate Unit gives each participant a dedicated microphone point for organized meetings. It can be paired with a chairman unit and central controller to build a complete conference table system. Sasha Corporation can help plan the right number of delegate units, cabling, controller selection, and installation layout.",
  },
  {
    id: "spon-lcm-6015p-12-port-wireless-microphone-charger",
    slug: "spon-lcm-6015p-12-port-wireless-microphone-charger",
    name: "SPON LCM-6015P 12-Port Wireless Microphone Charger",
    model: "LCM-6015P",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wireless",
    productTypes: ["charger"],
    price: { type: "fixed", amount: 34500, currency: "BDT", displayLabel: "৳34,500" },
    availability: "project-order",
    shortDescription: "12-port charging unit for wireless conference microphone systems and delegate unit battery management.",
    images: [
      { src: lcm6015pMain, alt: "SPON LCM-6015P 12-Port Wireless Microphone Charger", primary: true },
      { src: lcm6015pPerspective, alt: "SPON LCM-6015P 12-Port Wireless Microphone Charger perspective view" },
    ],
    compatibleProductIds: ["spon-lcs-5252d-wireless-conference-delegate-unit", "spon-lcs-5301z-wireless-digital-conference-access-point"],
    badge: "Charger",
    tags: ["SPON", "12-Port", "Wireless Mic"],
    keyFeatures: [
      "12-port charger for wireless conference microphone units",
      "Helps keep delegate units ready for scheduled meetings",
      "Useful for venues with multiple wireless microphone devices",
      "Supports organized charging and storage workflow",
    ],
    applications: ["Wireless Conference", "Training Center", "Meeting Venue"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCM-6015P" },
      { key: "Product Type", value: "12-port wireless microphone charger" },
      { key: "Series", value: "SPON LCM digital conference range" },
      { key: "Installation", value: "Shelf or cabinet at the storage position" },
      { key: "Charging Capacity", value: "Up to 12 compatible wireless microphone units" },
      { key: "Application", value: "Wireless conference microphone charging workflow" },
      { key: "Quotation", value: "Available with wireless system package" },
    ],
    description:
      "The SPON LCM-6015P 12-Port Wireless Microphone Charger is useful for conference venues that use multiple wireless microphones or delegate units. It keeps the equipment organized and ready before meetings, training sessions, and events. It is usually planned as part of a complete wireless conference system package.",
  },
  {
    id: "spon-lcs-5251cd-digital-conference-microphone-system",
    slug: "spon-lcs-5251cd-digital-conference-microphone-system",
    name: "SPON LCS-5251CD Digital Conference Microphone System",
    model: "LCS-5251CD",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wired",
    productTypes: ["microphone"],
    price: { type: "fixed", amount: 23500, currency: "BDT", displayLabel: "৳23,500" },
    availability: "project-order",
    shortDescription: "Digital conference microphone system for professional meeting rooms requiring organized speech pickup.",
    images: [
      { src: conferenceImage("SPON LCS-5251CD Digital Conference Microphone System.webp"), alt: "SPON LCS-5251CD Digital Conference Microphone System", primary: true },
    ],
    compatibleProductIds: ["spon-lcm-6010-digital-conference-system-central-unit", "spon-sap-f88e-8x8-digital-audio-processor-dsp"],
    badge: "Digital System",
    tags: ["SPON", "Digital Conference", "Microphone System"],
    keyFeatures: [
      "Digital conference microphone system for professional meetings",
      "Supports structured chairman and delegate style discussion planning",
      "Designed for clear voice pickup and organized table workflow",
      "Suitable for corporate, institutional, and government meeting rooms",
    ],
    applications: ["Boardroom", "Conference Room", "Seminar Room"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCS-5251CD" },
      { key: "Product Type", value: "Digital conference microphone system" },
      { key: "Series", value: "SPON LCS conference microphone range" },
      { key: "Installation", value: "Tabletop conference setup" },
      { key: "Application", value: "Professional discussion and meeting audio" },
      { key: "Planning", value: "Chairman/delegate quantity depends on table layout" },
      { key: "Quotation", value: "Project price on request" },
    ],
    description:
      "The SPON LCS-5251CD Digital Conference Microphone System is suitable for offices, institutions, government rooms, and conference venues that need organized speech pickup. It can be planned as a full chairman/delegate setup with cabling, control, speaker output, and installation support.",
  },
  {
    id: "spon-lcs-5252d-wireless-conference-delegate-unit",
    slug: "spon-lcs-5252d-wireless-conference-delegate-unit",
    name: "SPON LCS-5252D Wireless Conference Delegate Unit",
    model: "LCS-5252D",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wireless",
    productTypes: ["delegate-unit"],
    price: { type: "fixed", amount: 24500, currency: "BDT", displayLabel: "৳24,500" },
    availability: "project-order",
    shortDescription: "Wireless digital conference delegate unit with touch-screen style control for modern meeting rooms.",
    images: [
      { src: lcs5252dMain, alt: "SPON LCS-5252D Wireless Conference Delegate Unit", primary: true },
      { src: lcs5252dSide, alt: "SPON LCS-5252D Wireless Conference Delegate Unit side view" },
      { src: lcs5252dBack, alt: "SPON LCS-5252D Wireless Conference Delegate Unit back view" },
    ],
    compatibleProductIds: ["spon-lcs-5301z-wireless-digital-conference-access-point", "spon-lcm-6015p-12-port-wireless-microphone-charger"],
    badge: "Wireless Delegate",
    tags: ["SPON", "Wireless", "Delegate Unit", "Touch Screen"],
    keyFeatures: [
      "Professional wireless digital conference delegate unit",
      "Touch-screen style control surface for meeting interaction",
      "Supports wireless tabletop conference deployment",
      "Useful for attendance, voting, and structured discussion workflows",
      "Designed for modern boardroom and council chamber environments",
    ],
    applications: ["Boardroom", "Council Chamber", "Executive Meeting"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCS-5252D" },
      { key: "Product Type", value: "Wireless digital conference delegate unit" },
      { key: "Series", value: "SPON LCS conference microphone range" },
      { key: "Installation", value: "Tabletop, repositionable between meetings" },
      { key: "Display", value: "Touch-screen style control interface" },
      { key: "Communication", value: "Wireless conference operation" },
      { key: "Functions", value: "Discussion, attendance, voting workflow support" },
      { key: "Recommended Use", value: "Boardroom, council chamber, executive meeting room" },
      { key: "Price", value: "24,500 BDT" },
    ],
    description:
      "The SPON LCS-5252D Wireless Conference Delegate Unit is a premium tabletop delegate station for modern conference rooms. It is useful when a meeting room needs a cable-light layout, participant microphone control, attendance or voting workflow support, and a professional appearance on the table. The product can be planned with matching access point, charging unit, chairman unit, and installation support based on the number of participants and room layout.",
  },
  {
    id: "spon-lcs-5301z-wireless-digital-conference-access-point",
    slug: "spon-lcs-5301z-wireless-digital-conference-access-point",
    name: "SPON LCS-5301Z Wireless Digital Conference Access Point",
    model: "LCS-5301Z",
    brand: { name: "SPON", slug: "spon" },
    systemTypes: ["audio", "digital"],
    systemCategory: "audio",
    connection: "wireless",
    productTypes: ["access-point"],
    price: { type: "fixed", amount: 36500, currency: "BDT", displayLabel: "৳36,500" },
    availability: "project-order",
    shortDescription: "Wireless conference access point for connecting compatible SPON wireless chairman and delegate units.",
    images: [
      { src: conferenceImage("SPON LCS-5301Z Wireless Digital Conference Access Point.webp"), alt: "SPON LCS-5301Z Wireless Digital Conference Access Point", primary: true },
    ],
    compatibleProductIds: ["spon-lcs-5252d-wireless-conference-delegate-unit", "spon-lcm-6015p-12-port-wireless-microphone-charger"],
    badge: "Access Point",
    tags: ["SPON", "Wireless", "Access Point"],
    keyFeatures: [
      "Wireless access point for compatible SPON conference systems",
      "Supports communication between wireless microphone units and controller workflow",
      "Useful for cable-light meeting room deployments",
      "Planned based on room size, microphone count, and coverage requirement",
    ],
    applications: ["Wireless Boardroom", "Council Room", "Meeting Hall"],
    specifications: [
      { key: "Brand", value: "SPON" },
      { key: "Model", value: "LCS-5301Z" },
      { key: "Product Type", value: "Wireless digital conference access point" },
      { key: "Series", value: "SPON LCS conference microphone range" },
      { key: "Installation", value: "Wall or ceiling mount with table line of sight" },
      { key: "Application", value: "Wireless chairman/delegate conference system connectivity" },
      { key: "Planning", value: "Coverage depends on room size and unit quantity" },
      { key: "Quotation", value: "Project price on request" },
    ],
    description:
      "The SPON LCS-5301Z Wireless Digital Conference Access Point is used in wireless conference systems to support communication with compatible chairman and delegate units. It should be selected as part of a full wireless conference design, considering room size, seating layout, microphone quantity, and expected operating workflow.",
  },
  {
    id: "gen-5301p13-conference-microphone-unit",
    slug: "gen-5301p13-conference-microphone-unit",
    name: "SPON GEN-5301P13 Conference Microphone Unit",
    model: "GEN-5301P13",
    brand: { name: "SPON", slug: "spon" },
    systemCategory: "audio",
    connection: "wired",
    productTypes: ["microphone"],
    price: { type: "fixed", amount: 18500, currency: "BDT", displayLabel: "৳18,500" },
    availability: "project-order",
    shortDescription: "Desktop gooseneck conference microphone unit for clean speech pickup in small and medium meeting rooms.",
    images: [
      { src: conferenceImage("GEN-5301P13.webp"), alt: "SPON GEN-5301P13 Conference Microphone Unit", primary: true },
    ],
    compatibleProductIds: ["spon-lcm-6010-digital-conference-system-central-unit", "spon-gen-5301p26-network-integrated-amplifier"],
    badge: "Microphone Unit",
    tags: ["Conference Mic", "Gooseneck", "Meeting Room"],
    keyFeatures: [
      "Desktop conference microphone for organized speaker pickup",
      "Gooseneck mic design for clear speech direction",
      "Simple meeting-room operation with stable table placement",
      "Suitable for boardroom, training, and seminar discussion setups",
    ],
    applications: ["Boardroom", "Training Room", "Seminar Hall"],
    specifications: [
      { key: "Model", value: "GEN-5301P13" },
      { key: "Product Type", value: "Conference microphone unit" },
      { key: "Series", value: "SPON GEN-5301 network audio range" },
      { key: "Microphone Style", value: "Desktop gooseneck" },
      { key: "Application", value: "Meeting room, boardroom, seminar discussion" },
      { key: "Installation", value: "Tabletop conference setup" },
      { key: "Quotation", value: "Available based on system quantity and project scope" },
    ],
    description:
      "The GEN-5301P13 Conference Microphone Unit is a practical tabletop microphone for meeting rooms where clear speaker pickup and simple operation are important. It can be planned for boardrooms, training rooms, seminar halls, and office discussion spaces. Sasha Corporation can support product selection, quantity planning, cabling guidance, installation, and after-sales support for complete conference system projects in Bangladesh.",
  },
  {
    id: "nac-720w-wireless-conference-system",
    slug: "nac-720w-wireless-conference-system",
    name: "SPON NAC-720W Wireless Conference System",
    model: "NAC-720W",
    brand: { name: "SPON", slug: "spon" },
    systemCategory: "audio",
    connection: "wireless",
    productTypes: ["other"],
    price: { type: "fixed", amount: 145000, currency: "BDT", displayLabel: "৳145,000" },
    availability: "project-order",
    shortDescription: "Wireless conference solution for flexible seating layouts and clean table arrangements without heavy microphone cabling.",
    images: [
      { src: conferenceImage("NAC-720W.webp"), alt: "SPON NAC-720W Wireless Conference System", primary: true },
    ],
    compatibleProductIds: ["spon-lcs-5301z-wireless-digital-conference-access-point", "spon-lcs-5252d-wireless-conference-delegate-unit"],
    badge: "Wireless System",
    tags: ["Wireless", "Conference", "Flexible Setup"],
    keyFeatures: [
      "Wireless conference workflow for cleaner meeting tables",
      "Flexible seating plan support for changing room layouts",
      "Useful for corporate, hotel, and council meeting environments",
      "Project-based setup with microphone quantity and coverage planning",
    ],
    applications: ["Corporate Meeting", "Council Room", "Hotel Conference"],
    specifications: [
      { key: "Model", value: "NAC-720W" },
      { key: "Product Type", value: "Wireless conference system" },
      { key: "Series", value: "SPON NAC wireless conference range" },
      { key: "Installation", value: "Tabletop and wall positions per room layout" },
      { key: "Connection", value: "Wireless conference microphone workflow" },
      { key: "Room Planning", value: "Flexible seating and table arrangement" },
      { key: "Support", value: "BOQ, installation, testing, and commissioning" },
      { key: "Quotation", value: "Project price on request" },
    ],
    description:
      "The NAC-720W Wireless Conference System is suitable for meeting rooms where cable-free table setup and flexible seating are preferred. It helps simplify conference room planning for organizations that change seating positions, host regular meetings, or need a cleaner tabletop appearance. Final configuration depends on microphone quantity, room size, control requirements, and installation scope.",
  },
];

/**
 * Full public Conference catalog: the original core products plus the
 * brand ranges photographed for Bosch, CMX, and TOA.
 */
export const conferenceSystemCatalog: ConferenceProduct[] = [
  ...coreConferenceProducts,
  ...newSponConferenceProducts,
  ...boschConferenceProducts,
  ...newBoschConferenceProducts,
  ...cmxConferenceProducts,
  ...toaConferenceProducts,
];

export function getConferenceProducts(): readonly ConferenceProduct[] {
  return conferenceSystemCatalog;
}

export function getConferenceProductBySlug(slug: string): ConferenceProduct | undefined {
  return conferenceSystemCatalog.find((product) => product.slug === slug);
}

export function getConferenceProductById(id: string): ConferenceProduct | undefined {
  return conferenceSystemCatalog.find((product) => product.id === id);
}

export function getConferenceProductsByBrand(brandSlug: string): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => product.brand?.slug === brandSlug);
}

/** Brand identities derived from products; taxonomy adds route copy and presentation metadata separately. */
export function getConferenceCatalogBrands(
  products: readonly ConferenceProduct[] = conferenceSystemCatalog,
): ConferenceProductBrand[] {
  const brands = new Map<string, ConferenceProductBrand>();
  for (const product of products) {
    if (product.brand && !brands.has(product.brand.slug)) brands.set(product.brand.slug, product.brand);
  }
  return [...brands.values()];
}

export function getConferenceProductsBySystemCategory(category: ConferenceSystemCategory): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => product.systemCategory === category);
}

/**
 * Returns customer-facing system classifications without treating wired or
 * wireless topology as a system type. Older audio/video records inherit their
 * established meeting modality; products with overlapping or corrected
 * classifications declare systemTypes directly in the canonical catalog.
 */
export function getConferenceProductSystemTypes(product: ConferenceProduct): ConferenceSystemType[] {
  if (product.systemTypes?.length) return [...product.systemTypes];
  if (product.systemCategory === "audio") return ["audio"];
  if (product.systemCategory === "video" || product.systemCategory === "hybrid") return ["video-hybrid"];
  return [];
}

export function getConferenceProductsBySystemType(systemType: ConferenceSystemType): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => getConferenceProductSystemTypes(product).includes(systemType));
}

export function getConferenceProductsByConnection(connection: ConferenceConnection): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => product.connection === connection);
}

export function getConferenceProductsByType(productType: ConferenceProductType): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => product.productTypes.includes(productType));
}

export function getConferenceProductsBySystemFamily(systemFamily: string): ConferenceProduct[] {
  const normalizedFamily = systemFamily.trim().toLocaleLowerCase("en-US");
  if (!normalizedFamily) return [];
  return conferenceSystemCatalog.filter(
    (product) => product.systemFamily?.toLocaleLowerCase("en-US") === normalizedFamily,
  );
}

export function getConferenceProductsByRoomSize(roomSize: ConferenceRoomSize): ConferenceProduct[] {
  return conferenceSystemCatalog.filter((product) => product.roomSizes?.includes(roomSize));
}

export function getConferenceProductPricing(product: ConferenceProduct): ConferencePrice {
  return product.price;
}

export type ConferenceCatalogIntegrityReport = {
  totalProducts: number;
  byBrand: Record<string, number>;
  byProductType: Record<ConferenceProductType, number>;
  byConnection: Record<ConferenceConnection | "unknown", number>;
  byMeetingType: Record<ConferenceSystemCategory | "unknown", number>;
  bySystemType: Record<ConferenceSystemType, number>;
  byPriceType: Record<ConferencePrice["type"], number>;
  byAvailability: Record<ConferenceAvailability | "unknown", number>;
  withSystemFamily: number;
  withParticipantCapacity: number;
  withCompatibilityData: number;
  dataQuality: {
    missingBrand: string[];
    missingNameOrModel: string[];
    missingProductTypes: string[];
    missingSystemCategory: string[];
    missingSystemTypes: string[];
    missingConnection: string[];
    missingPriceClassification: string[];
    invalidNumericPrice: string[];
    missingSlug: string[];
    missingAvailability: string[];
  };
  missing: {
    priceUpdateDate: number;
    availability: number;
    warranty: number;
    systemFamily: number;
    participantCapacity: number;
    compatibility: number;
    datasheet: number;
    manual: number;
    brochure: number;
  };
};

/** Build/reporting helper only; it does not mutate or enrich catalog records. */
export function getConferenceCatalogIntegrityReport(
  products: readonly ConferenceProduct[] = conferenceSystemCatalog,
): ConferenceCatalogIntegrityReport {
  const byProductType = Object.fromEntries(
    CONFERENCE_PRODUCT_TYPES.map((type) => [type, 0]),
  ) as Record<ConferenceProductType, number>;
  const report: ConferenceCatalogIntegrityReport = {
    totalProducts: products.length,
    byBrand: {},
    byProductType,
    byConnection: { wired: 0, wireless: 0, hybrid: 0, unknown: 0 },
    byMeetingType: { audio: 0, video: 0, hybrid: 0, unknown: 0 },
    bySystemType: { audio: 0, digital: 0, "video-hybrid": 0, paperless: 0 },
    byPriceType: { fixed: 0, range: 0, request: 0 },
    byAvailability: { "in-stock": 0, "project-order": 0, contact: 0, unknown: 0 },
    withSystemFamily: 0,
    withParticipantCapacity: 0,
    withCompatibilityData: 0,
    dataQuality: {
      missingBrand: [],
      missingNameOrModel: [],
      missingProductTypes: [],
      missingSystemCategory: [],
      missingSystemTypes: [],
      missingConnection: [],
      missingPriceClassification: [],
      invalidNumericPrice: [],
      missingSlug: [],
      missingAvailability: [],
    },
    missing: {
      priceUpdateDate: 0,
      availability: 0,
      warranty: 0,
      systemFamily: 0,
      participantCapacity: 0,
      compatibility: 0,
      datasheet: 0,
      manual: 0,
      brochure: 0,
    },
  };

  for (const product of products) {
    const reference = product.slug || product.id || "unknown-product";
    if (!product.brand?.name.trim() || !product.brand.slug.trim()) report.dataQuality.missingBrand.push(reference);
    if (!product.name.trim() && !product.model?.trim()) report.dataQuality.missingNameOrModel.push(reference);
    if (!product.productTypes.length) report.dataQuality.missingProductTypes.push(reference);
    const systemTypes = getConferenceProductSystemTypes(product);
    if (!product.systemCategory && !systemTypes.length) report.dataQuality.missingSystemCategory.push(reference);
    if (!systemTypes.length) report.dataQuality.missingSystemTypes.push(reference);
    if (!product.connection) report.dataQuality.missingConnection.push(reference);
    if (!(["fixed", "range", "request"] as const).includes(product.price.type)) {
      report.dataQuality.missingPriceClassification.push(reference);
    }
    if (
      (product.price.type === "fixed" && (!Number.isFinite(product.price.amount) || product.price.amount <= 0)) ||
      (product.price.type === "range" && (
        !Number.isFinite(product.price.min) ||
        !Number.isFinite(product.price.max) ||
        product.price.min <= 0 ||
        product.price.max < product.price.min
      ))
    ) {
      report.dataQuality.invalidNumericPrice.push(reference);
    }
    if (!product.slug.trim()) report.dataQuality.missingSlug.push(product.id || "unknown-product");
    if (!product.availability) report.dataQuality.missingAvailability.push(reference);

    const brandKey = product.brand?.slug ?? "unknown";
    report.byBrand[brandKey] = (report.byBrand[brandKey] ?? 0) + 1;
    for (const type of product.productTypes) report.byProductType[type] += 1;
    report.byConnection[product.connection ?? "unknown"] += 1;
    report.byMeetingType[product.systemCategory ?? "unknown"] += 1;
    for (const systemType of systemTypes) report.bySystemType[systemType] += 1;
    report.byPriceType[product.price.type] += 1;
    report.byAvailability[product.availability ?? "unknown"] += 1;

    if (product.systemFamily) report.withSystemFamily += 1;
    else report.missing.systemFamily += 1;
    if (product.participantRange) report.withParticipantCapacity += 1;
    else report.missing.participantCapacity += 1;
    if (product.compatibleProductIds.length) report.withCompatibilityData += 1;
    else report.missing.compatibility += 1;
    if (!product.price.updatedAt) report.missing.priceUpdateDate += 1;
    if (!product.availability) report.missing.availability += 1;
    if (!product.warranty) report.missing.warranty += 1;
    if (!product.datasheet) report.missing.datasheet += 1;
    if (!product.manual) report.missing.manual += 1;
    if (!product.brochure) report.missing.brochure += 1;
  }

  return report;
}

export function getConferenceProductPrimaryImage(product: ConferenceProduct): ConferenceProductImage {
  return product.images.find((image) => image.primary) ?? product.images[0];
}

export type ConferenceCardPrice = {
  label: string;
  state: "exact" | "range" | "request";
  qualifier?: string;
};

export type ConferencePricePresentation = ConferenceCardPrice & {
  basisLabel: "Fixed catalog price" | "Indicative equipment range" | "Project quotation";
  disclosure: string;
  updatedAt?: string;
};

/** One canonical price presenter for cards, tables, collections and product pages. */
export function getConferenceProductPricePresentation(product: ConferenceProduct): ConferencePricePresentation {
  if (product.price.type === "fixed") {
    return {
      label: formatBdtAmount(product.price.amount),
      state: "exact",
      qualifier: "Catalog price",
      basisLabel: "Fixed catalog price",
      disclosure: "Catalog price in BDT. Confirm current availability and any installation or project scope before ordering.",
      updatedAt: product.price.updatedAt,
    };
  }
  if (product.price.type === "range") {
    return {
      label: `${formatBdtRange([product.price.min, product.price.max])}${product.price.maxQualifier === "plus" ? "+" : ""}`,
      state: "range",
      qualifier: "Indicative range",
      basisLabel: "Indicative equipment range",
      disclosure: "Planning range in BDT; final equipment and project cost depends on quantity, cabling and installation scope.",
      updatedAt: product.price.updatedAt,
    };
  }
  return {
    label: "Request Price",
    state: "request",
    qualifier: "Project quotation",
    basisLabel: "Project quotation",
    disclosure: "Current price is provided after confirming the model, quantity and project requirements.",
    updatedAt: product.price.updatedAt,
  };
}

export function getConferenceProductPriceLabel(product: ConferenceProduct): string {
  return getConferenceProductPricePresentation(product).label;
}

/** Compact pricing data used by product cards. */
export function getConferenceProductCardPrice(product: ConferenceProduct): ConferenceCardPrice {
  const { label, state, qualifier } = getConferenceProductPricePresentation(product);
  return { label, state, qualifier };
}

/**
 * Commercial terms are not technical specifications. They are shown next to the
 * price instead of inside the spec table, and are kept out of the Product
 * schema's additionalProperty list.
 */
const COMMERCIAL_SPEC_KEYS = new Set(["Price Basis", "Quotation", "Price", "Support"]);

/**
 * The catalog grew a few different names for the same property. Collapsing them
 * keeps the spec table readable and lets search engines compare the same
 * property across every product instead of seeing three separate ones.
 */
const SPEC_KEY_ALIASES: Readonly<Record<string, string>> = {
  "Audio Sampling and Bitrate": "Audio Sampling / Bitrate",
  "Audio Sampling Rate and Bitrate": "Audio Sampling / Bitrate",
  "Device Dimensions": "Dimensions",
  Dimension: "Dimensions",
  Models: "Model",
  "Mounting Method": "Mounting",
  "Packed Dimensions": "Package Dimensions",
  "Gross Weight": "Package Weight",
  "Product Dimensions": "Dimensions",
  "Product Series": "Series",
  "Product Warranty": "Warranty",
  "Product Weight": "Weight",
  Functions: "Function",
  "System Compatibility": "Compatibility",
  "Microphone Style": "Microphone",
  "Room Planning": "Room Scale",
  "Recommended Use": "Application",
  "Use Case": "Application",
  "System Role": "Function",
  "Processing Role": "Function",
};

const EMPTY_SPECIFICATION_VALUES = new Set([
  "-",
  "—",
  "–",
  "n/a",
  "na",
  "not available",
  "not verified",
  "tbc",
  "tbd",
  "unknown",
]);

function isUsableSpecificationValue(value: string | undefined): value is string {
  if (!value?.trim()) return false;
  return !EMPTY_SPECIFICATION_VALUES.has(value.trim().toLocaleLowerCase("en-US"));
}

const CONNECTION_LABELS: Readonly<Record<ConferenceConnection, string>> = {
  wired: "Wired",
  wireless: "Wireless",
  hybrid: "Hybrid",
};

export function getConferenceConnectionLabel(connection: ConferenceConnection): string {
  return CONNECTION_LABELS[connection];
}

/** The only values the Connection row may hold, so the property stays comparable. */
const CONNECTION_VALUES = new Set<string>(Object.values(CONNECTION_LABELS));

export const CONFERENCE_SYSTEM_TYPE_LABELS: Readonly<Record<ConferenceSystemType, string>> = {
  audio: "Audio conference",
  digital: "Digital conference",
  "video-hybrid": "Video & hybrid conference",
  paperless: "Paperless conference",
};

const AVAILABILITY_LABELS: Readonly<Record<ConferenceAvailability, string>> = {
  "in-stock": "In stock",
  "project-order": "Project order",
  contact: "Contact for availability",
};

export function getConferenceProductAvailabilityLabel(product: ConferenceProduct): string {
  return product.availability
    ? AVAILABILITY_LABELS[product.availability]
    : "Not verified";
}

const ROOM_SIZE_LABELS: Readonly<Record<ConferenceRoomSize, string>> = {
  small: "Small room",
  medium: "Medium room",
  large: "Large room",
  auditorium: "Auditorium",
};

function formatParticipantRange(range: ConferenceProduct["participantRange"]): string | undefined {
  if (!range) return undefined;
  if (range.min !== undefined && range.max !== undefined) return `${range.min}–${range.max} participants`;
  if (range.min !== undefined) return `${range.min}+ participants`;
  if (range.max !== undefined) return `Up to ${range.max} participants`;
  return undefined;
}

/**
 * One normalized specification list, used by both the product page table and the
 * Product structured data so the two can never drift apart. Canonical rows come
 * from typed catalog fields; the rest are the product's own specifications with
 * aliases collapsed and commercial rows removed.
 */
export function getConferenceProductSpecifications(
  product: ConferenceProduct
): { key: string; value: string }[] {
  const rows: { key: string; value: string }[] = [];
  const seen = new Set<string>();

  const push = (key: string, value: string | undefined) => {
    if (!key.trim() || !isUsableSpecificationValue(value)) return;
    const normalizedKey = SPEC_KEY_ALIASES[key.trim()] ?? key.trim();
    if (COMMERCIAL_SPEC_KEYS.has(normalizedKey) || seen.has(normalizedKey)) return;
    seen.add(normalizedKey);
    rows.push({ key: normalizedKey, value: value.trim() });
  };

  push("Brand", product.brand?.name);
  push("Model", product.model);
  push("Product Type", product.productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]).join(", "));
  push("System Family", product.systemFamily);
  // Connection is a classification, so it always comes from the typed field and
  // reads Wired or Wireless. Catalog rows that describe *what it connects to* are
  // re-keyed to Compatibility, where that detail belongs.
  push("Connection", product.connection ? CONNECTION_LABELS[product.connection] : undefined);
  push("Participant Capacity", formatParticipantRange(product.participantRange));
  push("Room Size", product.roomSizes?.map((roomSize) => ROOM_SIZE_LABELS[roomSize]).join(", "));
  const systemTypeLabels = getConferenceProductSystemTypes(product)
    .map((systemType) => CONFERENCE_SYSTEM_TYPE_LABELS[systemType]);
  push("System Type", systemTypeLabels.length ? systemTypeLabels.join(", ") : undefined);
  for (const spec of product.specifications) {
    const isConnectionProse = spec.key === "Connection" && !CONNECTION_VALUES.has(spec.value);
    push(isConnectionProse ? "Compatibility" : spec.key, spec.value);
  }
  push("Warranty", product.warranty);
  push("Availability", product.availability ? getConferenceProductAvailabilityLabel(product) : undefined);

  return rows;
}

const CARD_SPEC_PRIORITIES: Partial<Record<ConferenceProductType, readonly string[]>> = {
  "control-unit": ["Capacity", "Microphone Capacity", "Function", "Compatibility", "Audio Output", "Installation"],
  "chairman-unit": ["Microphone", "Function", "Compatibility", "Installation", "Application"],
  "delegate-unit": ["Microphone", "Function", "Compatibility", "Installation", "Application"],
  dsp: ["Input / Output", "I/O", "Function", "Compatibility", "Installation"],
  amplifier: ["Output Power", "Function", "Compatibility", "Installation", "Application"],
  processor: ["Input / Output", "I/O", "Function", "Compatibility", "Installation"],
  charger: ["Charging Capacity", "Compatibility", "Installation", "Application"],
  "access-point": ["Function", "Compatibility", "Installation", "Application"],
};

const CARD_SPEC_EXCLUSIONS = new Set([
  "Brand",
  "Model",
  "Product Type",
  "Connection",
  "System Type",
  "Availability",
]);

/** Selects concise, verified specification rows without deriving values from marketing copy. */
export function getConferenceProductCardSpecs(
  product: ConferenceProduct,
  limit = 3,
): { label: string; value: string }[] {
  if (limit <= 0) return [];
  const rows = getConferenceProductSpecifications(product).filter(
    (spec) => !CARD_SPEC_EXCLUSIONS.has(spec.key),
  );
  const priority = product.productTypes.flatMap((type) => CARD_SPEC_PRIORITIES[type] ?? []);
  const rank = new Map(priority.map((key, index) => [key, index]));
  return rows
    .map((spec, index) => ({ spec, index }))
    .sort((a, b) => (rank.get(a.spec.key) ?? 100 + a.index) - (rank.get(b.spec.key) ?? 100 + b.index))
    .slice(0, limit)
    .map(({ spec }) => ({ label: spec.key, value: spec.value }));
}

/** Verified catalog note when available; otherwise an honest price-state explanation. */
export function getConferenceProductPriceNote(product: ConferenceProduct): string {
  const fallback = getConferenceProductPricePresentation(product).disclosure;
  if (product.price.type === "fixed") return fallback;
  return product.specifications.find((spec) => COMMERCIAL_SPEC_KEYS.has(spec.key))?.value ?? fallback;
}

function isValidIsoCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function validateConferenceCatalog(
  products: readonly ConferenceProduct[],
  reservedSlugs: readonly string[] = [],
  knownBrands: readonly { name: string; slug: string }[] = [],
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const reservedSlugSet = new Set(reservedSlugs);
  const validCategories = new Set<string>(CONFERENCE_SYSTEM_CATEGORIES);
  const validSystemTypes = new Set<string>(CONFERENCE_SYSTEM_TYPES);
  const validConnections = new Set<string>(CONFERENCE_CONNECTIONS);
  const validRoomSizes = new Set<string>(CONFERENCE_ROOM_SIZES);
  const validTypes = new Set<string>(CONFERENCE_PRODUCT_TYPES);
  const validAvailabilities = new Set<string>(CONFERENCE_AVAILABILITIES);
  const productIdSet = new Set(products.map((product) => product.id));
  const knownBrandNames = new Map(knownBrands.map((brand) => [brand.slug, brand.name]));
  const observedBrandNames = new Map<string, string>();

  for (const product of products) {
    const reference = product.slug || product.id || "unknown product";

    if (!product.id.trim()) errors.push(`${reference}: missing id`);
    else if (ids.has(product.id)) errors.push(`${reference}: duplicate id ${product.id}`);
    ids.add(product.id);

    if (!product.slug.trim()) errors.push(`${reference}: missing slug`);
    else if (slugs.has(product.slug)) errors.push(`${reference}: duplicate slug ${product.slug}`);
    else if (reservedSlugSet.has(product.slug)) errors.push(`${reference}: reserved slug collision ${product.slug}`);
    slugs.add(product.slug);

    if (!product.name.trim()) errors.push(`${reference}: missing name`);
    if (!product.shortDescription.trim()) errors.push(`${reference}: missing short description`);
    if (!product.description.trim()) errors.push(`${reference}: missing description`);
    if (!product.images.length) errors.push(`${reference}: missing images`);
    if (product.images.some((image) => !image.src.trim() || !image.alt.trim())) {
      errors.push(`${reference}: image src and alt must be non-empty`);
    }
    if (product.images.filter((image) => image.primary).length > 1) {
      errors.push(`${reference}: multiple primary images`);
    }

    if (product.brand) {
      if (!product.brand.name.trim()) errors.push(`${reference}: missing brand name`);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.brand.slug)) {
        errors.push(`${reference}: invalid brand slug ${product.brand.slug}`);
      }
      const observedName = observedBrandNames.get(product.brand.slug);
      if (observedName && observedName !== product.brand.name) {
        errors.push(`${reference}: inconsistent brand name ${product.brand.name} for ${product.brand.slug}`);
      } else {
        observedBrandNames.set(product.brand.slug, product.brand.name);
      }
      if (knownBrandNames.size && !knownBrandNames.has(product.brand.slug)) {
        errors.push(`${reference}: unknown brand reference ${product.brand.slug}`);
      } else if (knownBrandNames.has(product.brand.slug) && knownBrandNames.get(product.brand.slug) !== product.brand.name) {
        errors.push(`${reference}: brand name does not match registry for ${product.brand.slug}`);
      }
    }
    if (product.systemCategory && !validCategories.has(product.systemCategory)) {
      errors.push(`${reference}: invalid system category ${product.systemCategory}`);
    }
    if (product.systemTypes?.some((systemType) => !validSystemTypes.has(systemType))) {
      errors.push(`${reference}: invalid system type`);
    }
    if (product.systemTypes && new Set(product.systemTypes).size !== product.systemTypes.length) {
      errors.push(`${reference}: duplicate system type`);
    }
    if (!getConferenceProductSystemTypes(product).length) {
      errors.push(`${reference}: missing system type classification`);
    }
    if (product.connection && !validConnections.has(product.connection)) {
      errors.push(`${reference}: invalid connection ${product.connection}`);
    }
    if (!product.productTypes.length || product.productTypes.some((type) => !validTypes.has(type))) {
      errors.push(`${reference}: invalid product type`);
    }
    if (new Set(product.productTypes).size !== product.productTypes.length) {
      errors.push(`${reference}: duplicate product type`);
    }
    if (!product.availability) {
      errors.push(`${reference}: missing availability`);
    } else if (!validAvailabilities.has(product.availability)) {
      errors.push(`${reference}: invalid availability ${product.availability}`);
    }
    if (product.systemFamily !== undefined && !product.systemFamily.trim()) {
      errors.push(`${reference}: empty system family`);
    }
    if (product.roomSizes?.some((roomSize) => !validRoomSizes.has(roomSize))) {
      errors.push(`${reference}: invalid room size`);
    }
    if (product.roomSizes && new Set(product.roomSizes).size !== product.roomSizes.length) {
      errors.push(`${reference}: duplicate room size`);
    }
    if (product.participantRange) {
      const { min, max } = product.participantRange;
      if ((min !== undefined && (!Number.isInteger(min) || min < 0)) ||
          (max !== undefined && (!Number.isInteger(max) || max < 0)) ||
          (min !== undefined && max !== undefined && min > max)) {
        errors.push(`${reference}: invalid participant range`);
      }
    }
    if (new Set(product.compatibleProductIds).size !== product.compatibleProductIds.length) {
      errors.push(`${reference}: duplicate compatibility reference`);
    }
    for (const compatibleId of product.compatibleProductIds) {
      if (compatibleId === product.id) errors.push(`${reference}: product cannot be compatible with itself`);
      else if (!productIdSet.has(compatibleId)) errors.push(`${reference}: broken compatibility reference ${compatibleId}`);
    }

    if (product.price.currency !== "BDT" || !product.price.displayLabel.trim()) {
      errors.push(`${reference}: invalid price currency or display label`);
    } else if (product.price.type === "fixed" && (!Number.isFinite(product.price.amount) || product.price.amount <= 0)) {
      errors.push(`${reference}: invalid fixed price`);
    } else if (
      product.price.type === "range" &&
      (!Number.isFinite(product.price.min) || !Number.isFinite(product.price.max) || product.price.min <= 0 || product.price.max <= 0 || product.price.min > product.price.max)
    ) {
      errors.push(`${reference}: invalid price range`);
    }
    if (product.price.updatedAt && !isValidIsoCalendarDate(product.price.updatedAt)) {
      errors.push(`${reference}: invalid price update date`);
    }
  }

  return errors;
}

const conferenceCatalogErrors = validateConferenceCatalog(conferenceSystemCatalog);
if (conferenceCatalogErrors.length) {
  throw new Error(`Invalid Conference product catalog:\n${conferenceCatalogErrors.join("\n")}`);
}
