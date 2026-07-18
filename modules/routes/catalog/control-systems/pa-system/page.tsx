import Link from "next/link";
import type { Metadata } from "next";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { getPaSystemBySlug, getPaSystemCardPriceLabel, paSystemCatalog } from "./catalog";
import PaSystemProducts from "./PaSystemProducts";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const PAGE_TITLE = "PA System Price in Bangladesh 2026";

const PA_PRICE_TABLE_SLUGS = [
  "toa-wa-z110sd-70w-portable-speaker-amplifier",
  "bosch-ccs-900-ultra-conference-system-unit",
  "bosch-ccs-cu-conference-control-power-unit",
  "ahuja-cmd-7200-delegate-unit-microphone",
  "ahuja-cma-5400-50w-central-mixer-amplifier",
  "ahuja-cma-7400-50w-digital-conference-amplifier",
  "toa-wt-5810-wm-5225-uhf-wireless-microphone",
  "wireless-lapel-headset-microphone-set",
  "bosch-lb2-uc30-30w-cabinet-loudspeaker",
  "6w-ceiling-speaker-bgm-paging",
  "bosch-lc9-uc06-6w-ceiling-speaker-metal-grill",
  "bosch-lc2-pc30g6-8-30w-ceiling-loudspeaker",
  "60w-column-speaker-mosque-hall",
  "toa-tz-105-10w-column-speaker",
  "50w-outdoor-horn-speaker-siren-announcement",
] as const;

const PA_PRICE_ROWS = PA_PRICE_TABLE_SLUGS.map((slug) => {
  const item = getPaSystemBySlug(slug);
  if (!item) return null;

  return {
    slug: item.slug,
    title: item.title,
    href: `/pa-system/${item.slug}/`,
    range: getPaSystemCardPriceLabel(item) ?? item.priceLabel ?? "On request",
  };
}).filter((item): item is { slug: string; title: string; href: string; range: string } => Boolean(item));

const PA_PAGE_ITEMS = paSystemCatalog.filter(
  (item) => item.slug !== "bosch-lc9-uc06-6w-ceiling-speaker-metal-grill"
);

const FAQS: { q: string; a: string }[] = [
  {
    q: "What affects PA sound system price in Bangladesh?",
    a: "Pricing depends on coverage area, number of zones, speaker type (ceiling/wall/column/horn), amplifier power, cable distance, and installation complexity. Share your floor plan and use-case to get an accurate BOQ and quotation.",
  },
  {
    q: "Is 100V line best for multi-speaker buildings?",
    a: "For offices, schools, factories and large sites with many speakers, a 100V line system is often the most practicalâ€”long cable runs stay stable and zoning is easier. For smaller rooms, low-impedance setups can also work.",
  },
  {
    q: "Can I do paging + background music (BGM) together?",
    a: "Yes. A well-designed system supports daily announcements and paging with priority override while playing background music by zone. We help you set the right input sources, volume logic and zoning rules.",
  },
  {
    q: "Which speaker type should I choose (ceiling, wall, column, horn)?",
    a: "Ceiling speakers suit offices, shops and corridors. Wall speakers work well for classrooms and clinics. Column speakers are popular for halls and mosques for speech clarity. Horn speakers are ideal for outdoor or high-noise factory areas.",
  },
  {
    q: "Do you support mosque Azan & Khutbah sound systems?",
    a: "Yes. We focus on intelligibility and echo control with proper placement and the right speaker type (often column speakers) so Azan and speech remain clear across the prayer hall.",
  },
  {
    q: "How do I get a BOQ and quotation quickly?",
    a: "Send your site details (location, floor count, approximate area, number of rooms, and where announcements are needed). Weâ€™ll propose a practical BOQ with system type, key components and estimated installation scopeâ€”then finalize after confirmation.",
  },
  {
    q: "Do you provide installation and after-sales support?",
    a: "Yes. We support cable routing guidance, rack wiring, testing, basic handover and service supportâ€”so the system stays stable for daily operation.",
  },
  {
    q: "Can a PA system be integrated with fire alarm or emergency triggers?",
    a: "Often yes. Depending on the amplifier/controller, emergency inputs or priority paging can override background music and non-critical audio. We plan this in the BOQ so emergency messages remain clear and reliable.",
  },
];

type PaSolutionIconName =
  | "microphone"
  | "amplifier"
  | "distribution"
  | "speaker"
  | "mosque"
  | "education"
  | "office"
  | "factory"
  | "hospital"
  | "mall"
  | "horn"
  | "ceilingSpeaker"
  | "columnSpeaker"
  | "wallSpeaker"
  | "cabinetSpeaker"
  | "siteSurvey"
  | "coverageMap"
  | "blueprint"
  | "audioEquipment"
  | "installationTools"
  | "checklist"
  | "supportTraining"
  | "verifiedShield"
  | "maintenanceSettings"
  | "warrantyBadge"
  | "customizationSliders"
  | "projectBriefcase"
  | "callStation"
  | "mixer"
  | "controlPanel";

const PA_SOLUTION_STEPS: Array<{ title: string; description: string; icon: PaSolutionIconName }> = [
  {
    title: "Audio Input",
    description: "Sound is captured through a microphone, paging console, media player, or other audio source.",
    icon: "microphone",
  },
  {
    title: "Signal Amplification",
    description: "The amplifier processes and strengthens the audio signal so it can cover the required area.",
    icon: "amplifier",
  },
  {
    title: "Audio Distribution",
    description: "The audio signal is distributed through cables, control units, and speaker zones.",
    icon: "distribution",
  },
  {
    title: "Sound Output",
    description: "Speakers broadcast the announcement or audio clearly to the selected area or full facility.",
    icon: "speaker",
  },
];

