import Image from "next/image";
import Link from "next/link";

const homeBrandLogos = [
  { name: "LianTronics", src: "/images/logo/liantronics.png", href: "/led-display/", className: "h-5 sm:h-6" },
  { name: "NovaStar", src: "/images/logo/novastar.webp", href: "/led-display/accessories/controller/", className: "h-6 sm:h-7" },
  { name: "AOTO Electronics", src: "/images/logo/aoto-electronics.webp", href: "/led-display/", className: "h-5 sm:h-6" },
  { name: "G-Energy", src: "/images/logo/g-energy.webp", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Lampro", src: "/images/logo/lampro.webp", href: "/led-display/", className: "h-5 sm:h-6" },
  { name: "Huidu", src: "/images/brands/huidu.webp", href: "/led-display/accessories/controller/", className: "h-6 sm:h-7" },
  { name: "Colorlight", src: "/images/logo/colorlight.webp", href: "/led-display/accessories/controller/", className: "h-6 sm:h-7" },
  { name: "Mean Well", src: "/images/logo/mean-well.webp", href: "/led-display/", className: "h-6 sm:h-7" },
  { name: "Mugnee", src: "/images/logo/mugnee.webp", href: "/led-display/", className: "h-6 sm:h-7" },
  { name: "Renex Digital", src: "/images/brands/renex-exact.webp", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Synoveta", src: "/images/brands/synoveta-logo.jpeg", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Bosch", src: "/images/brands/audio/bosch-logo.svg", href: "/conference-system/brands/bosch/", className: "h-6 sm:h-7" },
  { name: "TOA", src: "/images/brands/audio/toa-logo.png", href: "/conference-system/brands/toa/", className: "h-6 sm:h-7" },
  { name: "SPON", src: "/images/brands/audio/spon.svg", href: "/conference-system/brands/spon/", className: "h-5 sm:h-6" },
  { name: "CMX", src: "/images/brands/audio/cmx-logo.png", href: "/conference-system/brands/cmx/", className: "h-7 sm:h-8" },
] as const;

const serviceHighlights = [
  { title: "BOQ & Tender Support", icon: "document" },
  { title: "Installation & Training", icon: "tools" },
  { title: "Project-Based Pricing", icon: "tag" },
  { title: "Warranty & After-Sales", icon: "shield" },
] as const;

function ServiceIcon({ icon }: { icon: (typeof serviceHighlights)[number]["icon"] }) {
  const shared = { stroke: "currentColor", strokeWidth: 1.8, fill: "none" } as const;
  if (icon === "document") {
    return <svg viewBox="0 0 24 24"><path {...shared} d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (icon === "tools") {
    return <svg viewBox="0 0 24 24"><path {...shared} d="m14 6 4-3 3 3-3 4-3-1-7.8 7.8a2 2 0 0 1-2.8-2.8L12 6.2 14 6Z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (icon === "tag") {
    return <svg viewBox="0 0 24 24"><path {...shared} d="M4 12 12 4h7v7l-8 8-7-7Z" strokeLinejoin="round" /><circle cx="16" cy="8" r="1.2" fill="currentColor" /></svg>;
  }
  return <svg viewBox="0 0 24 24"><path {...shared} d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" strokeLinejoin="round" /><path {...shared} d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function HomeTrustServiceStrip() {
  return (
    <section aria-labelledby="home-trust-heading" className="relative z-20 -mt-px">
      <div className="home-trust-service-card overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.035)] sm:px-5 xl:min-h-[80px] xl:px-7 xl:py-2">
        <div className="grid items-center gap-4 lg:grid-cols-[12rem_minmax(0,1fr)] xl:min-h-[62px] xl:grid-cols-[minmax(205px,0.9fr)_1px_minmax(440px,2.4fr)_1px_minmax(350px,1.8fr)] xl:gap-0">
          <div className="min-w-0 pr-2 text-left">
            <p id="home-trust-heading" role="heading" aria-level={2} className="text-[11px] font-black leading-4 tracking-[-0.02em] text-[#071936]">
              Trusted Technology Solutions
            </p>
            <p className="mt-1 text-[10px] font-bold leading-4 tracking-[-0.025em] text-slate-600">
              LED <span aria-hidden="true">•</span> Conference <span aria-hidden="true">•</span> PA <span aria-hidden="true">•</span> Access Control
            </p>
          </div>

          <div className="hidden h-12 w-px bg-slate-200 xl:block" aria-hidden="true" />

          <div className="group relative min-w-0 overflow-hidden border-t border-slate-100 px-1 pt-4 lg:border-t-0 lg:pt-0 xl:mx-5 xl:px-0 2xl:mx-7">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-white to-transparent sm:w-8" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-white to-transparent sm:w-8" aria-hidden="true" />

            <div className="home-brand-marquee-track flex w-max will-change-transform group-hover:[animation-play-state:paused] motion-reduce:transform-none motion-reduce:animate-none">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={groupIndex === 1 ? "true" : undefined}>
                  {homeBrandLogos.map((brand) => (
                    <Link
                      key={`${groupIndex}-${brand.name}`}
                      prefetch={false}
                      href={brand.href}
                      aria-label={groupIndex === 0 ? `Browse ${brand.name} solutions` : undefined}
                      tabIndex={groupIndex === 1 ? -1 : undefined}
                      className="flex h-10 w-[96px] shrink-0 items-center justify-center transition duration-200 hover:scale-[1.03] hover:opacity-80 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 sm:w-[108px] xl:w-[100px] 2xl:w-[112px]"
                    >
                      <Image
                        src={brand.src}
                        alt={groupIndex === 0 ? `${brand.name} logo` : ""}
                        width={120}
                        height={36}
                        className={`${brand.className} w-auto max-w-[90px] object-contain sm:max-w-[102px] xl:max-h-[23px] xl:max-w-[90px] 2xl:max-w-[102px]`}
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden h-12 w-px bg-slate-200 xl:block" aria-hidden="true" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-slate-100 pt-4 lg:col-span-2 xl:col-span-1 xl:border-t-0 xl:pl-7 xl:pt-0 2xl:gap-x-7">
            {serviceHighlights.map((feature) => (
              <div key={feature.title} className="flex min-w-0 items-center gap-2 text-[#071936]">
                <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center text-orange-600 [&>svg]:h-4 [&>svg]:w-4">
                  <ServiceIcon icon={feature.icon} />
                </span>
                <span className="text-[9px] font-bold leading-3 sm:whitespace-nowrap sm:text-[10px] sm:leading-4">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
