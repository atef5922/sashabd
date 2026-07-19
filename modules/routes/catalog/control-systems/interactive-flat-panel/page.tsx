import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import {
  getInteractiveFlatPanelBrandLabel,
  getInteractiveFlatPanelBullets,
  getInteractiveFlatPanelChips,
  interactiveFlatPanelCatalog,
} from "./catalog";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export const metadata: Metadata = {
  title: "Interactive Flat Panel Price in Bangladesh",
  description:
 "Interactive flat panel (IFP) in Bangladesh for smart classrooms and meeting rooms-BOQ support, model selection, and nationwide installation.",
  alternates: { canonical: "/interactive-flat-panel/" },
  openGraph: {
    title: "Interactive Flat Panel in Bangladesh | Smart Classroom and Meeting Room",
    description:
 "Interactive flat panel price and selection guidance in Bangladesh-screen size planning, OPS PC options, installation and after-sales support.",
    url: "/interactive-flat-panel",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/Interactive%20flat%20panel/Interactive-flat-panal.webp"),
        width: 1200,
        height: 630,
        alt: "Interactive Flat Panel in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Flat Panel Price in Bangladesh",
    description:
 "Interactive flat panel (IFP) in Bangladesh-smart classroom and meeting room display with BOQ, installation and support.",
    images: [socialImageUrl("/images/Interactive%20flat%20panel/Interactive-flat-panal.webp")],
  },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "What affects interactive flat panel price in Bangladesh?",
    a: "Price varies by screen size, brand, Android performance, touch specification, OPS PC configuration (if required), mounting type (wall mount or trolley) and installation scope. Quantity and project location also impact quotation.",
  },
  {
    q: "Which size should I choose for a classroom?",
 a: "A practical choice depends on room depth and seating distance. Many classrooms select 75 - 86 inch panels, while smaller rooms may use 65 inch and larger halls may require 96 inch or above.",
  },
  {
    q: "Is Android-only enough or do I need an OPS PC?",
    a: "Android covers whiteboard, basic apps and casting for many users. OPS PC is useful for a full Windows workflow, Office/Teams requirements, and heavier content handling. We recommend based on use-case.",
  },
  {
    q: "Do you provide installation and handover support?",
    a: "Yes. We support mounting and cabling guidance, commissioning checks, and basic training so teachers or staff can operate the panel confidently.",
  },
  {
    q: "Can an interactive flat panel be used in meeting rooms?",
    a: "Yes. IFPs are commonly used for presentations, annotation on documents, brainstorming sessions and hybrid meeting workflows when paired with the right accessories.",
  },
  {
    q: "Which accessories are commonly needed with an interactive flat panel?",
    a: "Common accessories include a wall mount or floor trolley, OPS PC (if Windows workflow is needed), HDMI/USB cabling, wireless screen sharing tools, camera, speakerphone, and basic audio integration depending on classroom or meeting-room use.",
  },
];

const sizeGuides = [
  {
    title: '65" - Compact rooms',
    desc: "Great for principal rooms, small meetings and trainings where space is limited but touch interaction is required.",
  },
  {
    title: '75"-86" - Standard classroom size',
    desc: "A common pick for schools, colleges and coaching centers because it stays readable for typical classroom depth.",
  },
  {
    title: '96"+ - Large venue impact',
    desc: "Best for big training halls and premium boardrooms where the audience sits farther and screen presence matters.",
  },
];

const priceRows = [
  { size: '65"', price: "\u09F3 2,30,000 - \u09F3 2,80,000", use: "Small classrooms, meeting rooms, reception and compact collaboration spaces" },
  { size: '75"', price: "\u09F3 3,20,000 - \u09F3 3,80,000", use: "Standard classrooms and training rooms where back-row visibility matters" },
  { size: '86"', price: "\u09F3 4,20,000 - \u09F3 5,00,000", use: "Large classrooms, coaching centers and boardrooms with deeper seating" },
  { size: '98"', price: "\u09F3 6,80,000 - \u09F3 7,80,000", use: "Large training halls, lecture rooms and premium meeting spaces" },
  { size: '110"', price: "\u09F3 8,50,000 - \u09F3 9,50,000", use: "Auditoriums and large venues where screen impact is a priority" },
];

const viewingDistanceRows = [
  { distance: "Up to 2 m", size: '65"', room: "Small meeting rooms / compact classrooms" },
  { distance: "2 - 3 m", size: '65" - 75"', room: "Standard classrooms / team rooms" },
  { distance: "3 - 4 m", size: '75" - 86"', room: "Training rooms / larger classrooms" },
  { distance: "4 - 5 m", size: '86" - 98"', room: "Large classrooms / seminar rooms" },
  { distance: "5 m +", size: '98" - 110"', room: "Auditoriums / big halls" },
];

