import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { indoorCatalog, outdoorCatalog, type ProductItem } from "../../../lib/productsCatalog";
import { BRAND_NAME } from "@/lib/brand";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProductGridCard from "@/components/products/ProductGridCard";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";

export const canonicalMetadata: Metadata = {
  title: "LED Display Screen Price in Bangladesh",
  description:
    "Explore LED display screen price in Bangladesh with practical pricing drivers, budgeting steps, and category comparison for indoor, outdoor, and rental use.",
  alternates: { canonical: "/led-display/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "LED Display Screen Price in Bangladesh",
    description:
      "Explore LED display screen price in Bangladesh with practical pricing drivers, budgeting steps, and category comparison for indoor, outdoor, and rental use.",
    url: "/led-display/",
    type: "article",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "LED Display Screen Price in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Display Screen Price in Bangladesh",
    description:
      "Understand what affects LED display screen price in Bangladesh and plan your project budget with confidence.",
    images: [socialImageUrl()],
  },
};

const priceFactors = [
  "Pixel pitch and target viewing distance",
  "Indoor vs outdoor build standard",
  "Cabinet type and service access method",
  "Controller ecosystem and signal processing",
  "Installation structure and power safety scope",
];

const processSteps = [
  "Define objective: branding, information, event, or control room usage",
  "Select category: indoor, outdoor, or rental by environment",
  "Estimate size and resolution based on distance and readability",
  "Request BOQ with installation, calibration, and support line items",
  "Finalize price-performance balance before procurement",
];

const compareRows = [
  { item: "Indoor LED", cost: "Medium to high", bestFor: "Close viewing and detail-heavy content" },
  { item: "Outdoor LED", cost: "Medium to high", bestFor: "Roadside visibility and weather exposure" },
  { item: "Rental LED", cost: "Project based", bestFor: "Temporary events and flexible setup" },
];

const optimizationTips = [
  {
    t: "Choose pitch by real distance, not assumption",
    d: "Overly fine pitch can inflate cost without visible benefit at longer viewing ranges.",
  },
  {
    t: "Scope installation items early",
    d: "Structure, power safety, and signal routing should be estimated in the first BOQ draft.",
  },
  {
    t: "Prioritize stability parts",
    d: "Reliable power supply and control components reduce recurring service interruptions.",
  },
  {
    t: "Plan lifecycle, not only first purchase",
    d: "Service access and spare strategy influence long-term operating cost and uptime.",
  },
];

const hiddenCostRows = [
  { k: "Structure and mounting", v: "Depends on site condition, screen weight, and service-access method." },
  { k: "Electrical safety", v: "Grounding, MCB distribution, and surge protection are often excluded in rough quotes." },
  { k: "Signal and control", v: "Processor/controller upgrades may be needed for complex content workflows." },
  { k: "Calibration and commissioning", v: "Color mapping and final tuning impact perceived quality after install." },
  { k: "Post-installation support", v: "Maintenance SLA, spare planning, and response timeline affect total value." },
];

const procurementChecklist = [
  "Verify quotation includes technical model and quantity mapping.",
  "Check whether installation, testing, and handover are clearly listed.",
  "Confirm warranty terms by component category.",
  "Ask for preventive maintenance scope and expected response timeline.",
  "Review power requirement, earthing, and protection notes before approval.",
];

const buyerFaqs = [
  {
    q: "What is the most important factor for LED screen price?",
    a: "Pixel pitch and total screen area usually drive base cost, but installation and power safety can significantly affect final budget.",
  },
  {
    q: "How can I reduce budget without harming quality?",
    a: "Match pitch with real viewing distance, keep a stable control ecosystem, and optimize non-visible extras instead of compromising core components.",
  },
  {
    q: "Is cheap quotation always better for the same size?",
    a: "Not necessarily. Quotation scope can differ in controller quality, power architecture, installation standard, and after-sales commitments.",
  },
  {
    q: "Should I plan support before purchase?",
    a: "Yes. Defining maintenance process and spare strategy in advance helps avoid downtime and emergency costs later.",
  },
];

