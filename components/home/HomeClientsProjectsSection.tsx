import Image from "next/image";

const clientOrganizations = [
  { name: "Ministry of Health and Family Welfare", logo: "/assets/clients/organizations/Health-and-family-welfare.webp" },
  { name: "National Board of Revenue, Bangladesh", logo: "/assets/clients/organizations/nbr.webp" },
  { name: "Bangladesh Election Commission", logo: "/assets/clients/organizations/ecs.webp" },
  { name: "Department of Immigration & Passports", logo: "/assets/clients/organizations/passport.webp" },
  { name: "Bangladesh Public Service Commission", logo: "/assets/clients/organizations/bpsc.webp" },
  { name: "Anti-Corruption Commission (ACC)", logo: "/assets/clients/organizations/acc.webp" },
  { name: "Dhaka North City Corporation", logo: "/assets/clients/organizations/dncc.webp" },
  { name: "Dhaka South City Corporation", logo: "/assets/clients/organizations/dscc.webp" },
  { name: "Sonali Bank PLC", logo: "/assets/clients/organizations/sonali-bank.webp" },
  { name: "Bangladesh Small and Cottage Industries Corporation (BSCIC)", logo: "/assets/clients/organizations/BSCIC.webp" },
  { name: "Fire Service and Civil Defence Bangladesh", logo: "/assets/clients/organizations/fire-service.webp" },
  { name: "University Grants Commission of Bangladesh", logo: "/assets/clients/organizations/ugc.webp" },
  { name: "Bangladesh Ansar and Village Defence Party", logo: "/assets/clients/organizations/ansar.webp" },
  { name: "Bangladesh House Building Finance Corporation", logo: "/assets/clients/organizations/bhbfc-logo-final.webp" },
  { name: "Bangladesh Public Administration Training Centre (BPATC)", logo: "/assets/clients/organizations/bpatc.webp" },
] as const;

const solutionAreas = [
  "LED Display Projects",
  "Conference System Projects",
  "PA System Projects",
  "Turnstile Gate Projects",
] as const;

function ClientsBadgeIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d9e7fb] bg-[#edf4ff] text-[#1456d9]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10a2.5 2.5 0 1 0 0-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M3.5 19v-1.2A4.8 4.8 0 0 1 8.3 13h.4a4.8 4.8 0 0 1 4.8 4.8V19M14 13.4a4 4 0 0 1 6.5 3.1V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ClientsTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d9e7fb] bg-[#edf4ff] text-[#1456d9] md:inline-flex"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10a2.5 2.5 0 1 0 0-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M3.5 19v-1.2A4.8 4.8 0 0 1 8.3 13h.4a4.8 4.8 0 0 1 4.8 4.8V19M14 13.4a4 4 0 0 1 6.5 3.1V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function HomeClientsProjectsSection() {
  return (
    <section
      id="home-clients-projects"
      aria-labelledby="home-clients-projects-title"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6"
    >
      <div className="text-left">
        <span className="home-section-badge">
          <ClientsBadgeIcon />
          <span>Clients &amp; Technology Projects</span>
        </span>
      </div>

      <h2
        id="home-clients-projects-title"
        className="mt-2 flex max-w-5xl items-center gap-2 !pb-0 text-xl font-extrabold leading-7 tracking-tight text-[#071936] after:!hidden lg:text-[22px]"
      >
        <ClientsTitleIcon />
        <span className="min-w-0 text-balance">
          Trusted by Government, Corporate &amp; Institutional Clients <span className="text-[#1660e8]">Across Bangladesh</span>
        </span>
      </h2>

      <p className="home-section-subtitle mt-1 w-full font-medium leading-5 text-slate-600">
        Sasha Corporation supports government, corporate, commercial and institutional projects with{" "}
        <strong className="font-bold text-slate-900">LED Display</strong>,{" "}
        <strong className="font-bold text-slate-900">Conference System</strong>,{" "}
        <strong className="font-bold text-slate-900">PA System</strong> and{" "}
        <strong className="font-bold text-slate-900">Turnstile Gate</strong> solutions across Bangladesh. Our project
        delivery includes site survey, BOQ planning, professional installation, system integration, commissioning and
        dependable after-sales technical support.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-700 md:gap-2 md:text-xs">
        {solutionAreas.map((area) => (
          <span
            key={area}
            className="whitespace-nowrap rounded-full border border-[#d9e7fb] bg-[#f5f8ff] px-3 py-1.5 text-[#174ea6] md:px-4 md:py-2"
          >
            {area}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-slate-50/55 p-3 md:p-4">
        <div
          className="group relative min-h-[112px] overflow-hidden rounded-lg border border-[#dce9fb] bg-white px-3"
          aria-label="Selected government, corporate and institutional client organizations"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/90 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/90 to-transparent" />

          <div className="flex w-max animate-[renexMarquee_48s_linear_infinite] items-center py-2 group-hover:[animation-play-state:paused] motion-reduce:transform-none motion-reduce:animate-none">
            {[false, true].map((isClone) => (
              <div
                key={isClone ? "home-client-visual-clone" : "home-client-canonical-track"}
                className="flex shrink-0 gap-3 pr-3"
                aria-hidden={isClone ? "true" : undefined}
                inert={isClone ? true : undefined}
                role={isClone ? "presentation" : undefined}
              >
                {clientOrganizations.map((client) => (
                  <article
                    key={`${client.name}-${isClone ? "visual-clone" : "canonical"}`}
                    className="flex h-[96px] w-[144px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#dce9fb] bg-slate-50 px-3 py-2 text-center md:h-[108px] md:w-[164px]"
                    title={isClone ? undefined : client.name}
                    aria-label={isClone ? undefined : client.name}
                  >
                    <Image
                      src={client.logo}
                      alt={isClone ? "" : `${client.name} logo`}
                      aria-hidden={isClone ? "true" : undefined}
                      width={132}
                      height={56}
                      className="h-11 w-full object-contain md:h-12"
                    />
                    <p className="mt-1.5 line-clamp-2 max-w-[130px] text-center text-[10px] font-semibold leading-3.5 text-slate-700 md:max-w-[148px] md:text-[11px] md:leading-4">
                      {client.name}
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
