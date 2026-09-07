import Image from "next/image";
import Link from "next/link";

export const homeBrandLogos = [
  { name: "LianTronics", src: "/images/logo/liantronics.png", href: "/led-display/", className: "h-6 sm:h-7" },
  { name: "Leyard", src: "/images/logo/leyard.webp", href: "/led-display/", className: "h-6 sm:h-7" },
  { name: "NovaStar", src: "/images/logo/novastar.webp", href: "/led-display/accessories/controller/", className: "h-7 sm:h-8" },
  { name: "AOTO Electronics", src: "/images/logo/aoto-electronics.webp", href: "/led-display/", className: "h-6 sm:h-7" },
  { name: "G-Energy", src: "/images/logo/g-energy.webp", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Lampro", src: "/images/logo/lampro.webp", href: "/led-display/", className: "h-6 sm:h-7" },
  { name: "Huidu", src: "/images/brands/huidu.webp", href: "/led-display/accessories/controller/", className: "h-7 sm:h-8" },
  { name: "Colorlight", src: "/images/logo/colorlight.webp", href: "/led-display/accessories/controller/", className: "h-7 sm:h-8" },
  { name: "Mean Well", src: "/images/logo/mean-well.webp", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Mugnee", src: "/images/logo/mugnee.webp", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Renex Digital", src: "/images/brands/renex-exact.webp", href: "/led-display/", className: "h-7 translate-y-[4px] scale-[4] sm:h-8" },
  { name: "Synoveta", src: "/images/brands/synoveta-logo.jpeg", href: "/led-display/", className: "h-7 sm:h-8" },
  { name: "Bosch", src: "/images/brands/audio/bosch-logo.svg", href: "/conference-system/brands/bosch/", className: "h-7 sm:h-8" },
  { name: "TOA", src: "/images/brands/audio/toa-logo.png", href: "/conference-system/brands/toa/", className: "h-7 sm:h-8" },
  { name: "SPON", src: "/images/brands/audio/spon.svg", href: "/conference-system/brands/spon/", className: "h-6 sm:h-7" },
  { name: "CMX", src: "/images/brands/audio/cmx-logo.png", href: "/conference-system/brands/cmx/", className: "h-8 sm:h-9" },
] as const;

const serviceHighlights = [
  { title: "BOQ & Tender Support", icon: "document" },
  { title: "Installation & Training", icon: "tools" },
  { title: "Project-Based Pricing", icon: "tag" },
  { title: "Warranty & After-Sales", icon: "shield" },
] as const;

function compactBrandLogoClass(name: string) {
  if (name === "Renex Digital") return "h-7 w-auto max-w-[76px] translate-y-px scale-[2.1] object-contain";
  if (name === "CMX") return "h-7 w-7 object-contain";
  if (name === "AOTO Electronics") return "h-6 w-auto max-w-[72px] object-contain";
  if (name === "Synoveta") return "h-6 w-auto max-w-[78px] object-contain";
  if (name === "Leyard" || name === "LianTronics") return "h-6 w-auto max-w-[80px] object-contain";
  return "max-h-7 w-auto max-w-[82px] object-contain";
}

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
      <div className="home-trust-service-card overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.035)] sm:px-5 min-[1120px]:min-h-[80px] min-[1120px]:px-7 min-[1120px]:py-2">
        <div className="grid items-center gap-4 min-[1024px]:max-[1119px]:grid-cols-[12rem_minmax(0,1fr)] min-[1120px]:min-h-[62px] min-[1120px]:grid-cols-[minmax(205px,0.9fr)_1px_minmax(440px,2.4fr)_1px_minmax(350px,1.8fr)] min-[1120px]:gap-0">
          <div className="min-w-0 pr-2 text-left">
            <p id="home-trust-heading" role="heading" aria-level={2} className="text-[11px] font-black leading-4 tracking-[-0.02em] text-[#071936]">
              Trusted Technology Solutions
            </p>
            <p className="mt-1 text-[10px] font-bold leading-4 tracking-[-0.025em] text-slate-600">
              LED <span aria-hidden="true">•</span> Conference <span aria-hidden="true">•</span> PA <span aria-hidden="true">•</span> Access Control
            </p>
          </div>

          <div className="hidden h-12 w-px bg-slate-200 min-[1120px]:block" aria-hidden="true" />

          <div className="group relative min-w-0 overflow-hidden rounded-lg border border-[#dce9fb] bg-white px-1 shadow-[0_5px_14px_rgba(16,39,90,.04)] min-[1024px]:max-[1119px]:border-t min-[1120px]:mx-5 min-[1120px]:px-0 2xl:mx-7">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-white to-transparent sm:w-5" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-white to-transparent sm:w-5" aria-hidden="true" />

            <div className="home-brand-marquee-track flex min-h-[50px] w-max items-center will-change-transform group-hover:[animation-play-state:paused] motion-reduce:transform-none motion-reduce:animate-none">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="flex shrink-0 items-center" aria-hidden={groupIndex === 1 ? "true" : undefined}>
                  {homeBrandLogos.map((brand) => (
                    <Link
                      key={`${groupIndex}-${brand.name}`}
                      prefetch={false}
                      href={brand.href}
                      aria-label={groupIndex === 0 ? `Browse ${brand.name} solutions` : undefined}
                      tabIndex={groupIndex === 1 ? -1 : undefined}
                      className="relative flex h-9 w-[98px] shrink-0 items-center justify-center overflow-hidden border-r border-[#dce9fb] px-2 transition duration-200 hover:bg-[#f8fbff] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1465ef] sm:w-[106px] xl:w-[102px] 2xl:w-[110px]"
                    >
                      <Image
                        src={brand.src}
                        alt={groupIndex === 0 ? `${brand.name} logo` : ""}
                        width={120}
                        height={36}
                        className={compactBrandLogoClass(brand.name)}
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden h-12 w-px bg-slate-200 min-[1120px]:block" aria-hidden="true" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-slate-100 pt-4 min-[1024px]:max-[1119px]:col-span-2 min-[1120px]:col-span-1 min-[1120px]:border-t-0 min-[1120px]:pl-7 min-[1120px]:pt-0 2xl:gap-x-7">
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
