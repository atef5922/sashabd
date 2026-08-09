import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site";
import { getLedDisplayTablePrice, ledAccessoriesCatalog, outdoorCatalog } from "@/lib/productsCatalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileDisclosure from "@/components/common/MobileDisclosure";
import MobileIntroText from "@/components/common/MobileIntroText";
import OutdoorFilterSection from "@/components/products/OutdoorFilterSection";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Outdoor LED Display Price in Bangladesh | Advertising Screen" },
  description:
    "Outdoor LED display price in Bangladesh - waterproof P2.5-P10 setup for billboards, shop signage, roof, roadside screens, clear visibility, and high brightness.",
  alternates: { canonical: absoluteUrl("/led-display/outdoor/") },
  openGraph: {
    title: "Outdoor LED Display Price in Bangladesh | Advertising Screen",
    description:
      "Outdoor LED display price in Bangladesh - waterproof P2.5-P10 setup for billboards, shop signage, roof, roadside screens, clear visibility, and high brightness.",
    url: absoluteUrl("/led-display/outdoor/"),
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/outdoor/P5-Outdoor-LED-Display.webp"),
        width: 1200,
        height: 630,
        alt: "Outdoor LED Display Price in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor LED Display Price in Bangladesh",
    description:
      "Waterproof outdoor LED display screen price and module options for signage and billboards in Bangladesh.",
    images: [socialImageUrl("/images/outdoor/P5-Outdoor-LED-Display.webp")],
  },
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
};

