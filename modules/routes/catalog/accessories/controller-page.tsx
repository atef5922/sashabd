import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileIntroText from "@/components/common/MobileIntroText";

import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { controllerCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import FaqAccordion from "@/components/common/FaqAccordion";

export const metadata: Metadata = {
  title: "LED Controller / Video Processor | Sasha Corporation",
  description:
    "Browse LED display controllers & video processors for indoor, outdoor and rental LED screens in Bangladesh. Click any model to view specs and request support.",
  alternates: { canonical: "/led-display/accessories/controller/" },
  openGraph: {
    title: "LED Controller / Video Processor",
 description: "Controllers & video processors for LED screens-view features, specs and request a recommendation.",
    url: "/led-display/accessories/controller",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/controller/Huidu-HD-VP620-LED-Video-Processor.webp"),
        width: 1200,
        height: 630,
        alt: "LED Controller / Video Processor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Controller / Video Processor",
    description: "Controllers and video processors for LED screens. View features, specs and request a recommendation.",
    images: [socialImageUrl("/images/controller/Huidu-HD-VP620-LED-Video-Processor.webp")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const faqs = [
  {
    q: "What is the difference between an LED controller and a video processor?",
    a: "A controller manages sending data to cabinets, while a video processor focuses on input handling, scaling, switching, and clean output. Many modern models combine controller + processor features depending on the project scope.",
  },
  {
    q: "How do I choose a controller for my screen size?",
    a: "Selection depends on total pixels (screen resolution), number of ports, input requirements (HDMI/DVI/SDI), and whether you need scaling, multi-window, or live switching for events and control rooms.",
  },
  {
    q: "Do I need a processor for rental and stage LED setups?",
    a: "Often yes. Events usually need clean scaling, fast switching, and stable output for cameras. A suitable processor helps maintain smooth visuals and simplifies on-site setup.",
  },
  {
    q: "Can controllers support remote content management?",
    a: "Yes. Depending on the ecosystem, controllers can support scheduled playback, LAN/WiFi connectivity, or integration with media players for remote content updates and campaign management.",
  },
  {
    q: "Why does controller brand compatibility matter (NovaStar/Huidu/Colorlight)?",
    a: "Receiving cards and configuration software are ecosystem-specific. Keeping controller and receiving cards within the same ecosystem ensures easier mapping, stable operation, and simpler maintenance support.",
  },
  {
    q: "What details should I share for a BOQ-ready controller recommendation?",
 a: "Share screen width-height (pixels), number of cabinets, input sources (PC, camera, media player), indoor/outdoor environment, and whether you need live switching, multi-screen, or remote control.",
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

export default function ControllerProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const mobileProductRows = Array.from({ length: Math.ceil(controllerCatalog.length / 4) }, (_, index) => controllerCatalog.slice(index * 4, index * 4 + 4));
  if (mobileProductRows.length > 2 && mobileProductRows[mobileProductRows.length - 1]?.length === 1) {
    const lastRow = mobileProductRows.pop();
    if (lastRow) mobileProductRows[mobileProductRows.length - 1] = [...mobileProductRows[mobileProductRows.length - 1], ...lastRow];
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/controller/", label: "Controller", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      {/* Header */}
      <section className="mobile-page-intro-card rounded-none bg-transparent p-0 md:rounded-3xl md:bg-white md:p-10">
        <div className="mt-5 flex flex-col gap-4">
          <div className="max-w-3xl">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              Controller / Video Processor Models
            </div>

            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              LED Controller / Video Processor
            </h1>
          </div>

          <MobileIntroText
            teaser="An LED controller or video processor manages signal input, scaling and stable screen output for display projects."
            expandedClassName="mt-1"
            desktopClassName="mt-1"
          >
            <p className="w-full text-slate-600 leading-7 text-justify">
              A controller or video processor is one of the most important core components in an LED display system, because it manages how video,
              image, and presentation content is received, processed, and shown on the screen. It takes input signals from devices such as laptops,
              media players, cameras, PCs, or other AV sources, then converts and distributes that signal in a format the LED display can read
              correctly. This process includes tasks such as signal handling, resolution adjustment, scaling, mapping, screen loading, and stable
              content output so that the final image appears clear, synchronized, and visually smooth. The right controller or processor also affects
              ease of setup, input flexibility, display performance, and long-term reliability, especially in projects like digital signage, stage
              screens, advertising boards, and video walls. Different models may offer different input ports, processing capacity, control functions,
              and system compatibility, so selecting the correct one is essential for stable operation and better overall LED display performance.
            </p>
          </MobileIntroText>

          <div className="mt-1 hidden flex-wrap gap-2 text-xs font-semibold text-slate-700 md:flex">
            {["Input handling and scaling", "Stable output", "Mapping friendly", "Setup and after-sales support"].map((t) => (
              <span key={t} className="rounded-full border bg-slate-50 px-4 py-2" style={{ borderColor: `${BRAND.maroon}14` }}>
                {t}
              </span>
            ))}
          </div>

          <div className="mobile-intro-actions mt-4 flex flex-nowrap gap-2.5 md:flex-wrap md:gap-3">
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
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Controller / Processor Models</h2>
        <p className="mt-2 hidden text-slate-600 leading-7 md:block">
          Choose a model based on your project type (signage, event, or video wall) and total pixel requirement.
        </p>

        <div className="md:hidden">
          {mobileProductRows.map((row, index) => (
            <ResponsiveProductCarousel key={`mobile-row-${index}`} className={index === 0 ? "mt-6" : "mt-4"}>
              {row.map((p) => (
                <ProductGridCard
                  key={p.slug}
                  href={`/led-display/accessories/controller/${p.slug}/`}
                  title={p.title}
                  image={<Image src={p.image} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-center transition duration-300 group-hover:scale-[1.03]" />}
                  imageContainerClassName="bg-slate-100"
                  borderColor={`${BRAND.maroon}12`}
                  topLeftBadge={{ text: p.badge, tone: "light" }}
                  topRightBadge={{ text: "Controller", tone: "dark" }}
                  metaLines={p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
                  bullets={p.quickFeatures.slice(0, 4)}
                  chips={p.bestFor.slice(0, 3)}
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
            {controllerCatalog.map((p) => (
              <ProductGridCard
                key={p.slug}
                href={`/led-display/accessories/controller/${p.slug}/`}
                title={p.title}
                image={<Image src={p.image} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-center transition duration-300 group-hover:scale-[1.03]" />}
                imageContainerClassName="bg-slate-100"
                borderColor={`${BRAND.maroon}12`}
                topLeftBadge={{ text: p.badge, tone: "light" }}
                topRightBadge={{ text: "Controller", tone: "dark" }}
                metaLines={p.cardPrice ? [{ text: p.cardPrice, className: "mt-1 text-sm font-semibold text-sky-700" }] : []}
                bullets={p.quickFeatures.slice(0, 4)}
                chips={p.bestFor.slice(0, 3)}
                accentColor={BRAND.maroon}
                contactHref="/contact"
                compactMobile
                viewDetailsLabel="View details ->"
              />
            ))}
          </ResponsiveProductCarousel>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-2 text-slate-600 leading-7">
              Quick answers about LED controller selection, processor planning and compatibility for Bangladesh projects.
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
