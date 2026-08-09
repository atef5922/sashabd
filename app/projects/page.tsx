import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import FaqAccordion from "@/components/common/FaqAccordion";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

type Project = {
  id: string;
  title: string;
  badge: string;
  image?: string;
  imageFit?: "cover" | "contain";
  imageClassName?: string;
  organization: string;
  location: string;
  year: string;
  subtitle?: string;
  scopeLabel: string;
  scope: string;
  highlights: string[];
  meta: { k: string; v: string }[];
  tags: string[];
  isTemplate?: boolean;
};

/**
 * Add only business-verified, publishable projects here.
 */
const projects: Project[] = [];

/** Formatting fixtures only. Never render these as Sasha Corporation project evidence. */
const templateProjects: Project[] = [
  {
    id: "template-2",
    title: "Outdoor Digital Billboard Installation",
    badge: "Template example",
    image: "/images/project-page/project-chattogram-card.webp",
    imageClassName: "object-cover object-center",
    organization: "Nusaifa Trading",
    location: "Dhaka, Bangladesh",
    year: "2026",
    subtitle: "Nasirabad, Chattogram - 2026",
    scopeLabel: "Scope",
    scope: "Structure planning, supply and installation support.",
    highlights: [
      "Daylight visibility planning (brightness and content)",
      "Weather protection and long-run cable management",
      "Grounding and protection checklist for safety",
      "Testing for stability before handover",
    ],
    meta: [
      { k: "Pixel pitch", v: "P5" },
      { k: "Screen size", v: "24.15 ft x 13.6 ft" },
      { k: "Solution stack", v: "Outdoor cabinet, power distribution, controller" },
    ],
    tags: ["Outdoor", "Structure", "Protection planning"],
    isTemplate: true,
  },
  {
    id: "template-5",
    title: "Turnstile Gate System (Access Control)",
    badge: "Template example",
    image: "/images/project-page/project-turnstile-gate.webp",
    imageClassName: "object-cover object-center",
    organization: "Office access control",
    location: "Dhaka, Bangladesh",
    year: "2024",
    subtitle: "Mohammadpur, Dhaka, Bangladesh - 2024",
    scopeLabel: "Scope",
    scope: "Supply, installation, wiring and controller integration.",
    highlights: [
      "Lane planning based on flow and site constraints",
      "Controller rules plus access device integration",
      "Logging workflow and basic operator handover",
      "Stability checks for daily operation",
    ],
    meta: [
      { k: "Gate type", v: "Project dependent" },
      { k: "Access method", v: "RFID/biometric/QR (project dependent)" },
      { k: "Solution stack", v: "Turnstile gate, controller, power + networking" },
    ],
    tags: ["Turnstile", "Access control", "Integration"],
    isTemplate: true,
  },
  {
    id: "template-1",
    title: "Indoor LED Video Wall Delivery",
    badge: "Template example",
    image: "/images/project-page/project-indoor-wall.webp",
    imageClassName: "object-cover object-center",
    organization: "Corporate office (confidential)",
    location: "Dhaka, Bangladesh",
    year: "2025",
    subtitle: "Gulshan, Dhaka, Bangladesh - 2025",
    scopeLabel: "Scope",
    scope: "Supply, installation, calibration and commissioning.",
    highlights: [
      "Model selection aligned to viewing distance and content",
      "Controller mapping and resolution setup for stable playback",
      "Safe power distribution and tidy cabling route",
      "Uniformity checks plus practical operator handover",
    ],
    meta: [
      { k: "Pixel pitch", v: "P1.53" },
      { k: "Screen size", v: "15.5 ft x 11.25 ft" },
      { k: "Solution stack", v: "Indoor module, NovaStar controller, receiving card, G-Energy power supply" },
    ],
    tags: ["Indoor", "Calibration", "Stable playback"],
    isTemplate: true,
  },
  {
    id: "template-4",
    title: "Rental LED Screen (Event Setup)",
    badge: "Template example",
    image: "/images/project-page/project-rental.webp",
    imageClassName: "object-cover object-center",
    organization: "Event stage / conference",
    location: "Dhaka, Bangladesh",
    year: "2025",
    subtitle: "Manik Mia Avenue, Dhaka, Bangladesh - 2025",
    scopeLabel: "Scope",
    scope: "Event setup, alignment and on-site support.",
    highlights: [
      "Fast setup workflow with reliable connections",
      "Processor setup for clean video playback",
      "Safe power distribution planning for events",
      "On-site testing and go-live support",
    ],
    meta: [
      { k: "Pixel pitch", v: "P3" },
      { k: "Screen size", v: "14.25 ft x 9.4 ft" },
      { k: "Solution stack", v: "Rental cabinet, Huidu controller, flight case" },
    ],
    tags: ["Rental", "Event", "On-site support"],
    isTemplate: true,
  },
  {
    id: "template-3",
    title: "PA Sound System Setup (Paging + Zoning)",
    badge: "Template example",
    image: "/images/project-page/project-pa-system.webp",
    imageClassName: "object-cover object-center",
    organization: "Office building",
    location: "Dhaka, Bangladesh",
    year: "2026",
    subtitle: "Mirpur, Dhaka, Bangladesh - 2026",
    scopeLabel: "Scope",
    scope: "BOQ-based planning, wiring guidance, commissioning and handover.",
    highlights: [
      "Zone-wise paging designed for daily operations",
      "Speaker selection matched to rooms and noise level",
      "Amplifier sizing and load planning with headroom",
      "Priority paging rules for important announcements",
    ],
    meta: [
      { k: "System type", v: "Conference Discussion System - Chairman & Delegate Set" },
      { k: "Zones", v: "Office" },
      { k: "Solution stack", v: "Amplifier, paging mic, speakers, cabling" },
    ],
    tags: ["PA sound", "Zoning", "Commissioning"],
    isTemplate: true,
  },
  {
    id: "template-6",
    title: "Indoor LED Display for Retail / Showroom",
    badge: "Template example",
    image: "/images/project-page/Project-indoor-showroom.webp",
    imageClassName: "object-cover object-center",
    organization: "Showroom / retail branding",
    location: "Chattogram, Bangladesh",
    year: "2026",
    subtitle: "Progati Sarani, Dhaka, Bangladesh - 2026",
    scopeLabel: "Scope",
    scope: "Supply, installation and content testing support.",
    highlights: [
      "Pitch selection for near-view clarity",
      "Uniform output and calibration checks",
      "Clean cable routing and finishing",
      "Handover guidance for smooth content operation",
    ],
    meta: [
      { k: "Pixel pitch", v: "P2.5" },
      { k: "Screen size", v: "12 ft x 7 ft" },
      { k: "Solution stack", v: "Indoor module, receiving card, NovaStar controller" },
    ],
    tags: ["Retail", "Indoor", "Finishing"],
    isTemplate: true,
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Why are client project details not listed yet?",
    a: "Project case studies are published only after business verification and client approval. No demo or unverified client project is presented here as completed work.",
  },
  {
    q: "What details should I share for a matching proposal?",
 a: "Send location, indoor/outdoor, approximate size (W x H), viewing distance, content type, and timeline. For PA or access control projects, share layout, zone/lane count, and daily operation requirements.",
  },
  {
    q: "Do you support installation, commissioning and after-sales?",
    a: "Yes. We support planning, installation guidance, commissioning, and practical handover, plus after-sales support for tuning, expansion and troubleshooting.",
  },
  {
    q: "Can you do BOQ-based quotation (and tender-aligned scope)?",
    a: "Yes. We can prepare BOQ-aligned scope and structure the solution around site needs, safety, and long-term stability.",
  },
];