const pitchPriceRows = [
  {
    pitch: "P1.25 - P1.53",
    useCase: "Premium indoor boardroom, studio, control room",
    indoorRange: "Higher range",
    outdoorRange: "Rarely preferred",
    rentalRange: "High project cost",
  },
  {
    pitch: "P2.5 - P3",
    useCase: "Retail display, conference hall, event stage",
    indoorRange: "Medium to high",
    outdoorRange: "Medium (site-dependent)",
    rentalRange: "Popular and balanced",
  },
  {
    pitch: "P4 - P5",
    useCase: "Roadside branding, medium-distance visibility",
    indoorRange: "Medium",
    outdoorRange: "Medium to high",
    rentalRange: "Common for medium events",
  },
  {
    pitch: "P6 - P10",
    useCase: "Highway billboard, long-distance communication",
    indoorRange: "Low demand",
    outdoorRange: "Cost-efficient per area",
    rentalRange: "Selective, event-specific",
  },
];

const priceUnitGuideRows = [
  {
    model: "Per Sqft Estimate",
    goodFor: "Initial budgeting and management discussion",
    limitation: "Does not show controller, structure, or install scope in detail",
  },
  {
    model: "Per Module Estimate",
    goodFor: "Technical planning and exact quantity calculation",
    limitation: "Needs full design map, power plan, and cabinet count",
  },
  {
    model: "Full BOQ Estimate",
    goodFor: "Final approval and procurement decision",
    limitation: "Takes more time but gives the most accurate project total",
  },
];

const cityDemandRows = [
  {
    city: "Dhaka",
    demand: "Retail signage, corporate display, control room wall, event stage",
    focus: "High brightness indoor + managed rental workflow",
  },
  {
    city: "Chattogram",
    demand: "Port-area branding, commercial outdoor billboard, showroom display",
    focus: "Weather-ready cabinets and stable power architecture",
  },
  {
    city: "Sylhet",
    demand: "Hospitality signage, community event stage, corporate info screen",
    focus: "Balanced pitch selection with service-friendly access",
  },
  {
    city: "Khulna",
    demand: "Industrial communication board, roadside advertisement, event setup",
    focus: "Long-hour durability and preventive maintenance planning",
  },
];

const sampleBoqRows = [
  { item: "LED module + cabinet", scope: "Model specific quantity mapping", note: "Core hardware cost" },
  { item: "Processor/controller", scope: "Input-output and content workflow", note: "Affects stability and quality" },
  { item: "Power and protection", scope: "SMPS, DB, breaker, earthing, SPD", note: "Safety critical" },
  { item: "Structure and mounting", scope: "Wall frame / stand / hanging", note: "Site dependent" },
  { item: "Installation and calibration", scope: "Assembly, mapping, color tuning", note: "Final output quality" },
  { item: "Transport and logistics", scope: "Delivery, loading, unloading", note: "Can vary by location" },
  { item: "Warranty and support", scope: "Parts coverage and response terms", note: "Long-term value factor" },
];

const amcPlans = [
  {
    tier: "Basic preventive support",
    includes: "Periodic health check + remote guidance",
    budget: "Lower yearly commitment",
  },
  {
    tier: "Standard maintenance plan",
    includes: "Scheduled inspection + priority troubleshooting",
    budget: "Balanced yearly budget",
  },
  {
    tier: "Business continuity plan",
    includes: "Faster response + spare readiness + routine calibration",
    budget: "Higher but uptime-focused",
  },
];

