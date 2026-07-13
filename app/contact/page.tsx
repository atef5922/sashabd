import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { siteConfig } from "../../lib/site";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import ContactForm from "./ContactForm";
import EmailReveal from "@/components/common/EmailReveal";


export const metadata: Metadata = {
  title: { absolute: "Contact Us for Quotation | Sasha Corporation" },
  description:
    "Contact Sasha Corporation for quotation, site survey and project consultation for indoor, outdoor, rental display solutions, PA sound system and turnstile gate.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Us for Quotation",
    description:
      "Reach Sasha Corporation for LED display project quotation, consultation and support.",
    url: "/contact",
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
      "Reach Sasha Corporation for LED display project quotation, consultation and support.",
    images: [socialImageUrl()],
  },
};

const MAROON = "#FF6A00";
const MAROON_DARK = "#E45700";

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
      <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
        {icon ? <span className="text-xl">{icon}</span> : null}
        {title}
      </h2>
      <div className="mt-3 h-1 w-14 rounded-full" style={{ background: `${MAROON}B3` }} />
      {desc ? <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{desc}</p> : null}
    </div>
  );
}

export default function AboutPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  // Researched contact details (from your live site)
  const phoneDisplay = "+880160-8843419";
  const phoneDial = "+880160-8843419";
  const address = siteConfig.address;

  // Simple embed without API key
  const mapQuery = "1st Floor, 36-37 Umesh Datta Road, Bakshibazar, Dhaka 1211, Bangladesh";
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=19&ie=UTF8&iwloc=B&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <main className="w-full bg-transparent">
      {/* receiving-card style container */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/contact/", label: "Contact", current: true },
          ]}
          className="mb-3 pt-3 text-sm text-slate-600"
        />
        {/* HERO (receiving-card style) */}
        <section className="rounded-3xl bg-white p-7 md:p-10">
          <div className="flex flex-col gap-4">
            {/* title block constrained */}
            <div className="max-w-3xl">
              {/* smaller header like receiving card */}
              <h1 className="mt-4 text-xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-3xl">
                Contact Us for Quotation
              </h1>
            </div>

            {/* keep same content; make paragraph full width like receiving card */}
            <p className="mt-1 w-full text-base leading-7 text-slate-600 text-justify">
              {BRAND_NAME} provides LED display sales, installation and support across Bangladesh—indoor/outdoor
              screens for signage, events, retail and corporate solutions. Based on your requirements, our skilled team will contact you as soon as possible.
            </p>
          </div>
        </section>

        {/* CONTACT DETAILS + MAP (same section/content) */}
        <section className="mt-8 rounded-3xl bg-slate-50 p-7 md:p-10">
          <SectionTitle
            icon="📍"
            title="Contact & Location"
            desc="For quotation, site survey or support—reach us anytime. Share your location, indoor/outdoor and approximate size for faster guidance."
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-slate-900">Phone</div>
              <div className="mt-2 text-slate-600">
                <a className="font-semibold text-slate-900 hover:underline" href={`tel:${phoneDial}`}>
                  {phoneDisplay}
                </a>
                <div className="mt-1 text-sm text-slate-500">Sales & support (call anytime)</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Email</div>
              <div className="mt-2 text-slate-600">
                <EmailReveal user="info" domain="sashabd.com" className="font-semibold text-slate-900 hover:underline" title="Email us" />
                <div className="mt-1 text-sm text-slate-500">Send requirements / BOQ / drawings</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Head Office</div>
              <div className="mt-2 text-slate-600">
                <div className="font-semibold text-slate-900">{address}</div>
                <div className="mt-1 text-sm text-slate-500">Dhaka, Bangladesh</div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border bg-white p-5 shadow-sm md:p-6" style={{ borderColor: `${MAROON}12` }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-slate-900">Quick Contact Form</div>
                <div className="mt-1 text-sm text-slate-600">Share your requirement and we will get back to you promptly.</div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${MAROON}12`, color: MAROON }}>
                User Friendly
              </span>
            </div>

            <ContactForm maroon={MAROON} maroonDark={MAROON_DARK} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp Now
            </a>
            <a
              href={`tel:${phoneDial}`}
              className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
              style={{ borderColor: `${MAROON}22` }}
            >
              Call
            </a>
            <EmailReveal
              user="info"
              domain="sashabd.com"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
              title="Email us"
              label="Email"
            />
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
              style={{ background: MAROON_DARK }}
            >
              Request a Quotation
            </Link>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border bg-white shadow-sm" style={{ borderColor: `${MAROON}12` }}>
            <div className="px-5 py-4">
              <div className="text-sm font-semibold text-slate-900">Google Map</div>
              <div className="mt-1 text-sm text-slate-600">Find our office location and navigate easily.</div>
            </div>

            <div className="relative h-[340px] w-full">
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
        <section className="mt-8 rounded-3xl bg-slate-50 p-7 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="min-w-0">
              <h3 className="text-2xl font-bold text-slate-900">Let’s build your LED display project</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Share your location and screen size—we’ll suggest the best setup and send a quotation with clear scope and
                timeline.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                style={{ background: MAROON_DARK }}
              >
                Get Quotation
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
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






