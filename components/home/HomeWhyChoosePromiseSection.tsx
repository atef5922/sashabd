import HomeSectionHeadingIcon from "./HomeSectionHeadingIcon";

const promiseItems = [
  {
    title: "Engineering-Based Solutions",
    description: "We design system solutions around real project requirements with proper BOQ and drawings.",
    icon: "engineering",
  },
  {
    title: "BOQ & Tender Support",
    description: "We provide BOQ, specification sheets and documents for tender and project submission.",
    icon: "document",
  },
  {
    title: "Professional Installation",
    description: "Our experienced team ensures neat installation and proper system configuration.",
    icon: "tools",
  },
  {
    title: "After-Sales Support",
    description: "We provide warranty support, AMC and quick response whenever you need us.",
    icon: "support",
  },
] as const;

const companyStats = [
  { value: "10+", label: "Years of Experience", icon: "shield" },
  { value: "500+", label: "Projects Completed", icon: "briefcase" },
  { value: "20+", label: "Global Brands", icon: "globe" },
  { value: "64", label: "Districts Covered", icon: "location" },
] as const;

type IconKind = (typeof promiseItems)[number]["icon"] | (typeof companyStats)[number]["icon"];

function LineIcon({ kind, className = "h-5 w-5" }: { kind: IconKind; className?: string }) {
  if (kind === "engineering") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M5 4.5h4.5A2.5 2.5 0 0 1 12 7v12a2.5 2.5 0 0 0-2.5-2.5H5v-12Zm14 0h-4.5A2.5 2.5 0 0 0 12 7v12a2.5 2.5 0 0 1 2.5-2.5H19v-12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "document") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M7 3.5h7l4 4V20H7V3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3.5v4h4M10 12h5M10 15.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "tools") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="m14.5 6.5 3-3a4.4 4.4 0 0 1-5.6 5.6L5.5 15.5a2.1 2.1 0 1 0 3 3l6.4-6.4a4.4 4.4 0 0 1 5.6-5.6l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "support") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="3" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="17" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M17 19c0 1.1-.9 2-2 2h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "shield") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M12 3.5 6 6v5.2c0 4 2.3 7 6 9.3 3.7-2.3 6-5.3 6-9.3V6l-6-2.5Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="m9.5 12 1.6 1.6 3.4-3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4 8h16v11H4V8Zm5-3h6v3H9V5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M4 12.5h16M10 12.5v2h4v-2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (kind === "globe") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 12h16M12 4c2.2 2.2 3.2 4.9 3.2 8s-1 5.8-3.2 8c-2.2-2.2-3.2-4.9-3.2-8S9.8 6.2 12 4Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function HomeWhyChoosePromiseSection() {
  return (
    <section
      id="why-choose-sasha"
      aria-labelledby="why-choose-sasha-heading"
      className="scroll-mt-24 bg-white px-4 py-5 text-left sm:px-5 md:px-7 md:py-7"
    >
      <style>{`
        #why-choose-sasha .home-section-eyebrow {
          color: #1d4ed8 !important;
        }
        #why-choose-sasha .home-promise-card-title {
          font-size: 14px !important;
          line-height: 17px !important;
        }
        #why-choose-sasha .home-promise-card {
          border-color: #dfe6f0 !important;
          border-radius: 10px !important;
        }
        #why-choose-sasha .home-promise-icon {
          background: #eef4ff !important;
          color: #1d4ed8 !important;
        }
        #why-choose-sasha .home-promise-stats {
          background: #f8fafc !important;
        }
        #why-choose-sasha .home-stat-icon {
          background: #ffffff !important;
          color: #1d4ed8 !important;
        }
        #why-choose-sasha p {
          text-align: left !important;
          text-align-last: auto !important;
        }
        @media (min-width: 1024px) {
          #why-choose-sasha .home-promise-stats {
            display: flex !important;
            flex-direction: column !important;
          }
          #why-choose-sasha .home-promise-stat {
            flex: 1 1 0%;
            min-height: 0;
          }
          #why-choose-sasha .home-promise-stat + .home-promise-stat {
            border-top: 1px solid rgba(226, 232, 240, 0.9);
          }
        }
      `}</style>
      <div className="grid items-stretch gap-5 lg:grid-cols-4 lg:gap-6">
        <div className="min-w-0 lg:col-span-3">
          <p className="home-section-eyebrow inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.13em] sm:text-[10px]">
            <HomeSectionHeadingIcon kind="promise" size="badge" />
            <span>Why Choose Sasha Corporation</span>
          </p>
          <h2 id="why-choose-sasha-heading" className="mt-2 flex max-w-xl items-start gap-2 !pb-0 text-[22px] font-black leading-[1.08] tracking-[-0.025em] text-[#071936] after:!hidden sm:text-2xl">
            <HomeSectionHeadingIcon kind="promise" />
            <span>Technology, Quality, Support –<br className="hidden sm:block" /> That&apos;s Our Promise</span>
          </h2>
          <p className="mt-2 max-w-xl text-[11px] font-medium leading-5 text-slate-600 sm:text-xs">
            We don&apos;t just supply products—we deliver complete solutions with engineering, installation and dependable after-sales support.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
            {promiseItems.map((item) => (
              <article key={item.title} className="home-promise-card flex min-h-[150px] flex-col border bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.035)] sm:min-h-[158px] sm:p-4">
                <span className="home-promise-icon inline-flex h-10 w-10 items-center justify-center rounded-full">
                  <LineIcon kind={item.icon} />
                </span>
                <h3 className="home-promise-card-title mt-3 font-extrabold text-[#071936]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[9.5px] font-medium leading-[1.55] text-slate-600 sm:text-[10px]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside aria-label="Sasha Corporation experience and coverage" className="home-promise-stats grid grid-cols-2 rounded-xl bg-[#f8fafc] p-2 shadow-[0_8px_24px_rgba(15,23,42,0.035)] sm:grid-cols-4 lg:col-span-1 lg:px-4 lg:py-2">
          {companyStats.map((stat, index) => (
            <div key={stat.label} className={`home-promise-stat flex items-center gap-3 px-2 py-3 lg:px-0 ${index > 0 ? "lg:border-t lg:border-slate-200/80" : ""}`}>
              <span className="home-stat-icon inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm">
                <LineIcon kind={stat.icon} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xl font-black leading-none text-[#123f95] sm:text-[22px]">{stat.value}</p>
                <p className="mt-1 text-[8px] font-bold leading-3 text-slate-600 sm:text-[9px]">{stat.label}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
