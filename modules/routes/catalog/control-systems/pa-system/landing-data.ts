import { getPaSystemBySlug, paSystemCatalog, type PaSystemItem } from "./catalog";
import type { PaIconName } from "./PaIcon";

export const PA_HERO = "/images/home_hero/pa-system-home-hero.webp";
// Preserve the existing landing-page assortment; the excluded model still has its detail route and price-table row.
export const paPageItems = paSystemCatalog.filter(item => item.slug !== "bosch-lc9-uc06-6w-ceiling-speaker-metal-grill");
export const paCategories = ["All products", "PA packages", "Amplifiers & mixers", "Microphones", "Speakers", "Network & DSP"] as const;
export type PaCategory = typeof paCategories[number];
export function paCategory(item: PaSystemItem): PaCategory {
  if (/dante|digital_matrix|ip_paging/.test(item.kind)) return "Network & DSP";
  if (/mic|wireless_handheld|wireless_lapel|delegate/.test(item.kind)) return "Microphones";
  if (/portable|classroom|analog|rack_package|conference_discussion|ccs_900|wireless_conference/.test(item.kind)) return "PA packages";
  if (/speaker/.test(item.kind)) return "Speakers";
  return "Amplifiers & mixers";
}
export function paBrand(item: PaSystemItem) { return /^(Bosch|TOA|Ahuja)\b/i.exec(item.title)?.[1] ?? "Other / project-based"; }
export function paFeatures(item: PaSystemItem) { return (item.quickFeatures?.length ? item.quickFeatures : [...item.tags, item.subtitle]).slice(0, 3); }
export const paPriceRows = [
  "toa-wa-z110sd-70w-portable-speaker-amplifier", "ahuja-cmd-7200-delegate-unit-microphone",
  "ahuja-cma-5400-50w-central-mixer-amplifier", "ahuja-cma-7400-50w-digital-conference-amplifier",
  "toa-wt-5810-wm-5225-uhf-wireless-microphone", "wireless-lapel-headset-microphone-set",
  "bosch-lb2-uc30-30w-cabinet-loudspeaker", "6w-ceiling-speaker-bgm-paging",
  "bosch-lc9-uc06-6w-ceiling-speaker-metal-grill", "bosch-lc2-pc30g6-8-30w-ceiling-loudspeaker",
  "60w-column-speaker-mosque-hall", "toa-tz-105-10w-column-speaker", "50w-outdoor-horn-speaker-siren-announcement",
].map(getPaSystemBySlug).filter((item): item is PaSystemItem => Boolean(item));

