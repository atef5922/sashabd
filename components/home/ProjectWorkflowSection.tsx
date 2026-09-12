import HomeSectionHeadingIcon from "./HomeSectionHeadingIcon";

type ProcessIconKind = "consultation" | "survey" | "design" | "installation" | "support";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: ProcessIconKind;
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description: "We understand your requirements and provide initial recommendations.",
    icon: "consultation",
  },
  {
    number: "02",
    title: "Site Survey",
    description: "Our team visits your site to analyze and collect detailed information.",
    icon: "survey",
  },
  {
    number: "03",
    title: "Design & BOQ",
    description: "We design the solution and provide BOQ, specifications & quotation.",
    icon: "design",
  },
  {
    number: "04",
    title: "Installation",
    description: "Professional installation by experienced engineers with quality assurance.",
    icon: "installation",
  },
  {
    number: "05",
    title: "Support",
    description: "After-sales support, maintenance & technical assistance whenever needed.",
    icon: "support",
  },
];

function ProcessIcon({ kind }: { kind: ProcessIconKind }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true" {...common}>
      {kind === "consultation" || kind === "support" ? (
        <>
          <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
          <path d="M4 12H2.8A1.8 1.8 0 0 0 1 13.8v3.4A1.8 1.8 0 0 0 2.8 19H6v-7H4ZM20 12h1.2a1.8 1.8 0 0 1 1.8 1.8v3.4a1.8 1.8 0 0 1-1.8 1.8H18v-7h2Z" />
          <path d="M18 19c-.8 1.3-2.2 2-4.2 2H12" />
          {kind === "consultation" ? <path d="M9 14h6M12 11v6" /> : null}
        </>
      ) : kind === "survey" ? (
        <>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5" />
          <path d="m8 9 .8.8L10.4 8M8 13l.8.8 1.6-1.8M8 17l.8.8 1.6-1.8" />
        </>
      ) : kind === "design" ? (
        <>
          <path d="M4 5h11M4 5v14h14v-7" />
          <path d="m11 15 1-4 7-7a1.4 1.4 0 0 1 2 2l-7 7-3 2Z" />
          <path d="M2 9h4M2 15h4M9 17v4M15 17v4" />
        </>
      ) : (
        <>
          <path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-7.2 7.2a2.1 2.1 0 1 1-3-3l7.2-7.2a4 4 0 0 1 5-5l-3 3 3 3Z" />
          <path d="m14 14 7 7M16 12l2-2M19 15l2-2" />
        </>
      )}
    </svg>
  );
}

