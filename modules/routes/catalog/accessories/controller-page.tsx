import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import ProductGridCard from "@/components/products/ProductGridCard";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { controllerCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "LED Controller / Video Processor | Sasha Corporation",
  description:
    "Browse LED display controllers & video processors for indoor, outdoor and rental LED screens in Bangladesh. Click any model to view specs and request support.",
  alternates: { canonical: "/led-display/accessories/controller/" },
  openGraph: {
    title: "LED Controller / Video Processor",
    description: "Controllers & video processors for LED screens—view features, specs and request a recommendation.",
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

export default function ControllerProductsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

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
      <section className="rounded-3xl bg-white p-7 md:p-10">
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

          <p className="mt-1 w-full text-slate-600 leading-7 text-justify">
            A controller or video processor is one of the most important core components in an LED display system, because it manages how video,
            image, and presentation content is received, processed, and shown on the screen. It takes input signals from devices such as laptops,
            media players, cameras, PCs, or other AV sources, then converts and distributes that signal in a format the LED display can read
            correctly. This process includes tasks such as signal handling, resolution adjustment, scaling, mapping, screen loading, and stable
            content output so that the final image appears clear, synchronized, and visually smooth. The right controller or processor also affects
            ease of setup, input flexibility, display performance, and long-term reliability, especially in projects like digital signage, stage
            screens, advertising boards, and video walls. Different models may offer different input ports, processing capacity, control functions,
            and system compatibility, so selecting the correct one is essential for stable operation and better overall LED display performance.
          </p>

          <div className="mt-1 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            {["✓ Input handling & scaling", "✓ Stable output", "✓ Mapping friendly", "✓ Setup & after-sales support"].map((t) => (
              <span key={t} className="rounded-full border bg-slate-50 px-4 py-2" style={{ borderColor: `${BRAND.maroon}14` }}>
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation →
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Controller / Processor Models</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Choose a model based on your project type (signage, event, or video wall) and total pixel requirement.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              viewDetailsLabel="View details →"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

