import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProjectCard from "./ProjectCard";
import { projects, type Project } from "./projectData";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

/** Formatting fixtures only. Never render these as Sasha Corporation project evidence. */
const templateProjects: Project[] = [
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
    q: "How are client project details verified before publication?",
    a: "Project case studies are published only after business verification and client approval. Demo or unverified project records are never presented as completed client work.",
  },
  {
    q: "What details should I share for a matching proposal?",
    a: "Share the project location, application, expected size or capacity, installation environment and available budget range where possible. For LED display projects, include screen size, indoor/outdoor use and approximate viewing distance. For conference system projects, include room size, participant capacity, seating or table layout, wired or wireless preference, video-conferencing requirements and any existing display or audio equipment. For PA or access-control projects, share the required coverage area, number of zones or entry points and relevant operating requirements.",
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
    d: "We define the approved supply, installation, integration, configuration, testing and commissioning scope clearly so the BOQ and delivery stay aligned.",
  },
  {
    n: "2",
    t: "Built for reliability",
    d: "We verify equipment compatibility, system architecture, infrastructure requirements and integration details to support stable day-to-day operation.",
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
    t: "Site Assessment & Requirements",
    d: "We review the project environment, application, dimensions or room layout, user capacity, technical requirements, existing infrastructure and installation conditions before recommending a solution.",
  },
  {
    n: "2",
    t: "Solution Design & BOQ Planning",
    d: "Our team selects suitable equipment, defines the system architecture and prepares a project-specific solution, equipment list and BOQ based on technical and budget requirements.",
  },
  {
    n: "3",
    t: "Installation & Integration",
    d: "Equipment is installed and integrated with the required power, network, audio, video, control or structural infrastructure using an organized project implementation process.",
  },
  {
    n: "4",
    t: "Testing, Commissioning & Handover",
    d: "The completed system is tested, configured and optimized before final commissioning and handover, with operational guidance and support provided where applicable.",
  },
] as const;

const checklistRows = [
  {
    title: "Requirement & Compatibility Verification",
    reason: "Confirm the selected equipment, capacities, interfaces and system architecture match the approved project requirements.",
    scope: "All project types",
  },
  {
    title: "Installation & Cabling Quality",
    reason: "Verify equipment placement, structured cabling, power/network connections, labeling and installation quality.",
    scope: "Installed systems",
  },
  {
    title: "Configuration & System Integration",
    reason: "Configure and integrate the required audio, video, display, control, network or access-control components as applicable.",
    scope: "Integrated systems",
  },
  {
    title: "Performance Testing",
    reason: "Test the completed system against its intended operating requirements and optimize performance where necessary.",
    scope: "All applicable systems",
  },
  {
    title: "Commissioning & Handover",
    reason: "Complete final verification, commissioning and operational handover with documentation or guidance where applicable.",
    scope: "Completed projects",
  },
] as const;

