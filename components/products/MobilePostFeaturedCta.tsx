import type { ReactNode } from "react";
import Link from "next/link";

type CtaLink = {
  label: string;
  href: string;
};

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function MobilePostFeaturedCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  links,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  links: CtaLink[];
}) {
  return (
    <section
      className="mt-4 rounded-[22px] border bg-white p-5 text-center md:mt-6 md:rounded-3xl md:p-8"
      style={{ borderColor: "rgba(15,23,42,0.10)" }}
    >
      <h3 className="mx-auto max-w-[15.5rem] text-[17px] font-extrabold leading-[1.35] text-slate-900 md:max-w-[26rem] md:text-[24px] md:leading-[1.28]">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-[16.75rem] text-center text-[13px] leading-[2] text-slate-600 md:max-w-[32rem] md:text-[15px] md:leading-8">
        {description}
      </p>

      <div className="hidden mt-4 flex-wrap justify-center gap-2">
        {links.map((link) => (
          <SmartLink
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="inline-flex min-h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm"
          >
            {link.label}
          </SmartLink>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <SmartLink
          href={primaryHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-[13px] font-extrabold text-white shadow-[0_10px_24px_rgba(14,165,233,0.24)] md:min-h-12 md:px-6 md:text-[14px]"
        >
          {primaryLabel}
        </SmartLink>
      </div>
    </section>
  );
}
