import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import ProductGridCard from "@/components/products/ProductGridCard";
import { digitalPodiumCatalog } from "./catalog";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a digital podium?",
    a: "A digital podium (also called a smart podium or interactive lectern) combines a presentation workstation with a built-in touch display. It helps presenters control slides, annotate content, play videos and connect to a room display or projector from one place.",
  },
  {
    q: "What affects digital podium price in Bangladesh?",
    a: "Price depends on display size and brightness, touch performance, OS/PC option, microphone and audio features, connectivity (HDMI/USB/LAN/Wi-Fi), build quality, and installation scope. Share your venue type and requirements to get an accurate quotation.",
  },
  {
    q: "Can it connect to an LED wall or projector?",
    a: "Yes. A typical setup supports HDMI output to an LED video wall, projector or large display. We also plan cable length, signal adapters and safe cable routing in the BOQ.",
  },
  {
    q: "Do you provide installation and training?",
    a: "Yes. We support delivery, setup, cable management guidance, basic configuration, and user handover so teachers or presenters can operate the system confidently.",
  },
  {
    q: "Is it suitable for schools and universities?",
    a: "Yes. Digital podiums are commonly used for smart classrooms, lecture halls and training rooms because they keep the presenter organized and reduce switching between multiple devices.",
  },
  {
    q: "Can it integrate with a PA sound system or wireless mic?",
    a: "Often yes. Depending on the room setup, the podium can work with an existing PA system, mixer/amplifier and wired or wireless microphones. We recommend a practical audio plan based on room size and audience count.",
  },
  {
    q: "Can you support BOQ and tender documentation?",
    a: "Yes. We can help with model selection, compliance mapping, and BOQ clarity so procurement teams can compare like-for-like specifications.",
  },
  {
    q: "How do I request a quotation quickly?",
    a: "Send your location, room type (classroom/lecture hall/auditorium), the main display type (LED wall/projector/TV), and any must-have features (touch, mic, PC/OPS). We'll propose a suitable configuration and budget range.",
  },
];

export const metadata: Metadata = {
  title: "Digital Podium Price in Bangladesh",
  description:
    "Digital podium (smart podium) in Bangladesh for lecture halls, training rooms and conference venues—quotation, BOQ support and installation planning.",
  alternates: { canonical: "/digital-podium/" },
  openGraph: {
    title: "Digital Podium Price in Bangladesh | Smart Podium & Installation",
    description:
      "Supply and installation of digital podiums in Bangladesh for smart classrooms, universities and corporate training—touch control, connectivity planning and after-sales support.",
    url: "/digital-podium",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/podium/podium-hero.webp"),
        width: 1200,
        height: 630,
        alt: "Digital Podium in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Podium Price in Bangladesh | Smart Podium & Installation",
    description:
      "Digital podium in Bangladesh for smart classrooms and conference venues—quotation, BOQ support and installation planning.",
    images: [socialImageUrl("/images/podium/podium-hero.webp")],
  },
};

const highlights = [
  { title: "Presenter-friendly workflow", desc: "Control slides, videos and documents from one workstation." },
  { title: "Touch + annotation", desc: "Write, highlight and explain content naturally during sessions." },
  { title: "Clean cable management", desc: "Organize connections neatly for safer, professional stage setup." },
  { title: "Room integration", desc: "Connect to LED wall, projector, TV display and audio system." },
];

const featureGrid = [
  { title: "Interactive touch display", desc: "Responsive writing and control for training and lectures." },
  { title: "Built-in OS / PC option", desc: "Run Android apps or Windows workflow based on configuration." },
  { title: "HDMI output & AV inputs", desc: "Connect to external screens and common content sources." },
  { title: "Microphone & audio integration", desc: "Work with wired/wireless mic and venue sound system." },
  { title: "Network & sharing", desc: "LAN/Wi-Fi options for file access and presentation sharing." },
  { title: "Durable podium body", desc: "Stable design for daily institutional and event use." },
];

