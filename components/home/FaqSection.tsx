type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "What is the difference between indoor and outdoor LED display?",
    answer:
      "Indoor LED display models are built for closer viewing distances, controlled lighting and higher fine-pitch clarity. Outdoor LED display solutions are designed with stronger brightness, weather protection and structure planning for open-air visibility in Bangladesh conditions.",
  },
  {
    id: 2,
    question: "How do I choose the right pixel pitch?",
    answer:
      "The right pixel pitch depends on viewing distance, screen size, content type and budget. For showrooms, meeting rooms and indoor branding, a finer pitch is usually better. For larger roadside, rooftop or field visibility, the recommended pitch is based on how far viewers will stand from the screen.",
  },
  {
    id: 3,
    question: "What details are needed before a quotation?",
    answer:
      "A practical quotation usually starts with screen size, indoor or outdoor use, installation location, preferred resolution direction, structure requirements, controller preference and project timeline. If you already have a BOQ or tender scope, that helps us align the solution faster.",
  },
  {
    id: 4,
    question: "Do you support BOQ, tender and government projects?",
    answer:
      "Yes. We can review BOQ, project scope, specification alignment and quotation support for commercial, institutional and government-focused requirements. The exact documentation depends on the tender or procurement scope.",
  },
  {
    id: 5,
    question: "Which controller brands do you work with?",
    answer:
      "Depending on project need, we work with well-known controller ecosystem options such as NovaStar, Huidu and Colorlight, alongside the matching receiving card, power and configuration planning needed for stable operation.",
  },
  {
    id: 6,
    question: "How do you ensure stable power and reliability?",
    answer:
      "Reliable performance comes from proper power-supply selection, controller matching, cabinet quality, ventilation awareness, structured wiring and installation discipline. We focus on dependable branded components and project-suitable planning to reduce avoidable risk.",
  },
  {
    id: 7,
    question: "What is the usual project lead time in Bangladesh?",
    answer:
      "Lead time depends on display size, stock availability, customization, structure scope and site readiness. Smaller standard projects can move faster, while larger custom or multi-category installations may require more planning, fabrication and testing time.",
  },
  {
    id: 8,
    question: "Do you provide warranty and after-sales support?",
    answer:
      "Yes. We support projects with after-sales guidance, troubleshooting direction and service follow-up based on the supplied solution. Warranty terms vary by product category and component scope.",
  },
  {
    id: 9,
    question: "Can you manage structure, safety and commissioning?",
    answer:
      "Yes. Our workflow can include structure planning, site coordination, installation execution, controller setup, calibration and testing so the final output is safer, cleaner and ready for operation.",
  },
  {
    id: 10,
    question: "Do you provide training after handover?",
    answer:
      "Yes. After handover, we can guide your team on basic operating workflow, content update direction, controller usage and routine care so day-to-day management becomes easier.",
  },
];

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[linear-gradient(180deg,rgba(248,250,252,0.92)_0%,rgba(255,255,255,1)_22%,rgba(248,250,252,0.95)_100%)] py-6 md:py-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex items-center rounded-full border border-sky-100 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-sky-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 pb-0 text-[22px] font-extrabold tracking-tight text-slate-900 after:hidden md:text-[30px] lg:whitespace-nowrap lg:text-[36px]">
            FAQs for LED display, audio and access control projects in Bangladesh
          </h2>
          <p className="mt-2 text-[12.5px] leading-6 text-slate-600 md:text-[13.5px] lg:whitespace-nowrap">
            Practical answers for planning LED display, PA system, conference and access-control solutions in Bangladesh before quotation, installation and long-term support.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group rounded-[16px] border border-slate-200/80 bg-white/96 shadow-[0_10px_22px_rgba(15,23,42,0.05)] transition duration-300 open:shadow-[0_14px_30px_rgba(15,23,42,0.075)]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-2.5 p-3.5 marker:hidden">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-[12px] font-semibold text-sky-700">
                  {item.id}
                </span>
                <span className="min-w-0 flex-1 text-left text-[14px] font-bold leading-6 text-slate-900 lg:whitespace-nowrap">
                  {item.question}
                </span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 group-open:bg-slate-900 group-open:text-white">
                  <PlusIcon />
                </span>
              </summary>

              <div className="px-3.5 pb-3.5">
                <div className="ml-10 border-l border-slate-200 pl-3">
                  <p className="text-[13px] leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
