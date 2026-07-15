const trustedTechPartnerLogos: Array<{ name: string; src: string; href?: string }> = [
  { name: "Absen", src: "/images/logo/absen.webp", href: "https://www.absen.com/" },
  { name: "Unilumin", src: "/images/logo/unilumin.webp", href: "https://www.unilumin.com/" },
  { name: "Leyard", src: "/images/logo/leyard.webp", href: "https://www.leyardhk.com/" },
  { name: "LianTronics", src: "/images/logo/liantronics.png", href: "https://www.liantronics.com/" },
  { name: "AOTO Electronics", src: "/images/logo/aoto-electronics.webp", href: "https://en.aoto.com/" },
  { name: "G-Energy", src: "/images/logo/g-energy.webp" },
  { name: "Lampro", src: "/images/logo/lampro.webp", href: "https://www.lampro.net/" },
  { name: "NovaStar", src: "/images/logo/novastar.webp", href: "https://www.novastar.tech/" },
  { name: "Huidu", src: "/images/brands/huidu.webp", href: "https://www.huidu.cn/" },
  { name: "Colorlight", src: "/images/logo/colorlight.webp", href: "https://en.colorlightinside.com/" },
  { name: "Mean Well", src: "/images/logo/mean-well.webp", href: "https://www.meanwell.com/" },
  { name: "Mugnee Multiple Limited", src: "/images/logo/mugnee.webp", href: "https://www.mugnee.com/" },
  { name: "Renex Digital", src: "/images/brands/renex-exact.webp", href: "https://renex.com.bd/" },
];

export default function TrustedTechnologyPartnersSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-slate-50/80 py-5 md:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 py-1 md:px-6">
        <h2 className="flex items-center justify-center gap-2 pb-0 text-center text-2xl font-bold text-slate-900 after:hidden">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 text-slate-700"
            style={{ borderColor: "rgba(255,106,0,0.2)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
              <path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>Trusted Technology Partners & Authorized Brands</span>
        </h2>

        <p className="mx-auto mt-2 max-w-5xl text-center text-sm leading-6 text-slate-600">
          We source trusted LED display components for Bangladesh projects with{" "}
          <span className="font-bold text-slate-900" title="Absen" aria-label="Absen">
            Absen
          </span>
          ,{" "}
          <span className="font-bold text-slate-900" title="Unilumin" aria-label="Unilumin">
            Unilumin
          </span>
          ,{" "}
          <span className="font-bold text-slate-900" title="Leyard" aria-label="Leyard">
            Leyard
          </span>
          ,{" "}
          <span className="font-bold text-slate-900" title="LianTronics" aria-label="LianTronics">
            LianTronics
          </span>
          , and{" "}
          <span className="font-bold text-slate-900" title="AOTO Electronics" aria-label="AOTO Electronics">
            AOTO Electronics
          </span>{" "}
          —plus NovaStar, Huidu, Colorlight, and Mean Well—for stable performance &amp; long-term support.
        </p>

        <div className="mt-4 rounded-[28px] bg-white/95 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 md:p-5">
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14"
              style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14"
              style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }}
            />

            <div className="group">
              <div className="flex w-max gap-3 animate-[renexMarquee_42s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                {[...trustedTechPartnerLogos, ...trustedTechPartnerLogos].map((brand, index) =>
                  brand.href ? (
                    <a
                      key={`${brand.name}-${index}`}
                      href={brand.href}
                      target="_blank"
                      rel="nofollow noreferrer"
                      className="flex h-16 w-40 shrink-0 items-center justify-center rounded-[20px] border bg-white px-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: "rgba(255,106,0,0.12)" }}
                      title={brand.name}
                      aria-label={brand.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.src}
                        alt={brand.name}
                        className={
                          brand.name === "G-Energy"
                            ? "h-12 w-auto max-w-[152px] object-contain"
                            : brand.name === "LianTronics"
                              ? "h-9 w-auto max-w-[148px] object-contain"
                              : brand.name === "AOTO Electronics"
                                ? "h-10 w-auto max-w-[132px] object-contain"
                                : brand.name === "Lampro"
                              ? "h-9 w-auto max-w-[136px] object-contain"
                              : brand.name === "Huidu"
                                ? "h-10 w-auto max-w-[145px] object-contain"
                                : brand.name === "NovaStar"
                                  ? "h-10 w-auto max-w-[150px] object-contain"
                                  : brand.name === "Mugnee Multiple Limited"
                                    ? "h-10 w-auto max-w-[156px] object-contain"
                                    : brand.name === "Renex Digital"
                                      ? "h-12 w-full max-w-none object-cover object-center"
                                      : "h-10 w-auto max-w-[146px] object-contain"
                        }
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div
                      key={`${brand.name}-${index}`}
                      className="flex h-16 w-40 shrink-0 items-center justify-center rounded-[20px] border bg-white px-4 shadow-sm"
                      style={{ borderColor: "rgba(255,106,0,0.12)" }}
                      title={brand.name}
                      aria-label={brand.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.src}
                        alt={brand.name}
                        className={
                          brand.name === "G-Energy"
                            ? "h-12 w-auto max-w-[152px] object-contain"
                            : brand.name === "LianTronics"
                              ? "h-9 w-auto max-w-[148px] object-contain"
                              : brand.name === "AOTO Electronics"
                                ? "h-10 w-auto max-w-[132px] object-contain"
                                : brand.name === "Lampro"
                              ? "h-9 w-auto max-w-[136px] object-contain"
                              : brand.name === "Huidu"
                                ? "h-10 w-auto max-w-[145px] object-contain"
                                : brand.name === "NovaStar"
                                  ? "h-10 w-auto max-w-[150px] object-contain"
                                  : brand.name === "Mugnee Multiple Limited"
                                    ? "h-10 w-auto max-w-[156px] object-contain"
                                    : brand.name === "Renex Digital"
                                      ? "h-12 w-full max-w-none object-cover object-center"
                                      : "h-10 w-auto max-w-[146px] object-contain"
                        }
                        loading="lazy"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            {[
              "Quality-focused workflow",
              "Authorized brand ecosystem",
              "Industry-grade components",
              "Project-based support & service",
            ].map((item) => (
              <span key={item} className="rounded-full border bg-slate-50 px-4 py-2" style={{ borderColor: "rgba(255,106,0,0.14)" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
