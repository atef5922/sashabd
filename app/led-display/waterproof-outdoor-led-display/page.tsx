import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { outdoorCatalog, type ProductItem } from "../../../lib/productsCatalog";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Waterproof Outdoor LED Display Bangladesh | Weatherproof",
  description:
    "Waterproof outdoor LED display guide for rain, dust, and humidity conditions in Bangladesh with safety, reliability, and maintenance priorities.",
  alternates: { canonical: "/led-display/waterproof-outdoor-led-display/" },
  openGraph: {
    title: "Waterproof Outdoor LED Display Bangladesh | Weatherproof",
    description:
      "Waterproof outdoor LED display guide for rain, dust, and humidity conditions in Bangladesh with safety, reliability, and maintenance priorities.",
    url: "/led-display/waterproof-outdoor-led-display/",
    type: "article",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "Waterproof Outdoor LED Display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waterproof Outdoor LED Display",
    description:
      "Understand waterproof outdoor LED display planning, protection strategy, and long-term performance essentials.",
    images: [socialImageUrl()],
  },
};

const protectionLayers = [
  "Cabinet sealing and drainage routing",
  "Outdoor-rated connectors and cable glands",
  "Thermal path for stable heat release",
  "Grounding and surge safety integration",
];

const reasons = [
  "Stable operation in monsoon-heavy weather",
  "Reduced downtime from water ingress failure",
  "Safer long-hour public advertising operation",
  "Lower emergency maintenance dependency",
];

const checklist = [
  "Confirm structure wind-load suitability",
  "Verify IP-grade claim and cabinet finish quality",
  "Inspect cable entry points and sealing consistency",
  "Review access plan for regular service",
  "Document safety: MCB, SPD, grounding and testing",
  "Confirm maintenance walkway and technician access safety around installation area",
];

const riskMatrix = [
  { risk: "Water ingress at cable entry", impact: "Short circuit and module failure", control: "Outdoor gland + sealed routing + periodic inspection" },
  { risk: "Power surge during storm", impact: "PSU/controller damage", control: "SPD, grounding verification, and protected distribution panel" },
  { risk: "Thermal stress in enclosed cabinets", impact: "Brightness drop and reduced component life", control: "Vent path, heat management, and load-balanced operation" },
  { risk: "Loose structure in high wind", impact: "Safety hazard and alignment loss", control: "Certified structure check and scheduled tightening audit" },
];

const maintenanceProtocol = [
  "Daily: visual status check, content continuity, and abnormal flicker scan.",
  "Weekly: cable route and connector-point inspection for moisture signs.",
  "Monthly: grounding continuity check and protection device health review.",
  "Quarterly: calibration and panel-level performance validation.",
  "Seasonal: pre-monsoon preventive service with sealing and drainage audit.",
];

const selectionGuide = [
  {
    t: "Location exposure class",
    d: "Classify site by rain, dust, wind, and direct sun exposure before final cabinet choice.",
  },
  {
    t: "Service access model",
    d: "Choose front/rear service based on installation height and maintenance feasibility.",
  },
  {
    t: "Power resilience level",
    d: "Plan panel-level protection based on local voltage stability and storm frequency.",
  },
  {
    t: "Operational duty cycle",
    d: "Higher daily runtime requires stronger thermal and preventive maintenance planning.",
  },
];

const waterproofFaqs = [
  {
    q: "Is IP rating enough to ensure long-term reliability?",
    a: "IP rating is important, but real reliability also depends on installation quality, cable sealing, grounding, and routine preventive checks.",
  },
  {
    q: "How often should waterproof outdoor screens be serviced?",
    a: "Service frequency depends on weather severity and operating hours, but periodic planned inspection is essential for stable uptime.",
  },
  {
    q: "Can standard outdoor setup be used in heavy monsoon zones?",
    a: "High-exposure zones generally need stronger waterproof and power protection planning to reduce failure risk and maintenance cost.",
  },
];

const ipGuideRows = [
  {
    rating: "IP65",
    protection: "Dust-tight front face + rain jet resistance",
    bestFor: "Standard roadside billboard and open-wall installations",
  },
  {
    rating: "IP66",
    protection: "Stronger water jet protection for exposed zones",
    bestFor: "High-rain routes, elevated structures, and storm-prone sites",
  },
  {
    rating: "IP67 (project-specific)",
    protection: "Temporary immersion-grade sealing scope",
    bestFor: "Special high-risk environments with engineered design review",
  },
];

