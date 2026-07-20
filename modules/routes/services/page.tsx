import Link from "next/link";
import FaqAccordion from "@/components/common/FaqAccordion";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";

const MAROON = "#FF6A00";

type TitleIconKind = "SCOPE" | "CATEGORIES" | "SERVICES" | "DELIVERABLES" | "PROCESS" | "FAQ" | "AFTER_SALES";

function TitleMark({ kind }: { kind: TitleIconKind }) {
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, fill: "none" } as const;

  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 text-slate-700"
      style={{ borderColor: `${MAROON}33` }}
      aria-hidden="true"
    >
      {kind === "SCOPE" ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M4 5h16v14H4z" />
          <path {...stroke} d="M8 9h8M8 13h6" strokeLinecap="round" />
        </svg>
      ) : kind === "CATEGORIES" ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <rect x="4" y="5" width="7" height="6" {...stroke} />
          <rect x="13" y="5" width="7" height="6" {...stroke} />
          <rect x="4" y="13" width="16" height="6" {...stroke} />
        </svg>
      ) : kind === "SERVICES" ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="m8 7 2-2 3 3-2 2-3-3Zm4 4 5 5-2 2-5-5 2-2Z" />
          <path {...stroke} d="M5 19l3-3" strokeLinecap="round" />
        </svg>
      ) : kind === "DELIVERABLES" ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M7 4h10v16H7z" />
          <path {...stroke} d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : kind === "PROCESS" ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path
            {...stroke}
            d="M4 8h10M14 8l-2-2m2 2-2 2M20 16H10m0 0 2-2m-2 2 2 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : kind === "FAQ" ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path {...stroke} d="M9.7 9.3a2.3 2.3 0 1 1 3.9 1.6c-.8.7-1.4 1.1-1.4 1.9" strokeLinecap="round" />
          <circle cx="12" cy="16.6" r="1" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M4 12a8 8 0 0 1 8-8h2a6 6 0 1 1 0 12h-2" />
          <path {...stroke} d="M8 16v4M12 16v4" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

function Title({
  title,
  desc,
  icon,
}: {
  title: string;
  desc?: string;
  icon?: TitleIconKind;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
        {icon ? <TitleMark kind={icon} /> : null}
        {title}
      </h2>
      <div className="mt-3 hidden h-1 w-14 rounded-full md:block" style={{ background: `${MAROON}B3` }} />
      {desc ? <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{desc}</p> : null}
    </div>
  );
}

const services = [
  {
    icon: "S1",
    title: "Site Survey and Consultation",
    desc: "We review the site and usage goal, then recommend pixel pitch, size and mounting method so the screen stays readable and stable over time.",
    items: ["Viewing distance + pitch selection", "Brightness and environment planning", "Structure + mounting checklist"],
  },
  {
    icon: "S2",
    title: "Supply and Delivery",
    desc: "End-to-end supply support including controllers and accessories, with practical configuration guidance so installation is smooth.",
    items: ["Modules/cabinets (indoor/outdoor/rental)", "Controller + receiving chain guidance", "Accessory + spare planning"],
  },
  {
    icon: "S3",
    title: "Installation and Calibration",
    desc: "Professional installation with safe wiring and clean finishing, plus calibration for uniform brightness and consistent output.",
    items: ["Structure alignment + finishing", "Power/signal wiring + protection", "Calibration, testing + handover"],
  },
  {
    icon: "S4",
    title: "Repair and Maintenance Support",
 desc: "Troubleshooting and maintenance support to reduce downtime-with remote guidance first and on-site support when needed.",
    items: ["Module/PSU troubleshooting", "Mapping + signal diagnostics", "Preventive maintenance guidance"],
  },
];

const supportTags = [
  "Installation",
  "Calibration",
  "Controller Setup",
  "Power Support",
  "Repair",
  "Maintenance",
  "Training",
  "PA System (Optional)",
  "Turnstile/Access (Optional)",
];

const steps = [
  { n: "01", icon: "A", t: "Share Requirements", d: "Indoor/outdoor type, location, approximate size, and purpose." },
  { n: "02", icon: "B", t: "Survey and Recommendation", d: "Pitch + brightness recommendation with structure and power guidance." },
  { n: "03", icon: "C", t: "Quotation & Scope", d: "Clear scope, timeline, warranty terms, and support plan." },
  { n: "04", icon: "D", t: "Setup & Support", d: "Installation, calibration, handover, and after-sales assistance." },
];

