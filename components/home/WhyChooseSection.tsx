import Link from "next/link";

type WhyChooseItem = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  accentClassName: string;
  icon: React.ReactNode;
};

const whyChooseItems: WhyChooseItem[] = [
  {
    title: "Project-first consultation",
    description:
      "We align BOQ, site condition, viewing distance and product scope early so your LED display or audio project starts with fewer mistakes.",
    href: "/contact/",
    linkLabel: "Discuss your requirement",
    accentClassName: "text-sky-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H10l-4 3v-3.2A2.5 2.5 0 0 1 5 13.5v-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Specification & quotation clarity",
    description:
      "From pixel pitch and cabinet structure to controller, receiving card and power planning, we keep pricing direction more practical and easier to compare.",
    href: "/services/",
    linkLabel: "See planning support",
    accentClassName: "text-emerald-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M7 4h8l4 4v12H7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M15 4v4h4M10 12h6M10 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Reliable branded components",
    description:
      "We focus on stable component selection for Bangladesh conditions so performance, power stability and long-term maintenance stay more dependable.",
    href: "/led-display/",
    linkLabel: "Browse LED solutions",
    accentClassName: "text-orange-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m9.2 12.3 1.8 1.8 3.8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Installation with testing",
    description:
      "Our workflow covers installation, alignment, controller setup and commissioning so display, conference and access-control systems go live with confidence.",
    href: "/projects/",
    linkLabel: "View executed projects",
    accentClassName: "text-violet-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M4 17h16M6.5 17V9.5L12 6l5.5 3.5V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "After-sales support that continues",
    description:
      "Training, troubleshooting guidance and maintenance support help your team operate LED display, PA system and digital podium solutions more smoothly.",
    href: "/services-support/",
    linkLabel: "Check support coverage",
    accentClassName: "text-cyan-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M4 13a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="3" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="17" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 19v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Solutions across multiple categories",
    description:
      "One experienced team can support LED display, PA system, conference system, interactive panel and turnstile projects without fragmented coordination.",
    href: "/products/",
    linkLabel: "Explore product categories",
    accentClassName: "text-rose-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(248,250,252,0.92)_48%,rgba(255,255,255,1)_100%)] py-10 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-orange-100 bg-white px-4 py-2 text-[12px] font-semibold text-orange-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            Why Choose Sasha Corporation
          </span>
          <h2 className="mt-5 pb-0 text-[28px] font-extrabold tracking-tight text-slate-900 after:hidden md:text-[40px]">
            Why businesses in Bangladesh choose our technology solutions
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[15px]">
            We combine planning clarity, dependable components, installation execution and long-term support to help LED display, PA system, conference and access-control projects move faster with better confidence.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {whyChooseItems.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col rounded-[18px] border border-slate-200/80 bg-white/96 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-start gap-3">
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-slate-200 bg-slate-50 ${item.accentClassName}`}>
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[20px] font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>

              <Link
                href={item.href}
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold text-sky-700 transition group-hover:text-sky-800"
              >
                <span>{item.linkLabel}</span>
                <span className="transition group-hover:translate-x-0.5 motion-reduce:transition-none">
                  <ArrowRight />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