const brightnessGuideRows = [
  {
    context: "Urban roadside with mixed shade",
    nits: "4,500-6,000 nits",
    note: "Balanced visibility for daytime and evening campaign readability.",
  },
  {
    context: "Open highway with strong daylight",
    nits: "6,000-8,000+ nits",
    note: "Higher brightness helps long-distance attention in direct sun.",
  },
  {
    context: "Night-focused communication zones",
    nits: "Adaptive with dimming control",
    note: "Auto-brightness helps comfort, compliance, and energy optimization.",
  },
];

const cityWeatherNotes = [
  {
    city: "Dhaka",
    condition: "Dust-heavy roads and dense traffic glare",
    focus: "Cabinet sealing check, filter cleaning cycle, and brightness tuning.",
  },
  {
    city: "Chattogram",
    condition: "Humidity and coastal corrosion risk",
    focus: "Anti-corrosion treatment and stronger connector protection.",
  },
  {
    city: "Sylhet",
    condition: "Frequent rainfall and moisture exposure",
    focus: "Drainage path audit and seasonal sealing inspection.",
  },
  {
    city: "Khulna",
    condition: "Heat and open-road exposure",
    focus: "Thermal management and power panel reliability checks.",
  },
  {
    city: "Rajshahi",
    condition: "Dry season dust and wide-road daytime exposure",
    focus: "Dust-control cleaning frequency and balanced brightness scheduling.",
  },
  {
    city: "Barishal",
    condition: "High humidity and frequent rain-cycle variation",
    focus: "Sealing integrity review and drainage-path reliability checks.",
  },
  {
    city: "Rangpur",
    condition: "Seasonal weather fluctuation and open-area visibility demand",
    focus: "Adaptive brightness policy and preventive power-panel inspection.",
  },
  {
    city: "Mymensingh",
    condition: "Mixed urban-road deployment with moisture and dust overlap",
    focus: "Connector protection routine and periodic cabinet sealing audit.",
  },
];

const waterproofMistakes = [
  "Selecting pitch and cabinet only by price without exposure analysis.",
  "Ignoring grounding and surge planning in storm-prone locations.",
  "Using non-rated cable entry parts in outdoor environments.",
  "Skipping pre-monsoon preventive inspection and drainage check.",
  "Deploying static brightness without day-night control strategy.",
  "Running without preventive cleaning schedule in dust-prone roadside locations.",
];

const waterproofLinks = [
  {
    href: "/led-display/outdoor/",
    anchor: "Outdoor LED Module Options",
    desc: "Compare outdoor models for roadmap and site-specific deployment.",
  },
  {
    href: "/led-display/",
    anchor: "Browse LED Display Categories",
    desc: "See all LED display options in one paginated grid.",
  },
  {
    href: "/led-display/billboard-led-display/",
    anchor: "Billboard LED Planning Guide",
    desc: "Review visibility, placement, and campaign-focused outdoor planning.",
  },
  {
    href: "/contact",
    anchor: "Request Outdoor LED Budget Support",
    desc: "Share site details before approving waterproof project budget.",
  },
  {
    href: "/contact",
    anchor: "Request Waterproof Site Survey",
    desc: "Share location and dimensions to get project-ready recommendation.",
  },
];

const whatIsWaterproofLedRows = [
  {
    title: "Outdoor LED built for harsh weather",
    detail:
      "A waterproof LED display uses sealed cabinet engineering to protect critical electronics from rain, moisture, and dust-heavy roadside conditions.",
  },
  {
    title: "Designed for stable long-hour visibility",
    detail:
      "It combines outdoor brightness strategy, thermal management, and protected power flow so content remains readable in daylight and variable climate.",
  },
  {
    title: "Suitable for open commercial communication",
    detail:
      "From billboard and shopfront branding to public information boards, waterproof screens support continuous operation in exposed locations.",
  },
];

