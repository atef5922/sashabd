import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site";
import { getProductsByCategory, ledAccessoriesCatalog, type ProductItem } from "@/lib/productsCatalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import IndoorFilterSection from "@/components/products/IndoorFilterSection";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Indoor LED Display Price in Bangladesh | Installation" },
  description:
    "Compare indoor LED display prices in Bangladesh for P1.25, P1.53, P1.86, P2 and P2.5 screens. Ideal for conference rooms, showrooms, control rooms and offices.",
  alternates: { canonical: absoluteUrl("/led-display/indoor-led/") },
  openGraph: {
    title: "Indoor LED Display Price in Bangladesh | Installation",
    description:
      "Compare indoor LED display prices in Bangladesh for P1.25, P1.53, P1.86, P2 and P2.5 screens. Ideal for conference rooms, showrooms, control rooms and offices.",
    url: absoluteUrl("/led-display/indoor-led/"),
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/indoor/P2.5-Indoor-LED-Display.webp"),
        width: 1200,
        height: 630,
        alt: "Indoor LED Display Prices in Bangladesh | Sasha Corporation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indoor LED Display Prices in Bangladesh | Sasha Corporation",
    description:
      "Indoor LED display models for showroom, office and control room. View features and request a recommendation.",
    images: [socialImageUrl("/images/indoor/P2.5-Indoor-LED-Display.webp")],
  },
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
  maroonText: "#C84B00",
};

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase() === "pixel pitch");
  if (!spec) return "Indoor";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

function parsePitchNumber(label: string): number | null {
  // Accept: "P1.25", "1.25", "1.25mm", "1.25 mm"
  const cleaned = label.trim().toLowerCase().replace(/^p/, "").replace(/mm/g, "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const Section = ({
  title,
  subtitle,
  children,
  titleIcon,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  titleIcon?: React.ReactNode;
}) => (
  <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
    <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
      {titleIcon ? (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-600" aria-hidden="true">
          {titleIcon}
        </span>
      ) : null}
      <span>{title}</span>
    </h2>
    {subtitle ? (
      <MobileIntroText
        teaser={subtitle}
        className="mt-2"
        teaserClassName="w-full leading-6"
        expandedClassName="text-sm leading-7 text-slate-600"
        desktopClassName="text-slate-600 leading-7"
      >
        <p className="text-slate-600 leading-7">{subtitle}</p>
      </MobileIntroText>
    ) : null}
    <div className="mt-5">{children}</div>
  </section>
);

