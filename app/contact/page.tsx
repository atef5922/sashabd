import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileIntroText from "@/components/common/MobileIntroText";
import { siteConfig } from "../../lib/site";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import { buildWhatsAppHref } from "@/lib/contact";
import ContactForm from "./ContactForm";
import EmailReveal from "@/components/common/EmailReveal";
import { conferenceSystemCatalog } from "@/app/conference-system/catalog";


export const metadata: Metadata = {
  title: { absolute: "Contact Us for Quotation | Sasha Corporation" },
  description:
    "Contact Sasha Corporation for conference systems, LED displays, PA sound systems and turnstile project quotation, site survey, installation and support in Bangladesh.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Us for Quotation",
    description:
      "Reach Sasha Corporation for conference system, LED display, PA sound and turnstile project quotation, consultation and support.",
    url: "/contact/",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "Contact Us for Quotation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us for Quotation",
    description:
      "Reach Sasha Corporation for conference system, LED display, PA sound and turnstile project quotation, consultation and support.",
    images: [socialImageUrl()],
  },
};

const MAROON = "#FF6A00";
const MAROON_DARK = "#E45700";
const conferenceQuoteProducts = conferenceSystemCatalog.map((product) => ({
  slug: product.slug,
  name: product.name,
  model: product.model,
}));