const outdoorCategoryLinks = [
  { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
  { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
  { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
];

function getPitchLabel(p: (typeof outdoorCatalog)[number]): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel"));
  if (!spec) return "Outdoor";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

function parsePitchNumber(label: string): number | null {
  // Accept: "P2.5", "2.5", "2.5mm", "2.5 mm"
  const cleaned = label.trim().toLowerCase().replace(/^p/, "").replace(/mm/g, "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const Section = ({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="mt-8 rounded-[24px] border bg-white p-4 md:mt-10 md:rounded-3xl md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
    {icon ? (
      <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-600" aria-hidden="true">
          {icon}
        </span>
        <span>{title}</span>
      </h2>
    ) : (
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    )}
    {subtitle ? (
      <MobileIntroText
        teaser={subtitle}
        className="mt-2"
        teaserClassName="w-full leading-6"
        expandedClassName="text-sm leading-7 text-slate-600"
        desktopClassName="text-slate-600 leading-7"
        singleDom
      >
        <p className="text-slate-600 leading-7">{subtitle}</p>
      </MobileIntroText>
    ) : null}
    <div className="mt-5">{children}</div>
  </section>
);

function responsiveCardStyle(index: number, desktopBorderColor = `${BRAND.maroon}10`) {
  return {
    "--mobile-border-color": index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
    "--mobile-bg":
      index % 2 === 0
        ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
        : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
    "--desktop-border-color": desktopBorderColor,
  } as React.CSSProperties;
}

function priceRowStyle(index: number) {
  return {
    "--price-mobile-border": index % 2 === 0 ? "rgba(110,231,183,0.65)" : "rgba(125,211,252,0.65)",
    "--price-mobile-bg":
      index % 2 === 0
        ? "linear-gradient(180deg, rgba(236,253,245,1) 0%, rgba(240,253,250,1) 100%)"
        : "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)",
  } as React.CSSProperties;
}

const CardGrid = ({ items }: { items: { i?: React.ReactNode; t: string; d: string; bullets?: string[] }[] }) => (
  <>
    <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
      {items.map((x, index) => (
        <div
          key={x.t}
          className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
          style={{
            borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
            background:
              index % 2 === 0
                ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
          }}
        >
          <div className="flex items-center gap-2 text-[17px] font-extrabold leading-snug text-slate-900">
            {x.i ? <span aria-hidden="true">{x.i}</span> : null}
            <span>{x.t}</span>
          </div>
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
          <div className="flex items-center gap-2 text-slate-900">
            {x.i ? <span aria-hidden="true">{x.i}</span> : null}
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-extrabold leading-tight tracking-tight lg:text-[16px]">
              {x.t}
            </span>
          </div>
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

export default function OutdoorProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const all = outdoorCatalog;
  const stickyAccessorySlugs = [
    "structure-mounting-accessories",
    "led-display-power-connector-cable",
  ] as const;
  const stickyAccessories = stickyAccessorySlugs
    .map((slug) => ledAccessoriesCatalog.find((p) => p.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const brandLogos: Array<{ name: string; src: string; href?: string }> = [
    { name: "G-Energy", src: "/images/logo/g-energy.webp" },
    { name: "Lampro", src: "/images/logo/lampro.webp", href: "https://www.lampro.net/" },
    { name: "NovaStar", src: "/images/logo/novastar.webp", href: "https://www.novastar.tech/" },
    { name: "Huidu", src: "/images/brands/huidu.webp", href: "https://www.huidu.cn/" },
    { name: "Colorlight", src: "/images/logo/colorlight.webp", href: "https://en.colorlightinside.com/" },
    { name: "Mean Well", src: "/images/logo/mean-well.webp", href: "https://www.meanwell.com/" },
    { name: "Mugnee Multiple Limited", src: "/images/logo/mugnee.webp", href: "https://www.mugnee.com/" },
    { name: "Renex Digital", src: "/images/brands/renex-exact.webp", href: "https://renex.com.bd/" },
  ];

  function getApproxOutdoorPrice(slug: string): string {
    return getLedDisplayTablePrice(slug) ?? "Request quote";
  }

  const outdoorPriceRows = [...all]
    .map((p) => {
      const pitchLabel = getPitchLabel(p);
      const pitchNum = parsePitchNumber(pitchLabel);
      return { p, pitchNum, pitchLabel, price: getApproxOutdoorPrice(p.slug) };
    })
    .sort((a, b) => {
      const av = a.pitchNum ?? 999;
      const bv = b.pitchNum ?? 999;
      if (av !== bv) return av - bv;
      return a.p.title.localeCompare(b.p.title, undefined, { sensitivity: "base" });
    });

  return (
    <div className="outdoor-led-page mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/outdoor/", label: "Outdoor LED Display", current: true },
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
            Outdoor LED Display Price in Bangladesh
          </h1>

          <MobileIntroText
            teaser="Outdoor LED displays are built for daylight visibility, weather resistance and long-distance readability in Bangladesh."
            expandedClassName="mt-3"
            desktopClassName="mt-3"
            singleDom
          >
            <p className="w-full text-justify text-slate-600 leading-7">
              <strong>Outdoor LED Displays</strong> are engineered for strong daylight visibility, weather resistance, and long-distance readability
              across highways, city roads, markets, <strong>rooftop</strong> installations, and <strong>shopfront</strong> commercial facades in Bangladesh.
              Professional outdoor LED display solutions for advertising, branding, public communication, and digital signage in Bangladesh.
              If you are comparing <strong> outdoor LED display screen price in Bangladesh</strong>, <strong>waterproof LED billboard panel</strong> options,
              <strong>digital signage board</strong> quality, <strong>outdoor LED display</strong> for stadium or <strong>roadside advertising screen</strong> performance,
              the right setup should match pixel pitch, <strong>High brightness</strong> output, refresh stability, control system quality, and site-specific
              structure design. With proper power distribution, earthing, surge protection (SPD), sealed <strong>waterproof</strong> assembly, and expert
              commissioning, your <strong>outdoor LED billboard</strong> stays clear, stable, and service-ready for long-hour operation in real Bangladesh
              outdoor conditions.
            </p>
          </MobileIntroText>

          <div className="mobile-intro-actions mt-4 flex flex-nowrap gap-2.5 md:mt-5 md:flex-wrap md:gap-3">
            <Link
              href="/contact/"
              className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-4 hidden flex-wrap gap-2 text-xs font-semibold text-slate-700 md:flex">
            {["Daylight visibility", "Weatherproof planning", "Surge protection (SPD)", "Installation and support"].map(
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
            <Link href="/led-display/" className="underline underline-offset-4 hover:text-slate-900">
              LED display price hub
            </Link>
            <Link href="/led-display/waterproof-outdoor-led-display/" className="underline underline-offset-4 hover:text-slate-900">
              Waterproof guide
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
        className="mt-5 rounded-[24px] border bg-white p-4 shadow-sm md:mt-6 md:rounded-3xl md:p-6"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        {/* PRODUCT GRID (boxed like /led-display/) */}
        <div className="[&>section:first-child]:mt-0">
          <Suspense fallback={<section className="mt-8" />}>
            <OutdoorFilterSection all={all} stickyCards={stickyAccessories} />
          </Suspense>
        </div>
      </section>

      {false && (
      <Section title="" subtitle="">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-600" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 4.5 6v6.5c0 4 3 6.5 7.5 8 4.5-1.5 7.5-4 7.5-8V6z" />
              <path d="M8 11.5 11 14l4-4" />
            </svg>
          </span>
          <span>Trusted Technology Partners</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          We use globally trusted outdoor LED display components in Bangladesh projects with
          <strong> G-Energy</strong>, <strong>Lampro</strong>, <strong>NovaStar</strong>, <strong>Huidu</strong>,{" "}
          <strong>Colorlight</strong>, <strong>Mean Well</strong>, <strong>Mugnee Multiple Limited</strong>, and <strong>Renex Digital</strong> to
          ensure stable performance, reliable power, and long-term support.
        </p>
        <div className="hidden">
          <span
            className="inline-flex items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700"
            style={{ borderColor: `${BRAND.maroon}14` }}
          >
            Trusted Technology Partners
          </span>
        </div>

        <div className="mt-6 rounded-3xl border bg-white p-4 md:p-5" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14"
              style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14"
              style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }}
            />

            <div className="group">
              <div className="flex w-max gap-3 animate-[renexMarquee_22s_linear_infinite] group-hover:[animation-play-state:paused]">
                {[...brandLogos, ...brandLogos].map((b, idx) => (
                  (b.href ? (
                    <a
                      key={`${b.name}-${idx}`}
                      href={b.href}
                      target="_blank"
                      rel="nofollow noreferrer"
                      className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border bg-white px-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: `${BRAND.maroon}12` }}
                      title={b.name}
                      aria-label={b.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.src}
                        alt={b.name}
                        className={
                          b.name === "G-Energy"
                            ? "h-20 w-auto max-w-[250px] object-contain"
                            : b.name === "Lampro"
                              ? "h-11 w-auto max-w-[160px] object-contain"
                              : b.name === "Huidu"
                                ? "h-12 w-auto max-w-[165px] object-contain"
                                : b.name === "NovaStar"
                                  ? "h-12 w-auto max-w-[170px] object-contain"
                                  : b.name === "Mugnee Multiple Limited"
                                    ? "h-12 w-auto max-w-[180px] object-contain"
                                    : b.name === "Renex Digital"
                                      ? "h-16 w-full max-w-none object-cover object-center"
                                  : "h-14 w-auto max-w-[190px] object-contain"
                        }
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div
                      key={`${b.name}-${idx}`}
                      className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border bg-white px-5 shadow-sm"
                      style={{ borderColor: `${BRAND.maroon}12` }}
                      title={b.name}
                      aria-label={b.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.src}
                        alt={b.name}
                        className={
                          b.name === "G-Energy"
                            ? "h-20 w-auto max-w-[250px] object-contain"
                            : b.name === "Lampro"
                              ? "h-11 w-auto max-w-[160px] object-contain"
                              : b.name === "Huidu"
                                ? "h-12 w-auto max-w-[165px] object-contain"
                                : b.name === "NovaStar"
                                  ? "h-12 w-auto max-w-[170px] object-contain"
                                  : b.name === "Mugnee Multiple Limited"
                                    ? "h-12 w-auto max-w-[180px] object-contain"
                                    : b.name === "Renex Digital"
                                      ? "h-16 w-full max-w-none object-cover object-center"
                                  : "h-14 w-auto max-w-[190px] object-contain"
                        }
                        loading="lazy"
                      />
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            {[
              "Quality-focused workflow",
              "Dedicated LED engineering team",
              "Industry-grade components",
              "Project-based support & service",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border bg-slate-50 px-4 py-2"
                style={{ borderColor: `${BRAND.maroon}14` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Section>
      )}

      <Section
        title="Key Features of Outdoor LED Display"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
          </svg>
        }
        subtitle="Outdoor LED display solutions in Bangladesh are designed for daylight visibility, weather resistance, and stable long-distance performance for billboards, roadside branding, and public information screens."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
 i: "☀",
              t: "High Brightness Visibility",
              d: "Clear and readable content under direct sunlight for roadside and open-air viewing.",
            },
            {
 i: "☔",
              t: "Weather-Resistant Build",
              d: "Outdoor-ready cabinet design with better resistance to rain, dust, and humidity conditions.",
            },
            {
 i: "↔",
              t: "Long-Distance Readability",
              d: "Optimized pixel pitch and screen scaling for larger audience zones and far-view impact.",
            },
            {
 i: "⚡",
              t: "Stable Power & Protection",
              d: "Reliable operation with proper grounding, surge protection, and balanced power distribution.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
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
            </div>
          ))}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
          {[
            {
 i: "☀",
              t: "High Brightness Visibility",
              d: "Clear and readable content under direct sunlight for roadside and open-air viewing.",
            },
            {
 i: "☔",
              t: "Weather-Resistant Build",
              d: "Outdoor-ready cabinet design with better resistance to rain, dust, and humidity conditions.",
            },
            {
 i: "↔",
              t: "Long-Distance Readability",
              d: "Optimized pixel pitch and screen scaling for larger audience zones and far-view impact.",
            },
            {
 i: "⚡",
              t: "Stable Power & Protection",
              d: "Reliable operation with proper grounding, surge protection, and balanced power distribution.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="flex items-center gap-2 text-slate-900">
                {x.i ? (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm" aria-hidden="true">
                    {x.i}
                  </span>
                ) : null}
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-extrabold leading-tight tracking-tight lg:text-[16px]">
                  {x.t}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 hidden gap-2 text-xs font-semibold text-slate-700 md:grid md:grid-cols-4">
          {[
            "Best for highway billboards and roadside signage",
            "Built for sunlight and harsh weather exposure",
            "Supports long-hour continuous display operation",
            "Scalable by viewing distance and screen size",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border bg-slate-50 px-4 py-2 text-center"
              style={{ borderColor: `${BRAND.maroon}14` }}
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section
        title="Why Choose Outdoor LED Display"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v3" />
            <path d="M18.36 5.64 16.24 7.76" />
            <path d="M21 12h-3" />
            <path d="M18.36 18.36 16.24 16.24" />
            <path d="M5.64 18.36 7.76 16.24" />
            <path d="M3 12h3" />
            <path d="M5.64 5.64 7.76 7.76" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        }
        subtitle="Outdoor communication often fails because screens wash out in sunlight, break in weather, or become hard to manage at scale. This guide focuses on practical benefits that solve those day-to-day buyer problems."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Sunlight readable high brightness",
              d: "Content stays readable in direct daylight, so pricing, promotions, and safety messages remain visible during peak sun hours.",
            },
            {
              t: "IP65 / IP66 weather protection",
              d: "Sealed outdoor cabinets help protect modules from rain, dust, and humidity, lowering weather-related failure risk in Bangladesh conditions.",
            },
            {
              t: "Long-distance visibility",
              d: "Proper pixel-pitch planning keeps text and visuals readable from farther roads and open public zones without losing message clarity.",
            },
            {
              t: "24/7 operation support",
              d: "Designed for long-hour duty cycles with stable power planning, helping critical announcements run continuously with fewer interruptions.",
            },
            {
              t: "Energy-efficient design",
              d: "Modern driver and brightness control systems reduce unnecessary power draw, improving operating efficiency over long-term daily use.",
            },
            {
              t: "Remote content management",
              d: "Teams can update schedules, emergency notices, and campaign content remotely, reducing on-site dependency and update delay.",
            },
            {
              t: "Power protection and voltage stability",
              d: "Outdoor sites often face voltage fluctuation. With grounding, surge protection (SPD), and correctly sized power distribution, the display stays safer and more stable for daily operation.",
            },
            {
              t: "Serviceable modular maintenance",
              d: "Outdoor LED cabinets are built for easier servicing: modular parts, clear wiring, and practical access planning help reduce downtime during repairs, cleaning, or module replacement.",
            },
            {
              t: "Advertisement and announcement in one screen",
              d: "The same display can run commercial ads and public information, so businesses and institutions avoid separate systems for two communication goals.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
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
              t: "Sunlight readable high brightness",
              d: "Content stays readable in direct daylight, so pricing, promotions, and safety messages remain visible during peak sun hours.",
            },
            {
              t: "IP65 / IP66 weather protection",
              d: "Sealed outdoor cabinets help protect modules from rain, dust, and humidity, lowering weather-related failure risk in Bangladesh conditions.",
            },
            {
              t: "Long-distance visibility",
              d: "Proper pixel-pitch planning keeps text and visuals readable from farther roads and open public zones without losing message clarity.",
            },
            {
              t: "24/7 operation support",
              d: "Designed for long-hour duty cycles with stable power planning, helping critical announcements run continuously with fewer interruptions.",
            },
            {
              t: "Energy-efficient design",
              d: "Modern driver and brightness control systems reduce unnecessary power draw, improving operating efficiency over long-term daily use.",
            },
            {
              t: "Remote content management",
              d: "Teams can update schedules, emergency notices, and campaign content remotely, reducing on-site dependency and update delay.",
            },
            {
              t: "Power protection and voltage stability",
              d: "Outdoor sites often face voltage fluctuation. With grounding, surge protection (SPD), and correctly sized power distribution, the display stays safer and more stable for daily operation.",
            },
            {
              t: "Serviceable modular maintenance",
              d: "Outdoor LED cabinets are built for easier servicing: modular parts, clear wiring, and practical access planning help reduce downtime during repairs, cleaning, or module replacement.",
            },
            {
              t: "Advertisement and announcement in one screen",
              d: "The same display can run commercial ads and public information, so businesses and institutions avoid separate systems for two communication goals.",
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
        title="Outdoor vs Indoor LED Display Comparison"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="7" height="10" rx="1" />
            <rect x="14" y="6" width="7" height="10" rx="1" />
            <path d="M10 11h4" />
            <path d="M6 19h12" />
          </svg>
        }
        subtitle="A practical side-by-side guide to help buyers choose the right LED display type based on environment, protection level, visibility target, and budget planning."
      >
        <div className="space-y-3 md:hidden">
          {[
            ["Brightness", "High brightness for daylight and open-sky readability.", "Comfort-tuned brightness for enclosed room viewing."],
            ["Waterproof rating", "Typically IP65 / IP66 weather-ready structure.", "Usually non-waterproof, built for controlled interiors."],
            ["Viewing distance", "Designed for medium to long-distance audience visibility.", "Optimized for close to medium viewing distance."],
            ["Pixel pitch range", "Commonly larger pitch (for example P2.5 to P10).", "Commonly finer pitch (for example P1.25 to P3)."],
            ["Installation area", "Roadside, rooftop, facade, highway, and public open areas.", "Boardrooms, showrooms, control rooms, and lobbies."],
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
              <div className="overflow-hidden rounded-[14px] border" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                <div className="border-b px-4 py-3 text-center" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                  <div className="text-[15px] font-extrabold tracking-tight text-slate-900">{k}</div>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <div className="border-r px-4 py-3" style={{ borderColor: "rgba(125, 211, 252, 0.65)" }}>
                    <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#C84B00]">Outdoor LED</div>
                    <p className="text-[13px] leading-6 text-slate-700">{a}</p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-sky-700">Indoor LED</div>
                    <p className="text-[13px] leading-6 text-slate-700">{b}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-3xl border md:block" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="grid md:grid-cols-3">
            <div className="border-b border-r border-slate-200 bg-slate-50 p-5 text-sm font-bold text-slate-800">Parameter</div>
            <div className="border-b border-r border-slate-200 bg-white p-5 text-sm font-bold text-slate-800">Outdoor LED Display</div>
            <div className="bg-white p-5 text-sm font-bold text-slate-800">Indoor LED Display</div>

            {[
              ["Brightness", "High brightness for daylight and open-sky readability.", "Comfort-tuned brightness for enclosed room viewing."],
              ["Waterproof rating", "Typically IP65 / IP66 weather-ready structure.", "Usually non-waterproof, built for controlled interiors."],
              ["Viewing distance", "Designed for medium to long-distance audience visibility.", "Optimized for close to medium viewing distance."],
              ["Pixel pitch range", "Commonly larger pitch (for example P2.5 to P10).", "Commonly finer pitch (for example P1.25 to P3)."],
              ["Installation area", "Roadside, rooftop, facade, highway, and public open areas.", "Boardrooms, showrooms, control rooms, and lobbies."],
              ["Cabinet protection", "Sealed cabinet with stronger weather and dust defense.", "Ventilated cabinet focused on service access and heat control."],
              ["Use case", "Advertising, public announcements, traffic and wayfinding communication.", "Corporate presentations, monitoring, branding, and live content display."],
              ["Price range", "Varies by pitch, brightness class, structure, and weather protection scope.", "Varies by fine pitch level, resolution demand, and installation design."],
            ].map(([k, a, b]) => (
              <div key={k} className="contents">
                <div className="border-b border-r border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">{k}</div>
                <div className="border-b border-r border-slate-200 bg-white p-5 text-sm text-slate-700">{a}</div>
                <div className="border-b border-slate-200 bg-white p-5 text-sm text-slate-700">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Applications of outdoor LED Displays"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19h16" />
            <path d="M6 16V8l6-3 6 3v8" />
            <path d="M9 11h6" />
          </svg>
        }
        subtitle="Outdoor LED modules are used where long-distance visibility and weather durability matter."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Roadside advertising LED billboard",
              d: "Designed for passing traffic visibility with long-distance readability and strong daytime impact.",
            },
            {
              t: "Rooftop LED display",
              d: "Used for high-elevation branding where wide-area reach and weather-resistant performance are required.",
            },
            {
              t: "Shopping mall outdoor signage",
              d: "Supports promotions, campaign updates, and directional information in high-footfall exterior zones.",
            },
            {
              t: "Corporate branding display",
              d: "Delivers consistent brand communication on building facades and office-front outdoor locations.",
            },
            {
              t: "Petrol pump digital signage",
              d: "Displays fuel offers, safety notices, and service information clearly in open-air forecourt conditions.",
            },
            {
              t: "Hotel / restaurant front signage",
              d: "Highlights offers, menus, and event announcements to attract walk-in customers from street view.",
            },
            {
              t: "Government notice display",
              d: "Publishes public messages, awareness alerts, and civic updates in visible community-facing points.",
            },
            {
              t: "Event & stadium perimeter display",
              d: "Used for sponsor rotation, live event messaging, and audience communication around venue boundaries.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
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
            {
              t: "Roadside advertising LED billboard",
              d: "Designed for passing traffic visibility with long-distance readability and strong daytime impact.",
            },
            {
              t: "Rooftop LED display",
              d: "Used for high-elevation branding where wide-area reach and weather-resistant performance are required.",
            },
            {
              t: "Shopping mall outdoor signage",
              d: "Supports promotions, campaign updates, and directional information in high-footfall exterior zones.",
            },
            {
              t: "Corporate branding display",
              d: "Delivers consistent brand communication on building facades and office-front outdoor locations.",
            },
            {
              t: "Petrol pump digital signage",
              d: "Displays fuel offers, safety notices, and service information clearly in open-air forecourt conditions.",
            },
            {
              t: "Hotel / restaurant front signage",
              d: "Highlights offers, menus, and event announcements to attract walk-in customers from street view.",
            },
            {
              t: "Government notice display",
              d: "Publishes public messages, awareness alerts, and civic updates in visible community-facing points.",
            },
            {
              t: "Event & stadium perimeter display",
              d: "Used for sponsor rotation, live event messaging, and audience communication around venue boundaries.",
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
        title="Outdoor LED Display Installation Process"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h9" />
            <path d="M4 12h7" />
            <path d="M4 17h5" />
            <path d="m14 6 6 6-6 6" />
          </svg>
        }
        subtitle="A clear step-by-step outdoor LED deployment workflow to reduce installation risk and ensure stable long-term performance."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Site survey",
              d: "Inspect location conditions, viewing angle, sunlight exposure, wind factors, and service access before planning.",
            },
            {
              t: "Screen size planning",
              d: "Finalize display dimensions based on viewing distance, content readability target, and available installation space.",
            },
            {
              t: "Structure design",
              d: "Prepare safe support framework considering load distribution, vibration control, and outdoor durability requirements.",
            },
            {
              t: "Electrical planning",
              d: "Design power routing, grounding, surge protection, and distribution panels for safe and stable operation.",
            },
            {
              t: "LED cabinet installation",
              d: "Install and align cabinets accurately to ensure seamless visual output and reliable service accessibility.",
            },
            {
              t: "Configuration & calibration",
              d: "Configure controller mapping, signal flow, and brightness-color calibration for uniform display quality.",
            },
            {
              t: "Testing & handover",
              d: "Run operational testing, safety checks, and final acceptance before formal project handover to the client.",
            },
            {
              t: "After-sales support",
              d: "Provide routine maintenance guidance, troubleshooting support, and service response for long-term reliability.",
            },
          ].map((x, idx) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: idx % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  idx % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: BRAND.maroon }}>
                Step {idx + 1}
              </div>
              <h3 className="mt-2 text-[17px] font-extrabold leading-snug text-slate-900">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="hidden gap-4 sm:grid-cols-2 lg:grid-cols-4 md:grid">
          {[
            {
              t: "Site survey",
              d: "Inspect location conditions, viewing angle, sunlight exposure, wind factors, and service access before planning.",
            },
            {
              t: "Screen size planning",
              d: "Finalize display dimensions based on viewing distance, content readability target, and available installation space.",
            },
            {
              t: "Structure design",
              d: "Prepare safe support framework considering load distribution, vibration control, and outdoor durability requirements.",
            },
            {
              t: "Electrical planning",
              d: "Design power routing, grounding, surge protection, and distribution panels for safe and stable operation.",
            },
            {
              t: "LED cabinet installation",
              d: "Install and align cabinets accurately to ensure seamless visual output and reliable service accessibility.",
            },
            {
              t: "Configuration & calibration",
              d: "Configure controller mapping, signal flow, and brightness-color calibration for uniform display quality.",
            },
            {
              t: "Testing & handover",
              d: "Run operational testing, safety checks, and final acceptance before formal project handover to the client.",
            },
            {
              t: "After-sales support",
              d: "Provide routine maintenance guidance, troubleshooting support, and service response for long-term reliability.",
            },
          ].map((x, idx) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: BRAND.maroon }}>
                Step {idx + 1}
              </div>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Consultation */}
      <Section
 title="Outdoor LED Display Project Consultation in Bangladesh"
 subtitle="Share your location, viewing distance, and target screen size-then we recommend pitch, controller, structure, and BOQ."
      >
        <div className="rounded-[18px] border bg-slate-50 p-4 md:rounded-3xl md:p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
          <details className="group md:hidden">
            <summary
              className="list-none cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900 [::-webkit-details-marker]:hidden"
              style={{ borderColor: `${BRAND.maroon}14`, background: "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)" }}
            >
              Tap To Expand Consultation Points
            </summary>
            <ul className="mt-3 grid gap-3 text-sm text-slate-700">
              {[
                "Location + environment: rooftop / roadside / market / highway",
                "Viewing distance (near & far) + audience angle",
                "Target screen size (ft) or wall size (W x H)",
                "Content source: live HDMI / scheduled playback / remote control",
                "Power: single/three phase + backup (IPS/Generator)",
                "Weatherproof structure + service access (front/rear)",
                "Safety: earthing + surge protection (SPD) planning",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 rounded-xl border bg-white p-3" style={{ borderColor: `${BRAND.maroon}10` }}>
                  <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{x}</span>
                </li>
              ))}
            </ul>
          </details>

          <ul className="hidden gap-3 text-sm text-slate-700 md:grid md:grid-cols-2">
            {[
              "Location + environment: rooftop / roadside / market / highway",
              "Viewing distance (near & far) + audience angle",
              "Target screen size (ft) or wall size (W x H)",
              "Content source: live HDMI / scheduled playback / remote control",
              "Power: single/three phase + backup (IPS/Generator)",
              "Weatherproof structure + service access (front/rear)",
              "Safety: earthing + surge protection (SPD) planning",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2 rounded-xl border bg-white p-3" style={{ borderColor: `${BRAND.maroon}10` }}>
                <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                <span className="leading-7">{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-end md:pr-4">
            <Link
              href="/contact/"
              className="inline-flex min-h-10 items-center justify-center rounded-[10px] px-3 py-2 text-center text-[12px] font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Get Outdoor BOQ -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-emerald-600 px-3 py-2 text-center text-[12px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 md:rounded-xl md:px-5 md:py-3 md:text-sm"
            >
              WhatsApp for Site Info
            </a>
          </div>
        </div>
      </Section>

      {/* Key outdoor checklist */}
      <Section
 title="Outdoor LED Installation Checklist (Weather + Safety)"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="m8.2 12.2 2.4 2.4 5.2-5.2" />
          </svg>
        }
 subtitle="Outdoor screens fail mostly due to power/surge, water ingress, and weak structure-use this checklist to avoid common mistakes."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
 t: "Weatherproof build",
              items: [
                "Proper cabinet sealing + drainage route",
                "Outdoor-rated connectors & cable glands",
                "Ventilation / thermal path planning",
                "Back cover & service doors access",
              ],
            },
            {
 t: "Power & protection",
              items: ["Earthing/grounding", "Surge protection device (SPD)", "MCB/DB box", "Cable gauge by load"],
            },
            {
 t: "Signal & control",
              items: [
                "CAT6/fiber (distance dependent)",
                "Proper sender/processor selection",
                "Ground loop noise prevention",
                "Stable content playback system",
              ],
            },
            { t: "Commissioning", items: ["Module checking", "Mapping", "Brightness tuning", "Burn-in + final inspection"] },
          ].map((b, index) => (
            <div
              key={b.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <div className="text-[17px] font-extrabold leading-snug text-slate-900">{b.t}</div>
              <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                    <span className="leading-6">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hidden rounded-3xl border bg-slate-50 p-6 md:block" style={{ borderColor: `${BRAND.maroon}10` }}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
 t: "Weatherproof build",
                items: [
                  "Proper cabinet sealing + drainage route",
                  "Outdoor-rated connectors & cable glands",
                  "Ventilation / thermal path planning",
                  "Back cover & service doors access",
                ],
              },
              {
 t: "Power & protection",
                items: ["Earthing/grounding", "Surge protection device (SPD)", "MCB/DB box", "Cable gauge by load"],
              },
              {
 t: "Signal & control",
                items: [
                  "CAT6/fiber (distance dependent)",
                  "Proper sender/processor selection",
                  "Ground loop noise prevention",
                  "Stable content playback system",
                ],
              },
 { t: "Commissioning", items: ["Module checking", "Mapping", "Brightness tuning", "Burn-in + final inspection"] },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border bg-white p-5" style={{ borderColor: `${BRAND.maroon}12` }}>
                <div className="text-sm font-extrabold text-slate-900">{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {b.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                      <span className="leading-7">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
 title="Outdoor LED Pixel Pitch Guide for Bangladesh (P2.5 to P10)"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4v14M17 6v14M4 18h6M14 20h6" />
            <circle cx="7" cy="4" r="2" fill="currentColor" stroke="none" />
            <circle cx="17" cy="6" r="2" fill="currentColor" stroke="none" />
          </svg>
        }
        subtitle="If you are comparing outdoor LED display screen price in Bangladesh, pixel pitch and viewing distance should be selected together for better clarity, better budget control, and long-term performance."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
 i: "◎",
              t: "Close roadside branding (P2.5-P4)",
              d: "Best for shop frontage, market roads, and urban traffic where viewers stay relatively near the screen.",
              bullets: ["Typical viewing: 3m to 10m", "Sharper text/logo visibility", "Good for detailed promotional content"],
            },
            {
 i: "◉",
              t: "Mid-range city visibility (P5-P6.67)",
              d: "Balanced option for commercial facades and medium-distance public communication in busy city zones.",
              bullets: ["Typical viewing: 8m to 25m", "Balanced clarity vs cost", "Useful for mixed text + motion graphics"],
            },
            {
 i: "⬒",
              t: "Long-distance highways (P8-P10)",
              d: "Suitable for highways, elevated roads, and large-format outdoor LED billboard communication.",
              bullets: ["Typical viewing: 20m+", "Strong readability from distance", "Efficient for large ad surfaces"],
            },
            {
 i: "✓",
              t: "Selection checklist before purchase",
              d: "For accurate outdoor LED display module price and model recommendation, confirm these key inputs first.",
              bullets: ["Screen size (W x H)", "Installation height and traffic speed", "Ambient light and operating hours"],
            },
          ].map((item, index) => (
            <div
              key={item.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900">
                <span aria-hidden="true">{item.i}</span>
                <span>{item.t}</span>
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700">{item.d}</p>
              <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                    <span className="leading-6">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hidden rounded-3xl border bg-slate-50 p-6 md:block" style={{ borderColor: `${BRAND.maroon}10` }}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
 i: "◎",
                t: "Close roadside branding (P2.5-P4)",
                d: "Best for shop frontage, market roads, and urban traffic where viewers stay relatively near the screen.",
                bullets: ["Typical viewing: 3m to 10m", "Sharper text/logo visibility", "Good for detailed promotional content"],
              },
              {
 i: "◉",
                t: "Mid-range city visibility (P5-P6.67)",
                d: "Balanced option for commercial facades and medium-distance public communication in busy city zones.",
                bullets: ["Typical viewing: 8m to 25m", "Balanced clarity vs cost", "Useful for mixed text + motion graphics"],
              },
              {
 i: "⬒",
                t: "Long-distance highways (P8-P10)",
                d: "Suitable for highways, elevated roads, and large-format outdoor LED billboard communication.",
                bullets: ["Typical viewing: 20m+", "Strong readability from distance", "Efficient for large ad surfaces"],
              },
              {
 i: "✓",
                t: "Selection checklist before purchase",
                d: "For accurate outdoor LED display module price and model recommendation, confirm these key inputs first.",
                bullets: ["Screen size (W x H)", "Installation height and traffic speed", "Ambient light and operating hours"],
              },
            ].map((item) => (
              <div key={item.t} className="rounded-2xl border bg-white p-5" style={{ borderColor: `${BRAND.maroon}12` }}>
                <h3 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                  <span aria-hidden="true">{item.i}</span>
                  <span>{item.t}</span>
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.d}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                      <span className="leading-7">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
 title="Outdoor LED Display Maintenance and Performance Tips"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14.5 6.5 3 3-7.5 7.5H7v-3l7.5-7.5Z" />
            <path d="m13 8 3 3" />
          </svg>
        }
        subtitle="A weatherproof outdoor LED display can deliver stable output for years when power quality, ventilation, and periodic service are managed correctly."
      >
        <CardGrid
          items={[
            {
 i: "☀",
              t: "Prevent brightness drop",
              d: "Use proper brightness scheduling (day/night) and avoid running at maximum brightness all the time.",
              bullets: ["Auto brightness sensor setup", "Daypart brightness profile", "Seasonal calibration checks"],
            },
            {
 i: "☔",
              t: "Protect against rain, dust, and surge",
              d: "Most outdoor failures in Bangladesh come from water ingress and electrical surges, not from modules alone.",
              bullets: ["Seal check before monsoon", "Regular SPD/earthing inspection", "Connector and cable gland review"],
            },
            {
 i: "🛠",
              t: "Plan preventive maintenance",
              d: "A fixed maintenance cycle keeps outdoor LED display boards stable and reduces emergency repair cost.",
              bullets: ["Monthly visual inspection", "Quarterly cabinet health check", "Spare module + PSU backup stock"],
            },
          ]}
        />
      </Section>

      <Section
        title="Outdoor LED Screen Waterproof & Durability"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 6 9v4a6 6 0 0 0 12 0V9z" />
            <path d="M9.5 13.5 11 15l3.5-3.5" />
          </svg>
        }
        subtitle="Outdoor LED reliability depends on weather sealing, thermal control, and structural stability. These durability factors help reduce downtime and keep communication screens dependable in real outdoor conditions."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Rain protection",
              d: "Sealed cabinet joints, drainage paths, and protected connectors help prevent water ingress during monsoon rain and storm exposure.",
            },
            {
              t: "Dust protection",
              d: "Proper enclosure design and controlled ventilation reduce dust intrusion that can affect module brightness, signal stability, and service life.",
            },
            {
              t: "Heat resistance",
              d: "Thermal planning with airflow paths and component-grade temperature tolerance keeps screens stable under high daytime heat.",
            },
            {
              t: "Rust-resistant structure",
              d: "Corrosion-resistant frame materials and protective finishing help maintain structural safety in humid and coastal environments.",
            },
            {
              t: "Stable outdoor performance",
              d: "Balanced power distribution, weather-sealed integration, and periodic checks ensure consistent operation across changing outdoor conditions.",
            },
            {
              t: "Wind load considerations",
              d: "Mounting design must account for wind pressure, anchor strength, and structural load transfer to avoid vibration or panel misalignment.",
            },
            {
              t: "24/7 reliability",
              d: "Continuous-duty planning with surge protection, grounding, and preventive maintenance supports long-hour communication without frequent interruption.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
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
              t: "Rain protection",
              d: "Sealed cabinet joints, drainage paths, and protected connectors help prevent water ingress during monsoon rain and storm exposure.",
            },
            {
              t: "Dust protection",
              d: "Proper enclosure design and controlled ventilation reduce dust intrusion that can affect module brightness, signal stability, and service life.",
            },
            {
              t: "Heat resistance",
              d: "Thermal planning with airflow paths and component-grade temperature tolerance keeps screens stable under high daytime heat.",
            },
            {
              t: "Rust-resistant structure",
              d: "Corrosion-resistant frame materials and protective finishing help maintain structural safety in humid and coastal environments.",
            },
            {
              t: "Stable outdoor performance",
              d: "Balanced power distribution, weather-sealed integration, and periodic checks ensure consistent operation across changing outdoor conditions.",
            },
            {
              t: "Wind load considerations",
              d: "Mounting design must account for wind pressure, anchor strength, and structural load transfer to avoid vibration or panel misalignment.",
            },
            {
              t: "24/7 reliability",
              d: "Continuous-duty planning with surge protection, grounding, and preventive maintenance supports long-hour communication without frequent interruption.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

 {/* ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ ONLY THIS SECTION CHANGED: Outdoor LED Display Price Per Square Feet in Bangladesh */}
      <Section
 title="Outdoor LED Display Price Per Square Feet in Bangladesh"
        subtitle="Indicative pricing by pixel pitch for quick comparison. For BOQ-based pricing, please share your required screen size and installation location."
      >
        <MobileDisclosure
          label="Tap To Expand Price List"
          buttonClassName="cursor-pointer rounded-[12px] border px-4 py-3 text-center text-[12px] font-extrabold text-slate-900"
          buttonStyle={{ borderColor: `${BRAND.maroon}14`, background: "linear-gradient(180deg, rgba(236,253,245,1) 0%, rgba(220,252,231,1) 100%)" }}
          contentClassName="mt-3 space-y-3 md:mt-0 md:space-y-0 md:overflow-x-auto md:rounded-3xl md:border"
          contentStyle={{ borderColor: `${BRAND.maroon}18` }}
          desktopDisplayClassName="md:block"
        >
          <div>
            <div className="hidden grid-cols-12 gap-0 border-b border-slate-200 bg-emerald-50 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-700 md:grid">
              <div className="col-span-7 border-r border-slate-200">Outdoor LED Model</div>
              <div className="col-span-3 border-r border-slate-200 text-center">Pixel Pitch</div>
              <div className="col-span-2 text-right">Approx. Price (Per Sq.Ft)</div>
            </div>

            {outdoorPriceRows.map(({ p, pitchNum, pitchLabel, price }, index) => (
              <article
                key={p.slug}
                className="overflow-hidden rounded-[14px] border border-[var(--price-mobile-border)] bg-[var(--price-mobile-bg)] md:grid md:grid-cols-12 md:items-center md:gap-0 md:rounded-none md:border-0 md:border-b md:border-slate-200 md:bg-white md:px-4 md:py-3 md:text-sm md:last:border-b-0"
                style={priceRowStyle(index)}
              >
                <div className="px-4 py-3 md:col-span-7 md:border-r md:border-slate-200 md:px-0 md:py-0 md:pr-4">
                  <Link
                    href={`/led-display/outdoor/${p.slug}/`}
                    className="text-[15px] font-extrabold leading-snug text-slate-900 md:text-sm md:font-semibold md:hover:underline"
                    style={{ textDecorationColor: `${BRAND.maroon}88` }}
                    title="Click to view full specifications"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 text-[12.5px] leading-6 text-slate-600 md:text-xs md:leading-normal md:text-slate-500">{p.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 border-t border-[rgba(148,163,184,0.18)] md:contents">
                  <div className="border-r border-[rgba(148,163,184,0.18)] px-4 py-3 md:col-span-3 md:border-slate-200 md:px-0 md:py-0 md:text-center md:text-sm md:text-slate-700">
                    <div data-label="Pixel Pitch" className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#C84B00] before:content-[attr(data-label)] md:hidden" />
                    <div className="mt-1 text-[13px] font-bold text-slate-900 md:mt-0 md:text-sm md:font-normal md:text-slate-700">{pitchNum != null ? `${pitchNum} mm` : pitchLabel}</div>
                  </div>
                  <div className="px-4 py-3 md:col-span-2 md:px-0 md:py-0 md:text-right">
                    <div data-label="Approx. Price" className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-emerald-700 before:content-[attr(data-label)] md:hidden" />
                    <div className="mt-1 text-[13px] font-bold text-slate-900 md:mt-0 md:text-sm md:font-semibold md:text-slate-800">{price}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MobileDisclosure>

        <div className="mt-4 hidden flex-nowrap gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-700 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex md:flex-wrap md:overflow-visible md:pb-0">
 {["Tip: Smaller pitch = higher cost", "Outdoor: SPD + grounding recommended", "For exact BOQ: share W x H + location"].map(
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

      {/* Explore solutions */}
      <Section
 title="Explore LED Display Categories"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M12 4v16" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        }
 subtitle="Compare indoor, outdoor and rental options-then choose the best category for your project."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
          {outdoorCategoryLinks.map((x, index) => (
            <Link
              key={x.t}
              href={x.href}
              className="group w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 transition md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6 md:hover:-translate-y-0.5 md:hover:bg-white md:hover:shadow-md"
              style={responsiveCardStyle(index, `${BRAND.maroon}12`)}
            >
              <div className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-lg">{x.t}</div>
              <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
              <div className="mt-4 text-[12px] font-bold md:text-sm" style={{ color: BRAND.maroon }}>
                Explore -&gt;{" "}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="City Wise Outdoor LED Display Deployment"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        }
        subtitle="Deployment planning varies by city environment, traffic behavior, weather exposure, and communication goals. Below is a practical city-wise outdoor LED overview across Bangladesh divisions."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            {
              t: "Outdoor LED Display in Dhaka",
              d: "In Dhaka, outdoor LED deployment is usually focused on high-traffic corridors, commercial intersections, and dense retail zones where message rotation speed and high brightness readability are both critical for continuous audience reach.",
            },
            {
              t: "Outdoor LED Display in Chattogram",
              d: "Chattogram projects commonly require weather-conscious installation because of port-area humidity and mixed commercial routes, so structure strength, sealed cabinets, and stable remote content scheduling become key deployment priorities.",
            },
            {
              t: "Outdoor LED Billboard in Sylhet",
              d: "Sylhet deployments often prioritize resilient billboard communication for arterial roads and business districts, where rain-ready design and clear long-distance viewing help maintain consistent advertising and public information delivery.",
            },
            {
              t: "Outdoor Advertising Screen in Khulna",
              d: "In Khulna, outdoor advertising screens are typically planned for market-front visibility and roadside branding, with emphasis on efficient power use, dependable operation, and simple content updates for local campaign management.",
            },
            {
              t: "Outdoor LED Display in Rajshahi",
              d: "Rajshahi installations generally benefit from balanced brightness tuning and clear typography-first content, especially for educational, retail, and civic communication where readability during varied daylight conditions is essential.",
            },
            {
              t: "Outdoor LED Display in Barishal",
              d: "Barishal deployments are often designed with stronger moisture and seasonal weather considerations, combining protected cabinet integration and routine maintenance planning for stable year-round outdoor screen performance.",
            },
            {
              t: "Outdoor LED Display in Rangpur",
              d: "In Rangpur, outdoor LED strategy is frequently centered on highway-facing and district-level commercial points, where distance-based pitch planning and robust structure alignment support clear and reliable content visibility.",
            },
            {
              t: "Outdoor LED Display in Mymensingh",
              d: "Mymensingh projects commonly use outdoor LED displays for mixed-use branding and announcements near growth corridors, with practical focus on maintainability, scalable sizing, and uninterrupted operation for daily communication.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
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
              t: "Outdoor LED Display in Dhaka",
              d: "In Dhaka, outdoor LED deployment is usually focused on high-traffic corridors, commercial intersections, and dense retail zones where message rotation speed and high brightness readability are both critical for continuous audience reach.",
            },
            {
              t: "Outdoor LED Display in Chattogram",
              d: "Chattogram projects commonly require weather-conscious installation because of port-area humidity and mixed commercial routes, so structure strength, sealed cabinets, and stable remote content scheduling become key deployment priorities.",
            },
            {
              t: "Outdoor LED Billboard in Sylhet",
              d: "Sylhet deployments often prioritize resilient billboard communication for arterial roads and business districts, where rain-ready design and clear long-distance viewing help maintain consistent advertising and public information delivery.",
            },
            {
              t: "Outdoor Advertising Screen in Khulna",
              d: "In Khulna, outdoor advertising screens are typically planned for market-front visibility and roadside branding, with emphasis on efficient power use, dependable operation, and simple content updates for local campaign management.",
            },
            {
              t: "Outdoor LED Display in Rajshahi",
              d: "Rajshahi installations generally benefit from balanced brightness tuning and clear typography-first content, especially for educational, retail, and civic communication where readability during varied daylight conditions is essential.",
            },
            {
              t: "Outdoor LED Display in Barishal",
              d: "Barishal deployments are often designed with stronger moisture and seasonal weather considerations, combining protected cabinet integration and routine maintenance planning for stable year-round outdoor screen performance.",
            },
            {
              t: "Outdoor LED Display in Rangpur",
              d: "In Rangpur, outdoor LED strategy is frequently centered on highway-facing and district-level commercial points, where distance-based pitch planning and robust structure alignment support clear and reliable content visibility.",
            },
            {
              t: "Outdoor LED Display in Mymensingh",
              d: "Mymensingh projects commonly use outdoor LED displays for mixed-use branding and announcements near growth corridors, with practical focus on maintainability, scalable sizing, and uninterrupted operation for daily communication.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section
title="FAQs About Outdoor LED Display in Bangladesh"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.2" />
            <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        }
        subtitle="Common questions before ordering an outdoor LED screen / billboard project."
      >
        <FaqAccordion
          accent={BRAND.maroon}
          density="compact"
          items={[
            {
              q: "Which pixel pitch is best for outdoor LED billboards?",
              a: "Outdoor pitch selection depends on viewing distance. Close roadside viewing needs smaller pitch, while highway billboards can use larger pitch for cost-effective coverage.",
            },
            {
              q: "Do outdoor LED screens need surge protection (SPD)?",
              a: "Yes. Outdoor installations are more exposed to lightning and unstable power. Proper grounding and SPD help protect modules, PSUs, and controllers and reduce downtime.",
            },
            {
              q: "How do you make an outdoor LED screen weatherproof?",
 a: "Weatherproofing includes cabinet sealing, drainage planning, outdoor-rated connectors, correct cable glands, and safe service access-plus proper structure design and ventilation.",
            },
            {
              q: "What affects outdoor LED display price per sq ft?",
              a: "Price depends on pixel pitch, brightness/weather design, cabinet quality, control system, structure height, power/safety components (SPD/grounding), and installation scope.",
            },
            {
              q: "Do you provide end-to-end outdoor installation and post-install support?",
              a: "Yes. We handle site survey, structure planning, wiring and grounding, full installation, commissioning (mapping and calibration), and continued maintenance support after handover.",
            },
            {
              q: "What brightness level is ideal for outdoor LED display in Bangladesh?",
              a: "Brightness depends on location and sunlight exposure. Roadside and highway sites need higher brightness for daylight visibility, while shaded or partial-sun areas can use balanced brightness with proper calibration to protect components.",
            },
          ]}
        />

        <div className="mt-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap">
          <Link
            href="/contact/"
            className="inline-flex min-h-10 items-center justify-center rounded-[10px] px-3 py-2 text-center text-[12px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get Outdoor Consultation -&gt;
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="nofollow noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-emerald-600 px-3 py-2 text-center text-[12px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
          >
            WhatsApp for BOQ
          </a>
        </div>
      </Section>
    </div>
  );
}