const useCases = [
  { title: "Smart Classroom", desc: "Teachers present and control content while staying face-to-class." },
  { title: "University Lecture Hall", desc: "Smooth delivery for large audiences with clear display output." },
  { title: "Training Room", desc: "Interactive sessions with annotation, demos and collaboration." },
  { title: "Conference & Seminar", desc: "Professional podium experience for corporate and public events." },
  { title: "Auditorium Stage", desc: "Reliable connections and clean layout for stage presentations." },
  { title: "Public Institution Programs", desc: "Structured delivery for workshops, briefings and ceremonies." },
];

const buyerChecklist = [
  "Room type and audience size (classroom, lecture hall, auditorium).",
  "Main display target (LED wall, projector, TV) and cable distance.",
  "Touch writing requirement and preferred screen size.",
  "Android-only use or Windows/PC workflow requirement.",
  "Microphone and audio plan (existing PA system or new).",
  "Installation scope: podium placement, cable routing and handover.",
];

const configurations = [
  {
    title: "Training Room Podium",
    bestFor: "Small-medium training rooms",
    includes: "Touch podium + HDMI to display + basic mic integration",
  },
  {
    title: "Lecture Hall Podium",
    bestFor: "University classrooms & lecture halls",
    includes: "Touch podium + PC option + long cable planning + handover",
  },
  {
    title: "Auditorium / Stage Podium",
    bestFor: "Auditoriums & formal events",
    includes: "Podium + AV integration plan + audio workflow + redundancy notes",
  },
];

const buyingGuide = [
  {
    title: "Start with the room, not the brochure",
    desc: "Classroom vs lecture hall vs auditorium changes screen size, viewing distance, audio workflow and cable planning.",
  },
  {
    title: "Confirm the main display target",
    desc: "Plan the connection to LED wall, projector or TV (HDMI path, cable distance, adapters, and safe routing).",
  },
  {
    title: "Decide touch workflow needs",
    desc: "If you teach, train or explain diagrams live, touch + annotation becomes the productivity feature that matters most.",
  },
  {
    title: "Choose OS / PC approach",
    desc: "Android-only for simple playback, or add a Windows/PC (OPS/mini PC) for office apps, Zoom/Teams and advanced content.",
  },
  {
    title: "Map the audio plan early",
    desc: "Mic type (wired/wireless), PA system integration, recording/streaming needs and feedback control depend on venue workflow.",
  },
  {
    title: "Keep BOQ and tender clarity",
    desc: "List key specs (display, touch, connectivity, accessories, installation scope) so procurement can compare like-for-like.",
  },
] as const;

const specExplainers = [
  {
    k: "Touch quality & latency",
    v: "Smooth writing, accurate pen tracking and palm rejection help presenters annotate naturally without delay.",
  },
  {
    k: "Screen size & viewing comfort",
    v: "Larger rooms benefit from bigger touch displays and better visibility so the presenter doesn’t struggle on stage.",
  },
  {
    k: "Connectivity (HDMI / USB / LAN)",
    v: "A digital podium must connect cleanly to the room display and support common inputs for laptops, media and accessories.",
  },
  {
    k: "PC / OPS integration",
    v: "A built-in PC enables Windows workflow (Office, browsers, conferencing), while Android suits simpler app-based use.",
  },
  {
    k: "Audio integration readiness",
    v: "The right plan covers mic inputs, PA routing, recording/streaming interface options and clean cable management.",
  },
  {
    k: "Build, finish & serviceability",
    v: "Stable body design, access panels and service-friendly layout reduce downtime in daily institutional use.",
  },
] as const;

