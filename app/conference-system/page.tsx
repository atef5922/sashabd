import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  conferenceSystemCatalog,
  CONFERENCE_PRODUCT_TYPE_LABELS,
  getConferenceConnectionLabel,
  getConferenceProductAvailabilityLabel,
  getConferenceProductCardPrice,
  getConferenceProductCardSpecs,
  getConferenceProductPrimaryImage,
  type ConferenceProductType,
} from "./catalog";
import { conferenceBrandConfigs, conferenceCategoryConfigs, hasConferenceBrandProducts } from "./taxonomy";
import ConferenceProductExplorer, { type ConferenceExplorerProduct } from "./ConferenceProductExplorer";
import { conferenceInstallationProjects } from "./conferenceProjects";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const PAGE_TITLE = "Conference System Price in Bangladesh 2026";

const ctaClass =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

const sectionClass =
  "mt-4 rounded-3xl border bg-white p-[10px] shadow-sm md:p-8";

const sectionStyle = {
  borderColor: `${BRAND.maroon}12`,
  contentVisibility: "auto" as const,
  containIntrinsicSize: "auto 520px",
};

function getParityClassName(index: number) {
  return index % 2 === 0
    ? "border-cyan-200/60 bg-sky-50/70"
    : "border-orange-200/80 bg-orange-50/70";
}

