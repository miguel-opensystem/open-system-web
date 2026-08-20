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
      <section className="mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-6xl flex-col justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:min-h-[calc(100dvh-4.25rem)]">
        <Reveal>
          <SectionLabel>{copy.about.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-4xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.75rem]">
            {copy.about.title}
            <br />
            <span className="text-[#86868B]">{copy.about.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.about.body}
          </p>
        </Reveal>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <SectionLabel>{copy.about.global}</SectionLabel>
            <h2 className="mx-auto mt-6 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] sm:text-5xl">
              {copy.about.globalTitle}
              <span className="text-[#86868B]"> {copy.about.globalAccent}</span>
            </h2>
          </Reveal>
          <Stagger
            className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
            step={0.08}
          >
            {copy.about.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <article className={`${glassCard} p-6 sm:p-8`}>
                  <p className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    {stat.figure}
                  </p>
                  <p className="mt-2 text-[13px] leading-5 text-[#86868B]">
                    {stat.label}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <SectionLabel>{copy.about.how}</SectionLabel>
            <h2 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] sm:text-5xl">
              {copy.about.hold}
            </h2>
          </Reveal>

          <Stagger className="mt-14" step={0.08}>
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

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <article className={`${glassCard} p-8 sm:p-12`}>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
                <div>
                  <p className="text-[11px] tracking-[0.14em] text-[#86868B] uppercase">
                    {copy.about.who}
                  </p>
                  <h2 className="mt-4 max-w-sm text-[28px] leading-9 font-semibold tracking-[-0.03em]">
                    {copy.about.whoTitle}
                    <span className="text-[#86868B]"> {copy.about.whoAccent}</span>
                  </h2>
                </div>
                <ul className="space-y-4">
                  {copy.about.criteria.map((item) => (
                    <li
                      key={item}
                      className="border-t border-black/[0.06] pt-4 text-[15px] leading-7 text-[#86868B] first:border-t-0 first:pt-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/book" className={`${primaryButton} mt-12 w-fit`}>
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