const PAGE_TITLE = `Completed Projects & Delivery Process | ${BRAND_NAME}`;
const PAGE_DESCRIPTION =
  `Review ${BRAND_NAME}'s verified LED display and conference system projects, plus its site planning, BOQ, installation, commissioning, and handover process.`;

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
                Completed Projects &amp; Delivery Process
              </h1>
              <p className="mt-3 max-w-[21rem] text-justify text-[13px] leading-6 text-white/85 md:mt-6 md:max-w-[31rem] md:text-left md:text-[15px] md:leading-[1.75] lg:max-w-[34rem]">
                Professional technology project delivery from requirement assessment and BOQ planning through
                installation, integration, testing and final commissioning.
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
          <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 md:[scrollbar-width:auto]">
            {valueBlocks.map((x) => (
              <div
                key={x.n}
                className="w-[82%] shrink-0 snap-start rounded-[16px] border bg-slate-50 p-3.5 shadow-sm md:w-auto md:rounded-3xl md:p-6"
                style={{ borderColor: `${BRAND.maroon}12` }}
              >
                <div className="flex items-center gap-2.5 md:items-start md:gap-3">
                  <div
                    className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold leading-none md:h-7 md:min-w-7 md:text-[11px]"
                    style={{ color: BRAND.maroon, background: `${BRAND.maroon}14` }}
                  >
                    {x.n}.
                  </div>
                  <div className="min-w-0 flex-1 text-[16px] font-extrabold leading-[1.25] text-slate-900 md:pt-0.5 md:text-[15px] md:leading-[1.2] lg:whitespace-nowrap lg:text-[16px]">
                    {x.t}
                  </div>
                </div>
                <p className="mt-2 text-justify text-[12px] leading-5 text-slate-600 md:text-left md:text-sm md:leading-6">{x.d}</p>
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

          <div className="-mx-0.5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-6 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 md:[scrollbar-width:auto] lg:grid-cols-4">
            {workflowSteps.map((x) => (
              <div
                key={x.n}
                className="w-[82%] shrink-0 snap-start rounded-[16px] border bg-slate-50 p-3.5 shadow-sm md:w-auto md:rounded-3xl md:p-6"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <div className="flex items-center gap-2.5 md:items-start md:gap-3">
                  <div
                    className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold leading-none md:h-7 md:min-w-7 md:text-[11px]"
                    style={{ color: BRAND.maroon, background: `${BRAND.maroon}14` }}
                  >
                    {x.n}.
                  </div>
                  <div className="min-w-0 flex-1 text-[16px] font-extrabold leading-[1.25] text-slate-900 md:pt-0.5 md:text-base md:leading-[1.3]">
                    {x.t}
                  </div>
                </div>
                <p className="mt-2 text-justify text-[12px] leading-5 text-slate-600 md:text-left md:text-sm md:leading-6">{x.d}</p>
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

          <div
            className="mt-5 grid grid-cols-2 gap-2 md:mt-6 md:block md:overflow-hidden md:rounded-3xl md:border md:bg-white"
            style={{ borderColor: "rgba(15,23,42,0.10)" }}
          >
            <div className="hidden grid-cols-12 gap-0 bg-slate-50 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-700 md:grid">
              <div className="col-span-4">Checklist item</div>
              <div className="col-span-5">Why it matters</div>
              <div className="col-span-3">Covered in</div>
            </div>

            {checklistRows.map((row) => (
              <article
                key={row.title}
                className="rounded-[14px] border bg-slate-50 p-3 md:grid md:grid-cols-12 md:gap-0 md:rounded-none md:border-0 md:bg-white md:px-4 md:py-3 md:text-sm"
                style={{ borderColor: "rgba(15,23,42,0.10)" }}
              >
                <div className="text-[13px] font-extrabold leading-5 text-slate-900 md:col-span-4 md:text-sm md:font-semibold">{row.title}</div>
                <p className="mt-1.5 line-clamp-3 text-justify text-[11px] leading-5 text-slate-600 md:col-span-5 md:mt-0 md:line-clamp-none md:text-left md:text-sm md:leading-normal md:text-slate-700">{row.reason}</p>
                <div className="mt-2 inline-flex rounded-full border bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 md:col-span-3 md:mt-0 md:block md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-sm md:font-normal" style={{ borderColor: "rgba(15,23,42,0.12)" }}>
                  {row.scope}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Note: Exact scope varies by BOQ/tender requirements and site condition. Final confirmation is provided in the quotation.
          </p>
        </section>

        {/* Projects grid */}
        <section className="mt-8">
          {list.length ? (
            <div className="mb-5 max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600">Completed work</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">Verified Project Case Studies</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Review completed Sasha Corporation LED display and conference system work with confirmed locations, delivery scopes and case-study details.
              </p>
            </div>
          ) : null}
          <div className={`-mx-0.5 grid gap-4 px-0.5 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 ${list.length === 1 ? "max-w-xl" : ""}`}>
            {list.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
              Planning a Technology Project?
            </h2>
            <p className="mx-auto mt-3 max-w-[19rem] text-[13px] leading-6 text-slate-600 md:max-w-3xl md:text-base md:leading-7">
              Share your project type, location, expected capacity or dimensions and key requirements. Our team can
              recommend a suitable solution and prepare a project-specific equipment list and BOQ.
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
