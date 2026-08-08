import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { ledAccessoriesCatalog, rentalCatalog, type LedAccessoryProduct, type ProductItem } from "@/lib/productsCatalog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
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
      >
        <p className="text-slate-600 leading-7">{subtitle}</p>
      </MobileIntroText>
    ) : null}
    <div className="mt-5">{children}</div>
  </section>
);

const CardGrid = ({ items }: { items: { t: string; d: string; bullets?: string[] }[] }) => (
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
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-extrabold tracking-tight text-slate-900 lg:text-[16px]">
            {x.t}
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
    <div className="rental-led-page mx-auto w-full max-w-7xl px-3 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/rental-display/", label: "Rental LED Display", current: true },
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
            Rental LED Display in Bangladesh
          </h1>

        <MobileIntroText
          teaser="Rental LED displays are designed for quick setup, repeat use and reliable event performance across Bangladesh."
          expandedClassName="mt-3"
          desktopClassName="mt-3"
        >
          <p className="w-full text-justify text-slate-600 leading-7">
            <strong>Rental LED displays</strong> are built for quick setup, repeat use, and reliable live-event performance across Bangladesh.
            If you are searching for <strong>rental LED display</strong> in Bangladesh, <strong>stage LED screen rental</strong>, <strong>wedding LED wall</strong>, <strong>concert backdrop LED panel</strong>{" "}
            or <strong>corporate event LED display</strong> service, choosing the right cabinet system makes the biggest difference in show quality
            and setup speed. A proper rental workflow includes quick-lock cabinets, stable controller and processor configuration, clean
            power planning, safe rigging, and on-site technical support so your visuals stay smooth from opening to closing. From indoor
            stage programs to semi-outdoor event venues, a well-planned <strong>rental LED screen</strong> setup helps reduce downtime, supports fast
            install/dismantle, and keeps your event communication clear, bright, and professional.
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
            rel="noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
          >
            WhatsApp
          </a>
        </div>

          <div className="mt-4 hidden flex-wrap gap-2 text-xs font-semibold text-slate-700 md:flex">
            {["Quick lock cabinets", "Fast setup and dismantle", "Hanging or stacking", "Operator guidance"].map(
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
          <Link href="/led-display/rent-guide/" className="underline underline-offset-4 hover:text-slate-900">
            Rental price guide
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

        <div className="md:hidden">
          {mobileDisplayRows.map((row, index) => (
            <ResponsiveProductCarousel key={`mobile-row-${index}`} className={index === 0 ? "mt-6" : "mt-4"}>
              {row.map((p) => renderDisplayCard(p))}
            </ResponsiveProductCarousel>
          ))}
        </div>

        <div className="hidden md:block">
          <ResponsiveProductCarousel className="mt-6" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {displayCards.map((p) => renderDisplayCard(p))}
          </ResponsiveProductCarousel>
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
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
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
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
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
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
            { t: "Concert", d: "High-energy stage visuals and live performance content display." },
            { t: "Wedding", d: "Ceremony highlights, couple visuals, and reception-stage presentation." },
            { t: "Political Event", d: "Campaign messaging, live speeches, and crowd-facing communication." },
            { t: "Corporate Event", d: "Keynote decks, brand content, and professional event presentation." },
            { t: "Trade Show", d: "Booth branding, rotating promotions, and attention-grabbing display zones." },
            { t: "Product Launch", d: "Hero product reveal visuals with synchronized media playback." },
            { t: "Live Streaming Event", d: "Broadcast-support display for live feed and audience engagement." },
            { t: "Stage Backdrop", d: "Seamless background wall for shows, seminars, and live programs." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <h3 className="text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            { t: "Contact us", d: "Reach out with your event date, location, and basic LED screen requirement." },
            { t: "Share event details", d: "Provide stage layout, audience distance, content type, and timing plan." },
            { t: "Choose screen size", d: "Finalize suitable LED size and setup format based on venue and visibility needs." },
            { t: "Installation by our engineers", d: "Our team handles safe setup, alignment, cabling, and system configuration." },
            { t: "Event support & operation", d: "On-site technical support ensures stable playback and smooth show execution." },
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

        <div className="hidden gap-4 sm:grid-cols-2 lg:grid-cols-5 md:grid">
          {[
            { t: "Contact us", d: "Reach out with your event date, location, and basic LED screen requirement." },
            { t: "Share event details", d: "Provide stage layout, audience distance, content type, and timing plan." },
            { t: "Choose screen size", d: "Finalize suitable LED size and setup format based on venue and visibility needs." },
            { t: "Installation by our engineers", d: "Our team handles safe setup, alignment, cabling, and system configuration." },
            { t: "Event support & operation", d: "On-site technical support ensures stable playback and smooth show execution." },
          ].map((x, idx) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-5" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: BRAND.maroon }}>
                Step {idx + 1}
              </div>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{x.d}</p>
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
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
              className="w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4"
              style={{
                borderColor: index % 2 === 0 ? "rgba(103,232,249,0.6)" : "rgba(255,214,170,0.8)",
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)"
                    : "linear-gradient(180deg, rgba(255,250,245,1) 0%, rgba(255,242,233,1) 100%)",
              }}
            >
              <div className="text-[16px] font-extrabold text-slate-900">{b.t}</div>
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

          <div className="mt-6 grid grid-cols-2 gap-3 md:flex md:flex-wrap">
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
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

        <div className="hidden gap-4 md:grid md:grid-cols-2">
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
          ].map((b) => (
            <div key={b.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="text-base font-extrabold text-slate-900">{b.t}</div>
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
        <div className="-mx-0.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {[
            { t: "Indoor LED Displays", d: "Showroom, conference, control room solutions.", href: "/led-display/indoor-led/" },
            { t: "Outdoor LED Displays", d: "Billboards, rooftop signage, public screens.", href: "/led-display/outdoor/" },
            { t: "Rental LED Displays", d: "Stage events, concerts, quick setup cabinets.", href: "/led-display/rental-display/" },
          ].map((x, index) => (
            <Link
              key={x.t}
              href={x.href}
              className="group w-[89%] shrink-0 snap-start rounded-[14px] border px-4 py-4 transition"
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
              <div className="mt-4 text-[12px] font-bold" style={{ color: BRAND.maroon }}>
                Explore -&gt;
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
              <div className="mt-4 text-sm font-bold" style={{ color: BRAND.maroon }}>
                Explore -&gt;{" "}
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

