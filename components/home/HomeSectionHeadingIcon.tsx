export type HomeSectionHeadingIconKind =
  | "promise"
  | "products"
  | "conference"
  | "projects"
  | "process";

export default function HomeSectionHeadingIcon({
  kind,
  size = "title",
}: {
  kind: HomeSectionHeadingIconKind;
  size?: "badge" | "title";
}) {
  const badge = size === "badge";
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: badge ? 1.9 : 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border ${
        badge ? "h-5 w-5" : "h-8 w-8"
      }`}
      style={{
        color: "#1456d9",
        backgroundColor: "#edf4ff",
        borderColor: "#d9e7fb",
        boxShadow: badge
          ? "inset 0 1px 0 rgba(255,255,255,.92)"
          : "0 7px 18px rgba(20,86,217,.10), inset 0 1px 0 rgba(255,255,255,.92)",
      }}
    >
      <svg viewBox="0 0 24 24" className={badge ? "h-3 w-3" : "h-[18px] w-[18px]"} aria-hidden="true" {...common}>
        {kind === "promise" ? (
          <>
            <path d="M12 3.2 5.5 6v5.1c0 4.3 2.5 7.4 6.5 9.7 4-2.3 6.5-5.4 6.5-9.7V6L12 3.2Z" />
            <path d="m9 12.1 2 2 4.2-4.4" />
          </>
        ) : kind === "products" ? (
          <>
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
            <path d="M17 13.3v7.4M13.3 17h7.4" />
          </>
        ) : kind === "conference" ? (
          <>
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" />
          </>
        ) : kind === "projects" ? (
          <>
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2" />
            <path d="m16.2 16 1.2 1.2 2.1-2.4" />
          </>
        ) : (
          <>
            <circle cx="5" cy="7" r="2.2" />
            <circle cx="19" cy="7" r="2.2" />
            <circle cx="12" cy="18" r="2.2" />
            <path d="m7 8.1 3.7 7.7M17 8.1l-3.7 7.7M7.2 7h9.6" />
          </>
        )}
      </svg>
    </span>
  );
}