export const applications: { title: string; text: string; icon: PaIconName; components: string }[] = [
  { title: "Mosques & Prayer Halls", text: "Plan azan, khutbah and speech coverage around the hall layout and outdoor listening areas.", icon: "mosque", components: "Column speakers · Mixer amplifier · Microphones" },
  { title: "Schools & Campuses", text: "Connect classrooms, corridors and assembly areas with practical zone-wise announcements.", icon: "school", components: "Wall speakers · Paging mic · Zone control" },
  { title: "Offices & Corporate Spaces", text: "Keep reception paging, staff announcements and background music organized by area.", icon: "building", components: "Ceiling speakers · Paging console · Amplifier" },
  { title: "Factories & Warehouses", text: "Review ambient noise, mounting locations and coverage before choosing the announcement system.", icon: "factory", components: "Horn speakers · Amplification · Paging mic" },
  { title: "Hospitals & Clinics", text: "Plan reception calls, staff paging and department-specific announcements around daily workflows.", icon: "health", components: "Ceiling speakers · Call stations · Zoning" },
  { title: "Retail & Commercial Buildings", text: "Combine customer announcements and background music across shops, floors and shared spaces.", icon: "shop", components: "Ceiling / wall speakers · Mixer · Zone control" },
];
export const systemTypes = [
  { title: "Analog / 100V Line", label: "Building-wide paging", text: "A practical starting point for multiple speakers and distributed zones. Match speaker taps, amplifier capacity and cable runs during design.", points: ["Schools, offices and commercial buildings", "Wired distribution and local controls"] },
  { title: "IP / Network Audio", label: "Connected sites & zones", text: "Route audio over a compatible network with the appropriate endpoints, software and controls. Confirm infrastructure and device compatibility.", points: ["Multi-building or centrally managed sites", "Network planning and endpoint selection"] },
  { title: "Portable & Room PA", label: "Flexible, local sound", text: "Choose a compact package around audience size, microphone needs, available power and how often the equipment moves.", points: ["Training, classrooms and small events", "Portable speakers and microphone options"] },
];
export const speakerGuide = [
  { title: "Ceiling", slug: "6w-ceiling-speaker-bgm-paging", text: "Indoor BGM and paging", note: "Check ceiling depth, spacing and speaker taps." },
  { title: "Wall / Cabinet", slug: "bosch-lb2-uc30-30w-cabinet-loudspeaker", text: "Rooms and corridors", note: "Review coverage direction and mounting locations." },
  { title: "Column", slug: "toa-tz-105-10w-column-speaker", text: "Prayer halls and speech", note: "Assess room acoustics and listening distance." },
  { title: "Horn", slug: "50w-outdoor-horn-speaker-siren-announcement", text: "Open or noisy areas", note: "Confirm the exact model’s environmental rating." },
];
export const signalSteps: { title: string; text: string; icon: PaIconName }[] = [
  { title: "Audio Source", text: "Microphone, paging console or media player", icon: "mic" },
  { title: "Mix & Process", text: "Input selection, priority and signal routing", icon: "settings" },
  { title: "Amplify & Zone", text: "Amplifier capacity and area-wise distribution", icon: "amp" },
  { title: "Speaker Coverage", text: "Sound delivered to the intended listening areas", icon: "speaker" },
];
export const processSteps = [
  { title: "Survey & Requirements", text: "Review the site, listening areas, background noise, sources and cable routes." },
  { title: "Design & BOQ", text: "Plan speaker placement, zones, amplifier loading and the equipment list." },
  { title: "Install & Configure", text: "Fit equipment, organize cabling and configure the agreed system controls." },
  { title: "Test & Handover", text: "Check coverage and paging, explain operation and agree the support scope." },
];
export const supportItems: { title: string; text: string; icon: PaIconName }[] = [
  { title: "Project-Based Planning", text: "Equipment selection and BOQ assistance around your actual site requirements.", icon: "plan" },
  { title: "Installation & Configuration", text: "Speaker positioning, rack wiring and system setup within the agreed scope.", icon: "settings" },
  { title: "Handover & After-Sales", text: "Operation guidance, maintenance advice and support for eligible warranty claims.", icon: "headset" },
];
export const faqs = [
  { q: "What affects PA system price in Bangladesh?", a: "The equipment brand, speaker quantity, coverage area, amplifier capacity, zones, cable runs and installation scope all affect the quotation. The catalog prices are indicative; send your site details for a project-specific BOQ." },
  { q: "Should I choose a 100V line or an IP PA system?", a: "The right approach depends on your building, existing infrastructure, number of zones and operating requirements. We can review a wired 100V line solution, a network-based system or a room-level setup against your site needs." },
  { q: "Can paging and background music work together?", a: "They can be planned together using compatible equipment and suitable input, priority and zone controls. Confirm the required announcement workflow and which areas need independent music or volume control." },
  { q: "Which speaker type suits my site?", a: "Ceiling and wall speakers are common starting points for indoor spaces; column speakers can suit speech-focused halls; horn speakers are considered for open or noisy areas. Final selection requires a coverage review and the exact model specifications." },
  { q: "Do you provide mosque PA systems for azan and khutbah?", a: "Yes. Share the prayer hall dimensions, indoor and outdoor listening areas, existing equipment and microphone requirements. Speaker placement and room acoustics need to be considered together." },
  { q: "What should I send for a PA system BOQ?", a: "Send the site location, floor plan or approximate dimensions, room and floor count, required announcement zones, audio sources, existing equipment and installation timeline. These details help define the equipment and installation scope." },
  { q: "Do you offer installation and after-sales support?", a: "Installation, cabling guidance, configuration, testing and handover can be included in the project scope. Confirm product warranty, maintenance arrangements, training and after-sales inclusions in your written quotation." },
  { q: "Can a PA system connect to a fire alarm or emergency system?", a: "Integration is project- and equipment-dependent. Do not assume an ordinary PA system is a compliant voice-alarm system. Have a qualified project team confirm compatibility, applicable requirements and the approved design before specifying emergency functions." },
];
