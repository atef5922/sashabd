import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  {
    href: "/led-display/",
    title: "LED Display Solutions",
    description: "Indoor, outdoor, rental and commercial display products.",
  },
  {
    href: "/pa-system/",
    title: "PA System Solutions",
    description: "Public address, paging, speaker and installation support.",
  },
  {
    href: "/interactive-flat-panel/",
    title: "Interactive Flat Panels",
    description: "Smart classroom, meeting room and collaboration displays.",
  },
];

export default function NotFound() {
  return (
    <section className="bg-slate-50 px-4 py-10 md:px-6 md:py-14" aria-labelledby="not-found-title">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
        <div className="grid min-h-[560px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-[15px] py-10 md:px-10 lg:px-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700">
              404 Error
            </div>

            <h1
              id="not-found-title"
              className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl"
            >
              The page you are looking for is not available
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              The URL may be old, moved, or typed incorrectly. Use the links below to continue browsing Sasha
              Corporation products and services.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E45700] hover:shadow-md"
              >
                Back to Home
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
              >
                Contact Support
              </Link>
              <Link
                href="/search/"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md"
              >
                Search Products
              </Link>
            </div>

            <div className="mt-8 grid gap-[10px] md:grid-cols-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
                >
                  <div className="text-sm font-extrabold text-slate-950 group-hover:text-orange-700">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[360px] bg-slate-950 p-6 text-white md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,106,0,0.28),transparent_34%),radial-gradient(circle_at_75%_72%,rgba(16,185,129,0.22),transparent_30%)]" />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-200">Sasha Corporation</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Display, audio and control system solutions</p>
                </div>
                <div className="relative h-14 w-28 shrink-0 overflow-hidden rounded-xl bg-white p-2">
                  <Image
                    src="/assets/brand/sasha/sasha-corporation-final-l.webp"
                    alt="Sasha Corporation"
                    fill
                    sizes="112px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="my-10">
                <div className="text-[7rem] font-black leading-none tracking-tight text-white/95 md:text-[9rem]">
                  404
                </div>
                <div className="mt-4 h-1 w-20 rounded-full bg-[#FF6A00]" />
              </div>

              <div className="grid gap-[10px] sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-sm font-extrabold">Need quick help?</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Our team can guide you to the right page.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-sm font-extrabold">Popular areas</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">LED display, PA system, and control solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

