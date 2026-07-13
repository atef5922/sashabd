import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for Sasha Corporation covering quotations, project scope, delivery, installation, warranty, payment, and support responsibilities.",
  alternates: { canonical: "/terms/" },
  openGraph: {
    title: `Terms & Conditions | ${BRAND_NAME}`,
    description:
      "Understand service, quotation, delivery, installation, warranty, and support terms for LED display projects in Bangladesh.",
    url: "/terms",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: `Terms & Conditions | ${BRAND_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms & Conditions | ${BRAND_NAME}`,
    description:
      "Understand service, quotation, delivery, installation, warranty, and support terms for LED display projects in Bangladesh.",
    images: [socialImageUrl()],
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/terms/", label: "Terms and Conditions", current: true },
        ]}
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6A00]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-300">
          Terms & Service Conditions
        </span>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Terms and Conditions
          <span className="mt-2 block h-1.5 w-20 rounded-full bg-[#FF6A00]" />
        </h1>
        <p className="mt-4 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-7 text-slate-200 backdrop-blur-sm md:p-5">
          These terms apply to use of this website and to quotation, supply, installation, and support services offered
          by {BRAND_NAME}. By using this site or placing an order request, you agree to these terms.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          {
            t: "1. Quotations and Validity",
            d: "All quotations are indicative unless marked final. Price, component availability, and delivery timeline may change based on market conditions and project scope.",
          },
          {
            t: "2. Scope of Work",
            d: "Project scope includes only items stated in the quotation or agreement. Additional structure, civil, or electrical tasks are treated as separate scope unless included.",
          },
          {
            t: "3. Payment Terms",
            d: "Payment milestones are defined in the quotation or work order. Work progress and delivery may depend on milestone clearance.",
          },
          {
            t: "4. Delivery and Installation",
            d: "Delivery or installation timelines may vary due to logistics, site readiness, weather, utility, or force majeure conditions.",
          },
          {
            t: "5. Site Readiness",
            d: "Client is responsible for safe access, approved structure, stable power, grounding, and required permissions unless agreed otherwise in writing.",
          },
          {
            t: "6. Warranty and Support",
            d: "Warranty coverage and duration depend on product category and proposal terms. Damage from misuse, voltage instability, or unauthorized modification is excluded.",
          },
          {
            t: "7. Content and Usage Compliance",
            d: "Client is responsible for lawful and compliant display content. We do not accept liability for third-party copyright, regulatory, or public policy violations.",
          },
          {
            t: "8. Revisions and Updates",
            d: "We may update these terms to reflect operational or legal changes. Latest published version on this website is considered effective.",
          },
        ].map((item) => (
          <article key={item.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">{item.t}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Contact for Clarification</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          For contract-specific terms, warranty details, or project conditions, contact our team before final order
          confirmation.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#E45700]">
            Contact Support
          </Link>
          <Link href="/privacy" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50">
            Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  );
}


