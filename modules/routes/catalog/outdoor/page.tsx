import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileDisclosure from "@/components/common/MobileDisclosure";
import MobileIntroText from "@/components/common/MobileIntroText";
import OutdoorFilterSection from "@/components/products/OutdoorFilterSection";
import { projects } from "@/app/projects/projectData";
import { getLedDisplayTablePrice, ledAccessoriesCatalog, outdoorCatalog } from "@/lib/productsCatalog";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import responsiveStyles from "../display-responsive.module.css";

export const metadata: Metadata = {
  title: { absolute: "Outdoor LED Display Price in Bangladesh | Advertising Screen" },
  description: "Outdoor LED display price in Bangladesh - waterproof P2.5-P10 setup for billboards, shop signage, roof, roadside screens, clear visibility, and high brightness.",
  alternates: { canonical: absoluteUrl("/led-display/outdoor/") },
  openGraph: {
    title: "Outdoor LED Display Price in Bangladesh | Advertising Screen",
    description: "Outdoor LED display price in Bangladesh - waterproof P2.5-P10 setup for billboards, shop signage, roof, roadside screens, clear visibility, and high brightness.",
    url: absoluteUrl("/led-display/outdoor/"),
    type: "website",
    images: [{ url: socialImageUrl("/images/outdoor/P5-Outdoor-LED-Display.webp"), width: 1200, height: 630, alt: "Outdoor LED Display Price in Bangladesh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor LED Display Price in Bangladesh",
    description: "Waterproof outdoor LED display screen price and module options for signage and billboards in Bangladesh.",
    images: [socialImageUrl("/images/outdoor/P5-Outdoor-LED-Display.webp")],
  },
};

type IconName = "screen" | "price" | "pitch" | "check" | "features" | "applications" | "components" | "specs" | "compare" | "weather" | "consult" | "projects" | "maintenance" | "explore" | "shield" | "process" | "location" | "faq";

const categoryLinks = [
  { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
  { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
  { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
];

const pitchCards = [
  { t: "Close roadside branding (P2.5-P4)", d: "Best for shop frontage, market roads, and urban traffic where viewers stay relatively near the screen.", bullets: ["Typical viewing: 3m to 10m", "Sharper text/logo visibility", "Good for detailed promotional content"] },
  { t: "Mid-range city visibility (P5-P6.67)", d: "Balanced option for commercial facades and medium-distance public communication in busy city zones.", bullets: ["Typical viewing: 8m to 25m", "Balanced clarity vs cost", "Useful for mixed text + motion graphics"] },
  { t: "Long-distance highways (P8-P10)", d: "Suitable for highways, elevated roads, and large-format outdoor LED billboard communication.", bullets: ["Typical viewing: 20m+", "Strong readability from distance", "Efficient for large ad surfaces"] },
  { t: "Selection checklist before purchase", d: "For an accurate module price and model recommendation, confirm the project inputs first.", bullets: ["Screen size (W x H)", "Installation height and traffic speed", "Ambient light and operating hours"] },
];

const selectionCards = [
  { t: "Weatherproof build", d: "Plan the enclosure and service path for local rain, dust, heat, and humidity.", bullets: ["Proper cabinet sealing + drainage route", "Outdoor-rated connectors & cable glands", "Ventilation / thermal path planning", "Back cover & service door access"] },
  { t: "Power & protection", d: "Protect the display and its control system from unstable outdoor power conditions.", bullets: ["Earthing/grounding", "Surge protection device (SPD)", "MCB/DB box", "Cable gauge by load"] },
  { t: "Signal & control", d: "Match signal transport and controller capacity to the distance, resolution, and content workflow.", bullets: ["CAT6/fiber (distance dependent)", "Proper sender/processor selection", "Ground loop noise prevention", "Stable content playback system"] },
  { t: "Commissioning", d: "Verify every display zone and operating condition before final handover.", bullets: ["Module checking", "Mapping", "Brightness tuning", "Burn-in + final inspection"] },
];

const keyFeatures = [
  { t: "High Brightness Visibility", d: "Clear and readable content under direct sunlight for roadside and open-air viewing." },
  { t: "Weather-Resistant Build", d: "Outdoor-ready cabinet design with better resistance to rain, dust, and humidity conditions." },
  { t: "Long-Distance Readability", d: "Optimized pixel pitch and screen scaling for larger audience zones and far-view impact." },
  { t: "Stable Power & Protection", d: "Reliable operation with proper grounding, surge protection, and balanced power distribution." },
];

const outdoorBenefits = [
  { t: "Sunlight readable high brightness", d: "Content stays readable in direct daylight, so promotions and safety messages remain visible during peak sun hours." },
  { t: "IP65 / IP66 weather protection", d: "Sealed outdoor cabinets help protect modules from rain, dust, and humidity in Bangladesh conditions." },
  { t: "Long-distance visibility", d: "Proper pixel-pitch planning keeps text and visuals readable from roads and open public zones." },
  { t: "24/7 operation support", d: "Long-hour duty-cycle planning and stable power distribution reduce avoidable interruptions." },
  { t: "Energy-efficient design", d: "Brightness control and modern driver systems reduce unnecessary power draw during daily use." },
  { t: "Remote content management", d: "Scheduled campaigns, notices, and updates can be managed with less on-site dependency." },
  { t: "Power protection and voltage stability", d: "Grounding, surge protection, and correctly sized distribution improve safety and stability." },
  { t: "Serviceable modular maintenance", d: "Modular parts, clear wiring, and practical access planning help reduce repair downtime." },
  { t: "Advertisement and announcement in one screen", d: "The same display can run commercial advertising and public information content." },
];

const applications = [
  { t: "Roadside advertising LED billboard", d: "Designed for passing traffic visibility with long-distance readability and strong daytime impact." },
  { t: "Rooftop LED display", d: "Used for high-elevation branding where wide-area reach and weather-resistant performance are required." },
  { t: "Shopping mall outdoor signage", d: "Supports promotions, campaign updates, and directional information in high-footfall exterior zones." },
  { t: "Corporate branding display", d: "Delivers consistent brand communication on building facades and office-front outdoor locations." },
  { t: "Petrol pump digital signage", d: "Displays fuel offers, safety notices, and service information in open-air forecourt conditions." },
  { t: "Hotel / restaurant front signage", d: "Highlights offers, menus, and event announcements to street-facing customers." },
  { t: "Government notice display", d: "Publishes public messages, awareness alerts, and civic updates at community-facing points." },
  { t: "Event & stadium perimeter display", d: "Supports sponsor rotation, live event messaging, and audience communication around venues." },
];

const components = [
  { t: "Outdoor LED Modules", d: "Weather-ready LED modules form the visible screen surface and determine pitch, resolution, and brightness." },
  { t: "Cabinet & Structure", d: "Aligned cabinets and an engineered support frame protect the display and transfer wind and structural loads safely." },
  { t: "Power & Protection", d: "Power supplies, distribution, grounding, MCB/DB, and SPD planning support reliable outdoor operation." },
  { t: "Controller & Signal", d: "Sending and receiving systems map the screen, process input, and distribute stable content to every cabinet." },
];

const specificationRows: readonly (readonly [string, string, string])[] = [
  ["Pixel pitch", "P2.5 to P4", "P5 to P10"],
  ["Typical viewing", "Close to medium distance", "Medium to long distance"],
  ["Content detail", "Sharper text and detailed branding", "Large text, video, and bold advertising"],
  ["Brightness planning", "Daylight-readable output", "High-output roadside visibility"],
  ["Protection planning", "Outdoor cabinet sealing and drainage", "Weather, wind, heat, grounding, and SPD"],
  ["Common use", "Shopfront and urban signage", "Billboard, rooftop, highway, and public screen"],
];

const comparisonRows: readonly (readonly [string, string, string])[] = [
  ["Brightness", "High brightness for daylight and open-sky readability.", "Comfort-tuned brightness for enclosed room viewing."],
  ["Waterproof rating", "Typically IP65 / IP66 weather-ready structure.", "Usually non-waterproof, built for controlled interiors."],
  ["Viewing distance", "Designed for medium to long-distance audience visibility.", "Optimized for close to medium viewing distance."],
  ["Pixel pitch range", "Commonly P2.5 to P10.", "Commonly fine pitch such as P1.25 to P3."],
  ["Installation area", "Roadside, rooftop, facade, stadium, and public zones.", "Conference room, showroom, studio, and control room."],
  ["Cabinet protection", "Sealed, ventilated, and planned for outdoor service access.", "Lighter indoor cabinet with controlled-environment access."],
  ["Use case", "Advertising, public information, and long-distance branding.", "Presentations, close-view visuals, and room communication."],
  ["Price range", "Varies with pitch, brightness, structure, power, and weather protection.", "Varies with fine pitch, resolution, processor, and mounting."],
];

const durabilityCards = [
  { t: "Rain protection", d: "Sealed cabinet joints, drainage paths, and protected connectors help prevent water ingress during monsoon exposure." },
  { t: "Dust protection", d: "Proper enclosure design and controlled ventilation reduce dust intrusion that can affect display performance." },
  { t: "Heat resistance", d: "Airflow planning and suitable components support stable operation under high daytime heat." },
  { t: "Rust-resistant structure", d: "Protective finishing and suitable frame materials help maintain structural safety in humid environments." },
  { t: "Stable outdoor performance", d: "Balanced power, weather-sealed integration, and periodic checks support consistent operation." },
  { t: "Wind load considerations", d: "Mounting design must account for wind pressure, anchor strength, and structural load transfer." },
  { t: "24/7 reliability", d: "Continuous-duty planning with grounding, surge protection, and preventive maintenance supports long-hour use." },
];

const maintenanceCards = [
  { t: "Prevent brightness drop", d: "Use day/night brightness scheduling instead of running at maximum brightness continuously.", bullets: ["Auto brightness sensor setup", "Daypart brightness profile", "Seasonal calibration checks"] },
  { t: "Protect against rain, dust, and surge", d: "Water ingress and electrical surges need routine prevention, not only module checks.", bullets: ["Seal check before monsoon", "Regular SPD/earthing inspection", "Connector and cable-gland review"] },
  { t: "Plan preventive maintenance", d: "A fixed service cycle reduces emergency repair cost and helps keep the screen stable.", bullets: ["Monthly visual inspection", "Quarterly cabinet health check", "Spare module + PSU backup stock"] },
];

const processCards = [
  { t: "Site survey", d: "Inspect location, viewing angle, sunlight, wind factors, power, and service access." },
  { t: "Screen size planning", d: "Set display dimensions from viewing distance, readability target, and available space." },
  { t: "Structure design", d: "Plan safe support, load distribution, vibration control, and outdoor durability." },
  { t: "Electrical planning", d: "Design power routing, grounding, surge protection, and distribution panels." },
  { t: "LED cabinet installation", d: "Install and align cabinets for seamless output and practical service access." },
  { t: "Configuration & calibration", d: "Configure mapping, signal flow, brightness, and color for uniform display quality." },
  { t: "Testing & handover", d: "Complete operating tests, safety checks, acceptance, and operator guidance." },
  { t: "After-sales support", d: "Provide maintenance guidance, troubleshooting, and ongoing service response." },
];

const cityCards = [
  { t: "Outdoor LED Display in Dhaka", d: "High-traffic corridors and retail zones need high-brightness readability and efficient campaign scheduling." },
  { t: "Outdoor LED Display in Chattogram", d: "Port-area humidity makes sealed cabinets, structure strength, and weather-conscious installation important." },
  { t: "Outdoor LED Billboard in Sylhet", d: "Rain-ready construction and long-distance viewing support arterial-road and commercial communication." },
  { t: "Outdoor Advertising Screen in Khulna", d: "Market-front and roadside screens benefit from efficient power use and dependable content updates." },
  { t: "Outdoor LED Display in Rajshahi", d: "Balanced brightness and typography-first content improve visibility across varied daylight conditions." },
  { t: "Outdoor LED Display in Barishal", d: "Moisture protection and routine maintenance planning support year-round outdoor performance." },
  { t: "Outdoor LED Display in Rangpur", d: "Distance-based pitch and robust structure alignment suit highway-facing commercial points." },
  { t: "Outdoor LED Display in Mymensingh", d: "Maintainable, scalable screens support mixed branding and announcements near growth corridors." },
];

function SectionIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    screen: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    price: <><path d="M4 7h16M6 3h12l2 4-2 14H6L4 7Z" /><path d="M9 12h6M9 16h4" /></>,
    pitch: <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.4-4.4M11 8v3l2 2" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    features: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    applications: <><path d="M4 19h16M6 16V8l6-3 6 3v8" /><path d="M9 11h6" /></>,
    components: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /><path d="M10 7h4M7 10v4M17 10v4M10 17h4" /></>,
    specs: <><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" /></>,
    compare: <><rect x="3" y="6" width="7" height="10" rx="1" /><rect x="14" y="6" width="7" height="10" rx="1" /><path d="M10 11h4M6 19h12" /></>,
    weather: <><path d="M12 3 6 9v4a6 6 0 0 0 12 0V9z" /><path d="m9.5 13.5 1.5 1.5 3.5-3.5" /></>,
    consult: <><path d="M5 12h14M12 5v14" /><circle cx="12" cy="12" r="8" /></>,
    projects: <><path d="M4 6h16v12H4z" /><path d="m7 15 3-3 2 2 3-4 2 3" /></>,
    maintenance: <><path d="m14.5 6.5 3 3-7.5 7.5H7v-3zM13 8l3 3" /><path d="M5 20h14" /></>,
    explore: <><path d="M4 12h16M12 4v16" /><circle cx="12" cy="12" r="8" /></>,
    shield: <><path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6z" /><path d="m9 12 2 2 4-4" /></>,
    process: <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /><path d="M7 12h3M14 12h3" /></>,
    location: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    faq: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.2" /><circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Section({ title, subtitle, icon, children, id, tone = "white" }: { title: string; subtitle?: string; icon: IconName; children: React.ReactNode; id?: string; tone?: "white" | "blue" }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className={tone === "blue" ? "mt-4 scroll-mt-24 rounded-2xl border border-[#cbdcf7] bg-[linear-gradient(110deg,#eef5ff_0%,#f7faff_52%,#edf4ff_100%)] px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6" : "mt-4 scroll-mt-24 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"}>
      <h2 id={id ? `${id}-heading` : undefined} className="flex items-start gap-2.5 text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:items-center lg:text-[22px]">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cfe0ff] bg-[#edf4ff] text-[#1458e5]" aria-hidden="true"><SectionIcon name={icon} /></span>
        <span className="min-w-0">{title}</span>
      </h2>
      {subtitle ? <MobileIntroText className="mt-2" teaser={subtitle} teaserClassName="w-full !text-left leading-6" expandedClassName="text-sm leading-7 text-slate-600" desktopClassName="md:text-slate-600 md:leading-7 md:[&>*]:!leading-7" singleDom><p className="text-slate-600 leading-7">{subtitle}</p></MobileIntroText> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CardGrid({ items, columns = "lg:grid-cols-4" }: { items: { t: string; d: string; bullets?: string[] }[]; columns?: string }) {
  return <div className={`-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 ${columns}`}>{items.map((item) => <article key={item.t} className="w-[89%] shrink-0 snap-start rounded-xl border border-[#dbe5f2] bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#b9d1fb] hover:shadow-md md:w-auto"><h3 className="text-[16px] font-extrabold leading-5 text-[#071936]">{item.t}</h3><p className="mt-2 !text-left text-[13px] leading-6 text-slate-600">{item.d}</p>{item.bullets ? <ul className="mt-3 space-y-2">{item.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2 !text-left text-[12px] leading-5 text-slate-700"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1458e5]" />{bullet}</li>)}</ul> : null}</article>)}</div>;
}

function ComparisonGrid({ rows, firstHeader, secondHeader }: { rows: readonly (readonly [string, string, string])[]; firstHeader: string; secondHeader: string }) {
  return <div className="space-y-3 md:grid md:grid-cols-3 md:gap-0 md:space-y-0 md:overflow-hidden md:rounded-xl md:border md:border-[#dbe5f2]"><div className="hidden border-b border-r border-[#dbe5f2] bg-[#edf4ff] p-4 text-sm font-bold text-[#071936] md:block">Parameter</div><div className="hidden border-b border-r border-[#dbe5f2] bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">{firstHeader}</div><div className="hidden border-b border-[#dbe5f2] bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">{secondHeader}</div>{rows.map(([topic, first, second]) => <article key={topic} className="overflow-hidden rounded-xl border border-[#dbe5f2] bg-white shadow-sm md:contents md:border-0 md:shadow-none"><div className="border-b border-[#dbe5f2] bg-[#edf4ff] px-4 py-3 text-center text-[15px] font-extrabold text-[#071936] md:border-r md:p-4 md:text-left md:text-sm md:font-normal md:text-slate-700">{topic}</div><div className="grid grid-cols-2 md:contents"><div className="border-r border-[#dbe5f2] px-4 py-3 md:border-b md:p-4"><div className="mb-1 text-[10px] font-extrabold uppercase text-[#1458e5] md:hidden">{firstHeader}</div><p className="!text-left text-[12px] leading-5 text-slate-700 md:text-sm">{first}</p></div><div className="px-4 py-3 md:border-b md:p-4"><div className="mb-1 text-[10px] font-extrabold uppercase text-[#1458e5] md:hidden">{secondHeader}</div><p className="!text-left text-[12px] leading-5 text-slate-700 md:text-sm">{second}</p></div></div></article>)}</div>;
}

const heroFeatures = [
  ["Daylight Visibility", "High-brightness output"],
  ["Weather Protection", "Rain & dust planning"],
  ["Safe Installation", "Structure, power & SPD"],
  ["Local Support", "Calibration & service"],
];

function OutdoorHero() {
  return <section className="led-display-hero-shell relative left-1/2 right-1/2 isolate -mx-[50vw] -mt-2 min-h-[430px] w-screen overflow-hidden bg-[#f7f9fc] sm:min-h-[420px] lg:min-h-[clamp(20rem,25vw,23rem)]" aria-labelledby="outdoor-led-hero-heading">
    <Image src="/images/led hero/outdoor-led-hero.webp" alt="Outdoor LED billboard with weather-ready cabinets and display modules" fill priority quality={95} sizes="100vw" className="object-cover object-[70%_center] md:object-center" />
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:hidden" aria-hidden="true" />
    <div className="led-display-hero-frame relative mx-auto flex min-h-[430px] w-full max-w-[clamp(80rem,90vw,108rem)] flex-col px-5 py-7 sm:min-h-[420px] sm:px-8 lg:min-h-[clamp(20rem,25vw,23rem)] lg:px-10 lg:py-[clamp(1.5rem,2vw,2rem)]">
      <div className="led-display-hero-content max-w-[19rem] text-left sm:max-w-[34rem] lg:max-w-[39%] lg:translate-y-1"><p className="!text-left text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ef4a00] sm:text-[11px]">Weather-ready visual solutions</p><h1 id="outdoor-led-hero-heading" className="led-display-hero-title mt-2 text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">Outdoor LED Display<span className="block">Price in Bangladesh 2026</span></h1><p className="led-display-hero-description mt-3 max-w-[38rem] !text-left text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">Compare waterproof outdoor LED screens for billboards, rooftops, shopfronts, highways and public spaces—with professional planning, installation and support.</p>
        <div className="led-display-hero-actions mt-4 flex flex-col gap-2.5 min-[430px]:flex-row sm:mt-5 lg:grid lg:max-w-[23rem] lg:grid-cols-2 xl:flex xl:max-w-none"><Link href="/contact/?project=outdoor-led-display" className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"><SectionIcon name="price" />Get Free BOQ</Link><a href="#outdoor-led-products" className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#071936] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"><SectionIcon name="screen" />Browse Outdoor Displays</a></div>
      </div>
      <ul className="led-display-hero-features mt-auto grid max-w-[39rem] grid-cols-2 gap-x-3 gap-y-2.5 pb-9 pt-5 sm:gap-x-5 sm:pb-10 lg:w-[56%] lg:max-w-none lg:grid-cols-4 lg:gap-x-7 lg:pb-0 lg:pt-3">{heroFeatures.map(([title, description]) => <li key={title} className="flex min-w-0 items-center gap-2 rounded-md border border-white/60 bg-white/75 px-2 py-1.5 text-left text-[#071936] shadow-sm backdrop-blur-[2px] md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6z" /><path d="m9 12 2 2 4-4" /></svg></span><span className="min-w-0"><strong className="block text-[9px] font-black leading-3 sm:whitespace-nowrap lg:text-[10px]">{title}</strong><span className="mt-0.5 block text-[7.5px] font-bold leading-3 text-slate-600 sm:text-[8px] md:whitespace-nowrap">{description}</span></span></li>)}</ul>
    </div>
  </section>;
}

function OutdoorTrustStrip() {
  const benefits = [["Site Survey", "Location & visibility"], ["Pitch Guidance", "Right clarity for distance"], ["Safe Installation", "Structure, power & SPD"], ["After-Sales Support", "Training & maintenance"]];
  return <section aria-label="Outdoor LED display service benefits"><div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.035)] sm:px-5 xl:min-h-[76px] xl:px-7 xl:py-2"><div className="grid items-center gap-4 lg:grid-cols-[minmax(210px,0.8fr)_minmax(0,2.6fr)] xl:min-h-[58px] xl:gap-8"><div><p className="!text-left text-[11px] font-extrabold leading-4 text-[#071936]">Complete Outdoor LED Solution</p><p className="mt-1 !text-left text-[10px] font-bold leading-4 text-slate-600">Planning • Supply • Installation • Support</p></div><div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-4 sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">{benefits.map(([title, description]) => <div key={title} className="flex items-start gap-2.5"><span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600"><svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 10 3 3 7-7" /></svg></span><span><strong className="block !text-left text-[10px] font-extrabold leading-4 text-[#071936] sm:text-[11px]">{title}</strong><span className="hidden !text-left text-[9px] font-medium leading-4 text-slate-500 sm:block">{description}</span></span></div>)}</div></div></div></section>;
}

function getPitchLabel(product: (typeof outdoorCatalog)[number]) {
  const value = product.keySpecs.find((item) => item.k.toLowerCase().includes("pixel"))?.v ?? product.pitchLabel ?? "Outdoor";
  return value.trim().split(" ")[0] || value;
}

function parsePitchNumber(label: string) {
  const value = Number(label.toLowerCase().replace(/^p/, "").replace(/mm/g, "").trim());
  return Number.isFinite(value) ? value : null;
}

export default function OutdoorProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const stickyAccessories = ["structure-mounting-accessories", "led-display-power-connector-cable"].map((slug) => ledAccessoriesCatalog.find((product) => product.slug === slug)).filter((product): product is NonNullable<typeof product> => Boolean(product));
  const priceRows = outdoorCatalog.map((product) => { const pitchLabel = getPitchLabel(product); return { product, pitchLabel, pitchNumber: parsePitchNumber(pitchLabel), price: getLedDisplayTablePrice(product.slug) ?? "Request quote" }; }).sort((a, b) => (a.pitchNumber ?? 999) - (b.pitchNumber ?? 999) || a.product.title.localeCompare(b.product.title));
  const outdoorProjects = projects.filter((project) => project.category === "led-display" && project.image && !project.isTemplate);

  return <div className={`${responsiveStyles.page} outdoor-led-page mx-auto w-full max-w-[clamp(80rem,90vw,108rem)] px-4 pb-10 pt-0 [box-shadow:0_0_0_100vmax_#f4f7fb] [clip-path:inset(0_-100vmax)] md:px-6`} data-outdoor-led-route-kind="hub">
    <OutdoorHero />
    <OutdoorTrustStrip />

    <section id="outdoor-led-products" className="mt-4 scroll-mt-24 py-5" aria-label="Outdoor LED products"><Suspense fallback={<div className="min-h-96 rounded-2xl border border-slate-200 bg-white" />}><OutdoorFilterSection all={outdoorCatalog} stickyCards={stickyAccessories} /></Suspense></section>

    <Section id="outdoor-led-overview" title="Outdoor LED Display Solutions for Professional Spaces" icon="screen" subtitle="Choose an outdoor LED display by viewing distance, sunlight exposure, pixel pitch, weather protection, structure, power, and content needs.">
      <p className="!text-left text-sm leading-7 text-slate-600"><strong>Outdoor LED displays</strong> are engineered for daylight visibility, weather resistance, and long-distance readability across highways, city roads, markets, rooftops, shopfronts, stadiums, and public spaces in Bangladesh. A properly planned system combines the right pixel pitch and brightness with weather-sealed cabinets, a suitable controller, safe structure, balanced power distribution, earthing, surge protection, calibration, and service access.</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600"><Link href="/led-display/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">LED display price hub</Link><Link href="/led-display/waterproof-outdoor-led-display/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">Waterproof outdoor guide</Link><Link href="/services-support/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">Installation & support</Link><Link href="/projects/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">Completed projects</Link></div>
    </Section>

    <Section id="outdoor-led-price" title="Outdoor LED Display Price Per Square Feet in Bangladesh" icon="price" subtitle="Indicative pricing by pixel pitch for quick comparison. For BOQ-based pricing, share your required screen size and installation location.">
      <MobileDisclosure label="Tap To Expand Price List" buttonClassName="cursor-pointer rounded-xl border border-[#dbe5f2] bg-[#edf4ff] px-4 py-3 text-center text-[12px] font-extrabold text-[#071936]" contentClassName="mt-3 space-y-3 md:mt-0 md:space-y-0 md:overflow-x-auto md:rounded-xl md:border md:border-[#dbe5f2]" desktopDisplayClassName="md:block"><div><div className="hidden min-w-[780px] grid-cols-12 bg-[#edf4ff] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#071936] md:grid"><div className="col-span-7">Outdoor LED Model</div><div className="col-span-3 text-center">Pixel Pitch</div><div className="col-span-2 text-right">Approx. Price (Per Sq.Ft)</div></div>{priceRows.map(({ product, pitchLabel, pitchNumber, price }) => <article key={product.slug} className="overflow-hidden rounded-xl border border-[#dbe5f2] bg-white shadow-sm md:grid md:min-w-[780px] md:grid-cols-12 md:items-center md:rounded-none md:border-0 md:border-b md:px-4 md:py-3 md:shadow-none"><div className="px-4 py-3 md:col-span-7 md:px-0 md:py-0"><Link href={`/led-display/outdoor/${product.slug}/`} className="text-[15px] font-extrabold text-slate-900 hover:underline">{product.title}</Link><p className="mt-1 !text-left text-[12px] leading-5 text-slate-500">{product.subtitle}</p></div><div className="grid grid-cols-2 border-t border-slate-200 md:contents"><div className="border-r border-slate-200 px-4 py-3 text-center md:col-span-3 md:border-0 md:px-0"><div className="text-[10px] font-extrabold uppercase text-[#1458e5] md:hidden">Pixel Pitch</div><div className="mt-1 text-[13px] font-bold md:mt-0 md:text-sm md:font-normal">{pitchNumber != null ? `${pitchNumber} mm` : pitchLabel}</div></div><div className="px-4 py-3 text-right md:col-span-2 md:px-0"><div className="text-[10px] font-extrabold uppercase text-[#1458e5] md:hidden">Approx. Price</div><div className="mt-1 text-[13px] font-bold md:mt-0 md:text-sm">{price}</div></div></div></article>)}</div></MobileDisclosure>
    </Section>

    <Section title="Outdoor LED Pixel Pitch Guide for Bangladesh (P2.5 to P10)" icon="pitch" subtitle="Select pixel pitch and viewing distance together for clearer content, controlled budget, and practical long-term performance."><CardGrid items={pitchCards} columns="lg:grid-cols-4" /></Section>
    <Section title="How to Choose the Right Outdoor LED Display" icon="check" subtitle="Use this weather, power, signal, and commissioning checklist before finalizing the screen, structure, and BOQ."><CardGrid items={selectionCards} columns="lg:grid-cols-4" /></Section>
    <Section title="Key Features of Outdoor LED Display" icon="features" subtitle="Outdoor LED display solutions are designed for daylight visibility, weather resistance, and stable long-distance performance."><CardGrid items={keyFeatures} columns="lg:grid-cols-4" /></Section>
    <Section title="Why Choose Outdoor LED Display" icon="shield" subtitle="Outdoor displays solve daylight visibility, weather exposure, long-distance communication, and scalable content-management needs."><CardGrid items={outdoorBenefits} columns="lg:grid-cols-3" /></Section>
    <Section title="Applications of Outdoor LED Displays" icon="applications" subtitle="Outdoor LED modules are used where long-distance visibility and weather durability matter."><CardGrid items={applications} columns="lg:grid-cols-4" /></Section>
    <Section title="Main Components of an Outdoor LED Display" icon="components" subtitle="These hardware elements work together to deliver protected, stable, and serviceable outdoor visuals."><CardGrid items={components} columns="lg:grid-cols-4" /></Section>
    <Section title="Outdoor LED Display Technical Specifications Explained" icon="specs" subtitle="Compare pitch, viewing distance, content detail, brightness, weather protection, and application before selecting a model."><ComparisonGrid rows={specificationRows} firstHeader="Close / Mid-Range" secondHeader="Mid / Long-Range" /></Section>
    <Section title="Outdoor vs Indoor LED Display Comparison" icon="compare" subtitle="A side-by-side guide to help buyers choose the right build for the environment, visibility target, and budget."><ComparisonGrid rows={comparisonRows} firstHeader="Outdoor LED" secondHeader="Indoor LED" /></Section>
    <Section title="Outdoor LED Screen Waterproof & Durability" icon="weather" subtitle="Outdoor reliability depends on weather sealing, thermal control, power protection, and structural stability."><CardGrid items={durabilityCards} columns="lg:grid-cols-3" /></Section>

    <Section title="Outdoor LED Display Project Consultation in Bangladesh" icon="consult" subtitle="Share your location, viewing distance, target screen size, and content source—then we recommend pitch, controller, structure, power protection, and BOQ.">
      <div className="rounded-xl border border-[#dbe5f2] bg-[linear-gradient(105deg,#ffffff_0%,#f7fbff_58%,#eef5ff_100%)] p-4 md:p-5"><ul className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">{["Location + environment: rooftop / roadside / market / highway", "Viewing distance (near & far) + audience angle", "Target screen size (ft) or wall size (W x H)", "Content source: live HDMI / scheduled playback / remote control", "Power: single/three phase + backup (IPS/Generator)", "Weatherproof structure + service access (front/rear)", "Safety: earthing + surge protection (SPD) planning"].map((item) => <li key={item} className="flex items-start gap-2 rounded-xl border border-[#dbe5f2] bg-white p-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1458e5]" /><span className="leading-6">{item}</span></li>)}</ul><div className="mt-5 flex flex-wrap gap-2.5"><Link href="/contact/?project=outdoor-led-display" className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#1458e5] px-4 text-xs font-extrabold text-white hover:bg-[#0f49c6]">Get Outdoor BOQ →</Link><a href={wa} target="_blank" rel="nofollow noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-xs font-extrabold text-[#071936] hover:border-emerald-300 hover:text-emerald-700">WhatsApp for Site Info</a></div></div>
    </Section>

    <Section title="Recent Outdoor LED Projects" icon="projects" subtitle="A verified outdoor LED billboard installation completed by Sasha Corporation.">
      <div className="grid gap-3 md:grid-cols-3">{outdoorProjects.map((project) => <article key={project.id} className="group overflow-hidden rounded-xl border border-[#dbe5f2] bg-white shadow-sm md:col-span-2 lg:col-span-1"><div className="relative aspect-[16/9] overflow-hidden bg-slate-100"><Image src={project.image!} alt={project.imageAlt ?? project.title} fill sizes="(max-width:767px) 92vw, 32vw" className={project.imageClassName ?? "object-cover object-center"} /></div><div className="p-4"><span className="inline-flex rounded-full bg-[#edf4ff] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#1458e5]">{project.badge}</span><h3 className="mt-2 text-[15px] font-extrabold leading-5 text-[#071936]">{project.title}</h3><p className="mt-1 !text-left text-[12px] leading-5 text-slate-600">{project.organization} • {project.location}</p>{project.caseStudyHref ? <Link href={project.caseStudyHref} className="mt-3 inline-flex text-xs font-extrabold text-[#1458e5] hover:underline">View Case Study →</Link> : null}</div></article>)}</div>
    </Section>

    <Section title="Outdoor LED Display Maintenance and Performance Tips" icon="maintenance" subtitle="Correct power quality, ventilation, weather checks, and periodic service help an outdoor display stay stable for years."><CardGrid items={maintenanceCards} columns="lg:grid-cols-3" /></Section>
    <Section title="Explore High-Performance LED Display in Bangladesh" icon="explore" tone="blue" subtitle="From indoor video walls to outdoor branding and rental event screens—explore the right category for your project."><div className="grid gap-3 md:grid-cols-3">{categoryLinks.map((item) => <Link key={item.t} href={item.href} className="group rounded-xl border border-[#dbe5f2] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b9d1fb] hover:shadow-md"><h3 className="text-[17px] font-extrabold text-[#071936]">{item.t}</h3><p className="mt-2 !text-left text-[13px] leading-6 text-slate-600">{item.d}</p><span className="mt-3 inline-flex text-xs font-extrabold text-[#1458e5]">Explore →</span></Link>)}</div></Section>
    <Section title="Why Choose Sasha Corporation for Outdoor LED Display in Bangladesh" icon="shield" tone="blue" subtitle="Outdoor LED planning, structure, power protection, installation, calibration, and after-sales support are delivered as one coordinated project solution."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ t: "Project-Based Design", d: "Screen size, pitch, controller, structure, and access are selected from the actual site requirement." }, { t: "Safe Power & Structure", d: "Load planning, grounding, SPD, cabling, and structural support are included in the engineering scope." }, { t: "Calibration & Handover", d: "Mapping, brightness, color, signal testing, operator guidance, and final handover are completed on site." }, { t: "After-Sales Support", d: "Maintenance planning, spare-part guidance, and technical service continue after installation." }].map((item, index) => <article key={item.t} className="rounded-xl border border-[#dce6f3] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1458e5]"><SectionIcon name="check" /></span><span className="text-[10px] font-black text-[#9ab4dc]">0{index + 1}</span></div><h3 className="mt-3 text-[15px] font-extrabold text-[#071936]">{item.t}</h3><p className="mt-1.5 !text-left text-[12px] leading-6 text-slate-600">{item.d}</p></article>)}</div></Section>
    <Section title="Outdoor LED Display Installation Process" icon="process" subtitle="A clear end-to-end workflow reduces installation risk and supports stable long-term performance."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{processCards.map((item, index) => <article key={item.t} className="rounded-xl border border-[#dce6f3] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1458e5]"><SectionIcon name="process" /></span><span className="rounded-full bg-[#1458e5] px-2 py-1 text-[8px] font-extrabold text-white">STEP {String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-3 text-[13px] font-extrabold text-[#071936]">{item.t}</h3><p className="mt-1.5 !text-left text-[11px] leading-5 text-slate-600">{item.d}</p></article>)}</div></Section>
    <Section title="City Wise Outdoor LED Display Deployment" icon="location" subtitle="Deployment planning varies by traffic, weather exposure, visibility, and communication goals across Bangladesh."><CardGrid items={cityCards} columns="lg:grid-cols-4" /></Section>

    <Section id="outdoor-led-faq" title="FAQs About Outdoor LED Display in Bangladesh" icon="faq" subtitle="Practical answers to common questions before ordering an outdoor LED screen or billboard project.">
      <FaqAccordion accent="#1458e5" density="compact" columns={2} items={[
        { q: "Which pixel pitch is best for outdoor LED billboards?", a: "Pitch depends on viewing distance. Close roadside viewing needs a smaller pitch, while highway billboards can use a larger pitch for cost-effective coverage." },
        { q: "Do outdoor LED screens need surge protection (SPD)?", a: "Yes. Outdoor installations are exposed to lightning and unstable power. Proper grounding and SPD help protect modules, power supplies, and controllers." },
        { q: "How do you make an outdoor LED screen weatherproof?", a: "Weatherproofing includes cabinet sealing, drainage planning, outdoor-rated connectors, correct cable glands, ventilation, and safe service access." },
        { q: "What affects outdoor LED display price per sq ft?", a: "Price depends on pitch, brightness, cabinet quality, controller, structure height, power and safety components, and installation scope." },
        { q: "Do you provide end-to-end outdoor installation and support?", a: "Yes. Project scope can include survey, structure planning, wiring, grounding, installation, mapping, calibration, handover, and maintenance support." },
        { q: "What brightness level is ideal for outdoor LED display in Bangladesh?", a: "Brightness depends on sunlight exposure and location. Roadside and highway sites need stronger daylight visibility, while shaded sites can use balanced calibrated output." },
      ]} />
    </Section>

    <section className="mt-4 overflow-hidden rounded-2xl border border-[#d9e4f2] bg-white shadow-[0_10px_30px_rgba(7,25,54,0.10)]" aria-labelledby="outdoor-led-final-cta"><div className="relative overflow-hidden bg-[#06183b]"><div className="absolute inset-y-0 right-0 hidden w-1/3 md:block" aria-hidden="true"><Image src="/images/led hero/outdoor-led-hero.webp" alt="" fill sizes="32vw" className="object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#06183b_0%,rgba(6,24,59,0.45)_28%,rgba(6,24,59,0.05)_72%,transparent_100%)]" /></div><div className="relative z-10 grid gap-5 px-5 py-5 sm:px-7 md:grid-cols-12 md:items-center md:gap-6 lg:px-8"><div className="md:col-span-7"><div className="flex items-center gap-4"><span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1458e5] text-white"><SectionIcon name="shield" /></span><div><h2 id="outdoor-led-final-cta" className="text-[21px] font-black leading-tight text-white sm:text-[24px]">Planning an Outdoor LED Display Project?</h2><p className="mt-1 !text-left text-[10px] leading-4 text-blue-100 sm:text-[11px]">Get the right pitch, accurate pricing, weather-ready structure, and professional installation support.</p></div></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Site Survey", "Custom BOQ", "Safe Installation", "After-Sales Support"].map((item) => <div key={item} className="flex items-center gap-2"><span className="text-blue-300">✓</span><span className="text-[9px] font-extrabold text-white sm:text-[10px]">{item}</span></div>)}</div></div><div className="grid gap-2.5 md:col-span-2"><Link href="/contact/?project=outdoor-led-display" className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#1458e5] px-4 text-[11px] font-extrabold text-white">Request Free BOQ</Link><a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-[11px] font-extrabold text-[#071936]">Talk to an Engineer</a></div><div className="hidden md:col-span-3 md:block" /></div></div><div className="grid grid-cols-2 gap-y-4 px-4 py-4 sm:grid-cols-3 lg:grid-cols-6">{["P2.5-P10 Options", "Custom Screen Size", "Weather Protection", "Safe Power Design", "Calibration", "Technical Support"].map((item, index) => <div key={item} className={`flex items-center gap-2.5 px-2 sm:px-3 ${index ? "lg:border-l lg:border-slate-200" : ""}`}><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#1458e5]">✓</span><span className="text-[10px] font-extrabold text-[#071936] sm:text-[11px]">{item}</span></div>)}</div></section>
  </div>;
}
