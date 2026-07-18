"use client";

import { useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileIntroText({
  teaser,
  children,
  className,
  teaserClassName,
  expandedClassName,
  desktopClassName,
  buttonClassName,
}: {
  teaser: string;
  children: React.ReactNode;
  className?: string;
  teaserClassName?: string;
  expandedClassName?: string;
  desktopClassName?: string;
  buttonClassName?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("mobile-intro-copy", className)}>
      <div className={cn("md:hidden", expandedClassName)}>
        {expanded ? (
          <div className={cn("text-sm leading-6 text-slate-600", expandedClassName)}>{children}</div>
        ) : (
          <p
            className={cn(
              "overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600",
              teaserClassName
            )}
          >
            {teaser}
          </p>
        )}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className={cn("mt-2 text-[11px] font-extrabold text-[#F56605]", buttonClassName)}
        >
          {expanded ? "Show less" : "Learn more"}
        </button>
      </div>
      <div className={cn("hidden md:block", desktopClassName)}>{children}</div>
    </div>
  );
}