const howWeWorkWaterproofSteps = [
  {
    title: "Site exposure and requirement review",
    detail:
      "We assess rain impact, dust level, sunlight direction, and viewing distance to define the right waterproof deployment strategy.",
  },
  {
    title: "Technical planning and scope finalization",
    detail:
      "IP-grade target, cabinet layout, structure model, power protection, and maintenance access are aligned with project budget and uptime goals.",
  },
  {
    title: "Installation, calibration, and safety checks",
    detail:
      "Our team completes installation, panel mapping, brightness tuning, and electrical safety validation before handover for live operation.",
  },
  {
    title: "Post-deployment monitoring and support",
    detail:
      "We define preventive maintenance schedule, inspection checkpoints, and response workflow to reduce downtime in weather-sensitive periods.",
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
    | "works"
    | "why"
    | "compare"
    | "checklist"
    | "risk"
    | "framework"
    | "maintenance"
    | "ip"
    | "brightness"
    | "city"
    | "mistakes"
    | "links"
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
    case "works":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16M12 4v16" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" {...stroke} />
        </svg>
      );
    case "why":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="m8.5 12.2 2.3 2.3 4.7-4.7" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
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
    case "checklist":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 5h12v14H6z" {...stroke} />
          <path d="m9 11 1.5 1.5L14 9M9 16h5" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "risk":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 3 3.5 19h17L12 3Z" {...stroke} strokeLinejoin="round" />
          <path d="M12 9v5M12 17h.01" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "framework":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 6h14M5 12h14M5 18h14" {...stroke} strokeLinecap="round" />
          <circle cx="8" cy="6" r="1.4" fill="currentColor" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
          <circle cx="16" cy="18" r="1.4" fill="currentColor" />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 14a6 6 0 0 0 12 0M12 8v6" {...stroke} strokeLinecap="round" />
          <path d="m9 10 3-3 3 3" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ip":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z" {...stroke} />
          <circle cx="12" cy="11" r="2.3" {...stroke} />
        </svg>
      );
    case "brightness":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="4" {...stroke} />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 20V9l4-2 3 2 3-2 4 2v11H5Z" {...stroke} />
          <path d="M9 13h.01M12 13h.01M15 13h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "mistakes":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M9 9l6 6M15 9l-6 6" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "links":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M10 14 8.2 15.8a3 3 0 1 1-4.2-4.2L6 9.6M14 10l1.8-1.8a3 3 0 1 1 4.2 4.2L18 14.4M8.5 12h7" {...stroke} strokeLinecap="round" />
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

