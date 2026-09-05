import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site";
import { getLedDisplayTablePrice, getProductsByCategory, ledAccessoriesCatalog, type ProductItem } from "@/lib/productsCatalog";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileDisclosure from "@/components/common/MobileDisclosure";
import MobileIntroText from "@/components/common/MobileIntroText";
import IndoorFilterSection from "@/components/products/IndoorFilterSection";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import responsiveStyles from "../display-responsive.module.css";

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
  tone = "white",
  id,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  titleIcon?: React.ReactNode;
  tone?: "white" | "blue";
  id?: string;
}) => (
  <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className={tone === "blue" ? "mt-4 scroll-mt-24 rounded-2xl border border-[#cbdcf7] bg-[linear-gradient(110deg,#eef5ff_0%,#f7faff_52%,#edf4ff_100%)] px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6" : "mt-4 scroll-mt-24 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6"}>
    <h2 id={id ? `${id}-heading` : undefined} className="flex items-start gap-2.5 text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:items-center lg:text-[22px]">
      {titleIcon ? (
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cfe0ff] bg-[#edf4ff] text-[#1458e5]" aria-hidden="true">
          {titleIcon}
        </span>
      ) : null}
      <span className="min-w-0">{title}</span>
    </h2>
    {subtitle ? (
      <MobileIntroText
        className="mt-2"
        teaserClassName="w-full leading-6"
        expandedClassName="text-sm leading-7 text-slate-600"
        desktopClassName="md:text-slate-600 md:leading-7 md:[&>*]:!leading-7"
        singleDom
      >
        <p className="text-slate-600 leading-7">{subtitle}</p>
      </MobileIntroText>
    ) : null}
    <div className="mt-4">{children}</div>
  </section>
);

function responsiveCardStyle(index: number, desktopBorderColor = `${BRAND.maroon}10`) {
  return {
    "--card-order": index,
    "--mobile-border-color": "#dbe5f2",
    "--mobile-bg": "#ffffff",
    "--desktop-border-color": desktopBorderColor,
  } as React.CSSProperties;
}

type CardGridItem = { i?: React.ReactNode; t: string; d: string; bullets?: string[] };

