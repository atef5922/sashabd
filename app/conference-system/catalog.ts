const CONFERENCE_IMAGE_BASE = "/images/Conference%20system";

export type ConferenceProduct = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  gallery: string[];
  priceLabel: string;
  cardPriceLabel: string;
  badge: string;
  tags: string[];
  keyFeatures: string[];
  bestFor: string[];
  specs: { k: string; v: string }[];
  description: string;
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

export const conferenceSystemCatalog: ConferenceProduct[] = [
  {
    slug: "gen-5301p13-conference-microphone-unit",
    title: "GEN-5301P13 Conference Microphone Unit",
    subtitle: "Desktop gooseneck conference microphone unit for clean speech pickup in small and medium meeting rooms.",
    image: conferenceImage("GEN-5301P13.webp"),
    gallery: [conferenceImage("GEN-5301P13.webp")],
    priceLabel: "18,500 BDT",
    cardPriceLabel: "৳18,500",
    badge: "Microphone Unit",
    tags: ["Conference Mic", "Gooseneck", "Meeting Room"],
    keyFeatures: [
      "Desktop conference microphone for organized speaker pickup",
      "Gooseneck mic design for clear speech direction",
      "Simple meeting-room operation with stable table placement",
      "Suitable for boardroom, training, and seminar discussion setups",
    ],
    bestFor: ["Boardroom", "Training Room", "Seminar Hall"],
    specs: [
      { k: "Model", v: "GEN-5301P13" },
      { k: "Product Type", v: "Conference microphone unit" },
      { k: "Microphone Style", v: "Desktop gooseneck" },
      { k: "Application", v: "Meeting room, boardroom, seminar discussion" },
      { k: "Installation", v: "Tabletop conference setup" },
      { k: "Quotation", v: "Available based on system quantity and project scope" },
    ],
    description:
      "The GEN-5301P13 Conference Microphone Unit is a practical tabletop microphone for meeting rooms where clear speaker pickup and simple operation are important. It can be planned for boardrooms, training rooms, seminar halls, and office discussion spaces. Sasha Corporation can support product selection, quantity planning, cabling guidance, installation, and after-sales support for complete conference system projects in Bangladesh.",
  },
  {
    slug: "nac-720w-wireless-conference-system",
    title: "NAC-720W Wireless Conference System",
    subtitle: "Wireless conference solution for flexible seating layouts and clean table arrangements without heavy microphone cabling.",
    image: conferenceImage("NAC-720W.webp"),
    gallery: [conferenceImage("NAC-720W.webp")],
    priceLabel: "145,000 BDT",
    cardPriceLabel: "৳145,000",
    badge: "Wireless System",
    tags: ["Wireless", "Conference", "Flexible Setup"],
    keyFeatures: [
      "Wireless conference workflow for cleaner meeting tables",
      "Flexible seating plan support for changing room layouts",
      "Useful for corporate, hotel, and council meeting environments",
      "Project-based setup with microphone quantity and coverage planning",
    ],
    bestFor: ["Corporate Meeting", "Council Room", "Hotel Conference"],
    specs: [
      { k: "Model", v: "NAC-720W" },
      { k: "Product Type", v: "Wireless conference system" },
      { k: "Connection", v: "Wireless conference microphone workflow" },
      { k: "Room Planning", v: "Flexible seating and table arrangement" },
      { k: "Support", v: "BOQ, installation, testing, and commissioning" },
      { k: "Quotation", v: "Project price on request" },
    ],
    description:
      "The NAC-720W Wireless Conference System is suitable for meeting rooms where cable-free table setup and flexible seating are preferred. It helps simplify conference room planning for organizations that change seating positions, host regular meetings, or need a cleaner tabletop appearance. Final configuration depends on microphone quantity, room size, control requirements, and installation scope.",
  },
  {
    slug: "spon-gen-5301p26-network-integrated-amplifier",
    title: "SPON GEN-5301P26 Network Integrated Amplifier",
    subtitle: "Network integrated amplifier for conference audio routing, room sound reinforcement, and system integration.",
    image: conferenceImage("SPON GEN-5301P26 Network Integrated Amplifier.webp"),
    gallery: [conferenceImage("SPON GEN-5301P26 Network Integrated Amplifier.webp")],
    priceLabel: "72,500 BDT",
    cardPriceLabel: "৳72,500",
    badge: "Amplifier",
    tags: ["SPON", "Network Audio", "Amplifier"],
    keyFeatures: [
      "Network integrated amplifier for meeting and conference audio",
      "Supports centralized room sound planning",
      "Useful with conference microphones, speakers, and control systems",
      "Suitable for project-based audio integration",
    ],
    bestFor: ["Conference Room", "Control Room", "Training Venue"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "GEN-5301P26" },
      { k: "Product Type", v: "Network integrated amplifier" },
      { k: "Use Case", v: "Conference audio reinforcement and room integration" },
      { k: "System Role", v: "Amplification and network audio support" },
      { k: "Quotation", v: "Project price on request" },
    ],
    description:
      "The SPON GEN-5301P26 Network Integrated Amplifier is positioned for conference rooms, control rooms, and training venues where microphone audio needs stable reinforcement and integration with a wider room audio system. It can be included in a complete conference BOQ with microphones, speakers, processors, and control equipment.",
  },
  {
    slug: "spon-sap-f88e-8x8-digital-audio-processor-dsp",
    title: "SPON SAP-F88E 8x8 Digital Audio Processor with DSP",
    subtitle: "8-input and 8-output digital audio processor with DSP for conference rooms, training halls, and AV integration.",
    image: sapF88eMain,
    gallery: [sapF88eMain, sapF88eAlt],
    priceLabel: "64,500 BDT",
    cardPriceLabel: "৳64,500",
    badge: "DSP Processor",
    tags: ["SPON", "DSP", "8x8 Audio"],
    keyFeatures: [
      "8 x 8 digital audio processing for conference AV systems",
      "DSP tuning support for cleaner microphone and speaker output",
      "Useful for feedback control, routing, and room audio balancing",
      "Designed for professional conference and training environments",
    ],
    bestFor: ["Conference Hall", "Government Office", "University"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "SAP-F88E" },
      { k: "Product Type", v: "Digital audio processor with DSP" },
      { k: "Input / Output", v: "8 x 8 audio processing class" },
      { k: "Application", v: "Conference room DSP, AV routing, audio tuning" },
      { k: "Quotation", v: "Available after project requirement review" },
    ],
    description:
      "The SPON SAP-F88E 8x8 Digital Audio Processor with DSP is used when a conference room needs cleaner microphone management, routing flexibility, and tuned speaker output. It is useful for meeting rooms, boardrooms, training halls, and auditoriums where speech clarity and stable audio behavior are important. Sasha Corporation can include this processor in a complete conference AV design with installation and commissioning support.",
  },
  {
    slug: "spon-lcm-6010-digital-conference-system-central-unit",
    title: "SPON LCM-6010 Digital Conference System Central Unit",
    subtitle: "Central control unit for SPON digital conference systems with chairman and delegate microphone management.",
    image: lcm6010Front,
    gallery: [lcm6010Front, lcm6010Back],
    priceLabel: "54,500 BDT",
    cardPriceLabel: "৳54,500",
    badge: "Central Unit",
    tags: ["SPON", "Central Unit", "Digital Conference"],
    keyFeatures: [
      "Central unit for digital conference microphone systems",
      "Supports chairman and delegate unit management",
      "Front and rear panel connectivity for system installation",
      "Suitable for structured meeting and discussion environments",
    ],
    bestFor: ["Boardroom", "Council Chamber", "Seminar Hall"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCM-6010" },
      { k: "Product Type", v: "Digital conference system central unit" },
      { k: "System Role", v: "Chairman/delegate unit control and audio management" },
      { k: "Installation", v: "Rack/table equipment setup based on project design" },
      { k: "Quotation", v: "Project price on request" },
    ],
    description:
      "The SPON LCM-6010 Digital Conference System Central Unit is the control point for a structured digital conference microphone setup. It is suitable for meeting rooms that need chairman and delegate units, clear speaking order, and professional meeting audio management. The final BOQ depends on the number of microphones, cable routing, table layout, and integration with speakers or recording equipment.",
  },
  {
    slug: "spon-lcm-6013cv-l-digital-conference-chairman-unit",
    title: "SPON LCM-6013CV-L Digital Conference Chairman Unit",
    subtitle: "Chairman microphone unit for SPON digital conference systems with priority-style meeting control planning.",
    image: lcm6013cvMain,
    gallery: [lcm6013cvMain, lcm6013cvSide],
    priceLabel: "21,500 BDT",
    cardPriceLabel: "৳21,500",
    badge: "Chairman Unit",
    tags: ["SPON", "Chairman Unit", "Digital Mic"],
    keyFeatures: [
      "Chairman unit for controlling meeting discussion flow",
      "Desktop gooseneck microphone form factor",
      "Designed for SPON digital conference system integration",
      "Useful for boardrooms, council meetings, and seminar tables",
    ],
    bestFor: ["Chairperson Desk", "Boardroom", "Council Chamber"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCM-6013CV-L" },
      { k: "Product Type", v: "Digital conference chairman unit" },
      { k: "Microphone Style", v: "Desktop gooseneck conference microphone" },
      { k: "System Compatibility", v: "SPON digital conference system planning" },
      { k: "Quotation", v: "Based on system quantity and controller selection" },
    ],
    description:
      "The SPON LCM-6013CV-L Digital Conference Chairman Unit is planned for the main speaker or chairperson position in a conference system. It helps organize discussion flow alongside delegate units and a central controller. It is a good fit for boardrooms, government meetings, committees, and institutional seminar rooms.",
  },
  {
    slug: "spon-lcm-6013dv-l-digital-conference-delegate-unit",
    title: "SPON LCM-6013DV-L Digital Conference Delegate Unit",
    subtitle: "Delegate microphone unit for SPON digital conference systems in boardrooms, meeting rooms, and seminar halls.",
    image: lcm6013dvMain,
    gallery: [lcm6013dvMain, lcm6013dvFront],
    priceLabel: "19,500 BDT",
    cardPriceLabel: "৳19,500",
    badge: "Delegate Unit",
    tags: ["SPON", "Delegate Unit", "Conference Mic"],
    keyFeatures: [
      "Delegate microphone unit for participant speech pickup",
      "Designed for structured conference table discussion",
      "Works as part of a digital chairman/delegate conference setup",
      "Suitable for scalable meeting room microphone planning",
    ],
    bestFor: ["Participant Table", "Meeting Room", "Training Venue"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCM-6013DV-L" },
      { k: "Product Type", v: "Digital conference delegate unit" },
      { k: "Microphone Style", v: "Desktop gooseneck conference microphone" },
      { k: "System Compatibility", v: "SPON digital conference system planning" },
      { k: "Quotation", v: "Based on delegate unit quantity and installation scope" },
    ],
    description:
      "The SPON LCM-6013DV-L Digital Conference Delegate Unit gives each participant a dedicated microphone point for organized meetings. It can be paired with a chairman unit and central controller to build a complete conference table system. Sasha Corporation can help plan the right number of delegate units, cabling, controller selection, and installation layout.",
  },
  {
    slug: "spon-lcm-6015p-12-port-wireless-microphone-charger",
    title: "SPON LCM-6015P 12-Port Wireless Microphone Charger",
    subtitle: "12-port charging unit for wireless conference microphone systems and delegate unit battery management.",
    image: lcm6015pMain,
    gallery: [lcm6015pMain, lcm6015pPerspective],
    priceLabel: "34,500 BDT",
    cardPriceLabel: "৳34,500",
    badge: "Charger",
    tags: ["SPON", "12-Port", "Wireless Mic"],
    keyFeatures: [
      "12-port charger for wireless conference microphone units",
      "Helps keep delegate units ready for scheduled meetings",
      "Useful for venues with multiple wireless microphone devices",
      "Supports organized charging and storage workflow",
    ],
    bestFor: ["Wireless Conference", "Training Center", "Meeting Venue"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCM-6015P" },
      { k: "Product Type", v: "12-port wireless microphone charger" },
      { k: "Charging Capacity", v: "Up to 12 compatible wireless microphone units" },
      { k: "Application", v: "Wireless conference microphone charging workflow" },
      { k: "Quotation", v: "Available with wireless system package" },
    ],
    description:
      "The SPON LCM-6015P 12-Port Wireless Microphone Charger is useful for conference venues that use multiple wireless microphones or delegate units. It keeps the equipment organized and ready before meetings, training sessions, and events. It is usually planned as part of a complete wireless conference system package.",
  },
  {
    slug: "spon-lcs-5251cd-digital-conference-microphone-system",
    title: "SPON LCS-5251CD Digital Conference Microphone System",
    subtitle: "Digital conference microphone system for professional meeting rooms requiring organized speech pickup.",
    image: conferenceImage("SPON LCS-5251CD Digital Conference Microphone System.webp"),
    gallery: [conferenceImage("SPON LCS-5251CD Digital Conference Microphone System.webp")],
    priceLabel: "23,500 BDT",
    cardPriceLabel: "৳23,500",
    badge: "Digital System",
    tags: ["SPON", "Digital Conference", "Microphone System"],
    keyFeatures: [
      "Digital conference microphone system for professional meetings",
      "Supports structured chairman and delegate style discussion planning",
      "Designed for clear voice pickup and organized table workflow",
      "Suitable for corporate, institutional, and government meeting rooms",
    ],
    bestFor: ["Boardroom", "Conference Room", "Seminar Room"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCS-5251CD" },
      { k: "Product Type", v: "Digital conference microphone system" },
      { k: "Application", v: "Professional discussion and meeting audio" },
      { k: "Planning", v: "Chairman/delegate quantity depends on table layout" },
      { k: "Quotation", v: "Project price on request" },
    ],
    description:
      "The SPON LCS-5251CD Digital Conference Microphone System is suitable for offices, institutions, government rooms, and conference venues that need organized speech pickup. It can be planned as a full chairman/delegate setup with cabling, control, speaker output, and installation support.",
  },
  {
    slug: "spon-lcs-5252d-wireless-conference-delegate-unit",
    title: "SPON LCS-5252D Wireless Conference Delegate Unit",
    subtitle: "Wireless digital conference delegate unit with touch-screen style control for modern meeting rooms.",
    image: lcs5252dMain,
    gallery: [lcs5252dMain, lcs5252dSide, lcs5252dBack],
    priceLabel: "24,500 BDT",
    cardPriceLabel: "৳24,500",
    badge: "Wireless Delegate",
    tags: ["SPON", "Wireless", "Delegate Unit", "Touch Screen"],
    keyFeatures: [
      "Professional wireless digital conference delegate unit",
      "Touch-screen style control surface for meeting interaction",
      "Supports wireless tabletop conference deployment",
      "Useful for attendance, voting, and structured discussion workflows",
      "Designed for modern boardroom and council chamber environments",
    ],
    bestFor: ["Boardroom", "Council Chamber", "Executive Meeting"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCS-5252D" },
      { k: "Product Type", v: "Wireless digital conference delegate unit" },
      { k: "Display", v: "Touch-screen style control interface" },
      { k: "Communication", v: "Wireless conference operation" },
      { k: "Functions", v: "Discussion, attendance, voting workflow support" },
      { k: "Recommended Use", v: "Boardroom, council chamber, executive meeting room" },
      { k: "Price", v: "24,500 BDT" },
    ],
    description:
      "The SPON LCS-5252D Wireless Conference Delegate Unit is a premium tabletop delegate station for modern conference rooms. It is useful when a meeting room needs a cable-light layout, participant microphone control, attendance or voting workflow support, and a professional appearance on the table. The product can be planned with matching access point, charging unit, chairman unit, and installation support based on the number of participants and room layout.",
  },
  {
    slug: "spon-lcs-5301z-wireless-digital-conference-access-point",
    title: "SPON LCS-5301Z Wireless Digital Conference Access Point",
    subtitle: "Wireless conference access point for connecting compatible SPON wireless chairman and delegate units.",
    image: conferenceImage("SPON LCS-5301Z Wireless Digital Conference Access Point.webp"),
    gallery: [conferenceImage("SPON LCS-5301Z Wireless Digital Conference Access Point.webp")],
    priceLabel: "36,500 BDT",
    cardPriceLabel: "৳36,500",
    badge: "Access Point",
    tags: ["SPON", "Wireless", "Access Point"],
    keyFeatures: [
      "Wireless access point for compatible SPON conference systems",
      "Supports communication between wireless microphone units and controller workflow",
      "Useful for cable-light meeting room deployments",
      "Planned based on room size, microphone count, and coverage requirement",
    ],
    bestFor: ["Wireless Boardroom", "Council Room", "Meeting Hall"],
    specs: [
      { k: "Brand", v: "SPON" },
      { k: "Model", v: "LCS-5301Z" },
      { k: "Product Type", v: "Wireless digital conference access point" },
      { k: "Application", v: "Wireless chairman/delegate conference system connectivity" },
      { k: "Planning", v: "Coverage depends on room size and unit quantity" },
      { k: "Quotation", v: "Project price on request" },
    ],
    description:
      "The SPON LCS-5301Z Wireless Digital Conference Access Point is used in wireless conference systems to support communication with compatible chairman and delegate units. It should be selected as part of a full wireless conference design, considering room size, seating layout, microphone quantity, and expected operating workflow.",
  },
];

export function getConferenceProductBySlug(slug: string): ConferenceProduct | undefined {
  return conferenceSystemCatalog.find((product) => product.slug === slug);
}
