import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Sasha Corporation describing how contact details, quotation requests, and website interaction data are collected, used, and protected.",
  alternates: { canonical: "/privacy/" },
  openGraph: {
    title: `Privacy Policy | ${BRAND_NAME}`,
    description:
      "Learn how Sasha Corporation collects, uses, protects, and manages inquiry and contact data.",
    url: "/privacy/",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: `Privacy Policy | ${BRAND_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${BRAND_NAME}`,
    description:
      "Learn how Sasha Corporation collects, uses, protects, and manages inquiry and contact data.",
    images: [socialImageUrl()],
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/privacy/", label: "Privacy Policy", current: true },
        ]}
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6A00]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-300">
          Privacy & Data Protection
        </span>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Privacy Policy
          <span className="mt-2 block h-1.5 w-20 rounded-full bg-[#FF6A00]" />
        </h1>

        <p className="mt-4 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-7 text-slate-200 backdrop-blur-sm md:p-5">
          {BRAND_NAME} respects your privacy. This policy explains what information we collect, why we collect
          it, and how we use it when you browse our website, request a quotation, or contact our support team.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Contact details (name, phone number, email, company/organization)</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Project inquiry details (location, screen type, size, budget preference)</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Communication records from forms, email, phone, or WhatsApp</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Basic website usage data (pages viewed, device/browser signals)</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">2. How We Use Information</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />To prepare project consultation and quotation response</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />To provide installation, maintenance, and technical support follow-up</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />To improve website content, service process, and response quality</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />To send service-related communication relevant to your inquiry</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">3. Cookies and Analytics</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          We may use cookies and basic analytics tools to understand website performance and visitor behavior. These tools
          help improve user experience, navigation flow, and page quality. You can control cookies in your browser settings.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">4. Data Sharing and Disclosure</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          We do not sell personal information. Data may be shared only when required for quotation processing, service
          execution, legal compliance, or trusted operational support under confidentiality conditions.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">5. Data Retention and Security</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Inquiry and service data are retained only as long as necessary for business, service, and compliance purposes.
          We maintain reasonable technical and administrative safeguards to protect data from unauthorized access.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">6. Your Rights</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Request correction of inaccurate information</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Request deletion of inquiry records where applicable</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Ask how your submitted data is being used</li>
            <li className="flex items-start gap-2"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#FF6A00]" />Opt out from non-essential promotional communication</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-900">7. Third-Party Links</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Our website may include links to external sites. We are not responsible for privacy practices of third-party
            websites. Please review their policies before sharing personal information.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">8. Policy Updates and Contact</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This Privacy Policy may be updated from time to time to reflect service, legal, or operational changes.
          For privacy-related questions, please contact our team.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact/" className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#E45700]">
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


