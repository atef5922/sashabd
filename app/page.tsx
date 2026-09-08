// src/app/page.tsx
import type { Metadata } from "next";
import { absoluteUrl, socialImageUrl } from "../lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import HomeAllProductsGrid from "@/components/home/HomeAllProductsGrid";
import productResponsiveStyles from "@/components/home/home-products-responsive.module.css";
import homeResponsiveStyles from "@/components/home/home-responsive.module.css";
import CoreSolutionsSection from "@/components/home/CoreSolutionsSection";
import HomeFeaturedProductsSection from "@/components/home/HomeFeaturedProductsSection";
import HomeConferenceSolutionSection from "@/components/home/HomeConferenceSolutionSection";
import HomeRecentProjectsSection from "@/components/home/HomeRecentProjectsSection";
import HomeNationwideCoverageSection from "@/components/home/HomeNationwideCoverageSection";
import HomeWhyChoosePromiseSection from "@/components/home/HomeWhyChoosePromiseSection";
import ProjectProposalCtaSection from "@/components/home/ProjectProposalCtaSection";
import ProjectWorkflowSection from "@/components/home/ProjectWorkflowSection";
import TrustedTechnologyPartnersSection from "@/components/home/TrustedTechnologyPartnersSection";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomeTrustServiceStrip from "@/components/home/HomeTrustServiceStrip";

export const metadata: Metadata = {
  title: { absolute: `LED Display & Conference Systems in Bangladesh | ${BRAND_NAME}` },
  description:
    "Sasha Corporation supplies and installs LED displays and conference systems in Bangladesh, plus PA systems and turnstile gates with dependable support.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `LED Display & Conference Systems in Bangladesh | ${BRAND_NAME}`,
    description:
      "Sasha Corporation supplies and installs LED displays and conference systems in Bangladesh, plus PA systems and turnstile gates with dependable support.",
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
    title: `LED Display & Conference Systems in Bangladesh | ${BRAND_NAME}`,
    description:
      "Sasha Corporation supplies and installs LED displays and conference systems in Bangladesh, plus PA systems and turnstile gates with dependable support.",
    images: [socialImageUrl()],
  },
};
function SectionHeader({
  title,
  desc,
  right,
  icon,
}: {
  title: React.ReactNode;
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
        {desc ? <p className="home-section-subtitle mt-1 font-medium leading-5 text-slate-600">{desc}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

function TitleIcon() {
  const wrap =
    "inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 text-slate-700";
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, fill: "none" } as const;

  return (
    <span className={wrap} style={{ borderColor: "#ff6a0033" }} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <path {...stroke} d="M4 7h16v10H4z" />
        <path {...stroke} d="M8 10h8M8 14h5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function HomePage() {
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
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={`${homeResponsiveStyles.page} home-page-stack space-y-4`}>
        {/* 1) HERO */}
        <HomeHeroCarousel />
        <HomeTrustServiceStrip />

        {/* 2.5) BROWSE PRODUCTS (PAGINATED) */}
        <section id="browse-products" className={`${productResponsiveStyles.section} mobile-browse-products w-full scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6`}>
          <div className="md:hidden">
            <details className="group">
              <summary className="flex list-none items-center justify-between gap-3 cursor-pointer">
                <div className="flex items-center gap-2 text-xl font-extrabold text-[#071936]">
                  <TitleIcon />
                  <span>Browse <span className="text-[#1660e8]">Products</span></span>
                </div>
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white text-slate-700 shadow-sm transition group-open:rotate-180"
                  style={{ borderColor: "#ff6a0022" }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="home-section-subtitle mt-3 leading-7 text-slate-600">
                Explore LED displays, conference systems, PA sound systems, turnstile gates, and related accessories in one product explorer.
              </p>
            </details>
          </div>

          <div className="hidden md:block">
            <SectionHeader
              icon={<TitleIcon />}
              title={<>Browse <span className="text-[#1660e8]">Products</span></>}
              desc="Explore LED displays, conference systems, PA sound systems, turnstile gates, and related accessories in one product explorer."
            />
          </div>

          <div className="mt-4">
            <HomeAllProductsGrid />
          </div>
        </section>

        <CoreSolutionsSection />
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-[0_5px_20px_rgba(15,23,42,0.035)]">
          <HomeWhyChoosePromiseSection />
          <HomeFeaturedProductsSection />
        </div>
        <HomeConferenceSolutionSection />
        <HomeRecentProjectsSection />
        <HomeNationwideCoverageSection />
        <TrustedTechnologyPartnersSection />
        <ProjectWorkflowSection />
        <ProjectProposalCtaSection />

      </div>
    </div>
  );
}







