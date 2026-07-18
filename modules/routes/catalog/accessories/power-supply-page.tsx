import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MobileIntroText from "@/components/common/MobileIntroText";

import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { powerSupplyCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";
import FaqAccordion from "@/components/common/FaqAccordion";

export const metadata: Metadata = {
  title: "LED Display Power Supply | Sasha Corporation",
  description:
    "Browse LED display power supply models for cabinets: 5V high-current PSU options, protections, wiring notes and selection guidance.",
  alternates: { canonical: "/led-display/accessories/power-supply/" },
  openGraph: {
    title: "LED Display Power Supply",
    description: "Browse 5V high-current LED display PSU models with practical wiring and protection guidance.",
    url: "/led-display/accessories/power-supply",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/accessories/power-supply-psu.webp"),
        width: 1200,
        height: 630,
        alt: "LED Display Power Supply",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Display Power Supply",
    description: "Browse 5V high-current LED display PSU models with practical wiring and protection guidance.",
    images: [socialImageUrl("/images/accessories/power-supply-psu.webp")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const faqs = [
  {
    q: "Which 5V power supply rating is suitable for my LED cabinet?",
    a: "It depends on module type, cabinet resolution, scan mode, and brightness setting. Proper load calculation keeps the PSU within safe operating range and helps prevent voltage drop and flicker.",
  },
  {
    q: "Why does power supply quality matter for LED display stability?",
    a: "Stable output, protection circuits, and consistent performance under load help reduce flicker, random restart, and long-term stress on modules and control components.",
  },
  {
    q: "How many power supplies are needed per cabinet?",
 a: "Cabinets often use multiple PSUs based on total current demand and wiring layout. The exact quantity depends on module current draw and the cabinet's power distribution design.",
  },
  {
    q: "Do outdoor LED projects need different PSU considerations?",
    a: "Yes. Outdoor projects need safe earthing, surge protection (SPD), correct cable glands, ventilation planning, and stable power distribution because environments are more exposed to heat, rain, and unstable power.",
  },
  {
    q: "Can a weak PSU cause brightness imbalance across modules?",
    a: "Yes. Voltage drop and uneven power distribution can cause brightness variation or unstable scanning. Proper wiring, PSU sizing, and distribution planning are important for uniform performance.",
  },
  {
    q: "What information helps you recommend a PSU model quickly?",
    a: "Share cabinet/module resolution, module type and scan rate, number of modules per cabinet, expected brightness use, and whether the project is indoor or outdoor for correct selection.",
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

export default function PowerSupplyListingPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/power-supply/", label: "Power Supply", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      {/* Header */}
      <section className="mobile-page-intro-card rounded-none bg-transparent p-0 md:rounded-3xl md:bg-white md:p-10">
        <div className="max-w-3xl">
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
            style={{ borderColor: `${BRAND.maroon}22` }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
            Power Supply Models
          </div>

          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">LED Display Power Supply</h1>
        </div>

        <MobileIntroText
          teaser="An LED display power supply delivers stable DC power for smooth performance, safety and long-term reliability."
          expandedClassName="mt-1"
          desktopClassName="mt-1"
        >
          <p className="w-full text-justify leading-7 text-slate-600">
            An LED display power supply is the component that delivers stable DC power to LED modules, receiving cards, and other cabinet
            electronics, so the screen can run smoothly without flicker, voltage drop, or unexpected shutdown. In practical use, the right power
            supply is important not only for turning the screen on, but also for maintaining brightness consistency, protecting components during
            long operating hours, and supporting reliable performance in both indoor and outdoor environments. Different models can vary by
            voltage, current capacity, build quality, cooling behavior, efficiency, and cabinet compatibility, which is why proper load planning
            matters before purchase. Choosing the correct LED power supply helps improve safety, reduce stress on the system, and ensure stable
            long-term operation for advertising displays, video walls, stage screens, and other LED installations.
          </p>
        </MobileIntroText>
      </section>

      {/* GRID */}
      <section className="mt-8">
        <ResponsiveProductCarousel desktopClassName="md:grid-cols-2 lg:grid-cols-3" mobileGapClassName="gap-6">
          {powerSupplyCatalog.map((p) => (
            <ProductGridCard
              key={p.slug}
              href={`/led-display/accessories/power-supply/${p.slug}/`}
              title={p.title}
              image={<Image src={p.image} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-center transition duration-300 group-hover:scale-[1.03]" priority={false} />}
              imageContainerClassName="bg-slate-100"
              borderColor={`${BRAND.maroon}12`}
              topLeftBadge={{ text: p.badge, tone: "light" }}
              topRightBadge={{ text: "Accessories", tone: "dark" }}
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
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-2 text-slate-600 leading-7">
              Quick answers about LED power supply sizing, wiring safety and stability planning for Bangladesh projects.
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
