import { SparkIcon } from "./icons";

export const glassCard =
  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--card-border)] bg-[var(--card)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-500 ease-out [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-xl";

export const darkCard =
  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#050505]/95 text-white shadow-[0_24px_70px_-34px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-500 ease-out [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-2xl";

export const primaryButton =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--btn)] px-6 text-[15px] font-medium text-[var(--btn-fg)] transition-all duration-500 ease-out sm:px-7 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-xl";

export const inverseButton =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-[#050505] transition-all duration-500 ease-out sm:px-7 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-xl";

export const ghostButton =
  "inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-6 text-[15px] text-[var(--fg)] backdrop-blur-xl transition-all duration-500 ease-out sm:px-7 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-xl";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className="size-3 rounded-full bg-[var(--dot)]"
        aria-hidden="true"
      />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--fg)]">
        Open System
      </span>
    </span>
  );
}

export function SectionLabel({
  children,
  tone = "light",
}: {
  children: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex justify-center">
      <span
        className={
          tone === "dark"
            ? "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-xl"
            : "inline-flex items-center gap-2 rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-3.5 py-1.5 backdrop-blur-xl"
        }
      >
        <SparkIcon
          className={`size-3.5 ${tone === "dark" ? "text-[#5AC8FA]" : "text-[#0A84FF]"}`}
        />
        <span
          className={`text-[13px] tracking-[0.01em] ${
            tone === "dark" ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          {children}
        </span>
      </span>
    </div>
  );
}