const valueBlocks = [
  {
    n: "1",
    t: "Scope you can trust",
    d: "We outline supply, installation, configuration, calibration and commissioning clearly so BOQ and delivery stay aligned-without surprises.",
  },
  {
    n: "2",
    t: "Built for reliability",
    d: "We plan controller mapping, power distribution and verification checks to reduce flicker risk, mismatch and early failures in real use.",
  },
  {
    n: "3",
    t: "Support-ready handover",
    d: "We provide practical operation guidance, troubleshooting steps and expansion notes (as per scope) so your solution stays stable long term.",
  },
] as const;

const workflowSteps = [
  {
    n: "1",
    t: "Site review",
    d: "Viewing distance, ambient conditions, mounting height, access route, and power/network readiness.",
  },
  {
    n: "2",
    t: "Solution planning",
    d: "Model/pitch selection, cabinet/module choice, controller mapping and safety-focused power planning.",
  },
  {
    n: "3",
    t: "Installation",
    d: "Structure and mounting, wiring and routing, grounding guidance, controller configuration and testing.",
  },
  {
    n: "4",
    t: "Handover & support",
    d: "Calibration, content testing, operator guidance and a support path as per the agreed scope.",
  },
] as const;

const checklistRows = [
  {
    title: "Pitch vs viewing distance",
    reason: "Avoids blurry text and prevents overspending on unnecessary resolution.",
    scope: "Indoor / Outdoor / Rental",
  },
  {
    title: "Controller mapping & resolution",
    reason: "Reduces scaling issues, flicker risk and unstable playback.",
    scope: "Video wall / billboard / rental",
  },
  {
    title: "Power distribution & load planning",
    reason: "Improves safety headroom and reduces power-supply stress.",
    scope: "LED + control systems",
  },
  {
    title: "Cabling, routing & protection",
    reason: "Supports long-run stability in local environments and weather.",
    scope: "Outdoor + multi-floor sites",
  },
  {
    title: "Calibration & uniformity check",
    reason: "Keeps color and brightness consistent across the full screen.",
    scope: "Indoor + rental displays",
  },
  {
    title: "Content test + operator handover",
    reason: "Helps clients run content confidently after commissioning.",
    scope: "All applicable projects",
  },
] as const;

