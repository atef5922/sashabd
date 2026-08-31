// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "../lib/site";
import { absoluteUrl, socialImageUrl } from "../lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import HomeAllProductsGrid from "@/components/home/HomeAllProductsGrid";
import LedSolutionsChipsSection from "@/components/home/LedSolutionsChipsSection";
import ProjectProposalCtaSection from "@/components/home/ProjectProposalCtaSection";
import ProjectWorkflowSection from "@/components/home/ProjectWorkflowSection";
import TrustedTechnologyPartnersSection from "@/components/home/TrustedTechnologyPartnersSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomeTrustServiceStrip from "@/components/home/HomeTrustServiceStrip";

export const metadata: Metadata = {
  title: { absolute: BRAND_NAME },
  description:
    "Digital display solutions in Bangladesh for indoor, outdoor, and accessory needs with planning, supply, installation, and long-term support from Sasha Corporation.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: BRAND_NAME,
    description:
      "Digital display solutions in Bangladesh for indoor, outdoor, and accessory needs with planning, supply, installation, and long-term support from Sasha Corporation.",
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "Sasha Corporation - LED Display Solutions in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description:
      "LED display solutions in Bangladesh with project planning, installation workflow, and dependable after-sales support.",
    images: [socialImageUrl()],
  },
};
const BRAND = {
  maroon: "#FF6A00",
  maroonDark: "#E45700",
  maroonText: "#C84B00",
  maroonSoft: "#F7EEF1",
  ink: "#0F172A",
};

const trustedBadges = [
  "Clear BOQ + scope documentation",
  "Clean installation planning",
  "Safety-first wiring & protection",
  "Support and maintenance guidance",
];

