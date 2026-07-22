import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { receivingCardCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileIntroText from "@/components/common/MobileIntroText";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";

export const metadata: Metadata = {
  title: "LED Display Receiving Card | Sasha Corporation",
  description:
    "Browse LED display receiving cards for cabinets: HUB interfaces, mapping, scan compatibility and installation notes. Request a recommendation for your project.",
  alternates: { canonical: "/led-display/accessories/receiving-card/" },
  openGraph: {
    title: "LED Display Receiving Card",
    description: "Receiving cards for LED display cabinets: compatibility, mapping guidance and support.",
    url: "/led-display/accessories/receiving-card/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/accessories/receiving-card-user.webp"),
        width: 1200,
        height: 630,
        alt: "LED Display Receiving Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Display Receiving Card",
    description: "Receiving cards for LED display cabinets: compatibility, mapping guidance and support.",
    images: [socialImageUrl("/images/accessories/receiving-card-user.webp")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const faqs = [
  {
    q: "How do I choose the right receiving card for my LED cabinet?",
    a: "Match the receiving card with your controller ecosystem (NovaStar/Huidu/Colorlight), HUB connector type, scan mode, cabinet resolution, and module wiring. Sharing cabinet photos and module details helps ensure correct compatibility.",
  },
  {
    q: "What is HUB75 and why does it matter?",
    a: "HUB75 is a common LED module interface standard. Your receiving card, HUB board, and ribbon cable must match the module interface to avoid mapping issues, missing rows, or unstable output.",
  },
  {
    q: "Can a receiving card cause flicker or horizontal line issues?",
    a: "Yes. Flicker or lines can come from wrong mapping, incompatible scan settings, unstable power, loose ribbon cables, or a receiving card that does not match the module drive requirement. Proper configuration and cabling checks are essential.",
  },
  {
    q: "Do I need to change the receiving card when upgrading modules?",
    a: "Sometimes. If the new module uses different scan mode, pinout, or loading capacity, you may need a compatible receiving card and matching HUB board to keep the cabinet stable and service-friendly.",
  },
  {
    q: "Do you support remote mapping and commissioning guidance?",
    a: "Yes. We can guide mapping, configuration, and troubleshooting based on controller model, cabinet layout, and photos/videos from the site to speed up commissioning.",
  },
  {
    q: "What information should I send for a correct receiving card recommendation?",
 a: "Send module front/back photos, HUB connector close-up, pixel pitch and scan rate, cabinet resolution (W x H), and your controller brand/model to confirm compatibility quickly.",
  },
] as const;
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ReceivingCardListingPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const mobileProductRows = Array.from({ length: Math.ceil(receivingCardCatalog.length / 4) }, (_, index) =>
    receivingCardCatalog.slice(index * 4, index * 4 + 4)
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/receiving-card/", label: "Receiving Card", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      {/* Header (Outdoor-style) */}
      <section className="mobile-page-intro-card rounded-none bg-transparent p-0 md:rounded-3xl md:bg-white md:p-10">
        <div className="flex flex-col gap-4">
          {/* indoor-style: title block constrained, description full width */}
          <div className="max-w-3xl">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              Receiving Card Models
            </div>

            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              LED Display Receiving Card
            </h1>
          </div>

          {/* Full-width description (margin-to-margin) */}
          <MobileIntroText
            teaser="A receiving card distributes signal data correctly to LED modules for stable mapping and clean screen output."
            expandedClassName="mt-1"
            desktopClassName="mt-1"
          >
            <p className="w-full text-slate-600 leading-7 text-justify">
              A receiving card is one of the most important control components inside an LED display cabinet, because it
              takes signal data from the sender or video processor and distributes that data accurately to the LED
              modules, driver ICs, and scanning lines. In simple terms, it helps the screen show the right content in
              the right position, with proper mapping, brightness behavior, and stable image output. Different receiving
              card models can vary in HUB port type, loading capacity, supported scan modes, grayscale performance,
              refresh-related capability, and compatibility with specific cabinet or module configurations. That is why
              choosing the correct receiving card is essential for smooth display performance, clean visuals, easier
              configuration, and long-term system reliability.
            </p>
          </MobileIntroText>

          <div className="mt-1 hidden flex-wrap gap-2 text-xs font-semibold text-slate-700 md:flex">
            {["HUB compatibility check", "Scan and mapping guidance", "Installation support", "After-sales service"].map(
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

          {/* CTA buttons under hero (horizontal line) */}
          <div className="mobile-intro-actions mt-4 grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-9 items-center justify-center rounded-md px-2 py-2 text-center text-[9.5px] font-extrabold leading-[1.1] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-emerald-600 px-2 py-2 text-center text-[9.5px] font-extrabold leading-[1.1] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md md:rounded-xl md:px-5 md:py-3 md:text-sm"
            >
              WhatsApp
            </a>
            <Link
              href="/led-display/accessories/"
              className="inline-flex min-h-9 items-center justify-center rounded-md border bg-white px-2 py-2 text-center text-[9.5px] font-extrabold leading-[1.1] text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 md:rounded-xl md:px-5 md:py-3 md:text-sm"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to Accessories
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Receiving Card Models & Key Features</h2>
        <p className="mt-2 hidden text-slate-600 leading-7 md:block">
 It's best to choose a model based on your cabinet/module. Open any model to check HUB/scan/mapping guidance,
          then contact us for quotation or setup assistance.
        </p>

        <div className="md:hidden">
          {mobileProductRows.map((row, index) => (
            <ResponsiveProductCarousel key={`mobile-row-${index}`} className={index === 0 ? "mt-6" : "mt-4"}>
              {row.map((p) => (
                <ProductGridCard
                  key={p.slug}
                  href={`/led-display/accessories/receiving-card/${p.slug}/`}
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
                  bullets={p.quickFeatures.slice(0, 4)}
                  chips={p.quickFeatures.slice(0, 3)}
                  accentColor={BRAND.maroon}
                  contactHref="/contact"
                  compactMobile
                  viewDetailsLabel="View details ->"
                />
              ))}
            </ResponsiveProductCarousel>
          ))}
        </div>

        <div className="hidden md:block">
          <ResponsiveProductCarousel className="mt-6" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {receivingCardCatalog.map((p) => (
              <ProductGridCard
                key={p.slug}
                href={`/led-display/accessories/receiving-card/${p.slug}/`}
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
                bullets={p.quickFeatures.slice(0, 4)}
                chips={p.quickFeatures.slice(0, 3)}
                accentColor={BRAND.maroon}
                contactHref="/contact"
                compactMobile
                viewDetailsLabel="View details ->"
              />
            ))}
          </ResponsiveProductCarousel>
        </div>
      </section>

      {/* Quick helper block */}
      <section className="mt-8 md:hidden">
        <div
          className="rounded-[20px] border p-4"
          style={{
            borderColor: "rgba(103,232,249,0.6)",
            background: "linear-gradient(180deg, rgba(248,251,255,1) 0%, rgba(239,246,255,1) 100%)",
          }}
        >
          <h2 className="text-[22px] font-extrabold leading-tight text-slate-900">Need help selecting the right receiving card?</h2>
          <p className="mt-2 text-[13px] leading-6 text-slate-700 text-justify">
            For faster and more accurate matching, send these details on WhatsApp and we will suggest the correct compatible option.
          </p>

          <div className="mt-4 rounded-[16px] border border-white/80 bg-white/80 p-4">
            <ul className="space-y-3 text-[12.5px] text-slate-700">
              {[
                "Module photo (front/back) + HUB connector close-up",
                "Pixel pitch (P2.5/P4/P5 etc) + scan rate (1/16, 1/32...)",
                "Cabinet resolution (W x H pixels) + controller brand/model",
              ].map((t, i) => (
                <li key={`${i}-${t}`} className="flex items-start gap-2.5">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-6 text-justify">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              WhatsApp Now
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request Quotation
            </Link>
          </div>
        </div>
      </section>

      <section
        className="mt-8 hidden rounded-3xl border bg-slate-50 p-6 md:block md:p-10"
        style={{ borderColor: `${BRAND.maroon}10` }}
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span className="text-xl"></span>
          Need help selecting the right receiving card?
        </h2>

        <p className="mt-2 text-slate-600 leading-7">
          For faster and more accurate matching, send the following information on WhatsApp:
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {[
            "Module photo (front/back) + HUB connector close-up",
            "Pixel pitch (P2.5/P4/P5 etc) + scan rate (1/16, 1/32...)",
            "Cabinet resolution (W x H pixels) + controller brand/model",
          ].map((t, i) => (
            <li key={`${i}-${t}`} className="flex items-start gap-2">
              <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              <span className="leading-7">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            WhatsApp Now
          </a>
          <Link
            href="/contact"
            className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Request Quotation -&gt;
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-2 text-slate-600 leading-7">
              Quick answers about receiving card compatibility, HUB interface planning and cabinet mapping support.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <FaqAccordion accent={BRAND.maroon} density="compact" items={faqs} columns={2} />
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>
    </div>
  );
}