const boqChecklist = [
  "Interactive flat panel model and size (Android platform, touch capability, speaker output and glass type).",
  "Mounting option: wall mount or trolley stand, plus installation height planning.",
  "Cabling and connectivity: HDMI/USB/LAN, power protection and clean cable management.",
  "Optional OPS PC (Windows) when Office/Teams/Zoom workflow is required.",
  "Delivery, professional installation, commissioning, user handover training and warranty terms.",
];

const compareCards = [
  {
    title: "Smart classroom use-case (school, college, university)",
    desc: "Choose by seating depth, touch smoothness and classroom-friendly tools so lessons stay clear from the back row.",
    bullets: [
      'Choose size by seating depth: 65" for compact rooms, 75"-86" for typical classrooms, 96"+ for large halls.',
      "Prioritize smooth writing: low touch latency, accurate palm rejection and durable anti-glare glass for bright rooms.",
      "Confirm built-in tools: whiteboard, annotation, file playback (PDF/PPT/video), screen sharing and classroom-friendly shortcuts.",
      "Plan the full package: wall mount/trolley, cabling, optional OPS PC, basic audio and installation + handover training.",
    ],
  },
  {
    title: "Meeting room & boardroom use-case (corporate)",
    desc: "Focus on collaboration flow, switching speed and accessory compatibility for daily business use.",
    bullets: [
      "Decide Android-only vs Windows workflow: OPS PC matters if your team relies on Office, browser tools, Teams/Zoom and multiple windows.",
      "Check collaboration features: wireless casting, multi-device screen share, annotation over live documents and presenter switching.",
      "Look for professional visibility: 4K clarity, wide viewing angle, strong brightness and anti-reflection for office lighting.",
      "Confirm integration: camera/speakerphone compatibility, HDMI/USB ports, LAN/Wi-Fi stability and a clean cable-management plan.",
    ],
  },
  {
    title: "What changes the final quotation",
    desc: "Price changes with panel series, workflow setup and installation complexity, not only screen size.",
    bullets: [
      "Screen size and brand series (panel grade, glass, speaker output and chipset performance).",
      "Android version/performance and whether OPS PC (Windows) is included, plus RAM/SSD configuration if applicable.",
      "Mounting type (wall mount vs trolley), installation height, cable routing complexity and site floor level.",
      "Support scope: delivery, installation, commissioning, user training, warranty terms and after-sales response commitment.",
    ],
  },
  {
    title: "Key features most buyers request",
    desc: "Most buyers shortlist around visibility, writing feel, sharing speed and Windows readiness.",
    bullets: [
      "4K UHD panel with anti-glare glass for clear visibility under bright classroom/office lighting.",
      "Multi-touch writing for teaching and collaboration (smooth pen feel + reliable palm rejection).",
      "Wireless screen sharing from laptop/mobile, plus quick switching between presenters.",
      "Android built-in for simple operation, with OPS PC option when a full Windows workflow is required.",
    ],
  },
  {
    title: "Accessories & setup (often included in BOQ)",
    desc: "A practical quotation usually covers mounts, cabling and training so deployment stays smooth from day one.",
    bullets: [
      "Wall mount or floor trolley stand (based on room layout and mobility needs).",
      "OPS PC (optional), HDMI/USB extensions, LAN cable planning and power protection.",
      "Audio setup: use built-in speakers for small rooms, or integrate external audio for larger spaces.",
      "On-site commissioning + user handover training so teachers/teams can start using it confidently.",
    ],
  },
  {
    title: "How we reduce purchase risk for procurement",
    desc: "We align product, site and after-sales scope so procurement teams avoid model mismatch and missing items.",
    bullets: [
      "BOQ & tender support: specification mapping so your requirements match the model you receive.",
      "Site-ready installation: clean cabling, correct mounting height and verification at handover.",
      "Use-case based recommendation: sizing + workflow (Android/OPS) aligned with your daily usage, not just brochure specs.",
      "After-sales continuity: guidance for app setup, accessories and operational stability post-installation.",
    ],
  },
];

const useCaseRows = [
  { use: "Classrooms", size: '65" - 86"', focus: "4K clarity, smooth writing, whiteboard + annotation tools" },
  { use: "Meeting rooms", size: '65" - 75"', focus: "Wireless sharing, quick presenter switching, clean cabling" },
  { use: "Training centers", size: '75" - 98"', focus: "Wide visibility, multi-user touch, durable glass surface" },
  { use: "Auditoriums & halls", size: '98" - 110"', focus: "Long-distance readability, high impact, stable installation" },
  { use: "Hospitals & clinics", size: '65" - 86"', focus: "Clear visuals, quick annotation, easy daily operation" },
  { use: "Reception/showrooms", size: '65" - 75"', focus: "Bright display, simple content playback, easy casting" },
];