const caseSnippets = [
  {
    title: "Retail showroom communication wall",
    detail: "Indoor LED setup improved product visibility and in-store campaign response with controlled daily content updates.",
  },
  {
    title: "Roadside outdoor branding display",
    detail: "Weather-ready outdoor board improved day/night readability and brand recall in high-traffic viewing zones.",
  },
  {
    title: "Rental event stage package",
    detail: "Temporary LED stage deployment delivered smooth live visuals with coordinated setup, control workflow, and dismantling.",
  },
];

const guideLinks = [
  { href: "/led-display/indoor-led/", anchor: "Indoor LED Display Price Guide", desc: "Close-view screen planning and budget context." },
  { href: "/led-display/outdoor/", anchor: "Outdoor LED Module Price", desc: "Roadside and billboard-oriented budget planning." },
  { href: "/led-display/rental-display/", anchor: "Rental LED Screen Package", desc: "Stage and temporary event package options." },
  { href: "/led-display/", anchor: "Browse LED Display Categories", desc: "See indoor, outdoor, rental and accessories in one list." },
  { href: "/contact", anchor: "Get Exact Price by Project Size", desc: "Share size and use case to receive project quote." },
];

const howWeWorkSteps = [
  {
    title: "Requirement and site understanding",
    detail:
      "We start by understanding your use case, viewing distance, content type, and site constraints so the recommendation fits real business goals.",
  },
  {
    title: "Technical and budget alignment",
    detail:
      "Pixel pitch, brightness level, cabinet structure, control workflow, and installation scope are mapped into a practical budget range.",
  },
  {
    title: "Transparent quotation and BOQ",
    detail:
      "You receive a clear scope with hardware, safety, installation, calibration, and support notes to avoid hidden cost surprises later.",
  },
  {
    title: "Execution, handover, and support",
    detail:
      "After installation and testing, we complete calibration, operator guidance, and after-sales support planning for stable long-term operation.",
  },
];

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel"));
  if (!spec) return "LED";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

type IndoorBadgeCategory = "Showroom" | "Conference" | "Control Room" | "Studio" | "Retail";
type OutdoorBadgeCategory = "Billboard" | "Rooftop" | "Facade" | "Roadside" | "Public Screen";

function inferIndoorCategory(p: ProductItem): IndoorBadgeCategory {
  if (p.useCaseTag) return p.useCaseTag as IndoorBadgeCategory;
  const s = `${p.bestFor.join(" ")} ${p.title} ${p.subtitle}`.toLowerCase();
  if (s.includes("control")) return "Control Room";
  if (s.includes("studio") || s.includes("broadcast") || s.includes("tv")) return "Studio";
  if (s.includes("conference") || s.includes("meeting") || s.includes("boardroom")) return "Conference";
  if (s.includes("showroom") || s.includes("lobby") || s.includes("reception")) return "Showroom";
  return "Retail";
}

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
    | "workflow"
    | "advantage"
    | "pricing"
    | "budget"
    | "compare"
    | "optimize"
    | "hidden"
    | "pitch"
    | "unit"
    | "city"
    | "boq"
    | "maintenance"
    | "snippets"
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
    case "workflow":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 7h10M4 12h16M4 17h10" {...stroke} strokeLinecap="round" />
          <circle cx="16.5" cy="7" r="2" {...stroke} />
          <circle cx="19.5" cy="17" r="2" {...stroke} />
        </svg>
      );
    case "advantage":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="m8.5 12.2 2.3 2.3 4.7-4.7" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" {...stroke} />
          <path d="M8 10h8M8 14h5" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "budget":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 6h14M5 12h14M5 18h14" {...stroke} strokeLinecap="round" />
          <circle cx="8" cy="6" r="1.4" fill="currentColor" />
          <circle cx="16" cy="12" r="1.4" fill="currentColor" />
          <circle cx="12" cy="18" r="1.4" fill="currentColor" />
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
    case "optimize":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16M12 4v16" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" {...stroke} />
        </svg>
      );
    case "hidden":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" {...stroke} />
          <circle cx="12" cy="12" r="2.5" {...stroke} />
        </svg>
      );
    case "pitch":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" {...stroke} />
          <path d="M8 8h8M8 12h8M8 16h5" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "unit":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 7h16M4 17h16M7 4v16M17 4v16" {...stroke} />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z" {...stroke} />
          <circle cx="12" cy="11" r="2.3" {...stroke} />
        </svg>
      );
    case "boq":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 3h9l3 3v15H6z" {...stroke} />
          <path d="M15 3v4h3M9 11h6M9 15h6" {...stroke} strokeLinecap="round" />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M6 14a6 6 0 0 0 12 0M12 8v6" {...stroke} strokeLinecap="round" />
          <path d="m9 10 3-3 3 3" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "snippets":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" {...stroke} />
          <path d="M8 10h8M8 14h6" {...stroke} strokeLinecap="round" />
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

