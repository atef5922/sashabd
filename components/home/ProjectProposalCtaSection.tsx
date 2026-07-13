import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function ProjectProposalCtaSection() {
  const whatsappHref = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.88)_0%,rgba(255,255,255,1)_100%)] py-9 md:py-11">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="pb-0 text-[24px] font-extrabold tracking-tight text-slate-900 after:hidden md:text-[34px]">
            Planning a new LED screen, audio or access project?
          </h2>
          <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[15px]">
            Share your BOQ, screen size target or project concept and we will recommend a practical solution path covering display type, pixel pitch, controller, power and installation direction.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              prefetch={false}
              className="inline-flex min-w-[252px] items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#0f7d99,#0f6a90)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(14,116,144,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(14,116,144,0.26)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Get a custom project proposal
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[252px] items-center justify-center rounded-[16px] border border-slate-300 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              WhatsApp our engineering team
            </a>
          </div>

          <p className="mt-5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
            You can also send BOQ, tender scope or e-GP-related project details by email or WhatsApp for faster review.
          </p>
        </div>
      </div>
    </section>
  );
}
