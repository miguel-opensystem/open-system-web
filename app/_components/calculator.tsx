"use client";

import Link from "next/link";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Messages } from "../_i18n/en";
import { useCopy } from "../_i18n/provider";
import {
  SectionLabel,
  darkCard,
  ghostButton,
  inverseButton,
} from "./chrome";
import { ArrowIcon, CheckIcon } from "./icons";
import { AUDIENCE_INPUT_ID, ESTIMATE_ID } from "./estimate-scroll";
import { LiveDot } from "./motion";

const MIN_FOLLOWERS = 20_000;
const MAX_FOLLOWERS = 1_000_000;
const MIN_REVENUE = 0;
const MAX_REVENUE = 100_000;
const MAX_LIST = 1_000_000;
const CAPTURE_RATE = 0.005;
const FEED_CAPTURE_RATE = 0.002;
const CAPTURE_VALUE = 30;
const FOLLOWUP_RATE = 0.15;
const RETENTION_RATE = 0.09;
const INBOUND_RATE = 0.002;
const INBOUND_VALUE = 20;
const INBOUND_WEIGHT = 0.5;

const QUESTION_COUNT = 8;
const PROCESS_DURATION = 5.4;
const EASE = [0.16, 1, 0.3, 1] as const;

const platformIds = [
  "instagram",
  "tiktok",
  "youtube",
  "linkedin",
] as const;

export type PlatformId = (typeof platformIds)[number];

const streamIds = [
  "none",
  "brand",
  "digital",
  "subscriptions",
  "coaching",
] as const;

export type StreamId = (typeof streamIds)[number];

const landingIds = ["feed", "bio", "owned"] as const;

export type LandingId = (typeof landingIds)[number];

const automationIds = ["automated", "bio", "manual", "nothing"] as const;

export type AutomationId = (typeof automationIds)[number];

const retentionIds = ["recovered", "untracked"] as const;

export type RetentionId = (typeof retentionIds)[number];

export type LeakInputs = {
  audience: number;
  list: number;
  revenue: number;
  landing: LandingId | null;
  automation: AutomationId | null;
  retention: RetentionId | null;
};

export type LeakResult = {
  capture: number;
  followup: number;
  retention: number;
  total: number;
  annual: number;
  uncaptured: number;
  scale: number;
};

function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}

