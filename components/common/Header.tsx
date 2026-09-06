"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "../../lib/site";
import { BRAND_NAME } from "@/lib/brand";
import type {
  ConferenceNavigationGroup,
  ConferenceNavigationItem,
} from "@/app/conference-system/navigation";

type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "conference"; href: string; label: string }
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
            href: "/interactive-flat-panel/",
            label: "Interactive Flat Panel",
            desc: "Smart classroom & meeting display",
          },
          {
            href: "/digital-podium/",
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
  { type: "conference", href: "/conference-system/", label: "Conference System" },
  { type: "link", href: "/turnstile-gate/", label: "Turnstile Gate" },
  {
    type: "dropdown",
    href: "/about/",
    label: "About",
    groups: [
      {
        title: "About",
        items: [
          {
            href: "/about/",
            label: "About Us",
            desc: "Company profile and service approach",
          },
          {
            href: "/about/message-from-founder/",
            label: "Message from Founder",
            desc: "Founder's note and vision",
          },
        ],
      },
    ],
  },
  { type: "link", href: "/contact/", label: "Contact" },
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

/* ---------------------------------------------------------------------------
 * Header submenu design system
 * One card, one panel shell, one section heading — shared by the LED display,
 * About, and Conference menus. Structure stays muted; the Sasha orange is
 * reserved for interaction and for the page you are on.
 * ------------------------------------------------------------------------ */

const MENU_PANEL_CLASS = cn(
  "rounded-xl border border-slate-200/90 bg-white text-slate-900",
  "shadow-[0_4px_6px_-4px_rgba(15,23,42,0.08),0_20px_40px_-24px_rgba(15,23,42,0.55)]",
);

const MENU_SECTION_HEADING_CLASS =
  "flex items-center gap-1.5 whitespace-nowrap border-b border-slate-100 px-3 pb-2 text-[10px] font-extrabold uppercase leading-4 tracking-[0.16em] text-slate-400";

/** Section glyphs: 24px grid, stroked, sized down to 12px beside the muted caps label. */
const CONFERENCE_SECTION_ICONS: Record<ConferenceNavigationGroup["id"], React.ReactNode> = {
  system: (
    <>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v4M8.5 21.5h7" />
    </>
  ),
  component: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </>
  ),
  brand: (
    <>
      <path d="M3.5 11.2V4.9a1.4 1.4 0 0 1 1.4-1.4h6.3a1.4 1.4 0 0 1 1 .4l8 8a1.4 1.4 0 0 1 0 2l-6.3 6.3a1.4 1.4 0 0 1-2 0l-8-8a1.4 1.4 0 0 1-.4-1Z" />
      <path d="M7.8 7.8h.01" />
    </>
  ),
  package: (
    <>
      <path d="M12 3.2 20.3 7.6v8.8L12 20.8 3.7 16.4V7.6L12 3.2Z" />
      <path d="m3.7 7.6 8.3 4.4 8.3-4.4M12 12v8.8" />
    </>
  ),
};

