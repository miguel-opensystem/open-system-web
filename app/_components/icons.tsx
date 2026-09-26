import type { ReactNode } from "react";

function Stroke({
  children,
  className = "size-[18px]",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function TargetIcon({ className }: { className?: string }) {
  return (
    <Stroke className={className}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.6" />
    </Stroke>
  );
}

export function LayersIcon({ className }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M12 3.5 3.8 8 12 12.5 20.2 8 12 3.5Z" />
      <path d="M4 12.6 12 17l8-4.4" />
      <path d="M4 16.8 12 21.2l8-4.4" />
    </Stroke>
  );
}

export function LoopIcon({ className }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.4 4.4v4.4H16" />
    </Stroke>
  );
}

export function SignalIcon({ className }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M5 15.5v-3M9.6 18V9M14.4 18V6M19 15.5v-3" />
    </Stroke>
  );
}

export function SparkIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Stroke>
  );
}

export function CheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </Stroke>
  );
}

export function CrossIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
    </Stroke>
  );
}

/** Monochrome Meta infinity mark. */
export function MetaLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 12"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.2 1.6C3.6 1.6 1.6 3.5 1.6 6s2 4.4 4.6 4.4c1.5 0 2.8-.9 4-2.4 1.2 1.5 2.5 2.4 4 2.4 2.6 0 4.6-1.9 4.6-4.4s-2-4.4-4.6-4.4c-1.5 0-2.8.9-4 2.4-1.2-1.5-2.5-2.4-4-2.4Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Monochrome TikTok mark. */
export function TikTokLogo({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      />
    </svg>
  );
}

/** Monochrome YouTube play-button mark. */
export function YouTubeLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.2 7.1a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.6A3 3 0 0 0 .8 7.1 31 31 0 0 0 .3 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.1c1.9.6 9.1.6 9.1.6s7.2 0 9.1-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.8 15.3V8.7l6 3.3-6 3.3Z"
      />
    </svg>
  );
}

export function IconTile({
  children,
  tone = "light",
  size = "md",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "size-12 rounded-2xl" : "size-10 rounded-xl";

  return (
    <span
      className={
        tone === "dark"
          ? `grid ${box} shrink-0 place-items-center border border-white/10 bg-white/[0.06] text-white/70 backdrop-blur-xl`
          : `grid ${box} shrink-0 place-items-center border border-[color:var(--chip-border)] bg-[var(--chip)] text-[var(--fg)] shadow-[0_2px_10px_rgba(0,0,0,0.05)] backdrop-blur-xl`
      }
    >
      {children}
    </span>
  );
}

export const pillarIcons = {
  Strategy: TargetIcon,
  Backend: LayersIcon,
  Retention: LoopIcon,
  Amplifier: SignalIcon,
} as const;

export type PillarName = keyof typeof pillarIcons;
