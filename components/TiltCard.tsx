"use client";

import { useRef } from "react";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
};

export function TiltCard({ children, className = "", onClick, label }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--tilt-x", `${-y * 7}deg`);
    node.style.setProperty("--tilt-y", `${x * 8}deg`);
    node.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    node.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
    node.style.setProperty("--glow-x", "50%");
    node.style.setProperty("--glow-y", "20%");
  }

  return (
    <div
      ref={ref}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={label}
      className={`tilt-card ${className}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) onClick();
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}
