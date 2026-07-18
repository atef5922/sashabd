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
import HeroBackground, { mobileImagePositions } from "@/components/home/HeroBackground";

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

const heroServiceHighlights = [
  "Site survey",
  "Installation",
  "Calibration & training",
  "Warranty-backed support",
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
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          {icon ? <span className="inline-flex">{icon}</span> : null}
          <span>{title}</span>
        </h2>
        {desc ? <p className="mt-2 text-slate-600 leading-7">{desc}</p> : null}
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
    <div className="home-underlined mx-auto w-full max-w-7xl px-4 pt-0 pb-8 md:px-6">
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
      <div className="space-y-6 md:space-y-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* 1) HERO */}
        <section className="relative left-1/2 right-1/2 -mx-[50vw] min-h-[250px] w-screen overflow-hidden border-b bg-white md:min-h-[clamp(520px,calc(100svh-64px),720px)] md:border-y md:bg-amber-900">
          <div className="relative z-20 w-full px-0 py-0 md:hidden">
            <div
              className="relative overflow-hidden"
              style={{
                minHeight: "250px",
                background: "transparent",
              }}
            >
              <HeroBackground showArrows imageSize="cover" imagePositions={mobileImagePositions} dotsClassName="bottom-1.5 gap-2" />

              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-4">
                <div className="max-w-[280px]">
                  <span
                    className="inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold text-white shadow-sm"
                    style={{ background: "rgba(11,18,32,0.62)", borderColor: "rgba(255,255,255,0.16)" }}
                  >
                    Nationwide Support
                  </span>
                  <h1 className="sr-only">Sasha Corporation - Smart technology solutions in Bangladesh</h1>
                  <h2 className="mt-3 text-[27px] font-extrabold leading-[1.02] tracking-tight text-white after:hidden">
                    Smart Technology Solutions in Bangladesh.
                  </h2>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-11">
                <div className="pointer-events-auto flex flex-nowrap gap-2">
                  <Link
                    prefetch={false}
                    href="/led-display/"
                    className="inline-flex min-h-9 items-center justify-center rounded-md px-3 py-1.5 text-[11px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                  >
                    Browse Products
                  </Link>

                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center justify-center rounded-md border border-emerald-300/40 bg-emerald-600 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
                    aria-label="Request a quotation on WhatsApp"
                  >
                    WhatsApp Quote
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <HeroBackground />
          </div>

          <div className="pointer-events-none relative z-20 mx-auto hidden w-full max-w-7xl flex-col justify-center px-5 py-10 md:flex md:px-10 md:py-12">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${BRAND.maroon}24`, color: "#fff" }}
              >
                Nationwide Support
              </span>
            </div>

            <div className="mt-6 max-w-4xl">
              <h1 className="sr-only">Sasha Corporation - Smart technology solutions in Bangladesh</h1>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Smart Technology Solutions in Bangladesh.
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/85 md:text-base text-justify [text-align-last:auto]">
                Sasha Corporation supports projects across Bangladesh with LED display solutions (indoor, outdoor, rental and accessories) plus
                PA sound systems, turnstile gate access control, digital podiums, and interactive flat panels for classrooms, offices, showrooms
                and institutions. We handle BOQ and scope clarity, supply, installation, commissioning and after-sales support - so you get a
                reliable setup with clear specifications and project-based pricing.
              </p>

                            <div className="pointer-events-auto mt-7 flex flex-wrap gap-3">
                <Link prefetch={false} href="/led-display/"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  <span>Browse Products</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-emerald-300/40 bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
                  aria-label="Request a quotation on WhatsApp"
                >
                  Request Quote on WhatsApp
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold text-white shadow-md backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call: {siteConfig.phone}</span>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-white/90">
                {heroServiceHighlights.map((x) => (
                  <span
                    key={x}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-white/10 px-4 py-2 shadow-sm"
                    style={{ borderColor: `rgba(255,255,255,0.22)` }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/14 text-white/95"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-2.5 w-2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 12.5 10.2 15.5 17 8.7" />
                      </svg>
                    </span>
                    {x}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* 2) CATEGORY NAV */}
        <section>
          {(() => {
            const categories = [
              {
                title: "LED Display",
                desc: "Showroom, office, conference & control room models",
                href: "/led-display/",
                icon: "/icons/outdoor-billboard.svg",
                tone:
                  "radial-gradient(circle at 18% 20%, rgba(125,211,252,0.46) 0%, rgba(125,211,252,0) 34%), linear-gradient(145deg, rgba(240,249,255,0.98) 0%, rgba(219,234,254,0.95) 48%, rgba(191,219,254,0.88) 100%)",
                borderColor: "rgba(56,189,248,0.78)",
                iconBorderColor: "rgba(14,165,233,0.34)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(224,242,254,0.94))",
              },
              {
                title: "PA Sound System",
                desc: "Billboard, shop signage & weather-proof solutions",
                href: "/pa-system/",
                icon: "/icons/pa-speaker.svg",
                tone:
                  "radial-gradient(circle at 22% 18%, rgba(253,186,116,0.44) 0%, rgba(253,186,116,0) 34%), linear-gradient(145deg, rgba(255,251,235,0.98) 0%, rgba(254,243,199,0.96) 48%, rgba(253,230,138,0.9) 100%)",
                borderColor: "rgba(245,158,11,0.76)",
                iconBorderColor: "rgba(217,119,6,0.32)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(255,237,213,0.94))",
              },
              {
                title: "Security Solutions",
                desc: "Stage, event & program rental Digital Sinage",
                href: "/turnstile-gate/",
                icon: "/icons/turnstile-gate.svg",
                tone:
                  "radial-gradient(circle at 18% 20%, rgba(196,181,253,0.42) 0%, rgba(196,181,253,0) 34%), linear-gradient(145deg, rgba(250,245,255,0.98) 0%, rgba(237,233,254,0.96) 46%, rgba(216,180,254,0.9) 100%)",
                borderColor: "rgba(168,85,247,0.74)",
                iconBorderColor: "rgba(147,51,234,0.3)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(243,232,255,0.94))",
              },
              {
                title: "Accessories",
                desc: "Controller, receiving card, power supply & more",
                href: "/led-display/accessories/",
                icon: "/icons/accessories-toolbox.svg",
                tone:
                  "radial-gradient(circle at 20% 18%, rgba(110,231,183,0.44) 0%, rgba(110,231,183,0) 34%), linear-gradient(145deg, rgba(240,253,250,0.98) 0%, rgba(204,251,241,0.96) 50%, rgba(153,246,228,0.88) 100%)",
                borderColor: "rgba(20,184,166,0.74)",
                iconBorderColor: "rgba(13,148,136,0.3)",
                iconBackground: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(204,251,241,0.94))",
              },
            ];

            return (
              <div className="grid grid-cols-4 gap-1 sm:gap-4 lg:grid-cols-4">
                {categories.map((c) => (
                  <Link key={c.title}
                    prefetch={false}
                    href={c.href}
                    className="home-category-card group relative isolate block h-[64px] border-[0.75px] bg-white px-0.5 py-0.5 sm:h-auto sm:p-2 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md card-hover"
                    style={{ borderColor: c.borderColor, background: c.tone }}
                  >
                    <div className="card-butterfly">
                      <span style={{ top: "45%", left: "18%" }} />
                      <span style={{ top: "55%", left: "32%" }} />
                      <span style={{ top: "42%", left: "60%" }} />
                    </div>
                    <div className="h-full w-full">
                      <div className="home-category-card-inner h-full">
                        <div className="card-fireflies">
                          <span style={{ top: "72%", left: "18%" }} />
                          <span style={{ top: "56%", left: "35%" }} />
                          <span style={{ top: "42%", left: "62%" }} />
                          <span style={{ top: "30%", left: "28%" }} />
                          <span style={{ top: "18%", left: "52%" }} />
                          <span style={{ top: "68%", left: "76%" }} />
                        </div>
                        <div className="relative flex h-full min-h-0 flex-col items-center justify-center text-center sm:min-h-[128px]">
	                          <div
	                            className="flex h-9 w-9 items-center justify-center border text-sm shadow-sm transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11 sm:text-[18px]"
	                            style={{ borderColor: c.iconBorderColor, background: c.iconBackground }}
	                          >
	                            {c.icon.startsWith("/") ? (
	                              <Image src={c.icon} alt={`${c.title} icon`} width={26} height={26} className="h-5 w-5 object-contain sm:h-6 sm:w-6" />
	                            ) : (
	                              <span className="leading-none">{c.icon}</span>
	                            )}
	                          </div>
	
	                          <div className="mt-0.5 min-w-0 sm:mt-4">
	                            <div className="text-[8.5px] font-extrabold leading-[1.05] text-slate-900 sm:text-sm">{c.title}</div>
	                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })()}
        </section>

        {/* 2.5) BROWSE PRODUCTS (PAGINATED) */}
        <section className="mobile-browse-products w-full py-5 md:py-6">
          <div className="md:hidden">
            <details className="group">
              <summary className="flex list-none items-center justify-between gap-3 cursor-pointer">
                <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
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
                Explore LED display modules, accessories, PA sound systems, and turnstile gate solutions - organized in one paginated grid.
              </p>
            </details>
          </div>

          <div className="hidden md:block">
            <SectionHeader
              icon={<TitleIcon kind="price" />}
              title="Browse Products"
              desc="Explore LED display modules, accessories, PA sound systems, and turnstile gate solutions - organized in one paginated grid."
              right={
                <Link
                  prefetch={false}
                  href="/led-display/"
                  className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  LED display ?
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

                      <div className="mt-4 h-1 w-10 rounded-full transition-all group-hover:w-20" style={{ background: `linear-gradient(90deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }} />
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













