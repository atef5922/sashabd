"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "../../lib/site";
import { BRAND_NAME } from "@/lib/brand";

type NavItem =
  | { type: "link"; href: string; label: string }
  | {
      type: "dropdown";
      href: string;
      label: string;
      groups: Array<{
        title: string;
        items: Array<{ href: string; label: string; desc?: string }>;
      }>;
    };

const nav: NavItem[] = [
  { type: "link", href: "/", label: "Home" },
  {
    type: "dropdown",
    href: "/led-display/",
    label: "Led display",
    groups: [
      {
        title: "LED Displays",
        items: [
          {
            href: "/led-display/",
            label: "LED Display",
            desc: "Indoor, outdoor, rental and accessory overview",
          },
          {
            href: "/led-display/indoor-led/",
            label: "Indoor LED Display",
            desc: "Showroom \u2022 Office \u2022 Control room",
          },
          {
            href: "/led-display/outdoor/",
            label: "Outdoor LED Display",
            desc: "Billboard \u2022 Signage \u2022 Public areas",
          },
          {
            href: "/led-display/rental-display/",
            label: "Rental LED Display",
            desc: "Stage \u2022 Event \u2022 Live program",
          },
          {
            href: "/interactive-flat-panel",
            label: "Interactive Flat Panel",
            desc: "Smart classroom & meeting display",
          },
          {
            href: "/digital-podium",
            label: "Digital Podium",
            desc: "Smart podium for classrooms & events",
          },
          {
            href: "/led-display/accessories/receiving-card/",
            label: "Receiving Card",
            desc: "Novastar/Colorlight compatible",
          },
          {
            href: "/led-display/accessories/controller/",
            label: "Controller",
            desc: "Video processor & sending",
          },
          {
            href: "/led-display/accessories/power-supply/",
            label: "Power Supply",
            desc: "Stable power for modules",
          },
          {
            href: "/led-display/accessories/led-accessories/",
            label: "LED Accessories",
            desc: "Cables, connectors & parts",
          },
        ],
      },
    ],
  },
  { type: "link", href: "/pa-system/", label: "PA System" },
  { type: "link", href: "/conference-system/", label: "Conference System" },
  { type: "link", href: "/turnstile-gate/", label: "Turnstile Gate" },
  {
    type: "dropdown",
    href: "/about",
    label: "About",
    groups: [
      {
        title: "About",
        items: [
          {
            href: "/about",
            label: "About Us",
            desc: "Company profile and service approach",
          },
          {
            href: "/about/message-from-founder",
            label: "Message from Founder",
            desc: "Founder's note and vision",
          },
        ],
      },
    ],
  },
  { type: "link", href: "/contact", label: "Contact" },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const HeaderSearch = dynamic(() => import("./HeaderSearch"), {
  ssr: false,
  loading: () => (
    <div className="h-[2.35rem] w-full max-w-[320px] rounded-2xl bg-slate-100 lg:max-w-[440px] xl:max-w-[500px]" />
  ),
});
export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const normalizePath = (value: string) => {
    const noQuery = value.split("?")[0];
    const trimmed = noQuery.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  };

  const handleNavClick = (href: string, opts?: { closeMobile?: boolean }) => {
    return (e: React.MouseEvent) => {
      const currentPath = normalizePath(pathname);
      const targetPath = normalizePath(href);

      if (currentPath === targetPath) {
        e.preventDefault();
        if (opts?.closeMobile) setOpen(false);

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        router.refresh();
      }
    };
  };

  const activeHref = useMemo(() => {
    return (href: string) => {
      const normalize = (value: string) => {
        const noQuery = value.split("?")[0];
        const trimmed = noQuery.replace(/\/+$/, "");
        return trimmed === "" ? "/" : trimmed;
      };
      const currentPath = normalize(pathname);
      const baseHref = normalize(href);
      const promotedToLedDisplay =
        currentPath.startsWith("/interactive-flat-panel") ||
        currentPath.startsWith("/digital-podium") ||
        currentPath.startsWith("/control-systems/interactive-flat-panel") ||
        currentPath.startsWith("/control-systems/digital-podium") ||
        currentPath.startsWith("/led-display/accessories");
      if (baseHref === "/products" || baseHref === "/led-display") {
        return (
          currentPath === "/led-display" ||
          currentPath.startsWith("/led-display/indoor") ||
          currentPath.startsWith("/indoor-led") ||
          currentPath.startsWith("/led-display/indoor-led") ||
          currentPath.startsWith("/led-display/outdoor") ||
          currentPath.startsWith("/led-display/rental") ||
          currentPath.startsWith("/rental-display") ||
          currentPath.startsWith("/led-display/rental-display") ||
          promotedToLedDisplay ||
          currentPath === "/products" ||
          currentPath.startsWith("/products/indoor") ||
          currentPath.startsWith("/products/outdoor") ||
          currentPath.startsWith("/products/rental")
        );
      }
      if (baseHref === "/control-systems") {
        return (
          (currentPath === "/control-systems" || currentPath.startsWith("/control-systems/")) &&
          !promotedToLedDisplay
        );
      }
      if (baseHref === "/led-display/accessories") {
        return currentPath === "/led-display/accessories";
      }
      return currentPath === baseHref || (baseHref !== "/" && currentPath.startsWith(baseHref));
    };
  }, [pathname]);

  const activeDropdownItemHref = useMemo(() => {
    return (href: string, parentHref: string) => {
      const normalize = (value: string) => {
        const noQuery = value.split("?")[0];
        const trimmed = noQuery.replace(/\/+$/, "");
        return trimmed === "" ? "/" : trimmed;
      };
      const currentPath = normalize(pathname);
      const targetHref = normalize(href);
      const normalizedParentHref = normalize(parentHref);
      if (targetHref === normalizedParentHref) {
        return currentPath === targetHref;
      }
      if (parentHref === "/about") {
        return currentPath === targetHref;
      }
      return activeHref(href);
    };
  }, [activeHref, pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMobileProductsOpen(false);
    setMobileAboutOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-[80] w-full transition-colors duration-300",
        isScrolled ? "bg-[#091931] shadow-md" : "bg-white"
      )}
    >
      <div className="mx-auto flex h-[4.15rem] max-w-7xl items-center gap-1.5 px-3 py-0 md:h-18 md:gap-0 md:pl-3 md:pr-4">
        <Link prefetch={false} href="/" onClick={handleNavClick("/")} className="flex shrink-0 items-center gap-2">
          <div className="relative h-[3.2rem] w-[6.4rem] shrink-0 overflow-visible rounded-md md:h-24 md:w-40">
            <Image
              src={isScrolled ? "/sasha-corporation-after-scroll.png" : "/sasha-corporation-final-l.webp"}
              alt={`${BRAND_NAME} logo`}
              fill
              className="object-contain object-left scale-[1.08] md:scale-100"
              sizes="160px"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1 md:hidden">
          <HeaderSearch isScrolled={isScrolled} className="max-w-none" />
        </div>

        <div className="hidden md:flex flex-1 items-center px-4">
          <HeaderSearch isScrolled={isScrolled} />
        </div>

        <a
          href={`tel:${siteConfig.phone}`}
          aria-label="Call now"
          className={cn(
            "inline-flex h-[2.35rem] w-[2.35rem] shrink-0 items-center justify-center rounded-full border shadow-sm transition md:hidden",
            isScrolled
              ? "border-cyan-400/50 bg-white/10 text-white"
              : "border-cyan-300/80 bg-white text-slate-900"
          )}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M5.5 6.5c0 6.1 5.9 12 12 12h1.5a1.5 1.5 0 0 0 1.5-1.5v-2.1a1.5 1.5 0 0 0-1.2-1.47l-2.29-.46a1.5 1.5 0 0 0-1.43.45l-.5.5a12.7 12.7 0 0 1-4.97-4.97l.5-.5a1.5 1.5 0 0 0 .45-1.43l-.46-2.29A1.5 1.5 0 0 0 9.1 4H7a1.5 1.5 0 0 0-1.5 1.5v1Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* DESKTOP NAV */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            // normal link
            if (item.type === "link") {
              return (
                <Link key={item.href}
                  prefetch={false}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    activeHref(item.href)
                      ? isScrolled
                        ? "bg-[#FD6900] text-white"
                        : "bg-slate-900 text-white"
                      : isScrolled
                        ? "text-slate-100 hover:bg-white/10"
                        : "text-black hover:bg-slate-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            // hover dropdown (mega menu)
            const isLedDropdown = item.href === "/led-display/";
            const isAccessoriesDropdown = item.href === "/led-display/accessories/";
            const isControlSystemsDropdown = item.href === "/control-systems";
            const isAboutDropdown = item.href === "/about";
            const isCompactDropdown =
              isLedDropdown || isAccessoriesDropdown || isControlSystemsDropdown || isAboutDropdown;
            const isEnhancedDropdown =
              isLedDropdown || isAccessoriesDropdown || isControlSystemsDropdown || isAboutDropdown;
            const dropdownActiveClass = isScrolled ? "bg-[#FD6900] text-white" : "bg-slate-900 text-white";
            const dropdownItemActiveClass = isAboutDropdown
              ? "border-[#FD6900] bg-[#FD6900] text-white shadow-sm"
              : "border-slate-900 bg-slate-900 text-white shadow-sm";
            return (
              <div key={item.href} className="relative group">
                {/* Products button */}
                <Link prefetch={false} href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition",
                    activeHref(item.href)
                      ? dropdownActiveClass
                      : isScrolled
                        ? "text-slate-100 hover:bg-white/10"
                        : "text-black hover:bg-slate-100"
                  )}
                >
                  {item.label}
                  <span className="text-[10px]">{"\u25BE"}</span>
                </Link>

                {/* Hover bridge: products to dropdown */}
                <div className="absolute left-0 top-full h-3 w-56" />

                {/* Dropdown */}
                <div
                  className={cn(
                    "absolute left-0 top-full z-50 mt-3 rounded-2xl border shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur",
                    isScrolled ? "border-slate-700/80 bg-[#0b1220]/95" : "border-slate-200/80 bg-white/95",
                    isAboutDropdown ? "w-[260px] p-1.5" : isCompactDropdown ? "w-[300px] p-2" : "w-[520px] p-3",
                    isEnhancedDropdown
                      ? cn(
                          "overflow-hidden backdrop-blur-0 shadow-[0_28px_80px_rgba(15,23,42,0.20)] opacity-0 invisible translate-y-2.5 scale-[0.985] will-change-transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100",
                          isScrolled ? "border-slate-700/80 bg-[#0b1220]" : "border-slate-300/80 bg-white"
                        )
                      : "opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                  )}
                >
                  {isEnhancedDropdown && !isScrolled ? (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300/35 via-sky-300/20 to-indigo-300/35" />
                  ) : null}
                  <div className={cn("grid gap-3", item.groups.length > 1 && "md:grid-cols-2")}>
                    {item.groups.map((g) => (
                      <div
                        key={g.title}
                        className={cn(
                          "rounded-xl border border-slate-200/70 bg-slate-50/70 p-3",
                          isCompactDropdown && "border-0 bg-transparent p-0",
                          isEnhancedDropdown && !isCompactDropdown && "relative border-slate-200 bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                        )}
                      >
                        {!isCompactDropdown ? <div className="text-[11px] font-bold uppercase tracking-wide text-slate-700">{g.title}</div> : null}

                        <div className={cn("space-y-1", !isCompactDropdown && "mt-2")}>
                          {(isAccessoriesDropdown
                            ? g.items.filter((x) => x.label !== "View All Accessories")
                            : g.items
                          ).map((x, idx) => (
                            <Link key={`${x.href}-${idx}`}
                              prefetch={false}
                              href={x.href}
                              onClick={handleNavClick(x.href)}
                              style={
                                isEnhancedDropdown
                                  ? { transitionDelay: `${idx * 45}ms` }
                                  : undefined
                              }
                              className={cn(
                                "block rounded-xl border px-3 py-2 text-sm transition",
                                isCompactDropdown && "rounded-lg px-2.5 py-1.5",
                                isAboutDropdown && "px-2 py-1",
                                isCompactDropdown
                                  ? activeDropdownItemHref(x.href, item.href)
                                    ? "border-transparent bg-transparent text-[#FD6900]"
                                    : isScrolled
                                    ? "border-transparent bg-transparent text-slate-100 hover:-translate-y-0.5 hover:bg-white/10"
                                    : "border-transparent bg-transparent text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50"
                                  : activeDropdownItemHref(x.href, item.href)
                                  ? dropdownItemActiveClass
                                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50",
                                isEnhancedDropdown &&
                                  "group/item relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-sky-300/70 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400/0 before:via-cyan-400/8 before:to-blue-500/0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div
                                  className={cn(
                                    "font-semibold transition-all duration-300",
                                    isEnhancedDropdown &&
                                      !activeDropdownItemHref(x.href, item.href) &&
                                      "bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text group-hover/item:text-transparent"
                                  )}
                                >
                                  {x.label}
                                </div>
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "shrink-0 transition-transform duration-300 group-hover/item:translate-x-0.5",
                                    activeDropdownItemHref(x.href, item.href)
                                      ? isCompactDropdown
                                        ? "text-[#FD6900]"
                                        : "text-white/85"
                                      : isScrolled && isCompactDropdown
                                        ? "text-slate-400"
                                        : "text-slate-400"
                                  )}
                                >
                                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none">
                                    <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </div>
                              {!isCompactDropdown && x.desc ? (
                                <div
                                  className={cn(
                                    "text-xs",
                                    activeDropdownItemHref(x.href, item.href)
                                      ? "text-white/80"
                                      : "text-slate-500"
                                  )}
                                >
                                  {x.desc}
                                </div>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isLedDropdown && !isAccessoriesDropdown && !isControlSystemsDropdown && !isAboutDropdown ? (
                    <div className="mt-3 flex gap-2">
                      <Link prefetch={false} href={item.href}
                        onClick={handleNavClick(item.href)}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                         All Products -&gt;
                      </Link>
                      <Link prefetch={false} href="/contact"
                        onClick={handleNavClick("/contact")}
                        className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Request Price
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

          <a
            href={`tel:${siteConfig.phone}`}
            aria-label="Call now"
            className="shine-button ml-2 inline-flex min-w-[150px] items-center justify-center rounded-lg bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {siteConfig.phone}
          </a>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className={cn(
            "inline-flex h-[2.35rem] w-[2.35rem] shrink-0 items-center justify-center rounded-full border text-[18px] leading-none shadow-sm md:hidden",
            isScrolled
              ? "border-cyan-400/50 bg-white/10 text-white"
              : "border-cyan-300/80 bg-white text-slate-900"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto max-h-[calc(100svh-72px)] max-w-7xl overflow-y-auto overscroll-contain px-4 py-3">
            <div className="flex flex-col gap-2">
              {/* Home */}
	              <Link prefetch={false} href="/"
                onClick={(e) => {
                  handleNavClick("/", { closeMobile: true })(e);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/")
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                Home
              </Link>

              {/* Products accordion */}
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/led-display")
                    ? "bg-[#C84B00] text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                Led display <span>{mobileProductsOpen ? "\u25B4" : "\u25BE"}</span>
              </button>

              {mobileProductsOpen && (
                <div className="rounded-lg border bg-white p-2">
                  {[
                    { href: "/led-display/", label: "LED Display" },
                    { href: "/led-display/indoor-led/", label: "Indoor LED Display" },
                    { href: "/led-display/outdoor/", label: "Outdoor LED Display" },
                    { href: "/led-display/rental-display/", label: "Rental LED Display" },
                    { href: "/interactive-flat-panel", label: "Interactive Flat Panel" },
                    { href: "/digital-podium", label: "Digital Podium" },
                    { href: "/led-display/accessories/receiving-card/", label: "Receiving Card" },
                    { href: "/led-display/accessories/controller/", label: "Controller" },
                    { href: "/led-display/accessories/power-supply/", label: "Power Supply" },
                    { href: "/led-display/accessories/led-accessories/", label: "LED Accessories" },
                  ].map((x) => (
	                    <Link key={x.href}
	                      prefetch={false}
	                      href={x.href}
                      onClick={(e) => {
                        handleNavClick(x.href, { closeMobile: true })(e);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative block rounded-lg px-3 py-2 text-sm transition",
                        activeDropdownItemHref(x.href, "/led-display/")
                          ? "bg-[#FFF3EB] pl-5 font-semibold text-[#C84B00]"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {activeDropdownItemHref(x.href, "/led-display/") ? (
                        <span
                          className="absolute left-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#F56605]"
                          aria-hidden="true"
                        />
                      ) : null}
                      {x.label}
                    </Link>
                  ))}

	                  <Link prefetch={false} href="/led-display/"
                    onClick={(e) => {
                      handleNavClick("/led-display/", { closeMobile: true })(e);
                      setOpen(false);
                    }}
                    className="mt-2 block rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                     All Products -&gt;
                  </Link>
                </div>
              )}

	              <Link
	                prefetch={false}
	                href="/pa-system/"
                onClick={(e) => {
                  handleNavClick("/pa-system/", { closeMobile: true })(e);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/pa-system/")
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                PA System
              </Link>

	              <Link
	                prefetch={false}
	                href="/conference-system/"
                onClick={(e) => {
                  handleNavClick("/conference-system/", { closeMobile: true })(e);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/conference-system/")
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                Conference System
              </Link>

	              <Link
	                prefetch={false}
	                href="/turnstile-gate/"
                onClick={(e) => {
                  handleNavClick("/turnstile-gate/", { closeMobile: true })(e);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/turnstile-gate/")
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                Turnstile Gate
              </Link>

              {/* About accordion */}
              <button
                onClick={() => setMobileAboutOpen((v) => !v)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/about")
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                About <span>{mobileAboutOpen ? "\u25B4" : "\u25BE"}</span>
              </button>

              {mobileAboutOpen && (
                <div className="rounded-lg border bg-white p-2">
                  <div className="px-2 py-1 text-xs font-bold text-slate-900">
                    About
                  </div>
                  {[
                    { href: "/about", label: "About Us" },
                    { href: "/about/message-from-founder", label: "Message from Founder" },
                  ].map((x) => (
	                    <Link key={x.href}
	                      prefetch={false}
	                      href={x.href}
                      onClick={(e) => {
                        handleNavClick(x.href, { closeMobile: true })(e);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative block rounded-lg px-3 py-2 text-sm transition",
                        activeDropdownItemHref(x.href, "/about")
                          ? "bg-[#FFF3EB] pl-5 font-semibold text-[#C84B00]"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {activeDropdownItemHref(x.href, "/about") ? (
                        <span
                          className="absolute left-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#F56605]"
                          aria-hidden="true"
                        />
                      ) : null}
                      {x.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Rest links */}
              {[
                { href: "/contact", label: "Contact" },
              ].map((x) => (
	                <Link key={x.href}
	                  prefetch={false}
	                  href={x.href}
                  onClick={(e) => {
                    handleNavClick(x.href, { closeMobile: true })(e);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    activeHref(x.href)
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-700"
                  )}
                >
                  {x.label}
                </Link>
              ))}

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                WhatsApp<span className="sr-only"> support</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
