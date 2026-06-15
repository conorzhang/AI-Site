type IconGlyphProps = {
  name: "arrow" | "play" | "close" | "video" | "modal" | "scroll" | "layers" | "magnet" | "transition" | "chart";
  className?: string;
};

export function IconGlyph({ name, className }: IconGlyphProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
  };

  if (name === "play") {
    return (
      <svg {...common}>
        <path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg {...common}>
        <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "video") {
    return (
      <svg {...common}>
        <rect x="5" y="4" width="12" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="m17 9 3-2v10l-3-2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 8.5v7l5-3.5-5-3.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "modal") {
    return (
      <svg {...common}>
        <rect x="4.5" y="5" width="15" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 9h8M8 12h5M8 15h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "scroll") {
    return (
      <svg {...common}>
        <rect x="8" y="3.5" width="8" height="17" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 7v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg {...common}>
        <path d="m12 4 8 4-8 4-8-4 8-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m5 12 7 3.5L19 12M5 16l7 3.5L19 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "magnet") {
    return (
      <svg {...common}>
        <path d="M7 5v6a5 5 0 0 0 10 0V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7 5h4M13 5h4M7 9h4M13 9h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "transition") {
    return (
      <svg {...common}>
        <path d="M6 8h9.5a3.5 3.5 0 0 1 0 7H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m9 5-3 3 3 3M15 19l3-3-3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M5 18V6M5 18h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m8 14 3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 18v-3M12 18v-5M16 18v-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