const PAGE_TITLE = `Project Planning & Delivery Process | ${BRAND_NAME}`;
const PAGE_DESCRIPTION =
  `Review ${BRAND_NAME}'s planning process for LED displays, PA systems, and access control, from site review and BOQ scope to installation, commissioning, and handover.`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/projects/") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl("/projects/"),
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [socialImageUrl()],
  },
};

function buildProjectCardSubtitle(p: Project): string {
  const parts = [p.organization, p.location, p.year].filter(Boolean);
  return parts.join(" | ");
}

export default function ProjectsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  const list = projects;
  const hasWithheldTemplates = templateProjects.length > 0;

  return (
    <main className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-0 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/projects/", label: "Projects", current: true },
          ]}
          className="mb-3 pt-3 text-sm text-slate-600 md:hidden"
        />
        {/* Hero (same feel as PA page) */}
        <section
          className="relative left-1/2 right-1/2 -mx-[50vw] min-h-[360px] w-screen overflow-hidden border-y bg-slate-900 md:min-h-[420px] lg:min-h-[500px]"
          style={{ borderColor: `${BRAND.maroon}12` }}
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/Project-hero.webp"
              alt="Projects hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.55))",
              }}
            />
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-8 md:px-10 md:py-10">
            <div className="max-w-4xl md:max-w-[34rem] lg:max-w-[38rem]">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white md:px-4 md:py-2 md:text-xs"
                style={{ background: `${BRAND.maroon}24` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                Project Planning - Bangladesh
              </span>

              <h1 className="mt-4 max-w-[16rem] text-[1.9rem] font-extrabold tracking-tight text-white md:mt-16 md:max-w-[30rem] md:text-[2.5rem] md:leading-[1.12] lg:max-w-[34rem] lg:text-[2.9rem]">
                Project Planning &amp; Delivery Process
              </h1>
              <p className="mt-3 max-w-[21rem] text-justify text-[13px] leading-6 text-white/85 md:mt-6 md:max-w-[31rem] md:text-left md:text-[15px] md:leading-[1.75] lg:max-w-[34rem]">
                Review our workflow, technical checks, and handover approach. Verified case studies will be published
                only after business validation and client approval.
              </p>

              <div className="mt-5 grid max-w-[22rem] grid-cols-2 gap-2 md:mt-12 md:flex md:max-w-none md:flex-wrap md:gap-3">
                <Link
                  href="/contact/"
                  className="inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 text-center text-[11px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg md:min-h-11 md:rounded-xl md:px-5 md:py-3 md:text-[14px]"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  Request a BOQ-based proposal
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-center text-[11px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg md:min-h-11 md:rounded-xl md:px-5 md:py-3 md:text-[14px]"
                >
                  WhatsApp for quick discussion
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value blocks */}
        <section className="mt-6 rounded-[22px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
            {valueBlocks.map((x) => (
              <div
                key={x.n}
                className="w-[82%] shrink-0 snap-start rounded-[16px] border bg-slate-50 p-3.5 shadow-sm"
                style={{ borderColor: `${BRAND.maroon}12` }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold leading-none"
                    style={{ color: BRAND.maroon, background: `${BRAND.maroon}14` }}
                  >
                    {x.n}.
                  </div>
                  <div className="min-w-0 flex-1 text-[16px] font-extrabold leading-[1.25] text-slate-900">{x.t}</div>
                </div>
                <p className="mt-2 text-justify text-[12px] leading-5 text-slate-600 md:text-left">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="hidden gap-4 md:grid md:grid-cols-3">
            {valueBlocks.map((x) => (
              <div
                key={x.n}
                className="rounded-3xl border bg-slate-50 p-6 shadow-sm"
                style={{ borderColor: `${BRAND.maroon}12` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold leading-none"
                    style={{ color: BRAND.maroon, background: `${BRAND.maroon}14` }}
                  >
                    {x.n}.
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5 text-[15px] font-extrabold leading-[1.2] tracking-tight text-slate-900 lg:text-[16px] lg:whitespace-nowrap">
                    {x.t}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mt-8 rounded-[22px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="mx-auto max-w-5xl md:text-center">
            <h2 className="text-[1.35rem] font-extrabold tracking-tight text-slate-900 md:text-2xl">
              How we execute projects (planning -&gt; installation -&gt; handover)
            </h2>
            <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-center md:text-sm">
              A clear workflow makes the engineering process easy to understand before you commit.
            </p>
          </div>

          <div className="-mx-0.5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
            {workflowSteps.map((x) => (
              <div
                key={x.n}
                className="w-[82%] shrink-0 snap-start rounded-[16px] border bg-slate-50 p-3.5 shadow-sm"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold leading-none"
                    style={{ color: BRAND.maroon, background: `${BRAND.maroon}14` }}
                  >
                    {x.n})
                  </div>
                  <div className="min-w-0 flex-1 text-[16px] font-extrabold leading-[1.25] text-slate-900">{x.t}</div>
                </div>
                <p className="mt-2 text-justify text-[12px] leading-5 text-slate-600">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((x) => (
              <div
                key={x.n}
                className="rounded-3xl border bg-slate-50 p-6 shadow-sm"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold leading-none"
                    style={{ color: BRAND.maroon, background: `${BRAND.maroon}14` }}
                  >
                    {x.n}.
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5 text-base font-extrabold leading-[1.3] text-slate-900">
                    {x.t}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mt-8 rounded-[22px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="mx-auto max-w-5xl md:text-center">
            <h2 className="text-[1.35rem] font-extrabold tracking-tight text-slate-900 md:text-2xl">
              Delivery quality checklist (what we verify before handover)
            </h2>
            <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-center md:text-sm">
              This checklist shows what we verify so you can judge reliability with confidence.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 md:hidden">
            {checklistRows.map((row) => (
              <article
                key={row.title}
                className="rounded-[14px] border bg-slate-50 p-3"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <div className="text-[13px] font-extrabold leading-5 text-slate-900">{row.title}</div>
                <p className="mt-1.5 line-clamp-3 text-justify text-[11px] leading-5 text-slate-600">{row.reason}</p>
                <div className="mt-2 inline-flex rounded-full border bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700" style={{ borderColor: "rgba(15,23,42,0.12)" }}>
                  {row.scope}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-3xl border bg-white md:block" style={{ borderColor: "rgba(15,23,42,0.10)" }}>
            <div className="grid grid-cols-12 gap-0 bg-slate-50 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
              <div className="col-span-4">Checklist item</div>
              <div className="col-span-5">Why it matters</div>
              <div className="col-span-3">Covered in</div>
            </div>

            {checklistRows.map((row) => (
              <div key={row.title} className="grid grid-cols-12 gap-0 bg-white px-4 py-3 text-sm">
                <div className="col-span-4 font-semibold text-slate-900">{row.title}</div>
                <div className="col-span-5 text-slate-700">{row.reason}</div>
                <div className="col-span-3 text-slate-700">{row.scope}</div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Note: Exact scope varies by BOQ/tender requirements and site condition. Final confirmation is provided in the quotation.
          </p>
        </section>

        {/* Projects grid */}
        <section className="mt-8">
          <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:px-0 sm:pb-0 sm:pt-0 sm:[scrollbar-width:auto] lg:grid-cols-3">
            {list.map((p) => (
              <article
                key={p.id}
                className="w-[88%] shrink-0 snap-start overflow-hidden rounded-[20px] border bg-white shadow-sm sm:w-auto sm:shrink sm:rounded-3xl"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <div className="relative w-full bg-slate-100 aspect-[7/5]">
                  {p.image ? (
                    <>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className={
                          p.imageClassName ??
                          (p.imageFit === "contain" ? "object-contain object-center" : "object-cover object-center")
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                    </>
                  ) : null}
                  <div className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                    {p.badge}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-[17px] font-extrabold leading-snug text-slate-900 md:max-w-full md:overflow-hidden md:text-[14px] md:leading-tight md:tracking-tight md:text-ellipsis md:whitespace-nowrap lg:text-[15px] xl:text-base">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-justify text-[11px] text-slate-600 md:text-left md:text-xs">{p.subtitle ?? buildProjectCardSubtitle(p)}</p>

                  <div className="mt-3 space-y-1.5 text-justify text-[12px] text-slate-700 md:hidden">
                    <div>
                      <span className="font-extrabold text-slate-900">Client/Site:</span> {p.organization}
                    </div>
                    {p.meta.slice(0, 2).map((m) => (
                      <div key={`${p.id}-m-${m.k}`}>
                        <span className="font-extrabold text-slate-900">{m.k}:</span> {m.v}
                      </div>
                    ))}
                    <div className="pt-0.5">
                      <span className="font-extrabold text-slate-900">{p.scopeLabel}:</span>{" "}
                      <span className="text-slate-600">{p.scope}</span>
                    </div>
                  </div>

                  <div className="mt-4 hidden space-y-2 text-[13px] text-slate-700 md:block md:text-sm">
                    <div>
                      <span className="font-extrabold text-slate-900">Client/Site:</span> {p.organization}
                    </div>
                    {p.meta.map((m) => (
                      <div key={`${p.id}-${m.k}`}>
                        <span className="font-extrabold text-slate-900">{m.k}:</span> {m.v}
                      </div>
                    ))}
                    <div>
                      <span className="font-extrabold text-slate-900">{p.scopeLabel}:</span> {p.scope}
                    </div>
                  </div>

                  {p.highlights?.length ? (
                    <ul className="mt-4 hidden space-y-1 text-[13px] text-slate-700 md:block md:text-sm">
                      {p.highlights.slice(0, 4).map((x) => (
                        <li key={`${p.id}-${x}`} className="leading-6">
                          - {x}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {p.tags?.length ? (
                    <div className="mt-4 hidden flex-wrap gap-2 md:flex">
                      {p.tags.slice(0, 6).map((t) => (
                        <span
                          key={`${p.id}-tag-${t}`}
                          className="rounded-full border bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                          style={{ borderColor: "rgba(15,23,42,0.12)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <Link
                    href="/contact/"
                    className="mt-5 inline-flex min-h-10 w-fit items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-[11px] font-extrabold text-white transition hover:bg-sky-700 md:text-xs"
                  >
                    Request a similar solution
                  </Link>
                </div>
              </article>
            ))}
            {list.length === 0 ? (
              <div
                className="w-full rounded-[20px] border bg-white p-5 shadow-sm sm:col-span-2 sm:rounded-3xl md:p-8 lg:col-span-3"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <h2 className="text-xl font-extrabold text-slate-900">Verified project case studies</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  No client project is currently published from the verified repository dataset.
                  {hasWithheldTemplates
                    ? " Demo formatting records are withheld and are not presented as completed work."
                    : ""}
                </p>
                <Link
                  href="/contact/"
                  className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-sky-700"
                >
                  Discuss project requirements
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10 rounded-[22px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[1.5rem] font-extrabold tracking-tight text-slate-900 md:text-3xl">Projects FAQ</h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-sm">
              Quick answers buyers often ask before placing an order or requesting a BOQ-based quotation.
            </p>
          </div>

          <div className="mt-6">
            <FaqAccordion accent={BRAND.maroon} items={FAQS} />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-[22px] bg-slate-50 p-4 md:rounded-3xl md:p-10">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[1.5rem] font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Planning a project?
            </h2>
            <p className="mx-auto mt-3 max-w-[19rem] text-[13px] leading-6 text-slate-600 md:max-w-3xl md:text-base md:leading-7">
              Share screen size (W x H), indoor/outdoor, location, viewing distance and BOQ/space notes. We will propose a
              practical solution with scope and a technical plan.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-3">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Request a proposal
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
              >
                WhatsApp now
              </a>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Need BOQ-based quotation?{" "}
              <Link href="/contact/" className="font-semibold text-slate-700 hover:underline">
                Contact {BRAND_NAME}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
