"use client";

import { useCopy } from "../_i18n/provider";
import { Columns, Counter, LiveDot, Stagger, StaggerItem } from "./motion";

const mrrByMonth = [38, 44, 41, 52, 58, 55, 67, 74, 71, 83, 91, 100];

const activityMeta = [
  { amount: "$2,000", time: "2m" },
  { amount: "$2,000", time: "18m" },
  { amount: "", time: "1h" },
  { amount: "", time: "1h" },
  { amount: "$2,000", time: "3h" },
  { amount: "", time: "5h" },
];

const panel =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl sm:p-6";
const label = "text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase";

export function OperatingSystem() {
  const copy = useCopy();
  const activity = copy.os.events.map((item, index) => ({
    ...item,
    ...activityMeta[index],
  }));

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505]/70 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/12" />
            <span className="size-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <p className="text-[13px] font-medium tracking-[-0.01em] text-white/70">
            Open System OS
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
          <LiveDot />
          <span className="text-[11px] tracking-[0.1em] text-white/50 uppercase">
            {copy.os.synced}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/[0.06] px-4 py-3 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        {copy.os.tabs.map((tab, i) => (
          <span
            key={tab}
            className={`rounded-full px-3 py-1 text-[12px] whitespace-nowrap ${
              i === 0 ? "bg-white/10 text-white" : "text-white/35"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <Stagger
        className="grid grid-cols-2 gap-3 p-3 sm:gap-5 sm:p-7 lg:grid-cols-4"
        step={0.08}
      >
        <StaggerItem className={panel}>
          <p className={label}>{copy.os.recurring}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-3xl">
            <Counter value={148200} prefix="$" />
          </p>
          <p className="mt-2 text-[12px] text-[#5AC8FA]">{copy.os.thisMonth}</p>
        </StaggerItem>

        <StaggerItem className={panel}>
          <p className={label}>{copy.os.members}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-3xl">
            <Counter value={412} />
          </p>
          <p className="mt-2 text-[12px] text-white/35">{copy.os.tiers}</p>
        </StaggerItem>

        <StaggerItem className={panel}>
          <p className={label}>{copy.os.recovered}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-3xl">
            <Counter value={14200} prefix="$" />
          </p>
          <p className="mt-2 text-[12px] text-white/35">{copy.os.failedCards}</p>
        </StaggerItem>

        <StaggerItem className={panel}>
          <p className={label}>{copy.os.churn}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-3xl">
            <Counter value={2.4} decimals={1} suffix="%" />
          </p>
          <p className="mt-2 text-[12px] text-white/35">{copy.os.downFrom}</p>
        </StaggerItem>

        <StaggerItem className={`${panel} col-span-2`}>
          <div className="flex items-baseline justify-between gap-4">
            <p className={label}>{copy.os.trend}</p>
            <span className="text-[13px] text-white/40">{copy.os.last12}</span>
          </div>
          <Columns
            data={mrrByMonth}
            accentFrom={9}
            className="mt-8 flex h-44 items-end gap-1.5 sm:gap-3"
            accentClassName="bg-gradient-to-t from-[#0A84FF]/25 via-[#0A84FF] to-[#5AC8FA]"
          />
        </StaggerItem>

        <StaggerItem className={`${panel} col-span-2`}>
          <p className={label}>{copy.os.activity}</p>
          <ul className="mt-6 divide-y divide-white/[0.06]">
            {activity.map((item) => (
              <li
                key={item.event}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-white/25"
                    aria-hidden="true"
                  />
                  <p className="truncate text-[13px] text-white/70">
                    {item.event}
                  </p>
                  <span className="hidden shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/35 sm:block">
                    {item.source}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  {item.amount && (
                    <span className="text-[13px] font-medium text-[#5AC8FA] tabular-nums">
                      {item.amount}
                    </span>
                  )}
                  <span className="w-8 text-right text-[12px] text-white/30 tabular-nums">
                    {item.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
