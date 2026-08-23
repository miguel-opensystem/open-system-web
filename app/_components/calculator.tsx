"use client";

import Link from "next/link";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCopy } from "../_i18n/provider";
import { ArrowIcon, CheckIcon } from "./icons";
import { LiveDot } from "./motion";

const MIN_FOLLOWERS = 20_000;
const MAX_FOLLOWERS = 1_000_000;
const MAX_LIST = 1_000_000;
const MAX_REVENUE = 1_000_000;
const MIN_UNANSWERED = 0;
const MAX_UNANSWERED = 100;

/** Silent baseline: 1% of uncaptured attention as a $20/mo relationship. */
const OPPORTUNITY = 20;

const streamIds = [
  "none",
  "brand",
  "digital",
  "subscriptions",
  "coaching",
] as const;

type StreamId = (typeof streamIds)[number];

const landingIds = ["feed", "bio", "owned"] as const;

type LandingId = (typeof landingIds)[number];

const followupIds = ["manual", "mixed", "automated"] as const;

type FollowupId = (typeof followupIds)[number];

const LANDING_RATE: Record<LandingId, number> = {
  feed: 0.012,
  bio: 0.009,
  owned: 0.006,
};

const OPS_RATE: Record<FollowupId, number> = {
  manual: 0.22,
  mixed: 0.15,
  automated: 0.08,
};

const INBOUND_WEIGHT: Record<FollowupId, number> = {
  manual: 1,
  mixed: 0.7,
  automated: 0.35,
};

const PROCESS_DURATION = 5.4;

/** Keeps moving through checkpoints — slows slightly, never stops. */
function easeThroughCheckpoints(t: number) {
  const dips = 4;
  const depth = 0.22;
  return t - (depth / (2 * Math.PI * dips)) * Math.sin(2 * Math.PI * dips * t);
}

