import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileIntroText from "@/components/common/MobileIntroText";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "../../lib/site";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

const MAROON = "#FF6A00";

export const metadata: Metadata = {
  title: { absolute: `About ${BRAND_NAME}` },
  description:
    "Learn about Sasha Corporation, our mission, service standards, and long-term support approach across Bangladesh.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: `About ${BRAND_NAME} | Company Profile`,
    description:
      "Sasha Corporation company profile, mission, vision and service commitment.",
    url: "/about/",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: `About ${BRAND_NAME} | Company Profile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${BRAND_NAME} | Company Profile`,
    description:
      "Sasha Corporation company profile, mission, vision and service commitment.",
    images: [socialImageUrl()],
  },
};

function SectionTitle({
  title,
  subtitle,
  icon,
  subtitleClassName,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  subtitleClassName?: string;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-[1.65rem] font-bold tracking-tight text-slate-900 md:text-2xl">
        {icon ? <span className="text-xl">{icon}</span> : null}
        {title}
      </h2>
      {subtitle ? (
        <MobileIntroText
          teaser={subtitle}
          className="mt-4"
          teaserClassName="w-full text-[14px] leading-6 text-slate-600"
          expandedClassName="text-sm leading-7 text-slate-600"
          desktopClassName={subtitleClassName ?? "max-w-3xl text-base leading-7 text-slate-600"}
          buttonClassName="text-[13px]"
        >
          <p className={subtitleClassName ?? "max-w-3xl text-base leading-7 text-slate-600"}>{subtitle}</p>
        </MobileIntroText>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  const steps = [
    {
      n: "01",
      icon: "📝",
      t: "Requirement & information",
      d: "You share indoor/outdoor, location, approximate size and your purpose (signage, showroom, stage, events, etc.).",
    },
    {
      n: "02",
      icon: "📐",
      t: "Planning & guidance",
      d: "We recommend pixel pitch and brightness, and guide you on structure, power line and safety checklist.",
    },
    {
      n: "03",
      icon: "🛠️",
      t: "Install & configure",
      d: "Installation, wiring, controller mapping, configuration testing, and clean finishing with safety priority.",
    },
    {
      n: "04",
      icon: "✅",
      t: "Calibration & handover",
      d: "We calibrate for uniform output, test stability, provide basic training and outline support/warranty process.",
    },
  ];

  const missionBullets = [
    "Provide honest guidance based on viewing distance, environment and budget",
    "Ensure safe installation, stable configuration and clean finishing",
    "Offer dependable after-sales support with practical troubleshooting help",
  ];

  const visionBullets = [
    "Build long-term partnerships with clients and institutions",
    "Promote correct LED usage through proper guidance and documentation",
    "Grow nationwide with consistent service quality and support standards",
  ];

  const Bullet = ({ text }: { text: string }) => (
    <div className="flex gap-2 text-slate-600">
      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: MAROON }} />
      <span className="leading-7 text-justify">{text}</span>
    </div>
  );

  return (
    <main className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/about/", label: "About", current: true },
          ]}
          className="mb-3 pt-3 text-sm text-slate-600"
        />
        {/* HERO (Receiving-card style) */}
        <section className="rounded-[24px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="flex flex-col gap-4">
            {/* title block constrained */}
            <div className="max-w-3xl">
              {/* smaller header like receiving card */}
              <h1 className="mt-1 text-[1.7rem] font-extrabold tracking-tight text-slate-900 md:mt-4 md:text-3xl">
                About Sasha Corporation
              </h1>
            </div>

            <MobileIntroText
              teaser={`${BRAND_NAME} supplies, installs, and supports indoor and outdoor LED display solutions across Bangladesh.`}
              className="mt-1"
              teaserClassName="w-full text-[14px] leading-6 text-slate-600"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="w-full text-base leading-7 text-slate-600"
              buttonClassName="text-[13px]"
            >
              <p className="w-full text-base leading-7 text-slate-600 text-justify">
                {BRAND_NAME} supplies, installs, and supports indoor & outdoor LED display solutions across Bangladesh. We
                help you choose the right pixel pitch, brightness, and cabinet setup based on viewing distance,
                environment (indoor/outdoor), and budget, then deliver end-to-end execution: site planning, structure and
                power safety guidance, controller/receiving-card configuration, mapping, testing, calibration, and clean
                finishing. We import products from China and support a wide range of use cases including showroom
                signage, digital information boards, LED video walls, event/stage displays, and outdoor branding
                billboards. After handover, we stay available for warranty guidance, troubleshooting, and maintenance
                support, so your screen remains stable, serviceable, and performance-focused for the long run.
              </p>
            </MobileIntroText>

            {/* CTA buttons under hero (horizontal line) */}
            <div className="mt-2 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
                style={{ background: MAROON }}
              >
                Request a Quotation -&gt;
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
              >
                WhatsApp
              </a>
              <span className="col-span-2 hidden items-center text-[12px] leading-6 text-slate-500 md:flex md:text-sm">
                Tip: send size + indoor/outdoor + location for quick guidance
              </span>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="mt-8 rounded-[24px] bg-white p-4 md:rounded-3xl md:p-10">
          <SectionTitle
            icon="👋"
            title="Who we are"
            subtitleClassName="mt-4 w-full text-base leading-7 text-slate-600 text-justify"
            subtitle={`${BRAND_NAME} is a Bangladesh-based LED display solutions team. We help businesses, showrooms, institutions, and event operators choose the right LED configuration based on viewing distance, environment (indoor/outdoor), and budget, then deliver a complete setup with installation, calibration, and support. In Bangladesh's LED display sector, we are recognized as one of the top providers, driven by reliable engineering decisions, clean delivery, and long-term after-sales support.`}
          />

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="text-base">📦</span>
                <span>What we deliver</span>
              </h3>
              <div className="mt-3 space-y-2 text-slate-600">
                {[
                  "Indoor & outdoor LED display supply (signage, stage, retail, corporate and billboard)",
                  "Controller setup, mapping, testing and calibration for uniform output",
                  "Structure + power planning guidance (grounding, protection and safety checklist)",
                  "Maintenance guidance, troubleshooting support and upgrade planning",
                ].map((x) => (
                  <Bullet key={x} text={x} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="mt-8 rounded-[24px] bg-rose-50 p-4 md:rounded-3xl md:p-10">
          <SectionTitle
            icon="🛠️"
            title="How we work"
            subtitle="We keep the process simple and clear so you know what you're getting and when you'll get it, without confusion or hidden scope."
          />

          <div className="-mx-0.5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mt-9 md:grid md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="w-[89%] shrink-0 snap-start rounded-[14px] border bg-white px-4 py-4 md:w-auto md:shrink md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0"
                style={{ borderColor: `${MAROON}20` }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold" style={{ color: MAROON }}>
                    {s.n}
                  </div>
                  <div className="text-xl">{s.icon}</div>
                </div>
                <div className="mt-2 text-[17px] font-semibold leading-snug text-slate-900 md:text-lg">{s.t}</div>
                <p className="mt-2 text-[13px] leading-6 text-slate-600 text-justify md:text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mt-8 rounded-[24px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 overflow-hidden rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:overflow-visible">
              <SectionTitle
                icon="🎯"
                title="Mission"
                subtitle="Deliver reliable LED display solutions that create long-term value: selected correctly, installed safely, calibrated properly, and supported responsibly."
              />
              <div className="mt-6 space-y-2 text-slate-600">
                {missionBullets.map((x) => (
                  <div key={x} className="flex min-w-0 items-start gap-2">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: MAROON }} />
                    <span className="min-w-0 break-words text-justify text-[14px] leading-7 md:text-base">{x}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:overflow-visible">
              <SectionTitle
                icon="🔭"
                title="Vision"
                subtitle="Become one of the most trusted LED display partners in Bangladesh by setting standards for quality, transparency and technical responsibility."
              />
              <div className="mt-6 space-y-2 text-slate-600">
                {visionBullets.map((x) => (
                  <div key={x} className="flex min-w-0 items-start gap-2">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: MAROON }} />
                    <span className="min-w-0 break-words text-justify text-[14px] leading-7 md:text-base">{x}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
