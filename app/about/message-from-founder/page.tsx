import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import { homeBreadcrumb } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: "Message from Founder | Sasha Corporation" },
  description:
    "Read the founder message from Sasha Corporation on vision, service quality, transparency and long-term commitment.",
  alternates: { canonical: "/about/message-from-founder/" },
  openGraph: {
    title: "Message from Founder",
    description:
      "Founder message from Sasha Corporation on growth, innovation and customer commitment.",
    url: "/about/message-from-founder",
    type: "article",
    images: [
      {
        url: socialImageUrl("/images/about/founder-mun-islam.webp"),
        width: 1200,
        height: 630,
        alt: "Message from Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Message from Founder",
    description:
      "Founder message from Sasha Corporation on growth, innovation and customer commitment.",
    images: [socialImageUrl("/images/about/founder-mun-islam.webp")],
  },
};

export default function MessageFromChairmanPage() {
  return (
    <main className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-3 md:px-6">
        <Breadcrumbs
          items={[
            homeBreadcrumb(),
            { href: "/about/", label: "About" },
            {
              href: "/about/message-from-founder/",
              label: "Message from Founder",
              current: true,
            },
          ]}
          className="mb-4 text-sm text-slate-600"
        />
        <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="relative h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src="/images/about/founder-mun-islam.webp"
                    alt="Mun Islam"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-lg font-bold text-slate-900">Mun Islam</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                  Founder
                </p>
                <p className="mt-1 text-sm text-slate-600">{BRAND_NAME}</p>
                <p className="text-sm text-slate-600">A Brand of Sasha Corporation</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Founder Message</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Message from Founder
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-700 text-justify">
                In today&apos;s rapidly evolving digital world, LED displays are more than just screens - they are
                powerful tools for communication, branding, and business growth. With this belief, Sasha Corporation was founded to bring reliable, high-quality LED display solutions to
                customers across Bangladesh.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-700 text-justify">
                Our mission is to deliver international-standard products, modern technology, and dependable service
                while maintaining complete transparency and professionalism. Every project we undertake is treated as a
                responsibility, not just a contract. From consultation and design to installation and after-sales
                support, our dedicated team ensures excellence at every stage.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-700 text-justify">
                We proudly serve corporate offices, educational institutions, shopping malls, event organizers, and
                government projects by providing customized LED display solutions tailored to real operational needs.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-700 text-justify">
                Your trust is our greatest strength. At {BRAND_NAME}, we are committed to continuous
                improvement, innovation, and long-term partnerships. We look forward to growing together and
                contributing to a smarter, more connected digital future.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-700">
                Warm regards,
                <br />
                <span className="font-semibold">Mun Islam</span>
                <br />
                Founder - Sasha Corporation
                <br />
                Sasha Corporation
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

