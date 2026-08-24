"use client";

import Link from "next/link";
import { SectionLabel, glassCard, primaryButton } from "../_components/chrome";
import { ArrowIcon } from "../_components/icons";
import { Reveal, Stagger, StaggerItem } from "../_components/motion";
import { PageShell } from "../_components/page-shell";
import { useCopy } from "../_i18n/provider";

export function AboutView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <Reveal>
          <SectionLabel>{copy.about.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-8 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.5rem]">
            {copy.about.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 tracking-[0.01em] text-[#86868B] sm:text-lg sm:leading-8">
            {copy.about.body}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.14em] text-[#86868B] uppercase">
              {copy.about.whoWeAre}
            </p>
            <p className="mt-4 text-[16px] leading-7 tracking-[0.01em] text-[var(--fg)]">
              {copy.about.whoWeAreBody}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[11px] tracking-[0.14em] text-[#86868B] uppercase">
              {copy.about.started}
            </p>
            <p className="mt-4 text-[16px] leading-7 tracking-[0.01em] text-[var(--fg)]">
              {copy.about.startedBody}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-14 border-t border-black/[0.06] pt-12">
          <p className="text-[11px] tracking-[0.14em] text-[#86868B] uppercase">
            {copy.about.mission}
          </p>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 tracking-[0.01em] text-[var(--fg)]">
            {copy.about.missionBody}
          </p>
        </Reveal>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>{copy.about.how}</SectionLabel>
            <h2 className="mt-6 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] sm:text-4xl">
              {copy.about.hold}
            </h2>
          </Reveal>

          <Stagger className="mt-10" step={0.08}>
            {copy.about.principles.map((principle, index) => (
              <StaggerItem key={principle.title}>
                <article className="grid gap-3 border-t border-black/[0.06] py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-10">
                  <span className="text-[11px] tracking-[0.16em] text-[#86868B] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[20px] leading-7 font-semibold tracking-[-0.025em]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[15px] leading-7 text-[#86868B]">
                      {principle.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <article className={`${glassCard} p-8 sm:p-12`}>
              <p className="text-[11px] tracking-[0.14em] text-[#86868B] uppercase">
                {copy.about.who}
              </p>
              <h2 className="mt-4 max-w-sm text-[28px] leading-9 font-semibold tracking-[-0.03em]">
                {copy.about.whoTitle}
                <span className="text-[#86868B]"> {copy.about.whoAccent}</span>
              </h2>
              <ul className="mt-8 space-y-4">
                {copy.about.criteria.map((item) => (
                  <li
                    key={item}
                    className="border-t border-black/[0.06] pt-4 text-[15px] leading-7 text-[#86868B] first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book" className={`${primaryButton} mt-10 w-full sm:w-fit`}>
                {copy.about.bookCta}
                <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
