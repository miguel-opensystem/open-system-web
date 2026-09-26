"use client";

import {
  MotionConfig,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -48px 0px" } as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.1,
      delay,
      ease: EASE,
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}
    </span>
  );
}

export function ProgressBar({
  value,
  delay = 0,
  barClassName = "h-full rounded-full bg-white/70",
  trackClassName = "h-1 w-full overflow-hidden rounded-full bg-white/10",
}: {
  value: number;
  delay?: number;
  barClassName?: string;
  trackClassName?: string;
}) {
  return (
    <div className={trackClassName}>
      <motion.div
        className={barClassName}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, delay, ease: EASE }}
      />
    </div>
  );
}

/** Columns that fade, scale and grow into place as the chart enters view. */
export function Columns({
  data,
  accentFrom,
  className = "flex h-40 items-end gap-1.5 sm:gap-2.5",
  accentClassName = "bg-gradient-to-t from-[#0A84FF]/35 via-[#0A84FF] to-[#06B6D4]",
  baseClassName = "bg-white/12",
}: {
  data: number[];
  accentFrom: number;
  className?: string;
  accentClassName?: string;
  baseClassName?: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      {data.map((height, i) => (
        <motion.div
          key={i}
          className={`flex-1 origin-bottom rounded-t-md ${
            i >= accentFrom ? accentClassName : baseClassName
          }`}
          initial={{ height: 0, opacity: 0, scaleY: 0.9 }}
          whileInView={{ height: `${height}%`, opacity: 1, scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, delay: i * 0.055, ease: EASE }}
        />
      ))}
    </div>
  );
}

export function RingGauge({
  value,
  size = 132,
  stroke = 7,
  from = "#0A84FF",
  to = "#06B6D4",
  track = "rgba(255,255,255,0.08)",
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  from?: string;
  to?: string;
  track?: string;
  children?: ReactNode;
}) {
  const gradientId = useId();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="gpu relative" style={{ width: size, height: size }}>
      <div
        className="gpu absolute inset-3 rounded-full blur-2xl"
        style={{ background: `${from}33` }}
        aria-hidden="true"
      />
      <svg
        width={size}
        height={size}
        className="relative -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={track}
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{
            strokeDashoffset: circumference - (circumference * value) / 100,
          }}
          viewport={VIEWPORT}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function offsetPathY(d: string, peak: number, baseline = 72) {
  const total = (d.match(/-?\d+\.?\d*/g) ?? []).length;
  let n = 0;
  return d.replace(/-?\d+\.?\d*/g, (raw) => {
    const i = n++;
    if (i % 2 === 0) return raw;
    const y = Number(raw);
    if (Math.abs(y - baseline) < 0.01) return raw;
    const yTotal = Math.floor(total / 2);
    const t = yTotal <= 1 ? 1 : (i - 1) / 2 / (yTotal - 1);
    return String(+(y + peak * t * t).toFixed(2));
  });
}

function lastPoint(d: string) {
  const nums = [...d.matchAll(/-?\d+\.?\d*/g)].map(Number);
  return { x: nums.at(-2) ?? 0, y: nums.at(-1) ?? 0 };
}

/** Trend line that draws on enter, then wanders like a live ticker. */
export function TrendLine({
  line,
  area,
  color = "#0A84FF",
  className = "h-20 w-full",
}: {
  line: string;
  area: string;
  color?: string;
  className?: string;
}) {
  const gradientId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const reduced = useReducedMotion();
  const [live, setLive] = useState(false);
  const peak = useMotionValue(0);
  const liveStartedAt = useRef<number | null>(null);

  const lineD = useTransform(peak, (v) => offsetPathY(line, v));
  const areaD = useTransform(peak, (v) => offsetPathY(area, v));
  const tipLeft = useTransform(peak, (v) => {
    const { x } = lastPoint(offsetPathY(line, v));
    return `${(x / 240) * 100}%`;
  });
  const tipTop = useTransform(peak, (v) => {
    const { y } = lastPoint(offsetPathY(line, v));
    return `${(y / 72) * 100}%`;
  });

  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setTimeout(() => setLive(true), 1650);
    return () => window.clearTimeout(t);
  }, [inView, reduced]);

  useAnimationFrame((time) => {
    if (!live || reduced) {
      liveStartedAt.current = null;
      return;
    }
    if (liveStartedAt.current === null) liveStartedAt.current = time;
    const s = (time - liveStartedAt.current) / 1000;
    const fade = Math.min(1, s / 1.4);
    peak.set(
      fade *
        (Math.sin(s * 0.41) * 1.45 +
          Math.sin(s * 0.63 + 1.2) * 0.8 +
          Math.sin(s * 0.22 + 0.7) * 0.45),
    );
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        viewBox="0 0 240 72"
        className="h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.38" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaD}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
        <motion.path
          d={lineD}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </svg>
      {!reduced && (
        <>
          <motion.span
            className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: color,
              left: tipLeft,
              top: tipTop,
            }}
            initial={{ opacity: 0 }}
            animate={
              live
                ? { opacity: [0.22, 0.08] }
                : { opacity: 0 }
            }
            transition={
              live
                ? {
                    duration: 3.4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }
                : { duration: 0.4 }
            }
          />
          <motion.span
            className="pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: color,
              left: tipLeft,
              top: tipTop,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              live
                ? { opacity: 1, scale: [1, 1.22] }
                : { opacity: inView ? 1 : 0, scale: 1 }
            }
            transition={
              live
                ? {
                    opacity: { duration: 0.35 },
                    scale: {
                      duration: 3.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }
                : { duration: 0.4, delay: 1.4 }
            }
          />
        </>
      )}
    </div>
  );
}

/** The one continuous animation on the dashboard: a live status indicator. */
export function LiveDot({ color = "#0A84FF" }: { color?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      {!reduced && (
        <motion.span
          className="absolute inline-flex size-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.65], opacity: [0.4, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span
        className="relative inline-flex size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}
