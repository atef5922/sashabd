import Link from "next/link";

export default function HomeStyleFeatureProductCard({
  href,
  title,
  image,
  imageContainerClassName = "bg-slate-50",
}: {
  href: string;
  title: string;
  image: React.ReactNode;
  imageContainerClassName?: string;
}) {
  const displayTitle = title.replace(/\s*&\s*/g, " and ");

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-md border bg-white shadow-sm"
      style={{ borderColor: "rgba(255,106,0,0.12)" }}
    >
      <Link
        prefetch={false}
        href={href}
        className={`relative block aspect-[4/3] overflow-hidden ${imageContainerClassName}`}
        aria-label={`View details: ${displayTitle}`}
      >
        {image}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <div className="min-h-[2.55rem] line-clamp-2 text-[13px] font-bold leading-snug text-slate-900">
          {displayTitle}
        </div>

        <div className="mt-auto pt-3">
          <Link
            prefetch={false}
            href={href}
            className="inline-flex min-h-8 w-full items-center justify-between rounded-md border border-[#F56605]/20 bg-[#FFF7F1] pl-3 pr-1 py-1 text-[10px] font-bold leading-tight text-[#C84B00] shadow-sm transition hover:border-[#F56605]/35 hover:bg-[#FFF1E8]"
          >
            <span>View details -&gt;</span>
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F56605] text-white shadow-[0_5px_12px_rgba(245,102,5,0.22)]">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
