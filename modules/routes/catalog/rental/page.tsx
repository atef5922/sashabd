import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { ledAccessoriesCatalog, rentalCatalog, type LedAccessoryProduct, type ProductItem } from "@/lib/productsCatalog";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Rental LED Display in Bangladesh | Stage & Concert LED" },
  description:
    "Rental LED display in Bangladesh for stage, wedding, concert and corporate events with fast setup and technical support.",
  alternates: { canonical: absoluteUrl("/led-display/rental-display/") },
  openGraph: {
    title: "Rental LED Display in Bangladesh | Stage & Concert LED",
    description:
      "Rental LED display in Bangladesh for stage, wedding, concert and corporate events with fast setup and technical support.",
    url: absoluteUrl("/led-display/rental-display/"),
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/rental/P3.91-Rental-LED-Display.webp"),
        width: 1200,
        height: 630,
        alt: "Rental LED Display in Bangladesh | Stage & Concert LED",
      },
    ],
  },
};

const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
};

function getPitchLabel(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"));
  if (!spec) return "Rental";
  const v = spec.v.trim();
  const first = v.split(" ")[0];
  return first || v;
}

function getPitchDisplay(p: ProductItem): string {
  const spec = p.keySpecs.find((x) => x.k.toLowerCase().includes("pixel pitch"))?.v ?? "";
  const mm = spec.match(/(\d+(?:\.\d+)?)\s*mm/i)?.[1];
  if (mm) return `${mm} mm`;
  const pVal = spec.match(/p\s?(\d+(?:\.\d+)?)/i)?.[1];
  return pVal ? `${pVal} mm` : getPitchLabel(p);
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
  <section className="mt-8 rounded-[24px] border bg-white p-4 md:mt-10 md:rounded-3xl md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
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

const CardGrid = ({ items }: { items: { t: string; d: string; bullets?: string[] }[] }) => (
  <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
    {items.map((x, index) => (
      <div
        key={x.t}
        className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6"
        style={responsiveCardStyle(index)}
      >
        <div className="text-[17px] font-extrabold leading-snug text-slate-900 md:overflow-hidden md:text-ellipsis md:whitespace-nowrap md:text-[15px] md:tracking-tight lg:text-[16px]">
          {x.t}
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
        {x.bullets?.length ? (
          <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700 md:text-sm">
            {x.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-2 w-2 rounded-full md:mt-2" style={{ background: BRAND.maroon }} />
                <span className="leading-6 md:leading-7">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    ))}
  </div>
);

type RentalHeroIconName = "range" | "lock" | "stack" | "processor" | "headset" | "events" | "location" | "setup" | "shield" | "arrow";

function RentalHeroIcon({ name, className = "h-5 w-5" }: { name: RentalHeroIconName; className?: string }) {
  const paths: Record<RentalHeroIconName, React.ReactNode> = {
    range: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="2" /><circle cx="16" cy="15" r="2" /><path d="M10 9h7M7 15h7" /></>,
    lock: <><circle cx="12" cy="12" r="8" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
    stack: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    processor: <><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8M12 17v4M7 8h4v4H7zM14 8h3M14 11h3" /></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1zM17 20c0 1-1.2 2-3 2" /></>,
    events: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 15a5 5 0 0 1 6 4.8" /></>,
    location: <><path d="M12 21s6-5 6-11a6 6 0 1 0-12 0c0 6 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    setup: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
    shield: <><path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6z" /><path d="m9 12 2 2 4-4" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function RentalLedHero() {
  const features: Array<{ title: string; detail: string; icon: RentalHeroIconName }> = [
    { title: "P2.6 – P4.81", detail: "Wide Range", icon: "range" },
    { title: "Quick-Lock", detail: "Rental Cabinet", icon: "lock" },
    { title: "Hanging /", detail: "Stacking Setup", icon: "stack" },
    { title: "Processor &", detail: "Live Camera Support", icon: "processor" },
    { title: "On-Site Operator", detail: "& Technical Team", icon: "headset" },
  ];
  const trustItems: Array<{ title: string; detail: string; icon: RentalHeroIconName }> = [
    { title: "Event-Ready", detail: "Rental Solutions", icon: "events" },
    { title: "Nationwide", detail: "Service Coverage", icon: "location" },
    { title: "Professional", detail: "Setup & Support", icon: "setup" },
    { title: "Reliable", detail: "On-Time Service", icon: "shield" },
  ];

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] -mt-2 min-h-[720px] w-screen overflow-hidden bg-[#001229] text-white sm:min-h-[630px] lg:min-h-[clamp(22rem,28.5vw,27rem)]" aria-labelledby="rental-led-hero-heading">
      <Image
        src="/images/rental/hero/rental-led-hero-banner.webp"
        alt="Large rental LED display at a live concert stage"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[67%_center] sm:object-[62%_center] lg:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,17,38,0.99)_0%,rgba(0,17,38,0.92)_36%,rgba(0,17,38,0.42)_66%,rgba(0,17,38,0.12)_100%)] sm:bg-[linear-gradient(90deg,rgba(0,17,38,0.98)_0%,rgba(0,17,38,0.88)_39%,rgba(0,17,38,0.2)_74%,rgba(0,17,38,0.08)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,11,27,0.96)_0%,rgba(0,11,27,0.18)_28%,transparent_52%)]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[720px] w-full max-w-[clamp(80rem,90vw,108rem)] flex-col px-5 pb-5 pt-7 sm:min-h-[630px] sm:px-8 lg:min-h-[clamp(22rem,28.5vw,27rem)] lg:px-10 lg:pb-5 lg:pt-7 xl:px-12">
        <div className="max-w-[38rem] text-left lg:max-w-[43%]">
          <p className="flex items-center gap-3 !text-left text-[9px] font-extrabold uppercase tracking-[0.32em] text-white/90 sm:text-[10px]">
            <span className="h-0.5 w-6 bg-[#ff6a00]" aria-hidden="true" />
            Rental LED Display Solutions
          </p>
          <h1 id="rental-led-hero-heading" className="mt-3 !text-[36px] font-black leading-[0.98] tracking-[-0.035em] text-white sm:!text-[42px] lg:!text-[clamp(2.2rem,3.15vw,3rem)]">
            Make Your Event
            <span className="mt-1 block">Bigger &amp; <span className="text-[#ff4f8b]">Brighter</span></span>
          </h1>
          <p className="mt-3 max-w-[34rem] !text-left text-[13px] font-medium leading-5 text-slate-100 sm:text-sm sm:leading-6 lg:text-[clamp(0.76rem,0.95vw,0.92rem)]">
            Rental LED Display in Bangladesh for Concerts, Corporate Events, Weddings, Stage Shows, Exhibitions and More.
          </p>
        </div>

        <ul className="mt-5 grid max-w-[42rem] grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:mt-5 lg:grid-cols-5 lg:gap-x-5">
          {features.map((feature) => (
            <li key={feature.title} className="flex min-w-0 items-center gap-2.5 text-left">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#ff6a00]"><RentalHeroIcon name={feature.icon} className="h-7 w-7" /></span>
              <span className="min-w-0 text-[9px] font-bold leading-[1.25] text-white sm:text-[9.5px]"><strong className="block font-extrabold">{feature.title}</strong><span className="block text-white/85">{feature.detail}</span></span>
            </li>
          ))}
        </ul>

        <div className="pointer-events-none absolute left-[88%] top-[17%] hidden -rotate-6 text-center font-serif text-[17px] italic leading-5 text-white xl:block" aria-hidden="true">
          Events<br />Look Better<br />on LED
          <span className="mx-auto mt-2 block h-0.5 w-10 rotate-[-8deg] bg-[#ff6a00]" />
        </div>

        <div className="mt-auto grid items-end gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8">
          <div className="grid grid-cols-1 gap-3 sm:flex">
            <Link href="/contact/?project=rental-led-display" className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg px-3 text-center text-[10px] font-extrabold text-white shadow-[0_9px_24px_rgba(255,101,15,0.28)] transition hover:-translate-y-0.5 sm:px-6 sm:text-xs" style={{ backgroundColor: "#ff650f" }}>
              Get Rental Price <RentalHeroIcon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/contact/?project=rental-led-display&service=event-consultation" className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-lg border border-white/75 px-2 text-center text-[10px] font-extrabold leading-4 text-white backdrop-blur-sm transition hover:-translate-y-0.5 sm:px-6 sm:text-xs" style={{ backgroundColor: "rgba(5, 24, 47, 0.72)" }}>
              Book Event Consultation
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/15 pt-4 sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            {trustItems.map((item) => (
              <div key={item.title} className="flex min-w-0 items-center gap-2.5 text-left">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-500/35 bg-[#002b52]/80 text-[#00a8ff] shadow-[0_0_18px_rgba(0,168,255,0.18)]"><RentalHeroIcon name={item.icon} className="h-5 w-5" /></span>
                <span className="min-w-0"><strong className="block text-[10px] font-extrabold leading-4 text-white sm:text-[11px]">{item.title}</strong><span className="block text-[8px] font-medium leading-3 text-white/75 sm:text-[8.5px]">{item.detail}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RentalSectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
          <span className="h-0.5 w-5 bg-[#ff6a00]" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-1.5 text-[22px] font-black leading-tight tracking-[-0.025em] text-[#071a35] md:text-[26px]">
          {title}
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-500 md:text-[13px]">{description}</p>
      </div>
      <div className="shrink-0 text-xs font-bold text-[#e45700]">{action}</div>
    </div>
  );
}

const rentalModelCardImages: Record<string, string> = {
  "p2-6-rental-led-display": "/images/rental/cards/p2-6-rental-led-card.webp",
  "p3-rental-led-display": "/images/rental/cards/p3-rental-led-card.webp",
  "p3-91-rental-led-display": "/images/rental/cards/p3-91-rental-led-card.webp",
  "p4-81-rental-led-display": "/images/rental/cards/p4-81-rental-led-card.webp",
};

function RentalModelShowcase({
  products,
  accessories,
}: {
  products: ProductItem[];
  accessories: LedAccessoryProduct[];
}) {
  const hasAccessories = accessories.length > 0;

  return (
    <section className="mt-6" aria-labelledby="rental-model-showcase-heading">
      {hasAccessories ? (
        <input
          id="rental-solutions-toggle"
          type="checkbox"
          className="sr-only"
          aria-label="Show or hide the complete rental package"
          aria-controls="rental-expanded-solutions"
        />
      ) : null}
      {hasAccessories ? (
        <style>{`
          #rental-expanded-solutions {
            display: grid;
            grid-template-rows: 0fr;
            margin-top: 0;
            opacity: 0;
            transition: grid-template-rows 300ms ease, margin-top 300ms ease, opacity 220ms ease;
          }
          #rental-solutions-toggle:checked ~ #rental-expanded-solutions {
            grid-template-rows: 1fr;
            margin-top: 1rem;
            opacity: 1;
          }
          #rental-solutions-toggle:checked ~ * label[for="rental-solutions-toggle"] .rental-toggle-open-label {
            display: none;
          }
          #rental-solutions-toggle:checked ~ * label[for="rental-solutions-toggle"] .rental-toggle-close-label {
            display: inline;
          }
          #rental-solutions-toggle:checked ~ * label[for="rental-solutions-toggle"] .rental-toggle-arrow {
            transform: rotate(-90deg);
          }
        `}</style>
      ) : null}
      <RentalSectionHeading
        id="rental-model-showcase-heading"
        eyebrow="Our Rental LED Models"
        title="Choose the Right LED Display for Your Event"
        description="High-performance rental LED screens with vibrant visuals, seamless structure and reliable performance."
        action={
          hasAccessories ? (
            <label
              htmlFor="rental-solutions-toggle"
              className="inline-flex cursor-pointer items-center gap-1 transition hover:text-[#ff6a00]"
            >
              <span className="rental-toggle-open-label">View Complete Rental Package</span>
              <span className="rental-toggle-close-label hidden">Show Less</span>
              <RentalHeroIcon name="arrow" className="rental-toggle-arrow h-3.5 w-3.5 transition-transform duration-300" />
            </label>
          ) : null
        }
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => {
          const pitch = getPitchDisplay(product);
          const cardImage = rentalModelCardImages[product.slug] ?? product.image;
          const detailLines = [
            `Pixel Pitch: ${pitch}`,
            product.quickFeatures[1],
            product.installationNotes[1],
            `Best For: ${product.bestFor.slice(0, 2).join(", ")}`,
          ].filter(Boolean);

          return (
            <article
              key={product.slug}
              className="group grid min-h-[220px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,35,60,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_10px_24px_rgba(15,35,60,0.10)]"
              style={{ gridTemplateColumns: "124px minmax(0, 1fr)" }}
            >
              <Link
                href={`/led-display/rental-display/${product.slug}/`}
                className="relative m-2 mr-0 overflow-hidden rounded-lg bg-white"
                aria-label={`View ${product.title}`}
              >
                <Image
                  src={cardImage}
                  alt={product.title}
                  fill
                  sizes="(max-width: 639px) 124px, (max-width: 1279px) 124px, 9vw"
                  className="object-contain transition duration-300 group-hover:scale-[1.025]"
                />
              </Link>

              <div className="flex min-w-0 flex-col px-3 pb-2.5 pt-3">
                <Link href={`/led-display/rental-display/${product.slug}/`} className="text-[13px] font-extrabold leading-4 text-[#071a35] transition hover:text-[#e45700]">
                  {product.title}
                </Link>
                <p className="mt-1 line-clamp-2 text-[9px] leading-[1.45] text-slate-500">{product.subtitle}</p>
                <ul className="mt-2 space-y-1.5">
                  {detailLines.map((detail, index) => (
                    <li key={`${product.slug}-${detail}`} className="flex items-start gap-1.5 text-[9px] font-medium leading-[1.35] text-slate-600">
                      <span className="mt-px inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-[#071a35]" aria-hidden="true">
                        <RentalHeroIcon name={index === 0 ? "range" : index === 1 ? "lock" : index === 2 ? "stack" : "events"} className="h-3 w-3" />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact/?project=rental-led-display&model=${product.slug}`}
                  className="mt-auto inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-[#fff0e5] px-3 text-[10px] font-extrabold text-[#e45700] transition hover:bg-[#ff6a00] hover:text-white"
                >
                  Get Quote <RentalHeroIcon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {hasAccessories ? (
        <div id="rental-expanded-solutions">
          <div className="min-h-0 overflow-hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_24px_rgba(15,35,60,0.06)] md:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#e45700]">Rental Accessories</p>
                  <h3 className="mt-1 text-lg font-black text-[#071a35] md:text-xl">Complete Your Rental Setup</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add transport protection and safe power distribution to complete your event-ready LED package.
                  </p>
                </div>
                <Link
                  href="/contact/?project=complete-rental-led-package"
                  className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#ff6a00] px-4 text-[11px] font-extrabold text-white shadow-[0_7px_18px_rgba(255,106,0,0.22)] transition hover:bg-[#e45700]"
                >
                  Get Complete Rental Package <RentalHeroIcon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {accessories.map((accessory) => (
                  <article
                    key={accessory.slug}
                    className="group flex min-h-[148px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition duration-300 hover:border-orange-200 hover:shadow-[0_8px_20px_rgba(15,35,60,0.08)]"
                  >
                    <Link
                      href={`/led-display/accessories/led-accessories/${accessory.slug}/`}
                      className="relative w-28 shrink-0 overflow-hidden bg-slate-100 sm:w-40"
                      aria-label={`View ${accessory.title}`}
                    >
                      <Image
                        src={accessory.image}
                        alt={accessory.title}
                        fill
                        sizes="(max-width: 639px) 112px, 160px"
                        className="object-cover transition duration-500 group-hover:scale-[1.035]"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col p-3">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#e45700]">
                        {accessory.badge}
                      </span>
                      <Link
                        href={`/led-display/accessories/led-accessories/${accessory.slug}/`}
                        className="mt-1 text-[13px] font-extrabold leading-4 text-[#071a35] transition hover:text-[#e45700]"
                      >
                        {accessory.title}
                      </Link>
                      <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">{accessory.subtitle}</p>
                      {accessory.cardPrice ? (
                        <p className="mt-1 text-[10px] font-bold text-sky-700">{accessory.cardPrice}</p>
                      ) : null}
                      <Link
                        href={`/led-display/accessories/led-accessories/${accessory.slug}/`}
                        className="mt-auto inline-flex items-center gap-1 text-[10px] font-extrabold text-[#e45700]"
                      >
                        View Details <RentalHeroIcon name="arrow" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

type RentalOccasion = {
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  icon: RentalHeroIconName;
  query: string;
};

const rentalOccasions: RentalOccasion[] = [
  {
    title: "Corporate Event",
    description: "Conferences, product launches and seminars",
    image: "/images/project-page/project-pa-system.webp",
    icon: "events",
    query: "corporate-event",
  },
  {
    title: "Concert & Live Show",
    description: "Music concerts, stage shows and festivals",
    image: "/images/rental/hero/rental-led-hero-banner.webp",
    imagePosition: "62% center",
    icon: "processor",
    query: "concert-live-show",
  },
  {
    title: "Wedding Event",
    description: "Wedding ceremonies, receptions and special events",
    image: "/images/rental/P2.6-Rental-LED-Display.webp",
    icon: "events",
    query: "wedding-event",
  },
  {
    title: "Stage Backdrop",
    description: "Stage programs, cultural events and college fests",
    image: "/images/rental/hero/rental-led-hero-banner.webp",
    imagePosition: "78% center",
    icon: "stack",
    query: "stage-backdrop",
  },
  {
    title: "Exhibition & Trade Show",
    description: "Exhibitions, product displays and brand promotions",
    image: "/images/project-page/Project-indoor-showroom.webp",
    icon: "setup",
    query: "exhibition-trade-show",
  },
  {
    title: "Outdoor & Festival",
    description: "Public events, outdoor festivals and large gatherings",
    image: "/images/project-page/project-rental.webp",
    imagePosition: "center 42%",
    icon: "location",
    query: "outdoor-festival",
  },
];

function RentalOccasionShowcase() {
  return (
    <section className="mt-7" aria-labelledby="rental-occasion-showcase-heading">
      <RentalSectionHeading
        id="rental-occasion-showcase-heading"
        eyebrow="Choose by Event Type"
        title="LED Display Rental for Every Occasion"
        description="From corporate conferences to massive concerts, we provide the right LED screen solution for your event."
        action={
          <span className="inline-flex flex-wrap items-center gap-1 text-slate-500">
            <span className="font-semibold">Need a custom solution?</span>
            <Link href="/contact/?project=rental-led-display" className="inline-flex items-center gap-1 text-[#e45700] transition hover:text-[#ff6a00]">
              Contact Our Team <RentalHeroIcon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </span>
        }
      />

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {rentalOccasions.map((occasion) => (
          <Link
            key={occasion.title}
            href={`/contact/?project=rental-led-display&event=${occasion.query}`}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,35,60,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_10px_24px_rgba(15,35,60,0.10)]"
          >
            <div className="relative h-24 overflow-hidden bg-slate-100 sm:h-28 xl:h-[92px]">
              <Image
                src={occasion.image}
                alt={`${occasion.title} LED display rental solution`}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 16vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                style={occasion.imagePosition ? { objectPosition: occasion.imagePosition } : undefined}
              />
              <span className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
            </div>
            <div className="flex min-h-[92px] gap-2.5 p-2.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#002f58] text-sky-300 shadow-sm" aria-hidden="true">
                <RentalHeroIcon name={occasion.icon} className="h-4 w-4" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <strong className="text-[11px] font-extrabold leading-4 text-[#071a35]">{occasion.title}</strong>
                <span className="mt-1 text-[9px] leading-[1.4] text-slate-500">{occasion.description}</span>
                <span className="mt-auto self-end text-[#071a35] transition group-hover:translate-x-0.5 group-hover:text-[#e45700]">
                  <RentalHeroIcon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function RentalProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
 // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Add one more rental product card locally (no change to productsCatalog needed)

 // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ only push extra if slug not already present

  const stickyAccessorySlugs = ["heavy-duty-flight-case", "power-distribution-box-63a"] as const;
  const stickyAccessories = stickyAccessorySlugs
    .map((slug) => ledAccessoriesCatalog.find((p) => p.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  return (
    <div className="rental-led-page mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6" data-rental-led-route-kind="hub">
      <RentalLedHero />

      <RentalModelShowcase
        products={rentalCatalog}
        accessories={stickyAccessories}
      />
      <RentalOccasionShowcase />

      <Section
        title="Types of LED Display Rental Solutions"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="5" width="7" height="6" rx="1" />
            <rect x="13" y="5" width="7" height="6" rx="1" />
            <rect x="8.5" y="13" width="7" height="6" rx="1" />
          </svg>
        }
        subtitle="Choose the right rental LED setup by event type, venue condition, and visual requirement to ensure smooth setup and clear audience communication."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-3">
          {[
            {
              t: "Indoor Rental LED Display",
              d: "Best for conference halls, indoor stages, and corporate venues where fine detail and close-view clarity are important.",
            },
            {
              t: "Outdoor Rental LED Screen",
              d: "Built for open-air events with higher brightness and weather-ready cabinet design for stable visibility in daylight.",
            },
            {
              t: "Stage Background LED Screen",
              d: "Creates a dynamic backdrop for live programs, product launches, and cultural events with high visual impact.",
            },
            {
              t: "Concert LED Video Wall",
              d: "Supports performance visuals, live feed integration, and high-energy motion content for concert environments.",
            },
            {
              t: "Wedding LED Display",
              d: "Used for ceremony visuals, couple highlights, and themed presentation content with fast event-day setup.",
            },
            {
              t: "Corporate Event LED Screen",
              d: "Ideal for brand presentations, keynote sessions, and hybrid business events requiring professional image delivery.",
            },
            {
              t: "Exhibition LED Display",
              d: "Helps booths and product zones attract visitors with rotating promotional media and high-visibility messaging.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6"
              style={responsiveCardStyle(index)}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-base">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

      </Section>

      <Section
        title="Why Choose Our Rental LED Display"
        titleIcon={
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
        subtitle="A practical advantage overview to help event teams choose a rental LED setup that stays visually strong, operationally smooth, and technically reliable."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-3">
          {[
            {
              t: "High brightness LED panels",
              d: "Ensures clear and vivid content visibility across indoor stages and semi-outdoor event environments.",
            },
            {
              t: "Seamless video wall display",
              d: "Creates a continuous visual canvas for presentations, performances, and brand storytelling without distracting gaps.",
            },
            {
              t: "Professional installation",
              d: "Structured setup workflow helps maintain alignment, safe cabling, and stable output from start to finish.",
            },
            {
              t: "On-site technical support",
              d: "Dedicated technical presence helps resolve live signal or playback issues quickly during event operation.",
            },
            {
              t: "Flexible screen sizes",
              d: "Screen dimensions can be adapted to venue layout, audience distance, and content format requirements.",
            },
            {
              t: "Fast setup and dismantling",
              d: "Rental-ready cabinet systems support quick deployment and teardown, reducing event turnaround time.",
            },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6"
              style={responsiveCardStyle(index)}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-base">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

      </Section>

      <Section
        title="LED Screen Rental for Events"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 7h14" />
            <path d="M7 5v4" />
            <path d="M17 5v4" />
            <rect x="4" y="9" width="16" height="10" rx="2" />
            <path d="m10 13 4 2-4 2z" />
          </svg>
        }
        subtitle="Event-specific rental LED configurations to match audience size, content type, and production setup requirements."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-4">
          {[
            { t: "Concert", d: "High-energy stage visuals and live performance content display." },
            { t: "Wedding", d: "Ceremony highlights, couple visuals, and reception-stage presentation." },
            { t: "Political Event", d: "Campaign messaging, live speeches, and crowd-facing communication." },
            { t: "Corporate Event", d: "Keynote decks, brand content, and professional event presentation." },
            { t: "Trade Show", d: "Booth branding, rotating promotions, and attention-grabbing display zones." },
            { t: "Product Launch", d: "Hero product reveal visuals with synchronized media playback." },
            { t: "Live Streaming Event", d: "Broadcast-support display for live feed and audience engagement." },
            { t: "Stage Backdrop", d: "Seamless background wall for shows, seminars, and live programs." },
          ].map((x, index) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6"
              style={responsiveCardStyle(index)}
            >
              <h3 className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-base">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

      </Section>

      <Section
        title="LED Display Rental Process"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h9" />
            <path d="M4 12h7" />
            <path d="M4 17h5" />
            <path d="m14 6 6 6-6 6" />
          </svg>
        }
        subtitle="A simple step-by-step workflow to plan, install, and run your rental LED screen smoothly."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-5">
          {[
            { t: "Contact us", d: "Reach out with your event date, location, and basic LED screen requirement." },
            { t: "Share event details", d: "Provide stage layout, audience distance, content type, and timing plan." },
            { t: "Choose screen size", d: "Finalize suitable LED size and setup format based on venue and visibility needs." },
            { t: "Installation by our engineers", d: "Our team handles safe setup, alignment, cabling, and system configuration." },
            { t: "Event support & operation", d: "On-site technical support ensures stable playback and smooth show execution." },
          ].map((x, idx) => (
            <div
              key={x.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-5"
              style={responsiveCardStyle(idx)}
            >
              <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: BRAND.maroon }}>
                Step {idx + 1}
              </div>
              <h3 className="mt-2 text-[17px] font-extrabold leading-snug text-slate-900 md:text-base">{x.t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

      </Section>

      {/* Applications */}
      <Section
 title="Rental LED Display Applications in Bangladesh"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19h16" />
            <path d="M6 16V8l6-3 6 3v8" />
            <path d="M9 11h6" />
          </svg>
        }
        subtitle="Rental cabinets are built for fast event setup where speed, safety, and visual impact matter."
      >
        <CardGrid
          items={[
            {
 t: "Stage backdrops",
              d: "Large background video walls for live programs, conferences, and indoor stages.",
              bullets: ["Quick lock system", "Clean mapping", "Camera-friendly refresh (setup dependent)"],
            },
            {
 t: "Weddings & social events",
              d: "Holud, wedding reception, brand photo zones, and event highlights.",
              bullets: ["Vivid visuals", "Fast setup/dismantle", "Clean cabling & safe edges"],
            },
            {
 t: "Concerts & live shows",
              d: "High-impact visuals, IMAG style screens, and dynamic content for performers.",
              bullets: ["Hanging/stacking options", "Processor + camera planning", "On-site operator support"],
            },
          ]}
        />
      </Section>

      {/* Setup checklist */}
      <Section
 title="Fast Setup Checklist (Rental LED Screen)"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="m8.2 12.2 2.4 2.4 5.2-5.2" />
          </svg>
        }
        subtitle="A simple checklist used by event teams to avoid common issues during live programs."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:rounded-3xl md:border md:bg-slate-50 md:p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
          {[
            {
 t: "Structure & safety",
              items: [
                "Hanging points / truss load check",
                "Ground stacking base leveling",
                "Safety locks & corner protection",
                "Cable routing to avoid trip hazards",
              ],
            },
            {
 t: "Power planning",
              items: ["Load estimate (W) & DB/MCB", "Proper earthing", "Backup power (IPS/Generator)", "Stable PSU"],
            },
            {
 t: "Signal & mapping",
              items: ["Sender/controller setup", "Correct mapping order", "Spare data cable ready", "Test patterns"],
            },
            {
 t: "Show readiness",
              items: ["Brightness tuning", "Content playback test", "Burn-in before show", "Operator briefing"],
            },
          ].map((b, index) => (
            <div
              key={b.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-2xl md:border-[var(--desktop-border-color)] md:bg-white md:p-5"
              style={responsiveCardStyle(index, `${BRAND.maroon}12`)}
            >
              <div className="text-[16px] font-extrabold text-slate-900 md:text-sm">{b.t}</div>
              <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700 md:text-sm">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-2 w-2 rounded-full md:mt-2" style={{ background: BRAND.maroon }} />
                    <span className="leading-6 md:leading-7">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hidden md:col-span-2 md:mt-2 md:flex md:flex-wrap md:gap-3">
            <Link
              href="/contact/"
              className="inline-flex min-h-10 items-center justify-center rounded-[10px] px-3 py-2 text-center text-[12px] font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Book Event Support -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-emerald-600 px-3 py-2 text-center text-[12px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 md:rounded-xl md:px-5 md:py-3 md:text-sm"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </Section>

      {/* Price drivers */}
      <Section
 title="Rental LED Display Cost Drivers in Bangladesh"
 subtitle="Even if you don't show price on the site, these factors define quotation and event package scope."
      >
        <CardGrid
          items={[
            {
 t: "Pixel pitch & clarity",
 d: "Smaller pitch gives better close viewing and camera clarity-often used for corporate and premium stages.",
              bullets: ["Close stage: smaller pitch", "Large venue: balanced pitch", "Budget vs clarity trade-off"],
            },
            {
 t: "Cabinet system",
              d: "Die-cast, quick locks, corner protection, and flatness affect build quality and speed.",
              bullets: ["Quick lock cabinet", "Touring durability", "Service-friendly modules"],
            },
            {
 t: "Support scope",
              d: "Operator, processor, rigging, power DB/MCB, and on-site standby can be included in a package.",
              bullets: ["Operator + mapping", "Power & safety", "On-site standby option"],
            },
          ]}
        />
      </Section>

      {/* Booking planner */}
      <Section
 title="Rental LED Event Booking Planner"
        subtitle="Use this quick planner before final booking to avoid last-minute delays, wrong sizing, or signal/power issues on show day."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
          {[
            {
              t: "Event & Screen Scope",
              items: [
                "Event date, venue, and setup time window",
 "Required screen size (W-H) and placement",
                "Viewing distance and expected audience area",
                "Indoor, semi-outdoor, or outdoor exposure",
              ],
            },
            {
              t: "Technical Inputs",
              items: [
                "Content source (laptop, media server, live camera)",
                "Input ports required (HDMI/SDI/other)",
                "Power line availability and backup plan",
                "Need for on-site operator and standby support",
              ],
            },
            {
              t: "Rigging & Safety",
              items: [
                "Hanging or ground-stacking preference",
                "Truss/load approval from venue authority",
                "Cable route and audience safety barriers",
                "Weather plan for semi-outdoor conditions",
              ],
            },
            {
              t: "Handover Checklist",
              items: [
                "Final content and resolution shared in advance",
                "Test-run completed before audience entry",
                "Point-of-contact available during live show",
                "Dismantle timing and access confirmation",
              ],
            },
          ].map((b, index) => (
            <div
              key={b.t}
              className="w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6"
              style={responsiveCardStyle(index)}
            >
              <div className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-base">{b.t}</div>
              <ul className="mt-3 space-y-2 text-[12.5px] text-slate-700 md:text-sm">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-2 w-2 rounded-full md:mt-2" style={{ background: BRAND.maroon }} />
                    <span className="leading-6 md:leading-7">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </Section>

      {/* Explore */}
      <Section
 title="Explore LED Display Categories"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M12 4v16" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        }
 subtitle="Compare indoor, outdoor and rental options-then choose the best category for your project."
      >
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
          {[
            { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
            { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
            { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
          ].map((x, index) => (
            <Link
              key={x.t}
              href={x.href}
              className="group w-[89%] shrink-0 snap-start rounded-[14px] border border-[var(--mobile-border-color)] bg-[var(--mobile-bg)] px-4 py-4 transition md:w-auto md:rounded-3xl md:border-[var(--desktop-border-color)] md:bg-slate-50 md:p-6 md:hover:-translate-y-0.5 md:hover:bg-white md:hover:shadow-md"
              style={responsiveCardStyle(index, `${BRAND.maroon}12`)}
            >
              <div className="text-[17px] font-extrabold leading-snug text-slate-900 md:text-lg">{x.t}</div>
              <p className="mt-2 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7 md:text-slate-600">{x.d}</p>
              <div className="mt-4 text-[12px] font-bold md:text-sm" style={{ color: BRAND.maroon }}>
                Explore -&gt;
              </div>
            </Link>
          ))}
        </div>

      </Section>

      {/* FAQs */}
      <Section
 title="FAQs About Rental LED Display"
        titleIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.2" />
            <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        }
        subtitle="Common questions before booking a rental LED screen for events and live programs."
      >
        <FaqAccordion
          accent={BRAND.maroon}
          density="compact"
          items={[
            {
              q: "Which rental LED pixel pitch is best for my event?",
              a: "It depends on viewing distance and camera use. Corporate events and close viewing usually need finer pitch, while large venues can use a balanced pitch for cost-effective coverage.",
            },
            {
              q: "Can rental LED displays be hung or stacked?",
              a: "Yes. Rental cabinets are typically designed for hanging (truss) or ground stacking. The method depends on venue, stage design, and safety requirements.",
            },
            {
              q: "Do you provide operator and on-site support?",
              a: "Yes. We can support mapping, calibration, playback/processor setup, and event-day troubleshooting depending on the package.",
            },
            {
              q: "Is rental LED suitable for semi-outdoor events?",
              a: "Some rental models support indoor/semi-outdoor use, but weather planning is important. For heavy rain exposure, outdoor-grade solutions are safer.",
            },
            {
              q: "What information do you need for a rental LED quotation?",
 a: "Event date/location, required screen size (W x H), viewing distance, stage setup type (hanging/stacking), content source (live HDMI or playback), and power availability are key inputs.",
            },
            {
              q: "Do I need a flight case and power distribution box for rental LED?",
              a: "For a professional rental workflow, a flight case protects panels and accessories during transport, and a proper power distribution box helps manage load, safety, and faster venue setup.",
            },
          ]}
        />

        <div className="mt-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap">
          <Link
            href="/contact/"
            className="inline-flex min-h-10 items-center justify-center rounded-[10px] px-3 py-2 text-center text-[12px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get Event Consultation -&gt;
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-emerald-600 px-3 py-2 text-center text-[12px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-6 md:py-3 md:text-sm"
          >
            WhatsApp for Booking
          </a>
        </div>
      </Section>
    </div>
  );
}
