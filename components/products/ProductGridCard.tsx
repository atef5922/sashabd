import Link from "next/link";
import { looksLikePriceText, normalizeDisplayedPriceText } from "@/lib/price";
import { formatProductCardHighlights } from "@/lib/productCardHighlights";

type BadgeTone = "light" | "dark";

export type ProductGridCardProps = {
  href: string;
  title: string;
  image: React.ReactNode;
  imageContainerClassName?: string;
  borderColor?: string;
  topLeftBadge?: { text: string; tone?: BadgeTone };
  topRightBadge?: { text: string; tone?: BadgeTone };
  metaLines?: Array<{ text: string; className?: string }>;
  bullets: readonly string[];
  chips: readonly string[];
  accentColor?: string;
  contactHref?: string;
  viewDetailsLabel?: string;
  compactMobile?: boolean;
  cardClassName?: string;
};

function isListingMetaLine(text: string): boolean {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return false;

  return (
    looksLikePriceText(normalized) ||
    /^price\s*:/i.test(normalized) ||
    /^pixel pitch\s*:/i.test(normalized) ||
    /^starting from/i.test(normalized) ||
    /^on request/i.test(normalized)
  );
}

function subtitleToHighlights(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").replace(/\.$/, "").trim();
  if (!normalized) return [];

  const primary = normalized
    .split(/[\u2022\u2013\u2014.;]/g)
    .map((x) => x.trim())
    .filter((x) => x.length >= 6);

  if (primary.length >= 2) return primary.slice(0, 4);

  const secondary = normalized
    .split(/(?:,\s*|\/|\s+with\s+|\s+for\s+|\s+and\s+)/i)
    .map((x) => x.trim())
    .filter((x) => x.length >= 6);

  return (secondary.length ? secondary : [normalized]).slice(0, 4);
}