function MenuSectionHeading({
  id,
  icon,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <p id={id} className={MENU_SECTION_HEADING_CLASS}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-3 w-3 shrink-0 fill-none stroke-[#FD6900]"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      {children}
    </p>
  );
}

const MENU_CARD_CLASS = cn(
  "group/item relative flex items-center gap-2 rounded-lg py-2 pl-3 pr-2.5 text-[13.5px] font-semibold leading-5 transition-colors duration-200",
  "before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-[#FD6900] before:transition-opacity before:duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45",
);

const MENU_CARD_RESTING_CLASS = cn(
  "text-slate-600 before:opacity-0",
  "hover:bg-orange-50/80 hover:text-[#C2410C] hover:before:opacity-100",
  "focus-visible:bg-orange-50/80 focus-visible:text-[#C2410C] focus-visible:before:opacity-100",
);

const MENU_CARD_CURRENT_CLASS = "bg-orange-50 text-[#C2410C] before:opacity-100";

function menuCardClass(isCurrent: boolean) {
  return cn(MENU_CARD_CLASS, isCurrent ? MENU_CARD_CURRENT_CLASS : MENU_CARD_RESTING_CLASS);
}

/** The caret on a nav trigger: one glyph for the LED display, About, and Conference menus. */
function MenuTriggerChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-200", className)}
    >
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuCardChevron({ isCurrent }: { isCurrent: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "ml-auto shrink-0 transition duration-200 group-hover/item:translate-x-0.5",
        isCurrent ? "text-[#FD6900]" : "text-slate-300 group-hover/item:text-[#FD6900]",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none">
        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Desktop column order puts the denser Brand list beside System/Components so Package can close the row as a CTA. */
const CONFERENCE_MENU_COLUMN_ORDER = ["system", "component", "brand"] as const;

function ConferenceDesktopNavItem({
  href,
  label,
  active,
  isScrolled,
  onNavigate,
  navigationGroups,
  brandsHubLink,
  isItemCurrent,
}: {
  href: string;
  label: string;
  active: boolean;
  isScrolled: boolean;
  onNavigate: (event: React.MouseEvent) => void;
  navigationGroups: readonly ConferenceNavigationGroup[];
  brandsHubLink: ConferenceNavigationItem;
  isItemCurrent: (href: string) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = "conference-desktop-mega-menu";

  const groupsById = useMemo(() => {
    const map = new Map<ConferenceNavigationGroup["id"], ConferenceNavigationGroup>();
    for (const group of navigationGroups) map.set(group.id, group);
    return map;
  }, [navigationGroups]);

  const linkColumns = useMemo(
    () =>
      CONFERENCE_MENU_COLUMN_ORDER.map((id) => groupsById.get(id)).filter(
        (group): group is ConferenceNavigationGroup => Boolean(group),
      ),
    [groupsById],
  );

  const packageGroup = groupsById.get("package");
  const packageItem = packageGroup?.items[0];

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const openMenu = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const scheduleCloseMenu = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => setIsOpen(false), 140);
  };

  const closeAndNavigate = (event: React.MouseEvent) => {
    setIsOpen(false);
    onNavigate(event);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      data-conference-desktop-nav
      onMouseEnter={openMenu}
      onMouseLeave={scheduleCloseMenu}
      onFocusCapture={(event) => {
        const focusedElement = event.target as HTMLElement;
        if (focusedElement !== triggerRef.current) openMenu();
      }}
      onBlurCapture={() => {
        window.requestAnimationFrame(() => {
          if (!wrapperRef.current?.contains(document.activeElement)) setIsOpen(false);
        });
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }}
    >
      <div
        className={cn(
          "inline-flex overflow-hidden rounded-lg transition",
          active
            ? "bg-[#FD6900] text-white"
            : isScrolled
              ? "text-slate-100 hover:bg-white/10"
              : "text-black hover:bg-slate-100",
        )}
      >
        <Link
          prefetch={false}
          href={href}
          onClick={closeAndNavigate}
          onFocus={openMenu}
          className="inline-flex min-h-9 items-center whitespace-nowrap py-2 pl-2 pr-0 text-sm xl:pl-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-300"
        >
          {label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-label={`${isOpen ? "Close" : "Open"} Conference System menu`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex min-h-9 items-center justify-center py-2 pl-1 pr-2 text-xs xl:pr-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-300"
        >
          <MenuTriggerChevron className={isOpen ? "rotate-180" : undefined} />
        </button>
      </div>

      <div
        id={panelId}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}
        aria-hidden={!isOpen}
        className={cn(
          "fixed left-1/2 top-[var(--site-header-height)] z-[90] w-[min(660px,calc(100vw-2rem))] -translate-x-1/2 pt-2 transition-all duration-150 ease-out lg:w-[min(872px,calc(100vw-3rem))]",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <nav aria-label="Conference System navigation" className={cn(MENU_PANEL_CLASS, "p-3")}>
          <div
            className={cn(
              "grid grid-cols-2 gap-x-3 gap-y-5 lg:gap-y-0",
              packageItem ? "lg:grid-cols-[1.15fr_0.95fr_0.82fr_1.08fr]" : "lg:grid-cols-3",
            )}
          >
            {linkColumns.map((group) => (
              <section
                key={group.id}
                aria-labelledby={`conference-desktop-group-${group.id}`}
                className="flex min-w-0 flex-col"
              >
                <MenuSectionHeading
                  id={`conference-desktop-group-${group.id}`}
                  icon={CONFERENCE_SECTION_ICONS[group.id]}
                >
                  {group.title}
                </MenuSectionHeading>
                <ul className="mt-1.5 space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        prefetch={false}
                        href={item.href}
                        aria-current={isItemCurrent(item.href) ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={menuCardClass(isItemCurrent(item.href))}
                      >
                        {item.label}
                        <MenuCardChevron isCurrent={isItemCurrent(item.href)} />
                      </Link>
                    </li>
                  ))}
                </ul>
                {group.id === "brand" ? (
                  <div className="mt-1.5 border-t border-slate-100 pt-1.5">
                    <Link
                      prefetch={false}
                      href={brandsHubLink.href}
                      aria-current={isItemCurrent(brandsHubLink.href) ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group/hub flex items-center gap-1.5 whitespace-nowrap rounded-lg py-1.5 pl-3 pr-2.5 text-[11.5px] font-extrabold uppercase leading-4 tracking-[0.05em] text-[#C2410C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45",
                        isItemCurrent(brandsHubLink.href) ? "bg-orange-50" : "hover:bg-orange-50/80 focus-visible:bg-orange-50/80",
                      )}
                    >
                      {brandsHubLink.label}
                      <span
                        aria-hidden="true"
                        className="ml-auto text-[#FD6900] transition-transform duration-200 group-hover/hub:translate-x-0.5"
                      >
                        {"\u2192"}
                      </span>
                    </Link>
                  </div>
                ) : null}
              </section>
            ))}

            {packageGroup && packageItem ? (
              <section
                aria-labelledby={`conference-desktop-group-${packageGroup.id}`}
                className="flex min-w-0 flex-col"
              >
                <MenuSectionHeading
                  id={`conference-desktop-group-${packageGroup.id}`}
                  icon={CONFERENCE_SECTION_ICONS[packageGroup.id]}
                >
                  {packageGroup.title}
                </MenuSectionHeading>
                <Link
                  prefetch={false}
                  href={packageItem.href}
                  aria-label={packageItem.label}
                  aria-current={isItemCurrent(packageItem.href) ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group/package mt-1.5 flex flex-1 flex-col rounded-lg border p-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD6900]/45",
                    isItemCurrent(packageItem.href)
                      ? "border-[#FD6900]/40 bg-orange-50"
                      : "border-slate-200/90 bg-slate-50/70 hover:border-[#FD6900]/35 hover:bg-orange-50/70 focus-visible:border-[#FD6900]/35 focus-visible:bg-orange-50/70",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80 transition-colors duration-200 group-hover/package:ring-[#FD6900]/30"
                  >
                    <Image
                      src="/images/conference_landing/complete-conference-package-thumbnail.webp"
                      alt=""
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </span>
                  <span className="mt-auto flex items-center gap-1 pt-3 text-[11.5px] font-extrabold uppercase leading-4 tracking-[0.06em] text-[#C2410C]">
                    Explore Packages
                    <span
                      aria-hidden="true"
                      className="text-[#FD6900] transition-transform duration-200 group-hover/package:translate-x-0.5"
                    >
                      {"\u2192"}
                    </span>
                  </span>
                </Link>
              </section>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  );
}

function LedDesktopNavItem({
  item,
  active,
  isScrolled,
  onNavigate,
  isItemCurrent,
}: {
  item: Extract<NavItem, { type: "dropdown" }>;
  active: boolean;
  isScrolled: boolean;
  onNavigate: (href: string) => (event: React.MouseEvent) => void;
  isItemCurrent: (href: string, parentHref: string) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const suppressFocusOpenRef = useRef(false);
  const panelId = "led-display-desktop-menu";

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const closeAndNavigate = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    event.currentTarget.blur();
    onNavigate(href)(event);
  };

  return (
    <div
      ref={wrapperRef}
      className="group relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={(event) => {
        if (suppressFocusOpenRef.current) {
          suppressFocusOpenRef.current = false;
          return;
        }
        if ((event.target as EventTarget) !== triggerRef.current) setIsOpen(true);
      }}
      onBlurCapture={() => {
        window.requestAnimationFrame(() => {
          if (!wrapperRef.current?.contains(document.activeElement)) setIsOpen(false);
        });
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        const shouldMoveFocus = document.activeElement !== triggerRef.current;
        suppressFocusOpenRef.current = shouldMoveFocus;
        setIsOpen(false);
        if (shouldMoveFocus) triggerRef.current?.focus();
      }}
    >
      <Link
        ref={triggerRef}
        prefetch={false}
        href={item.href}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onFocus={() => {
          if (suppressFocusOpenRef.current) {
            suppressFocusOpenRef.current = false;
            return;
          }
          setIsOpen(true);
        }}
        onClick={closeAndNavigate(item.href)}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium transition xl:px-3",
          active
            ? isScrolled
              ? "bg-[#FD6900] text-white"
              : "bg-slate-900 text-white"
            : isScrolled
              ? "text-slate-100 hover:bg-white/10"
              : "text-black hover:bg-slate-100",
        )}
      >
        {item.label}
        <MenuTriggerChevron className={isOpen ? "rotate-180" : undefined} />
      </Link>

      <div className="absolute left-0 top-full h-3 w-56" aria-hidden="true" />

      <div
        id={panelId}
        aria-label="LED display navigation"
        className={cn(
          "absolute left-0 top-full z-50 mt-3 w-[306px] p-2",
          MENU_PANEL_CLASS,
          "transition duration-200 ease-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-1 opacity-0",
        )}
      >
        {item.groups.map((group) => (
          <ul key={group.title} className="space-y-0.5">
            {group.items.map((menuItem) => {
              const isCurrent = isItemCurrent(menuItem.href, item.href);
              return (
                <li key={menuItem.href}>
                  <Link
                    prefetch={false}
                    href={menuItem.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={closeAndNavigate(menuItem.href)}
                    className={menuCardClass(isCurrent)}
                  >
                    {menuItem.label}
                    <MenuCardChevron isCurrent={isCurrent} />
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Header({
  conferenceNavigationGroups,
  conferenceBrandsHubLink,
}: {
  conferenceNavigationGroups: readonly ConferenceNavigationGroup[];
  conferenceBrandsHubLink: ConferenceNavigationItem;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPathname = pathname.replace(/\/+$/, "");
  const isLedDisplayLanding = normalizedPathname === "/led-display";
  const isRentalDisplayLanding = normalizedPathname === "/led-display/rental-display";
  const isIndoorOutdoorLanding = normalizedPathname === "/led-display/indoor-led" || normalizedPathname === "/led-display/outdoor";
  const isInteractiveFlatPanelLanding = normalizedPathname === "/interactive-flat-panel";
  const isDigitalPodiumLanding = normalizedPathname === "/digital-podium";
  const isPaSystemLanding = normalizedPathname === "/pa-system";
  const isLedAccessoryLanding = ["receiving-card", "controller", "power-supply", "led-accessories"].some(
    (category) => normalizedPathname === `/led-display/accessories/${category}`,
  );
  const useHomeResponsiveHeader = pathname === "/" || isLedDisplayLanding || isRentalDisplayLanding || isIndoorOutdoorLanding || isInteractiveFlatPanelLanding || isDigitalPodiumLanding || isLedAccessoryLanding || isPaSystemLanding;
  const useConferenceTabletHeader =
    useHomeResponsiveHeader || pathname.startsWith("/conference-system");
  const hasFlushConferenceHero = [
    "/conference-system/audio-conference-system",
    "/conference-system/digital-conference-system",
    "/conference-system/video-conference-system",
    "/conference-system/paperless-conference-system",
    "/conference-system/wired-conference-system",
    "/conference-system/wireless-conference-system",
    "/conference-system/chairman-unit",
    "/conference-system/delegate-unit",
    "/conference-system/control-unit",
    "/conference-system/conference-dsp",
    "/conference-system/conference-amplifier",
    "/conference-system/brands/bosch",
    "/conference-system/brands/toa",
    "/conference-system/brands/spon",
    "/conference-system/brands/cmx",
    "/conference-system/brands",
  ].includes(normalizedPathname);
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileConferenceOpen, setMobileConferenceOpen] = useState(false);
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

  /** Exact-match current page, so a brand page never also lights up the "View All Brands" hub. */
  const isMenuItemCurrent = useMemo(() => {
    const normalize = (value: string) => {
      const trimmed = value.split("?")[0].replace(/\/+$/, "");
      return trimmed === "" ? "/" : trimmed;
    };
    const currentPath = normalize(pathname);
    return (href: string) => normalize(href) === currentPath;
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
    const timer = window.setTimeout(() => {
      setOpen(false);
      setMobileProductsOpen(false);
      setMobileConferenceOpen(false);
      setMobileAboutOpen(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileConferenceOpen) {
        setMobileConferenceOpen(false);
      } else if (mobileProductsOpen) {
        setMobileProductsOpen(false);
      } else if (mobileAboutOpen) {
        setMobileAboutOpen(false);
      } else {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileAboutOpen, mobileConferenceOpen, mobileProductsOpen, open]);

  return (
    <header
      data-home-header={useHomeResponsiveHeader ? "true" : undefined}
      className={cn(
        "site-header sticky inset-x-0 top-0 z-[80] w-full transition-colors duration-300",
        isScrolled
          ? hasFlushConferenceHero ? "bg-[#091931] shadow-none" : "bg-[#091931] shadow-md"
          : hasFlushConferenceHero ? "bg-white shadow-none" : "bg-white"
      )}
    >
      <div
        className={cn(
          "site-header-inner mx-auto flex h-[var(--site-header-height)] items-center gap-1.5 px-3 py-0 md:gap-0 md:pl-3 md:pr-4",
          useConferenceTabletHeader ? "w-full max-w-[clamp(80rem,90vw,108rem)]" : "max-w-7xl",
        )}
      >
        <Link prefetch={false} href="/" onClick={handleNavClick("/")} className="flex shrink-0 items-center gap-2">
          <div className="site-header-logo relative h-11 w-[88px] shrink-0 overflow-visible rounded-md sm:h-[46px] sm:w-[92px] md:h-20 md:w-36">
            <Image
              src={isScrolled ? "/sasha-corporation-after-scroll.png" : "/sasha-corporation-final-l.webp"}
              alt={`${BRAND_NAME} logo`}
              fill
              className="object-contain object-left scale-100 md:scale-100"
              sizes="(min-width: 1440px) 180px, (min-width: 768px) 144px, 92px"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1 min-[1200px]:hidden">
          <HeaderSearch isScrolled={isScrolled} inputId="header-search-mobile" className="max-w-none" />
        </div>

        <div className="site-header-search hidden min-w-0 flex-1 items-center px-4 min-[1200px]:flex">
          <HeaderSearch isScrolled={isScrolled} inputId="header-search-desktop" />
        </div>

        <a
          href={`tel:${siteConfig.phone}`}
          aria-label="Call now"
          className={cn(
            "inline-flex h-[2.35rem] w-[2.35rem] shrink-0 items-center justify-center rounded-full border shadow-sm transition",
            "min-[1200px]:hidden",
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
        <nav className="site-header-nav ml-auto hidden items-center gap-0.5 min-[1200px]:flex xl:gap-1">
          {nav.map((item) => {
            if (item.type === "conference") {
              return (
                <ConferenceDesktopNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={activeHref(item.href)}
                  isScrolled={isScrolled}
                  onNavigate={handleNavClick(item.href)}
                  navigationGroups={conferenceNavigationGroups}
                  brandsHubLink={conferenceBrandsHubLink}
                  isItemCurrent={isMenuItemCurrent}
                />
              );
            }

            // normal link
            if (item.type === "link") {
              return (
                <Link key={item.href}
                  prefetch={false}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium transition xl:px-3",
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

            // hover dropdown
            const isAboutDropdown = item.href === "/about/";
            if (!isAboutDropdown) {
              return (
                <LedDesktopNavItem
                  key={item.href}
                  item={item}
                  active={activeHref(item.href)}
                  isScrolled={isScrolled}
                  onNavigate={(href) => handleNavClick(href)}
                  isItemCurrent={activeDropdownItemHref}
                />
              );
            }
            const dropdownActiveClass = isScrolled ? "bg-[#FD6900] text-white" : "bg-slate-900 text-white";
            return (
              <div key={item.href} className="relative group">
                {/* Trigger */}
                <Link prefetch={false} href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={cn(
                    "inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium transition xl:px-3",
                    activeHref(item.href)
                      ? dropdownActiveClass
                      : isScrolled
                        ? "text-slate-100 hover:bg-white/10"
                        : "text-black hover:bg-slate-100"
                  )}
                >
                  {item.label}
                  <MenuTriggerChevron className="group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>

                {/* Hover bridge: trigger to dropdown */}
                <div className="absolute left-0 top-full h-3 w-56" />

                {/* Dropdown */}
                <div
                  className={cn(
                    "absolute left-0 top-full z-50 mt-3 p-2",
                    MENU_PANEL_CLASS,
                    isAboutDropdown ? "w-[264px]" : "w-[306px]",
                    "invisible translate-y-1 opacity-0 transition duration-200 ease-out",
                    "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                    "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                  )}
                >
                  {item.groups.map((g) => (
                    <ul key={g.title} className="space-y-0.5">
                      {g.items.map((x) => {
                        const isCurrent = activeDropdownItemHref(x.href, item.href);
                        return (
                          <li key={x.href}>
                            <Link
                              prefetch={false}
                              href={x.href}
                              aria-current={isCurrent ? "page" : undefined}
                              onClick={handleNavClick(x.href)}
                              className={menuCardClass(isCurrent)}
                            >
                              {x.label}
                              <MenuCardChevron isCurrent={isCurrent} />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </div>
              </div>
            );
          })}

          <a
            href={`tel:${siteConfig.phone}`}
            aria-label="Call now"
            className="shine-button ml-1.5 inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-3 py-2 xl:ml-2 xl:min-w-[150px] xl:px-4 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {siteConfig.phone}
          </a>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className={cn(
            "inline-flex h-[2.35rem] w-[2.35rem] shrink-0 items-center justify-center rounded-full border text-[18px] leading-none shadow-sm",
            "min-[1200px]:hidden",
            isScrolled
              ? "border-cyan-400/50 bg-white/10 text-white"
              : "border-cyan-300/80 bg-white text-slate-900"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-site-navigation"
        >
          {open ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div id="mobile-site-navigation" className="border-t bg-white min-[1200px]:hidden">
          <div className="mx-auto max-h-[calc(100svh-var(--site-header-height))] max-w-7xl overflow-y-auto overscroll-contain px-4 pb-24 pt-3">
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
                type="button"
                aria-expanded={mobileProductsOpen}
                aria-controls="mobile-led-navigation"
                onClick={() => {
                  setMobileProductsOpen((v) => !v);
                  setMobileConferenceOpen(false);
                  setMobileAboutOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                  activeHref("/led-display")
                    ? "bg-[#FD6900] text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                Led display <span>{mobileProductsOpen ? "\u25B4" : "\u25BE"}</span>
              </button>

              {mobileProductsOpen && (
                <div id="mobile-led-navigation" className="rounded-lg border bg-white p-2">
                  {[
                    { href: "/led-display/", label: "LED Display" },
                    { href: "/led-display/indoor-led/", label: "Indoor LED Display" },
                    { href: "/led-display/outdoor/", label: "Outdoor LED Display" },
                    { href: "/led-display/rental-display/", label: "Rental LED Display" },
                    { href: "/interactive-flat-panel/", label: "Interactive Flat Panel" },
                    { href: "/digital-podium/", label: "Digital Podium" },
                    { href: "/led-display/accessories/receiving-card/", label: "Receiving Card" },
                    { href: "/led-display/accessories/controller/", label: "Controller" },
                    { href: "/led-display/accessories/power-supply/", label: "Power Supply" },
                    { href: "/led-display/accessories/led-accessories/", label: "LED Accessories" },
                  ].map((x) => (
	                    <Link key={x.href}
	                      prefetch={false}
	                      href={x.href}
                      aria-current={activeDropdownItemHref(x.href, "/led-display/") ? "page" : undefined}
                      onClick={(e) => {
                        handleNavClick(x.href, { closeMobile: true })(e);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative block rounded-lg px-3 py-2 text-sm transition",
                        activeDropdownItemHref(x.href, "/led-display/")
                          ? "bg-orange-50 pl-5 font-semibold text-[#C2410C]"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {activeDropdownItemHref(x.href, "/led-display/") ? (
                        <span
                          className="absolute left-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#FD6900]"
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

              <button
                type="button"
                aria-expanded={mobileConferenceOpen}
                aria-controls="mobile-conference-navigation"
                onClick={() => {
                  setMobileConferenceOpen((value) => !value);
                  setMobileProductsOpen(false);
                  setMobileAboutOpen(false);
                }}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
                  activeHref("/conference-system/")
                    ? "bg-[#FD6900] text-white"
                    : "bg-slate-50 text-slate-700"
                )}
              >
                Conference System
                <svg viewBox="0 0 20 20" className={cn("h-4 w-4 transition-transform", mobileConferenceOpen && "rotate-180")} fill="none" aria-hidden="true">
                  <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {mobileConferenceOpen ? (
                <div id="mobile-conference-navigation" className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                  <Link
                    prefetch={false}
                    href="/conference-system/"
                    onClick={(event) => {
                      handleNavClick("/conference-system/", { closeMobile: true })(event);
                      setMobileConferenceOpen(false);
                      setOpen(false);
                    }}
                    className="flex min-h-11 items-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    All Conference Systems
                  </Link>

                  <div className="mt-2 space-y-3">
                    {conferenceNavigationGroups.map((group) => (
                      <section key={group.id} aria-labelledby={`conference-mobile-group-${group.id}`}>
                        <MenuSectionHeading
                          id={`conference-mobile-group-${group.id}`}
                          icon={CONFERENCE_SECTION_ICONS[group.id]}
                        >
                          {group.title}
                        </MenuSectionHeading>
                        <ul className="space-y-0.5">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                prefetch={false}
                                href={item.href}
                                aria-current={activeDropdownItemHref(item.href, "/conference-system/") ? "page" : undefined}
                                onClick={(event) => {
                                  handleNavClick(item.href, { closeMobile: true })(event);
                                  setMobileConferenceOpen(false);
                                  setOpen(false);
                                }}
                                className={cn(
                                  "relative flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
                                  activeDropdownItemHref(item.href, "/conference-system/")
                                    ? "bg-orange-50 pl-5 font-semibold text-[#C2410C]"
                                    : "text-slate-700 hover:bg-slate-50",
                                )}
                              >
                                {activeDropdownItemHref(item.href, "/conference-system/") ? (
                                  <span
                                    className="absolute left-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#FD6900]"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                {item.shortLabel ?? item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {group.id === "brand" ? (
                          <Link
                            prefetch={false}
                            href={conferenceBrandsHubLink.href}
                            onClick={(event) => {
                              handleNavClick(conferenceBrandsHubLink.href, { closeMobile: true })(event);
                              setMobileConferenceOpen(false);
                              setOpen(false);
                            }}
                            className="mt-1 flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-extrabold text-orange-700 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                          >
                            {conferenceBrandsHubLink.label} <span aria-hidden="true" className="ml-1">{"\u2192"}</span>
                          </Link>
                        ) : null}
                      </section>
                    ))}
                  </div>
                </div>
              ) : null}

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
                type="button"
                aria-expanded={mobileAboutOpen}
                aria-controls="mobile-about-navigation"
                onClick={() => {
                  setMobileAboutOpen((v) => !v);
                  setMobileProductsOpen(false);
                  setMobileConferenceOpen(false);
                }}
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
                <div id="mobile-about-navigation" className="rounded-lg border bg-white p-2">
                  <div className="px-2 py-1 text-xs font-bold text-slate-900">
                    About
                  </div>
                  {[
                    { href: "/about/", label: "About Us" },
                    { href: "/about/message-from-founder/", label: "Message from Founder" },
                  ].map((x) => (
	                    <Link key={x.href}
	                      prefetch={false}
	                      href={x.href}
                      aria-current={activeDropdownItemHref(x.href, "/about") ? "page" : undefined}
                      onClick={(e) => {
                        handleNavClick(x.href, { closeMobile: true })(e);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative block rounded-lg px-3 py-2 text-sm transition",
                        activeDropdownItemHref(x.href, "/about")
                          ? "bg-orange-50 pl-5 font-semibold text-[#C2410C]"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {activeDropdownItemHref(x.href, "/about") ? (
                        <span
                          className="absolute left-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#FD6900]"
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
                { href: "/contact/", label: "Contact" },
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
