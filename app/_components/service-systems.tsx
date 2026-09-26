"use client";

import type { PillarName } from "./icons";
import { darkCard, glassCard } from "./chrome";
import { RingGauge, Stagger, StaggerItem } from "./motion";
import { Silk } from "./silk";
import { useCopy } from "../_i18n/provider";

type Tone = "dark" | "silk" | "rose";
type Visual = "stat" | "ring" | "nodes" | "wide";

export type SystemLayout = {
  stackIndex: number;
  pillar: PillarName;
  span: string;
  tone?: Tone;
  visual?: Visual;
  raw?: boolean;
};

/** Systems grouped under the four services. */
export const systemsByService: SystemLayout[][] = [
  [
    { stackIndex: 3, pillar: "Backend", span: "lg:col-span-7" },
    { stackIndex: 2, pillar: "Backend", span: "lg:col-span-5", tone: "rose" },
    { stackIndex: 12, pillar: "Amplifier", span: "lg:col-span-12", raw: true },
  ],
  [
    {
      stackIndex: 0,
      pillar: "Strategy",
      span: "lg:col-span-7",
      tone: "silk",
    },
    { stackIndex: 4, pillar: "Backend", span: "lg:col-span-5" },
    { stackIndex: 1, pillar: "Strategy", span: "lg:col-span-12", raw: true },
  ],
  [
    {
      stackIndex: 6,
      pillar: "Retention",
      span: "lg:col-span-7",
      tone: "dark",
      visual: "ring",
    },
    { stackIndex: 9, pillar: "Retention", span: "lg:col-span-5" },
    { stackIndex: 5, pillar: "Retention", span: "lg:col-span-12", raw: true },
  ],
  [
    { stackIndex: 8, pillar: "Retention", span: "lg:col-span-7" },
    { stackIndex: 7, pillar: "Retention", span: "lg:col-span-5" },
    {
      stackIndex: 11,
      pillar: "Amplifier",
      span: "lg:col-span-7",
      tone: "dark",
      visual: "nodes",
    },
    { stackIndex: 13, pillar: "Retention", span: "lg:col-span-5", raw: true },
  ],
];

function NodeGrid() {
  return (
    <div className="mt-8 grid w-fit grid-cols-8 gap-2.5" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className={`size-1.5 rounded-full ${
            [3, 9, 10, 17].includes(i) ? "bg-[#0A84FF]" : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

function SystemCard({
  item,
  active,
}: {
  item: SystemLayout;
  active: boolean;
}) {
  const copy = useCopy();
  const copyItem = copy.home.stack[item.stackIndex];
  const isDark = item.tone === "dark";
  const isSilk = item.tone === "silk" || item.tone === "rose";
  const isWide = item.visual === "wide";

  if (item.raw) {
    return (
      <div className="flex h-full flex-col justify-center px-6 py-6 sm:px-7 sm:py-8">
        <h3 className="text-xl leading-7 font-semibold tracking-[-0.03em] sm:text-[1.375rem]">
          {copyItem.title}
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#86868B]">
          {copyItem.description}
        </p>
      </div>
    );
  }

  if (isSilk) {
    return (
      <Silk
        paused={!active}
        tone={item.tone === "rose" ? "pink" : "blue"}
        className="h-full transition-all duration-500 ease-out [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-2xl"
      >
        <div className="flex h-full flex-col p-6 text-white sm:p-7">
          <h3 className="text-[17px] leading-6 font-semibold tracking-[-0.02em]">
            {copyItem.title}
          </h3>
          <p className="mt-2.5 text-[14px] leading-6 text-white/90">
            {copyItem.description}
          </p>
          <p className="mt-2.5 max-w-md text-[13px] leading-5 text-white/70">
            {copyItem.detail}
          </p>
        </div>
      </Silk>
    );
  }

  return (
    <article
      className={`${isDark ? darkCard : glassCard} p-6 sm:p-7 ${
        isWide ? "sm:flex-row sm:items-center sm:justify-between sm:gap-10" : ""
      }`}
    >
      <div className={isWide ? "sm:max-w-lg" : ""}>
        <h3 className="text-[16px] leading-6 font-semibold tracking-[-0.02em]">
          {copyItem.title}
        </h3>
        <p
          className={`mt-2.5 text-[14px] leading-6 ${
            isDark ? "text-white/80" : "text-[var(--fg)]"
          }`}
        >
          {copyItem.description}
        </p>
        <p
          className={`mt-2.5 text-[13px] leading-5 tracking-[0.01em] ${
            isDark ? "text-white/45" : "text-[#86868B]"
          }`}
        >
          {copyItem.detail}
        </p>
      </div>

      {item.visual === "ring" && (
        <div className="mt-auto flex items-end justify-end pt-8">
          <RingGauge value={62} size={104} stroke={6}>
            <span className="text-xl font-semibold tracking-[-0.03em] text-white tabular-nums">
              62%
            </span>
            <span className="mt-0.5 text-[11px] text-white/40">
              {copy.home.recovered}
            </span>
          </RingGauge>
        </div>
      )}

      {item.visual === "nodes" && <NodeGrid />}
    </article>
  );
}

export function ServiceSystems({
  serviceIndex,
  active = true,
}: {
  serviceIndex: number;
  active?: boolean;
}) {
  const items = systemsByService[serviceIndex] ?? [];

  return (
    <Stagger
      className="grid auto-rows-[minmax(140px,auto)] gap-4 overflow-visible sm:grid-cols-2 lg:grid-cols-12"
      step={0.08}
    >
      {items.map((item) => (
        <StaggerItem
          key={item.stackIndex}
          className={`${item.span} overflow-visible ${item.raw ? "" : "h-full"}`}
        >
          <SystemCard item={item} active={active} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
