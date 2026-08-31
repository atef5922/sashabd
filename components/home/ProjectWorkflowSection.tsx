"use client";

import { useState } from "react";
import Link from "next/link";

type WorkflowStep = {
  step: string;
  phase: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  phaseClassName: string;
};

const workflowSteps: WorkflowStep[] = [
  {
    step: "Step 01",
    phase: "Consult",
    title: "Requirement Review & Site Discussion",
    description:
      "We review your BOQ, display size, placement goals and site conditions so the project scope stays clear from the beginning.",
    href: "/contact/",
    linkLabel: "Talk about your project",
    phaseClassName: "text-sky-700",
  },
  {
    step: "Step 02",
    phase: "Plan",
    title: "Design, Specification & Quotation",
    description:
      "Our team aligns pixel pitch, structure, controller, power and budget planning into a quotation-ready recommendation for Bangladesh projects.",
    href: "/services-support/",
    linkLabel: "See our service approach",
    phaseClassName: "text-emerald-700",
  },
  {
    step: "Step 03",
    phase: "Build",
    title: "Installation, Setup & Commissioning",
    description:
      "We handle installation, calibration, controller setup and final testing so your LED display, PA system or access control solution runs smoothly.",
    href: "/projects/",
    linkLabel: "Explore completed work",
    phaseClassName: "text-orange-700",
  },
  {
    step: "Step 04",
    phase: "Support",
    title: "Training, Handover & After-Sales Care",
    description:
      "After delivery, we guide your team with operating basics, usage support and maintenance direction for dependable long-term performance.",
    href: "/services-support/",
    linkLabel: "View support details",
    phaseClassName: "text-violet-700",
  },
];

function getMobileWorkflowCardClassName(phaseClassName: string) {
  if (phaseClassName.includes("sky")) {
    return "border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-sky-100/80";
  }
  if (phaseClassName.includes("emerald")) {
    return "border-emerald-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-emerald-100/80";
  }
  if (phaseClassName.includes("orange")) {
    return "border-orange-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-orange-100/80";
  }
  return "border-violet-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-violet-100/80";
}

function WorkflowBadgeIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
        <path
          d="M5 6h6l2 3h6v9H5V6Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path d="M8 13h8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function WorkflowTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[0_10px_22px_rgba(0,105,168,0.12)] md:mr-2 md:inline-flex md:h-9 md:w-9"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none">
        <path
          d="M6 6h3v3H6V6ZM15 6h3v3h-3V6ZM6 15h3v3H6v-3ZM15 15h3v3h-3v-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 7.5h6M16.5 9v6M15 16.5H9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5 12h11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m12 7 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectWorkflowSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <section id="home-project-workflow" className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6">
      <div className="w-full">
        <div className="max-w-5xl text-left">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#ef4a00]">
            <WorkflowBadgeIcon />
            <span>Our Project Workflow</span>
          </span>
          <h2 className="mt-2 flex items-center gap-2 !pb-0 text-xl font-extrabold leading-7 tracking-tight text-[#071936] after:!hidden lg:text-[22px]">
            <WorkflowTitleIcon />
            <span>How Sasha Corporation handles project workflow in Bangladesh</span>
          </h2>
          <div className="mt-1 text-[12.5px] font-medium leading-5 text-slate-600 md:text-[13px]">
            <p className="hidden md:block">
              From consultation and engineering to installation, training and support, our workflow helps LED display, PA system,
              conference and access-control projects move forward with clear planning and reliable execution.
            </p>
            <div className="md:hidden">
              {mobileExpanded ? (
                <p className="text-[13px] leading-5 text-slate-600">
                  From consultation and engineering to installation, training and support, our workflow helps LED display,
                  PA system, conference and access-control projects move forward with clear planning and reliable execution.
                </p>
              ) : (
                <p className="mx-auto max-w-full truncate text-[13px] leading-5">
                  From consultation and engineering to installation, training and support, our workflow helps...
                </p>
              )}
              <button
                type="button"
                onClick={() => setMobileExpanded((prev) => !prev)}
                className="mt-1 inline-flex items-center justify-center text-[12px] font-semibold text-[#F56605]"
              >
                {mobileExpanded ? "Show less" : "Learn more"}
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-5 hidden lg:block">
          <div className="absolute left-[5.5rem] right-[5.5rem] top-1/2 -translate-y-1/2 border-t border-dashed border-slate-300/90" />
          <div className="grid grid-cols-4 gap-5">
            {workflowSteps.map((item) => (
              <div key={item.step} className="relative flex justify-start">
                <span
                  className={`inline-flex items-center rounded-[18px] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.05)] ${item.phaseClassName}`}
                >
                  {item.phase}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {workflowSteps.map((item) => (
            <article
              key={item.title}
              className={`group flex h-full flex-col overflow-hidden rounded-xl border p-4 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] md:p-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${getMobileWorkflowCardClassName(item.phaseClassName)}`}
            >
              <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.03em] text-slate-600">
                {item.step}
              </div>

              <h3 className="mt-4 text-[20px] font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-7 text-slate-600">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span>{item.phase}</span>
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