const opsCards = [
  {
    badge: "Basic",
    title: "OPS PC - Core i5 (Everyday)",
    subtitle: "For standard classrooms and training rooms with common Office + browser usage.",
    recommended: 'Recommended panel size: 65" - 75"',
    image: "/images/Interactive%20flat%20panel/OPS-PC-basic.webp",
    specs: ["Intel Core i5", "8GB RAM", "256GB SSD", "Windows 11 Pro"],
  },
  {
    badge: "Standard",
    title: "OPS PC - Core i5 (Smooth Multitask)",
    subtitle: "For smart classrooms and training setups that multitask apps and content during sessions.",
    recommended: 'Recommended panel size: 75" - 86"',
    image: "/images/Interactive%20flat%20panel/OPS-PC-standard.webp",
    specs: ["Intel Core i5", "16GB RAM", "512GB SSD", "Windows 11 Pro"],
  },
  {
    badge: "Pro",
    title: "OPS PC - Core i7 (Power User)",
    subtitle: "For university labs, corporate boardrooms and heavier workloads with multiple windows and meetings.",
    recommended: 'Recommended panel size: 86" - 110"',
    image: "/images/Interactive%20flat%20panel/OPS-PC-pro.webp",
    specs: ["Intel Core i7", "16GB - 32GB RAM", "512GB - 1TB SSD", "Windows 11 Pro"],
  },
];

const benefitCards = [
  {
    title: "Clear 4K visibility",
    desc: "Crisp text and sharp visuals help people follow content from the back row, improving readability in classrooms and meetings.",
  },
  {
    title: "Natural writing and annotation",
    desc: "Write, highlight and explain directly on-screen during lessons, trainings and presentations for diagrams and review sessions.",
  },
  {
    title: "All-in-one daily workflow",
    desc: "Built-in whiteboard tools, apps and speakers reduce dependency on extra devices and cut down switching time.",
  },
  {
    title: "Faster sharing and switching",
    desc: "Cast from laptop or mobile and switch presenters quickly, which is useful in multi-teacher or multi-speaker sessions.",
  },
  {
    title: "Lower maintenance than projectors",
    desc: "No lamp cycle and fewer calibration tasks compared with projector classrooms, so upkeep stays simpler.",
  },
  {
    title: "Higher engagement and collaboration",
    desc: "Multi-touch interaction supports group learning, brainstorming and team activities where people work together on one screen.",
  },
];

const chooseCards = [
  {
    title: "Shortlisting checklist",
    desc: "Use these points to narrow the right panel size, workflow and installation scope before asking for a quotation.",
    bullets: [
      "Confirm seating depth and content type (text-heavy teaching needs a larger size than video-only usage).",
      'Pick a size: 65" for compact rooms, 75"-86" for most classrooms, 96"+ for larger halls.',
      "Decide Android-only vs OPS PC (Windows) based on your apps (Office, browser tools, Teams/Zoom and multiple windows).",
      "Check ports and connectivity: HDMI, USB, LAN/Wi-Fi, casting method and any camera/speakerphone integration.",
      "Plan installation: wall mount vs trolley, cabling route, power protection and mounting height for comfortable use.",
      "Evaluate service: commissioning, user training, warranty terms and after-sales response.",
    ],
  },
  {
    title: "What to share for an accurate quotation",
    desc: "A quick room snapshot helps avoid under-sizing and makes our recommendation more practical from the first reply.",
    bullets: [
      "Room length-width and the farthest viewing distance",
      "Use-case: classroom, meeting room, training, auditorium or reception",
      "Preferred size (if you have a shortlist) and mounting type (wall/trolley)",
      "Android-only vs OPS PC requirement and any app/workflow needs",
      "Location and floor level for delivery and installation planning",
    ],
  },
];

