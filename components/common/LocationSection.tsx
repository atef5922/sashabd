import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { BRAND_NAME } from "@/lib/brand";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export default function LocationSection() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const mapQuery = "1st Floor, 36-37 Umesh Datta Road, Bakshibazar, Dhaka 1211, Bangladesh";
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=19&ie=UTF8&iwloc=B&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <section
      className="rounded-3xl border bg-slate-50"
      style={{ borderColor: `${BRAND.maroon}18` }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 text-slate-700"
                style={{ borderColor: `${BRAND.maroon}33` }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
                  <path
                    d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="11"
                    r="2.3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                  />
                </svg>
              </span>
              <span>Our Location</span>
            </h2>
            <p className="mt-2 text-slate-600 leading-7">{`Head Office: ${siteConfig.address}.`}</p>
          </div>
        </div>

        <div
          className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm"
          style={{ borderColor: `${BRAND.maroon}12` }}
        >
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <a
              href={mapOpenUrl}
              target="_blank"
              rel="nofollow noreferrer"
              aria-label="Open office location in Google Maps"
              className="absolute inset-0 z-10"
            />
            <iframe
              title={`${BRAND_NAME} - Google Map`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedSrc}
            />
          </div>

          <div className="p-6">
            <div className="text-sm font-semibold text-slate-900">Need directions or a site visit?</div>
            <p className="mt-1 text-sm leading-7 text-slate-600">
 Share your location, approximate screen size, indoor/outdoor type, and viewing distance-our team will
              suggest pixel pitch and a practical installation plan.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="nofollow noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                WhatsApp Now
              </a>
              <Link
                prefetch={false}
                href="/contact"
                className="rounded-xl border bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                style={{ borderColor: `${BRAND.maroon}22` }}
              >
                Request Site Visit -&gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

