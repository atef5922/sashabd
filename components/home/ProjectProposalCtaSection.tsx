"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

function ProposalTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[0_10px_22px_rgba(0,105,168,0.12)] md:mr-2 md:inline-flex md:h-9 md:w-9"
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
    <section id="home-project-proposal" className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-[#172c53] bg-[#071936] px-4 py-6 shadow-[0_8px_28px_rgba(7,25,54,0.18)] sm:px-6 md:py-8">
      <Image
        src="/assets/projects/Project-hero.webp"
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 90vw"
        className="pointer-events-none absolute inset-0 object-cover object-center"
        style={{ opacity: 0.82 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(7,25,54,.38) 0%, rgba(7,25,54,.2) 50%, transparent 78%), linear-gradient(90deg, rgba(7,25,54,.82) 0%, rgba(7,25,54,.72) 38%, rgba(7,25,54,.58) 66%, rgba(7,25,54,.48) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.24),transparent_30%),linear-gradient(120deg,transparent_0%,rgba(255,106,0,0.08)_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mx-auto text-center">
          <h2 className="!pb-0 text-[22px] font-extrabold leading-tight tracking-tight text-white after:!hidden md:text-[30px]">
            <ProposalTitleIcon />
            <span>Planning a new LED screen, audio or access project?</span>
          </h2>
          <div className="mt-2 text-[13px] leading-7 text-slate-200 md:text-[15px]">
            <p className="hidden md:block text-slate-200">
              Share your BOQ, screen size target or project concept and we will recommend a practical solution path covering
              display type, pixel pitch, controller, power and installation direction.
            </p>
            <div className="md:hidden">
              {mobileExpanded ? (
                <p className="text-[13px] leading-5 text-slate-200">
                  Share your BOQ, screen size target or project concept and we will recommend a practical solution path
                  covering display type, pixel pitch, controller, power and installation direction.
                </p>
              ) : (
                <p className="mx-auto max-w-full truncate text-[13px] leading-5 text-slate-200">
                  Share your BOQ, screen size target or project concept and we will recommend a practical solution path...
                </p>
              )}
              <button
                type="button"
                onClick={() => setMobileExpanded((prev) => !prev)}
                  className="mt-1 inline-flex items-center justify-center text-[12px] font-semibold text-orange-300"
              >
                {mobileExpanded ? "Show less" : "Learn more"}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-2.5">
            <Link
              href="/contact/"
              prefetch={false}
              className="inline-flex min-h-10 w-full min-w-0 items-center justify-center rounded-md bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-4 py-2.5 text-center text-[11px] font-extrabold leading-[1.2] text-white shadow-[0_8px_20px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(255,94,0,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:min-w-[230px] sm:text-xs"
            >
              Get a custom project proposal
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 w-full min-w-0 items-center justify-center rounded-md border border-white/45 bg-white/10 px-4 py-2.5 text-center text-[11px] font-extrabold leading-[1.2] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:min-w-[230px] sm:text-xs"
            >
              WhatsApp our engineering team
            </a>
          </div>

          <p className="mt-3 text-[12px] leading-6 text-slate-300 md:text-[13px]">
            You can also send BOQ, tender scope or e-GP-related project details by email or WhatsApp for faster review.
          </p>
        </div>
      </div>
    </section>
  );
}