const PA_APPLICATIONS: Array<{ title: string; description: string; icon: PaSolutionIconName }> = [
  {
    title: "Mosque PA System",
    description:
      "Used for azan, prayer announcements, religious programs, and clear voice coverage inside and outside the mosque.",
    icon: "mosque",
  },
  {
    title: "School & College PA System",
    description:
      "Suitable for class announcements, emergency alerts, assembly areas, corridors, and administrative communication.",
    icon: "education",
  },
  {
    title: "Office PA System",
    description: "Helps with staff paging, internal announcements, reception communication, and background music.",
    icon: "office",
  },
  {
    title: "Factory PA System",
    description:
      "Designed for safety announcements, operational paging, shift communication, and wide-area voice coverage.",
    icon: "factory",
  },
  {
    title: "Hospital PA System",
    description:
      "Used for patient calling, staff paging, emergency announcements, and public information broadcasting.",
    icon: "hospital",
  },
  {
    title: "Shopping Mall & Commercial PA System",
    description:
      "Ideal for customer announcements, promotional messages, emergency alerts, and background music.",
    icon: "mall",
  },
];

const PA_COMPONENTS: Array<{ title: string; description: string; icon: PaSolutionIconName }> = [
  {
    title: "PA Amplifier",
    description:
      "The amplifier is the core of a PA system. It increases audio signal strength and delivers sufficient power to connected speakers for clear voice announcements and audio distribution.",
    icon: "amplifier",
  },
  {
    title: "PA Microphone",
    description:
      "Microphones are used for live announcements, paging, public speaking, emergency communication, and daily operational broadcasts. Both wired and wireless microphones can be integrated into the system.",
    icon: "microphone",
  },
  {
    title: "Horn PA Speaker",
    description:
      "Horn speakers are designed for outdoor environments and long-distance voice projection. They are commonly used in mosques, factories, industrial facilities, and public areas.",
    icon: "horn",
  },
  {
    title: "Ceiling PA Speaker",
    description:
      "Ceiling speakers provide uniform audio coverage in indoor environments such as offices, hospitals, hotels, shopping malls, educational institutions, and commercial buildings.",
    icon: "ceilingSpeaker",
  },
  {
    title: "Column PA Speaker",
    description:
      "Column speakers offer excellent speech intelligibility and are ideal for prayer halls, conference rooms, auditoriums, schools, and large indoor spaces.",
    icon: "columnSpeaker",
  },
  {
    title: "Paging Console / Call Station",
    description:
      "Paging consoles allow operators to make announcements to selected zones or the entire facility. They are commonly used in schools, hospitals, offices, and factories.",
    icon: "callStation",
  },
  {
    title: "Audio Mixer",
    description:
      "An audio mixer combines multiple audio sources and provides control over volume, routing, audio balancing, and sound quality management.",
    icon: "mixer",
  },
  {
    title: "Zone Controller",
    description:
      "Zone controllers enable independent control of different areas, allowing targeted announcements and volume adjustment across multiple zones or buildings.",
    icon: "controlPanel",
  },
];

const PA_SPEAKER_TYPES: Array<{
  title: string;
  description: string;
  icon: PaSolutionIconName;
}> = [
  {
    title: "Horn Speaker",
    description:
      "Horn speakers are designed for long-distance voice projection and high-volume announcements. They are commonly used in mosques, factories, industrial facilities, parking areas, transportation terminals, and other outdoor environments.",
    icon: "horn",
  },
  {
    title: "Ceiling Speaker",
    description:
      "Ceiling speakers provide uniform audio coverage and blend neatly into interior environments. They are widely used in offices, hospitals, shopping malls, hotels, educational institutions, and commercial buildings.",
    icon: "ceilingSpeaker",
  },
  {
    title: "Column Speaker",
    description:
      "Column speakers offer excellent speech intelligibility and are ideal for prayer halls, conference rooms, auditoriums, schools, and worship spaces where clear voice reproduction is important.",
    icon: "columnSpeaker",
  },
  {
    title: "Wall Mount PA Speaker",
    description:
      "Wall-mounted speakers are suitable for classrooms, corridors, offices, and commercial spaces where targeted sound coverage is required without ceiling installation.",
    icon: "wallSpeaker",
  },
  {
    title: "Cabinet PA Speaker",
    description:
      "Cabinet speakers are commonly used for background music, public announcements, retail environments, restaurants, showrooms, and commercial facilities requiring balanced sound performance.",
    icon: "cabinetSpeaker",
  },
];

const PA_INSTALLATION_PROCESS: Array<{
  step: number;
  title: string;
  description: string;
  icon: PaSolutionIconName;
}> = [
  {
    step: 1,
    title: "Site Survey",
    description:
      "Our team conducts a detailed site survey to understand the building layout, installation environment, coverage area, communication requirements, speaker locations, and cable routing possibilities.",
    icon: "siteSurvey",
  },
  {
    step: 2,
    title: "Coverage Analysis",
    description:
      "We evaluate coverage requirements, audience areas, ambient noise levels, and announcement objectives to ensure clear and intelligible audio throughout the facility.",
    icon: "coverageMap",
  },
  {
    step: 3,
    title: "System Design",
    description:
      "Based on the collected information, we prepare a customized PA system design including speaker placement, amplifier sizing, zoning requirements, and signal distribution planning.",
    icon: "blueprint",
  },
  {
    step: 4,
    title: "Equipment Selection",
    description:
      "The appropriate speakers, amplifiers, microphones, paging consoles, controllers, and accessories are selected according to project requirements, performance goals, and budget considerations.",
    icon: "audioEquipment",
  },
  {
    step: 5,
    title: "Professional Installation",
    description:
      "Our technicians install all equipment, speaker systems, cabling, mounting hardware, and control devices following industry best practices and safety standards.",
    icon: "installationTools",
  },
  {
    step: 6,
    title: "Testing & Commissioning",
    description:
      "The complete system is tested and configured to verify audio clarity, speaker performance, zone functionality, paging operation, and overall system reliability before handover.",
    icon: "checklist",
  },
  {
    step: 7,
    title: "Training & Technical Support",
    description:
      "We provide user training, operational guidance, technical assistance, maintenance recommendations, and after-sales support to ensure smooth long-term operation.",
    icon: "supportTraining",
  },
];

