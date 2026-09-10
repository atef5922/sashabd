import Link from "next/link";
import { responsiveImageProps } from "@/lib/responsive-image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import { homeBreadcrumb } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: {
    absolute: "LED Display Accessories in Bangladesh | Controller & PSU",
  },
  description:
    "Browse LED display accessories in Bangladesh including controllers, receiving cards and power supplies with quotation support.",
  alternates: { canonical: "https://sashabd.com/led-display/accessories/" },
  openGraph: {
    title: "LED Display Accessories Bangladesh | Controller & PSU",
    description:
      "Browse LED display accessories in Bangladesh including controllers, receiving cards and power supplies with quotation support.",
    url: "https://sashabd.com/led-display/accessories/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/assets/led-display/accessories/controller-video.webp"),
        width: 1200,
        height: 630,
        alt: "LED Display Accessories Bangladesh | Controller & PSU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Display Accessories Bangladesh | Controller & PSU",
    description:
      "Browse LED display accessories in Bangladesh including controllers, receiving cards and power supplies with quotation support.",
    images: [socialImageUrl("/assets/led-display/accessories/controller-video.webp")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

const accessories = [
  {
    slug: "receiving-card",
    title: "Receiving Card",
    subtitle: "Novastar / Colorlight compatible receiving cards (HUB mapping & scan support).",
    href: "/led-display/accessories/receiving-card/",
    image: "/assets/led-display/accessories/receiving-card-user.webp",
    tags: ["HUB75/HUB75E", "Scan support", "Stable mapping"],
  },
  {
    slug: "controller",
    title: "Controller / Video Processor",
    subtitle: "Huidu / Novastar / Colorlight - scaling, switching, mapping & smooth playback.",
    href: "/led-display/accessories/controller/",
    image: "/assets/led-display/accessories/controller-video.webp", // you can change
    tags: ["HDMI/DVI input", "Scaling", "Seamless switching"],
  },
  {
    slug: "power-supply",
    title: "Power Supply (PSU)",
    subtitle: "Stable 5V power for LED modules - selection & safety notes.",
    href: "/led-display/accessories/power-supply/",
    image: "/assets/led-display/accessories/power-supply-psu.webp", // you can change
    tags: ["5V DC", "Protection", "Low ripple"],
  },
  {
    slug: "led-accessories",
    title: "LED Accessories (Cables & Parts)",
    subtitle: "Cables, IDC/FRC connectors, fixing items, mounting parts, and event distribution accessories.",
    href: "/led-display/accessories/led-accessories/",
    image: "/assets/led-display/accessories/led-accessories-common.webp",
    tags: ["Cables & connectors", "Mounting & fixing", "Event power & logistics"],
  },
];

export default function AccessoriesPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/led-display/", label: "LED Display" },
          { href: "/led-display/accessories/", label: "Accessories", current: true },
        ]}
        className="mb-4 pt-3 text-sm text-slate-600"
      />
      {/* Header (Receiving-card style) */}
      <section className="mobile-page-intro-card rounded-none bg-transparent p-0 md:rounded-3xl md:bg-white md:p-10">
        <div className="flex flex-col gap-4">
          {/* Title block constrained like receiving card */}
          <div className="max-w-3xl">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              LED Display Accessories
            </div>

            {/* Smaller header like receiving card / indoor style */}
            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              LED Display Accessories in Bangladesh
            </h1>
          </div>

          {/* Full-width paragraph (margin-to-margin like receiving card) */}
          <p className="mt-1 w-full text-slate-600 leading-7 text-justify">
            Receiving cards, controllers/video processors, and power supplies are the three core accessories that keep
            an LED display system running accurately, smoothly, and safely in real-world use. The receiving card
            handles module data and proper pixel mapping inside the cabinet, the controller or video processor manages
            signal input, scaling, and content output, and the power supply delivers stable DC power to the modules and
            control hardware. Choosing the right combination is important for screen stability, brightness consistency,
            clean playback, and long-term reliability in both indoor and outdoor installations. Select a category below
            to explore model details, practical guidance, and recommended setup information.
          </p>

          <div className="mt-1 hidden flex-wrap gap-2 text-xs font-semibold text-slate-700 md:flex">
            {["Selection help", "BOQ guidance", "Installation support", "After-sales"].map((t) => (
              <span
                key={t}
                className="rounded-full border bg-slate-50 px-4 py-2"
                style={{ borderColor: `${BRAND.maroon}14` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA buttons moved under hero (horizontal line) */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact/"
              className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
            >
              Request a Quotation -&gt;
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
        <h2 className="text-2xl font-bold text-slate-900">Browse Accessories</h2>
        <p className="mt-2 hidden text-slate-600 leading-7 md:block">
          Click any category to see details, selection notes and recommended setup.
        </p>

        <ResponsiveProductCarousel className="mt-6" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
          {accessories.map((p) => (
            <ProductGridCard
              key={p.slug}
              href={p.href}
              title={p.title}
              image={
                // eslint-disable-next-line @next/next/no-img-element
<img
                  {...responsiveImageProps(p.image)}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              }
              imageContainerClassName="bg-slate-100"
              borderColor={`${BRAND.maroon}12`}
              topLeftBadge={{ text: "Accessories", tone: "light" }}
              topRightBadge={{ text: "Category", tone: "dark" }}
              bullets={p.tags.slice(0, 4)}
              chips={p.tags.slice(0, 3)}
              accentColor={BRAND.maroon}
              contactHref="/contact"
              compactMobile
              viewDetailsLabel="View details ->"
            />
          ))}
        </ResponsiveProductCarousel>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">Popular Controller Models</h2>
        <p className="mt-2 text-slate-600 leading-7">
          These are commonly selected video processors for LED walls and event setups. Use them as a quick starting point.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/led-display/accessories/controller/huidu-vp210h/",
              title: "Huidu HD-VP210H (3-in-1)",
              desc: "Sender + scaler + switcher for fixed displays and stage backdrops.",
            },
            {
              href: "/led-display/accessories/controller/huidu-vp620/",
              title: "Huidu HD VP620",
              desc: "Professional multi-input processor for medium to large screens.",
            },
            {
              href: "/led-display/accessories/controller/huidu-vp820/",
              title: "Huidu HD VP820",
              desc: "High-end processor for very large LED walls with more output ports.",
            },
          ].map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="group rounded-3xl border bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.desc}</p>
              <div className="mt-4 text-sm font-bold" style={{ color: BRAND.maroon }}>
                View details -&gt;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content sections (no layout/style changes to existing blocks) */}
      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-800" aria-hidden="true">
            <path
              d="M7 6.5h10M8 10h8M9 13.5h6M6 3.5h12a2 2 0 0 1 2 2V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19V5.5a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>What Are LED Display Accessories?</span>
        </h2>
        <p className="mt-3 text-slate-600 leading-7 text-justify">
          LED display accessories are the control and power parts that make a screen work reliably, not just extra items.
          A typical LED wall has three essential building blocks: (1) a <b>controller / video processor</b> to accept and
          manage input signals, (2) a <b>receiving card</b> to distribute mapped data to each cabinet, and (3) a stable
          <b> power supply</b> to deliver clean DC power to modules and control hardware. When these accessories match the
 screen&apos;s resolution and cabinet wiring, you get stable brightness, smooth motion, accurate mapping, and fewer
          downtime issues.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Controller / Processor",
              d: "Handles input, scaling, switching, and output configuration for your LED screen.",
            },
            {
              t: "Receiving Card",
              d: "Sits inside cabinets to decode data and ensure correct pixel mapping and refresh output.",
            },
            {
              t: "Power Supply (PSU)",
              d: "Provides stable DC power with protection features to keep modules and control parts safe.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="text-lg font-bold text-slate-900">{x.t}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-800" aria-hidden="true">
            <path
              d="M8 7h8M8 17h8M7 9.5v5M17 9.5v5M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Controller & Receiving Card: What They Do</span>
        </h2>
        <p className="mt-3 text-slate-600 leading-7 text-justify">
          Think of the controller as the brain at the front and the receiving card as the dispatcher inside each
          cabinet. The controller accepts signals (HDMI/DVI/DP, media player, laptop, camera switcher), scales the content
          to your target resolution, and sends the final data to the screen. The receiving card then ensures each cabinet
          shows the correct portion of the image with the correct scan type, color depth, and refresh behavior.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-lg font-bold text-slate-900">Controller / Video Processor</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {[
                "Input handling: connects your laptop, player, or live source",
                "Scaling: fits content to exact LED resolution",
                "Switching: smooth change between sources when needed",
                "Screen setup: brightness, output format, cabinet layout support",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-lg font-bold text-slate-900">Receiving Card</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {[
                "Pixel mapping: keeps rows/columns aligned across cabinets",
                "Scan support: matches the LED module scan configuration",
                "Refresh behavior: helps deliver stable visuals for camera use",
                "Maintenance-friendly: supports replacement and re-mapping workflows",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-800" aria-hidden="true">
            <path
              d="M13 2L4.5 14H11l-1 8 8.5-12H12l1-8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span>Power Supply (PSU): Why It Matters</span>
        </h2>
        <p className="mt-3 text-slate-600 leading-7 text-justify">
          A power supply is not just a &quot;5V box.&quot; It affects brightness stability, long-term reliability, and safety. LED
          modules draw high current, and poor-quality PSUs can cause voltage drop, overheating, flicker under load, or
          premature failure. A correctly sized PSU with proper protections helps your screen run cooler, stay stable, and
          reduce maintenance cost over time.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { t: "Stable Voltage", d: "Keeps color and brightness consistent across cabinets during peak load." },
            { t: "Protection", d: "Over-current, over-voltage, and short-circuit protection reduces risk." },
            { t: "Derating", d: "Running below max rating improves reliability in hot and dusty environments." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
              <div className="text-base font-extrabold text-slate-900">{x.t}</div>
              <p className="mt-2 text-sm text-slate-600 leading-7">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-800" aria-hidden="true">
            <path
              d="M9.5 11.5 11 13l3.5-4M7 3.5h10A2.5 2.5 0 0 1 19.5 6v12A2.5 2.5 0 0 1 17 20.5H7A2.5 2.5 0 0 1 4.5 18V6A2.5 2.5 0 0 1 7 3.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>How to Choose LED Display Accessories</span>
        </h2>
        <p className="mt-3 text-slate-600 leading-7 text-justify">
 The-best-accessories depend on your screen size, pixel pitch, cabinet type, and content workflow. Use this
          practical checklist to avoid common mismatches and to select accessories that support stable output and smooth
          operation in Bangladesh conditions.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-lg font-bold text-slate-900">Planning checklist</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {[
 "Confirm total resolution (W x H) and cabinet layout before choosing a controller",
                "Match receiving card model to your module scan type and HUB mapping requirements",
                "Choose a controller with the right inputs (HDMI, DVI, DP) for your source devices",
                "Plan redundancy and spare parts if the screen is mission-critical (control room, event, signage)",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border bg-slate-50 p-6" style={{ borderColor: `${BRAND.maroon}10` }}>
            <div className="text-lg font-bold text-slate-900">Power & safety checklist</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {[
                "Calculate real load (module + receiving card + fans) and keep headroom for reliability",
                "Use proper cable sizing, grounding, and distribution (MCB/DB) planning for the screen",
                "Prefer PSUs with protections and stable output under continuous operation",
 "Keep ventilation and service access in mind-heat management improves lifespan",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                  <span className="leading-7">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact/"
            className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Get Accessories Recommendation -&gt;
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
          >
            WhatsApp Now
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-800" aria-hidden="true">
            <path
              d="M9.5 9a2.5 2.5 0 1 1 3.3 2.35c-.9.32-1.3.9-1.3 1.65v.5M12 18h.01M12 3.5c4.7 0 8.5 3.58 8.5 8s-3.8 8-8.5 8-8.5-3.58-8.5-8 3.8-8 8.5-8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>FAQ</span>
        </h2>
        <p className="mt-2 text-slate-600 leading-7">
          Common questions people ask before buying LED display controllers, receiving cards, and power supplies.
        </p>
        <div className="mt-5">
          <FaqAccordion
            accent={BRAND.maroon}
            items={[
              {
                q: "Do I need a controller for every LED display?",
                a: "Yes for most setups. A controller or video processor is typically required to accept input signals, scale content to your screen resolution, and output the correct data format for the LED system.",
              },
              {
                q: "What is the difference between a controller and a receiving card?",
                a: "The controller manages inputs and screen configuration at the system level. The receiving card sits inside the cabinet and distributes mapped pixel data to the modules so each cabinet shows the correct part of the image.",
              },
              {
                q: "How do I know which receiving card is compatible?",
                a: "Compatibility depends on your LED module scan type, HUB connector mapping, and the control platform used in your system. Matching these correctly prevents mapping issues and unstable output.",
              },
              {
                q: "Will accessories affect refresh rate and camera performance?",
                a: "They can. The controller configuration, receiving card capability, and signal quality all influence stability. For camera use, proper configuration and a reliable control chain are important for clean output.",
              },
              {
                q: "How do I choose the right power supply rating?",
                a: "Start with your module and cabinet load, then keep safe headroom for continuous operation. Correct sizing helps prevent voltage drop, heat stress, and early failure.",
              },
              {
                q: "Why does an LED wall flicker or lose brightness sometimes?",
                a: "Common causes include incorrect mapping/configuration, weak or overloaded power supplies, loose connections, or signal issues. A proper accessory match and clean wiring reduce these problems.",
              },
              {
                q: "Should I keep spare accessories?",
                a: "For commercial signage, event rentals, and control-room use, keeping a spare receiving card (and sometimes a spare PSU) reduces downtime and speeds up troubleshooting.",
              },
              {
                q: "Can you help with BOQ and selection in Bangladesh?",
 a: "Yes. Share your screen size (W x H), pixel pitch, cabinet type, and intended use case to get a practical recommendation and quotation support.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
