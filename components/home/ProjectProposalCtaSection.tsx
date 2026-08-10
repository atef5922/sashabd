"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

function ProposalTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto mb-1 flex h-8 w-8 -translate-y-0.5 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] align-middle shadow-[0_10px_22px_rgba(0,105,168,0.12)] md:mb-0 md:ml-0 md:mr-2 md:inline-flex md:h-9 md:w-9"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none">
        <path
          d="M7 4h7l3 3v13H7V4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M14 4v4h4M10 12h4M10 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="m16.7 14.6 1.1 1.1 2-2.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ProjectProposalCtaSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const whatsappHref = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.88)_0%,rgba(255,255,255,1)_100%)] py-3.5 md:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="pb-0 text-[22px] font-extrabold leading-tight tracking-tight text-slate-900 after:hidden md:text-[34px]">
            <ProposalTitleIcon />
            <span>Planning a new LED screen, audio or access project?</span>
          </h2>
          <div className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[15px]">
            <p className="hidden md:block">
              Share your BOQ, screen size target or project concept and we will recommend a practical solution path covering
              display type, pixel pitch, controller, power and installation direction.
            </p>
            <div className="md:hidden">
              {mobileExpanded ? (
                <p className="text-[13px] leading-5 text-slate-600">
                  Share your BOQ, screen size target or project concept and we will recommend a practical solution path
                  covering display type, pixel pitch, controller, power and installation direction.
                </p>
              ) : (
                <p className="mx-auto max-w-full truncate text-[13px] leading-5">
                  Share your BOQ, screen size target or project concept and we will recommend a practical solution path...
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

          <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <Link
              href="/contact/"
              prefetch={false}
              className="inline-flex min-h-[2.85rem] w-full min-w-0 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#0f7d99,#0f6a90)] px-2.5 py-2.5 text-center text-[11px] font-extrabold leading-[1.2] text-white shadow-[0_10px_24px_rgba(14,116,144,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(14,116,144,0.26)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-w-[252px] sm:rounded-[16px] sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Get a custom project proposal
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[2.85rem] w-full min-w-0 items-center justify-center rounded-[12px] border border-slate-300 bg-white px-2.5 py-2.5 text-center text-[11px] font-extrabold leading-[1.2] text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-w-[252px] sm:rounded-[16px] sm:px-6 sm:py-3.5 sm:text-sm"
            >
              WhatsApp our engineering team
            </a>
          </div>

          <p className="mt-2 text-[12px] leading-6 text-slate-500 md:text-[13px]">
            You can also send BOQ, tender scope or e-GP-related project details by email or WhatsApp for faster review.
          </p>
        </div>
      </div>
    </section>
  );
}