const trustedInstitutions: Array<{
  name: string;
  logo: string;
  href: string;
}> = [
  { name: "Ministry of Health and Family Welfare", logo: "/images/logo/Health-and-family-welfare.webp", href: "https://mohfw.gov.bd/" },
  { name: "National Board of Revenue, Bangladesh", logo: "/images/logo/nbr.webp", href: "https://nbr.portal.gov.bd/" },
  { name: "Bangladesh Election Commission", logo: "/images/logo/ecs.webp", href: "https://ecs.gov.bd/" },
  { name: "Department of Immigration & Passports", logo: "/images/logo/passport.webp", href: "https://dip.gov.bd/" },
  { name: "Bangladesh Public Service Commission", logo: "/images/logo/bpsc.webp", href: "https://bpsc.gov.bd/" },
  { name: "Anti-Corruption Commission (ACC)", logo: "/images/logo/acc.webp", href: "https://acc.org.bd/" },
  { name: "Dhaka North City Corporation", logo: "/images/logo/dncc.webp", href: "https://dncc.gov.bd/" },
  { name: "Dhaka South City Corporation", logo: "/images/logo/dscc.webp", href: "https://dscc.gov.bd/" },
  { name: "Sonali Bank PLC", logo: "/images/logo/sonali-bank.webp", href: "https://www.sonalibank.com.bd/" },
  { name: "Bangladesh Small and Cottage Industries Corporation (BSCIC)", logo: "/images/logo/BSCIC.webp", href: "https://bscic.gov.bd/" },
  { name: "Bangladesh Sugar and Food Industries Corporation (BSFIC)", logo: "/images/logo/bsfic.webp", href: "https://bsfic.gov.bd/" },
  { name: "Bangladesh Parjatan Corporation", logo: "/images/logo/parjatan.webp", href: "https://parjatan.gov.bd/" },
  { name: "Border Guard Bangladesh (BGB)", logo: "/images/logo/bgb.webp", href: "https://bgb.gov.bd/" },
  { name: "Civil Aviation Authority Of Bangladesh", logo: "/images/logo/caab.webp", href: "https://caab.portal.gov.bd/" },
  { name: "Bangladesh Road Transport Authority (BRTA)", logo: "/images/logo/brta.webp", href: "https://brta.gov.bd/" },
  { name: "Fire Service and Civil Defence Bangladesh", logo: "/images/logo/fire-service.webp", href: "https://fireservice.gov.bd/" },
  { name: "University Grants Commission of Bangladesh", logo: "/images/logo/ugc.webp", href: "https://ugc.gov.bd/" },
  { name: "Bangladesh Ansar and Village Defence Party", logo: "/images/logo/ansar.webp", href: "https://ansarvdp.gov.bd/" },
  { name: "Bangladesh House Building Finance Corporation", logo: "/images/logo/bhbfc-logo-final.webp", href: "https://bhbfc.gov.bd/" },
  { name: "Dhaka Electric Supply Company Limited (DESCO)", logo: "/images/logo/bpatc.webp", href: "https://bpatc.gov.bd/" },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({
  title,
  desc,
  right,
  icon,
}: {
  title: string;
  desc?: string;
  right?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        <h2 className="flex items-center gap-2 !pb-0 text-xl font-extrabold leading-7 tracking-tight text-[#071936] after:!hidden lg:text-[22px]">
          {icon ? <span className="inline-flex">{icon}</span> : null}
          <span>{title}</span>
        </h2>
        {desc ? <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]">{desc}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

function TitleIcon({ kind }: { kind: "price" | "trust" | "area" | "faq" | "cta" | "location" }) {
  const wrap =
    "inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 text-slate-700";
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, fill: "none" } as const;

  if (kind === "price") {
    return (
      <span className={wrap} style={{ borderColor: `${BRAND.maroon}33` }} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M4 7h16v10H4z" />
          <path {...stroke} d="M8 10h8M8 14h5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (kind === "trust") {
    return (
      <span className={wrap} style={{ borderColor: `${BRAND.maroon}33` }} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" />
          <path {...stroke} d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (kind === "area") {
    return (
      <span className={wrap} style={{ borderColor: `${BRAND.maroon}33` }} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.3" {...stroke} />
        </svg>
      </span>
    );
  }
  if (kind === "faq") {
    return (
      <span className={wrap} style={{ borderColor: `${BRAND.maroon}33` }} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path {...stroke} d="M9.8 9.5a2.4 2.4 0 1 1 3.9 1.8c-.8.7-1.5 1.1-1.5 2" strokeLinecap="round" />
          <circle cx="12" cy="16.6" r="1" fill="currentColor" />
        </svg>
      </span>
    );
  }
  if (kind === "cta") {
    return (
      <span className={wrap} style={{ borderColor: `${BRAND.maroon}33` }} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path {...stroke} d="M4 12h12" strokeLinecap="round" />
          <path {...stroke} d="m12 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className={wrap} style={{ borderColor: `${BRAND.maroon}33` }} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <path {...stroke} d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2.3" {...stroke} />
      </svg>
    </span>
  );
}

function Section({
  children,
  tone = "white",
}: {
  children: React.ReactNode;
  tone?: "white" | "soft";
}) {
  return (
    <section
      className={cx("rounded-3xl border", tone === "soft" ? "bg-slate-50" : "bg-white")}
      style={{ borderColor: `${BRAND.maroon}18` }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-10 md:py-7">{children}</div>
    </section>
  );
}

export default function HomePage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: "https://sashabd.com/",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["bn", "en"],
    },
    sameAs: [],
  };

  return (
    <div
      className="home-underlined mx-auto w-full max-w-[clamp(80rem,90vw,108rem)] px-4 pb-10 pt-0 [box-shadow:0_0_0_100vmax_#f4f7fb] [clip-path:inset(0_-100vmax)] md:px-6"
      data-home-route-kind="hub"
    >
      <style>{`
        .card-butterfly {
          pointer-events: none;
        }
        .card-butterfly span {
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          opacity: 0;
          transform: translate(0, 0) scale(0.85);
        }
        .card-hover:hover .card-butterfly span {
          opacity: 1;
        }
        .card-butterfly span:nth-child(1) {
          background: rgba(255, 106, 0, 0.95);
          animation: flyA 1.6s ease-in-out infinite;
        }
        .card-butterfly span:nth-child(2) {
          background: rgba(59, 130, 246, 0.95);
          animation: flyB 1.9s ease-in-out infinite;
        }
        .card-butterfly span:nth-child(3) {
          background: rgba(34, 197, 94, 0.95);
          animation: flyC 2.1s ease-in-out infinite;
        }
        .card-fireflies {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 180ms ease-in-out;
        }
        .card-hover:hover .card-fireflies {
          opacity: 1;
        }
        .card-fireflies span {
          position: absolute;
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 9999px;
          opacity: 0;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
        }
        .card-fireflies span:nth-child(1) {
          background: rgba(255, 234, 0, 0.9);
          animation: sparkA 1.9s ease-in-out infinite;
        }
        .card-fireflies span:nth-child(2) {
          background: rgba(255, 126, 0, 0.92);
          animation: sparkB 2.1s ease-in-out infinite;
        }
        .card-fireflies span:nth-child(3) {
          background: rgba(56, 189, 248, 0.9);
          animation: sparkC 1.7s ease-in-out infinite;
        }
        .card-fireflies span:nth-child(4) {
          background: rgba(34, 197, 94, 0.9);
          animation: sparkD 2.3s ease-in-out infinite;
        }
        .card-fireflies span:nth-child(5) {
          background: rgba(249, 115, 22, 0.92);
          animation: sparkE 2.4s ease-in-out infinite;
        }
        .card-fireflies span:nth-child(6) {
          background: rgba(168, 85, 247, 0.9);
          animation: sparkF 2s ease-in-out infinite;
        }
        @keyframes sparkA {
          0% { transform: translate(12px, 70px) scale(0.6); opacity: 0; }
          15% { opacity: 1; }
          40% { transform: translate(28px, 44px) scale(1); }
          70% { transform: translate(20px, 20px) scale(0.8); }
          100% { transform: translate(6px, 4px) scale(0.5); opacity: 0; }
        }
        @keyframes sparkB {
          0% { transform: translate(80px, 110px) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          35% { transform: translate(58px, 84px) scale(1); }
          65% { transform: translate(44px, 52px) scale(0.75); }
          100% { transform: translate(30px, 22px) scale(0.4); opacity: 0; }
        }
        @keyframes sparkC {
          0% { transform: translate(110px, 52px) scale(0.55); opacity: 0; }
          20% { opacity: 1; }
          45% { transform: translate(86px, 24px) scale(1); }
          75% { transform: translate(68px, 8px) scale(0.7); }
          100% { transform: translate(50px, -10px) scale(0.45); opacity: 0; }
        }
        @keyframes sparkD {
          0% { transform: translate(20px, 24px) scale(0.55); opacity: 0; }
          18% { opacity: 1; }
          44% { transform: translate(8px, -6px) scale(1); }
          70% { transform: translate(-4px, -18px) scale(0.75); }
          100% { transform: translate(-14px, -28px) scale(0.4); opacity: 0; }
        }
        @keyframes sparkE {
          0% { transform: translate(90px, 70px) scale(0.5); opacity: 0; }
          12% { opacity: 1; }
          38% { transform: translate(76px, 46px) scale(1); }
          60% { transform: translate(58px, 22px) scale(0.75); }
          100% { transform: translate(40px, 4px) scale(0.35); opacity: 0; }
        }
        @keyframes sparkF {
          0% { transform: translate(58px, 96px) scale(0.55); opacity: 0; }
          14% { opacity: 1; }
          40% { transform: translate(44px, 70px) scale(1); }
          68% { transform: translate(30px, 40px) scale(0.75); }
          100% { transform: translate(16px, 18px) scale(0.35); opacity: 0; }
        }
        @keyframes flyA {
          0% { transform: translate(10px, 30px) scale(0.85); opacity: 0; }
          30% { opacity: 1; }
          50% { transform: translate(24px, -10px) scale(1); }
          100% { transform: translate(46px, -40px) scale(0.8); opacity: 0; }
        }
        @keyframes flyB {
          0% { transform: translate(20px, 20px) scale(0.85); opacity: 0; }
          25% { opacity: 1; }
          55% { transform: translate(0px, -35px) scale(1); }
          100% { transform: translate(-24px, -60px) scale(0.8); opacity: 0; }
        }
        @keyframes flyC {
          0% { transform: translate(34px, 22px) scale(0.85); opacity: 0; }
          35% { opacity: 1; }
          65% { transform: translate(18px, -22px) scale(1); }
          100% { transform: translate(-10px, -55px) scale(0.8); opacity: 0; }
        }
        @media (max-width: 767px) {
          .mobile-browse-products h2::after {
            display: none !important;
          }
        }
      `}</style>
      <div className="home-page-stack space-y-4">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* 1) HERO */}
        <HomeHeroCarousel />
        <HomeTrustServiceStrip />

        {/* 2) CATEGORY NAV */}
        <section>
          {(() => {
            const categories = [
              {
                title: "LED Display",
                desc: "Indoor, outdoor, rental and complete LED display solutions",
                href: "/led-display/",
                icon: "/icons/outdoor-billboard.svg",
                tone:
                  "radial-gradient(circle at 18% 20%, rgba(125,211,252,0.46) 0%, rgba(125,211,252,0) 34%), linear-gradient(145deg, rgba(240,249,255,0.98) 0%, rgba(219,234,254,0.95) 48%, rgba(191,219,254,0.88) 100%)",
                borderColor: "rgba(56,189,248,0.78)",
                iconBorderColor: "rgba(14,165,233,0.34)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(224,242,254,0.94))",
              },
              {
                title: "Conference System",
                desc: "Wired, wireless, digital and hybrid meeting-room systems",
                href: "/conference-system/",
                icon: "/icons/hand-mic.svg",
                tone:
                  "radial-gradient(circle at 22% 18%, rgba(253,186,116,0.44) 0%, rgba(253,186,116,0) 34%), linear-gradient(145deg, rgba(255,251,235,0.98) 0%, rgba(254,243,199,0.96) 48%, rgba(253,230,138,0.9) 100%)",
                borderColor: "rgba(245,158,11,0.76)",
                iconBorderColor: "rgba(217,119,6,0.32)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(255,237,213,0.94))",
              },
              {
                title: "PA Sound System",
                desc: "Amplifiers, microphones and speakers for every venue",
                href: "/pa-system/",
                icon: "/icons/pa-speaker.svg",
                tone:
                  "radial-gradient(circle at 18% 20%, rgba(196,181,253,0.42) 0%, rgba(196,181,253,0) 34%), linear-gradient(145deg, rgba(250,245,255,0.98) 0%, rgba(237,233,254,0.96) 46%, rgba(216,180,254,0.9) 100%)",
                borderColor: "rgba(168,85,247,0.74)",
                iconBorderColor: "rgba(147,51,234,0.3)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(243,232,255,0.94))",
              },
              {
                title: "Turnstile Gate",
                desc: "Secure entrance gates with access-control integration",
                href: "/turnstile-gate/",
                icon: "/icons/turnstile-gate.svg",
                tone:
                  "radial-gradient(circle at 20% 18%, rgba(110,231,183,0.44) 0%, rgba(110,231,183,0) 34%), linear-gradient(145deg, rgba(240,253,250,0.98) 0%, rgba(204,251,241,0.96) 50%, rgba(153,246,228,0.88) 100%)",
                borderColor: "rgba(20,184,166,0.74)",
                iconBorderColor: "rgba(13,148,136,0.3)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(204,251,241,0.94))",
              },
            ];

            return (
              <div className="home-category-grid grid grid-cols-2 gap-2 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:grid-cols-4 sm:gap-2.5 sm:p-3">
                {categories.map((category) => (
                  <Link
                    key={category.title}
                    prefetch={false}
                    href={category.href}
                    className="home-overview-category-card group relative isolate flex min-h-[88px] min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border bg-white px-1.5 py-2 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:min-h-[108px] sm:p-2"
                    style={{ borderColor: category.borderColor, background: category.tone }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm transition duration-300 group-hover:scale-105"
                      style={{ borderColor: category.iconBorderColor, background: category.iconBackground }}
                    >
                      <Image
                        src={category.icon}
                        alt=""
                        width={26}
                        height={26}
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                    <span className="mt-1.5 text-[10px] font-extrabold leading-tight text-[#071936] sm:text-[13px]">
                      {category.title}
                    </span>
                    <span className="mt-0.5 hidden text-[9.5px] font-medium leading-3.5 text-slate-600 sm:block">
                      {category.desc}
                    </span>
                  </Link>
                ))}
              </div>
            );
          })()}
        </section>

        {/* 2.5) BROWSE PRODUCTS (PAGINATED) */}
        <section className="mobile-browse-products w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6">
          <div className="md:hidden">
            <details className="group">
              <summary className="flex list-none items-center justify-between gap-3 cursor-pointer">
                <div className="flex items-center gap-2 text-xl font-extrabold text-[#071936]">
                  <TitleIcon kind="price" />
                  <span>Browse Products</span>
                </div>
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white text-slate-700 shadow-sm transition group-open:rotate-180"
                  style={{ borderColor: `${BRAND.maroon}22` }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-slate-600 leading-7">
                Explore LED displays, conference systems, PA sound systems, turnstile gates, and related accessories in one product explorer.
              </p>
            </details>
          </div>

          <div className="hidden md:block">
            <SectionHeader
              icon={<TitleIcon kind="price" />}
              title="Browse Products"
              desc="Explore LED displays, conference systems, PA sound systems, turnstile gates, and related accessories in one product explorer."
              right={
                <Link
                  prefetch={false}
                  href="/led-display/"
                  className="rounded-lg px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  View LED Displays →
                </Link>
              }
            />
          </div>

          <div className="mt-4">
            <HomeAllProductsGrid />
          </div>
        </section>

        <LedSolutionsChipsSection />
        <TrustedTechnologyPartnersSection />
        <ProjectWorkflowSection />
        <WhyChooseSection />
        <ProjectProposalCtaSection />

        {/* 6) TRUST */}
        {false && (
        <Section tone="white">
          <div className="text-sm font-semibold" style={{ color: BRAND.maroonText }}>
            Reliability | Compliance | Long-Term Support
          </div>

          <SectionHeader
            icon={<TitleIcon kind="trust" />}
            title="Our Valuable Clients"
            desc="We provide professional visual solutions designed for institutional requirements - clear visibility, stable performance, safe installation, and dependable after-sales support."
            right={
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Request a Free Consultation ?
              </a>
            }
          />

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {trustedBadges.map((x) => (
              <div
                key={x}
                className="rounded-2xl border bg-slate-50 p-4 text-sm font-semibold text-slate-800"
                style={{ borderColor: `${BRAND.maroon}12` }}
              >
                {x}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {trustedInstitutions.map((ins) => (
              <a
                key={ins.name}
                href={ins.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center transition hover:bg-slate-100"
                aria-label={ins.name}
                title={ins.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ins.logo}
                  alt={ins.name}
                  width={240}
                  height={96}
                  className={
                    ins.logo === "/images/logo/nbr.webp"
                      ? "h-16 w-auto max-w-full object-contain sm:h-20"
                      : ins.logo === "/images/logo/Health-and-family-welfare.webp"
                        ? "h-16 w-auto max-w-full object-contain sm:h-20"
                        : ins.logo === "/images/logo/ecs.webp"
                          ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/passport.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/bpsc.webp"
                              ? "h-20 w-auto max-w-full object-contain sm:h-24"
                            : ins.logo === "/images/logo/acc.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/dncc.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/dscc.webp"
                              ? "h-20 w-auto max-w-full object-contain sm:h-24"
                            : ins.logo === "/images/logo/sonali-bank.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/BSCIC.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/bsfic.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/parjatan.webp"
                              ? "h-14 w-auto max-w-full object-contain sm:h-16"
                            : ins.logo === "/images/logo/bgb.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/caab.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/brta.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/fire-service.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/ugc.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/ansar.webp"
                              ? "h-16 w-auto max-w-full object-contain sm:h-20"
                            : ins.logo === "/images/logo/bhbfc-logo-final.webp"
                              ? "h-20 w-auto max-w-full object-contain sm:h-24"
                            : ins.logo === "/images/logo/bpatc.webp"
                              ? "h-20 w-auto max-w-full object-contain sm:h-24"
                            : "h-10 w-auto max-w-full object-contain sm:h-11"
                  }
                  loading="lazy"
                  decoding="async"
                />
                <p
                  className={
                    ins.logo === "/images/logo/dscc.webp"
                      ? "mt-3 text-sm font-medium leading-snug text-slate-800 whitespace-nowrap"
                      : "mt-3 text-sm font-medium leading-snug text-slate-800"
                  }
                >
                  {ins.name}
                </p>
              </a>
            ))}
          </div>

        </Section>
        )}

        {/* 7) SERVICE AREAS (FIXED + NO styled-jsx) */}
        {false && (
        <Section tone="soft">
          <SectionHeader
            icon={<TitleIcon kind="area" />}
            title="Our Service Areas in Bangladesh"
            desc="We provide installation, delivery, calibration and maintenance across major cities nationwide."
            right={
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                WhatsApp for Support ?
              </a>
            }
          />

          {/* ? English line (replaces Bengali) */}
          <p className="mt-8 text-center text-sm font-semibold text-slate-700">
            We serve all 64 districts and 8 divisions of Bangladesh.
          </p>

          {/* ? 7 Division Cards with Server-safe animation */}
          {(() => {
            const divisions = [
              { name: "Dhaka", bn: "Dhaka Division", icon: "???" },
              { name: "Chattogram", bn: "Chattogram Division", icon: "??" },
              { name: "Rajshahi", bn: "Rajshahi Division", icon: "??" },
              { name: "Khulna", bn: "Khulna Division", icon: "??" },
              { name: "Barishal", bn: "Barishal Division", icon: "??" },
              { name: "Sylhet", bn: "Sylhet Division", icon: "??" },
              { name: "Rangpur", bn: "Rangpur Division", icon: "???" },
              { name: "Mymensingh", bn: "Mymensingh Division", icon: "??" },
            ];

            return (
              <div className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {divisions.map((d, idx) => (
                    <div
                      key={d.name}
                      className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md opacity-0 translate-y-2"
                      style={{
                        borderColor: "rgba(56,189,248,0.55)",
                        background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(59,130,246,0.02))",
                        animation: "fadeUp 0.6s ease-out forwards",
                        animationDelay: `${idx * 80}ms`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border bg-white/75 text-lg transition group-hover:scale-105"
                          style={{ borderColor: "rgba(125,211,252,0.7)" }}
                        >
                          {d.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-slate-900">{d.bn}</div>
                          <div className="mt-0.5 text-xs font-semibold text-slate-600">{d.name}</div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs font-semibold text-slate-600 leading-6">Installation | Calibration | Support</div>
                    </div>
                  ))}
                </div>

                {/* ? Server-safe style tag (NOT styled-jsx) */}
                <style>{`
                  @keyframes fadeUp {
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            );
          })()}
        </Section>
        )}

      </div>
    </div>
  );
}







