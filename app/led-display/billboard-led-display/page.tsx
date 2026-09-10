import type { Metadata } from "next";
import Link from "next/link";
import { responsiveImageProps } from "@/lib/responsive-image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { outdoorCatalog, type ProductItem } from "../../../lib/productsCatalog";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Billboard LED Display in Bangladesh | Waterproof Display",
  description:
    "Billboard LED Screen in Bangladesh for outdoor advertising, roadside branding and long-distance visibility. Compare brightness, cabinet quality and durability.",
  alternates: { canonical: "/led-display/billboard-led-display/" },
  openGraph: {
    title: "Billboard LED Display in Bangladesh | Waterproof Display",
    description:
      "Billboard LED Screen in Bangladesh for outdoor advertising, roadside branding and long-distance visibility. Compare brightness, cabinet quality and durability.",
    url: "/led-display/billboard-led-display/",
    type: "article",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "Billboard LED Display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Billboard LED Display",
    description:
      "Practical guide for billboard LED display planning, visibility strategy, and outdoor deployment decisions.",
    images: [socialImageUrl()],
  },
};

const benefits = [
  "High audience reach in prime traffic corridors",
  "Real-time campaign update without print replacement",
  "Better day-night visibility than static signboards",
  "Scalable placement for local and city-wide branding",
];

const workFlow = [
  "Media planning decides location and campaign objective",
  "Pitch and cabinet brightness are selected for viewing range",
  "Controller maps content schedule and playback timing",
  "Power, grounding, and structure are tested before launch",
  "Performance monitoring tracks uptime and content impact",
];

const compare = [
  {
    mode: "LED Billboard",
    strength: "Dynamic content and measurable campaign flexibility",
    limit: "Higher initial setup than static boards",
  },
  {
    mode: "Static Billboard",
    strength: "Lower initial print setup",
    limit: "No dynamic scheduling and recurring print replacement",
  },
];

const siteReadiness = [
  {
    t: "Traffic and viewing angle mapping",
    d: "Screen direction should align with audience movement pattern for maximum readability.",
  },
  {
    t: "Ambient light and weather exposure",
    d: "Brightness planning should consider day glare, rain season, and dust-heavy roadside conditions.",
  },
  {
    t: "Structure and access feasibility",
    d: "Safe mounting and service access reduce maintenance downtime in high-elevation locations.",
  },
  {
    t: "Power and network stability",
    d: "Reliable power routing and signal continuity are critical for uninterrupted campaign delivery.",
  },
];

const costLayers = [
  { k: "Display hardware", v: "Panel specification, brightness class, cabinet type, and control architecture." },
  { k: "Civil and structure", v: "Foundation, mounting frame, and load compliance engineering." },
  { k: "Electrical safety", v: "MCB line, grounding, surge protection, and panel isolation practices." },
  { k: "Operations and monitoring", v: "Content scheduling, health checks, and periodic maintenance planning." },
];

const complianceChecklist = [
  "Confirm local placement permissions and media compliance scope.",
  "Validate structural safety under expected wind and weather load.",
  "Define emergency shutdown and safe electrical isolation workflow.",
  "Document service access protocol for rapid fault response.",
  "Review content update responsibility and approval process.",
];

const billboardFaqs = [
  {
    q: "What distance should I consider before selecting billboard pitch?",
    a: "Use average audience distance and speed profile. High-speed highway routes often need different sizing logic than city intersections.",
  },
  {
    q: "How often should billboard LED systems be maintained?",
    a: "Preventive checks are recommended on a periodic schedule based on environment severity, usage duration, and safety exposure.",
  },
  {
    q: "Is brightness alone enough for better visibility?",
    a: "No. Contrast tuning, content design, panel calibration, and viewing angle all influence final readability.",
  },
  {
    q: "Can one configuration work for all outdoor locations?",
    a: "Usually not. Site context, audience distance, weather risk, and local infrastructure vary significantly by location.",
  },
];

const billboardPriceRows = [
  {
    pitch: "P3 - P4",
    viewing: "Closer roadside and premium urban placement",
    budgetBand: "Higher initial hardware budget",
    bestUse: "Premium city branding panel",
  },
  {
    pitch: "P5 - P6",
    viewing: "Balanced city and intercity visibility range",
    budgetBand: "Medium to high",
    bestUse: "Roadside advertising and mixed campaign rotation",
  },
  {
    pitch: "P8 - P10",
    viewing: "Long-distance highway readability",
    budgetBand: "More cost-efficient per larger area",
    bestUse: "Highway billboard and large-format outdoor communication",
  },
];