export default function ProjectWorkflowSection() {
  return (
    <section id="home-project-workflow" className="home-process-section scroll-mt-24" aria-labelledby="home-process-title">
      <div className="home-process-heading">
        <p className="home-process-eyebrow home-section-badge">
          <HomeSectionHeadingIcon kind="process" size="badge" />
          <span>Our Process</span>
        </p>
        <h2 id="home-process-title" className="home-process-title flex items-center gap-2 !pb-0 after:!hidden">
          <HomeSectionHeadingIcon kind="process" />
          <span>How <span className="text-[#1660e8]">We Work</span></span>
        </h2>
        <p className="home-process-intro home-section-subtitle">A simple, transparent process that ensures the best results for your project.</p>
      </div>

      <div className="home-process-grid">
        {processSteps.map((item, index) => (
          <article key={item.number} className="home-process-step">
            <div className="home-process-node-row">
              <span className="home-process-number" aria-hidden="true">{item.number}</span>
              <span className="home-process-icon">
                <ProcessIcon kind={item.icon} />
              </span>
              {index < processSteps.length - 1 ? <span className="home-process-connector" aria-hidden="true" /> : null}
            </div>
            <h3 className="home-process-step-title !pb-0 after:!hidden">{item.title}</h3>
            <p className="home-process-description">{item.description}</p>
          </article>
        ))}
      </div>

      <style>{`
        .home-process-section {
          overflow: hidden;
          padding: 27px 31px 41px;
          background:
            radial-gradient(circle at 92% 10%, rgba(235, 243, 255, .82), transparent 33%),
            linear-gradient(115deg, #ffffff 0%, #fbfdff 55%, #f7faff 100%);
        }
        .home-process-section, .home-process-section * { text-align: left; }
        .home-process-eyebrow {
          color: #1456d9 !important;
          font-size: var(--site-section-badge-size) !important;
          font-weight: 800;
          line-height: var(--site-section-badge-line-height) !important;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .home-process-title {
          margin-top: 10px;
          color: #071936 !important;
          font-size: var(--site-h2-size) !important;
          font-weight: 800;
          line-height: 25px !important;
          letter-spacing: -.025em;
        }
        .home-process-intro {
          margin-top: 10px;
          color: #43516a !important;
          font-size: var(--site-section-subtitle-size) !important;
          font-weight: 500;
          line-height: 16px !important;
        }
        .home-process-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          margin-top: 27px;
        }
        .home-process-step {
          position: relative;
          min-width: 0;
          transition: transform 220ms ease;
        }
        .home-process-step:hover { transform: translateY(-3px); }
        .home-process-node-row { position: relative; height: 76px; }
        .home-process-number {
          position: absolute;
          left: 4px;
          top: 24px;
          z-index: 1;
          color: #dce8fa !important;
          font-size: 23px !important;
          font-weight: 800;
          line-height: 28px !important;
          transition: color 220ms ease;
        }
        .home-process-step:hover .home-process-number {
          color: #93baf3 !important;
        }
        .home-process-icon {
          position: absolute;
          left: 50%;
          top: 0;
          z-index: 2;
          display: flex;
          width: 72px;
          height: 72px;
          transform: translateX(-50%);
          align-items: center;
          justify-content: center;
          border: 1px solid #e5ebf5;
          border-radius: 999px;
          background: rgba(255,255,255,.98) !important;
          color: #0b56d9 !important;
          box-shadow: 0 9px 21px rgba(31, 65, 114, .12), inset 0 1px 0 rgba(255,255,255,.9);
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease, color 220ms ease, box-shadow 220ms ease;
        }
        .home-process-step:hover .home-process-icon {
          transform: translateX(-50%) scale(1.07);
          border-color: #0b56d9;
          background: linear-gradient(135deg, #0b56d9 0%, #2563eb 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 14px 28px rgba(11, 86, 217, .25), inset 0 1px 0 rgba(255,255,255,.24);
        }
        .home-process-connector {
          position: absolute;
          left: calc(50% + 45px);
          right: -4px;
          top: 35px;
          border-top: 1px dashed #9fbbe9;
          transition: border-color 220ms ease, opacity 220ms ease;
        }
        .home-process-step:hover .home-process-connector {
          border-color: #2563eb;
          opacity: 1;
        }
        .home-process-step-title {
          margin-top: 9px;
          color: #071936 !important;
          font-size: 13px !important;
          font-weight: 800;
          line-height: 17px !important;
          text-align: center !important;
          transition: color 220ms ease;
        }
        .home-process-step:hover .home-process-step-title {
          color: #1456d9 !important;
        }
        .home-process-description {
          margin: 9px auto 0;
          max-width: 128px;
          color: #43516a !important;
          font-size: 9px !important;
          font-weight: 500;
          line-height: 16px !important;
          text-align: center !important;
        }
        @media (max-width: 767px) {
          .home-process-section { padding: 24px 18px 26px; }
          .home-process-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; margin-top: 24px; }
          .home-process-step { display: grid; grid-template-columns: 86px minmax(0, 1fr); grid-template-rows: auto auto; min-height: 76px; }
          .home-process-node-row { grid-row: 1 / 3; height: 76px; }
          .home-process-number { left: 0; top: 24px; font-size: 18px !important; }
          .home-process-icon { left: 50px; width: 64px; height: 64px; }
          .home-process-icon svg { width: 27px; height: 27px; }
          .home-process-connector { left: 49px; right: auto; top: 68px; width: 1px; height: 25px; border-top: 0; border-left: 1px dashed #9fbbe9; }
          .home-process-step-title { align-self: end; margin-top: 8px; text-align: left !important; }
          .home-process-description { margin: 5px 0 0; max-width: 300px; text-align: left !important; }
        }
        @media (min-width: 1100px) {
          .home-process-section { padding-left: 42px; padding-right: 42px; }
          .home-process-step-title { font-size: 14px !important; }
          .home-process-description { max-width: 150px; font-size: 10px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-process-step,
          .home-process-icon,
          .home-process-connector,
          .home-process-step-title,
          .home-process-number {
            transition: none;
          }
          .home-process-step:hover { transform: none; }
          .home-process-step:hover .home-process-icon { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