function SectionTitle({
  title,
  desc,
  icon,
}: {
  title: string;
  desc?: string;
  icon?: string;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-[1.65rem] font-bold tracking-tight text-slate-900 md:text-2xl">
        {icon ? <span className="text-xl">{icon}</span> : null}
        {title}
      </h2>
      <div className="mt-3 hidden h-1 w-14 rounded-full md:block" style={{ background: `${MAROON}B3` }} />
      {desc ? (
        <MobileIntroText
          teaser={desc}
          className="mt-4"
          teaserClassName="w-full text-[14px] leading-6 text-slate-600"
          expandedClassName="text-sm leading-7 text-slate-600"
          desktopClassName="max-w-3xl text-base leading-7 text-slate-600"
          buttonClassName="text-[13px]"
        >
          <p className="max-w-3xl text-base leading-7 text-slate-600 text-justify">{desc}</p>
        </MobileIntroText>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const wa = buildWhatsAppHref();

  const phoneDisplay = siteConfig.phone;
  const phoneDial = siteConfig.phone;
  const address = siteConfig.address;

  // Simple embed without API key
  const mapQuery = siteConfig.address;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=19&ie=UTF8&iwloc=B&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <main className="w-full bg-transparent">
      {/* receiving-card style container */}
      <div className="mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/contact/", label: "Contact", current: true },
          ]}
          className="mb-3 pt-3 text-sm text-slate-600"
        />
        {/* HERO (receiving-card style) */}
        <section className="rounded-[24px] bg-white p-4 md:rounded-3xl md:p-10">
          <div className="flex flex-col gap-4">
            {/* title block constrained */}
            <div className="max-w-3xl">
              {/* smaller header like receiving card */}
              <h1 className="mt-1 text-[1.7rem] font-extrabold leading-tight tracking-tight text-slate-900 md:mt-4 md:text-3xl">
                Contact Us for Quotation
              </h1>
            </div>

            <MobileIntroText
              teaser={`${BRAND_NAME} provides conference systems, LED displays, PA sound systems and turnstile project consultation, supply, installation and support across Bangladesh.`}
              className="mt-1"
              teaserClassName="w-full text-[14px] leading-6 text-slate-600"
              expandedClassName="text-sm leading-7 text-slate-600"
              desktopClassName="w-full text-base leading-7 text-slate-600"
              buttonClassName="text-[13px]"
            >
              <p className="mt-1 w-full text-base leading-7 text-slate-600 text-justify">
                {BRAND_NAME} provides conference systems, LED displays, PA sound systems and turnstile solutions for
                corporate, government, education, hospitality and event projects across Bangladesh. Share the product,
                quantity and project scope so our team can prepare the relevant quotation.
              </p>
            </MobileIntroText>
          </div>
        </section>

        {/* CONTACT DETAILS + MAP (same section/content) */}
        <section className="mt-8 rounded-[24px] bg-slate-50 p-4 md:rounded-3xl md:p-10">
          <SectionTitle
            icon="📍"
            title="Contact & Location"
            desc="For quotation, site survey or support, share your solution type, location, quantity, room or display size and expected timeline for faster guidance."
          />

          <div className="mt-6 grid gap-3 lg:mt-8 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-[14px] border border-slate-200/80 bg-white px-4 py-4 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
              <div className="text-sm font-semibold text-slate-900">Phone</div>
              <div className="mt-2 text-slate-600">
                <a className="font-semibold text-slate-900 hover:underline" href={`tel:${phoneDial}`}>
                  {phoneDisplay}
                </a>
                <div className="mt-1 text-sm text-slate-500">Sales & support (call anytime)</div>
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-200/80 bg-white px-4 py-4 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
              <div className="text-sm font-semibold text-slate-900">Email</div>
              <div className="mt-2 text-slate-600">
                <EmailReveal user="info" domain="sashabd.com" className="font-semibold text-slate-900 hover:underline" title="Email us" />
                <div className="mt-1 text-sm text-slate-500">Send requirements / BOQ / drawings</div>
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-200/80 bg-white px-4 py-4 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
              <div className="text-sm font-semibold text-slate-900">Head Office</div>
              <div className="mt-2 text-slate-600">
                <div className="font-semibold text-slate-900">{address}</div>
                <div className="mt-1 text-sm text-slate-500">Dhaka, Bangladesh</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[18px] border bg-white p-4 shadow-sm md:mt-8 md:rounded-2xl md:p-6" style={{ borderColor: `${MAROON}12` }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-slate-900">Quick Contact Form</div>
                <div className="mt-1 text-sm text-slate-600">Share your requirement and we will get back to you promptly.</div>
              </div>
              <span className="hidden rounded-full px-3 py-1 text-xs font-semibold md:inline-flex" style={{ background: `${MAROON}12`, color: MAROON }}>
                User Friendly
              </span>
            </div>

            <ContactForm maroon={MAROON} maroonDark={MAROON_DARK} conferenceProducts={conferenceQuoteProducts} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 md:mt-8 md:flex md:flex-wrap md:gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
            >
              WhatsApp Now
            </a>
            <a
              href={`tel:${phoneDial}`}
              className="inline-flex min-h-10 items-center justify-center rounded-md border bg-white px-3 py-2 text-[11px] font-extrabold text-slate-900 shadow-sm transition hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
              style={{ borderColor: `${MAROON}22` }}
            >
              Call
            </a>
            <EmailReveal
              user="info"
              domain="sashabd.com"
              className="inline-flex min-h-10 items-center justify-center rounded-md border bg-white px-3 py-2 text-[11px] font-extrabold text-slate-900 shadow-sm transition hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
              title="Email us"
              label="Email"
            />
            <Link
              href="/contact/"
              className="inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
              style={{ background: MAROON_DARK }}
            >
              Request a Quotation -&gt;
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-[18px] border bg-white shadow-sm md:mt-10 md:rounded-2xl" style={{ borderColor: `${MAROON}12` }}>
            <div className="px-5 py-4">
              <div className="text-sm font-semibold text-slate-900">Google Map</div>
              <div className="mt-1 text-sm text-slate-600">Find our office location and navigate easily.</div>
            </div>

            <div className="relative h-[250px] w-full md:h-[340px]">
              <a
                href={mapOpenUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open office location in Google Maps"
                className="absolute inset-0 z-10"
              />
              <iframe
                title="Google Map Location"
                src={mapEmbedSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA (same section/content) */}
        <section className="mt-8 rounded-[24px] bg-slate-50 p-4 md:rounded-3xl md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="min-w-0">
 <h3 className="text-2xl font-bold text-slate-900">Let&apos;s plan your technology project</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 text-justify">
 Share the solution type, product or model, quantity, location and installation needs. We&apos;ll review the scope and
                prepare a relevant quotation.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:flex-wrap md:gap-3">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
                style={{ background: MAROON_DARK }}
              >
                Get Quotation
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}





