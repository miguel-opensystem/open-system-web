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
