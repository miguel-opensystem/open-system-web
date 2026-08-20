"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCopy } from "../_i18n/provider";
import { SectionLabel, glassCard, inverseButton } from "./chrome";
import { ArrowIcon, CheckIcon } from "./icons";
import {
  Reveal,
  RingGauge,
  Stagger,
  StaggerItem,
  TrendLine,
} from "./motion";
import { Silk } from "./silk";

const BOOKING_URL = "/book";

const MRR_LINE =
  "M2 58 C 32 56, 50 50, 74 44 S 118 36, 146 26 S 186 18, 214 11 L 238 7";
const MRR_AREA =
  "M2 72 L2 58 C 32 56, 50 50, 74 44 S 118 36, 146 26 S 186 18, 214 11 L 238 7 L 238 72 Z";

const CELLS = [
  { kind: "skill", title: "Immediate bottleneck fix", span: "sm:col-span-2 lg:col-span-7 lg:row-span-2", featured: true },
  { kind: "recovered", span: "sm:col-span-2 lg:col-span-5 lg:row-span-2" },
  { kind: "creator", span: "sm:col-span-2 lg:col-span-12" },
  { kind: "operator", span: "sm:col-span-2 lg:col-span-7" },
  { kind: "skill", title: "Operations stay off your inbox", span: "lg:col-span-5" },
  { kind: "skill", title: "Fees tied to results", span: "lg:col-span-4" },
  { kind: "skill", title: "Less work on your plate", span: "lg:col-span-4" },
  { kind: "skill", title: "You own your data", span: "lg:col-span-4" },
  { kind: "skill", title: "We use the tools your model needs", span: "lg:col-span-5" },
  { kind: "skill", title: "A clear weekly update", span: "lg:col-span-7" },
  { kind: "skill", title: "A full operating team", span: "sm:col-span-2 lg:col-span-12", featured: true },
] as const;