const CardGrid = ({ items }: { items: { t: string; d: string; bullets?: string[] }[] }) => (
  <>
    <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
      {items.map((x, index) => (
        <div
          key={x.t}
              className="w-[86%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
          style={{
            borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
            background:
              index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
          }}
        >
          <div className="text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</div>
          <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
          {x.bullets?.length ? (
            <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
              {x.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-6">{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>

    <div className="hidden gap-4 md:grid md:grid-cols-3">
      {items.map((x) => (
        <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
          <div className="text-lg font-bold text-slate-900">{x.t}</div>
          <p className="mt-2 text-sm text-slate-600 leading-7">{x.d}</p>
          {x.bullets?.length ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {x.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  </>
);

export default function IndoorProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const all = getProductsByCategory("indoor");
  const stickyAccessories = ledAccessoriesCatalog.filter((p) =>
    p.slug === "16-pin-frc-ribbon-cable-idc" ||
    p.slug === "26-pin-idc-female-connector" ||
    p.slug === "26-pin-frc-ribbon-cable-idc"
  );

  // Price table (approx) mapping by pixel pitch (mm)
  const priceByPitch: { pitch: number; range: string }[] = [
 { pitch: 1.25, range: "10,600 - 18,200" },
 { pitch: 1.53, range: "9,600 - 20,300" },
 { pitch: 1.667, range: "9,748 - 17,700" },
 { pitch: 1.86, range: "8,600 - 17,000" },
 { pitch: 2.0, range: "7,599 - 13,450" },
 { pitch: 2.5, range: "6,600 - 12,250" },
 { pitch: 3.0, range: "5,600 - 11,100" },
 { pitch: 3.076, range: "4,600 - 11,650" },
 { pitch: 4.0, range: "3,600 - 8,750" },
 { pitch: 5.0, range: "6,205 - 7,950" },
  ];

  function getApproxPrice(pitch: number | null): string {
    if (pitch == null) return "Request quote";
    const hit = priceByPitch.find((x) => Math.abs(x.pitch - pitch) <= 0.001);
    return hit ? hit.range : "Request quote";
  }

  const excludedPriceRowSlugs = new Set<string>();

  // Build rows for the price table (sorted like screenshot: small pitch -> large pitch)
  const priceRows = [...all]
    .filter((p) => !excludedPriceRowSlugs.has(p.slug))
    .map((p) => {
      const pitchLabel = getPitchLabel(p);
      const pitchNum = parsePitchNumber(pitchLabel);
      return { p, pitchLabel, pitchNum, price: getApproxPrice(pitchNum) };
    })
    .sort((a, b) => {
      const av = a.pitchNum ?? 999;
      const bv = b.pitchNum ?? 999;
      if (av !== bv) return av - bv;
      return a.p.title.localeCompare(b.p.title, undefined, { sensitivity: "base" });
    });

  return (
    <div className="indoor-led-page mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/indoor-led/", label: "Indoor LED Display", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      <section
        className="mobile-page-intro-card rounded-none border-0 bg-transparent p-0 shadow-none md:rounded-3xl md:border md:bg-white md:p-6 md:shadow-sm"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        {/* HERO (boxed like /led-display/) */}
        <header className="pb-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Indoor LED Display Price in Bangladesh 2026
          </h1>

          <MobileIntroText
            teaser="Compare the best indoor LED display options in Bangladesh for viewing distance, pixel pitch and daily content."
            expandedClassName="mt-3"
            desktopClassName="mt-3"
          >
            <p className="w-full text-justify text-slate-600 leading-7">
              Compare the best <strong>indoor LED display</strong> options in Bangladesh by viewing distance, pixel pitch, refresh rate,
              brightness level, and daily content type. If you are searching for <strong>indoor LED display price in Bangladesh</strong>,
              <strong>conference room LED screen</strong>, <strong>showroom LED video wall</strong>, <strong>indoor stadium LED screen</strong>, <strong>indoor home theater LED display</strong> or <strong>control room monitoring display</strong>, the right combination of fine-pitch
              modules, dependable controller, clean power design, and expert calibration delivers clear text visibility, accurate color,
              smoother motion, and stable long-hour performance. From corporate offices to retail showrooms and operation centers, a
              properly engineered indoor setup improves communication quality, branding impact, and long-term service reliability in real
              Bangladesh conditions.
            </p>
          </MobileIntroText>

          <div className="mobile-intro-actions mt-4 flex flex-nowrap gap-2.5 md:mt-5 md:flex-wrap md:gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-4 hidden flex-wrap gap-2 text-xs font-semibold text-slate-700 md:flex">
            {["Pixel pitch guidance", "Professional installation", "Calibration and training", "After-sales support"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border bg-slate-50 px-4 py-2"
                  style={{ borderColor: `${BRAND.maroon}14` }}
                >
                  {t}
                </span>
              )
            )}
          </div>

          <div className="mt-3 hidden flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600 md:flex">
            <span className="text-slate-500">Related:</span>
            <Link href="/contact" className="underline underline-offset-4 hover:text-slate-900">
              BOQ quotation
            </Link>
            <Link href="/services-support/" className="underline underline-offset-4 hover:text-slate-900">
              Services & support
            </Link>
            <Link href="/projects/" className="underline underline-offset-4 hover:text-slate-900">
              Projects
            </Link>
          </div>
        </header>
      </section>

      <section
        className="mt-6 rounded-3xl border bg-white p-5 shadow-sm md:p-6"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        {/* PRODUCT GRID (boxed like /led-display/) */}
        <div className="[&>section:first-child]:mt-0">
          <Suspense fallback={<section className="mt-8" />}>
            <IndoorFilterSection all={all} stickyCards={stickyAccessories} />
          </Suspense>
        </div>
      </section>

      <Section
        title=""
        subtitle="Indoor LED display solutions in Bangladesh deliver sharp close-view clarity, smooth video playback, and long-term reliability for showrooms, conference rooms, control rooms, and corporate environments."
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-600" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
            </svg>
          </span>
          <span>Key Features of Indoor LED Display</span>
        </h2>
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
 i: "",
              t: "Fine Pixel Pitch Clarity",
              d: "High-definition visuals for near viewing with clear text, charts, and product media.",
            },
            {
 i: "",
              t: "Camera-Friendly Refresh",
              d: "Stable refresh and processing reduce flicker in live camera, studio, and hybrid event use.",
            },
            {
 i: "",
              t: "Color & Brightness Control",
              d: "Balanced indoor brightness and calibrated color output improve comfort and brand consistency.",
            },
            {
 i: "",
              t: "Efficient, Serviceable Design",
              d: "Reliable power architecture, cleaner heat handling, and easier maintenance for long-term uptime.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[84%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm" aria-hidden="true">
                  {x.i}
                </span>
                <span>{x.t}</span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
              <div className="mt-4 h-1 w-12 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
          {[
            {
 i: "",
              t: "Fine Pixel Pitch Clarity",
              d: "High-definition visuals for near viewing with clear text, charts, and product media.",
            },
            {
 i: "",
              t: "Camera-Friendly Refresh",
              d: "Stable refresh and processing reduce flicker in live camera, studio, and hybrid event use.",
            },
            {
 i: "",
              t: "Color & Brightness Control",
              d: "Balanced indoor brightness and calibrated color output improve comfort and brand consistency.",
            },
            {
 i: "",
              t: "Efficient, Serviceable Design",
              d: "Reliable power architecture, cleaner heat handling, and easier maintenance for long-term uptime.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm" aria-hidden="true">
                  {x.i}
                </span>
                <span>{x.t}</span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
              <div className="mt-4 h-1 w-12 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>

        <div className="mt-5 hidden flex-nowrap gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-700 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex md:flex-wrap md:overflow-visible md:pb-0">
          {[
            "Best for showroom and corporate LED video wall",
            "Optimized for close viewing distance",
            "Supports long-hour operation",
            "Scalable by room size and screen ratio",
          ].map((t) => (
            <span key={t} className="rounded-full border bg-slate-50 px-4 py-2" style={{ borderColor: `${BRAND.maroon}14` }}>
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section
        title="Main Components of an Indoor LED Display"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="5" width="6" height="6" rx="1" />
            <rect x="14" y="5" width="6" height="6" rx="1" />
            <rect x="9" y="13" width="6" height="6" rx="1" />
            <path d="M10 8h4" />
            <path d="M17 11v2" />
            <path d="M7 11v2h5" />
          </svg>
        }
        subtitle="Key hardware elements that work together to deliver stable visuals, accurate control, and long-term indoor performance."
      >
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "LED module",
              d: "The primary display surface that produces image output, color detail, and pixel-level visual clarity.",
            },
            {
              t: "Receiving card",
              d: "Receives video data from the control chain and maps content correctly to each module row and column.",
            },
            {
              t: "Power supply",
              d: "Converts and stabilizes electrical input for modules and control parts to ensure consistent operation.",
            },
            {
              t: "LED cabinet",
              d: "Holds modules and electronics in a structured frame for alignment, service access, and installation stability.",
            },
            {
              t: "Sending card",
              d: "Transmits processed video signals from the source system to the display control network.",
            },
            {
              t: "Video processor",
              d: "Handles signal scaling, switching, and output optimization for clean playback across different content sources.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[84%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="hidden items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 md:grid">
          {[
            {
              t: "LED module",
              d: "The primary display surface that produces image output, color detail, and pixel-level visual clarity.",
            },
            {
              t: "Receiving card",
              d: "Receives video data from the control chain and maps content correctly to each module row and column.",
            },
            {
              t: "Power supply",
              d: "Converts and stabilizes electrical input for modules and control parts to ensure consistent operation.",
            },
            {
              t: "LED cabinet",
              d: "Holds modules and electronics in a structured frame for alignment, service access, and installation stability.",
            },
            {
              t: "Sending card",
              d: "Transmits processed video signals from the source system to the display control network.",
            },
            {
              t: "Video processor",
              d: "Handles signal scaling, switching, and output optimization for clean playback across different content sources.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Applications of Indoor LED Displays"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 4l9 6.5" />
            <path d="M5 10v8h14v-8" />
            <path d="M9 18v-4h6v4" />
          </svg>
        }
        subtitle="Common indoor use cases where high clarity, stable performance, and professional content delivery are important."
      >
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            { t: "Corporate Boardroom", d: "Supports executive presentations, dashboards, and clear meeting communication." },
            { t: "Control Room", d: "Enables continuous monitoring with sharp data visibility and stable long-hour output." },
            { t: "Television Studio", d: "Delivers camera-friendly visuals for broadcast sets and program backdrops." },
            { t: "Shopping Mall Advertising", d: "Displays dynamic brand campaigns and promotional content in high-traffic areas." },
            { t: "Conference Hall", d: "Improves audience visibility for keynote visuals, text, and multimedia presentations." },
            { t: "Command & Control Center", d: "Provides reliable screen performance for mission-critical operational decisions." },
            { t: "Airport Display", d: "Shows public information, announcements, and wayfinding content clearly indoors." },
            { t: "Exhibition Center", d: "Creates high-impact visual engagement for booths, product launches, and event zones." },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[82%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="hidden gap-4 sm:grid-cols-2 lg:grid-cols-4 md:grid">
          {[
            { t: "Corporate Boardroom", d: "Supports executive presentations, dashboards, and clear meeting communication." },
            { t: "Control Room", d: "Enables continuous monitoring with sharp data visibility and stable long-hour output." },
            { t: "Television Studio", d: "Delivers camera-friendly visuals for broadcast sets and program backdrops." },
            { t: "Shopping Mall Advertising", d: "Displays dynamic brand campaigns and promotional content in high-traffic areas." },
            { t: "Conference Hall", d: "Improves audience visibility for keynote visuals, text, and multimedia presentations." },
            { t: "Command & Control Center", d: "Provides reliable screen performance for mission-critical operational decisions." },
            { t: "Airport Display", d: "Shows public information, announcements, and wayfinding content clearly indoors." },
            { t: "Exhibition Center", d: "Creates high-impact visual engagement for booths, product launches, and event zones." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Consultation */}
      <Section
 title="Indoor LED Display Project Consultation in Bangladesh"
 subtitle="Share your room size, viewing distance, and content type-then we recommend pixel pitch, screen size, processor, structure, and BOQ."
      >
        <div
          className="rounded-[14px] border bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] p-4 md:rounded-3xl md:bg-slate-50 md:p-6"
          style={{ borderColor: `${BRAND.maroon}10` }}
        >
          <ul className="space-y-3 text-sm text-slate-700">
            {[
              "Room size + viewing distance (front row to far row)",
 "Target screen size (ft) or wall size (W x H)",
              "Content type: text-heavy / video / live camera / dashboard",
              "Install method: wall mount / structure / hanging (if stage)",
              "Power source: single/three phase + backup (IPS/Generator)",
              "Control requirement: HDMI live input / scheduled playback / remote control",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                <span className="leading-7">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Indoor vs Outdoor */}
      <Section
 title="Indoor vs Outdoor LED Display Quick Comparison"
        subtitle="A simple comparison to avoid wrong selection and ensure the right build for your environment."
      >
        <div className="space-y-3 md:hidden">
          {[
            ["Brightness", "Comfort-focused, indoor lighting suitable", "High brightness, sunlight visible"],
            ["Protection", "Dust control + ventilation planning", "IP-rated sealing + water drainage"],
            ["Pixel Pitch", "Usually smaller (fine pitch)", "Often larger for distance viewing"],
            ["Cabinet Service", "Front/rear service options", "Service doors + weatherproof access"],
            ["Power/Surge", "Stable power + grounding", "Grounding + SPD strongly recommended"],
          ].map(([k, a, b], index) => (
            <article
              key={k}
              className="overflow-hidden rounded-[14px]"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(246,250,255,1) 0%, rgba(240,247,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,244,235,1) 100%)",
              }}
            >
              <div
                className="overflow-hidden rounded-[14px] border"
                style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}
              >
                <div className="border-b px-4 py-3 text-center" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                  <div className="text-[15px] font-extrabold tracking-tight text-slate-900">{k}</div>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <div className="border-r px-4 py-3" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                    <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#C84B00]">Indoor LED</div>
                    <p className="text-[13px] leading-6 text-slate-700">{a}</p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-sky-700">Outdoor LED</div>
                    <p className="text-[13px] leading-6 text-slate-700">{b}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-3xl border md:block" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="grid min-w-[680px] md:min-w-0 md:grid-cols-3">
            <div className="bg-slate-50 p-5 text-sm font-bold text-slate-800">Topic</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Indoor LED</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Outdoor LED</div>

            {[
              ["Brightness", "Comfort-focused, indoor lighting suitable", "High brightness, sunlight visible"],
              ["Protection", "Dust control + ventilation planning", "IP-rated sealing + water drainage"],
              ["Pixel Pitch", "Usually smaller (fine pitch)", "Often larger for distance viewing"],
              ["Cabinet Service", "Front/rear service options", "Service doors + weatherproof access"],
              ["Power/Surge", "Stable power + grounding", "Grounding + SPD strongly recommended"],
            ].map(([k, a, b]) => (
              <div key={k} className="contents">
                <div className="bg-slate-50 p-5 text-sm text-slate-700">{k}</div>
                <div className="bg-white p-5 text-sm text-slate-700">{a}</div>
                <div className="bg-white p-5 text-sm text-slate-700">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Technical specs explained */}
      <Section
 title="Indoor LED Display Technical Specifications Explained"
        subtitle="Understanding specs helps you compare models and choose the right ecosystem."
      >
        <CardGrid
          items={[
            {
 t: "Pixel Pitch",
              d: "Smaller pitch = higher resolution and better close viewing. Choose by viewing distance and content detail.",
              bullets: ["Close viewing: smaller pitch", "Halls: bigger pitch", "Budget vs clarity balance"],
            },
            {
 t: "Refresh Rate",
 d: "Higher refresh is better for camera/live video-reduces flicker lines in recording.",
              bullets: ["Stage/studio: high refresh", "Clean signal cabling", "Processor quality matters"],
            },
            {
 t: "Brightness & Grayscale",
              d: "Brightness must be comfortable indoors; grayscale affects smooth gradients and professional look.",
              bullets: ["Calibration improves uniformity", "Quality PSU helps stability", "Avoid over-bright setup"],
            },
          ]}
        />
      </Section>

      <Section
        title="Indoor LED Display Maintenance Guide"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-6.8 6.8-3.2.8.8-3.2z" />
            <path d="M13 8 16 11" />
            <path d="M5 19h14" />
          </svg>
        }
        subtitle="Follow this indoor LED display maintenance checklist to protect image quality, reduce downtime, and extend panel lifespan in showroom, office, and control room environments."
      >
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Cleaning",
              d: "Use a soft anti-static microfiber cloth for routine dust removal from LED module surfaces and cabinet vents. Avoid spraying liquid directly on the screen; if needed, apply approved cleaner to the cloth first. Regular cleaning keeps brightness uniform, improves color clarity, and prevents early component stress from dust accumulation.",
            },
            {
              t: "Calibration",
              d: "Run periodic calibration for brightness, grayscale, and color temperature so all modules remain visually consistent. After module replacement, controller updates, or processor changes, complete remapping and color correction immediately. Proper calibration helps maintain sharp text, natural colors, and professional indoor visual quality.",
            },
            {
              t: "Power safety",
              d: "Use stable power input, proper earthing, and surge protection to safeguard power supplies, receiving cards, and control systems. Avoid frequent hard on-off cycles and follow a controlled startup/shutdown sequence. Strong power safety practice reduces failure risk, protects data integrity, and improves long-term system reliability.",
            },
            {
              t: "Cooling",
              d: "Maintain open airflow around cabinets, control racks, and power sections, especially in enclosed indoor installations. Inspect fans, clean ventilation paths, and monitor ambient temperature to avoid overheating. Effective cooling prevents thermal stress, helps color stability, and supports reliable long-hour operation.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[84%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="hidden gap-4 sm:grid-cols-2 md:grid">
          {[
            {
              t: "Cleaning",
              d: "Use a soft anti-static microfiber cloth for routine dust removal from LED module surfaces and cabinet vents. Avoid spraying liquid directly on the screen; if needed, apply approved cleaner to the cloth first. Regular cleaning keeps brightness uniform, improves color clarity, and prevents early component stress from dust accumulation.",
            },
            {
              t: "Calibration",
              d: "Run periodic calibration for brightness, grayscale, and color temperature so all modules remain visually consistent. After module replacement, controller updates, or processor changes, complete remapping and color correction immediately. Proper calibration helps maintain sharp text, natural colors, and professional indoor visual quality.",
            },
            {
              t: "Power safety",
              d: "Use stable power input, proper earthing, and surge protection to safeguard power supplies, receiving cards, and control systems. Avoid frequent hard on-off cycles and follow a controlled startup/shutdown sequence. Strong power safety practice reduces failure risk, protects data integrity, and improves long-term system reliability.",
            },
            {
              t: "Cooling",
              d: "Maintain open airflow around cabinets, control racks, and power sections, especially in enclosed indoor installations. Inspect fans, clean ventilation paths, and monitor ambient temperature to avoid overheating. Effective cooling prevents thermal stress, helps color stability, and supports reliable long-hour operation.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Indoor LED Display vs LCD Video Wall"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="7" height="10" rx="1" />
            <rect x="14" y="6" width="7" height="10" rx="1" />
            <path d="M10 11h4" />
            <path d="M6 19h12" />
          </svg>
        }
        subtitle="Compare indoor LED display and LCD video wall solutions by visual performance, scalability, maintenance, and long-term operating value to choose the right technology for your project."
      >
        <div className="space-y-3 md:hidden">
          {[
            ["Seam Visibility", "Seamless large canvas for unified visuals and cleaner branding impact.", "Visible bezel lines between panels can interrupt image continuity."],
            ["Scalability", "Flexible sizing and aspect ratio for custom walls, stage sets, and creative layouts.", "Limited to fixed panel sizes and predefined grid combinations."],
            ["Viewing Experience", "Strong brightness control, wide viewing angle, and better large-format immersion.", "Good close-view detail but reduced impact on very large wall formats."],
            ["Long-Hour Operation", "Designed for stable continuous operation in control rooms and commercial environments.", "Can run long hours, but heat and bezel aging need tighter management over time."],
            ["Maintenance", "Module-level servicing allows targeted replacement with lower downtime risk.", "Panel-level replacement may increase cost and downtime in some service cases."],
            ["Best Use Case", "Showrooms, command centers, corporate lobbies, and premium indoor brand displays.", "Meeting rooms, monitoring walls, and budget-focused tiled display setups."],
          ].map(([k, a, b], index) => (
            <article
              key={k}
              className="overflow-hidden rounded-[14px]"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(246,250,255,1) 0%, rgba(240,247,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,244,235,1) 100%)",
              }}
            >
              <div
                className="overflow-hidden rounded-[14px] border"
                style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}
              >
                <div className="border-b px-4 py-3 text-center" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                  <div className="text-[15px] font-extrabold tracking-tight text-slate-900">{k}</div>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <div className="border-r px-4 py-3" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                    <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#C84B00]">Indoor LED</div>
                    <p className="text-[13px] leading-6 text-slate-700">{a}</p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-sky-700">LCD Video Wall</div>
                    <p className="text-[13px] leading-6 text-slate-700">{b}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-3xl border md:block" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="grid min-w-[760px] md:min-w-0 md:grid-cols-3">
            <div className="bg-slate-50 p-5 text-sm font-bold text-slate-800">Comparison Point</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Indoor LED Display</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">LCD Video Wall</div>

            {[
              ["Seam Visibility", "Seamless large canvas for unified visuals and cleaner branding impact.", "Visible bezel lines between panels can interrupt image continuity."],
              ["Scalability", "Flexible sizing and aspect ratio for custom walls, stage sets, and creative layouts.", "Limited to fixed panel sizes and predefined grid combinations."],
              ["Viewing Experience", "Strong brightness control, wide viewing angle, and better large-format immersion.", "Good close-view detail but reduced impact on very large wall formats."],
              ["Long-Hour Operation", "Designed for stable continuous operation in control rooms and commercial environments.", "Can run long hours, but heat and bezel aging need tighter management over time."],
              ["Maintenance", "Module-level servicing allows targeted replacement with lower downtime risk.", "Panel-level replacement may increase cost and downtime in some service cases."],
              ["Best Use Case", "Showrooms, command centers, corporate lobbies, and premium indoor brand displays.", "Meeting rooms, monitoring walls, and budget-focused tiled display setups."],
            ].map(([k, a, b]) => (
              <div key={k} className="contents">
                <div className="bg-slate-50 p-5 text-sm text-slate-700">{k}</div>
                <div className="bg-white p-5 text-sm text-slate-700">{a}</div>
                <div className="bg-white p-5 text-sm text-slate-700">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Xplore solutions */}
      <Section
 title="Explore High-Performance LED Display in Bangladesh"
 subtitle="From indoor video walls to outdoor branding and rental event screens-explore the right category for your project."
      >
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
            { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
            { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
          ].map((x) => (
            <Link
              key={x.t}
              href={x.href}
              className="group w-[84%] shrink-0 snap-start rounded-[14px] border px-4 py-4 transition"
              style={{
                borderColor: `${BRAND.maroon}14`,
                background: "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <div className="text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</div>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
              <div className="mt-4 text-[12px] font-extrabold" style={{ color: BRAND.maroonText }}>
                Explore -&gt;{" "}
              </div>
            </Link>
          ))}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-3">
          {[
            { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
            { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
            { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
          ].map((x) => (
            <Link
              key={x.t}
              href={x.href}
              className="group rounded-3xl border bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-lg font-extrabold text-slate-900">{x.t}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.d}</p>
              <div className="mt-4 text-sm font-bold" style={{ color: BRAND.maroonText }}>
                Explore -&gt;{" "}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="How to Choose the Right Pixel Pitch for Indoor LED Display"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-4.35-4.35" />
            <path d="M11 8v3l2 2" />
          </svg>
        }
        subtitle="Use this practical pixel pitch selection guide to match viewing distance, content type, and budget so your indoor LED display stays sharp, comfortable, and cost-efficient."
      >
        <div className="space-y-3 md:hidden">
          {[
            ["1.5m to 2.5m", "Fine text, UI, close-face viewing", "P1.25 to P1.53", "Executive boardrooms, premium brand showrooms"],
            ["2.5m to 4m", "Mixed text + video content", "P1.86 to P2.0", "Corporate meeting rooms, reception video walls"],
            ["4m to 6m", "Presentation-heavy visuals", "P2.5", "Conference halls, educational auditoriums"],
            ["6m+", "Large visuals, less micro-detail", "P3", "Large indoor stages, event halls, atrium displays"],
          ].map(([distance, content, pitch, scenario], index) => (
            <article
              key={distance}
              className="overflow-hidden rounded-[14px]"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(246,250,255,1) 0%, rgba(240,247,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,244,235,1) 100%)",
              }}
            >
              <div
                className="overflow-hidden rounded-[14px] border"
                style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}
              >
                <div className="border-b px-4 py-3 text-center" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                  <div className="text-[15px] font-extrabold tracking-tight text-slate-900">{distance}</div>
                  <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#C84B00]">Viewing Distance</div>
                </div>
                <div className="border-b px-4 py-3" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                  <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-sky-700">Content Priority</div>
                  <p className="text-[13px] leading-6 text-slate-700">{content}</p>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <div className="border-r px-4 py-3" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#C84B00]">Recommended Pitch</div>
                    <div className="mt-1 text-[13px] font-bold leading-5 text-slate-900">{pitch}</div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-sky-700">Best Scenario</div>
                    <div className="mt-1 text-[13px] leading-5 text-slate-700">{scenario}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-3xl border md:block" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="grid min-w-[820px] md:min-w-0 md:grid-cols-4">
            <div className="bg-slate-50 p-5 text-sm font-bold text-slate-800">Viewing Distance</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Content Priority</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Recommended Pixel Pitch</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Best Indoor Scenario</div>

            {[
              ["1.5m to 2.5m", "Fine text, UI, close-face viewing", "P1.25 to P1.53", "Executive boardrooms, premium brand showrooms"],
              ["2.5m to 4m", "Mixed text + video content", "P1.86 to P2.0", "Corporate meeting rooms, reception video walls"],
              ["4m to 6m", "Presentation-heavy visuals", "P2.5", "Conference halls, educational auditoriums"],
              ["6m+", "Large visuals, less micro-detail", "P3", "Large indoor stages, event halls, atrium displays"],
            ].map(([distance, content, pitch, scenario]) => (
              <div key={distance} className="contents">
                <div className="bg-slate-50 p-5 text-sm text-slate-700">{distance}</div>
                <div className="bg-white p-5 text-sm text-slate-700">{content}</div>
                <div className="bg-white p-5 text-sm font-semibold text-slate-800">{pitch}</div>
                <div className="bg-white p-5 text-sm text-slate-700">{scenario}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Step 1: Measure real viewing distance",
              d: "Use the nearest regular audience point, not the wall-to-wall room size. Pixel pitch should be chosen based on actual eye-to-screen distance.",
            },
            {
              t: "Step 2: Define dominant content",
              d: "Dashboards, spreadsheets, and text-heavy use need finer pitch than motion-heavy video loops and branding visuals.",
            },
            {
              t: "Step 3: Balance clarity with lifecycle cost",
              d: "Finer pitch increases initial price, but the right choice reduces rework risk and ensures better long-term user satisfaction.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[84%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 hidden gap-4 sm:grid-cols-3 md:grid">
          {[
            {
              t: "Step 1: Measure real viewing distance",
              d: "Use the nearest regular audience point, not the wall-to-wall room size. Pixel pitch should be chosen based on actual eye-to-screen distance.",
            },
            {
              t: "Step 2: Define dominant content",
              d: "Dashboards, spreadsheets, and text-heavy use need finer pitch than motion-heavy video loops and branding visuals.",
            },
            {
              t: "Step 3: Balance clarity with lifecycle cost",
              d: "Finer pitch increases initial price, but the right choice reduces rework risk and ensures better long-term user satisfaction.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Price per sq ft */}
      <Section
 title="Indoor LED Display Price Per Square Feet"
        subtitle="Indicative pricing by pixel pitch for quick comparison. For BOQ-based pricing, please share your required screen size and installation location."
      >
        <details className="group md:hidden">
          <summary className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden" style={{ borderColor: `${BRAND.maroon}14`, background: "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)" }}>
            Tap To Expand Price List
          </summary>
          <div className="mt-3 overflow-x-auto rounded-3xl border" style={{ borderColor: `${BRAND.maroon}18` }}>
            {/* Header row (light cyan like screenshot) */}
            <div className="grid min-w-[780px] grid-cols-12 gap-0 bg-sky-50 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
              <div className="col-span-7">Indoor LED Model</div>
              <div className="col-span-3 text-center">Pixel Pitch</div>
              <div className="col-span-2 text-right">Approx. Price (Per Sq.Ft)</div>
            </div>

            <div>
              {priceRows.map(({ p, pitchNum, price }) => (
                <div key={p.slug} className="grid min-w-[780px] grid-cols-12 items-center gap-0 bg-white px-4 py-3 text-sm">
                  <div className="col-span-7">
                    <Link
                      href={`/led-display/indoor-led/${p.slug}/`}
                      className="font-semibold text-slate-900 hover:underline"
                      style={{ textDecorationColor: `${BRAND.maroon}88` }}
                      title="Click to view full specifications"
                    >
                      {p.title}
                    </Link>
                    <div className="mt-1 text-xs text-slate-500">{p.subtitle}</div>
                  </div>

                  <div className="col-span-3 text-center text-sm text-slate-700">
                    {pitchNum != null ? `${pitchNum} mm` : getPitchLabel(p)}
                  </div>

                  <div className="col-span-2 text-right text-sm font-semibold text-slate-800">{price}</div>
                </div>
              ))}
            </div>
          </div>
        </details>

        <div className="hidden overflow-x-auto rounded-3xl border md:block" style={{ borderColor: `${BRAND.maroon}18` }}>
          {/* Header row (light cyan like screenshot) */}
          <div className="grid min-w-[780px] grid-cols-12 gap-0 bg-sky-50 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
            <div className="col-span-7">Indoor LED Model</div>
            <div className="col-span-3 text-center">Pixel Pitch</div>
            <div className="col-span-2 text-right">Approx. Price (Per Sq.Ft)</div>
          </div>

          <div>
            {priceRows.map(({ p, pitchNum, price }) => (
              <div key={p.slug} className="grid min-w-[780px] grid-cols-12 items-center gap-0 bg-white px-4 py-3 text-sm">
                <div className="col-span-7">
                  <Link
                    href={`/led-display/indoor-led/${p.slug}/`}
                    className="font-semibold text-slate-900 hover:underline"
                    style={{ textDecorationColor: `${BRAND.maroon}88` }}
                    title="Click to view full specifications"
                  >
                    {p.title}
                  </Link>
                  <div className="mt-1 text-xs text-slate-500">{p.subtitle}</div>
                </div>

                <div className="col-span-3 text-center text-sm text-slate-700">
                  {pitchNum != null ? `${pitchNum} mm` : getPitchLabel(p)}
                </div>

                <div className="col-span-2 text-right text-sm font-semibold text-slate-800">{price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 hidden flex-nowrap gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-700 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex md:flex-wrap md:overflow-visible md:pb-0">
 {["Tip: Smaller pitch = higher cost", "Camera use: choose higher refresh", "For exact BOQ: share W x H + site"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border bg-slate-50 px-4 py-2"
                style={{ borderColor: `${BRAND.maroon}14` }}
              >
                {t}
              </span>
            )
          )}
        </div>
      </Section>

      {/* How to choose */}
      <Section
 title="How to Choose the Right Digital LED Display in Bangladesh"
        subtitle="Follow these simple steps to pick the right pitch, size, and control system for your space."
      >
        <CardGrid
          items={[
            {
              t: "Step 1: Confirm viewing distance",
              d: "Near viewing needs fine pitch; halls can use larger pitch without losing readability.",
              bullets: ["Close: P1.25-P1.86", "Balanced: P2-P2.5", "Distance: P3-P5"],
            },
            {
              t: "Step 2: Decide content type",
              d: "Text-heavy dashboards need higher clarity; live camera needs higher refresh and processor stability.",
              bullets: ["Text/UI: finer pitch", "Video: balanced pitch", "Camera: higher refresh"],
            },
            {
              t: "Step 3: Plan structure + power",
              d: "Correct structure, safe wiring, grounding, and commissioning ensure long-term stable performance.",
              bullets: ["Power sizing + MCB", "Grounding + SPD", "Calibration & testing"],
            },
          ]}
        />
      </Section>

      {/* Process */}
      <Section
 title="End-to-End LED Display Solution Process"
        subtitle="A clear delivery process from recommendation to installation to long-term service."
      >
        <details className="group md:hidden">
          <summary className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden" style={{ borderColor: `${BRAND.maroon}14`, background: "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)" }}>
            Tap To Expand Process Steps
          </summary>
          <div className="mt-3 grid gap-3">
            {[
              { t: "1) Survey", d: "Site visit, measurements, viewing distance, power check." },
              { t: "2) Design", d: "BOQ, structure plan, controller/processor selection." },
              { t: "3) Install", d: "Structure, wiring, cabinet assembly, safety checks." },
              { t: "4) Support", d: "Mapping, calibration, training, maintenance guidance." },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-[14px] border px-4 py-4"
                style={{
                  borderColor: `${BRAND.maroon}10`,
                  background:
                    "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
                }}
              >
                <div className="text-sm font-extrabold text-slate-900">{x.t}</div>
                <p className="mt-2 text-[13px] text-slate-600 leading-6">{x.d}</p>
              </div>
            ))}
          </div>
        </details>

        <div className="hidden grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid">
          {[
            { t: "1) Survey", d: "Site visit, measurements, viewing distance, power check." },
            { t: "2) Design", d: "BOQ, structure plan, controller/processor selection." },
            { t: "3) Install", d: "Structure, wiring, cabinet assembly, safety checks." },
            { t: "4) Support", d: "Mapping, calibration, training, maintenance guidance." },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-[14px] border px-4 py-4 md:rounded-3xl md:bg-slate-50 md:p-6"
              style={{
                borderColor: `${BRAND.maroon}10`,
                background:
                  "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <div className="text-sm font-extrabold text-slate-900">{x.t}</div>
              <p className="mt-2 text-[13px] text-slate-600 leading-6 md:text-sm md:leading-7">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-nowrap gap-2.5 md:flex-wrap md:gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get Indoor Display Consultation -&gt;
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 md:rounded-xl md:px-5 md:py-3 md:text-sm"
          >
            WhatsApp Now
          </a>
        </div>
      </Section>

      {/* FAQs */}
      <Section
 title="FAQs About LED Display Solution"
        subtitle="Practical answers to common questions before ordering an LED display project in Bangladesh."
      >
        <FaqAccordion
          accent={BRAND.maroon}
          items={[
            { q: "What is the best LED display for indoor use in Bangladesh?", a: "Indoor LED displays with fine pixel pitch such as P1.86, P2.5 or P3 are ideal for conference rooms, showrooms, control rooms and corporate offices where close viewing distance and image clarity are critical." },
            { q: "Which indoor pixel pitch is best for my project?", a: "For close viewing in conference rooms and showrooms, finer pitch like P1.25 to P2.0 is usually better. For larger halls with longer distance, P2.5 to P3 can be a more practical option." },
            { q: "What refresh rate is recommended for indoor screens with camera use?", a: "If the screen will be captured by camera, a higher refresh rate is recommended to reduce flicker and scan lines. Proper processor setup and signal quality are also important for clean output." },
            { q: "How bright should an indoor LED display be?", a: "Indoor screens should be bright enough for clarity but comfortable for eyes. Over-bright setup can look harsh indoors, so brightness should be tuned based on room lighting and content type." },
            { q: "Should I choose front-service or rear-service indoor cabinets?", a: "Front-service is useful when back access is limited. Rear-service can be suitable where maintenance space is available behind the screen. The right choice depends on wall condition and service access." },
            { q: "What power and safety planning is required for indoor installation?", a: "A stable power line, proper grounding, correct cable sizing, and MCB/DB planning are essential. These reduce risk and help maintain long-term stable performance." },
            { q: "How long does indoor LED display installation usually take?", a: "Timeline depends on screen size, site readiness, structure work, and content testing. Small to medium indoor projects are often completed within a few working days after materials are ready." },
            { q: "Do you provide indoor calibration, warranty, and after-sales support?", a: "Yes. Indoor projects typically include installation, mapping, calibration, handover guidance, and after-sales support according to the selected scope and warranty terms." },
          ]}
        />

        {/* Final CTA button */}
        <div className="mt-7 flex flex-nowrap gap-2.5 md:flex-wrap md:gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get LED Display Consultation -&gt;
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
          >
            WhatsApp for BOQ
          </a>
        </div>
      </Section>
    </div>
  );
}




