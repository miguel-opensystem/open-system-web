"use client";

import Link from "next/link";
import { SectionLabel, primaryButton } from "../_components/chrome";
import { ArrowIcon } from "../_components/icons";
import { Reveal, Stagger, StaggerItem } from "../_components/motion";
import { PageShell } from "../_components/page-shell";
import { useCopy } from "../_i18n/provider";

export function CalculatorView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="relative overflow-x-clip">
        <div
          className="gpu pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,132,255,0.12),transparent_62%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-14 text-center sm:px-6 sm:pt-28 sm:pb-16">
          <Reveal>
            <SectionLabel>{copy.home.calcLabel}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-8 max-w-5xl text-[2.55rem] leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-[4.75rem] lg:leading-[0.96]">
              {copy.home.calcTitle}
              <br />
              <span className="bg-gradient-to-r from-[#0A84FF] via-[#3AA0FF] to-[#5AC8FA] bg-clip-text text-transparent">
                {copy.home.calcTitleAccent}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B] sm:text-xl sm:leading-9">
              {copy.home.calcBody}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <Stagger
          className="grid gap-12 pt-2 sm:pt-4 lg:grid-cols-3 lg:gap-10"
          step={0.08}
        >
          {copy.calc.pageBeats.map((beat, index) => (
            <StaggerItem key={beat.title}>
              <article className="text-center">
                <span className="relative z-10 mx-auto grid size-4 place-items-center rounded-full bg-[#fafafa]">
                  <span
                    className={`size-2.5 rounded-full ${
                      index === 0
                        ? "bg-[#0A84FF]/55"
                        : index === 1
                          ? "bg-[#0A84FF]/80"
                          : "bg-[#0A84FF]"
                    }`}
                  />
                </span>
                <h2 className="mt-5 text-[1.35rem] leading-6 font-semibold tracking-[-0.03em] text-balance text-[#050505] sm:text-[1.5rem]">
                  {beat.title}
                </h2>
                <p className="mx-auto mt-3 max-w-xs text-[15px] leading-7 text-pretty text-[#86868B]">
                  {beat.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="px-4 pt-14 pb-28 text-center sm:px-6 sm:pt-16 sm:pb-36">
        <Reveal>
          <Link
            href="/calculator/run"
            className={`${primaryButton} w-full sm:w-auto`}
          >
            {copy.home.calcCta}
            <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 tracking-[0.01em] text-[#86868B]">
            {copy.calc.pageEstimate}
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