const PA_WHY_CHOOSE_FEATURES: Array<{
  title: string;
  description: string;
  icon: PaSolutionIconName;
}> = [
  {
    title: "System Design Assistance",
    description:
      "We analyze coverage areas, building layouts, speaker placement, zoning needs, and operational requirements to design the most effective PA system configuration.",
    icon: "blueprint",
  },
  {
    title: "Professional Installation",
    description:
      "Our technicians handle speaker positioning, equipment installation, cable management, system configuration, and final setup for reliable audio performance.",
    icon: "installationTools",
  },
  {
    title: "Genuine Equipment",
    description:
      "We supply quality PA system equipment from trusted manufacturers to ensure stable performance, durability, and long-term system reliability.",
    icon: "verifiedShield",
  },
  {
    title: "Technical Support",
    description:
      "Our support team provides assistance before, during, and after project completion to help clients operate and maintain their PA systems efficiently.",
    icon: "supportTraining",
  },
  {
    title: "Preventive Maintenance",
    description:
      "Regular system checks and maintenance support help reduce downtime, improve audio quality, and extend the lifespan of installed PA equipment.",
    icon: "maintenanceSettings",
  },
  {
    title: "Warranty Service",
    description:
      "We provide warranty support for eligible products and assist with troubleshooting, repair coordination, and replacement service when required.",
    icon: "warrantyBadge",
  },
  {
    title: "Customized Solutions",
    description:
      "From small offices to mosques, schools, factories, hospitals, and commercial buildings, we tailor each PA system solution to project needs and budget.",
    icon: "customizationSliders",
  },
  {
    title: "Project Experience",
    description:
      "Our team has experience supporting public address, paging, and audio communication projects across different industries and facility types.",
    icon: "projectBriefcase",
  },
];

const PA_BRANDS: Array<{
  title: string;
  category: string;
  description: string;
  badge: string;
  logoText: string;
  url: string;
}> = [
  {
    title: "Bosch",
    category: "Professional PA & Voice Evacuation Systems",
    description:
      "Bosch is a globally trusted manufacturer of public address, voice evacuation, conference, and professional audio systems. Bosch solutions are widely used in airports, hospitals, educational institutions, commercial buildings, and large infrastructure projects where reliability and safety are essential.",
    badge: "Global Brand",
    logoText: "BOSCH",
    url: "https://www.bosch.com/",
  },
  {
    title: "TOA",
    category: "Public Address & Paging Systems",
    description:
      "TOA is known for dependable public address, paging, amplifier, microphone, and speaker solutions. Its products are commonly used in schools, offices, factories, houses of worship, and commercial facilities.",
    badge: "Trusted Audio Brand",
    logoText: "TOA",
    url: "https://www.toa.eu/public-address-systems",
  },
  {
    title: "DSPPA",
    category: "IP Audio & PA Solutions",
    description:
      "DSPPA specializes in public address systems, IP audio solutions, conference systems, and background music systems. Their products support both small installations and large multi-zone communication networks.",
    badge: "IP Audio Expert",
    logoText: "DSPPA",
    url: "https://www.dsppatech.com/",
  },
];

const PA_APPLICATION_SOLUTIONS: Array<{
  title: string;
  bestFor: string;
  components: string[];
  description: string;
  icon: PaSolutionIconName;
}> = [
  {
    title: "Mosque PA System",
    bestFor: "Mosques, prayer halls, Islamic centers",
    components: ["Column Speakers", "Horn Speakers", "Mixer Amplifier", "Wired or Wireless Microphones"],
    description:
      "Designed for azan, khutbah, prayer announcements, and religious programs with clear voice coverage inside and outside the mosque. Proper speaker placement and amplifier configuration help improve speech clarity and reduce echo.",
    icon: "mosque",
  },
  {
    title: "School & College PA System",
    bestFor: "Schools, colleges, universities",
    components: ["Wall Speakers", "Ceiling Speakers", "Paging Microphone", "Multi-Zone Amplifier"],
    description:
      "Suitable for classroom announcements, assembly areas, emergency alerts, corridors, administrative offices, and campus-wide communication. Multi-zone paging allows announcements to specific buildings or departments.",
    icon: "education",
  },
  {
    title: "Office & Corporate PA System",
    bestFor: "Corporate offices, business centers, commercial offices",
    components: ["Ceiling Speakers", "Paging Console", "Mixer Amplifier", "Zone Controller"],
    description:
      "Provides staff paging, reception announcements, visitor communication, meeting room audio, and background music while maintaining a professional workplace environment.",
    icon: "office",
  },
  {
    title: "Factory & Industrial PA System",
    bestFor: "Factories, warehouses, industrial facilities",
    components: ["Horn Speakers", "High-Power Amplifier", "Paging Microphone", "Emergency Alert System"],
    description:
      "Built for noisy industrial environments where safety announcements, emergency alerts, shift notifications, and operational communication must be heard clearly across large areas.",
    icon: "factory",
  },
  {
    title: "Hospital PA System",
    bestFor: "Hospitals, clinics, healthcare facilities",
    components: ["Ceiling Speakers", "Call Stations", "Paging Console", "Multi-Zone Controller"],
    description:
      "Supports patient calling, staff paging, visitor announcements, emergency communication, and department-specific audio distribution throughout healthcare facilities.",
    icon: "hospital",
  },
  {
    title: "Shopping Mall & Commercial PA System",
    bestFor: "Shopping malls, retail stores, commercial buildings",
    components: ["Ceiling Speakers", "Wall Speakers", "Audio Mixer", "Background Music System"],
    description:
      "Ideal for customer announcements, promotional messages, emergency alerts, public information broadcasting, and background music in commercial environments.",
    icon: "mall",
  },
];