const ResponsiveCardGrid = ({
  items,
  desktopClassName = "md:grid-cols-2 lg:grid-cols-3",
}: {
  items: Array<{ title: string; desc: string; icon?: ReactNode; bullets?: readonly string[]; meta?: string }>;
  desktopClassName?: string;
}) => (
  <div
    className={`-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0 md:pt-0 ${desktopClassName}`}
  >
    {items.map((item, index) => (
      <article
        key={item.title}
        className={`w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4 shadow-sm md:w-auto md:rounded-2xl md:border-slate-200 md:bg-white md:p-5 md:snap-none ${getParityClassName(index)}`}
      >
        <div className="flex items-start gap-3">
          {item.icon ? (
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white/80 text-orange-600">
              {item.icon}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-lg">{item.title}</h3>
            {item.meta ? <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-500">{item.meta}</p> : null}
          </div>
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-700 text-justify">{item.desc}</p>
        {item.bullets?.length ? (
          <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
            {item.bullets.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                <span className="leading-6 text-justify">{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    ))}
  </div>
);

const applicationCards = [
  {
    title: "Corporate Boardroom",
    desc: "Chairman and delegate microphones keep executive discussions organized around the table, with hybrid meeting integration where the room setup supports it.",
  },
  {
    title: "Government Meeting Room",
    desc: "Chairman priority control and delegate management support formal proceedings, with meeting recording available on supported systems.",
  },
  {
    title: "Educational Institution",
    desc: "Lecture halls and faculty meeting rooms use conference microphones for clear presenter audio and structured discussion among staff.",
  },
  {
    title: "Hotel & Convention Center",
    desc: "Wireless and portable conference units allow quick setup and reconfiguration for banquet halls and convention spaces booked for different events.",
  },
  {
    title: "Training Center",
    desc: "Flexible seating and instructor-to-participant microphone setups support hands-on training sessions and workshop-style delivery.",
  },
  {
    title: "House of Worship / Auditorium",
    desc: "PA integration, DSP processing, and amplification extend clear voice coverage across larger halls and auditoriums.",
  },
] as const;

const packageCards = [
  {
    title: "Small Meeting Room Package",
    bestFor: "Small offices, huddle rooms, director rooms, and private meeting spaces.",
    included: "Chairman unit, delegate units, control unit, cables, basic speaker support, and setup guidance.",
    capacity: "6-12 participants",
    recommended: "Wired conference microphone units with compact control and room speakers.",
  },
  {
    title: "Medium Conference Room Package",
    bestFor: "Corporate boardrooms, training rooms, committee rooms, and institutional meeting spaces.",
    included: "Chairman unit, multiple delegate units, central control unit, DSP or mixer support, speakers, and installation.",
    capacity: "12-30 participants",
    recommended: "Digital conference system with chairman and delegate microphone control.",
  },
  {
    title: "Large Conference Hall Package",
    bestFor: "Government halls, seminar rooms, convention areas, and large discussion venues.",
    included: "Conference microphones, central controller, DSP processor, amplifiers, speakers, cables, rack planning, and commissioning.",
    capacity: "30-80 participants",
    recommended: "Digital conference system with PA integration and acoustic planning.",
  },
  {
    title: "Wireless Conference Package",
    bestFor: "Multipurpose rooms, flexible boardrooms, training centers, and venues with changing seating layouts.",
    included: "Wireless chairman/delegate units, access point, charger, controller, audio output, and wireless planning.",
    capacity: "Depends on selected wireless unit quantity",
    recommended: "Wireless conference microphone system with access point and charging workflow.",
  },
  {
    title: "Digital Conference System Package",
    bestFor: "Corporate offices, government meeting rooms, universities, and formal decision-making spaces.",
    included: "Digital central unit, chairman unit, delegate units, DSP integration, speakers, cables, and testing.",
    capacity: "Scalable by system model and room layout",
    recommended: "Digital chairman and delegate microphone system with central control.",
  },
  {
    title: "Custom Conference System Project",
    bestFor: "Tender, BOQ, auditorium, hybrid meeting, and multi-room audio projects.",
    included: "Room survey, system design, product selection, BOQ, installation, training, and after-sales support.",
    capacity: "Custom capacity based on seating plan",
    recommended: "Project-specific combination of conference microphone, PA, DSP, and video meeting equipment.",
  },
] as const;

const systemTypes = [
  {
    title: "Wired Conference System",
    desc: "Stable tabletop microphone setup for permanent boardrooms, committee rooms, and meeting halls.",
  },
  {
    title: "Wireless Conference System",
    desc: "Flexible microphone solution for clean tables, movable seating, and multipurpose meeting rooms.",
  },
  {
    title: "Digital Conference System",
    desc: "Structured chairman and delegate control with central processing for professional meetings.",
  },
  {
    title: "Chairman & Delegate Microphone System",
    desc: "Dedicated units for the chairperson and participants to keep discussions organized.",
  },
  {
    title: "Network Conference System",
    desc: "Modern conference audio planning with network-ready control and integration possibilities.",
  },
  {
    title: "Conference System with DSP Processor",
    desc: "Adds audio tuning, routing, feedback control, and cleaner speaker output for demanding rooms.",
  },
] as const;

const wiredPoints = [
  "Stable connection",
  "Best for permanent rooms",
  "Lower maintenance",
  "Requires cable installation",
] as const;

const wirelessPoints = [
  "Flexible setup",
  "Easy relocation",
  "Cleaner room appearance",
  "Requires charging and wireless planning",
] as const;

const audioVsVideoComparisonRows = [
  ["Primary purpose", "In-room discussion", "Presentation, display & hybrid support"],
  ["Core equipment", "Controller + chairman/delegate microphones", "Video/display processor + paperless conferencing"],
  ["Best for", "Boardroom, council chamber, meeting room", "Hybrid meetings, presentation-heavy rooms"],
  ["Network dependency", "Usually lower", "Usually higher"],
] as const;

type ConferenceComponentIcon =
  | "chairman"
  | "delegate"
  | "control"
  | "processor"
  | "speaker"
  | "camera";

const conferenceComponentCards = [
  {
    title: "Chairman Unit",
    icon: "chairman" as const,
    description:
      "The chairman unit allows the meeting host to control discussions, manage delegate microphones, and maintain meeting discipline with priority control.",
    features: ["Priority speaking control", "Delegate microphone management", "Clear gooseneck microphone"],
  },
  {
    title: "Delegate Unit",
    icon: "delegate" as const,
    description:
      "Delegate units are used by participants to speak clearly during meetings through push-to-talk or discussion-based microphone operation.",
    features: ["Push-to-talk function", "High clarity voice pickup", "Suitable for meeting participants"],
  },
  {
    title: "Central Control Unit",
    icon: "control" as const,
    description:
      "The central control unit powers and manages the complete conference microphone system, audio routing, and connected discussion units.",
    features: ["System power management", "Multiple microphone support", "Stable audio distribution"],
  },
  {
    title: "Digital Audio Processor",
    icon: "processor" as const,
    description:
      "A digital audio processor improves voice quality by reducing noise, echo, and feedback for professional meeting room sound.",
    features: ["Noise reduction", "Echo cancellation", "Feedback control"],
  },
  {
    title: "Amplifier & Speakers",
    icon: "speaker" as const,
    description:
      "Amplifiers and ceiling, wall, or column speakers work together to deliver clear, evenly distributed sound across the meeting room or conference hall.",
    features: ["Room-size based speaker selection", "Stable, balanced amplifier output", "Suitable for PA integration"],
  },
  {
    title: "Optional Video, Recording & Software",
    icon: "camera" as const,
    description:
      "A PTZ camera, recording device, or conference management software can be added for video meetings, session recording, and voting or attendance features where supported.",
    features: ["Video conferencing and speaker tracking", "Meeting recording and streaming", "Voting and attendance support"],
  },
] as const;

type ChooseSashaIcon =
  | "consultation"
  | "boq"
  | "installation"
  | "dsp"
  | "support";

const chooseSashaCards = [
  {
    title: "System Design",
    icon: "consultation" as const,
    description:
      "Sasha plans conference systems around your room size, seating layout, participant capacity, and acoustic condition, so you get the right setup instead of unnecessary equipment.",
    bullets: [
      "Room size and seating layout analysis",
      "Microphone quantity planning",
      "Solution based on real project needs",
    ],
  },
  {
    title: "BOQ & Tender Support",
    icon: "boq" as const,
    description:
      "Sasha prepares a project-based BOQ covering microphone units, control unit, DSP, amplifier, speakers, cabling, installation, and testing — useful for corporate and government tender projects.",
    bullets: [
      "Product and quantity breakdown",
      "Installation and accessories included",
      "Useful for corporate and tender projects",
    ],
  },
  {
    title: "Installation & Testing",
    icon: "installation" as const,
    description:
      "Sasha handles cable planning, microphone placement, controller configuration, DSP tuning, and audio testing to ensure clear pickup and reliable long-term performance.",
    bullets: [
      "Cable and microphone placement planning",
      "System configuration and testing",
      "Clean and professional installation",
    ],
  },
  {
    title: "AV Integration",
    icon: "dsp" as const,
    description:
      "Sasha helps integrate conference microphone systems with DSP processing, PA speakers, amplifiers, and other AV equipment where the project requires it.",
    bullets: [
      "DSP audio processor support",
      "PA system and speaker integration",
      "AV equipment integration where needed",
    ],
  },
  {
    title: "After-Sales Technical Support",
    icon: "support" as const,
    description:
      "After installation, Sasha provides after-sales guidance for system operation, microphone usage, troubleshooting, maintenance, and future expansion.",
    bullets: [
      "User guidance after installation",
      "Technical troubleshooting support",
      "Future expansion support",
    ],
  },
] as const;

const conferenceSupportProcessSteps = [
  "Site Survey",
  "System Design",
  "BOQ",
  "Installation",
  "Testing",
  "Support",
] as const;

type ConferenceBenefitIcon =
  | "voice"
  | "control"
  | "hybrid"
  | "scale"
  | "productivity";

const conferenceBenefits = [
  {
    title: "Clear Speech",
    icon: "voice" as const,
    description:
      "Chairman and delegate microphones with DSP processing give every participant clear speech pickup, reducing table noise and echo in both small boardrooms and large conference halls.",
    bullets: ["Clear speech pickup from each seat", "Reduced noise and echo", "Better listening experience"],
  },
  {
    title: "Controlled Discussion",
    icon: "control" as const,
    description:
      "Chairman and delegate architecture lets the chairman manage delegate microphones, reduce interruptions, and keep multi-participant meetings organized.",
    bullets: ["Chairman priority control", "Delegate microphone management", "Organized discussion flow"],
  },
  {
    title: "Scalable Participation",
    icon: "scale" as const,
    description:
      "Systems can be sized to the room and participant count, from a compact setup for a small meeting room to a scalable digital system with DSP and amplification for a large hall.",
    bullets: ["Suitable for small to large rooms", "Custom setup by participant count", "Easy future expansion"],
  },
  {
    title: "Recording & AV Integration",
    icon: "hybrid" as const,
    description:
      "Selected digital control units support meeting recording and speaker-camera triggers, and the system can connect with PA, DSP, and display equipment where the project requires it.",
    bullets: ["Recording on supported control units", "Camera-trigger support on select systems", "PA and AV integration where needed"],
  },
  {
    title: "Professional Meeting Experience",
    icon: "productivity" as const,
    description:
      "Clear audio and organized discussion reduce communication gaps, helping every participant follow the meeting and contribute without repeated interruptions.",
    bullets: ["Faster discussion process", "Less communication gap", "More usable meeting room"],
  },
] as const;

type ConferenceGuideIcon =
  | "room"
  | "wired"
  | "microphone"
  | "dsp"
  | "hybrid"
  | "warranty";

const conferenceGuideCards = [
  {
    title: "Room Size & Participant Count",
    icon: "room" as const,
    description:
      "System size depends on room layout and participant count. A small boardroom may need a compact setup, while a large hall needs more microphones, DSP, and speaker coverage — see the room-size packages below for typical configurations.",
    bullets: [
      "6-12 participants: small boardroom setup",
      "12-30 participants: medium conference room system",
      "30+ participants: digital system with expansion support",
    ],
  },
  {
    title: "System Architecture",
    icon: "wired" as const,
    description:
      "Choose a wired conference system for a permanent room, or a wireless conference system for flexible seating — see Wired vs Wireless above for the full comparison.",
    bullets: [
      "Wired for permanent, fixed setups",
      "Wireless for flexible or multipurpose rooms",
      "Choice affects installation and budget",
    ],
  },
  {
    title: "Controller & Microphone Compatibility",
    icon: "microphone" as const,
    description:
      "Chairman, delegate, and controller units must belong to the same compatible system family. Mixing brands or models without verifying compatibility is the most common planning mistake.",
    bullets: [
      "Confirm the controller before selecting units",
      "Do not mix incompatible product families",
      "Ask Sasha to verify compatibility before ordering",
    ],
  },
  {
    title: "Audio & DSP Requirements",
    icon: "dsp" as const,
    description:
      "Rooms with glass walls, high ceilings, or echo problems benefit from a DSP audio processor, amplifier, and properly planned speakers for clearer sound.",
    bullets: [
      "Reduces echo and unwanted noise",
      "Amplifier and speaker sizing by room",
      "Recommended for medium and large rooms",
    ],
  },
  {
    title: "Hybrid Meeting Requirements",
    icon: "hybrid" as const,
    description:
      "Rooms that need to include remote participants may require video and display equipment alongside the audio system — see Choose Your Conference System above for audio vs video options.",
    bullets: [
      "Relevant for hybrid and remote meetings",
      "Plan video equipment alongside audio",
      "Not required for in-room-only meetings",
    ],
  },
  {
    title: "Budget, Warranty & Support",
    icon: "warranty" as const,
    description:
      "Total conference system cost covers the full setup, not just microphone price — factor in the controller, DSP, amplifier, speakers, installation, warranty, and after-sales support.",
    bullets: [
      "Compare total system cost, not just mic price",
      "Check warranty and spare-parts availability",
      "Confirm after-sales support before ordering",
    ],
  },
] as const;

const conferenceSelectionGuideRows = [
  ["Director Room", "4-8", "Compact wired or wireless microphone setup", "Simple meeting discussion"],
  ["Small Boardroom", "6-12", "Chairman & delegate mics with control unit", "Formal office meetings"],
  ["Medium Conference Room", "12-30", "Digital conference system with DSP", "Boardroom and committee meetings"],
  ["Training Room", "20-50", "Conference microphone system with PA integration", "Training and presentation"],
  ["Government Meeting Room", "20-60", "Wired conference system with chairman priority", "Formal decision-making"],
  ["Hotel / Multipurpose Room", "Flexible", "Wireless conference system", "Changeable seating layout"],
  ["Large Conference Hall", "50+", "Digital conference system with amplifier and speakers", "Large meetings and events"],
] as const;

type ConferenceBrandCard = {
  slug: string;
  title: string;
  category: string;
  description: string;
  support: string;
  badge: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  url: string;
};

const conferenceBrandCards: ConferenceBrandCard[] = [
  {
    slug: "bosch",
    title: "Bosch",
    category: "Professional Conference & Voice Communication Systems",
    description:
      "Browse the Bosch conference products currently listed in our verified catalog for professional discussion and meeting-room communication projects.",
    support: "Product selection, BOQ preparation, installation planning, and warranty assistance.",
    badge: "Authorized Distributor",
    logoSrc: "/images/brands/audio/bosch-logo.svg",
    logoWidth: 102,
    logoHeight: 22,
    url: "/conference-system/brands/bosch/",
  },
  {
    slug: "toa",
    title: "TOA",
    category: "Public Address & Meeting Audio Systems",
    description:
      "Explore the TOA meeting-audio products available in our conference catalog, including compatible microphone, control, amplification, and speaker solutions.",
    support: "System compatibility guidance, product supply, installation support, and warranty assistance.",
    badge: "Authorized Distributor",
    logoSrc: "/images/brands/audio/toa-logo.png",
    logoWidth: 90,
    logoHeight: 27,
    url: "/conference-system/brands/toa/",
  },
  {
    slug: "spon",
    title: "SPON",
    category: "Digital Conference Microphone & Control Systems",
    description:
      "View SPON digital and network conference products from our catalog, including control units, DSP processors, amplifiers, and meeting-room audio equipment.",
    support: "Room-based system design, BOQ preparation, installation, commissioning, and after-sales guidance.",
    badge: "Authorized Distributor",
    url: "/conference-system/brands/spon/",
  },
  {
    slug: "cmx",
    title: "CMX",
    category: "Wireless & Digital Discussion Systems",
    description:
      "Browse CMX wired, wireless, and paperless conference products listed in our catalog for boardrooms, council chambers, and flexible meeting spaces.",
    support: "Product selection, microphone quantity planning, installation support, and after-sales guidance.",
    badge: "Authorized Distributor",
    url: "/conference-system/brands/cmx/",
  },
];

const verifiedConferenceBrandCards = conferenceBrandCards.filter((card) => {
  const brand = conferenceBrandConfigs.find((entry) => entry.slug === card.slug);
  return brand ? hasConferenceBrandProducts(brand) : false;
});

const ConferenceBrandTitleBox = ({
  brand,
}: {
  brand: Pick<ConferenceBrandCard, "title" | "logoSrc" | "logoWidth" | "logoHeight" | "url">;
}) => {
  const isInternal = brand.url.startsWith("/");

  const content = (
    <>
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 ring-1 ring-orange-100">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      </span>
      <span className="flex h-9 items-center md:h-10">
        {brand.logoSrc ? (
          <Image
            src={brand.logoSrc}
            alt={`${brand.title} logo`}
            width={brand.logoWidth}
            height={brand.logoHeight}
            className="h-auto max-h-6 w-auto object-contain md:max-h-7"
          />
        ) : (
          <span className="text-base font-extrabold tracking-tight text-slate-950">{brand.title}</span>
        )}
      </span>
    </>
  );

  return (
    <div>
      <div
        className="flex min-h-12 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors duration-200 hover:border-orange-200 hover:bg-orange-50/40"
        aria-label={`${brand.title} brand logo space`}
      >
        {isInternal ? (
          <Link
            prefetch={false}
            href={brand.url}
            className="group/brand flex w-full items-center justify-center gap-2.5 text-slate-950"
            aria-label={`Browse ${brand.title} conference systems`}
          >
            {content}
          </Link>
        ) : (
          <a
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/brand flex w-full items-center justify-center gap-2.5 text-slate-950"
            aria-label={`Visit ${brand.title} official website`}
          >
            {content}
          </a>
        )}
      </div>
    </div>
  );
};

const PRICE_TABLE_BRAND_ORDER = ["cmx", "toa", "bosch", "spon"] as const;
const conferencePriceTableProducts = PRICE_TABLE_BRAND_ORDER.flatMap((slug) =>
  conferenceSystemCatalog.filter((product) => product.brand?.slug === slug).slice(0, 2),
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

function ConferenceComponentIconSvg({ icon }: { icon: ConferenceComponentIcon }) {
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
    case "chairman":
      return (
        <svg {...commonProps}>
          <rect x="8.5" y="3" width="7" height="10" rx="3.5" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
          <path d="M8 21h8" />
          <path d="M17 4.5l2 2 2-3" />
        </svg>
      );
    case "delegate":
      return (
        <svg {...commonProps}>
          <rect x="9" y="4" width="6" height="9" rx="3" />
          <path d="M6 12a6 6 0 0 0 12 0" />
          <path d="M12 18v3" />
          <path d="M9 21h6" />
          <circle cx="5" cy="6" r="1.5" />
          <circle cx="19" cy="6" r="1.5" />
        </svg>
      );
    case "control":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 10h8" />
          <path d="M8 14h3" />
          <circle cx="16" cy="14" r="1.5" />
        </svg>
      );
    case "processor":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 10h3" />
          <path d="M8 14h3" />
          <path d="M15 9v6" />
          <path d="M18 10.5v3" />
        </svg>
      );
    case "speaker":
      return (
        <svg {...commonProps}>
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="M16 9.5a4 4 0 0 1 0 5" />
          <path d="M18.5 7a7.5 7.5 0 0 1 0 10" />
        </svg>
      );
    case "camera":
      return (
        <svg {...commonProps}>
          <rect x="4" y="7" width="11" height="8" rx="2" />
          <path d="M15 10l5-3v10l-5-3" />
          <path d="M8 19h8" />
          <path d="M12 15v4" />
        </svg>
      );
  }
}

function ConferenceBenefitIconSvg({ icon }: { icon: ConferenceBenefitIcon }) {
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
    case "voice":
      return (
        <svg {...commonProps}>
          <path d="M12 3v10" />
          <rect x="9" y="2.5" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
          <path d="M8 21h8" />
        </svg>
      );
    case "control":
      return (
        <svg {...commonProps}>
          <path d="M4 7h16" />
          <path d="M4 12h10" />
          <path d="M4 17h16" />
          <circle cx="16" cy="12" r="2.5" />
          <circle cx="8" cy="7" r="2" />
          <circle cx="14" cy="17" r="2" />
        </svg>
      );
    case "hybrid":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="12" height="10" rx="2" />
          <path d="M15 9l4-2v8l-4-2" />
          <path d="M8 19h6" />
        </svg>
      );
    case "scale":
      return (
        <svg {...commonProps}>
          <path d="M4 19V9" />
          <path d="M10 19V5" />
          <path d="M16 19v-8" />
          <path d="M22 19V3" />
        </svg>
      );
    case "productivity":
      return (
        <svg {...commonProps}>
          <path d="M4 19h16" />
          <path d="M7 15l3-3 2 2 5-6" />
          <path d="M17 8h2v2" />
        </svg>
      );
  }
}

function ConferenceGuideIconSvg({ icon }: { icon: ConferenceGuideIcon }) {
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
    case "room":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M7 20h10" />
          <path d="M9 11h6" />
        </svg>
      );
    case "microphone":
      return (
        <svg {...commonProps}>
          <rect x="9" y="3" width="6" height="10" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
          <path d="M8 21h8" />
        </svg>
      );
    case "wired":
      return (
        <svg {...commonProps}>
          <path d="M7 7h6a4 4 0 0 1 4 4v2" />
          <path d="M17 13h3v4h-3z" />
          <path d="M4 5h3v4H4z" />
          <path d="M10 17h4" />
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
    case "hybrid":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="12" height="10" rx="2" />
          <path d="M15 9l4-2v8l-4-2" />
          <path d="M8 19h6" />
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
  }
}

type ConferenceSectionIcon =
  | "brand"
  | "products"
  | "info"
  | "price"
  | "components"
  | "types"
  | "audio-video"
  | "compare"
  | "benefits"
  | "applications"
  | "packages"
  | "guide"
  | "projects"
  | "service"
  | "faq";

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
    brand: <><path d="M4 7h16v12H4z" /><path d="M8 7V5h8v2" /><path d="M8 12h8" /></>,
    products: <><path d="M4 7l8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7" /><path d="M12 11v10" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7h.01" /></>,
    price: <><path d="M7 4h10l3 3v10l-3 3H7l-3-3V7l3-3Z" /><path d="M9 9h4.5a2 2 0 0 1 0 4H10.5a2 2 0 0 0 0 4H15" /><path d="M12 7v2M12 17v2" /></>,
    components: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 10h8M8 14h3" /><circle cx="16" cy="14" r="1.5" /></>,
    types: <><path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" /></>,
    "audio-video": <><rect x="3" y="6" width="12" height="10" rx="2" /><path d="M15 9l5-3v12l-5-3" /><path d="M7 19h6" /></>,
    compare: <><path d="M7 4v16M17 4v16" /><path d="m4 8 3-3 3 3M14 16l3 3 3-3" /></>,
    benefits: <><path d="m12 3 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3Z" /></>,
    applications: <><path d="M4 20h16M6 20V8l6-4 6 4v12" /><path d="M9 12h6M9 16h6" /></>,
    packages: <><path d="M4 8l8-4 8 4-8 4-8-4Z" /><path d="M4 8v9l8 4 8-4V8M12 12v9" /></>,
    guide: <><path d="M5 4h10l4 4v12H5z" /><path d="M14 4v5h5M8 13h8M8 17h6" /></>,
    projects: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 16 5-5 4 4 3-3 6 5" /><circle cx="16.5" cy="9" r="1.5" /></>,
    service: <><path d="M4 6h16v10H8l-4 4V6Z" /><path d="M8 10h8M8 13h5" /></>,
    faq: <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.5 2.2c-.9.5-1.3 1.1-1.3 2" /><path d="M12 17h.01" /></>,
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

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Compare conference system price in Bangladesh with chairman & delegate mics, wired/wireless systems, BOQ, installation and free quotation.",
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
    title: `${PAGE_TITLE} | Sasha Corporation`,
    description:
      "Professional conference microphone, wireless conference, and audio control systems for meeting rooms and conference halls.",
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
    title: PAGE_TITLE,
    description: "Conference microphone and meeting audio solutions in Bangladesh.",
    images: [socialImageUrl("/images/Conference%20system/NAC-720W.webp")],
  },
};