function ProcessingPanel({
  analyzing,
  title,
  body,
  steps,
  onDone,
}: {
  analyzing: string;
  title: string;
  body: string;
  steps: readonly string[];
  onDone: () => void;
}) {
  const [processStep, setProcessStep] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stepCount = steps.length;
    let lastStep = -1;
    let doneTimer: number | undefined;

    const controls = animate(0, 1, {
      duration: PROCESS_DURATION,
      ease: easeThroughCheckpoints,
      onUpdate: (progress) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
        const reached = Math.min(
          stepCount,
          Math.floor(progress * stepCount + 1e-6),
        );
        if (reached !== lastStep) {
          lastStep = reached;
          setProcessStep(reached);
        }
      },
      onComplete: () => {
        if (barRef.current) {
          barRef.current.style.transform = "scaleX(1)";
        }
        setProcessStep(stepCount);
        doneTimer = window.setTimeout(onDone, 280);
      },
    });

    return () => {
      controls.stop();
      if (doneTimer !== undefined) window.clearTimeout(doneTimer);
    };
  }, [steps.length, onDone]);

  return (
    <motion.div
      key="processing"
      className="relative flex h-full flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[11px] tracking-[0.14em] text-white/40 uppercase">
        {analyzing}
      </p>
      <p className="mt-3 text-[18px] font-semibold tracking-[-0.03em]">
        {title}
      </p>
      <p className="mt-1.5 text-[13px] leading-5 text-white/45">{body}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
        {steps.map((step, index) => {
          const done = index < processStep;
          const active = index === processStep;
          return (
            <li key={step} className="flex items-center gap-2.5">
              <span className="grid size-5 shrink-0 place-items-center">
                {done ? (
                  <CheckIcon className="size-3.5 text-[#5AC8FA]" />
                ) : active ? (
                  <LiveDot color="#0A84FF" />
                ) : (
                  <span className="size-1.5 rounded-full bg-white/15" />
                )}
              </span>
              <span
                className={`text-[13px] tracking-[-0.01em] ${
                  done || active ? "text-white/80" : "text-white/25"
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto pt-6">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);

  useEffect(() => {
    const controls = animate(previous.current, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    });
    previous.current = value;
    return () => controls.stop();
  }, [value]);

  return <>{format(display)}</>;
}

function Question({
  prompt,
  hint,
  children,
}: {
  prompt: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[14px] font-medium tracking-[-0.01em]">{prompt}</p>
      {hint && <p className="mt-1 text-[12px] leading-5 text-[#86868B]">{hint}</p>}
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function Choice({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-300 ease-out ${
        selected
          ? "bg-[var(--btn)] text-[var(--btn-fg)] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
          : "border border-[color:var(--input-border)] bg-[var(--chip)] text-[var(--muted)] backdrop-blur-xl hover:scale-[1.03] hover:text-[var(--fg)] hover:shadow-md"
      }`}
    >
      {children}
    </button>
  );
}

function NumberField({
  value,
  onChange,
  max,
  prefix,
  suffix,
  placeholder,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  max: number;
  prefix?: string;
  suffix?: string;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[color:var(--input-border)] bg-[var(--chip)] px-3.5 py-2.5 backdrop-blur-xl transition-all duration-300 ease-out focus-within:border-black/25 focus-within:shadow-md">
      {prefix && (
        <span className="text-[17px] text-[var(--muted)] select-none">{prefix}</span>
      )}
      <input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={value === 0 ? "" : value.toLocaleString("en-US")}
        placeholder={placeholder}
        onChange={(event) => {
          const digits = event.target.value.replace(/[^0-9]/g, "");
          onChange(Math.min(Number(digits || 0), max));
        }}
        className="w-full bg-transparent text-[16px] font-medium tracking-[-0.01em] tabular-nums outline-none placeholder:font-normal placeholder:text-[#C0C0C6] sm:text-[15px]"
      />
      {suffix && (
        <span className="shrink-0 text-[13px] text-[#86868B] select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function Calculator() {
  const copy = useCopy();
  const reduced = useReducedMotion();
  const [followers, setFollowers] = useState(100_000);
  const [list, setList] = useState(5_000);
  const [revenue, setRevenue] = useState(0);
  const [stream, setStream] = useState<StreamId>("none");
  const [landing, setLanding] = useState<LandingId>("feed");
  const [unanswered, setUnanswered] = useState(60);
  const [followup, setFollowup] = useState<FollowupId>("manual");
  const [phase, setPhase] = useState<"idle" | "processing" | "done">("idle");
  const finishProcessing = useCallback(() => setPhase("done"), []);

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const compact = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const numbers = useMemo(
    () => new Intl.NumberFormat("en-US"),
    [],
  );

  const result = useMemo(() => {
    const uncapturedAudience = Math.max(0, followers - list);
    const front = uncapturedAudience * LANDING_RATE[landing] * OPPORTUNITY;

    const inbound = followers * 0.002;
    const unansweredValue =
      inbound * (unanswered / 100) * OPPORTUNITY * INBOUND_WEIGHT[followup];
    const ops = revenue * OPS_RATE[followup] + unansweredValue;

    const reachDecay = uncapturedAudience * 0.004 * OPPORTUNITY;
    const revenueChurn = revenue * 0.08;
    const retention = reachDecay + revenueChurn;

    const total = front + ops + retention;
    const annual = total * 12;
    const scale = Math.max(total, revenue, 1);

    return {
      front,
      ops,
      retention,
      total,
      annual,
      scale,
    };
  }, [followers, list, revenue, landing, unanswered, followup]);

  const audienceProgress =
    ((followers - MIN_FOLLOWERS) / (MAX_FOLLOWERS - MIN_FOLLOWERS)) * 100;
  const unansweredProgress =
    ((unanswered - MIN_UNANSWERED) / (MAX_UNANSWERED - MIN_UNANSWERED)) * 100;

  function startCalculation() {
    if (phase !== "idle") return;
    if (reduced) {
      setPhase("done");
      return;
    }
    setPhase("processing");
  }

  const statusLabel =
    phase === "done"
      ? copy.calc.live
      : phase === "processing"
        ? copy.calc.analyzing
        : copy.calc.ready;

  return (
    <div className="gpu w-full max-w-full overflow-hidden rounded-[1.5rem] border border-[color:var(--card-border)] bg-[var(--card)] shadow-[0_30px_90px_-45px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem]">
      <div className="flex items-center justify-between border-b border-[color:var(--card-border)] px-4 py-3 sm:px-7">
        <p className="text-[13px] font-medium tracking-[-0.01em]">
          {copy.calc.title}
        </p>
        <span className="flex items-center gap-2 rounded-full border border-[color:var(--chip-border)] bg-[var(--chip)] px-3 py-1 backdrop-blur-xl">
          <LiveDot color="#0A84FF" />
          <span className="text-[11px] tracking-[0.1em] text-[var(--muted)] uppercase">
            {statusLabel}
          </span>
        </span>
      </div>

      <div className="grid gap-5 p-4 sm:p-7 lg:grid-cols-[1.15fr_0.95fr] lg:gap-8">
        <div className="flex flex-col gap-5">
          <Question prompt={copy.calc.q1}>
            <div className="flex items-center gap-4">
              <p className="w-[4.5rem] shrink-0 text-[1.65rem] font-semibold tracking-[-0.045em] tabular-nums sm:w-24 sm:text-3xl">
                {compact.format(followers)}
              </p>
              <div className="min-w-0 flex-1">
                <input
                  type="range"
                  min={MIN_FOLLOWERS}
                  max={MAX_FOLLOWERS}
                  step={5_000}
                  value={followers}
                  onChange={(event) => setFollowers(Number(event.target.value))}
                  aria-label={copy.calc.followers}
                  aria-valuetext={`${numbers.format(followers)} ${copy.calc.followersValue}`}
                  className="range-slider"
                  style={{
                    background: `linear-gradient(to right, #050505 ${audienceProgress}%, rgba(5,5,5,0.10) ${audienceProgress}%)`,
                  }}
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-[#86868B] tabular-nums">
                  <span>20K</span>
                  <span>1M+</span>
                </div>
              </div>
            </div>
          </Question>

          <div className="grid gap-4 sm:grid-cols-2">
            <Question prompt={copy.calc.q2} hint={copy.calc.q2hint}>
              <NumberField
                value={revenue}
                onChange={setRevenue}
                max={MAX_REVENUE}
                prefix="$"
                placeholder="0"
                label={copy.calc.revenueLabel}
              />
            </Question>

            <Question prompt={copy.calc.q3} hint={copy.calc.q3hint}>
              <NumberField
                value={list}
                onChange={setList}
                max={MAX_LIST}
                suffix={copy.calc.contacts}
                placeholder="5,000"
                label={copy.calc.listLabel}
              />
            </Question>
          </div>

          <Question prompt={copy.calc.q4}>
            <div className="flex flex-wrap gap-1.5">
              {streamIds.map((id) => (
                <Choice
                  key={id}
                  selected={stream === id}
                  onSelect={() => setStream(id)}
                >
                  {copy.calc.delivery[id]}
                </Choice>
              ))}
            </div>
          </Question>

          <Question prompt={copy.calc.q5} hint={copy.calc.q5hint}>
            <div className="flex flex-wrap gap-1.5">
              {landingIds.map((id) => (
                <Choice
                  key={id}
                  selected={landing === id}
                  onSelect={() => setLanding(id)}
                >
                  {copy.calc.landing[id]}
                </Choice>
              ))}
            </div>
          </Question>

          <Question prompt={copy.calc.q6} hint={copy.calc.q6hint}>
            <div className="flex items-center gap-4">
              <p className="w-[3.25rem] shrink-0 text-[1.35rem] font-semibold tracking-[-0.045em] tabular-nums">
                {unanswered}%
              </p>
              <div className="min-w-0 flex-1">
                <input
                  type="range"
                  min={MIN_UNANSWERED}
                  max={MAX_UNANSWERED}
                  step={5}
                  value={unanswered}
                  onChange={(event) => setUnanswered(Number(event.target.value))}
                  aria-label={copy.calc.q6}
                  aria-valuetext={`${unanswered}%`}
                  className="range-slider"
                  style={{
                    background: `linear-gradient(to right, #050505 ${unansweredProgress}%, rgba(5,5,5,0.10) ${unansweredProgress}%)`,
                  }}
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-[#86868B]">
                  <span>I get to it</span>
                  <span>Most of it sits</span>
                </div>
              </div>
            </div>
          </Question>

          <Question prompt={copy.calc.q7}>
            <div className="flex flex-wrap gap-1.5">
              {followupIds.map((id) => (
                <Choice
                  key={id}
                  selected={followup === id}
                  onSelect={() => setFollowup(id)}
                >
                  {copy.calc.followup[id]}
                </Choice>
              ))}
            </div>
          </Question>

          {phase === "idle" && (
            <button
              type="button"
              onClick={startCalculation}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#050505] px-7 text-[14px] font-medium text-white transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl sm:w-fit"
            >
              {copy.calc.cta}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </button>
          )}
          {phase === "processing" && (
            <button
              type="button"
              disabled
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#050505] px-7 text-[14px] font-medium text-white opacity-50 sm:w-fit"
            >
              {copy.calc.analyzing}…
            </button>
          )}
        </div>

        <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-4 text-white sm:min-h-[300px] sm:p-6 lg:min-h-0">
          <div
            className="gpu pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.45),transparent_65%)] blur-2xl"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            {phase === "idle" ? (
              <motion.div
                key="locked"
                className="relative flex h-full flex-col justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[13px] tracking-[0.14em] text-white/35 uppercase">
                  {copy.calc.lockedLabel}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white/12 blur-[6px] select-none">
                  $000,000
                </p>
                <p className="mx-auto mt-4 max-w-xs text-[13px] leading-5 text-white/45">
                  {copy.calc.lockedBody}
                </p>
              </motion.div>
            ) : phase === "processing" ? (
              <ProcessingPanel
                key="processing"
                analyzing={copy.calc.analyzing}
                title={copy.calc.processingTitle}
                body={copy.calc.processingBody}
                steps={copy.calc.steps}
                onDone={finishProcessing}
              />
            ) : (
              <motion.div
                key="result"
                className="relative flex h-full flex-col"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[11px] tracking-[0.14em] text-white/40 uppercase">
                  {copy.calc.leakLabel}
                </p>
                <p className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] tabular-nums sm:text-[2.35rem]">
                  <AnimatedNumber
                    value={result.total}
                    format={(n) => money.format(Math.round(n))}
                  />
                </p>
                <p className="mt-1 text-[13px] text-white/45">
                  <AnimatedNumber
                    value={result.annual}
                    format={(n) => money.format(Math.round(n))}
                  />{" "}
                  {copy.calc.aYear}
                </p>

                <p className="mt-4 text-[13px] leading-5 text-white/70">
                  {copy.calc.verdict[stream]}{" "}
                  <span className="text-[#5AC8FA] tabular-nums">
                    {numbers.format(list)}
                  </span>{" "}
                  {copy.calc.canReach}{" "}
                  <span className="tabular-nums">
                    {numbers.format(followers)}
                  </span>
                  .
                </p>

                <div className="mt-5 grid gap-3">
                  <div>
                    <div className="flex items-baseline justify-between gap-3 text-[12px]">
                      <span className="text-white/45">{copy.calc.today}</span>
                      <span className="font-medium tabular-nums">
                        <AnimatedNumber
                          value={revenue}
                          format={(n) => money.format(Math.round(n))}
                        />
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-white/35"
                        animate={{
                          width: `${Math.max((revenue / result.scale) * 100, 1.5)}%`,
                        }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-3 text-[12px]">
                      <span className="text-white/45">
                        {copy.calc.uncapturedBar}
                      </span>
                      <span className="font-medium tabular-nums">
                        <AnimatedNumber
                          value={result.total}
                          format={(n) => money.format(Math.round(n))}
                        />
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA]"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.max((result.total / result.scale) * 100, 1.5)}%`,
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-1">
                  {(
                    [
                      [copy.calc.leakFront, result.front],
                      [copy.calc.leakOps, result.ops],
                      [copy.calc.leakRetention, result.retention],
                    ] as const
                  ).map(([label, amount]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[minmax(0,1fr)_7.25rem] items-baseline gap-4 border-b border-white/[0.08] py-2 last:border-b-0"
                    >
                      <span className="text-[13px] leading-5 text-white/45">
                        {label}
                      </span>
                      <span className="text-right text-[13px] font-medium leading-5 text-white/80 tabular-nums">
                        <AnimatedNumber
                          value={amount}
                          format={(n) => money.format(Math.round(n))}
                        />
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/book"
                  className="group relative z-10 mt-6 inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-[#050505] transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl"
                >
                  {copy.calc.resultCta}
                  <ArrowIcon className="size-4 text-[#050505] transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