export default function WaterproofOutdoorLedDisplayPage() {
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
            href: "/led-display/waterproof-outdoor-led-display/",
            label: "Waterproof Outdoor LED Display",
            current: true,
          },
        ]}
      />
      <section className="p-0">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Waterproof Outdoor LED Display Bangladesh</h1>
        <p className="mt-4 w-full text-sm leading-7 text-slate-600">
          <strong>Waterproof outdoor LED display</strong> is critical for Bangladesh environments where heavy rain, high
          humidity, road dust, and temperature variation can quickly reduce screen performance. This guide helps you
          plan a <strong>weatherproof LED screen</strong> setup using practical factors such as{" "}
          <strong>IP65/IP66 cabinet protection</strong>, front or rear service access, anti-corrosion structure, stable
          power distribution, grounding and surge protection, and ventilation strategy for continuous operation. Whether
          you are deploying an <strong>outdoor digital billboard</strong>, <strong>roadside branding screen</strong>,{" "}
          <strong>shopfront LED signage</strong>, or public information <strong>display</strong>, these checkpoints help
          you compare technical quality, reduce downtime risk, and maintain long-term brightness consistency with safer
          maintenance cost control.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="models" className="h-6 w-6 text-slate-800" />
          <span>Outdoor LED Display Models</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Outdoor model cards for waterproof-ready project planning, categorized by common deployment scenarios.
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
                    src={p.image}
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
          <span>What is waterproof LED display</span>
        </h2>
        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-3">
          {whatIsWaterproofLedRows.map((item) => (
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
          <span>How we work on waterproof LED display project</span>
        </h2>
        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-2">
          {howWeWorkWaterproofSteps.map((step, idx) => (
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
            <HeadingIcon kind="works" className="h-5 w-5 text-slate-800" />
            <span>How Waterproof Outdoor LED Display Works</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {protectionLayers.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="why" className="h-5 w-5 text-slate-800" />
            <span>Why You Should Use Waterproof Outdoor LED Display</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {reasons.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="compare" className="h-6 w-6 text-slate-800" />
          <span>Comparison: Standard Outdoor vs Waterproof Outdoor Display</span>
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="border-r border-slate-200 px-4 py-3">Parameter</th>
                <th className="border-r border-slate-200 px-4 py-3">Standard Outdoor</th>
                <th className="px-4 py-3">Waterproof Outdoor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100">
                <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">Weather tolerance</td>
                <td className="border-r border-slate-200 px-4 py-3">Moderate</td>
                <td className="px-4 py-3">High for rain and humidity scenarios</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">Maintenance risk</td>
                <td className="border-r border-slate-200 px-4 py-3">Higher in exposed sites</td>
                <td className="px-4 py-3">Lower when installed with correct safety stack</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">Best fit</td>
                <td className="border-r border-slate-200 px-4 py-3">Semi-covered installations</td>
                <td className="px-4 py-3">Roadside, rooftop, and open public zones</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="checklist" className="h-6 w-6 text-slate-800" />
          <span>Pre-Deployment Checklist for Waterproof Outdoor LED Display</span>
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm leading-7 text-slate-600">
          {checklist.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-4">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/led-display/outdoor/" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            Outdoor Product List
          </Link>
          <Link href="/contact" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900">
            Get Waterproof BOQ
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="risk" className="h-6 w-6 text-slate-800" />
          <span>Risk Matrix for Outdoor Waterproof LED Display Projects</span>
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="border-r border-slate-200 px-4 py-3">Risk</th>
                <th className="border-r border-slate-200 px-4 py-3">Possible Impact</th>
                <th className="px-4 py-3">Control Action</th>
              </tr>
            </thead>
            <tbody>
              {riskMatrix.map((row) => (
                <tr key={row.risk} className="border-t border-slate-100">
                  <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">{row.risk}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.impact}</td>
                  <td className="px-4 py-3">{row.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="framework" className="h-5 w-5 text-slate-800" />
            <span>Protection-Led Selection Framework for Waterproof LED</span>
          </h2>
          <div className="mt-3 space-y-3">
            {selectionGuide.map((item) => (
              <div key={item.t} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-bold text-slate-900">{item.t}</div>
                <p className="mt-1 text-sm leading-7 text-slate-600">{item.d}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="maintenance" className="h-5 w-5 text-slate-800" />
            <span>Maintenance Protocol by Timeline for Waterproof Outdoor LED</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {maintenanceProtocol.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-bold text-slate-900">Monsoon-Ready Service Priorities</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-7 text-slate-600">
              <li>- Recheck cabinet gasket compression and fastener tightness after heavy rainfall cycles.</li>
              <li>- Clean drain paths and rear ventilation zones to avoid trapped moisture and thermal stress.</li>
              <li>- Validate SPD, breaker trip behavior, and earth continuity after lightning-prone weeks.</li>
              <li>- Record recurring fault patterns in a service log to improve preventive visit planning.</li>
            </ul>
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="ip" className="h-6 w-6 text-slate-800" />
          <span>IP Rating Guide for Waterproof Outdoor LED Selection</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Choosing the right IP level helps align hardware durability with real weather exposure and maintenance workload.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="border-r border-slate-200 px-4 py-3">IP Level</th>
                <th className="border-r border-slate-200 px-4 py-3">Protection Scope</th>
                <th className="px-4 py-3">Best Fit Scenario</th>
              </tr>
            </thead>
            <tbody>
              {ipGuideRows.map((row) => (
                <tr key={row.rating} className="border-t border-slate-100">
                  <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">{row.rating}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.protection}</td>
                  <td className="px-4 py-3">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="brightness" className="h-6 w-6 text-slate-800" />
          <span>Outdoor Brightness (Nits) Planning by Deployment Context</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Correct nits planning improves readability and helps control power consumption across day and night cycles.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {brightnessGuideRows.map((row) => (
            <article key={row.context} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">{row.context}</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Suggested range:</strong> {row.nits}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">{row.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="city" className="h-6 w-6 text-slate-800" />
          <span>City-wise Waterproof Deployment Notes in Bangladesh</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Local weather and traffic profile can change protection strategy, support schedule, and operating stability.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {cityWeatherNotes.map((row) => (
            <div key={row.city} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900">{row.city}</div>
              <p className="mt-1 text-sm leading-7 text-slate-600">{row.condition}</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Technical focus:</strong> {row.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="mistakes" className="h-6 w-6 text-slate-800" />
          <span>Common Mistakes to Avoid in Waterproof LED Projects</span>
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm leading-7 text-slate-600">
          {waterproofMistakes.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="links" className="h-6 w-6 text-slate-800" />
          <span>Helpful Links Before Final Waterproof LED Decision</span>
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {waterproofLinks.map((item) => (
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
          <Link href="/contact" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            Request Waterproof Site Survey
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="nofollow noreferrer"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900"
          >
            WhatsApp Quick Estimate
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="faq" className="h-6 w-6 text-slate-800" />
          <span>Buyer FAQ: Waterproof Outdoor LED</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Quick answers to common questions before selecting IP rating, protection scope, and maintenance plan for Bangladesh weather conditions.
        </p>
        <div className="mt-5">
          <FaqAccordion items={waterproofFaqs} accent="#FF6A00" columns={2} />
        </div>
      </section>
    </main>
  );
}