const distanceGuideRows = [
  { distance: "15-30 ft", pitch: "P3 / P4", note: "Sharper detail for slower traffic and close-angle viewing." },
  { distance: "30-60 ft", pitch: "P5 / P6", note: "Balanced clarity and project cost for busy city roads." },
  { distance: "60 ft+", pitch: "P8 / P10", note: "Better visibility economy for long-distance audience attention." },
];

const cityUseCases = [
  {
    city: "Dhaka",
    useCase: "Dense traffic corridor branding and high-frequency campaign scheduling.",
    focus: "Brightness strategy, traffic-angle mapping, and continuous content rotation.",
  },
  {
    city: "Chattogram",
    useCase: "Commercial route visibility and port-adjacent communication boards.",
    focus: "Weather-ready cabinet, power stability, and corrosion-aware structure planning.",
  },
  {
    city: "Sylhet",
    useCase: "Hospitality and city-entry billboard communication.",
    focus: "Readability-focused content layout with balanced pitch selection.",
  },
  {
    city: "Khulna",
    useCase: "Industrial and roadside promotional display use.",
    focus: "Uptime-oriented maintenance model and stable power architecture.",
  },
  {
    city: "Rajshahi",
    useCase: "Education hub and urban junction communication campaigns.",
    focus: "Clear text readability planning, moderate pitch balance, and scheduled content timing.",
  },
  {
    city: "Barishal",
    useCase: "River-port and district gateway outdoor visibility programs.",
    focus: "Humidity-aware hardware selection, cabinet sealing checks, and reliable power backup.",
  },
  {
    city: "Rangpur",
    useCase: "Regional trade-route awareness and local business promotion boards.",
    focus: "Long-view readability strategy with practical brightness and maintenance planning.",
  },
  {
    city: "Mymensingh",
    useCase: "Institutional outreach and city-corridor brand communication.",
    focus: "Balanced pitch and screen sizing with stable controller and preventive service workflow.",
  },
];

const runningCostRows = [
  { item: "Power consumption profile", desc: "Depends on brightness target, screen size, and daily run hours." },
  { item: "Preventive maintenance cycle", desc: "Periodic inspection reduces emergency repair cost and display downtime." },
  { item: "Spare and support planning", desc: "Fast replacement strategy protects campaign continuity in peak periods." },
  { item: "Content operations", desc: "Scheduled media workflow avoids manual errors and improves ad slot utilization." },
];

const timelineSteps = [
  "Site survey and traffic-view analysis",
  "Pitch, size, and structure recommendation",
  "Budget confirmation with technical scope",
  "Fabrication, installation, and safety validation",
  "Calibration, content launch, and monitoring handover",
];

const billboardLinks = [
  {
    href: "/led-display/outdoor/",
    anchor: "Outdoor LED Module Price Guide",
    desc: "Explore outdoor models by pixel pitch and deployment scenario.",
  },
  {
    href: "/led-display/",
    anchor: "LED Display Overview (All Categories)",
    desc: "Browse indoor, outdoor, rental and accessory options in one place.",
  },
  {
    href: "/contact/",
    anchor: "Request LED Display Budget Support",
    desc: "Share your billboard size and location for a project-based estimate.",
  },
  {
    href: "/contact/",
    anchor: "Request Billboard Quotation in Bangladesh",
    desc: "Share location and size to receive project-based estimate.",
  },
  {
    href: "/led-display/waterproof-outdoor-led-display/",
    anchor: "Waterproof Outdoor LED Planning",
    desc: "See weather protection and reliability factors before deployment.",
  },
];

const whatIsBillboardRows = [
  {
    title: "Large-format digital advertising screen",
    detail:
      "A billboard LED display is a high-brightness outdoor screen built for long-distance visibility in roads, intersections, and public commercial zones.",
  },
  {
    title: "Content can be updated in real time",
    detail:
      "Unlike printed boards, digital billboard media can be changed by schedule, campaign, or time slot without replacing physical material.",
  },
  {
    title: "Built for weather and continuous operation",
    detail:
      "Outdoor-grade cabinet, protection stack, and power planning are used to keep content stable in rain, dust, and heat-heavy environments.",
  },
];

