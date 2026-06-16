"use client";

import { useRef } from "react";
import { IconGlyph } from "./IconGlyph";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  variant?: "lime" | "ghost";
  umamiEvent?: string;
  umamiDemo?: string;
  umamiSource?: string;
};

export function MagneticButton({ children, href, className = "", onClick, variant = "lime", umamiEvent, umamiDemo, umamiSource }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  function move(event: React.PointerEvent) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  }

  function reset() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  }

  const classes = `magnetic-button ${variant === "ghost" ? "magnetic-button-ghost" : ""} ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        data-umami-event={umamiEvent}
        data-umami-event-demo={umamiDemo}
        data-umami-event-source={umamiSource}
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <span>{children}</span>
        <IconGlyph name="arrow" className="button-icon" />
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={classes}
      data-umami-event={umamiEvent}
      data-umami-event-demo={umamiDemo}
      data-umami-event-source={umamiSource}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <span>{children}</span>
      <IconGlyph name="arrow" className="button-icon" />
    </button>
  );
}