const CardGrid = ({
  items,
  desktopClassName = "md:grid-cols-3",
  mobileItemClassName = "w-[89%]",
  iconClassName = "text-[#1458e5]",
  titleAsHeading = false,
}: {
  items: CardGridItem[];
  desktopClassName?: string;
  mobileItemClassName?: string;
  iconClassName?: string;
  titleAsHeading?: boolean;
}) => (
  <div
    className={`-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:gap-3 md:overflow-visible md:px-0 md:pb-0 md:pt-0 ${desktopClassName}`}
  >
    {items.map((x, index) => (
      <div
        key={x.t}
        className={`${mobileItemClassName} shrink-0 snap-start rounded-xl border border-[#dbe5f2] bg-white px-4 py-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#b9d1fb] hover:shadow-md md:w-auto md:border-[#dbe5f2] md:p-4`}
        style={responsiveCardStyle(index)}
      >
        {titleAsHeading ? (
          <h3 className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-base">{x.t}</h3>
        ) : (
          <div className="flex items-center gap-2 text-[17px] font-extrabold leading-snug text-slate-900 md:text-slate-900">
            {x.i ? <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white ${iconClassName}`} aria-hidden="true">{x.i}</span> : null}
            <span className="md:min-w-0 md:overflow-hidden md:text-ellipsis md:whitespace-nowrap md:text-[15px] md:tracking-tight lg:text-[16px]">
              {x.t}
            </span>
          </div>
        )}
        <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
        {x.bullets?.length ? (
          <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700 md:text-sm">
            {x.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-[#1458e5] md:mt-2" />
                <span className="leading-6 md:leading-7">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    ))}
  </div>
);

type ComparisonRow = readonly [string, string, string];
type PitchGuideRow = readonly [string, string, string, string];
type SolutionCard = { t: string; d: string; href: string };

const ComparisonGrid = ({
  rows,
  topicHeader,
  firstHeader,
  secondHeader,
  minWidthClassName = "md:min-w-0",
}: {
  rows: ComparisonRow[];
  topicHeader: string;
  firstHeader: string;
  secondHeader: string;
  minWidthClassName?: string;
}) => (
  <div className="w-full max-w-full space-y-3 md:space-y-0 md:overflow-x-auto md:rounded-xl md:border md:border-[#dbe5f2]">
    <div className={`${minWidthClassName} min-w-0 max-w-full md:grid md:grid-cols-3`}>
      <div className="hidden border-b border-r border-[#dbe5f2] bg-[#edf4ff] p-4 text-sm font-bold text-[#071936] md:block">{topicHeader}</div>
      <div className="hidden border-b border-r border-[#dbe5f2] bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">{firstHeader}</div>
      <div className="hidden bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">{secondHeader}</div>

      {rows.map(([k, a, b], index) => (
        <article
          key={k}
          className="w-full max-w-full overflow-hidden rounded-xl bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)] md:contents md:bg-transparent md:shadow-none"
          style={responsiveCardStyle(index)}
        >
          <div className="w-full max-w-full overflow-hidden rounded-xl border border-[#dbe5f2] md:contents md:rounded-none md:border-0">
            <div className="border-b border-[#dbe5f2] bg-[#edf4ff] px-4 py-3 text-center md:border-r md:border-slate-200 md:p-4 md:text-left md:text-sm md:font-normal md:text-slate-700">
              <div className="text-[15px] font-extrabold tracking-tight text-slate-900 md:text-sm md:font-normal md:text-slate-700">{k}</div>
            </div>
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-0 md:contents">
              <div className="min-w-0 border-r border-[#dbe5f2] px-4 py-3 md:border-b md:border-r md:border-slate-200 md:bg-white md:p-4">
                <div data-label={firstHeader} className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
                <p className="break-words text-[13px] leading-6 text-slate-700 md:text-sm md:leading-normal">{a}</p>
              </div>
              <div className="min-w-0 px-4 py-3 md:border-b md:border-slate-200 md:bg-white md:p-5">
                <div data-label={secondHeader} className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
                <p className="break-words text-[13px] leading-6 text-slate-700 md:text-sm md:leading-normal">{b}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const PitchGuideGrid = ({ rows }: { rows: PitchGuideRow[] }) => (
  <div className="w-full max-w-full space-y-3 md:space-y-0 md:overflow-x-auto md:rounded-xl md:border md:border-[#dbe5f2]">
    <div className="min-w-0 max-w-full md:grid md:min-w-0 md:grid-cols-4">
      <div className="hidden border-b border-r border-[#dbe5f2] bg-[#edf4ff] p-4 text-sm font-bold text-[#071936] md:block">Viewing Distance</div>
      <div className="hidden border-b border-r border-[#dbe5f2] bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">Content Priority</div>
      <div className="hidden border-b border-r border-[#dbe5f2] bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">Recommended Pixel Pitch</div>
      <div className="hidden bg-[#f7faff] p-4 text-sm font-bold text-[#071936] md:block">Best Indoor Scenario</div>

      {rows.map(([distance, content, pitch, scenario], index) => (
        <article
          key={distance}
          className="w-full max-w-full overflow-hidden rounded-xl bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)] md:contents md:bg-transparent md:shadow-none"
          style={responsiveCardStyle(index)}
        >
          <div className="w-full max-w-full overflow-hidden rounded-xl border border-[#dbe5f2] md:contents md:rounded-none md:border-0">
            <div className="border-b border-[#dbe5f2] bg-[#edf4ff] px-4 py-3 text-center md:border-r md:border-slate-200 md:p-4 md:text-left md:text-sm md:font-normal md:text-slate-700">
              <div className="text-[15px] font-extrabold tracking-tight text-slate-900 md:text-sm md:font-normal md:text-slate-700">{distance}</div>
              <div data-label="Viewing Distance" className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
            </div>
            <div className="border-b border-[#dbe5f2] px-4 py-3 md:border-r md:border-slate-200 md:bg-white md:p-4">
              <div data-label="Content Priority" className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
              <p className="text-[13px] leading-6 text-slate-700 md:text-sm md:leading-normal">{content}</p>
            </div>
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-0 md:contents">
              <div className="min-w-0 border-r border-[#dbe5f2] px-4 py-3 md:border-b md:border-r md:border-slate-200 md:bg-white md:p-4">
                <div data-label="Recommended Pitch" className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
                <div className="mt-1 break-words text-[13px] font-bold leading-5 text-slate-900 md:mt-0 md:text-sm md:font-semibold md:text-slate-800">{pitch}</div>
              </div>
              <div className="min-w-0 px-4 py-3 md:border-b md:border-slate-200 md:bg-white md:p-5">
                <div data-label="Best Scenario" className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
                <div className="mt-1 break-words text-[13px] leading-5 text-slate-700 md:mt-0 md:text-sm md:leading-normal">{scenario}</div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const SolutionGrid = ({ items }: { items: SolutionCard[] }) => (
  <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
    {items.map((x) => (
      <Link
        key={x.t}
        href={x.href}
        className="group w-[89%] shrink-0 snap-start rounded-xl border border-[#dbe5f2] bg-white px-4 py-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-[#b9d1fb] hover:shadow-md md:w-auto md:p-5"
        style={responsiveCardStyle(1, `${BRAND.maroon}12`)}
      >
        <div className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-lg">{x.t}</div>
        <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
        <div className="mt-4 text-[12px] font-extrabold text-[#1458e5] md:text-sm md:font-bold">
          Explore -&gt;{" "}
        </div>
      </Link>
    ))}
  </div>
);

function priceRowStyle(index: number) {
  return {
    "--price-mobile-border": "#dbe5f2",
    "--price-mobile-bg": "#ffffff",
    "--price-row-index": index,
  } as React.CSSProperties;
}

const heroFeatures = [
  { title: "Fine Pixel Pitch", description: "Sharp close-view detail", icon: "pixels" },
  { title: "High Refresh Rate", description: "Camera-friendly output", icon: "refresh" },
  { title: "Professional Install", description: "Clean structure & wiring", icon: "install" },
  { title: "Local Support", description: "Calibration & service", icon: "support" },
] as const;

function IndoorHeroFeatureIcon({ icon }: { icon: (typeof heroFeatures)[number]["icon"] }) {
  if (icon === "pixels") {
    return <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />;
  }
  if (icon === "refresh") {
    return <path d="M20 7v5h-5M4 17v-5h5M6.1 8.2A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 11.9-1.2" />;
  }
  if (icon === "install") {
    return <path d="m14.5 5.5 4 4M4 20l4.5-1 10-10a2.8 2.8 0 0 0-4-4l-10 10L4 20Z" />;
  }
  return <path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Zm-3 9 2 2 4-4" />;
}

function IndoorLedHero() {
  return (
    <section
      className="led-display-hero-shell relative left-1/2 right-1/2 isolate -mx-[50vw] -mt-2 min-h-[430px] w-screen overflow-hidden bg-[#f7f9fc] sm:min-h-[420px] lg:min-h-[clamp(20rem,25vw,23rem)]"
      aria-labelledby="indoor-led-hero-heading"
    >
      <Image
        src="/images/led hero/indoor-led-hero.webp"
        alt="Fine-pitch indoor LED video wall with LED cabinets and video processor"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[70%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:hidden" aria-hidden="true" />

      <div className="led-display-hero-frame relative mx-auto flex min-h-[430px] w-full max-w-[clamp(80rem,90vw,108rem)] flex-col px-5 py-7 sm:min-h-[420px] sm:px-8 lg:min-h-[clamp(20rem,25vw,23rem)] lg:px-10 lg:py-[clamp(1.5rem,2vw,2rem)]">
        <div className="led-display-hero-content max-w-[19rem] text-left sm:max-w-[34rem] lg:max-w-[39%] lg:translate-y-1">
          <p className="!text-left text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ef4a00] sm:text-[11px]">
            Fine-pitch visual solutions
          </p>
          <h1 id="indoor-led-hero-heading" className="led-display-hero-title mt-2 text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">
            Indoor LED Display
            <span className="block">Price in Bangladesh 2026</span>
          </h1>
          <p className="led-display-hero-description mt-3 max-w-[38rem] !text-left text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">
            Compare fine-pitch indoor LED screens for conference rooms, showrooms, control rooms and corporate spaces—with professional planning, installation and support.
          </p>

          <div className="led-display-hero-actions mt-4 flex flex-col gap-2.5 min-[430px]:flex-row sm:mt-5 lg:grid lg:max-w-[23rem] lg:grid-cols-2 xl:flex xl:max-w-none">
            <Link
              href="/contact/?project=indoor-led-display"
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h7" />
              </svg>
              Get Free BOQ
            </Link>
            <a
              href="#indoor-led-products"
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#071936] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
              Browse Indoor Displays
            </a>
          </div>
        </div>

        <ul className="led-display-hero-features mt-auto grid max-w-[39rem] grid-cols-2 gap-x-3 gap-y-2.5 pb-9 pt-5 sm:grid-cols-2 sm:gap-x-5 sm:pb-10 lg:w-[56%] lg:max-w-none lg:grid-cols-4 lg:gap-x-7 lg:pb-0 lg:pt-3">
          {heroFeatures.map((feature) => (
            <li key={feature.title} className="flex min-w-0 items-center gap-2 rounded-md border border-white/60 bg-white/75 px-2 py-1.5 text-left text-[#071936] shadow-sm backdrop-blur-[2px] md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:backdrop-blur-none">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-[#071936] drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] [&>svg]:h-5 [&>svg]:w-5 lg:[&>svg]:h-[22px] lg:[&>svg]:w-[22px]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <IndoorHeroFeatureIcon icon={feature.icon} />
                </svg>
              </span>
              <span className="min-w-0">
                <strong className="block text-[9px] font-black leading-3 tracking-[-0.015em] sm:whitespace-nowrap sm:text-[9.5px] lg:text-[10px]">{feature.title}</strong>
                <span className="mt-0.5 block text-[7.5px] font-bold leading-3 text-slate-600 sm:text-[8px] md:whitespace-nowrap lg:text-[8.5px]">{feature.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IndoorTrustStrip() {
  const benefits = [
    ["Site Survey", "Room & viewing assessment"],
    ["Pixel Pitch Guidance", "Right clarity for distance"],
    ["Safe Installation", "Structure, power & protection"],
    ["After-Sales Support", "Training & maintenance"],
  ];

  return (
    <section aria-label="Indoor LED display service benefits">
      <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.035)] sm:px-5 xl:min-h-[76px] xl:px-7 xl:py-2">
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(210px,0.8fr)_minmax(0,2.6fr)] xl:min-h-[58px] xl:gap-8">
          <div className="min-w-0 text-left">
            <p className="!text-left text-[11px] font-extrabold leading-4 text-[#071936]">Complete Indoor LED Solution</p>
            <p className="mt-1 !text-left text-[10px] font-bold leading-4 text-slate-600">Planning • Supply • Installation • Support</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-4 sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {benefits.map(([title, description]) => (
              <div key={title} className="flex min-w-0 items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 10 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="min-w-0">
                  <strong className="block !text-left text-[10px] font-extrabold leading-4 text-[#071936] sm:text-[11px]">{title}</strong>
                  <span className="hidden !text-left text-[9px] font-medium leading-4 text-slate-500 sm:block">{description}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IndoorProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const all = getProductsByCategory("indoor");
  const stickyAccessories = ledAccessoriesCatalog.filter((p) =>
    p.slug === "16-pin-frc-ribbon-cable-idc" ||
    p.slug === "26-pin-idc-female-connector" ||
    p.slug === "26-pin-frc-ribbon-cable-idc"
  );

  function getApproxPrice(slug: string): string {
    return getLedDisplayTablePrice(slug) ?? "Request quote";
  }

  const excludedPriceRowSlugs = new Set<string>();

  // Build rows for the price table (sorted like screenshot: small pitch -> large pitch)
  const priceRows = [...all]
    .filter((p) => !excludedPriceRowSlugs.has(p.slug))
    .map((p) => {
      const pitchLabel = getPitchLabel(p);
      const pitchNum = parsePitchNumber(pitchLabel);
      return { p, pitchLabel, pitchNum, price: getApproxPrice(p.slug) };
    })
    .sort((a, b) => {
      const av = a.pitchNum ?? 999;
      const bv = b.pitchNum ?? 999;
      if (av !== bv) return av - bv;
      return a.p.title.localeCompare(b.p.title, undefined, { sensitivity: "base" });
    });

  return (
    <div
      className={`${responsiveStyles.page} indoor-led-page mx-auto w-full max-w-[clamp(80rem,90vw,108rem)] px-4 pb-10 pt-0 [box-shadow:0_0_0_100vmax_#f4f7fb] [clip-path:inset(0_-100vmax)] md:px-6`}
      data-indoor-led-route-kind="hub"
    >
      <IndoorLedHero />
      <IndoorTrustStrip />

      <section
        id="indoor-led-products"
        className="mt-4 scroll-mt-24 py-5"
        aria-label="Indoor LED products"
      >
        <Suspense fallback={<div className="min-h-96 rounded-2xl border border-slate-200 bg-white" />}>
          <IndoorFilterSection all={all} stickyCards={stickyAccessories} />
        </Suspense>
      </section>

      <section className="mt-4 rounded-2xl border border-[#dbe5f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6" aria-labelledby="indoor-led-overview-heading">
        <h2 id="indoor-led-overview-heading" className="flex items-start gap-2.5 text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:items-center lg:text-[22px]">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cfe0ff] bg-[#edf4ff] text-[#1458e5]" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="12" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </span>
          <span className="min-w-0">Indoor LED Display Solutions for Professional Spaces</span>
        </h2>
        <MobileIntroText
          className="mt-2"
          teaser="Choose an indoor LED display by viewing distance, pixel pitch, refresh rate, room lighting and daily content."
          teaserClassName="w-full !text-left leading-6"
          expandedClassName="text-sm leading-7 text-slate-600"
          desktopClassName="md:text-slate-600 md:leading-7 md:[&>*]:!leading-7"
          singleDom
        >
          <p className="text-slate-600 leading-7">
            Compare the best <strong>indoor LED display</strong> options in Bangladesh by viewing distance, pixel pitch, refresh rate,
            brightness level, and daily content type. For a <strong>conference room LED screen</strong>, <strong>showroom LED video wall</strong>,
            indoor stadium screen, home theater display or control room monitoring wall, the right combination of fine-pitch modules,
            dependable controller, clean power design and expert calibration delivers clear text, accurate color, smooth motion and stable
            long-hour performance. A properly engineered indoor setup improves communication, branding impact and service reliability in
            corporate offices, retail showrooms and operation centers.
          </p>
        </MobileIntroText>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
          <Link href="/led-display/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">LED display price hub</Link>
          <Link href="/led-display/indoor-led-video-wall-bangladesh/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">Indoor LED video wall guide</Link>
          <Link href="/services-support/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">Installation & support</Link>
          <Link href="/projects/" className="underline decoration-slate-300 underline-offset-4 hover:text-orange-600">Completed projects</Link>
        </div>
      </section>

      {/* Price per sq ft */}
      <Section
        id="indoor-led-price"
 title="Indoor LED Display Price Per Square Feet"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M6 3h12l2 4-2 14H6L4 7Z" />
            <path d="M9 12h6M9 16h4" />
          </svg>
        }
        subtitle="Indicative pricing by pixel pitch for quick comparison. For BOQ-based pricing, please share your required screen size and installation location."
      >
        <MobileDisclosure
          label="Tap To Expand Price List"
          buttonClassName="cursor-pointer rounded-xl border border-[#dbe5f2] bg-[#edf4ff] px-4 py-3 text-center text-[12px] font-extrabold text-[#071936]"
          contentClassName="mt-3 space-y-3 md:mt-0 md:space-y-0 md:overflow-x-auto md:rounded-xl md:border md:border-[#dbe5f2]"
          desktopDisplayClassName="md:block"
        >
          <div>
            {/* Header row (light cyan like screenshot) */}
            <div className="hidden min-w-[780px] grid-cols-12 gap-0 bg-[#edf4ff] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#071936] md:grid">
              <div className="col-span-7">Indoor LED Model</div>
              <div className="col-span-3 text-center">Pixel Pitch</div>
              <div className="col-span-2 text-right">Approx. Price (Per Sq.Ft)</div>
            </div>

            {priceRows.map(({ p, pitchNum, price }, index) => (
              <article
                key={p.slug}
                className="overflow-hidden rounded-xl border border-[#dbe5f2] bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)] md:grid md:min-w-[780px] md:grid-cols-12 md:items-center md:gap-0 md:rounded-none md:border-0 md:bg-white md:px-4 md:py-3 md:text-sm md:shadow-none"
                style={priceRowStyle(index)}
              >
                <div className="px-4 py-3 md:col-span-7 md:px-0 md:py-0">
                  <Link
                    href={`/led-display/indoor-led/${p.slug}/`}
                    className="text-[15px] font-extrabold leading-snug text-slate-900 md:text-sm md:font-semibold md:hover:underline"
                    style={{ textDecorationColor: "#1458e5" }}
                    title="Click to view full specifications"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 text-[12.5px] leading-6 text-slate-600 md:text-xs md:leading-normal md:text-slate-500">{p.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 border-t border-[rgba(148,163,184,0.18)] md:contents">
                  <div className="border-r border-[rgba(148,163,184,0.18)] px-4 py-3 md:col-span-3 md:border-0 md:px-0 md:py-0 md:text-center md:text-sm md:text-slate-700">
                    <div data-label="Pixel Pitch" className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
                    <div className="mt-1 text-[13px] font-bold text-slate-900 md:mt-0 md:text-sm md:font-normal md:text-slate-700">{pitchNum != null ? `${pitchNum} mm` : getPitchLabel(p)}</div>
                  </div>
                  <div className="px-4 py-3 md:col-span-2 md:px-0 md:py-0 md:text-right">
                    <div data-label="Approx. Price" className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#1458e5] before:content-[attr(data-label)] md:hidden" />
                    <div className="mt-1 text-[13px] font-bold text-slate-900 md:text-sm md:font-semibold md:text-slate-800">{price}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MobileDisclosure>

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
        <PitchGuideGrid
          rows={[
            ["1.5m to 2.5m", "Fine text, UI, close-face viewing", "P1.25 to P1.53", "Executive boardrooms, premium brand showrooms"],
            ["2.5m to 4m", "Mixed text + video content", "P1.86 to P2.0", "Corporate meeting rooms, reception video walls"],
            ["4m to 6m", "Presentation-heavy visuals", "P2.5", "Conference halls, educational auditoriums"],
            ["6m+", "Large visuals, less micro-detail", "P3", "Large indoor stages, event halls, atrium displays"],
          ]}
        />

        <div className="mt-5">
          <CardGrid
            titleAsHeading
            desktopClassName="sm:grid-cols-3"
            items={[
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
            ]}
          />
        </div>
      </Section>

      {/* How to choose */}
      <Section
 title="How to Choose the Right Digital LED Display in Bangladesh"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h8M16 17h4" />
            <circle cx="16" cy="7" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="14" cy="17" r="2" />
          </svg>
        }
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

      <Section
        title="Key Features of Indoor LED Display"
        tone="blue"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
          </svg>
        }
        subtitle="Indoor LED display solutions in Bangladesh deliver sharp close-view clarity, smooth video playback, and long-term reliability for showrooms, conference rooms, control rooms, and corporate environments."
      >
        <CardGrid
          desktopClassName="md:grid-cols-2 lg:grid-cols-4"
          iconClassName="text-sm text-slate-900"
          items={[
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /></svg>,
              t: "Fine Pixel Pitch Clarity",
              d: "High-definition visuals for near viewing with clear text, charts, and product media.",
            },
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16v10H4z" /><path d="m10 10 4 2-4 2z" /></svg>,
              t: "Camera-Friendly Refresh",
              d: "Stable refresh and processing reduce flicker in live camera, studio, and hybrid event use.",
            },
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16" /></svg>,
              t: "Color & Brightness Control",
              d: "Balanced indoor brightness and calibrated color output improve comfort and brand consistency.",
            },
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9z" /></svg>,
              t: "Efficient, Serviceable Design",
              d: "Reliable power architecture, cleaner heat handling, and easier maintenance for long-term uptime.",
            },
          ]}
        />

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
        title="Applications of Indoor LED Displays"
        tone="blue"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 4l9 6.5" />
            <path d="M5 10v8h14v-8" />
            <path d="M9 18v-4h6v4" />
          </svg>
        }
        subtitle="Common indoor use cases where high clarity, stable performance, and professional content delivery are important."
      >
        <CardGrid
          titleAsHeading
          mobileItemClassName="w-[82%]"
          desktopClassName="md:grid-cols-2 lg:grid-cols-4"
          items={[
            { t: "Corporate Boardroom", d: "Supports executive presentations, dashboards, and clear meeting communication." },
            { t: "Control Room", d: "Enables continuous monitoring with sharp data visibility and stable long-hour output." },
            { t: "Television Studio", d: "Delivers camera-friendly visuals for broadcast sets and program backdrops." },
            { t: "Shopping Mall Advertising", d: "Displays dynamic brand campaigns and promotional content in high-traffic areas." },
            { t: "Conference Hall", d: "Improves audience visibility for keynote visuals, text, and multimedia presentations." },
            { t: "Command & Control Center", d: "Provides reliable screen performance for mission-critical operational decisions." },
            { t: "Airport Display", d: "Shows public information, announcements, and wayfinding content clearly indoors." },
            { t: "Exhibition Center", d: "Creates high-impact visual engagement for booths, product launches, and event zones." },
          ]}
        />
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
        <CardGrid
          titleAsHeading
          desktopClassName="md:grid-cols-2 lg:grid-cols-3"
          items={[
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
          ]}
        />
      </Section>

      {/* Technical specs explained */}
      <Section
 title="Indoor LED Display Technical Specifications Explained"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16" />
            <path d="M4 12h10" />
            <path d="M4 17h7" />
            <circle cx="18" cy="12" r="2" />
          </svg>
        }
        subtitle="Understanding specs helps you compare models and choose the right ecosystem."
      >
        <CardGrid
          items={[
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg>,
 t: "Pixel Pitch",
              d: "Smaller pitch = higher resolution and better close viewing. Choose by viewing distance and content detail.",
              bullets: ["Close viewing: smaller pitch", "Halls: bigger pitch", "Budget vs clarity balance"],
            },
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7v5h-5" /><path d="M18.5 16a8 8 0 1 1 .5-9" /></svg>,
 t: "Refresh Rate",
 d: "Higher refresh is better for camera/live video-reduces flicker lines in recording.",
              bullets: ["Stage/studio: high refresh", "Clean signal cabling", "Processor quality matters"],
            },
            {
              i: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12 4v16" /></svg>,
 t: "Brightness & Grayscale",
              d: "Brightness must be comfortable indoors; grayscale affects smooth gradients and professional look.",
              bullets: ["Calibration improves uniformity", "Quality PSU helps stability", "Avoid over-bright setup"],
            },
          ]}
        />
      </Section>

      {/* Indoor vs Outdoor */}
      <Section
 title="Indoor vs Outdoor LED Display Quick Comparison"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4v14M17 6v14M4 18h6M14 20h6" />
            <circle cx="7" cy="4" r="2" fill="currentColor" stroke="none" />
            <circle cx="17" cy="6" r="2" fill="currentColor" stroke="none" />
          </svg>
        }
        subtitle="A simple comparison to avoid wrong selection and ensure the right build for your environment."
      >
        <ComparisonGrid
          topicHeader="Topic"
          firstHeader="Indoor LED"
          secondHeader="Outdoor LED"
          rows={[
            ["Brightness", "Comfort-focused, indoor lighting suitable", "High brightness, sunlight visible"],
            ["Protection", "Dust control + ventilation planning", "IP-rated sealing + water drainage"],
            ["Pixel Pitch", "Usually smaller (fine pitch)", "Often larger for distance viewing"],
            ["Cabinet Service", "Front/rear service options", "Service doors + weatherproof access"],
            ["Power/Surge", "Stable power + grounding", "Grounding + SPD strongly recommended"],
          ]}
        />
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
        <ComparisonGrid
          topicHeader="Comparison Point"
          firstHeader="Indoor LED Display"
          secondHeader="LCD Video Wall"
          rows={[
            ["Seam Visibility", "Seamless large canvas for unified visuals and cleaner branding impact.", "Visible bezel lines between panels can interrupt image continuity."],
            ["Scalability", "Flexible sizing and aspect ratio for custom walls, stage sets, and creative layouts.", "Limited to fixed panel sizes and predefined grid combinations."],
            ["Viewing Experience", "Strong brightness control, wide viewing angle, and better large-format immersion.", "Good close-view detail but reduced impact on very large wall formats."],
            ["Long-Hour Operation", "Designed for stable continuous operation in control rooms and commercial environments.", "Can run long hours, but heat and bezel aging need tighter management over time."],
            ["Maintenance", "Module-level servicing allows targeted replacement with lower downtime risk.", "Panel-level replacement may increase cost and downtime in some service cases."],
            ["Best Use Case", "Showrooms, command centers, corporate lobbies, and premium indoor brand displays.", "Meeting rooms, monitoring walls, and budget-focused tiled display setups."],
          ]}
        />
      </Section>

      {/* Consultation */}
      <Section
 title="Indoor LED Display Project Consultation in Bangladesh"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        }
 subtitle="Share your room size, viewing distance, and content type-then we recommend pixel pitch, screen size, processor, structure, and BOQ."
      >
        <div className="rounded-xl border border-[#dbe5f2] bg-[linear-gradient(105deg,#ffffff_0%,#f7fbff_58%,#eef5ff_100%)] p-4 shadow-[0_5px_16px_rgba(15,23,42,0.035)] md:p-5">
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
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#1458e5]" />
                <span className="leading-7">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section className="mt-4 rounded-2xl border border-[#d9e4f2] bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:px-5 md:px-6" aria-labelledby="indoor-projects-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="indoor-projects-heading" className="flex items-start gap-2.5 text-xl font-extrabold leading-7 tracking-tight text-[#071936] lg:items-center lg:text-[22px]">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cfe0ff] bg-[#edf4ff] text-[#1458e5]" aria-hidden="true"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z" /><path d="m7 15 3-3 2 2 3-4 2 3" /></svg></span>
              <span className="min-w-0">Recent Indoor LED Projects</span>
            </h2>
            <p className="mt-2 !text-left text-sm leading-7 text-slate-600">A selection of indoor video wall installations for corporate and showroom environments.</p>
          </div>
          <Link href="/projects/" className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#1458e5] bg-white px-4 text-xs font-extrabold text-[#1458e5] transition hover:bg-[#edf4ff]">View All Projects</Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { title: "Corporate Indoor LED Video Wall", image: "/images/project-page/project-indoor-wall.webp", tag: "Fine-Pitch Display" },
            { title: "Retail Showroom LED Display", image: "/images/project-page/Project-indoor-showroom.webp", tag: "Custom Structure" },
            { title: "Technology Showroom LED Wall", image: "/images/project-page/project-redirect.webp", tag: "Calibrated Output" },
          ].map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-xl border border-[#dbe5f2] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.045)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100"><Image src={project.image} alt={project.title} fill sizes="(max-width: 767px) 92vw, 30vw" className="object-cover transition duration-300 group-hover:scale-[1.025]" /></div>
              <div className="p-4"><span className="inline-flex rounded-full bg-[#edf4ff] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#1458e5]">{project.tag}</span><h3 className="mt-2 text-[15px] font-extrabold leading-5 text-[#071936]">{project.title}</h3></div>
            </article>
          ))}
        </div>
      </section>

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
        <CardGrid
          titleAsHeading
          desktopClassName="sm:grid-cols-2"
          items={[
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
          ]}
        />
      </Section>

      {/* Xplore solutions */}
      <Section
 title="Explore High-Performance LED Display in Bangladesh"
        tone="blue"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M12 4v16" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        }
 subtitle="From indoor video walls to outdoor branding and rental event screens-explore the right category for your project."
      >
        <SolutionGrid
          items={[
            { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
            { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
            { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
          ]}
        />
      </Section>

      <Section
        id="why-choose-indoor-led"
        title="Why Choose Sasha Corporation for Indoor LED Display in Bangladesh"
        tone="blue"
        subtitle={"Indoor LED display planning, installation, calibration, and after-sales support are delivered as one coordinated project solution in Bangladesh."}
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Project-Based Design", text: "Screen size, pitch, processor, structure, and access are selected from the actual site requirement." },
            { title: "Safe Power & Structure", text: "Load planning, grounding, protection, cabling, and structural support are included in the engineering scope." },
            { title: "Calibration & Handover", text: "Mapping, brightness, color, signal testing, operator guidance, and final handover are completed on site." },
            { title: "After-Sales Support", text: "Technical guidance, maintenance planning, spare-part support, and service response continue after installation." },
          ].map((item, index) => (
            <article key={item.title} className="rounded-xl border border-[#dce6f3] bg-white p-4 shadow-[0_7px_20px_rgba(15,37,70,0.055)]">
              <div className="flex items-center justify-between"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1458e5] ring-1 ring-[#d6e4fb]"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7 12 3 3 7-7" /><circle cx="12" cy="12" r="9" /></svg></span><span className="text-[10px] font-black text-[#9ab4dc]">0{index + 1}</span></div>
              <h3 className="mt-3 text-[15px] font-extrabold leading-5 text-[#071936]">{item.title}</h3>
              <p className="mt-1.5 text-[12px] leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section
        id="indoor-led-process"
 title="End-to-End LED Display Solution Process"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
            <path d="M7 12h3M14 12h3" />
          </svg>
        }
        subtitle="A clear delivery process from recommendation to installation to long-term service."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "1) Survey", d: "Site visit, measurements, viewing distance, power check." },
            { t: "2) Design", d: "BOQ, structure plan, controller and processor selection." },
            { t: "3) Install", d: "Structure, wiring, cabinet assembly and safety checks." },
            { t: "4) Support", d: "Mapping, calibration, training and maintenance guidance." },
          ].map((x, index) => (
            <article key={x.t} className="relative flex min-w-0 flex-col rounded-xl border border-[#dce6f3] bg-white p-4 shadow-[0_7px_20px_rgba(15,37,70,0.055)] transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1458e5] ring-1 ring-[#d6e4fb]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h4l2-6 2 12 2-6h4" /></svg>
                </span>
                <span className="rounded-full bg-[#1458e5] px-2 py-1 text-[8px] font-extrabold tracking-wide text-white">STEP {String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-3 text-[13px] font-extrabold leading-4 text-[#071936]">{x.t.replace(/^\d\)\s*/, "")}</h3>
              <p className="mt-1.5 text-[11px] leading-5 text-slate-600">{x.d}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-nowrap gap-2.5 md:flex-wrap md:gap-3">
          <Link
            href="/contact/"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#1458e5] px-4 py-2 text-[11px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#0f49c6] md:px-5 md:text-sm"
          >
            Get Indoor Display Consultation -&gt;
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-[11px] font-extrabold text-[#071936] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 md:px-5 md:text-sm"
          >
            WhatsApp Now
          </a>
        </div>
      </Section>

      {/* FAQs */}
      <Section
        id="indoor-led-faq"
 title="FAQs About LED Display Solution"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.2" />
            <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        }
        subtitle="Practical answers to common questions before ordering an LED display project in Bangladesh."
      >
        <FaqAccordion
          accent="#1458e5"
          density="compact"
          columns={2}
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

      </Section>

      <section
        className="mt-4 overflow-hidden rounded-2xl border border-[#d9e4f2] bg-white shadow-[0_10px_30px_rgba(7,25,54,0.10)]"
        aria-labelledby="indoor-led-final-cta"
      >
        <div className="relative overflow-hidden bg-[#06183b]">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 md:block" aria-hidden="true">
            <Image src="/images/led hero/indoor-led-hero.webp" alt="" fill sizes="32vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#06183b_0%,rgba(6,24,59,0.45)_28%,rgba(6,24,59,0.05)_72%,transparent_100%)]" />
          </div>
          <div className="relative z-10 grid gap-5 px-5 py-5 sm:px-7 md:grid-cols-12 md:items-center md:gap-6 lg:px-8">
            <div className="min-w-0 md:col-span-7">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1458e5] text-white shadow-[0_8px_24px_rgba(20,88,229,0.35)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Zm-3 9 2 2 4-4" /></svg>
                </span>
                <div className="min-w-0">
                  <h2 id="indoor-led-final-cta" className="text-[21px] font-black leading-tight tracking-tight text-white sm:text-[24px]">Planning an Indoor LED Display Project?</h2>
                  <p className="mt-1 !text-left text-[10px] font-medium leading-4 text-blue-100 sm:text-[11px]">Get the right pixel pitch, accurate pricing and professional installation support.</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                {["Site Survey", "Custom BOQ", "Professional Installation", "After-Sales Support"].map((item, index) => (
                  <div key={item} className={`flex min-w-0 items-center gap-2 ${index ? "sm:border-l sm:border-blue-300/35 sm:pl-4" : ""}`}><span className="text-blue-300">✓</span><span className="text-[9px] font-extrabold leading-4 text-white sm:text-[10px]">{item}</span></div>
                ))}
              </div>
            </div>
            <div className="grid gap-2.5 md:col-span-2">
              <Link href="/contact/?project=indoor-led-display" className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#1458e5] px-4 text-[11px] font-extrabold text-white shadow-md transition hover:bg-[#0f49c6]">Request Free BOQ</Link>
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-[11px] font-extrabold text-[#071936] shadow-sm hover:bg-blue-50">Talk to an Engineer</a>
            </div>
            <div className="hidden md:col-span-3 md:block" aria-hidden="true" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4 px-4 py-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:gap-y-0 lg:px-7">
          {["Fine-Pitch Options", "Custom Screen Size", "Safe Power Design", "Expert Installation", "Calibration", "Technical Support"].map((item, index) => (
            <div key={item} className={`flex min-w-0 items-center gap-2.5 px-2 sm:px-3 ${index ? "lg:border-l lg:border-slate-200" : ""}`}><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#1458e5]">✓</span><span className="text-[10px] font-extrabold leading-4 text-[#071936] sm:text-[11px]">{item}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}




