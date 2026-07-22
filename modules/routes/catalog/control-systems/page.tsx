import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Control Systems",
  description:
    "Browse control systems: PA Sound System, Turnstile Gate System and Digital Podium. Installation support is available across Bangladesh. View details and request a quotation.",
  alternates: { canonical: "/control-systems/" },
  openGraph: {
    title: "Control Systems in Bangladesh",
    description: "PA system, turnstile gate system and digital podium in Bangladesh.",
    url: "/control-systems/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/accessories/controller-video.webp"),
        width: 1200,
        height: 630,
        alt: "Control Systems in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Control Systems in Bangladesh",
    description: "PA system, turnstile gate system and digital podium in Bangladesh.",
    images: [socialImageUrl("/images/accessories/controller-video.webp")],
  },
};

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

const categories = [
  {
    slug: "interactive-flat-panel",
    title: "Interactive Flat Panel",
    subtitle: "4K touch display for smart classrooms, training and meeting room collaboration.",
    href: "/interactive-flat-panel/",
    image: "/images/Interactive flat panel/interactive-card.webp",
    tags: ["4K Touch", "Smart classroom", "Meeting room"],
  },
  {
    slug: "pa-system",
    title: "PA Sound System",
    subtitle: "Public address system for announcements in office, factory, mosque, school and events.",
    href: "/pa-system/",
    image: "/images/logo/PA-sound.webp",
    tags: ["Amplifier", "Speaker", "Microphone"],
  },
  {
    slug: "turnstile-gate-system",
    title: "Turnstile Gate System",
    subtitle: "Access control and entry management for office, factory and public venues.",
    href: "/turnstile-gate/",
    image: "/images/logo/turnstile-gate-common.webp",
    tags: ["RFID", "Fingerprint", "Access control"],
  },
  {
    slug: "digital-podium",
    title: "Digital Podium",
    subtitle: "Smart podium/lectern for presentations in classrooms, lecture halls and conference venues.",
    href: "/digital-podium/",
    image: "/images/podium/Podium-common.webp",
    tags: ["Smart podium", "Lectern", "Presentation"],
  },
];

export default function ControlSystemsPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-0 md:px-6">
      <section className="rounded-3xl bg-white p-7 md:p-10">
        <div className="flex flex-col gap-4">
          <div className="max-w-3xl">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold"
              style={{ borderColor: `${BRAND.maroon}22` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
              Control Systems
            </div>

            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Control Systems
            </h1>
          </div>

          <p className="mt-1 w-full text-slate-600 leading-7 text-justify">
            Control systems help manage announcements and access control. Choose a category below to explore options and
            request a quotation based on your site requirements.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link prefetch={false}
              href="/contact"
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

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">Browse Control Systems</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Click any category to see details, selection notes and recommended setup.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((p) => (
            <Link prefetch={false}
              key={p.slug}
              href={p.href}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                  Control
                </div>
              </div>

              <div className="p-5">
                <div className="text-lg font-extrabold text-slate-900">{p.title}</div>
                <p className="mt-1 text-sm text-slate-600 leading-6">{p.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((x) => (
                    <span
                      key={`${p.slug}-${x}`}
                      className="rounded-full border bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                      style={{ borderColor: `${BRAND.maroon}12` }}
                    >
                      {x}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-sm font-bold" style={{ color: BRAND.maroon }}>
                  View details -&gt;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
        <h2 className="text-2xl font-bold text-slate-900">Popular Setup Pages</h2>
        <p className="mt-2 text-slate-600 leading-7">
          Quick links to commonly requested PA system setups and access control options.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/pa-system/school-mosque-pa-rack-package-mixer-amp-paging-mic/",
              title: "School & Mosque PA Rack Package",
              desc: "Mixer + amplifier + paging mic package for daily announcements.",
            },
            {
              href: "/pa-system/digital-control-pa-system-audio-matrix-dsp/",
              title: "Digital Control PA System (Audio Matrix DSP)",
              desc: "Zoning and intelligent routing for multi-area sites.",
            },
            {
              href: "/pa-system/2-channel-power-amplifier-2x500w/",
 title: "2-Channel Power Amplifier (2 - 500W)",
              desc: "High power output for larger halls and multi-speaker zones.",
            },
            {
              href: "/pa-system/60w-column-speaker-mosque-hall/",
              title: "60W Column Speaker",
              desc: "Speech clarity option for mosque/hall environments.",
            },
            {
              href: "/pa-system/50w-outdoor-horn-speaker-siren-announcement/",
              title: "50W Outdoor Horn Speaker",
              desc: "Outdoor announcement and siren use cases.",
            },
            {
              href: "/turnstile-gate/ai-face-recognition-turnstile-gate/",
              title: "AI Face Recognition Turnstile Gate",
              desc: "Modern access control for office and factory entry points.",
            },
            {
              href: "/digital-podium/",
              title: "Digital Podium (Smart Lectern)",
              desc: "Presentation control and clean AV workflow for classrooms and events.",
            },
          ].map((x) => (
            <Link
              prefetch={false}
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
    </div>
  );
}
