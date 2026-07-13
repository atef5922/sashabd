import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../lib/site";
import { BRAND_NAME } from "@/lib/brand";
import EmailReveal from "./EmailReveal";

type FooterLinkItem = {
  href: string;
  label: string;
};

type FooterSocialItem = {
  href: string;
  label: string;
  className: string;
  icon: React.ReactNode;
};

const companyLinks: FooterLinkItem[] = [
  { href: "/led-display/", label: "LED Display Price in Bangladesh" },
  { href: "/about/", label: "About Us" },
  { href: "/services-support/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Request Quotation" },
];

const supportLinks: FooterLinkItem[] = [
  { href: "/services-support/", label: "Installation & Calibration" },
  { href: "/contact/", label: "Warranty & Support" },
  { href: "/contact/", label: "Technical Support" },
  { href: "/contact/", label: "Spare Parts & Maintenance" },
  { href: "/contact/", label: "BOQ & Tender Assistance" },
  { href: "/contact/", label: "Site Visit & Consultation" },
];

const companyDescription =
  "Sasha Corporation supplies and installs indoor LED display, outdoor LED billboard, rental LED screen, LED video wall, PA sound system, turnstile gate system, digital podium, LED controller, receiving card, power supply, and LED accessories across Bangladesh.";

const copyrightYear = 2026;

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
      <path
        d="M4 20V7.5A1.5 1.5 0 0 1 5.5 6H10v14H4Zm10 0V4.5A1.5 1.5 0 0 1 15.5 3h3A1.5 1.5 0 0 1 20 4.5V20h-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 9h1m-1 3h1m-1 3h1m9-7h1m-1 3h1m-1 3h1M14 20v-3h2v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
      <path
        d="M4 13v-1a8 8 0 1 1 16 0v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 12h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm12 0h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 18v2a2 2 0 0 1-2 2h-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
      <path
        d="M12 21s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.4 12.2 1.8 1.8 3.5-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterSectionHeading({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="min-h-[28px]">
      <div className="flex min-h-[24px] items-center gap-1.5">
        <div className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[#67E8F9]">
          {icon}
        </div>
        <span className="whitespace-nowrap text-[16px] font-bold uppercase tracking-[0.03em] text-white">
          {title}
        </span>
      </div>
      <div className="mt-1 h-[2px] w-8 rounded-full bg-[#67E8F9]" />
    </div>
  );
}

function FooterSocialLink({ href, label, className, icon }: FooterSocialItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-[14px] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none ${className}`}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </a>
  );
}

function FooterLinkList({
  label,
  items,
}: {
  label: string;
  items: FooterLinkItem[];
}) {
  return (
    <nav aria-label={label} className="mt-3.5 flex-1">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              prefetch={false}
              href={item.href}
              className="group inline-flex items-start gap-1.5 text-[12px] leading-6 text-slate-300 transition duration-200 hover:text-[#67E8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none"
            >
              <span className="mt-[5px] text-[#67E8F9] transition duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                <ArrowIcon />
              </span>
              <span className="transition duration-200 group-hover:text-[#67E8F9] motion-reduce:transition-none">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterBottomPattern({ side }: { side: "left" | "right" }) {
  const positionClass = side === "left" ? "left-0" : "right-0 scale-x-[-1]";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 h-20 w-32 opacity-70 sm:h-24 sm:w-48 ${positionClass}`}
    >
      <svg viewBox="0 0 240 120" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`footer-wave-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FF2D7A" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, row) => (
          <path
            key={row}
            d={`M0 ${100 - row * 6} C 40 ${88 - row * 3}, 95 ${56 - row * 2}, 160 ${46 - row}, 205 ${40 - row * 0.5}, 240 ${28 - row * 0.4}`}
            fill="none"
            stroke={`url(#footer-wave-${side})`}
            strokeWidth="1.5"
            strokeOpacity={0.2 + row * 0.04}
          />
        ))}
        {Array.from({ length: 44 }).map((_, index) => {
          const x = 18 + (index % 11) * 18;
          const y = 88 - Math.floor(index / 11) * 12;
          return <circle key={index} cx={x} cy={y} r="1.3" fill={`url(#footer-wave-${side})`} opacity="0.62" />;
        })}
      </svg>
    </div>
  );
}

