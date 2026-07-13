import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { rentalCatalog, type ProductItem } from "../../../lib/productsCatalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";

export const canonicalMetadata: Metadata = {
  title: "LED Screen Rent in Bangladesh",
  description:
    "LED screen rent in Bangladesh guide for events, conferences, stage programs, and temporary activations with rental planning checklist.",
  alternates: { canonical: "/led-display/rent-guide/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "LED Screen Rent in Bangladesh",
    description:
      "LED screen rent in Bangladesh guide for events, conferences, stage programs, and temporary activations with rental planning checklist.",
    url: "/led-display/rent-guide/",
    type: "article",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "LED Screen Rent in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Screen Rent in Bangladesh",
    description:
      "Plan LED screen rental projects in Bangladesh with setup, operation, and cost-efficiency guidance for temporary events.",
    images: [socialImageUrl()],
  },
};

const rentalAdvantages = [
  "No long-term ownership burden for short-term events",
  "Fast setup and dismantling for temporary venues",
  "Flexible screen size based on stage and audience layout",
  "Operational support available during event hours",
];

const rentalFlow = [
  "Share event type, venue details, and screen goal",
  "Confirm preferred size, pitch, and content source",
  "Finalize rigging, power, and playback responsibilities",
  "Install, map, and test before event opening",
  "Live monitoring and post-event dismantling",
];

const compareCards = [
  {
    t: "Rental LED",
    d: "Best for temporary use where event impact matters more than asset ownership.",
  },
  {
    t: "Permanent LED Purchase",
    d: "Best for continuous daily operation where long-term deployment is required.",
  },
];

const eventFitMatrix = [
  { type: "Corporate conference", fit: "High", note: "Presentation clarity and stage branding impact." },
  { type: "Product launch", fit: "High", note: "Dynamic media, countdowns, and campaign reveal flow." },
  { type: "Cultural program", fit: "High", note: "Visual backdrop and live content synchronization." },
  { type: "Short notice activation", fit: "Medium to high", note: "Depends on venue readiness and logistics timeline." },
];

const rentalCostBlocks = [
  {
    t: "Screen and control package",
    d: "Rental rate varies by pitch, screen size, controller level, and show duration.",
  },
  {
    t: "Rigging and setup labor",
    d: "Installation complexity, mounting method, and stage access influence deployment cost.",
  },
  {
    t: "Power and backup planning",
    d: "Load distribution, cabling, and backup strategy affect operational reliability and budget.",
  },
  {
    t: "On-site operation support",
    d: "Live event monitoring, content switching, and technical standby may be scoped separately.",
  },
];

const organizerChecklist = [
  "Confirm venue dimensions and load points before screen size finalization.",
  "Share media format and playback timeline at least before setup day.",
  "Define who handles live switching, cues, and emergency fallback content.",
  "Ensure stable power source and backup plan for uninterrupted event flow.",
  "Align setup, rehearsal, and dismantling slots with venue management.",
];

const rentalFaqs = [
  {
    q: "How early should I book LED screen rental?",
    a: "Advance booking is recommended, especially for peak seasons and large events where logistics and technical resources need coordination.",
  },
  {
    q: "Can rental LED support live camera feed and presentation together?",
    a: "Yes, with proper controller/processor planning, rental setups can handle mixed input workflows for event production.",
  },
  {
    q: "What if venue power is unstable?",
    a: "Power risk should be addressed through distribution planning and suitable backup strategy before event start.",
  },
  {
    q: "Is one rental setup suitable for all event types?",
    a: "No. Event format, audience distance, stage design, and content style usually require project-specific configuration.",
  },
];

const rentalPriceGuideRows = [
  {
    eventType: "Corporate conference",
    setupScale: "Medium stage with presenter and branding content",
    budgetTrend: "Controlled mid-range package",
    note: "Strong for presentation-led communication and sponsor visibility.",
  },
  {
    eventType: "Wedding and social event",
    setupScale: "Stage backdrop and live camera support",
    budgetTrend: "Varies by screen size and event duration",
    note: "Visual quality and smooth playback are primary priorities.",
  },
  {
    eventType: "Concert and large public show",
    setupScale: "Large stage screen with live switching",
    budgetTrend: "Higher due to scale and technical standby",
    note: "Requires robust control workflow and power backup planning.",
  },
  {
    eventType: "Expo and activation booth",
    setupScale: "Compact modular screen with looping campaign content",
    budgetTrend: "Flexible by booth size and schedule",
    note: "Useful for temporary high-attention promotional messaging.",
  },
];

