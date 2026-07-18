"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type BottomNavItem = {
  href: string;
  label: string;
  matchPrefix?: string;
  icon: React.ReactNode;
};

const navItems: BottomNavItem[] = [
  {
    href: "/",
    label: "Home",
    matchPrefix: "/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.5 20v-5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/led-display/",
    label: "Products",
    matchPrefix: "/led-display",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="14" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    href: "/led-display/rental-display/",
    label: "Rental",
    matchPrefix: "/led-display/rental-display",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="5" y="4.5" width="14" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 2.8v3.4M16 2.8v3.4M5 9h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/projects/",
    label: "Projects",
    matchPrefix: "/projects",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 6.5h8l2 2H19v9.5A1.5 1.5 0 0 1 17.5 19h-11A1.5 1.5 0 0 1 5 17.5v-11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/contact/",
    label: "Contact",
    matchPrefix: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5.5 6.5c0 6.1 5.9 12 12 12h1.5a1.5 1.5 0 0 0 1.5-1.5v-2.1a1.5 1.5 0 0 0-1.2-1.47l-2.29-.46a1.5 1.5 0 0 0-1.43.45l-.5.5a12.7 12.7 0 0 1-4.97-4.97l.5-.5a1.5 1.5 0 0 0 .45-1.43l-.46-2.29A1.5 1.5 0 0 0 9.1 4H7a1.5 1.5 0 0 0-1.5 1.5v1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const nearTop = currentScrollY < 24;

      setIsVisible(nearTop || scrollingUp);
      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPath = normalizePath(pathname);

  return (
    <nav
      aria-label="Mobile quick navigation"
      className={`fixed inset-x-0 bottom-0 z-[85] border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid h-15 grid-cols-5 items-stretch">
        {navItems.map((item) => {
          const targetPath = normalizePath(item.matchPrefix ?? item.href);
          const isActive =
            targetPath === "/"
              ? currentPath === "/"
              : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

          return (
            <Link
              key={item.href}
              prefetch={false}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-1 text-center transition ${isActive ? "text-[#0F7D99]" : "text-slate-500"}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`absolute left-1/2 top-0 h-0.5 w-10 -translate-x-1/2 rounded-full transition ${isActive ? "bg-[#67E8F9]" : "bg-transparent"}`}
              />
              <span>{item.icon}</span>
              <span className={`text-[10px] font-semibold leading-none ${isActive ? "text-[#0F7D99]" : "text-slate-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
