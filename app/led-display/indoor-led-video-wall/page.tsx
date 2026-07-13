import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { getProductsByCategory } from "../../../lib/productsCatalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import IndoorFilterSection from "@/components/products/IndoorFilterSection";
import FaqAccordion from "@/components/common/FaqAccordion";
import { socialImageUrl } from "@/lib/seo";

type TitleIconName =
  | "display"
  | "building"
  | "dashboard"
  | "store"
  | "meeting"
  | "plan"
  | "distance"
  | "pitch"
  | "design"
  | "reliability"
  | "steps"
  | "faq";

function TitleIcon({
  name,
  className = "h-5 w-5 text-slate-800",
}: {
  name: TitleIconName;
  className?: string;
}) {
  const base = `inline-block ${className}`;

  switch (name) {
    case "display":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 7h4M7 10h4M13 7h4M13 10h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" stroke="currentColor" strokeWidth="1.8" />
          <path d="M17 20v-9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 8h2M8 11h2M8 14h2M12 8h2M12 11h2M12 14h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 15v-4M12 15v-7M17 15v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 10h16l-1.2-5.2A2 2 0 0 0 16.85 3H7.15A2 2 0 0 0 5.2 4.8L4 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M5 10v10h14V10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "meeting":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 19v-1a4 4 0 0 1 4-4h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M10 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 12h6M14 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "plan":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M7 4h10a2 2 0 0 1 2 2v14H5V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 3h6v3H9V3Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "distance":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 12c2.4-3.6 5.1-5.4 8-5.4S17.6 8.4 20 12c-2.4 3.6-5.1 5.4-8 5.4S6.4 15.6 4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 20h6M15 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 20v-2M15 20v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "pitch":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 18v-3M10 18v-5M14 18v-4M18 18v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 6h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 6v3M9 6v2M12 6v3M15 6v2M18 6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 18V8a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M13 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 12l6-6a2 2 0 0 1 2.8 2.8l-6 6-3.8 1L12 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "reliability":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "steps":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <path d="M5 7h3M5 12h3M5 17h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M10 7h9M10 12h9M10 17h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 7a1 1 0 1 0 0.01 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 12a1 1 0 1 0 0.01 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 17a1 1 0 1 0 0.01 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "faq":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="16.8" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export const canonicalMetadata: Metadata = {
  title: "Indoor LED Video Wall in Bangladesh | Showroom & Shop",
  description:
    "Indoor LED video wall guide with pixel pitch planning, screen size tips, content strategy, and installation notes for Bangladesh projects.",
  alternates: { canonical: "/led-display/indoor-led-video-wall-guide/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Indoor LED Video Wall in Bangladesh | Showroom & Shop",
    description:
      "Indoor LED video wall guide with pixel pitch planning, screen size tips, content strategy, and installation notes for Bangladesh projects.",
    url: "/led-display/indoor-led-video-wall-guide/",
    type: "article",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "Indoor LED Video Wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indoor LED Video Wall",
    description:
      "Plan an indoor LED video wall with practical guidance on pixel pitch, viewing distance, content layout, and installation requirements.",
    images: [socialImageUrl()],
  },
};

const useCases = [
  {
    icon: "building" as const,
    t: "Corporate lobbies and reception zones",
    d: "Create a premium first impression with brand stories, highlights, and rotating announcements.",
  },
  {
    icon: "dashboard" as const,
    t: "Control rooms and monitoring centers",
    d: "Support 24/7 visibility with clear data zones and readable layouts from multiple seating positions.",
  },
  {
    icon: "store" as const,
    t: "Showrooms and experience centers",
    d: "Demonstrate products, portfolio visuals, and campaigns with vivid full-wall presentation.",
  },
  {
    icon: "meeting" as const,
    t: "Conference and board rooms",
    d: "Enable high-impact presentations, hybrid meetings, and live dashboards with crisp readability.",
  },
];

const planningFactors = [
  "Viewing distance and screen size must align to pick the correct pixel pitch.",
  "Ambient light and wall finish affect brightness selection and content contrast.",
  "Signal workflow (HDMI, SDI, or media server) should match content format needs.",
  "Mounting structure and ventilation planning protect long-term performance.",
  "Front service access simplifies maintenance without wall demolition.",
];

const pitchGuide = [
  { k: "P1.2 - P1.5", v: "Ultra close viewing, premium meeting rooms, and boardrooms." },
  { k: "P1.8 - P2.5", v: "General corporate lobbies, showrooms, and multi-purpose halls." },
  { k: "P3 - P4", v: "Larger indoor halls where viewing distance is longer." },
];

const contentRules = [
  "Use high-contrast typography and avoid overly thin text styles.",
  "Keep key messages in safe zones for camera and audience visibility.",
  "Limit fast flashing elements to reduce eye fatigue in indoor spaces.",
  "Match content resolution to the wall aspect ratio to avoid stretching.",
];

const installationSteps = [
  "Site survey and wall load check",
  "Screen size and pitch confirmation",
  "Power, network, and controller planning",
  "Mounting, calibration, and color tuning",
  "Operator training and maintenance schedule",
];

const faqs = [
  {
    q: "What pixel pitch is best for an indoor LED video wall?",
    a: "Choose pitch based on average viewing distance. Smaller pitch is needed for close viewing and premium rooms.",
  },
  {
    q: "Can an indoor LED wall run 24/7?",
    a: "Yes, with proper power design, ventilation, and scheduled maintenance checks.",
  },
  {
    q: "Is front service access important?",
    a: "Yes. It reduces downtime and avoids removing the wall for repairs.",
  },
];

export function IndoorLedVideoWallBangladeshContent() {
  const indoorModels = getProductsByCategory("indoor");

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          {
            href: "/led-display/indoor-led-video-wall-bangladesh/",
            label: "Indoor LED Video Wall",
            current: true,
          },
        ]}
      />
      <section className="p-0">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Indoor LED Video Wall</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          An <strong>indoor LED video wall</strong> is built for clear, high-impact messaging inside offices, showrooms,
          control rooms, and premium public spaces. This guide helps you plan the right <strong>screen size</strong>,
          <strong>pixel pitch</strong>, and <strong>content layout</strong> based on viewing distance, ambient light,
          and daily usage hours. You will also learn how controller selection, power safety, and maintenance access
          affect long-term performance so your <strong>indoor LED screen wall</strong> stays sharp, reliable, and easy
          to operate across Bangladesh projects.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E45700] hover:shadow-md"
          >
            Request a Free Quotation →
          </Link>
          <Link
            href="/led-display/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
          >
            Browse LED display categories →
          </Link>
        </div>
      </section>

      <Suspense fallback={<section className="mt-8" />}>
        <IndoorFilterSection all={indoorModels} showFilter={false} />
      </Suspense>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TitleIcon name="display" className="h-6 w-6 text-slate-800" />
          <span>Why Indoor LED Video Walls Are Chosen</span>
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Indoor video walls replace traditional screens when larger canvases, seamless joints, and high brightness
          control are required. They perform best where viewers stay for longer periods and need crisp text,
          stable colors, and consistent brightness.
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          <li>- Seamless full-wall display for corporate storytelling and brand communication.</li>
          <li>- High readability for dashboards, data monitoring, and control room operations.</li>
          <li>- Flexible screen sizes for custom interior layouts and architectural integration.</li>
        </ul>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {useCases.map((item) => (
          <article key={item.t} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
              <TitleIcon name={item.icon} className="h-4 w-4 text-slate-700" />
              <span>{item.t}</span>
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TitleIcon name="plan" className="h-6 w-6 text-slate-800" />
          <span>Planning Factors for Indoor Video Walls</span>
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          {planningFactors.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TitleIcon name="distance" className="h-6 w-6 text-slate-800" />
          <span>Screen Size and Viewing Distance Basics</span>
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          A practical rule is to align pixel pitch with average viewing distance. Closer viewing requires finer pitch,
          while larger rooms allow higher pitch without losing clarity. This keeps costs balanced and ensures that text
          and charts remain readable.
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          <li>- Close viewing (boardrooms): prioritize P1.2–P1.8.</li>
          <li>- Medium viewing (lobbies/showrooms): P1.8–P2.5 performs well.</li>
          <li>- Longer viewing (large halls): P2.5–P4 remains effective and cost-efficient.</li>
        </ul>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <TitleIcon name="pitch" className="h-6 w-6 text-slate-800" />
            <span>Pixel Pitch Selection Guide</span>
          </h2>
          <div className="mt-3 space-y-3">
            {pitchGuide.map((row) => (
              <div key={row.k} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-bold text-slate-900">{row.k}</div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{row.v}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <TitleIcon name="design" className="h-6 w-6 text-slate-800" />
            <span>Content Design Rules</span>
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {contentRules.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TitleIcon name="reliability" className="h-6 w-6 text-slate-800" />
          <span>Controller, Power, and Reliability Notes</span>
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Stable performance depends on controller compatibility, reliable power distribution, and ventilation planning.
          Choose a controller that supports your content format, resolution, and scaling needs, and plan proper power
          redundancy for critical spaces.
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          <li>- Confirm controller output matches screen resolution and aspect ratio.</li>
          <li>- Use power protection and proper earthing for safe long-hour operation.</li>
          <li>- Ensure cabinet ventilation and front service access for quick maintenance.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TitleIcon name="steps" className="h-6 w-6 text-slate-800" />
          <span>Typical Indoor LED Video Wall Installation Flow</span>
        </h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-5 text-sm leading-7 text-slate-600">
          {installationSteps.map((step, idx) => (
            <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-bold text-slate-500">Step {idx + 1}</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TitleIcon name="faq" className="h-6 w-6 text-slate-800" />
          <span>Indoor LED Video Wall FAQ</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Quick answers to common questions before selecting pixel pitch, service access, and long-hour operation plan.
        </p>
        <div className="mt-5">
          <FaqAccordion items={faqs} accent="#FF6A00" columns={2} />
        </div>
      </section>
    </main>
  );
}

export default function LegacyIndoorLedVideoWallPage() {
  permanentRedirect("/led-display/indoor-led-video-wall-bangladesh/");
}