const deliverySteps = [
  { n: "01", t: "Requirement check", d: "Room type, audience size, display target and must-have features (touch, mic, PC/OPS)." },
  { n: "02", t: "Configuration proposal", d: "Model recommendation with BOQ clarity, accessories list and integration notes." },
  { n: "03", t: "Site & cable planning", d: "Cable distance, routing path, signal adapters and safe placement plan for a clean setup." },
  { n: "04", t: "Installation & testing", d: "Connect display/audio, verify sources, test writing/annotation, and confirm stable performance." },
  { n: "05", t: "Handover & training", d: "Basic operating guidance so teachers/presenters can run sessions confidently from day one." },
  { n: "06", t: "After-sales support", d: "Support for troubleshooting, configuration updates and service coordination when needed." },
] as const;

const procurementNotes = [
  "Specify the display target and cable distance (LED wall / projector / TV) so integration scope is clear.",
  "Mention OS/PC requirement: Android-only vs Windows/PC (OPS/mini PC) workflow.",
  "List connectivity needs (HDMI output, USB ports, LAN/Wi-Fi) and any source switching requirement.",
  "Define audio scope: number/type of microphones, PA integration, and any recording/streaming requirement.",
  "Confirm accessory needs (document camera/visualizer mount, keyboard/mouse, secure storage).",
  "Write installation scope explicitly (placement, cable routing, testing and user handover).",
] as const;

const installDeliverables = [
  "A practical configuration recommendation matched to your room and daily workflow.",
  "BOQ-ready spec summary (display, touch, connectivity, PC/OPS option, accessories).",
  "Integration notes for your display target (LED wall / projector / TV) and cable distance.",
  "Audio workflow guidance (mic + PA routing) and clean cable management plan.",
  "Installation + testing checklist and a user handover guide for presenters/teachers.",
] as const;