const pitchDistanceGuideRows = [
  {
    zone: "Front audience zone",
    distance: "6-15 ft",
    recommendedPitch: "P2.6 / P2.9",
    reason: "Better detail for close-view text and presenter visuals.",
  },
  {
    zone: "Mid venue zone",
    distance: "15-35 ft",
    recommendedPitch: "P3 / P3.9",
    reason: "Balanced clarity and event-budget control.",
  },
  {
    zone: "Large hall / open venue rear",
    distance: "35 ft+",
    recommendedPitch: "P3.9+ based on venue format",
    reason: "Focuses on broad readability and scale efficiency.",
  },
];

const addOnCostRows = [
  { item: "Extra event-day extension", detail: "Additional hours or late shutdown can change final rental billing." },
  { item: "Advanced rigging support", detail: "Truss/hanging complexity increases setup manpower and safety scope." },
  { item: "Generator and power backup", detail: "Critical where venue supply is unstable or high-load video content is planned." },
  { item: "Dedicated live operator", detail: "Complex cue switching and multi-input productions may need specialist support." },
];

const venueUseCases = [
  {
    venue: "Convention center hall",
    fit: "Presentation, keynote, sponsor wall, and agenda graphics",
    focus: "Readable text layout and stable multi-input switching.",
  },
  {
    venue: "Outdoor temporary stage",
    fit: "Concert backdrop and public audience communication",
    focus: "Weather readiness and robust power distribution.",
  },
  {
    venue: "Wedding venue and community center",
    fit: "Live feed, highlights, and decorative stage visuals",
    focus: "Color quality and reliable operation across event timeline.",
  },
  {
    venue: "Expo booth and brand activation zone",
    fit: "Looping campaigns and product reveal messaging",
    focus: "Compact setup, quick deployment, and fast teardown.",
  },
];

const rentalTimelineSteps = [
  "Requirement intake and venue detail confirmation",
  "Screen size, pitch, and control workflow finalization",
  "Logistics, setup, and rehearsal scheduling alignment",
  "Event-day monitoring with technical standby",
  "Post-event safe dismantling and handover closeout",
];

const rentalMistakes = [
  "Booking screen size before checking real stage dimensions.",
  "Ignoring power backup in content-heavy live sessions.",
  "Using high-detail content without matching pixel pitch.",
  "Late media submission that reduces testing and rehearsal time.",
  "No fallback plan for emergency input or signal switching.",
];

const rentalLinks = [
  {
    href: "/led-display/rental-display/",
    anchor: "Rental LED Models by Pixel Pitch",
    desc: "Compare rental screen options for stage, conference, and event use.",
  },
  {
    href: "/led-display",
    anchor: "Browse LED Display Categories",
    desc: "Review all LED categories before choosing rent vs buy.",
  },
  {
    href: "/services-support/",
    anchor: "Installation and Support Planning",
    desc: "Understand technical service scope before booking.",
  },
  {
    href: "/contact",
    anchor: "Request Event LED Rental Quote",
    desc: "Share venue and event details to get project-based estimation.",
  },
];

const whatIsRentalLedRows = [
  {
    title: "Temporary high-impact display solution",
    detail:
      "Rental LED screen is a short-term display setup used for events where strong visual communication is needed without permanent ownership.",
  },
  {
    title: "Flexible by stage size and event format",
    detail:
      "The screen can be configured by venue width, audience distance, and content type, which makes it practical for concerts, conferences, and ceremonies.",
  },
  {
    title: "Includes technical setup and live operation support",
    detail:
      "A standard rental workflow usually covers installation, controller setup, testing, and on-site monitoring for smooth event-day playback.",
  },
];

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel"));
  if (!spec) return "Rental";
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

type RentalBadgeCategory = "Stage" | "Wedding" | "Corporate" | "Concert" | "Semi-Outdoor" | "Indoor";

function inferRentalCategory(p: ProductItem): RentalBadgeCategory {
  const s = `${p.title} ${p.subtitle} ${p.bestFor.join(" ")}`.toLowerCase();
  if (s.includes("wedding")) return "Wedding";
  if (s.includes("corporate") || s.includes("conference")) return "Corporate";
  if (s.includes("concert") || s.includes("music")) return "Concert";
  if (s.includes("semi")) return "Semi-Outdoor";
  if (s.includes("indoor")) return "Indoor";
  return "Stage";
}

function HeadingIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind:
    | "models"
    | "what"
    | "why"
    | "works"
    | "compare"
    | "matrix"
    | "cost"
    | "price"
    | "pitch"
    | "addon"
    | "venue"
    | "timeline"
    | "mistakes"
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
          <path d="M9.7 9.5a2.3 2.3 0 1 1 3.8 1.7c-.8.7-1.4 1-1.4 1.9" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="16.7" r="1" fill="currentColor" />
        </svg>
      );
    case "why":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="m8.5 12.2 2.3 2.3 4.7-4.7" {...stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "works":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 7h10M4 12h16M4 17h10" {...stroke} strokeLinecap="round" />
          <circle cx="16.5" cy="7" r="2" {...stroke} />
          <circle cx="19.5" cy="17" r="2" {...stroke} />
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
    case "matrix":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" {...stroke} />
          <path d="M4 10h16M4 14h16M10 5v14M15 5v14" {...stroke} />
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
          <path d="M5 6h14M5 12h14M5 18h14" {...stroke} strokeLinecap="round" />
          <circle cx="8" cy="6" r="1.4" fill="currentColor" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
          <circle cx="16" cy="18" r="1.4" fill="currentColor" />
        </svg>
      );
    case "pitch":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12h16M4 8h6M14 8h6M4 16h6M14 16h6" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "addon":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 5v14M5 12h14" {...stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" {...stroke} />
        </svg>
      );
    case "venue":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 20V9l4-2 3 2 3-2 4 2v11H5Z" {...stroke} />
          <path d="M9 13h.01M12 13h.01M15 13h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
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

