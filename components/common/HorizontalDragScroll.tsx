"use client";

import { useEffect, useRef } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HorizontalDragScroll({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    isDragging: false,
    startX: 0,
    startLeft: 0,
    suppressClick: false,
  });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const el = ref.current;
      if (!el || !state.current.isDragging) return;

      const dx = event.clientX - state.current.startX;
      if (Math.abs(dx) > 4) {
        state.current.suppressClick = true;
      }

      el.scrollLeft = state.current.startLeft - dx;
    };

    const onMouseUp = () => {
      if (state.current.isDragging) {
        state.current.isDragging = false;
        document.body.style.userSelect = "";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) return;

    state.current.isDragging = true;
    state.current.startX = e.clientX;
    state.current.startLeft = el.scrollLeft;
    state.current.suppressClick = false;
    document.body.style.userSelect = "none";
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.current.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      state.current.suppressClick = false;
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    } else {
      el.scrollLeft += e.deltaX;
    }
  };

  return (
    <div
      ref={ref}
      aria-label={ariaLabel}
      className={cx(className, "cursor-grab select-none active:cursor-grabbing")}
      style={{ WebkitOverflowScrolling: "touch" }}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
