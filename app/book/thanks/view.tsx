"use client";

import Link from "next/link";
import { SectionLabel, ghostButton, glassCard, primaryButton } from "../../_components/chrome";
import { ArrowIcon } from "../../_components/icons";
import { Reveal, Stagger, StaggerItem } from "../../_components/motion";
import { PageShell } from "../../_components/page-shell";
import { useCopy } from "../../_i18n/provider";

export function ThanksView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <Reveal>
          <SectionLabel>{copy.thanks.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-3xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            {copy.thanks.title}
            <span className="text-[#86868B]"> {copy.thanks.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.thanks.body}
          </p>
        </Reveal>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <article className={`${glassCard} p-8 sm:p-10`}>
              <p className="text-[11px] tracking-[0.14em] text-[#86868B] uppercase">
                {copy.thanks.next}
              </p>
              <Stagger className="mt-8" step={0.08}>
                {copy.thanks.steps.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/[0.06] py-6 first:border-t-0 first:pt-0 last:pb-0">
                      <span className="text-[11px] tracking-[0.16em] text-[#86868B] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[15px] font-medium tracking-[-0.01em]">
                          {step.title}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-6 text-[#86868B]">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={`${primaryButton} w-full sm:w-auto`}>
              {copy.thanks.home}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
            <Link href="/faq" className={`${ghostButton} w-full sm:w-auto`}>
              {copy.thanks.faq}
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