/** Localized diagnostic: three leaks from capture path, inbound handling, and retention hygiene. */
export function calculateLeaks(input: LeakInputs): LeakResult {
  const uncaptured = Math.max(0, input.audience - input.list);
  const capture =
    input.automation === "bio" || input.automation === "nothing"
      ? uncaptured * CAPTURE_RATE * CAPTURE_VALUE
      : input.landing === "feed"
        ? uncaptured * FEED_CAPTURE_RATE * CAPTURE_VALUE
        : 0;
  const followupGated =
    input.automation === "manual" || input.automation === "nothing";
  const followup = followupGated
    ? input.revenue > 0
      ? input.revenue * FOLLOWUP_RATE
      : input.audience * INBOUND_RATE * INBOUND_VALUE * INBOUND_WEIGHT
    : 0;
  const retention =
    input.retention === "untracked" ? input.revenue * RETENTION_RATE : 0;
  const total = capture + followup + retention;

  return {
    capture,
    followup,
    retention,
    total,
    annual: total * 12,
    uncaptured,
    scale: Math.max(total, input.revenue, 1),
  };
}

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
      className="mx-auto w-full max-w-xl text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <p className="flex items-center justify-center gap-2 text-[13px] tracking-[-0.01em] text-[#86868B]">
        <LiveDot color="#0A84FF" />
        {analyzing}
      </p>
      <p className="mt-4 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance sm:text-[2.5rem]">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-[15px] leading-6 text-[#86868B]">
        {body}
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 text-left sm:grid-cols-2">
        {steps.map((step, index) => {
          const done = index < processStep;
          const active = index === processStep;
          return (
            <li key={step} className="flex items-center gap-2.5">
              <span className="grid size-5 shrink-0 place-items-center">
                {done ? (
                  <CheckIcon className="size-3.5 text-[#0A84FF]" />
                ) : active ? (
                  <LiveDot color="#0A84FF" />
                ) : (
                  <span className="size-1.5 rounded-full bg-black/15" />
                )}
              </span>
              <span
                className={`text-[15px] tracking-[-0.01em] ${
                  done || active ? "text-[#050505]" : "text-[#86868B]"
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-12 h-px w-full overflow-hidden bg-black/[0.08]">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA]"
          style={{ transform: "scaleX(0)" }}
        />
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

function NumberField({
  value,
  onChange,
  max,
  prefix,
  suffix,
  placeholder,
  label,
  onSubmit,
}: {
  value: number | null;
  onChange: (next: number | null) => void;
  max: number;
  prefix?: string;
  suffix?: string;
  placeholder: string;
  label: string;
  onSubmit?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[color:var(--input-border)] bg-[var(--chip)] px-3.5 py-2.5 backdrop-blur-xl transition-all duration-300 ease-out focus-within:border-black/25 focus-within:shadow-md">
      {prefix ? (
        <span className="text-[17px] text-[var(--muted)] select-none">{prefix}</span>
      ) : null}
      <input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={value === null ? "" : value.toLocaleString("en-US")}
        placeholder={placeholder}
        onChange={(event) => {
          const digits = event.target.value.replace(/[^0-9]/g, "");
          if (digits === "") {
            onChange(null);
            return;
          }
          onChange(Math.min(Number(digits), max));
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit?.();
        }}
        className="w-full bg-transparent text-[16px] font-medium tracking-[-0.01em] tabular-nums outline-none placeholder:font-normal placeholder:text-[#C0C0C6] sm:text-[15px]"
      />
      {suffix ? (
        <span className="shrink-0 text-[13px] text-[#86868B] select-none">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

function ResultScreen({
  copy,
  result,
  revenue,
  stream,
  list,
  followers,
  platformLabel,
  offerLabel,
  landingLabel,
  automation,
  landing,
  money,
  numbers,
}: {
  copy: Messages["calc"];
  result: LeakResult;
  revenue: number;
  stream: StreamId;
  list: number;
  followers: number;
  platformLabel: string;
  offerLabel: string;
  landingLabel: string;
  automation: AutomationId | null;
  landing: LandingId | null;
  money: Intl.NumberFormat;
  numbers: Intl.NumberFormat;
}) {
  const dollars = (amount: number) => money.format(Math.round(amount));
  const vars = {
    amount: dollars(result.capture),
    platform: platformLabel,
    audience: numbers.format(followers),
    uncaptured: numbers.format(result.uncaptured),
    revenue: dollars(revenue),
    list: numbers.format(list),
  };

  const rows = [
    {
      id: "capture",
      label: "01",
      title: copy.leakFront,
      amount: result.capture,
      body:
        result.capture > 0
          ? fill(copy.lost.capture, { ...vars, amount: dollars(result.capture) })
          : copy.clear.capture,
      fix: result.capture > 0 ? copy.lost.captureFix : copy.clear.captureFix,
    },
    {
      id: "followup",
      label: "02",
      title: copy.leakOps,
      amount: result.followup,
      body:
        result.followup > 0
          ? fill(revenue > 0 ? copy.lost.followup : copy.lost.followupZero, {
              ...vars,
              amount: dollars(result.followup),
            })
          : copy.clear.followup,
      fix: result.followup > 0 ? copy.lost.followupFix : copy.clear.followupFix,
    },
    {
      id: "retention",
      label: "03",
      title: copy.leakRetention,
      amount: result.retention,
      body:
        result.retention > 0
          ? fill(copy.lost.retention, {
              ...vars,
              amount: dollars(result.retention),
            })
          : copy.clear.retention,
      fix: result.retention > 0 ? copy.lost.retentionFix : copy.clear.retentionFix,
    },
  ] as const;

  const findings: string[] = [];
  if (followers > 0 && list / followers < 0.1) findings.push(copy.findings.lowOwned);
  else if (result.uncaptured > 0) findings.push(copy.findings.listGap);
  if (landing === "feed") findings.push(copy.findings.feedDeath);
  if (automation === "bio") findings.push(copy.findings.bioOnly);
  if (result.followup > 0) findings.push(copy.findings.timeBound);
  if (result.retention > 0) findings.push(copy.findings.untracked);
  if (stream === "none") findings.push(copy.findings.noOffer);
  if (stream === "brand") findings.push(copy.findings.brandReset);

  const shownFindings = findings.slice(0, 4);

  return (
    <motion.div
      className="mx-auto w-full max-w-6xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionLabel align="start">{copy.reportLabel}</SectionLabel>
          <h2 className="mt-6 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-[#050505] sm:text-[2.5rem] lg:text-[2.75rem] lg:leading-[1.08]">
            {copy.verdict[stream]}
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-[#86868B]">
            {platformLabel} · {offerLabel} · {landingLabel}
            <br />
            <span className="tabular-nums text-[#050505]">{numbers.format(list)}</span>{" "}
            {copy.canReach}{" "}
            <span className="tabular-nums text-[#050505]">
              {numbers.format(followers)}
            </span>
            .
          </p>
        </div>
        <div className="lg:col-span-6 lg:text-right">
          <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
            {copy.leakLabel}
          </p>
          <p className="mt-3 text-[2.75rem] leading-none font-semibold tracking-[-0.055em] text-[#050505] tabular-nums sm:text-[4.25rem]">
            <AnimatedNumber
              value={result.total}
              format={(n) => money.format(Math.round(n))}
            />
          </p>
          <p className="mt-4 text-[15px] leading-7 text-[#86868B]">
            <span className="font-medium text-[#0A84FF] tabular-nums">
              <AnimatedNumber
                value={result.annual}
                format={(n) => money.format(Math.round(n))}
              />
            </span>{" "}
            {copy.aYear}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="text-[#86868B]">{copy.today}</span>
            <span className="font-medium text-[#050505] tabular-nums">
              <AnimatedNumber
                value={revenue}
                format={(n) => money.format(Math.round(n))}
              />
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
            <motion.div
              className="h-full rounded-full bg-black/25"
              animate={{
                width: `${Math.max((revenue / result.scale) * 100, 1.5)}%`,
              }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="text-[#86868B]">{copy.uncapturedBar}</span>
            <span className="font-medium text-[#0A84FF] tabular-nums">
              <AnimatedNumber
                value={result.total}
                format={(n) => money.format(Math.round(n))}
              />
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA]"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.max((result.total / result.scale) * 100, 1.5)}%`,
              }}
              transition={{ duration: 1, ease: EASE }}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5">
        {rows.map((row) => (
          <article
            key={row.id}
            className="gpu relative overflow-hidden rounded-3xl border border-[color:var(--card-border)] bg-[var(--card)] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] tracking-[0.16em] text-[#0A84FF] tabular-nums">
                  {row.label}
                </p>
                <h3 className="mt-3 text-[1.35rem] leading-7 font-semibold tracking-[-0.03em] text-[#050505] sm:text-[1.5rem]">
                  {row.title}
                </h3>
              </div>
              <p
                className={`text-[1.5rem] leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-[1.85rem] ${
                  row.amount > 0 ? "text-[#0A84FF]" : "text-[#86868B]"
                }`}
              >
                <AnimatedNumber
                  value={row.amount}
                  format={(n) => money.format(Math.round(n))}
                />
              </p>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-zinc-700 sm:text-[16px] sm:leading-8">
              {row.body}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#86868B]">
              <span className="font-medium text-[#050505]">{copy.installLabel}:</span>{" "}
              {row.fix}
            </p>
          </article>
        ))}
      </div>

      {shownFindings.length > 0 ? (
        <div className="mt-10 sm:mt-12">
          <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
            {copy.findingsTitle}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {shownFindings.map((finding) => (
              <li
                key={finding}
                className="flex items-start gap-3 text-[15px] leading-7 text-zinc-700"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0A84FF]"
                  aria-hidden="true"
                />
                {finding}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div
        className={`${darkCard} mt-12 items-start p-6 sm:mt-16 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:p-12`}
      >
        <div className="max-w-xl">
          <h3 className="text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.04em] sm:text-[2.15rem]">
            {copy.gapTitle}
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-white/60 sm:text-[16px] sm:leading-8">
            {copy.gapBody}
          </p>
        </div>
        <div className="mt-8 flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:w-auto">
          <Link href="/book" className={`${inverseButton} w-full sm:w-auto`}>
            {copy.plugCta}
            <ArrowIcon className="size-4 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className={`${ghostButton} w-full border-white/15 bg-white/[0.06] text-white sm:w-auto`}
          >
            {copy.homeCta}
          </Link>
        </div>
      </div>
    </motion.div>
  );
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
    <div className="mx-auto w-full max-w-xl text-center">
      <h2 className="text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance sm:text-[2.5rem]">
        {prompt}
      </h2>
      {hint ? (
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-7 tracking-[0.01em] text-[#86868B]">
          {hint}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
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
      className={`w-full rounded-full px-4 py-2.5 text-[15px] font-medium transition-all duration-300 ease-out ${
        selected
          ? "bg-[var(--btn)] text-[var(--btn-fg)] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
          : "border border-[color:var(--input-border)] bg-[var(--chip)] text-[var(--muted)] backdrop-blur-xl hover:scale-[1.03] hover:text-[var(--fg)] hover:shadow-md"
      }`}
    >
      {children}
    </button>
  );
}

function OptionRow({
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all duration-300 ease-out ${
        selected
          ? "border-[#050505] bg-[#050505] text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)]"
          : "border-[color:var(--input-border)] bg-[var(--chip)] text-[#050505] backdrop-blur-xl hover:border-black/20 hover:shadow-md"
      }`}
    >
      <span
        className={`grid size-4 shrink-0 place-items-center rounded-full border ${
          selected ? "border-white" : "border-black/25"
        }`}
        aria-hidden="true"
      >
        {selected ? <span className="size-2 rounded-full bg-white" /> : null}
      </span>
      {children}
    </button>
  );
}

export function Calculator() {
  const copy = useCopy();
  const reduced = useReducedMotion();
  const [followers, setFollowers] = useState(100_000);
  const [revenue, setRevenue] = useState(0);
  const [list, setList] = useState<number | null>(null);
  const [stream, setStream] = useState<StreamId | null>(null);
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const [landing, setLanding] = useState<LandingId | null>(null);
  const [automation, setAutomation] = useState<AutomationId | null>(null);
  const [retention, setRetention] = useState<RetentionId | null>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState<"idle" | "processing" | "done">("idle");
  const [attempted, setAttempted] = useState(false);
  const stepRootRef = useRef<HTMLDivElement>(null);
  const finishProcessing = useCallback(() => setPhase("done"), []);

  useEffect(() => {
    if (phase !== "idle") return;
    stepRootRef.current?.focus({ preventScroll: true });
  }, [step, phase]);

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

  const numbers = useMemo(() => new Intl.NumberFormat("en-US"), []);

  const result = useMemo(
    () =>
      calculateLeaks({
        audience: followers,
        list: list ?? 0,
        revenue,
        landing,
        automation,
        retention,
      }),
    [followers, list, revenue, landing, automation, retention],
  );

  const audienceProgress =
    ((followers - MIN_FOLLOWERS) / (MAX_FOLLOWERS - MIN_FOLLOWERS)) * 100;
  const revenueProgress =
    ((revenue - MIN_REVENUE) / (MAX_REVENUE - MIN_REVENUE)) * 100;

  function startCalculation() {
    if (phase === "processing") return;
    if (reduced) {
      setPhase("done");
      return;
    }
    setPhase("processing");
  }

  function isQuestionAnswered(index: number) {
    switch (index) {
      case 0:
      case 1:
        return true;
      case 2:
        return list !== null;
      case 3:
        return stream !== null;
      case 4:
        return platform !== null;
      case 5:
        return landing !== null;
      case 6:
        return automation !== null;
      case 7:
        return retention !== null;
      default:
        return false;
    }
  }

  function goTo(next: number) {
    setAttempted(false);
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function goNext() {
    if (!isQuestionAnswered(step)) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    if (step < QUESTION_COUNT - 1) {
      goTo(step + 1);
      return;
    }
    startCalculation();
  }

  function goBack() {
    if (step === 0) return;
    goTo(step - 1);
  }

  const lastQuestion = step === QUESTION_COUNT - 1;
  const slideOffset = reduced ? 0 : 28;
  const questionReady = isQuestionAnswered(step);
  const needCopy = step === 2 ? copy.calc.needNumber : copy.calc.needChoice;

  const questions = [
    <Question
      key="q1"
      prompt={copy.calc.q1}
      hint={copy.calc.q1hint}
    >
      <div className="flex w-full items-center gap-4">
        <p className="w-[4.5rem] shrink-0 text-left text-[1.65rem] font-semibold tracking-[-0.045em] tabular-nums sm:w-24 sm:text-3xl">
          {followers >= MAX_FOLLOWERS ? "1M+" : compact.format(followers)}
        </p>
        <div className="min-w-0 flex-1">
          <input
            id={AUDIENCE_INPUT_ID}
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
    </Question>,
    <Question
      key="q2"
      prompt={copy.calc.q2}
      hint={copy.calc.q2hint}
    >
      <div className="flex w-full items-center gap-4">
        <p className="w-[5.25rem] shrink-0 text-left text-[1.45rem] font-semibold tracking-[-0.045em] tabular-nums sm:w-28 sm:text-3xl">
          {revenue >= MAX_REVENUE ? "$100k+" : money.format(revenue)}
        </p>
        <div className="min-w-0 flex-1">
          <input
            type="range"
            min={MIN_REVENUE}
            max={MAX_REVENUE}
            step={500}
            value={revenue}
            onChange={(event) => setRevenue(Number(event.target.value))}
            aria-label={copy.calc.revenueLabel}
            aria-valuetext={money.format(revenue)}
            className="range-slider"
            style={{
              background: `linear-gradient(to right, #050505 ${revenueProgress}%, rgba(5,5,5,0.10) ${revenueProgress}%)`,
            }}
          />
          <div className="mt-1.5 flex justify-between text-[11px] text-[#86868B] tabular-nums">
            <span>$0</span>
            <span>$100k+</span>
          </div>
        </div>
      </div>
    </Question>,
    <Question
      key="q3"
      prompt={copy.calc.q3}
      hint={copy.calc.q3hint}
    >
      <NumberField
        value={list}
        onChange={(next) => {
          setList(next);
          setAttempted(false);
        }}
        max={MAX_LIST}
        suffix={copy.calc.contacts}
        placeholder="5,000"
        label={copy.calc.listLabel}
        onSubmit={goNext}
      />
    </Question>,
    <Question
      key="q4"
      prompt={copy.calc.q4}
      hint={copy.calc.q4hint}
    >
      <div className="flex flex-wrap justify-center gap-2">
        {streamIds.map((id) => (
          <div key={id} className="min-w-[9.5rem] flex-1 sm:min-w-[10.5rem]">
            <Choice
              selected={stream === id}
              onSelect={() => {
                setStream(id);
                setAttempted(false);
              }}
            >
              {copy.calc.delivery[id]}
            </Choice>
          </div>
        ))}
      </div>
    </Question>,
    <Question
      key="q5"
      prompt={copy.calc.q5}
      hint={copy.calc.q5hint}
    >
      <div className="grid grid-cols-2 gap-2">
        {platformIds.map((id) => (
          <Choice
            key={id}
            selected={platform === id}
            onSelect={() => {
              setPlatform(id);
              setAttempted(false);
            }}
          >
            {copy.calc.platform[id]}
          </Choice>
        ))}
      </div>
    </Question>,
    <Question
      key="q6"
      prompt={copy.calc.q6}
      hint={copy.calc.q6hint}
    >
      <div className="grid gap-2">
        {landingIds.map((id) => (
          <OptionRow
            key={id}
            selected={landing === id}
            onSelect={() => {
              setLanding(id);
              setAttempted(false);
            }}
          >
            {copy.calc.landing[id]}
          </OptionRow>
        ))}
      </div>
    </Question>,
    <Question
      key="q7"
      prompt={copy.calc.q7}
      hint={copy.calc.q7hint}
    >
      <div className="grid gap-2">
        {automationIds.map((id) => (
          <OptionRow
            key={id}
            selected={automation === id}
            onSelect={() => {
              setAutomation(id);
              setAttempted(false);
            }}
          >
            {copy.calc.automation[id]}
          </OptionRow>
        ))}
      </div>
    </Question>,
    <Question
      key="q8"
      prompt={copy.calc.q8}
      hint={copy.calc.q8hint}
    >
      <div className="grid gap-2">
        {retentionIds.map((id) => (
          <OptionRow
            key={id}
            selected={retention === id}
            onSelect={() => {
              setRetention(id);
              setAttempted(false);
            }}
          >
            {copy.calc.retentionStatus[id]}
          </OptionRow>
        ))}
      </div>
    </Question>,
  ];

  return (
    <div
      id={ESTIMATE_ID}
      className="flex min-h-[calc(100dvh-var(--header-offset,7.5rem))] w-full max-w-full flex-1 flex-col font-sans"
    >
      <div
        className="h-1 w-full bg-black/[0.06]"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={QUESTION_COUNT}
        aria-valuenow={phase === "idle" ? step + 1 : QUESTION_COUNT}
        aria-label={copy.calc.progressLabel}
      >
        <div
          className="h-full bg-[#0A84FF] transition-[width] duration-500 ease-out"
          style={{
            width: `${((phase === "idle" ? step + 1 : QUESTION_COUNT) / QUESTION_COUNT) * 100}%`,
          }}
        />
      </div>

      <div
        className={`mx-auto flex w-full flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14 ${
          phase === "done" ? "max-w-6xl" : "max-w-2xl"
        }`}
      >
        <AnimatePresence mode="wait">
          {phase === "processing" ? (
            <motion.div
              key="processing"
              className="flex flex-1 items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessingPanel
                analyzing={copy.calc.analyzing}
                title={copy.calc.processingTitle}
                body={copy.calc.processingBody}
                steps={copy.calc.steps}
                onDone={finishProcessing}
              />
            </motion.div>
          ) : phase === "done" && stream ? (
            <motion.div
              key="result"
              className="flex flex-1 items-start justify-center py-4 sm:py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResultScreen
                copy={copy.calc}
                result={result}
                revenue={revenue}
                stream={stream}
                list={list ?? 0}
                followers={followers}
                platformLabel={
                  platform ? copy.calc.platform[platform] : "inbound"
                }
                offerLabel={copy.calc.delivery[stream]}
                landingLabel={
                  landing ? copy.calc.landing[landing] : copy.calc.landing.feed
                }
                automation={automation}
                landing={landing}
                money={money}
                numbers={numbers}
              />
            </motion.div>
          ) : (
            <motion.div
              key="questions"
              className="flex min-h-[320px] flex-1 flex-col sm:min-h-[380px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-1 items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`step-${step}`}
                    ref={stepRootRef}
                    tabIndex={-1}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * slideOffset }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -slideOffset }}
                    transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE }}
                    className="w-full outline-none"
                  >
                    {questions[step]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-10 grid grid-cols-[4.75rem_minmax(0,1fr)_4.75rem] items-center">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="justify-self-start text-[13px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] disabled:pointer-events-none disabled:opacity-0"
                >
                  {copy.calc.back}
                </button>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={goNext}
                    className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#050505] px-7 text-[15px] font-medium text-white transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl ${
                      questionReady ? "" : "opacity-40 hover:scale-100 hover:shadow-none"
                    }`}
                  >
                    {lastQuestion ? copy.calc.cta : copy.calc.next}
                    <ArrowIcon className="size-4 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </button>
                  {attempted && !questionReady ? (
                    <p className="mt-3 text-[13px] text-[#86868B]">{needCopy}</p>
                  ) : null}
                </div>
                <span aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