const deliverables = [
  "Pixel pitch + brightness recommendation",
  "Structure, wiring and power load checklist",
  "Controller configuration + content test",
  "Basic operator handover for your team",
  "Warranty and support handover notes",
];

const faqs = [
  {
    q: "How quickly can service be scheduled?",
    a: "Scheduling depends on project size and location. For many Dhaka jobs we can respond quickly, then confirm a visit or installation window after a short requirement review.",
  },
  {
    q: "Do you provide both indoor and outdoor support?",
    a: "Yes. We support indoor screens, outdoor billboards and rental setups, including controller setup, power planning and calibration guidance.",
  },
  {
    q: "Can I request only calibration or only repair?",
    a: "Yes. You can request partial service like calibration, troubleshooting, controller setup or periodic maintenance without a full new installation.",
  },
  {
    q: "What should I share for a quick quotation?",
    a: "Share location, indoor or outdoor type, approximate screen size, usage purpose, and timeline. With that, we can suggest the right scope and a realistic budget range.",
  },
  {
    q: "Do you provide emergency on-site troubleshooting?",
    a: "Yes. Emergency on-site troubleshooting is available depending on location and team availability, especially when a display is down and needs urgent recovery.",
  },
  {
    q: "Can you upgrade controller or processor without changing full screen?",
    a: "In many cases, yes. We can review the current system and recommend compatible controller or processor upgrades to improve stability or input scaling.",
  },
  {
    q: "Do you offer preventive maintenance contracts?",
    a: "Yes. Preventive plans can include periodic inspection, calibration, cleaning guidance and early fault detection to reduce downtime.",
  },
  {
    q: "Will my team get basic operation and handover training?",
    a: "Yes. After setup or service completion, we provide practical handover guidance so your team can run daily content and basic checks with confidence.",
  },
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/services-support/", label: "Services and Support", current: true },
          ]}
          className="mb-3 pt-3 text-sm text-slate-600"
        />
        <section className="rounded-3xl bg-white p-7 md:p-10">
          <div className="flex flex-col gap-4">
            <div className="max-w-3xl">
              <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Our Services and Support
              </h1>
            </div>

            <p className="mt-1 w-full text-justify text-base leading-7 text-slate-600">
              End-to-end LED display service in Bangladesh, starting with requirement discovery and ending with a clear
              handover and support plan. We help you select the right pixel pitch, brightness, and control ecosystem,
              then guide structure and power safety (grounding, surge protection, distribution), complete installation,
              controller and receiving-card setup, mapping, testing, and calibration for uniform output. After
              delivery, we support troubleshooting, warranty coordination, preventive maintenance guidance, and upgrade
              planning so your screen stays stable, serviceable, and easy to operate over the long run.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              For product options and current market planning, visit our{" "}
              <Link href="/led-display/" className="font-extrabold text-slate-900 hover:underline">
                LED Display Price in Bangladesh 2026
              </Link>{" "}
              page or contact our team for project-specific quotation support.
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/contact/"
                className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                style={{ background: MAROON }}
              >
                Request Service -&gt;
              </Link>
              <Link
                href="/led-display/"
                className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                style={{ borderColor: `${MAROON}22` }}
              >
                View Products
              </Link>
              <span className="flex items-center text-sm text-slate-500">
                Tip: share location + indoor/outdoor + size for quick response
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              {["On-site Survey", "Clean Installation", "Warranty Guidance", "Maintenance Support"].map((x) => (
                <span key={x} className="rounded-full border bg-slate-50 px-4 py-2" style={{ borderColor: `${MAROON}14` }}>
                  {`+ ${x}`}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <Title
            icon="SCOPE"
            title="What we support"
            desc="From basic installation to advanced controller configuration - choose only what you need."
          />

          <div className="mt-7 flex flex-wrap gap-2">
            {supportTags.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <Title
            icon="CATEGORIES"
            title="Indoor, Outdoor and Digital Product Service Coverage"
            desc="Complete service support for indoor LED displays, outdoor LED screens, and related digital product systems from planning to maintenance."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Indoor LED Display Services",
                d: "Planning, installation, controller setup, and calibration support for showroom, office, conference, and control room environments.",
                points: ["Fine pitch setup support", "Uniform color or brightness tuning", "Signal and controller troubleshooting"],
              },
              {
                t: "Outdoor LED Display Services",
                d: "Weather-ready installation and performance support for billboard, signage, and public display projects with stability and safety focus.",
                points: ["Brightness and visibility planning", "Power and protection guidance", "Outdoor reliability maintenance"],
              },
              {
                t: "Other Digital Product Services",
                d: "Support for controllers, receiving cards, power supplies, and other digital display accessories to keep full systems running smoothly.",
                points: ["Controller or processor configuration", "Accessory compatibility checks", "Spare and lifecycle support"],
              },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${MAROON}12` }}>
                <h3 className="text-base font-bold text-slate-900">{x.t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {x.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full" style={{ background: MAROON }} />
                      <span className="leading-6">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-50 p-7 md:p-10">
          <Title
            icon="SERVICES"
            title="Services we provide"
            desc="Simple, practical services that cover the full lifecycle - planning -> supply -> installation -> support."
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="p-1">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: MAROON }}
                  >
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-slate-900">{s.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full" style={{ background: MAROON }} />
                          <span className="leading-6">{it}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 h-1 w-12 rounded-full" style={{ background: `${MAROON}B3` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-50 p-7 md:p-10">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
 <span className="text-xl"></span>
              Warranty, service & support
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full" style={{ background: `${MAROON}B3` }} />
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              We import products from China and provide official warranty and service support in Bangladesh. Our focus is long-term performance, quick troubleshooting and practical maintenance guidance.
            </p>
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
 <span></span> Official warranty (clear scope)
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
 We keep warranty terms and service coverage clear-what's included, what's not, and how support is
                provided. This helps clients avoid confusion during troubleshooting or replacement.
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
 <span></span> Troubleshooting support
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                We support common issues like signal or power diagnostics, controller configuration, module or cabinet
                checking and operational guidance. Remote guidance is available, and on-site support can be arranged
                when needed.
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
 <span></span> Maintenance & spare planning
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                We help you plan practical spares (modules, PSU, receiving cards) and guide routine maintenance so the
                display stays stable over time. We also advise upgrades when you expand.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
              <TitleMark kind="AFTER_SALES" />
              After sales services
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full" style={{ background: `${MAROON}B3` }} />
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              We import LED display products from China and provide practical after-sales support in Bangladesh so your system stays stable, usable and ready for daily operation.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Technical support</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Fast troubleshooting support for common power, signal and controller issues with clear guidance for quick recovery.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Service coordination</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Structured support process with clear scope, update flow and response planning for both remote and on-site cases.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Lifecycle maintenance</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Guidance for periodic maintenance, spare planning and upgrade decisions to keep your display reliable over time.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-50 p-7 md:p-10">
          <Title
            icon="DELIVERABLES"
            title="What you get in handover"
            desc="Every completed project includes practical technical handover so your team can operate confidently."
          />

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {deliverables.map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-white px-4 py-3 text-sm font-medium text-slate-700"
                style={{ borderColor: `${MAROON}1F` }}
              >
                <span className="font-semibold" style={{ color: MAROON }}>
                  +
                </span>{" "}
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-rose-50 p-7 md:p-10">
          <Title
            icon="PROCESS"
            title="How we work"
            desc="A clear workflow - fast response, clean setup and dependable after-sales support."
          />

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="p-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold" style={{ color: MAROON }}>
                    {s.n}
                  </div>
                  <div className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-slate-700">
                    {s.icon}
                  </div>
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{s.t}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.d}</p>
                <div className="mt-5 h-1 w-10 rounded-full" style={{ background: `${MAROON}B3` }} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
              style={{ background: MAROON }}
            >
              Request Service -&gt;
            </Link>
            <Link
              href="/led-display/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
              style={{ borderColor: `${MAROON}22` }}
            >
              Browse Products
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <Title icon="FAQ" title="Frequently asked questions" desc="Quick answers to common service questions." />

          <div className="mt-7">
            <FaqAccordion items={faqs} accent={MAROON} />
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-900">Need LED display service support?</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Share indoor or outdoor type, location, and approximate size. We&apos;ll guide pixel pitch, scope and
              timeline quickly.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact/"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
              >
                Contact Us
              </Link>
              <Link
                href="/contact/"
                className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                style={{ background: MAROON }}
              >
                Get Quotation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

