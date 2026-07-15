import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { ledAccessoriesCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";

export const metadata: Metadata = {
  title: "LED Accessories (Cables & Parts) | Sasha Corporation",
  description:
    "Browse LED accessories in Bangladesh: cables, IDC/FRC connectors, module fixing items, mounting hardware, flight cases, and event power distribution boxes. Request quotation support.",
  alternates: { canonical: "/led-display/accessories/led-accessories/" },
  openGraph: {
    title: "LED Accessories (Cables & Parts)",
    description:
      "LED accessories for installation, maintenance, and event workflow—cables, connectors, fixing, mounting, and power distribution support.",
    url: "/led-display/accessories/led-accessories/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/placeholders/led-accessory.svg"),
        width: 1200,
        height: 630,
        alt: "LED Accessories (Cables & Parts)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Accessories (Cables & Parts)",
    description:
      "LED accessories for installation and maintenance in Bangladesh—cables, connectors, fixing, mounting and event distribution items.",
    images: [socialImageUrl("/images/placeholders/led-accessory.svg")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const faqs = [
  {
    q: "Which LED accessories are most important for installation?",
    a: "Common essentials include data/ribbon cables, compatible IDC/FRC connectors, power connectors, mounting hardware, and proper cable management items. The correct selection depends on your cabinet and module type.",
  },
  {
    q: "How do I choose the correct ribbon cable and connector type?",
    a: "Match the connector type (HUB/IDC/FRC), pin count, and orientation with your receiving card and HUB board. Using mismatched cables can cause missing lines, wrong mapping, or unstable output.",
  },
  {
    q: "Do accessories affect LED screen reliability?",
    a: "Yes. Quality connectors, proper power cables, and correct mounting hardware reduce loose connection risks, simplify maintenance, and support stable long-hour operation.",
  },
  {
    q: "When do I need a flight case for LED equipment?",
    a: "Flight cases are recommended for rental/event workflow and transport-heavy operations. They protect panels and accessories from impact, dust, and handling damage during logistics.",
  },
  {
    q: "Why use a power distribution box for event LED setups?",
    a: "Power distribution boxes help manage load safely across circuits, reduce wiring mess, and support faster setup. They are important for professional stage workflows with multiple LED panels and AV equipment.",
  },
  {
    q: "What details help you confirm the right accessory quickly?",
    a: "Share cabinet and module photos, HUB interface type, controller ecosystem, and your use case (fixed installation vs rental) to confirm compatibility and recommend the correct parts.",
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

export default function LedAccessoriesListingPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories" },
          { href: "/led-display/accessories/led-accessories/", label: "LED Accessories", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      <section className="rounded-3xl bg-white p-7 md:p-10">
        <div className="flex flex-col gap-4">
          <div className="max-w-3xl">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              LED Accessories
            </div>

            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              LED Accessories (Cables & Parts) in Bangladesh
            </h1>
          </div>

          <p className="mt-1 w-full text-slate-600 leading-7 text-justify">
            These are practical LED accessories used during installation, servicing, and event operations—ribbon/data
            cables, IDC connectors, module fixing hardware, mounting parts, transport protection, and temporary power
            distribution. The right accessory choice reduces downtime, makes maintenance easier, and helps keep your LED
            system stable in real-world conditions.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation &rarr;
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp Now
            </a>
            <Link
              href="/led-display/accessories/"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              Back to Accessories
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">LED Accessories List</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Click any item to view specs, selection notes, and usage guidance.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ledAccessoriesCatalog.map((p) => (
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
              bullets={(p.quickFeatures?.length ? p.quickFeatures : p.tags).slice(0, 4)}
              chips={p.tags.slice(0, 3)}
              accentColor={BRAND.maroon}
              contactHref="/contact"
              viewDetailsLabel="View details →"
            />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-2 text-slate-600 leading-7">
              Quick answers about LED accessories selection, compatibility checks and installation workflow planning.
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

