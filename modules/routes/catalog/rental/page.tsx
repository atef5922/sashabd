import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { ledAccessoriesCatalog, rentalCatalog, type LedAccessoryProduct, type ProductItem } from "@/lib/productsCatalog";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
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

type RentalBadgeCategory = "Stage" | "Wedding" | "Corporate" | "Concert" | "Semi-Outdoor" | "Indoor";

function inferRentalCategory(p: ProductItem): RentalBadgeCategory {
  const s = `${p.bestFor.join(" ")} ${p.subtitle} ${p.title}`.toLowerCase();

  if (s.includes("concert") || s.includes("dj") || s.includes("music")) return "Concert";
  if (s.includes("wedding") || s.includes("holud") || s.includes("reception")) return "Wedding";
  if (s.includes("corporate") || s.includes("conference") || s.includes("program") || s.includes("seminar"))
    return "Corporate";
  if (s.includes("stage") || s.includes("backdrop") || s.includes("event")) return "Stage";
  if (s.includes("semi") || s.includes("outdoor")) return "Semi-Outdoor";
  return "Indoor";
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

export default function RentalProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
 // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Add one more rental product card locally (no change to productsCatalog needed)
  const extra: ProductItem = {
    category: "rental",
    slug: "p3-91-rental-led-display",
    title: "P3.91 Rental LED Display",
    subtitle: "250x250mm rental LED module with SMD1921 lamp, 64x64 resolution, 4500 cd/m2 brightness, and 7680Hz refresh support.",
    image: "/images/rental/P3.91-Rental-LED-Display.webp",
    quickFeatures: ["250x250mm universal module", "4500 cd/m2 high brightness", "7680Hz high refresh", "500x500 / 500x1000 rental cabinet ready"],
    bestFor: ["Stage backdrop", "Wedding events", "Corporate programs", "Concert visuals"],
    keySpecs: [
      { k: "Pixel Pitch", v: "P3.91 (3.91mm)" },
      { k: "LED Type", v: "SMD1921" },
      { k: "Module Resolution", v: "64 x 64 = 4096 pixels" },
      { k: "Pixel Density", v: "68,267 dots/m2" },
      { k: "Module Size", v: "250 x 250 x 15.6 mm" },
      { k: "Module Weight", v: "0.49 +- 0.02 kg" },
      { k: "HUB Type", v: "HUB75" },
      { k: "Brightness", v: "4500 cd/m2" },
      { k: "Viewing Angle", v: "140 / 120 deg" },
      { k: "Refresh Rate", v: "7680Hz" },
      { k: "Video Support", v: "2K, 4K" },
    ],
    buildQuality: ["Bottom case texture design improves exterior texture", "New PCB board design for stronger reliability", "Waterproof and moisture-proof front-side gluing treatment"],
    controlSystem: ["Single-dot brightness calibration supported", "6500K color temperature with 1000K-9500K adjustable range", "Supports 2K / 4K playback with 12-14bit processing depth"],
    installationNotes: ["Suitable for 500x500mm and 500x1000mm rental cabinets", "Hanging or ground stacking with safety check", "Fast assembly, calibration, and pre-show testing recommended"],
    supportNotes: ["High brightness with strong heat dissipation for event duty", "Supports 7680Hz refresh for camera-friendly output", "Customized selection recommended for coastal, low-temperature, or high-humidity environments"],
    faqs: [
      {
        q: "Is P3.91 good for stage events?",
        a: "Yes, P3.91 is widely used for stage rental because it balances clarity, 4500 cd/m2 brightness, and fast setup compatibility with common rental cabinet sizes.",
      },
    ],
  };

  const base = [...rentalCatalog];

 // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ only push extra if slug not already present
  const list: ProductItem[] = base.some((p) => p.slug === extra.slug) ? base : [...base, extra];

  const uniquePitches = Array.from(new Set(list.map(getPitchLabel))).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );
  const pitches = ["All", ...uniquePitches] as const;

  const activePitch = "All" as (typeof pitches)[number];

  const buildHref = (pitch: string) => {
    if (pitch === "All") return "/led-display/rental-display/";
    const matched = list.find((p) => getPitchLabel(p) === pitch);
    return matched ? `/led-display/rental-display/${matched.slug}` : "/led-display/rental-display/";
  };

  const filtered = list.filter((p) => {
    const pitchOk = activePitch === "All" ? true : getPitchLabel(p) === activePitch;
    return pitchOk;
  });
  const stickyAccessorySlugs = ["heavy-duty-flight-case", "power-distribution-box-63a"] as const;
  const stickyAccessories = stickyAccessorySlugs
    .map((slug) => ledAccessoriesCatalog.find((p) => p.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const displayCards: Array<ProductItem | LedAccessoryProduct> = [...filtered, ...stickyAccessories].filter(
    (p, idx, arr) => arr.findIndex((x) => x.slug === p.slug) === idx
  );
  const mobileDisplayRows = Array.from({ length: Math.ceil(displayCards.length / 4) }, (_, index) =>
    displayCards.slice(index * 4, index * 4 + 4)
  );

  const renderDisplayCard = (p: ProductItem | LedAccessoryProduct) => {
    if ("badge" in p) {
      const chips = (p.tags?.length ? p.tags : p.quickFeatures?.length ? p.quickFeatures : [p.badge]).slice(0, 3);
      const bullets = (p.quickFeatures?.length ? p.quickFeatures : p.tags?.length ? p.tags : [p.subtitle]).slice(0, 4);

      return (
        <ProductGridCard
          key={p.slug}
          href={`/led-display/accessories/led-accessories/${p.slug}/`}
          title={p.title}
          image={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          }
          imageContainerClassName="bg-slate-100"
          borderColor={`${BRAND.maroon}12`}
          topLeftBadge={{ text: p.badge, tone: "light" }}
          topRightBadge={{ text: "Accessories", tone: "dark" }}
          metaLines={p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
          bullets={bullets}
          chips={chips}
          accentColor={BRAND.maroon}
          contactHref="/contact"
          compactMobile
          viewDetailsLabel="View details ->"
        />
      );
    }

    const pitchDisplay = getPitchDisplay(p);
    const category = inferRentalCategory(p);

    return (
      <ProductGridCard
        key={p.slug}
        href={`/led-display/rental-display/${p.slug}/`}
        title={p.title}
        image={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        }
        imageContainerClassName="bg-slate-100"
        borderColor={`${BRAND.maroon}12`}
        topLeftBadge={{ text: "Rental", tone: "light" }}
        topRightBadge={{ text: category, tone: "dark" }}
        metaLines={[
          { text: `Pixel pitch: ${pitchDisplay}` },
          ...(p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []),
        ]}
        bullets={p.quickFeatures.slice(0, 4)}
        chips={p.bestFor.slice(0, 3)}
        accentColor={BRAND.maroon}
        contactHref="/contact"
        compactMobile
        viewDetailsLabel="View details ->"
      />
    );
  };

  return (
    <div className="rental-led-page mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6" data-rental-led-route-kind="hub">
      <RentalLedHero />

      <section
        className="mt-5 rounded-[24px] border bg-white p-4 shadow-sm md:mt-6 md:rounded-3xl md:p-6"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        {/* PRODUCT GRID (boxed like /led-display/) */}
        <div className="[&>section:first-child]:mt-0">

      {/* Filters (Indoor-style) */}
      <section className="mt-8 bg-transparent p-0">
        <h2 className="hidden text-xl font-bold text-slate-900 md:block">Filter Rental LED Display Options</h2>
        <p className="mt-2 hidden text-sm text-slate-600 leading-7 md:block">
 Quick navigation by pixel pitch and event type. (Visual filtering links only-no price/stock shown.)
        </p>

        <div className="mt-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">Pixel Pitch</div>
            <div className="mt-2 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {pitches.map((p) => (
                <Link
                  key={p}
                  href={buildHref(p)}
                  className={`group relative isolate inline-flex min-h-9 shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border px-3.5 text-[11px] font-bold leading-none tracking-tight transition-all duration-300 ${
                    activePitch === p
                      ? "border-[rgba(255,106,0,0.65)] text-white shadow-[0_8px_18px_rgba(255,106,0,0.22)]"
                      : "border-cyan-100/70 bg-[rgba(103,232,249,0.10)] text-slate-700 shadow-none hover:border-orange-200 hover:text-slate-900"
                  }`}
                  style={
                    activePitch === p
                      ? { background: "linear-gradient(135deg, rgba(228,87,0,0.98), rgba(255,106,0,0.98))" }
                      : undefined
                  }
                >
                  {activePitch === p ? (
                    <span
                      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                      style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.26), rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.22))" }}
                    />
                  ) : null}
                  {activePitch !== p ? (
                    <span
                      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "linear-gradient(120deg, rgba(14,165,233,0.15), rgba(37,99,235,0.20), rgba(255,106,0,0.14))" }}
                    />
                  ) : null}
                  {p}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid (same products, same cards) */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Rental LED Display Models and Features</h2>
        <p className="mt-2 hidden text-slate-600 leading-7 md:block">
          Choose a model based on viewing distance, camera needs, and event setup method. Open any model to see detailed
          specs and setup notes.
        </p>

        <div className="space-y-4 md:mt-6 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3">
          {mobileDisplayRows.map((row, index) => (
            <ResponsiveProductCarousel
              key={`mobile-row-${index}`}
              className={index === 0 ? "mt-6 md:mt-0" : "mt-4 md:mt-0"}
              desktopContents
            >
              {row.map((p) => renderDisplayCard(p))}
            </ResponsiveProductCarousel>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-white p-6 text-sm text-slate-700">
            No models found for this filter. Try selecting <b>All</b>.
          </div>
        )}
      </section>
        </div>
      </section>

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