export default function Footer() {
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const mapQuery = "1st Floor, 36-37 Umesh Datta Road, Bakshibazar, Dhaka 1211, Bangladesh";
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const supportEmail = `${siteConfig.emailUser}@${siteConfig.emailDomain}`;

  const socialLinks: FooterSocialItem[] = [
    {
      href: siteConfig.socials.facebook,
      label: "Sasha Corporation Facebook",
      className:
        "border-[#1877F2]/40 bg-[#1877F2]/12 text-[#4D9CFF] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/20 hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.8V4.8c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V11H7v3h2.8v8h3.7z" />
        </svg>
      ),
    },
    {
      href: siteConfig.socials.youtube,
      label: "Sasha Corporation YouTube",
      className:
        "border-[#FF2B2B]/40 bg-[#FF2B2B]/12 text-[#FF5757] hover:border-[#FF2B2B]/60 hover:bg-[#FF2B2B]/20 hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
          <path d="M23 12c0 2.1-.2 4.2-.5 5.2-.3 1.1-1.2 1.9-2.2 2.2-1.1.3-5.3.5-8.3.5s-7.2-.2-8.3-.5c-1.1-.3-1.9-1.2-2.2-2.2C1.2 16.2 1 14.1 1 12s.2-4.2.5-5.2C1.8 5.7 2.7 4.9 3.7 4.6 4.8 4.3 9 4.1 12 4.1s7.2.2 8.3.5c1.1.3 1.9 1.2 2.2 2.2.3 1 .5 3.1.5 5.2zM10 8.8v6.4l5.6-3.2L10 8.8z" />
        </svg>
      ),
    },
    {
      href: whatsappUrl,
      label: "Sasha Corporation WhatsApp support",
      className:
        "border-[#25D366]/40 bg-[#25D366]/12 text-[#38D674] hover:border-[#25D366]/60 hover:bg-[#25D366]/20 hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
          <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.7 6L0 24l6.4-1.7c1.7.9 3.6 1.4 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3zM12.1 21.6c-1.7 0-3.3-.4-4.8-1.3l-.3-.2-3.8 1 1-3.7-.2-.3a9.8 9.8 0 0 1-1.5-5.2c0-5.3 4.3-9.6 9.6-9.6 2.6 0 5 1 6.8 2.8a9.5 9.5 0 0 1 2.8 6.8c0 5.3-4.3 9.6-9.6 9.6zm5.3-7.2c-.3-.1-1.8-.9-2-1s-.4-.1-.6.1-.7 1-.9 1.1-.3.2-.6.1c-1.5-.7-2.5-1.3-3.5-2.9-.3-.4.3-.4.8-1.3.1-.2.1-.4 0-.5l-.9-2.2c-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.9-1.2 2-1.2 3.2 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.5 1.5.6.6.2 1.1.2 1.5.1.5-.1 1.7-.7 1.9-1.5.2-.8.2-1.4.2-1.5 0-.1-.2-.2-.5-.3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="w-full overflow-hidden border border-white/8 bg-[radial-gradient(circle_at_top,rgba(14,55,121,0.22),transparent_34%),linear-gradient(180deg,#08111f_0%,#07101d_100%)] text-slate-200 shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
      aria-label="Site footer"
    >
      <div className="grid gap-4 px-4 py-3 sm:px-5 sm:py-3.5 md:grid-cols-2 md:gap-x-6 md:gap-y-4 lg:px-7 lg:py-4 xl:grid-cols-[minmax(0,1.48fr)_minmax(0,0.84fr)_minmax(0,0.88fr)_minmax(0,0.92fr)] xl:gap-x-5">
            <section className="min-w-0">
              <Link
                prefetch={false}
                href="/"
                className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]"
                aria-label={`${BRAND_NAME} home`}
              >
                <div className="relative h-14 w-36 shrink-0 sm:h-16 sm:w-40">
                  <Image
                    src="/sasha-corporation-after-scroll.png"
                    alt={`${BRAND_NAME} logo`}
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
              </Link>

              <p className="mt-2 max-w-sm text-[13px] leading-[1.35rem] text-slate-300">{companyDescription}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="glow-pill rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-[#39FF14] transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]"
                >
                  <span>{`Phone: ${siteConfig.phone}`}</span>
                </a>
                <EmailReveal
                  user={siteConfig.emailUser}
                  domain={siteConfig.emailDomain}
                  className="glow-pill rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-[#39FF14] transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]"
                  title="Email us"
                  prefix="Email: "
                />
              </div>

              <div className="mt-3 max-w-sm border-t border-white/8 pt-2.5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Follow Us</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {socialLinks.map((item) => (
                    <FooterSocialLink key={item.label} {...item} />
                  ))}
                </div>
              </div>
            </section>

            <section className="relative flex h-full min-w-0 flex-col xl:pl-5 xl:before:absolute xl:before:bottom-2.5 xl:before:left-0 xl:before:top-2.5 xl:before:w-px xl:before:bg-white/10">
              <FooterSectionHeading title="Company" icon={<BuildingIcon />} />
              <FooterLinkList label="Footer company navigation" items={companyLinks} />
            </section>

            <section className="relative flex h-full min-w-0 flex-col xl:pl-5 xl:before:absolute xl:before:bottom-2.5 xl:before:left-0 xl:before:top-2.5 xl:before:w-px xl:before:bg-white/10">
              <FooterSectionHeading title="Support" icon={<SupportIcon />} />
              <FooterLinkList label="Footer support navigation" items={supportLinks} />
            </section>

            <section className="relative flex h-full min-w-0 flex-col xl:pl-5 xl:before:absolute xl:before:bottom-2.5 xl:before:left-0 xl:before:top-2.5 xl:before:w-px xl:before:bg-white/10">
              <FooterSectionHeading title="Contact" icon={<LocationIcon />} />

              <div className="mt-3 flex flex-1 flex-col text-[12px] leading-5 text-slate-200">
                  <a
                    href={mapOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-slate-200 transition duration-200 hover:text-[#67E8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none"
                    aria-label="Open office location in Google Maps"
                  >
                    <span className="mt-[3px] inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center text-[#57D9FF] transition duration-200 group-hover:text-[#67E8F9] motion-reduce:transition-none">
                      <LocationIcon />
                    </span>
                    <span className="leading-5 text-slate-300 transition duration-200 group-hover:text-[#67E8F9] motion-reduce:transition-none">
                      {siteConfig.address}
                    </span>
                  </a>

                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="mt-2 flex items-center gap-2 font-semibold text-[#57D9FF] transition duration-200 hover:text-[#67E8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none"
                  >
                    <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.6 19.6 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l2.3-2.3a2 2 0 0 1 2.1-.4c.9.4 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{siteConfig.phone}</span>
                  </a>

                  <a
                    href={`mailto:${supportEmail}`}
                    className="mt-2 flex items-center gap-2 text-slate-100 transition duration-200 hover:text-[#67E8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none"
                  >
                    <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center text-[#57D9FF]">
                      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        <path d="m5 7 7 5 7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{supportEmail}</span>
                  </a>

                  <div className="mt-2 flex items-start gap-2 text-[11.5px] leading-5 text-slate-300">
                    <span className="mt-[2px] inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center text-[#57D9FF]">
                      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>
                      <span>
                        Service hours: <span className="font-semibold text-white">Sat-Thu, 10am-7pm</span>
                      </span>
                      <span className="block">Emergency support for critical LED screens by prior agreement.</span>
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <Link
                      prefetch={false}
                      href="/contact/"
                      className="glow-pill inline-flex items-center justify-center rounded-full border border-[#67E8F9]/40 bg-slate-900/40 px-3 py-1.5 text-[11.5px] font-semibold text-[#67E8F9] transition duration-200 hover:bg-slate-900/60 hover:text-[#A5F3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none"
                    >
                      <span>Get a Quote</span>
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-pill inline-flex items-center justify-center rounded-full border border-[#67E8F9]/40 bg-slate-900/40 px-3 py-1.5 text-[11.5px] font-semibold text-[#67E8F9] transition duration-200 hover:bg-slate-900/60 hover:text-[#A5F3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f] motion-reduce:transition-none"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
              </div>
            </section>
      </div>

      <div className="px-4 pb-3 sm:px-5 sm:pb-3.5 lg:px-7 lg:pb-3.5">
        <div className="relative overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(9,18,35,0.96),rgba(7,14,28,0.98))] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-5">
          <FooterBottomPattern side="left" />
          <FooterBottomPattern side="right" />

          <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 text-center md:flex-row md:flex-wrap md:gap-3">
            <div className="inline-flex items-center gap-2 text-[13px] text-slate-300 sm:text-sm">
              <span className="text-[#F64E60]">
                <ShieldIcon />
              </span>
              <span>{`© ${copyrightYear} ${BRAND_NAME}. All rights reserved.`}</span>
            </div>

            <div className="h-px w-12 bg-white/10 md:h-4 md:w-px" aria-hidden="true" />

            <div className="text-[13px] text-slate-300 sm:text-sm">
              Developed by{" "}
              <a
                href="https://mugneeit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#67E8F9] transition hover:text-[#A5F3FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1324] motion-reduce:transition-none"
              >
                Mugnee IT Solutions.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