const projectorAdvantageCards = [
  {
    title: "No lamp replacements and fewer consumables",
    desc: "Projectors often need periodic lamp changes and ongoing cleaning. A flat panel reduces recurring consumable costs and downtime.",
  },
  {
    title: "Clear visibility in bright rooms",
    desc: "Panels keep text and color consistent even with ambient light, which helps classrooms with windows or bright offices.",
  },
  {
    title: "No alignment and calibration hassle",
    desc: "A fixed display removes keystone correction, focus drift and daily adjustment issues, so the screen stays ready.",
  },
  {
    title: "Built-in touch and whiteboard workflow",
    desc: "Write, annotate and save notes directly on the screen without extra boards, making collaboration simpler.",
  },
  {
    title: "Simpler installation footprint",
    desc: "Wall mounting or trolley deployment is often cleaner than projector throw planning and ceiling work.",
  },
  {
    title: "More reliable sharing and switching",
    desc: "Modern casting and HDMI/USB connections let presenters connect faster and switch devices with less friction.",
  },
];

const whyChooseCards = [
  {
    title: "Use-case based recommendation",
    desc: "We propose models based on room depth, audience distance and workflow (Android-only vs OPS PC) so the panel feels right in real use.",
  },
  {
    title: "BOQ & specification support",
    desc: "Share your requirement or tender spec and we map a suitable configuration to reduce mismatch risk.",
  },
  {
    title: "Professional installation & commissioning",
    desc: "Mounting height, clean cabling, connectivity checks and on-site commissioning are handled for stable performance from day one.",
  },
  {
    title: "Training and handover",
    desc: "We provide basic user guidance so whiteboard, annotation and screen sharing can be used confidently.",
  },
  {
    title: "Warranty and after-sales continuity",
    desc: "Clear warranty terms and practical support help troubleshooting, accessories and long-term operation stay manageable.",
  },
  {
    title: "Nationwide delivery planning",
    desc: "We support projects across Bangladesh with delivery coordination and installation planning based on site readiness.",
  },
];

const buyerChecklistCards = [
  {
    title: "Room size and seating depth",
    desc: "Room length/width and distance to the farthest viewer helps confirm 65/75/86/96/98/110 size.",
  },
  {
    title: "Android-only vs Windows workflow",
    desc: "Tell us whether you need OPS PC for Office/Teams/Zoom or Android-only is enough for daily use.",
  },
  {
    title: "Mounting preference",
    desc: "Wall mount or trolley-mounting affects installation scope, cabling and user comfort height.",
  },
  {
    title: "Connectivity needs",
    desc: "HDMI/USB count, LAN/WiFi readiness, casting expectations and any camera/speakerphone integration.",
  },
  {
    title: "Installation location",
    desc: "Floor level and site location helps plan cabling and manpower requirements.",
  },
  {
    title: "Support expectations",
    desc: "Training, handover, warranty and after-sales support preferences matter for long-term operational stability.",
  },
];

function getParitySurface(index: number) {
  return {
    borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
    background:
      index % 2 === 0
        ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
        : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
  };
}

const SectionShell = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section className="mt-8 rounded-[24px] border bg-white p-4 md:mt-10 md:rounded-3xl md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
    {subtitle ? (
      <MobileIntroText
        teaser={subtitle}
        className="mt-2"
        teaserClassName="w-full leading-6"
        expandedClassName="text-sm leading-7 text-slate-600"
        desktopClassName="text-slate-600 leading-7"
      >
        <p className="text-slate-600 leading-7 text-justify">{subtitle}</p>
      </MobileIntroText>
    ) : null}
    <div className="mt-5">{children}</div>
  </section>
);

