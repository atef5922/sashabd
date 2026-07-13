import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "Return policy for Sasha Corporation covering eligibility, non-returnable items, reporting timeline, inspection, and resolution process.",
  alternates: { canonical: "/return-policy/" },
  openGraph: {
    title: `Return Policy | ${BRAND_NAME}`,
    description:
      "Read return, replacement, and reporting conditions for LED display products and accessories.",
    url: "/return-policy",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: `Return Policy | ${BRAND_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Return Policy | ${BRAND_NAME}`,
    description:
      "Read return, replacement, and reporting conditions for LED display products and accessories.",
    images: [socialImageUrl()],
  },
};

export default function ReturnPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/return-policy/", label: "Return Policy", current: true },
        ]}
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6A00]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-300">
          Return & Replacement Terms
        </span>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Return Policy
          <span className="mt-2 block h-1.5 w-20 rounded-full bg-[#FF6A00]" />
        </h1>
        <p className="mt-4 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-7 text-slate-200 backdrop-blur-sm md:p-5">
          This policy explains how {BRAND_NAME} handles return, replacement, and issue resolution for products
          and accessories. We aim to provide fair, transparent, and practical support for genuine product concerns.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-900">1. Return Eligibility</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Item must match invoice/order reference and serial/batch trace where applicable.</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Issue must be reported within the agreed return reporting window.</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Product should be in original condition without unauthorized modification.</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Supporting evidence (photos/video/testing note) may be required for faster assessment.</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">2. Non-Returnable Conditions</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Damage caused by incorrect voltage, water exposure, or improper installation.</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Products altered, repaired, or opened by unauthorized personnel.</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Custom-built or project-specific items after confirmed acceptance.</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Consumables or items marked non-returnable in quotation/work order.</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">3. Return and Resolution Process</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {[
            "Submit issue with invoice/order details",
            "Technical review and remote troubleshooting",
            "Physical inspection (if required)",
            "Decision: replacement, repair, or service guidance",
            "Close case with confirmation and documentation",
          ].map((step, idx) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="text-xs font-bold text-[#FF6A00]">Step {idx + 1}</div>
              <div className="mt-1 leading-6">{step}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">4. Shipping and Handling</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Return logistics responsibility depends on issue type and agreement terms. In approved cases, packing must
            protect modules, cards, or power units from transit damage.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-900">5. Important Notes</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Return policy works alongside warranty and service scope. Final decision follows technical assessment and
            documented order terms to ensure fair resolution for both sides.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Need Return Support?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          If you need help with product return, replacement request, or technical verification, contact our support team
          with order details for faster resolution.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#E45700]">
            Contact Support
          </Link>
          <Link href="/terms/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50">
            Terms and Conditions
          </Link>
        </div>
      </section>
    </main>
  );
}