const howWeWorkOnBillboardSteps = [
  {
    title: "Site and visibility assessment",
    detail:
      "We review traffic direction, viewing distance, and surrounding light condition before suggesting size, pitch, and placement strategy.",
  },
  {
    title: "Technical and budget alignment",
    detail:
      "Billboard hardware, structure, controller scope, and power safety are mapped into a practical budget with clear performance expectation.",
  },
  {
    title: "Installation and quality validation",
    detail:
      "Our team completes installation, calibration, safety checks, and playback verification before the billboard goes live.",
  },
  {
    title: "Post-launch support workflow",
    detail:
      "We define monitoring, preventive maintenance, and service response planning to keep campaign uptime consistent after deployment.",
  },
];

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel"));
  if (!spec) return "Outdoor";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

function getPitchDisplay(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel"))?.v ?? "";
  const mm = spec.match(/(\d+(?:\.\d+)?)\s*mm/i)?.[1];
  if (mm) return `${mm} mm`;
  const pVal = spec.match(/p\s?(\d+(?:\.\d+)?)/i)?.[1];
  return pVal ? `${pVal} mm` : getPitchLabel(p);
}

type OutdoorBadgeCategory = "Billboard" | "Rooftop" | "Facade" | "Roadside" | "Public Screen";

function inferOutdoorCategory(p: ProductItem): OutdoorBadgeCategory {
  const s = `${p.title} ${p.subtitle} ${p.bestFor.join(" ")}`.toLowerCase();
  if (s.includes("roof")) return "Rooftop";
  if (s.includes("facade")) return "Facade";
  if (s.includes("road")) return "Roadside";
  if (s.includes("public")) return "Public Screen";
  return "Billboard";
}

function HeadingIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind:
    | "models"
    | "what"
    | "workflow"
    | "benefits"
    | "practice"
    | "compare"
    | "readiness"
    | "cost"
    | "price"
    | "distance"
    | "city"
    | "amc"
    | "timeline"
    | "links"
    | "checklist"
    | "faq";
  className?: string;
}) {
  const base = `inline-block ${className}`;
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, fill: "none" } as const;

  switch (kind) {
    case "models":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="5" width="18" height="11" rx="2" {...stroke} />
          <path d="M8 20h8M12 16v4" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "what":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M9.8 9.4a2.4 2.4 0 1 1 3.9 1.8c-.8.7-1.5 1.1-1.5 2" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="16.6" r="1" fill="currentColor" />
        </svg>
      );
    case "workflow":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 7h10M4 12h16M4 17h10" {...stroke} strokeLinecap="round" />
          <circle cx="16.5" cy="7" r="2" {...stroke} />
          <circle cx="19.5" cy="17" r="2" {...stroke} />
        </svg>
      );
    case "benefits":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="m8.5 12.2 2.3 2.3 4.7-4.7" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "practice":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16M12 4v16" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" {...stroke} />
        </svg>
      );
    case "compare":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M7 4v14M17 6v14M4 18h6M14 20h6" {...stroke} strokeLinecap="round" />
          <circle cx="7" cy="4" r="2" fill="currentColor" />
          <circle cx="17" cy="6" r="2" fill="currentColor" />
        </svg>
      );
    case "readiness":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z" {...stroke} />
          <circle cx="12" cy="11" r="2.3" {...stroke} />
        </svg>
      );
    case "cost":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" {...stroke} />
          <path d="M8 10h8M8 14h5" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "price":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" {...stroke} />
          <path d="M8 8h8M8 12h8M8 16h5" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "distance":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16M4 8h6M14 8h6M4 16h6M14 16h6" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 20V9l4-2 3 2 3-2 4 2v11H5Z" {...stroke} />
          <path d="M9 13h.01M12 13h.01M15 13h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "amc":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 14a6 6 0 0 0 12 0M12 8v6" {...stroke} strokeLinecap="round" />
          <path d="m9 10 3-3 3 3" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "timeline":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 6h14M5 12h14M5 18h14" {...stroke} strokeLinecap="round" />
          <circle cx="7" cy="6" r="1.4" fill="currentColor" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
          <circle cx="17" cy="18" r="1.4" fill="currentColor" />
        </svg>
      );
    case "links":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M10 14 8.2 15.8a3 3 0 1 1-4.2-4.2L6 9.6M14 10l1.8-1.8a3 3 0 1 1 4.2 4.2L18 14.4M8.5 12h7" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "checklist":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 5h12v14H6z" {...stroke} />
          <path d="m9 11 1.5 1.5L14 9M9 16h5" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "faq":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M9.7 9.5a2.3 2.3 0 1 1 3.8 1.7c-.8.7-1.4 1-1.4 1.9" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="16.7" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BillboardLedDisplayPage() {
  const waPhone = siteConfig.whatsapp.replace(/\D/g, "");
  const wa = `https://api.whatsapp.com/send/?phone=${waPhone}&text&type=phone_number&app_absent=0`;

  const imageObjectPositionBySlug: Record<string, string> = {
    "p2-5-outdoor-led-display-module": "50% 40%",
    "p3-outdoor-led-display-module": "50% 40%",
    "p3-076-outdoor-led-display-module": "50% 40%",
    "p4-outdoor-led-display": "50% 40%",
    "p5-outdoor-led-display": "50% 40%",
    "p6-outdoor-led-display": "50% 40%",
    "p6-67-outdoor-led-display-module-320x160mm": "50% 40%",
    "p8-outdoor-led-display-module": "50% 40%",
    "p10-outdoor-led-display-module": "50% 40%",
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          {
            href: "/led-display/billboard-led-display/",
            label: "Billboard LED Display",
            current: true,
          },
        ]}
      />
      <section className="p-0">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Billboard LED Display in Bangladesh</h1>
        <p className="mt-4 w-full text-sm leading-7 text-slate-600">
          <strong>Billboard LED display</strong> is designed for high-impact <strong>outdoor advertising</strong> in
          Bangladesh, where visibility, durability, and clear messaging directly affect campaign results. Use this
          page to evaluate <strong>LED</strong> <strong>billboard screen</strong> options by pixel pitch, brightness
          (nits), refresh quality, cabinet weather protection, and control system stability so your content remains
          readable in daylight, traffic-heavy roads, and long-distance viewing zones. Whether you are planning a{" "}
          <strong>highway billboard</strong>, <strong>city branding panel</strong>, retail frontage display, or
          location-based <strong>promotional screen</strong>, these comparison points help you estimate practical
          budget, reduce installation risk, and choose a reliable <strong>outdoor LED solution</strong> for long-term
          brand communication.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="models" className="h-6 w-6 text-slate-800" />
          <span>Outdoor LED Display Models</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Browse outdoor model cards commonly used in billboard and roadside communication projects.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outdoorCatalog.map((p) => {
            const category = inferOutdoorCategory(p);
            const objectPosition = imageObjectPositionBySlug[p.slug] ?? "50% 50%";
            const pitchDisplay = getPitchDisplay(p);

            return (
              <ProductGridCard
                key={p.slug}
                href={`/led-display/outdoor/${p.slug}/`}
                title={p.title}
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...responsiveImageProps(p.image)}
                    alt={p.title}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    style={{ objectPosition }}
                    loading="lazy"
                  />
                }
                imageContainerClassName="bg-slate-50"
                borderColor="rgba(255,106,0,0.12)"
                topLeftBadge={{ text: "Outdoor", tone: "light" }}
                topRightBadge={{ text: category, tone: "dark" }}
                metaLines={[
                  { text: `Pixel pitch: ${pitchDisplay}` },
                  ...(p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []),
                ]}
                bullets={p.quickFeatures.slice(0, 4)}
                chips={p.bestFor.slice(0, 3)}
                accentColor="#FF6A00"
                contactHref="/contact"
                viewDetailsLabel="View details ->"
              />
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="what" className="h-6 w-6 text-slate-800" />
          <span>What is Billboard LED Display</span>
        </h2>
        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-3">
          {whatIsBillboardRows.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="workflow" className="h-6 w-6 text-slate-800" />
          <span>How we work on billboard led display</span>
        </h2>
        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-2">
          {howWeWorkOnBillboardSteps.map((step, idx) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#FF6A00]">Step {idx + 1}</div>
              <h3 className="mt-1 text-base font-extrabold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="benefits" className="h-5 w-5 text-slate-800" />
            <span>Why Businesses Use Billboard LED</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {benefits.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="practice" className="h-5 w-5 text-slate-800" />
            <span>How Billboard LED Display Works in Practice</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {workFlow.map((step, idx) => (
              <li key={step}>
                {idx + 1}. {step}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="compare" className="h-6 w-6 text-slate-800" />
          <span>Compare Before Final Billboard Display Selection</span>
        </h2>
        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-2">
          {compare.map((item) => (
            <article key={item.mode} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">{item.mode}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-800">Advantage:</span> {item.strength}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-800">Consideration:</span> {item.limit}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/led-display/outdoor/" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            Explore Outdoor Models -&gt;
          </Link>
          <Link href="/contact/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900">
            Request Site Survey
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="readiness" className="h-6 w-6 text-slate-800" />
          <span>LED Billboard Display Location Readiness Framework</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Billboard performance depends on placement quality as much as hardware quality. A location-first review helps
          avoid visibility loss, unstable operation, and avoidable rework after deployment.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {siteReadiness.map((item) => (
            <article key={item.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">{item.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="cost" className="h-6 w-6 text-slate-800" />
          <span>LED Billboard Display Cost Structure Breakdown</span>
        </h2>
        <div className="mt-4 grid gap-3">
          {costLayers.map((item) => (
            <div key={item.k} className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3 md:items-center md:gap-4">
              <div className="text-sm font-bold text-slate-900">{item.k}</div>
              <p className="text-sm leading-7 text-slate-600 md:col-span-2">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="price" className="h-6 w-6 text-slate-800" />
          <span>Billboard LED Price Range by Pixel Pitch and Use Case</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Use this planning table for <strong>billboard LED display price in Bangladesh</strong>. Final quotation varies
          by structure scope, installation condition, and site utility readiness.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="border-r border-slate-200 px-4 py-3">Pixel Pitch</th>
                <th className="border-r border-slate-200 px-4 py-3">Typical Viewing Context</th>
                <th className="border-r border-slate-200 px-4 py-3">Budget Band</th>
                <th className="px-4 py-3">Best Use</th>
              </tr>
            </thead>
            <tbody>
              {billboardPriceRows.map((row) => (
                <tr key={row.pitch} className="border-t border-slate-100">
                  <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">{row.pitch}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.viewing}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.budgetBand}</td>
                  <td className="px-4 py-3">{row.bestUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="distance" className="h-6 w-6 text-slate-800" />
          <span>Viewing Distance vs Pixel Pitch for Billboard Clarity</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Pitch selection should match average audience distance to avoid overspending or poor readability in live road conditions.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {distanceGuideRows.map((row) => (
            <article key={row.distance} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">{row.distance}</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Recommended:</strong> {row.pitch}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">{row.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="city" className="h-6 w-6 text-slate-800" />
          <span>City-wise Billboard Deployment Patterns in Bangladesh</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Local road behavior and environment can change hardware and budget decisions even for similar billboard size.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {cityUseCases.map((row) => (
            <div key={row.city} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900">{row.city}</div>
              <p className="mt-1 text-sm leading-7 text-slate-600">{row.useCase}</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Planning focus:</strong> {row.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="amc" className="h-5 w-5 text-slate-800" />
            <span>Billboard Running Cost and AMC Planning</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {runningCostRows.map((row) => (
              <li key={row.item}>
                <span className="font-semibold text-slate-900">{row.item}:</span> {row.desc}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="timeline" className="h-5 w-5 text-slate-800" />
            <span>Typical Project Timeline for Billboard Launch</span>
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {timelineSteps.map((step, idx) => (
              <li key={step}>
                {idx + 1}. {step}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="links" className="h-6 w-6 text-slate-800" />
          <span>Useful Links Before Final Billboard Decision</span>
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {billboardLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="text-sm font-bold text-slate-900">{item.anchor}</div>
              <p className="mt-1 text-sm leading-7 text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact/" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            Get Billboard Price by Screen Size
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="nofollow noreferrer"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900"
          >
            WhatsApp Quick Estimation
          </a>
        </div>
      </section>

      <section className="mt-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="checklist" className="h-5 w-5 text-slate-800" />
            <span>LED Billboard Display Pre-Deployment Compliance Checklist</span>
          </h2>
          <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600 md:grid-cols-2">
            {complianceChecklist.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="faq" className="h-6 w-6 text-slate-800" />
          <span>Billboard Buyer FAQ</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Practical answers to common questions before selecting pitch, brightness, structure scope, and operational planning for outdoor billboard deployment.
        </p>
        <div className="mt-5">
          <FaqAccordion items={billboardFaqs} accent="#FF6A00" columns={2} />
        </div>
      </section>
    </main>
  );
}
