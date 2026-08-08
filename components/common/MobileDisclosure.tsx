"use client";

import type { CSSProperties, ReactNode } from "react";
import { useId, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileDisclosure({
  label,
  children,
  buttonClassName,
  buttonStyle,
  contentClassName,
  contentStyle,
  mobileOpenClassName = "block",
  desktopDisplayClassName = "md:block",
}: {
  label: string;
  children: ReactNode;
  buttonClassName?: string;
  buttonStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  mobileOpenClassName?: string;
  desktopDisplayClassName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((value) => !value)}
        className={cn("w-full appearance-none md:hidden", buttonClassName)}
        style={buttonStyle}
      >
        {label}
      </button>
      <div
        id={contentId}
        className={cn(expanded ? mobileOpenClassName : "hidden", desktopDisplayClassName, contentClassName)}
        style={contentStyle}
      >
        {children}
      </div>
    </>
  );
}