function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function normalizeCompareText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function shouldReplaceWeakHighlights(bullets: readonly string[], chips: readonly string[]): boolean {
  if (!bullets.length) return true;

  const chipSet = new Set(chips.map((chip) => normalizeCompareText(chip)));
  const candidates = bullets
    .map((item) => item.replace(/^[\-\u2022\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 4);

  if (!candidates.length) return true;

  const weakCount = candidates.filter((item) => {
    const normalized = normalizeCompareText(item);
    return wordCount(item) <= 3 || chipSet.has(normalized);
  }).length;

  return weakCount >= Math.min(3, candidates.length);
}

function getContextualFallbacks(title: string, bullets: readonly string[], chips: readonly string[]): string[] {
  const haystack = `${title} ${bullets.join(" ")} ${chips.join(" ")}`.toLowerCase();

  if (/(pa|speaker|amplifier|microphone|conference)/.test(haystack)) {
    if (/analog.*100v|100v.*analog/.test(haystack)) {
      return [
        "100V line zoning for building-wide announcements",
        "Clear voice coverage for school and office spaces",
        "Background music and paging workflow support",
        "Project-based cabling and installation planning",
      ];
    }

    if (/portable.*pa|speaker amplifier|wireless mic|battery/.test(haystack)) {
      return [
        "Portable voice coverage for training and small events",
        "Wireless microphone support for presenters and operators",
        "Battery-backed or mobile-friendly PA operation",
        "Quick setup workflow for coaching and temporary use",
      ];
    }

    if (/classroom/.test(haystack)) {
      return [
        "Clear teacher voice coverage across classroom seating",
        "Compact amplifier and speaker package planning",
        "Everyday announcement and lesson support workflow",
        "Reliable installation for schools and training rooms",
      ];
    }

    if (/conference|delegate|chairman|boardroom|discussion/.test(haystack)) {
      return [
        "Structured chairman and delegate discussion workflow",
        "Clear speech pickup for professional meetings",
        "Meeting-room control and system integration support",
        "Reliable operation for boardroom and conference use",
      ];
    }

    return [
      "Clear voice coverage planning",
      "Installation and zoning support",
      "Selection and quotation guidance",
      "Reliable day-to-day operation",
    ];
  }

  if (/(turnstile|barrier|access|rfid|biometric|attendance)/.test(haystack)) {
    if (/tripod/.test(haystack)) {
      return [
        "Tripod barrier workflow for controlled staff entry",
        "RFID, biometric, and attendance integration ready",
        "Stable pedestrian flow for office and factory use",
        "Professional installation and access-planning support",
      ];
    }

    if (/flap|optical/.test(haystack)) {
      return [
        "Optical flap-barrier control for modern lobby access",
        "Sensor-based passage workflow with cleaner entry control",
        "RFID or biometric integration for managed access points",
        "Professional setup for office, bank, and reception use",
      ];
    }

    if (/swing|speed gate|wide lane/.test(haystack)) {
      return [
        "Fast passage workflow for premium entrance projects",
        "Wide-lane friendly access planning for visitor movement",
        "Sensor-ready integration for controlled gate operation",
        "Professional setup for corporate and commercial entries",
      ];
    }

    if (/full height|restricted|high security/.test(haystack)) {
      return [
        "Full-height security control for restricted entry zones",
        "Project-ready access logging and device integration",
        "Heavy-duty workflow for factory and perimeter access",
        "Professional installation support for high-security sites",
      ];
    }

    if (/face recognition|smart gate/.test(haystack)) {
      return [
        "Face-recognition workflow for smart access control",
        "Attendance and HR integration ready",
        "Managed visitor and staff entry planning",
        "Professional setup for modern security projects",
      ];
    }

    return [
      "Access-control integration ready",
      "Smooth entry workflow planning",
      "Professional installation support",
      "Reliable daily operation",
    ];
  }

  if (/(interactive|panel|podium|display|boardroom|classroom)/.test(haystack)) {
    if (/podium/.test(haystack)) {
      return [
        "Touch-display workflow for lecture and presentation control",
        "Integrated mic and AV input planning for live sessions",
        "Cleaner cable management for classrooms and auditoriums",
        "Professional setup for seminars and training delivery",
      ];
    }

    if (/interactive|panel|touch/.test(haystack)) {
      return [
        "Touch-ready collaboration for meetings and classrooms",
        "4K presentation workflow for training and teaching use",
        "Wireless sharing and annotation friendly setup",
        "Professional installation and handover support",
      ];
    }

    return [
      "Professional presentation workflow",
      "Touch-ready collaboration support",
      "Installation and setup planning",
      "Training and handover support",
    ];
  }

  if (/(controller|receiving card|processor|novastar|huidu|colorlight)/.test(haystack)) {
    return [
      "Stable control system workflow",
      "Project-ready signal planning",
      "Installation and mapping support",
      "Reliable long-term operation",
    ];
  }

  if (/(power supply|smps|power)/.test(haystack)) {
    return [
      "Stable power delivery planning",
      "Protection-focused installation support",
      "Project-ready load management",
      "Reliable long-term operation",
    ];
  }

  if (/(accessory|connector|cable|mounting|flight case|magnet)/.test(haystack)) {
    return [
      "Service-friendly installation support",
      "Project-ready accessory planning",
      "Clean cabinet integration workflow",
      "Reliable maintenance support",
    ];
  }

  return [
    "Project-ready configuration",
    "Professional installation planning",
    "Selection and quotation support",
    "Reliable long-term operation",
  ];
}

function buildUniformHighlights(title: string, bullets: readonly string[], metaFallback: readonly string[], chips: readonly string[]): string[] {
  const collected: string[] = [];
  const seen = new Set<string>();
  const push = (items: readonly string[]) => {
    for (const item of items) {
      const cleaned = item.replace(/\s+/g, " ").trim();
      if (!cleaned) continue;
      const key = cleaned.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      collected.push(cleaned);
      if (collected.length === 4) return;
    }
  };

  const preferContextualFirst = shouldReplaceWeakHighlights(bullets, chips);

  if (!preferContextualFirst) {
    push(formatProductCardHighlights(bullets));
  }
  if (collected.length < 4) push(formatProductCardHighlights(metaFallback.flatMap(subtitleToHighlights)));
  if (collected.length < 4) push(getContextualFallbacks(title, bullets, chips));
  if (collected.length < 4 && preferContextualFirst) {
    push(formatProductCardHighlights(bullets));
  }

  return collected.slice(0, 4);
}

export default function ProductGridCard({
  href,
  title,
  image,
  bullets,
  chips,
  imageContainerClassName = "bg-slate-50",
  borderColor = "rgba(255,106,0,0.12)",
  topLeftBadge,
  topRightBadge,
  metaLines = [],
  contactHref = "/contact/",
  compactMobile = false,
  cardClassName,
  viewDetailsLabel = "View details ->",
}: ProductGridCardProps) {
  const displayTitle = title.replace(/\s*&\s*/g, " and ");
  const safeViewDetailsLabel = viewDetailsLabel
    .replace(/[^ -~]+/g, "->")
    .replace(/\?/g, "->");
  const visibleMetaLines = metaLines.filter((m) => isListingMetaLine(m.text));
  const hiddenMetaFallback = metaLines.filter((m) => !isListingMetaLine(m.text)).map((m) => m.text);
  const visibleBullets = buildUniformHighlights(displayTitle, bullets, hiddenMetaFallback, chips);
  const visibleChips = Array.from(
    new Set(
      chips
        .map((chip) => chip.replace(/\s+/g, " ").trim())
        .filter(Boolean),
    ),
  ).slice(0, 3);
  const normalizeMetaLineText = (text: string) => {
    const compactText = text.replace(/\(\s*per sq\.ft,\s*[^)]+\)/gi, "(per sq.ft)");
    return looksLikePriceText(compactText) ? normalizeDisplayedPriceText(compactText) : compactText;
  };

  const metaToneClass = (text: string) => {
    const t = text.trim();
    if (/^pixel pitch:/i.test(t)) return compactMobile ? "mt-2 text-[11px] font-semibold leading-snug text-sky-700" : "mt-2 text-xs font-semibold text-sky-700";
    if (/^starting from/i.test(t) || looksLikePriceText(t)) return compactMobile ? "mt-1 text-[11px] font-semibold leading-snug text-sky-700 underline underline-offset-2" : "mt-1 text-xs font-semibold text-sky-700 underline underline-offset-2";
    return compactMobile ? "mt-1 text-[11px] font-medium leading-snug text-slate-600" : "mt-1 text-xs font-medium text-slate-600";
  };

  const badgeClass = (tone: BadgeTone | undefined) =>
    tone === "dark"
      ? compactMobile
        ? "hidden rounded-full bg-slate-900/90 px-2 py-0.5 text-[9px] font-semibold leading-tight text-white shadow md:inline-flex md:px-3 md:py-1 md:text-xs"
        : "rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow"
      : compactMobile
        ? "hidden rounded-full bg-slate-900/90 px-2 py-0.5 text-[9px] font-semibold leading-tight text-white shadow md:inline-flex md:px-3 md:py-1 md:text-xs"
        : "rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow";
  const baseCardClassName = compactMobile
    ? "group relative flex h-full flex-col overflow-hidden rounded-none border-0 bg-transparent shadow-none md:rounded-2xl md:border md:bg-white md:shadow-sm md:transition-all md:duration-300 md:ease-out md:hover:-translate-y-1 md:hover:shadow-[0_18px_45px_rgba(2,132,199,0.18)] md:hover:ring-1 md:hover:ring-sky-200/70 md:focus-within:ring-2 md:focus-within:ring-sky-500/25"
    : "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(2,132,199,0.18)] hover:ring-1 hover:ring-sky-200/70 focus-within:ring-2 focus-within:ring-sky-500/25";
  const contentClassName = compactMobile ? "flex flex-1 flex-col px-0 pb-0 pt-2.5 md:p-4" : "flex flex-1 flex-col p-4";
  const titleClassName = compactMobile
    ? "min-h-[2.35rem] line-clamp-2 text-[13px] font-bold leading-snug text-slate-900 md:min-h-[2.25rem]"
    : "min-h-[2.25rem] line-clamp-2 text-[13px] font-bold leading-snug text-slate-900";
  const footerClassName = compactMobile ? "mt-auto pt-2.5 md:pt-4" : "mt-auto pt-4";
  const quoteClassName = compactMobile
    ? "relative z-20 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-700 to-sky-600 px-4 py-2 text-[12px] font-bold leading-tight text-white shadow-sm ring-1 ring-sky-700/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-500 hover:shadow-md hover:ring-sky-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 active:translate-y-0"
    : "relative z-20 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-700 to-sky-600 px-4 py-2 text-[12px] font-bold leading-tight text-white shadow-sm ring-1 ring-sky-700/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-500 hover:shadow-md hover:ring-sky-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 active:translate-y-0";
  const detailsClassName = compactMobile
    ? "relative z-20 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold leading-tight text-slate-800 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 active:translate-y-0"
    : "relative z-20 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold leading-tight text-slate-800 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 active:translate-y-0";
  const actionRowClassName = "flex flex-wrap items-center gap-3";
  const imageFrameClassName = compactMobile
    ? `product-card-image-frame relative aspect-[4/3] w-full overflow-hidden rounded-md md:rounded-none md:aspect-[16/10] ${imageContainerClassName}`
    : `product-card-image-frame relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] ${imageContainerClassName}`;

  return (
    <div
      className={`${baseCardClassName} ${cardClassName ?? ""}`}
      style={{ borderColor }}
    >
      <Link prefetch={false} href={href} aria-label={`View details: ${displayTitle}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details</span>
      </Link>

      <div className={imageFrameClassName}>
        {image}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/15 transition-opacity duration-300 md:group-hover:opacity-0" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.16), rgba(37,99,235,0.10) 40%, rgba(255,106,0,0.08))" }} />
        <div className="pointer-events-none absolute -inset-y-6 -left-1/3 hidden w-1/3 -skew-x-12 opacity-0 blur-sm transition-all duration-700 md:block md:group-hover:left-[120%] md:group-hover:opacity-70" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,255,255,0))" }} />

        {topLeftBadge ? (
          <div className={`absolute left-3 top-3 ${badgeClass(topLeftBadge.tone)}`}>
            {looksLikePriceText(topLeftBadge.text) ? normalizeDisplayedPriceText(topLeftBadge.text) : topLeftBadge.text}
          </div>
        ) : null}
        {topRightBadge ? (
          <div className={`absolute right-3 top-3 ${badgeClass(topRightBadge.tone ?? "dark")}`}>
            {looksLikePriceText(topRightBadge.text) ? normalizeDisplayedPriceText(topRightBadge.text) : topRightBadge.text}
          </div>
        ) : null}
      </div>

      <div className={contentClassName}>
        <div className={titleClassName}>{displayTitle}</div>

        {visibleMetaLines.map((m) => (
          <p key={`${title}-${m.text}`} className={compactMobile ? `${m.className ?? metaToneClass(m.text)} hidden md:block` : m.className ?? metaToneClass(m.text)}>
            {normalizeMetaLineText(m.text)}
          </p>
        ))}

        {visibleBullets.length ? (
          <ul className={compactMobile ? "mt-3 hidden space-y-1.5 text-[11px] text-slate-600 md:block" : "mt-3 space-y-1.5 text-[11px] text-slate-600"}>
            {visibleBullets.map((b) => {
              const label = b.trim().startsWith("-") ? b.trim() : `- ${b.trim()}`;
              return (
                <li key={label} className="truncate leading-5" title={label.replace(/^- /, "")}>
                  {label}
                </li>
              );
            })}
          </ul>
        ) : null}

        {visibleChips.length ? (
          <div className={compactMobile ? "mt-3 hidden grid-cols-3 gap-2 md:grid" : "mt-3 grid grid-cols-3 gap-2"}>
            {visibleChips.map((c) => (
              <span
                key={c}
                title={c}
                className="inline-flex min-w-0 items-center justify-center truncate rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold leading-tight text-slate-600"
              >
                {c}
              </span>
            ))}
          </div>
        ) : null}

        <div className={footerClassName}>
          {compactMobile ? (
            <>
              <Link
                prefetch={false}
                href={href}
                className="inline-flex min-h-8 w-full items-center justify-between rounded-md border border-[#F56605]/20 bg-[#FFF7F1] py-1 pl-3 pr-1 text-[10px] font-bold leading-tight text-[#C84B00] shadow-sm transition hover:border-[#F56605]/35 hover:bg-[#FFF1E8] md:hidden"
              >
                <span>View details -&gt;</span>
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F56605] text-white shadow-[0_5px_12px_rgba(245,102,5,0.22)]">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                    <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  prefetch={false}
                  href={contactHref}
                  className={quoteClassName}
                >
                  Request quotation<span className="sr-only"> for {displayTitle}</span>
                </Link>
                <Link prefetch={false} href={href} className={detailsClassName} style={{ color: "inherit" }}>
                  {safeViewDetailsLabel}
                </Link>
              </div>
            </>
          ) : (
            <div className={actionRowClassName}>
              <Link
                prefetch={false}
                href={contactHref}
                className={quoteClassName}
              >
                Request quotation<span className="sr-only"> for {displayTitle}</span>
              </Link>
              <Link prefetch={false} href={href} className={detailsClassName} style={{ color: "inherit" }}>
                {safeViewDetailsLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