export function Partnership() {
  const copy = useCopy();
  const skills = Object.fromEntries(
    copy.home.skills.map((skill) => [skill.title, skill]),
  );
  const [hook, punch] = splitBillboard(copy.home.partnerCardTitle);

  return (
    <section
      id="partnership"
      className="scroll-mt-40 py-20 sm:py-32 lg:scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <SectionLabel>{copy.home.partnerLabel}</SectionLabel>
          <p className="mt-6 text-[17px] font-semibold tracking-[-0.03em] sm:text-xl">
            {copy.home.partnerTitle}{" "}
            <span className="text-[#86868B]">{copy.home.partnerTitleAccent}</span>
          </p>
        </Reveal>

        <Reveal delay={0.08} className="text-center">
          <h2 className="mx-auto mt-8 max-w-5xl text-[1.85rem] leading-[1.08] font-semibold tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
            {hook}
            {punch ? (
              <>
                <br />
                {punch}
              </>
            ) : null}
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="text-center">
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-[16px] leading-7 tracking-[0.01em] text-[#86868B] sm:mt-10 sm:text-[17px] sm:leading-8">
            <p>{copy.home.partnerP1}</p>
            <p>{copy.home.partnerP2}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-24 sm:mt-28 lg:mt-32">
          <p className="text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
            {copy.home.skillsTitle}
          </p>
        </Reveal>

        <Stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
          step={0.07}
        >
          {CELLS.map((cell) => {
            if (cell.kind === "recovered") {
              return (
                <StaggerItem key="recovered" className={cell.span}>
                  <GlassBlock featured>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--muted)] uppercase">
                      {copy.home.partnerRecoveredLabel}
                    </p>
                    <div className="mt-auto flex flex-col items-start gap-6 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-10">
                      <RingGauge
                        value={62}
                        size={104}
                        stroke={7}
                        track="rgba(0,0,0,0.08)"
                      >
                        <span className="text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                          62%
                        </span>
                        <span className="mt-0.5 text-[11px] text-[var(--muted)]">
                          {copy.home.partnerRecovered}
                        </span>
                      </RingGauge>
                      <p className="max-w-[9rem] text-[13px] leading-5 text-[var(--muted)]">
                        Revenue you already earned, brought back automatically.
                      </p>
                    </div>
                  </GlassBlock>
                </StaggerItem>
              );
            }

            if (cell.kind === "creator") {
              return (
                <StaggerItem key="creator" className={cell.span}>
                  <Silk className="h-full">
                    <div className="flex h-full flex-col justify-between gap-8 p-6 text-white sm:gap-10 sm:p-10 lg:flex-row lg:items-end lg:gap-16">
                      <div className="max-w-lg">
                        <p className="text-[11px] tracking-[0.14em] text-white/70 uppercase">
                          {copy.home.partnerTrendLabel}
                        </p>
                        <p className="mt-3 text-[19px] font-semibold tracking-[-0.02em]">
                          {copy.home.partnerTrendNote}
                        </p>
                      </div>
                      <TrendLine
                        line={MRR_LINE}
                        area={MRR_AREA}
                        color="#ffffff"
                        className="mt-8 h-24 w-full lg:mt-0 lg:max-w-md lg:flex-1"
                      />
                    </div>
                  </Silk>
                </StaggerItem>
              );
            }

            if (cell.kind === "operator") {
              return (
                <StaggerItem key="operator" className={cell.span}>
                  <GlassBlock featured>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--muted)] uppercase">
                      {copy.home.partnerOperateLabel}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {copy.home.partnerOperateItems.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[14px] leading-6 text-[var(--fg)]"
                        >
                          <CheckIcon className="mt-1 size-3.5 shrink-0 text-[#0A84FF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassBlock>
                </StaggerItem>
              );
            }

            const skill = skills[cell.title];
            if (!skill) return null;

            return (
              <StaggerItem key={skill.title} className={cell.span}>
                <GlassBlock featured={"featured" in cell && cell.featured}>
                  <h3
                    className={
                      "featured" in cell && cell.featured
                        ? "text-[22px] font-semibold tracking-[-0.03em] sm:text-[1.65rem]"
                        : "text-[18px] font-semibold tracking-[-0.025em]"
                    }
                  >
                    {skill.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-[var(--muted)] sm:text-[15px] sm:leading-7">
                    {skill.body}
                  </p>
                </GlassBlock>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-24 sm:mt-28">
          <Reveal>
            <p className="text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
              {copy.home.engagement}
            </p>
          </Reveal>
          <Stagger className="mt-8 grid gap-10 sm:grid-cols-3" step={0.06}>
            {copy.home.phases.map((item) => (
              <StaggerItem key={item.phase}>
                <p className="text-[13px] text-[#0A84FF]">{item.timing}</p>
                <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em]">
                  {item.phase}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[var(--muted)]">
                  {item.detail}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.08} className="mt-24 sm:mt-28">
          <Silk>
            <div className="flex flex-col justify-between gap-8 p-6 text-white sm:flex-row sm:items-end sm:p-10">
              <div className="max-w-lg">
                <h3 className="text-[22px] font-semibold tracking-[-0.02em]">
                  {copy.home.mapTitle}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-white/80">
                  {copy.home.mapBody}
                </p>
              </div>
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <Link href={BOOKING_URL} className={`${inverseButton} w-full sm:w-auto`}>
                  {copy.home.bookCta}
                  <ArrowIcon className="size-4 text-[#050505] transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </Link>
                <p className="text-[13px] text-white/75 tabular-nums">
                  {copy.home.fourEngagements}
                </p>
              </div>
            </div>
          </Silk>
        </Reveal>
      </div>
    </section>
  );
}

function GlassBlock({
  children,
  featured = false,
}: {
  children: ReactNode;
  featured?: boolean;
}) {
  return (
    <div
      className={`${glassCard} justify-between ${
        featured
          ? "p-6 sm:p-10"
          : "p-6 sm:p-9"
      }`}
    >
      {children}
    </div>
  );
}

function splitBillboard(title: string) {
  const parts = title.split(/(?<=\.)\s+/);
  return [parts[0] ?? title, parts.slice(1).join(" ")] as const;
}