function PaSolutionIcon({ name }: { name: PaSolutionIconName }) {
  const iconClass = "h-6 w-6";
  const commonProps = {
    className: iconClass,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "microphone":
      return (
        <svg {...commonProps}>
          <path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v3a4 4 0 0 0 4 4Z" />
          <path d="M19 10a7 7 0 0 1-14 0" />
          <path d="M12 17v4" />
          <path d="M9 21h6" />
        </svg>
      );
    case "amplifier":
      return (
        <svg {...commonProps}>
          <path d="M4 7h16v10H4z" />
          <path d="M7 10h5" />
          <path d="M7 13h3" />
          <path d="M16.5 13.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      );
    case "distribution":
      return (
        <svg {...commonProps}>
          <path d="M12 6v5" />
          <path d="M7 18l5-7 5 7" />
          <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M5 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M19 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      );
    case "speaker":
      return (
        <svg {...commonProps}>
          <path d="M4 15h4l5 4V5L8 9H4v6Z" />
          <path d="M16 9.5a4 4 0 0 1 0 5" />
          <path d="M18.5 7a8 8 0 0 1 0 10" />
        </svg>
      );
    case "mosque":
      return (
        <svg {...commonProps}>
          <path d="M4 20h16" />
          <path d="M7 20v-8a5 5 0 0 1 10 0v8" />
          <path d="M9 12h6" />
          <path d="M12 7V3" />
          <path d="M11 4h3" />
          <path d="M5 20v-6" />
          <path d="M19 20v-6" />
        </svg>
      );
    case "education":
      return (
        <svg {...commonProps}>
          <path d="M3 9 12 5l9 4-9 4-9-4Z" />
          <path d="M7 11v5c2.8 2 7.2 2 10 0v-5" />
          <path d="M21 9v6" />
        </svg>
      );
    case "office":
      return (
        <svg {...commonProps}>
          <path d="M6 21V4h12v17" />
          <path d="M9 8h2" />
          <path d="M13 8h2" />
          <path d="M9 12h2" />
          <path d="M13 12h2" />
          <path d="M10 21v-5h4v5" />
        </svg>
      );
    case "factory":
      return (
        <svg {...commonProps}>
          <path d="M4 21V9l5 4V9l5 4V8h6v13H4Z" />
          <path d="M8 17h2" />
          <path d="M13 17h2" />
          <path d="M18 17h1" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...commonProps}>
          <path d="M5 21V5h14v16" />
          <path d="M9 21v-5h6v5" />
          <path d="M12 9v5" />
          <path d="M9.5 11.5h5" />
        </svg>
      );
    case "mall":
      return (
        <svg {...commonProps}>
          <path d="M6 8h12l-1 13H7L6 8Z" />
          <path d="M9 8a3 3 0 0 1 6 0" />
          <path d="M9 13h6" />
        </svg>
      );
    case "horn":
      return (
        <svg {...commonProps}>
          <path d="M4 14h3l7 4V6l-7 4H4v4Z" />
          <path d="M17 9.5a4 4 0 0 1 0 5" />
          <path d="M7 14l1 5" />
        </svg>
      );
    case "ceilingSpeaker":
      return (
        <svg {...commonProps}>
          <path d="M5 4h14" />
          <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
          <path d="M11 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
          <path d="M9 18h6" />
        </svg>
      );
    case "columnSpeaker":
      return (
        <svg {...commonProps}>
          <path d="M9 3h6v18H9z" />
          <path d="M12 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M12 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      );
    case "wallSpeaker":
      return (
        <svg {...commonProps}>
          <path d="M5 5h3v14H5z" />
          <path d="M8 8h7l4-3v14l-4-3H8" />
          <path d="M12 10h2" />
          <path d="M12 14h2" />
          <path d="M19 9.5a5 5 0 0 1 0 5" />
        </svg>
      );
    case "cabinetSpeaker":
      return (
        <svg {...commonProps}>
          <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M9 7h6" />
          <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M12 13h.01" />
          <path d="M9 19h6" />
        </svg>
      );
    case "siteSurvey":
      return (
        <svg {...commonProps}>
          <path d="M12 21s6-5.1 6-11a6 6 0 0 0-12 0c0 5.9 6 11 6 11Z" />
          <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M4 21h16" />
        </svg>
      );
    case "coverageMap":
      return (
        <svg {...commonProps}>
          <path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" />
          <path d="M9 4v14" />
          <path d="M15 6v14" />
          <path d="M12 11a3 3 0 0 1 3 3" />
          <path d="M12 8a6 6 0 0 1 6 6" />
        </svg>
      );
    case "blueprint":
      return (
        <svg {...commonProps}>
          <path d="M5 4h14v16H5z" />
          <path d="M8 8h8" />
          <path d="M8 12h4" />
          <path d="M14 12h2v4h-5v-2" />
          <path d="M8 16h1" />
        </svg>
      );
    case "audioEquipment":
      return (
        <svg {...commonProps}>
          <path d="M4 6h8v12H4z" />
          <path d="M15 5h5v14h-5z" />
          <path d="M8 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M17.5 9h.01" />
          <path d="M17.5 13h.01" />
          <path d="M17.5 17h.01" />
        </svg>
      );
    case "installationTools":
      return (
        <svg {...commonProps}>
          <path d="M14.5 5.5 18 2l4 4-3.5 3.5" />
          <path d="M2 22l7-7" />
          <path d="M7 17l-2-2 9-9 2 2-9 9Z" />
          <path d="M14 14l6 6" />
          <path d="M18 18l2-2" />
        </svg>
      );
    case "checklist":
      return (
        <svg {...commonProps}>
          <path d="M8 4h8l1 3H7l1-3Z" />
          <path d="M6 6h12v15H6z" />
          <path d="m9 12 1.5 1.5L14 10" />
          <path d="M9 17h6" />
        </svg>
      );
    case "supportTraining":
      return (
        <svg {...commonProps}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <path d="M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" />
          <path d="M20 13v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
          <path d="M9 19a3 3 0 0 0 6 0" />
          <path d="M12 7v4" />
          <path d="M10 9h4" />
        </svg>
      );
    case "verifiedShield":
      return (
        <svg {...commonProps}>
          <path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "maintenanceSettings":
      return (
        <svg {...commonProps}>
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-2 .1 1.7 1.7 0 0 0-.8 1.7v.2H11v-.2a1.7 1.7 0 0 0-.8-1.7 1.7 1.7 0 0 0-2-.1l-.2.1-2-3.4.1-.1A1.7 1.7 0 0 0 6.4 15 1.7 1.7 0 0 0 5 13.8h-.2v-3.6H5a1.7 1.7 0 0 0 1.4-1.2 1.7 1.7 0 0 0-.3-1.9L6 7l2-3.4.2.1a1.7 1.7 0 0 0 2-.1A1.7 1.7 0 0 0 11 1.9v-.2h3.9v.2a1.7 1.7 0 0 0 .8 1.7 1.7 1.7 0 0 0 2 .1l.2-.1 2 3.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.4 1.2h.2v3.6h-.2a1.7 1.7 0 0 0-1.5 1.2Z" />
        </svg>
      );
    case "warrantyBadge":
      return (
        <svg {...commonProps}>
          <path d="M12 3 14.2 5.2 17.3 5.7 17.8 8.8 20 11l-2.2 2.2-.5 3.1-3.1.5L12 19l-2.2-2.2-3.1-.5-.5-3.1L4 11l2.2-2.2.5-3.1 3.1-.5L12 3Z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      );
    case "customizationSliders":
      return (
        <svg {...commonProps}>
          <path d="M5 7h14" />
          <path d="M5 12h14" />
          <path d="M5 17h14" />
          <path d="M9 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M15 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M11 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      );
    case "projectBriefcase":
      return (
        <svg {...commonProps}>
          <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <path d="M4 7h16v12H4z" />
          <path d="M4 12h16" />
          <path d="M10 12v2h4v-2" />
        </svg>
      );
    case "callStation":
      return (
        <svg {...commonProps}>
          <path d="M5 5h14v10H5z" />
          <path d="M8 9h5" />
          <path d="M8 12h3" />
          <path d="M16 8v4" />
          <path d="M9 19h6" />
          <path d="M12 15v4" />
        </svg>
      );
    case "mixer":
      return (
        <svg {...commonProps}>
          <path d="M6 4v16" />
          <path d="M12 4v16" />
          <path d="M18 4v16" />
          <path d="M4.5 9h3" />
          <path d="M10.5 15h3" />
          <path d="M16.5 11h3" />
        </svg>
      );
    case "controlPanel":
      return (
        <svg {...commonProps}>
          <path d="M4 5h16v14H4z" />
          <path d="M8 10h3" />
          <path d="M8 14h3" />
          <path d="M15.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M15.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      );
  }
}

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "PA system price in Bangladesh with public address sound system, mosque, school, office and factory paging, BOQ, quotation and installation support.",
  alternates: { canonical: "https://sashabd.com/pa-system/" },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "PA system price in Bangladesh with public address sound system, mosque, school, office and factory paging, BOQ, quotation and installation support.",
    url: "https://sashabd.com/pa-system/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/pa-sound-system.webp"),
        width: 1200,
        height: 630,
        alt: "PA Sound System in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "PA system price in Bangladesh with public address sound system, mosque, school, office and factory paging, BOQ, quotation and installation support.",
    images: [socialImageUrl("/images/pa-sound-system.webp")],
  },
};

export default function PaSystemPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/pa-system/", label: "PA System", current: true },
        ]}
      />
      <section className="mobile-page-intro-card rounded-none border-0 bg-transparent px-0 py-0 shadow-none md:rounded-2xl md:border md:border-slate-200 md:bg-white md:px-[15px] md:py-8 md:shadow-sm">
        <h1 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 md:text-3xl">
          {PAGE_TITLE}
        </h1>
        <MobileIntroText
          teaser="Sasha Corporation supplies PA system solutions in Bangladesh for mosques, schools, offices and commercial buildings."
          expandedClassName="mt-4"
          desktopClassName="mt-4"
        >
          <div className="space-y-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            <p>
              Sasha Corporation is a trusted PA system supplier and reliable solution provider in Bangladesh, offering
              public address sound system solutions for mosques, schools, offices, factories, hospitals, shopping malls,
              and commercial buildings. Our PA system includes PA speakers, amplifiers, microphones, horn speakers,
              ceiling speakers, column speakers, and paging systems. PA system price in Bangladesh depends on brand,
              speaker quantity, coverage area, amplifier power, installation work, and warranty support.
            </p>
          </div>
        </MobileIntroText>
      </section>

      <PaSystemProducts items={PA_PAGE_ITEMS} brand={BRAND} />

      <section className="mt-[10px] rounded-2xl border border-slate-200 bg-white px-[15px] py-6 shadow-sm md:py-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
          PA System Price List in Bangladesh
        </h2>

        <div className="mt-6">
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            The cost of a PA system depends on the coverage area, speaker type, amplifier capacity, zoning
            requirements, installation complexity, and project-specific requirements. Small announcement systems can
            start from a few thousand taka, while large multi-zone solutions for mosques, schools, factories, and
            commercial buildings can cost significantly more.
          </p>
        </div>

        <div className="my-8 h-px bg-slate-200" />

        <div>
          <div className="text-2xl font-extrabold tracking-tight text-slate-950">Price Table</div>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-950">
                <tr>
                  <th className="w-[55%] px-4 py-3 font-extrabold">PA Product Name</th>
                  <th className="w-[45%] px-4 py-3 text-right font-extrabold">Current Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PA_PRICE_ROWS.map((item) => (
                  <tr key={item.slug} className="align-top">
                    <td className="break-words px-4 py-3 font-medium text-slate-900">
                      <Link
                        href={item.href}
                        className="transition hover:text-orange-600 hover:underline underline-offset-4"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="break-words px-4 py-3 text-right text-slate-800">{item.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pa-system-solutions mt-[10px] rounded-2xl border border-slate-200 bg-white px-[15px] py-6 shadow-sm md:py-8 lg:py-10">
        <div className="pa-system-solutions__intro max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">
            Public address planning and installation
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-3xl">
            PA System Solutions in Bangladesh
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Sasha Corporation provides complete PA system solutions for mosques, schools, offices, factories,
            hospitals, shopping malls, and commercial buildings across Bangladesh. Our solutions include system
            design, equipment selection, supply, installation, testing, commissioning, and after-sales support.
            Whether the requirement is a small paging system or a large multi-zone public address system, we help
            design the right solution based on coverage area, building layout, audio clarity, and operational needs.
          </p>
        </div>

        <div className="pa-system-solutions__definition mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
          <h3 className="text-xl font-extrabold tracking-tight text-slate-950 md:text-2xl">
            What is a PA System?
          </h3>
          <div className="mt-3 space-y-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            <p>
              A Public Address System, commonly known as a PA System, is an audio communication system used to
              amplify and distribute voice announcements, emergency messages, paging alerts, and background audio
              across a specific area or building. It is designed to help people hear important information clearly in
              indoor and outdoor environments.
            </p>
            <p>
              PA systems are commonly used in mosques, schools, offices, factories, hospitals, shopping malls,
              transportation terminals, commercial buildings, and public facilities where clear communication is
              important. A properly designed PA system improves communication, safety, and operational efficiency.
            </p>
          </div>
        </div>

        <div className="pa-system-solutions__workflow mt-10">
          <div className="max-w-4xl">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-950 md:text-2xl">
              How Does a PA System Work?
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              A PA system follows a simple audio path from source to speaker. The right equipment and planning keep
              the message clear across the selected zone or full facility.
            </p>
          </div>

          <div className="pa-system-solutions__step-grid mt-6 grid gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
            {PA_SOLUTION_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="pa-system-solutions__step-card rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <PaSolutionIcon name={step.icon} />
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    Step {index + 1}
                  </div>
                </div>
                <div className="mt-5 text-base font-extrabold text-slate-950">
                  {index + 1}. {step.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pa-system-solutions__applications mt-10">
          <div className="max-w-4xl">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-950 md:text-2xl">
              Common Applications of PA Systems
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Different environments need different speaker placement, zone control, and operating workflows. These
              are some of the most common PA system use cases we support.
            </p>
          </div>

          <div className="pa-system-solutions__application-grid mt-6 grid gap-[10px] md:grid-cols-2 xl:grid-cols-3">
            {PA_APPLICATIONS.map((application) => (
              <div
                key={application.title}
                className="pa-system-solutions__application-card rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <PaSolutionIcon name={application.icon} />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-slate-950">{application.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{application.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pa-system-solutions__cta mt-10 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div className="max-w-3xl">
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              Need a Customized PA System Solution?
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Every project has different coverage, speaker placement, and communication requirements. Sasha
              Corporation can help you plan the right PA system based on your space, budget, and operational needs.
            </p>
          </div>
          <div className="mt-5 shrink-0 md:mt-0">
            <Link
              href="/contact/"
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-orange-700 md:w-auto"
            >
              Request a Quotation -&gt;<span className="sr-only"> for a custom PA system solution</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="pa-components mt-[10px] rounded-2xl border border-slate-200 bg-white px-[15px] py-6 shadow-sm md:py-8 lg:py-10">
        <div className="pa-components__header max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">
            PA system equipment guide
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-3xl">
            Main Components of a PA System
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            A PA system consists of multiple components that work together to deliver clear announcements, paging,
            emergency messages, and background audio. The exact configuration depends on the coverage area,
            application, speaker requirements, zoning needs, and operational objectives of the facility.
          </p>
        </div>

        <div className="pa-components__grid mt-7 grid items-stretch gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
          {PA_COMPONENTS.map((component) => (
            <article
              key={component.title}
              className="pa-components__card flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] md:p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <PaSolutionIcon name={component.icon} />
              </div>
              <div className="mt-5 text-base font-extrabold leading-snug text-slate-950">{component.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{component.description}</p>
            </article>
          ))}
        </div>

        <div className="pa-components__cta mt-10 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div className="max-w-3xl">
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              Need Help Selecting the Right PA System Components?
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Every project requires a different combination of speakers, amplifiers, microphones, and control
              equipment. Our team can recommend the most suitable PA system configuration based on your application,
              coverage area, and operational requirements.
            </p>
          </div>
          <div className="mt-5 shrink-0 md:mt-0">
            <Link
              href="/contact/"
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-orange-700 md:w-auto"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="pa-application-solutions mt-[10px] rounded-2xl border border-slate-200 bg-white px-[15px] py-6 shadow-sm md:py-8 lg:py-10">
        <div className="pa-application-solutions__header max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">
            Application-based PA planning
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-3xl">
            PA System Solutions by Application
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Different environments require different speaker types, amplifier configurations, paging capabilities, and
            coverage requirements. Sasha Corporation provides customized PA system solutions for mosques, educational
            institutions, offices, factories, hospitals, shopping malls, and commercial facilities across Bangladesh.
            Our solutions are designed based on building layout, coverage area, communication needs, and operational
            requirements.
          </p>
        </div>

        <div className="pa-application-solutions__grid mt-7 grid items-stretch gap-[10px] md:grid-cols-2 xl:grid-cols-3">
          {PA_APPLICATION_SOLUTIONS.map((solution) => (
            <article
              key={solution.title}
              className="pa-application-solutions__card flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] md:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <PaSolutionIcon name={solution.icon} />
                </div>
                <div>
                  <div className="text-lg font-extrabold leading-snug text-slate-950">{solution.title}</div>
                  <p className="mt-1 text-sm font-semibold text-slate-500">Best for: {solution.bestFor}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-extrabold text-slate-950">Recommended Components</p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                  {solution.components.map((component) => (
                    <li key={component} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-600">{solution.description}</p>
            </article>
          ))}
        </div>

      </section>

      <section className="mt-[10px] rounded-2xl bg-white px-[15px] py-6 md:py-8">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-3xl">
          PA Sound System Types in Bangladesh
        </h2>
        <div className="mt-3 space-y-5 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
          <p>
            Every building needs a different <strong>PA system</strong> plan based on room layout, coverage area, noise
            level, speaker distance, and zone control. A small shop or office can run with a simple paging setup, while
            mosques, schools, factories, hospitals, shopping malls, and commercial buildings often need planned
            amplifier power, speaker placement, cabling, and multiple audio zones.
          </p>
          <p>
            Before choosing a <strong>public address sound system</strong>, it is useful to compare analog, digital, IP
            based, portable, single-zone, and multi-zone PA solutions. The right system keeps announcements, Azan,
            class paging, background music, emergency messages, and daily communication clear and reliable.
          </p>
        </div>

        <div className="mt-6 grid gap-[10px] md:grid-cols-2">
          {[
            {
              t: "Analog PA System",
              d: "Analog PA systems use wired microphones, mixer amplifiers, and speaker lines for dependable voice coverage. They are practical for mosques, classrooms, offices, shops, and regular announcement work.",
            },
            {
              t: "Digital PA System",
              d: "Digital PA systems provide cleaner control over inputs, volume, tone, and signal processing. They fit corporate offices, conference spaces, commercial buildings, and modern announcement setups.",
            },
            {
              t: "IP Based PA System",
              d: "IP based PA systems send paging and audio through network infrastructure. They are useful for campuses, hospitals, large factories, office complexes, and sites with several buildings.",
            },
            {
              t: "Portable Wireless PA System",
              d: "Portable wireless PA systems are easy to move, quick to install, and suitable for temporary sound needs. They work well for events, training, meetings, classrooms, and outdoor programs.",
            },
            {
              t: "Single Zone PA System",
              d: "Single zone PA systems play one announcement or audio source across one selected area. They are a simple choice for small offices, prayer rooms, classrooms, shops, and compact halls.",
            },
            {
              t: "Multi Zone PA System",
              d: "Multi zone PA systems let you control paging and volume separately for floors, rooms, departments, or outdoor areas. They suit schools, hospitals, factories, and large commercial projects.",
            },
          ].map((item) => (
            <article
              key={item.t}
              className="rounded-xl border border-slate-200 bg-[#fbfbfb] p-5 md:p-6"
            >
              <div className="text-lg font-medium text-slate-950">{item.t}</div>
              <p className="mt-2 text-sm leading-7 text-slate-700 md:text-[15px]">{item.d}</p>
            </article>
          ))}
        </div>

        <section className="pa-speaker-types mt-[10px]" aria-labelledby="types-of-pa-speakers-heading">
          <div className="max-w-5xl">
            <h3
              id="types-of-pa-speakers-heading"
              className="text-xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-2xl"
            >
              Types of PA Speakers
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Different PA speaker types are designed for different environments and communication requirements.
              Choosing the right speaker helps improve voice clarity, coverage, and overall system performance. The
              most suitable speaker depends on factors such as indoor or outdoor use, mounting location, audience size,
              and announcement requirements.
            </p>
          </div>

          <div className="pa-speaker-types__grid mt-6 grid items-stretch gap-[10px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PA_SPEAKER_TYPES.map((speaker) => (
              <article
                key={speaker.title}
                className="pa-speaker-types__card flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <PaSolutionIcon name={speaker.icon} />
                </div>
                <div className="mt-5 text-lg font-extrabold leading-snug text-slate-950">{speaker.title}</div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{speaker.description}</p>
              </article>
            ))}
          </div>

        </section>
      </section>

      <section
        className="pa-installation-process mt-[10px] rounded-3xl bg-white px-[15px] py-7 md:py-10"
        aria-labelledby="pa-installation-process-heading"
      >
        <div className="max-w-5xl">
          <h2
            id="pa-installation-process-heading"
            className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
          >
            Our PA System Design and Installation Process
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            A properly designed PA system requires more than selecting speakers and amplifiers. At Sasha Corporation, we
            follow a structured process to ensure clear voice coverage, reliable performance, efficient operation, and
            long-term system stability. Every project is planned based on building layout, coverage requirements,
            communication objectives, and operational needs.
          </p>
        </div>

        <ol className="pa-installation-process__grid mt-9 grid gap-[10px] md:grid-cols-2 xl:grid-cols-4">
          {PA_INSTALLATION_PROCESS.map((processStep, index) => (
            <li key={processStep.title} className="pa-installation-process__item relative">
              {index !== 3 && index !== 6 ? (
                <span
                  className="pointer-events-none absolute left-full top-14 z-0 hidden h-px w-4 bg-gradient-to-r from-orange-200 to-slate-200 xl:block"
                  aria-hidden="true"
                />
              ) : null}
              <article className="group relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] md:p-6">
                <span
                  className="pointer-events-none absolute right-4 top-4 text-3xl font-extrabold leading-none text-slate-100 transition-colors group-hover:text-orange-50"
                  aria-hidden="true"
                >
                  {String(processStep.step).padStart(2, "0")}
                </span>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <PaSolutionIcon name={processStep.icon} />
                </div>
                <div className="relative mt-5 text-lg font-extrabold leading-snug text-slate-950">
                  <span className="sr-only">Step {processStep.step}: </span>
                  {processStep.title}
                </div>
                <p className="relative mt-3 text-sm leading-6 text-slate-600">{processStep.description}</p>
                <div className="mt-auto pt-5">
                  <span className="block h-1 w-10 rounded-full bg-orange-500/80" aria-hidden="true" />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="pa-installation-process__cta mt-9 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div className="max-w-3xl">
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              Ready to Build Your PA System Project?
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Whether you need a PA system for a mosque, school, office, factory, hospital, or commercial facility, our
              team can design and install a solution tailored to your communication requirements.
            </p>
          </div>
          <div className="mt-5 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;<span className="sr-only"> for PA system installation planning</span>
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
            >
              Free Consultation<span className="sr-only"> for PA system installation</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="pa-solution-choice mt-[10px] rounded-3xl bg-white px-[15px] py-7 md:py-10"
        aria-labelledby="pa-solution-choice-heading"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id="pa-solution-choice-heading"
            className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
          >
            Why Choose Sasha Corporation for PA System Solutions?
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Choosing the right PA system provider is just as important as selecting the right equipment. Sasha
            Corporation focuses on delivering reliable, scalable, and professionally designed PA system solutions that
            provide clear communication, long-term performance, and dependable technical support for projects of all
            sizes.
          </p>
        </div>

        <div className="pa-solution-choice__grid mt-8 grid items-stretch gap-[10px] md:grid-cols-2 xl:grid-cols-4">
          {PA_WHY_CHOOSE_FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="pa-solution-choice__card group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] md:p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100">
                <PaSolutionIcon name={feature.icon} />
              </div>
              <div className="mt-5 text-lg font-extrabold leading-snug text-slate-950">{feature.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              <div className="mt-auto pt-5">
                <span className="block h-1 w-10 rounded-full bg-orange-500/80" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="pa-solution-choice__cta mt-9 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div className="max-w-3xl">
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              Need a Reliable PA System Partner?
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Whether you need a new PA system installation, system upgrade, or technical consultation, Sasha
              Corporation can help design and implement the right solution for your communication requirements.
            </p>
          </div>
          <div className="mt-5 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;<span className="sr-only"> with Sasha Corporation PA team</span>
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
            >
              Free Consultation<span className="sr-only"> with Sasha Corporation PA team</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="pa-brand-showcase mt-[10px] rounded-3xl bg-white px-[15px] py-7 md:py-10"
        aria-labelledby="pa-brand-showcase-heading"
      >
        <div className="text-center">
          <h2
            id="pa-brand-showcase-heading"
            className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
          >
            Brands We Work With
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Sasha Corporation is an authorized distributor of Bosch, TOA, and DSPPA audio solutions in Bangladesh. We
            supply genuine public address (PA) systems, conference systems, voice evacuation systems, amplifiers,
            speakers, and IP audio solutions with professional consultation, installation support, and after-sales
            service. Depending on project requirements, coverage area, and budget, our team helps clients select the most
            suitable communication and paging solution for offices, educational institutions, hospitals, factories,
            commercial buildings, and government organizations.
          </p>
        </div>

        <div className="pa-brand-showcase__grid mt-8 grid items-stretch gap-[10px] md:grid-cols-2 lg:grid-cols-3">
          {PA_BRANDS.map((brand) => (
            <article
              key={brand.title}
              className="pa-brand-showcase__card group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="pa-brand-showcase__logo flex min-h-16 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center"
                  aria-label={`${brand.title} brand logo space`}
                >
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-extrabold tracking-[0.12em] text-slate-950 transition hover:text-orange-600"
                    aria-label={`Visit ${brand.title} official website`}
                  >
                    {brand.logoText}
                  </a>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <PaSolutionIcon name="verifiedShield" />
                </div>
              </div>
              <div className="mt-5">
                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold text-orange-700">
                  {brand.badge}
                </span>
              </div>
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-xl font-extrabold leading-snug text-slate-950 underline-offset-4 transition hover:text-orange-600 hover:underline"
              >
                {brand.title}
              </a>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{brand.category}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{brand.description}</p>
              <div className="mt-auto pt-5">
                <span className="block h-1 w-10 rounded-full bg-orange-500/80" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <article className="pa-brand-showcase__trust mt-9 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] md:flex md:items-start md:gap-5 md:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <PaSolutionIcon name="verifiedShield" />
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              Trusted Brands for Reliable Communication
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              The performance of a PA system depends not only on proper design and installation but also on the quality
              of the equipment used. Sasha Corporation works with recognized audio and communication brands to help
              ensure dependable operation, clear voice reproduction, and long-term reliability.
            </p>
          </div>
        </article>

        <div className="pa-brand-showcase__cta mt-9 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div className="max-w-3xl">
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              Looking for the Right PA System Brand?
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
              Our team can help you select the most suitable PA system equipment based on your project requirements,
              coverage area, communication objectives, and budget.
            </p>
          </div>
          <div className="mt-5 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;<span className="sr-only"> for PA system brand selection</span>
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white px-[15px] py-7 md:py-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Benefits of a PA Sound System
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            The right PA system improves communication, reduces confusion, and helps teams run daily operations smoothlyâ€”from
            announcements to emergency paging.
          </p>
        </div>

        <div className="mt-8 grid gap-[10px] md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Clear communication at scale",
              d: "Deliver announcements across rooms, floors, or a campus with consistent volume and clarityâ€”no more relaying messages person-to-person.",
            },
            {
              t: "Better safety and faster response",
              d: "Priority paging helps broadcast urgent instructions quickly during incidents, evacuations, or operational alerts.",
            },
            {
              t: "Zoning reduces disruption",
              d: "Call only the areas you need (reception, corridors, factory lines, wards) instead of disturbing everyone across the building.",
            },
            {
              t: "More efficient daily operations",
              d: "Routine messagesâ€”shift calls, queue guidance, closing noticesâ€”become predictable and easy for staff to manage.",
            },
            {
              t: "Professional customer experience",
              d: "In offices, hospitals, and retail, controlled paging and optional BGM can improve visitor guidance and overall environment.",
            },
            {
              t: "Scalable for future expansion",
              d: "A planned design can add zones, speakers, or buildings later without rebuilding the entire systemâ€”saving time and cost.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-3xl border bg-slate-50 p-6 shadow-sm"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-base font-extrabold text-slate-900">{x.t}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p>
              <div className="mt-4 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact/"
            className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get a recommendation
          </Link>
          <Link
            href="/contact/"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
          >
            Contact Us<span className="sr-only"> for PA sound system benefits</span>
          </Link>
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl border bg-white px-[15px] py-7 md:py-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Quick answers about PA sound system price, 100V line, zoning, speakers and installation support in
              Bangladesh.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 md:mt-0">
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;<span className="sr-only"> from PA system FAQ</span>
            </Link>
            <Link
              href="/contact/"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              Contact Us<span className="sr-only"> from PA system FAQ</span>
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <FaqAccordion accent={BRAND.maroon} items={FAQS} />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </section>
    </div>
  );
}
