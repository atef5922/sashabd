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
  singleDom = false,
}: {
  teaser?: string;
  children: React.ReactNode;
  className?: string;
  teaserClassName?: string;
  expandedClassName?: string;
  desktopClassName?: string;
  buttonClassName?: string;
  teaserLines?: 1 | 2;
  singleDom?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const previewText = teaser ?? "";

  if (singleDom) {
    const collapsedClassName =
      teaserLines === 1
        ? "[&>*]:overflow-hidden [&>*]:text-ellipsis [&>*]:whitespace-nowrap [&>*]:!text-left [&>*]:!leading-6"
        : "[&>*]:overflow-hidden [&>*]:[display:-webkit-box] [&>*]:[-webkit-box-orient:vertical] [&>*]:[-webkit-line-clamp:2]";

    return (
      <div className={cn("mobile-intro-copy", className)}>
        <div
          className={cn(
            "text-sm leading-6 text-slate-600 md:[&>*]:overflow-visible md:[&>*]:whitespace-normal",
            expanded ? expandedClassName : cn(collapsedClassName, teaserClassName),
            desktopClassName
          )}
        >
          {children}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className={cn("mt-2 text-[11px] font-extrabold text-[#F56605] md:hidden", buttonClassName)}
        >
          {expanded ? "Show less" : "Learn more"}
        </button>
      </div>
    );
  }

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
            {previewText}
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
