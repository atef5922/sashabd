import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
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
      <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
        {icon ? <span className="text-xl">{icon}</span> : null}
        {title}
      </h2>
      <div className="mt-3 h-1 w-14 rounded-full" style={{ background: `${MAROON}B3` }} />
      {subtitle ? (
        <p className={subtitleClassName ?? "mt-4 max-w-3xl text-base leading-7 text-slate-600"}>{subtitle}</p>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  const steps = [
    {
      n: "01",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â",
      t: "Requirement & information",
      d: "You share indoor/outdoor, location, approximate size and your purpose (signage, showroom, stage, events, etc.).",
    },
    {
      n: "02",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â",
      t: "Planning & guidance",
      d: "We recommend pixel pitch and brightness, and guide you on structure, power line and safety checklist.",
    },
    {
      n: "03",
      icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â",
      t: "Install & configure",
      d: "Installation, wiring, controller mapping, configuration and testingÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âdone with clean finishing and safety priority.",
    },
    {
      n: "04",
      icon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦",
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
      <span className="leading-7">{text}</span>
    </div>
  );

  return (
    <main className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/about/", label: "About", current: true },
          ]}
          className="mb-3 pt-3 text-sm text-slate-600"
        />
        {/* HERO (Receiving-card style) */}
        <section className="rounded-3xl bg-white p-7 md:p-10">
          <div className="flex flex-col gap-4">
            {/* title block constrained */}
            <div className="max-w-3xl">
              {/* smaller header like receiving card */}
              <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                About Sasha Corporation
              </h1>
            </div>

            {/* full-width paragraph (margin-to-margin) */}
            <p className="mt-1 w-full text-base leading-7 text-slate-600 text-justify">
              {BRAND_NAME} supplies, installs, and supports indoor & outdoor LED display solutions across Bangladesh. We
              help you choose the right pixel pitch, brightness, and cabinet setup based on viewing distance,
              environment (indoor/outdoor), and budgetÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âthen deliver end-to-end execution: site planning, structure and
              power safety guidance, controller/receiving-card configuration, mapping, testing, calibration, and clean
              finishing. We import products from China and support a wide range of use cases including showroom
              signage, digital information boards, LED video walls, event/stage displays, and outdoor branding
              billboards. After handover, we stay available for warranty guidance, troubleshooting, and maintenance
              supportÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âso your screen remains stable, serviceable, and performance-focused for the long run.
            </p>

            {/* CTA buttons under hero (horizontal line) */}
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                style={{ background: MAROON }}
              >
                Request a Quotation -&gt;
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
              >
                WhatsApp
              </a>
              <span className="flex items-center text-sm text-slate-500">
                Tip: send size + indoor/outdoor + location for quick guidance
              </span>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <SectionTitle
            icon="ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹"
            title="Who we are"
            subtitleClassName="mt-4 w-full text-base leading-7 text-slate-600 text-justify"
            subtitle={`${BRAND_NAME} is a Bangladesh-based LED display solutions team. We help businesses, showrooms, institutions, and event operators choose the right LED configurationÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âbased on viewing distance, environment (indoor/outdoor), and budgetÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âthen deliver a complete setup with installation, calibration, and support. In BangladeshÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s LED display sector, we are recognized as one of the top providers, driven by reliable engineering decisions, clean delivery, and long-term after-sales support.`}
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span>ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦</span> What we deliver
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
        <section className="mt-8 rounded-3xl bg-rose-50 p-7 md:p-10">
          <SectionTitle
            icon="ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â©"
            title="How we work"
            subtitle="We keep the process simple and clear so you know what youÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢re getting and when youÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ll get itÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âwithout confusion or hidden scope."
          />

          <div className="mt-9 grid gap-8 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold" style={{ color: MAROON }}>
                    {s.n}
                  </div>
                  <div className="text-xl">{s.icon}</div>
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{s.t}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mt-8 rounded-3xl bg-white p-7 md:p-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                icon="ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯"
                title="Mission"
                subtitle="Deliver reliable LED display solutions that create long-term valueÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Âselected correctly, installed safely, calibrated properly, and supported responsibly."
              />
              <div className="mt-6 space-y-2 text-slate-600">
                {missionBullets.map((x) => (
                  <div key={x} className="flex gap-2">
                    <span className="mt-1 text-lg">ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦</span>
                    <span className="leading-7">{x}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle
                icon="ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸"
                title="Vision"
                subtitle="Become one of the most trusted LED display partners in Bangladesh by setting standards for quality, transparency and technical responsibility."
              />
              <div className="mt-6 space-y-2 text-slate-600">
                {visionBullets.map((x) => (
                  <div key={x} className="flex gap-2">
                    <span className="mt-1 text-lg">ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦</span>
                    <span className="leading-7">{x}</span>
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





