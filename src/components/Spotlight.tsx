"use client";

import type { ComponentProps } from "react";

/** A div whose border/background glow follows the cursor. Styling lives in `.spotlight` in globals.css. */
export function Spotlight({ className = "", onMouseMove, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={`spotlight ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
        onMouseMove?.(e);
      }}
    />
  );
}
