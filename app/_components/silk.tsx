"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const palettes = {
  blue: {
    base: "bg-[#0A84FF]",
    conic:
      "bg-[conic-gradient(from_180deg_at_50%_50%,#0A84FF_0deg,#8FD8FF_60deg,#0A84FF_130deg,#0B4FA8_200deg,#5EE0FF_280deg,#0A84FF_360deg)]",
    shade:
      "bg-[radial-gradient(110%_100%_at_50%_125%,rgba(2,18,45,0.5),transparent_62%)]",
    veil: "bg-[linear-gradient(165deg,rgba(2,18,45,0.42)_0%,rgba(2,18,45,0.05)_38%,transparent_60%)]",
  },
  cyan: {
    base: "bg-[#5AC8FA]",
    conic:
      "bg-[conic-gradient(from_180deg_at_50%_50%,#5AC8FA_0deg,#E8F7FF_60deg,#0A84FF_130deg,#32ADE6_200deg,#B8ECFF_280deg,#5AC8FA_360deg)]",
    shade:
      "bg-[radial-gradient(110%_100%_at_50%_125%,rgba(8,40,70,0.42),transparent_62%)]",
    veil: "bg-[linear-gradient(165deg,rgba(8,40,70,0.36)_0%,rgba(8,40,70,0.04)_38%,transparent_60%)]",
  },
  dark: {
    base: "bg-[#111111]",
    conic:
      "bg-[conic-gradient(from_180deg_at_50%_50%,#1D1D1F_0deg,#0A84FF_70deg,#050505_140deg,#3A3A3C_210deg,#5AC8FA_290deg,#111111_360deg)]",
    shade:
      "bg-[radial-gradient(110%_100%_at_50%_125%,rgba(0,0,0,0.7),transparent_62%)]",
    veil: "bg-[linear-gradient(165deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.08)_38%,transparent_60%)]",
  },
  pink: {
    base: "bg-[#FF5EB5]",
    conic:
      "bg-[conic-gradient(from_180deg_at_50%_50%,#FF5EB5_0deg,#FFC2E0_60deg,#FF5EB5_130deg,#F0178A_200deg,#FFE6F3_280deg,#FF5EB5_360deg)]",
    shade:
      "bg-[radial-gradient(110%_100%_at_50%_125%,rgba(90,10,48,0.42),transparent_62%)]",
    veil: "bg-[linear-gradient(165deg,rgba(90,10,48,0.36)_0%,rgba(90,10,48,0.04)_38%,transparent_60%)]",
  },
} as const;

export type SilkTone = keyof typeof palettes;

/** Glossy liquid-gradient panel used as the colour accent across the page. */
export function Silk({
  className = "",
  children,
  tone = "blue",
  paused = false,
}: {
  className?: string;
  children?: ReactNode;
  tone?: SilkTone;
  paused?: boolean;
}) {
  const reduced = useReducedMotion();
  const palette = palettes[tone];

  return (
    <div
      className={`gpu relative overflow-hidden rounded-3xl ${palette.base} ${className}`}
    >
      <motion.div
        className={`gpu absolute -inset-[45%] ${palette.conic} blur-3xl`}
        animate={reduced || paused ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(130%_90%_at_78%_4%,rgba(255,255,255,0.5),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(118deg,transparent_22%,rgba(255,255,255,0.32)_44%,transparent_62%)]"
        aria-hidden="true"
      />
      <div className={`absolute inset-0 ${palette.shade}`} aria-hidden="true" />
      <div className={`absolute inset-0 ${palette.veil}`} aria-hidden="true" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Blocky bar chart built from dots, echoing the reference dashboards. */
export function DotBars({
  heights = [3, 5, 4, 7, 6, 8],
  className = "",
}: {
  heights?: number[];
  className?: string;
}) {
  const max = Math.max(...heights);

  return (
    <div className={`flex items-end gap-1.5 ${className}`} aria-hidden="true">
      {heights.map((height, column) => (
        <div key={column} className="flex flex-col-reverse gap-1">
          {Array.from({ length: height }).map((_, row) => (
            <motion.span
              key={row}
              className="grid grid-cols-3 gap-[3px]"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: column * 0.06 + row * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {Array.from({ length: 3 }).map((__, dot) => (
                <span
                  key={dot}
                  className="size-[3px] rounded-[1px] bg-white"
                  style={{ opacity: 0.35 + (row / max) * 0.55 }}
                />
              ))}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Frosted stat card that floats over a Silk panel. */
export function FloatingStat({
  label,
  value,
  children,
  className = "",
  paused = false,
}: {
  label: string;
  value: string;
  children?: ReactNode;
  className?: string;
  paused?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`gpu rounded-2xl border border-white/30 bg-white/15 p-5 shadow-[0_18px_50px_-20px_rgba(2,18,45,0.6)] backdrop-blur-xl ${className}`}
      animate={reduced || paused ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="text-[11px] tracking-[0.12em] text-white/70 uppercase">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white tabular-nums">
        {value}
      </p>
      {children}
    </motion.div>
  );
}

/** Edge-faded, continuously scrolling row of proof chips. */
export function Marquee({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="gpu flex w-max gap-3 pr-3"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] whitespace-nowrap text-white/50 backdrop-blur-xl"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