export default function DigitalPodiumPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/digital-podium/", label: "Digital Podium", current: true },
        ]}
        className="relative left-1/2 right-1/2 -mx-[50vw] mb-0 w-screen pt-0 text-sm text-slate-600"
        panelClassName="rounded-none border-x-0 border-t-0 px-4 py-3 shadow-none md:px-10"
        backButtonClassName="rounded-md"
      />
      <section
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y bg-slate-950"
        style={{ minHeight: "clamp(640px, calc(100svh - 64px), 900px)", borderColor: `${BRAND.maroon}12` }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/podium/podium-hero.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.28))",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-10 md:px-10 md:py-12">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                style={{ background: `${BRAND.maroon}24` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                Control Systems - Bangladesh
              </span>

              <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white">Digital Podium</span>
              </nav>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
                Digital Podium Price in Bangladesh
              </h1>
              <p className="mt-3 text-sm leading-7 text-justify text-white/85 md:text-base">
                A digital podium helps presenters run sessions smoothly: control slides, annotate content, connect to a
                room display and keep cables organized from one professional lectern. We supply and support digital
                podium setups in Bangladesh for smart classrooms, universities, training rooms and conference venues.
                Share your room details to get a practical BOQ and quotation with installation guidance and after-sales
                support.
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-6 py-3.5 text-[15px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
                aria-label="Get Digital Podium quotation on WhatsApp"
              >
                Get Quotation on WhatsApp
              </a>
              <Link
                href="/contact"
                className="rounded-xl px-6 py-3.5 text-[15px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Request a Quotation
              </Link>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl border bg-white/5 p-4 text-white backdrop-blur"
                  style={{ borderColor: "rgba(255,255,255,0.14)" }}
                >
                  <div className="text-[13px] font-extrabold leading-snug">{x.title}</div>
                  <p className="mt-1.5 text-[12.5px] leading-6 text-white/80">{x.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              Models & configurations
            </div>

            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Digital Podium Models &amp; Price Range in Bangladesh
            </h2>
            <p className="mt-2 text-slate-600 leading-7 text-justify">
              Choose a model below to see specifications, buyer guidance and integration notes—written in our own words
              and aligned with real procurement needs.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 md:mt-0">
            <span
              className="rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              Showing {digitalPodiumCatalog.length} models
            </span>
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digitalPodiumCatalog.map((p) => {
            const isStandard = p.slug === "standard-digital-podium-built-in-pc-sound";
            const isPremium = p.slug === "premium-digital-podium-interactive-touch-display";
            const useContain = isStandard || isPremium;
            const detailHref = `/digital-podium/${p.slug}/`;

            return (
              <ProductGridCard
                key={p.slug}
                href={detailHref}
                title={p.title}
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-center bg-white transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                }
                imageContainerClassName="bg-slate-100"
                borderColor={`${BRAND.maroon}12`}
                topLeftBadge={{ text: "Product", tone: "light" }}
                metaLines={[{ text: p.priceLabel, className: "mt-2 text-sm font-semibold text-sky-700" }]}
                bullets={p.cardHighlights.slice(0, 4)}
                chips={(p.recommendedFor?.length ? p.recommendedFor : p.tags).slice(0, 3)}
                accentColor={BRAND.maroon}
                contactHref="/contact"
                viewDetailsLabel="View details →"
              />
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              What you get with a modern digital podium
            </h2>
            <p className="mt-3 text-slate-600 leading-7 text-justify">
              In most venues, presentation issues happen because devices, cables and audio controls are scattered. A
              digital podium simplifies that workflow. Instead of juggling a laptop, remote clicker and extra adapters,
              you operate the session from one stable lectern—while routing video and audio to the room system in a
              clean, repeatable way.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {featureGrid.map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl border bg-slate-50 p-5"
                  style={{ borderColor: `${BRAND.maroon}12` }}
                >
                  <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                  <p className="mt-2 text-sm text-slate-600 leading-7">{x.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold text-slate-900">Buyer checklist</div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ background: `${BRAND.maroon}12`, color: BRAND.maroon }}
                >
                  Share for fast BOQ
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-600 leading-7">
                Send these points to receive a faster and more accurate digital podium quotation.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {buyerChecklist.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: BRAND.maroon }} />
                    <span className="leading-7">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                >
                  WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  Request a Quotation
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border bg-white p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo/digital-podium.svg"
                  alt="Digital Podium"
                  className="h-14 w-14 rounded-2xl border bg-slate-50 p-2"
                  style={{ borderColor: `${BRAND.maroon}12` }}
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-extrabold text-slate-900">BOQ & tender support</div>
                  <p className="mt-1 text-sm text-slate-600 leading-7">
                    Practical specifications, compliance mapping and selection guidance—so procurement teams can compare
                    correctly and reduce mismatch risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Where digital podiums are used</h2>
            <p className="mt-2 text-slate-600 leading-7">
              Use-case matters. We recommend configuration based on audience size, room depth, and the display/audio
              system you already have.
            </p>
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((x) => (
            <div
              key={x.title}
              className="rounded-3xl border bg-slate-50 p-6"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Typical configuration options</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Below are common starting points. Final configuration depends on venue workflow, display type and installation
          scope.
        </p>

        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-3">
          {configurations.map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border bg-slate-50 p-6"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-sm font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Best for</div>
              <div className="mt-1 text-sm text-slate-700">{c.bestFor}</div>
              <div className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Typically includes</div>
              <div className="mt-1 text-sm text-slate-700 leading-7">{c.includes}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border bg-white p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-extrabold text-slate-900">Need the right setup recommendation?</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Share your room type, audience size, and the display you want to connect. We’ll suggest a practical
                digital podium configuration with BOQ clarity and installation planning.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Request a Quotation
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="buying-guide"
        className="mt-10 rounded-3xl border bg-white p-7 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Digital podium buying guide (Bangladesh)
            </h2>
            <p className="mt-2 text-slate-600 leading-7">
              If you’re comparing digital podium price in Bangladesh, these steps help you select the right setup for
              your room—without over‑specifying or missing key integration details.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 md:mt-0">
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get recommendation
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buyingGuide.map((x) => (
            <div
              key={x.title}
              className="rounded-3xl border bg-slate-50 p-6"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="specs-explained"
        className="mt-10 rounded-3xl border bg-white p-7 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Key specifications explained</h2>
        <p className="mt-2 text-slate-600 leading-7">
          A world-class smart podium setup is less about a long spec sheet—and more about choosing the specifications
          that match daily use. Here’s what matters most for classrooms, lecture halls and conference venues.
        </p>

        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2">
          {specExplainers.map((x) => (
            <div
              key={x.k}
              className="rounded-3xl border bg-slate-50 p-6"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-sm font-extrabold text-slate-900">{x.k}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="installation"
        className="mt-10 rounded-3xl border bg-white p-7 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Installation & integration workflow</h2>
            <p className="mt-2 text-slate-600 leading-7">
              A digital podium is a room system—so reliable results come from planning the display, audio, cabling and
              presenter workflow together.
            </p>

            <div className="mt-6 space-y-3">
              {deliverySteps.map((s) => (
                <div
                  key={s.n}
                  className="flex gap-4 rounded-3xl border bg-slate-50 p-5"
                  style={{ borderColor: `${BRAND.maroon}12` }}
                >
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-extrabold"
                    style={{ background: `${BRAND.maroon}12`, color: BRAND.maroon }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{s.t}</div>
                    <p className="mt-1 text-sm text-slate-600 leading-7">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border bg-white p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
              <div className="text-sm font-extrabold text-slate-900">Fast quotation checklist</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Share these items and we’ll recommend a practical configuration with BOQ clarity and installation notes.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {buyerChecklist.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="shrink-0 font-extrabold" style={{ color: BRAND.maroon }}>
                      •
                    </span>
                    <span className="leading-7">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  Request a Quotation
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
              <div className="text-sm font-extrabold text-slate-900">What you’ll receive from us</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                The goal is a clean, reliable podium setup that works daily—so we focus on integration details, not just
                the hardware.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {installDeliverables.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="shrink-0 font-extrabold" style={{ color: BRAND.maroon }}>
                      •
                    </span>
                    <span className="leading-7">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/digital-podium/#buying-guide"
                  className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: "rgba(15,23,42,0.12)" }}
                >
                  Buying guide
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  Request a Quotation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="boq-tender"
        className="mt-10 rounded-3xl border bg-white p-7 md:p-10"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">BOQ / tender-ready notes</h2>
        <p className="mt-2 text-slate-600 leading-7">
          For procurement, the goal is simple: compare like-for-like digital podium specifications so the delivered setup
          matches the room workflow. Use these notes to write clearer requirements and reduce mismatch risk.
        </p>

        <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
              <div className="text-sm font-extrabold text-slate-900">What to include in your BOQ</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {procurementNotes.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="shrink-0 font-extrabold" style={{ color: BRAND.maroon }}>
                      •
                    </span>
                    <span className="leading-7">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border bg-white p-6" style={{ borderColor: `${BRAND.maroon}12` }}>
              <div className="text-sm font-extrabold text-slate-900">Common mistakes to avoid</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {[
                  "Only comparing display size—without confirming touch quality, connectivity and integration scope.",
                  "Skipping cable distance and routing details (leading to messy and unsafe installations).",
                  "Not defining audio workflow (mic types, PA routing, and recording/streaming requirements).",
                  "Unclear PC/OS requirement, causing mismatch in software workflow for teachers/presenters.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="shrink-0 font-extrabold" style={{ color: BRAND.maroon }}>
                      •
                    </span>
                    <span className="leading-7">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-extrabold text-slate-900">Need BOQ clarity for a tender?</div>
                <p className="mt-2 text-sm text-slate-600 leading-7">
                  Share your BOQ/drawings and venue type. We’ll recommend a configuration and help define practical,
                  comparable specifications.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                  >
                    Contact for BOQ
                  </Link>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQs</h2>
            <p className="mt-2 text-slate-600 leading-7">
              Quick answers about digital podium price, configuration and installation support in Bangladesh.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 md:mt-0">
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-5">
          <FaqAccordion accent={BRAND.maroon} items={FAQS} />
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>
    </div>
  );
}