export default function ConferenceSystemPage() {
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
    itemListElement: conferenceSystemCatalog.map((product, index) => ({
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
  const conferenceExplorerProducts: ConferenceExplorerProduct[] = conferenceSystemCatalog.map((product) => {
    const primaryImage = getConferenceProductPrimaryImage(product);
    return {
      slug: product.slug,
      name: product.name,
      model: product.model,
      brandSlug: product.brand?.slug ?? null,
      brandName: product.brand?.name,
      productTypes: [...product.productTypes],
      connection: product.connection ?? null,
      meetingType: product.systemCategory ?? null,
      productTypeLabel: CONFERENCE_PRODUCT_TYPE_LABELS[product.productTypes[0]],
      connectionLabel: product.connection ? getConferenceConnectionLabel(product.connection) : undefined,
      systemFamily: product.systemFamily,
      keySpecs: getConferenceProductCardSpecs(product),
      price: getConferenceProductCardPrice(product),
      priceValue:
        product.price.type === "fixed"
          ? { type: "fixed" as const, amount: product.price.amount }
          : product.price.type === "range"
            ? { type: "range" as const, min: product.price.min, max: product.price.max }
            : { type: "request" as const },
      availabilityLabel: product.availability ? getConferenceProductAvailabilityLabel(product) : undefined,
      categorySlugs: conferenceCategoryConfigs
        .filter((category) => category.matchProduct(product))
        .map((category) => category.slug),
      image: { src: primaryImage.src, alt: primaryImage.alt },
      searchText: [...new Set([
        product.name,
        product.model,
        product.brand?.name,
        product.productTypes.map((type) => CONFERENCE_PRODUCT_TYPE_LABELS[type]).join(" "),
        product.connection ? getConferenceConnectionLabel(product.connection) : undefined,
        product.systemCategory,
        product.systemFamily,
        ...product.tags,
      ])]
        .filter(Boolean)
        .join(" "),
    };
  });

  const conferenceExplorerCategories = conferenceCategoryConfigs
    .map((category) => ({
      slug: category.slug,
      label: category.shortLabel ?? category.label,
      count: conferenceSystemCatalog.filter(category.matchProduct).length,
    }))
    .filter((facet) => facet.count > 0);

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
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-0 md:px-6" data-conference-route-kind="hub">
      <Breadcrumbs
        items={[homeBreadcrumb(), { href: "/conference-system/", label: "Conference System", current: true }]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />

      <section className="mobile-page-intro-card rounded-none border-0 bg-transparent p-0 shadow-none md:rounded-3xl md:border md:bg-white md:p-8 md:shadow-sm" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h1 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 md:text-4xl">
          {PAGE_TITLE}
        </h1>
        <MobileIntroText
          teaser="Professional conference system solutions for boardrooms, meeting rooms, training centers and conference halls in Bangladesh."
          expandedClassName="mt-5"
          desktopClassName="mt-5"
          singleDom
        >
          <div className="space-y-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            <p className="text-justify">
              <strong>Sasha Corporation</strong> supplies professional conference system solutions in Bangladesh for
              boardrooms, meeting rooms, government offices, universities, hotels, training centers, and conference halls.
              We provide conference microphone systems, chairman and delegate units, wireless conference systems, audio
              processors, access points, chargers, and control units for organized discussion and clear meeting
              communication.
            </p>
            <p className="text-justify">
              A well-designed conference system helps every speaker stay audible, reduces table noise, and makes meeting
              management smoother. Whether you need a compact setup for a small meeting room or a complete solution for a
              large conference venue, we can help with product selection, BOQ preparation, installation planning, testing,
              and after-sales support throughout Bangladesh.
            </p>
          </div>
        </MobileIntroText>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact/"
            className={ctaClass}
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get a Free BOQ
          </Link>
          <a
            href="#conference-products-heading"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
          >
            Browse Conference Systems
          </a>
        </div>
      </section>

      <section className="mt-4" aria-labelledby="conference-brand-badges-heading">
        <div className="rounded-2xl border bg-white p-4 shadow-sm md:p-5" style={sectionStyle}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="conference-brand-badges-heading" className="flex items-center gap-3 text-lg font-extrabold text-slate-950 md:text-xl">
                <ConferenceSectionTitleIcon icon="brand" compact />
                Shop Conference Systems by Brand
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Browse the verified Bosch, TOA, SPON and CMX conference ranges we supply and support in Bangladesh.
              </p>
            </div>
            <Link
              prefetch={false}
              href="/conference-system/brands/"
              className="inline-flex shrink-0 items-center gap-1 self-start text-[12.5px] font-extrabold uppercase tracking-[0.05em] text-[#C2410C] transition-colors hover:text-[#FD6900] sm:self-auto"
            >
              View All Brands
              <span aria-hidden="true" className="text-[#FD6900]">
                {"→"}
              </span>
            </Link>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {conferenceExplorerBrands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  prefetch={false}
                  href={`/conference-system/brands/${brand.slug}/`}
                  className="group/brand inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-700 shadow-sm transition-colors duration-200 hover:border-[#FD6900]/45 hover:bg-orange-50/70 hover:text-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45"
                >
                  {brand.label}
                  <span
                    aria-hidden="true"
                    className="text-slate-300 transition-all duration-200 group-hover/brand:translate-x-0.5 group-hover/brand:text-[#FD6900]"
                  >
                    {"→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-4" aria-labelledby="conference-products-heading">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="conference-products-heading" className="flex items-center gap-3 text-xl font-extrabold text-slate-950">
              <ConferenceSectionTitleIcon icon="products" compact />
              Conference System Products
            </h2>
            <p className="hidden text-sm text-slate-600 md:block">
              Bosch, TOA, SPON and CMX chairman units, delegate units, control units, DSP, amplifiers and accessories.
            </p>
          </div>
        </div>

        <nav aria-label="Conference system categories" className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">Browse by system or component</p>
          <ul className="mt-3 flex flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] lg:justify-between lg:gap-1.5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            {conferenceExplorerCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  prefetch={false}
                  href={`/conference-system/${category.slug}/`}
                  className="inline-flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                >
                  {category.label}
                  <span className="text-xs font-semibold text-slate-400">{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ConferenceProductExplorer
          products={conferenceExplorerProducts}
          brands={conferenceExplorerBrands}
          productTypes={conferenceExplorerProductTypes}
        />

        <details className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <summary className="cursor-pointer px-5 py-4 text-sm font-extrabold text-slate-900 marker:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/40">
            Browse the complete product directory ({conferenceSystemCatalog.length} products)
          </summary>
          <div className="border-t border-slate-200 px-5 py-5">
            <p className="max-w-4xl text-sm leading-6 text-slate-600">
              Every verified product in the Conference catalog is linked below. Displayed prices are indicative catalog
              ranges; final availability and project cost depend on the selected system family, quantity, cabling, and
              installation scope.
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {conferenceSystemCatalog.map((product) => (
                <li key={product.slug}>
                  <Link
                    prefetch={false}
                    href={`/conference-system/${product.slug}/`}
                    className="inline-flex min-h-9 items-center text-sm font-semibold leading-5 text-slate-700 underline-offset-4 hover:text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="what-is-conference-system">
        <div className="w-full">
          <h2 id="what-is-conference-system" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="info" />
            What is a Conference System?
          </h2>
          <MobileIntroText
            teaser="A conference system is a professional audio communication setup for organized meetings, clearer speech pickup and better discussion control."
            className="mt-4 w-full"
            desktopClassName="w-full"
            singleDom
          >
            <p className="w-full text-left text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              A conference system is a professional audio communication solution used for meetings, boardrooms, seminar
              rooms, training centers, government offices, corporate offices, hotels, educational institutions, and
              conference halls. It includes chairman units, delegate units, a control unit, wireless microphones, DSP
              processor, speakers, cables, and accessories to keep every speaker clear and every discussion organized.
            </p>
          </MobileIntroText>
        </div>
      </section>

      <section id="conference-system-price" className={`${sectionClass} scroll-mt-24`} style={sectionStyle} aria-labelledby="conference-system-price-heading">
        <h2 id="conference-system-price-heading" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
          <ConferenceSectionTitleIcon icon="price" />
          Conference System Price in Bangladesh
        </h2>
        <p className="mt-4 w-full text-left text-sm leading-7 text-slate-700 md:text-base md:leading-8">
          Conference system price in Bangladesh varies by product model, microphone quantity, system type, brand,
          control unit, processor, speaker coverage, installation complexity, and service support. The table below
          lists Sasha Corporation conference system products with direct product links for easier comparison.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-orange-200/80 bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="hidden bg-gradient-to-r from-slate-900 via-slate-800 to-sky-800 text-white md:table-header-group">
              <tr>
                <th className="w-[34%] border-r border-white/25 px-4 py-3.5 font-extrabold">Product Name</th>
                <th className="w-[12%] border-r border-white/25 px-4 py-3.5 font-extrabold">Brand</th>
                <th className="w-[16%] border-r border-white/25 px-4 py-3.5 font-extrabold">Product Type</th>
                <th className="w-[22%] border-r border-white/25 px-4 py-3.5 font-extrabold">Best For</th>
                <th className="w-[16%] px-4 py-3 text-right font-extrabold">Price</th>
              </tr>
            </thead>
            <tbody className="block divide-y divide-slate-200 md:table-row-group">
              {conferencePriceTableProducts.map((product) => (
                <tr key={product.slug} className="block bg-white align-top transition-colors md:table-row md:even:bg-sky-50/45 md:hover:bg-orange-50/65">
                  <td className="block border-l-4 border-orange-500 px-4 py-4 md:table-cell md:border-l-0 md:border-r md:border-slate-200 md:py-3">
                    <Link
                      href={`/conference-system/${product.slug}/`}
                      className="block break-words font-extrabold leading-6 text-slate-950 underline-offset-4 transition hover:text-orange-600 hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{product.shortDescription}</p>
                    <div className="mt-3 grid gap-3 md:hidden">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Brand</span>
                        <span className="text-right text-xs font-bold text-slate-800">{product.brand?.name ?? "Sasha"}</span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Type</span>
                        <span className="text-right text-xs font-bold text-slate-800">{product.badge}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-extrabold uppercase tracking-wide text-slate-500">Best For</span>
                        <span className="mt-1 block text-xs leading-5 text-slate-700">{product.applications.join(", ")}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Price</span>
                        <span className="text-right text-sm font-extrabold text-slate-950">{normalizeDisplayedPriceText(product.price.displayLabel)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 font-semibold text-slate-800 md:table-cell md:border-r md:border-slate-200">{product.brand?.name ?? "Sasha"}</td>
                  <td className="hidden px-4 py-3 font-semibold text-slate-800 md:table-cell md:border-r md:border-slate-200">{product.badge}</td>
                  <td className="hidden px-4 py-3 text-slate-700 md:table-cell md:border-r md:border-slate-200">{product.applications.join(", ")}</td>
                  <td className="hidden px-4 py-3 text-right md:table-cell">
                    <span className="font-extrabold text-slate-800">
                      {normalizeDisplayedPriceText(product.price.displayLabel)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/60 p-4 text-sm leading-7 text-slate-700">
          Product prices help estimate equipment cost, but final conference system price in Bangladesh depends on room
          size, number of microphones, brand, control unit, audio processor, speaker setup, installation complexity, and
          after-sales support.
        </p>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-system-components">
        <div className="max-w-5xl">
          <h2 id="conference-system-components" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="components" />
            Key Components of a Conference System
          </h2>
          <MobileIntroText
            teaser="The right component mix keeps speech clear, discussion organized and room-wide communication stable."
            className="mt-4"
            singleDom
          >
            <p className="text-sm leading-7 text-slate-700 text-justify md:text-base md:leading-8">
              A conference system connects chairman and delegate microphones, a central controller, audio processing,
              amplification and speakers, plus cables and optional video, recording, or software add-ons, into one
              working meeting room setup.
            </p>
          </MobileIntroText>
        </div>

        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2 lg:grid-cols-3"
            items={conferenceComponentCards.map((item) => ({
              title: item.title,
              desc: item.description,
              bullets: item.features,
              icon: <ConferenceComponentIconSvg icon={item.icon} />,
            }))}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-xl font-extrabold text-slate-950">
                Need help choosing the right conference system components?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                Sasha Corporation can recommend chairman units, delegate units, central control units, audio processors,
                conference speaker options, and PTZ camera integration based on your room size and installation scope.
              </p>
            </div>
            <Link
              href="/contact/"
              className={ctaClass}
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get Expert Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="types-of-conference-systems">
        <h2 id="types-of-conference-systems" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
          <ConferenceSectionTitleIcon icon="types" />
          Types of Conference Systems
        </h2>
        <MobileIntroText
          teaser="Choose the right conference system type based on room use, table layout, installation style and meeting workflow."
          className="mt-3 md:hidden"
          singleDom
        >
          <p className="text-sm leading-7 text-slate-600 text-justify">
            Choose the right conference system type based on room use, table layout, installation style and meeting workflow.
          </p>
        </MobileIntroText>
        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2 lg:grid-cols-3"
            items={systemTypes.map((item) => ({ title: item.title, desc: item.desc }))}
          />
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          These types describe connection architecture — wired, wireless, digital, or network-based. Meeting mode is
          a separate choice: audio-only or video-enabled collaboration, covered next.
        </p>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="choose-your-conference-system">
        <h2 id="choose-your-conference-system" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
          <ConferenceSectionTitleIcon icon="audio-video" />
          Choose Your Conference System
        </h2>
        <MobileIntroText
          teaser="Audio and video conference systems solve different parts of the meeting workflow and are often combined for hybrid rooms."
          className="mt-3 md:hidden"
          singleDom
        >
          <p className="text-sm leading-7 text-slate-600 text-justify">
            Audio and video conference systems solve different parts of the meeting workflow and are often combined for hybrid rooms.
          </p>
        </MobileIntroText>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-extrabold text-slate-950">Audio Conference System</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 text-justify">
              An audio conference system uses chairman and delegate microphones with a central controller to
              organize in-room discussion and keep every speaker clear. It is the standard setup for boardrooms,
              government meeting rooms, and training centers where structured, in-person discussion matters most.
            </p>
            <Link
              prefetch={false}
              href="/conference-system/audio-conference-system/"
              className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-extrabold uppercase tracking-[0.05em] text-[#C2410C] transition-colors hover:text-[#FD6900]"
            >
              Explore Audio Conference Systems
              <span aria-hidden="true" className="text-[#FD6900]">{"→"}</span>
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-950">Video Conference System</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 text-justify">
              A video conference system extends meeting audio with camera, display, and video processing equipment
              to support hybrid and remote collaboration. Sasha&apos;s current video conference range focuses on
              presentation processing, display integration, and paperless conferencing equipment that pairs with
              your existing audio setup.
            </p>
            <Link
              prefetch={false}
              href="/conference-system/video-conference-system/"
              className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-extrabold uppercase tracking-[0.05em] text-[#C2410C] transition-colors hover:text-[#FD6900]"
            >
              Explore Video Conference Systems
              <span aria-hidden="true" className="text-[#FD6900]">{"→"}</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-orange-200/80 bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="hidden bg-gradient-to-r from-slate-900 via-slate-800 to-sky-800 text-white md:table-header-group">
              <tr>
                <th className="w-[24%] border-r border-white/15 px-4 py-3.5 font-extrabold">Feature</th>
                <th className="w-[38%] border-r border-white/15 px-4 py-3.5 font-extrabold">Audio Conference</th>
                <th className="w-[38%] px-4 py-3.5 font-extrabold">Video Conference</th>
              </tr>
            </thead>
            <tbody className="block divide-y divide-slate-200 md:table-row-group">
              {audioVsVideoComparisonRows.map((row) => (
                <tr key={row[0]} className="block bg-white transition-colors md:table-row md:even:bg-sky-50/45 md:hover:bg-orange-50/65">
                  <td className="block border-l-4 border-orange-500 px-4 py-4 font-extrabold text-slate-950 md:table-cell md:border-l-0 md:border-r md:border-slate-200 md:py-3">
                    {row[0]}
                  </td>
                  <td className="block px-4 py-3 text-slate-700 md:table-cell md:border-r md:border-slate-200 md:px-4 md:py-3">
                    <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500 md:hidden">Audio Conference</div>
                    <div className="mt-1 md:mt-0">{row[1]}</div>
                  </td>
                  <td className="block px-4 py-3 text-slate-700 md:table-cell md:px-4 md:py-3">
                    <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500 md:hidden">Video Conference</div>
                    <div className="mt-1 md:mt-0">{row[2]}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="wired-vs-wireless-conference-system">
        <h2 id="wired-vs-wireless-conference-system" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
          <ConferenceSectionTitleIcon icon="compare" />
          Wired vs Wireless Conference System
        </h2>
        <MobileIntroText
          teaser="Both wired and wireless systems work well when matched to the room layout, usage pattern and maintenance preference."
          className="mt-3 md:hidden"
          singleDom
        >
          <p className="text-sm leading-7 text-slate-600 text-justify">
            Both wired and wireless systems work well when matched to the room layout, usage pattern and maintenance preference.
          </p>
        </MobileIntroText>
        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2"
            items={[
              {
                title: "Wired Conference System",
                desc: "Best for permanent rooms where stable connection, fixed microphone points and lower maintenance are important.",
                bullets: wiredPoints,
              },
              {
                title: "Wireless Conference System",
                desc: "Best for flexible rooms where clean tables, reconfiguration and mobility are important.",
                bullets: wirelessPoints,
              },
            ]}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            prefetch={false}
            href="/conference-system/wired-conference-system/"
            className="inline-flex items-center gap-1 text-[12.5px] font-extrabold uppercase tracking-[0.05em] text-[#C2410C] transition-colors hover:text-[#FD6900]"
          >
            View Wired Conference System Price
            <span aria-hidden="true" className="text-[#FD6900]">{"→"}</span>
          </Link>
          <Link
            prefetch={false}
            href="/conference-system/wireless-conference-system/"
            className="inline-flex items-center gap-1 text-[12.5px] font-extrabold uppercase tracking-[0.05em] text-[#C2410C] transition-colors hover:text-[#FD6900]"
          >
            View Wireless Conference System Price
            <span aria-hidden="true" className="text-[#FD6900]">{"→"}</span>
          </Link>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-system-benefits">
        <div className="max-w-5xl">
          <h2 id="conference-system-benefits" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="benefits" />
            Key Benefits of a Professional Conference System
          </h2>
          <MobileIntroText
            teaser="A properly planned conference system improves meeting control, voice clarity and overall room professionalism."
            className="mt-4"
            singleDom
          >
            <p className="text-sm leading-7 text-slate-700 text-justify md:text-base md:leading-8">
              A well-designed conference system improves speech clarity, meeting control, and scalability while
              supporting different room layouts and integration needs, from small boardrooms to large conference
              halls.
            </p>
          </MobileIntroText>
        </div>

        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            items={conferenceBenefits.map((item) => ({
              title: item.title,
              desc: item.description,
              bullets: item.bullets,
              icon: <ConferenceBenefitIconSvg icon={item.icon} />,
            }))}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-xl font-extrabold text-slate-950">Need the Right Conference System for Your Meeting Room?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                Sasha Corporation can help you choose the right conference system based on room size, participant
                capacity, microphone quantity, wired or wireless preference, and installation requirements.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className={ctaClass}
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Get Free Quotation
              </Link>
              <a
                href="#conference-system-price"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
              >
                View Conference System Price
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-system-applications">
        <h2 id="conference-system-applications" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
          <ConferenceSectionTitleIcon icon="applications" />
          Conference System Applications
        </h2>
        <MobileIntroText
          teaser="Different meeting environments need different microphone quantity, room audio planning and control workflow."
          className="mt-3 md:hidden"
          singleDom
        >
          <p className="text-sm leading-7 text-slate-600 text-justify">
            Different meeting environments need different microphone quantity, room audio planning and control workflow.
          </p>
        </MobileIntroText>
        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2 lg:grid-cols-3"
            items={applicationCards.map((item) => ({ title: item.title, desc: item.desc }))}
          />
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-system-packages">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <h2 id="conference-system-packages" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
              <ConferenceSectionTitleIcon icon="packages" />
              Conference System Packages by Room Size
            </h2>
            <MobileIntroText
              teaser="Package planning depends on room layout, participant count, microphone quantity, audio coverage and installation scope."
              className="mt-4"
              singleDom
            >
              <p className="text-sm leading-7 text-slate-700 text-justify md:text-base md:leading-8">
                Sasha Corporation can prepare a practical conference system package based on participant capacity, room
                layout, microphone count, audio coverage, and installation scope.
              </p>
            </MobileIntroText>
          </div>
          <Link
            href="/contact/"
            className={ctaClass}
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Request Quotation -&gt;
          </Link>
        </div>

        <div className="-mx-0.5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:snap-none md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
          {packageCards.map((item, index) => (
            <article
              key={item.title}
              className={`flex h-full w-[89%] shrink-0 snap-start flex-col rounded-[14px] border p-4 shadow-sm md:w-auto md:rounded-2xl md:border-slate-200 md:bg-white md:p-5 md:snap-none ${getParityClassName(index)}`}
            >
              <h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3>
              <dl className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                <div>
                  <dt className="font-extrabold text-slate-950">Best for</dt>
                  <dd className="mt-1">{item.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-950">Included items</dt>
                  <dd className="mt-1">{item.included}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-950">Approximate participant capacity</dt>
                  <dd className="mt-1">{item.capacity}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-950">Recommended products</dt>
                  <dd className="mt-1">{item.recommended}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-5">
                <Link
                  href="/contact/"
                  className="inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 hover:bg-orange-50"
                  style={{ borderColor: `${BRAND.maroon}35`, color: BRAND.maroon }}
                >
                  Request Quotation -&gt;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="choose-right-conference-system">
        <div className="max-w-5xl">
          <h2 id="choose-right-conference-system" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="guide" />
            How to Choose the Right Conference System in Bangladesh
          </h2>
          <MobileIntroText
            teaser="The right conference setup depends on room size, participant count, mic type, AV integration and installation scope."
            className="mt-4"
            singleDom
          >
            <p className="text-sm leading-7 text-slate-700 text-justify md:text-base md:leading-8">
              Choosing the right conference system depends on room size, participant capacity, microphone type, audio
              quality, installation requirements, and budget. Whether you need chairman & delegate mics for a boardroom,
              a wired conference system for a permanent meeting room, or a wireless conference system for a flexible
              space, the right setup ensures clear communication, better meeting control, and long-term performance.
            </p>
          </MobileIntroText>
        </div>

        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2 xl:grid-cols-3"
            items={conferenceGuideCards.map((item) => ({
              title: item.title,
              desc: item.description,
              bullets: item.bullets,
              icon: <ConferenceGuideIconSvg icon={item.icon} />,
            }))}
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-orange-200/80 bg-white">
          <div className="border-b border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-sky-50 px-5 py-4 md:px-6">
            <h3 className="flex items-center gap-3 text-lg font-extrabold text-slate-950">
              <ConferenceSectionTitleIcon icon="guide" compact />
              Quick Selection Guide for Conference Systems
            </h3>
          </div>
          <div className="overflow-hidden">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="hidden bg-gradient-to-r from-slate-900 via-slate-800 to-sky-800 text-white md:table-header-group">
                <tr>
                  <th className="border-r border-white/15 px-4 py-3.5 font-extrabold">Room Type</th>
                  <th className="border-r border-white/15 px-4 py-3.5 font-extrabold">Participants</th>
                  <th className="border-r border-white/15 px-4 py-3.5 font-extrabold">Recommended System</th>
                  <th className="px-4 py-3.5 font-extrabold">Best Choice</th>
                </tr>
              </thead>
              <tbody className="block divide-y divide-slate-200 md:table-row-group">
                {conferenceSelectionGuideRows.map((row) => (
                  <tr key={row[0]} className="block bg-white transition-colors md:table-row md:even:bg-sky-50/45 md:hover:bg-orange-50/65">
                    <td className="block border-l-4 border-orange-500 px-4 py-4 md:table-cell md:border-l-0 md:border-r md:border-slate-200 md:py-3">
                      <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500 md:hidden">Room Type</div>
                      <div className="font-extrabold text-slate-950">{row[0]}</div>
                    </td>
                    <td className="block px-4 py-0 pb-4 md:table-cell md:border-r md:border-slate-200 md:px-4 md:py-3">
                      <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500 md:hidden">Participants</div>
                      <div className="mt-1 font-semibold text-slate-700 md:mt-0">{row[1]}</div>
                    </td>
                    <td className="block px-4 py-0 pb-4 md:table-cell md:border-r md:border-slate-200 md:px-4 md:py-3">
                      <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500 md:hidden">Recommended System</div>
                      <div className="mt-1 md:mt-0 text-slate-700">{row[2]}</div>
                    </td>
                    <td className="block px-4 py-0 pb-4 md:table-cell md:px-4 md:py-3">
                      <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500 md:hidden">Best Choice</div>
                      <div className="mt-1 font-semibold text-slate-700 md:mt-0">{row[3]}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-xl font-extrabold text-slate-950">Need Help Choosing the Right Conference System?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                Sasha Corporation can help you select the right conference system based on room size, participant
                capacity, chairman & delegate mic quantity, wired or wireless preference, BOQ requirements, and
                installation scope.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className={ctaClass}
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Get Free Quotation
              </Link>
              <a
                href="#conference-system-price"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                View Conference System Price
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-system-installations">
        <div className="max-w-5xl">
          <h2 id="conference-system-installations" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="projects" />
            Our Conference System Installations
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Explore some of our conference system projects delivered for meeting rooms, boardrooms, training facilities,
            and conference halls in Bangladesh.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {conferenceInstallationProjects.map((project) => (
            <article key={project.title} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h3 className="text-lg font-extrabold leading-snug text-slate-950">{project.title}</h3>
                <dl className="mt-4 space-y-2 border-y border-slate-100 py-3 text-[13px] leading-5 text-slate-700">
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2"><dt className="font-bold text-slate-500">Location</dt><dd>{project.location}</dd></div>
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2"><dt className="font-bold text-slate-500">Brand / System</dt><dd>{project.brand}</dd></div>
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2"><dt className="font-bold text-slate-500">Configuration</dt><dd>{project.configuration}</dd></div>
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2"><dt className="font-bold text-slate-500">Scope</dt><dd>{project.scope}</dd></div>
                </dl>
                <p className="mt-3 text-sm leading-6 text-slate-700">{project.description}</p>
                <Link href="/projects/" aria-label={`View projects related to ${project.title}`} className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-extrabold text-orange-700 transition hover:text-orange-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">
                  View Project <span aria-hidden="true" className="ml-1">-&gt;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/projects/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">
            View All Projects
          </Link>
          <Link href="/contact/" className={ctaClass} style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}>
            Request a Quotation
          </Link>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="why-choose-sasha">
        <div className="max-w-5xl">
          <h2 id="why-choose-sasha" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="service" />
            Why Choose Sasha Corporation for Conference Systems in Bangladesh?
          </h2>
          <MobileIntroText
            teaser="We support conference projects with room-based planning, product selection, BOQ preparation, installation and after-sales guidance."
            className="mt-4"
            singleDom
          >
            <p className="text-sm leading-7 text-slate-700 text-justify md:text-base md:leading-8">
              Sasha Corporation provides reliable conference system solutions for boardrooms, offices, training rooms,
              government meeting rooms, hotels, institutions, and conference halls across Bangladesh. From chairman &
              delegate mics to wired and wireless conference microphone systems, we help clients choose the right
              products, prepare proper BOQ, complete installation, and ensure clear meeting room audio performance.
            </p>
          </MobileIntroText>
        </div>
        <div className="mt-6">
          <ResponsiveCardGrid
            desktopClassName="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            items={chooseSashaCards.map((item) => ({
              title: item.title,
              desc: item.description,
              bullets: item.bullets,
              icon: <ChooseSashaIconSvg icon={item.icon} />,
            }))}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h3 className="text-lg font-extrabold text-slate-950">
            Our Conference System Process
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
            {conferenceSupportProcessSteps.map((step, index) => (
              <span key={step} className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-900">
                  {step}
                </span>
                {index < conferenceSupportProcessSteps.length - 1 ? (
                  <span aria-hidden="true" className="text-slate-300">
                    {"→"}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-xl font-extrabold text-slate-950">Need a Conference System for Your Meeting Room?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                Get expert support from Sasha Corporation to choose the right conference system based on room size,
                participant capacity, chairman & delegate mic quantity, wired or wireless preference, BOQ requirement,
                and installation scope.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className={ctaClass}
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Get Free Quotation
              </Link>
              <a
                href="#conference-system-price"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
              >
                View Conference System Price
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-brand-showcase">
        <div className="text-center">
          <h2 id="conference-brand-showcase" className="flex items-center justify-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
            <ConferenceSectionTitleIcon icon="brand" />
            Brands We Work With
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Sasha Corporation is an authorized distributor of Bosch, TOA, SPON, and CMX solutions in Bangladesh. This
            section explains the conference-system range and project support available for each brand; use the brand
            links above for quick navigation or open a brand page below for its current verified catalog.
          </p>
        </div>
        <div className="-mx-0.5 mt-8 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-0.5 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:snap-none md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {verifiedConferenceBrandCards.map((brand, index) => (
            <article
              key={brand.title}
              className={`flex h-full w-[89%] shrink-0 snap-start flex-col rounded-[14px] border p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md md:w-auto md:rounded-2xl md:border-slate-200 md:bg-white md:p-6 md:snap-none ${getParityClassName(index)}`}
            >
              <div>
                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold text-orange-700">
                  {brand.badge}
                </span>
              </div>
              <div className="mt-3">
                <ConferenceBrandTitleBox brand={brand} />
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700 text-justify">{brand.category}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 text-justify">{brand.description}</p>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.06em] text-slate-500">Project support</p>
                <p className="mt-1.5 text-sm leading-6 text-slate-700">{brand.support}</p>
              </div>
              <Link
                prefetch={false}
                href={brand.url}
                className="mt-auto inline-flex items-center gap-1 pt-5 text-[12.5px] font-extrabold uppercase tracking-[0.05em] text-[#C2410C] transition-colors hover:text-[#FD6900]"
              >
                View {brand.title} Products
                <span aria-hidden="true" className="text-[#FD6900]">{"→"}</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/45 p-5 md:p-6" aria-labelledby="conference-commercial-confidence">
          <div className="max-w-4xl">
            <h3 id="conference-commercial-confidence" className="text-xl font-extrabold text-slate-950">
              Commercial Confidence &amp; Verified Business Support
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Review our verified business contact, project process and commercial policies before confirming a
              conference-system order or installation scope.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="font-extrabold text-slate-950">Verified business contact</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{siteConfig.address}</p>
              <a href={`tel:${siteConfig.phone}`} className="mt-2 inline-flex text-sm font-bold text-sky-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40">
                {siteConfig.phone}
              </a>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="font-extrabold text-slate-950">Transparent quotation scope</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Final quotation follows verified products, quantities, compatibility, installation and agreed project scope.
              </p>
              <Link href="/contact/" className="mt-2 inline-flex text-sm font-bold text-sky-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40">Request a documented quotation</Link>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="font-extrabold text-slate-950">Installation &amp; support</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Room review, BOQ planning, installation, testing and after-sales scope are agreed for each project.
              </p>
              <Link href="/services-support/" className="mt-2 inline-flex text-sm font-bold text-sky-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40">Review services and support</Link>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="font-extrabold text-slate-950">Clear commercial policies</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">Check applicable terms, return conditions and privacy handling before ordering.</p>
              <nav aria-label="Commercial policies" className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm font-bold text-sky-800">
                <Link href="/terms/" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40">Terms</Link>
                <Link href="/return-policy/" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40">Returns</Link>
                <Link href="/privacy/" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40">Privacy</Link>
              </nav>
            </article>
          </div>
        </div>
        <p className="mt-5 text-xs leading-6 text-slate-500">
          Authorization scope follows the applicable manufacturer appointment and product-line terms. Supporting
          authorization information is available from Sasha Corporation on request.
        </p>
      </section>

      <section className={sectionClass} style={sectionStyle} aria-labelledby="conference-system-faq">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <h2 id="conference-system-faq" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-950">
              <ConferenceSectionTitleIcon icon="faq" />
              Conference System FAQ
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Answers to common questions about conference system price, chairman and delegate units, wireless
              microphones, digital conference systems, and installation support in Bangladesh.
            </p>
          </div>
          <Link
            href="/contact/"
            className={ctaClass}
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Request Quotation -&gt;
          </Link>
        </div>

        <FaqAccordion items={conferenceFaqs} accent={BRAND.maroon} className="mt-6" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conferenceServiceJsonLd) }} />
      </section>
    </div>
  );
}