export function RentGuideContent() {
  const waPhone = siteConfig.whatsapp.replace(/\D/g, "");
  const wa = `https://api.whatsapp.com/send/?phone=${waPhone}&text&type=phone_number&app_absent=0`;

  const rentalModels: ProductItem[] = [...rentalCatalog];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          {
            href: "/led-display/rent-guide/",
            label: "LED Screen Rent in Bangladesh",
            current: true,
          },
        ]}
      />
      <section className="p-0">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">LED Screen Rent in Bangladesh</h1>
        <p className="mt-4 w-full text-sm leading-7 text-slate-600">
          Looking for <strong>LED screen</strong> rent in Bangladesh for concerts, corporate conferences, wedding receptions, product
          launches, trade fairs, or brand activation campaigns? This guide helps you plan a reliable <strong>rental LED screen</strong>
          setup by comparing pixel pitch, screen size ratio, brightness level, hanging or ground-support structure,
          processor compatibility, backup power readiness, and live content switching workflow. You can also understand
          what matters in on-site technical support, setup timeline, dismantling safety, and event-day operation so your
          audience gets smooth visuals without downtime. Use these practical checkpoints to choose the right <strong>event LED
          display rental package</strong> with better performance, clearer pricing expectations, and less last-minute technical
          stress.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="models" className="h-6 w-6 text-slate-800" />
          <span>Rental LED Display Models</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Explore rental model cards for stage programs, live events, and temporary campaign setups.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rentalModels.map((p: ProductItem) => {
            const category = inferRentalCategory(p);
            const pitchDisplay = getPitchDisplay(p);

            return (
              <ProductGridCard
                key={p.slug}
                href={`/led-display/rental-display/${p.slug}/`}
                title={p.title}
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                }
                imageContainerClassName="bg-slate-100"
                borderColor="rgba(255,106,0,0.12)"
                topLeftBadge={{ text: "Rental", tone: "light" }}
                topRightBadge={{ text: category, tone: "dark" }}
                metaLines={[
                  { text: `Pixel pitch: ${pitchDisplay}` },
                  ...(p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []),
                ]}
                bullets={p.quickFeatures.slice(0, 4)}
                chips={p.bestFor.slice(0, 3)}
                accentColor="#FF6A00"
                contactHref="/contact"
                viewDetailsLabel="View details →"
              />
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="what" className="h-6 w-6 text-slate-800" />
          <span>What is rental LED screen</span>
        </h2>
        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-3">
          {whatIsRentalLedRows.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="why" className="h-5 w-5 text-slate-800" />
            <span>Why Rental LED Screen Makes Sense</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {rentalAdvantages.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="works" className="h-5 w-5 text-slate-800" />
            <span>How Rental LED Screen Delivery Works</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {rentalFlow.map((item, idx) => (
              <li key={item}>
                {idx + 1}. {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="compare" className="h-6 w-6 text-slate-800" />
          <span>Compare: Rental LED vs Buying</span>
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {compareCards.map((card) => (
            <article key={card.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">{card.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{card.d}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          For one-time or seasonal programs, rental often provides better cost control. For continuous operation, permanent
          installation can be more practical over the long run.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/led-display/rental-display/" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white">
            See Rental Models
          </Link>
          <Link href="/contact" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900">
            Get Rental Quotation
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="matrix" className="h-6 w-6 text-slate-800" />
          <span>Event Suitability Matrix for Rental LED Screen </span>
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Rental Fit</th>
                <th className="px-4 py-3">Why It Works</th>
              </tr>
            </thead>
            <tbody>
              {eventFitMatrix.map((row) => (
                <tr key={row.type} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                  <td className="px-4 py-3">{row.fit}</td>
                  <td className="px-4 py-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="cost" className="h-6 w-6 text-slate-800" />
          <span>Rental LED Screen Cost Structure Explained</span>
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rentalCostBlocks.map((item) => (
            <article key={item.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">{item.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="price" className="h-6 w-6 text-slate-800" />
          <span>Rental LED Price Guide by Event Type and Setup Scale</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Use this as a directional reference for <strong>LED screen rent price in Bangladesh</strong>. Final package
          depends on show duration, screen dimension, and support scope.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Typical Setup</th>
                <th className="px-4 py-3">Budget Trend</th>
                <th className="px-4 py-3">Rental Note</th>
              </tr>
            </thead>
            <tbody>
              {rentalPriceGuideRows.map((row) => (
                <tr key={row.eventType} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.eventType}</td>
                  <td className="px-4 py-3">{row.setupScale}</td>
                  <td className="px-4 py-3">{row.budgetTrend}</td>
                  <td className="px-4 py-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="pitch" className="h-6 w-6 text-slate-800" />
          <span>Pixel Pitch Selection by Audience Distance (Rental Events)</span>
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {pitchDistanceGuideRows.map((row) => (
            <article key={row.zone} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">{row.zone}</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Distance:</strong> {row.distance}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <strong>Recommended pitch:</strong> {row.recommendedPitch}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">{row.reason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="addon" className="h-5 w-5 text-slate-800" />
            <span>Common Add-on Costs in Event LED Rental Packages</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {addOnCostRows.map((row) => (
              <li key={row.item}>
                <span className="font-semibold text-slate-900">{row.item}:</span> {row.detail}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-slate-900">Quick Budget Protection Notes</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-7 text-slate-600">
              <li>- Lock overtime terms and extension rates before event-day operation starts.</li>
              <li>- Confirm operator duty scope for live switching, cue handling, and backup playback.</li>
              <li>- Keep a power contingency plan to avoid emergency technical add-on expenses.</li>
            </ul>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="venue" className="h-5 w-5 text-slate-800" />
            <span>Venue-wise Rental LED Deployment Notes</span>
          </h2>
          <div className="mt-3 space-y-3">
            {venueUseCases.map((row) => (
              <div key={row.venue} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-sm font-bold text-slate-900">{row.venue}</div>
                <p className="mt-1 text-sm leading-7 text-slate-600">{row.fit}</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  <strong>Technical focus:</strong> {row.focus}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="timeline" className="h-5 w-5 text-slate-800" />
            <span>Event-day Execution Timeline for Rental LED Setup</span>
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {rentalTimelineSteps.map((item, idx) => (
              <li key={item}>
                {idx + 1}. {item}
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="mistakes" className="h-5 w-5 text-slate-800" />
            <span>Mistakes to Avoid Before Final Rental Confirmation</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {rentalMistakes.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="links" className="h-6 w-6 text-slate-800" />
          <span>Helpful Links Before Booking Rental LED Screen</span>
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {rentalLinks.map((item) => (
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
            Book Event LED Screen Consultation
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="nofollow noreferrer"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900"
          >
            WhatsApp Instant Estimate
          </a>
        </div>
      </section>

      <section className="mt-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HeadingIcon kind="checklist" className="h-5 w-5 text-slate-800" />
            <span>Organizer Preparation Checklist for Rental LED Screen</span>
          </h2>
          <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600 md:grid-cols-2">
            {organizerChecklist.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <HeadingIcon kind="faq" className="h-6 w-6 text-slate-800" />
          <span>LED Rental FAQ</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Quick answers before booking: timeline, live switching, power readiness, and event-day technical planning.
        </p>
        <div className="mt-5">
          <FaqAccordion items={rentalFaqs} accent="#FF6A00" columns={2} />
        </div>
      </section>
    </main>
  );
}

export default function LegacyLedScreenRentPage() {
  permanentRedirect("/led-display/rent-guide/");
}

