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
  teaserLines = 1,
}: {
  teaser: string;
  children: React.ReactNode;
  className?: string;
  teaserClassName?: string;
  expandedClassName?: string;
  desktopClassName?: string;
  buttonClassName?: string;
  teaserLines?: 1 | 2;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("mobile-intro-copy", className)}>
      <div className="md:hidden">
        {expanded ? (
          <div className={cn("text-sm leading-6 text-slate-600", expandedClassName)}>{children}</div>
        ) : (
          <p
            className={cn(
              "overflow-hidden text-sm text-slate-600",
              teaserLines === 1 ? "text-ellipsis whitespace-nowrap" : "whitespace-normal",
              teaserClassName
            )}
            style={
              teaserLines === 2
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }
                : undefined
            }
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