const MobileParityCardGrid = ({
  items,
}: {
  items: Array<{ title: string; desc: string; bullets?: string[] }>;
}) => (
  <>
    <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
          style={getParitySurface(index)}
        >
          <div className="text-[17px] font-extrabold leading-snug text-slate-900">{item.title}</div>
          <p className="mt-2 text-[13px] leading-6 text-slate-700 text-justify">{item.desc}</p>
          {item.bullets?.length ? (
            <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
              {item.bullets.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-6 text-justify">{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>

    <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="text-base font-extrabold text-slate-900">{item.title}</div>
          <p className="mt-2 text-sm leading-7 text-slate-600 text-justify">{item.desc}</p>
          {item.bullets?.length ? (
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              {item.bullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="text-justify">{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-4 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
        </article>
      ))}
    </div>
  </>
);

const MobileExpandableCards = ({
  summaryLabel,
  items,
}: {
  summaryLabel: string;
  items: Array<{ title: string; subtitle?: string; fields: Array<{ label: string; value: string }> }>;
}) => (
  <details className="group md:hidden">
    <summary
      className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden"
      style={{
        borderColor: `${BRAND.maroon}14`,
        background: "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)",
      }}
    >
      {summaryLabel}
    </summary>
    <div className="mt-3 space-y-3">
      {items.map((item, index) => (
        <article key={item.title} className="overflow-hidden rounded-[14px] border" style={getParitySurface(index)}>
          <div className="px-4 py-4">
            <div className="text-[16px] font-extrabold leading-snug text-slate-900">{item.title}</div>
            {item.subtitle ? <p className="mt-1 text-[12.5px] leading-6 text-slate-700 text-justify">{item.subtitle}</p> : null}
            <div className="mt-3 overflow-hidden rounded-[12px] border border-white/70 bg-white/75">
              {item.fields.map((field, fieldIndex) => (
                <div
                  key={`${item.title}-${field.label}`}
                  className={`grid grid-cols-[96px_minmax(0,1fr)] gap-3 px-3 py-2.5 ${fieldIndex !== 0 ? "border-t border-slate-200/70" : ""}`}
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-500">{field.label}</div>
                  <div className="text-[12.5px] leading-6 text-slate-700 text-justify">{field.value}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  </details>
);

export default function InteractiveFlatPanelPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
  const mobileProductRows = Array.from({ length: Math.ceil(interactiveFlatPanelCatalog.length / 4) }, (_, index) =>
    interactiveFlatPanelCatalog.slice(index * 4, index * 4 + 4)
  );

  const renderPanelCard = (panel: (typeof interactiveFlatPanelCatalog)[number]) => (
    <ProductGridCard
      key={panel.slug}
      href={`/interactive-flat-panel/${panel.slug}/`}
      title={panel.title}
      borderColor={`${BRAND.maroon}12`}
      accentColor={BRAND.maroon}
      imageContainerClassName={undefined}
      topLeftBadge={{ text: "Interactive Panel", tone: "light" }}
      topRightBadge={{ text: `${getInteractiveFlatPanelBrandLabel(panel.brand)} - ${panel.sizeInch}"`, tone: "dark" }}
      metaLines={[
        { text: panel.priceLabel, className: "mt-1 text-sm font-semibold text-sky-700" },
        { text: panel.subtitle, className: "mt-2 text-sm leading-7 text-slate-600 line-clamp-3" },
      ]}
      bullets={getInteractiveFlatPanelBullets(panel)}
      chips={getInteractiveFlatPanelChips(panel)}
      compactMobile
      image={
        <Image
          src={panel.image}
          alt={panel.title}
          fill
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="object-cover"
        />
      }
      viewDetailsLabel="View details ->"
    />
  );

  return (
    <div className="interactive-flat-panel-page mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/interactive-flat-panel/", label: "Interactive Flat Panel", current: true },
        ]}
        className="relative left-1/2 right-1/2 -mx-[50vw] mb-0 hidden w-screen pt-0 text-sm text-slate-600 md:block"
        panelClassName="rounded-none border-x-0 border-t-0 px-4 py-3 shadow-none md:px-10"
        backButtonClassName="rounded-md"
      />
      <section
        className="relative left-1/2 right-1/2 -mx-[50vw] min-h-[250px] w-screen overflow-hidden border-y bg-slate-950 md:min-h-[clamp(560px,calc(100svh-64px),780px)]"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/Interactive%20flat%20panel/Interactive-flat-panal.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.24), rgba(0,0,0,0.10) 52%, rgba(0,0,0,0.30))",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-5 md:px-10 md:py-10">
          <div className="flex max-w-4xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                style={{ background: `${BRAND.maroon}24` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                Control Systems - Bangladesh
              </span>

              <nav className="hidden flex-wrap items-center gap-2 text-xs font-semibold text-white/80 md:flex">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white">Interactive Flat Panel</span>
              </nav>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-white md:text-4xl">
                Interactive Flat Panel (IFP) Price in Bangladesh
              </h1>
              <MobileIntroText
                teaser="Interactive flat panels upgrade classrooms and meeting rooms with a bright 4K display and touch writing."
                expandedClassName="mt-3"
                desktopClassName="mt-3"
                teaserClassName="text-white/85"
                buttonClassName="text-[#67E8F9]"
              >
                <p className="text-sm leading-7 text-justify text-white/85 md:text-base">
                  Interactive flat panels upgrade classrooms and meeting rooms with a bright 4K display and touch writing.
                  Share your room size and usage goal to receive a practical model recommendation, BOQ support and an
                  installation-ready quotation.
                </p>
              </MobileIntroText>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 md:mt-2 md:flex md:flex-wrap md:gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[10px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg md:rounded-xl md:px-6 md:py-3.5 md:text-[15px]"
              >
                Get Quotation on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[10px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg md:rounded-xl md:px-6 md:py-3.5 md:text-[15px]"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Request BOQ / Quotation
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="hidden min-h-9 items-center justify-center rounded-md border border-white/30 bg-slate-950/30 px-2 py-2 text-[10px] font-extrabold text-white shadow-md backdrop-blur transition hover:bg-slate-950/40 hover:shadow-lg md:inline-flex md:rounded-xl md:px-6 md:py-3.5 md:text-[15px]"
              >
                Hotline: {siteConfig.phone}
              </a>
            </div>

            <div className="mt-8 hidden gap-3 md:grid md:grid-cols-3">
              {[
                { k: "Sizes", v: '65" / 75" / 86" / 96" / 98" / 110"' },
                { k: "OS", v: "Android + OPS PC (optional)" },
                { k: "Service", v: "Nationwide support" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border bg-white/5 p-5 text-white backdrop-blur"
                  style={{ borderColor: "rgba(255,255,255,0.14)" }}
                >
                  <div className="text-sm font-extrabold">{x.k}</div>
                  <p className="mt-2 text-sm leading-7 text-white/80">{x.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        title="Size Selection (Practical Guide)"
        subtitle="The best interactive flat panel is the one that stays readable from the back row and fits your daily workflow. Use the guide below, then share your room layout to validate sizing."
      >
        <MobileParityCardGrid
          items={sizeGuides.map((item) => ({
            title: item.title,
            desc: item.desc,
          }))}
        />
      </SectionShell>

      <section className="mt-8 rounded-[24px] border bg-white p-4 md:mt-10 md:rounded-3xl md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Interactive Flat Panel Models</h2>
            <MobileIntroText
              teaser="Popular brand and size combinations are listed below so you can shortlist by room fit, workflow and support scope."
              className="mt-2"
              teaserClassName="w-full leading-6"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="text-slate-600 leading-7"
            >
              <p className="text-slate-600 leading-7 text-justify">
                Popular brand and size combinations are listed below so you can shortlist by room fit, workflow and support scope. For
                procurement, focus on the full package: model, accessories, mounting method and installation support.
              </p>
            </MobileIntroText>
          </div>
          <div className="grid grid-cols-2 gap-2 md:mt-0 md:flex md:flex-nowrap">
            <Link
              href="/contact"
              className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[42px] md:rounded-xl md:px-4 md:py-2.5 md:text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request Quotation -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:min-h-[42px] md:rounded-xl md:px-4 md:py-2.5 md:text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="md:hidden">
          {mobileProductRows.map((row, index) => (
            <ResponsiveProductCarousel key={`mobile-ifp-row-${index}`} className={index === 0 ? "mt-6" : "mt-4"}>
              {row.map((panel) => renderPanelCard(panel))}
            </ResponsiveProductCarousel>
          ))}
        </div>

        <div className="hidden md:block">
          <ResponsiveProductCarousel className="mt-6" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {interactiveFlatPanelCatalog.map((panel) => renderPanelCard(panel))}
          </ResponsiveProductCarousel>
        </div>
      </section>

      <SectionShell
        title="Interactive Flat Panel Price List in Bangladesh"
        subtitle="These are indicative price ranges by screen size to help you shortlist. Final quotation can vary by brand series, Android and OPS PC configuration, mounting type, installation scope and delivery location."
      >
        <MobileExpandableCards
          summaryLabel="Tap To Expand Price List"
          items={priceRows.map((row) => ({
            title: `${row.size} Interactive Flat Panel`,
            subtitle: row.use,
            fields: [
              { label: "Price", value: row.price },
              { label: "Use", value: row.use },
            ],
          }))}
        />

        <div className="hidden rounded-3xl border bg-slate-50 p-6 md:block" style={{ borderColor: `${BRAND.maroon}12` }}>
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="bg-white/60">
                <th className="w-[18%] px-4 py-3 align-top font-extrabold text-slate-900">Screen size</th>
                <th className="w-[30%] px-4 py-3 align-top font-extrabold text-slate-900">Indicative price (BDT)</th>
                <th className="w-[52%] px-4 py-3 align-top font-extrabold text-slate-900">Most common use</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.size}>
                  <td className="px-4 py-3 align-top font-semibold text-slate-900 break-words">{row.size}</td>
                  <td className="px-4 py-3 align-top font-semibold text-slate-700 break-words">{row.price}</td>
                  <td className="px-4 py-3 align-top text-slate-700 break-words">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border bg-white px-3 py-1" style={{ borderColor: `${BRAND.maroon}12` }}>
              Nationwide delivery available
            </span>
            <span className="rounded-full border bg-white px-3 py-1" style={{ borderColor: `${BRAND.maroon}12` }}>
              Installation and commissioning can be included
            </span>
            <span className="rounded-full border bg-white px-3 py-1" style={{ borderColor: `${BRAND.maroon}12` }}>
              Warranty terms depend on model and package
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-4 md:hidden">
          <MobileExpandableCards
            summaryLabel="Tap To Expand Viewing Distance Guide"
            items={viewingDistanceRows.map((row) => ({
              title: row.distance,
              subtitle: row.room,
              fields: [
                { label: "Size", value: row.size },
                { label: "Room", value: row.room },
              ],
            }))}
          />

          <article className="rounded-[14px] border px-4 py-4" style={getParitySurface(0)}>
            <div className="text-[16px] font-extrabold leading-snug text-slate-900">{"What's Included in a BOQ-Ready Quote"}</div>
            <p className="mt-2 text-[12.5px] leading-6 text-slate-700 text-justify">
              Most projects are quoted as a complete solution so comparisons stay fair across vendors.
            </p>
            <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
              {boqChecklist.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-6 text-justify">{line}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 hidden gap-4 lg:grid-cols-2 md:grid">
          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
            <div className="text-base font-extrabold text-slate-900">Screen Size by Viewing Distance</div>
            <p className="mt-2 text-sm leading-7 text-slate-600 text-justify">
              Use this quick guide when the farthest seat matters. For precise sizing, share your room layout and seating depth.
            </p>
            <div className="mt-4">
              <table className="w-full table-fixed text-left text-sm">
                <thead>
                  <tr className="bg-white/60">
                    <th className="w-[22%] px-4 py-3 align-top font-extrabold text-slate-900">Viewing distance</th>
                    <th className="w-[22%] px-4 py-3 align-top font-extrabold text-slate-900">Recommended size</th>
                    <th className="w-[56%] px-4 py-3 align-top font-extrabold text-slate-900">Typical room</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingDistanceRows.map((row) => (
                    <tr key={row.distance}>
                      <td className="px-4 py-3 align-top font-semibold text-slate-900 break-words">{row.distance}</td>
                      <td className="px-4 py-3 align-top text-slate-700 break-words">{row.size}</td>
                      <td className="px-4 py-3 align-top text-slate-700 break-words">{row.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
            <div className="text-base font-extrabold text-slate-900">{"What's Included in a BOQ-Ready Quote"}</div>
            <p className="mt-2 text-sm leading-7 text-slate-600 text-justify">
              Most projects are quoted as a complete solution (panel + installation). This checklist makes comparisons fair when you evaluate
              interactive flat panel price in Bangladesh across vendors.
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              {boqChecklist.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="text-justify">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
          </div>
        </div>
      </SectionShell>

      <SectionShell
        title="Interactive Flat Panel in Bangladesh: What to Compare"
        subtitle="If you are comparing interactive flat panel price in Bangladesh, focus on project fit, not only a single unit price. Two same-size panels can perform very differently based on touch response, Android performance, glass quality, OPS PC readiness, accessories and after-sales support."
      >
        <div className="grid grid-cols-2 gap-2 md:mb-6 md:flex md:flex-nowrap">
          <Link
            href="/contact"
            className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[42px] md:rounded-xl md:px-4 md:py-2.5 md:text-sm"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get a BOQ-ready quote
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:min-h-[42px] md:rounded-xl md:px-4 md:py-2.5 md:text-sm"
          >
            WhatsApp quick help
          </a>
        </div>
        <MobileParityCardGrid items={compareCards} />
      </SectionShell>

      <SectionShell
        title="Interactive Flat Panel Use-Case Selection Guide"
        subtitle="Shortlist the right interactive flat panel size by environment so your BOQ stays cleaner and you avoid under-sizing or over-spending."
      >
        <MobileExpandableCards
          summaryLabel="Tap To Expand Use-Case Guide"
          items={useCaseRows.map((row) => ({
            title: row.use,
            subtitle: row.focus,
            fields: [
              { label: "Size", value: row.size },
              { label: "Focus", value: row.focus },
            ],
          }))}
        />

        <div className="hidden rounded-3xl border bg-slate-50 p-6 md:block" style={{ borderColor: `${BRAND.maroon}12` }}>
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="bg-white/60">
                <th className="w-[28%] px-4 py-3 align-top font-extrabold text-slate-900">Use case</th>
                <th className="w-[20%] px-4 py-3 align-top font-extrabold text-slate-900">Recommended size</th>
                <th className="w-[52%] px-4 py-3 align-top font-extrabold text-slate-900">Key focus</th>
              </tr>
            </thead>
            <tbody>
              {useCaseRows.map((row) => (
                <tr key={row.use}>
                  <td className="px-4 py-3 align-top font-semibold text-slate-900 break-words">{row.use}</td>
                  <td className="px-4 py-3 align-top text-slate-700 break-words">{row.size}</td>
                  <td className="px-4 py-3 align-top text-slate-700 break-words">{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>

      <SectionShell
        title="Optional OPS PC Module for Interactive Flat Panel"
        subtitle="If your team needs a full Windows workflow with Office apps, browser tools, Teams or heavier software, add an OPS PC module inside the interactive flat panel and choose the configuration by workload and room type."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {opsCards.map((card, index) => (
            <article key={card.title} className="w-[89%] shrink-0 snap-start overflow-hidden rounded-[14px] border" style={getParitySurface(index)}>
              <div className="relative aspect-[16/10] w-full bg-white">
                <Image src={card.image} alt={card.title} fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/0 to-slate-900/15" />
                <div className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-900">
                  {card.badge}
                </div>
              </div>
              <div className="px-4 py-4">
                <div className="text-[16px] font-extrabold leading-snug text-slate-900">{card.title}</div>
                <p className="mt-1 text-[12.5px] leading-6 text-slate-700 text-justify">{card.subtitle}</p>
                <div className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-500">{card.recommended}</div>
                <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
                  {card.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                      <span className="leading-6">{spec}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                  >
                    Get quotation
                  </Link>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {opsCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-3xl border bg-slate-50 shadow-sm"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="relative aspect-[16/10] w-full bg-white">
                <Image src={card.image} alt={card.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-slate-900/20" />
                <div className="absolute left-4 top-4 rounded-full border bg-white/90 px-3 py-1 text-xs font-extrabold text-slate-900 backdrop-blur">
                  {card.badge}
                </div>
              </div>

              <div className="p-6">
                <div className="text-base font-extrabold text-slate-900">{card.title}</div>
                <div className="mt-1 text-sm font-semibold text-slate-600">{card.subtitle}</div>
                <div className="mt-3 text-xs font-bold text-slate-700">{card.recommended}</div>

                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  {card.specs.map((spec) => (
                    <li key={spec} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ background: BRAND.maroon }} />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className="flex-1 rounded-xl px-4 py-3 text-center text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                  >
                    Get quotation
                  </Link>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="Benefits of Interactive Smart Screen"
        subtitle="An interactive smart screen can replace a projector plus whiteboard setup and make daily teaching and collaboration simpler with clearer visuals, smooth writing and quick sharing."
      >
        <MobileParityCardGrid items={benefitCards} />
      </SectionShell>

      <SectionShell
        title="How to Choose the Right Interactive Flat Panel Display"
        subtitle="The best model depends on viewing distance, daily usage and connectivity needs. Use the checklist below to shortlist options, then share your room details for a BOQ-ready recommendation."
      >
        <MobileParityCardGrid items={chooseCards} />
      </SectionShell>

      <SectionShell
        title="Advantages of Interactive Flat Panel Over Projectors"
        subtitle="Both setups can be used for teaching and presentations, but interactive flat panels usually deliver more consistent picture quality, faster day-to-day use and fewer maintenance tasks."
      >
        <MobileParityCardGrid items={projectorAdvantageCards} />
      </SectionShell>

      <SectionShell
        title="Why Choose Sasha Corporation for Interactive Flat Panel"
        subtitle="Buying an interactive flat panel is not only a product decision. It is also an installation and daily-usage decision, so we help schools, training centers and businesses choose the right size, plan accessories and receive a BOQ-ready quotation with setup and after-sales support."
      >
        <MobileParityCardGrid items={whyChooseCards} />
        <div className="mt-6 hidden flex-wrap gap-2 md:flex">
          <span
            className="rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700"
            style={{ borderColor: `${BRAND.maroon}12` }}
          >
            {"Sizes: 65\" / 75\" / 86\" / 96\" / 98\" / 110\""}
          </span>
          <span className="rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700" style={{ borderColor: `${BRAND.maroon}12` }}>
            Optional: OPS PC, wall mount, trolley, cabling
          </span>
          <span className="rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700" style={{ borderColor: `${BRAND.maroon}12` }}>
            Delivery + installation packages available
          </span>
        </div>
      </SectionShell>

      <SectionShell
        title="Buyer Checklist for Faster Quotation"
        subtitle="Share the items below and we can respond with a clearer BOQ and a more accurate price range."
      >
        <MobileParityCardGrid items={buyerChecklistCards} />
      </SectionShell>

      <SectionShell title="FAQ" subtitle="Quick answers about interactive flat panel selection, OPS PC requirement and installation scope in Bangladesh.">
        <FaqAccordion accent={BRAND.maroon} items={faqs} density="compact" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SectionShell>
    </div>
  );
}