export function PriceGuideBangladeshContent() {
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
      <section className="p-0">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">LED Screen Price in Bangladesh</h1>
        <p className="mt-4 w-full text-sm leading-7 text-slate-600">
          Explore current <strong>LED screen</strong> price in Bangladesh with a practical buying framework for indoor{" "}
          <strong>LED display</strong>, outdoor LED billboard, and <strong>rental LED screen</strong> projects. This
          guide explains how pixel pitch, module size, <strong>nits brightness</strong>, refresh rate, cabinet
          durability, controller compatibility, and installation complexity shape your final budget beyond basic
          per-square-foot estimates. Whether you need a <strong>digital signage solution</strong> for a showroom, a
          high-visibility <strong>advertising display</strong> for roadside branding, or an event-ready{" "}
          <strong>stage screen</strong>, you can use these cost factors to compare quotation quality, avoid hidden
          setup expenses, and choose a reliable performance-to-price balance for long-term operation in Bangladesh.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="models" className="h-6 w-6 text-slate-800" />
          <span>Indoor and Outdoor LED Display Models</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Browse model cards by environment to compare fit, features, and usage context before final budgeting.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {indoorCatalog.map((p) => {
            const pitchLabel = getPitchLabel(p);
            const category = inferIndoorCategory(p);
            return (
              <ProductGridCard
                key={`indoor-${p.slug}`}
                href={`/led-display/indoor-led/${p.slug}/`}
                title={p.title}
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                }
                imageContainerClassName="bg-slate-50"
                borderColor="rgba(255,106,0,0.12)"
                topLeftBadge={{ text: "Indoor", tone: "light" }}
                topRightBadge={{ text: pitchLabel, tone: "dark" }}
                metaLines={[
                  { text: `Pixel pitch: ${pitchLabel}` },
                  ...(p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []),
                ]}
                bullets={p.quickFeatures?.length ? p.quickFeatures.slice(0, 4) : [p.subtitle]}
                chips={p.bestFor?.length ? p.bestFor.slice(0, 3) : [category]}
                accentColor="#FF6A00"
                contactHref="/contact"
                viewDetailsLabel="View details ->"
              />
            );
          })}

          {outdoorCatalog.map((p) => {
            const pitchLabel = getPitchLabel(p);
            const category = inferOutdoorCategory(p);
            const objectPosition = imageObjectPositionBySlug[p.slug] ?? "50% 50%";
            return (
              <ProductGridCard
                key={`outdoor-${p.slug}`}
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
                topRightBadge={{ text: pitchLabel, tone: "dark" }}
                metaLines={[
                  { text: `Pixel pitch: ${pitchLabel}` },
                  ...(p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []),
                ]}
                bullets={p.quickFeatures?.length ? p.quickFeatures.slice(0, 4) : [p.subtitle]}
                chips={p.bestFor?.length ? p.bestFor.slice(0, 3) : [category]}
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
          <HeadingIcon kind="workflow" className="h-6 w-6 text-slate-800" />
          <span>How We Work on LED Display Projects</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Our workflow is designed to keep <strong>LED display price planning</strong> practical, transparent, and
          performance-focused from consultation to final deployment.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {howWeWorkSteps.map((step, idx) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#FF6A00]">Step {idx + 1}</div>
              <h3 className="mt-1 text-base font-extrabold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="advantage" className="h-5 w-5 text-slate-800" />
            <span>Advantages of LED Screen Planned Pricing</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li>- Reduces overspending on unnecessary specification upgrades.</li>
            <li>- Prevents under-spec purchase that hurts visibility quality.</li>
            <li>- Improves lifecycle value with proper support and maintenance scope.</li>
            <li>- Makes quotation comparison more transparent across vendors.</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="pricing" className="h-5 w-5 text-slate-800" />
            <span>How Pricing of LED Screen Is Determined</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {priceFactors.map((factor) => (
              <li key={factor}>- {factor}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="budget" className="h-6 w-6 text-slate-800" />
          <span>How to Work Out the Right Budget of LED Screen</span>
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {processSteps.map((step, idx) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="text-xs font-bold text-[#FF6A00]">Step {idx + 1}</div>
              <div className="mt-1 leading-6">{step}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="compare" className="h-6 w-6 text-slate-800" />
          <span>Which Category Matches Your Need for LED Screen</span>
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="border-r border-slate-200 px-4 py-3">Category</th>
                <th className="border-r border-slate-200 px-4 py-3">Price Trend</th>
                <th className="px-4 py-3">Best Use</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.item} className="border-t border-slate-100">
                  <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">{row.item}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.cost}</td>
                  <td className="px-4 py-3">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link prefetch={false} href="/contact" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            View Full Price Guide
          </Link>
          <Link prefetch={false} href="/contact" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900">
            Request Project Quotation
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="optimize" className="h-6 w-6 text-slate-800" />
          <span>LED Screen Cost Optimization Without Quality Drop</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          A strong LED budget is not about choosing the lowest number. It is about selecting the right technical level
          for your use case and avoiding avoidable long-term cost drivers.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {optimizationTips.map((tip) => (
            <article key={tip.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">{tip.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{tip.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="hidden" className="h-6 w-6 text-slate-800" />
          <span>Commonly Missed Cost Components for LED Screen</span>
        </h2>
        <div className="mt-4 grid gap-3">
          {hiddenCostRows.map((row) => (
            <div key={row.k} className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3 md:items-center md:gap-4">
              <div className="text-sm font-bold text-slate-900">{row.k}</div>
              <p className="text-sm leading-7 text-slate-600 md:col-span-2">{row.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="pitch" className="h-6 w-6 text-slate-800" />
          <span>Price Range Table by Pixel Pitch and Use Case</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Use this as a planning reference for <strong>LED screen price in Bangladesh</strong>. Actual quotation depends
          on project size, site condition, and hardware scope.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="border-r border-slate-200 px-4 py-3">Pixel Pitch</th>
                <th className="border-r border-slate-200 px-4 py-3">Typical Use Case</th>
                <th className="border-r border-slate-200 px-4 py-3">Indoor Price Trend</th>
                <th className="border-r border-slate-200 px-4 py-3">Outdoor Price Trend</th>
                <th className="px-4 py-3">Rental Price Trend</th>
              </tr>
            </thead>
            <tbody>
              {pitchPriceRows.map((row) => (
                <tr key={row.pitch} className="border-t border-slate-100">
                  <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-900">{row.pitch}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.useCase}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.indoorRange}</td>
                  <td className="border-r border-slate-200 px-4 py-3">{row.outdoorRange}</td>
                  <td className="px-4 py-3">{row.rentalRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="unit" className="h-6 w-6 text-slate-800" />
          <span>Per Sqft vs Per Module Pricing: Which One to Use</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Many buyers compare <strong>indoor LED display price</strong> or <strong>outdoor LED billboard price</strong>{" "}
          with per-sqft numbers. For procurement accuracy, combine both methods with full BOQ.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {priceUnitGuideRows.map((row) => (
            <article key={row.model} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">{row.model}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                <strong>Good for:</strong> {row.goodFor}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Limitation:</strong> {row.limitation}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="city" className="h-6 w-6 text-slate-800" />
          <span>City-wise Demand and Use Cases in Bangladesh</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Local project type affects solution design and budget. This also helps cover intent like{" "}
          <strong>LED display price in Dhaka</strong> and <strong>digital billboard Bangladesh</strong>.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {cityDemandRows.map((row) => (
            <div key={row.city} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900">{row.city}</div>
              <p className="mt-1 text-sm leading-7 text-slate-600">{row.demand}</p>
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
            <HeadingIcon kind="boq" className="h-5 w-5 text-slate-800" />
            <span>Sample BOQ / Quotation Format</span>
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            A clear BOQ format improves quotation trust and helps avoid mismatch during approval and installation.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-3 py-2">Line Item</th>
                  <th className="px-3 py-2">Scope</th>
                  <th className="px-3 py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {sampleBoqRows.map((row) => (
                  <tr key={row.item} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-semibold text-slate-900">{row.item}</td>
                    <td className="px-3 py-2">{row.scope}</td>
                    <td className="px-3 py-2">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="maintenance" className="h-5 w-5 text-slate-800" />
            <span>Maintenance and AMC Cost Planning</span>
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Long-term planning matters for <strong>LED display maintenance cost Bangladesh</strong>. Choose support depth
            by expected uptime and business impact.
          </p>
          <div className="mt-3 space-y-3">
            {amcPlans.map((plan) => (
              <div key={plan.tier} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-sm font-bold text-slate-900">{plan.tier}</div>
                <p className="mt-1 text-sm leading-7 text-slate-600">{plan.includes}</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  <strong>Budget trend:</strong> {plan.budget}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="snippets" className="h-6 w-6 text-slate-800" />
          <span>Recent Project-Style Snippets</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          These short examples show how requirement, environment, and operation model affect real project decisions.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {caseSnippets.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="links" className="h-6 w-6 text-slate-800" />
          <span>Next Step Links for Exact Planning</span>
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {guideLinks.map((item) => (
            <Link prefetch={false}
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
          <Link prefetch={false} href="/contact" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            Get Exact Price by Project Size
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="nofollow noreferrer"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900"
          >
            WhatsApp Quick Quote
          </a>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          Last content refresh: March 5, 2026. Pricing intent guidance may vary by import cycle, brand selection, and site-specific requirements.
        </p>
      </section>

      <section className="mt-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="checklist" className="h-5 w-5 text-slate-800" />
            <span>LED Screen Procurement Review Checklist</span>
          </h2>
          <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600 md:grid-cols-2">
            {procurementChecklist.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="faq" className="h-6 w-6 text-slate-800" />
          <span>Buyer FAQ</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Quick answers to common questions before approving a quotation and finalizing your LED screen purchase plan.
        </p>
        <div className="mt-5">
          <FaqAccordion items={buyerFaqs} accent="#FF6A00" columns={2} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `https://${siteConfig.domain}/` },
                  { "@type": "ListItem", position: 2, name: "LED Display", item: `https://${siteConfig.domain}/led-display/` },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "LED Screen Price in Bangladesh",
                    item: `https://${siteConfig.domain}/led-display/`,
                  },
                ],
              },
              {
                "@type": "Service",
                name: "LED Screen Price Planning and Quotation Support",
                areaServed: "Bangladesh",
                provider: { "@type": "Organization", name: BRAND_NAME },
                serviceType: "Indoor, Outdoor, and Rental LED Display Planning",
              },
            ],
          }),
        }}
      />
    </main>
  );
}

export default function LegacyLedDisplayScreenPricePage() {
  permanentRedirect("/led-display/");
}
